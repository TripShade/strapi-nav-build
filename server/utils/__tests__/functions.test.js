"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = __importDefault(require("../../../__mocks__/strapi"));
const functions_1 = require("../functions");
describe("Utilities functions", () => {
    beforeAll(async () => {
        (0, strapi_1.default)();
    });
    describe("Path rendering functions", () => {
        it("Can build nested path structure", async () => {
            const { itemModel } = (0, functions_1.getPluginModels)();
            const rootPath = "/home/side";
            const entities = await strapi
                .query(itemModel.uid)
                .findMany({
                where: {
                    master: 1,
                },
            });
            const nested = (0, functions_1.buildNestedPaths)(entities);
            expect(nested.length).toBe(2);
            expect(nested[1].path).toBe(rootPath);
        });
        it("Can filter items by path", async () => {
            const { itemModel } = (0, functions_1.getPluginModels)();
            const rootPath = "/home/side";
            const entities = await strapi
                .query(itemModel.uid)
                .findMany({
                where: {
                    master: 1,
                },
            });
            const { root, items } = (0, functions_1.filterByPath)(entities, rootPath);
            expect(root).toBeDefined();
            expect(root?.path).toBe(rootPath);
            expect(items.length).toBe(1);
        });
        it("Filter out sensitive information from related entities", () => {
            const sensitiveDataModel = {
                username: "Amy",
                password: "test-password",
                accessToken: "token",
                reset_token: "token",
                renewtoken: "token",
                secret: "secret",
            };
            const result = (0, functions_1.purgeSensitiveDataFromUser)(sensitiveDataModel);
            expect(result).toMatchInlineSnapshot(`
        Object {
          "username": "Amy",
        }
      `);
        });
        describe("purgeSensitiveData()", () => {
            it("should clear user sensitive data from returned entity", () => {
                const user = {
                    firstname: "Amy",
                    lastname: "Bishop",
                    username: "Amy",
                    password: "test-password",
                    accessToken: "token",
                    reset_token: "token",
                    renewtoken: "token",
                    secret: "secret",
                };
                const timestamp = "Thu Dec 21 2023 13:36:46 GMT+0100";
                const source = {
                    createdBy: user,
                    updatedBy: user,
                    createdAt: timestamp,
                    updatedAt: timestamp,
                    content: "Lorem ipsum dolor sit amet",
                    mainImage: {
                        createdBy: user,
                        updatedBy: user,
                        createdAt: timestamp,
                        updatedAt: timestamp,
                        url: "https://lorempixel.com/60x60",
                    },
                };
                expect((0, functions_1.purgeSensitiveData)(source)).toMatchInlineSnapshot(`
          Object {
            "content": "Lorem ipsum dolor sit amet",
            "createdAt": "Thu Dec 21 2023 13:36:46 GMT+0100",
            "createdBy": Object {
              "firstname": "Amy",
              "lastname": "Bishop",
              "username": "Amy",
            },
            "mainImage": Object {
              "createdAt": "Thu Dec 21 2023 13:36:46 GMT+0100",
              "createdBy": Object {
                "firstname": "Amy",
                "lastname": "Bishop",
                "username": "Amy",
              },
              "updatedAt": "Thu Dec 21 2023 13:36:46 GMT+0100",
              "updatedBy": Object {
                "firstname": "Amy",
                "lastname": "Bishop",
                "username": "Amy",
              },
              "url": "https://lorempixel.com/60x60",
            },
            "updatedAt": "Thu Dec 21 2023 13:36:46 GMT+0100",
            "updatedBy": Object {
              "firstname": "Amy",
              "lastname": "Bishop",
              "username": "Amy",
            },
          }
        `);
            });
        });
        describe("sanitizePopulateField()", () => {
            it.each(["*", true, null, undefined])('should filter out "%s"', (populate) => {
                expect((0, functions_1.sanitizePopulateField)(populate)).toBe(undefined);
            });
            it("should support mapping an array", () => {
                const populate = ["*", true, null, undefined, "bar"];
                expect((0, functions_1.sanitizePopulateField)(populate)).toMatchInlineSnapshot(`
          Array [
            undefined,
            undefined,
            undefined,
            undefined,
            "bar",
          ]
        `);
            });
            it("should support an object", () => {
                const populate = Object.fromEntries(["*", true, null, undefined, "bar"].map((value, index) => [
                    `key-${index + 1}`,
                    value,
                ]));
                expect((0, functions_1.sanitizePopulateField)(populate)).toMatchInlineSnapshot(`
          Object {
            "key-1": undefined,
            "key-2": undefined,
            "key-3": undefined,
            "key-4": undefined,
            "key-5": "bar",
          }
        `);
            });
        });
        describe("buildAllHookListeners()", () => {
            it("should define a listener for each available model lifecycle hook", () => {
                expect((0, functions_1.buildAllHookListeners)("navigation", {}))
                    .toMatchInlineSnapshot(`
          Object {
            "afterCount": [Function],
            "afterCreate": [Function],
            "afterCreateMany": [Function],
            "afterDelete": [Function],
            "afterDeleteMany": [Function],
            "afterFindMany": [Function],
            "afterFindOne": [Function],
            "afterUpdate": [Function],
            "afterUpdateMany": [Function],
            "beforeCount": [Function],
            "beforeCreate": [Function],
            "beforeCreateMany": [Function],
            "beforeDelete": [Function],
            "beforeDeleteMany": [Function],
            "beforeFindMany": [Function],
            "beforeFindOne": [Function],
            "beforeUpdate": [Function],
            "beforeUpdateMany": [Function],
          }
        `);
            });
        });
        describe("buildHookListener()", () => {
            it("should delegate lifecycle hook event to defined listeners", async () => {
                const contentTypeName = "navigation";
                const service = {
                    runLifecycleHook: jest.fn(),
                };
                const plugin = {
                    service() { return service; }
                };
                const context = {
                    strapi: {
                        plugin() {
                            return plugin;
                        },
                    },
                };
                const hookName = "afterCreate";
                const event = {
                    action: hookName,
                    model: {
                        attributes: {
                            name: "name",
                        },
                    },
                };
                const [, listener] = (0, functions_1.buildHookListener)(contentTypeName, context)(hookName);
                await listener(event);
                expect(service.runLifecycleHook).toHaveBeenCalledWith({
                    contentTypeName,
                    hookName,
                    event,
                });
            });
        });
    });
});
//# sourceMappingURL=functions.test.js.map