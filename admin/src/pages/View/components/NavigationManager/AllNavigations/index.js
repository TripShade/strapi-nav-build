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
exports.AllNavigationsFooter = exports.AllNavigations = void 0;
const BaseCheckbox_1 = require("@strapi/design-system/BaseCheckbox");
const Box_1 = require("@strapi/design-system/Box");
const Button_1 = require("@strapi/design-system/Button");
const Flex_1 = require("@strapi/design-system/Flex");
const Grid_1 = require("@strapi/design-system/Grid");
const IconButton_1 = require("@strapi/design-system/IconButton");
const Table_1 = require("@strapi/design-system/Table");
const Typography_1 = require("@strapi/design-system/Typography");
const fp_1 = require("lodash/fp");
const react_1 = __importStar(require("react"));
const useDataManager_1 = __importDefault(require("../../../../../hooks/useDataManager"));
const utils_1 = require("../../../../../utils");
const Footer_1 = require("../Footer");
const NewNavigation_1 = require("../NewNavigation");
const icons = __importStar(require("./icons"));
const AllNavigations = ({ navigations, selected, setState }) => {
    const { config: { i18nEnabled }, } = (0, useDataManager_1.default)();
    const hasAnySelected = !!selected.length;
    const toggleSelected = (0, react_1.useCallback)(() => setState({
        navigations,
        selected: hasAnySelected ? [] : navigations.map((n) => n),
        view: "LIST",
    }), [setState, navigations, hasAnySelected]);
    const currentlySelectedSet = (0, react_1.useMemo)(() => new Set(selected.map((0, fp_1.prop)("id"))), [selected]);
    const handleSelect = (navigation, isSelected) => () => {
        setState({
            navigations,
            selected: isSelected
                ? selected.filter(({ id }) => id !== navigation.id)
                : selected.concat([navigation]),
            view: "LIST",
        });
    };
    const edit = (navigation) => () => {
        setState({
            view: "EDIT",
            navigation,
            alreadyUsedNames: navigations.reduce((acc, { name }) => name !== navigation.name ? acc.concat([name]) : acc, []),
        });
    };
    const _delete = (navigations) => () => {
        setState({
            view: "DELETE",
            navigations,
        });
    };
    const deleteSelected = (0, react_1.useCallback)(_delete(selected), [_delete]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Grid_1.Grid, null,
            react_1.default.createElement(Grid_1.GridItem, { col: 12, paddingBottom: 3 }, hasAnySelected ? (react_1.default.createElement(Flex_1.Flex, { direction: "row", gap: 1 },
                react_1.default.createElement(Box_1.Box, { paddingRight: 3 }, (0, utils_1.getMessage)({
                    id: "popup.navigation.manage.table.hasSelected",
                    props: {
                        count: selected.length,
                    },
                })),
                react_1.default.createElement(Button_1.Button, { onClick: deleteSelected, variant: "tertiary" }, (0, utils_1.getMessage)("popup.navigation.manage.button.delete")))) : null)),
        react_1.default.createElement(Table_1.Table, { rowCount: navigations.length, colCount: i18nEnabled ? 6 : 5 },
            react_1.default.createElement(Table_1.Thead, null,
                react_1.default.createElement(Table_1.Tr, null,
                    react_1.default.createElement(Table_1.Th, null,
                        react_1.default.createElement(BaseCheckbox_1.BaseCheckbox, { onValueChange: toggleSelected, value: hasAnySelected })),
                    react_1.default.createElement(Table_1.Th, null,
                        react_1.default.createElement(Typography_1.Typography, { textColor: "neutral800" }, (0, utils_1.getMessage)("popup.navigation.manage.table.id"))),
                    react_1.default.createElement(Table_1.Th, null,
                        react_1.default.createElement(Typography_1.Typography, { textColor: "neutral800" }, (0, utils_1.getMessage)("popup.navigation.manage.table.name"))),
                    i18nEnabled ? (react_1.default.createElement(Table_1.Th, null,
                        react_1.default.createElement(Typography_1.Typography, { textColor: "neutral800" }, (0, utils_1.getMessage)("popup.navigation.manage.table.locale")))) : null,
                    react_1.default.createElement(Table_1.Th, null,
                        react_1.default.createElement(Typography_1.Typography, { textColor: "neutral800" }, (0, utils_1.getMessage)("popup.navigation.manage.table.visibility"))),
                    react_1.default.createElement(Table_1.Th, null))),
            react_1.default.createElement(Table_1.Tbody, null, navigations.map((navigation) => (react_1.default.createElement(Table_1.Tr, { key: navigation.id },
                react_1.default.createElement(Table_1.Td, null,
                    react_1.default.createElement(BaseCheckbox_1.BaseCheckbox, { onValueChange: handleSelect(navigation, currentlySelectedSet.has(navigation.id)), value: currentlySelectedSet.has(navigation.id) })),
                react_1.default.createElement(Table_1.Td, null,
                    react_1.default.createElement(Typography_1.Typography, { textColor: "neutral800" }, navigation.id)),
                react_1.default.createElement(Table_1.Td, null,
                    react_1.default.createElement(Typography_1.Typography, { textColor: "neutral800" }, navigation.name)),
                i18nEnabled ? (react_1.default.createElement(Table_1.Td, null,
                    react_1.default.createElement(Typography_1.Typography, { textColor: "neutral800" }, [navigation.localeCode]
                        .concat(navigation.localizations?.map((0, fp_1.prop)("localeCode")) || [])
                        .join(", ")))) : null,
                react_1.default.createElement(Table_1.Td, null, navigation.visible
                    ? (0, utils_1.getMessage)("popup.navigation.manage.navigation.visible")
                    : (0, utils_1.getMessage)("popup.navigation.manage.navigation.hidden")),
                react_1.default.createElement(Table_1.Td, null,
                    react_1.default.createElement(Flex_1.Flex, { direction: "row" },
                        react_1.default.createElement(Box_1.Box, { paddingLeft: 1 },
                            react_1.default.createElement(IconButton_1.IconButton, { onClick: edit(navigation), label: (0, utils_1.getMessage)("popup.navigation.manage.button.edit"), noBorder: true, icon: icons.edit })),
                        react_1.default.createElement(Box_1.Box, { paddingLeft: 1 },
                            react_1.default.createElement(IconButton_1.IconButton, { onClick: _delete([navigation]), label: (0, utils_1.getMessage)("popup.navigation.manage.button.delete"), noBorder: true, icon: icons.deleteIcon })))))))))));
};
exports.AllNavigations = AllNavigations;
const AllNavigationsFooter = ({ onClose, state, setState, navigations, }) => (react_1.default.createElement(Footer_1.FooterBase, { start: {
        onClick: onClose,
        variant: "tertiary",
        disabled: state.isLoading,
        children: (0, utils_1.getMessage)("popup.item.form.button.cancel"),
    }, end: {
        onClick: () => setState({
            view: "CREATE",
            alreadyUsedNames: navigations.map(({ name }) => name),
            current: NewNavigation_1.INITIAL_NAVIGATION,
        }),
        variant: "default",
        disabled: state.isLoading,
        children: (0, utils_1.getMessage)("popup.navigation.manage.button.create"),
    } }));
exports.AllNavigationsFooter = AllNavigationsFooter;
//# sourceMappingURL=index.js.map