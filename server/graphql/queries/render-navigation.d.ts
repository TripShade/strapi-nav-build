declare function _exports({ strapi, nexus }: {
    strapi: any;
    nexus: any;
}): {
    args: {
        navigationIdOrSlug: any;
        type: string;
        menuOnly: any;
        path: any;
    };
    type: any;
    resolve(obj: any, { navigationIdOrSlug: idOrSlug, type, menuOnly, path: rootPath, locale }: {
        navigationIdOrSlug: any;
        type: any;
        menuOnly: any;
        path: any;
        locale: any;
    }): Promise<any>;
};
export = _exports;
//# sourceMappingURL=render-navigation.d.ts.map