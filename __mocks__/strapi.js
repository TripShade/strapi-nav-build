"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../server/config"));
const lodash_1 = require("lodash");
const masterModelMock = {
    findOne: () => ({
        id: 1,
        name: "Main navigation",
        slug: "main-navigation",
        visible: true,
        createdAt: "2021-12-30T14:05:50.276Z",
        updatedAt: "2021-12-30T14:05:50.276Z",
    }),
    findMany: () => [{
            id: 1,
            name: "Main navigation",
            slug: "main-navigation",
            visible: true,
            createdAt: "2021-12-30T14:05:50.276Z",
            updatedAt: "2021-12-30T14:05:50.276Z",
        }],
};
const itemModelMock = {
    count: async () => 0,
    findOne: async () => ({
        id: 1,
        title: "home",
        type: "INTERNAL",
        path: "home1",
        externalPath: null,
        uiRouterKey: "home",
        menuAttached: true,
        order: 1,
        createdAt: "2021-12-31T10:04:54.812Z",
        updatedAt: "2022-01-14T13:36:29.430Z",
        related: {
            id: 1,
            related_id: "1",
            related_type: "api::pages.pages",
            field: "navigation",
            order: 1,
            master: "3",
            createdAt: "2021-12-31T10:04:54.800Z",
            updatedAt: "2021-12-31T10:04:54.800Z",
            navigationItemId: 56,
        },
        parent: null,
        additionalFields: { string_test_field: 'Custom field value' },
    }),
    findMany: async (params) => [{
            id: 1,
            title: "home",
            type: "INTERNAL",
            path: "home",
            externalPath: null,
            uiRouterKey: "home",
            menuAttached: true,
            order: 1,
            createdAt: "2021-12-31T10:04:54.812Z",
            updatedAt: "2022-01-14T13:36:29.430Z",
            master: 1,
            related: {
                id: 1,
                related_id: "1",
                related_type: "api::pages.pages",
                field: "navigation",
                order: 1,
                master: "3",
                createdAt: "2021-12-31T10:04:54.800Z",
                updatedAt: "2021-12-31T10:04:54.800Z",
                navigationItemId: 56,
            },
            parent: null,
            additionalFields: { string_test_field: 'Custom field value' },
        }, {
            id: 2,
            title: "side",
            type: "INTERNAL",
            path: "side",
            externalPath: null,
            uiRouterKey: "side",
            menuAttached: false,
            order: 1,
            createdAt: "2021-12-31T10:04:54.824Z",
            updatedAt: "2021-12-31T12:47:20.508Z",
            master: 1,
            related: {
                id: 2,
                related_id: "2",
                related_type: "api::pages.pages",
                field: "navigation",
                order: 1,
                master: "3",
                createdAt: "2021-12-31T10:04:54.823Z",
                updatedAt: "2021-12-31T10:04:54.823Z",
                navigationItemId: 57,
            },
            parent: {
                id: 1,
                title: "home",
                type: "INTERNAL",
                path: "home1",
                externalPath: null,
                uiRouterKey: "home",
                menuAttached: true,
                order: 1,
                createdAt: "2021-12-31T10:04:54.812Z",
                updatedAt: "2022-01-14T13:36:29.430Z",
            },
            additionalFields: { string_test_field: 'Custom field value' },
        }].filter(item => params.where ? (0, lodash_1.isMatch)(item, params.where) : true),
};
const pageModelMock = {
    findOne: async () => ({
        "id": 1,
        "title": "Page nr 1",
        "createdAt": "2022-01-19T08:22:31.244Z",
        "updatedAt": "2022-01-19T08:22:31.244Z",
        "publishedAt": null
    }),
    findMany: async () => [{
            "id": 1,
            "title": "Page nr 1",
            "createdAt": "2022-01-19T08:22:31.244Z",
            "updatedAt": "2022-01-19T08:22:31.244Z",
            "publishedAt": null
        }, {
            "id": 2,
            "title": "Page nr 2",
            "createdAt": "2022-01-19T08:22:50.821Z",
            "updatedAt": "2022-01-19T08:22:50.821Z",
            "publishedAt": null
        }]
};
const plugins = (strapi) => ({
    navigation: {
        get services() { return require('../server/services'); },
        service: (key) => (require('../server/services').default)[key]({ strapi }),
        get contentTypes() { return require('../server/content-types'); },
        contentType: (key) => preparePluginContentType(require('../server/content-types').default[key].schema, 'navigation'),
        config: (key) => ({
            ...config_1.default.default,
            contentTypes: ['api::pages.pages'],
            additionalFields: [{ name: 'string_test_field', label: "Test field", type: 'string', enabled: true }]
        })[key],
        get controllers() { return {}; },
        controller() { return () => { }; },
    }
});
const contentTypes = {
    'api::pages.pages': {
        ...require('./pages.settings.json'),
        uid: 'api::pages.pages',
        modelName: 'page',
    },
};
const preparePluginContentType = (schema, plugin) => {
    const { name } = schema.info;
    return {
        ...schema,
        uid: `plugin::${plugin}.${name}`,
        modelName: name,
    };
};
const strapiFactory = (plugins, contentTypes) => ({
    get plugins() { return plugins(strapi); },
    plugin: (name) => plugins(strapi)[name],
    get contentTypes() { return contentTypes; },
    contentType: (key) => contentTypes[key],
    query: (model) => {
        switch (model) {
            case 'plugin::navigation.navigation':
                return masterModelMock;
            case 'plugin::navigation.navigation-item':
                return itemModelMock;
            case 'api::pages.pages':
                return pageModelMock;
            default:
                return {
                    findOne: () => ({}),
                    findMany: () => [],
                    count: () => 0,
                };
        }
    },
    store: ({ type, name }) => {
        if (type === 'plugin' && name === 'navigation') {
            return {
                get: ({ key }) => key === 'config' ? {
                    ...(config_1.default.default),
                    contentTypes: ['api::pages.pages'],
                    additionalFields: [{ name: 'string_test_field', label: "Test field", type: 'string', enabled: true }]
                } : null,
                set: () => null,
            };
        }
    }
});
const setupStrapi = () => {
    Object.defineProperty(global, 'strapi', { value: strapiFactory(plugins, contentTypes) });
};
exports.default = setupStrapi;
//# sourceMappingURL=strapi.js.map