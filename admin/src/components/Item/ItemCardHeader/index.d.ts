import React from 'react';
import { ToBeFixed, VoidEffect } from '../../../../../types';
interface IProps {
    title: string;
    path: string;
    icon: ToBeFixed;
    removed: boolean;
    canUpdate: boolean;
    onItemRemove: VoidEffect;
    onItemEdit: VoidEffect;
    onItemRestore: VoidEffect;
    dragRef: React.MutableRefObject<HTMLHeadingElement>;
    isSearchActive?: boolean;
}
declare const ItemCardHeader: React.FC<IProps>;
export default ItemCardHeader;
//# sourceMappingURL=index.d.ts.map