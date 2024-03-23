"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationItemPopupHeader = void 0;
const react_1 = __importDefault(require("react"));
const Typography_1 = require("@strapi/design-system/Typography");
const ModalLayout_1 = require("@strapi/design-system/ModalLayout");
const utils_1 = require("../../../../utils");
const NavigationItemPopupHeader = ({ isNewItem, canUpdate }) => {
    let modalType = 'view';
    if (canUpdate) {
        modalType = isNewItem ? 'new' : 'edit';
    }
    return (react_1.default.createElement(ModalLayout_1.ModalHeader, null,
        react_1.default.createElement(Typography_1.Typography, { variant: "omega", fontWeight: "bold", textColor: "neutral800", as: "h2", id: "asset-dialog-title" }, (0, utils_1.getMessage)(`popup.item.header.${modalType}`))));
};
exports.NavigationItemPopupHeader = NavigationItemPopupHeader;
//# sourceMappingURL=NavigationItemPopupHeader.js.map