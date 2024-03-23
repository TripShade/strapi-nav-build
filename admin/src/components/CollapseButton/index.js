"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const Flex_1 = require("@strapi/design-system/Flex");
const Typography_1 = require("@strapi/design-system/Typography");
const Icon_1 = require("@strapi/design-system/Icon");
const icons_1 = require("@strapi/icons");
const Wrapper = styled_components_1.default.div `
	border-radius: 50%;
	background: #DCDCE4;
	width: 25px;
	height: 25px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 8px;
`;
const CollapseButton = ({ toggle, collapsed, itemsCount }) => (react_1.default.createElement(Flex_1.Flex, { justifyContent: 'space-between', alignItems: 'center', onClick: toggle, cursor: "pointer", style: { marginRight: '16px' } },
    react_1.default.createElement(Wrapper, null, collapsed ?
        react_1.default.createElement(Icon_1.Icon, { as: icons_1.CarretDown, width: '7px', height: '4px' }) :
        react_1.default.createElement(Icon_1.Icon, { as: icons_1.CarretUp, width: '7px', height: '4px' })),
    react_1.default.createElement(Typography_1.Typography, { variant: "pi" },
        itemsCount,
        " nested items")));
exports.default = CollapseButton;
//# sourceMappingURL=index.js.map