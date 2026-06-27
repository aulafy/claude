import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
      <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 mb-4">
        404
      </div>
      <h1 className="text-2xl font-bold text-white mb-3">Página no encontrada</h1>
      <p className="text-zinc-400 max-w-md mb-8 leading-relaxed">
        Esta página no existe o se ha movido. Vuelve al inicio o empieza por la
        guía de instalación.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-white font-medium text-sm transition-colors"
        >
          Volver al inicio
        </Link>
        <Link
          href="/recetas"
          className="px-5 py-2.5 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-medium text-sm transition-colors"
        >
          🍳 Ver recetas prácticas
        </Link>
      </div>
    </div>
  );
}
