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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDisableI18nModal = exports.DisableI18nModal = void 0;
const react_1 = __importStar(require("react"));
const ConfirmationDialog_1 = __importDefault(require("../../../../components/ConfirmationDialog"));
const utils_1 = require("../../../../utils");
const formik_1 = require("formik");
const Stack_1 = require("@strapi/design-system/Stack");
const Box_1 = require("@strapi/design-system/Box");
const Grid_1 = require("@strapi/design-system/Grid");
const ToggleInput_1 = require("@strapi/design-system/ToggleInput");
const Typography_1 = require("@strapi/design-system/Typography");
const refreshIcon = react_1.default.createElement(react_1.default.Fragment, null);
const INITIAL_VALUES = { pruneNavigations: false, enabled: true };
const DisableI18nModal = ({ onSubmit, onCancel }) => {
    const [state, setState] = (0, react_1.useState)(INITIAL_VALUES);
    const onConfirm = (0, react_1.useCallback)(() => {
        onSubmit(state);
    }, [onSubmit, state]);
    return (react_1.default.createElement(ConfirmationDialog_1.default, { isVisible: true, header: (0, utils_1.getMessage)("pages.settings.actions.disableI18n.confirmation.header"), labelConfirm: (0, utils_1.getMessage)("pages.settings.actions.disableI18n.confirmation.confirm"), iconConfirm: refreshIcon, mainIcon: refreshIcon, onConfirm: onConfirm, onCancel: onCancel },
        react_1.default.createElement(formik_1.Formik, { initialValues: INITIAL_VALUES, onSubmit: onConfirm }, ({ setFieldValue, values }) => (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Grid_1.Grid, { gap: 4 },
                react_1.default.createElement(Grid_1.GridItem, { col: 12 },
                    react_1.default.createElement(Box_1.Box, { padding: 2 }, (0, utils_1.getMessage)("pages.settings.actions.disableI18n.confirmation.description.line1")),
                    react_1.default.createElement(Box_1.Box, { padding: 2 }, (0, utils_1.getMessage)("pages.settings.actions.disableI18n.confirmation.description.line2")),
                    react_1.default.createElement(Box_1.Box, { padding: 2 },
                        react_1.default.createElement(Typography_1.Typography, { fontWeight: "bold" }, (0, utils_1.getMessage)("pages.settings.actions.disableI18n.confirmation.description.line3"))))),
            react_1.default.createElement(Stack_1.Stack, { spacing: 4 },
                react_1.default.createElement(Grid_1.Grid, { gap: 4 },
                    react_1.default.createElement(Grid_1.GridItem, { col: 12 },
                        react_1.default.createElement(Box_1.Box, { padding: 2 },
                            react_1.default.createElement(ToggleInput_1.ToggleInput, { name: "audienceFieldChecked", label: (0, utils_1.getMessage)("pages.settings.actions.disableI18n.prune.label"), hint: "", checked: values.pruneNavigations, onChange: ({ target: { checked }, }) => {
                                    setFieldValue("pruneNavigations", checked, false);
                                    setState((state) => ({
                                        ...state,
                                        pruneNavigations: checked,
                                    }));
                                }, onLabel: (0, utils_1.getMessage)("pages.settings.actions.disableI18n.prune.on"), offLabel: (0, utils_1.getMessage)("pages.settings.actions.disableI18n.prune.off") }))))))))));
};
exports.DisableI18nModal = DisableI18nModal;
const useDisableI18nModal = (onSubmit) => {
    const [isOpened, setIsOpened] = (0, react_1.useState)(false);
    const [onCancel, setOnCancel] = (0, react_1.useState)(() => () => { });
    const onSubmitWithModalClose = (0, react_1.useCallback)((val) => {
        onSubmit(val);
        setIsOpened(false);
    }, [onSubmit, setIsOpened]);
    const onCancelWithModalClose = () => {
        onCancel();
        setIsOpened(false);
    };
    const modal = (0, react_1.useMemo)(() => isOpened ? (react_1.default.createElement(exports.DisableI18nModal, { onSubmit: onSubmitWithModalClose, onCancel: onCancelWithModalClose })) : null, [isOpened, onSubmitWithModalClose, onCancelWithModalClose]);
    return (0, react_1.useMemo)(() => ({
        setDisableI18nModalOpened: setIsOpened,
        setI18nModalOnCancel: setOnCancel,
        disableI18nModal: modal,
    }), [setIsOpened, modal, setOnCancel]);
};
exports.useDisableI18nModal = useDisableI18nModal;
//# sourceMappingURL=index.js.map