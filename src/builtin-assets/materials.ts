import { Shader } from "../core/shader";
import { BuiltinShaders } from "./shaders";
import { MaterialFromShader, materialDefine, shaderProp } from "../core/material";
import { Color } from "../types/color";
import { MaterialType } from "../core/material-type";
import { Texture } from "../core/texture";
import { vec2 } from "../types/vec2";

export function createDefaultMaterialType(gl: WebGL2RenderingContext, defaultTex: Texture): typeof DefaultMaterialType
{
    const shader = new Shader(BuiltinShaders.DefaultVert, BuiltinShaders.DefaultFrag, BuiltinShaders.DefaultShaderAttributes, gl);

    @materialDefine
    class DefaultMaterial extends MaterialFromShader(shader)
    {
        @shaderProp("uColor", "color")
        color: Color = Color.white;
        @shaderProp("uMainTex,", "tex2d")
        mainTexture: Texture = defaultTex;
    };

    return DefaultMaterial;
}

export function createBuiltinMaterial(gl: WebGL2RenderingContext, types: ReturnType<typeof createBuiltinMaterialTypes>)
{
    return {
        default: new types.DefaultMaterial(gl),
        blitCopy: new types.BlitCopy(gl),
    };
}

export function createBuiltinMaterialTypes(gl: WebGL2RenderingContext, defaultTex: Texture)
{
    @materialDefine
    class DefaultMaterial extends MaterialFromShader(new Shader(BuiltinShaders.DefaultVert, BuiltinShaders.DefaultFrag, BuiltinShaders.DefaultShaderAttributes, gl))
    {
        @shaderProp("uColor", "color")
        color: Color = Color.white;
        @shaderProp("uMainTex,", "tex2d")
        mainTexture: Texture = defaultTex;
    }

    @materialDefine
    class BlitCopy extends MaterialFromShader(new Shader(BuiltinShaders.DefaultVert, BuiltinShaders.BlitCopy, BuiltinShaders.DefaultShaderAttributes, gl))
    {
        @shaderProp("uFlip", "vec2")
        flip: vec2 = vec2(0, 0);
    }

    return {
        DefaultMaterial: DefaultMaterial as typeof DefaultMaterialType,
        BlitCopy: BlitCopy as typeof BlitCopyType,
    };
}

declare class DefaultMaterialType extends MaterialType
{
    color: Color;
    mainTexture: Texture;
}

declare class BlitCopyType extends MaterialType
{
    flip: vec2;
}