"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eyeIcon = exports.trashIcon = exports.refreshIcon = exports.pencilIcon = void 0;
const react_1 = __importDefault(require("react"));
const icons_1 = require("@strapi/icons");
exports.pencilIcon = react_1.default.createElement(icons_1.Pencil, null);
exports.refreshIcon = react_1.default.createElement(icons_1.Refresh, null);
exports.trashIcon = react_1.default.createElement(icons_1.Trash, null);
exports.eyeIcon = react_1.default.createElement(icons_1.Eye, null);
//# sourceMappingURL=icons.js.map