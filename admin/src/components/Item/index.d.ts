export default Item;
declare function Item(props: any): React.JSX.Element;
declare namespace Item {
    namespace propTypes {
        let item: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            title: PropTypes.Requireable<string>;
            type: PropTypes.Requireable<string>;
            uiRouterKey: PropTypes.Requireable<string>;
            path: PropTypes.Requireable<string>;
            externalPath: PropTypes.Requireable<string>;
            related: PropTypes.Requireable<NonNullable<string | number | null | undefined>>;
            menuAttached: PropTypes.Requireable<boolean>;
            collapsed: PropTypes.Requireable<boolean>;
        }>>>;
        let relatedRef: PropTypes.Requireable<object>;
        let level: PropTypes.Requireable<number>;
        let levelPath: PropTypes.Requireable<string>;
        let isParentAttachedToMenu: PropTypes.Requireable<boolean>;
        let onItemRestore: PropTypes.Validator<(...args: any[]) => any>;
        let onItemLevelAdd: PropTypes.Validator<(...args: any[]) => any>;
        let onItemRemove: PropTypes.Validator<(...args: any[]) => any>;
        let onItemReOrder: PropTypes.Validator<(...args: any[]) => any>;
        let onItemToggleCollapse: PropTypes.Validator<(...args: any[]) => any>;
        let config: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            contentTypes: PropTypes.Validator<any[]>;
            contentTypesNameFields: PropTypes.Validator<object>;
        }>>>;
    }
}
import React from 'react';
import PropTypes from 'prop-types';
//# sourceMappingURL=index.d.ts.map