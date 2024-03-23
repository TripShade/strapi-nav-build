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
exports.validationSchemaFactory = exports.Form = void 0;
const Grid_1 = require("@strapi/design-system/Grid");
const helper_plugin_1 = require("@strapi/helper-plugin");
const formik_1 = require("formik");
const react_1 = __importStar(require("react"));
const yup = __importStar(require("yup"));
const translations_1 = require("../../../../../translations");
const lodash_1 = require("lodash");
const Form = ({ navigation, onChange: onChangeBase, isLoading, validationSchema, }) => {
    const initialValues = {
        id: (0, lodash_1.get)(navigation, "id", ""),
        name: (0, lodash_1.get)(navigation, "name", ""),
    };
    const onChange = (0, react_1.useCallback)(({ target: { name, value } }) => {
        onChangeBase({
            ...navigation,
            [name]: value,
        });
    }, [onChangeBase, navigation]);
    const [error, setError] = (0, react_1.useState)(null);
    const errorProps = (0, react_1.useMemo)(() => ({
        name: error?.path === "name" ? error.message : undefined,
        visible: error?.path === "visible" ? error.message : undefined,
    }), [error]);
    (0, react_1.useEffect)(() => {
        validationSchema
            .validate(navigation)
            .then(() => setError(null))
            .catch(setError);
    }, [navigation, validationSchema, setError]);
    return (react_1.default.createElement(formik_1.Formik, { initialValues: initialValues, onSubmit: onChangeBase },
        react_1.default.createElement(helper_plugin_1.Form, null,
            react_1.default.createElement(Grid_1.Grid, { gap: 5 },
                react_1.default.createElement(Grid_1.GridItem, { col: 6 },
                    react_1.default.createElement(helper_plugin_1.GenericInput, { ...formProps.name, name: "name", description: {
                            id: (0, translations_1.getTradId)("popup.item.form.title.placeholder"),
                            defaultMessage: "e.g. Blog",
                        }, type: "text", error: errorProps.name, onChange: onChange, value: navigation.name, disabled: isLoading, required: true })),
                react_1.default.createElement(Grid_1.GridItem, { col: 6 },
                    react_1.default.createElement(helper_plugin_1.GenericInput, { ...formProps.visible, name: "visible", type: "bool", error: errorProps.visible, onChange: onChange, value: navigation.visible, disabled: isLoading }))))));
};
exports.Form = Form;
const formProps = {
    name: {
        intlLabel: {
            id: (0, translations_1.getTradId)("popup.navigation.form.name.label"),
            defaultMessage: "Name",
        },
        placeholder: {
            id: (0, translations_1.getTradId)("popup.navigation.form.name.placeholder"),
            defaultMessage: "Navigations's name",
        },
    },
    visible: {
        intlLabel: {
            id: (0, translations_1.getTradId)("popup.navigation.form.visible.label"),
            defaultMessage: "Visibility",
        },
    },
};
const validationSchemaFactory = (alreadyUsedNames, formatMessage) => yup.object({
    name: yup
        .string()
        .notOneOf(alreadyUsedNames, formatMessage({
        id: (0, translations_1.getTradId)("popup.navigation.form.validation.name.alreadyUsed"),
    }))
        .required(formatMessage({
        id: (0, translations_1.getTradId)("popup.navigation.form.validation.name.required"),
    }))
        .min(2, formatMessage({
        id: (0, translations_1.getTradId)("popup.navigation.form.validation.name.tooShort"),
    })),
    visible: yup.boolean().required(formatMessage({
        id: (0, translations_1.getTradId)("popup.navigation.form.validation.visible.required"),
    })),
});
exports.validationSchemaFactory = validationSchemaFactory;
//# sourceMappingURL=index.js.map