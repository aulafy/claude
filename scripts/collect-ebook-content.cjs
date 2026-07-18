const fs = require("fs");
const path = require("path");
const Module = require("module");
const ts = require("typescript");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "tmp", "ebook");
fs.mkdirSync(outDir, { recursive: true });

require.extensions[".tsx"] = function compileTsx(module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
      target: ts.ScriptTarget.ES2022,
      baseUrl: root,
      paths: { "@/*": ["*"] },
    },
    fileName: filename,
  }).outputText;
  module._compile(output, filename);
};

require.extensions[".ts"] = function compileTs(module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      esModuleInterop: true,
      target: ts.ScriptTarget.ES2022,
      baseUrl: root,
      paths: { "@/*": ["*"] },
    },
    fileName: filename,
  }).outputText;
  module._compile(output, filename);
};

const originalLoad = Module._load;
Module._load = function patchedLoad(request, parent, isMain) {
  if (request === "next/link") {
    return {
      __esModule: true,
      default: ({ href, children, ...props }) =>
        React.createElement("a", { href: String(href || ""), ...props }, children),
    };
  }
  if (request === "next/navigation") {
    return { notFound: () => null };
  }
  if (request.startsWith("@/")) {
    return originalLoad.call(this, path.join(root, request.slice(2)), parent, isMain);
  }
  return originalLoad.call(this, request, parent, isMain);
};

function decodeHtml(s) {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function stripTags(s) {
  return decodeHtml(s.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function extractBlocks(html) {
  const blocks = [];
  const re = /<(h2|h3|p|li|pre|strong)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/g;
  let m;
  while ((m = re.exec(html))) {
    const tag = m[1];
    let text = stripTags(m[2]);
    if (!text) continue;
    if (/^(Cursos|Inicio|Copiar|Copiado|Anterior|Siguiente)$/i.test(text)) continue;
    if (/^(Objetivos de aprendizaje|Idea clave\.|Cuidado\.|Comprueba que funciona\.|Guardar y reabrir el proyecto\.)$/.test(text)) continue;
    if (tag === "pre") {
      text = decodeHtml(m[2].replace(/<[^>]+>/g, "")).trim();
      blocks.push({ type: "code", text });
    } else if (tag === "h2") {
      blocks.push({ type: "h2", text });
    } else if (tag === "h3") {
      blocks.push({ type: "h3", text });
    } else if (tag === "li") {
      blocks.push({ type: "bullet", text });
    } else if (tag === "p") {
      blocks.push({ type: "p", text });
    }
  }
  const compact = [];
  for (const block of blocks) {
    const prev = compact[compact.length - 1];
    if (prev && prev.type === block.type && prev.text === block.text) continue;
    compact.push(block);
  }
  return compact.slice(0, 80);
}

function getPageComponent(file) {
  const mod = require(path.join(root, file));
  return mod.default || mod;
}

function renderComponent(Component, props = {}) {
  try {
    const html = ReactDOMServer.renderToStaticMarkup(React.createElement(Component, props));
    return extractBlocks(html);
  } catch (error) {
    return [{ type: "p", text: `No se pudo extraer automaticamente esta leccion: ${error.message}` }];
  }
}

function render(file) {
  return renderComponent(getPageComponent(file));
}

const generatedLessonComponents = {
  "crear-webs-con-ia": "components/WebAiLessonPage.tsx",
  "ia-desde-cero": "components/IaBasicsLessonPage.tsx",
};

function renderLesson(courseSlug, lesson) {
  const directPage = `app/cursos/${courseSlug}/${lesson.slug}/page.tsx`;
  if (fs.existsSync(path.join(root, directPage))) return render(directPage);

  const componentFile = generatedLessonComponents[courseSlug];
  if (componentFile) return renderComponent(getPageComponent(componentFile), { slug: lesson.slug });

  return [{ type: "p", text: "No se pudo extraer automaticamente esta leccion." }];
}

const { cursos, lecciones } = require(path.join(root, "lib", "cursos.ts"));

const ebook = {
  title: "Aulafy: Inteligencia Artificial Open Source",
  subtitle: "Manual practico para aprender, construir y automatizar con IA",
  updated: "Julio 2026",
  url: "https://aulafy.net",
  courses: cursos.map((course) => ({
    slug: course.slug,
    title: course.title,
    short: course.short,
    desc: course.desc,
    level: course.level,
    lessons: lecciones(course).map((lesson) => ({
      slug: lesson.slug,
      title: lesson.title,
      href: `/cursos/${course.slug}/${lesson.slug}`,
      blocks: renderLesson(course.slug, lesson),
    })),
  })),
};

fs.writeFileSync(path.join(outDir, "ebook-content.json"), JSON.stringify(ebook, null, 2));
console.log(`Wrote ${path.join(outDir, "ebook-content.json")} with ${ebook.courses.length} courses`);
