"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./Maintenance.module.css";

export default function MaintenanceScene({ english }: { english: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power", preserveDrawingBuffer: true });
    } catch {
      const frame = requestAnimationFrame(() => setUnavailable(true));
      return () => cancelAnimationFrame(frame);
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 100);
    const world = new THREE.Group();
    scene.add(world);
    scene.add(new THREE.HemisphereLight(0xffffff, 0xc1cbd4, 3));
    const sun = new THREE.DirectionalLight(0xffffff, 4);
    sun.position.set(-3, 7, 5); scene.add(sun);
    const materials: THREE.Material[] = [];
    const geometries: THREE.BufferGeometry[] = [];
    const material = (color: number) => { const value = new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.12 }); materials.push(value); return value; };
    const blue = material(0x3866d9), teal = material(0x39abb6), gold = material(0xe6ad42), steel = material(0x71849a), white = material(0xe0e6ed);
    function box(w: number, h: number, d: number, x: number, y: number, z: number, mat: THREE.Material) {
      const geometry = new THREE.BoxGeometry(w, h, d); geometries.push(geometry);
      const mesh = new THREE.Mesh(geometry, mat); mesh.position.set(x, y, z); world.add(mesh); return mesh;
    }
    // An unfinished A, with the final block hanging from a small tower crane.
    box(5.6, .18, 3.3, 0, -.15, 0, white);
    for (let level = 0; level < 4; level++) {
      box(.64, .52, .7, -1.12 + level * .25, level * .57 + .24, 0, blue);
      box(.64, .52, .7, 1.12 - level * .25, level * .57 + .24, 0, teal);
    }
    box(1.45, .26, .64, 0, .88, 0, blue);
    const block = box(.64, .52, .7, 0, 2.95, 0, gold);
    for (const x of [1.95, 2.27]) box(.065, 3.7, .065, x, 1.75, -.55, steel);
    for (let i = 0; i < 8; i++) box(.36, .04, .06, 2.11, i * .45, -.55, steel);
    box(3.35, .13, .17, .85, 3.65, -.55, gold);
    box(.85, .35, .5, 2.48, 3.42, -.55, steel);
    const cable = box(.025, .51, .025, 0, 3.33, 0, steel);
    box(.8, .08, .07, 0, 3.63, -.28, steel).rotation.y = Math.PI / 2;
    box(.65, .32, .65, -2.05, .12, .75, gold);
    box(.6, .28, .62, -1.85, .42, .78, white);
    world.rotation.y = -.4;
    let pointer = 0, frame = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const resize = () => {
      const width = canvas.clientWidth, height = canvas.clientHeight;
      renderer.setSize(width, height, false); camera.aspect = width / Math.max(height, 1);
      camera.position.set(5, 4.5, 9).multiplyScalar(camera.aspect < 1.15 ? 1.4 : 1);
      camera.lookAt(0, 1.65, 0); camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize); observer.observe(canvas); resize();
    const move = (event: PointerEvent) => { pointer = (event.clientX / window.innerWidth - .5) * .35; };
    window.addEventListener("pointermove", move, { passive: true });
    let elapsed = 0, previous = 0;
    const animate = (time: number) => {
      frame = requestAnimationFrame(animate);
      const delta = previous ? Math.min(time - previous, 50) : 0; previous = time;
      if (!document.hidden && !pausedRef.current && !reducedMotion.matches) {
        elapsed += delta;
        world.rotation.y += (-.4 + pointer - world.rotation.y) * .035;
        const offset = Math.sin(elapsed * .00065) * .14;
        block.position.y = 2.95 + offset;
        cable.scale.y = 1 - offset / .51; cable.position.y = 3.33 + offset / 2;
      }
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("pointermove", move); geometries.forEach((g) => g.dispose()); materials.forEach((m) => m.dispose()); renderer.dispose(); };
  }, []);

  return <div className={styles.scene}>
    <canvas ref={canvasRef} aria-label={english ? "An unfinished letter A and a crane, representing Aulafy under construction" : "Una letra A en construcción junto a una grúa"} role="img" />
    {unavailable ? <p className={styles.fallback}>{english ? "A new Aulafy is taking shape." : "Un nuevo Aulafy está tomando forma."}</p> : <button type="button" className={styles.motion} aria-pressed={paused} onClick={() => { pausedRef.current = !paused; setPaused(!paused); }}>{paused ? (english ? "Resume animation" : "Reanudar animación") : (english ? "Pause animation" : "Pausar animación")}</button>}
  </div>;
}
