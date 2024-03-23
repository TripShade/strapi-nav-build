"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.i18nNavigationItemRead = exports.i18nNavigationContentsCopy = exports.addI18nWhereClause = exports.i18nAwareEntityReadHandler = exports.handleLocaleQueryParam = exports.addI18NConfigFields = void 0;
const utils_1 = require("@strapi/utils");
const lodash_1 = require("lodash");
const fp_1 = require("lodash/fp");
const types_1 = require("../../types");
const InvalidParamNavigationError_1 = require("../../utils/InvalidParamNavigationError");
const utils_2 = require("../utils");
const constant_1 = require("./constant");
const errors_1 = require("./errors");
const utils_3 = require("./utils");
const addI18NConfigFields = async ({ previousConfig, strapi, viaSettingsPage = false, }) => {
    const { enabled, hasI18NPlugin, defaultLocale } = await (0, utils_3.getI18nStatus)({
        strapi,
    });
    return {
        ...previousConfig,
        defaultLocale,
        i18nEnabled: enabled,
        isI18NPluginEnabled: viaSettingsPage ? hasI18NPlugin : undefined,
        pruneObsoleteI18nNavigations: false,
    };
};
exports.addI18NConfigFields = addI18NConfigFields;
const handleLocaleQueryParam = async ({ locale, strapi, }) => {
    const { enabled } = await (0, utils_3.getI18nStatus)({ strapi });
    if (locale) {
        return locale;
    }
    const localeService = strapi.plugin("i18n").service("locales");
    const defaultLocale = await localeService.getDefaultLocale();
    (0, types_1.assertNotEmpty)(defaultLocale, new errors_1.DefaultLocaleMissingError());
    return enabled ? defaultLocale : undefined;
};
exports.handleLocaleQueryParam = handleLocaleQueryParam;
const i18nAwareEntityReadHandler = async ({ entity, entityUid, localeCode, populate = [], strapi, whereClause, }) => {
    const { defaultLocale, enabled } = await (0, utils_3.getI18nStatus)({ strapi });
    if (!enabled) {
        return entity;
    }
    if (entity && (!localeCode || entity.localeCode === localeCode)) {
        return entity;
    }
    const locale = localeCode || defaultLocale;
    const rerun = await strapi.query(entityUid).findOne({
        where: whereClause,
        populate: [...populate, ...constant_1.I18N_DEFAULT_POPULATE],
    });
    if (rerun) {
        if (rerun.localeCode === locale) {
            return rerun;
        }
        return rerun.localizations?.find((localization) => localization.localeCode === locale);
    }
};
exports.i18nAwareEntityReadHandler = i18nAwareEntityReadHandler;
const addI18nWhereClause = async ({ modelUid, previousWhere, query, strapi, }) => {
    const { enabled } = await (0, utils_3.getI18nStatus)({ strapi });
    const modelSchema = strapi.getModel(modelUid);
    if (enabled && query.localeCode && modelSchema.attributes.locale) {
        return {
            ...previousWhere,
            locale: query.localeCode,
        };
    }
    return previousWhere;
};
exports.addI18nWhereClause = addI18nWhereClause;
const i18nNavigationContentsCopy = async ({ target, source, strapi, service, }) => {
    const sourceItems = source.items ?? [];
    if (target.items?.length) {
        throw new errors_1.FillNavigationError("Current navigation is non-empty");
    }
    if (!target.localeCode) {
        throw new errors_1.FillNavigationError("Current navigation does not have specified locale");
    }
    if (!sourceItems.length) {
        throw new errors_1.FillNavigationError("Source navigation is empty");
    }
    const newItems = await Promise.all(sourceItems.map(processItems({
        master: target,
        localeCode: target.localeCode,
        strapi,
    })));
    await service.createBranch(newItems, target, null, { create: true });
};
exports.i18nNavigationContentsCopy = i18nNavigationContentsCopy;
const i18nNavigationItemRead = async ({ target, source, path, strapi }) => {
    const pickFields = (0, fp_1.pick)(['path', 'related', 'type', 'uiRouterKey', 'title', 'externalPath']);
    const structurePath = path.split('.').map(p => parseInt(p, 10));
    if (!structurePath.some(Number.isNaN) || !structurePath.length) {
        new InvalidParamNavigationError_1.InvalidParamNavigationError("Path is invalid");
    }
    let result = (0, lodash_1.get)(source.items, (0, utils_2.intercalate)("items", structurePath.map(lodash_1.toString)));
    if (!result) {
        throw new utils_1.errors.NotFoundError("Unable to find navigation item");
    }
    let { related } = result;
    if (related) {
        const fullRelated = await strapi.query(related.__contentType).findOne({
            where: {
                id: related.id,
            },
            populate: constant_1.I18N_DEFAULT_POPULATE,
        });
        if (fullRelated.localizations?.length) {
            const localeVersion = fullRelated.localizations.find(({ locale }) => locale === target.localeCode);
            if (localeVersion) {
                related = {
                    ...localeVersion,
                    __contentType: related.__contentType
                };
            }
        }
    }
    return pickFields({
        ...result,
        related
    });
};
exports.i18nNavigationItemRead = i18nNavigationItemRead;
const processItems = (context) => async (item) => ({
    title: item.title,
    path: item.path,
    audience: item.audience,
    type: item.type,
    uiRouterKey: item.uiRouterKey,
    order: item.order,
    collapsed: item.collapsed,
    menuAttached: item.menuAttached,
    removed: false,
    updated: true,
    externalPath: item.externalPath ?? undefined,
    items: item.items
        ? await Promise.all(item.items.map(processItems(context)))
        : [],
    master: parseInt(context.master.id.toString(), 10),
    parent: null,
    related: item.related ? [await processRelated(item.related, context)] : [],
});
const processRelated = async (related, { localeCode, strapi }) => {
    const { __contentType, id } = related;
    (0, types_1.assertNotEmpty)(__contentType, new errors_1.FillNavigationError("Related item's content type is missing"));
    (0, types_1.assertIsNumber)(id, new errors_1.FillNavigationError("Related item's id is not a number"));
    const relatedItemWithLocalizations = await strapi
        .query(__contentType)
        .findOne({ where: { id }, populate: constant_1.I18N_DEFAULT_POPULATE });
    const localization = relatedItemWithLocalizations.localizations?.find(({ locale }) => locale === localeCode);
    return {
        refId: localization?.id ?? id,
        ref: __contentType,
        field: related.field,
    };
};
//# sourceMappingURL=serviceEnhancers.js.map