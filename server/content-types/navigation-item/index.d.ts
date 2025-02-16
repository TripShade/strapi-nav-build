declare const _default: {
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
    lifecycles: Record<import("../../../types").LifeCycleHookName, import("../../../types").Effect<import("../../../types").LifeCycleEvent<import("../../../types").LifeCycleHookName, unknown, Record<string, unknown>>>>;
};
export default _default;
//# sourceMappingURL=index.d.ts.map