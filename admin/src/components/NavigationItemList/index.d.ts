export default List;
declare function List({ allowedLevels, error, isParentAttachedToMenu, items, level, levelPath, onItemEdit, onItemLevelAdd, onItemRemove, onItemRestore, onItemReOrder, onItemToggleCollapse, displayFlat, contentTypes, contentTypesNameFields, permissions, }: {
    allowedLevels: any;
    error: any;
    isParentAttachedToMenu?: boolean | undefined;
    items: any;
    level?: number | undefined;
    levelPath?: string | undefined;
    onItemEdit: any;
    onItemLevelAdd: any;
    onItemRemove: any;
    onItemRestore: any;
    onItemReOrder: any;
    onItemToggleCollapse: any;
    displayFlat: any;
    contentTypes: any;
    contentTypesNameFields: any;
    permissions: any;
}): React.JSX.Element;
declare namespace List {
    namespace propTypes {
        let allowedLevels: PropTypes.Requireable<number>;
        let isParentAttachedToMenu: PropTypes.Requireable<boolean>;
        let items: PropTypes.Requireable<any[]>;
        let level: PropTypes.Requireable<number>;
        let onItemLevelAdd: PropTypes.Validator<(...args: any[]) => any>;
        let onItemRemove: PropTypes.Validator<(...args: any[]) => any>;
        let onItemRestore: PropTypes.Validator<(...args: any[]) => any>;
        let onItemReOrder: PropTypes.Validator<(...args: any[]) => any>;
        let onItemToggleCollapse: PropTypes.Validator<(...args: any[]) => any>;
        let contentTypes: PropTypes.Validator<any[]>;
        let contentTypesNameFields: PropTypes.Validator<object>;
    }
}
import React from 'react';
import PropTypes from "prop-types";
//# sourceMappingURL=index.d.ts.map