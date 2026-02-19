"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function InfiniteGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame(({ clock }) => {
    if (!gridRef.current) return;
    gridRef.current.position.z = (clock.elapsedTime * 0.3) % 1;
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[40, 40, "#00ff4118", "#00ff410a"]}
      position={[0, -2.5, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

function HoloSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current || !wireRef.current) return;
    const t = clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.15 + pointer.x * 0.5;
    meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.2 + pointer.y * 0.3;
    wireRef.current.rotation.y = t * 0.15 + pointer.x * 0.5;
    wireRef.current.rotation.x = Math.sin(t * 0.1) * 0.2 + pointer.y * 0.3;
    const scale = 1 + Math.sin(t * 1.5) * 0.03;
    meshRef.current.scale.setScalar(scale);
    wireRef.current.scale.setScalar(scale);
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial color="#00ff41" transparent opacity={0.04} side={THREE.DoubleSide} />
      </mesh>
      <lineSegments ref={wireRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <lineBasicMaterial color="#00ff41" transparent opacity={0.25} />
      </lineSegments>
      <pointLight color="#00ff41" intensity={1} distance={6} position={[0, 0, 0]} />
    </group>
  );
}

function OrbitRing({ radius, speed, color, tilt }: { radius: number; speed: number; color: string; tilt: number }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const dotRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ringRef.current || !dotRef.current) return;
    ringRef.current.rotation.x = tilt;
    ringRef.current.rotation.z = tilt * 0.5;
    const t = clock.elapsedTime * speed;
    dotRef.current.position.x = Math.cos(t) * radius;
    dotRef.current.position.z = Math.sin(t) * radius;
    dotRef.current.position.y = Math.sin(t) * radius * Math.sin(tilt);
  });

  return (
    <group>
      <mesh ref={ringRef}>
        <torusGeometry args={[radius, 0.005, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

function HUDPanel({
  position,
  label,
  value,
  color,
  orbitSpeed,
  orbitRadius,
}: {
  position: [number, number, number];
  label: string;
  value: string;
  color: string;
  orbitSpeed: number;
  orbitRadius: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock, camera }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime * orbitSpeed;
    groupRef.current.position.x = Math.cos(t) * orbitRadius + position[0];
    groupRef.current.position.z = Math.sin(t) * orbitRadius * 0.3 + position[2];
    groupRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.15;
    groupRef.current.lookAt(camera.position);
  });

  return (
    <Float speed={2} floatIntensity={0.1}>
      <group ref={groupRef}>
        <mesh>
          <planeGeometry args={[0.8, 0.4]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 0.001]}>
          <planeGeometry args={[0.78, 0.38]} />
          <meshBasicMaterial color={color} transparent opacity={0.05} side={THREE.DoubleSide} />
        </mesh>
        {/* border */}
        <lineSegments position={[0, 0, 0.002]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(0.8, 0.4)]} />
          <lineBasicMaterial color={color} transparent opacity={0.4} />
        </lineSegments>
        {/* status dot */}
        <mesh position={[-0.3, 0.1, 0.003]}>
          <circleGeometry args={[0.02, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
        {/* fake text lines */}
        <mesh position={[0.05, 0.1, 0.003]}>
          <planeGeometry args={[0.35, 0.03]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
        <mesh position={[0, -0.05, 0.003]}>
          <planeGeometry args={[0.5, 0.08]} />
          <meshBasicMaterial color={color} transparent opacity={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

function ScanLine() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    meshRef.current.position.y = Math.sin(t * 0.4) * 2;
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.03 + Math.sin(t * 2) * 0.02;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[20, 0.02]} />
      <meshBasicMaterial color="#00ff41" transparent opacity={0.04} side={THREE.DoubleSide} />
    </mesh>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 5));

  useFrame(({ pointer }) => {
    target.current.x = THREE.MathUtils.lerp(target.current.x, pointer.x * 1.5, 0.02);
    target.current.y = THREE.MathUtils.lerp(target.current.y, pointer.y * 0.8, 0.02);
    target.current.z = 5;
    camera.position.lerp(target.current, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function DataStreams() {
  const count = 30;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const data = useMemo(() => {
    const d = [];
    for (let i = 0; i < count; i++) {
      d.push({
        x: (Math.random() - 0.5) * 12,
        z: (Math.random() - 0.5) * 8 - 2,
        speed: 0.5 + Math.random() * 2,
        offset: Math.random() * 10,
        color: new THREE.Color(
          i % 3 === 0 ? "#00ff41" : i % 3 === 1 ? "#00d4ff" : "#ffb300"
        ),
      });
      d[i].color.multiplyScalar(0.3);
    }
    return d;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const temp = new THREE.Object3D();
    data.forEach((d, i) => {
      const t = clock.elapsedTime * d.speed + d.offset;
      temp.position.set(d.x, ((t % 8) - 4), d.z);
      temp.scale.set(0.015, 0.08 + Math.sin(t * 3) * 0.03, 0.015);
      temp.updateMatrix();
      meshRef.current!.setMatrixAt(i, temp.matrix);
      meshRef.current!.setColorAt(i, d.color);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial transparent opacity={0.8} toneMapped={false} />
    </instancedMesh>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-[2]">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]}>
        <fog attach="fog" args={["#0a0a0a", 5, 18]} />
        <ambientLight intensity={0.15} />
        <CameraRig />
        <InfiniteGrid />
        <HoloSphere />
        <OrbitRing radius={1.8} speed={0.3} color="#00ff41" tilt={0.3} />
        <OrbitRing radius={2.2} speed={-0.2} color="#00d4ff" tilt={-0.5} />
        <OrbitRing radius={2.6} speed={0.15} color="#ffb300" tilt={0.8} />
        <HUDPanel position={[-2.5, 0.8, -1]} label="TICKETS" value="40+/day" color="#00ff41" orbitSpeed={0.08} orbitRadius={0.3} />
        <HUDPanel position={[2.5, 0.5, -1]} label="UPTIME" value="99.9%" color="#00d4ff" orbitSpeed={-0.06} orbitRadius={0.25} />
        <HUDPanel position={[-1.8, -1.2, -0.5]} label="SLA" value="99.2%" color="#ffb300" orbitSpeed={0.1} orbitRadius={0.2} />
        <HUDPanel position={[2, -0.8, -1.5]} label="CSAT" value="★★★★★" color="#00ff41" orbitSpeed={-0.07} orbitRadius={0.35} />
        <DataStreams />
        <ScanLine />
      </Canvas>
    </div>
  );
}
