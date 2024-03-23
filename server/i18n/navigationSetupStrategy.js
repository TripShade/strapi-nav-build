"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.i18nNavigationSetupStrategy = void 0;
const types_1 = require("../../types");
const utils_1 = require("../utils");
const errors_1 = require("./errors");
const fp_1 = require("lodash/fp");
const i18nNavigationSetupStrategy = async ({ strapi, }) => {
    const pluginStore = strapi.store({
        type: "plugin",
        name: "navigation",
    });
    const config = await pluginStore.get({
        key: "config",
    });
    let currentNavigations = await getCurrentNavigations(strapi);
    const localeService = strapi.plugin("i18n").service("locales");
    const defaultLocale = await localeService.getDefaultLocale();
    const allLocale = (await localeService.find({})).map(({ code }) => code);
    (0, types_1.assertNotEmpty)(defaultLocale, new errors_1.DefaultLocaleMissingError());
    if (config.i18nEnabled) {
        const hasNotAnyLocale = ({ localeCode }) => !localeCode;
        if (currentNavigations.length === 0) {
            currentNavigations = [
                await createDefaultI18nNavigation({ strapi, defaultLocale }),
            ];
        }
        const noLocaleNavigations = currentNavigations.filter(hasNotAnyLocale);
        if (noLocaleNavigations.length) {
            await updateNavigations({
                strapi,
                ids: noLocaleNavigations.map((0, fp_1.prop)("id")).reduce((acc, id) => {
                    if (id && Number(id)) {
                        acc.push(Number(id));
                    }
                    return acc;
                }, []),
                payload: {
                    localeCode: defaultLocale,
                },
                populate: utils_1.DEFAULT_POPULATE,
            });
            currentNavigations = await getCurrentNavigations(strapi);
        }
        const navigationsToProcess = currentNavigations.filter(({ localeCode }) => defaultLocale === localeCode);
        for (const rootNavigation of navigationsToProcess) {
            let localizations = [
                ...(rootNavigation.localizations ?? []).map((localization) => (0, types_1.assertEntity)(localization, "Navigation")),
            ];
            const connectOrphans = currentNavigations.filter((navigation) => {
                return (navigation.slug.startsWith(rootNavigation.slug) &&
                    navigation.id !== rootNavigation.id &&
                    !localizations.find(({ id }) => navigation.id === id));
            });
            localizations = localizations
                .concat([rootNavigation])
                .concat(connectOrphans)
                .filter(({ localeCode }) => !!localeCode && allLocale.includes(localeCode));
            const missingLocale = allLocale.filter((locale) => !localizations.some(({ localeCode }) => localeCode === locale));
            if (missingLocale.length) {
                const { ids } = await createNavigations({
                    strapi,
                    payloads: missingLocale.map((locale) => ({
                        localeCode: locale,
                        slug: `${rootNavigation.slug}-${locale}`,
                        name: rootNavigation.name,
                        visible: true,
                    })),
                });
                localizations = [...(await getCurrentNavigations(strapi, ids))].concat([
                    rootNavigation,
                ]);
            }
            for (const current of localizations) {
                await updateNavigation({
                    strapi,
                    current,
                    payload: {
                        localizations: localizations.filter((localization) => localization.id !== current.id),
                    },
                });
            }
        }
    }
    else {
        if (config.pruneObsoleteI18nNavigations) {
            await deleteNavigations({
                strapi,
                where: { localeCode: { $not: defaultLocale } },
            });
            await pluginStore.set({
                key: "config",
                value: {
                    ...config,
                    pruneObsoleteI18nNavigations: false,
                },
            });
        }
        const remainingNavigations = await getCurrentNavigations(strapi);
        if (!remainingNavigations.length) {
            await createDefaultI18nNavigation({ strapi, defaultLocale });
        }
    }
    return getCurrentNavigations(strapi);
};
exports.i18nNavigationSetupStrategy = i18nNavigationSetupStrategy;
const getCurrentNavigations = (strapi, ids) => strapi.plugin("navigation").service("admin").get(ids);
const createNavigation = ({ strapi, payload, populate, }) => strapi.query("plugin::navigation.navigation").create({
    data: {
        ...payload,
    },
    populate,
});
const createNavigations = ({ strapi, payloads, populate, }) => strapi.query("plugin::navigation.navigation").createMany({
    data: payloads,
    populate,
});
const updateNavigation = ({ strapi, current, payload, populate, }) => strapi.query("plugin::navigation.navigation").update({
    data: {
        ...payload,
    },
    populate,
    where: {
        id: current.id,
    },
});
const updateNavigations = ({ strapi, ids, payload, populate, }) => strapi.query("plugin::navigation.navigation").updateMany({
    data: payload,
    populate,
    where: {
        id: {
            $in: ids,
        },
    },
});
const deleteNavigations = ({ strapi, where, }) => strapi.query("plugin::navigation.navigation").deleteMany({
    where,
});
const createDefaultI18nNavigation = ({ strapi, defaultLocale, }) => createNavigation({
    strapi,
    payload: {
        ...utils_1.DEFAULT_NAVIGATION_ITEM,
        localeCode: defaultLocale,
    },
    populate: utils_1.DEFAULT_POPULATE,
});
//# sourceMappingURL=navigationSetupStrategy.js.map