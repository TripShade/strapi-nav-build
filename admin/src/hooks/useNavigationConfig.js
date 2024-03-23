"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_query_1 = require("react-query");
const helper_plugin_1 = require("@strapi/helper-plugin");
const utils_1 = require("../utils");
const translations_1 = require("../translations");
const useNavigationConfig = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    const toggleNotification = (0, helper_plugin_1.useNotification)();
    const { isLoading, data, error } = (0, react_query_1.useQuery)('navigationConfig', () => (0, utils_1.fetchNavigationConfig)(toggleNotification));
    const handleError = (type) => {
        toggleNotification({
            type: 'warning',
            message: (0, translations_1.getTrad)(`pages.settings.notification.${type}.error`),
        });
    };
    const handleSuccess = async (type) => {
        await queryClient.invalidateQueries('navigationConfig');
        toggleNotification({
            type: 'success',
            message: (0, translations_1.getTrad)(`pages.settings.notification.${type}.success`),
        });
    };
    const submitMutation = async (...args) => {
        try {
            await (0, utils_1.updateNavigationConfig)(...args);
            await handleSuccess('submit');
        }
        catch (e) {
            handleError('submit');
        }
    };
    const restoreMutation = async (...args) => {
        try {
            await (0, utils_1.restoreNavigationConfig)(...args);
            await handleSuccess('restore');
        }
        catch (e) {
            handleError('restore');
        }
    };
    const restartMutation = async (...args) => {
        try {
            await (0, utils_1.restartStrapi)(...args);
            await handleSuccess('restart');
        }
        catch (e) {
            handleError('restart');
        }
    };
    return { data, isLoading, error, submitMutation, restoreMutation, restartMutation };
};
exports.default = useNavigationConfig;
//# sourceMappingURL=useNavigationConfig.js.map