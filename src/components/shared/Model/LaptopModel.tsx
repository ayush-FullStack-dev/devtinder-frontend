"use client";

import {
    memo,
    Suspense,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    Canvas,
    useFrame,
    useLoader,
    useThree,
} from "@react-three/fiber";

import {
    Environment,
    Html,
    useProgress,
} from "@react-three/drei";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import * as THREE from "three";
import { LandingHowItWorks_VIDEO_NOSOUND_MP4 } from "@/constants/landing";

type LaptopProps = {
    active?: boolean;
    onReady?: () => void;
};

const MODEL_PATH = "/models/laptop.glb";

function LoadingIndicator() {
    const { progress } = useProgress();

    const percentage = Math.round(
        THREE.MathUtils.clamp(
            progress,
            0,
            100
        )
    );

    return (
        <Html
            center
            style={{
                pointerEvents: "none",
            }}
        >
            <div className="flex w-35 flex-col items-center gap-3">
                <div className="flex w-full items-center justify-between">
                    <span className="text-[10px] font-medium tracking-[0.16em] text-black/40">
                        LOADING
                    </span>

                    <span className="text-[10px] tabular-nums tracking-[0.08em] text-black/40">
                        {percentage}%
                    </span>
                </div>

                <div className="h-px w-full overflow-hidden bg-black/10">
                    <div
                        className="h-full bg-green-brand transition-[width] duration-150 ease-out"
                        style={{
                            width: `${percentage}%`,
                        }}
                    />
                </div>
            </div>
        </Html>
    );
}

function Laptop({
    onReady,
}: {
    onReady?: () => void;
}) {
    const gltf = useLoader(
        GLTFLoader,
        MODEL_PATH
    );

    const model = useMemo(() => {
        const clone =
            gltf.scene.clone(true);

        clone.updateMatrixWorld(true);

        const box =
            new THREE.Box3().setFromObject(
                clone
            );

        const center =
            box.getCenter(
                new THREE.Vector3()
            );

        clone.position.sub(center);

        clone.updateMatrixWorld(true);

        return clone;
    }, [gltf.scene]);

    useEffect(() => {
        let video:
            | HTMLVideoElement
            | null = null;

        let videoTexture:
            | THREE.VideoTexture
            | null = null;

        let screenMaterial:
            | THREE.MeshBasicMaterial
            | null = null;

        model.traverse((object) => {
            if (
                !(object instanceof THREE.Mesh)
            ) {
                return;
            }

            object.castShadow = false;
            object.receiveShadow = false;
            object.frustumCulled = true;

            if (
                object.name ===
                "Screen_Display"
            ) {
                video =
                    document.createElement(
                        "video"
                    );

                video.poster = "/images/posters/landing-how-it-works-poster.webp";
                video.src =
                    LandingHowItWorks_VIDEO_NOSOUND_MP4;

                video.muted = true;
                video.loop = true;
                video.playsInline = true;
                video.autoplay = true;
                video.preload = "auto";

                videoTexture =
                    new THREE.VideoTexture(
                        video
                    );

                videoTexture.colorSpace =
                    THREE.SRGBColorSpace;

                videoTexture.minFilter =
                    THREE.LinearFilter;

                videoTexture.magFilter =
                    THREE.LinearFilter;

                videoTexture.generateMipmaps =
                    false;

                videoTexture.flipY = false;

                screenMaterial =
                    new THREE.MeshBasicMaterial(
                        {
                            map: videoTexture,
                            side: THREE.DoubleSide,
                            toneMapped: false,
                        }
                    );

                object.material =
                    screenMaterial;

                void video
                    .play()
                    .catch(() => { });

                return;
            }

            const materials =
                Array.isArray(
                    object.material
                )
                    ? object.material
                    : [object.material];

            for (const material of materials) {
                if (
                    material instanceof
                    THREE.MeshStandardMaterial
                ) {
                    material.envMapIntensity =
                        0.7;
                }
            }
        });

        onReady?.();

        return () => {
            if (video) {
                video.pause();
                video.removeAttribute(
                    "src"
                );
                video.load();
            }

            videoTexture?.dispose();
            screenMaterial?.dispose();
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
    active = true,
    onReady,
}: LaptopProps) {
    const { size } = useThree();

    const groupRef =
        useRef<THREE.Group>(null);

    const [isPaused, setIsPaused] =
        useState(false);

    const animationTime =
        useRef(0);

    const scale = useMemo(
        () =>
            0.25 *
            THREE.MathUtils.clamp(
                size.width / 1440,
                0.8,
                1.07
            ),
        [size.width]
    );

    useFrame((_, delta) => {
        const group =
            groupRef.current;

        if (!group) {
            return;
        }

        if (
            !active ||
            isPaused
        ) {
            return;
        }

        animationTime.current +=
            Math.min(delta, 0.05);

        const time =
            animationTime.current;

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
            Math.sin(time * 0.82) *
            0.06;
    });

    return (
        <group
            ref={groupRef}
            scale={scale}
            onClick={(event) => {
                event.stopPropagation();

                setIsPaused(
                    (current) => !current
                );
            }}
        >
            <MemoizedLaptop
                onReady={onReady}
            />
        </group>
    );
}

function LaptopScene({
    active,
    onReady,
}: LaptopProps) {
    return (
        <>
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
                active={active}
                onReady={onReady}
            />
        </>
    );
}

function LaptopCanvas({
    active = true,
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
                powerPreference:
                    "high-performance",
                toneMapping:
                    THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1,
            }}
            frameloop={
                active
                    ? "always"
                    : "never"
            }
            style={{
                width: "100%",
                height: "100%",
                display: "block",
                touchAction: "pan-y",
                cursor: "pointer",
            }}
        >
            <Suspense
                fallback={
                    <LoadingIndicator />
                }
            >
                <LaptopScene
                    active={active}
                    onReady={onReady}
                />
            </Suspense>
        </Canvas>
    );
}

export default memo(LaptopCanvas);