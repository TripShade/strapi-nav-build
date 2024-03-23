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
exports.NavigationUpdateFooter = exports.NavigationUpdate = void 0;
const react_1 = __importStar(require("react"));
const react_intl_1 = require("react-intl");
const utils_1 = require("../../../../../utils");
const Footer_1 = require("../Footer");
const Form_1 = require("../Form");
const NavigationUpdate = ({ alreadyUsedNames, current, isLoading, navigation: initialValue, setState, }) => {
    const { formatMessage } = (0, react_intl_1.useIntl)();
    const onChange = (0, react_1.useCallback)((updated) => {
        setState({
            view: "EDIT",
            alreadyUsedNames,
            current: updated,
            navigation: initialValue,
        });
    }, [setState, initialValue, alreadyUsedNames]);
    const navigation = (0, react_1.useMemo)(() => current ?? initialValue, [current]);
    const validationSchema = (0, react_1.useMemo)(() => (0, Form_1.validationSchemaFactory)(alreadyUsedNames, formatMessage), [alreadyUsedNames]);
    return (react_1.default.createElement(Form_1.Form, { navigation: navigation, onChange: onChange, isLoading: isLoading, validationSchema: validationSchema }));
};
exports.NavigationUpdate = NavigationUpdate;
const NavigationUpdateFooter = ({ state, onSubmit, onReset, }) => (react_1.default.createElement(Footer_1.FooterBase, { start: {
        children: (0, utils_1.getMessage)("popup.item.form.button.cancel"),
        disabled: state.isLoading,
        onClick: onReset,
        variant: "tertiary",
    }, end: {
        children: (0, utils_1.getMessage)("popup.navigation.manage.button.save"),
        disabled: state.isLoading,
        onClick: onSubmit,
        variant: "secondary",
    } }));
exports.NavigationUpdateFooter = NavigationUpdateFooter;
//# sourceMappingURL=index.js.map