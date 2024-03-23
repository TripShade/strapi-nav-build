"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FillNavigationError = exports.DefaultLocaleMissingError = void 0;
const NavigationError_1 = require("../../utils/NavigationError");
class DefaultLocaleMissingError extends NavigationError_1.NavigationError {
    constructor(message = "Default locale is required.") {
        super(message);
    }
}
exports.DefaultLocaleMissingError = DefaultLocaleMissingError;
class FillNavigationError extends NavigationError_1.NavigationError {
}
exports.FillNavigationError = FillNavigationError;
//# sourceMappingURL=errors.js.map