import React from 'react';
import { Effect, NavigationItemCustomField, VoidEffect } from '../../../../../../types';
interface ICustomFieldFormProps {
    customField: Partial<NavigationItemCustomField>;
    isEditForm: boolean;
    onSubmit: Effect<NavigationItemCustomField>;
    onClose: VoidEffect;
    usedCustomFieldNames: string[];
}
declare const CustomFieldForm: React.FC<ICustomFieldFormProps>;
export default CustomFieldForm;
//# sourceMappingURL=index.d.ts.map