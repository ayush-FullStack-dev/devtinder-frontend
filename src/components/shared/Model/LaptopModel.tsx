"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";

function Laptop() {
    const { scene } = useGLTF("/models/laptop.glb");

    return (
        <primitive
            object={scene}
        />
    );
}

useGLTF.preload("/models/laptop.glb");

export default function LaptopModel() {
    return (
        <Canvas camera={{ position: [0, 2, 5], fov: 40 }}>
            <Laptop />
        </Canvas>
    );
}