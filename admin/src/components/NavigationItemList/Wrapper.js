"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
const Wrapper = styled_components_1.default.div `
  position: relative;
  ${({ level, theme }) => level && `
    &::before {
      content: "";
      display: block;
      height: ${theme.spaces[3]};
      width: 19px;

      position: absolute;
      top: -${theme.spaces[2]};
      left: 30px;
      
      border: 0px solid transparent;
      border-left: 4px solid ${theme.colors.neutral300};
    }
  `};
`;
exports.default = Wrapper;
//# sourceMappingURL=Wrapper.js.map