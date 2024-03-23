"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
const Item_1 = __importDefault(require("../Item"));
const Wrapper_1 = __importDefault(require("./Wrapper"));
const List = ({ allowedLevels, error, isParentAttachedToMenu = false, items, level = 0, levelPath = '', onItemEdit, onItemLevelAdd, onItemRemove, onItemRestore, onItemReOrder, onItemToggleCollapse, displayFlat, contentTypes, contentTypesNameFields, permissions, }) => (react_1.default.createElement(Wrapper_1.default, { level: level }, items.map((item, n) => {
    const { relatedRef, ...itemProps } = item;
    return (react_1.default.createElement(Item_1.default, { key: `list-item-${item.viewId || n}`, item: itemProps, isLast: n === items.length - 1, relatedRef: relatedRef, level: level, levelPath: levelPath, isParentAttachedToMenu: isParentAttachedToMenu, allowedLevels: allowedLevels, onItemRestore: onItemRestore, onItemLevelAdd: onItemLevelAdd, onItemRemove: onItemRemove, onItemEdit: onItemEdit, onItemReOrder: onItemReOrder, onItemToggleCollapse: onItemToggleCollapse, error: error, displayChildren: displayFlat, config: {
            contentTypes,
            contentTypesNameFields
        }, permissions: permissions, isSearchActive: !!item.isSearchActive }));
})));
List.propTypes = {
    allowedLevels: prop_types_1.default.number,
    isParentAttachedToMenu: prop_types_1.default.bool,
    items: prop_types_1.default.array,
    level: prop_types_1.default.number,
    onItemLevelAdd: prop_types_1.default.func.isRequired,
    onItemRemove: prop_types_1.default.func.isRequired,
    onItemRestore: prop_types_1.default.func.isRequired,
    onItemRestore: prop_types_1.default.func.isRequired,
    onItemReOrder: prop_types_1.default.func.isRequired,
    onItemToggleCollapse: prop_types_1.default.func.isRequired,
    contentTypes: prop_types_1.default.array.isRequired,
    contentTypesNameFields: prop_types_1.default.object.isRequired
};
exports.default = List;
//# sourceMappingURL=index.js.map