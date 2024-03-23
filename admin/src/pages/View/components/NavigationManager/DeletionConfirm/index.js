"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteConfirmFooter = exports.DeletionConfirm = void 0;
const Flex_1 = require("@strapi/design-system/Flex");
const Grid_1 = require("@strapi/design-system/Grid");
const Typography_1 = require("@strapi/design-system/Typography");
const fp_1 = require("lodash/fp");
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../../../../utils");
const Footer_1 = require("../Footer");
const DeletionConfirm = ({ navigations }) => (react_1.default.createElement(Grid_1.Grid, null,
    react_1.default.createElement(Grid_1.GridItem, { col: 12, paddingBottom: 1 },
        react_1.default.createElement(Flex_1.Flex, null,
            react_1.default.createElement(Typography_1.Typography, { variant: "beta" }, (0, utils_1.getMessage)("popup.navigation.manage.delete.header")))),
    react_1.default.createElement(Grid_1.GridItem, { col: 12, paddingBottom: 1 },
        react_1.default.createElement(Typography_1.Typography, { variant: "omega", fontWeight: "semiBold" }, renderItems(navigations)))));
exports.DeletionConfirm = DeletionConfirm;
const DeleteConfirmFooter = ({ state, onSubmit, onReset }) => (react_1.default.createElement(Footer_1.FooterBase, { start: {
        children: (0, utils_1.getMessage)("popup.item.form.button.cancel"),
        disabled: state.isLoading,
        onClick: onReset,
        variant: "tertiary",
    }, end: {
        children: (0, utils_1.getMessage)("popup.navigation.manage.button.delete"),
        disabled: state.isLoading,
        onClick: onSubmit,
        variant: "danger",
    } }));
exports.DeleteConfirmFooter = DeleteConfirmFooter;
const renderItems = (navigations) => navigations.map((0, fp_1.prop)("name")).join(", ");
//# sourceMappingURL=index.js.map