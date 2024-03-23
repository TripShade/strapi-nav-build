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
const fp_1 = require("lodash/fp");
const formik_1 = require("formik");
const ModalLayout_1 = require("@strapi/design-system/ModalLayout");
const Select_1 = require("@strapi/design-system/Select");
const Grid_1 = require("@strapi/design-system/Grid");
const helper_plugin_1 = require("@strapi/helper-plugin");
const Button_1 = require("@strapi/design-system/Button");
const NavigationItemPopupFooter_1 = require("../NavigationItemPopup/NavigationItemPopupFooter");
const utils_1 = require("../../../../utils");
const parsers_1 = require("../../utils/parsers");
const formDefinition = __importStar(require("./utils/form"));
const form_1 = require("../../utils/form");
const translations_1 = require("../../../../translations");
const types_1 = require("../../../../../../types");
const AdditionalFieldInput_1 = __importDefault(require("../../../../components/AdditionalFieldInput"));
const utils_2 = require("../../../../utils");
const NavigationItemForm = ({ config, availableLocale, isLoading: isPreloading, inputsPrefix, data, contentTypes = [], contentTypeEntities = [], usedContentTypeEntities = [], availableAudience = [], additionalFields = [], contentTypesNameFields = {}, onSubmit, onCancel, getContentTypeEntities, usedContentTypesData, appendLabelPublicationStatus = appendLabelPublicationStatusFallback, locale, readNavigationItemFromLocale, slugify, permissions = {}, }) => {
    const [isLoading, setIsLoading] = (0, react_1.useState)(isPreloading);
    const [hasBeenInitialized, setInitializedState] = (0, react_1.useState)(false);
    const [autoSync, setAutoSync] = (0, react_1.useState)(true);
    const [hasChanged, setChangedState] = (0, react_1.useState)(false);
    const [contentTypeSearchQuery, setContentTypeSearchQuery] = (0, react_1.useState)(undefined);
    const { canUpdate } = permissions;
    const formik = (0, formik_1.useFormik)({
        initialValues: formDefinition.defaultValues,
        onSubmit: loadingAware(async (payload) => onSubmit(await sanitizePayload(slugify, payload, data)), setIsLoading),
        validate: loadingAware(async (values) => (0, form_1.checkFormValidity)(await sanitizePayload(slugify, values, {}), formDefinition.schemaFactory(isSingleSelected, additionalFields)), setIsLoading),
        validateOnChange: false,
    });
    const initialRelatedTypeSelected = (0, lodash_1.get)(data, 'relatedType.value');
    const relatedTypeSelectValue = formik.values.relatedType;
    const relatedSelectValue = formik.values.related;
    const isI18nBootstrapAvailable = !!(config.i18nEnabled && availableLocale && availableLocale.length);
    const availableLocaleOptions = (0, react_1.useMemo)(() => availableLocale.map((locale, index) => ({
        key: `${locale}-${index}`,
        value: locale,
        label: locale,
        metadatas: {
            intlLabel: {
                id: `i18n.locale.${locale}`,
                defaultMessage: locale,
            },
            hidden: false,
            disabled: false,
        },
    })), [availableLocale]);
    const relatedFieldName = `${inputsPrefix}related`;
    if (!hasBeenInitialized && !(0, lodash_1.isEmpty)(data)) {
        setInitializedState(true);
        formik.setValues({
            type: (0, lodash_1.get)(data, "type", formDefinition.defaultValues.type),
            related: (0, lodash_1.get)(data, "related.value", formDefinition.defaultValues.related),
            relatedType: (0, lodash_1.get)(data, "relatedType.value", formDefinition.defaultValues.relatedType),
            audience: (0, lodash_1.get)(data, "audience", formDefinition.defaultValues.audience).map((item) => (0, lodash_1.isObject)(item) ? item.id.toString() : item.toString()),
            additionalFields: (0, utils_1.getDefaultCustomFields)({
                additionalFields,
                customFieldsValues: (0, lodash_1.get)(data, "additionalFields", []),
                defaultCustomFieldsValues: formDefinition.defaultValues.additionalFields
            }),
            menuAttached: (0, lodash_1.get)(data, "menuAttached", formDefinition.defaultValues.menuAttached),
            path: (0, lodash_1.get)(data, "path", formDefinition.defaultValues.path),
            externalPath: (0, lodash_1.get)(data, "externalPath", formDefinition.defaultValues.externalPath),
            title: (0, lodash_1.get)(data, "title", formDefinition.defaultValues.title),
            updated: formDefinition.defaultValues.updated,
        });
    }
    const audienceOptions = (0, react_1.useMemo)(() => availableAudience.map((item) => ({
        value: (0, lodash_1.get)(item, 'id', " "),
        label: (0, lodash_1.get)(item, 'name', " "),
    })), [availableAudience]);
    const generatePreviewPath = () => {
        if (!isExternal) {
            const itemPath = (0, lodash_1.isEmpty)(formik.values.path) || formik.values.path === '/'
                ? getDefaultPath()
                : formik.values.path || "";
            const value = `${data.levelPath !== '/' ? `${data.levelPath}` : ''}/${itemPath}`;
            return {
                id: (0, translations_1.getTradId)('popup.item.form.type.external.description'),
                defaultMessage: '',
                values: { value }
            };
        }
        return undefined;
    };
    const getDefaultTitle = (0, react_1.useCallback)((related, relatedType, isSingleSelected) => {
        let selectedEntity;
        if (isSingleSelected) {
            selectedEntity = contentTypeEntities.find(_ => (_.uid === relatedType) || (_.__collectionUid === relatedType));
            if (!selectedEntity) {
                return contentTypes.find(_ => _.uid === relatedType)?.label;
            }
        }
        else {
            selectedEntity = {
                ...contentTypeEntities.find(_ => _.id === related),
                __collectionUid: relatedType
            };
        }
        return (0, parsers_1.extractRelatedItemLabel)(selectedEntity, contentTypesNameFields, { contentTypes });
    }, [contentTypeEntities, contentTypesNameFields, contentTypes]);
    const sanitizePayload = async (slugify, payload, data) => {
        const { related, relatedType, menuAttached, type, ...purePayload } = payload;
        const relatedId = related;
        const singleRelatedItem = isSingleSelected ? (0, lodash_1.first)(contentTypeEntities) : undefined;
        const relatedCollectionType = relatedType;
        const title = !!payload.title?.trim()
            ? payload.title
            : getDefaultTitle(related, relatedType, isSingleSelected);
        const uiRouterKey = await generateUiRouterKey(slugify, title, relatedId, relatedCollectionType);
        return {
            ...data,
            ...purePayload,
            title,
            type,
            menuAttached: (0, lodash_1.isNil)(menuAttached) ? false : menuAttached,
            path: type !== utils_1.navigationItemType.EXTERNAL ? purePayload.path || getDefaultPath() : undefined,
            externalPath: type === utils_1.navigationItemType.EXTERNAL ? purePayload.externalPath : undefined,
            related: type === utils_1.navigationItemType.INTERNAL ? relatedId : undefined,
            relatedType: type === utils_1.navigationItemType.INTERNAL ? relatedCollectionType : undefined,
            isSingle: isSingleSelected,
            singleRelatedItem,
            uiRouterKey,
        };
    };
    const onChange = ({ name, value }) => {
        formik.setValues(prevState => ({
            ...prevState,
            updated: true,
            [name]: value,
        }));
        if (name === "related" && relatedTypeSelectValue && autoSync) {
            const { contentTypesNameFields, pathDefaultFields } = config;
            const selectedRelated = contentTypeEntities.find(({ id, __collectionUid }) => `${id}` === `${value}` && __collectionUid === relatedTypeSelectValue);
            const newPath = pathDefaultFields[relatedTypeSelectValue]?.reduce((acc, field) => {
                return acc ? acc : selectedRelated?.[field];
            }, null);
            const newTitle = (contentTypesNameFields[relatedTypeSelectValue] ?? []).concat(contentTypesNameFields.default || []).reduce((acc, field) => {
                return acc ? acc : selectedRelated?.[field];
            }, null);
            const batch = [];
            if (newPath) {
                batch.push({ name: "path", value: newPath });
            }
            if (newTitle) {
                batch.push({ name: "title", value: newTitle });
            }
            batch.forEach((next, i) => {
                setTimeout(() => {
                    onChange(next);
                }, i * 100);
            });
        }
        if (name === "type") {
            formik.setErrors({});
        }
        if (!hasChanged) {
            setChangedState(true);
        }
    };
    const getDefaultPath = (0, react_1.useCallback)(() => {
        if (formik.values.type !== "INTERNAL")
            return "";
        (0, types_1.assertString)(relatedTypeSelectValue);
        const pathDefaultFields = (0, lodash_1.get)(config, ["pathDefaultFields", relatedTypeSelectValue], []);
        if ((0, lodash_1.isEmpty)(formik.values.path) && !(0, lodash_1.isEmpty)(pathDefaultFields)) {
            const selectedEntity = isSingleSelected
                ? (0, lodash_1.first)(contentTypeEntities)
                : contentTypeEntities.find(i => String(i.id) === relatedSelectValue);
            const pathDefaultValues = pathDefaultFields
                .map((field) => (0, lodash_1.get)(selectedEntity, field, ""))
                .filter(value => !(0, lodash_1.isNil)(value) && String(value).match(/^\S+$/));
            return String((0, lodash_1.first)(pathDefaultValues) || "");
        }
        return "";
    }, [relatedTypeSelectValue, formik, config]);
    const onAudienceChange = (0, react_1.useCallback)((value) => {
        onChange({ name: "audience", value });
    }, [onChange]);
    const onAdditionalFieldChange = (name, newValue, fieldType) => {
        const fieldsValue = formik.values.additionalFields;
        const value = {
            ...fieldsValue,
            [name]: fieldType === "media" && newValue ? JSON.stringify(newValue) : newValue
        };
        onChange({
            name: "additionalFields",
            value,
        });
    };
    const generateUiRouterKey = async (slugify, title, related, relatedType) => {
        if (title) {
            return (0, lodash_1.isString)(title) && !(0, lodash_1.isEmpty)(title) ? await slugify(title).then((0, fp_1.prop)("slug")) : undefined;
        }
        else if (related) {
            const relationTitle = (0, parsers_1.extractRelatedItemLabel)({
                ...contentTypeEntities.find(_ => String(_.id) === String(related)),
                __collectionUid: relatedType
            }, contentTypesNameFields, { contentTypes });
            return (0, lodash_1.isString)(relationTitle) && !(0, lodash_1.isEmpty)(relationTitle) ? await slugify(relationTitle).then((0, fp_1.prop)("slug")) : undefined;
        }
        return undefined;
    };
    const isSingleSelected = (0, react_1.useMemo)(() => relatedTypeSelectValue ? contentTypes.find(_ => _.uid === relatedTypeSelectValue)?.isSingle || false : false, [relatedTypeSelectValue, contentTypes]);
    const navigationItemTypeOptions = Object.keys(utils_1.navigationItemType).map((key) => {
        const value = utils_1.navigationItemType[key].toLowerCase();
        return {
            key,
            value: utils_1.navigationItemType[key],
            metadatas: {
                intlLabel: {
                    id: (0, translations_1.getTradId)(`popup.item.form.type.${value}.label`),
                    defaultMessage: (0, translations_1.getTradId)(`popup.item.form.type.${value}.label`),
                },
                hidden: false,
                disabled: false,
            }
        };
    });
    const relatedSelectOptions = (0, lodash_1.sortBy)(contentTypeEntities
        .filter((item) => {
        const usedContentTypeEntitiesOfSameType = usedContentTypeEntities
            .filter(uctItem => relatedTypeSelectValue === uctItem.__collectionUid);
        return !(0, lodash_1.find)(usedContentTypeEntitiesOfSameType, uctItem => (item.id === uctItem.id && uctItem.id !== formik.values.related));
    })
        .map((item) => {
        const label = appendLabelPublicationStatus((0, parsers_1.extractRelatedItemLabel)({
            ...item,
            __collectionUid: (0, lodash_1.get)(relatedTypeSelectValue, 'value', relatedTypeSelectValue),
        }, contentTypesNameFields, { contentTypes }), item);
        return ({
            key: (0, lodash_1.get)(item, 'id').toString(),
            metadatas: {
                intlLabel: {
                    id: label || `${item.__collectionUid} ${item.id}`,
                    defaultMessage: label || `${item.__collectionUid} ${item.id}`,
                },
                hidden: false,
                disabled: false,
            },
            value: item.id.toString(),
            label: label,
        });
    }), item => item.metadatas.intlLabel.id);
    const isExternal = formik.values.type === utils_1.navigationItemType.EXTERNAL;
    const pathSourceName = isExternal ? 'externalPath' : 'path';
    const submitDisabled = (formik.values.type === utils_1.navigationItemType.INTERNAL && !isSingleSelected && (0, lodash_1.isNil)(formik.values.related)) || isLoading;
    const onChangeRelatedType = ({ target: { name, value } }) => {
        const relatedTypeBeingReverted = data.relatedType && (data.relatedType.value === (0, lodash_1.get)(value, 'value', value));
        setContentTypeSearchQuery(undefined);
        formik.setValues(prevState => ({
            ...prevState,
            updated: true,
            related: relatedTypeBeingReverted ? data.related?.value : undefined,
            [name]: value,
        }));
        if (!hasChanged) {
            setChangedState(true);
        }
    };
    const relatedTypeSelectOptions = (0, react_1.useMemo)(() => (0, lodash_1.sortBy)(contentTypes
        .filter((contentType) => {
        if (contentType.isSingle) {
            if (relatedTypeSelectValue && [relatedTypeSelectValue, initialRelatedTypeSelected].includes(contentType.uid)) {
                return true;
            }
            return !usedContentTypesData.some((_) => _.__collectionUid === contentType.uid && _.__collectionUid !== formik.values.relatedType);
        }
        return true;
    })
        .map((item) => ({
        key: (0, lodash_1.get)(item, 'uid'),
        metadatas: {
            intlLabel: {
                id: (0, lodash_1.get)(item, 'label', (0, lodash_1.get)(item, 'name')),
                defaultMessage: (0, lodash_1.get)(item, 'label', (0, lodash_1.get)(item, 'name')),
            },
            disabled: false,
            hidden: false,
        },
        value: (0, lodash_1.get)(item, 'uid'),
        label: (0, lodash_1.get)(item, 'label', (0, lodash_1.get)(item, 'name')),
    })), item => item.metadatas.intlLabel.id), [contentTypes, usedContentTypesData, relatedTypeSelectValue]);
    const thereAreNoMoreContentTypes = (0, lodash_1.isEmpty)(relatedSelectOptions) && !contentTypeSearchQuery;
    (0, react_1.useEffect)(() => {
        const value = (0, lodash_1.get)(relatedSelectOptions, '0');
        if (isSingleSelected && relatedSelectOptions.length === 1 && !(0, lodash_1.isEqual)(value, relatedSelectValue)) {
            onChange({ name: "related", value });
        }
    }, [isSingleSelected, relatedSelectOptions]);
    (0, react_1.useEffect)(() => {
        const value = formik.values.relatedType;
        if (value) {
            const item = (0, lodash_1.find)(contentTypes, (_) => _.uid === value);
            if (item) {
                getContentTypeEntities({
                    modelUID: item.uid,
                    query: contentTypeSearchQuery,
                    locale,
                }, item.plugin);
            }
        }
    }, [formik.values.relatedType, contentTypeSearchQuery]);
    const resetCopyItemFormErrors = () => {
        formik.setErrors({
            ...formik.errors,
            [itemLocaleCopyField]: null,
        });
    };
    const itemLocaleCopyField = `${inputsPrefix}i18n.locale`;
    const itemLocaleCopyValue = (0, lodash_1.get)(formik.values, itemLocaleCopyField);
    const onCopyFromLocale = (0, react_1.useCallback)(async (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsLoading(true);
        resetCopyItemFormErrors();
        try {
            const result = await readNavigationItemFromLocale({
                locale: itemLocaleCopyValue,
                structureId: data.structureId
            });
            if (result.type === utils_2.ResourceState.RESOLVED) {
                const { value: { related, ...rest } } = result;
                formik.setValues((prevState) => ({
                    ...prevState,
                    ...rest,
                }));
                if (related) {
                    const relatedType = relatedTypeSelectOptions
                        .find(({ value }) => value === related.__contentType)?.value;
                    formik.setValues((prevState) => ({
                        ...prevState,
                        relatedType,
                        [relatedFieldName]: related.id,
                    }));
                }
            }
            if (result.type === utils_2.ResourceState.ERROR) {
                formik.setErrors({
                    ...formik.errors,
                    [itemLocaleCopyField]: (0, utils_2.getMessage)(result.errors[0]),
                });
            }
        }
        catch (error) {
            formik.setErrors({
                ...formik.errors,
                [itemLocaleCopyField]: (0, utils_2.getMessage)('popup.item.form.i18n.locale.error.generic'),
            });
        }
        setIsLoading(false);
    }, [setIsLoading, formik.setValues, formik.setErrors]);
    const onChangeLocaleCopy = (0, react_1.useCallback)(({ target: { value } }) => {
        resetCopyItemFormErrors();
        onChange({ name: itemLocaleCopyField, value });
    }, [onChange, itemLocaleCopyField]);
    const itemCopyProps = (0, react_1.useMemo)(() => ({
        intlLabel: {
            id: (0, translations_1.getTradId)('popup.item.form.i18n.locale.label'),
            defaultMessage: 'Copy details from'
        },
        placeholder: {
            id: (0, translations_1.getTradId)('popup.item.form.i18n.locale.placeholder'),
            defaultMessage: 'locale'
        },
    }), [translations_1.getTradId]);
    (0, react_1.useEffect)(() => {
        const value = formik.values.relatedType;
        const fetchContentTypeEntities = async () => {
            if (value) {
                const item = (0, lodash_1.find)(contentTypes, (_) => _.uid === value);
                if (item) {
                    await getContentTypeEntities({
                        modelUID: item.uid,
                        query: contentTypeSearchQuery,
                        locale,
                    }, item.plugin);
                }
            }
        };
        fetchContentTypeEntities();
    }, [formik.values.relatedType, contentTypeSearchQuery]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("form", null,
            react_1.default.createElement(ModalLayout_1.ModalBody, null,
                react_1.default.createElement(Grid_1.Grid, { gap: 5 },
                    react_1.default.createElement(Grid_1.GridItem, { key: "title", col: 12 },
                        react_1.default.createElement(helper_plugin_1.GenericInput, { intlLabel: (0, translations_1.getTrad)('popup.item.form.title.label', 'Title'), name: "title", placeholder: (0, translations_1.getTrad)("e.g. Blog", 'e.g. Blog'), description: (0, translations_1.getTrad)('popup.item.form.title.placeholder', 'e.g. Blog'), type: "text", disabled: !canUpdate, error: formik.errors.title, onChange: ({ target: { name, value } }) => onChange({ name, value }), value: formik.values.title })),
                    react_1.default.createElement(Grid_1.GridItem, { key: "type", col: 4, lg: 12 },
                        react_1.default.createElement(helper_plugin_1.GenericInput, { intlLabel: (0, translations_1.getTrad)('popup.item.form.type.label', 'Internal link'), name: "type", options: navigationItemTypeOptions, type: "select", disabled: !canUpdate, error: formik.errors.type, onChange: ({ target: { name, value } }) => onChange({ name, value }), value: formik.values.type })),
                    react_1.default.createElement(Grid_1.GridItem, { key: "menuAttached", col: 4, lg: 12 },
                        react_1.default.createElement(helper_plugin_1.GenericInput, { intlLabel: (0, translations_1.getTrad)('popup.item.form.menuAttached.label', 'MenuAttached'), name: "menuAttached", type: "bool", error: formik.errors.menuAttached, onChange: ({ target: { name, value } }) => onChange({ name, value }), value: formik.values.menuAttached, disabled: !canUpdate || (config.cascadeMenuAttached ? !(data.isMenuAllowedLevel && data.parentAttachedToMenu) : false) })),
                    react_1.default.createElement(Grid_1.GridItem, { key: "path", col: 12 },
                        react_1.default.createElement(helper_plugin_1.GenericInput, { intlLabel: (0, translations_1.getTrad)(`popup.item.form.${pathSourceName}.label`, 'Path'), name: pathSourceName, placeholder: (0, translations_1.getTrad)(`popup.item.form.${pathSourceName}.placeholder`, 'e.g. Blog'), type: "text", disabled: !canUpdate, error: formik.errors[pathSourceName], onChange: ({ target: { name, value } }) => onChange({ name, value }), value: formik.values[pathSourceName], description: generatePreviewPath() })),
                    formik.values.type === utils_1.navigationItemType.INTERNAL && (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(Grid_1.GridItem, { key: "menuAttached", col: 12 },
                            react_1.default.createElement(helper_plugin_1.GenericInput, { intlLabel: (0, translations_1.getTrad)('popup.item.form.autoSync.label', 'Read fields from related'), name: "autoSync", type: "bool", onChange: ({ target: { value } }) => setAutoSync(value), value: autoSync })),
                        react_1.default.createElement(Grid_1.GridItem, { col: 6, lg: 12 },
                            react_1.default.createElement(helper_plugin_1.GenericInput, { type: "select", intlLabel: (0, translations_1.getTrad)('popup.item.form.relatedType.label', 'Related Type'), placeholder: (0, translations_1.getTrad)('popup.item.form.relatedType.placeholder', 'Related Type'), name: "relatedType", error: formik.errors.relatedType, onChange: onChangeRelatedType, options: relatedTypeSelectOptions, value: formik.values.relatedType, disabled: isLoading || (0, lodash_1.isEmpty)(relatedTypeSelectOptions) || !canUpdate, description: !isLoading && (0, lodash_1.isEmpty)(relatedTypeSelectOptions)
                                    ? (0, translations_1.getTrad)('popup.item.form.relatedType.empty', 'There are no more content types')
                                    : undefined })),
                        formik.values.relatedType && !isSingleSelected && (react_1.default.createElement(Grid_1.GridItem, { col: 6, lg: 12 },
                            react_1.default.createElement(helper_plugin_1.GenericInput, { type: "select", intlLabel: (0, translations_1.getTrad)('popup.item.form.related.label', 'Related'), placeholder: (0, translations_1.getTrad)('popup.item.form.related.label', 'Related'), name: "related", error: formik.errors.related, onChange: ({ target: { name, value } }) => onChange({ name, value }), options: relatedSelectOptions, value: formik.values.related, disabled: isLoading || thereAreNoMoreContentTypes || !canUpdate, description: !isLoading && thereAreNoMoreContentTypes
                                    ? {
                                        id: (0, translations_1.getTradId)('popup.item.form.related.empty'),
                                        defaultMessage: 'There are no more entities',
                                        values: { contentTypeName: relatedTypeSelectValue },
                                    }
                                    : undefined }))))),
                    additionalFields.map((additionalField) => {
                        if (additionalField === 'audience') {
                            return (react_1.default.createElement(Grid_1.GridItem, { key: "audience", col: 6, lg: 12 },
                                react_1.default.createElement(Select_1.Select, { id: "audience", placeholder: (0, utils_2.getMessage)('popup.item.form.audience.placeholder'), label: (0, utils_2.getMessage)('popup.item.form.audience.label'), onChange: onAudienceChange, value: formik.values.audience, hint: !isLoading && (0, lodash_1.isEmpty)(audienceOptions)
                                        ? (0, utils_2.getMessage)('popup.item.form.audience.empty', 'There are no more audiences')
                                        : undefined, multi: true, withTags: true, disabled: (0, lodash_1.isEmpty)(audienceOptions) || !canUpdate }, audienceOptions.map(({ value, label }) => react_1.default.createElement(Select_1.Option, { key: value, value: value }, label)))));
                        }
                        else {
                            return (react_1.default.createElement(Grid_1.GridItem, { key: additionalField.name, col: 6, lg: 12 },
                                react_1.default.createElement(AdditionalFieldInput_1.default, { field: additionalField, isLoading: isLoading, onChange: onAdditionalFieldChange, value: (0, lodash_1.get)(formik.values, `additionalFields.${additionalField.name}`, null), disabled: !canUpdate, error: (0, lodash_1.get)(formik.errors, `additionalFields.${additionalField.name}`, null) })));
                        }
                    })),
                isI18nBootstrapAvailable ? (react_1.default.createElement(Grid_1.Grid, { gap: 5, paddingTop: 5 },
                    react_1.default.createElement(Grid_1.GridItem, { col: 6, lg: 12 },
                        react_1.default.createElement(helper_plugin_1.GenericInput, { ...itemCopyProps, type: "select", name: itemLocaleCopyField, error: (0, lodash_1.get)(formik.errors, itemLocaleCopyField), onChange: onChangeLocaleCopy, options: availableLocaleOptions, value: itemLocaleCopyValue, disabled: isLoading || !canUpdate })),
                    canUpdate && (react_1.default.createElement(Grid_1.GridItem, { col: 6, lg: 12, paddingTop: 6 },
                        react_1.default.createElement(Button_1.Button, { variant: "tertiary", onClick: onCopyFromLocale, disabled: isLoading || !itemLocaleCopyValue }, (0, utils_2.getMessage)('popup.item.form.i18n.locale.button')))))) : null)),
        react_1.default.createElement(NavigationItemPopupFooter_1.NavigationItemPopupFooter, { handleSubmit: formik.handleSubmit, handleCancel: onCancel, submitDisabled: submitDisabled, canUpdate: canUpdate })));
};
const appendLabelPublicationStatusFallback = () => "";
const loadingAware = (action, isLoading) => async (input) => {
    try {
        isLoading(true);
        return await action(input);
    }
    catch (_) {
    }
    finally {
        isLoading(false);
    }
};
exports.default = NavigationItemForm;
//# sourceMappingURL=index.js.map