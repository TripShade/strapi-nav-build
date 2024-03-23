export function transformItemToRESTPayload(item: any, parent?: undefined, master?: undefined, config?: {}, parentAttachedToMenu?: boolean): {
    id: any;
    parent: undefined;
    master: undefined;
    title: any;
    type: any;
    updated: any;
    removed: any;
    order: any;
    uiRouterKey: any;
    collapsed: any;
    additionalFields: any;
    menuAttached: any;
    audience: any;
    path: any;
    externalPath: any;
    related: {
        refId: any;
        ref: any;
        field: any;
    }[] | undefined;
    items: any;
};
export function transformToRESTPayload(payload: any, config?: {}): {
    id: any;
    name: any;
    visible: any;
    items: any;
};
export function transformItemToViewPayload(payload: any, items: any[] | undefined, config: any): any;
export function prepareItemToViewPayload({ items, viewParentId, config, structureIdPrefix }: {
    items?: any[] | undefined;
    viewParentId?: null | undefined;
    config?: {} | undefined;
    structureIdPrefix?: string | undefined;
}): any;
export function extractRelatedItemLabel(item?: {}, fields?: {}, config?: {}): any;
export function usedContentTypes(items?: any[]): any;
export function isRelationCorrect({ related, type }: {
    related: any;
    type: any;
}): boolean;
export function isRelationPublished({ relatedRef, relatedType, type, isCollection }: {
    relatedRef: any;
    relatedType?: {} | undefined;
    type: any;
    isCollection: any;
}): any;
export function validateNavigationStructure(items?: any[]): any;
//# sourceMappingURL=parsers.d.ts.map