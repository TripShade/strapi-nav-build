"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareNewValueForRecord = exports.getDefaultCustomFields = exports.getMessage = void 0;
const lodash_1 = require("lodash");
const react_intl_1 = require("react-intl");
const form_1 = require("../pages/View/components/NavigationItemForm/utils/form");
const pluginId_1 = __importDefault(require("../pluginId"));
const getMessage = (input, defaultMessage = '', inPluginScope = true) => {
    const { formatMessage } = (0, react_intl_1.useIntl)();
    let formattedId = '';
    if (typeof input === 'string') {
        formattedId = input;
    }
    else {
        formattedId = input.id.toString() || formattedId;
    }
    return formatMessage({
        id: `${inPluginScope ? pluginId_1.default : 'app.components'}.${formattedId}`,
        defaultMessage,
    }, typeof input === 'string' ? undefined : input?.props);
};
exports.getMessage = getMessage;
const getDefaultCustomFields = (args) => {
    return args.additionalFields.reduce((acc, additionalField) => {
        if (typeof additionalField === 'string') {
            return acc;
        }
        else {
            const value = form_1.defaultValues.additionalFields[additionalField.type];
            return {
                ...acc,
                [additionalField.name]: (0, lodash_1.get)(args.customFieldsValues, additionalField.name, value),
            };
        }
    }, {});
};
exports.getDefaultCustomFields = getDefaultCustomFields;
const prepareNewValueForRecord = (uid, current, value) => ({
    ...current,
    [uid]: value && !(0, lodash_1.isEmpty)(value) ? [...value] : undefined,
});
exports.prepareNewValueForRecord = prepareNewValueForRecord;
//# sourceMappingURL=functions.js.map