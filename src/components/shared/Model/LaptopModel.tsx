"use client";

import {
    memo,
    useEffect,
    useMemo,
    useRef,
} from "react";
import {
    Canvas,
    useFrame,
    useThree,
} from "@react-three/fiber";
import {
    Environment,
    useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

type LaptopProps = {
    onReady?: () => void;
    isActive?: boolean;
};

const MODEL_PATH = "/models/laptop.glb";

function Laptop({
    onReady,
}: LaptopProps) {
    const { scene } = useGLTF(MODEL_PATH);

    const readyRef = useRef(false);

    const model = useMemo(() => {
        const clone = scene.clone(true);

        clone.updateMatrixWorld(true);

        const box = new THREE.Box3().setFromObject(
            clone
        );

        const center = box.getCenter(
            new THREE.Vector3()
        );

        clone.position.sub(center);

        clone.updateMatrixWorld(true);

        return clone;
    }, [scene]);

    useEffect(() => {
        model.traverse((object) => {
            if (!(object instanceof THREE.Mesh)) {
                return;
            }

            object.castShadow = false;
            object.receiveShadow = false;
            object.frustumCulled = true;

            const materials = Array.isArray(
                object.material
            )
                ? object.material
                : [object.material];

            for (const material of materials) {
                if (
                    material instanceof
                    THREE.MeshStandardMaterial
                ) {
                    material.envMapIntensity = 0.7;
                }
            }
        });

        if (readyRef.current) {
            return;
        }

        readyRef.current = true;
        onReady?.();
    }, [model, onReady]);

    return (
        <primitive
            object={model}
            dispose={null}
        />
    );
}

const MemoizedLaptop = memo(Laptop);

function ResponsiveLaptop({
    onReady,
    isActive = true,
}: LaptopProps) {
    const { size } = useThree();

    const groupRef =
        useRef<THREE.Group>(null);

    const scale = useMemo(() => {
        return (
            0.25 *
            THREE.MathUtils.clamp(
                size.width / 1440,
                0.75,
                0.80
            )
        );
    }, [size.width]);

    useFrame(({ clock }) => {
        if (!isActive) {
            return;
        }

        const group = groupRef.current;

        if (!group) {
            return;
        }

        const time = clock.getElapsedTime();

        group.rotation.y =
            time * 0.22;

        group.rotation.x =
            Math.sin(time * 0.65) * 0.055;

        group.rotation.z =
            Math.sin(time * 0.5) * 0.025;

        group.position.y =
            Math.sin(time * 0.7) * 0.055;
    });

    return (
        <group
            ref={groupRef}
            scale={scale}
        >
            <MemoizedLaptop
                onReady={onReady}
            />
        </group>
    );
}

function LaptopCanvas({
    onReady,
    isActive = true,
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
                powerPreference:
                    "high-performance",
                toneMapping:
                    THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1,
            }}
            frameloop="always"
            style={{
                width: "100%",
                height: "100%",
                display: "block",
                touchAction: "pan-y",
            }}
        >
            <ambientLight
                intensity={0.45}
            />

            <directionalLight
                position={[4, 6, 5]}
                intensity={1.35}
            />

            <directionalLight
                position={[-4, 3, 2]}
                intensity={0.45}
            />

            <directionalLight
                position={[2, -1, -5]}
                intensity={0.25}
            />

            <Environment
                preset="studio"
                environmentIntensity={0.8}
            />

            <ResponsiveLaptop
                onReady={onReady}
                isActive={isActive}
            />
        </Canvas>
    );
}

export default memo(LaptopCanvas);

useGLTF.preload(MODEL_PATH);