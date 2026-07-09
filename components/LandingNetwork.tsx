"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function createLaptop(accent: number) {
  const group = new THREE.Group();
  const shell = new THREE.MeshStandardMaterial({ color: 0x1b2430, metalness: 0.7, roughness: 0.35 });
  const screen = new THREE.MeshStandardMaterial({ color: accent, emissive: accent, emissiveIntensity: 0.35, metalness: 0.2, roughness: 0.5 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x090d13, metalness: 0.4, roughness: 0.7 });

  const base = new THREE.Mesh(new THREE.BoxGeometry(2.45, 0.14, 1.65), shell);
  base.position.y = -0.52;
  group.add(base);

  const display = new THREE.Mesh(new THREE.BoxGeometry(2.15, 1.4, 0.13), shell);
  display.position.set(0, 0.34, -0.66);
  display.rotation.x = -0.08;
  group.add(display);

  const displayGlow = new THREE.Mesh(new THREE.PlaneGeometry(1.85, 1.08), screen);
  displayGlow.position.set(0, 0.34, -0.58);
  displayGlow.rotation.x = -0.08;
  group.add(displayGlow);

  const keyboard = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.035, 0.72), dark);
  keyboard.position.set(0, -0.42, 0.08);
  group.add(keyboard);
  return group;
}

function createDiskette(accent: number) {
  const group = new THREE.Group();
  const body = new THREE.MeshStandardMaterial({ color: 0x202a36, metalness: 0.55, roughness: 0.42 });
  const label = new THREE.MeshStandardMaterial({ color: accent, emissive: accent, emissiveIntensity: 0.25, roughness: 0.55 });
  const plate = new THREE.Mesh(new THREE.BoxGeometry(1.45, 1.45, 0.16), body);
  group.add(plate);
  const labelPlate = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.68, 0.04), label);
  labelPlate.position.set(0, -0.17, 0.1);
  group.add(labelPlate);
  const shutter = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.12, 0.05), new THREE.MeshStandardMaterial({ color: 0x080b10 }));
  shutter.position.set(0.14, 0.5, 0.11);
  group.add(shutter);
  return group;
}

function createTerminal(accent: number) {
  const group = new THREE.Group();
  const frame = new THREE.MeshStandardMaterial({ color: 0x1a2530, metalness: 0.6, roughness: 0.4 });
  const glow = new THREE.MeshStandardMaterial({ color: accent, emissive: accent, emissiveIntensity: 0.4, roughness: 0.5 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.45, 1.05, 0.28), frame);
  group.add(body);
  const display = new THREE.Mesh(new THREE.PlaneGeometry(1.05, 0.62), glow);
  display.position.z = 0.16;
  group.add(display);
  const foot = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.18, 0.42), frame);
  foot.position.y = -0.62;
  group.add(foot);
  return group;
}

function createConnection(from: THREE.Vector3, to: THREE.Vector3, material: THREE.LineBasicMaterial) {
  const points = [from, new THREE.Vector3((from.x + to.x) / 2, Math.max(from.y, to.y) + 0.45, (from.z + to.z) / 2), to];
  const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material);
  return line;
}

export default function LandingNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.3, 10);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xb8d8e8, 1.8));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(-4, 6, 8);
    scene.add(keyLight);
    const cyanLight = new THREE.PointLight(0x22d3ee, 12, 14);
    cyanLight.position.set(-4, 1.5, 3);
    scene.add(cyanLight);
    const amberLight = new THREE.PointLight(0xe879f9, 10, 12);
    amberLight.position.set(4, -1, 2);
    scene.add(amberLight);

    const world = new THREE.Group();
    world.rotation.x = -0.1;
    scene.add(world);

    const nodes = [
      { object: createLaptop(0x22d3ee), position: new THREE.Vector3(-2.75, 0.25, 0.2) },
      { object: createDiskette(0xe879f9), position: new THREE.Vector3(0.15, 1.65, -0.3) },
      { object: createTerminal(0x10b981), position: new THREE.Vector3(2.75, 0.2, 0.1) },
      { object: createDiskette(0xa78bfa), position: new THREE.Vector3(-0.7, -1.7, 0.4) },
    ];
    nodes.forEach(({ object, position }, index) => {
      object.position.copy(position);
      object.rotation.set(0.05 * index, -0.18 + index * 0.08, 0.03 * index);
      world.add(object);
    });

    const connectionMaterial = new THREE.LineBasicMaterial({ color: 0x3bd2e8, transparent: true, opacity: 0.42 });
    const connectionGroup = new THREE.Group();
    [[0, 1], [1, 2], [2, 3], [3, 0], [0, 2]].forEach(([fromIndex, toIndex]) => {
      const from = nodes[fromIndex].position;
      const to = nodes[toIndex].position;
      connectionGroup.add(createConnection(from, to, connectionMaterial));
    });
    world.add(connectionGroup);

    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x8bf4f1 });
    nodes.forEach(({ position }) => {
      const node = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), nodeMaterial);
      node.position.copy(position);
      world.add(node);
    });

    const resize = () => {
      const width = canvas.clientWidth || 640;
      const height = canvas.clientHeight || 520;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    let targetRotation = 0;
    let frame = 0;
    const pointerMove = (event: PointerEvent) => {
      if (reducedMotion) return;
      const bounds = canvas.getBoundingClientRect();
      targetRotation = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.16;
    };
    canvas.addEventListener("pointermove", pointerMove);

    const animate = (time: number) => {
      frame = requestAnimationFrame(animate);
      if (!reducedMotion) {
        world.rotation.y += (targetRotation - world.rotation.y) * 0.025;
        world.position.y = Math.sin(time * 0.00055) * 0.06;
        nodes.forEach(({ object }, index) => {
          object.rotation.z = 0.03 * index + Math.sin(time * 0.0008 + index * 1.7) * 0.015;
        });
      }
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointermove", pointerMove);
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
          else object.material.dispose();
        }
      });
    };
  }, []);

  return (
    <div className="landing-network" aria-label="Animated diagram of computers, storage and connected AI workflows" role="img">
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="landing-network-caption" aria-hidden="true">
        <span className="landing-network-status"><i /> local-first / live</span>
        <span className="landing-network-code">build · test · repeat</span>
      </div>
    </div>
  );
}
