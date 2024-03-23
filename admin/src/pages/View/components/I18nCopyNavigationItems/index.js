"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nCopyNavigationItemsModal = void 0;
const react_1 = __importDefault(require("react"));
const ConfirmationDialog_1 = __importDefault(require("../../../../components/ConfirmationDialog"));
const utils_1 = require("../../../../utils");
const refreshIcon = react_1.default.createElement(react_1.default.Fragment, null);
const I18nCopyNavigationItemsModal = ({ onConfirm, onCancel, }) => {
    return (react_1.default.createElement(ConfirmationDialog_1.default, { isVisible: true, header: (0, utils_1.getMessage)("pages.view.actions.i18nCopyItems.confirmation.header"), labelConfirm: (0, utils_1.getMessage)("pages.view.actions.i18nCopyItems.confirmation.confirm"), iconConfirm: refreshIcon, mainIcon: refreshIcon, onConfirm: onConfirm, onCancel: onCancel }, (0, utils_1.getMessage)("pages.view.actions.i18nCopyItems.confirmation.content")));
};
exports.I18nCopyNavigationItemsModal = I18nCopyNavigationItemsModal;
//# sourceMappingURL=index.js.map