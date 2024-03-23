import React from 'react';
import { Effect, NavigationItemCustomField } from '../../../../../../types';
interface ICustomFieldTableProps {
    data: NavigationItemCustomField[];
    onOpenModal: (field: NavigationItemCustomField | null) => void;
    onRemoveCustomField: Effect<NavigationItemCustomField>;
    onToggleCustomField: Effect<NavigationItemCustomField>;
}
declare const CustomFieldTable: React.FC<ICustomFieldTableProps>;
export default CustomFieldTable;
//# sourceMappingURL=index.d.ts.map