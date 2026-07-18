"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { LabStation, LearningLabScenario } from "@/lib/learning-lab-scenarios";

type ThreeLearningRoomProps = {
  activeStation: LabStation;
  scenarioId: LearningLabScenario["id"];
  paused: boolean;
  onSelectStation: (station: LabStation) => void;
  onAvailabilityChange: (available: boolean) => void;
};

const stationColors: Record<LabStation, number> = {
  brief: 0x60a5fa,
  prompt: 0xa78bfa,
  review: 0x34d399,
};

export default function ThreeLearningRoom({
  activeStation,
  scenarioId,
  paused,
  onSelectStation,
  onAvailabilityChange,
}: ThreeLearningRoomProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stationRef = useRef(activeStation);
  const scenarioRef = useRef(scenarioId);
  const pausedRef = useRef(paused);
  const selectRef = useRef(onSelectStation);
  const availabilityRef = useRef(onAvailabilityChange);

  useEffect(() => { stationRef.current = activeStation; }, [activeStation]);
  useEffect(() => { scenarioRef.current = scenarioId; }, [scenarioId]);
  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => { selectRef.current = onSelectStation; }, [onSelectStation]);
  useEffect(() => { availabilityRef.current = onAvailabilityChange; }, [onAvailabilityChange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch {
      availabilityRef.current(false);
      return;
    }

    availabilityRef.current(true);
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07111f);
    scene.fog = new THREE.Fog(0x07111f, 8, 18);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40);
    camera.position.set(0, 3.5, 7.6);

    const world = new THREE.Group();
    scene.add(world);

    const hemi = new THREE.HemisphereLight(0xb9e6ff, 0x182035, 2.2);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0xfff0d5, 4.4);
    key.position.set(-3, 7, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 18;
    scene.add(key);
    const accent = new THREE.PointLight(0x8b5cf6, 28, 10, 2);
    accent.position.set(2.8, 2.4, 2.2);
    scene.add(accent);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 14),
      new THREE.MeshStandardMaterial({ color: 0x111c2d, roughness: 0.92, metalness: 0.05 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.72;
    floor.receiveShadow = true;
    world.add(floor);

    const wall = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 9),
      new THREE.MeshStandardMaterial({ color: 0x0c1828, roughness: 0.96 })
    );
    wall.position.set(0, 2.1, -3.25);
    wall.receiveShadow = true;
    world.add(wall);

    const windowFrame = new THREE.Mesh(
      new THREE.BoxGeometry(4.1, 2.3, 0.08),
      new THREE.MeshStandardMaterial({ color: 0x20314b, metalness: 0.35, roughness: 0.45 })
    );
    windowFrame.position.set(-3.9, 2.1, -3.12);
    world.add(windowFrame);
    const windowGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(3.7, 1.9),
      new THREE.MeshBasicMaterial({ color: 0x193e60 })
    );
    windowGlow.position.set(-3.9, 2.1, -3.06);
    world.add(windowGlow);
    for (let index = 0; index < 16; index += 1) {
      const buildingLight = new THREE.Mesh(
        new THREE.PlaneGeometry(0.12, 0.2),
        new THREE.MeshBasicMaterial({ color: index % 3 === 0 ? 0xfde68a : 0x4f87ad })
      );
      buildingLight.position.set(-5.2 + (index % 8) * 0.38, 1.5 + Math.floor(index / 8) * 0.7, -3.0);
      world.add(buildingLight);
    }

    const desk = new THREE.Mesh(
      new THREE.BoxGeometry(6.6, 0.22, 2.35),
      new THREE.MeshStandardMaterial({ color: 0x563a2e, roughness: 0.56, metalness: 0.05 })
    );
    desk.position.set(0, -0.76, 0);
    desk.castShadow = true;
    desk.receiveShadow = true;
    world.add(desk);
    const legMaterial = new THREE.MeshStandardMaterial({ color: 0x253044, metalness: 0.68, roughness: 0.35 });
    [[-2.75, -1.28, -0.82], [2.75, -1.28, -0.82], [-2.75, -1.28, 0.82], [2.75, -1.28, 0.82]].forEach((position) => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.92, 0.16), legMaterial);
      leg.position.set(position[0], position[1], position[2]);
      leg.castShadow = true;
      world.add(leg);
    });

    const clickable: THREE.Mesh[] = [];
    const stationRoots: Partial<Record<LabStation, THREE.Object3D>> = {};
    const restingScale = new THREE.Vector3(1, 1, 1);

    const registerStation = (mesh: THREE.Mesh, station: LabStation) => {
      mesh.userData.station = station;
      clickable.push(mesh);
    };

    const monitor = new THREE.Group();
    monitor.position.set(0, 0.1, -0.35);
    const monitorBody = new THREE.Mesh(
      new THREE.BoxGeometry(2.85, 1.72, 0.18),
      new THREE.MeshStandardMaterial({ color: 0x172033, metalness: 0.72, roughness: 0.24 })
    );
    monitorBody.castShadow = true;
    monitor.add(monitorBody);
    const monitorScreenMaterial = new THREE.MeshStandardMaterial({
      color: 0x17153b,
      emissive: stationColors.prompt,
      emissiveIntensity: 0.38,
      roughness: 0.25,
    });
    const monitorScreen = new THREE.Mesh(new THREE.PlaneGeometry(2.55, 1.42), monitorScreenMaterial);
    monitorScreen.position.z = 0.101;
    registerStation(monitorScreen, "prompt");
    monitor.add(monitorScreen);
    const promptLines: THREE.Mesh[] = [];
    [1.78, 2.18, 1.48, 2.02].forEach((width, index) => {
      const line = new THREE.Mesh(
        new THREE.PlaneGeometry(width, 0.055),
        new THREE.MeshBasicMaterial({ color: index === 0 ? 0xd8b4fe : 0x7dd3fc, transparent: true, opacity: 0.78 })
      );
      line.position.set(-0.24 + width * 0.02, 0.42 - index * 0.25, 0.11);
      monitor.add(line);
      promptLines.push(line);
    });
    const stand = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.65, 0.18), legMaterial);
    stand.position.y = -1.12;
    monitor.add(stand);
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.08, 0.65), legMaterial);
    base.position.y = -1.43;
    monitor.add(base);
    stationRoots.prompt = monitor;
    world.add(monitor);

    const notebook = new THREE.Group();
    notebook.position.set(-2.25, -0.56, 0.42);
    notebook.rotation.y = -0.14;
    const cover = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.08, 1.72),
      new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.55 })
    );
    cover.castShadow = true;
    registerStation(cover, "brief");
    notebook.add(cover);
    const page = new THREE.Mesh(
      new THREE.BoxGeometry(1.25, 0.055, 1.55),
      new THREE.MeshStandardMaterial({ color: 0xf7f3e8, roughness: 0.9 })
    );
    page.position.y = 0.07;
    registerStation(page, "brief");
    notebook.add(page);
    for (let index = 0; index < 5; index += 1) {
      const line = new THREE.Mesh(
        new THREE.PlaneGeometry(0.88 - index * 0.05, 0.018),
        new THREE.MeshBasicMaterial({ color: 0x7890a8 })
      );
      line.rotation.x = -Math.PI / 2;
      line.position.set(-0.08, 0.102, -0.45 + index * 0.2);
      notebook.add(line);
    }
    const pen = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.035, 1.55, 12),
      new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.35, roughness: 0.4 })
    );
    pen.rotation.z = Math.PI / 2;
    pen.rotation.y = -0.35;
    pen.position.set(0.68, 0.13, 0);
    notebook.add(pen);
    stationRoots.brief = notebook;
    world.add(notebook);

    const reviewPad = new THREE.Group();
    reviewPad.position.set(2.25, -0.52, 0.25);
    reviewPad.rotation.y = 0.18;
    const tablet = new THREE.Mesh(
      new THREE.BoxGeometry(1.55, 0.11, 1.92),
      new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.5, roughness: 0.25 })
    );
    tablet.castShadow = true;
    registerStation(tablet, "review");
    reviewPad.add(tablet);
    const tabletScreenMaterial = new THREE.MeshStandardMaterial({
      color: 0x052e2b,
      emissive: stationColors.review,
      emissiveIntensity: 0.2,
    });
    const tabletScreen = new THREE.Mesh(new THREE.PlaneGeometry(1.35, 1.7), tabletScreenMaterial);
    tabletScreen.rotation.x = -Math.PI / 2;
    tabletScreen.position.y = 0.061;
    registerStation(tabletScreen, "review");
    reviewPad.add(tabletScreen);
    [0.9, 1.08, 0.72].forEach((width, index) => {
      const line = new THREE.Mesh(
        new THREE.PlaneGeometry(width, 0.035),
        new THREE.MeshBasicMaterial({ color: index === 1 ? 0xfca5a5 : 0xa7f3d0 })
      );
      line.rotation.x = -Math.PI / 2;
      line.position.set(-0.1, 0.07, -0.48 + index * 0.34);
      reviewPad.add(line);
    });
    stationRoots.review = reviewPad;
    world.add(reviewPad);

    const lampShade = new THREE.Mesh(
      new THREE.ConeGeometry(0.38, 0.5, 24, 1, true),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.14, side: THREE.DoubleSide })
    );
    lampShade.position.set(3.3, 0.15, -0.65);
    world.add(lampShade);
    const lampLight = new THREE.PointLight(0xffc46b, 12, 4, 2);
    lampLight.position.set(3.3, -0.05, -0.4);
    world.add(lampLight);

    const markerMaterial: Partial<Record<LabStation, THREE.MeshBasicMaterial>> = {};
    (["brief", "prompt", "review"] as LabStation[]).forEach((station) => {
      const root = stationRoots[station];
      if (!root) return;
      const material = new THREE.MeshBasicMaterial({
        color: stationColors[station],
        transparent: true,
        opacity: 0.28,
        side: THREE.DoubleSide,
      });
      const marker = new THREE.Mesh(new THREE.RingGeometry(0.2, 0.25, 32), material);
      marker.rotation.x = -Math.PI / 2;
      marker.position.copy(root.position);
      marker.position.y = -0.61;
      marker.scale.setScalar(station === "prompt" ? 1.8 : 1.35);
      markerMaterial[station] = material;
      world.add(marker);
    });

    const focusPositions: Record<LabStation, THREE.Vector3> = {
      brief: new THREE.Vector3(-3.8, 2.8, 5.4),
      prompt: new THREE.Vector3(0, 2.6, 5.2),
      review: new THREE.Vector3(3.8, 2.8, 5.4),
    };
    const focusTargets: Record<LabStation, THREE.Vector3> = {
      brief: new THREE.Vector3(-2.15, -0.25, 0.2),
      prompt: new THREE.Vector3(0, 0.15, -0.2),
      review: new THREE.Vector3(2.15, -0.2, 0.2),
    };

    const resize = () => {
      const width = canvas.clientWidth || 760;
      const height = canvas.clientHeight || 520;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const stationAtPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(clickable, false)[0];
      return hit?.object.userData.station as LabStation | undefined;
    };
    const onPointerMove = (event: PointerEvent) => {
      canvas.style.cursor = stationAtPointer(event) ? "pointer" : "default";
    };
    const onPointerDown = (event: PointerEvent) => {
      const station = stationAtPointer(event);
      if (station) selectRef.current(station);
    };
    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerdown", onPointerDown);

    let isVisible = !document.hidden;
    const onVisibilityChange = () => { isVisible = !document.hidden; };
    document.addEventListener("visibilitychange", onVisibilityChange);

    let frame = 0;
    const animate = (time: number) => {
      frame = requestAnimationFrame(animate);
      if (!isVisible) return;

      const station = stationRef.current;
      const desired = focusPositions[station];
      if (reducedMotion || pausedRef.current) camera.position.copy(desired);
      else camera.position.lerp(desired, 0.045);
      camera.lookAt(focusTargets[station]);

      (Object.keys(markerMaterial) as LabStation[]).forEach((keyName) => {
        const material = markerMaterial[keyName];
        if (!material) return;
        material.opacity = keyName === station ? 0.95 : 0.2;
      });
      monitorScreenMaterial.emissiveIntensity = station === "prompt" ? 0.8 : 0.28;
      tabletScreenMaterial.emissiveIntensity = station === "review" ? 0.6 : 0.16;

      if (!reducedMotion && !pausedRef.current) {
        const pulse = 1 + Math.sin(time * 0.0022) * 0.025;
        stationRoots[station]?.scale.setScalar(pulse);
        (Object.keys(stationRoots) as LabStation[]).forEach((keyName) => {
          if (keyName !== station) stationRoots[keyName]?.scale.lerp(restingScale, 0.08);
        });
        promptLines.forEach((line, index) => {
          (line.material as THREE.MeshBasicMaterial).opacity = 0.55 + Math.sin(time * 0.002 + index) * 0.2;
        });
      }

      const campus = scenarioRef.current === "estudiante";
      accent.color.setHex(campus ? 0x2563eb : 0x8b5cf6);
      renderer.render(scene, camera);
      canvas.dataset.ready = "true";
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      resizeObserver.disconnect();
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points)) return;
        object.geometry.dispose();
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
        else object.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="learning-room__canvas" aria-hidden="true" tabIndex={-1} />;
}
