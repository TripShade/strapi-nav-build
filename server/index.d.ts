declare const _default: {
    bootstrap: ({ strapi }: import("strapi-typed").StrapiContext) => Promise<void>;
    config: import("../types").StrapiConfig<import("../types").NavigationPluginConfig>;
    contentTypes: {
        audience: {
            schema: {
                collectionName: string;
                info: {
                    singularName: string;
                    pluralName: string;
                    displayName: string;
                    name: string;
                };
                options: {
                    increments: boolean;
                    comment: string;
                };
                attributes: {
                    name: {
                        type: string;
                        required: boolean;
                    };
                    key: {
                        type: string;
                        targetField: string;
                    };
                };
            };
        };
        navigation: {
            schema: {
                collectionName: string;
                info: {
                    singularName: string;
                    pluralName: string;
                    displayName: string;
                    name: string;
                };
                options: {
                    increments: boolean;
                    comment: string;
                };
                pluginOptions: {
                    "content-manager": {
                        visible: boolean;
                    };
                    "content-type-builder": {
                        visible: boolean;
                    };
                };
                attributes: {
                    name: {
                        type: string;
                        configurable: boolean;
                        required: boolean;
                    };
                    slug: {
                        type: string;
                        target: string;
                        configurable: boolean;
                        required: boolean;
                    };
                    visible: {
                        type: string;
                        default: boolean;
                        configurable: boolean;
                    };
                    items: {
                        type: string;
                        relation: string;
                        target: string;
                        configurable: boolean;
                        mappedBy: string;
                    };
                    localizations: {
                        type: string;
                        relation: string;
                        target: string;
                    };
                    localeCode: {
                        type: string;
                    };
                };
            };
            lifecycles: Record<import("../types").LifeCycleHookName, import("../types").Effect<import("../types").LifeCycleEvent<import("../types").LifeCycleHookName, unknown, Record<string, unknown>>>>;
        };
        "navigation-item": {
            schema: {
                collectionName: string;
                info: {
                    singularName: string;
                    pluralName: string;
                    displayName: string;
                    name: string;
                };
                options: {
                    increments: boolean;
                    timestamps: boolean;
                    comment: string;
                };
                pluginOptions: {
                    "content-manager": {
                        visible: boolean;
                    };
                    "content-type-builder": {
                        visible: boolean;
                    };
                    i18n: {
                        localized: boolean;
                    };
                };
                attributes: {
                    title: {
                        type: string;
                        configurable: boolean;
                        required: boolean;
                        pluginOptions: {
                            i18n: {
                                localized: boolean;
                            };
                        };
                    };
                    type: {
                        type: string;
                        enum: string[];
                        default: string;
                        configurable: boolean;
                    };
                    path: {
                        type: string;
                        targetField: string;
                        configurable: boolean;
                    };
                    externalPath: {
                        type: string;
                        configurable: boolean;
                    };
                    uiRouterKey: {
                        type: string;
                        configurable: boolean;
                    };
                    menuAttached: {
                        type: string;
                        default: boolean;
                        configurable: boolean;
                    };
                    order: {
                        type: string;
                        default: number;
                        configurable: boolean;
                    };
                    collapsed: {
                        type: string;
                        default: boolean;
                        configurable: boolean;
                    };
                    related: {
                        type: string;
                        relation: string;
                        target: string;
                        configurable: boolean;
                    };
                    parent: {
                        type: string;
                        relation: string;
                        target: string;
                        configurable: boolean;
                        default: null;
                    };
                    master: {
                        type: string;
                        relation: string;
                        target: string;
                        configurable: boolean;
                        inversedBy: string;
                    };
                    audience: {
                        type: string;
                        relation: string;
                        target: string;
                    };
                    additionalFields: {
                        type: string;
                        require: boolean;
                        default: {};
                    };
                };
            };
            lifecycles: Record<import("../types").LifeCycleHookName, import("../types").Effect<import("../types").LifeCycleEvent<import("../types").LifeCycleHookName, unknown, Record<string, unknown>>>>;
        };
        "navigations-items-related": {
            schema: {
                collectionName: string;
                info: {
                    singularName: string;
                    pluralName: string;
                    displayName: string;
                    name: string;
                };
                options: {
                    increments: boolean;
                    timestamps: boolean;
                    populateCreatorFields: boolean;
                };
                pluginOptions: {
                    "content-manager": {
                        visible: boolean;
                    };
                    "content-type-builder": {
                        visible: boolean;
                    };
                    i18n: {
                        localized: boolean;
                    };
                };
                attributes: {
                    related_id: {
                        type: string;
                        required: boolean;
                    };
                    related_type: {
                        type: string;
                        required: boolean;
                    };
                    field: {
                        type: string;
                        required: boolean;
                    };
                    order: {
                        type: string;
                        required: boolean;
                    };
                    master: {
                        type: string;
                        required: boolean;
                    };
                };
            };
        };
    };
    controllers: any;
    destroy: () => void;
    middlewares: {};
    policies: {};
    register: () => Promise<void>;
    routes: {
        admin: import("../types").StrapiRoutes;
        "content-api": import("../types").StrapiRoutes;
    };
    services: {
        common: (context: import("strapi-typed").StrapiContext) => import("../types").ICommonService;
        admin: (context: import("strapi-typed").StrapiContext) => import("../types").IAdminService;
        client: (context: import("strapi-typed").StrapiContext) => import("../types").IClientService;
        navigationItem: (context: import("strapi-typed").StrapiContext) => any;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map