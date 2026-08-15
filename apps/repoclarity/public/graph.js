import * as THREE from "./vendor/three/three.module.js";
import { OrbitControls } from "./vendor/three/examples/jsm/controls/OrbitControls.js";

const colors = {
  education: 0x2f7d5c,
  "rag-legal": 0x315d9d,
  hublab: 0x9b5c2e,
  "voice-media": 0x9a3f6d,
  "agents-os": 0x5b5fa8,
  "business-pyme": 0x1c7c86,
  "games-3d": 0xb27622,
  "content-books": 0x708238,
  other: 0x76827d,
};

function topicColor(topic) {
  return colors[topic] ?? colors.other;
}

function sphericalPoint(index, total, radius, topicIndex = 0) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - (index / Math.max(1, total - 1)) * 2;
  const r = Math.sqrt(1 - y * y);
  const theta = golden * index + topicIndex * 0.46;
  return new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius);
}

async function initGraph() {
  const mount = document.querySelector("#graph3d");
  if (!mount) return;
  const infoName = document.querySelector("#graphNodeName");
  const infoDesc = document.querySelector("#graphNodeDescription");
  const infoTopic = document.querySelector("#graphTopic");
  const legend = document.querySelector("#graphLegend");
  const data = await fetch("./data/graph.json", { cache: "no-store" }).then((res) => res.json());

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(48, mount.clientWidth / mount.clientHeight, 1, 5000);
  camera.position.set(0, 0, 760);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(mount.clientWidth, mount.clientHeight);
  mount.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.minDistance = 260;
  controls.maxDistance = 1400;

  scene.add(new THREE.AmbientLight(0xffffff, 0.85));
  const light = new THREE.DirectionalLight(0xffffff, 1.4);
  light.position.set(300, 500, 400);
  scene.add(light);

  const group = new THREE.Group();
  scene.add(group);

  const topics = [...new Set(data.nodes.map((node) => node.topic))].sort();
  const topicSlots = new Map(topics.map((topic, index) => [topic, index]));
  const byTopic = new Map(topics.map((topic) => [topic, data.nodes.filter((node) => node.topic === topic)]));
  const positions = new Map();
  const meshes = new Map();

  for (const topic of topics) {
    const nodes = byTopic.get(topic);
    const topicIndex = topicSlots.get(topic);
    const clusterCenter = sphericalPoint(topicIndex, topics.length, 210, topicIndex);
    nodes.forEach((node, index) => {
      const local = sphericalPoint(index, nodes.length, 68 + Math.min(42, nodes.length * 1.4), topicIndex);
      const pos = clusterCenter.clone().add(local);
      positions.set(node.id, pos);

      const geo = new THREE.SphereGeometry(node.kind === "indexed" ? node.size * 1.05 : node.size, 12, 10);
      const mat = new THREE.MeshStandardMaterial({
        color: topicColor(node.topic),
        roughness: 0.42,
        metalness: node.kind === "indexed" ? 0.16 : 0.04,
        emissive: topicColor(node.topic),
        emissiveIntensity: node.kind === "indexed" ? 0.13 : 0.05,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(pos);
      mesh.userData = node;
      group.add(mesh);
      meshes.set(node.id, mesh);
    });
  }

  const linePositions = [];
  const lineColors = [];
  for (const link of data.links) {
    const a = positions.get(link.source);
    const b = positions.get(link.target);
    if (!a || !b) continue;
    linePositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    const intensity = Math.min(1, Math.max(0.22, link.score));
    lineColors.push(0.25, 0.34 + intensity * 0.24, 0.36 + intensity * 0.18, 0.25, 0.34 + intensity * 0.24, 0.36 + intensity * 0.18);
  }
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
  lineGeometry.setAttribute("color", new THREE.Float32BufferAttribute(lineColors, 3));
  group.add(new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.34 })));

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let autoRotate = true;

  function selectNode(node) {
    infoName.textContent = node.name;
    infoTopic.textContent = `${node.topic} · ${node.status}`;
    infoDesc.textContent = node.description || `${node.visibility.toLowerCase()} · ${node.kind}`;
  }

  renderer.domElement.addEventListener("pointerdown", (event) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects([...meshes.values()], false);
    if (hits[0]) selectNode(hits[0].object.userData);
  });

  legend.innerHTML = topics
    .map((topic) => `<div class="legend-row"><span class="legend-dot" style="background:#${topicColor(topic).toString(16).padStart(6, "0")}"></span>${topic} · ${byTopic.get(topic).length}</div>`)
    .join("");

  document.querySelector("#graphRotateBtn")?.addEventListener("click", () => {
    autoRotate = !autoRotate;
  });
  document.querySelector("#graphResetBtn")?.addEventListener("click", () => {
    camera.position.set(0, 0, 760);
    controls.target.set(0, 0, 0);
    controls.update();
  });

  function resize() {
    const width = mount.clientWidth;
    const height = mount.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  window.addEventListener("resize", resize);

  let frame = 0;
  function animate() {
    requestAnimationFrame(animate);
    frame += 1;
    if (autoRotate) group.rotation.y += 0.0014;
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}

initGraph();
