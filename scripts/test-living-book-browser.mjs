import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.BOOK_BASE_URL || "http://127.0.0.1:4193";
const output = path.resolve("artifacts/living-book"); fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: process.env.BROWSER_CHANNEL || "chrome" });
const context = await browser.newContext({ viewport: { width: 1440, height: 1050 }, acceptDownloads: true });
const page = await context.newPage();
const errors = [], requests = [];
let contrastMeasurements = 0; const contrastTypes = {};
page.on("pageerror", error => errors.push(error.message));
page.on("request", request => requests.push(request.url()));
const fits = async () => assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "Document overflow");
const assertReadableText = async () => {
  const result = await page.evaluate(() => {
  const canvas = document.createElement("canvas"); const context = canvas.getContext("2d");
  const parse = value => {
    if (!context) return null;
    context.fillStyle = "rgba(0, 0, 0, 0)"; context.fillStyle = value;
    const normalized = context.fillStyle;
    if (normalized === "rgba(0, 0, 0, 0)") return null;
    if (normalized.startsWith("#")) {
      const hex = normalized.slice(1); const value = hex.length === 3 ? hex.split("").map(item => item + item).join("") : hex;
      if (value.length === 6) return [0, 2, 4].map(index => Number.parseInt(value.slice(index, index + 2), 16) / 255);
    }
    const match = normalized.match(/rgba?\(([^)]+)\)/);
    if (!match) return null;
    const parts = match[1].split(",").map(item => Number.parseFloat(item.trim()));
    return parts.length === 4 && parts[3] === 0 ? null : parts.slice(0, 3).map(item => item / 255);
  };
  const luminance = rgb => rgb.map(channel => channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4).reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
  const ratio = (foreground, background) => { const light = luminance(foreground), dark = luminance(background); return (Math.max(light, dark) + 0.05) / (Math.min(light, dark) + 0.05); };
  const failures = []; const types = {};
  let measured = 0;
  for (const element of document.querySelectorAll("[data-book-root] h1,[data-book-root] h2,[data-book-root] p,[data-book-root] a,[data-book-root] button,[data-book-root] input,[data-book-root] legend,[data-book-root] th,[data-book-root] td,[data-book-root] li,[data-book-root] small,[data-book-root] span,[data-book-root] pre,[data-book-root] code")) {
    if (!element.textContent.trim() || element.getClientRects().length === 0) continue;
    const style = getComputedStyle(element); const foreground = parse(style.color); let background = null; let backgroundRaw = "transparent"; let current = element;
    while (current && !background) { backgroundRaw = getComputedStyle(current).backgroundColor; background = parse(backgroundRaw); current = current.parentElement; }
    const foregroundUnsupported = !foreground && style.color !== "rgba(0, 0, 0, 0)" && style.color !== "transparent";
    const backgroundUnsupported = !background && backgroundRaw !== "rgba(0, 0, 0, 0)" && backgroundRaw !== "transparent";
    if (foregroundUnsupported || backgroundUnsupported) {
      failures.push({ text: element.textContent.trim().slice(0, 40), color: style.color, background: backgroundRaw, reason: "Unsupported CSS color format" });
      continue;
    }
    if (!foreground || !background) continue;
    measured += 1; types[element.tagName.toLowerCase()] = (types[element.tagName.toLowerCase()] || 0) + 1;
    const large = Number.parseFloat(style.fontSize) >= 24 || (Number.parseFloat(style.fontSize) >= 18.67 && Number.parseFloat(style.fontWeight) >= 700);
    const minimum = large ? 3 : 4.5;
    if (ratio(foreground, background) < minimum) failures.push({ text: element.textContent.trim().slice(0, 40), color: style.color, background: getComputedStyle(element).backgroundColor, ratio: ratio(foreground, background), minimum });
  }
  return { failures, measured, types };
  });
  assert.ok(result.measured > 0, "Contrast checker measured no reader text");
  assert.deepEqual(result.failures, []);
  contrastMeasurements += result.measured;
  for (const [type, count] of Object.entries(result.types)) contrastTypes[type] = (contrastTypes[type] || 0) + count;
};
try {
  await page.goto(base + "/book/es/first-task", { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Tu primer encargo a una IA", exact: true }).waitFor();
  assert.equal(await page.locator('meta[name="robots"]').first().getAttribute("content"), "noindex, nofollow");
  assert.ok(await page.locator('header img').evaluate(image => image.naturalWidth > 0));
  assert.equal(await page.evaluate(() => localStorage.length), 0);
  await fits();
  await assertReadableText();
  const contrastMutation = await page.evaluate(() => {
    const element = document.createElement("span");
    element.textContent = "Contrast regression fixture";
    element.setAttribute("data-contrast-fixture", "true");
    element.style.cssText = "color: #111 !important; background: #111 !important; display: block;";
    document.querySelector("[data-book-root]").append(element);
    return true;
  });
  assert.equal(contrastMutation, true);
  let negativeContrastDetected = false;
  try { await assertReadableText(); } catch { negativeContrastDetected = true; }
  assert.equal(negativeContrastDetected, true, "Contrast checker must fail on dark text over a dark background");
  await page.locator("[data-contrast-fixture]").evaluate(element => element.remove());
  await assertReadableText();
  await page.screenshot({ path: path.join(output, "desktop-es.png"), fullPage: false });
  await page.getByRole("button", { name: "Marcar como completado", exact: true }).waitFor();
  assert.ok(await page.getByRole("button", { name: "Marcar como completado", exact: true }).isDisabled());
  await page.getByRole("radio").nth(0).check();
  await page.getByRole("button", { name: "Comprobar respuesta", exact: true }).click();
  await page.getByText("Vuelve a la fuente.", { exact: false }).waitFor();
  await page.getByRole("radio").nth(1).check();
  await page.getByRole("button", { name: "Comprobar respuesta", exact: true }).click();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Marcar como completado", exact: true }).click();
  await page.getByRole("button", { name: "Completado en este dispositivo", exact: true }).waitFor();
  await page.reload({ waitUntil: "networkidle" });
  assert.ok(await page.getByRole("button", { name: "Completado en este dispositivo", exact: true }).isDisabled());
  await page.screenshot({ path: path.join(output, "practice-es.png"), fullPage: true });
  await page.evaluate(() => { localStorage.setItem("aulafy-living-book:progress:v1", JSON.stringify({ "first-task:es": "0".repeat(64) })); window.dispatchEvent(new Event("aulafy-book-progress")); });
  await page.getByText("Este capítulo cambió desde tu última práctica.").waitFor();
  await page.getByRole("button", { name: "Borrar progreso local", exact: true }).click();
  assert.equal(await page.evaluate(() => localStorage.getItem("aulafy-living-book:progress:v1")), null);
  const [download] = await Promise.all([page.waitForEvent("download"), page.getByRole("link", { name: "Descargar Markdown", exact: true }).click()]);
  const markdown = fs.readFileSync(await download.path(), "utf8");
  assert.match(markdown, /Editorial approval pending/); assert.match(markdown, /## 1\./);
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await page.getByRole("heading", { name: "Your first task for AI", exact: true }).waitFor();
  await page.waitForFunction(() => document.documentElement.lang === "en");
  await page.screenshot({ path: path.join(output, "desktop-en.png"), fullPage: false });
  for (const locale of ["es", "en"]) {
    for (const id of ["first-task", "verify-output", "data-boundaries", "read-documents", "research-sources", "compare-tools", "write-edit", "images-audio", "learning-project", "workflow", "connectors", "human-approval", "local-hardware", "local-first-run", "local-context", "api-contracts", "retrieval", "agents", "evals", "injection", "costs", "observability", "legacy-data", "final-project", "changes", "editorial"]) {
      const response = await page.goto(`${base}/book/${locale}/${id}`, { waitUntil: "networkidle" });
      assert.equal(response.status(), 200, `${locale}/${id}`); await fits(); await assertReadableText();
      if (locale === "es" && id === "write-edit") assert.match(await page.locator("pre").first().innerText(), /El club de lectura se reúne el jueves a las 18:00 en la sala 1\./);
      if (locale === "en" && id === "write-edit") assert.match(await page.locator("pre").first().innerText(), /The book club meets on Thursday at 18:00 in room 1\./);
      if (id === "first-task") assert.match(await page.locator('[class*="provenance"]').innerText(), locale === "en" ? /legacy material as a reference/ : /material antiguo como referencia/);
    }
    const response = await page.goto(`${base}/book/${locale}`, { waitUntil: "networkidle" });
    assert.equal(response.status(), 200); await fits();
  }
  for (const width of [375, 768, 1920]) {
    await page.setViewportSize({ width, height: width === 1920 ? 1080 : 850 });
    await page.goto(base + "/book/es/first-task", { waitUntil: "networkidle" });
    await fits();
    await assertReadableText();
    await page.screenshot({ path: path.join(output, `reader-${width}.png`), fullPage: false });
    if (width === 375) {
      await page.getByRole("button", { name: "Índice", exact: true }).click();
      await page.getByRole("textbox", { name: "Buscar un capítulo", exact: true }).fill("respuesta");
      await page.locator('#book-index a[aria-current="page"]').waitFor({ state: "hidden" });
      await page.locator('#book-index a[href="/book/es/verify-output"]').click();
      await page.getByRole("heading", { name: "No confundir una respuesta con una prueba", exact: true }).waitFor();
      assert.equal(await page.getByRole("button", { name: "Índice", exact: true }).getAttribute("aria-expanded"), "false");
      await fits();
    }
  }
  for (const [locale, expected, label] of [
    ["es", "El club de lectura se reúne el jueves a las 18:00 en la sala 1.", "es"],
    ["en", "The book club meets on Thursday at 18:00 in room 1.", "en"]
  ]) {
    for (const width of [375, 768, 1440, 1920]) {
      await page.setViewportSize({ width, height: width === 1920 ? 1080 : 850 });
      await page.goto(`${base}/book/${locale}/write-edit`, { waitUntil: "networkidle" });
      const exercise = page.locator("pre").filter({ hasText: expected }).first();
      await exercise.waitFor();
      assert.match(await exercise.innerText(), new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
      await assertReadableText();
      await exercise.screenshot({ path: path.join(output, `club-exercise-${label}-${width}.png`) });
    }
  }
  await page.setViewportSize({ width: 720, height: 900 });
  await page.goto(base + "/book/es/write-edit", { waitUntil: "networkidle" });
  await fits();
  await assertReadableText();
  await page.screenshot({ path: path.join(output, "reader-zoom-200-equivalent.png"), fullPage: false });
  const selectedExercise = await page.locator("pre").first().evaluate(element => {
    const selection = window.getSelection(); const range = document.createRange(); range.selectNodeContents(element); selection?.removeAllRanges(); selection?.addRange(range);
    const text = selection?.toString() || ""; selection?.removeAllRanges(); return text;
  });
  assert.match(selectedExercise, /El club de lectura se reúne el jueves a las 18:00/);
  await page.emulateMedia({ media: "print" });
  await page.goto(base + "/book/es/write-edit", { waitUntil: "networkidle" });
  assert.ok((await page.locator("body").textContent()).includes("El club de lectura se reúne el jueves"), "Print view lost the exercise content");
  await page.screenshot({ path: path.join(output, "reader-print-es.png"), fullPage: true });
  await page.emulateMedia({ media: "screen" });
  await page.goto(base + "/book/es/first-task", { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  let visibleFocus = false;
  for (let index = 0; index < 20; index += 1) {
    const focus = await page.evaluate(() => {
      const element = document.activeElement;
      if (!element || !["A", "BUTTON", "INPUT"].includes(element.tagName)) return false;
      const style = getComputedStyle(element);
      return style.outlineStyle !== "none" && Number.parseFloat(style.outlineWidth) > 0;
    });
    if (focus) { visibleFocus = true; break; }
    await page.keyboard.press("Tab");
  }
  assert.equal(visibleFocus, true, "Keyboard focus indicator was not visible");
  assert.deepEqual(await context.cookies(), []);
  assert.ok(requests.every(url => url.startsWith(base) || url.startsWith("blob:")), "Unexpected external request");
  assert.deepEqual(errors, []);
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noJs.newPage();
  await staticPage.goto(base + "/book/es/first-task");
  assert.ok((await staticPage.locator("body").textContent()).includes("Define un resultado pequeño"));
  await staticPage.goto(base + "/book/es/write-edit");
  assert.match(await staticPage.locator("pre").first().innerText(), /El club de lectura se reúne el jueves a las 18:00 en la sala 1\./);
  await noJs.close();
  for (const route of ["/book/es/not-created", "/book/de/first-task"]) assert.equal((await context.request.get(base + route)).status(), 404);
  if (process.env.BOOK_DISABLED_URL) {
    for (const route of ["/book", "/book/es/first-task", "/book/es/first-task/chapter.md"]) assert.equal((await context.request.get(process.env.BOOK_DISABLED_URL + route)).status(), 404, "Preview must be disabled");
  }
  console.log(JSON.stringify({ passed: true, screenshots: output, viewports: [375, 768, 1440, 1920], contrastMeasurements, contrastTypes, checks: ["ES/EN", "quiz", "progress-opt-in", "progress-revision", "clear-progress", "download", "navigation", "search", "no-cookies", "no-external-requests", "no-JS-reading", "404", "overflow", "zoom-200-equivalent", "print-content", "keyboard-focus", "text-selection"], disabledPreviewChecked: Boolean(process.env.BOOK_DISABLED_URL) }, null, 2));
} finally { await browser.close(); }
