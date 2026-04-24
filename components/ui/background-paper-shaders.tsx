"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

// Custom shader material for advanced effects
const vertexShader = `
  uniform float time;
  uniform float intensity;
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    
    vec3 pos = position;
    pos.y += sin(pos.x * 10.0 + time) * 0.1 * intensity;
    pos.x += cos(pos.y * 8.0 + time * 1.5) * 0.05 * intensity;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform float time;
  uniform float intensity;
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vec2 uv = vUv;
    
    // Create animated noise pattern
    float noise = sin(uv.x * 20.0 + time) * cos(uv.y * 15.0 + time * 0.8);
    noise += sin(uv.x * 35.0 - time * 2.0) * cos(uv.y * 25.0 + time * 1.2) * 0.5;
    
    // Mix colors based on noise and position
    vec3 color = mix(color1, color2, noise * 0.5 + 0.5);
    color = mix(color, vec3(1.0), pow(abs(noise), 2.0) * intensity);
    
    // Add glow effect
    float glow = 1.0 - length(uv - 0.5) * 2.0;
    glow = pow(glow, 2.0);
    
    gl_FragColor = vec4(color * glow, glow * 0.8);
  }
`

export function ShaderPlane({
  position,
  color1 = "#ff5722",
  color2 = "#ffffff",
}: {
  position: [number, number, number]
  color1?: string
  color2?: string
}) {
  const mesh = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      intensity: { value: 1.0 },
      color1: { value: new THREE.Color(color1) },
      color2: { value: new THREE.Color(color2) },
    }),
    [color1, color2],
  )

  useFrame((state) => {
    if (mesh.current) {
      uniforms.time.value = state.clock.elapsedTime
      uniforms.intensity.value = 1.0 + Math.sin(state.clock.elapsedTime * 2) * 0.3
    }
  })

  return (
    <mesh ref={mesh} position={position}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export function EnergyRing({
  radius = 1,
  position = [0, 0, 0],
}: {
  radius?: number
  position?: [number, number, number]
}) {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.z = state.clock.elapsedTime
      const material = mesh.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3
    }
  })

  return (
    <mesh ref={mesh} position={position}>
      <ringGeometry args={[radius * 0.8, radius, 32]} />
      <meshBasicMaterial color="#ff5722" transparent opacity={0.6} side={THREE.DoubleSide} />
    </mesh>
  )
}

function AnimatedBackdrop() {
  const sceneGroup = useRef<THREE.Group>(null)
  const warmLight = useRef<THREE.PointLight>(null)
  const coolLight = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (sceneGroup.current) {
      sceneGroup.current.rotation.z = Math.sin(time * 0.12) * 0.05
      sceneGroup.current.rotation.y = Math.sin(time * 0.18) * 0.04
      sceneGroup.current.position.y = Math.sin(time * 0.35) * 0.05
      sceneGroup.current.position.x = Math.cos(time * 0.22) * 0.03
    }

    if (warmLight.current) {
      warmLight.current.position.x = -2 + Math.sin(time * 0.4) * 0.6
      warmLight.current.position.y = 1.5 + Math.cos(time * 0.3) * 0.35
      warmLight.current.intensity = 0.5 + Math.sin(time * 0.9) * 0.15
    }

    if (coolLight.current) {
      coolLight.current.position.x = 2 + Math.cos(time * 0.38) * 0.55
      coolLight.current.position.y = -1 + Math.sin(time * 0.28) * 0.3
      coolLight.current.intensity = 0.3 + Math.cos(time * 0.75) * 0.12
    }
  })

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight ref={warmLight} position={[-2, 1.5, 2]} intensity={0.6} color="#ff8c3a" />
      <pointLight ref={coolLight} position={[2, -1, 2]} intensity={0.35} color="#7dd3fc" />
      <group ref={sceneGroup} scale={0.9}>
        <ShaderPlane position={[0, 0, -0.5]} color1="#1d1d1d" color2="#fafafa" />
        <ShaderPlane position={[0.25, -0.15, -0.9]} color1="#0f172a" color2="#ff8c3a" />
      </group>
    </>
  )
}

export function BackgroundPaperShaders({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 2.7], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        className="pointer-events-none"
      >
        <color attach="background" args={['#0a0a0a']} />
        <fog attach="fog" args={['#0a0a0a', 2.4, 7.5]} />
        <AnimatedBackdrop />
      </Canvas>
      <div className="absolute inset-0 motion-safe:animate-[hero-glow-drift_18s_ease-in-out_infinite] bg-[radial-gradient(circle_at_20%_18%,rgba(0,255,255,0.12),transparent_22%),radial-gradient(circle_at_76%_22%,rgba(255,0,170,0.1),transparent_24%),radial-gradient(circle_at_70%_72%,rgba(255,201,94,0.1),transparent_22%),linear-gradient(180deg,rgba(10,10,10,0.2)_0%,rgba(10,10,10,0.42)_58%,rgba(10,10,10,0.68)_100%)]" />
      <div className="absolute inset-0 opacity-60 mix-blend-screen motion-safe:animate-[hero-glow-orbit_22s_ease-in-out_infinite] bg-[radial-gradient(circle_at_15%_25%,rgba(255,138,58,0.16),transparent_20%),radial-gradient(circle_at_82%_18%,rgba(125,211,252,0.12),transparent_18%),radial-gradient(circle_at_55%_78%,rgba(255,255,255,0.08),transparent_16%)]" />
    </div>
  )
}
