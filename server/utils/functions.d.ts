import { PopulateClause, StrapiContext } from "strapi-typed";
import { Id, IStrapi, Primitive, StrapiContentType, StringMap, StrapiContentTypeFullSchema } from "strapi-typed";
import { AuditLogContext, AuditLogParams, ContentTypeEntity, Effect, IAdminService, IClientService, ICommonService, LifeCycleEvent, LifeCycleHookName, NavigationActions, NavigationItem, NavigationItemAdditionalField, NavigationItemCustomField, NavigationItemEntity, NavigationServiceName, NestedPath, NestedStructure, PluginConfigNameFields, PopulateQueryParam, ToBeFixed } from "../../types";
import { NavigationError } from "../../utils/NavigationError";
import { ContentType } from "./constant";
type Populate = string | undefined | boolean | Array<Populate> | Record<string, string | boolean | undefined>;
type TypeMap = {
    client: IClientService;
    admin: IAdminService;
    common: ICommonService;
    "navigation-item": ICommonService;
};
export declare function getPluginService<T extends NavigationServiceName>(name: T): T extends infer R extends NavigationServiceName ? TypeMap[R] : never;
export declare const errorHandler: (ctx: ToBeFixed) => (error: NavigationError | string) => any;
export declare const getCustomFields: (additionalFields: NavigationItemAdditionalField[]) => NavigationItemCustomField[];
export declare const parseParams: <TParams extends StringMap<string> = StringMap<string>, TResult extends StringMap<Primitive> = StringMap<Primitive>>(params: TParams) => TResult;
export declare const templateNameFactory: (items: import("strapi-typed").TypeResult<{
    path: string | null;
    title: string;
    type: import("../../types").NavigationItemType;
    collapsed: boolean;
    menuAttached: boolean;
    order: number;
    uiRouterKey: string;
} & {
    createdAt: string;
    updatedAt: string;
} & {
    id: number;
    parent: import("strapi-typed").TypeResult<{
        path: string | null;
        title: string;
        type: import("../../types").NavigationItemType;
        collapsed: boolean;
        menuAttached: boolean;
        order: number;
        uiRouterKey: string;
    } & {
        createdAt: string;
        updatedAt: string;
    } & {
        id: number;
        parent: import("strapi-typed").TypeResult<{
            path: string | null;
            title: string;
            type: import("../../types").NavigationItemType;
            collapsed: boolean;
            menuAttached: boolean;
            order: number;
            uiRouterKey: string;
        } & {
            createdAt: string;
            updatedAt: string;
        } & any> | null;
        master: import("../../types").Navigation;
        audience: import("../../types").Audience[];
        externalPath: string | null;
        related: import("../../types").NavigationItemRelated | null;
        additionalFields: StringMap<string | boolean>;
    }> | null;
    master: import("../../types").Navigation;
    audience: import("../../types").Audience[];
    externalPath: string | null;
    related: ContentTypeEntity | ContentTypeEntity[] | null;
    additionalFields: StringMap<string | boolean>;
}>[] | undefined, strapi: IStrapi, contentTypes?: StrapiContentType<ToBeFixed>[]) => Promise<(contentType: ToBeFixed, id: Id) => any>;
export declare const getTemplateComponentFromTemplate: (strapi: IStrapi, template?: ToBeFixed[]) => any;
export declare const prepareAuditLog: (actions: NavigationActions[]) => string;
export declare const sendAuditLog: (auditLogInstance: AuditLogContext, event: string, data: AuditLogParams) => void;
export declare const composeItemTitle: (item: NavigationItemEntity<ContentTypeEntity[] | ContentTypeEntity>, fields?: PluginConfigNameFields, contentTypes?: StrapiContentType<ToBeFixed>[]) => string | undefined;
export declare const extractItemRelationTitle: (relatedItem: ContentTypeEntity, fields?: PluginConfigNameFields, contentTypes?: StrapiContentType<ToBeFixed>[]) => {};
export declare const filterOutUnpublished: (item: NavigationItemEntity<ContentTypeEntity | ContentTypeEntity[]>) => unknown;
export declare const checkDuplicatePath: (parentItem: ToBeFixed | null, checkData: NavigationItem[]) => Promise<void>;
export declare const singularize: (value?: string) => string;
export declare const buildNestedStructure: (entities: NavigationItemEntity<ContentTypeEntity>[], id?: Id | null, field?: keyof NavigationItemEntity) => NestedStructure<NavigationItemEntity<ContentTypeEntity>>[];
export declare const buildNestedPaths: <T extends Pick<import("strapi-typed").TypeResult<{
    path: string | null;
    title: string;
    type: import("../../types").NavigationItemType;
    collapsed: boolean;
    menuAttached: boolean;
    order: number;
    uiRouterKey: string;
} & {
    createdAt: string;
    updatedAt: string;
} & {
    id: number;
    parent: import("strapi-typed").TypeResult<{
        path: string | null;
        title: string;
        type: import("../../types").NavigationItemType;
        collapsed: boolean;
        menuAttached: boolean;
        order: number;
        uiRouterKey: string;
    } & {
        createdAt: string;
        updatedAt: string;
    } & any> | null;
    master: import("../../types").Navigation;
    audience: import("../../types").Audience[];
    externalPath: string | null;
    related: import("../../types").NavigationItemRelated | null;
    additionalFields: StringMap<string | boolean>;
}>, "id" | "path" | "parent">>(items: T[], id?: Id | null, parentPath?: string | null) => NestedPath[];
export declare const filterByPath: <T extends Pick<import("strapi-typed").TypeResult<{
    path: string | null;
    title: string;
    type: import("../../types").NavigationItemType;
    collapsed: boolean;
    menuAttached: boolean;
    order: number;
    uiRouterKey: string;
} & {
    createdAt: string;
    updatedAt: string;
} & {
    id: number;
    parent: import("strapi-typed").TypeResult<{
        path: string | null;
        title: string;
        type: import("../../types").NavigationItemType;
        collapsed: boolean;
        menuAttached: boolean;
        order: number;
        uiRouterKey: string;
    } & {
        createdAt: string;
        updatedAt: string;
    } & any> | null;
    master: import("../../types").Navigation;
    audience: import("../../types").Audience[];
    externalPath: string | null;
    related: import("../../types").NavigationItemRelated | null;
    additionalFields: StringMap<string | boolean>;
}>, "id" | "path" | "parent">>(items: T[], path: string | null) => {
    root?: NestedPath | undefined;
    items: T[];
};
export declare const isContentTypeEligible: (uid?: string) => boolean | "";
export declare const intercalate: <T, U extends T>(glue: T, arr: U[]) => (T | U)[];
export declare const compareArraysOfNumbers: (arrA: number[], arrB: number[]) => number;
export declare const getPluginModels: () => Record<"masterModel" | "itemModel" | "relatedModel" | "audienceModel", StrapiContentTypeFullSchema>;
export declare const validateAdditionalFields: (additionalFields: NavigationItemAdditionalField[]) => void;
export declare const parsePopulateQuery: (populate: PopulateQueryParam) => PopulateClause;
export declare const purgeSensitiveData: (data: ToBeFixed) => ToBeFixed;
export declare const purgeSensitiveDataFromUser: (data?: any) => {} | undefined;
export declare const resolveGlobalLikeId: (uid?: string) => string;
export declare const sanitizePopulateField: (populate: Populate) => Populate;
export declare const buildHookListener: (contentTypeName: ContentType, { strapi }: StrapiContext) => (hookName: LifeCycleHookName) => [LifeCycleHookName, Effect<LifeCycleEvent>];
export declare const buildAllHookListeners: (contentTypeName: ContentType, context: StrapiContext) => Record<LifeCycleHookName, Effect<LifeCycleEvent>>;
export {};
//# sourceMappingURL=functions.d.ts.map