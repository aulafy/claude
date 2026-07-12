import assert from "node:assert/strict";
import fs from "node:fs";

const cliLesson = fs.readFileSync("app/cursos/agentes-automatizacion/crear-cli-tipo-r/page.tsx", "utf8");
const firstSteps = fs.readFileSync("app/primeros-pasos/page.tsx", "utf8");
const permissions = fs.readFileSync("app/permisos/page.tsx", "utf8");
const advanced = fs.readFileSync("app/avanzado/page.tsx", "utf8");
const commands = fs.readFileSync("app/comandos/page.tsx", "utf8");
const seoLandingPage = fs.readFileSync("components/SeoLandingPage.tsx", "utf8");

assert.match(cliLesson, /\[tool\.hatch\.build\.targets\.wheel\]/, "Hatchling example must declare wheel package config");
assert.match(cliLesson, /packages = \["src\/aulafy_r"\]/, "Hatchling example must include src/aulafy_r explicitly");
assert.doesNotMatch(cliLesson, /Respuesta rápida para Google, ChatGPT y Claude/, "Educational lesson must not surface assistant-targeted SEO copy");
assert.doesNotMatch(seoLandingPage, /Respuesta corta para citar/, "Landing UI must use learner-facing labels");

assert.doesNotMatch(firstSteps, /<h3>Modo auto<\/h3>[\s\S]*dangerously-skip-permissions/, "Bypass permissions must not be presented as normal auto mode");
assert.match(firstSteps, /bypassPermissions/, "First steps must name bypassPermissions explicitly");
assert.match(permissions, /bypassPermissions/, "Permissions page must name bypassPermissions explicitly");
assert.doesNotMatch(advanced, /--dangerously-skip-permissions/, "CI examples must not recommend bypass permissions");
assert.match(commands, /--permission-mode bypassPermissions/, "Command reference should use the explicit permission-mode name");

console.log("Verified critical examples: Hatchling package config, bypass permissions wording, and learner-facing SEO copy.");
