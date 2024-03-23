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
exports.useI18nCopyNavigationItemsModal = void 0;
const react_1 = __importStar(require("react"));
const I18nCopyNavigationItems_1 = require("../pages/View/components/I18nCopyNavigationItems");
const useI18nCopyNavigationItemsModal = (onConfirm) => {
    const [isOpened, setIsOpened] = (0, react_1.useState)(false);
    const [sourceLocale, setSourceLocale] = (0, react_1.useState)(undefined);
    const onCancel = (0, react_1.useCallback)(() => {
        setIsOpened(false);
    }, [setIsOpened]);
    const onConfirmWithModalClose = (0, react_1.useCallback)(() => {
        if (!sourceLocale) {
            return;
        }
        onConfirm(sourceLocale);
        setIsOpened(false);
    }, [onConfirm, sourceLocale]);
    const modal = (0, react_1.useMemo)(() => isOpened ? (react_1.default.createElement(I18nCopyNavigationItems_1.I18nCopyNavigationItemsModal, { onConfirm: onConfirmWithModalClose, onCancel: onCancel })) : null, [isOpened, onConfirmWithModalClose, onCancel]);
    return (0, react_1.useMemo)(() => ({
        setI18nCopyModalOpened: setIsOpened,
        setI18nCopySourceLocale: setSourceLocale,
        i18nCopyItemsModal: modal,
        i18nCopySourceLocale: sourceLocale,
    }), [setSourceLocale, setIsOpened, modal, sourceLocale]);
};
exports.useI18nCopyNavigationItemsModal = useI18nCopyNavigationItemsModal;
//# sourceMappingURL=useI18nCopyNavigationItemsModal.js.map