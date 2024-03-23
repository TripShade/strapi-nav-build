"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
const Card_1 = require("@strapi/design-system/Card");
const CardItemTitle = (0, styled_components_1.default)(Card_1.CardTitle) `
	width: 100%;
	
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	
	> div > * {
			margin: 0px ${({ theme }) => theme.spaces[1]};
	}
`;
exports.default = CardItemTitle;
//# sourceMappingURL=Wrapper.js.map