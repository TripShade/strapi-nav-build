"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addI18NRenderNavigationArgs = void 0;
const LOCALE_SCALAR_TYPENAME = 'I18NLocaleCode';
const addI18NRenderNavigationArgs = ({ previousArgs, nexus, }) => ({
    ...previousArgs,
    locale: nexus.arg({ type: LOCALE_SCALAR_TYPENAME }),
});
exports.addI18NRenderNavigationArgs = addI18NRenderNavigationArgs;
//# sourceMappingURL=graphQLEnhancers.js.map