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
const helper_plugin_1 = require("@strapi/helper-plugin");
const package_json_1 = __importDefault(require("../../package.json"));
const pluginId_1 = __importDefault(require("./pluginId"));
const permissions_1 = __importDefault(require("./permissions"));
const navigation_1 = __importDefault(require("./components/icons/navigation"));
const translations_1 = __importStar(require("./translations"));
const lodash_1 = require("lodash");
const name = package_json_1.default.strapi.name;
exports.default = {
    register(app) {
        app.createSettingSection({
            id: pluginId_1.default,
            intlLabel: { id: (0, translations_1.getTrad)('pages.settings.section.title'), defaultMessage: 'Navigation Plugin' },
        }, [
            {
                intlLabel: {
                    id: (0, translations_1.getTrad)('pages.settings.section.subtitle'),
                    defaultMessage: 'Configuration',
                },
                id: 'navigation',
                to: `/settings/${pluginId_1.default}`,
                Component: async () => {
                    const component = await Promise.resolve().then(() => __importStar(require('./pages/SettingsPage')));
                    return component;
                },
                permissions: permissions_1.default.settings,
            }
        ]);
        app.addMenuLink({
            to: `/plugins/${pluginId_1.default}`,
            icon: navigation_1.default,
            intlLabel: {
                id: `${pluginId_1.default}.plugin.name`,
                defaultMessage: 'Navigation',
            },
            Component: async () => {
                const component = await Promise.resolve().then(() => __importStar(require('./pages/App')));
                return component;
            },
            permissions: permissions_1.default.access,
        });
        app.registerPlugin({
            id: pluginId_1.default,
            name,
        });
    },
    bootstrap() { },
    registerTrads({ locales = [] }) {
        return locales
            .filter((locale) => Object.keys(translations_1.default).includes(locale))
            .map((locale) => {
            return {
                data: (0, helper_plugin_1.prefixPluginTranslations)((0, lodash_1.get)(translations_1.default, locale, translations_1.default.en), pluginId_1.default, {}),
                locale,
            };
        });
    },
};
//# sourceMappingURL=index.js.map