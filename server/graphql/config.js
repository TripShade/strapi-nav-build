"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const getTypes = require("./types");
const getQueries = require("./queries");
const getResolversConfig = require("./resolvers-config");
exports.default = async ({ strapi }) => {
    const extensionService = strapi.plugin("graphql").service("extension");
    extensionService.shadowCRUD("plugin::navigation.audience").disable();
    extensionService.shadowCRUD("plugin::navigation.navigation").disable();
    extensionService.shadowCRUD("plugin::navigation.navigation-item").disable();
    extensionService
        .shadowCRUD("plugin::navigation.navigations-items-related")
        .disable();
    const commonService = (0, utils_1.getPluginService)('common');
    const pluginStore = await commonService.getPluginStore();
    const config = await pluginStore.get({ key: 'config' });
    extensionService.use(({ strapi, nexus }) => {
        const types = getTypes({ strapi, nexus, config });
        const queries = getQueries({ strapi, nexus });
        const resolversConfig = getResolversConfig({ strapi });
        return {
            types: [types, queries],
            resolversConfig,
        };
    });
};
//# sourceMappingURL=config.js.map