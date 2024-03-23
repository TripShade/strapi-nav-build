"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@strapi/utils");
const utils_2 = require("../utils");
const clientControllers = {
    getService() {
        return (0, utils_2.getPluginService)("client");
    },
    async readAll(ctx) {
        const { query = {} } = ctx;
        const { locale, orderBy, orderDirection } = query;
        try {
            return await this.getService().readAll({
                locale,
                orderBy,
                orderDirection,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                return ctx.badRequest(error.message);
            }
            throw error;
        }
    },
    async render(ctx) {
        const { params, query = {} } = ctx;
        const { type, menu: menuOnly, path: rootPath, locale, populate } = query;
        const { idOrSlug } = (0, utils_2.parseParams)(params);
        try {
            return await this.getService().render({
                idOrSlug,
                type,
                menuOnly,
                rootPath,
                locale,
                populate: (0, utils_2.sanitizePopulateField)(populate),
            });
        }
        catch (error) {
            if (error instanceof utils_1.errors.NotFoundError) {
                return ctx.notFound(error.message);
            }
            if (error instanceof Error) {
                return ctx.badRequest(error.message);
            }
            throw error;
        }
    },
    async renderChild(ctx) {
        const { params, query = {} } = ctx;
        const { type, menu: menuOnly, locale } = query;
        const { idOrSlug, childUIKey } = (0, utils_2.parseParams)(params);
        try {
            return await this.getService().renderChildren({
                idOrSlug,
                childUIKey,
                type,
                menuOnly,
                locale,
            });
        }
        catch (error) {
            if (error instanceof utils_1.errors.NotFoundError) {
                return ctx.notFound(error.message);
            }
            if (error instanceof Error) {
                return ctx.badRequest(error.message);
            }
            throw error;
        }
    },
};
exports.default = clientControllers;
//# sourceMappingURL=client.js.map