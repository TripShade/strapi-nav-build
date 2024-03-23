"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allLifecycleHooks = exports.RENDER_TYPES = exports.DEFAULT_NAVIGATION_ITEM = exports.DEFAULT_POPULATE = exports.CONTENT_TYPES_NAME_FIELDS_DEFAULTS = exports.EXCLUDED_CONTENT_TYPES = exports.RESTRICTED_CONTENT_TYPES = exports.ALLOWED_CONTENT_TYPES = exports.KIND_TYPES = exports.MODEL_TYPES = exports.TEMPLATE_DEFAULT = void 0;
const i18n_1 = require("../i18n");
exports.TEMPLATE_DEFAULT = 'Generic';
exports.MODEL_TYPES = { CONTENT_TYPE: 'contentType' };
exports.KIND_TYPES = { SINGLE: 'singleType', COLLECTION: 'collectionType' };
exports.ALLOWED_CONTENT_TYPES = ['api::', 'plugin::'];
exports.RESTRICTED_CONTENT_TYPES = ['plugin::users-permissions', 'plugin::i18n.locale', 'plugin::navigation'];
exports.EXCLUDED_CONTENT_TYPES = ['strapi::'];
exports.CONTENT_TYPES_NAME_FIELDS_DEFAULTS = ['title', 'subject', 'name'];
exports.DEFAULT_POPULATE = [...i18n_1.I18N_DEFAULT_POPULATE];
exports.DEFAULT_NAVIGATION_ITEM = {
    name: "Main navigation",
    slug: "main-navigation",
    visible: true,
};
exports.RENDER_TYPES = {
    FLAT: 'FLAT',
    TREE: 'TREE',
    RFR: 'RFR'
};
exports.allLifecycleHooks = [
    "beforeCreate",
    "beforeCreateMany",
    "afterCreate",
    "afterCreateMany",
    "beforeUpdate",
    "beforeUpdateMany",
    "afterUpdate",
    "afterUpdateMany",
    "beforeDelete",
    "beforeDeleteMany",
    "afterDelete",
    "afterDeleteMany",
    "beforeCount",
    "afterCount",
    "beforeFindOne",
    "afterFindOne",
    "beforeFindMany",
    "afterFindMany",
];
//# sourceMappingURL=constant.js.map