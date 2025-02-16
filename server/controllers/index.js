"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = __importDefault(require("./admin"));
const client_1 = __importDefault(require("./client"));
const navigation_item_1 = __importDefault(require("./navigation-item"));
const controllers = {
    admin: admin_1.default,
    client: client_1.default,
    navigationItem: navigation_item_1.default,
};
exports.default = controllers;
//# sourceMappingURL=index.js.map