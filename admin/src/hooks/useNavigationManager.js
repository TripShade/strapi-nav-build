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
exports.useNavigationManager = void 0;
const react_1 = __importStar(require("react"));
const NavigationManager_1 = require("../pages/View/components/NavigationManager");
const useNavigationManager = () => {
    const [isOpened, setIsOpened] = (0, react_1.useState)(false);
    const open = (0, react_1.useCallback)(() => setIsOpened(true), [setIsOpened]);
    const close = (0, react_1.useCallback)(() => setIsOpened(false), [setIsOpened]);
    const modal = (0, react_1.useMemo)(() => isOpened ? (react_1.default.createElement(NavigationManager_1.NavigationManager, { initialState: { view: "INITIAL" }, isOpened: true, onClose: close })) : null, [isOpened, close]);
    return (0, react_1.useMemo)(() => ({
        navigationManagerModal: modal,
        openNavigationManagerModal: open,
        closeNavigationManagerModal: close,
    }), [modal, open, close]);
};
exports.useNavigationManager = useNavigationManager;
//# sourceMappingURL=useNavigationManager.js.map