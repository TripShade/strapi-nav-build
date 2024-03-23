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
exports.defaultValues = exports.schemaFactory = void 0;
const yup = __importStar(require("yup"));
const lodash_1 = require("lodash");
const helper_plugin_1 = require("@strapi/helper-plugin");
const utils_1 = require("../../../../../utils");
const pluginId_1 = __importDefault(require("../../../../../pluginId"));
const externalPathRegexps = [
    /^mailto:[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/,
    /^tel:(\+\d{1,3})?[\s]?(\(?\d{2,3}\)?)?[\s.-]?(\d{3})?[\s.-]?\d{3,4}$/,
    /^#.*/,
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
];
const schemaFactory = (isSingleSelected, additionalFields) => {
    return yup.object({
        title: yup.string()
            .when('type', {
            is: (val) => val !== utils_1.navigationItemType.INTERNAL,
            then: yup.string()
                .required(helper_plugin_1.translatedErrors.required),
            otherwise: yup.string().notRequired(),
        }),
        uiRouterKey: yup.string().required(helper_plugin_1.translatedErrors.required),
        type: yup.string().required(helper_plugin_1.translatedErrors.required),
        path: yup.string()
            .when('type', {
            is: (val) => val !== utils_1.navigationItemType.EXTERNAL || (0, lodash_1.isNil)(val),
            then: yup.string().matches(/^\S+$/, "Invalid path string").required(helper_plugin_1.translatedErrors.required),
            otherwise: yup.string().notRequired(),
        }),
        externalPath: yup.string()
            .when('type', {
            is: (val) => val === utils_1.navigationItemType.EXTERNAL,
            then: yup.string()
                .required(helper_plugin_1.translatedErrors.required)
                .test(`${pluginId_1.default}.popup.item.form.externalPath.validation.type`, externalPath => externalPath ? externalPathRegexps.some(re => re.test(externalPath)) : true),
            otherwise: yup.string().notRequired(),
        }),
        menuAttached: yup.boolean(),
        relatedType: yup.mixed()
            .when('type', {
            is: (val) => val === utils_1.navigationItemType.INTERNAL || (0, lodash_1.isNil)(val),
            then: yup.string().required(helper_plugin_1.translatedErrors.required).min(1, helper_plugin_1.translatedErrors.required),
            otherwise: yup.mixed().notRequired(),
        }),
        related: yup.mixed()
            .when('type', {
            is: (val) => val === utils_1.navigationItemType.INTERNAL || (0, lodash_1.isNil)(val),
            then: isSingleSelected ? yup.mixed().notRequired() : yup.string().required(helper_plugin_1.translatedErrors.required).min(1, helper_plugin_1.translatedErrors.required),
            otherwise: yup.mixed().notRequired(),
        }),
        additionalFields: yup.object({
            ...additionalFields.reduce((acc, current) => {
                var value;
                if (typeof current === 'string')
                    return acc;
                if (current.type === 'boolean')
                    value = yup.bool();
                else if (current.type === 'string')
                    value = yup.string();
                else if (current.type === 'select' && current.multi)
                    value = yup.array().of(yup.string());
                else if (current.type === 'select' && !current.multi)
                    value = yup.string();
                else if (current.type === 'media')
                    value = yup.mixed();
                else
                    throw new Error(`Type "${current.type}" is unsupported by custom fields`);
                if (current.required)
                    value = value.required(helper_plugin_1.translatedErrors.required);
                else
                    value = value.notRequired();
                return { ...acc, [current.name]: value };
            }, {})
        })
    });
};
exports.schemaFactory = schemaFactory;
exports.defaultValues = {
    type: "INTERNAL",
    related: "",
    relatedType: "",
    audience: [],
    menuAttached: false,
    title: "",
    externalPath: "",
    path: "",
    additionalFields: {
        boolean: false,
        string: "",
    },
    updated: false,
};
//# sourceMappingURL=form.js.map