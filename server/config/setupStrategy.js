"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSetupStrategy = void 0;
const types_1 = require("../../types");
const utils_1 = require("../utils");
const configSetupStrategy = async ({ strapi }) => {
    const pluginStore = strapi.store({
        type: "plugin",
        name: "navigation",
    });
    const getFromPluginDefaults = await strapi.plugin("navigation").config;
    const hasI18nPlugin = !!strapi.plugin("i18n");
    let config = await pluginStore.get({
        key: "config",
    });
    const getWithFallback = getWithFallbackFactory(config, getFromPluginDefaults);
    config = {
        additionalFields: getWithFallback("additionalFields"),
        contentTypes: getWithFallback("contentTypes"),
        contentTypesNameFields: getWithFallback("contentTypesNameFields"),
        contentTypesPopulate: getWithFallback("contentTypesPopulate"),
        allowedLevels: getWithFallback("allowedLevels"),
        gql: getWithFallback("gql"),
        i18nEnabled: hasI18nPlugin && getWithFallback("i18nEnabled"),
        pruneObsoleteI18nNavigations: false,
        pathDefaultFields: getWithFallback("pathDefaultFields"),
        cascadeMenuAttached: getWithFallback("cascadeMenuAttached"),
    };
    handleDeletedContentTypes(config, { strapi });
    (0, utils_1.validateAdditionalFields)(config.additionalFields);
    await pluginStore.set({
        key: "config",
        value: config,
    });
    return config;
};
exports.configSetupStrategy = configSetupStrategy;
const getWithFallbackFactory = (config, fallback) => (key) => {
    const value = config?.[key] ?? fallback(key);
    (0, types_1.assertNotEmpty)(value, new Error(`[Navigation] Config "${key}" is undefined`));
    return value;
};
const handleDeletedContentTypes = (config, { strapi }) => {
    const notAvailableContentTypes = config.contentTypes.filter((contentType) => !strapi.contentTypes[contentType]);
    if (notAvailableContentTypes.length === 0) {
        return;
    }
    const notAvailableContentTypesGraphQL = notAvailableContentTypes.map(utils_1.resolveGlobalLikeId);
    config.contentTypes = config.contentTypes.filter((contentType) => !notAvailableContentTypes.includes(contentType));
    config.contentTypesNameFields = Object.fromEntries(Object.entries(config.contentTypesNameFields).filter(([contentType]) => !notAvailableContentTypes.includes(contentType)));
    config.gql.navigationItemRelated = config.gql.navigationItemRelated.filter((contentType) => !notAvailableContentTypesGraphQL.includes(contentType));
};
//# sourceMappingURL=setupStrategy.js.map