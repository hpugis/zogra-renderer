interface AttributeBlock {
    vert: number;
    color: number;
    uv: number;
    normal: number;
}
export interface ShaderAttributes {
    [key: string]: string;
    vert: string;
    color: string;
    uv: string;
    normal: string;
}
export declare class Shader {
    gl: WebGL2RenderingContext;
    program: WebGLProgram;
    vertexShaderSource: string;
    fragmentShaderSouce: string;
    vertexShader: WebGLShader;
    fragmentShader: WebGLShader;
    attributes: AttributeBlock;
    private _compiled;
    get compiled(): boolean;
    constructor(vertexShader: string, fragmentShader: string, attributes?: ShaderAttributes, gl?: WebGL2RenderingContext);
    compile(): void;
}
export {};
