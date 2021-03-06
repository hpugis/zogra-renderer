import { Vector, Vector4 } from "./vec4";
import { Vector3 } from "./vec3";
export declare type vec2 = Vector2;
declare const V2Constructor: new (...p: [number, number]) => [number, number];
export declare class Vector2 extends V2Constructor implements Vector {
    get x(): number;
    set x(x: number);
    get y(): number;
    set y(y: number);
    get magnitude(): number;
    get normalized(): Vector2;
    get negative(): Vector2;
    get inversed(): Vector2;
    constructor(x: number, y: number);
    static zero(): Vector2;
    static one(): Vector2;
    static up(): Vector2;
    static down(): Vector2;
    static left(): Vector2;
    static right(): Vector2;
    static distance(u: Vector2, v: Vector2): number;
    static distanceSquared(u: Vector2, v: Vector2): number;
    plus(v: Vector2): this;
    minus(v: Vector2): this;
    mul(v: Vector2): this;
    div(v: Vector2): this;
    dot(v: Vector2): number;
    normalize(): Vector2;
    inverse(): this;
    negate(): this;
    /**
     * cross product with vec3
     * @param a u
     * @param b v
     */
    cross(b: Vector2): number;
    clone(): Vector2;
    toVec3(z?: number): Vector3;
    __to(type: Function): Vector3 | Vector2 | Vector4;
    equals(v: any): boolean;
}
export declare function vec2(x: number): Vector2;
export declare namespace vec2 {
    var from: (src: Iterable<number>) => Vector2;
    var floor: (v: Vector2) => Vector2;
    var zero: typeof Vector2.zero;
    var one: typeof Vector2.one;
    var left: typeof Vector2.left;
    var right: typeof Vector2.right;
    var down: typeof Vector2.down;
    var up: typeof Vector2.up;
}
export declare function vec2(x: number, y: number): Vector2;
export declare namespace vec2 {
    var from: (src: Iterable<number>) => Vector2;
    var floor: (v: Vector2) => Vector2;
    var zero: typeof Vector2.zero;
    var one: typeof Vector2.one;
    var left: typeof Vector2.left;
    var right: typeof Vector2.right;
    var down: typeof Vector2.down;
    var up: typeof Vector2.up;
}
export {};
