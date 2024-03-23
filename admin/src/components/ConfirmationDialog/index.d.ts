export default ConfirmationDialog;
declare function ConfirmationDialog({ isVisible, isActionAsync, children, onConfirm, onCancel, header, labelCancel, labelConfirm, iconConfirm, mainIcon }: {
    isVisible?: boolean | undefined;
    isActionAsync?: boolean | undefined;
    children: any;
    onConfirm: any;
    onCancel: any;
    header: any;
    labelCancel: any;
    labelConfirm: any;
    iconConfirm: any;
    mainIcon?: React.JSX.Element | undefined;
}): React.JSX.Element;
declare namespace ConfirmationDialog {
    namespace propTypes {
        let isVisible: PropTypes.Requireable<boolean>;
        let isActionAsync: PropTypes.Requireable<boolean>;
        let children: PropTypes.Requireable<any>;
        let header: PropTypes.Requireable<string>;
        let labelCancel: PropTypes.Requireable<string>;
        let labelConfirm: PropTypes.Requireable<string>;
        let iconConfirm: PropTypes.Requireable<object>;
        let onConfirm: PropTypes.Validator<(...args: any[]) => any>;
        let onCancel: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import React from 'react';
import PropTypes from 'prop-types';
//# sourceMappingURL=index.d.ts.map