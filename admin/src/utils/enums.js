"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorStatusResourceFor = exports.resolvedResourceFor = exports.ResourceState = exports.ItemTypes = exports.navigationItemAdditionalFields = exports.navigationItemType = void 0;
exports.navigationItemType = {
    INTERNAL: "INTERNAL",
    EXTERNAL: "EXTERNAL",
    WRAPPER: "WRAPPER",
};
exports.navigationItemAdditionalFields = {
    AUDIENCE: 'audience',
};
exports.ItemTypes = {
    NAVIGATION_ITEM: 'navigationItem'
};
exports.ResourceState = {
    RESOLVED: 'RESOLVED',
    LOADING: 'LOADING',
    ERROR: 'ERROR',
};
const resolvedResourceFor = (value) => ({
    type: exports.ResourceState.RESOLVED,
    value,
});
exports.resolvedResourceFor = resolvedResourceFor;
const errorStatusResourceFor = (errors) => ({
    type: exports.ResourceState.ERROR,
    errors,
});
exports.errorStatusResourceFor = errorStatusResourceFor;
//# sourceMappingURL=enums.js.map