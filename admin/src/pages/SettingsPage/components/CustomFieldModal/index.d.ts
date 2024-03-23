import React from 'react';
import { Effect, NavigationItemCustomField, VoidEffect } from '../../../../../../types';
interface ICustomFieldModalProps {
    data: NavigationItemCustomField | null;
    isOpen: boolean;
    onClose: VoidEffect;
    onSubmit: Effect<NavigationItemCustomField>;
    usedCustomFieldNames: string[];
}
declare const CustomFieldModal: React.FC<ICustomFieldModalProps>;
export default CustomFieldModal;
//# sourceMappingURL=index.d.ts.map