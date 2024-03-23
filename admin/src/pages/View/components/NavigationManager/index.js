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
exports.NavigationManager = void 0;
const Flex_1 = require("@strapi/design-system/Flex");
const Loader_1 = require("@strapi/design-system/Loader");
const ModalLayout_1 = require("@strapi/design-system/ModalLayout");
const lodash_1 = require("lodash");
const fp_1 = require("lodash/fp");
const react_1 = __importStar(require("react"));
const react_intl_1 = require("react-intl");
const useDataManager_1 = __importDefault(require("../../../../hooks/useDataManager"));
const utils_1 = require("../../../../utils");
const AllNavigations_1 = require("./AllNavigations");
const DeletionConfirm_1 = require("./DeletionConfirm");
const ErrorDetails_1 = require("./ErrorDetails");
const NavigationUpdate_1 = require("./NavigationUpdate");
const NewNavigation_1 = require("./NewNavigation");
const NavigationManager = ({ initialState, isOpened, onClose, }) => {
    const { formatMessage } = (0, react_intl_1.useIntl)();
    const [state, setState] = (0, react_1.useState)(initialState);
    const { items = [], handleNavigationsDeletion, handleSubmitNavigation, hardReset, } = (0, useDataManager_1.default)();
    const navigations = (0, react_1.useMemo)(() => (0, lodash_1.sortBy)(items, "id"), [items]);
    const onReset = (0, react_1.useCallback)(() => setState({ view: "INITIAL" }), [setState]);
    const onSubmit = (0, react_1.useCallback)(async () => {
        const performAction = state.view === "DELETE"
            ? async () => {
                await handleNavigationsDeletion(state.navigations.map((0, fp_1.prop)("id")));
                await hardReset();
            }
            : (state.view === "CREATE" || state.view === "EDIT") && state.current
                ? async () => {
                    await handleSubmitNavigation(formatMessage, state.current);
                    await hardReset();
                }
                : () => { };
        try {
            setState({
                ...state,
                isLoading: true,
            });
            await performAction();
            setState({ view: "INITIAL" });
        }
        catch (error) {
            setState({
                view: "ERROR",
                errors: error instanceof Error ? [error] : [],
            });
        }
    }, [
        state,
        setState,
        hardReset,
        handleSubmitNavigation,
        handleNavigationsDeletion,
    ]);
    (0, react_1.useEffect)(() => {
        if (state.view === "INITIAL") {
            setState({
                view: "LIST",
                navigations,
                selected: [],
            });
        }
    }, [state.view]);
    const header = renderHeader(state);
    const content = renderContent(state, setState);
    const footer = renderFooter({
        state,
        setState,
        onClose,
        onSubmit,
        onReset,
        navigations,
    });
    return (react_1.default.createElement(ModalLayout_1.ModalLayout, { labelledBy: "condition-modal-breadcrumbs", onClose: onClose, isOpen: isOpened },
        react_1.default.createElement(ModalLayout_1.ModalHeader, null, header),
        react_1.default.createElement(ModalLayout_1.ModalBody, null, content),
        footer));
};
exports.NavigationManager = NavigationManager;
const renderHeader = (state) => {
    switch (state.view) {
        case "LIST":
        case "CREATE":
        case "ERROR":
        case "DELETE": {
            return (react_1.default.createElement(Flex_1.Flex, { direction: "row" },
                state.isLoading ? react_1.default.createElement(Loader_1.Loader, { small: true }) : null,
                (0, utils_1.getMessage)(`popup.navigation.manage.header.${state.view}`)));
        }
        case "EDIT": {
            return (react_1.default.createElement(Flex_1.Flex, { direction: "row" },
                state.isLoading ? react_1.default.createElement(Loader_1.Loader, { small: true }) : null,
                (0, utils_1.getMessage)({
                    id: "popup.navigation.manage.header.EDIT",
                    props: {
                        name: state.navigation.name,
                    },
                })));
        }
        case "INITIAL": {
            return null;
        }
        default:
            return handleUnknownState(state);
    }
};
const renderContent = (state, setState) => {
    const commonProps = {
        setState,
    };
    switch (state.view) {
        case "LIST": {
            return react_1.default.createElement(AllNavigations_1.AllNavigations, { ...state, ...commonProps });
        }
        case "EDIT": {
            return react_1.default.createElement(NavigationUpdate_1.NavigationUpdate, { ...state, ...commonProps });
        }
        case "CREATE": {
            return react_1.default.createElement(NewNavigation_1.NewNavigation, { ...state, ...commonProps });
        }
        case "DELETE": {
            return react_1.default.createElement(DeletionConfirm_1.DeletionConfirm, { ...state, ...commonProps });
        }
        case "INITIAL": {
            return react_1.default.createElement(Loader_1.Loader, { small: true });
        }
        case "ERROR": {
            return react_1.default.createElement(ErrorDetails_1.ErrorDetails, { ...state, ...commonProps });
        }
        default:
            return handleUnknownState(state);
    }
};
const renderFooter = (props) => {
    switch (props.state.view) {
        case "LIST": {
            return react_1.default.createElement(AllNavigations_1.AllNavigationsFooter, { ...props });
        }
        case "CREATE": {
            return react_1.default.createElement(NewNavigation_1.NewNavigationFooter, { ...props });
        }
        case "EDIT": {
            return react_1.default.createElement(NavigationUpdate_1.NavigationUpdateFooter, { ...props });
        }
        case "DELETE": {
            return react_1.default.createElement(DeletionConfirm_1.DeleteConfirmFooter, { ...props });
        }
        case "ERROR": {
            return react_1.default.createElement(ErrorDetails_1.ErrorDetailsFooter, { ...props });
        }
        case "INITIAL": {
            return null;
        }
        default:
            return handleUnknownState(props.state);
    }
};
const handleUnknownState = (state) => {
    console.warn(`Unknown state "${state?.view}". (${JSON.stringify(state)})`);
    return null;
};
//# sourceMappingURL=index.js.map