"""OCR y tablas con datos propios: genera un «escaneo» sintético, lo reconoce con tesseract y mide el error.
Requiere: tesseract, pdftotext (poppler) y Pillow. Uso: python3 run_ocr.py"""
import subprocess, tempfile, os, sys, random
from PIL import Image, ImageDraw, ImageFont, ImageFilter

TEXTO = ["Presupuesto 2026-0142 Estudio Marea Alta", "Fecha: 2026-10-02  Validez: 30 dias", "Instalacion de cocina a medida"]
TABLA = [("Concepto", "Cant.", "Precio", "IVA"), ("Encimera", "1", "1250,00", "21 %"), ("Montaje", "2", "180,50", "21 %"), ("Desplazamiento", "1", "25,00", "21 %")]
FONT = "/System/Library/Fonts/Supplemental/Arial.ttf"

def render(scale=1.0, noise=0, rot=0.0):
    img = Image.new("L", (900, 420), 255); d = ImageDraw.Draw(img); f = ImageFont.truetype(FONT, int(26 * scale))
    y = 20
    for l in TEXTO: d.text((30, y), l, font=f, fill=0); y += 45
    y += 15
    for row in TABLA:
        for x, cell in zip((30, 360, 480, 660), row): d.text((x, y), cell, font=f, fill=0)
        y += 40
    if rot: img = img.rotate(rot, fillcolor=255, resample=Image.BICUBIC)
    if noise:
        px = img.load(); random.seed(7)
        for _ in range(noise):
            px[random.randrange(img.width), random.randrange(img.height)] = random.choice((0, 255))
    return img

def ocr(img, psm=6, pre=False):
    if pre: img = img.resize((img.width * 2, img.height * 2), Image.LANCZOS).filter(ImageFilter.MedianFilter(3)).point(lambda p: 255 if p > 150 else 0)
    with tempfile.TemporaryDirectory() as t:
        p = os.path.join(t, "a.png"); img.save(p)
        return subprocess.run(["tesseract", p, "-", "--psm", str(psm)], capture_output=True, text=True).stdout

def lev(a, b):
    prev = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        cur = [i]
        for j, cb in enumerate(b, 1): cur.append(min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (ca != cb)))
        prev = cur
    return prev[-1]

def cer(got, truth):
    n = lambda s: " ".join(s.split())
    return lev(n(got), n(truth)) / len(n(truth))

TRUTH = "\n".join(TEXTO + ["  ".join(r) for r in TABLA])
CELLS = [c for r in TABLA[1:] for c in r]
if __name__ == "__main__":
    for name, kw in (("limpio", {}), ("rotado 2°", {"rot": 2.0}), ("ruido", {"noise": 4000}), ("rotado+ruido", {"rot": 2.0, "noise": 4000})):
        img = render(**kw)
        for pre in (False, True):
            out = ocr(img, 6, pre)
            hit = sum(c.replace(" ", "") in out.replace(" ", "") for c in CELLS)
            print(f"{name:13s} preproceso={'sí' if pre else 'no'}  CER={cer(out, TRUTH):.3f}  celdas de la tabla recuperadas: {hit}/{len(CELLS)}")
    # el texto español con acentos y el OCR en inglés
    f = ImageFont.truetype(FONT, 28); im = Image.new("L", (900, 80), 255); ImageDraw.Draw(im).text((20, 20), "Garantía de instalación: señal del 30 %", font=f, fill=0)
    print("acentos:", repr(ocr(im, 7).strip()), "(idiomas disponibles: " + subprocess.run(["tesseract", "--list-langs"], capture_output=True, text=True).stdout.split(":", 1)[-1].split()[1:].__str__() + ")")
    # PDF con texto nativo (no escaneado): no hace falta OCR, pdftotext lee el texto directamente
    if subprocess.run(["which", "tectonic"], capture_output=True).returncode == 0:
        with tempfile.TemporaryDirectory() as t:
            rows = "\\\\\n".join(" & ".join(r) for r in TABLA).replace("%", "\\%")
            open(os.path.join(t, "a.tex"), "w").write("\\documentclass{article}\\begin{document}Garant\\'ia de instalaci\\'on: se\\~nal del 30\\%\\\\\n\\begin{tabular}{llll}" + rows + "\\end{tabular}\\end{document}")
            subprocess.run(["tectonic", "-X", "compile", "--outdir", t, os.path.join(t, "a.tex")], capture_output=True)
            txt = subprocess.run(["pdftotext", "-layout", os.path.join(t, "a.pdf"), "-"], capture_output=True, text=True).stdout
            print("PDF nativo (pdftotext -layout): celdas", sum(c.replace(" ", "") in txt.replace(" ", "") for c in CELLS), "/", len(CELLS), "|", txt.splitlines()[0].strip() if txt else "sin texto")
