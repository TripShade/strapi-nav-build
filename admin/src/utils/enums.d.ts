export declare const navigationItemType: {
    INTERNAL: string;
    EXTERNAL: string;
    WRAPPER: string;
};
export declare const navigationItemAdditionalFields: {
    AUDIENCE: string;
};
export declare const ItemTypes: {
    NAVIGATION_ITEM: string;
};
export declare const ResourceState: {
    RESOLVED: string;
    LOADING: string;
    ERROR: string;
};
export declare const resolvedResourceFor: <T = unknown>(value: T) => {
    type: string;
    value: T;
};
export declare const errorStatusResourceFor: (errors: Array<Error>) => {
    type: string;
    errors: Error[];
};
//# sourceMappingURL=enums.d.ts.map