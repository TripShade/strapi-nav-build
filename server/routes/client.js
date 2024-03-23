"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = {
    type: "content-api",
    routes: [
        {
            method: "GET",
            path: "/render/:idOrSlug",
            handler: "client.render",
            config: {
                policies: [],
            },
        },
        {
            method: "GET",
            path: "/render/:idOrSlug/:childUIKey",
            handler: "client.renderChild",
            config: {
                policies: [],
            },
        },
        {
            method: "GET",
            path: "/",
            handler: "client.readAll",
            config: {
                policies: [],
            },
        },
        {
            method: "GET",
            path: "/",
            handler: "navigation-item.find",
            config: {
                policies: [],
            },
        },
        {
            method: "GET",
            path: "/:idOrSlug",
            handler: "navigation-item.findOne",
            config: {
                policies: [],
            },
        },
    ],
};
exports.default = routes;
//# sourceMappingURL=client.js.map