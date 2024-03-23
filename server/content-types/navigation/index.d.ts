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
    lifecycles: Record<import("../../../types").LifeCycleHookName, import("../../../types").Effect<import("../../../types").LifeCycleEvent<import("../../../types").LifeCycleHookName, unknown, Record<string, unknown>>>>;
};
export default _default;
//# sourceMappingURL=index.d.ts.map