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
const react_dnd_1 = require("react-dnd");
const lodash_1 = require("lodash");
const styled_components_1 = require("styled-components");
const Card_1 = require("@strapi/design-system/Card");
const Divider_1 = require("@strapi/design-system/Divider");
const Flex_1 = require("@strapi/design-system/Flex");
const Link_1 = require("@strapi/design-system/Link");
const TextButton_1 = require("@strapi/design-system/TextButton");
const Typography_1 = require("@strapi/design-system/Typography");
const icons_1 = require("@strapi/icons");
const ItemCardHeader_1 = __importDefault(require("./ItemCardHeader"));
const NavigationItemList_1 = __importDefault(require("../NavigationItemList"));
const Wrapper_1 = __importDefault(require("./Wrapper"));
const parsers_1 = require("../../pages/View/utils/parsers");
const ItemCardBadge_1 = __importDefault(require("./ItemCardBadge"));
const ItemCardRemovedOverlay_1 = require("./ItemCardRemovedOverlay");
const utils_1 = require("../../utils");
const CollapseButton_1 = __importDefault(require("../CollapseButton"));
const Item = (props) => {
    const { item, isLast = false, level = 0, levelPath = '', allowedLevels, relatedRef, isParentAttachedToMenu, onItemLevelAdd, onItemRemove, onItemRestore, onItemEdit, onItemReOrder, onItemToggleCollapse, error, displayChildren, config = {}, permissions = {}, } = props;
    const { viewId, title, type, path, removed, externalPath, menuAttached, collapsed, structureId, items = [], isSearchActive, } = item;
    const { contentTypes = [], contentTypesNameFields } = config;
    const isExternal = type === utils_1.navigationItemType.EXTERNAL;
    const isWrapper = type === utils_1.navigationItemType.WRAPPER;
    const isHandledByPublishFlow = contentTypes.find(_ => _.uid === relatedRef?.__collectionUid)?.draftAndPublish;
    const isPublished = isHandledByPublishFlow && relatedRef.publishedAt;
    const isNextMenuAllowedLevel = (0, lodash_1.isNumber)(allowedLevels) ? level < (allowedLevels - 1) : true;
    const isMenuAllowedLevel = (0, lodash_1.isNumber)(allowedLevels) ? level < allowedLevels : true;
    const hasChildren = !(0, lodash_1.isEmpty)(item.items) && !isExternal && !displayChildren;
    const absolutePath = isExternal ? undefined : `${levelPath === '/' ? '' : levelPath}/${path === '/' ? '' : path}`;
    const relatedItemLabel = !isExternal ? (0, parsers_1.extractRelatedItemLabel)(relatedRef, contentTypesNameFields, { contentTypes }) : '';
    const relatedTypeLabel = relatedRef?.labelSingular;
    const relatedBadgeColor = isPublished ? 'success' : 'secondary';
    const { canUpdate } = permissions;
    const dragRef = (0, react_1.useRef)(null);
    const dropRef = (0, react_1.useRef)(null);
    const previewRef = (0, react_1.useRef)(null);
    const [, drop] = (0, react_dnd_1.useDrop)({
        accept: `${utils_1.ItemTypes.NAVIGATION_ITEM}_${levelPath}`,
        hover(hoveringItem, monitor) {
            const dragIndex = hoveringItem.order;
            const dropIndex = item.order;
            if (dragIndex === dropIndex) {
                return;
            }
            const hoverBoundingRect = dropRef.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            const isAfter = hoverClientY > hoverMiddleY;
            const newOrder = isAfter ? item.order + 0.5 : item.order - 0.5;
            if (dragIndex < dropIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > dropIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            onItemReOrder({ ...hoveringItem }, newOrder);
            hoveringItem.order = newOrder;
        },
        collect: monitor => ({
            isOverCurrent: monitor.isOver({ shallow: true }),
        })
    });
    const [{ isDragging }, drag, dragPreview] = (0, react_dnd_1.useDrag)({
        type: `${utils_1.ItemTypes.NAVIGATION_ITEM}_${levelPath}`,
        item: () => {
            return item;
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const refs = {
        dragRef: drag(dragRef),
        dropRef: drop(dropRef),
        previewRef: dragPreview(previewRef),
    };
    const contentTypeUid = relatedRef?.__collectionUid;
    const contentType = contentTypes.find(_ => _.uid === contentTypeUid) || {};
    const generatePreviewUrl = entity => {
        const { isSingle } = contentType;
        const entityLocale = entity?.locale ? `?plugins[i18n][locale]=${entity?.locale}` : '';
        return `/content-manager/${isSingle ? 'single-types' : 'collection-types'}/${entity?.__collectionUid}${!isSingle ? '/' + entity?.id : ''}${entityLocale}`;
    };
    const onNewItemClick = (0, react_1.useCallback)((event) => canUpdate && onItemLevelAdd(event, viewId, isNextMenuAllowedLevel, absolutePath, menuAttached, `${structureId}.${items.length}`), [viewId, isNextMenuAllowedLevel, absolutePath, menuAttached, structureId, items, canUpdate]);
    (0, react_1.useEffect)(() => {
        if (isSearchActive) {
            refs.dropRef.current?.scrollIntoView?.({
                behavior: "smooth",
                block: "center",
                inline: "center",
            });
        }
    }, [isSearchActive, refs.dropRef.current]);
    const theme = (0, styled_components_1.useTheme)();
    return (react_1.default.createElement(Wrapper_1.default, { level: level, isLast: isLast, style: { opacity: isDragging ? 0.2 : 1 }, ref: refs ? refs.dropRef : null },
        react_1.default.createElement(Card_1.Card, { style: {
                width: "728px",
                zIndex: 1,
                position: "relative",
                overflow: "hidden",
                backgroundColor: isSearchActive ? theme.colors.neutral150 : undefined,
                borderColor: isSearchActive ? theme.colors.neutral300 : undefined,
                transition: "background-color 0.3s ease-in"
            } },
            removed && (react_1.default.createElement(ItemCardRemovedOverlay_1.ItemCardRemovedOverlay, null)),
            react_1.default.createElement("div", { ref: refs.previewRef },
                react_1.default.createElement(Card_1.CardBody, null,
                    react_1.default.createElement(ItemCardHeader_1.default, { title: title, path: isExternal ? externalPath : absolutePath, icon: isExternal ? icons_1.Earth : isWrapper ? icons_1.Cog : icons_1.Link, onItemRemove: () => onItemRemove(item), onItemEdit: () => onItemEdit({
                            ...item,
                            isMenuAllowedLevel,
                            isParentAttachedToMenu,
                            isSearchActive: false,
                        }, levelPath, isParentAttachedToMenu), onItemRestore: () => onItemRestore(item), dragRef: refs.dragRef, removed: removed, canUpdate: canUpdate, isSearchActive: isSearchActive })),
                react_1.default.createElement(Divider_1.Divider, null),
                !isExternal && (react_1.default.createElement(Card_1.CardBody, { style: { padding: '8px' } },
                    react_1.default.createElement(Flex_1.Flex, { style: { width: '100%' }, direction: "row", alignItems: "center", justifyContent: "space-between" },
                        react_1.default.createElement(Flex_1.Flex, null,
                            !(0, lodash_1.isEmpty)(item.items) && react_1.default.createElement(CollapseButton_1.default, { toggle: () => onItemToggleCollapse(item), collapsed: collapsed, itemsCount: item.items.length }),
                            canUpdate && (react_1.default.createElement(TextButton_1.TextButton, { disabled: removed, startIcon: react_1.default.createElement(icons_1.Plus, null), onClick: onNewItemClick },
                                react_1.default.createElement(Typography_1.Typography, { variant: "pi", fontWeight: "bold", textColor: removed ? "neutral600" : "primary600" }, (0, utils_1.getMessage)("components.navigationItem.action.newItem"))))),
                        relatedItemLabel && (react_1.default.createElement(Flex_1.Flex, { justifyContent: 'center', alignItems: 'center' },
                            isHandledByPublishFlow && (react_1.default.createElement(ItemCardBadge_1.default, { borderColor: `${relatedBadgeColor}200`, backgroundColor: `${relatedBadgeColor}100`, textColor: `${relatedBadgeColor}600`, className: "action", small: true }, (0, utils_1.getMessage)({ id: `components.navigationItem.badge.${isPublished ? 'published' : 'draft'}` }))),
                            react_1.default.createElement(Typography_1.Typography, { variant: "omega", textColor: 'neutral600' },
                                relatedTypeLabel,
                                "\u00A0/\u00A0"),
                            react_1.default.createElement(Typography_1.Typography, { variant: "omega", textColor: 'neutral800' }, relatedItemLabel),
                            react_1.default.createElement(Link_1.Link, { to: generatePreviewUrl(relatedRef), endIcon: react_1.default.createElement(icons_1.ArrowRight, null) }, "\u00A0")))))))),
        hasChildren && !removed && !collapsed && react_1.default.createElement(NavigationItemList_1.default, { onItemLevelAdd: onItemLevelAdd, onItemRemove: onItemRemove, onItemEdit: onItemEdit, onItemRestore: onItemRestore, onItemReOrder: onItemReOrder, onItemToggleCollapse: onItemToggleCollapse, error: error, allowedLevels: allowedLevels, isParentAttachedToMenu: menuAttached, items: item.items, level: level + 1, levelPath: absolutePath, contentTypes: contentTypes, contentTypesNameFields: contentTypesNameFields, permissions: permissions })));
};
Item.propTypes = {
    item: prop_types_1.default.shape({
        title: prop_types_1.default.string,
        type: prop_types_1.default.string,
        uiRouterKey: prop_types_1.default.string,
        path: prop_types_1.default.string,
        externalPath: prop_types_1.default.string,
        related: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.number]),
        menuAttached: prop_types_1.default.bool,
        collapsed: prop_types_1.default.bool,
    }).isRequired,
    relatedRef: prop_types_1.default.object,
    level: prop_types_1.default.number,
    levelPath: prop_types_1.default.string,
    isParentAttachedToMenu: prop_types_1.default.bool,
    onItemRestore: prop_types_1.default.func.isRequired,
    onItemLevelAdd: prop_types_1.default.func.isRequired,
    onItemRemove: prop_types_1.default.func.isRequired,
    onItemReOrder: prop_types_1.default.func.isRequired,
    onItemToggleCollapse: prop_types_1.default.func.isRequired,
    config: prop_types_1.default.shape({
        contentTypes: prop_types_1.default.array.isRequired,
        contentTypesNameFields: prop_types_1.default.object.isRequired,
    }).isRequired
};
exports.default = Item;
//# sourceMappingURL=index.js.map