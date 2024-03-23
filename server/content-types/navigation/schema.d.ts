declare const _default: {
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
export default _default;
//# sourceMappingURL=schema.d.ts.map