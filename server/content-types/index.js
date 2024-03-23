"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const navigations_items_related_1 = __importDefault(require("./navigations-items-related"));
const navigation_item_1 = __importDefault(require("./navigation-item"));
const navigation_1 = __importDefault(require("./navigation"));
const audience_1 = __importDefault(require("./audience"));
exports.default = {
    audience: audience_1.default,
    navigation: navigation_1.default,
    "navigation-item": navigation_item_1.default,
    "navigations-items-related": navigations_items_related_1.default
};
//# sourceMappingURL=index.js.map