"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@strapi/utils");
const utils_2 = require("../utils");
const clientControllers = {
    getService() {
        return (0, utils_2.getPluginService)("navigation-item");
    },
    async find(ctx) {
        try {
            return await this.getService().find();
        }
        catch (error) {
            if (error instanceof Error) {
                return ctx.badRequest(error.message);
            }
            throw error;
        }
    },
    async findOne(ctx) {
        const { params = {} } = ctx;
        const { idOrSlug } = (0, utils_2.parseParams)(params);
        try {
            return await this.getService().findOne(idOrSlug);
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
//# sourceMappingURL=navigation-item.js.map