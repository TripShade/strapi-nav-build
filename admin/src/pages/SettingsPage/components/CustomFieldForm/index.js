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
const react_1 = __importStar(require("react"));
const ModalLayout_1 = require("@strapi/design-system/ModalLayout");
const Button_1 = require("@strapi/design-system/Button");
const helper_plugin_1 = require("@strapi/helper-plugin");
const Grid_1 = require("@strapi/design-system/Grid");
const formik_1 = require("formik");
const formDefinition = __importStar(require("../../utils/form"));
const utils_1 = require("../../../../utils");
const lodash_1 = require("lodash");
const translations_1 = require("../../../../translations");
const TextArrayInput_1 = __importDefault(require("../../../../components/TextArrayInput"));
const common_1 = require("../../common");
const tradPrefix = 'pages.settings.form.customFields.popup.';
const prepareSelectOptions = (options) => options.map((option, index) => ({
    key: `${option}-${index}`,
    metadatas: {
        intlLabel: {
            id: option,
            defaultMessage: option,
        },
        hidden: false,
        disabled: false,
    },
    value: option,
    label: option,
}));
const CustomFieldForm = ({ isEditForm, customField, onSubmit, onClose, usedCustomFieldNames }) => {
    const typeSelectOptions = prepareSelectOptions(common_1.customFieldsTypes);
    const initialValues = (0, react_1.useMemo)(() => {
        if ((0, lodash_1.isNil)(customField.type)) {
            return formDefinition.defaultValues;
        }
        else if (customField.type === 'select') {
            return {
                type: customField.type,
                name: customField.name || formDefinition.defaultValues.name,
                label: customField.label || formDefinition.defaultValues.label,
                required: customField.required || formDefinition.defaultValues.required,
                options: customField.options || formDefinition.defaultValues.options,
                multi: customField.multi || formDefinition.defaultValues.multi,
                enabled: customField.enabled,
            };
        }
        else {
            return {
                type: customField.type,
                name: customField.name || formDefinition.defaultValues.name,
                label: customField.label || formDefinition.defaultValues.label,
                required: customField.required || formDefinition.defaultValues.required,
                options: [],
                multi: false,
                enabled: customField.enabled,
            };
        }
    }, [customField]);
    const { handleChange, setFieldValue, values, errors, handleSubmit, isSubmitting, } = (0, formik_1.useFormik)({
        initialValues,
        onSubmit,
        validationSchema: formDefinition.schemaFactory(usedCustomFieldNames),
        validateOnChange: false,
    });
    const defaultProps = (0, react_1.useCallback)((fieldName) => {
        const error = mapError(errors[fieldName]);
        return {
            intlLabel: (0, translations_1.getTrad)(`${tradPrefix}${fieldName}.label`),
            onChange: handleChange,
            name: fieldName,
            value: values[fieldName],
            error,
        };
    }, [values, errors, handleChange]);
    return (react_1.default.createElement("form", null,
        react_1.default.createElement(ModalLayout_1.ModalBody, null,
            react_1.default.createElement(Grid_1.Grid, { gap: 5 },
                react_1.default.createElement(Grid_1.GridItem, { key: "name", col: 12 },
                    react_1.default.createElement(helper_plugin_1.GenericInput, { ...defaultProps("name"), placeholder: (0, translations_1.getTrad)(`${tradPrefix}name.placeholder`), description: (0, translations_1.getTrad)(`${tradPrefix}name.description`), type: "text", disabled: isEditForm })),
                react_1.default.createElement(Grid_1.GridItem, { key: "label", col: 12 },
                    react_1.default.createElement(helper_plugin_1.GenericInput, { ...defaultProps("label"), placeholder: (0, translations_1.getTrad)(`${tradPrefix}label.placeholder`), description: (0, translations_1.getTrad)(`${tradPrefix}label.description`), type: "text" })),
                react_1.default.createElement(Grid_1.GridItem, { key: "type", col: 12 },
                    react_1.default.createElement(helper_plugin_1.GenericInput, { ...defaultProps("type"), options: typeSelectOptions, type: "select", disabled: isEditForm })),
                values.type === 'select' && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(Grid_1.GridItem, { key: "multi", col: 12 },
                        react_1.default.createElement(helper_plugin_1.GenericInput, { ...defaultProps("multi"), type: "bool" })),
                    react_1.default.createElement(Grid_1.GridItem, { key: "options", col: 12 },
                        react_1.default.createElement(TextArrayInput_1.default, { ...defaultProps("options"), onChange: v => setFieldValue("options", v), label: (0, utils_1.getMessage)(`${tradPrefix}options.label`), initialValue: values.options })))),
                react_1.default.createElement(Grid_1.GridItem, { key: "required", col: 12 },
                    react_1.default.createElement(helper_plugin_1.GenericInput, { ...defaultProps("required"), type: "bool", description: (0, translations_1.getTrad)(`${tradPrefix}required.description`) })))),
        react_1.default.createElement(ModalLayout_1.ModalFooter, { startActions: react_1.default.createElement(Button_1.Button, { onClick: onClose, variant: "tertiary" }, (0, utils_1.getMessage)('popup.item.form.button.cancel')), endActions: react_1.default.createElement(Button_1.Button, { onClick: handleSubmit, disabled: !(0, lodash_1.isEmpty)(errors) || isSubmitting }, (0, utils_1.getMessage)(`popup.item.form.button.save`)) })));
};
exports.default = CustomFieldForm;
const mapError = (err) => {
    if (typeof err === "string") {
        return err;
    }
    if (typeof err === "object" &&
        err &&
        (err.id || err.description || err.defaultMessage)) {
        return err;
    }
};
//# sourceMappingURL=index.js.map