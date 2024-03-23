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
const react_1 = __importStar(require("react"));
const types_1 = require("../../../../types");
const ToggleInput_1 = require("@strapi/design-system/ToggleInput");
const TextInput_1 = require("@strapi/design-system/TextInput");
const Select_1 = require("@strapi/design-system/Select");
const helper_plugin_1 = require("@strapi/helper-plugin");
const translations_1 = require("../../translations");
const lodash_1 = require("lodash");
const react_intl_1 = require("react-intl");
const DEFAULT_STRING_VALUE = "";
const handlerFactory = ({ field, prop, onChange }) => ({ target }) => {
    onChange(field.name, target[prop], field.type);
};
const mediaAttribute = {
    type: "media",
    multiple: false,
    required: false,
    allowedTypes: ["images"],
    pluginOptions: {
        i18n: {
            localized: false,
        },
    },
};
const AdditionalFieldInput = ({ field, isLoading, onChange, value: baseValue, disabled, error, }) => {
    const { fields } = (0, helper_plugin_1.useLibrary)();
    const value = (0, react_1.useMemo)(() => field.type === "media" && baseValue
        ? JSON.parse(baseValue)
        : baseValue, [baseValue, field.type]);
    const toggleNotification = (0, helper_plugin_1.useNotification)();
    const { formatMessage } = (0, react_intl_1.useIntl)();
    const defaultInputProps = (0, react_1.useMemo)(() => ({
        id: field.name,
        name: field.name,
        label: field.label,
        disabled: isLoading || disabled,
        error: error && formatMessage(error),
    }), [field, isLoading, error]);
    const handleBoolean = (0, react_1.useMemo)(() => handlerFactory({ field, onChange, prop: "checked" }), [onChange, field]);
    const handleString = (0, react_1.useMemo)(() => handlerFactory({ field, onChange, prop: "value" }), [onChange, field]);
    const handleMedia = (0, react_1.useMemo)(() => handlerFactory({ field, onChange, prop: "value" }), [onChange, field]);
    const MediaInput = (fields?.media ??
        (() => react_1.default.createElement(react_1.default.Fragment, null)));
    (0, react_1.useEffect)(() => {
        if (!MediaInput) {
            toggleNotification({
                type: "warning",
                message: (0, translations_1.getTrad)("notification.error.customField.media.missing"),
            });
        }
    }, []);
    switch (field.type) {
        case "boolean":
            if (!(0, lodash_1.isNil)(value))
                (0, types_1.assertBoolean)(value);
            return (react_1.default.createElement(ToggleInput_1.ToggleInput, { ...defaultInputProps, checked: !!value, onChange: handleBoolean, onLabel: "true", offLabel: "false" }));
        case "string":
            if (!(0, lodash_1.isNil)(value))
                (0, types_1.assertString)(value);
            return (react_1.default.createElement(TextInput_1.TextInput, { ...defaultInputProps, onChange: handleString, value: value || DEFAULT_STRING_VALUE }));
        case "select":
            return (react_1.default.createElement(Select_1.Select, { ...defaultInputProps, onChange: (v) => onChange(field.name, v, "select"), value: (0, lodash_1.isNil)(value) ? (field.multi ? [] : null) : value, multi: field.multi, withTags: field.multi }, field.options.map((option, index) => (react_1.default.createElement(Select_1.Option, { key: `${field.name}-option-${index}`, value: option }, option)))));
        case "media":
            return (react_1.default.createElement(MediaInput, { ...defaultInputProps, id: "navigation-item-media", onChange: handleMedia, value: value || [], intlLabel: defaultInputProps.label, attribute: mediaAttribute }));
        default:
            toggleNotification({
                type: "warning",
                message: (0, translations_1.getTrad)("notification.error.customField.type"),
            });
            throw new Error(`Type of custom field is unsupported`);
    }
};
exports.default = AdditionalFieldInput;
//# sourceMappingURL=index.js.map