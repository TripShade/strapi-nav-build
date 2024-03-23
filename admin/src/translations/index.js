"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrad = exports.getTradId = void 0;
const pluginId_1 = __importDefault(require("../pluginId"));
const en_json_1 = __importDefault(require("./en.json"));
const fr_json_1 = __importDefault(require("./fr.json"));
const ca_json_1 = __importDefault(require("./ca.json"));
const trads = {
    en: en_json_1.default,
    fr: fr_json_1.default,
    ca: ca_json_1.default,
};
const getTradId = (msg) => `${pluginId_1.default}.${msg}`;
exports.getTradId = getTradId;
const getTrad = (msg, defaultMessage) => ({ id: (0, exports.getTradId)(msg), defaultMessage: defaultMessage || (0, exports.getTradId)(msg) });
exports.getTrad = getTrad;
exports.default = trads;
//# sourceMappingURL=index.js.map