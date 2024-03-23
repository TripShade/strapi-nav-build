"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@strapi/utils");
const lodash_1 = require("lodash");
const utils_2 = require("../utils");
const i18n_1 = require("../i18n");
const NavigationError_1 = require("../../utils/NavigationError");
const adminService = ({ strapi, }) => ({
    async config(viaSettingsPage = false) {
        const commonService = (0, utils_2.getPluginService)("common");
        const { audienceModel } = (0, utils_2.getPluginModels)();
        const pluginStore = await commonService.getPluginStore();
        const config = await pluginStore.get({
            key: "config",
        });
        const additionalFields = config.additionalFields;
        const cascadeMenuAttached = config.cascadeMenuAttached;
        const contentTypesNameFields = config.contentTypesNameFields;
        const contentTypesPopulate = config.contentTypesPopulate;
        const pathDefaultFields = config.pathDefaultFields;
        const allowedLevels = config.allowedLevels;
        const isGQLPluginEnabled = !(0, lodash_1.isNil)(strapi.plugin("graphql"));
        let extendedResult = {
            allowedContentTypes: utils_2.ALLOWED_CONTENT_TYPES,
            restrictedContentTypes: utils_2.RESTRICTED_CONTENT_TYPES,
        };
        const configContentTypes = await commonService.configContentTypes();
        const result = {
            contentTypes: await commonService.configContentTypes(viaSettingsPage),
            contentTypesNameFields: {
                default: utils_2.CONTENT_TYPES_NAME_FIELDS_DEFAULTS,
                ...((0, lodash_1.isObject)(contentTypesNameFields) ? contentTypesNameFields : {}),
            },
            contentTypesPopulate: (0, lodash_1.isObject)(contentTypesPopulate)
                ? contentTypesPopulate
                : {},
            pathDefaultFields: (0, lodash_1.isObject)(pathDefaultFields) ? pathDefaultFields : {},
            allowedLevels,
            additionalFields: viaSettingsPage
                ? additionalFields
                : additionalFields.filter((field) => typeof field === "string" || (0, lodash_1.get)(field, "enabled", false)),
            gql: {
                navigationItemRelated: configContentTypes.map(({ labelSingular }) => labelSingular.replace(/\s+/g, "")),
            },
            isGQLPluginEnabled: viaSettingsPage ? isGQLPluginEnabled : undefined,
            cascadeMenuAttached,
        };
        const i18nConfig = await (0, i18n_1.addI18NConfigFields)({
            strapi,
            viaSettingsPage,
            previousConfig: {},
        });
        if (additionalFields.includes("audience")) {
            const audienceItems = await strapi
                .query(audienceModel.uid)
                .findMany({
                limit: Number.MAX_SAFE_INTEGER,
            });
            extendedResult = {
                ...extendedResult,
                availableAudience: audienceItems,
            };
        }
        return {
            ...result,
            ...extendedResult,
            ...i18nConfig,
        };
    },
    async get(ids) {
        const { masterModel } = (0, utils_2.getPluginModels)();
        const { enabled: i18nEnabled, locales } = await (0, i18n_1.getI18nStatus)({ strapi });
        const whereClause = {};
        if (ids) {
            whereClause.id = { $in: ids };
        }
        let entities = await strapi.query(masterModel.uid).findMany({
            limit: Number.MAX_SAFE_INTEGER,
            populate: utils_2.DEFAULT_POPULATE,
            where: whereClause,
        });
        if (i18nEnabled) {
            entities = entities.reduce((acc, entity) => {
                if (entity.localeCode && locales?.includes(entity.localeCode)) {
                    acc.push({
                        ...entity,
                        localizations: entity.localizations?.filter(({ localeCode }) => localeCode && locales?.includes(localeCode)),
                    });
                }
                return acc;
            }, []);
        }
        return entities;
    },
    async getById(id) {
        const commonService = (0, utils_2.getPluginService)("common");
        const { masterModel, itemModel } = (0, utils_2.getPluginModels)();
        const entity = await strapi
            .query(masterModel.uid)
            .findOne({ where: { id }, populate: utils_2.DEFAULT_POPULATE });
        const entityItems = await strapi
            .query(itemModel.uid)
            .findMany({
            where: {
                master: id,
            },
            limit: Number.MAX_SAFE_INTEGER,
            orderBy: [{ order: "asc" }],
            populate: ["related", "parent", "audience"],
        });
        const entities = await commonService.getRelatedItems(entityItems);
        return {
            ...entity,
            items: (0, utils_2.buildNestedStructure)(entities),
        };
    },
    async post(payload, auditLog) {
        const commonService = (0, utils_2.getPluginService)("common");
        const adminService = (0, utils_2.getPluginService)("admin");
        const { enabled: i18nEnabled, defaultLocale } = await (0, i18n_1.getI18nStatus)({
            strapi,
        });
        const { masterModel } = (0, utils_2.getPluginModels)();
        const { name, visible } = payload;
        const data = {
            name,
            slug: await commonService.getSlug(name),
            visible,
        };
        const existingEntity = await strapi
            .query(masterModel.uid)
            .create({ data });
        const result = commonService
            .createBranch(payload.items, existingEntity, null, {})
            .then(() => adminService.getById(existingEntity.id))
            .then((newEntity) => {
            (0, utils_2.sendAuditLog)(auditLog, "onChangeNavigation", {
                actionType: "CREATE",
                oldEntity: existingEntity,
                newEntity,
            });
            return newEntity;
        });
        await commonService.emitEvent(masterModel.uid, "entry.create", existingEntity);
        if (i18nEnabled && defaultLocale) {
            await (0, i18n_1.i18nNavigationSetupStrategy)({ strapi });
        }
        return result;
    },
    async put(id, payload, auditLog) {
        const adminService = (0, utils_2.getPluginService)("admin");
        const commonService = (0, utils_2.getPluginService)("common");
        const { enabled: i18nEnabled } = await (0, i18n_1.getI18nStatus)({ strapi });
        const { masterModel } = (0, utils_2.getPluginModels)();
        const { name, visible } = payload;
        const existingEntity = await adminService.getById(id);
        const detailsHaveChanged = existingEntity.name !== name || existingEntity.visible !== visible;
        if (detailsHaveChanged) {
            const newName = detailsHaveChanged ? name : existingEntity.name;
            const newSlug = detailsHaveChanged
                ? await commonService.getSlug(name)
                : existingEntity.slug;
            await strapi.query(masterModel.uid).update({
                where: { id },
                data: {
                    name: newName,
                    slug: newSlug,
                    visible,
                },
            });
            if (i18nEnabled && existingEntity.localizations) {
                for (const locale of existingEntity.localizations) {
                    await strapi.query(masterModel.uid).update({
                        where: {
                            id: locale.id,
                        },
                        data: {
                            name: newName,
                            slug: `${newSlug}-${locale.localeCode}`,
                            visible,
                        },
                    });
                }
            }
        }
        const result = await commonService
            .analyzeBranch(payload.items, existingEntity)
            .then((auditLogsOperations) => Promise.all([
            auditLog
                ? (0, utils_2.prepareAuditLog)((auditLogsOperations || []).flat(Number.MAX_SAFE_INTEGER))
                : [],
            adminService.getById(existingEntity.id),
        ]))
            .then(([actionType, newEntity]) => {
            (0, utils_2.sendAuditLog)(auditLog, "onChangeNavigation", {
                actionType,
                oldEntity: existingEntity,
                newEntity,
            });
            return newEntity;
        });
        const navigationEntity = await strapi
            .query(masterModel.uid)
            .findOne({ where: { id } });
        await commonService.emitEvent(masterModel.uid, "entry.update", navigationEntity);
        return result;
    },
    async delete(id, auditLog) {
        const { masterModel, itemModel } = (0, utils_2.getPluginModels)();
        const adminService = (0, utils_2.getPluginService)("admin");
        const entity = await adminService.getById(id);
        const { enabled: i18nEnabled } = await (0, i18n_1.getI18nStatus)({ strapi });
        const cleanNavigationItems = async (masterIds) => {
            const navigationItems = await strapi.query(itemModel.uid).findMany({
                where: {
                    $or: masterIds.map((id) => ({ master: id }))
                },
                limit: Number.MAX_SAFE_INTEGER,
            });
            await strapi.query(itemModel.uid).deleteMany({
                where: {
                    $or: navigationItems.map(({ id }) => ({ id }))
                },
            });
        };
        await cleanNavigationItems([id]);
        await strapi.query(masterModel.uid).delete({
            where: {
                id,
            },
        });
        if (i18nEnabled && entity.localizations) {
            await cleanNavigationItems(entity.localizations.map(_ => _.id));
            await strapi.query(masterModel.uid).deleteMany({
                where: {
                    id: {
                        $in: entity.localizations.map((_) => _.id),
                    },
                },
            });
        }
        (0, utils_2.sendAuditLog)(auditLog, "onNavigationDeletion", {
            entity,
            actionType: "DELETE",
        });
    },
    async restart() {
        setImmediate(() => strapi.reload());
    },
    async restoreConfig() {
        const commonService = (0, utils_2.getPluginService)("common");
        const pluginStore = await commonService.getPluginStore();
        await pluginStore.delete({ key: "config" });
        await commonService.setDefaultConfig();
    },
    async updateConfig(newConfig) {
        const commonService = (0, utils_2.getPluginService)("common");
        const pluginStore = await commonService.getPluginStore();
        const config = await pluginStore.get({
            key: "config",
        });
        (0, utils_2.validateAdditionalFields)(newConfig.additionalFields);
        await pluginStore.set({ key: "config", value: newConfig });
        const removedFields = (0, lodash_1.differenceBy)(config.additionalFields, newConfig.additionalFields, "name").filter((i) => i !== "audience");
        if (!(0, lodash_1.isEmpty)(removedFields)) {
            await commonService.pruneCustomFields(removedFields);
        }
    },
    async fillFromOtherLocale({ target, source, auditLog }) {
        const { enabled } = await (0, i18n_1.getI18nStatus)({ strapi });
        if (!enabled) {
            throw new NavigationError_1.NavigationError("Not yet implemented.");
        }
        const adminService = (0, utils_2.getPluginService)("admin");
        const commonService = (0, utils_2.getPluginService)("common");
        const targetEntity = await adminService.getById(target);
        return await (0, i18n_1.i18nNavigationContentsCopy)({
            source: await adminService.getById(source),
            target: targetEntity,
            service: commonService,
            strapi,
        })
            .then(() => adminService.getById(target))
            .then((updated) => {
            (0, utils_2.sendAuditLog)(auditLog, "onChangeNavigation", {
                actionType: "UPDATE",
                oldEntity: targetEntity,
                newEntity: updated,
            });
            return updated;
        });
    },
    async readNavigationItemFromLocale({ source, target, path }) {
        const sourceNavigation = await this.getById(source);
        const targetNavigation = await this.getById(target);
        if (!sourceNavigation) {
            throw new utils_1.errors.NotFoundError("Unable to find source navigation for specified query");
        }
        if (!targetNavigation) {
            throw new utils_1.errors.NotFoundError("Unable to find target navigation for specified query");
        }
        return await (0, i18n_1.i18nNavigationItemRead)({
            path,
            source: sourceNavigation,
            target: targetNavigation,
            strapi,
        });
    },
});
exports.default = adminService;
//# sourceMappingURL=admin.js.map