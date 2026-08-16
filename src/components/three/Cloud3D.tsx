"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

const MODEL = "/assets/models/cloud-puffy.glb";
useGLTF.preload(MODEL);

type CloudCfg = { pos: [number, number, number]; scale: number; speed: number; drift: number };

// A small field of the same cloud instanced at different depths/scales.
const CLOUDS: CloudCfg[] = [
  { pos: [-3.4, 1.3, -2], scale: 1.5, speed: 0.42, drift: 0.35 },
  { pos: [3.1, 0.5, -1], scale: 2.0, speed: 0.3, drift: 0.28 },
  { pos: [0.2, -1.5, 0.4], scale: 2.5, speed: 0.5, drift: 0.4 },
  { pos: [-1.7, 2.2, -3.4], scale: 1.1, speed: 0.24, drift: 0.22 },
  { pos: [2.4, 2.1, -4], scale: 0.95, speed: 0.36, drift: 0.2 },
];

const CLOUD_MATERIAL = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  roughness: 0.95,
  metalness: 0,
  emissive: new THREE.Color("#cfe8ff"),
  emissiveIntensity: 0.15,
});

function CloudModel({ cfg, reduce }: { cfg: CloudCfg; reduce: boolean }) {
  const { scene } = useGLTF(MODEL);
  const ref = useRef<THREE.Group>(null);

  // Clone the loaded scene per instance and force a soft stylized white material.
  const obj = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) (o as THREE.Mesh).material = CLOUD_MATERIAL;
    });
    return clone;
  }, [scene]);

  useFrame((state) => {
    if (!ref.current || reduce) return;
    const t = state.clock.elapsedTime;
    ref.current.position.x = cfg.pos[0] + Math.sin(t * cfg.speed) * cfg.drift;
    ref.current.position.y = cfg.pos[1] + Math.cos(t * cfg.speed * 0.8) * cfg.drift * 0.5;
    ref.current.rotation.y = Math.sin(t * cfg.speed * 0.3) * 0.15;
  });

  return (
    <group ref={ref} position={cfg.pos} scale={cfg.scale}>
      <primitive object={obj} />
    </group>
  );
}

/**
 * <Cloud3D /> — a lazy, pointer-transparent WebGL layer of drifting 3D clouds
 * (a Meshy-generated GLB, re-materialed to soft stylized white). Sits behind the
 * hero content over the sky gradient. Import via next/dynamic with ssr:false.
 */
export function Cloud3D({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true }}
        style={{ position: "absolute", inset: 0 }}
      >
        <ambientLight intensity={0.9} />
        <hemisphereLight args={["#ffffff", "#bfe4ff", 0.65]} />
        <directionalLight position={[5, 8, 5]} intensity={1.15} />
        <Suspense fallback={null}>
          {CLOUDS.map((cfg, i) => (
            <CloudModel key={i} cfg={cfg} reduce={reduce} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}
