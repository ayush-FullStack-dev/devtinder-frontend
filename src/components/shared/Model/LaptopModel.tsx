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
const SCREEN_VIDEO_PATH =
    "/videos/LandingHowItWorks.mp4";

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
        let video: HTMLVideoElement | null = null;
        let videoTexture: THREE.VideoTexture | null =
            null;

        model.traverse((object) => {
            if (!(object instanceof THREE.Mesh)) {
                return;
            }

            object.castShadow = false;
            object.receiveShadow = false;
            object.frustumCulled = true;

            if (object.name === "Screen_Display") {
                video =
                    document.createElement("video");

                video.src = SCREEN_VIDEO_PATH;
                video.loop = true;
                video.muted = true;
                video.playsInline = true;
                video.autoplay = true;
                video.preload = "auto";

                videoTexture =
                    new THREE.VideoTexture(video);

                videoTexture.colorSpace =
                    THREE.SRGBColorSpace;

                videoTexture.center.set(0.5, 0.5);
                videoTexture.rotation = Math.PI;

                videoTexture.minFilter =
                    THREE.LinearFilter;

                videoTexture.magFilter =
                    THREE.LinearFilter;

                videoTexture.generateMipmaps = false;

                const screenMaterial =
                    new THREE.MeshBasicMaterial({
                        map: videoTexture,
                        side: THREE.DoubleSide,
                        toneMapped: false,
                    });

                object.material = screenMaterial;
                screenMaterial.needsUpdate = true;

                const playVideo = () => {
                    void video?.play().catch(() => {});
                };

                video.addEventListener(
                    "loadeddata",
                    playVideo,
                    { once: true }
                );

                video.load();

                return;
            }

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

        if (!readyRef.current) {
            readyRef.current = true;
            onReady?.();
        }

        return () => {
            if (video) {
                video.pause();
                video.removeAttribute("src");
                video.load();
            }

            videoTexture?.dispose();
        };
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
                0.8
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
            Math.sin(time * 0.52) *
            THREE.MathUtils.degToRad(25);

        group.rotation.x =
            Math.sin(time * 0.78) *
            THREE.MathUtils.degToRad(5);

        group.rotation.z =
            Math.sin(time * 0.62) *
            THREE.MathUtils.degToRad(2.5);

        group.position.y =
            Math.sin(time * 0.82) * 0.06;
    });

    return (
        <group
            ref={groupRef}
            scale={scale}
        >
            <MemoizedLaptop
                onReady={onReady}
                isActive={isActive}
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
            frameloop={
                isActive
                    ? "always"
                    : "never"
            }
            style={{
                width: "100%",
                height: "100%",
                display: "block",
                touchAction: "pan-y",
            }}
        >
            <ambientLight intensity={0.45} />

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