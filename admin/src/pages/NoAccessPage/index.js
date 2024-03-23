"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const helper_plugin_1 = require("@strapi/helper-plugin");
const Main_1 = require("@strapi/design-system/Main");
const Layout_1 = require("@strapi/design-system/Layout");
const EmptyStateLayout_1 = require("@strapi/design-system/EmptyStateLayout");
const icons_1 = require("@strapi/icons");
const react_intl_1 = require("react-intl");
const NoAcccessPage = () => {
    const { formatMessage } = (0, react_intl_1.useIntl)();
    (0, helper_plugin_1.useFocusWhenNavigate)();
    return (react_1.default.createElement(Main_1.Main, { labelledBy: "title" },
        react_1.default.createElement(Layout_1.HeaderLayout, { id: "title", title: formatMessage({
                id: 'page.auth.noAccess',
                defaultMessage: 'No access',
            }) }),
        react_1.default.createElement(Layout_1.ContentLayout, null,
            react_1.default.createElement(EmptyStateLayout_1.EmptyStateLayout, { action: react_1.default.createElement(helper_plugin_1.LinkButton, { variant: "secondary", endIcon: react_1.default.createElement(icons_1.ArrowRight, null), to: "/" }, formatMessage({
                    id: 'components.notAccessPage.back',
                    defaultMessage: 'Back to homepage',
                })), content: formatMessage({
                    id: 'page.auth.not.allowed',
                    defaultMessage: "Oops! It seems like You do not have access to this page...",
                }), hasRadius: true, icon: react_1.default.createElement(icons_1.EmptyPictures, { width: "10rem" }), shadow: "tableShadow" }))));
};
exports.default = NoAcccessPage;
//# sourceMappingURL=index.js.map