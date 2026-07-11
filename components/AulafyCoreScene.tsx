"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AulafyCoreScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60);
    camera.position.set(0, 0, 9);

    const world = new THREE.Group();
    scene.add(world);
    scene.add(new THREE.AmbientLight(0x8deaff, 1.5));
    const violet = new THREE.PointLight(0x965cff, 28, 12);
    violet.position.set(-3, 3, 4);
    scene.add(violet);
    const pink = new THREE.PointLight(0xff4fc8, 22, 10);
    pink.position.set(3, -2, 3);
    scene.add(pink);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.28, 2),
      new THREE.MeshPhysicalMaterial({ color: 0x6b38d1, emissive: 0x220d55, emissiveIntensity: 1.2, metalness: 0.45, roughness: 0.2, wireframe: true })
    );
    world.add(core);
    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.82, 1),
      new THREE.MeshStandardMaterial({ color: 0xe747b8, emissive: 0x8b155f, emissiveIntensity: 1.3, metalness: 0.2, roughness: 0.38 })
    );
    world.add(inner);

    const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x60d9ff, transparent: true, opacity: 0.42 });
    for (let i = 0; i < 3; i += 1) {
      const points = new THREE.EllipseCurve(0, 0, 2.2 + i * 0.55, 1.15 + i * 0.34).getPoints(96);
      const orbit = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(points.map((point) => new THREE.Vector3(point.x, point.y, 0))),
        orbitMaterial.clone()
      );
      orbit.rotation.set(0.65 + i * 0.28, i * 0.6, i * 0.45);
      world.add(orbit);
    }

    const nodeGeometry = new THREE.BoxGeometry(0.13, 0.13, 0.13);
    const colors = [0x63dcff, 0xff56c8, 0x9b72ff];
    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < 18; i += 1) {
      const angle = (i / 18) * Math.PI * 2;
      const radius = 2.3 + (i % 3) * 0.56;
      const node = new THREE.Mesh(nodeGeometry, new THREE.MeshBasicMaterial({ color: colors[i % colors.length] }));
      node.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.55, Math.sin(angle * 2) * 0.8);
      node.rotation.set(angle, angle * 0.5, 0);
      nodes.push(node);
      world.add(node);
    }

    const starsGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(180 * 3);
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 5 - 1;
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    world.add(new THREE.Points(starsGeometry, new THREE.PointsMaterial({ color: 0x835cdf, size: 0.025, transparent: true, opacity: 0.65 })));

    const resize = () => {
      const width = canvas.clientWidth || 720;
      const height = canvas.clientHeight || 720;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    let pointerX = 0;
    let pointerY = 0;
    const onPointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / innerWidth - 0.5) * 0.32;
      pointerY = (event.clientY / innerHeight - 0.5) * 0.2;
    };
    addEventListener("pointermove", onPointerMove, { passive: true });
    let frame = 0;
    const animate = (time: number) => {
      frame = requestAnimationFrame(animate);
      if (!reducedMotion) {
        core.rotation.x = time * 0.00014;
        core.rotation.y = time * 0.0002;
        inner.rotation.y = -time * 0.00024;
        world.rotation.y += (pointerX - world.rotation.y) * 0.025;
        world.rotation.x += (-pointerY - world.rotation.x) * 0.025;
        nodes.forEach((node, index) => { node.rotation.y = time * 0.0005 + index; });
      }
      renderer.render(scene, camera);
      canvas.dataset.ready = "true";
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("pointermove", onPointerMove);
      observer.disconnect();
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
          else object.material.dispose();
        }
      });
    };
  }, []);

  return <canvas ref={canvasRef} className="nx-core-canvas" aria-hidden="true" />;
}
