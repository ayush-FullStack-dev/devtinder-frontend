"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    Bounds,
    Center,
    Environment,
    useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

function Laptop() {
    const { scene } = useGLTF("/models/laptop.glb");

    const configured = useRef(false);

    if (!configured.current) {
        scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
                object.castShadow = false;
                object.receiveShadow = false;

                if (object.material instanceof THREE.MeshStandardMaterial) {
                    object.material.envMapIntensity = 0.8;
                }
            }
        });

        configured.current = true;
    }

    return <primitive object={scene} />;
}

useGLTF.preload("/models/laptop.glb");

export default function LaptopModel() {
    return (
        <Canvas
            camera={{
                position: [0, 0, 5],
                fov: 40,
                near: 0.1,
                far: 100,
            }}
            dpr={[1, 1.5]}
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1,
            }}
            performance={{
                min: 0.5,
                max: 1,
                debounce: 200,
            }}
        >
      
            <ambientLight intensity={0.55} />

            <directionalLight
                position={[4, 6, 5]}
                intensity={1.5}
            />

      
            <directionalLight
                position={[-4, 2, 3]}
                intensity={0.35}
            />

            <Environment
                preset="studio"
                environmentIntensity={0.7}
            />

            <Bounds
                fit
                clip
                observe
                margin={1.5}
            >
                <Center>
                    <group position={[1, 0, 0]}>
                        <Suspense fallback={null}>
                            <Laptop />
                        </Suspense>
                    </group>
                </Center>
            </Bounds>

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableDamping
                dampingFactor={0.08}
                rotateSpeed={0.6}
                minPolarAngle={Math.PI * 0.32}
                maxPolarAngle={Math.PI * 0.68}
            />
        </Canvas>
    );
}