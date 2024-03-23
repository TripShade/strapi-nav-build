"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restartStrapi = exports.fetchAllContentTypes = exports.restoreNavigationConfig = exports.updateNavigationConfig = exports.fetchNavigationConfig = void 0;
const helper_plugin_1 = require("@strapi/helper-plugin");
const fp_1 = require("lodash/fp");
const pluginId_1 = __importDefault(require("../pluginId"));
const fetchNavigationConfig = () => (0, helper_plugin_1.request)(`/${pluginId_1.default}/settings/config`, { method: 'GET' });
exports.fetchNavigationConfig = fetchNavigationConfig;
const updateNavigationConfig = ({ body }) => (0, helper_plugin_1.request)(`/${pluginId_1.default}/config`, { method: 'PUT', body: body }, true);
exports.updateNavigationConfig = updateNavigationConfig;
const restoreNavigationConfig = () => (0, helper_plugin_1.request)(`/${pluginId_1.default}/config`, { method: 'DELETE' }, true);
exports.restoreNavigationConfig = restoreNavigationConfig;
const fetchAllContentTypes = async () => (0, helper_plugin_1.request)('/content-manager/content-types', { method: 'GET' }).then((0, fp_1.prop)("data"));
exports.fetchAllContentTypes = fetchAllContentTypes;
const restartStrapi = () => (0, helper_plugin_1.request)(`/${pluginId_1.default}/settings/restart`);
exports.restartStrapi = restartStrapi;
//# sourceMappingURL=api.js.map