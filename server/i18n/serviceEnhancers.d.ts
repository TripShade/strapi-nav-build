import { AddI18NConfigFieldsInput, AddI18nWhereClause, HandleLocaleParamInput, I18nAwareEntityReadHandlerInput, I18NConfigFields, I18nNavigationContentsCopyInput, I18nNavigationItemReadInput } from "./types";
export declare const addI18NConfigFields: <T>({ previousConfig, strapi, viaSettingsPage, }: AddI18NConfigFieldsInput<T>) => Promise<T & I18NConfigFields>;
export declare const handleLocaleQueryParam: ({ locale, strapi, }: HandleLocaleParamInput) => Promise<string | undefined>;
export declare const i18nAwareEntityReadHandler: <T extends {
    localeCode?: string | null | undefined;
    localizations?: T[] | null | undefined;
}>({ entity, entityUid, localeCode, populate, strapi, whereClause, }: I18nAwareEntityReadHandlerInput<T>) => Promise<T | null | undefined>;
export declare const addI18nWhereClause: <T>({ modelUid, previousWhere, query, strapi, }: AddI18nWhereClause<T>) => Promise<T & {
    locale?: string | undefined;
}>;
export declare const i18nNavigationContentsCopy: ({ target, source, strapi, service, }: I18nNavigationContentsCopyInput) => Promise<void>;
export declare const i18nNavigationItemRead: ({ target, source, path, strapi }: I18nNavigationItemReadInput) => Promise<Partial<any>>;
//# sourceMappingURL=serviceEnhancers.d.ts.map