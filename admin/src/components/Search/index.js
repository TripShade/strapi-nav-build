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
const IconButton_1 = require("@strapi/design-system/IconButton");
const Searchbar_1 = require("@strapi/design-system/Searchbar");
const Typography_1 = require("@strapi/design-system/Typography");
const Search_1 = __importDefault(require("@strapi/icons/Search"));
const translations_1 = require("../../translations");
const DEFAULT_INDEX = 0;
const Search = ({ value, setValue, initialIndex = DEFAULT_INDEX }) => {
    const [currentValue, setCurrentValue] = (0, react_1.useState)(value);
    const [previousValue, setPreviousValue] = (0, react_1.useState)(value);
    const [currentIndex, setCurrentIndex] = (0, react_1.useState)(initialIndex);
    const [isOpen, setIsOpen] = (0, react_1.useState)(!!value);
    const wrapperRef = (0, react_1.useRef)(null);
    const { formatMessage } = (0, react_intl_1.useIntl)();
    (0, react_1.useEffect)(() => {
        if (isOpen) {
            setTimeout(() => {
                wrapperRef.current?.querySelector("input")?.focus();
            }, 0);
        }
    }, [isOpen]);
    (0, react_1.useEffect)(() => {
        if (currentIndex && currentValue === previousValue) {
            setValue({
                value: currentValue,
                index: currentIndex,
            });
        }
    }, [currentIndex, currentValue, previousValue]);
    (0, react_1.useEffect)(() => {
        if (currentValue !== previousValue) {
            setPreviousValue(currentValue);
            setCurrentIndex(DEFAULT_INDEX);
            setValue({
                value: currentValue,
                index: DEFAULT_INDEX,
            });
        }
    }, [currentValue, previousValue]);
    const onKeyDown = (0, react_1.useCallback)((e) => {
        if (e.code.toLowerCase() === "enter") {
            setCurrentIndex((current) => current + 1);
        }
    }, []);
    const onChange = (0, react_1.useCallback)((e) => {
        setCurrentValue(e.target.value);
    }, [setCurrentValue]);
    const onClear = (0, react_1.useCallback)(() => {
        setCurrentValue("");
        setIsOpen(false);
    }, [setCurrentValue, setIsOpen]);
    if (isOpen) {
        return (react_1.default.createElement("div", { ref: wrapperRef },
            react_1.default.createElement(Searchbar_1.Searchbar, { name: "searchbar", onClear: onClear, value: value, size: "S", onChange: onChange, clearLabel: "Clearing the search", placeholder: formatMessage({
                    id: (0, translations_1.getTradId)("pages.main.search.placeholder"),
                    defaultMessage: "Type to start searching...",
                }), onKeyDown: onKeyDown }, "Search for navigation items"),
            react_1.default.createElement(Typography_1.Typography, { variant: "pi", fontColor: "neutral150", style: { margin: "3px 0 0", display: "inline-block" } }, formatMessage({
                id: (0, translations_1.getTradId)("pages.main.search.subLabel"),
                defaultMessage: "press ENTER to highlight next item",
            }))));
    }
    else {
        return (react_1.default.createElement(IconButton_1.IconButton, { icon: react_1.default.createElement(Search_1.default, null), onClick: () => setIsOpen(!isOpen) }));
    }
};
exports.default = Search;
//# sourceMappingURL=index.js.map