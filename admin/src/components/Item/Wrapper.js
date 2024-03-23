"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
const Wrapper = styled_components_1.default.div `
position: relative;
margin-top: ${({ theme }) => theme.spaces[2]};
margin-left: ${({ level }) => level && '54px'}};

${({ level, theme, isLast }) => level && `
	&::before {
		${!isLast && 'content: "";'}
		display: block;
		top: ${theme.spaces[1]};
		left: -24px;
		position: absolute;
		height: calc(100% + ${theme.spaces[2]});
		width: 19px;
		border: 0px solid transparent;
		border-left: 4px solid ${theme.colors.neutral300};
	}

	&::after {
		content: "";
		display: block;
		height: 22px;
		width: 19px;
		position: absolute;
		top: ${theme.spaces[1]};
		left: -${theme.spaces[6]};
		
		background: transparent;
		border: 4px solid ${theme.colors.neutral300};
		border-top: transparent;
		border-right: transparent;
		border-radius: 0 0 0 100%;
	}
`};
`;
exports.default = Wrapper;
//# sourceMappingURL=Wrapper.js.map