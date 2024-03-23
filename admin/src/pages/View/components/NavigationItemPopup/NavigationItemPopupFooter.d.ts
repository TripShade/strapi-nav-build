export function NavigationItemPopupFooter({ handleCancel, handleSubmit, submitDisabled, formViewId, canUpdate }: {
    handleCancel: any;
    handleSubmit: any;
    submitDisabled: any;
    formViewId: any;
    canUpdate: any;
}): React.JSX.Element | null;
export namespace NavigationItemPopupFooter {
    namespace defaultProps {
        let onValidate: undefined;
        let submitDisabled: boolean;
        let formViewId: undefined;
    }
    namespace propTypes {
        export let handleCancel: PropTypes.Validator<(...args: any[]) => any>;
        export let handleSubmit: PropTypes.Requireable<(...args: any[]) => any>;
        let submitDisabled_1: PropTypes.Requireable<boolean>;
        export { submitDisabled_1 as submitDisabled };
        let formViewId_1: PropTypes.Requireable<object>;
        export { formViewId_1 as formViewId };
        export let canUpdate: PropTypes.Requireable<boolean>;
    }
}
import React from 'react';
import PropTypes from 'prop-types';
//# sourceMappingURL=NavigationItemPopupFooter.d.ts.map