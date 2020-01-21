import { Shader } from "./shader";
import "reflect-metadata";
import { MaterialType } from "./material-type";
import "reflect-metadata";
import { RenderData } from "./types";
declare type ShaderPropType = "mat4" | "float" | "vec2" | "vec3" | "vec4" | "color" | "tex2d";
export interface PropertyBlock {
    [key: string]: {
        type: ShaderPropType;
        location: WebGLUniformLocation;
    };
}
export declare class Material {
    [key: string]: any;
    shader: Shader;
    propertyBlock: PropertyBlock;
    gl: WebGL2RenderingContext;
    constructor(shader: Shader, gl?: WebGL2RenderingContext);
    setup(data: RenderData): void;
}
export declare function shaderProp(name: string, type: ShaderPropType): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
export declare function MaterialFromShader(shader: Shader): typeof MaterialType;
export declare function materialDefine<T extends {
    new (...arg: any[]): {};
}>(constructor: T): T;
export {};
