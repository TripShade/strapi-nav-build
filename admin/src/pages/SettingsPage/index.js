"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const lodash_1 = require("lodash");
const formik_1 = require("formik");
const helper_plugin_1 = require("@strapi/helper-plugin");
const Main_1 = require("@strapi/design-system/Main");
const Layout_1 = require("@strapi/design-system/Layout");
const Accordion_1 = require("@strapi/design-system/Accordion");
const Button_1 = require("@strapi/design-system/Button");
const Box_1 = require("@strapi/design-system/Box");
const Stack_1 = require("@strapi/design-system/Stack");
const Typography_1 = require("@strapi/design-system/Typography");
const Grid_1 = require("@strapi/design-system/Grid");
const ToggleInput_1 = require("@strapi/design-system/ToggleInput");
const NumberInput_1 = require("@strapi/design-system/NumberInput");
const Select_1 = require("@strapi/design-system/Select");
const Tooltip_1 = require("@strapi/design-system/Tooltip");
const icons_1 = require("@strapi/icons");
const permissions_1 = __importDefault(require("../../permissions"));
const useNavigationConfig_1 = __importDefault(require("../../hooks/useNavigationConfig"));
const useAllContentTypes_1 = __importDefault(require("../../hooks/useAllContentTypes"));
const utils_1 = require("../../utils");
const ConfirmationDialog_1 = __importDefault(require("../../components/ConfirmationDialog"));
const RestartAlert_1 = __importDefault(require("../../components/RestartAlert"));
const utils_2 = require("../../utils");
const functions_1 = require("./utils/functions");
const styles_1 = require("../../components/Alert/styles");
const DisableI18nModal_1 = require("./components/DisableI18nModal");
const CustomFieldModal_1 = __importDefault(require("./components/CustomFieldModal"));
const CustomFieldTable_1 = __importDefault(require("./components/CustomFieldTable"));
const permissions_2 = __importDefault(require("../../permissions"));
const NoAccessPage_1 = __importDefault(require("../NoAccessPage"));
const RESTART_NOT_REQUIRED = { required: false };
const RESTART_REQUIRED = { required: true, reasons: [] };
const RELATION_ATTRIBUTE_TYPES = ['relation', 'media', 'component'];
const STRING_ATTRIBUTE_TYPES = ['string', 'uid'];
const BOX_DEFAULT_PROPS = {
    background: "neutral0",
    hasRadius: true,
    shadow: "filterShadow",
    padding: 6,
};
const noopFallback = () => { };
const SettingsPage = () => {
    const { lockApp = noopFallback, unlockApp = noopFallback } = (0, helper_plugin_1.useOverlayBlocker)();
    const { lockAppWithAutoreload = noopFallback, unlockAppWithAutoreload = noopFallback } = (0, helper_plugin_1.useAutoReloadOverlayBlocker)();
    const [restartStatus, setRestartStatus] = (0, react_1.useState)(RESTART_NOT_REQUIRED);
    const [pruneObsoleteI18nNavigations, setPruneObsoleteI18nNavigations] = (0, react_1.useState)(false);
    const [isCustomFieldModalOpen, setIsCustomFieldModalOpen] = (0, react_1.useState)(false);
    const [customFieldSelected, setCustomFieldSelected] = (0, react_1.useState)(null);
    const [customFields, setCustomFields] = (0, react_1.useState)([]);
    const [isRestorePopupOpen, setIsRestorePopupOpen] = (0, react_1.useState)(false);
    const [contentTypeExpanded, setContentTypeExpanded] = (0, react_1.useState)(undefined);
    const { data: navigationConfigData, isLoading: isConfigLoading, error: configErr, submitMutation, restoreMutation, restartMutation } = (0, useNavigationConfig_1.default)();
    const { data: allContentTypesData, isLoading: isContentTypesLoading, error: contentTypesErr } = (0, useAllContentTypes_1.default)();
    const viewPermissions = (0, react_1.useMemo)(() => ({
        settings: permissions_2.default.settings
    }), []);
    const { isLoading: isLoadingForPermissions, allowedActions: { canSettings: canManageSettings, }, } = (0, helper_plugin_1.useRBAC)(viewPermissions);
    const isLoading = isConfigLoading || isContentTypesLoading;
    const isError = configErr || contentTypesErr;
    const configContentTypes = navigationConfigData?.contentTypes || [];
    const formikInitialValues = (0, react_1.useMemo)(() => ({
        allowedLevels: (0, lodash_1.get)(navigationConfigData, "allowedLevels", 2),
        audienceFieldChecked: (0, lodash_1.get)(navigationConfigData, "additionalFields", []).includes(utils_1.navigationItemAdditionalFields.AUDIENCE),
        cascadeMenuAttachedChecked: (0, lodash_1.get)(navigationConfigData, "cascadeMenuAttached", true),
        i18nEnabled: (0, lodash_1.get)(navigationConfigData, "i18nEnabled", false),
        nameFields: (0, lodash_1.get)(navigationConfigData, "contentTypesNameFields", {}),
        pathDefaultFields: (0, lodash_1.get)(navigationConfigData, "pathDefaultFields", {}),
        populate: (0, lodash_1.get)(navigationConfigData, "contentTypesPopulate", {}),
        selectedContentTypes: configContentTypes.map(item => item.uid),
    }), [configContentTypes, navigationConfigData, utils_1.navigationItemAdditionalFields]);
    const { disableI18nModal, setDisableI18nModalOpened, setI18nModalOnCancel, } = (0, DisableI18nModal_1.useDisableI18nModal)(({ pruneNavigations }) => {
        setPruneObsoleteI18nNavigations(pruneNavigations);
    });
    (0, react_1.useEffect)(() => {
        const additionalFields = navigationConfigData?.additionalFields
            ?.filter((field) => field !== utils_1.navigationItemAdditionalFields.AUDIENCE);
        setCustomFields(additionalFields || []);
    }, [navigationConfigData]);
    const preparePayload = (0, react_1.useCallback)(({ form: { allowedLevels, audienceFieldChecked, cascadeMenuAttachedChecked, i18nEnabled, nameFields, pathDefaultFields, populate, selectedContentTypes, }, pruneObsoleteI18nNavigations }) => ({
        additionalFields: audienceFieldChecked ? ['audience', ...customFields] : [...customFields],
        allowedLevels,
        cascadeMenuAttached: cascadeMenuAttachedChecked,
        contentTypes: selectedContentTypes,
        contentTypesNameFields: nameFields,
        contentTypesPopulate: populate,
        i18nEnabled,
        pathDefaultFields,
        pruneObsoleteI18nNavigations,
        gql: {
            navigationItemRelated: selectedContentTypes.map((uid) => (0, functions_1.resolveGlobalLikeId)(uid)),
        }
    }), [customFields]);
    const onSave = async (form) => {
        lockApp();
        const payload = preparePayload({ form, pruneObsoleteI18nNavigations });
        await submitMutation({ body: payload });
        const isContentTypesChanged = !(0, lodash_1.isEqual)(payload.contentTypes, navigationConfigData.contentTypes);
        const isI18nChanged = !(0, lodash_1.isEqual)(payload.i18nEnabled, navigationConfigData.i18nEnabled);
        const restartReasons = [];
        if (isI18nChanged) {
            restartReasons.push('I18N');
        }
        if (isContentTypesChanged && navigationConfigData.isGQLPluginEnabled) {
            restartReasons.push('GRAPH_QL');
        }
        if (pruneObsoleteI18nNavigations) {
            restartReasons.push('I18N_NAVIGATIONS_PRUNE');
        }
        if (restartReasons.length) {
            setRestartStatus({
                ...RESTART_REQUIRED,
                reasons: restartReasons,
            });
        }
        setDisableI18nModalOpened(false);
        setPruneObsoleteI18nNavigations(false);
        unlockApp();
    };
    const onPopupClose = async (isConfirmed) => {
        setIsRestorePopupOpen(false);
        if (isConfirmed) {
            lockApp();
            await restoreMutation();
            unlockApp();
            setRestartStatus(RESTART_REQUIRED);
        }
    };
    const handleRestart = async () => {
        lockAppWithAutoreload();
        await restartMutation();
        unlockAppWithAutoreload();
        setRestartStatus(RESTART_NOT_REQUIRED);
    };
    const handleRestartDiscard = () => setRestartStatus(RESTART_NOT_REQUIRED);
    const handleSetContentTypeExpanded = key => setContentTypeExpanded(key === contentTypeExpanded ? undefined : key);
    if (!(isLoadingForPermissions || canManageSettings)) {
        return (react_1.default.createElement(NoAccessPage_1.default, null));
    }
    if (isLoading || isError) {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(helper_plugin_1.SettingsPageTitle, { name: (0, utils_2.getMessage)('Settings.email.plugin.title', 'Configuration') }),
            react_1.default.createElement(helper_plugin_1.LoadingIndicatorPage, null, "Fetching plugin config...")));
    }
    const allContentTypes = !isLoading ? (0, lodash_1.sortBy)(Object.values(allContentTypesData).filter(({ uid }) => (0, functions_1.isContentTypeEligible)(uid, {
        allowedContentTypes: navigationConfigData?.allowedContentTypes,
        restrictedContentTypes: navigationConfigData?.restrictedContentTypes,
    })).map(ct => {
        const type = configContentTypes.find(_ => _.uid === ct.uid);
        if (type) {
            const { available, isSingle } = type;
            return {
                ...ct,
                available,
                isSingle,
            };
        }
        return ct;
    }), ct => ct.info.displayName) : [];
    const isI18NPluginEnabled = navigationConfigData?.isI18NPluginEnabled;
    const defaultLocale = navigationConfigData?.defaultLocale;
    const handleSubmitCustomField = (field) => {
        const filteredFields = customFields.filter(f => f.name !== field.name);
        setCustomFields([...filteredFields, field]);
        setCustomFieldSelected(null);
        setIsCustomFieldModalOpen(false);
    };
    const handleOpenCustomFieldModal = (field) => {
        setCustomFieldSelected(field);
        setIsCustomFieldModalOpen(true);
    };
    const handleRemoveCustomField = (field) => {
        const filteredFields = customFields.filter(f => f.name !== field.name);
        setCustomFields(filteredFields);
        setCustomFieldSelected(null);
        setIsCustomFieldModalOpen(false);
    };
    const handleToggleCustomField = (field) => {
        const updatedField = { ...field, enabled: !(0, lodash_1.get)(field, 'enabled', false) };
        const filteredFields = customFields.filter(f => f.name !== field.name);
        setCustomFields([...filteredFields, updatedField]);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(helper_plugin_1.SettingsPageTitle, { name: (0, utils_2.getMessage)('Settings.email.plugin.title', 'Configuration') }),
        react_1.default.createElement(Main_1.Main, { labelledBy: "title" },
            react_1.default.createElement(formik_1.Formik, { initialValues: formikInitialValues, onSubmit: onSave }, ({ handleSubmit, setFieldValue, values }) => (react_1.default.createElement(formik_1.Form, { noValidate: true, onSubmit: handleSubmit },
                react_1.default.createElement(Layout_1.HeaderLayout, { title: (0, utils_2.getMessage)('pages.settings.header.title'), subtitle: (0, utils_2.getMessage)('pages.settings.header.description'), primaryAction: react_1.default.createElement(helper_plugin_1.CheckPermissions, { permissions: permissions_1.default.access },
                        react_1.default.createElement(Button_1.Button, { type: "submit", startIcon: react_1.default.createElement(icons_1.Check, null), disabled: restartStatus.required }, (0, utils_2.getMessage)('pages.settings.actions.submit'))) }),
                react_1.default.createElement(Layout_1.ContentLayout, null,
                    react_1.default.createElement(Stack_1.Stack, { spacing: 7 },
                        restartStatus.required && (react_1.default.createElement(RestartAlert_1.default, { closeLabel: (0, utils_2.getMessage)('pages.settings.actions.restart.alert.cancel'), title: (0, utils_2.getMessage)('pages.settings.actions.restart.alert.title'), action: react_1.default.createElement(Box_1.Box, null,
                                react_1.default.createElement(Button_1.Button, { onClick: handleRestart, startIcon: react_1.default.createElement(icons_1.Play, null) }, (0, utils_2.getMessage)('pages.settings.actions.restart'))), onClose: handleRestartDiscard },
                            react_1.default.createElement(react_1.default.Fragment, null,
                                react_1.default.createElement(Box_1.Box, { paddingBottom: 1 }, (0, utils_2.getMessage)('pages.settings.actions.restart.alert.description')),
                                restartStatus.reasons?.map((reason, i) => react_1.default.createElement(Box_1.Box, { paddingBottom: 1, key: i, children: (0, utils_2.getMessage)(`pages.settings.actions.restart.alert.reason.${reason}`) }))))),
                        react_1.default.createElement(Box_1.Box, { ...BOX_DEFAULT_PROPS },
                            react_1.default.createElement(Stack_1.Stack, { size: 4 },
                                react_1.default.createElement(Typography_1.Typography, { variant: "delta", as: "h2" }, (0, utils_2.getMessage)('pages.settings.general.title')),
                                react_1.default.createElement(Grid_1.Grid, { gap: 4 },
                                    react_1.default.createElement(Grid_1.GridItem, { col: 12, s: 12, xs: 12 },
                                        react_1.default.createElement(Select_1.Select, { name: "selectedContentTypes", label: (0, utils_2.getMessage)('pages.settings.form.contentTypes.label'), placeholder: (0, utils_2.getMessage)('pages.settings.form.contentTypes.placeholder'), hint: (0, utils_2.getMessage)('pages.settings.form.contentTypes.hint'), onClear: () => setFieldValue('selectedContentTypes', [], false), value: values.selectedContentTypes, onChange: (value) => setFieldValue('selectedContentTypes', value, false), multi: true, withTags: true, disabled: restartStatus.required }, allContentTypes.map((item) => react_1.default.createElement(Select_1.Option, { key: item.uid, value: item.uid }, item.info.displayName)))),
                                    !(0, lodash_1.isEmpty)(values.selectedContentTypes) && (react_1.default.createElement(Grid_1.GridItem, { col: 12 },
                                        react_1.default.createElement(Accordion_1.AccordionGroup, { label: (0, utils_2.getMessage)('pages.settings.form.contentTypesSettings.label'), labelAction: react_1.default.createElement(Tooltip_1.Tooltip, { description: (0, utils_2.getMessage)('pages.settings.form.contentTypesSettings.tooltip') },
                                                react_1.default.createElement(icons_1.Information, { "aria-hidden": true })) }, (0, lodash_1.orderBy)(values.selectedContentTypes).map(uid => {
                                            const contentType = allContentTypes.find(item => item.uid == uid);
                                            if (!contentType)
                                                return;
                                            const { info: { displayName }, available, isSingle } = contentType;
                                            const attributeKeys = Object.keys(contentType.attributes).sort();
                                            const stringAttributes = attributeKeys.filter(key => STRING_ATTRIBUTE_TYPES.includes(contentType.attributes[key].type));
                                            const relationAttributes = attributeKeys.filter(key => RELATION_ATTRIBUTE_TYPES.includes(contentType.attributes[key].type));
                                            const key = `collectionSettings-${uid}`;
                                            return (react_1.default.createElement(Accordion_1.Accordion, { expanded: contentTypeExpanded === key, toggle: () => handleSetContentTypeExpanded(key), key: key, id: key, size: "S" },
                                                react_1.default.createElement(Accordion_1.AccordionToggle, { title: displayName, togglePosition: "left", startIcon: (isSingle && !available) ? (react_1.default.createElement(icons_1.ExclamationMarkCircle, { "aria-hidden": true })) : null }),
                                                react_1.default.createElement(Accordion_1.AccordionContent, null,
                                                    react_1.default.createElement(Box_1.Box, { padding: 6 },
                                                        react_1.default.createElement(Stack_1.Stack, { size: 4 },
                                                            (isSingle && !available) && (react_1.default.createElement(styles_1.PermanentAlert, { title: (0, utils_2.getMessage)('pages.settings.form.contentTypesSettings.initializationWarning.title'), variant: "danger", onClose: (e) => e.preventDefault() }, (0, utils_2.getMessage)('pages.settings.form.contentTypesSettings.initializationWarning.content'))),
                                                            react_1.default.createElement(Select_1.Select, { name: `collectionSettings-${uid}-entryLabel`, label: (0, utils_2.getMessage)('pages.settings.form.nameField.label'), hint: (0, utils_2.getMessage)(`pages.settings.form.nameField.${(0, lodash_1.isEmpty)(stringAttributes) ? 'empty' : 'hint'}`), placeholder: (0, utils_2.getMessage)('pages.settings.form.nameField.placeholder'), onClear: () => setFieldValue('nameFields', (0, utils_1.prepareNewValueForRecord)(uid, values.nameFields, [])), value: values.nameFields[uid] || [], onChange: (value) => setFieldValue('nameFields', (0, utils_1.prepareNewValueForRecord)(uid, values.nameFields, value)), multi: true, withTags: true, disabled: restartStatus.required || (0, lodash_1.isEmpty)(stringAttributes) }, stringAttributes.map(key => (react_1.default.createElement(Select_1.Option, { key: uid + key, value: key }, (0, lodash_1.capitalize)(key.split('_').join(' ')))))),
                                                            react_1.default.createElement(Select_1.Select, { name: `collectionSettings-${uid}-populate`, label: (0, utils_2.getMessage)('pages.settings.form.populate.label'), hint: (0, utils_2.getMessage)(`pages.settings.form.populate.${(0, lodash_1.isEmpty)(relationAttributes) ? 'empty' : 'hint'}`), placeholder: (0, utils_2.getMessage)('pages.settings.form.populate.placeholder'), onClear: () => setFieldValue('populate', (0, utils_1.prepareNewValueForRecord)(uid, values.populate, [])), value: values.populate[uid] || [], onChange: (value) => setFieldValue('populate', (0, utils_1.prepareNewValueForRecord)(uid, values.populate, value)), multi: true, withTags: true, disabled: restartStatus.required || (0, lodash_1.isEmpty)(relationAttributes) }, relationAttributes.map(key => (react_1.default.createElement(Select_1.Option, { key: uid + key, value: key }, (0, lodash_1.capitalize)(key.split('_').join(' ')))))),
                                                            react_1.default.createElement(Select_1.Select, { name: `collectionSettings-${uid}-pathDefaultFields`, label: (0, utils_2.getMessage)('pages.settings.form.pathDefaultFields.label'), hint: (0, utils_2.getMessage)(`pages.settings.form.pathDefaultFields.${(0, lodash_1.isEmpty)(stringAttributes) ? 'empty' : 'hint'}`), placeholder: (0, utils_2.getMessage)('pages.settings.form.pathDefaultFields.placeholder'), onClear: () => setFieldValue('pathDefaultFields', (0, utils_1.prepareNewValueForRecord)(uid, values.pathDefaultFields, [])), value: values.pathDefaultFields[uid] || [], onChange: (value) => setFieldValue('pathDefaultFields', (0, utils_1.prepareNewValueForRecord)(uid, values.pathDefaultFields, value)), multi: true, withTags: true, disabled: restartStatus.required || (0, lodash_1.isEmpty)(stringAttributes) }, stringAttributes.map(key => (react_1.default.createElement(Select_1.Option, { key: uid + key, value: key }, (0, lodash_1.capitalize)(key.split('_').join(' ')))))))))));
                                        }))))))),
                        react_1.default.createElement(Box_1.Box, { ...BOX_DEFAULT_PROPS },
                            react_1.default.createElement(Stack_1.Stack, { size: 4 },
                                react_1.default.createElement(Typography_1.Typography, { variant: "delta", as: "h2" }, (0, utils_2.getMessage)('pages.settings.additional.title')),
                                react_1.default.createElement(Grid_1.Grid, { gap: 4 },
                                    react_1.default.createElement(Grid_1.GridItem, { col: 4, s: 6, xs: 12 },
                                        react_1.default.createElement(Box_1.Box, { style: { maxWidth: 257 } },
                                            react_1.default.createElement(NumberInput_1.NumberInput, { name: "allowedLevels", label: (0, utils_2.getMessage)('pages.settings.form.allowedLevels.label'), placeholder: (0, utils_2.getMessage)('pages.settings.form.allowedLevels.placeholder'), hint: (0, utils_2.getMessage)('pages.settings.form.allowedLevels.hint'), onValueChange: (value) => setFieldValue('allowedLevels', value, false), value: values.allowedLevels, disabled: restartStatus.required }))),
                                    react_1.default.createElement(Grid_1.GridItem, { col: 4, s: 12, xs: 12 },
                                        react_1.default.createElement(ToggleInput_1.ToggleInput, { name: "cascadeMenuAttachedChecked", label: (0, utils_2.getMessage)('pages.settings.form.cascadeMenuAttached.label'), hint: (0, utils_2.getMessage)('pages.settings.form.cascadeMenuAttached.hint'), checked: values.cascadeMenuAttachedChecked, onChange: ({ target: { checked } }) => {
                                                setFieldValue('cascadeMenuAttachedChecked', checked, true);
                                            }, onLabel: "Enabled", offLabel: "Disabled", disabled: restartStatus.required }))),
                                react_1.default.createElement(Grid_1.Grid, { gap: 4 },
                                    react_1.default.createElement(Grid_1.GridItem, { col: 4, s: 12, xs: 12 },
                                        react_1.default.createElement(ToggleInput_1.ToggleInput, { name: "audienceFieldChecked", label: (0, utils_2.getMessage)('pages.settings.form.audience.label'), hint: (0, utils_2.getMessage)('pages.settings.form.audience.hint'), checked: values.audienceFieldChecked, onChange: () => setFieldValue('audienceFieldChecked', !values.audienceFieldChecked, false), onLabel: "Enabled", offLabel: "Disabled", disabled: restartStatus.required })),
                                    isI18NPluginEnabled && (react_1.default.createElement(Grid_1.GridItem, { col: 4, s: 12, xs: 12 },
                                        react_1.default.createElement(ToggleInput_1.ToggleInput, { name: "i18nEnabled", label: (0, utils_2.getMessage)('pages.settings.form.i18n.label'), hint: defaultLocale
                                                ? (0, utils_2.getMessage)('pages.settings.form.i18n.hint')
                                                : (0, utils_2.getMessage)('pages.settings.form.i18n.hint.missingDefaultLocale'), checked: values.i18nEnabled, onChange: ({ target: { checked } }) => {
                                                setFieldValue('i18nEnabled', checked, false);
                                                if (checked) {
                                                    setPruneObsoleteI18nNavigations(false);
                                                }
                                                else {
                                                    setDisableI18nModalOpened(true);
                                                    setI18nModalOnCancel(() => () => {
                                                        setFieldValue('i18nEnabled', true);
                                                    });
                                                }
                                            }, onLabel: "Enabled", offLabel: "Disabled", disabled: restartStatus.required || !defaultLocale })))))),
                        react_1.default.createElement(Box_1.Box, { ...BOX_DEFAULT_PROPS },
                            react_1.default.createElement(Stack_1.Stack, { size: 4 },
                                react_1.default.createElement(Typography_1.Typography, { variant: "delta", as: "h2" }, (0, utils_2.getMessage)('pages.settings.customFields.title')),
                                react_1.default.createElement(CustomFieldTable_1.default, { data: customFields, onOpenModal: handleOpenCustomFieldModal, onRemoveCustomField: handleRemoveCustomField, onToggleCustomField: handleToggleCustomField }))),
                        react_1.default.createElement(Box_1.Box, { ...BOX_DEFAULT_PROPS },
                            react_1.default.createElement(Stack_1.Stack, { size: 4 },
                                react_1.default.createElement(Typography_1.Typography, { variant: "delta", as: "h2" }, (0, utils_2.getMessage)('pages.settings.restoring.title')),
                                react_1.default.createElement(Grid_1.Grid, { gap: 4 },
                                    react_1.default.createElement(Grid_1.GridItem, { col: 12, s: 12, xs: 12 },
                                        react_1.default.createElement(Typography_1.Typography, null, (0, utils_2.getMessage)('pages.settings.actions.restore.description'))),
                                    react_1.default.createElement(Grid_1.GridItem, { col: 6, s: 12, xs: 12 },
                                        react_1.default.createElement(helper_plugin_1.CheckPermissions, { permissions: permissions_1.default.access },
                                            react_1.default.createElement(Button_1.Button, { variant: "danger-light", startIcon: react_1.default.createElement(icons_1.Refresh, null), onClick: () => setIsRestorePopupOpen(true) }, (0, utils_2.getMessage)('pages.settings.actions.restore'))),
                                        react_1.default.createElement(ConfirmationDialog_1.default, { isVisible: isRestorePopupOpen, header: (0, utils_2.getMessage)('pages.settings.actions.restore.confirmation.header'), labelConfirm: (0, utils_2.getMessage)('pages.settings.actions.restore.confirmation.confirm'), iconConfirm: react_1.default.createElement(icons_1.Refresh, null), onConfirm: () => onPopupClose(true), onCancel: () => onPopupClose(false) }, (0, utils_2.getMessage)('pages.settings.actions.restore.confirmation.description')),
                                        disableI18nModal)))))))))),
        isCustomFieldModalOpen &&
            react_1.default.createElement(CustomFieldModal_1.default, { onClose: () => setIsCustomFieldModalOpen(false), onSubmit: handleSubmitCustomField, isOpen: isCustomFieldModalOpen, data: customFieldSelected, usedCustomFieldNames: customFields.filter(f => f.name !== customFieldSelected?.name).map(f => f.name) })));
};
exports.default = SettingsPage;
//# sourceMappingURL=index.js.map