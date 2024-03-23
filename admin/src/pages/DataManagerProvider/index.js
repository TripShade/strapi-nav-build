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
const react_router_dom_1 = require("react-router-dom");
const react_intl_1 = require("react-intl");
const prop_types_1 = __importDefault(require("prop-types"));
const lodash_1 = require("lodash");
const helper_plugin_1 = require("@strapi/helper-plugin");
const DataManagerContext_1 = __importDefault(require("../../contexts/DataManagerContext"));
const pluginId_1 = __importDefault(require("../../pluginId"));
const init_1 = __importDefault(require("./init"));
const translations_1 = require("../../translations");
const reducer_1 = __importStar(require("./reducer"));
const actions_1 = require("./actions");
const parsers_1 = require("../View/utils/parsers");
const utils_1 = require("../../utils");
const NoAccessPage_1 = __importDefault(require("../NoAccessPage"));
const permissions_1 = __importDefault(require("../../permissions"));
const i18nAwareItems = ({ items, config }) => config.i18nEnabled ? items.filter(({ localeCode }) => localeCode === config.defaultLocale) : items;
const DataManagerProvider = ({ children }) => {
    const [reducerState, dispatch] = (0, react_1.useReducer)(reducer_1.default, reducer_1.initialState, init_1.default);
    const toggleNotification = (0, helper_plugin_1.useNotification)();
    const { autoReload } = (0, helper_plugin_1.useAppInfos)();
    const { formatMessage } = (0, react_intl_1.useIntl)();
    const { items, config, activeItem, initialData, changedActiveItem, navigationPopupOpened, navigationItemPopupOpened, isLoading, isLoadingForDataToBeSet, isLoadingForDetailsDataToBeSet, isLoadingForAdditionalDataToBeSet, isLoadingForSubmit, error, availableLocale, } = reducerState;
    const { pathname } = (0, react_router_dom_1.useLocation)();
    const formatMessageRef = (0, react_1.useRef)();
    formatMessageRef.current = formatMessage;
    const viewPermissions = (0, react_1.useMemo)(() => ({
        access: permissions_1.default.access || permissions_1.default.update,
        update: permissions_1.default.update,
    }), []);
    const { isLoading: isLoadingForPermissions, allowedActions: { canAccess, canUpdate, }, } = (0, helper_plugin_1.useRBAC)(viewPermissions);
    const getLayoutSettingRef = (0, react_1.useRef)();
    getLayoutSettingRef.current = (settingName) => (0, lodash_1.get)({}, ["settings", settingName], "");
    const isInDevelopmentMode = autoReload;
    const abortController = new AbortController();
    const { signal } = abortController;
    const getDataRef = (0, react_1.useRef)();
    const menuViewMatch = (0, react_router_dom_1.useRouteMatch)(`/plugins/${pluginId_1.default}/:id`);
    const activeId = (0, lodash_1.get)(menuViewMatch, "params.id", null);
    const passedActiveItems = (0, react_1.useMemo)(() => {
        return i18nAwareItems({ config, items });
    }, [config, items]);
    const getNavigation = async (id, navigationConfig) => {
        try {
            if (activeId || id) {
                dispatch({
                    type: actions_1.GET_NAVIGATION_DATA,
                });
                const activeItem = await (0, helper_plugin_1.request)(`/${pluginId_1.default}/${activeId || id}`, {
                    method: "GET",
                    signal,
                });
                dispatch({
                    type: actions_1.GET_NAVIGATION_DATA_SUCCEEDED,
                    activeItem: {
                        ...activeItem,
                        items: (0, parsers_1.prepareItemToViewPayload)({
                            config: navigationConfig,
                            items: activeItem.items,
                        }),
                    },
                });
            }
        }
        catch (err) {
            console.error({ err });
            toggleNotification({
                type: 'warning',
                message: (0, translations_1.getTrad)('notification.error'),
            });
        }
    };
    getDataRef.current = async (id) => {
        try {
            dispatch({
                type: actions_1.GET_CONFIG,
            });
            const config = await (0, helper_plugin_1.request)(`/${pluginId_1.default}/config`, {
                method: "GET",
                signal,
            });
            dispatch({
                type: actions_1.GET_CONFIG_SUCCEEDED,
                config,
            });
            dispatch({
                type: actions_1.GET_LIST_DATA,
            });
            const items = await (0, helper_plugin_1.request)(`/${pluginId_1.default}`, {
                method: "GET",
                signal,
            });
            dispatch({
                type: actions_1.GET_LIST_DATA_SUCCEEDED,
                items,
            });
            if (id || !(0, lodash_1.isEmpty)(items)) {
                await getNavigation(id || (0, lodash_1.first)(i18nAwareItems({ items, config })).id, config);
            }
        }
        catch (err) {
            console.error({ err });
            toggleNotification({
                type: 'warning',
                message: (0, translations_1.getTrad)('notification.error'),
            });
        }
    };
    (0, react_1.useEffect)(() => {
        getDataRef.current();
    }, []);
    (0, react_1.useEffect)(() => {
        if (!isLoading) {
            getNavigation();
        }
    }, [isLoading, pathname]);
    (0, react_1.useEffect)(() => {
        if (!autoReload) {
            toggleNotification({
                type: 'info',
                message: { id: 'notification.info.autoreaload-disable' },
            });
        }
    }, [autoReload]);
    const getContentTypeItems = async ({ modelUID, query, locale }) => {
        dispatch({
            type: actions_1.GET_CONTENT_TYPE_ITEMS,
        });
        const url = `/navigation/content-type-items/${modelUID}`;
        const queryParams = new URLSearchParams();
        queryParams.append('_publicationState', 'preview');
        if (query) {
            queryParams.append('_q', query);
        }
        if (locale) {
            queryParams.append('localeCode', locale);
        }
        const contentTypeItems = await (0, helper_plugin_1.request)(`${url}?${queryParams.toString()}`, {
            method: "GET",
            signal,
        });
        const fetchedContentType = (0, lodash_1.find)(config.contentTypes, ct => ct.uid === modelUID);
        const isArray = Array.isArray(contentTypeItems);
        dispatch({
            type: actions_1.GET_CONTENT_TYPE_ITEMS_SUCCEEDED,
            contentTypeItems: (isArray ? contentTypeItems : [contentTypeItems]).map(item => ({
                ...item,
                __collectionUid: (0, lodash_1.get)(fetchedContentType, 'collectionUid', modelUID),
            })),
        });
    };
    const handleChangeSelection = (id) => {
        getNavigation(id, config);
    };
    const handleLocalizationSelection = (id) => {
        getNavigation(id, config);
    };
    const handleI18nCopy = async (sourceId, targetId) => {
        dispatch({
            type: actions_1.I18N_COPY_NAVIGATION
        });
        const url = `/navigation/i18n/copy/${sourceId}/${targetId}`;
        await (0, helper_plugin_1.request)(url, {
            method: "PUT",
            signal,
        });
        dispatch({
            type: actions_1.I18N_COPY_NAVIGATION_SUCCESS,
        });
        handleChangeSelection(targetId);
    };
    const readNavigationItemFromLocale = async ({ locale, structureId }) => {
        try {
            const source = changedActiveItem.localizations?.find((navigation) => navigation.locale === locale);
            if (!source) {
                return (0, utils_1.errorStatusResourceFor)(['popup.item.form.i18n.locale.error.unavailable']);
            }
            const url = `/navigation/i18n/item/read/${source.id}/${changedActiveItem.id}?path=${structureId}`;
            return (0, utils_1.resolvedResourceFor)(await (0, helper_plugin_1.request)(url, {
                method: "GET",
                signal,
            }));
        }
        catch (error) {
            let messageKey;
            if (error instanceof Error) {
                messageKey = (0, lodash_1.get)(error, 'response.payload.error.details.messageKey');
            }
            return (0, utils_1.errorStatusResourceFor)([messageKey ?? 'popup.item.form.i18n.locale.error.generic']);
        }
    };
    const handleChangeNavigationPopupVisibility = (visible) => {
        dispatch({
            type: actions_1.CHANGE_NAVIGATION_POPUP_VISIBILITY,
            navigationPopupOpened: visible,
        });
    };
    const handleChangeNavigationItemPopupVisibility = (visible) => {
        dispatch({
            type: actions_1.CHANGE_NAVIGATION_ITEM_POPUP_VISIBILITY,
            navigationItemPopupOpened: visible,
        });
    };
    const handleChangeNavigationData = (payload, forceClosePopups) => {
        dispatch({
            type: actions_1.CHANGE_NAVIGATION_DATA,
            changedActiveItem: payload,
            forceClosePopups,
        });
    };
    const handleResetNavigationData = () => {
        dispatch({
            type: actions_1.RESET_NAVIGATION_DATA,
            activeItem,
        });
    };
    const handleSubmitNavigation = async (formatMessage, payload = {}) => {
        try {
            dispatch({
                type: actions_1.SUBMIT_NAVIGATION,
            });
            const nagivationId = payload.id ? `/${payload.id}` : "";
            const method = payload.id ? "PUT" : "POST";
            const navigation = await (0, helper_plugin_1.request)(`/${pluginId_1.default}${nagivationId}`, {
                method,
                signal,
                body: payload,
            });
            dispatch({
                type: actions_1.SUBMIT_NAVIGATION_SUCCEEDED,
                navigation: {
                    ...navigation,
                    items: (0, parsers_1.prepareItemToViewPayload)({
                        config,
                        items: navigation.items,
                    }),
                },
            });
            toggleNotification({
                type: 'success',
                message: (0, translations_1.getTrad)('notification.navigation.submit'),
            });
        }
        catch (err) {
            dispatch({
                type: actions_1.SUBMIT_NAVIGATION_ERROR,
                error: err.response.payload.data
            });
            if (err.response.payload.error &&
                err.response.payload.error.details &&
                err.response.payload.error.details.errorTitles) {
                return toggleNotification({
                    type: 'warning',
                    message: {
                        id: formatMessage((0, translations_1.getTrad)('notification.navigation.error'), {
                            ...err.response.payload.error.details,
                            errorTitles: err.response.payload.error.details.errorTitles
                                .map(title => `"${title}"`)
                                .join(", ")
                        })
                    },
                });
            }
            toggleNotification({
                type: 'warning',
                message: (0, translations_1.getTrad)('notification.error'),
            });
        }
    };
    const handleNavigationsDeletion = (ids) => Promise.all(ids.map(handleNavigationDeletion));
    const handleNavigationDeletion = (id) => (0, helper_plugin_1.request)(`/${pluginId_1.default}/${id}`, {
        method: "DELETE",
        signal,
    });
    const slugify = (query) => (0, helper_plugin_1.request)(`/${pluginId_1.default}/slug?q=${query}`, { method: "GET", signal }).then((res) => {
        if (!res?.slug) {
            toggleNotification({
                type: 'warning',
                message: formatMessage((0, translations_1.getTrad)('notification.error.item.slug'), { query, result: res?.slug || "" })
            });
        }
        return res;
    });
    const hardReset = () => getDataRef.current();
    if (!canAccess && !isLoadingForPermissions) {
        return (react_1.default.createElement(NoAccessPage_1.default, null));
    }
    return (react_1.default.createElement(DataManagerContext_1.default.Provider, { value: {
            items: passedActiveItems,
            activeItem,
            initialData,
            changedActiveItem,
            config,
            navigationPopupOpened,
            navigationItemPopupOpened,
            isLoading: isLoading ||
                isLoadingForDataToBeSet ||
                isLoadingForDetailsDataToBeSet,
            isLoadingForAdditionalDataToBeSet,
            isLoadingForSubmit,
            handleChangeNavigationPopupVisibility,
            handleChangeNavigationItemPopupVisibility,
            handleChangeSelection,
            handleLocalizationSelection,
            handleChangeNavigationData,
            handleResetNavigationData,
            handleSubmitNavigation,
            handleI18nCopy,
            getContentTypeItems,
            isInDevelopmentMode,
            error,
            availableLocale,
            readNavigationItemFromLocale,
            handleNavigationsDeletion,
            hardReset,
            slugify,
            permissions: {
                canAccess, canUpdate
            },
        } }, isLoading || isLoadingForPermissions ? react_1.default.createElement(helper_plugin_1.LoadingIndicatorPage, null) : children));
};
DataManagerProvider.propTypes = {
    children: prop_types_1.default.node.isRequired,
};
exports.default = (0, react_1.memo)(DataManagerProvider);
//# sourceMappingURL=index.js.map