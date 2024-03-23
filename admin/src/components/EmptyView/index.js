"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
const Box_1 = require("@strapi/design-system/Box");
const Button_1 = require("@strapi/design-system/Button");
const EmptyView = styled_components_1.default.div `
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 8rem;


  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral600};
  text-align: center;

	> {
		margin: 1rem;
	}
`;
exports.default = EmptyView;
//# sourceMappingURL=index.js.map