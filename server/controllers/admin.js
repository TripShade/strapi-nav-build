"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@strapi/utils");
const types_1 = require("../../types");
const utils_2 = require("../utils");
const utils_3 = require("../utils");
const InvalidParamNavigationError_1 = require("../../utils/InvalidParamNavigationError");
const NavigationError_1 = require("../../utils/NavigationError");
const adminControllers = {
    getAdminService() {
        return (0, utils_2.getPluginService)("admin");
    },
    getCommonService() {
        return (0, utils_2.getPluginService)("common");
    },
    async get() {
        return await this.getAdminService().get();
    },
    post(ctx) {
        const { auditLog } = ctx;
        const { body = {} } = ctx.request;
        return this.getAdminService().post(body, auditLog);
    },
    put(ctx) {
        const { params, auditLog } = ctx;
        const { id } = (0, utils_2.parseParams)(params);
        const { body = {} } = ctx.request;
        return this.getAdminService().put(id, body, auditLog).catch((0, utils_3.errorHandler)(ctx));
    },
    async delete(ctx) {
        const { params, auditLog } = ctx;
        const { id } = (0, utils_2.parseParams)(params);
        try {
            (0, types_1.assertNotEmpty)(id, new InvalidParamNavigationError_1.InvalidParamNavigationError("Navigation's id is not a id"));
            await this.getAdminService().delete(id, auditLog);
            return {};
        }
        catch (error) {
            console.error(error);
            if (error instanceof NavigationError_1.NavigationError) {
                return (0, utils_3.errorHandler)(ctx)(error);
            }
            throw error;
        }
    },
    async config() {
        return this.getAdminService().config();
    },
    async updateConfig(ctx) {
        try {
            await this.getAdminService().updateConfig(ctx.request.body);
        }
        catch (e) {
            (0, utils_3.errorHandler)(ctx)(e);
        }
        return ctx.send({ status: 200 });
    },
    async restoreConfig(ctx) {
        try {
            await this.getAdminService().restoreConfig();
        }
        catch (e) {
            (0, utils_3.errorHandler)(ctx)(e);
        }
        return ctx.send({ status: 200 });
    },
    async settingsConfig() {
        return this.getAdminService().config(true);
    },
    async settingsRestart(ctx) {
        try {
            await this.getAdminService().restart();
            return ctx.send({ status: 200 });
        }
        catch (e) {
            (0, utils_3.errorHandler)(ctx)(e);
        }
    },
    async getById(ctx) {
        const { params } = ctx;
        const { id } = (0, utils_2.parseParams)(params);
        return this.getAdminService().getById(id);
    },
    async getContentTypeItems(ctx) {
        const { params, query = {} } = ctx;
        const { model } = (0, utils_2.parseParams)(params);
        return this.getCommonService().getContentTypeItems(model, query);
    },
    fillFromOtherLocale(ctx) {
        const { params, auditLog } = ctx;
        const { source, target } = (0, utils_2.parseParams)(params);
        try {
            assertCopyParams(source, target);
            return this.getAdminService().fillFromOtherLocale({ source, target, auditLog });
        }
        catch (error) {
            if (error instanceof Error) {
                return ctx.badRequest(error.message);
            }
            throw error;
        }
    },
    async readNavigationItemFromLocale(ctx) {
        const { params, query: { path } } = ctx;
        const { source, target } = (0, utils_2.parseParams)(params);
        try {
            assertCopyParams(source, target);
            (0, types_1.assertNotEmpty)(path, new InvalidParamNavigationError_1.InvalidParamNavigationError("Path is missing"));
            return await this.getAdminService().readNavigationItemFromLocale({
                path,
                source,
                target,
            });
        }
        catch (error) {
            if (error instanceof utils_1.errors.NotFoundError) {
                return ctx.notFound(error.message, {
                    messageKey: "popup.item.form.i18n.locale.error.unavailable"
                });
            }
            if (error instanceof Error) {
                return ctx.badRequest(error.message);
            }
            throw error;
        }
    },
    getSlug(ctx) {
        const { query: { q } } = ctx;
        try {
            (0, types_1.assertNotEmpty)(q);
            return this.getCommonService().getSlug(q).then((slug) => ({ slug }));
        }
        catch (error) {
            if (error instanceof Error) {
                return ctx.badRequest(error.message);
            }
            throw error;
        }
    },
};
const assertCopyParams = (source, target) => {
    (0, types_1.assertIsNumber)(source, new InvalidParamNavigationError_1.InvalidParamNavigationError("Source's id is not a number"));
    (0, types_1.assertIsNumber)(target, new InvalidParamNavigationError_1.InvalidParamNavigationError("Target's id is not a number"));
};
exports.default = adminControllers;
//# sourceMappingURL=admin.js.map