"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildAllHookListeners = exports.buildHookListener = exports.sanitizePopulateField = exports.resolveGlobalLikeId = exports.purgeSensitiveDataFromUser = exports.purgeSensitiveData = exports.parsePopulateQuery = exports.validateAdditionalFields = exports.getPluginModels = exports.compareArraysOfNumbers = exports.intercalate = exports.isContentTypeEligible = exports.filterByPath = exports.buildNestedPaths = exports.buildNestedStructure = exports.singularize = exports.checkDuplicatePath = exports.filterOutUnpublished = exports.extractItemRelationTitle = exports.composeItemTitle = exports.sendAuditLog = exports.prepareAuditLog = exports.getTemplateComponentFromTemplate = exports.templateNameFactory = exports.parseParams = exports.getCustomFields = exports.errorHandler = exports.getPluginService = void 0;
const lodash_1 = require("lodash");
const types_1 = require("../../types");
const NavigationError_1 = require("../../utils/NavigationError");
const constant_1 = require("./constant");
const UID_REGEX = /^(?<type>[a-z0-9-]+)\:{2}(?<api>[a-z0-9-]+)\.{1}(?<contentType>[a-z0-9-]+)$/i;
function getPluginService(name) {
    return strapi.plugin("navigation").service(name);
}
exports.getPluginService = getPluginService;
const errorHandler = (ctx) => (error) => {
    if (error instanceof NavigationError_1.NavigationError) {
        return ctx.badRequest(error.message, error.additionalInfo);
    }
    throw error;
};
exports.errorHandler = errorHandler;
const getCustomFields = (additionalFields) => additionalFields.filter((field) => typeof field !== "string");
exports.getCustomFields = getCustomFields;
const parseParams = (params) => Object.keys(params).reduce((prev, curr) => {
    const value = params[curr];
    const parsedValue = isNaN(Number(value)) ? value : parseInt(value, 10);
    return {
        ...prev,
        [curr]: parsedValue,
    };
}, {});
exports.parseParams = parseParams;
const templateNameFactory = async (items = [], strapi, contentTypes = []) => {
    const flatRelated = (0, lodash_1.flatten)(items.map((i) => i.related)).filter((_) => !!_);
    const relatedMap = flatRelated.reduce((acc, curr) => {
        if ((0, lodash_1.isNil)(curr) || typeof curr.__contentType !== "string")
            return acc;
        const index = curr.__contentType;
        if ((0, lodash_1.isNil)(acc[index]))
            acc[index] = [];
        return { ...acc, [index]: [...acc[index], curr.id] };
    }, {});
    const responses = await Promise.all(Object.entries(relatedMap).map(([contentType, ids]) => {
        (0, types_1.assertNotEmpty)((0, lodash_1.find)(contentTypes, (cnt) => cnt.uid === contentType));
        return strapi
            .query(contentType)
            .findMany({
            where: { id: { $in: ids } },
            limit: Number.MAX_SAFE_INTEGER,
            populate: ["template"],
        })
            .then((res) => ({ [contentType]: res }));
    }));
    const relatedResponseMap = responses.reduce((acc, curr) => ({ ...acc, ...curr }), {});
    const singleTypes = new Map(contentTypes
        .filter((x) => x.isSingle)
        .map(({ contentTypeName, templateName }) => [
        contentTypeName,
        templateName || contentTypeName,
    ]));
    return (contentType, id) => {
        const template = (0, lodash_1.get)(relatedResponseMap[contentType].find((data) => data.id === id), "template");
        if (template && template instanceof Array) {
            const templateComponent = (0, exports.getTemplateComponentFromTemplate)(strapi, template);
            return (0, lodash_1.get)(templateComponent, "options.templateName", constant_1.TEMPLATE_DEFAULT);
        }
        if (singleTypes.get(contentType)) {
            return singleTypes.get(contentType);
        }
        return constant_1.TEMPLATE_DEFAULT;
    };
};
exports.templateNameFactory = templateNameFactory;
const getTemplateComponentFromTemplate = (strapi, template = []) => {
    const componentName = (0, lodash_1.get)((0, lodash_1.first)(template), "__component");
    return !!componentName ? strapi.components[componentName] : null;
};
exports.getTemplateComponentFromTemplate = getTemplateComponentFromTemplate;
const prepareAuditLog = (actions) => {
    return [
        ...new Set(actions
            .filter((_) => !!_)
            .flatMap(({ remove, create, update }) => {
            return [
                create ? "CREATE" : "",
                update ? "UPDATE" : "",
                remove ? "REMOVE" : "",
            ].filter((_) => !!_);
        })),
    ].join("_");
};
exports.prepareAuditLog = prepareAuditLog;
const sendAuditLog = (auditLogInstance, event, data) => {
    if (auditLogInstance && auditLogInstance.emit) {
        auditLogInstance.emit(event, data);
    }
};
exports.sendAuditLog = sendAuditLog;
const composeItemTitle = (item, fields = {}, contentTypes = []) => {
    const { title, related } = item;
    const lastRelated = (0, lodash_1.isArray)(related) ? (0, lodash_1.last)(related) : related;
    if (title) {
        return (0, lodash_1.isString)(title) && !(0, lodash_1.isEmpty)(title) ? title : undefined;
    }
    else if (lastRelated) {
        const relationTitle = (0, exports.extractItemRelationTitle)(lastRelated, fields, contentTypes);
        return (0, lodash_1.isString)(relationTitle) && !(0, lodash_1.isEmpty)(relationTitle)
            ? relationTitle
            : undefined;
    }
    return undefined;
};
exports.composeItemTitle = composeItemTitle;
const extractItemRelationTitle = (relatedItem, fields = {}, contentTypes = []) => {
    const { __contentType } = relatedItem;
    const contentType = (0, lodash_1.find)(contentTypes, (_) => _.contentTypeName === __contentType);
    const { default: defaultFields = [] } = fields;
    return ((0, lodash_1.get)(fields, `${contentType ? contentType.collectionName : ""}`, defaultFields)
        .map((_) => relatedItem[_])
        .filter((_) => _)[0] || "");
};
exports.extractItemRelationTitle = extractItemRelationTitle;
const filterOutUnpublished = (item) => {
    const relatedItem = item.related && ((0, lodash_1.isArray)(item.related) ? (0, lodash_1.last)(item.related) : item.related);
    const isHandledByPublishFlow = relatedItem
        ? "published_at" in relatedItem
        : false;
    if (isHandledByPublishFlow) {
        const isRelatedDefinedAndPublished = relatedItem
            ? isHandledByPublishFlow && (0, lodash_1.get)(relatedItem, "published_at")
            : false;
        return item.type === "INTERNAL" ? isRelatedDefinedAndPublished : true;
    }
    return item.type !== "INTERNAL" || relatedItem;
};
exports.filterOutUnpublished = filterOutUnpublished;
const checkDuplicatePath = (parentItem, checkData) => {
    return new Promise((resolve, reject) => {
        if (parentItem && parentItem.items) {
            for (let item of checkData) {
                for (let _ of parentItem.items) {
                    if (_.path === item.path &&
                        _.id !== item.id &&
                        item.type === "INTERNAL") {
                        return reject(new NavigationError_1.NavigationError(`Duplicate path:${item.path} in parent: ${parentItem.title || "root"} for ${item.title} and ${_.title} items`, {
                            parentTitle: parentItem.title,
                            parentId: parentItem.id,
                            path: item.path,
                            errorTitles: [item.title, _.title],
                        }));
                    }
                }
            }
        }
        return resolve();
    });
};
exports.checkDuplicatePath = checkDuplicatePath;
const singularize = (value = "") => {
    return (0, lodash_1.last)(value) === "s" ? value.substr(0, value.length - 1) : value;
};
exports.singularize = singularize;
const buildNestedStructure = (entities, id = null, field = "parent") => {
    return entities
        .filter((entity) => {
        let data = entity[field];
        if (data == null && id === null) {
            return true;
        }
        if (data && typeof id === "string") {
            data = data.toString();
        }
        if (!!data && typeof data === "object" && "id" in data) {
            return data.id === id;
        }
        return data && data === id;
    })
        .map((entity) => {
        return {
            ...entity,
            related: entity.related,
            items: (0, exports.buildNestedStructure)(entities, entity.id, field),
        };
    });
};
exports.buildNestedStructure = buildNestedStructure;
const buildNestedPaths = (items, id = null, parentPath = null) => {
    return items
        .filter((entity) => {
        let data = entity.parent;
        if (data == null && id === null) {
            return true;
        }
        if (data && typeof id === "string") {
            data = data.toString();
        }
        return ((data && data === id) ||
            ((0, lodash_1.isObject)(entity.parent) && entity.parent.id === id));
    })
        .reduce((acc, entity) => {
        const path = `${parentPath || ""}/${entity.path}`.replace("//", "/");
        return [
            {
                id: entity.id,
                parent: parentPath
                    ? {
                        id: (0, lodash_1.get)(entity, ["parent", "id"]),
                        path: parentPath,
                    }
                    : undefined,
                path,
            },
            ...(0, exports.buildNestedPaths)(items, entity.id, path),
            ...acc,
        ];
    }, []);
};
exports.buildNestedPaths = buildNestedPaths;
const filterByPath = (items, path) => {
    const itemsWithPaths = path
        ? (0, exports.buildNestedPaths)(items).filter(({ path: itemPath }) => itemPath.includes(path))
        : [];
    const root = itemsWithPaths.find(({ path: itemPath }) => itemPath === path);
    return {
        root,
        items: (0, lodash_1.isNil)(root)
            ? []
            : items.filter(({ id }) => itemsWithPaths.find((v) => v.id === id)),
    };
};
exports.filterByPath = filterByPath;
const isContentTypeEligible = (uid = "") => {
    const isOneOfAllowedType = constant_1.ALLOWED_CONTENT_TYPES.filter((_) => uid.includes(_)).length > 0;
    const isNoneOfRestricted = constant_1.RESTRICTED_CONTENT_TYPES.filter((_) => uid.includes(_) || uid === _)
        .length === 0;
    return uid && isOneOfAllowedType && isNoneOfRestricted;
};
exports.isContentTypeEligible = isContentTypeEligible;
const intercalate = (glue, arr) => arr
    .slice(1)
    .reduce((acc, element) => acc.concat([glue, element]), arr.slice(0, 1));
exports.intercalate = intercalate;
const compareArraysOfNumbers = (arrA, arrB) => {
    const diff = (0, lodash_1.zipWith)(arrA, arrB, (a, b) => {
        if ((0, lodash_1.isNil)(a))
            return -1;
        if ((0, lodash_1.isNil)(b))
            return 1;
        return a - b;
    });
    return (0, lodash_1.find)(diff, (a) => a !== 0) || 0;
};
exports.compareArraysOfNumbers = compareArraysOfNumbers;
const getPluginModels = () => {
    const plugin = strapi.plugin("navigation");
    return {
        masterModel: plugin.contentType("navigation"),
        itemModel: plugin.contentType("navigation-item"),
        relatedModel: plugin.contentType("navigations-items-related"),
        audienceModel: plugin.contentType("audience"),
    };
};
exports.getPluginModels = getPluginModels;
const validateAdditionalFields = (additionalFields) => {
    const forbiddenNames = [
        "title",
        "type",
        "path",
        "externalPath",
        "uiRouterKey",
        "menuAttached",
        "order",
        "collapsed",
        "related",
        "parent",
        "master",
        "audience",
        "additionalFields",
    ];
    const customFields = (0, exports.getCustomFields)(additionalFields);
    if (customFields.length !== (0, lodash_1.uniqBy)(customFields, "name").length) {
        throw new Error("All names of custom fields must be unique.");
    }
    if (!(0, lodash_1.isNil)((0, lodash_1.find)(customFields, (item) => (0, lodash_1.includes)(forbiddenNames, item.name)))) {
        throw new Error(`Name of custom field cannot be one of: ${forbiddenNames.join(", ")}`);
    }
};
exports.validateAdditionalFields = validateAdditionalFields;
const parsePopulateQuery = (populate) => {
    if (populate === "*") {
        return true;
    }
    else if (typeof populate === "string") {
        return [populate];
    }
    else {
        return populate;
    }
};
exports.parsePopulateQuery = parsePopulateQuery;
const purgeSensitiveData = (data) => {
    if (!data || !(typeof data === "object") || !Object.keys(data).length) {
        return data;
    }
    const { createdBy = undefined, updatedBy = undefined, ...rest } = data;
    if (!createdBy && !updatedBy) {
        return data;
    }
    return {
        ...Object.fromEntries(Object.entries(rest).map(([key, value]) => [
            key,
            (0, exports.purgeSensitiveData)(value),
        ])),
        ...(createdBy ? { createdBy: (0, exports.purgeSensitiveDataFromUser)(createdBy) } : {}),
        ...(updatedBy ? { updatedBy: (0, exports.purgeSensitiveDataFromUser)(updatedBy) } : {}),
    };
};
exports.purgeSensitiveData = purgeSensitiveData;
const purgeSensitiveDataFromUser = (data = {}) => {
    if (!data) {
        return undefined;
    }
    const allowedFields = ["username", "firstname", "lastname", "email"];
    return Object.keys(data)
        .filter((key) => allowedFields.includes(key.toLowerCase()))
        .reduce((prev, curr) => ({
        ...prev,
        [curr]: data[curr],
    }), {});
};
exports.purgeSensitiveDataFromUser = purgeSensitiveDataFromUser;
const resolveGlobalLikeId = (uid = "") => {
    const parse = (str) => str
        .split("-")
        .map((_) => (0, lodash_1.capitalize)(_))
        .join("");
    const [type, scope, contentTypeName] = splitTypeUid(uid);
    if (type === "api") {
        return parse(contentTypeName);
    }
    return `${parse(scope)}${parse(contentTypeName)}`;
};
exports.resolveGlobalLikeId = resolveGlobalLikeId;
const splitTypeUid = (uid = "") => {
    return uid.split(UID_REGEX).filter((s) => s && s.length > 0);
};
const sanitizePopulateField = (populate) => {
    if (!populate || populate === true || populate === "*") {
        return undefined;
    }
    if (Array.isArray(populate)) {
        return populate.map((item) => (0, exports.sanitizePopulateField)(item));
    }
    if ("object" === typeof populate) {
        return Object.fromEntries(Object.entries(populate).map(([key, value]) => [key, (0, exports.sanitizePopulateField)(value)]));
    }
    return populate;
};
exports.sanitizePopulateField = sanitizePopulateField;
const buildHookListener = (contentTypeName, { strapi }) => (hookName) => [
    hookName,
    async (event) => {
        const commonService = strapi
            .plugin("navigation")
            .service("common");
        await commonService.runLifecycleHook({
            contentTypeName,
            hookName,
            event,
        });
    },
];
exports.buildHookListener = buildHookListener;
const buildAllHookListeners = (contentTypeName, context) => Object.fromEntries(constant_1.allLifecycleHooks.map((0, exports.buildHookListener)(contentTypeName, context)));
exports.buildAllHookListeners = buildAllHookListeners;
//# sourceMappingURL=functions.js.map