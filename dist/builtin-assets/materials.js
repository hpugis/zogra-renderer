"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("../core/material");
const color_1 = require("../types/color");
const material_type_1 = require("../core/material-type");
const vec2_1 = require("../types/vec2");
function createBuiltinMaterial(gl, types, shaders) {
    return {
        default: new types.DefaultMaterial(gl),
        blitCopy: new types.BlitCopy(gl),
        ColoredLine: new material_1.Material(shaders.ColoredLine, gl),
    };
}
exports.createBuiltinMaterial = createBuiltinMaterial;
function createBuiltinMaterialTypes(gl, defaultTex, shaders) {
    let DefaultMaterial = class DefaultMaterial extends material_1.MaterialFromShader(shaders.DefaultShader) {
        constructor() {
            super(...arguments);
            this.color = color_1.Color.white;
            this.mainTexture = defaultTex;
        }
    };
    __decorate([
        material_1.shaderProp("uColor", "color")
    ], DefaultMaterial.prototype, "color", void 0);
    __decorate([
        material_1.shaderProp("uMainTex", "tex2d")
    ], DefaultMaterial.prototype, "mainTexture", void 0);
    DefaultMaterial = __decorate([
        material_1.materialDefine
    ], DefaultMaterial);
    let BlitCopy = class BlitCopy extends material_1.MaterialFromShader(shaders.BlitCopy) {
        constructor() {
            super(...arguments);
            this.flip = vec2_1.vec2(0, 0);
        }
    };
    __decorate([
        material_1.shaderProp("uFlip", "vec2")
    ], BlitCopy.prototype, "flip", void 0);
    BlitCopy = __decorate([
        material_1.materialDefine
    ], BlitCopy);
    return {
        DefaultMaterial: DefaultMaterial,
        BlitCopy: BlitCopy,
    };
}
exports.createBuiltinMaterialTypes = createBuiltinMaterialTypes;
//# sourceMappingURL=materials.js.map