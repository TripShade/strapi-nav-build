"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const permissions_1 = __importDefault(require("../../permissions"));
const graphql_1 = require("../graphql");
const navigation_1 = require("../navigation");
const config_1 = require("../config");
const assertUserPermissionsAvailability = ({ strapi }) => {
    if (!strapi.plugin("users-permissions")) {
        throw new Error("In order to make the navigation plugin work the users-permissions plugin is required");
    }
};
const setupGraphQL = graphql_1.graphQLSetupStrategy;
const setupNavigation = navigation_1.navigationSetupStrategy;
const setupConfig = config_1.configSetupStrategy;
const setupPermissions = async ({ strapi }) => {
    const actions = [
        {
            section: "plugins",
            displayName: "Read",
            uid: permissions_1.default.navigation.read,
            pluginName: "navigation",
        },
        {
            section: "plugins",
            displayName: "Update",
            uid: permissions_1.default.navigation.update,
            pluginName: "navigation",
        },
        {
            section: "plugins",
            displayName: "Settings",
            uid: permissions_1.default.navigation.settings,
            pluginName: "navigation",
        },
    ];
    await strapi.admin.services.permission.actionProvider.registerMany(actions);
};
module.exports = async ({ strapi }) => {
    assertUserPermissionsAvailability({ strapi });
    await setupPermissions({ strapi });
    await setupConfig({ strapi });
    await setupGraphQL({ strapi });
    await setupNavigation({ strapi });
};
//# sourceMappingURL=index.js.map