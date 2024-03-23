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
export default _default;
//# sourceMappingURL=schema.d.ts.map