"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vec3 = exports.Vector3 = void 0;
const vec4_1 = require("./vec4");
const vec2_1 = require("./vec2");
const V3Constructor = Array;
class Vector3 extends V3Constructor {
    get x() { return this[0]; }
    set x(x) { this[0] = x; }
    get y() { return this[1]; }
    set y(y) { this[1] = y; }
    get z() { return this[2]; }
    set z(z) { this[2] = z; }
    get magnitude() {
        return Math.hypot(...this);
    }
    get normalized() {
        const m = this.magnitude;
        return m == 0 ? vec3.zero() : this.clone().div(vec3(m, m, m));
    }
    get negative() {
        return this.clone().negate();
    }
    get inversed() {
        return this.clone().inverse();
    }
    constructor(x, y, z) {
        super(x, y, z);
    }
    static zero() {
        return new Vector3(0, 0, 0);
    }
    static one() {
        return new Vector3(1, 1, 1);
    }
    plus(v) {
        this[0] += v[0];
        this[1] += v[1];
        this[2] += v[2];
        return this;
    }
    minus(v) {
        this[0] -= v[0];
        this[1] -= v[1];
        this[2] -= v[2];
        return this;
    }
    mul(v) {
        this[0] *= v[0];
        this[1] *= v[1];
        this[2] *= v[2];
        return this;
    }
    div(v) {
        this[0] /= v[0];
        this[1] /= v[1];
        this[2] /= v[2];
        return this;
    }
    dot(v) {
        return this[0] * v[0]
            + this[1] * v[1]
            + this[2] * v[2];
    }
    normalize() {
        const m = this.magnitude;
        return m == 0 ? vec3.zero() : this.clone().div(vec3(m, m, m));
    }
    inverse() {
        this[0] = 1 / this[0];
        this[1] = 1 / this[1];
        this[2] = 1 / this[2];
        return this;
    }
    negate() {
        this[0] = -this[0];
        this[1] = -this[1];
        this[2] = -this[2];
        return this;
    }
    /**
     * cross product with vec3
     * @param a u
     * @param b v
     */
    cross(b) {
        return vec3(this.y * b.z - this.z * b.y, this.z * b.x - this.x * b.z, this.x * b.y - this.y * b.x);
    }
    clone() {
        return vec3(this[0], this[1], this[2]);
    }
    toVec2() {
        return vec2_1.vec2(this[0], this[1]);
    }
    equals(v) {
        if (v === undefined)
            return false;
        return v[0] === this[0]
            && v[1] === this[1]
            && v[2] === this[2];
    }
    __to(type) {
        switch (type) {
            case vec4_1.Vector4:
                return vec4_1.vec4(this[0], this[1], this[2], 0);
            case vec2_1.Vector2:
                return vec2_1.vec2(this[0], this[1]);
        }
        return this.clone();
    }
}
exports.Vector3 = Vector3;
function vec3(x, y = x, z = x) {
    return new Vector3(x, y, z);
}
exports.vec3 = vec3;
vec3.from = (src) => {
    const [x = 0, y = 0, z = 0] = src;
    return vec3(x, y, z);
};
vec3.floor = (v) => vec3(Math.floor(v.x), Math.floor(v.y), Math.floor(v.z));
vec3.zero = Vector3.zero;
vec3.one = Vector3.one;
//# sourceMappingURL=vec3.js.map