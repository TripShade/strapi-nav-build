"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const uuid_1 = require("uuid");
const types_1 = require("../../types");
const utils_1 = require("../utils");
const utils_2 = require("@strapi/utils");
const i18n_1 = require("../i18n");
const NavigationError_1 = require("../../utils/NavigationError");
const fp_1 = require("lodash/fp");
const clientService = ({ strapi, }) => ({
    async readAll({ locale, orderBy = "createdAt", orderDirection = "DESC" }) {
        const { masterModel } = (0, utils_1.getPluginModels)();
        const { enabled: i18nEnabled, locales } = await (0, i18n_1.getI18nStatus)({ strapi });
        let navigations = await strapi.query(masterModel.uid).findMany({
            where: locale
                ? {
                    localeCode: locale,
                }
                : undefined,
            orderBy: { [orderBy]: orderDirection },
            limit: Number.MAX_SAFE_INTEGER,
            populate: false,
        });
        if (i18nEnabled) {
            navigations = navigations.reduce((acc, navigation) => {
                if (navigation.localeCode && locales?.includes(navigation.localeCode)) {
                    acc.push({
                        ...navigation,
                        localizations: navigation.localizations?.filter(({ localeCode }) => localeCode && locales?.includes(localeCode)),
                    });
                }
                return acc;
            }, []);
        }
        return navigations;
    },
    async render({ idOrSlug, type = utils_1.RENDER_TYPES.FLAT, menuOnly = false, rootPath = null, wrapRelated = false, locale, populate, }) {
        const clientService = (0, utils_1.getPluginService)("client");
        const findById = !isNaN((0, lodash_1.toNumber)(idOrSlug)) || (0, uuid_1.validate)(idOrSlug);
        const criteria = findById ? { id: idOrSlug } : { slug: idOrSlug };
        const itemCriteria = menuOnly ? { menuAttached: true } : {};
        return await clientService.renderType({
            type,
            criteria,
            itemCriteria,
            filter: null,
            rootPath,
            wrapRelated,
            locale,
            populate,
        });
    },
    async renderChildren({ idOrSlug, childUIKey, type = utils_1.RENDER_TYPES.FLAT, menuOnly = false, wrapRelated = false, locale, }) {
        const clientService = (0, utils_1.getPluginService)("client");
        const findById = !isNaN((0, lodash_1.toNumber)(idOrSlug)) || (0, uuid_1.validate)(idOrSlug);
        const criteria = findById ? { id: idOrSlug } : { slug: idOrSlug };
        const filter = type === utils_1.RENDER_TYPES.FLAT ? null : childUIKey;
        const itemCriteria = {
            ...(menuOnly && { menuAttached: true }),
            ...(type === utils_1.RENDER_TYPES.FLAT ? { uiRouterKey: childUIKey } : {}),
        };
        return clientService.renderType({
            type,
            criteria,
            itemCriteria,
            filter,
            rootPath: null,
            wrapRelated,
            locale,
        });
    },
    renderRFR({ items, parent = null, parentNavItem = null, contentTypes = [], enabledCustomFieldsNames, }) {
        const clientService = (0, utils_1.getPluginService)("client");
        let pages = {};
        let nav = {};
        let navItems = [];
        items.forEach((item) => {
            const { items: itemChilds, ...itemProps } = item;
            const itemNav = clientService.renderRFRNav(itemProps);
            const itemPage = clientService.renderRFRPage(itemProps, parent, enabledCustomFieldsNames);
            if (item.type !== "EXTERNAL") {
                pages = {
                    ...pages,
                    [itemPage.id]: {
                        ...itemPage,
                    },
                };
            }
            if (item.menuAttached) {
                navItems.push(itemNav);
            }
            if (!parent) {
                nav = {
                    ...nav,
                    root: navItems,
                };
            }
            else {
                const navLevel = navItems.filter((navItem) => navItem.type !== "EXTERNAL");
                if (!(0, lodash_1.isEmpty)(navLevel))
                    nav = {
                        ...nav,
                        [parent]: navLevel.concat(parentNavItem ? parentNavItem : []),
                    };
            }
            if (!(0, lodash_1.isEmpty)(itemChilds)) {
                const { nav: nestedNavs } = clientService.renderRFR({
                    items: itemChilds,
                    parent: itemPage.id,
                    parentNavItem: itemNav,
                    contentTypes,
                    enabledCustomFieldsNames,
                });
                const { pages: nestedPages } = clientService.renderRFR({
                    items: itemChilds.filter((child) => child.type !== "EXTERNAL"),
                    parent: itemPage.id,
                    parentNavItem: itemNav,
                    contentTypes,
                    enabledCustomFieldsNames,
                });
                pages = {
                    ...pages,
                    ...nestedPages,
                };
                nav = {
                    ...nav,
                    ...nestedNavs,
                };
            }
        });
        return {
            pages,
            nav,
        };
    },
    renderRFRNav(item) {
        const { uiRouterKey, title, path, type, audience } = item;
        const itemCommon = {
            label: title,
            type: type,
            audience,
        };
        if (type === "EXTERNAL") {
            (0, types_1.assertNotEmpty)(path, new NavigationError_1.NavigationError("External navigation item's path is undefined", item));
            return {
                ...itemCommon,
                url: path,
            };
        }
        if (type === "INTERNAL") {
            return {
                ...itemCommon,
                page: uiRouterKey,
            };
        }
        if (type === "WRAPPER") {
            return {
                ...itemCommon,
            };
        }
        throw new NavigationError_1.NavigationError("Unknown item type", item);
    },
    renderRFRPage(item, parent, enabledCustomFieldsNames) {
        const { uiRouterKey, title, path, slug, related, type, audience, menuAttached, } = item;
        const { __contentType, id, __templateName } = related || {};
        const contentType = __contentType || "";
        return {
            id: uiRouterKey,
            title,
            templateName: __templateName,
            related: type === "INTERNAL"
                ? {
                    contentType,
                    id,
                }
                : undefined,
            path,
            slug,
            parent,
            audience,
            menuAttached,
            ...enabledCustomFieldsNames.reduce((acc, field) => ({ ...acc, [field]: (0, lodash_1.get)(item, field) }), {}),
        };
    },
    async renderTree(items = [], id = null, field = "parent", path = "", itemParser = (i) => i) {
        return (await Promise.all(items
            .filter((item) => {
            if (item[field] === null && id === null) {
                return true;
            }
            let data = item[field];
            if (data && typeof id === "string") {
                data = data.toString();
            }
            if (!!data && typeof data === "object" && "id" in data) {
                return data.id === id;
            }
            return data && data === id;
        })
            .filter(utils_1.filterOutUnpublished)
            .map(async (item) => itemParser({
            ...item,
        }, path, field)))).sort((x, y) => {
            if (x.order !== undefined && y.order !== undefined)
                return x.order - y.order;
            else
                return 0;
        });
    },
    async renderType({ type = utils_1.RENDER_TYPES.FLAT, criteria = {}, itemCriteria = {}, filter = null, rootPath = null, wrapRelated = false, locale, populate, }) {
        const clientService = (0, utils_1.getPluginService)("client");
        const adminService = (0, utils_1.getPluginService)("admin");
        const commonService = (0, utils_1.getPluginService)("common");
        const entityWhereClause = {
            ...criteria,
            visible: true,
        };
        const { masterModel, itemModel } = (0, utils_1.getPluginModels)();
        const entity = await (0, i18n_1.i18nAwareEntityReadHandler)({
            entity: await strapi.query(masterModel.uid).findOne({
                where: entityWhereClause,
            }),
            entityUid: masterModel.uid,
            strapi,
            whereClause: entityWhereClause,
            localeCode: locale,
        });
        if (entity && entity.id) {
            const entities = await strapi
                .query(itemModel.uid)
                .findMany({
                where: {
                    master: entity.id,
                    ...itemCriteria,
                },
                limit: Number.MAX_SAFE_INTEGER,
                orderBy: [{ order: "asc" }],
                populate: ["related", "audience", "parent"],
            });
            if (!entities) {
                return [];
            }
            const items = await commonService.getRelatedItems(entities, populate);
            const { contentTypes, contentTypesNameFields, additionalFields } = await adminService.config(false);
            const enabledCustomFieldsNames = (0, utils_1.getCustomFields)(additionalFields).reduce((acc, curr) => (curr.enabled ? [...acc, curr.name] : acc), []);
            const wrapContentType = (itemContentType) => wrapRelated && itemContentType
                ? {
                    id: itemContentType.id,
                    attributes: { ...itemContentType },
                }
                : itemContentType;
            const pickMediaFields = (0, fp_1.pick)([
                "name",
                "url",
                "mime",
                "width",
                "height",
                "previewUrl",
            ]);
            const customFieldsDefinitions = additionalFields.filter((_) => typeof _ !== "string");
            switch (type) {
                case utils_1.RENDER_TYPES.TREE:
                case utils_1.RENDER_TYPES.RFR:
                    const getTemplateName = await (0, utils_1.templateNameFactory)(items, strapi, contentTypes);
                    const itemParser = async (item, path = "", field) => {
                        const isExternal = item.type === "EXTERNAL";
                        const parentPath = isExternal
                            ? undefined
                            : `${path === "/" ? "" : path}/${(0, lodash_1.first)(item.path) === "/" ? item.path.substring(1) : item.path}`;
                        const slug = (0, lodash_1.isString)(parentPath)
                            ? await commonService.getSlug(((0, lodash_1.first)(parentPath) === "/"
                                ? parentPath.substring(1)
                                : parentPath).replace(/\//g, "-"))
                            : undefined;
                        const lastRelated = (0, lodash_1.isArray)(item.related)
                            ? (0, lodash_1.last)(item.related)
                            : item.related;
                        const relatedContentType = wrapContentType(lastRelated);
                        const customFields = enabledCustomFieldsNames.reduce((acc, field) => {
                            const mapper = customFieldsDefinitions.find(({ name }) => name === field)
                                ?.type === "media"
                                ? (_) => pickMediaFields(JSON.parse(_))
                                : fp_1.identity;
                            const content = (0, lodash_1.get)(item, `additionalFields.${field}`);
                            return {
                                ...acc,
                                [field]: content ? mapper(content) : content,
                            };
                        }, {});
                        return {
                            id: item.id,
                            title: (0, utils_1.composeItemTitle)(item, contentTypesNameFields, contentTypes),
                            menuAttached: item.menuAttached,
                            order: item.order,
                            path: isExternal ? item.externalPath : parentPath,
                            type: item.type,
                            uiRouterKey: item.uiRouterKey,
                            slug: !slug && item.uiRouterKey
                                ? commonService.getSlug(item.uiRouterKey)
                                : slug,
                            external: isExternal,
                            related: isExternal || !lastRelated
                                ? undefined
                                : {
                                    ...relatedContentType,
                                    __templateName: getTemplateName(lastRelated.relatedType || lastRelated.__contentType, lastRelated.id),
                                },
                            audience: !(0, lodash_1.isEmpty)(item.audience)
                                ? item.audience.map(({ key }) => key)
                                : undefined,
                            items: isExternal
                                ? undefined
                                : await clientService.renderTree(items, item.id, field, parentPath, itemParser),
                            ...customFields,
                        };
                    };
                    const { items: itemsFilteredByPath, root: rootElement } = (0, utils_1.filterByPath)(items, rootPath);
                    const treeStructure = await clientService.renderTree((0, lodash_1.isNil)(rootPath) ? items : itemsFilteredByPath, (0, lodash_1.get)(rootElement, "parent.id") ?? null, "parent", (0, lodash_1.get)(rootElement, "parent.path"), itemParser);
                    const filteredStructure = filter
                        ? treeStructure.filter((item) => item.uiRouterKey === filter)
                        : treeStructure;
                    if (type === utils_1.RENDER_TYPES.RFR) {
                        return clientService.renderRFR({
                            items: filteredStructure,
                            contentTypes,
                            enabledCustomFieldsNames,
                        });
                    }
                    return filteredStructure;
                default:
                    const publishedItems = items.filter(utils_1.filterOutUnpublished);
                    const result = (0, lodash_1.isNil)(rootPath)
                        ? items
                        : (0, utils_1.filterByPath)(publishedItems, rootPath).items;
                    const defaultCache = new Map();
                    const getNestedOrders = (id, cache = defaultCache) => {
                        const cached = cache.get(id);
                        if (!(0, lodash_1.isNil)(cached))
                            return cached;
                        const item = result.find((item) => item.id === id);
                        if ((0, lodash_1.isNil)(item))
                            return [0];
                        const { order, parent } = item;
                        const nestedOrders = parent
                            ? getNestedOrders(parent.id, cache).concat(order)
                            : [order];
                        cache.set(id, nestedOrders);
                        return nestedOrders;
                    };
                    return result
                        .map(({ additionalFields, ...item }) => {
                        const customFields = enabledCustomFieldsNames.reduce((acc, field) => {
                            const mapper = customFieldsDefinitions.find(({ name }) => name === field)
                                ?.type === "media"
                                ? (_) => pickMediaFields(JSON.parse(_.toString()))
                                : fp_1.identity;
                            const content = (0, lodash_1.get)(additionalFields, field);
                            return {
                                ...acc,
                                [field]: content ? mapper(content) : content,
                            };
                        }, {});
                        return {
                            ...item,
                            audience: item.audience?.map((_) => _.key),
                            title: (0, utils_1.composeItemTitle)({ ...item, additionalFields }, contentTypesNameFields, contentTypes) || "",
                            related: wrapContentType(item.related),
                            items: null,
                            ...customFields,
                        };
                    })
                        .sort((a, b) => (0, utils_1.compareArraysOfNumbers)(getNestedOrders(a.id), getNestedOrders(b.id)));
            }
        }
        throw new utils_2.errors.NotFoundError();
    },
});
exports.default = clientService;
//# sourceMappingURL=client.js.map