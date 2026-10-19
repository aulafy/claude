import sys, unittest
sys.path.insert(0, "src")
from rag.ingest import load_corpus, parse_front_matter, clean
from rag.chunking import chunk_corpus, by_heading, fixed
from rag.bm25 import BM25
from rag.vectors import embed, cosine
from rag.hybrid import rrf
from rag.guard import allowed, quarantine, injection_signals
from rag.answer import parse_answer, build_prompt
from rag.evals import recall_at_k, reciprocal_rank, answer_ok
from rag.pipeline import Rag


class Ingesta(unittest.TestCase):
    def test_front_matter(self):
        meta, body = parse_front_matter("---\nid: x\nacceso: public\n---\n# T\ntexto")
        self.assertEqual(meta["id"], "x"); self.assertTrue(body.startswith("# T"))

    def test_limpieza(self):
        self.assertEqual(clean("a  b\r\n\n\n\nc"), "a b\n\nc")

    def test_corpus_tiene_metadatos_de_acceso(self):
        docs = load_corpus("corpus")
        self.assertTrue(all("acceso" in d.meta for d in docs))
        self.assertEqual({d.meta["acceso"] for d in docs}, {"public", "internal", "rrhh"})


class Chunking(unittest.TestCase):
    def test_heading_conserva_seccion_y_titulo(self):
        d = [x for x in load_corpus("corpus") if x.id == "tarifas"][0]
        ch = by_heading(d)
        self.assertTrue(any(c.section == "Desplazamiento" and "Tarifas" in c.text for c in ch))

    def test_fixed_corta_mitad_de_frase(self):
        d = [x for x in load_corpus("corpus") if x.id == "tarifas"][0]
        self.assertTrue(any(not c.text.rstrip().endswith((".", "€")) for c in fixed(d, 120, 20)))

    def test_ids_unicos(self):
        ids = [c.id for c in chunk_corpus(load_corpus("corpus"), "heading")]
        self.assertEqual(len(ids), len(set(ids)))


class Busqueda(unittest.TestCase):
    def setUp(self):
        self.ch = chunk_corpus(load_corpus("corpus"), "heading")

    def test_bm25_encuentra_termino_exacto(self):
        top = BM25(self.ch).search("desplazamiento", 1)[0][0]
        self.assertEqual(top.doc_id, "tarifas")

    def test_bm25_sin_coincidencias_no_devuelve_nada(self):
        self.assertEqual(BM25(self.ch).search("zzzxxx", 3), [])

    def test_vector_parecido_de_forma(self):
        self.assertGreater(cosine(embed("descuento"), embed("descuentos")), cosine(embed("descuento"), embed("garantia")))

    def test_rrf_premia_lo_que_aparece_en_ambos(self):
        a, b, c = self.ch[0], self.ch[1], self.ch[2]
        self.assertEqual(rrf([[a, b], [c, a]])[0][0].id, a.id)


class Seguridad(unittest.TestCase):
    def test_visitante_nunca_recupera_rrhh_ni_internos(self):
        rag = Rag()
        for q in ("¿Qué salario cobra un oficial de primera?", "¿Cuál es el margen mínimo?", "vacaciones de la plantilla"):
            ids = {c.meta["acceso"] for c, _ in rag.retrieve(q, "visitante", 10)}
            self.assertTrue(ids <= {"public"}, (q, ids))

    def test_equipo_si_ve_internos_pero_no_rrhh(self):
        rag = Rag()
        accesos = {c.meta["acceso"] for c, _ in rag.retrieve("margen mínimo mobiliario", "equipo", 10)}
        self.assertIn("internal", accesos); self.assertNotIn("rrhh", accesos)

    def test_detecta_inyeccion_en_el_correo(self):
        d = [x for x in load_corpus("corpus") if x.id == "email-cliente"][0]
        self.assertTrue(injection_signals(d.text))
        ok, bad = quarantine(chunk_corpus([d], "heading"))
        self.assertTrue(bad)

    def test_texto_normal_no_se_pone_en_cuarentena(self):
        d = [x for x in load_corpus("corpus") if x.id == "garantia"][0]
        ok, bad = quarantine(chunk_corpus([d], "heading"))
        self.assertFalse(bad); self.assertTrue(ok)

    def test_contexto_va_delimitado_como_dato(self):
        p = build_prompt("¿hola?", chunk_corpus(load_corpus("corpus"), "heading")[:1])
        self.assertIn("<fragmento id=", p); self.assertIn("</fragmento>", p)


class Respuesta(unittest.TestCase):
    def test_descarta_citas_inventadas(self):
        r = parse_answer('{"respuesta":"x","citas":["tarifas#0","inventado#9"],"no_encontrado":false}', {"tarifas#0"})
        self.assertEqual(r["citas"], ["tarifas#0"]); self.assertEqual(r["citas_inventadas"], ["inventado#9"])

    def test_respuesta_sin_cita_se_trata_como_no_encontrado(self):
        r = parse_answer('{"respuesta":"Son 60 euros","citas":[],"no_encontrado":false}', {"tarifas#0"})
        self.assertTrue(r["no_encontrado"]); self.assertEqual(r["error"], "respuesta_sin_cita")

    def test_json_invalido_no_rompe(self):
        self.assertEqual(parse_answer("esto no es json", set())["error"], "json_invalido")


class Metricas(unittest.TestCase):
    def test_recall_y_mrr(self):
        self.assertEqual(recall_at_k(["a", "b"], "b"), 1.0); self.assertEqual(reciprocal_rank(["a", "b"], "b"), 0.5)
        self.assertEqual(reciprocal_rank(["a"], "z"), 0.0)

    def test_abstencion_correcta(self):
        self.assertTrue(answer_ok({"respuesta": "", "citas": [], "no_encontrado": True}, {"doc": None, "debe": []})["correcta"])
        self.assertFalse(answer_ok({"respuesta": "París", "citas": ["x#0"], "no_encontrado": False}, {"doc": None, "debe": []})["correcta"])


if __name__ == "__main__":
    unittest.main(verbosity=2)


class Trazabilidad(unittest.TestCase):
    def test_registro_no_guarda_la_pregunta_y_audita(self):
        import tempfile, json, os
        from rag.trace import record, audit
        f = os.path.join(tempfile.mkdtemp(), "t.jsonl")
        e = record(f, "¿secreto?", "visitante", {"recuperados": ["a#0"], "citas": ["a#0"], "no_encontrado": False}, {"a#0": {"version": "2026-09-01"}}, "m")
        self.assertNotIn("secreto", open(f).read()); self.assertEqual(e["versiones"], {"a#0": "2026-09-01"})
        bad = dict(e, citas=["x#9"], citas_inventadas=["x#9"])
        self.assertEqual(audit([e, bad])["cita_fuera_de_lo_recuperado"], 1)

    def test_eval_acepta_respuestas_equivalentes(self):
        caso = {"doc": "horarios", "debe": [], "debe_alguno": ["cerrado", "no abrimos"]}
        self.assertTrue(answer_ok({"respuesta": "No abrimos los sábados", "citas": ["horarios#0"], "no_encontrado": False}, caso)["correcta"])


class Grafo(unittest.TestCase):
    def setUp(self):
        from rag.graph import ChunkGraph
        self.ch = chunk_corpus(load_corpus("corpus"), "heading")
        self.g = ChunkGraph(self.ch)

    def test_aristas_simetricas_y_entre_documentos_distintos(self):
        for a, vec in self.g.adj.items():
            for b in vec:
                self.assertIn(a, self.g.adj[b])
                self.assertNotEqual(self.g.by_id[a].doc_id, self.g.by_id[b].doc_id)

    def test_expand_respeta_k_y_no_duplica(self):
        from rag.graph import expand
        hits = self.ch[:4]
        out = expand(hits, self.g, "¿Cuánto cuesta el desplazamiento?", 4, 2)
        self.assertEqual(len(out), 4); self.assertEqual(len({c.id for c in out}), 4)

    def test_entidades_normaliza_acentos(self):
        from rag.graph import entities
        self.assertIn("garantia", entities("La GARANTÍA cubre")); self.assertIn("senal", entities("la señal"))


class Boveda(unittest.TestCase):
    def test_enlaces_rotos_retroenlaces_y_exclusiones(self):
        from rag.vault import load_vault, report
        docs, links = load_vault("vault"); r = report(docs, links)
        self.assertEqual(r["rotos"], [("cocina-garcia", "proveedor-de-encimeras")])
        self.assertIn("diario", r["retroenlaces"]["cocina-garcia"])
        self.assertFalse(any(".obsidian" in d.meta["ruta"] for d in docs))

    def test_notas_privadas_no_llegan_a_ningun_rol(self):
        from rag.vault import load_vault
        docs, _ = load_vault("vault"); ch = chunk_corpus(docs, "heading")
        for role in ("visitante", "equipo", "rrhh"):
            self.assertFalse(any(c.doc_id == "diario" for c in allowed(ch, role)))
