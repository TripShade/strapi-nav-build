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
const lodash_1 = require("lodash");
const react_1 = __importStar(require("react"));
const helper_plugin_1 = require("@strapi/helper-plugin");
const VisuallyHidden_1 = require("@strapi/design-system/VisuallyHidden");
const Table_1 = require("@strapi/design-system/Table");
const icons_1 = require("@strapi/icons");
const Typography_1 = require("@strapi/design-system/Typography");
const Tooltip_1 = require("@strapi/design-system/Tooltip");
const Stack_1 = require("@strapi/design-system/Stack");
const IconButton_1 = require("@strapi/design-system/IconButton");
const utils_1 = require("../../../../utils");
const ConfirmationDialog_1 = __importDefault(require("../../../../components/ConfirmationDialog"));
const translations_1 = require("../../../../translations");
const refreshIcon = react_1.default.createElement(icons_1.Refresh, null);
const plusIcon = react_1.default.createElement(icons_1.Plus, null);
const tradPrefix = "pages.settings.form.customFields.table.";
const CustomFieldTable = ({ data, onOpenModal, onRemoveCustomField, onToggleCustomField, }) => {
    const [confirmationVisible, setIsConfirmationVisible] = (0, react_1.useState)(false);
    const [fieldToRemove, setFieldToRemove] = (0, react_1.useState)(null);
    const toggleNotification = (0, helper_plugin_1.useNotification)();
    const customFields = (0, react_1.useMemo)(() => (0, lodash_1.sortBy)(data, "name"), [data]);
    const handleRemove = (0, react_1.useCallback)((field) => {
        setFieldToRemove(field);
        setIsConfirmationVisible(true);
    }, [setFieldToRemove, setIsConfirmationVisible]);
    const cleanup = (0, react_1.useCallback)(() => {
        setFieldToRemove(null);
        setIsConfirmationVisible(false);
    }, [setFieldToRemove, setIsConfirmationVisible]);
    const handleConfirm = (0, react_1.useCallback)(() => {
        if (fieldToRemove === null) {
            toggleNotification({
                type: 'warning',
                message: {
                    id: (0, translations_1.getTradId)(`${tradPrefix}confirmation.error`),
                    defaultMessage: 'Something went wrong',
                }
            });
        }
        else {
            onRemoveCustomField(fieldToRemove);
        }
        cleanup();
    }, [cleanup, fieldToRemove, translations_1.getTradId, onRemoveCustomField, toggleNotification]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ConfirmationDialog_1.default, { isVisible: confirmationVisible, header: (0, utils_1.getMessage)(`${tradPrefix}confirmation.header`), children: (0, utils_1.getMessage)(`${tradPrefix}confirmation.message`), labelConfirm: (0, utils_1.getMessage)(`${tradPrefix}confirmation.confirm`), iconConfirm: refreshIcon, mainIcon: refreshIcon, onConfirm: handleConfirm, onCancel: cleanup }),
        react_1.default.createElement(Table_1.Table, { colCount: 4, rowCount: data.length + 1, footer: react_1.default.createElement(Table_1.TFooter, { onClick: (e) => { e.preventDefault(); onOpenModal(null); }, icon: plusIcon }, (0, utils_1.getMessage)(`${tradPrefix}footer`)) },
            react_1.default.createElement(Table_1.Thead, null,
                react_1.default.createElement(Table_1.Tr, null,
                    react_1.default.createElement(Table_1.Th, { width: "20%" },
                        react_1.default.createElement(Typography_1.Typography, { variant: "sigma", textColor: "neutral600" }, (0, utils_1.getMessage)(`${tradPrefix}header.name`))),
                    react_1.default.createElement(Table_1.Th, { width: "60%" },
                        react_1.default.createElement(Typography_1.Typography, { variant: "sigma", textColor: "neutral600" }, (0, utils_1.getMessage)(`${tradPrefix}header.label`))),
                    react_1.default.createElement(Table_1.Th, { width: "15%" },
                        react_1.default.createElement(Typography_1.Typography, { variant: "sigma", textColor: "neutral600" }, (0, utils_1.getMessage)(`${tradPrefix}header.type`))),
                    react_1.default.createElement(Table_1.Th, { width: "5%" },
                        react_1.default.createElement(Typography_1.Typography, { variant: "sigma", textColor: "neutral600" }, (0, utils_1.getMessage)(`${tradPrefix}header.required`))),
                    react_1.default.createElement(Table_1.Th, null,
                        react_1.default.createElement(VisuallyHidden_1.VisuallyHidden, null)))),
            react_1.default.createElement(Table_1.Tbody, null, customFields.map(customField => (react_1.default.createElement(Table_1.Tr, { key: customField.name },
                react_1.default.createElement(Table_1.Td, { width: '20%' },
                    react_1.default.createElement(Typography_1.Typography, { fontWeight: "semiBold", textColor: "neutral800" }, customField.name)),
                react_1.default.createElement(Table_1.Td, { width: "60%" },
                    react_1.default.createElement(Typography_1.Typography, { textColor: "neutral800" }, customField.label)),
                react_1.default.createElement(Table_1.Td, { width: "15%" },
                    react_1.default.createElement(Typography_1.Typography, { textColor: "neutral800" }, customField.type)),
                react_1.default.createElement(Table_1.Td, { width: "5%" },
                    react_1.default.createElement(Tooltip_1.Tooltip, { description: (0, utils_1.getMessage)(`${tradPrefix}${customField.required ? "required" : "notRequired"}`) },
                        react_1.default.createElement(Typography_1.Typography, { textColor: "neutral800" }, customField.required ? react_1.default.createElement(icons_1.Check, null) : react_1.default.createElement(icons_1.Minus, null)))),
                react_1.default.createElement(Table_1.Td, null,
                    react_1.default.createElement(Stack_1.Stack, { horizontal: true, size: 1 },
                        react_1.default.createElement(IconButton_1.IconButton, { onClick: () => onOpenModal(customField), label: (0, utils_1.getMessage)(`${tradPrefix}edit`), icon: react_1.default.createElement(icons_1.Pencil, null), noBorder: true }),
                        react_1.default.createElement(IconButton_1.IconButton, { onClick: () => onToggleCustomField(customField), label: (0, utils_1.getMessage)(`${tradPrefix}${customField.enabled ? 'disable' : 'enable'}`), icon: customField.enabled ? react_1.default.createElement(icons_1.Eye, null) : react_1.default.createElement(icons_1.EyeStriked, null), noBorder: true }),
                        react_1.default.createElement(IconButton_1.IconButton, { onClick: () => handleRemove(customField), label: (0, utils_1.getMessage)(`${tradPrefix}remove`), icon: react_1.default.createElement(icons_1.Trash, null), noBorder: true }))))))))));
};
exports.default = CustomFieldTable;
//# sourceMappingURL=index.js.map