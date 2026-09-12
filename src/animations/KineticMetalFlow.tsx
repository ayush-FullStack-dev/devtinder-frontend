"use client";

import { useEffect, useRef } from "react";

type KineticMetalShaderProps = {
    speed?: number;
    colorScale?: number;
    frequency?: number;
    className?: string;
};

const VERTEX_SHADER = `
    attribute vec2 position;

    void main() {
        gl_Position = vec4(position, 0.0, 1.0);
    }
`;

const FRAGMENT_SHADER = `
    precision highp float;

    uniform vec2 u_res;
    uniform float u_time;
    uniform float u_colorScale;
    uniform float u_frequency;
    uniform vec3 u_baseColor;

    vec2 distort(vec2 p, float offset) {
        p += offset;

        for(float i = 1.0; i < 4.0; i++) {
            p.x += 0.3 / i * sin(i * 3.0 * p.y + u_time);
            p.y += 0.3 / i * cos(i * 3.0 * p.x + u_time);
        }

        return p;
    }

    void main() {
        vec2 uv = gl_FragCoord.xy / u_res.xy;

        float r =
            sin(
                distort(uv, 0.0).x *
                u_frequency
            ) * 0.5 + 0.5;

        float g =
            sin(
                distort(uv, 0.02).x *
                u_frequency
            ) * 0.5 + 0.5;

        float b =
            sin(
                distort(uv, 0.04).x *
                u_frequency
            ) * 0.5 + 0.5;

        vec3 color =
            pow(
                vec3(r, g, b),
                vec3(u_colorScale)
            );

        vec3 finalColor =
            mix(
                u_baseColor,
                color,
                0.8
            );

        gl_FragColor =
            vec4(finalColor, 1.0);
    }
`;

const KineticMetalShader = ({
    speed = 0.5,
    colorScale = 8,
    frequency = 5,
    className = "",
}: KineticMetalShaderProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        const gl = canvas.getContext("webgl", {
            alpha: true,
            antialias: false,
            preserveDrawingBuffer: false,
        });

        if (!gl) return;

        const createShader = (
            type: number,
            source: string
        ): WebGLShader | null => {
            const shader = gl.createShader(type);

            if (!shader) return null;

            gl.shaderSource(shader, source);
            gl.compileShader(shader);

            if (
                !gl.getShaderParameter(
                    shader,
                    gl.COMPILE_STATUS
                )
            ) {
                console.error(
                    gl.getShaderInfoLog(shader)
                );

                gl.deleteShader(shader);

                return null;
            }

            return shader;
        };

        const vertexShader = createShader(
            gl.VERTEX_SHADER,
            VERTEX_SHADER
        );

        const fragmentShader = createShader(
            gl.FRAGMENT_SHADER,
            FRAGMENT_SHADER
        );

        if (!vertexShader || !fragmentShader) {
            return;
        }

        const program = gl.createProgram();

        if (!program) {
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            return;
        }

        gl.attachShader(
            program,
            vertexShader
        );

        gl.attachShader(
            program,
            fragmentShader
        );

        gl.linkProgram(program);

        if (
            !gl.getProgramParameter(
                program,
                gl.LINK_STATUS
            )
        ) {
            console.error(
                gl.getProgramInfoLog(program)
            );

            gl.deleteProgram(program);
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);

            return;
        }

        gl.useProgram(program);

        const vertices = new Float32Array([
            -1,
            -1,

             1,
            -1,

            -1,
             1,

            -1,
             1,

             1,
            -1,

             1,
             1,
        ]);

        const buffer = gl.createBuffer();

        if (!buffer) {
            gl.deleteProgram(program);
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);

            return;
        }

        gl.bindBuffer(
            gl.ARRAY_BUFFER,
            buffer
        );

        gl.bufferData(
            gl.ARRAY_BUFFER,
            vertices,
            gl.STATIC_DRAW
        );

        const positionLocation =
            gl.getAttribLocation(
                program,
                "position"
            );

        gl.enableVertexAttribArray(
            positionLocation
        );

        gl.vertexAttribPointer(
            positionLocation,
            2,
            gl.FLOAT,
            false,
            0,
            0
        );

        const resolutionLocation =
            gl.getUniformLocation(
                program,
                "u_res"
            );

        const timeLocation =
            gl.getUniformLocation(
                program,
                "u_time"
            );

        const colorScaleLocation =
            gl.getUniformLocation(
                program,
                "u_colorScale"
            );

        const frequencyLocation =
            gl.getUniformLocation(
                program,
                "u_frequency"
            );

        const baseColorLocation =
            gl.getUniformLocation(
                program,
                "u_baseColor"
            );

        let timeValue = 0;
        let animationId = 0;

        const resize = () => {
            const width =
                canvas.clientWidth;

            const height =
                canvas.clientHeight;

            const devicePixelRatio =
                window.devicePixelRatio;

            canvas.width =
                width *
                devicePixelRatio;

            canvas.height =
                height *
                devicePixelRatio;

            gl.viewport(
                0,
                0,
                canvas.width,
                canvas.height
            );
        };

        const render = () => {
            if (
                !resolutionLocation ||
                !timeLocation ||
                !colorScaleLocation ||
                !frequencyLocation ||
                !baseColorLocation
            ) {
                return;
            }

            timeValue +=
                speed *
                0.015;

            gl.uniform2f(
                resolutionLocation,
                canvas.width,
                canvas.height
            );

            gl.uniform1f(
                timeLocation,
                timeValue
            );

            gl.uniform1f(
                colorScaleLocation,
                colorScale
            );

            gl.uniform1f(
                frequencyLocation,
                frequency
            );

            gl.uniform3f(
                baseColorLocation,
                0.0196,
                0.0196,
                0.0196
            );

            gl.drawArrays(
                gl.TRIANGLES,
                0,
                6
            );

            animationId =
                requestAnimationFrame(
                    render
                );
        };

        resize();

        window.addEventListener(
            "resize",
            resize
        );

        render();

        return () => {
            if (animationId) {
                cancelAnimationFrame(
                    animationId
                );
            }

            window.removeEventListener(
                "resize",
                resize
            );

            gl.deleteProgram(program);
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);

            gl.bindBuffer(
                gl.ARRAY_BUFFER,
                null
            );

            gl.deleteBuffer(buffer);
        };
    }, [
        speed,
        colorScale,
        frequency,
    ]);

    return (
        <canvas
            ref={canvasRef}
            className={`block h-full w-full pointer-events-none ${className}`}
            style={{
                backgroundColor: "#050505",
            }}
            aria-hidden="true"
        />
    );
};

export default KineticMetalShader;