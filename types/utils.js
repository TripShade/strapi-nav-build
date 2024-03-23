"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertString = exports.assertBoolean = exports.assertEntity = exports.assertIsNumber = exports.isNumber = exports.assertNotEmpty = void 0;
const assertNotEmpty = (value, customError) => {
    if (value !== undefined && value !== null) {
        return;
    }
    throw customError ?? new Error("Non-empty value expected, empty given");
};
exports.assertNotEmpty = assertNotEmpty;
const isNumber = (x) => typeof x === "number" && !Number.isNaN(x);
exports.isNumber = isNumber;
const assertIsNumber = (n, customError) => {
    if ((0, exports.isNumber)(n)) {
        return;
    }
    throw customError ?? new Error(`Number is expected. "${typeof n}" given`);
};
exports.assertIsNumber = assertIsNumber;
const assertEntity = (entity, name = "Entity") => {
    if (entity instanceof Object && entity.hasOwnProperty("id")) {
        return entity;
    }
    throw new Error(`${name} instance expected. ${typeof entity} given.`);
};
exports.assertEntity = assertEntity;
function assertBoolean(value) {
    if (typeof value === "boolean") {
        return;
    }
    throw new Error("Value is not of type boolean");
}
exports.assertBoolean = assertBoolean;
function assertString(value) {
    if (typeof value === "string") {
        return;
    }
    throw new Error("Value is not of type string");
}
exports.assertString = assertString;
//# sourceMappingURL=utils.js.map