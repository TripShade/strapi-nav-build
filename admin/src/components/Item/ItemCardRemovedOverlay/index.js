"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemCardRemovedOverlay = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.ItemCardRemovedOverlay = styled_components_1.default.div `
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;

    background: rgba(255,255,255,.75);
`;
//# sourceMappingURL=index.js.map