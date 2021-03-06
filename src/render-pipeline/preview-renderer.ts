import { ZograRenderPipeline, RenderContext, MaterialReplacer } from "./render-pipeline";
import { Camera, Projection } from "../engine/camera";
import { mat4 } from "../types/mat4";
import { ZograRenderer, Material, Mesh } from "../core/core";
import { RenderObject } from "../engine/render-object";
import { Entity } from "../engine/entity";
import { RenderData, RenderOrder } from "./render-data";
import { Color, rgba, rgb } from "../types/color";
import { RenderTarget } from "../core/render-target";
import { RenderTexture } from "../core/texture";
import { Lines, LineBuilder } from "../core/lines";
import { vec3 } from "../types/vec3";
import { ConstructorType } from "../utils/util";
import { mul } from "../types/math";
import { vec4 } from "../types/vec4";
import { DebugLayerRenderer } from "./debug-layer";

export class PreviewRenderer implements ZograRenderPipeline
{
    renderer: ZograRenderer;
    grid: Lines;
    materialReplaceMap = new Map<Function, Material>();
    debugLayer = new DebugLayerRenderer();

    constructor(renderer: ZograRenderer)
    {
        this.renderer = renderer;

        const lineColor = rgba(1, 1, 1, 0.1);
        const lb = new LineBuilder(0, renderer.gl);
        const Size = 10;
        const Grid = 1;
        for (let i = -Size; i <= Size; i+=Grid)
        {
            lb.addLine([
                vec3(i, 0, -Size),
                vec3(i, 0, Size),
            ], lineColor);
            lb.addLine([
                vec3(-Size, 0, i),
                vec3(Size, 0, i)
            ], lineColor);
        }
        this.grid = lb.toLines();
    }
    render(context: RenderContext, cameras: Camera[])
    {
        for (let i = 0; i < cameras.length; i++)
        {
            const data = new RenderData(cameras[i], context.scene);
            this.renderCamera(context, data);
        }
    }

    setupLight(context: RenderContext, data: RenderData)
    {
        context.renderer.setGlobalUniform("uLightDir", "vec3", vec3(-1, 1, 0).normalize());
        context.renderer.setGlobalUniform("uAmbientSky", "color", rgb(.2, .2, .2));
        context.renderer.setGlobalUniform("uLightPos", "vec3", data.camera.position);
        context.renderer.setGlobalUniform("uLightColor", "color", rgb(.8, .8, .8));
    }

    renderCamera(context: RenderContext, data: RenderData)
    {
        context.renderer.clear(rgb(.3, .3, .3), true);

        

        const camera = data.camera;
        camera.__preRender(context);

        if (camera.output === RenderTarget.CanvasTarget)
            context.renderer.setRenderTarget(RenderTarget.CanvasTarget);
        else
            context.renderer.setRenderTarget(camera.output as RenderTexture);
        
        
        context.renderer.clear(camera.clearColor, camera.clearDepth);


        

        context.renderer.setViewProjection(camera.worldToLocalMatrix, camera.projectionMatrix);
        context.renderer.setGlobalUniform("uCameraPos", "vec3", camera.position);

        

        this.setupLight(context, data);
        
        const objs = data.getVisibleObjects(RenderOrder.NearToFar);
        for (const obj of objs)
        {
            obj.__onRender(context, data);
            const modelMatrix = obj.localToWorldMatrix;

            for (let i = 0; i < obj.meshes.length; i++)
            {
                if (!obj.meshes[i])
                    continue;
                const mat = obj.materials[i] || context.renderer.assets.materials.default;
                this.drawWithMaterial(obj.meshes[i], modelMatrix, mat);
            }
        }
        
        this.debugLayer.render(context, data);

        // this.renderGrid(context, data);
        camera.__postRender(context);
    }

    renderGrid(context: RenderContext, data: RenderData)
    {
        this.renderer.drawLines(this.grid, mat4.identity(), this.renderer.assets.materials.ColoredLine);
    }

    drawWithMaterial(mesh: Mesh, transform: mat4, material: Material)
    {
        if (this.materialReplaceMap.has(material.constructor))
            this.renderer.drawMesh(mesh, transform, this.materialReplaceMap.get(material.constructor) as Material);
        else
            this.renderer.drawMesh(mesh, transform, material);
    }

    replaceMaterial<T extends Material>(MaterialType: ConstructorType<T>, material: Material): void
    {
        this.materialReplaceMap.set(MaterialType, material);
    }

}