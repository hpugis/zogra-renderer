import { vec4, Vector, Vector4 } from "./vec4";
import { Vector3, vec3 } from "./vec3";

export type vec2 = Vector2;

const V2Constructor: new (...p: [number, number]) => [number, number] = Array as any;
export class Vector2 extends V2Constructor implements Vector
{
    get x() { return this[0]; }
    set x(x: number) { this[0] = x; }
    get y() { return this[1]; }
    set y(y: number) { this[1] = y; }

    get magnitude()
    {
        return Math.hypot(...this);
    }

    get normalized()
    {
        const m = this.magnitude;
        return m == 0 ? vec2.zero() : this.clone().div(vec2(m, m));
    }
    get negative()
    {
        return this.clone().negate();
    }
    get inversed()
    {
        return this.clone().inverse();
    }

    constructor(x: number, y: number)
    {
        super(x, y);
    }
    static zero()
    {
        return new Vector2(0, 0);
    }
    static one()
    {
        return new Vector2(1, 1);
    }
    static up()
    {
        return new Vector2(0, 1);
    }
    static down()
    {
        return new Vector2(0, -1);
    }
    static left() { return new Vector2(-1, 0) }
    static right() { return new Vector2(1, 0) }
    static distance(u: Vector2, v: Vector2)
    {
        return Math.sqrt((u.x - v.x) * (u.x - v.x) + (u.y - v.y) * (u.y - v.y));
    }
    static distanceSquared(u: Vector2, v: Vector2)
    {
        return (u.x - v.x) * (u.x - v.x) + (u.y - v.y) * (u.y - v.y);
    }
    
    plus(v: Vector2)
    {
        this[0] += v[0];
        this[1] += v[1];
        return this;
    }
    minus(v: Vector2)
    {
        this[0] -= v[0];
        this[1] -= v[1];
        return this;
    }
    mul(v: Vector2)
    {
        this[0] *= v[0];
        this[1] *= v[1];
        return this;
    }
    div(v: Vector2)
    {
        this[0] /= v[0];
        this[1] /= v[1];
        return this;
    }
    dot(v: Vector2)
    {
        return this[0] * v[0]
            + this[1] * v[1];
    }
    normalize()
    {
        const m = this.magnitude;
        return m == 0 ? vec2.zero() : this.clone().div(vec2(m, m));
    }
    inverse()
    {
        this[0] = 1 / this[0];
        this[1] = 1 / this[1];
        return this;
    }
    negate()
    {
        this[0] = -this[0];
        this[1] = -this[1];
        return this;
    }
    /**
     * cross product with vec3
     * @param a u
     * @param b v
     */
    cross(b: Vector2)
    {
        return this.x * b.y - this.y * b.x;
    }

    clone()
    {
        return vec2(this[0], this[1]);
    }

    toVec3(z = 0)
    {
        return vec3(this[0], this[1], z);
    }
    __to(type: Function)
    {
        switch (type)
        {
            case Vector4:
                return vec4(this[0], this[1], 0, 0);
            case Vector3:
                return vec3(this[0], this[1], 0);
        }
        return this.clone();
    }

    equals(v: any)
    {
        if (v === undefined)
            return false;
        
        return v[0] === this[0] && v[1] === this[1];
    }
}
export function vec2(x: number): Vector2
export function vec2(x: number, y: number): Vector2
export function vec2(x: number, y = x): Vector2
{
    return new Vector2(x, y);
}
vec2.from = (src: Iterable<number>) =>
{
    const [x = 0, y = 0] = src;
    return vec2(x, y);
}

vec2.floor = (v: vec2) => vec2(Math.floor(v.x), Math.floor(v.y));
vec2.zero = Vector2.zero;
vec2.one = Vector2.one;
vec2.left = Vector2.left;
vec2.right = Vector2.right;
vec2.down = Vector2.down;
vec2.up = Vector2.up;