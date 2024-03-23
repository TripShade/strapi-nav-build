import { Nexus } from "../../types";
type RenderNavigationArgsEnhancer<T> = {
    previousArgs: T;
    nexus: Nexus;
};
export declare const addI18NRenderNavigationArgs: <T>({ previousArgs, nexus, }: RenderNavigationArgsEnhancer<T>) => T & {
    locale: any;
};
export {};
//# sourceMappingURL=graphQLEnhancers.d.ts.map