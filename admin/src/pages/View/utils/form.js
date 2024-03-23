"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFormValidity = void 0;
const helper_plugin_1 = require("@strapi/helper-plugin");
const checkFormValidity = async (data, schema) => {
    let errors = null;
    try {
        await schema.validate(data, { abortEarly: false });
    }
    catch (err) {
        errors = (0, helper_plugin_1.getYupInnerErrors)(err);
    }
    return errors;
};
exports.checkFormValidity = checkFormValidity;
//# sourceMappingURL=form.js.map