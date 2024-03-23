"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_query_1 = require("react-query");
const lodash_1 = require("lodash");
const utils_1 = require("../utils");
const useAllContentTypes = () => (0, lodash_1.pick)((0, react_query_1.useQuery)('contentTypes', () => (0, utils_1.fetchAllContentTypes)()), ["data", "isLoading", "error"]);
exports.default = useAllContentTypes;
//# sourceMappingURL=useAllContentTypes.js.map