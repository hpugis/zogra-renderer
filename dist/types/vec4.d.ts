import { Vector3 } from "./vec3";
import { Vector2 } from "./vec2";
export interface Vector {
    magnitude: number;
    normalized: ThisType<this>;
    equals(v: any): boolean;
}
export declare type vec4 = Vector4;
declare const V4Constructor: new (...p: [number, number, number, number]) => [number, number, number, number];
export declare class Vector4 extends V4Constructor implements Vector {
    get x(): number;
    set x(x: number);
    get y(): number;
    set y(y: number);
    get z(): number;
    set z(z: number);
    get w(): number;
    set w(w: number);
    get magnitude(): number;
    get normalized(): Vector4;
    get negative(): Vector4;
    get inversed(): Vector4;
    constructor(x: number, y: number, z?: number, w?: number);
    static zero(): Vector4;
    static one(): Vector4;
    plus(v: Vector4): this;
    minus(v: Vector4): this;
    mul(v: Vector4): this;
    div(v: Vector4): this;
    dot(v: Vector4): number;
    normalize(): Vector4;
    inverse(): this;
    negate(): this;
    clone(): Vector4;
    equals(v: any): boolean;
    __to(type: Function): Vector3 | Vector2 | Vector4;
}
export declare function vec4(x: number): Vector4;
export declare namespace vec4 {
    var from: (src: Iterable<number>) => Vector4;
    var floor: (v: Vector4) => Vector4;
    var zero: typeof Vector4.zero;
    var one: typeof Vector4.one;
}
export declare function vec4(x: number, y: number, z: number, w: number): Vector4;
export declare namespace vec4 {
    var from: (src: Iterable<number>) => Vector4;
    var floor: (v: Vector4) => Vector4;
    var zero: typeof Vector4.zero;
    var one: typeof Vector4.one;
}
export {};
