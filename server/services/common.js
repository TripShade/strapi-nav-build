"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const pluralize_1 = __importDefault(require("pluralize"));
const utils_1 = require("@strapi/utils");
const config_1 = require("../config");
const i18n_1 = require("../i18n");
const utils_2 = require("../utils");
const slugify_1 = __importDefault(require("@sindresorhus/slugify"));
const lifecycleHookListeners = {
    navigation: {},
    "navigation-item": {}
};
const commonService = ({ strapi }) => ({
    analyzeBranch(items = [], masterEntity = null, parentItem = null, prevOperations = {}) {
        const commonService = (0, utils_2.getPluginService)('common');
        const { toCreate, toRemove, toUpdate } = items
            .reduce((acc, _) => {
            const branchName = commonService.getBranchName(_);
            if (branchName) {
                return { ...acc, [branchName]: [...acc[branchName], _] };
            }
            return acc;
        }, { toRemove: [], toCreate: [], toUpdate: [] });
        const operations = {
            create: prevOperations.create || !!toCreate.length,
            update: prevOperations.update || !!toUpdate.length,
            remove: prevOperations.remove || !!toRemove.length,
        };
        return (0, utils_2.checkDuplicatePath)(parentItem || masterEntity, toCreate.concat(toUpdate))
            .then(() => Promise.all([
            commonService.createBranch(toCreate, masterEntity, parentItem, operations),
            commonService.removeBranch(toRemove, operations),
            commonService.updateBranch(toUpdate, masterEntity, parentItem, operations),
        ]));
    },
    async configContentTypes(viaSettingsPage = false) {
        const commonService = (0, utils_2.getPluginService)('common');
        const pluginStore = await commonService.getPluginStore();
        const config = await pluginStore.get({ key: 'config' });
        const eligibleContentTypes = await Promise.all(config.contentTypes
            .filter(contentType => !!strapi.contentTypes[contentType] && (0, utils_2.isContentTypeEligible)(contentType))
            .map(async (key) => {
            const item = strapi.contentTypes[key];
            const { kind, options, uid } = item;
            const { draftAndPublish } = options;
            const isSingleType = kind === utils_2.KIND_TYPES.SINGLE;
            const isSingleTypeWithPublishFlow = isSingleType && draftAndPublish;
            const returnType = (available) => ({
                key,
                available,
            });
            if (isSingleType) {
                if (isSingleTypeWithPublishFlow) {
                    const itemsCountOrBypass = isSingleTypeWithPublishFlow ?
                        await strapi.query(uid).count({
                            where: {
                                published_at: { $notNull: true },
                            },
                        }) :
                        true;
                    return returnType(itemsCountOrBypass !== 0);
                }
                const isAvailable = await strapi.query(uid).count({});
                return isAvailable !== 0 ?
                    returnType(true) :
                    (viaSettingsPage ? returnType(false) : undefined);
            }
            return returnType(true);
        }));
        return eligibleContentTypes
            .filter(key => key)
            .map((value) => {
            if (value === undefined)
                return;
            const { key, available } = value;
            const item = strapi.contentTypes[key];
            const relatedField = (item.associations || []).find((_) => _.model === 'navigationitem');
            const { uid, options, info, collectionName, modelName, apiName, plugin, kind, pluginOptions = {} } = item;
            const { visible = true } = pluginOptions['content-manager'] || {};
            const { name, description } = info;
            const { hidden, templateName, draftAndPublish } = options;
            const findRouteConfig = (0, lodash_1.find)((0, lodash_1.get)(strapi.api, `[${modelName}].config.routes`, []), route => route.handler.includes('.find'));
            const findRoutePath = findRouteConfig && findRouteConfig.path.split('/')[1];
            const apiPath = findRoutePath && (findRoutePath !== apiName) ? findRoutePath : apiName || modelName;
            const isSingle = kind === utils_2.KIND_TYPES.SINGLE;
            const endpoint = isSingle ? apiPath : (0, pluralize_1.default)(apiPath);
            const relationName = (0, utils_2.singularize)(modelName);
            const relationNameParts = typeof uid === 'string' ? (0, lodash_1.last)((uid).split('.')).split('-') : [];
            const contentTypeName = relationNameParts.length > 1 ? relationNameParts.reduce((prev, curr) => `${prev}${(0, lodash_1.upperFirst)(curr)}`, '') : (0, lodash_1.upperFirst)(modelName);
            const labelSingular = name ||
                ((0, lodash_1.upperFirst)(relationNameParts.length > 1 ? relationNameParts.join(' ') : relationName));
            return {
                uid,
                name: relationName,
                draftAndPublish,
                isSingle,
                description,
                collectionName,
                contentTypeName,
                label: isSingle ? labelSingular : (0, pluralize_1.default)(name || labelSingular),
                relatedField: relatedField ? relatedField.alias : undefined,
                labelSingular: (0, utils_2.singularize)(labelSingular),
                endpoint,
                plugin,
                available: available && !hidden,
                visible,
                templateName,
            };
        })
            .filter((item) => viaSettingsPage || (item && item.available));
    },
    async createBranch(items, masterEntity, parentItem, operations) {
        const commonService = (0, utils_2.getPluginService)('common');
        const { itemModel } = (0, utils_2.getPluginModels)();
        return await Promise.all(items.map(async (item) => {
            operations.create = true;
            const { parent, master, related, ...params } = item;
            const relatedItems = await this.getIdsRelated(related, master);
            const data = {
                ...params,
                related: relatedItems,
                master: masterEntity,
                parent: parentItem ? { ...parentItem, _id: parentItem.id } : null,
            };
            const navigationItem = await strapi
                .query(itemModel.uid)
                .create({ data, populate: ['related'] });
            return !(0, lodash_1.isEmpty)(item.items)
                ? commonService.createBranch(item.items, masterEntity, navigationItem, operations)
                : operations;
        }));
    },
    getBranchName(item) {
        const hasId = !(0, lodash_1.isNil)(item.id);
        const toRemove = item.removed;
        if (hasId && !toRemove) {
            return 'toUpdate';
        }
        if (hasId && toRemove) {
            return 'toRemove';
        }
        if (!hasId && !toRemove) {
            return 'toCreate';
        }
    },
    async getContentTypeItems(uid, query) {
        const commonService = (0, utils_2.getPluginService)('common');
        const pluginStore = await commonService.getPluginStore();
        const config = await pluginStore.get({ key: 'config' });
        const where = await (0, i18n_1.addI18nWhereClause)({
            strapi,
            previousWhere: {},
            query,
            modelUid: uid,
        });
        try {
            const contentTypeItems = await strapi.query(uid).findMany({
                populate: config.contentTypesPopulate[uid] || [],
                where,
            });
            return contentTypeItems;
        }
        catch (err) {
            return [];
        }
    },
    async getIdsRelated(relatedItems, master) {
        if (relatedItems) {
            return (await Promise.all(relatedItems.map(async (relatedItem) => {
                try {
                    const model = strapi.query("plugin::navigation.navigations-items-related");
                    const entity = await model.findOne({
                        where: {
                            related_id: relatedItem.refId,
                            related_type: relatedItem.ref,
                            field: relatedItem.field,
                            master,
                        },
                    });
                    if (!entity) {
                        const newEntity = {
                            master,
                            order: 1,
                            field: relatedItem.field,
                            related_id: relatedItem.refId,
                            related_type: relatedItem.ref,
                        };
                        return model.create({ data: newEntity }).then(({ id }) => id);
                    }
                    return entity.id;
                }
                catch (e) {
                    console.error(e);
                }
            }))).reduce((acc, id) => (id ? acc.concat([id]) : acc), []);
        }
    },
    async getPluginStore() {
        return await strapi.store({ type: 'plugin', name: 'navigation' });
    },
    async getRelatedItems(entityItems, populate) {
        const commonService = (0, utils_2.getPluginService)('common');
        const pluginStore = await commonService.getPluginStore();
        const config = await pluginStore.get({ key: 'config' });
        const relatedTypes = new Set(entityItems.flatMap((item) => (0, lodash_1.get)(item.related, 'related_type', '')));
        const groupedItems = Array.from(relatedTypes).filter((relatedType) => relatedType).reduce((acc, relatedType) => Object.assign(acc, {
            [relatedType]: [
                ...(acc[relatedType] || []),
                ...entityItems
                    .filter((item => (0, lodash_1.get)(item.related, 'related_type') === relatedType))
                    .flatMap((item) => Object.assign(item.related || {}, { navigationItemId: item.id })),
            ],
        }), {});
        const data = new Map((await Promise.all(Object.entries(groupedItems)
            .map(async ([model, related]) => {
            let relationData = [];
            try {
                relationData = await strapi
                    .query(model)
                    .findMany({
                    where: {
                        id: { $in: (0, lodash_1.map)(related, 'related_id') },
                    },
                    populate: (0, lodash_1.isNil)(populate) ? config.contentTypesPopulate[model] || [] : (0, utils_2.parsePopulateQuery)(populate)
                });
            }
            catch (e) {
                console.log("Related content type was removed. See details below.");
                console.error(e);
            }
            return relationData
                .flatMap(_ => Object.assign(_, {
                __contentType: model,
                navigationItemId: related.find(({ related_id }) => related_id === _.id.toString())?.navigationItemId
            }));
        })))
            .flat(1)
            .map(_ => [_.navigationItemId, _]));
        return entityItems
            .map(({ related, ...item }) => {
            const relatedData = data.get(item.id);
            if (relatedData) {
                return Object.assign(item, {
                    related: (0, utils_2.purgeSensitiveData)(relatedData),
                });
            }
            return { ...item, related: null };
        });
    },
    removeBranch(items = [], operations = {}) {
        const commonService = (0, utils_2.getPluginService)('common');
        const { itemModel } = (0, utils_2.getPluginModels)();
        return Promise.all(items
            .filter(item => item.id)
            .map(async (item) => {
            operations.remove = true;
            const { id, related, master } = item;
            await Promise.all([
                strapi
                    .query(itemModel.uid)
                    .delete({ where: { id } }),
                this.removeRelated(related, master),
            ]);
            return !(0, lodash_1.isEmpty)(item.items)
                ? commonService.removeBranch(item.items, operations)
                : operations;
        }));
    },
    removeRelated(relatedItems, master) {
        return Promise.all((relatedItems || []).map(relatedItem => {
            const model = strapi.query('plugin::navigation.navigations-items-related');
            const entityToRemove = {
                master,
                field: relatedItem.field,
                related_id: relatedItem.refId,
                related_type: relatedItem.ref,
            };
            return model.delete({ where: entityToRemove });
        }));
    },
    setDefaultConfig() {
        return (0, config_1.configSetupStrategy)({ strapi });
    },
    async updateBranch(toUpdate, masterEntity, parentItem, operations) {
        const commonService = (0, utils_2.getPluginService)('common');
        const { itemModel } = (0, utils_2.getPluginModels)();
        const databaseModel = strapi.query(itemModel.uid);
        return Promise.all(toUpdate.map(async (item) => {
            operations.update = true;
            const { id, updated, parent, master, related, items, ...params } = item;
            let currentItem;
            if (updated) {
                const relatedItems = await this.getIdsRelated(related, master);
                currentItem = await databaseModel
                    .update({
                    where: { id },
                    data: {
                        ...params,
                        related: relatedItems,
                        master: masterEntity,
                        parent: parentItem ? { ...parentItem, _id: parentItem.id } : null,
                    },
                });
            }
            else {
                currentItem = item;
            }
            return !(0, lodash_1.isEmpty)(items)
                ? await commonService.analyzeBranch(items, masterEntity, currentItem, operations)
                : operations;
        }));
    },
    async emitEvent(uid, event, entity) {
        const model = strapi.getModel(uid);
        const sanitizedEntity = await utils_1.sanitize.sanitizers.defaultSanitizeOutput(model, entity);
        strapi.webhookRunner.eventHub.emit(event, {
            model: model.modelName,
            entry: sanitizedEntity,
        });
    },
    async pruneCustomFields(removedFields) {
        const { itemModel } = (0, utils_2.getPluginModels)();
        const databaseModel = strapi.query(itemModel.uid);
        const removedFieldsNames = removedFields.map(({ name }) => name);
        const navigationItems = await databaseModel.findMany({
            where: {
                additionalFields: {
                    $contains: [removedFieldsNames]
                }
            }
        });
        const navigationItemsToUpdate = removedFields.reduce((acc, curr) => {
            return acc.map((item) => (0, lodash_1.omit)(item, [`additionalFields.${curr.name}`]));
        }, navigationItems);
        for (const item of navigationItemsToUpdate) {
            await databaseModel.update({
                where: { id: item.id },
                data: { additionalFields: item.additionalFields },
            });
        }
    },
    async getSlug(query) {
        let slug = (0, slugify_1.default)(query);
        if (slug) {
            const { itemModel } = (0, utils_2.getPluginModels)();
            const existingItems = await strapi
                .query(itemModel.uid)
                .count({
                where: {
                    $or: [
                        {
                            uiRouterKey: {
                                $startsWith: slug
                            }
                        },
                        { uiRouterKey: slug }
                    ]
                },
                limit: Number.MAX_SAFE_INTEGER,
            });
            if (existingItems) {
                slug = `${slug}-${existingItems}`;
            }
        }
        return slug.toLowerCase();
    },
    registerLifecycleHook({ callback, contentTypeName, hookName }) {
        if (!lifecycleHookListeners[contentTypeName][hookName]) {
            lifecycleHookListeners[contentTypeName][hookName] = [];
        }
        lifecycleHookListeners[contentTypeName][hookName]?.push(callback);
    },
    async runLifecycleHook({ contentTypeName, event, hookName }) {
        const hookListeners = lifecycleHookListeners[contentTypeName][hookName] ?? [];
        for (const listener of hookListeners) {
            await listener(event);
        }
    },
});
exports.default = commonService;
//# sourceMappingURL=common.js.map