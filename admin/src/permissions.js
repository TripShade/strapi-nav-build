"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const permissions_1 = __importDefault(require("../../permissions"));
const pluginPermissions = {
    access: [{ action: permissions_1.default.render(permissions_1.default.navigation.read), subject: null }],
    update: [{ action: permissions_1.default.render(permissions_1.default.navigation.update), subject: null }],
    settings: [{ action: permissions_1.default.render(permissions_1.default.navigation.settings), subject: null }],
};
exports.default = pluginPermissions;
//# sourceMappingURL=permissions.js.map