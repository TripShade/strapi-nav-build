"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Typography_1 = require("@strapi/design-system/Typography");
const ModalLayout_1 = require("@strapi/design-system/ModalLayout");
const CustomFieldForm_1 = __importDefault(require("../CustomFieldForm"));
const utils_1 = require("../../../../utils");
const lodash_1 = require("lodash");
const CustomFieldModal = ({ isOpen, onClose, onSubmit, data, usedCustomFieldNames, }) => {
    const isEditMode = !!data;
    return (react_1.default.createElement(ModalLayout_1.ModalLayout, { onClose: onClose, isOpen: isOpen, labelledBy: "custom-field-modal" },
        react_1.default.createElement(ModalLayout_1.ModalHeader, null,
            react_1.default.createElement(Typography_1.Typography, { variant: "omega", fontWeight: "bold", textColor: "neutral800", as: "h2", id: "asset-dialog-title" }, (0, utils_1.getMessage)(`pages.settings.form.customFields.popup.header.${isEditMode ? 'edit' : 'new'}`))),
        react_1.default.createElement(CustomFieldForm_1.default, { isEditForm: isEditMode, customField: (0, lodash_1.pick)(data, "name", "label", "type", "required", "options", "multi"), onSubmit: onSubmit, onClose: onClose, usedCustomFieldNames: usedCustomFieldNames })));
};
exports.default = CustomFieldModal;
//# sourceMappingURL=index.js.map