"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Billboard } from "@react-three/drei";
import * as THREE from "three";

const SKILL_NODES = [
  { name: "JavaScript", pos: [-2.5, 1.2, 0], color: "#f7df1e", size: 0.2 },
  { name: "React", pos: [-1, 2, -0.5], color: "#61dafb", size: 0.18 },
  { name: "Next.js", pos: [1.5, 1.5, 0.3], color: "#ffffff", size: 0.17 },
  { name: "HTML/CSS", pos: [3, 0.5, -0.3], color: "#e34f26", size: 0.16 },
  { name: "Zendesk", pos: [-3, -0.5, 0.2], color: "#03363d", size: 0.19 },
  { name: "Jira", pos: [-1.5, -1.5, -0.5], color: "#0052cc", size: 0.17 },
  { name: "ServiceNow", pos: [0.5, -2, 0], color: "#81b5a1", size: 0.16 },
  { name: "Windows", pos: [2.5, -1, 0.5], color: "#00a4ef", size: 0.18 },
  { name: "Linux", pos: [-0.5, 0.3, 0.8], color: "#fcc624", size: 0.15 },
  { name: "Git", pos: [1, 0, -0.8], color: "#f05032", size: 0.15 },
  { name: "Active Dir", pos: [-2, 0.2, -0.6], color: "#00d4ff", size: 0.16 },
  { name: "REST APIs", pos: [2.8, 1.8, -0.2], color: "#00ff41", size: 0.17 },
  { name: "ITIL", pos: [0, 1, 0.5], color: "#ffb300", size: 0.14 },
  { name: "M365", pos: [-1, -0.5, 0.6], color: "#d83b01", size: 0.16 },
];

function SkillNode({
  name,
  position,
  color,
  size,
}: {
  name: string;
  position: [number, number, number];
  color: string;
  size: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ pointer }) => {
    if (!meshRef.current) return;
    const dx = pointer.x * 0.3;
    const dy = pointer.y * 0.3;
    meshRef.current.position.x = position[0] + dx;
    meshRef.current.position.y = position[1] + dy;
  });

  return (
    <Float speed={1 + Math.random()} floatIntensity={0.4} rotationIntensity={0}>
      <group>
        <mesh ref={meshRef} position={position}>
          <sphereGeometry args={[size, 24, 24]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
        <Billboard position={[position[0], position[1] - size - 0.15, position[2]]}>
          <Text
            fontSize={0.1}
            color="#b0b0b0"
            anchorX="center"
            anchorY="top"
            font="/fonts/JetBrainsMono-Regular.woff"
            characters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/.# "
          >
            {name}
          </Text>
        </Billboard>
      </group>
    </Float>
  );
}

function Connections() {
  const lineRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < SKILL_NODES.length; i++) {
      for (let j = i + 1; j < SKILL_NODES.length; j++) {
        const a = SKILL_NODES[i].pos;
        const b = SKILL_NODES[j].pos;
        const dx = a[0] - b[0];
        const dy = a[1] - b[1];
        const dz = a[2] - b[2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 2.5) {
          positions.push(a[0], a[1], a[2], b[0], b[1], b[2]);
        }
      }
    }
    return new Float32Array(positions);
  }, []);

  useFrame(({ clock }) => {
    if (!lineRef.current) return;
    const mat = lineRef.current.material as THREE.LineBasicMaterial;
    mat.opacity = 0.06 + Math.sin(clock.elapsedTime * 0.5) * 0.02;
  });

  const bufferAttr = useMemo(
    () => new THREE.BufferAttribute(geometry, 3),
    [geometry]
  );

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <primitive attach="attributes-position" object={bufferAttr} />
      </bufferGeometry>
      <lineBasicMaterial
        color="#00ff41"
        transparent
        opacity={0.08}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

export default function FloatingSkills() {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={0.3} />
        <Connections />
        {SKILL_NODES.map((node) => (
          <SkillNode
            key={node.name}
            name={node.name}
            position={node.pos as [number, number, number]}
            color={node.color}
            size={node.size}
          />
        ))}
      </Canvas>
    </div>
  );
}
