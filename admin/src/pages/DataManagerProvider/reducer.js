"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialState = void 0;
const immer_1 = __importDefault(require("immer"));
const actions_1 = require("./actions");
const initialState = {
    items: [],
    activeItem: undefined,
    changedActiveItem: undefined,
    navigationPopupOpened: false,
    navigationItemPopupOpened: false,
    config: {},
    isLoading: true,
    isLoadingForDataToBeSet: false,
    isLoadingForDetailsDataToBeSet: false,
    isLoadingForAdditionalDataToBeSet: false,
    isLoadingForSubmit: false,
    error: undefined,
    i18nEnabled: false,
    cascadeMenuAttached: true,
    availableLocale: [],
};
exports.initialState = initialState;
const reducer = (state, action) => (0, immer_1.default)(state, draftState => {
    switch (action.type) {
        case actions_1.GET_CONFIG: {
            draftState.isLoadingForDetailsDataToBeSet = true;
            draftState.config = {};
            break;
        }
        case actions_1.GET_CONFIG_SUCCEEDED: {
            draftState.isLoadingForDetailsDataToBeSet = false;
            draftState.config = action.config;
            break;
        }
        case actions_1.GET_LIST_DATA: {
            draftState.items = [];
            draftState.isLoadingForDataToBeSet = true;
            draftState.availableLocale = [];
            break;
        }
        case actions_1.GET_LIST_DATA_SUCCEEDED: {
            draftState.items = action.items;
            draftState.isLoading = false;
            draftState.isLoadingForDataToBeSet = false;
            draftState.availableLocale = [...action.items.reduce((set, item) => set.add(item.localeCode), new Set()).values()];
            break;
        }
        case actions_1.GET_NAVIGATION_DATA: {
            draftState.activeItem = undefined;
            draftState.changedActiveItem = undefined;
            draftState.isLoadingForDetailsDataToBeSet = true;
            break;
        }
        case actions_1.GET_NAVIGATION_DATA_SUCCEEDED: {
            const activeItem = action.activeItem || {};
            draftState.activeItem = activeItem;
            draftState.changedActiveItem = activeItem;
            draftState.isLoadingForDetailsDataToBeSet = false;
            break;
        }
        case actions_1.CHANGE_NAVIGATION_DATA: {
            draftState.changedActiveItem = action.changedActiveItem;
            draftState.navigationPopupOpened = action.forceClosePopups ? false : state.navigationPopupOpened;
            draftState.navigationItemPopupOpened = action.forceClosePopups ? false : state.navigationItemPopupOpened;
            break;
        }
        case actions_1.RESET_NAVIGATION_DATA: {
            draftState.changedActiveItem = action.activeItem || {};
            break;
        }
        case actions_1.GET_CONTENT_TYPE_ITEMS: {
            draftState.isLoadingForAdditionalDataToBeSet = true;
            break;
        }
        case actions_1.GET_CONTENT_TYPE_ITEMS_SUCCEEDED: {
            draftState.isLoadingForAdditionalDataToBeSet = false;
            draftState.config.contentTypeItems = action.contentTypeItems;
            break;
        }
        case actions_1.CHANGE_NAVIGATION_POPUP_VISIBILITY: {
            draftState.navigationPopupOpened = action.navigationPopupOpened;
            break;
        }
        case actions_1.CHANGE_NAVIGATION_ITEM_POPUP_VISIBILITY: {
            draftState.navigationItemPopupOpened = action.navigationItemPopupOpened;
            break;
        }
        case actions_1.SUBMIT_NAVIGATION: {
            draftState.isLoadingForSubmit = true;
            draftState.error = undefined;
            break;
        }
        case actions_1.SUBMIT_NAVIGATION_SUCCEEDED: {
            draftState.activeItem = action.navigation || {};
            draftState.changedActiveItem = action.navigation || {};
            draftState.isLoadingForSubmit = false;
            break;
        }
        case actions_1.SUBMIT_NAVIGATION_ERROR: {
            draftState.isLoadingForSubmit = false;
            draftState.error = action.error;
            break;
        }
        case actions_1.RELOAD_PLUGIN: {
            return initialState;
        }
        case actions_1.I18N_COPY_NAVIGATION: {
            draftState.isLoading = true;
            break;
        }
        case actions_1.I18N_COPY_NAVIGATION_SUCCESS: {
            draftState.isLoading = false;
            break;
        }
        default:
            return draftState;
    }
});
exports.default = reducer;
//# sourceMappingURL=reducer.js.map