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
exports.ErrorDetailsFooter = exports.ErrorDetails = void 0;
const Grid_1 = require("@strapi/design-system/Grid");
const helper_plugin_1 = require("@strapi/helper-plugin");
const react_1 = __importStar(require("react"));
const utils_1 = require("../../../../../utils");
const Footer_1 = require("../Footer");
const ErrorDetails = ({ errors }) => {
    const toggleNotification = (0, helper_plugin_1.useNotification)();
    (0, react_1.useEffect)(() => {
        errors.map((error) => {
            toggleNotification({
                type: "warning",
                message: { id: "", defaultMessage: error.message },
            });
            console.error(error);
        });
    }, []);
    return (react_1.default.createElement(Grid_1.Grid, null,
        react_1.default.createElement(Grid_1.GridItem, { col: 12 }, (0, utils_1.getMessage)("popup.navigation.manage.error.message"))));
};
exports.ErrorDetails = ErrorDetails;
const ErrorDetailsFooter = ({ onReset }) => (react_1.default.createElement(Footer_1.FooterBase, { end: {
        children: (0, utils_1.getMessage)("popup.navigation.manage.button.goBack"),
        onClick: onReset,
        variant: "secondary",
    } }));
exports.ErrorDetailsFooter = ErrorDetailsFooter;
//# sourceMappingURL=index.js.map