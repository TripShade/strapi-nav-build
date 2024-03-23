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
const prop_types_1 = __importDefault(require("prop-types"));
const lodash_1 = require("lodash");
const ModalLayout_1 = require("@strapi/design-system/ModalLayout");
const NavigationItemForm_1 = __importDefault(require("../NavigationItemForm"));
const parsers_1 = require("../../utils/parsers");
const NavigationItemPopupHeader_1 = require("./NavigationItemPopupHeader");
const utils_1 = require("../../../../utils");
const NavigationItemPopUp = ({ availableLocale, isOpen, isLoading, data, config = {}, onSubmit, onClose, usedContentTypeItems, getContentTypeItems, usedContentTypesData, locale, readNavigationItemFromLocale, slugify, permissions = {}, }) => {
    const handleOnSubmit = (payload) => {
        onSubmit(payload);
    };
    const { related, relatedType } = data;
    const { availableAudience = [], additionalFields, contentTypes, contentTypeItems, contentTypesNameFields = {}, } = config;
    const { canUpdate } = permissions;
    const appendLabelPublicationStatus = (label = '', item = {}, isCollection = false) => {
        const appendix = (0, parsers_1.isRelationPublished)({
            relatedRef: item,
            type: item.isSingle ? utils_1.navigationItemType.INTERNAL : item.type,
            isCollection,
        }) ? '' : `[${(0, utils_1.getMessage)('notification.navigation.item.relation.status.draft')}] `.toUpperCase();
        return `${appendix}${label}`;
    };
    const relatedTypeItem = (0, lodash_1.find)(contentTypes, item => item.uid === relatedType);
    const prepareFormData = data => {
        const relatedItem = (0, lodash_1.find)(contentTypeItems, item => item.id === related);
        return {
            ...data,
            type: (0, parsers_1.isRelationCorrect)(data) ? data.type : undefined,
            related: related && (0, parsers_1.isRelationCorrect)(data) ? {
                value: related,
                label: appendLabelPublicationStatus((0, parsers_1.extractRelatedItemLabel)({
                    ...relatedItem,
                    __collectionUid: relatedType,
                }, contentTypesNameFields, config), relatedItem),
            } : undefined,
            relatedType: relatedType && (0, parsers_1.isRelationCorrect)(data) ? {
                value: relatedType,
                label: appendLabelPublicationStatus(relatedTypeItem.label || relatedTypeItem.name, relatedTypeItem, true),
            } : undefined,
        };
    };
    const preparedData = (0, react_1.useMemo)(prepareFormData.bind(null, data), [data]);
    const hasViewId = !!data.viewId;
    return (react_1.default.createElement(ModalLayout_1.ModalLayout, { labelledBy: "condition-modal-breadcrumbs", onClose: onClose, isOpen: isOpen },
        react_1.default.createElement(NavigationItemPopupHeader_1.NavigationItemPopupHeader, { isNewItem: !hasViewId, canUpdate: canUpdate }),
        react_1.default.createElement(NavigationItemForm_1.default, { availableLocale: availableLocale, config: config, data: preparedData, isLoading: isLoading, additionalFields: additionalFields, contentTypesNameFields: contentTypesNameFields, availableAudience: availableAudience, contentTypes: contentTypes, contentTypeEntities: contentTypeItems, usedContentTypeEntities: usedContentTypeItems, getContentTypeEntities: getContentTypeItems, usedContentTypesData: usedContentTypesData, onSubmit: handleOnSubmit, onCancel: onClose, appendLabelPublicationStatus: appendLabelPublicationStatus, locale: locale, readNavigationItemFromLocale: readNavigationItemFromLocale, slugify: slugify, permissions: permissions })));
};
NavigationItemPopUp.propTypes = {
    data: prop_types_1.default.object.isRequired,
    config: prop_types_1.default.object.isRequired,
    isOpen: prop_types_1.default.bool,
    isLoading: prop_types_1.default.bool,
    onSubmit: prop_types_1.default.func.isRequired,
    onClose: prop_types_1.default.func.isRequired,
    getContentTypeItems: prop_types_1.default.func.isRequired,
    locale: prop_types_1.default.string,
    readNavigationItemFromLocale: prop_types_1.default.func.isRequired,
    slugify: prop_types_1.default.func.isRequired,
};
exports.default = NavigationItemPopUp;
//# sourceMappingURL=index.js.map