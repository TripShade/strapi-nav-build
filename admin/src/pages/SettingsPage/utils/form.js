"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultValues = exports.schemaFactory = void 0;
const yup_1 = require("yup");
const helper_plugin_1 = require("@strapi/helper-plugin");
const translations_1 = require("../../../translations");
const common_1 = require("../common");
const schemaFactory = (usedCustomFieldNames) => {
    return (0, yup_1.object)({
        name: (0, yup_1.string)().matches(/^\S+$/, "Invalid name string. Name cannot contain spaces").required(helper_plugin_1.translatedErrors.required).notOneOf(usedCustomFieldNames, helper_plugin_1.translatedErrors.unique),
        label: (0, yup_1.string)().required(helper_plugin_1.translatedErrors.required),
        type: (0, yup_1.mixed)().required(helper_plugin_1.translatedErrors.required).oneOf(common_1.customFieldsTypes, (0, translations_1.getTradId)("notification.error.customField.type")),
        required: (0, yup_1.bool)().required(helper_plugin_1.translatedErrors.required),
        multi: (0, yup_1.mixed)().when('type', {
            is: (val) => val === 'select',
            then: (0, yup_1.bool)().required(helper_plugin_1.translatedErrors.required),
            otherwise: (0, yup_1.bool)().notRequired()
        }),
        options: (0, yup_1.mixed)().when('type', {
            is: (val) => val === 'select',
            then: (0, yup_1.array)().of((0, yup_1.string)()),
            otherwise: (0, yup_1.mixed)().notRequired(),
        }),
        enabled: (0, yup_1.bool)().notRequired(),
    });
};
exports.schemaFactory = schemaFactory;
exports.defaultValues = {
    name: "",
    label: "",
    type: "string",
    required: false,
    multi: false,
    options: [],
    enabled: true,
};
//# sourceMappingURL=form.js.map