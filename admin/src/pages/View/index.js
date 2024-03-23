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
const lodash_1 = require("lodash");
const Main_1 = require("@strapi/design-system/Main");
const Flex_1 = require("@strapi/design-system/Flex");
const Layout_1 = require("@strapi/design-system/Layout");
const Typography_1 = require("@strapi/design-system/Typography");
const Box_1 = require("@strapi/design-system/Box");
const Icon_1 = require("@strapi/design-system/Icon");
const Button_1 = require("@strapi/design-system/Button");
const Select_1 = require("@strapi/design-system/Select");
const Grid_1 = require("@strapi/design-system/Grid");
const helper_plugin_1 = require("@strapi/helper-plugin");
const EmptyDocuments_1 = __importDefault(require("@strapi/icons/EmptyDocuments"));
const Plus_1 = __importDefault(require("@strapi/icons/Plus"));
const permissions_1 = __importDefault(require("../../permissions"));
const NavigationItemList_1 = __importDefault(require("../../components/NavigationItemList"));
const NavigationContentHeader_1 = __importDefault(require("./components/NavigationContentHeader"));
const NavigationHeader_1 = __importDefault(require("./components/NavigationHeader"));
const NavigationItemPopup_1 = __importDefault(require("./components/NavigationItemPopup"));
const useI18nCopyNavigationItemsModal_1 = require("../../hooks/useI18nCopyNavigationItemsModal");
const Search_1 = __importDefault(require("../../components/Search"));
const useDataManager_1 = __importDefault(require("../../hooks/useDataManager"));
const translations_1 = require("../../translations");
const parsers_1 = require("./utils/parsers");
const NoAccessPage_1 = __importDefault(require("../NoAccessPage"));
const View = () => {
    const toggleNotification = (0, helper_plugin_1.useNotification)();
    const { items: availableNavigations, activeItem: activeNavigation, changedActiveItem: changedActiveNavigation, config, navigationItemPopupOpened, isLoading, isLoadingForAdditionalDataToBeSet, isLoadingForSubmit, handleChangeNavigationItemPopupVisibility, handleChangeSelection, handleChangeNavigationData, handleResetNavigationData, handleSubmitNavigation, handleLocalizationSelection, handleI18nCopy, getContentTypeItems, error, availableLocale: allAvailableLocale, readNavigationItemFromLocale, slugify, permissions, } = (0, useDataManager_1.default)();
    const { canAccess, canUpdate } = permissions;
    const availableLocale = (0, react_1.useMemo)(() => allAvailableLocale.filter(locale => locale !== changedActiveNavigation?.localeCode), [changedActiveNavigation, allAvailableLocale]);
    const { i18nCopyItemsModal, i18nCopySourceLocale, setI18nCopyModalOpened, setI18nCopySourceLocale } = (0, useI18nCopyNavigationItemsModal_1.useI18nCopyNavigationItemsModal)((0, react_1.useCallback)((sourceLocale) => {
        const source = activeNavigation?.localizations?.find(({ localeCode }) => localeCode === sourceLocale);
        if (source) {
            handleI18nCopy(source.id, activeNavigation?.id);
        }
    }, [activeNavigation, handleI18nCopy]));
    const openI18nCopyModalOpened = (0, react_1.useCallback)(() => { i18nCopySourceLocale && setI18nCopyModalOpened(true); }, [setI18nCopyModalOpened, i18nCopySourceLocale]);
    const [activeNavigationItem, setActiveNavigationItemState] = (0, react_1.useState)({});
    const { formatMessage } = (0, react_intl_1.useIntl)();
    const [{ value: searchValue, index: searchIndex }, setSearchValue] = (0, react_1.useState)({ value: '' });
    const [structureChanged, setStructureChanged] = (0, react_1.useState)(false);
    const isSearchEmpty = (0, lodash_1.isEmpty)(searchValue);
    const normalisedSearchValue = (searchValue || '').toLowerCase();
    const structureHasErrors = !(0, parsers_1.validateNavigationStructure)((changedActiveNavigation || {}).items);
    (0, react_1.useEffect)(() => {
        if (structureHasErrors) {
            toggleNotification({
                type: 'warning',
                message: (0, translations_1.getTrad)('notification.error.item.relation'),
            });
        }
    }, [structureHasErrors]);
    const navigationSelectValue = (0, lodash_1.get)(activeNavigation, "id", null);
    const handleSave = () => isLoadingForSubmit || structureHasErrors
        ? null
        : handleSubmitNavigation(formatMessage, (0, parsers_1.transformToRESTPayload)(changedActiveNavigation, config));
    const changeNavigationItemPopupState = (visible, editedItem = {}) => {
        setActiveNavigationItemState(editedItem);
        handleChangeNavigationItemPopupVisibility(visible);
    };
    const addNewNavigationItem = (0, react_1.useCallback)((event, viewParentId = null, isMenuAllowedLevel = true, levelPath = '', parentAttachedToMenu = true, structureId = "0") => {
        if (canUpdate) {
            event.preventDefault();
            event.stopPropagation();
            changeNavigationItemPopupState(true, {
                viewParentId,
                isMenuAllowedLevel,
                levelPath,
                parentAttachedToMenu,
                structureId,
            });
        }
    }, [changeNavigationItemPopupState]);
    const usedContentTypesData = (0, react_1.useMemo)(() => changedActiveNavigation ? (0, parsers_1.usedContentTypes)(changedActiveNavigation.items) : [], [changedActiveNavigation]);
    const pullUsedContentTypeItem = (items = []) => items.reduce((prev, curr) => [...prev, curr.relatedRef ? {
            __collectionUid: curr.relatedRef.__collectionUid,
            id: curr.relatedRef.id
        } : undefined, ...pullUsedContentTypeItem(curr.items)].filter(item => item), []);
    const usedContentTypeItems = pullUsedContentTypeItem(changedActiveNavigation?.items);
    const handleSubmitNavigationItem = (payload) => {
        const changedStructure = {
            ...changedActiveNavigation,
            items: (0, parsers_1.transformItemToViewPayload)(payload, changedActiveNavigation.items, config),
        };
        handleChangeNavigationData(changedStructure, true);
        setStructureChanged(true);
    };
    const filteredListFactory = (items, doUse, activeIndex) => {
        const filteredItems = items.reduce((acc, item) => {
            const subItems = !(0, lodash_1.isEmpty)(item.items) ? filteredListFactory(item.items, doUse) : [];
            if (doUse(item))
                return [item, ...subItems, ...acc];
            else
                return [...subItems, ...acc];
        }, []);
        if (activeIndex !== undefined) {
            const index = activeIndex % filteredItems.length;
            return filteredItems.map((item, currentIndex) => {
                return index === currentIndex ? ({ ...item, isSearchActive: true }) : item;
            });
        }
        return filteredItems;
    };
    const filteredList = !isSearchEmpty ? filteredListFactory(changedActiveNavigation.items.map(_ => ({ ..._ })), (item) => (item?.title || '').toLowerCase().includes(normalisedSearchValue), normalisedSearchValue ? searchIndex : undefined) : [];
    const changeCollapseItemDeep = (item, isCollapsed) => {
        if (item.collapsed !== isCollapsed) {
            return {
                ...item,
                collapsed: isCollapsed,
                updated: true,
                items: item.items?.map(el => changeCollapseItemDeep(el, isCollapsed))
            };
        }
        return {
            ...item,
            items: item.items?.map(el => changeCollapseItemDeep(el, isCollapsed))
        };
    };
    const handleCollapseAll = () => {
        handleChangeNavigationData({
            ...changedActiveNavigation,
            items: changedActiveNavigation.items.map(item => changeCollapseItemDeep(item, true))
        }, true);
        setStructureChanged(true);
    };
    const handleExpandAll = () => {
        handleChangeNavigationData({
            ...changedActiveNavigation,
            items: changedActiveNavigation.items.map(item => changeCollapseItemDeep(item, false))
        }, true);
        setStructureChanged(true);
    };
    const handleItemReOrder = (item, newOrder) => {
        handleSubmitNavigationItem({
            ...item,
            order: newOrder,
        });
    };
    const handleItemRemove = (item) => {
        handleSubmitNavigationItem({
            ...item,
            removed: true,
        });
    };
    const handleItemRestore = (item) => {
        handleSubmitNavigationItem({
            ...item,
            removed: false,
        });
    };
    const handleItemToggleCollapse = (item) => {
        handleSubmitNavigationItem({
            ...item,
            collapsed: !item.collapsed,
            updated: true,
            isSearchActive: false,
        });
    };
    const handleItemEdit = (item, levelPath = '', parentAttachedToMenu = true) => {
        changeNavigationItemPopupState(true, {
            ...item,
            levelPath,
            parentAttachedToMenu,
        });
    };
    const onPopUpClose = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.target.tagName !== 'HTML') {
            changeNavigationItemPopupState(false);
        }
    };
    const handleChangeNavigationSelection = (...args) => {
        handleChangeSelection(...args);
        setSearchValue({ value: '', index: 0 });
    };
    const endActions = [
        {
            onClick: handleExpandAll,
            disabled: isLoadingForSubmit,
            type: "submit",
            variant: 'tertiary',
            tradId: 'header.action.expandAll',
            margin: '8px',
        },
        {
            onClick: handleCollapseAll,
            disabled: isLoadingForSubmit,
            type: "submit",
            variant: 'tertiary',
            tradId: 'header.action.collapseAll',
            margin: '8px',
        },
    ];
    if (canUpdate) {
        endActions.push({
            onClick: addNewNavigationItem,
            startIcon: react_1.default.createElement(Plus_1.default, null),
            disabled: isLoadingForSubmit,
            type: "submit",
            variant: "default",
            tradId: 'header.action.newItem',
            margin: '16px',
        });
    }
    return (react_1.default.createElement(Main_1.Main, { labelledBy: "title", "aria-busy": isLoadingForSubmit },
        react_1.default.createElement(NavigationHeader_1.default, { structureHasErrors: structureHasErrors, structureHasChanged: structureChanged, availableNavigations: availableNavigations, activeNavigation: activeNavigation, handleChangeSelection: handleChangeNavigationSelection, handleSave: handleSave, handleLocalizationSelection: handleLocalizationSelection, config: config, permissions: {
                canAccess, canUpdate
            } }),
        react_1.default.createElement(Layout_1.ContentLayout, null,
            isLoading && react_1.default.createElement(helper_plugin_1.LoadingIndicatorPage, null),
            changedActiveNavigation && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(NavigationContentHeader_1.default, { startActions: react_1.default.createElement(Search_1.default, { value: searchValue, setValue: setSearchValue }), endActions: endActions.map(({ tradId, margin, ...item }, i) => react_1.default.createElement(Box_1.Box, { marginLeft: margin, key: i },
                        react_1.default.createElement(Button_1.Button, { ...item },
                            " ",
                            formatMessage((0, translations_1.getTrad)(tradId)),
                            " "))) }),
                (0, lodash_1.isEmpty)(changedActiveNavigation.items || []) && (react_1.default.createElement(Flex_1.Flex, { direction: "column", minHeight: "400px", justifyContent: "center" },
                    react_1.default.createElement(Icon_1.Icon, { as: EmptyDocuments_1.default, width: "160px", height: "88px", color: "" }),
                    react_1.default.createElement(Box_1.Box, { padding: 4 },
                        react_1.default.createElement(Typography_1.Typography, { variant: "beta", textColor: "neutral600" }, formatMessage((0, translations_1.getTrad)('empty')))),
                    canUpdate && (react_1.default.createElement(Button_1.Button, { variant: 'secondary', startIcon: react_1.default.createElement(Plus_1.default, null), label: formatMessage((0, translations_1.getTrad)('empty.cta')), onClick: addNewNavigationItem }, formatMessage((0, translations_1.getTrad)('empty.cta')))),
                    canUpdate && config.i18nEnabled && availableLocale.length ? (react_1.default.createElement(Flex_1.Flex, { direction: "column", justifyContent: "center" },
                        react_1.default.createElement(Box_1.Box, { paddingTop: 3, paddingBottom: 3 },
                            react_1.default.createElement(Typography_1.Typography, { variant: "beta", textColor: "neutral600" }, formatMessage((0, translations_1.getTrad)('view.i18n.fill.cta')))),
                        react_1.default.createElement(Flex_1.Flex, { direction: "row", justifyContent: "center", alignItems: "center" },
                            react_1.default.createElement(Box_1.Box, { paddingLeft: 1, paddingRight: 1 },
                                react_1.default.createElement(Select_1.Select, { onChange: setI18nCopySourceLocale, value: i18nCopySourceLocale, size: "S" }, availableLocale.map(locale => react_1.default.createElement(Select_1.Option, { key: locale, value: locale }, formatMessage((0, translations_1.getTrad)('view.i18n.fill.option'), { locale }))))),
                            react_1.default.createElement(Box_1.Box, { paddingLeft: 1, paddingRight: 1 },
                                react_1.default.createElement(Button_1.Button, { variant: "tertiary", onClick: openI18nCopyModalOpened, disabled: !i18nCopySourceLocale, size: "S" }, formatMessage((0, translations_1.getTrad)('view.i18n.fill.cta.button'))))))) : null)),
                !(0, lodash_1.isEmpty)(changedActiveNavigation.items || [])
                    && react_1.default.createElement(NavigationItemList_1.default, { items: isSearchEmpty ? changedActiveNavigation.items || [] : filteredList, onItemLevelAdd: addNewNavigationItem, onItemRemove: handleItemRemove, onItemEdit: handleItemEdit, onItemRestore: handleItemRestore, onItemReOrder: handleItemReOrder, onItemToggleCollapse: handleItemToggleCollapse, displayFlat: !isSearchEmpty, root: true, error: error, allowedLevels: config.allowedLevels, contentTypes: config.contentTypes, isParentAttachedToMenu: true, contentTypesNameFields: config.contentTypesNameFields, permissions: permissions })))),
        navigationItemPopupOpened && react_1.default.createElement(NavigationItemPopup_1.default, { availableLocale: availableLocale, isLoading: isLoadingForAdditionalDataToBeSet, data: activeNavigationItem, config: config, usedContentTypesData: usedContentTypesData, usedContentTypeItems: usedContentTypeItems, getContentTypeItems: getContentTypeItems, onSubmit: handleSubmitNavigationItem, onClose: onPopUpClose, locale: activeNavigation.localeCode, readNavigationItemFromLocale: readNavigationItemFromLocale, slugify: slugify, permissions: permissions }),
        canUpdate && i18nCopyItemsModal));
};
exports.default = (0, react_1.memo)(View);
//# sourceMappingURL=index.js.map