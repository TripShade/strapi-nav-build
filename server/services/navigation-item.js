"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const i18n_1 = require("../i18n");
const navigationItemService = ({ strapi, }) => ({
    async find() {
        const { itemModel } = (0, utils_1.getPluginModels)();
        const { enabled: i18nEnabled, locales } = await (0, i18n_1.getI18nStatus)({ strapi });
        let entities = await strapi.query(itemModel.uid).findMany({
            limit: Number.MAX_SAFE_INTEGER,
            populate: utils_1.DEFAULT_POPULATE,
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
    async findOne(id) {
        const { itemModel } = (0, utils_1.getPluginModels)();
        const entity = await strapi
            .query(itemModel.uid)
            .findOne({ where: { id }, populate: ["related", "parent", "audience"] });
        return {
            ...entity,
        };
    },
});
exports.default = navigationItemService;
//# sourceMappingURL=navigation-item.js.map