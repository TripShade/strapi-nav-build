"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const Flex_1 = require("@strapi/design-system/Flex");
const Typography_1 = require("@strapi/design-system/Typography");
const IconButton_1 = require("@strapi/design-system/IconButton");
const Icon_1 = require("@strapi/design-system/Icon");
const DragButton_1 = __importDefault(require("../../DragButton"));
const Wrapper_1 = __importDefault(require("./Wrapper"));
const ItemCardBadge_1 = __importDefault(require("../ItemCardBadge"));
const utils_1 = require("../../../utils");
const icons_1 = require("./icons");
const wrapperStyle = { zIndex: 2 };
const pathWrapperStyle = { maxWidth: "425px" };
const ItemCardHeader = ({ title, path, icon, removed, canUpdate, onItemRemove, onItemEdit, onItemRestore, dragRef, isSearchActive }) => (react_1.default.createElement(Wrapper_1.default, null,
    react_1.default.createElement(Flex_1.Flex, { alignItems: "center" },
        canUpdate && (react_1.default.createElement(DragButton_1.default, { ref: dragRef, isActive: isSearchActive })),
        react_1.default.createElement(Typography_1.Typography, { variant: "omega", fontWeight: "bold" }, title),
        react_1.default.createElement(Typography_1.Typography, { variant: "omega", fontWeight: "bold", textColor: 'neutral500', ellipsis: true, style: pathWrapperStyle }, path),
        react_1.default.createElement(Flex_1.Flex, null,
            react_1.default.createElement(Icon_1.Icon, { as: icon }))),
    react_1.default.createElement(Flex_1.Flex, { alignItems: "center", style: wrapperStyle },
        removed &&
            (react_1.default.createElement(ItemCardBadge_1.default, { borderColor: "danger200", backgroundColor: "danger100", textColor: "danger600" }, (0, utils_1.getMessage)("components.navigationItem.badge.removed"))),
        react_1.default.createElement(IconButton, { isActive: isSearchActive, disabled: removed, onClick: onItemEdit, label: (0, utils_1.getMessage)(`components.navigationItem.action.${canUpdate ? 'edit' : 'view'}`, canUpdate ? 'Edit' : 'View'), icon: canUpdate ? icons_1.pencilIcon : icons_1.eyeIcon }),
        canUpdate && (react_1.default.createElement(react_1.default.Fragment, null, removed ?
            react_1.default.createElement(IconButton, { isActive: isSearchActive, onClick: onItemRestore, label: (0, utils_1.getMessage)('components.navigationItem.action.restore', "Restore"), icon: icons_1.refreshIcon }) :
            react_1.default.createElement(IconButton, { isActive: isSearchActive, onClick: onItemRemove, label: (0, utils_1.getMessage)('components.navigationItem.action.remove', "Remove"), icon: icons_1.trashIcon }))))));
const IconButton = (0, styled_components_1.default)(IconButton_1.IconButton) `
  transition: background-color 0.3s ease-in;
  ${({ isActive, theme }) => isActive ? `background-color: ${theme.colors.neutral150} ;` : ''}
`;
exports.default = ItemCardHeader;
//# sourceMappingURL=index.js.map