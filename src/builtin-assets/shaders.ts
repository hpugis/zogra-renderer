import { ShaderAttributeNames, Shader, DepthTest, Blending } from "../core/shader";

const defaultVert = `#version 300 es
precision mediump float;

in vec3 aPos;
in vec4 aColor;
in vec2 aUV;
in vec3 aNormal;

uniform mat4 uTransformM;
uniform mat4 uTransformVP;
uniform mat4 uTransformMVP;

out vec4 vColor;
out vec4 vPos;
out vec2 vUV;
out vec3 vNormal;

void main()
{
    gl_Position = uTransformMVP * vec4(aPos, 1);
    vColor = aColor;
    vUV = aUV;
    vNormal = aNormal;
}
`;

const defaultFrag = `#version 300 es
precision mediump float;

in vec4 vColor;
in vec4 vPos;
in vec2 vUV;

uniform sampler2D uMainTex;
uniform vec4 uColor;

out vec4 fragColor;

void main()
{
    vec4 color = texture(uMainTex, vUV.xy).rgba;
    color = color * vColor * uColor;
    fragColor = color;
}
`;


const blitCopy = `#version 300 es
precision mediump float;

in vec4 vColor;
in vec4 vPos;
in vec2 vUV;
in vec3 vNormal;

uniform sampler2D uMainTex;

out vec4 fragColor;

void main()
{
    fragColor = texture(uMainTex, vUV).rgba;
}
`;

const flipVert = `#version 300 es
precision mediump float;

in vec3 aPos;
in vec2 aUV;

out vec2 vUV;

void main()
{
    gl_Position = vec4(aPos, 1);
    vUV = vec2(aUV.x, vec2(1) - aUV.y);
}`;

const colorVert = `#version 300 es
precision mediump float;

in vec3 aPos;
in vec4 aColor;

uniform mat4 uTransformM;
uniform mat4 uTransformVP;
uniform mat4 uTransformMVP;

out vec4 vColor;
out vec4 vPos;

void main()
{
    gl_Position = uTransformMVP * vec4(aPos, 1);
    vColor = aColor;
}
`;

const colorFrag = `#version 300 es
precision mediump float;

in vec4 vColor;
in vec4 vPos;

out vec4 fragColor;

void main()
{
    fragColor = vColor;
}
`;

const textureFrag = `#version 300 es
precision mediump float;

in vec4 vPos;
in vec2 vUV;

uniform sampler2D uMainTex;

out vec4 fragColor;

void main()
{
    fragColor = texture(uMainTex, vUV).rgba;
}
`;

export const BuiltinShaderSources = {
    DefaultVert: defaultVert,
    DefaultFrag: defaultFrag,
    BlitCopyFrag: blitCopy,
    FlipTexVert: flipVert,
};

export const BuiltinUniformNames = {
    matM: "uTransformM",
    matM_IT: "uTransformM_IT",
    matMInv: "uTransformMInv",
    matVP: "uTransformVP",
    matMVP: "uTransformMVP",
    matMV_IT: "uTransformMV_IT",
    flipUV: "uFlipUV",
    mainTex: "uMainTex",
    color: "uColor",
};

export function compileBuiltinShaders(gl: WebGL2RenderingContext)
{
    return {
        DefaultShader: new Shader(BuiltinShaderSources.DefaultVert, BuiltinShaderSources.DefaultFrag, {name:"DefaultShader"}, gl),
        BlitCopy: new Shader(BuiltinShaderSources.DefaultVert, BuiltinShaderSources.BlitCopyFrag, {
            name: "BlitCopy",
            depth: DepthTest.Always,
            blend: Blending.Disable,
            zWrite: false
        }, gl),
        FlipTexture: new Shader(BuiltinShaderSources.FlipTexVert, BuiltinShaderSources.BlitCopyFrag, {}, gl),
        ColoredLine: new Shader(colorVert, colorFrag, {
            blend: [Blending.SrcAlpha, Blending.OneMinusSrcAlpha],
            depth: DepthTest.Disable,
            zWrite: false,
        }, gl),
        ErrorShader: new Shader(defaultVert, textureFrag, {
            name: "Error"
        }, gl)
    };
}
