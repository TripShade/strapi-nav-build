"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
const Alert_1 = require("@strapi/design-system/Alert");
exports.default = (0, styled_components_1.default)(Alert_1.Alert) `
    [role="status"] {
        flex-direction: column;
    }
`;
//# sourceMappingURL=index.js.map