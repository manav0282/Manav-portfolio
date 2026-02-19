"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 80 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  const { posAttr, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const vels = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      vels[i * 3] = (Math.random() - 0.5) * 0.005;
      vels[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vels[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return {
      posAttr: new THREE.BufferAttribute(positions, 3),
      velocities: vels,
    };
  }, [count]);

  useFrame(({ pointer }) => {
    if (!mesh.current) return;
    mousePos.current.x = pointer.x * 2;
    mousePos.current.y = pointer.y * 2;
    const pos = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3] += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3 + 2] += velocities[i * 3 + 2];
      const dx = mousePos.current.x - pos[i * 3] * 0.2;
      const dy = mousePos.current.y - pos[i * 3 + 1] * 0.2;
      pos[i * 3] += dx * 0.0003;
      pos[i * 3 + 1] += dy * 0.0003;
      for (let a = 0; a < 3; a++) {
        const idx = i * 3 + a;
        const limit = a === 2 ? 5 : 10;
        if (Math.abs(pos[idx]) > limit) velocities[idx] *= -1;
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y += 0.0002;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <primitive attach="attributes-position" object={posAttr} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00ff41"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function ConnectionLines({ count = 80 }: { count?: number }) {
  const lineRef = useRef<THREE.LineSegments>(null);

  const lineAttr = useMemo(
    () => new THREE.BufferAttribute(new Float32Array(count * count * 6), 3),
    [count]
  );

  useFrame(({ scene }) => {
    if (!lineRef.current) return;
    const points = scene.children.find(
      (c) => c instanceof THREE.Points
    ) as THREE.Points | undefined;
    if (!points) return;
    const pos = points.geometry.attributes.position.array as Float32Array;
    const arr = lineAttr.array as Float32Array;
    let idx = 0;
    const maxDist = 3;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < maxDist && idx < arr.length - 6) {
          arr[idx++] = pos[i * 3];
          arr[idx++] = pos[i * 3 + 1];
          arr[idx++] = pos[i * 3 + 2];
          arr[idx++] = pos[j * 3];
          arr[idx++] = pos[j * 3 + 1];
          arr[idx++] = pos[j * 3 + 2];
        }
      }
    }
    for (let i = idx; i < arr.length; i++) arr[i] = 0;
    lineAttr.needsUpdate = true;
    lineRef.current.geometry.setDrawRange(0, idx / 3);
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <primitive attach="attributes-position" object={lineAttr} />
      </bufferGeometry>
      <lineBasicMaterial color="#00ff41" transparent opacity={0.08} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
}

export default function ParticleField() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 1.5]}>
        <Particles count={80} />
        <ConnectionLines count={80} />
      </Canvas>
    </div>
  );
}
