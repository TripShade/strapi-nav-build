"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNavigationStructure = exports.isRelationPublished = exports.isRelationCorrect = exports.usedContentTypes = exports.extractRelatedItemLabel = exports.prepareItemToViewPayload = exports.transformItemToViewPayload = exports.transformToRESTPayload = exports.transformItemToRESTPayload = void 0;
const uuid_1 = require("uuid");
const lodash_1 = require("lodash");
const utils_1 = require("../../../utils");
const transformItemToRESTPayload = (item, parent = undefined, master = undefined, config = {}, parentAttachedToMenu = true) => {
    const { id, title, type = utils_1.navigationItemType.INTERNAL, updated = false, removed = false, uiRouterKey, menuAttached, path, externalPath, related, relatedType, order, audience = [], items = [], collapsed, isSingle, additionalFields = {}, } = item;
    const isExternal = type === utils_1.navigationItemType.EXTERNAL;
    const isWrapper = type === utils_1.navigationItemType.WRAPPER;
    const { contentTypes = [] } = config;
    const parsedRelated = Number(related);
    const relatedId = isExternal || isWrapper || isNaN(parsedRelated) ? related?.value || related : parsedRelated;
    const relatedContentType = relatedType ?
        (0, lodash_1.find)(contentTypes, ct => ct.uid === relatedType) :
        undefined;
    const itemAttachedToMenu = config.cascadeMenuAttached ? menuAttached && parentAttachedToMenu : menuAttached;
    return {
        id,
        parent,
        master,
        title,
        type,
        updated,
        removed,
        order,
        uiRouterKey,
        collapsed,
        additionalFields,
        menuAttached: itemAttachedToMenu,
        audience: audience.map((audienceItem) => (0, lodash_1.isObject)(audienceItem)
            ? audienceItem.id || audienceItem.value
            : audienceItem),
        path: isExternal ? undefined : path,
        externalPath: isExternal ? externalPath : undefined,
        related: isExternal || isWrapper
            ? undefined
            : [
                {
                    refId: isSingle && !relatedId ? 1 : relatedId,
                    ref: relatedContentType ? relatedContentType.uid : relatedType,
                    field: relatedContentType && relatedContentType.relatedField ? relatedContentType.relatedField : 'navigation',
                },
            ],
        items: items.map((iItem) => (0, exports.transformItemToRESTPayload)(iItem, id, master, config, itemAttachedToMenu)),
    };
};
exports.transformItemToRESTPayload = transformItemToRESTPayload;
const transformToRESTPayload = (payload, config = {}) => {
    const { id, name, visible, items } = payload;
    return {
        id,
        name,
        visible,
        items: items.map((item) => (0, exports.transformItemToRESTPayload)(item, null, id, config)),
    };
};
exports.transformToRESTPayload = transformToRESTPayload;
const linkRelations = (item, config) => {
    const { contentTypeItems = [], contentTypes = [] } = config;
    const { type, related, relatedType, relatedRef, isSingle } = item;
    let relation = {
        related: undefined,
        relatedRef: undefined,
        relatedType: undefined,
    };
    if (isSingle && relatedType) {
        const relatedContentType = contentTypes.find(_ => relatedType === _.uid) || {};
        const { singleRelatedItem = {} } = item;
        return {
            ...item,
            relatedType,
            relatedRef: {
                ...singleRelatedItem,
                ...(0, lodash_1.omit)(relatedContentType, 'collectionName'),
                isSingle,
                __collectionUid: relatedContentType.uid,
            },
        };
    }
    if ((type !== utils_1.navigationItemType.INTERNAL) || !related || ((0, lodash_1.isObject)(related) && (0, lodash_1.isEmpty)(related))) {
        return {
            ...item,
            ...relation,
        };
    }
    const relatedItem = (0, lodash_1.isArray)(related) ? (0, lodash_1.last)(related) : related;
    const parsedRelated = Number(related);
    const relatedId = isNaN(parsedRelated) ? related : parsedRelated;
    const relationNotChanged = relatedRef && relatedItem ? relatedRef.id === relatedItem : false;
    if (relationNotChanged) {
        return item;
    }
    const shouldFindRelated = ((0, lodash_1.isNumber)(related) || (0, uuid_1.validate)(related) || (0, lodash_1.isString)(related)) && !relatedRef;
    const shouldBuildRelated = !relatedRef || (relatedRef && (relatedRef.id !== relatedId));
    if (shouldBuildRelated && !shouldFindRelated) {
        const relatedContentType = (0, lodash_1.find)(contentTypes, ct => ct.uid === relatedItem.__contentType, {});
        const { uid, labelSingular, isSingle } = relatedContentType;
        relation = {
            related: relatedItem.id,
            relatedRef: {
                ...relatedItem,
                __collectionUid: uid,
                isSingle,
                labelSingular,
            },
            relatedType: uid,
        };
    }
    else if (shouldFindRelated) {
        const relatedRef = (0, lodash_1.find)(contentTypeItems, cti => cti.id === relatedId);
        const relatedContentType = (0, lodash_1.find)(contentTypes, ct => ct.uid === relatedType);
        const { uid, contentTypeName, labelSingular, isSingle } = relatedContentType;
        relation = {
            relatedRef: {
                ...relatedRef,
                __collectionUid: uid,
                __contentType: contentTypeName,
                isSingle,
                labelSingular,
            },
        };
    }
    else {
        return {
            ...item,
        };
    }
    return {
        ...item,
        ...relation,
    };
};
const reOrderItems = (items = []) => (0, lodash_1.orderBy)(items, ['order'], ['asc'])
    .map((item, n) => {
    const order = n + 1;
    return {
        ...item,
        order,
        updated: item.updated || order !== item.order,
    };
});
const transformItemToViewPayload = (payload, items = [], config) => {
    if (!payload.viewParentId) {
        if (payload.viewId) {
            const updatedRootLevel = items
                .map((item) => {
                if (item.viewId === payload.viewId) {
                    return linkRelations({
                        ...payload,
                    }, config);
                }
                return {
                    ...item,
                    items: (0, exports.transformItemToViewPayload)(payload, item.items, config),
                };
            });
            return reOrderItems(updatedRootLevel);
        }
        return [
            ...reOrderItems(items),
            linkRelations({
                ...payload,
                order: items.length + 1,
                viewId: (0, uuid_1.v4)(),
            }, config),
        ];
    }
    const updatedLevel = items
        .map((item) => {
        const branchItems = item.items || [];
        if (payload.viewParentId === item.viewId) {
            if (!payload.viewId) {
                return {
                    ...item,
                    items: [
                        ...reOrderItems(branchItems),
                        linkRelations({
                            ...payload,
                            order: branchItems.length + 1,
                            viewId: (0, uuid_1.v4)(),
                        }, config),
                    ],
                };
            }
            const updatedBranchItems = branchItems
                .map((iItem) => {
                if (iItem.viewId === payload.viewId) {
                    return linkRelations(payload, config);
                }
                return {
                    ...iItem,
                };
            });
            return {
                ...item,
                items: reOrderItems(updatedBranchItems),
            };
        }
        return {
            ...item,
            items: (0, exports.transformItemToViewPayload)(payload, item.items, config),
        };
    });
    return reOrderItems(updatedLevel);
};
exports.transformItemToViewPayload = transformItemToViewPayload;
const prepareItemToViewPayload = ({ items = [], viewParentId = null, config = {}, structureIdPrefix = '' }) => reOrderItems(items.map((item, n) => {
    const viewId = (0, uuid_1.v4)();
    const structureId = structureIdPrefix ? `${structureIdPrefix}.${n}` : n.toString();
    return {
        ...linkRelations({
            viewId,
            viewParentId,
            ...item,
            order: item.order || (n + 1),
            structureId,
            updated: item.updated || (0, lodash_1.isNil)(item.order),
        }, config),
        items: (0, exports.prepareItemToViewPayload)({
            config,
            items: item.items,
            structureIdPrefix: structureId,
            viewId,
        }),
    };
}));
exports.prepareItemToViewPayload = prepareItemToViewPayload;
const extractRelatedItemLabel = (item = {}, fields = {}, config = {}) => {
    if ((0, lodash_1.get)(item, 'isSingle', false)) {
        return (0, lodash_1.get)(item, 'labelSingular', '');
    }
    const { contentTypes = [] } = config;
    const { __collectionUid } = item;
    const contentType = contentTypes.find(_ => _.uid === __collectionUid);
    const { default: defaultFields = [] } = fields;
    return (0, lodash_1.get)(fields, `${contentType ? contentType.uid : __collectionUid}`, defaultFields).map((_) => item[_]).filter((_) => _)[0] || '';
};
exports.extractRelatedItemLabel = extractRelatedItemLabel;
const usedContentTypes = (items = []) => items.flatMap((item) => {
    const used = (item.items ? (0, exports.usedContentTypes)(item.items) : []);
    if (item.relatedRef) {
        return [item.relatedRef, ...used];
    }
    return used;
});
exports.usedContentTypes = usedContentTypes;
const isRelationCorrect = ({ related, type }) => {
    const isRelationDefined = !(0, lodash_1.isNil)(related);
    return type !== utils_1.navigationItemType.INTERNAL || (type === utils_1.navigationItemType.INTERNAL && isRelationDefined);
};
exports.isRelationCorrect = isRelationCorrect;
const isRelationPublished = ({ relatedRef, relatedType = {}, type, isCollection }) => {
    if (isCollection) {
        return relatedType.available || relatedRef.available;
    }
    if ((type === utils_1.navigationItemType.INTERNAL)) {
        const isHandledByPublshFlow = relatedRef ? 'published_at' in relatedRef : false;
        if (isHandledByPublshFlow) {
            return (0, lodash_1.get)(relatedRef, 'published_at', true);
        }
    }
    return true;
};
exports.isRelationPublished = isRelationPublished;
const validateNavigationStructure = (items = []) => items.map(item => (item.removed ||
    (0, exports.isRelationCorrect)({ related: item.related, type: item.type }) ||
    (item.isSingle && (0, exports.isRelationCorrect)({ related: item.relatedType, type: item.type }))) &&
    (0, exports.validateNavigationStructure)(item.items)).filter(item => !item).length === 0;
exports.validateNavigationStructure = validateNavigationStructure;
//# sourceMappingURL=parsers.js.map