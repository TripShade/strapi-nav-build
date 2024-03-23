"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermanentAlert = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
const Alert_1 = require("@strapi/design-system/Alert");
exports.PermanentAlert = (0, styled_components_1.default)(Alert_1.Alert) `
 button {
     display: none;
 }
`;
//# sourceMappingURL=styles.js.map