import { mat4 as glMat4, quat as glQuat } from "gl-matrix";
export declare type mat4 = glMat4;
export declare function Matrix4x4(values: number[]): glMat4;
export declare namespace Matrix4x4 {
    var identity: () => glMat4;
    var rts: (rotation: glQuat, translation: import("./vec3").Vector3, scale: import("./vec3").Vector3) => glMat4;
    var translate: (translate: import("./vec3").Vector3) => glMat4;
    var invert: (m: glMat4) => glMat4;
    var getTranslation: (m: glMat4) => import("./vec3").Vector3;
    var getRotation: (m: glMat4) => glQuat;
    var getScaling: (m: glMat4) => import("./vec3").Vector3;
    var mulPoint: (m: glMat4, p: import("./vec3").Vector3) => import("./vec3").Vector3;
    var mulVector: (m: glMat4, v: import("./vec3").Vector3) => import("./vec3").Vector3;
    var mulVec4: (m: glMat4, v: import("./vec4").Vector4) => import("./vec4").Vector4;
    var perspective: (fov: number, aspect: number, near: number, far: number) => glMat4;
    var transpose: (m: glMat4) => glMat4;
    var ortho: typeof orthogonal;
    var rotate: (m: glMat4, axis: import("./vec3").Vector3, rad: number) => glMat4;
    var scale: (m: glMat4, scaling: import("./vec3").Vector3) => glMat4;
    var fromRotation: (axis: import("./vec3").Vector3, rad: number) => glMat4;
    var fromScaling: (scaling: import("./vec3").Vector3) => glMat4;
    var equal: (a: any, b: any) => boolean;
    var mul: ArithmetricFunction<glMat4>;
}
declare function orthogonal(height: number, aspect: number, near: number, far: number): mat4;
declare function orthogonal(left: number, right: number, bottom: number, top: number, near: number, far: number): mat4;
declare type ArithmetricFunction<T> = {
    (out: T, a: T, b: T): T;
    (a: T, b: T): T;
};
export declare const mat4: typeof Matrix4x4;
export {};
