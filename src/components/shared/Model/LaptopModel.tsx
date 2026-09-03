"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
    Environment,
    OrbitControls,
    useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

type LaptopProps = {
    onReady?: () => void;
};

function Laptop({ onReady }: LaptopProps) {
    const { scene } = useGLTF("/models/laptop.glb");
    const readyRef = useRef(false);

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
            if (!(object instanceof THREE.Mesh)) return;

            object.castShadow = false;
            object.receiveShadow = false;

            const materials = Array.isArray(object.material)
                ? object.material
                : [object.material];

            materials.forEach((material) => {
                if (
                    material instanceof THREE.MeshStandardMaterial
                ) {
                    material.envMapIntensity = 0.7;
                }
            });
        });

        if (!readyRef.current) {
            readyRef.current = true;
            onReady?.();
        }
    }, [model, onReady]);

    return <primitive object={model} />;
}

function ResponsiveLaptop({
    onReady,
}: LaptopProps) {
    const { size } = useThree();

    const scale =
        0.25 *
        THREE.MathUtils.clamp(
            size.width / 1440,
            0.75,
            0.80
        );

    return (
        <group scale={scale}>
            <Laptop onReady={onReady} />
        </group>
    );
}

export default function LaptopModel({
    onReady,
}: LaptopProps) {
    return (
        <Canvas
            camera={{
                position: [0, 0, 5],
                fov: 32,
                near: 0.1,
                far: 100,
            }}
            dpr={[1, 1.25]}
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
                intensity={1}
            />

            <directionalLight
                position={[-4, 2, 3]}
                intensity={0.35}
            />

            <Environment preset="studio" />

            <ResponsiveLaptop
                onReady={onReady}
            />

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableDamping={true}
                dampingFactor={0.08}
                rotateSpeed={0.6}
                minPolarAngle={Math.PI * 0.32}
                maxPolarAngle={Math.PI * 0.68}
            />
        </Canvas>
    );
}