import { quat as glQuat, vec3 as glVec3 } from "gl-matrix";
import { vec3 } from "./vec3";
import { Rad2Deg } from "./math";

export type quat = glQuat;

export function Quaternion()
{
    const quat = glQuat.create();
    return quat;
}
Quaternion.identity = () =>
{
    const quat = glQuat.create(); 
    glQuat.identity(quat);
    return quat;
}
/**
 * @param axis - Axis to rotate around.
 * @param rad - Rotation angle in radians
 */
Quaternion.axis = (axis: vec3, rad: number) =>
{
    return glQuat.setAxisAngle(glQuat.create(), axis, rad);
}
Quaternion.mul = (a: quat, b: quat) =>
{
    const out = glQuat.create();
    return glQuat.mul(out, a, b);
}
Quaternion.invert = (q: quat) =>
{
    const out = glQuat.create();
    return glQuat.invert(out, q);
};
Quaternion.normalize = (q: quat) =>
{
    return glQuat.normalize(glQuat.create(), q);
}
Quaternion.euler = (q: quat) =>
{
    return vec3(
        Math.atan2(2 * (q[3] * q[0] + q[1] * q[2]), (1 - 2 * (q[0] ** 2 + q[1] ** 2))) * Rad2Deg,
        Math.asin(2 * (q[3] * q[1] - q[2] * q[0])) * Rad2Deg,
        Math.atan2(2 * (q[3] * q[2] + q[0] * q[1]), 1 - 2 * (q[1] ** 2, q[2] ** 2)) * Rad2Deg
    );
}
Quaternion.fromEuler = (e: vec3) =>
{
    return glQuat.fromEuler(glQuat.create(), e[0], e[1], e[2]);
}
Quaternion.rotate = (q: quat, v: vec3) =>
{
    return glVec3.transformQuat(vec3(0, 0, 0) as any as glVec3, v, q) as any as vec3;
}
Quaternion.equals = (a: any, b: any) =>
{
    return glQuat.exactEquals(a, b);
}

export const quat = Quaternion;
quat.identity = Quaternion.identity;