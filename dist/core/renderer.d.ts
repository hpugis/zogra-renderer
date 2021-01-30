/// <reference types="gl-matrix" />
import { GLContext } from "./global";
import { Mesh } from "./mesh";
import { Material } from "./material";
import { Color } from "../types/color";
import { mat4 } from "../types/mat4";
import { RenderTarget } from "./render-target";
import { RenderTexture, DepthTexture, Texture } from "./texture";
import { vec2 } from "../types/vec2";
import { BuiltinAssets } from "../builtin-assets/assets";
import { UniformType, UniformValueType } from "./types";
import { Lines } from "./lines";
export declare class ZograRenderer {
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    ctx: GLContext;
    assets: BuiltinAssets;
    private width;
    private height;
    viewProjectionMatrix: import("gl-matrix").mat4;
    viewMatrix: import("gl-matrix").mat4;
    projectionMatrix: import("gl-matrix").mat4;
    private target;
    private shader;
    private globalUniforms;
    private globalTextures;
    constructor(canvasElement: HTMLCanvasElement, width?: number, height?: number);
    use(): void;
    setSize(width: number, height: number): void;
    get canvasSize(): vec2;
    setViewProjection(view: mat4, projection: mat4): void;
    setRenderTarget(rt: RenderTarget): void;
    setRenderTarget(colorAttachments: RenderTexture, depthAttachment?: DepthTexture): void;
    setRenderTarget(colorAttachments: RenderTexture[], depthAttachment?: DepthTexture): void;
    clear(color?: Color, clearDepth?: boolean): void;
    blit(src: Texture, dst: RenderTarget | RenderTexture | RenderTexture[], material?: Material): void;
    private useShader;
    private setupTransforms;
    private setupGlobalUniforms;
    drawMesh(mesh: Mesh, transform: mat4, material: Material): void;
    drawLines(lines: Lines, transform: mat4, material: Material): void;
    setGlobalUniform<T extends UniformType>(name: string, type: T, value: UniformValueType<T>): void;
    unsetGlobalUniform(name: string): void;
    setGlobalTexture(name: string, texture: Texture): void;
    unsetGlobalTexture(name: string): void;
}
