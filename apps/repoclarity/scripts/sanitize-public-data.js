import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const projectsPath = path.join(root, "public/data/projects.json");
const graphPath = path.join(root, "public/data/graph.json");

const projectsData = JSON.parse(readFileSync(projectsPath, "utf8"));
const graphData = JSON.parse(readFileSync(graphPath, "utf8"));

const privateRepos = (projectsData.githubRepos || []).filter((repo) => repo.visibility === "PRIVATE");
const privateNameMap = new Map();
const privateFullNameMap = new Map();

function pad(index) {
  return String(index).padStart(3, "0");
}

privateRepos.forEach((repo, index) => {
  const safeName = `private-repo-${pad(index + 1)}`;
  privateNameMap.set(repo.name, safeName);
  privateFullNameMap.set(repo.fullName, `private/${safeName}`);
});

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function redactText(value) {
  if (typeof value !== "string") return value;
  let text = value.replace(/\/Users\/[^\s"']+/g, "/demo/local-project");
  for (const [fullName, safeFullName] of privateFullNameMap) {
    text = text.replace(new RegExp(escapeRegex(fullName), "g"), safeFullName);
  }
  for (const [name, safeName] of privateNameMap) {
    if (name.length < 6) continue;
    text = text.replace(new RegExp(`\\b${escapeRegex(name)}\\b`, "g"), safeName);
  }
  return text;
}

function deepRedact(value) {
  if (typeof value === "string") return redactText(value);
  if (Array.isArray(value)) return value.map(deepRedact);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value).map(([key, nested]) => [key, deepRedact(nested)]));
}

function sanitizePath(label, suffix = "") {
  return `/demo/${label}${suffix}`;
}

function isPrivateProject(project) {
  return (
    project.reason === "github-PRIVATE" ||
    privateNameMap.has(project.name.replace(/^github-/, "")) ||
    [...privateNameMap.keys()].some((name) => String(project.originalPath || "").includes(`/github-repos/${name}`))
  );
}

function safeProjectName(project) {
  if (!isPrivateProject(project)) return project.name;
  const raw = project.name.replace(/^github-/, "");
  return `github-${privateNameMap.get(raw) || "private-repo"}`;
}

function sanitizeProject(project) {
  const privateProject = isPrivateProject(project);
  const name = safeProjectName(project);
  return {
    ...project,
    name,
    alias: privateProject ? name : redactText(project.alias),
    reason: privateProject ? "github-PRIVATE_DEMO" : redactText(project.reason),
    originalPath: sanitizePath("projects", `/${name}`),
    mirrorPath: sanitizePath("mirrors", `/${name}`),
    dbPath: sanitizePath("cache", `/${name}.db`),
    summary: privateProject ? "Private repository redacted in the public demo dataset." : redactText(project.summary),
    package: privateProject ? null : deepRedact(project.package),
    topFiles: (project.topFiles || []).map((file) => ({ ...file, file: redactText(file.file) })),
    routes: (project.routes || []).map((route) => ({ ...route, file: redactText(route.file) })),
  };
}

function sanitizeGithubRepo(repo) {
  if (repo.visibility !== "PRIVATE") {
    return {
      ...repo,
      description: redactText(repo.description),
      clonedPath: repo.cloned ? sanitizePath("github-repos", `/${repo.name}`) : "",
      indexedProjectName: redactText(repo.indexedProjectName),
    };
  }
  const safeName = privateNameMap.get(repo.name);
  return {
    ...repo,
    name: safeName,
    fullName: `private/${safeName}`,
    url: "",
    description: "Private repository redacted in the public demo dataset.",
    defaultBranch: repo.defaultBranch ? "redacted" : "",
    clonedPath: "",
    indexedProjectName: repo.indexedProjectName ? `github-${safeName}` : "",
  };
}

const graphIdMap = new Map();

function sanitizeGraphNode(node) {
  const privateNode = node.visibility === "PRIVATE" || privateFullNameMap.has(node.name) || privateNameMap.has(node.shortName);
  if (!privateNode) {
    return {
      ...node,
      name: redactText(node.name),
      shortName: redactText(node.shortName),
      url: redactText(node.url),
      description: redactText(node.description),
    };
  }
  const safeName = privateNameMap.get(node.shortName) || privateNameMap.get(String(node.name).split("/").pop()) || "private-repo";
  const safeFullName = `private/${safeName}`;
  graphIdMap.set(node.id, `gh:${safeFullName}`);
  return {
    ...node,
    id: `gh:${safeFullName}`,
    name: safeFullName,
    shortName: safeName,
    visibility: "PRIVATE",
    url: "",
    description: "Private repository redacted in the public demo dataset.",
  };
}

function sanitizeDecision(item) {
  return {
    ...item,
    target: redactText(item.target),
    rationale: redactText(item.rationale),
    evidence: (item.evidence || []).map(redactText),
  };
}

function sanitizeFusion(candidate) {
  return {
    ...candidate,
    a: redactText(candidate.a),
    b: redactText(candidate.b),
    commonDeps: (candidate.commonDeps || []).map(redactText),
    commonFiles: (candidate.commonFiles || []).map(redactText),
    commonSymbols: (candidate.commonSymbols || []).map(redactText),
  };
}

function sanitizeOpportunity(item) {
  return {
    ...item,
    build: redactText(item.build),
    programmerUse: redactText(item.programmerUse),
    internalRepos: (item.internalRepos || []).map(redactText),
    externalRepos: (item.externalRepos || []).map((repo) => ({
      ...repo,
      fullName: redactText(repo.fullName),
      description: redactText(repo.description),
      url: redactText(repo.url),
    })),
  };
}

const sanitizedGraph = {
  ...graphData,
  nodes: (graphData.nodes || []).map(sanitizeGraphNode),
};
sanitizedGraph.links = (graphData.links || []).map((link) => ({
  ...link,
  source: graphIdMap.get(link.source) || link.source,
  target: graphIdMap.get(link.target) || link.target,
}));
sanitizedGraph.fusionCandidates = (graphData.fusionCandidates || []).map(sanitizeFusion);

const sanitizedProjects = {
  ...projectsData,
  basePath: "/demo/repoclarity",
  githubRepos: (projectsData.githubRepos || []).map(sanitizeGithubRepo),
  opportunities: (projectsData.opportunities || []).map(sanitizeOpportunity),
  decisions: (projectsData.decisions || []).map(sanitizeDecision),
  focusBrief: (projectsData.focusBrief || []).map((item) => ({
    ...item,
    title: redactText(item.title),
    summary: redactText(item.summary),
    nextStep: redactText(item.nextStep),
  })),
  graph: sanitizedGraph,
  projects: (projectsData.projects || []).map(sanitizeProject),
};

sanitizedProjects.projects = sanitizedProjects.projects.map((project) => {
  if (project.reason !== "github-PRIVATE_DEMO") return deepRedact(project);
  return {
    ...deepRedact(project),
    package: null,
    topFiles: [],
    routes: [],
  };
});

const finalProjects = deepRedact(sanitizedProjects);
const finalGraph = deepRedact(sanitizedGraph);

writeFileSync(projectsPath, JSON.stringify(finalProjects, null, 2));
writeFileSync(graphPath, JSON.stringify(finalGraph, null, 2));
console.log("Sanitized public demo data.");
