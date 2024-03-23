import React from 'react';
import { Effect } from '../../../../types';
import { GenericInputProps } from "@strapi/helper-plugin";
interface IProps {
    onChange: Effect<string[]>;
    initialValue?: string[];
    id?: string;
    name?: string;
    label?: string;
    disabled?: boolean;
    error?: GenericInputProps["error"];
}
declare const TextArrayInput: React.FC<IProps>;
export default TextArrayInput;
//# sourceMappingURL=index.d.ts.map