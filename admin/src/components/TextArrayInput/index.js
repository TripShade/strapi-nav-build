"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const TextInput_1 = require("@strapi/design-system/TextInput");
const lodash_1 = require("lodash");
const TextArrayInput = ({ onChange, initialValue, ...props }) => {
    const [value, setValue] = (0, react_1.useState)((0, lodash_1.isArray)(initialValue)
        ? initialValue.reduce((acc, cur) => `${acc}${cur}; `, "")
        : "");
    const handleOnChange = ({ target: { value } }) => {
        const newValue = value;
        const valuesArray = newValue
            .split(';')
            .map(v => v.trim())
            .filter(v => !!v.length);
        setValue(value);
        onChange(valuesArray);
    };
    return (react_1.default.createElement(TextInput_1.TextInput, { ...props, onChange: handleOnChange, value: value }));
};
exports.default = TextArrayInput;
//# sourceMappingURL=index.js.map