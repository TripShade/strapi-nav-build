import { LifeCycleHookName } from "../../types";
export declare const TEMPLATE_DEFAULT: "Generic";
export declare const MODEL_TYPES: {
    readonly CONTENT_TYPE: "contentType";
};
export declare const KIND_TYPES: {
    readonly SINGLE: "singleType";
    readonly COLLECTION: "collectionType";
};
export declare const ALLOWED_CONTENT_TYPES: readonly ["api::", "plugin::"];
export declare const RESTRICTED_CONTENT_TYPES: readonly ["plugin::users-permissions", "plugin::i18n.locale", "plugin::navigation"];
export declare const EXCLUDED_CONTENT_TYPES: string[];
export declare const CONTENT_TYPES_NAME_FIELDS_DEFAULTS: string[];
export declare const DEFAULT_POPULATE: "localizations"[];
export declare const DEFAULT_NAVIGATION_ITEM: {
    readonly name: "Main navigation";
    readonly slug: "main-navigation";
    readonly visible: true;
};
export declare const RENDER_TYPES: Readonly<{
    FLAT: "FLAT";
    TREE: "TREE";
    RFR: "RFR";
}>;
export type ContentType = "navigation" | "navigation-item";
export declare const allLifecycleHooks: ReadonlyArray<LifeCycleHookName>;
//# sourceMappingURL=constant.d.ts.map