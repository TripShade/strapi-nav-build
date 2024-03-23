"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationItemPopupFooter = void 0;
const react_1 = __importDefault(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
const Button_1 = require("@strapi/design-system/Button");
const ModalLayout_1 = require("@strapi/design-system/ModalLayout");
const utils_1 = require("../../../../utils");
const NavigationItemPopupFooter = ({ handleCancel, handleSubmit, submitDisabled, formViewId, canUpdate }) => {
    if (!canUpdate) {
        return null;
    }
    return (react_1.default.createElement(ModalLayout_1.ModalFooter, { startActions: react_1.default.createElement(Button_1.Button, { onClick: handleCancel, variant: "tertiary" }, (0, utils_1.getMessage)('popup.item.form.button.cancel')), endActions: react_1.default.createElement(Button_1.Button, { onClick: handleSubmit, disabled: submitDisabled }, (0, utils_1.getMessage)(`popup.item.form.button.save`)) }));
};
exports.NavigationItemPopupFooter = NavigationItemPopupFooter;
exports.NavigationItemPopupFooter.defaultProps = {
    onValidate: undefined,
    submitDisabled: false,
    formViewId: undefined,
};
exports.NavigationItemPopupFooter.propTypes = {
    handleCancel: prop_types_1.default.func.isRequired,
    handleSubmit: prop_types_1.default.func,
    submitDisabled: prop_types_1.default.bool,
    formViewId: prop_types_1.default.object,
    canUpdate: prop_types_1.default.bool,
};
//# sourceMappingURL=NavigationItemPopupFooter.js.map