"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const icons_1 = require("@strapi/icons");
const DRAG_BUTTON_SIZE_IN_REM = 2;
const DragButtonWrapper = styled_components_1.default.span `
  display: flex;
  align-items: center;
  justify-content: center;

  height: ${DRAG_BUTTON_SIZE_IN_REM}rem;
  width: ${DRAG_BUTTON_SIZE_IN_REM}rem;
  padding: ${({ theme }) => theme.spaces[2]};

  background: ${({ theme, isActive }) => isActive ? theme.colors.neutral150 : theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: background-color 0.3s ease-in;

  svg {
    height: ${({ theme }) => theme.spaces[3]};
    width: ${({ theme }) => theme.spaces[3]};

    > g,
    path {
      fill: ${({ theme }) => theme.colors.neutral500};
    }
  }
  &:hover {
    svg {
      > g,
      path {
        fill: ${({ theme }) => theme.colors.neutral600};
      }
    }
  }
  &:active {
    svg {
      > g,
      path {
        fill: ${({ theme }) => theme.colors.neutral400};
      }
    }
  }
  &[aria-disabled='true'] {
    background-color: ${({ theme }) => theme.colors.neutral150};
    svg {
      path {
        fill: ${({ theme }) => theme.colors.neutral600};
      }
    }
  }
`;
const DragButton = react_1.default.forwardRef((props, ref) => (react_1.default.createElement(DragButtonWrapper, { ...props, ref: ref },
    react_1.default.createElement(icons_1.Drag, null))));
exports.default = DragButton;
//# sourceMappingURL=index.js.map