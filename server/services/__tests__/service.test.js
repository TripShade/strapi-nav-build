"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = __importDefault(require("../../../__mocks__/strapi"));
const utils_1 = require("../../utils");
const client_1 = __importDefault(require("../client"));
const admin_1 = __importDefault(require("../admin"));
describe("Navigation services", () => {
    beforeAll(async () => {
        (0, strapi_1.default)();
    });
    describe("Correct config", () => {
        it("Declares Strapi instance", () => {
            expect(strapi).toBeDefined();
            expect(strapi.plugin("navigation").service("admin")).toBeDefined();
            expect(strapi.plugin("navigation").service("client")).toBeDefined();
            expect(strapi.plugin("navigation").service("common")).toBeDefined();
        });
        it("Defines proper content types", () => {
            expect(strapi.contentTypes).toBeDefined();
            expect(strapi.plugin("navigation").contentTypes).toBeDefined();
        });
        it("Can read and return plugins config", () => {
            expect(strapi.plugin("navigation").config("additionalFields")).toBeDefined();
            expect(strapi.plugin("navigation").config("contentTypes")).toBeDefined();
            expect(strapi.plugin("navigation").config("contentTypesNameFields")).toBeDefined();
            expect(strapi.plugin("navigation").config("contentTypesPopulate")).toBeDefined();
            expect(strapi.plugin("navigation").config("allowedLevels")).toBeDefined();
            expect(strapi.plugin("navigation").config("gql")).toBeDefined();
        });
    });
    describe("Render navigation", () => {
        it("Can render branch in flat format", async () => {
            const clientService = (0, utils_1.getPluginService)("client");
            const result = await clientService.render({ idOrSlug: 1 });
            expect(result).toBeDefined();
            expect(result.length).toBe(2);
            expect(result).toHaveProperty([0, "related", "id"], 1);
            expect(result).toHaveProperty([0, "related", "title"], "Page nr 1");
            expect(result).toHaveProperty([0, "string_test_field"], "Custom field value");
        });
        it("Can render branch in flat format for GraphQL", async () => {
            const clientService = (0, utils_1.getPluginService)("client");
            const result = await clientService.render({
                idOrSlug: 1,
                wrapRelated: true,
            });
            expect(result).toBeDefined();
            expect(result.length).toBe(2);
            expect(result).toHaveProperty([0, "related", "id"], 1);
            expect(result).toHaveProperty([0, "related", "attributes", "title"], "Page nr 1");
            expect(result).toHaveProperty([0, "string_test_field"], "Custom field value");
        });
        it("Can render branch in tree format", async () => {
            const clientService = (0, utils_1.getPluginService)("client");
            const result = await clientService.render({
                idOrSlug: 1,
                type: utils_1.RENDER_TYPES.TREE,
            });
            expect(result).toBeDefined();
            expect(result.length).toBeGreaterThan(0);
            expect(result[0].items).toBeDefined();
            expect(result[0].items.length).toBeGreaterThan(0);
            expect(result).toHaveProperty([0, "items", 0, "string_test_field"], "Custom field value");
        });
        it("Can render branch in tree format for GraphQL", async () => {
            const clientService = (0, utils_1.getPluginService)("client");
            const result = await clientService.render({
                idOrSlug: 1,
                type: utils_1.RENDER_TYPES.TREE,
                wrapRelated: true,
            });
            expect(result).toBeDefined();
            expect(result.length).toBeGreaterThan(0);
            expect(result).toHaveProperty([0, "related", "id"], 1);
            expect(result).toHaveProperty([0, "related", "attributes", "title"], "Page nr 1");
            expect(result).toHaveProperty([0, "items", 0, "related", "id"], 2);
            expect(result).toHaveProperty([0, "items", 0, "related", "attributes", "title"], "Page nr 2");
            expect(result).toHaveProperty([0, "string_test_field"], "Custom field value");
        });
        it("Can render branch in rfr format", async () => {
            const clientService = (0, utils_1.getPluginService)("client");
            const result = await clientService.render({
                idOrSlug: 1,
                type: utils_1.RENDER_TYPES.RFR,
            });
            expect(result).toBeDefined();
            expect(result.pages).toBeDefined();
            expect(result.nav).toBeDefined();
        });
        it("Can render branch in rfr format for GraphQL", async () => {
            const clientService = (0, utils_1.getPluginService)("client");
            const result = await clientService.render({
                idOrSlug: 1,
                type: utils_1.RENDER_TYPES.RFR,
                wrapRelated: true,
            });
            expect(result).toBeDefined();
            expect(result.pages).toBeDefined();
            expect(result.nav).toBeDefined();
            expect(result).toHaveProperty(["pages", "home", "related", "id"], 1);
        });
        it("Can render only menu attached elements", async () => {
            const clientService = (0, utils_1.getPluginService)("client");
            const result = await clientService.render({
                idOrSlug: 1,
                type: utils_1.RENDER_TYPES.FLAT,
                menuOnly: true,
            });
            expect(result).toBeDefined();
            expect(result.length).toBe(1);
        });
        it("Can render branch by path", async () => {
            const clientService = (0, utils_1.getPluginService)("client");
            const result = await clientService.render({
                idOrSlug: 1,
                type: utils_1.RENDER_TYPES.FLAT,
                menuOnly: false,
                rootPath: "/home/side",
            });
            expect(result).toBeDefined();
            expect(result.length).toBe(1);
        });
    });
    describe("Render child", () => {
        it("Can render child", async () => {
            const clientService = (0, utils_1.getPluginService)("client");
            const result = await clientService.renderChildren({
                idOrSlug: 1,
                childUIKey: "home",
            });
            expect(result).toBeDefined();
            expect(result.length).toBe(1);
        });
    });
    describe("Lifecycle hooks", () => {
        it.each(utils_1.allLifecycleHooks)("should trigger for %s hook listener", async (hookName) => {
            const commonService = (0, utils_1.getPluginService)("common");
            const listenerA = jest.fn().mockResolvedValue("ABC");
            const listenerB = jest.fn();
            const event = {};
            commonService.registerLifecycleHook({
                callback: listenerA,
                contentTypeName: "navigation",
                hookName,
            });
            commonService.registerLifecycleHook({
                callback: listenerB,
                contentTypeName: "navigation",
                hookName,
            });
            await commonService.runLifecycleHook({
                contentTypeName: "navigation",
                event,
                hookName,
            });
            expect(listenerA).toHaveBeenCalledTimes(1);
            expect(listenerB).toHaveBeenCalledTimes(1);
        });
    });
    describe("ClientService", () => {
        let index = 0;
        const generateNavigation = (rest = {}) => ({
            name: `Navigation-${++index}`,
            id: ++index,
            ...rest,
        });
        describe("readAll()", () => {
            it("should read results", async () => {
                const allLocale = ["en", "pl", "ff", "fr"];
                const activeLocale = allLocale.filter((locale) => locale != "fr");
                const locale = allLocale[0];
                const findMany = jest.fn();
                const query = () => ({ findMany });
                const i18nPluginService = {
                    getDefaultLocale() {
                        return locale;
                    },
                    find() {
                        return activeLocale.map((code) => ({ code }));
                    },
                };
                const i18nPlugin = {
                    service() {
                        return i18nPluginService;
                    },
                };
                const store = () => ({
                    get() {
                        return { i18nEnabled: false };
                    },
                });
                const strapi = {
                    query,
                    plugin(name) {
                        return name === "i18n" ? i18nPlugin : null;
                    },
                    store,
                };
                const navigations = allLocale.map((localeCode) => generateNavigation({
                    localeCode,
                    localizations: allLocale
                        .filter((locale) => locale !== localeCode)
                        .map((_localeCode) => generateNavigation({ localeCode: _localeCode })),
                }));
                const service = (0, client_1.default)({
                    strapi: strapi,
                });
                const orderBy = "name";
                const orderDirection = "ASC";
                findMany.mockResolvedValue(navigations);
                const result = await service.readAll({
                    orderBy,
                    locale,
                    orderDirection,
                });
                expect(findMany.mock.calls).toMatchInlineSnapshot(`
          Array [
            Array [
              Object {
                "limit": 9007199254740991,
                "orderBy": Object {
                  "name": "ASC",
                },
                "populate": false,
                "where": Object {
                  "localeCode": "en",
                },
              },
            ],
          ]
        `);
                expect(result).toMatchInlineSnapshot(`
          Array [
            Object {
              "id": 8,
              "localeCode": "en",
              "localizations": Array [
                Object {
                  "id": 2,
                  "localeCode": "pl",
                  "name": "Navigation-1",
                },
                Object {
                  "id": 4,
                  "localeCode": "ff",
                  "name": "Navigation-3",
                },
                Object {
                  "id": 6,
                  "localeCode": "fr",
                  "name": "Navigation-5",
                },
              ],
              "name": "Navigation-7",
            },
            Object {
              "id": 16,
              "localeCode": "pl",
              "localizations": Array [
                Object {
                  "id": 10,
                  "localeCode": "en",
                  "name": "Navigation-9",
                },
                Object {
                  "id": 12,
                  "localeCode": "ff",
                  "name": "Navigation-11",
                },
                Object {
                  "id": 14,
                  "localeCode": "fr",
                  "name": "Navigation-13",
                },
              ],
              "name": "Navigation-15",
            },
            Object {
              "id": 24,
              "localeCode": "ff",
              "localizations": Array [
                Object {
                  "id": 18,
                  "localeCode": "en",
                  "name": "Navigation-17",
                },
                Object {
                  "id": 20,
                  "localeCode": "pl",
                  "name": "Navigation-19",
                },
                Object {
                  "id": 22,
                  "localeCode": "fr",
                  "name": "Navigation-21",
                },
              ],
              "name": "Navigation-23",
            },
            Object {
              "id": 32,
              "localeCode": "fr",
              "localizations": Array [
                Object {
                  "id": 26,
                  "localeCode": "en",
                  "name": "Navigation-25",
                },
                Object {
                  "id": 28,
                  "localeCode": "pl",
                  "name": "Navigation-27",
                },
                Object {
                  "id": 30,
                  "localeCode": "ff",
                  "name": "Navigation-29",
                },
              ],
              "name": "Navigation-31",
            },
          ]
        `);
            });
            it("should read locale aware results", async () => {
                const allLocale = ["en", "pl", "ff", "fr"];
                const activeLocale = allLocale.filter((locale) => locale != "fr");
                const locale = allLocale[0];
                const findMany = jest.fn();
                const query = () => ({ findMany });
                const i18nPluginService = {
                    getDefaultLocale() {
                        return locale;
                    },
                    find() {
                        return activeLocale.map((code) => ({ code }));
                    },
                };
                const i18nPlugin = {
                    service() {
                        return i18nPluginService;
                    },
                };
                const store = () => ({
                    get() {
                        return { i18nEnabled: true };
                    },
                });
                const strapi = {
                    query,
                    plugin(name) {
                        return name === "i18n" ? i18nPlugin : null;
                    },
                    store,
                };
                const navigations = allLocale.map((localeCode) => generateNavigation({
                    localeCode,
                    localizations: allLocale
                        .filter((locale) => locale !== localeCode)
                        .map((_localeCode) => generateNavigation({ localeCode: _localeCode })),
                }));
                const service = (0, client_1.default)({
                    strapi: strapi,
                });
                const orderBy = "name";
                const orderDirection = "ASC";
                findMany.mockResolvedValue(navigations);
                const result = await service.readAll({
                    orderBy,
                    locale,
                    orderDirection,
                });
                expect(findMany.mock.calls).toMatchInlineSnapshot(`
          Array [
            Array [
              Object {
                "limit": 9007199254740991,
                "orderBy": Object {
                  "name": "ASC",
                },
                "populate": false,
                "where": Object {
                  "localeCode": "en",
                },
              },
            ],
          ]
        `);
                expect(result).toMatchInlineSnapshot(`
          Array [
            Object {
              "id": 40,
              "localeCode": "en",
              "localizations": Array [
                Object {
                  "id": 34,
                  "localeCode": "pl",
                  "name": "Navigation-33",
                },
                Object {
                  "id": 36,
                  "localeCode": "ff",
                  "name": "Navigation-35",
                },
              ],
              "name": "Navigation-39",
            },
            Object {
              "id": 48,
              "localeCode": "pl",
              "localizations": Array [
                Object {
                  "id": 42,
                  "localeCode": "en",
                  "name": "Navigation-41",
                },
                Object {
                  "id": 44,
                  "localeCode": "ff",
                  "name": "Navigation-43",
                },
              ],
              "name": "Navigation-47",
            },
            Object {
              "id": 56,
              "localeCode": "ff",
              "localizations": Array [
                Object {
                  "id": 50,
                  "localeCode": "en",
                  "name": "Navigation-49",
                },
                Object {
                  "id": 52,
                  "localeCode": "pl",
                  "name": "Navigation-51",
                },
              ],
              "name": "Navigation-55",
            },
          ]
        `);
            });
        });
    });
    describe("AdminService", () => {
        let index = 0;
        const generateNavigation = (rest = {}) => ({
            name: `Navigation-${++index}`,
            id: ++index,
            ...rest,
        });
        describe("get()", () => {
            it("should read all navigations", async () => {
                const ids = [1, 2, 3, 4, 5, 6, 7];
                const navigations = ids.map((id) => generateNavigation({ id }));
                const locale = "en";
                const activeLocale = [locale];
                const findMany = jest.fn();
                const query = () => ({ findMany });
                const i18nPluginService = {
                    getDefaultLocale() {
                        return locale;
                    },
                    find() {
                        return activeLocale.map((code) => ({ code }));
                    },
                };
                const i18nPlugin = {
                    service() {
                        return i18nPluginService;
                    },
                };
                const store = () => ({
                    get() {
                        return { i18nEnabled: false };
                    },
                });
                const strapi = {
                    query,
                    plugin(name) {
                        return name === "i18n" ? i18nPlugin : null;
                    },
                    store,
                };
                const adminServiceBuilt = (0, admin_1.default)({ strapi });
                findMany.mockResolvedValue(navigations);
                const result = await adminServiceBuilt.get();
                expect(findMany.mock.calls).toMatchInlineSnapshot(`
          Array [
            Array [
              Object {
                "limit": 9007199254740991,
                "populate": Array [
                  "localizations",
                ],
                "where": Object {},
              },
            ],
          ]
        `);
                expect(result).toMatchInlineSnapshot(`
          Array [
            Object {
              "id": 1,
              "name": "Navigation-1",
            },
            Object {
              "id": 2,
              "name": "Navigation-3",
            },
            Object {
              "id": 3,
              "name": "Navigation-5",
            },
            Object {
              "id": 4,
              "name": "Navigation-7",
            },
            Object {
              "id": 5,
              "name": "Navigation-9",
            },
            Object {
              "id": 6,
              "name": "Navigation-11",
            },
            Object {
              "id": 7,
              "name": "Navigation-13",
            },
          ]
        `);
            });
            it("should read navigations only for specified ids", async () => {
                const ids = [1, 2, 3, 4, 5, 6, 7];
                const navigations = ids.map((id) => generateNavigation({ id }));
                const locale = "en";
                const activeLocale = [locale];
                const findMany = jest.fn();
                const query = () => ({ findMany });
                const i18nPluginService = {
                    getDefaultLocale() {
                        return locale;
                    },
                    find() {
                        return activeLocale.map((code) => ({ code }));
                    },
                };
                const i18nPlugin = {
                    service() {
                        return i18nPluginService;
                    },
                };
                const store = () => ({
                    get() {
                        return { i18nEnabled: false };
                    },
                });
                const strapi = {
                    query,
                    plugin(name) {
                        return name === "i18n" ? i18nPlugin : null;
                    },
                    store,
                };
                const adminServiceBuilt = (0, admin_1.default)({ strapi });
                const selectedIds = [3, 4, 7];
                findMany.mockResolvedValue(navigations.filter(({ id }) => selectedIds.includes(Number(id))));
                const result = await adminServiceBuilt.get([3, 4, 7]);
                expect(findMany.mock.calls).toMatchInlineSnapshot(`
          Array [
            Array [
              Object {
                "limit": 9007199254740991,
                "populate": Array [
                  "localizations",
                ],
                "where": Object {
                  "id": Object {
                    "$in": Array [
                      3,
                      4,
                      7,
                    ],
                  },
                },
              },
            ],
          ]
        `);
                expect(result).toMatchInlineSnapshot(`
          Array [
            Object {
              "id": 3,
              "name": "Navigation-19",
            },
            Object {
              "id": 4,
              "name": "Navigation-21",
            },
            Object {
              "id": 7,
              "name": "Navigation-27",
            },
          ]
        `);
            });
            it("should be internationalisation aware", async () => {
                const locale = "en";
                const activeLocale = [locale, "fr", "ff"];
                const allLocale = [locale, "fr", "ff", "de"];
                const findMany = jest.fn();
                const query = () => ({ findMany });
                const i18nPluginService = {
                    getDefaultLocale() {
                        return locale;
                    },
                    find() {
                        return activeLocale.map((code) => ({ code }));
                    },
                };
                const i18nPlugin = {
                    service() {
                        return i18nPluginService;
                    },
                };
                const store = () => ({
                    get() {
                        return { i18nEnabled: true };
                    },
                });
                const strapi = {
                    query,
                    plugin(name) {
                        return name === "i18n" ? i18nPlugin : null;
                    },
                    store,
                };
                const adminServiceBuilt = (0, admin_1.default)({ strapi });
                const navigations = allLocale.map((localeCode) => generateNavigation({
                    localeCode,
                    localizations: allLocale
                        .filter((locale) => locale !== localeCode)
                        .map((_localeCode) => generateNavigation({ localeCode: _localeCode })),
                }));
                const ids = navigations
                    .map(({ id }) => id)
                    .slice(1, 3)
                    .map(Number);
                findMany.mockResolvedValue(navigations.filter(({ id }) => ids.includes(Number(id))));
                const result = await adminServiceBuilt.get(ids);
                expect(findMany.mock.calls).toMatchInlineSnapshot(`
          Array [
            Array [
              Object {
                "limit": 9007199254740991,
                "populate": Array [
                  "localizations",
                ],
                "where": Object {
                  "id": Object {
                    "$in": Array [
                      44,
                      52,
                    ],
                  },
                },
              },
            ],
          ]
        `);
                expect(result).toMatchInlineSnapshot(`
          Array [
            Object {
              "id": 44,
              "localeCode": "fr",
              "localizations": Array [
                Object {
                  "id": 38,
                  "localeCode": "en",
                  "name": "Navigation-37",
                },
                Object {
                  "id": 40,
                  "localeCode": "ff",
                  "name": "Navigation-39",
                },
              ],
              "name": "Navigation-43",
            },
            Object {
              "id": 52,
              "localeCode": "ff",
              "localizations": Array [
                Object {
                  "id": 46,
                  "localeCode": "en",
                  "name": "Navigation-45",
                },
                Object {
                  "id": 48,
                  "localeCode": "fr",
                  "name": "Navigation-47",
                },
              ],
              "name": "Navigation-51",
            },
          ]
        `);
            });
        });
    });
});
//# sourceMappingURL=service.test.js.map