declare namespace _default {
    function register(app: any): void;
    function bootstrap(): void;
    function registerTrads({ locales }: {
        locales?: any[] | undefined;
    }): {
        data: {
            [x: string]: string;
        };
        locale: any;
    }[];
}
export default _default;
//# sourceMappingURL=index.d.ts.map