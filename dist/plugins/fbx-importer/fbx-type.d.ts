import { vec3, quat, mat4, vec4, vec2 } from "gl-matrix";
export interface FBXFile {
    version: number;
    nodes: FBXNode[];
}
declare type FBXPropertyType = number | bigint | boolean | string | string | Uint8Array | Int32Array | BigInt64Array | Float32Array | Float64Array | boolean[];
export interface FBXNode {
    name: string;
    properties: FBXPropertyType[];
    nestedNodes: FBXNode[];
}
export interface FBXModel {
    name: string;
    transform: FBXTransform;
    meshes: FBXMesh[];
}
interface FBXMesh {
    name: string;
    type: "quad" | "triangle";
    verts: vec3[];
    polygons: number[];
    uv0: vec2[];
    uv1: vec2[];
    normals: vec3[];
    colors: vec4[];
    material: FBXMaterial;
}
interface FBXMaterial {
    name: string;
    [key: string]: string | boolean | number | vec3;
}
declare class FBXTransform {
    readonly model: FBXModel;
    readonly parent: FBXTransform | null;
    children: FBXTransform[];
    localPosition: vec3;
    localRotation: quat;
    localScaling: vec3;
    constructor(model: FBXModel, parent?: FBXTransform | null);
    get position(): vec3;
    set position(position: vec3);
    get rotation(): quat;
    set rotation(rotation: quat);
    get scaling(): vec3;
    set scaling(scaling: vec3);
    get localToWorldMatrix(): mat4;
    get worldToLocalMatrix(): mat4;
}
export {};