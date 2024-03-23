"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
const Badge_1 = require("@strapi/design-system/Badge");
const ItemCardBadge = (0, styled_components_1.default)(Badge_1.Badge) `
		border: 1px solid ${({ theme, borderColor }) => theme.colors[borderColor]};

		${({ small, theme }) => small && `
			padding: ${theme.spaces[1]} ${theme.spaces[2]};
			margin: 0px ${theme.spaces[3]};
			vertical-align: middle;

			cursor: default;

			span {
				font-size: .65rem;
				line-height: 1;
				vertical-align: middle;
			}
		`}
`;
exports.default = ItemCardBadge;
//# sourceMappingURL=index.js.map