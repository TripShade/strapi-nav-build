"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoreButton = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
const IconButton_1 = require("@strapi/design-system/IconButton");
exports.MoreButton = (0, styled_components_1.default)(IconButton_1.IconButton) `
    margin: ${({ theme }) => `0 ${theme.spaces[2]}`};
    padding: ${({ theme }) => theme.spaces[2]};

    svg {
        width: ${18 / 16}rem;
        height: ${18 / 16}rem;
    }
`;
//# sourceMappingURL=styles.js.map