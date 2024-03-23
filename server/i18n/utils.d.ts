import { IStrapi } from "strapi-typed";
type GetI18nStatusInput = {
    strapi: IStrapi;
};
type I18NStatus = {
    hasI18NPlugin: boolean;
    enabled: boolean;
    defaultLocale?: string | null;
    locales?: string[] | undefined;
};
export declare const getI18nStatus: ({ strapi, }: GetI18nStatusInput) => Promise<I18NStatus>;
export {};
//# sourceMappingURL=utils.d.ts.map