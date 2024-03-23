"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
describe("i18n", () => {
    describe("Utils", () => {
        describe("getI18nStatus()", () => {
            it("should check if i18n plugin is installed", async () => {
                const store = () => ({
                    get() {
                        return {};
                    },
                });
                const strapi = {
                    store,
                    plugin() {
                        return null;
                    },
                };
                const result = await (0, utils_1.getI18nStatus)({
                    strapi: strapi,
                });
                expect(result).toMatchInlineSnapshot(`
          Object {
            "defaultLocale": undefined,
            "enabled": false,
            "hasI18NPlugin": false,
            "locales": undefined,
          }
        `);
            });
            it("should check if i18n is enabled in navigation plugin config", async () => {
                const enabled = Math.floor(Math.random() * 10) % 2 ? true : false;
                const store = () => ({
                    get() {
                        return { i18nEnabled: enabled };
                    },
                });
                const strapi = {
                    store,
                    plugin() {
                        return {
                            service() {
                                return {
                                    async getDefaultLocale() {
                                        return "en";
                                    },
                                    async find() {
                                        return [{ code: "en" }];
                                    },
                                };
                            },
                        };
                    },
                };
                const result = await (0, utils_1.getI18nStatus)({
                    strapi: strapi,
                });
                expect(result).toHaveProperty("enabled", enabled);
            });
            it("should read default locale", async () => {
                const enabled = Math.floor(Math.random() * 10) % 2 ? true : false;
                const store = () => ({
                    get() {
                        return { i18nEnabled: enabled };
                    },
                });
                const locale = "fr";
                const strapi = {
                    store,
                    plugin() {
                        return {
                            service() {
                                return {
                                    async getDefaultLocale() {
                                        return locale;
                                    },
                                    async find() {
                                        return [{ code: locale }];
                                    },
                                };
                            },
                        };
                    },
                };
                const result = await (0, utils_1.getI18nStatus)({
                    strapi: strapi,
                });
                expect(result).toHaveProperty("defaultLocale", locale);
            });
            it("should read current locale", async () => {
                const enabled = Math.floor(Math.random() * 10) % 2 ? true : false;
                const store = () => ({
                    get() {
                        return { i18nEnabled: enabled };
                    },
                });
                const locale = "fr";
                const strapi = {
                    store,
                    plugin() {
                        return {
                            service() {
                                return {
                                    async getDefaultLocale() {
                                        return locale;
                                    },
                                    async find() {
                                        return [{ code: locale }];
                                    },
                                };
                            },
                        };
                    },
                };
                const result = await (0, utils_1.getI18nStatus)({
                    strapi: strapi,
                });
                expect(result).toHaveProperty("locales", [locale]);
            });
        });
    });
});
//# sourceMappingURL=utils.test.js.map