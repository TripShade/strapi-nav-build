"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getI18nStatus = void 0;
const fp_1 = require("lodash/fp");
const getI18nStatus = async ({ strapi, }) => {
    const i18nPlugin = strapi.plugin("i18n");
    const hasI18NPlugin = !!i18nPlugin;
    const pluginStore = strapi.store({
        type: "plugin",
        name: "navigation",
    });
    const config = await pluginStore.get({
        key: "config",
    });
    const localeService = i18nPlugin ? i18nPlugin.service("locales") : null;
    const defaultLocale = await localeService?.getDefaultLocale();
    const locales = (await localeService?.find({}))?.map((0, fp_1.prop)("code"));
    return hasI18NPlugin
        ? {
            hasI18NPlugin,
            enabled: config.i18nEnabled,
            defaultLocale,
            locales,
        }
        : {
            hasI18NPlugin,
            enabled: false,
            defaultLocale: undefined,
            locales: undefined
        };
};
exports.getI18nStatus = getI18nStatus;
//# sourceMappingURL=utils.js.map