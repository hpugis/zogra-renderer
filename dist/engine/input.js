"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vec2_1 = require("../types/vec2");
const math_1 = require("../types/math");
var KeyState;
(function (KeyState) {
    KeyState[KeyState["Pressed"] = 1] = "Pressed";
    KeyState[KeyState["Released"] = 0] = "Released";
})(KeyState = exports.KeyState || (exports.KeyState = {}));
;
class InputManager {
    constructor(options = {}) {
        var _a;
        this.keyStates = new Map();
        this.keyStatesThisFrame = new Map();
        this.mousePos = vec2_1.vec2.zero();
        this.mouseDelta = vec2_1.vec2.zero();
        this.previousMousePos = vec2_1.vec2.zero();
        this.eventTarget = options.target || window;
        if (options.bound)
            this.bound = options.bound;
        else if ((_a = options.target) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect)
            this.bound = options.target;
        this.eventTarget.addEventListener("keydown", (e) => {
            this.keyStates.set(e.keyCode, KeyState.Pressed);
            this.keyStatesThisFrame.set(e.keyCode, KeyState.Pressed);
        });
        this.eventTarget.addEventListener("keyup", e => {
            this.keyStates.set(e.keyCode, KeyState.Released);
            this.keyStatesThisFrame.set(e.keyCode, KeyState.Released);
        });
        this.eventTarget.addEventListener("mousedown", e => {
            this.keyStates.set(Keys.Mouse0 + e.button, KeyState.Pressed);
            this.keyStatesThisFrame.set(Keys.Mouse0 + e.button, KeyState.Pressed);
        });
        this.eventTarget.addEventListener("mouseup", e => {
            this.keyStates.set(Keys.Mouse0 + e.button, KeyState.Released);
            this.keyStatesThisFrame.set(Keys.Mouse0 + e.button, KeyState.Released);
        });
        this.eventTarget.addEventListener("mousemove", e => {
            var _a, _b, _c, _d, _e;
            const rect = (_a = this.bound) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
            const offset = vec2_1.vec2((_c = (_b = rect) === null || _b === void 0 ? void 0 : _b.left, (_c !== null && _c !== void 0 ? _c : 0)), (_e = (_d = rect) === null || _d === void 0 ? void 0 : _d.right, (_e !== null && _e !== void 0 ? _e : 0)));
            const pos = math_1.minus(vec2_1.vec2(e.clientX, e.clientY), offset);
            this.mouseDelta = math_1.minus(pos, this.previousMousePos);
            this.mousePos = pos;
        });
        for (const key in Keys) {
            if (!isNaN(key))
                continue;
            if (Keys.hasOwnProperty(key)) {
                this.keyStates.set(Keys[key], KeyState.Released);
            }
        }
    }
    get pointerPosition() { return this.mousePos; }
    get pointerDelta() { return this.mouseDelta; }
    getKey(key) {
        return this.keyStates.get(key) === KeyState.Pressed ? true : false;
    }
    getKeyDown(key) {
        return this.keyStatesThisFrame.get(key) === KeyState.Pressed ? true : false;
    }
    getKeyUp(key) {
        return this.keyStatesThisFrame.get(key) === KeyState.Released ? true : false;
    }
    update() {
        this.keyStatesThisFrame.clear();
        this.previousMousePos = this.mousePos;
        this.mouseDelta = vec2_1.vec2.zero();
    }
}
exports.InputManager = InputManager;
var Keys;
(function (Keys) {
    Keys[Keys["BackSpace"] = 8] = "BackSpace";
    Keys[Keys["Tab"] = 9] = "Tab";
    Keys[Keys["Clear"] = 12] = "Clear";
    Keys[Keys["Enter"] = 13] = "Enter";
    Keys[Keys["Shift"] = 16] = "Shift";
    Keys[Keys["Control"] = 17] = "Control";
    Keys[Keys["Alt"] = 18] = "Alt";
    Keys[Keys["Pause"] = 19] = "Pause";
    Keys[Keys["CapsLock"] = 20] = "CapsLock";
    Keys[Keys["Escape"] = 27] = "Escape";
    Keys[Keys["Space"] = 32] = "Space";
    Keys[Keys["Prior"] = 33] = "Prior";
    Keys[Keys["Next"] = 34] = "Next";
    Keys[Keys["End"] = 35] = "End";
    Keys[Keys["Home"] = 36] = "Home";
    Keys[Keys["Left"] = 37] = "Left";
    Keys[Keys["Up"] = 38] = "Up";
    Keys[Keys["Right"] = 39] = "Right";
    Keys[Keys["Down"] = 40] = "Down";
    Keys[Keys["Select"] = 41] = "Select";
    Keys[Keys["Print"] = 42] = "Print";
    Keys[Keys["Execute"] = 43] = "Execute";
    Keys[Keys["Insert"] = 45] = "Insert";
    Keys[Keys["Delete"] = 46] = "Delete";
    Keys[Keys["Help"] = 47] = "Help";
    Keys[Keys["Num0"] = 48] = "Num0";
    Keys[Keys["Num1"] = 49] = "Num1";
    Keys[Keys["Num2"] = 50] = "Num2";
    Keys[Keys["Num3"] = 51] = "Num3";
    Keys[Keys["Num4"] = 52] = "Num4";
    Keys[Keys["Num5"] = 53] = "Num5";
    Keys[Keys["Num6"] = 54] = "Num6";
    Keys[Keys["Num7"] = 55] = "Num7";
    Keys[Keys["Num8"] = 56] = "Num8";
    Keys[Keys["Num9"] = 57] = "Num9";
    Keys[Keys["A"] = 65] = "A";
    Keys[Keys["B"] = 66] = "B";
    Keys[Keys["C"] = 67] = "C";
    Keys[Keys["D"] = 68] = "D";
    Keys[Keys["E"] = 69] = "E";
    Keys[Keys["F"] = 70] = "F";
    Keys[Keys["G"] = 71] = "G";
    Keys[Keys["H"] = 72] = "H";
    Keys[Keys["I"] = 73] = "I";
    Keys[Keys["J"] = 74] = "J";
    Keys[Keys["K"] = 75] = "K";
    Keys[Keys["L"] = 76] = "L";
    Keys[Keys["M"] = 77] = "M";
    Keys[Keys["N"] = 78] = "N";
    Keys[Keys["O"] = 79] = "O";
    Keys[Keys["P"] = 80] = "P";
    Keys[Keys["Q"] = 81] = "Q";
    Keys[Keys["R"] = 82] = "R";
    Keys[Keys["S"] = 83] = "S";
    Keys[Keys["T"] = 84] = "T";
    Keys[Keys["U"] = 85] = "U";
    Keys[Keys["V"] = 86] = "V";
    Keys[Keys["W"] = 87] = "W";
    Keys[Keys["X"] = 88] = "X";
    Keys[Keys["Y"] = 89] = "Y";
    Keys[Keys["Z"] = 90] = "Z";
    Keys[Keys["KP0"] = 96] = "KP0";
    Keys[Keys["KP1"] = 97] = "KP1";
    Keys[Keys["KP2"] = 98] = "KP2";
    Keys[Keys["KP3"] = 99] = "KP3";
    Keys[Keys["KP4"] = 100] = "KP4";
    Keys[Keys["KP5"] = 101] = "KP5";
    Keys[Keys["KP6"] = 102] = "KP6";
    Keys[Keys["KP7"] = 103] = "KP7";
    Keys[Keys["KP8"] = 104] = "KP8";
    Keys[Keys["KP9"] = 105] = "KP9";
    Keys[Keys["KPMultiply"] = 106] = "KPMultiply";
    Keys[Keys["KPAdd"] = 107] = "KPAdd";
    Keys[Keys["KPSeparator"] = 108] = "KPSeparator";
    Keys[Keys["KPSubtract"] = 109] = "KPSubtract";
    Keys[Keys["KPDecimal"] = 110] = "KPDecimal";
    Keys[Keys["KPDivide"] = 111] = "KPDivide";
    Keys[Keys["F1"] = 112] = "F1";
    Keys[Keys["F2"] = 113] = "F2";
    Keys[Keys["F3"] = 114] = "F3";
    Keys[Keys["F4"] = 115] = "F4";
    Keys[Keys["F5"] = 116] = "F5";
    Keys[Keys["F6"] = 117] = "F6";
    Keys[Keys["F7"] = 118] = "F7";
    Keys[Keys["F8"] = 119] = "F8";
    Keys[Keys["F9"] = 120] = "F9";
    Keys[Keys["F10"] = 121] = "F10";
    Keys[Keys["F11"] = 122] = "F11";
    Keys[Keys["F12"] = 123] = "F12";
    Keys[Keys["F13"] = 124] = "F13";
    Keys[Keys["F14"] = 125] = "F14";
    Keys[Keys["F15"] = 126] = "F15";
    Keys[Keys["F16"] = 127] = "F16";
    Keys[Keys["F17"] = 128] = "F17";
    Keys[Keys["F18"] = 129] = "F18";
    Keys[Keys["F19"] = 130] = "F19";
    Keys[Keys["F20"] = 131] = "F20";
    Keys[Keys["F21"] = 132] = "F21";
    Keys[Keys["F22"] = 133] = "F22";
    Keys[Keys["F23"] = 134] = "F23";
    Keys[Keys["F24"] = 135] = "F24";
    Keys[Keys["NumLock"] = 136] = "NumLock";
    Keys[Keys["ScrollLock"] = 137] = "ScrollLock";
    Keys[Keys["Mouse0"] = 256] = "Mouse0";
    Keys[Keys["Mouse1"] = 257] = "Mouse1";
    Keys[Keys["Mouse2"] = 258] = "Mouse2";
    Keys[Keys["Mouse3"] = 259] = "Mouse3";
    Keys[Keys["Mouse4"] = 260] = "Mouse4";
    Keys[Keys["Mouse5"] = 261] = "Mouse5";
    Keys[Keys["Mouse6"] = 262] = "Mouse6";
})(Keys = exports.Keys || (exports.Keys = {}));
//# sourceMappingURL=input.js.map