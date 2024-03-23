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
const react_intl_1 = require("react-intl");
const Layout_1 = require("@strapi/design-system/Layout");
const Stack_1 = require("@strapi/design-system/Stack");
const Button_1 = require("@strapi/design-system/Button");
const Check_1 = __importDefault(require("@strapi/icons/Check"));
const More_1 = __importDefault(require("@strapi/icons/More"));
const Information_1 = __importDefault(require("@strapi/icons/Information"));
const Tag_1 = require("@strapi/design-system/Tag");
const translations_1 = require("../../../../translations");
const styles_1 = require("./styles");
const Select_1 = require("@strapi/design-system/Select");
const Box_1 = require("@strapi/design-system/Box");
const Grid_1 = require("@strapi/design-system/Grid");
const lodash_1 = require("lodash");
const useNavigationManager_1 = require("../../../../hooks/useNavigationManager");
const submitIcon = react_1.default.createElement(Check_1.default, null);
const pickDefaultLocaleNavigation = ({ activeNavigation, config }) => config.i18nEnabled
    ? activeNavigation
        ? activeNavigation.localeCode === config.defaultLocale
            ? activeNavigation
            : activeNavigation?.localizations.find(({ localeCode }) => localeCode === config.defaultLocale)
        : null
    : activeNavigation;
const NavigationHeader = ({ activeNavigation, availableNavigations, structureHasErrors, structureHasChanged, handleChangeSelection, handleLocalizationSelection, handleSave, config, permissions = {}, }) => {
    const { formatMessage } = (0, react_intl_1.useIntl)();
    const allLocaleVersions = (0, react_1.useMemo)(() => activeNavigation?.localizations.length && config.i18nEnabled
        ? (0, lodash_1.uniqBy)([activeNavigation, ...(activeNavigation.localizations ?? [])].sort((a, b) => a.localeCode.localeCompare(b.localeCode)), 'id')
        : [], [activeNavigation, config]);
    const hasLocalizations = config.i18nEnabled && allLocaleVersions.length;
    const passedActiveNavigation = pickDefaultLocaleNavigation({ activeNavigation, config });
    const { closeNavigationManagerModal, openNavigationManagerModal, navigationManagerModal } = (0, useNavigationManager_1.useNavigationManager)();
    const { canUpdate } = permissions;
    return (react_1.default.createElement(Layout_1.HeaderLayout, { secondaryAction: react_1.default.createElement(Tag_1.Tag, { icon: react_1.default.createElement(Information_1.default, { "aria-hidden": true }) }, activeNavigation
            ? formatMessage((0, translations_1.getTrad)('header.meta'), {
                id: activeNavigation?.id,
                key: activeNavigation?.slug
            })
            : null), primaryAction: react_1.default.createElement(Stack_1.Stack, { horizontal: true, size: 2 },
            react_1.default.createElement(Box_1.Box, { marginRight: "8px" },
                react_1.default.createElement(Grid_1.Grid, { gap: 4 },
                    !hasLocalizations ? (react_1.default.createElement(Grid_1.GridItem, { col: 2 })) : null,
                    canUpdate && (react_1.default.createElement(Grid_1.GridItem, { col: 3 },
                        react_1.default.createElement(Button_1.Button, { onClick: openNavigationManagerModal, startIcon: null, type: "button", variant: "secondary", fullWidth: true, size: "S" }, formatMessage((0, translations_1.getTrad)('header.action.manage'))))),
                    react_1.default.createElement(Grid_1.GridItem, { col: canUpdate ? 4 : 10 },
                        react_1.default.createElement(Select_1.Select, { type: "select", placeholder: "Change navigation", name: "navigationSelect", onChange: handleChangeSelection, value: passedActiveNavigation?.id, size: "S", style: null }, availableNavigations.map(({ id, name }) => react_1.default.createElement(Select_1.Option, { key: id, value: id }, name)))),
                    hasLocalizations
                        ? react_1.default.createElement(Grid_1.GridItem, { col: 2 },
                            react_1.default.createElement(Select_1.Select, { type: "select", placeholder: formatMessage((0, translations_1.getTrad)('pages.main.header.localization.select.placeholder')), name: "navigationLocalizationSelect", onChange: handleLocalizationSelection, value: activeNavigation?.id, size: "S" }, allLocaleVersions.map(({ id, localeCode }) => react_1.default.createElement(Select_1.Option, { key: id, value: id }, localeCode))))
                        : null,
                    canUpdate && (react_1.default.createElement(Grid_1.GridItem, { col: 3 },
                        react_1.default.createElement(Button_1.Button, { onClick: handleSave, startIcon: submitIcon, disabled: structureHasErrors || !structureHasChanged, type: "submit", fullWidth: true, size: "S" }, formatMessage((0, translations_1.getTrad)('submit.cta.save'))))))),
            canUpdate && navigationManagerModal), title: formatMessage({
            id: (0, translations_1.getTrad)('header.title'),
            defaultMessage: 'UI Navigation',
        }), subtitle: formatMessage({
            id: (0, translations_1.getTrad)('header.description'),
            defaultMessage: 'Define your portal navigation',
        }) }));
};
exports.default = NavigationHeader;
//# sourceMappingURL=index.js.map