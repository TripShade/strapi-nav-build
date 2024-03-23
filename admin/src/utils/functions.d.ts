import { NavigationItemAdditionalField, NavigationItemAdditionalFieldValues, ToBeFixed } from '../../../types';
type MessageInput = {
    id: string;
    defaultMessage?: string;
    props?: Record<string, ToBeFixed>;
} | string;
type PrepareNewValueForRecord = (uid: string, current: Record<string, string[] | undefined>, value: string[]) => Record<string, string[] | undefined>;
export declare const getMessage: (input: MessageInput, defaultMessage?: string, inPluginScope?: boolean) => string;
export declare const getDefaultCustomFields: (args: {
    additionalFields: NavigationItemAdditionalField[];
    customFieldsValues: NavigationItemAdditionalFieldValues;
    defaultCustomFieldsValues: NavigationItemAdditionalFieldValues;
}) => NavigationItemAdditionalFieldValues;
export declare const prepareNewValueForRecord: PrepareNewValueForRecord;
export {};
//# sourceMappingURL=functions.d.ts.map