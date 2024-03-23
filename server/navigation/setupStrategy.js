"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.navigationSetupStrategy = void 0;
const i18n_1 = require("../i18n");
const utils_1 = require("../utils");
const navigationSetupStrategy = async (context) => {
    const i18nPlugin = context.strapi.plugin("i18n");
    const defaultLocale = i18nPlugin ? await i18nPlugin.service("locales").getDefaultLocale() : null;
    if (defaultLocale) {
        return await (0, i18n_1.i18nNavigationSetupStrategy)(context);
    }
    else {
        return await regularNavigationSetupStrategy(context);
    }
};
exports.navigationSetupStrategy = navigationSetupStrategy;
const regularNavigationSetupStrategy = async ({ strapi, }) => {
    const navigations = await getCurrentNavigations();
    if (!navigations.length) {
        return [
            await createNavigation({
                strapi,
                payload: {
                    ...utils_1.DEFAULT_NAVIGATION_ITEM,
                },
                populate: utils_1.DEFAULT_POPULATE
            }),
        ];
    }
    return navigations;
};
const createNavigation = ({ strapi, payload, populate }) => strapi.query("plugin::navigation.navigation").create({
    data: {
        ...payload,
    },
    populate,
});
const getCurrentNavigations = () => (0, utils_1.getPluginService)('admin').get();
//# sourceMappingURL=setupStrategy.js.map