const fs = require("fs");
const path = require("path");
const Module = require("module");
const ts = require("typescript");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

const root = path.resolve(__dirname, "..");

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

const originalLoad = Module._load;
Module._load = function patchedLoad(request, parent, isMain) {
  if (request === "next/link") {
    return {
      __esModule: true,
      default: ({ href, children, ...props }) =>
        React.createElement("a", { href: String(href || ""), ...props }, children),
    };
  }
  if (request === "@/components/Prompt") {
    return {
      __esModule: true,
      default: ({ children, label }) =>
        React.createElement("div", { "data-prompt": label || "Prompt" }, String(children || "")),
    };
  }
  if (request.startsWith("@/")) {
    return originalLoad.call(this, path.join(root, request.slice(2)), parent, isMain);
  }
  return originalLoad.call(this, request, parent, isMain);
};

const chapters = [
  ["app/page.tsx", "Introducción: ¿Qué es Claude Code?"],
  ["app/instalacion/page.tsx", "Instalación"],
  ["app/primeros-pasos/page.tsx", "Primeros pasos"],
  ["app/donde-usar/page.tsx", "CLI, app de escritorio, web y móvil"],
  ["app/recetas/page.tsx", "Recetas prácticas"],
  ["app/proyectos/page.tsx", "Proyectos guiados"],
  ["app/prompts/page.tsx", "Cómo escribir buenos prompts"],
  ["app/glosario/page.tsx", "Glosario"],
  ["app/pymes/page.tsx", "Claude Code para pymes y oficina"],
  ["app/equipos/page.tsx", "Para perfiles técnicos y equipos"],
  ["app/skills/page.tsx", "Skills"],
  ["app/subagentes/page.tsx", "Subagentes"],
  ["app/plugins/page.tsx", "Plugins"],
  ["app/flujos/page.tsx", "Flujos de trabajo pro"],
  ["app/comandos/page.tsx", "Comandos"],
  ["app/configuracion/page.tsx", "Configuración"],
  ["app/mcp/page.tsx", "Servidores MCP"],
  ["app/hooks/page.tsx", "Hooks"],
  ["app/permisos/page.tsx", "Permisos"],
  ["app/avanzado/page.tsx", "Uso avanzado"],
  ["app/faq/page.tsx", "Preguntas frecuentes"],
  ["app/problemas/page.tsx", "Solución de problemas"],
  ["app/recursos/page.tsx", "Recursos"],
  ["app/comparativa/page.tsx", "Comparativa"],
];

function stripEmoji(s) {
  return s
    .replace(/[\uFE0E\uFE0F\u200D]/g, "")
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(/[\u2600-\u27BF\u{1F000}-\u{1FAFF}]/gu, "")
    .replace(/[✦✓→✕]/g, "")
    .replace(/\s+/g, " ");
}

function tex(s) {
  return stripEmoji(s)
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/&/g, "\\&")
    .replace(/%/g, "\\%")
    .replace(/\$/g, "\\$")
    .replace(/#/g, "\\#")
    .replace(/_/g, "\\_")
    .replace(/\{/g, "\\{")
    .replace(/\}/g, "\\}")
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}");
}

function codeTex(s) {
  return s
    .replace(/\r\n/g, "\n")
    .replace(/[┌┐└┘├┤┬┴┼]/g, "+")
    .replace(/─/g, "-")
    .replace(/│/g, "|")
    .replace(/→/g, "->")
    .replace(/←/g, "<-")
    .replace(/\\end\{Verbatim\}/g, "\\end {Verbatim}");
}

function decode(s) {
  return s
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function parse(html) {
  const rootNode = { type: "root", children: [] };
  const stack = [rootNode];
  const re = /<!--[\s\S]*?-->|<![^>]*>|<\/?([a-zA-Z0-9]+)([^>]*)>|([^<]+)/g;
  let m;
  while ((m = re.exec(html))) {
    if (m[3]) {
      stack[stack.length - 1].children.push({ type: "text", text: decode(m[3]) });
      continue;
    }
    const full = m[0], tag = (m[1] || "").toLowerCase();
    if (!tag) continue;
    if (full.startsWith("</")) {
      while (stack.length > 1 && stack[stack.length - 1].tag !== tag) stack.pop();
      if (stack.length > 1) stack.pop();
    } else {
      const attrs = {};
      (m[2] || "").replace(/([:\w-]+)="([^"]*)"/g, (_, k, v) => (attrs[k] = decode(v)));
      const node = { type: "el", tag, attrs, children: [] };
      stack[stack.length - 1].children.push(node);
      if (!/\/>$/.test(full) && !["br", "img", "input", "meta", "link"].includes(tag)) stack.push(node);
    }
  }
  return rootNode;
}

function textContent(node) {
  if (!node) return "";
  if (node.type === "text") return node.text;
  return (node.children || []).map(textContent).join("");
}

function cleanText(node) {
  return textContent(node).replace(/\s+/g, " ").trim();
}

function inline(node) {
  if (node.type === "text") return tex(node.text);
  const body = (node.children || []).map(inline).join("");
  if (node.tag === "strong" || node.tag === "b") return `\\textbf{${body.trim()}}`;
  if (node.tag === "em" || node.tag === "i") return `\\emph{${body.trim()}}`;
  if (node.tag === "code" || node.tag === "kbd") return `\\texttt{${tex(textContent(node)).trim()}}`;
  if (node.tag === "a") {
    const href = node.attrs.href || "";
    const url = href.startsWith("/") ? `https://claude-rho-snowy.vercel.app${href}` : href;
    if (/^https?:\/\//.test(url)) {
      const shownBody = body.trim();
      const shown = shownBody && shownBody !== tex(url).trim() ? `${shownBody} (\\url{${tex(url).trim()}})` : `\\url{${tex(url).trim()}}`;
      return `\\href{${tex(url)}}{${shown}}`;
    }
    return `\\href{${tex(url).trim()}}{${body.trim() || tex(url).trim()}}`;
  }
  if (node.tag === "br") return "\\\\";
  return body;
}

function hasClass(node, name) {
  return (node.attrs.class || "").split(/\s+/).includes(name);
}

function hasClasses(node, names) {
  return names.every((name) => hasClass(node, name));
}

function shouldSkipBlock(node) {
  if (!node || node.tag !== "div") return false;
  const text = cleanText(node);
  if (hasClasses(node, ["mb-2", "text-xs"]) && /^Inicio\s*\/\s*/.test(text)) return true;
  if (hasClasses(node, ["mt-12", "border-t", "justify-between"])) return true;
  return false;
}

function block(node, ctx = {}) {
  if (node.type === "text") return tex(node.text.trim() ? node.text : "");
  const kids = () => (node.children || []).map((c) => block(c, ctx)).join("");
  if (shouldSkipBlock(node)) return "";
  if (node.attrs && node.attrs["data-prompt"]) {
    return `\\noindent\\textbf{Prompt: ${tex(node.attrs["data-prompt"] === "Prompt" ? "" : node.attrs["data-prompt"])}}\n\\begin{codebox}\n${codeTex(textContent(node).trim())}\n\\end{codebox}\n\n`;
  }
  if (node.tag === "h1") return "";
  if (node.tag === "h2") return `\\section{${tex(cleanText(node))}}\n\n`;
  if (node.tag === "h3") return `\\subsection{${tex(cleanText(node))}}\n\n`;
  if (node.tag === "h4") return `\\subsubsection{${tex(cleanText(node))}}\n\n`;
  if (node.tag === "p") {
    const t = inline(node).trim();
    return t ? `${t}\n\n` : "";
  }
  if (node.tag === "pre") return `\\begin{codebox}\n${codeTex(textContent(node).trim())}\n\\end{codebox}\n\n`;
  if (node.tag === "ul" || node.tag === "ol") {
    const env = node.tag === "ol" ? "enumerate" : "itemize";
    return `\\begin{${env}}\n${(node.children || []).map((c) => block(c, { list: true })).join("")}\\end{${env}}\n\n`;
  }
  if (node.tag === "li") return `\\item ${node.children.map((c) => c.tag === "ul" || c.tag === "ol" ? "\n" + block(c, ctx) : inline(c)).join("").trim()}\n`;
  if (node.tag === "table") return table(node);
  if (node.tag === "div" && hasClass(node, "callout")) {
    let title = hasClass(node, "callout-warning") ? "Atención" : hasClass(node, "callout-tip") ? "Consejo" : "Nota";
    return `\\begin{calloutbox}{${title}}\n${kids()}\\end{calloutbox}\n\n`;
  }
  if (node.tag === "button" || node.tag === "svg") return "";
  return kids();
}

function table(node) {
  const rows = [];
  function walk(n) {
    if (n.tag === "tr") rows.push((n.children || []).filter(c => c.tag === "td" || c.tag === "th").map(c => inline(c).trim()));
    (n.children || []).forEach(walk);
  }
  walk(node);
  if (!rows.length) return "";
  const cols = Math.max(...rows.map(r => r.length));
  const spec = Array(cols).fill("p{0.28\\textwidth}").join("");
  const body = rows.map((r, i) => `${r.concat(Array(cols).fill("")).slice(0, cols).join(" & ")} \\\\${i === 0 ? "\\midrule" : ""}`).join("\n");
  return `\\begin{longtable}{${spec}}\n\\toprule\n${body}\n\\bottomrule\n\\end{longtable}\n\n`;
}

function renderChapter(file, title) {
  const mod = require(path.join(root, file));
  const Component = mod.default;
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(Component));
  return `\\chapter{${tex(title)}}\n\n${block(parse(html))}`;
}

const preamble = String.raw`\documentclass[11pt,a4paper]{report}
\usepackage[a4paper,margin=2.5cm]{geometry}
\usepackage{xcolor}
\definecolor{accent}{HTML}{C2410C}
\definecolor{codebg}{HTML}{F4F4F5}
\definecolor{calloutbg}{HTML}{FFF7ED}
\usepackage{microtype}
\usepackage{titlesec}
\usepackage{fancyhdr}
\usepackage{hyperref}
\usepackage{bookmark}
\usepackage{booktabs}
\usepackage{longtable}
\usepackage{array}
\usepackage{enumitem}
\usepackage[most]{tcolorbox}
\usepackage{fvextra}
\hypersetup{colorlinks=true,linkcolor=accent,urlcolor=accent,citecolor=accent}
\titleformat{\chapter}[display]{\Huge\bfseries\color{accent}}{\chaptertitlename\ \thechapter}{12pt}{}
\titleformat{\section}{\Large\bfseries\color{accent}}{\thesection}{0.75em}{}
\titleformat{\subsection}{\large\bfseries\color{accent}}{\thesubsection}{0.75em}{}
\pagestyle{fancy}
\fancyhf{}
\fancyhead[L]{\nouppercase{\leftmark}}
\fancyhead[R]{Aprende Claude Code}
\fancyfoot[C]{\thepage}
\renewcommand{\headrulewidth}{0.4pt}
\setlength{\headheight}{14pt}
\setlist{itemsep=0.25em,topsep=0.4em}
\newtcolorbox{calloutbox}[1]{colback=calloutbg,colframe=accent,title=\textbf{#1},arc=1mm,boxrule=0.6pt,left=2mm,right=2mm,top=1mm,bottom=1mm}
\DefineVerbatimEnvironment{codebox}{Verbatim}{frame=single,framerule=0.6pt,rulecolor=\color{accent!45},framesep=7pt,breaklines=true,breakanywhere=true,fontsize=\small,xleftmargin=2mm,xrightmargin=2mm}
\begin{document}
\begin{titlepage}
\centering
\vspace*{3cm}
{\Huge\bfseries\color{accent} Aprende Claude Code\par}
\vspace{0.8cm}
{\Large Guía completa en español · 2026\par}
\vspace{1.2cm}
{\large claude-rho-snowy.vercel.app\par}
\vfill
Este contenido se publica bajo licencia Creative Commons (CC BY 4.0). Puedes compartirlo y adaptarlo citando la fuente.
\end{titlepage}
\tableofcontents
\clearpage
`;

const ending = String.raw`\chapter{Sugerencias y contacto}

Si tienes sugerencias, dudas o quieres proponer mejoras para esta guía, puedes escribir a \href{mailto:contacto@aulafy.net}{contacto@aulafy.net}.

Este contenido se publica bajo licencia Creative Commons (CC BY 4.0). Puedes compartirlo y adaptarlo citando la fuente.

\end{document}
`;

const out = preamble + chapters.map(([file, title]) => renderChapter(file, title)).join("\n") + ending;
fs.writeFileSync(path.join(__dirname, "guia-claude-code.tex"), out.replace(/\n{4,}/g, "\n\n\n"));
console.log("Wrote pdf/guia-claude-code.tex");
