"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
const Button_1 = require("@strapi/design-system/Button");
const Dialog_1 = require("@strapi/design-system/Dialog");
const Flex_1 = require("@strapi/design-system/Flex");
const Stack_1 = require("@strapi/design-system/Stack");
const Typography_1 = require("@strapi/design-system/Typography");
const icons_1 = require("@strapi/icons");
const utils_1 = require("../../utils");
const DEFAULT_ICON = react_1.default.createElement(icons_1.ExclamationMarkCircle, null);
const ConfirmationDialog = ({ isVisible = false, isActionAsync = false, children, onConfirm, onCancel, header, labelCancel, labelConfirm, iconConfirm, mainIcon = DEFAULT_ICON }) => (react_1.default.createElement(Dialog_1.Dialog, { onClose: onCancel, title: header || (0, utils_1.getMessage)('components.confirmation.dialog.header', 'Confirmation'), isOpen: isVisible },
    react_1.default.createElement(Dialog_1.DialogBody, { icon: mainIcon },
        react_1.default.createElement(Stack_1.Stack, { spacing: 2 },
            react_1.default.createElement(Flex_1.Flex, { justifyContent: "center" },
                react_1.default.createElement(Typography_1.Typography, { id: "dialog-confirm-description" }, children || (0, utils_1.getMessage)('components.confirmation.dialog.description'))))),
    react_1.default.createElement(Dialog_1.DialogFooter, { startAction: react_1.default.createElement(Button_1.Button, { onClick: onCancel, variant: "tertiary", disabled: isActionAsync }, labelCancel || (0, utils_1.getMessage)('components.confirmation.dialog.button.cancel', 'Cancel')), endAction: react_1.default.createElement(Button_1.Button, { onClick: onConfirm, variant: "danger-light", startIcon: iconConfirm || react_1.default.createElement(icons_1.Check, null), disabled: isActionAsync }, labelConfirm || (0, utils_1.getMessage)('components.confirmation.dialog.button.confirm', 'Confirm')) })));
ConfirmationDialog.propTypes = {
    isVisible: prop_types_1.default.bool,
    isActionAsync: prop_types_1.default.bool,
    children: prop_types_1.default.any,
    header: prop_types_1.default.string,
    labelCancel: prop_types_1.default.string,
    labelConfirm: prop_types_1.default.string,
    iconConfirm: prop_types_1.default.object,
    onConfirm: prop_types_1.default.func.isRequired,
    onCancel: prop_types_1.default.func.isRequired,
};
exports.default = ConfirmationDialog;
//# sourceMappingURL=index.js.map