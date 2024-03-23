"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Flex_1 = require("@strapi/design-system/Flex");
const NavigationContentHeader = ({ startActions, endActions }) => {
    return (react_1.default.createElement(Flex_1.Flex, { justifyContent: "space-between", width: "100%" },
        react_1.default.createElement(Flex_1.Flex, { alignItems: "space-between" }, startActions),
        react_1.default.createElement(Flex_1.Flex, { alignItems: "space-between" }, endActions)));
};
exports.default = NavigationContentHeader;
//# sourceMappingURL=index.js.map