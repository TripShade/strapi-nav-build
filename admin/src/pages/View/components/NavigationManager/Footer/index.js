"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterBase = void 0;
const Button_1 = require("@strapi/design-system/Button");
const ModalLayout_1 = require("@strapi/design-system/ModalLayout");
const react_1 = __importDefault(require("react"));
const FooterBase = ({ start, end }) => (react_1.default.createElement(ModalLayout_1.ModalFooter, { endActions: renderActions(end), startActions: renderActions(start) }));
exports.FooterBase = FooterBase;
const renderActions = (actions) => actions ? (react_1.default.createElement(Button_1.Button, { onClick: actions.onClick, variant: actions.variant, disabled: actions.disabled }, actions.children)) : null;
//# sourceMappingURL=index.js.map