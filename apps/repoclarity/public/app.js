const state = {
  data: null,
  active: null,
  filter: "",
  demoActive: false,
  activeDecisionIndex: null,
};

const els = {
  nav: document.querySelector("#projectNav"),
  filter: document.querySelector("#filterInput"),
  metrics: document.querySelector("#metricsGrid"),
  betaModeTag: document.querySelector("#betaModeTag"),
  demoMode: document.querySelector("#demoModeBtn"),
  exportFocus: document.querySelector("#exportFocusBtn"),
  exportDecisions: document.querySelector("#exportDecisionsBtn"),
  openFeedback: document.querySelector("#openFeedbackBtn"),
  betaStatus: document.querySelector("#betaStatus"),
  feedbackPanel: document.querySelector("#feedbackPanel"),
  feedbackForm: document.querySelector("#feedbackForm"),
  feedbackScore: document.querySelector("#feedbackScore"),
  feedbackAction: document.querySelector("#feedbackAction"),
  feedbackRepos: document.querySelector("#feedbackRepos"),
  feedbackFriction: document.querySelector("#feedbackFriction"),
  feedbackComment: document.querySelector("#feedbackComment"),
  closeFeedback: document.querySelector("#closeFeedbackBtn"),
  focusBrief: document.querySelector("#focusBrief"),
  pymeScore: document.querySelector("#pymeScore"),
  pymePosture: document.querySelector("#pymePosture"),
  pymeSummary: document.querySelector("#pymeSummary"),
  pymePrinciple: document.querySelector("#pymePrinciple"),
  pymeDimensions: document.querySelector("#pymeDimensions"),
  pymePlaybooks: document.querySelector("#pymePlaybooks"),
  pymeWorkshop: document.querySelector("#pymeWorkshop"),
  exportPyme: document.querySelector("#exportPymeBtn"),
  decisionSummary: document.querySelector("#decisionSummary"),
  decisionList: document.querySelector("#decisionList"),
  decisionTabs: document.querySelectorAll(".decision-tab"),
  projectName: document.querySelector("#projectName"),
  projectTag: document.querySelector("#projectTag"),
  projectSummary: document.querySelector("#projectSummary"),
  projectAlias: document.querySelector("#projectAlias"),
  projectFiles: document.querySelector("#projectFiles"),
  projectNodes: document.querySelector("#projectNodes"),
  projectEdges: document.querySelector("#projectEdges"),
  originalPath: document.querySelector("#originalPath"),
  mirrorPath: document.querySelector("#mirrorPath"),
  labelChart: document.querySelector("#labelChart"),
  edgeChart: document.querySelector("#edgeChart"),
  topFiles: document.querySelector("#topFiles"),
  refresh: document.querySelector("#refreshBtn"),
  form: document.querySelector("#codeSearchForm"),
  codeSearch: document.querySelector("#codeSearchInput"),
  searchResults: document.querySelector("#searchResults"),
  fusionSummary: document.querySelector("#fusionSummary"),
  fusionList: document.querySelector("#fusionList"),
  marketSummary: document.querySelector("#marketSummary"),
  opportunityList: document.querySelector("#opportunityList"),
  githubSummary: document.querySelector("#githubSummary"),
  githubFilter: document.querySelector("#githubFilter"),
  githubStatus: document.querySelector("#githubStatus"),
  githubRepos: document.querySelector("#githubRepos"),
  drawerBackdrop: document.querySelector("#drawerBackdrop"),
  decisionDrawer: document.querySelector("#decisionDrawer"),
  closeDrawer: document.querySelector("#closeDrawerBtn"),
  drawerTitle: document.querySelector("#drawerTitle"),
  drawerAction: document.querySelector("#drawerAction"),
  drawerConfidence: document.querySelector("#drawerConfidence"),
  drawerRationale: document.querySelector("#drawerRationale"),
  drawerEvidence: document.querySelector("#drawerEvidence"),
  drawerContext: document.querySelector("#drawerContext"),
  drawerNextSteps: document.querySelector("#drawerNextSteps"),
  exportSingleDecision: document.querySelector("#exportSingleDecisionBtn"),
  copyDecision: document.querySelector("#copyDecisionBtn"),
};
let activeDecisionAction = "all";

const fmt = new Intl.NumberFormat("es-ES");
const sizeFmt = (bytes) => {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** i).toFixed(i ? 1 : 0)} ${units[i]}`;
};

function slug(text) {
  return String(text || "repoclarity")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function stamp() {
  return new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
}

function downloadText(filename, text, type = "text/plain") {
  const blob = new Blob([text], { type: `${type};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function showBetaStatus(message, tone = "") {
  els.betaStatus.textContent = message;
  els.betaStatus.dataset.tone = tone;
}

function chipList(items, empty = "Sin datos relacionados.") {
  const clean = (items || []).filter(Boolean).slice(0, 12);
  return clean.length ? clean.map((item) => `<span>${item}</span>`).join("") : `<span>${empty}</span>`;
}

async function loadData() {
  const res = await fetch("./data/projects.json", { cache: "no-store" });
  state.data = await res.json();
  state.active = state.data.projects[0];
  render();
}

function filteredProjects() {
  const q = state.filter.toLowerCase().trim();
  if (!q) return state.data.projects;
  return state.data.projects.filter((project) =>
    [project.name, project.alias, project.reason, project.summary, project.originalPath].join(" ").toLowerCase().includes(q),
  );
}

function renderMetrics() {
  const totals = state.data.totals;
  const gh = state.data.githubTotals || {};
  if (els.feedbackRepos) els.feedbackRepos.value = totals.projects || 0;
  if (els.betaModeTag) els.betaModeTag.textContent = state.demoActive ? "demo activo" : "demo local";
  const cards = [
    ["Proyectos", totals.projects],
    ["Repos GitHub", gh.total || 0],
    ["Nodos", totals.nodes],
    ["Relaciones", totals.edges],
    ["Clonados", gh.cloned || 0],
    ["Espejos", sizeFmt(totals.sizeBytes)],
  ];
  els.metrics.innerHTML = cards.map(([label, value]) => `<div class="metric"><span>${label}</span><strong>${typeof value === "number" ? fmt.format(value) : value}</strong></div>`).join("");
}

function renderNav() {
  const projects = filteredProjects();
  els.nav.innerHTML = projects
    .map(
      (project) => `
        <button class="project-button ${state.active?.name === project.name ? "is-active" : ""}" data-name="${project.name}" type="button">
          <span><strong>${project.name}</strong><small>${project.reason}</small></span>
          <em>${fmt.format(project.metrics.nodes || 0)}</em>
        </button>
      `,
    )
    .join("");
  els.nav.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.active = state.data.projects.find((project) => project.name === button.dataset.name);
      els.searchResults.innerHTML = "";
      render();
    });
  });
}

function renderBars(target, rows, nameKey = "label") {
  const max = Math.max(1, ...rows.map((row) => row.count));
  target.innerHTML = rows.length
    ? rows
        .map(
          (row) => `
          <div class="bar-row">
            <span>${row[nameKey]}</span>
            <div class="bar-track"><div class="bar-fill" style="width:${Math.max(4, (row.count / max) * 100)}%"></div></div>
            <strong>${fmt.format(row.count)}</strong>
          </div>
        `,
        )
        .join("")
    : `<div class="file-row"><span>Sin datos indexados para esta categoría.</span></div>`;
}

function renderProject() {
  const project = state.active;
  els.projectName.textContent = project.name;
  els.projectTag.textContent = project.reason;
  els.projectSummary.textContent = project.summary || "Sin resumen README disponible.";
  els.projectAlias.textContent = project.alias;
  els.projectFiles.textContent = fmt.format(project.metrics.indexed_files || 0);
  els.projectNodes.textContent = fmt.format(project.metrics.nodes || 0);
  els.projectEdges.textContent = fmt.format(project.metrics.edges || 0);
  els.originalPath.textContent = project.originalPath;
  els.mirrorPath.textContent = project.mirrorPath;
  renderBars(els.labelChart, project.labels, "label");
  renderBars(els.edgeChart, project.edgeTypes, "type");
  els.topFiles.innerHTML = project.topFiles.length
    ? project.topFiles
        .map((file) => `<div class="file-row"><strong>${file.file}</strong><span>${fmt.format(file.nodes)} nodos</span></div>`)
        .join("")
    : `<div class="file-row"><span>No hay hotspots disponibles.</span></div>`;
}

function render() {
  renderMetrics();
  renderFocusBrief();
  renderPymeReadiness();
  renderDecisions();
  renderNav();
  renderProject();
  renderGithub();
  renderFusion();
  renderOpportunities();
}

function buildFocusBriefText() {
  const totals = state.data.totals || {};
  const gh = state.data.githubTotals || {};
  const radar = state.data.pymeReadiness;
  const focus = state.data.focusBrief || [];
  const topDecisions = (state.data.decisions || []).slice(0, 8);
  const opportunities = (state.data.opportunities || []).slice(0, 6);

  const lines = [
    "RepoClarity - Focus Brief beta",
    `Generated: ${new Date().toISOString()}`,
    "",
    "Portfolio snapshot",
    `- Projects indexed: ${totals.projects || 0}`,
    `- GitHub repos: ${gh.total || 0} (${gh.private || 0} private, ${gh.public || 0} public)`,
    `- Structural nodes: ${totals.nodes || 0}`,
    `- Structural edges: ${totals.edges || 0}`,
    ...(radar ? [`- PYME AI transition score: ${radar.score}/100 (${radar.posture})`] : []),
    "",
    "Top focus actions",
    ...focus.flatMap((item, index) => [
      "",
      `${index + 1}. ${item.title} [${item.priority}]`,
      `   Action: ${item.action}`,
      `   Why: ${item.summary}`,
      `   Next: ${item.nextStep}`,
    ]),
    "",
    "Decision Cards to review first",
    ...topDecisions.flatMap((item, index) => [
      "",
      `${index + 1}. ${item.target}`,
      `   Recommendation: ${item.action}`,
      `   Confidence: ${item.confidence}`,
      `   Rationale: ${item.rationale}`,
      `   Evidence: ${(item.evidence || []).join(" | ") || "n/a"}`,
    ]),
    "",
    "Product opportunities",
    ...opportunities.flatMap((item, index) => [
      "",
      `${index + 1}. ${item.title}`,
      `   Recommendation: ${item.recommendation}`,
      `   Score: ${item.score}`,
      `   Build: ${item.build}`,
      `   Programmer value: ${item.programmerUse}`,
    ]),
    "",
    "Beta question",
    "Which recommendation made you change what you would build, merge or archive this week?",
    "",
  ];
  return lines.join("\n");
}

function buildDecisionMarkdown() {
  const decisions = state.data.decisions || [];
  const groups = decisions.reduce((acc, item) => {
    const key = item.action || "unknown";
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});
  const groupOrder = ["build", "merge/reuse", "differentiate", "archive", "audit", "research-first"];
  const totals = state.data.totals || {};
  const lines = [
    "# RepoClarity Decision Cards",
    "",
    `Generated: ${new Date().toISOString()}`,
    `Portfolio: ${totals.projects || 0} projects, ${fmt.format(totals.nodes || 0)} structural nodes, ${fmt.format(totals.edges || 0)} relationships.`,
    "",
    "## Executive Summary",
    "",
    ...(state.data.focusBrief || []).map((item) => `- **${item.priority} ${item.title}**: ${item.nextStep}`),
    "",
  ];

  for (const action of groupOrder) {
    const items = groups[action] || [];
    if (!items.length) continue;
    lines.push(`## ${action}`, "");
    for (const item of items) {
      lines.push(`### ${item.target}`);
      lines.push("");
      lines.push(`- Recommendation: ${item.action}`);
      lines.push(`- Confidence: ${item.confidence}`);
      lines.push(`- Rationale: ${item.rationale}`);
      if ((item.evidence || []).length) {
        lines.push("- Evidence:");
        item.evidence.forEach((line) => lines.push(`  - ${line}`));
      }
      lines.push("");
    }
  }

  lines.push("## Next Actions", "");
  lines.push("1. Pick the top Build card and define a 7-day validation sprint.");
  lines.push("2. Merge or archive the strongest duplicate cluster before starting a new repo.");
  lines.push("3. Compare the strongest opportunity against the listed OSS benchmark before adding features.");
  lines.push("4. Export this report again after the next indexing run.");
  lines.push("");
  return lines.join("\n");
}

function buildPymeReportText() {
  const radar = state.data.pymeReadiness;
  if (!radar) return "RepoClarity - AI Transition Radar\n\nSin datos PYME disponibles.\n";
  const lines = [
    `RepoClarity - ${radar.title}`,
    `Generated: ${new Date().toISOString()}`,
    "",
    "Resumen ejecutivo",
    `Score: ${radar.score}/100`,
    `Postura recomendada: ${radar.posture}`,
    radar.summary,
    "",
    "Principio operativo",
    radar.principle,
    "",
    "Dimensiones de riesgo",
    ...(radar.dimensions || []).flatMap((item, index) => [
      "",
      `${index + 1}. ${item.title}`,
      `   Score: ${item.score}/100`,
      `   Riesgo: ${item.risk}`,
      `   Por que importa: ${item.why}`,
      `   Checks: ${(item.checks || []).join(" | ")}`,
      `   Recomendacion: ${item.recommendation}`,
    ]),
    "",
    "Playbooks de software recomendado",
    ...(radar.playbooks || []).flatMap((item, index) => [
      "",
      `${index + 1}. ${item.title}`,
      `   Fit: ${item.fit}`,
      `   Construir: ${item.build}`,
      `   Salvaguardas: ${(item.safeguards || []).join(" | ")}`,
    ]),
    "",
    "Workshop inicial",
    ...(radar.firstWorkshop || []).map((item, index) => `${index + 1}. ${item}`),
    "",
    "Regla de oro",
    "No dar acceso de escritura a IA sobre sistemas legacy hasta tener backups probados, usuarios de minimo privilegio, logs auditables, rollback y aprobacion humana.",
    "",
  ];
  return lines.join("\n");
}

function exportPymeReport() {
  if (!state.data) return;
  downloadText(`repoclarity-pyme-ai-transition-radar-${stamp()}.txt`, buildPymeReportText());
  showBetaStatus("Informe PYME exportado: buen entregable para una primera reunion tecnica.", "success");
}

function showFeedbackPanel(scroll = true) {
  els.feedbackPanel.classList.remove("is-hidden");
  if (scroll) els.feedbackPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function exportFocusBrief() {
  if (!state.data) return;
  downloadText(`repoclarity-focus-brief-${stamp()}.txt`, buildFocusBriefText());
  showBetaStatus("Focus Brief exportado. El siguiente paso es pedir feedback real sobre utilidad.", "success");
  showFeedbackPanel(false);
}

function exportDecisionCards() {
  if (!state.data) return;
  downloadText(`repoclarity-decision-cards-${stamp()}.md`, buildDecisionMarkdown(), "text/markdown");
  showBetaStatus("Decision Cards exportadas con evidencia y acciones. Buen material para beta calls.", "success");
  showFeedbackPanel(false);
}

function startDemoMode() {
  if (!state.data) return;
  state.demoActive = true;
  state.filter = "";
  activeDecisionAction = "all";
  els.filter.value = "";
  els.githubFilter.value = "";
  els.githubStatus.value = "all";
  els.decisionTabs.forEach((button) => button.classList.toggle("is-active", button.dataset.action === "all"));
  state.active = state.data.projects.find((project) => ["github-hublab", "github-lexia", "github-oposito"].includes(project.name)) || state.data.projects[0];
  render();
  showBetaStatus("Demo cargada: empieza por Focus Brief, luego Decision Cards y export.", "success");
  document.querySelector(".focus-panel").scrollIntoView({ behavior: "smooth", block: "start" });
}

function buildFeedbackText() {
  const topDecision = (state.data.decisions || [])[0];
  return [
    "RepoClarity - beta feedback",
    `Generated: ${new Date().toISOString()}`,
    "",
    `Utility score: ${els.feedbackScore.value}/5`,
    `Likely action: ${els.feedbackAction.value}`,
    `Repos connected: ${els.feedbackRepos.value || 0}`,
    `Main friction: ${els.feedbackFriction.value || "n/a"}`,
    "",
    "Comment",
    els.feedbackComment.value || "n/a",
    "",
    "Context",
    `Top visible decision: ${topDecision?.target || "n/a"}`,
    `Top recommendation: ${topDecision?.action || "n/a"}`,
    `Total decisions: ${(state.data.decisions || []).length}`,
    "",
  ].join("\n");
}

function saveFeedback(event) {
  event.preventDefault();
  const text = buildFeedbackText();
  localStorage.setItem("repoclarity:lastFeedback", text);
  downloadText(`repoclarity-beta-feedback-${stamp()}.txt`, text);
  showBetaStatus("Feedback guardado localmente y descargado como TXT.", "success");
}

function findRelatedOpportunity(item) {
  return (state.data.opportunities || []).find((opportunity) => opportunity.title === item.target);
}

function findRelatedFusion(item) {
  if (item.action !== "merge/reuse") return null;
  return (state.data.graph?.fusionCandidates || []).find((candidate) => `${candidate.a} <-> ${candidate.b}` === item.target);
}

function findRelatedRepo(item) {
  return (state.data.githubRepos || []).find((repo) => repo.fullName === item.target);
}

function nextStepsForDecision(item) {
  const action = item.action || "audit";
  const opportunity = findRelatedOpportunity(item);
  const topExternal = opportunity?.externalRepos?.[0]?.fullName || "benchmark OSS principal";
  if (action === "build") {
    return [
      "Define un sprint de validacion de 7 dias con una sola promesa de usuario.",
      `Compara el flujo central contra ${topExternal} y escribe el diferencial antes de programar mas.`,
      "Selecciona 3 repos internos como base y congela el resto durante el sprint.",
      "Graba una demo de 90 segundos y enseñala a 5 builders con repos reales.",
    ];
  }
  if (action === "merge/reuse") {
    return [
      "Abre ambos repos y confirma si el solape es producto, UI, dependencias o solo stack comun.",
      "Extrae la parte comun a un paquete interno o carpeta shared antes de tocar funcionalidades.",
      "Elige un repo canonico y marca el otro como fuente de piezas, no como producto activo.",
      "Reindexa despues de fusionar para comprobar que baja la duplicacion.",
    ];
  }
  if (action === "archive") {
    return [
      "Haz una revision de 5 minutos: README, ultimo commit y si contiene alguna pieza reutilizable.",
      "Si no hay pieza clara, archivarlo en GitHub y sacarlo del roadmap activo.",
      "Si hay una pieza util, crear issue de extraccion y despues archivar.",
      "No iniciar ningun repo nuevo hasta cerrar esta decision.",
    ];
  }
  if (action === "audit") {
    return [
      "Ejecuta una indexacion dedicada excluyendo builds, vendors y artefactos grandes.",
      "Revisa hotspots de archivos y dependencias antes de decidir build o archive.",
      "Busca equivalentes OSS por nombre, descripcion y dependencias principales.",
      "Vuelve a generar Decision Cards cuando el indice estructural sea completo.",
    ];
  }
  return [
    "Investiga el benchmark externo mas fuerte antes de crear nuevas features.",
    "Escribe una hipotesis de diferenciacion que no dependa solo de UI.",
    "Valida la hipotesis con 3 usuarios del nicho antes de construir.",
    "Reclasifica como Build, Merge o Archive al terminar la investigacion.",
  ];
}

function contextForDecision(item) {
  const opportunity = findRelatedOpportunity(item);
  if (opportunity) {
    return `
      <div class="context-block">
        <strong>Tus piezas internas</strong>
        <div class="decision-evidence">${chipList(opportunity.internalRepos)}</div>
      </div>
      <div class="context-block">
        <strong>Benchmarks open source</strong>
        <div class="decision-evidence">${chipList((opportunity.externalRepos || []).map((repo) => `${repo.fullName} · ${fmt.format(repo.stars)} stars`))}</div>
      </div>
      <div class="context-stats">
        <span>score ${opportunity.score}</span>
        <span>fuerza interna ${opportunity.internalStrength}</span>
        <span>presion mercado ${opportunity.marketPressure}</span>
      </div>
    `;
  }

  const fusion = findRelatedFusion(item);
  if (fusion) {
    return `
      <div class="context-block">
        <strong>Dependencias comunes</strong>
        <div class="decision-evidence">${chipList(fusion.commonDeps)}</div>
      </div>
      <div class="context-block">
        <strong>Simbolos comunes</strong>
        <div class="decision-evidence">${chipList(fusion.commonSymbols)}</div>
      </div>
      <div class="context-block">
        <strong>Archivos/patrones comunes</strong>
        <div class="decision-evidence">${chipList(fusion.commonFiles)}</div>
      </div>
    `;
  }

  const repo = findRelatedRepo(item);
  if (repo) {
    return `
      <div class="context-stats">
        <span>${repo.visibility.toLowerCase()}</span>
        <span>${repo.status}</span>
        <span>${fmt.format(repo.diskUsage)} KB</span>
        <span>${repo.indexedFiles || 0} archivos indexados</span>
      </div>
      <div class="context-block">
        <strong>Repositorio</strong>
        <div class="decision-evidence">${chipList([repo.fullName, repo.url, repo.description || repo.updatedAt])}</div>
      </div>
    `;
  }

  return `<div class="context-block"><div class="decision-evidence"><span>Sin contexto adicional en el indice actual.</span></div></div>`;
}

function decisionMarkdown(item) {
  const steps = nextStepsForDecision(item);
  return [
    `# Decision Card: ${item.target}`,
    "",
    `Recommendation: ${item.action}`,
    `Confidence: ${item.confidence}`,
    "",
    "## Rationale",
    item.rationale,
    "",
    "## Evidence",
    ...((item.evidence || []).length ? item.evidence.map((line) => `- ${line}`) : ["- n/a"]),
    "",
    "## Next steps",
    ...steps.map((step, index) => `${index + 1}. ${step}`),
    "",
  ].join("\n");
}

function openDecisionDrawer(index) {
  const item = (state.data.decisions || [])[index];
  if (!item) return;
  state.activeDecisionIndex = index;
  els.drawerTitle.textContent = item.target;
  els.drawerAction.textContent = item.action;
  els.drawerAction.className = `decision-action ${actionClass(item.action)}`;
  els.drawerConfidence.textContent = `confianza ${item.confidence}`;
  els.drawerRationale.textContent = item.rationale;
  els.drawerEvidence.innerHTML = chipList(item.evidence || []);
  els.drawerContext.innerHTML = contextForDecision(item);
  els.drawerNextSteps.innerHTML = nextStepsForDecision(item).map((step) => `<li>${step}</li>`).join("");
  els.decisionDrawer.classList.remove("is-hidden");
  els.drawerBackdrop.classList.remove("is-hidden");
}

function closeDecisionDrawer() {
  els.decisionDrawer.classList.add("is-hidden");
  els.drawerBackdrop.classList.add("is-hidden");
}

function exportSingleDecision(index = state.activeDecisionIndex) {
  const item = (state.data.decisions || [])[index];
  if (!item) return;
  downloadText(`repoclarity-card-${slug(item.target)}-${stamp()}.md`, decisionMarkdown(item), "text/markdown");
  showBetaStatus(`Decision Card exportada: ${item.target}`, "success");
}

async function copyDecisionSummary() {
  const item = (state.data.decisions || [])[state.activeDecisionIndex];
  if (!item) return;
  const text = decisionMarkdown(item);
  if (globalThis.navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      showBetaStatus(`Resumen copiado: ${item.target}`, "success");
      return;
    } catch {
      // Fall back to a download when clipboard permissions are unavailable.
    }
  }
  downloadText(`repoclarity-card-${slug(item.target)}-${stamp()}.md`, text, "text/markdown");
  showBetaStatus("El navegador no permitio copiar; descargue la card en Markdown.", "success");
}

function renderFocusBrief() {
  const items = state.data.focusBrief || [];
  els.focusBrief.innerHTML = items.map((item) => `
    <article class="focus-card">
      <header>
        <h4>${item.title}</h4>
        <span class="priority-pill">${item.priority}</span>
      </header>
      <p>${item.summary}</p>
      <div class="decision-evidence">
        <span>${item.action}</span>
        <span>${item.nextStep}</span>
      </div>
    </article>
  `).join("");
}

function riskClass(risk) {
  return String(risk || "medio").toLowerCase().replace(/\s+/g, "-");
}

function renderPymeReadiness() {
  const radar = state.data.pymeReadiness;
  if (!radar) return;
  els.pymeScore.textContent = radar.score;
  els.pymePosture.textContent = radar.posture;
  els.pymeSummary.textContent = radar.summary;
  els.pymePrinciple.textContent = radar.principle;
  els.pymeDimensions.innerHTML = (radar.dimensions || []).map((item) => `
    <article class="pyme-dimension">
      <header>
        <div>
          <h4>${item.title}</h4>
          <span class="risk-pill ${riskClass(item.risk)}">${item.risk}</span>
        </div>
        <strong>${item.score}</strong>
      </header>
      <div class="score-track"><div class="score-fill" style="width:${Math.max(4, Math.min(100, item.score))}%"></div></div>
      <p>${item.why}</p>
      <div class="decision-evidence">${chipList(item.checks)}</div>
      <small>${item.recommendation}</small>
    </article>
  `).join("");
  els.pymePlaybooks.innerHTML = (radar.playbooks || []).map((item) => `
    <article class="pyme-playbook">
      <header>
        <h4>${item.title}</h4>
        <span class="tag">${item.fit}</span>
      </header>
      <p>${item.build}</p>
      <div class="decision-evidence">${chipList(item.safeguards)}</div>
    </article>
  `).join("");
  els.pymeWorkshop.innerHTML = (radar.firstWorkshop || []).map((item) => `<li>${item}</li>`).join("");
}

function actionClass(action) {
  return action.replace("/", "-").replace(/\s+/g, "-");
}

function renderDecisions() {
  const decisions = state.data.decisions || [];
  const filtered = activeDecisionAction === "all" ? decisions : decisions.filter((item) => item.action === activeDecisionAction);
  els.decisionSummary.textContent = `${decisions.length} decisiones`;
  els.decisionList.innerHTML = filtered.slice(0, 36).map((item) => {
    const decisionIndex = decisions.indexOf(item);
    return `
      <article class="decision-card">
        <header>
          <h4>${item.target}</h4>
          <span class="decision-action ${actionClass(item.action)}">${item.action}</span>
        </header>
        <p>${item.rationale}</p>
        <div class="opportunity-meta">
          <span>confianza ${item.confidence}</span>
        </div>
        <div class="decision-evidence">
          ${(item.evidence || []).slice(0, 8).map((line) => `<span>${line}</span>`).join("")}
        </div>
        <div class="decision-card-actions">
          <button class="open-decision-btn primary-button" type="button" data-index="${decisionIndex}">Ver evidencia</button>
          <button class="export-decision-btn" type="button" data-index="${decisionIndex}">Exportar</button>
        </div>
      </article>
    `;
  }).join("");
  els.decisionList.querySelectorAll(".open-decision-btn").forEach((button) => {
    button.addEventListener("click", () => openDecisionDrawer(Number(button.dataset.index)));
  });
  els.decisionList.querySelectorAll(".export-decision-btn").forEach((button) => {
    button.addEventListener("click", () => exportSingleDecision(Number(button.dataset.index)));
  });
}

function renderGithub() {
  const gh = state.data.githubTotals || {};
  els.githubSummary.textContent = `${gh.private || 0} privados · ${gh.public || 0} públicos`;
  const q = (els.githubFilter.value || "").toLowerCase().trim();
  const status = els.githubStatus.value || "all";
  const repos = (state.data.githubRepos || []).filter((repo) => {
    const matchesText = !q || [repo.fullName, repo.description, repo.visibility, repo.status].join(" ").toLowerCase().includes(q);
    const matchesStatus = status === "all" || repo.status === status || repo.visibility === status;
    return matchesText && matchesStatus;
  });
  els.githubRepos.innerHTML = repos
    .map(
      (repo) => `
      <div class="repo-row">
        <strong>${repo.fullName}</strong>
        <span>${repo.visibility.toLowerCase()}</span>
        <span>${fmt.format(repo.diskUsage)} KB</span>
        <span class="repo-status ${repo.status}">${repo.status}</span>
        <small>${repo.description || repo.updatedAt || ""}</small>
      </div>
    `,
    )
    .join("");
}

function renderFusion() {
  const candidates = state.data.graph?.fusionCandidates || [];
  els.fusionSummary.textContent = `${candidates.length} señales`;
  els.fusionList.innerHTML = candidates.slice(0, 50).map((candidate) => {
    const common = [
      ...candidate.commonDeps.map((item) => `dep:${item}`),
      ...candidate.commonSymbols.slice(0, 6).map((item) => `sym:${item}`),
      ...candidate.commonFiles.slice(0, 6).map((item) => `file:${item}`),
    ].slice(0, 14);
    return `
      <div class="fusion-row">
        <div class="fusion-title">
          <strong>${candidate.a} ⇄ ${candidate.b}</strong>
          <span class="fusion-score">${candidate.score}</span>
        </div>
        <small>${candidate.reason}</small>
        <div class="fusion-common">${common.map((item) => `<span>${item}</span>`).join("")}</div>
      </div>
    `;
  }).join("");
}

function renderOpportunities() {
  const opportunities = state.data.opportunities || [];
  els.marketSummary.textContent = `${opportunities.length} oportunidades`;
  els.opportunityList.innerHTML = opportunities
    .map((item) => {
      const internal = item.internalRepos.slice(0, 7);
      const external = item.externalRepos.slice(0, 5);
      return `
        <article class="opportunity-card">
          <div class="fusion-title">
            <h4>${item.title}</h4>
            <span class="fusion-score">${item.recommendation}</span>
          </div>
          <p>${item.build}</p>
          <p>${item.programmerUse}</p>
          <div class="opportunity-meta">
            <span>score ${item.score}</span>
            <span>fuerza interna ${item.internalStrength}</span>
            <span>presión mercado ${item.marketPressure}</span>
            <span>top externo ${fmt.format(item.maxStars)} estrellas</span>
          </div>
          <div class="repo-columns">
            <div class="repo-chips">
              <h5>Tus piezas</h5>
              ${internal.map((repo) => `<span class="repo-chip">${repo}</span>`).join("")}
            </div>
            <div class="repo-chips">
              <h5>Comparar con</h5>
              ${external.map((repo) => `<span class="repo-chip">${repo.fullName} · ${fmt.format(repo.stars)}</span>`).join("")}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

async function runSearch(event) {
  event.preventDefault();
  const q = els.codeSearch.value.trim();
  if (!q || !state.active) return;
  els.searchResults.innerHTML = `<div class="file-row"><span>Buscando...</span></div>`;
  const url = `/api/search?project=${encodeURIComponent(state.active.dbPath.split("/").pop().replace(/\.db$/, ""))}&q=${encodeURIComponent(q)}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.error) {
    els.searchResults.innerHTML = `<div class="file-row"><strong>Error</strong><span>${data.error}</span></div>`;
    return;
  }
  const results = data.results || [];
  els.searchResults.innerHTML = results.length
    ? results
        .map(
          (row) => `
          <div class="result-row">
            <strong>${row.node || row.qualified_name}</strong>
            <span>${row.label || "match"} · ${row.file || row.file_path || ""}${row.start_line ? `:${row.start_line}` : ""}</span>
          </div>
        `,
        )
        .join("")
    : `<div class="file-row"><span>Sin resultados para esa búsqueda.</span></div>`;
}

els.filter.addEventListener("input", (event) => {
  state.filter = event.target.value;
  const projects = filteredProjects();
  if (projects.length && !projects.some((project) => project.name === state.active?.name)) state.active = projects[0];
  render();
});

els.refresh.addEventListener("click", loadData);
els.form.addEventListener("submit", runSearch);
els.githubFilter.addEventListener("input", renderGithub);
els.githubStatus.addEventListener("change", renderGithub);
els.demoMode.addEventListener("click", startDemoMode);
els.exportFocus.addEventListener("click", exportFocusBrief);
els.exportDecisions.addEventListener("click", exportDecisionCards);
els.exportPyme.addEventListener("click", exportPymeReport);
els.openFeedback.addEventListener("click", () => showFeedbackPanel());
els.closeFeedback.addEventListener("click", () => els.feedbackPanel.classList.add("is-hidden"));
els.feedbackForm.addEventListener("submit", saveFeedback);
els.closeDrawer.addEventListener("click", closeDecisionDrawer);
els.drawerBackdrop.addEventListener("click", closeDecisionDrawer);
els.exportSingleDecision.addEventListener("click", () => exportSingleDecision());
els.copyDecision.addEventListener("click", copyDecisionSummary);
els.decisionTabs.forEach((button) => {
  button.addEventListener("click", () => {
    activeDecisionAction = button.dataset.action;
    els.decisionTabs.forEach((item) => item.classList.toggle("is-active", item === button));
    renderDecisions();
  });
});

loadData();
