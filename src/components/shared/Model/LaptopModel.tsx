"use client";

import { Suspense, useMemo, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    Environment,
    useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

function Laptop() {
    const { scene } = useGLTF("/models/laptop.glb");

    const model = useMemo(() => {
        const clone = scene.clone(true);

        clone.updateMatrixWorld(true);

        const box = new THREE.Box3().setFromObject(clone);
        const center = new THREE.Vector3();

        box.getCenter(center);
        clone.position.sub(center);
        clone.updateMatrixWorld(true);

        return clone;
    }, [scene]);

    useEffect(() => {
        model.traverse((object) => {
            if (object instanceof THREE.Mesh) {
                object.castShadow = false;
                object.receiveShadow = false;

                if (
                    object.material instanceof
                    THREE.MeshStandardMaterial
                ) {
                    object.material.envMapIntensity = 0.8;
                }
            }
        });
    }, [model]);

    return <primitive object={model} />;
}

useGLTF.preload("/models/laptop.glb");

export default function LaptopModel() {
    return (
        <Canvas
            className="py-2"
            camera={{
                position: [0, 0, 5],
                fov: 32,
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
            style={{
                width: "100%",
                height: "100%",
                display: "block",
                touchAction: "pan-y",
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

            <group scale={0.19} position={[0, 0, 0]}>
                <Suspense fallback={null}>
                    <Laptop />
                </Suspense>
            </group>

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