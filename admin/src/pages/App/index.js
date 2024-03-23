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
const helper_plugin_1 = require("@strapi/helper-plugin");
const DataManagerProvider_1 = __importDefault(require("../DataManagerProvider"));
const pluginId_1 = __importDefault(require("../../pluginId"));
const View = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require("../View"))));
const App = () => {
    return (react_1.default.createElement(DataManagerProvider_1.default, null,
        react_1.default.createElement(react_1.Suspense, { fallback: react_1.default.createElement(helper_plugin_1.LoadingIndicatorPage, null) },
            react_1.default.createElement(react_router_dom_1.Switch, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: `/plugins/${pluginId_1.default}`, component: View, exact: true }),
                react_1.default.createElement(react_router_dom_1.Route, { component: helper_plugin_1.NotFound })))));
};
exports.default = App;
//# sourceMappingURL=index.js.map