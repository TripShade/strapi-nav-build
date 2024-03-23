import { NavigationItemCustomField } from "../../../../../types";
export declare const schemaFactory: (usedCustomFieldNames: string[]) => import("yup/lib/object").OptionalObjectSchema<{
    name: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    label: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    type: import("yup/lib/mixed").MixedSchema<any, Record<string, any>, any>;
    required: import("yup/lib/boolean").RequiredBooleanSchema<boolean | undefined, Record<string, any>>;
    multi: import("yup/lib/mixed").MixedSchema<any, Record<string, any>, any>;
    options: import("yup/lib/mixed").MixedSchema<any, Record<string, any>, any>;
    enabled: import("yup").BooleanSchema<boolean | undefined, Record<string, any>, boolean | undefined>;
}, Record<string, any>, import("yup/lib/object").TypeOfShape<{
    name: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    label: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    type: import("yup/lib/mixed").MixedSchema<any, Record<string, any>, any>;
    required: import("yup/lib/boolean").RequiredBooleanSchema<boolean | undefined, Record<string, any>>;
    multi: import("yup/lib/mixed").MixedSchema<any, Record<string, any>, any>;
    options: import("yup/lib/mixed").MixedSchema<any, Record<string, any>, any>;
    enabled: import("yup").BooleanSchema<boolean | undefined, Record<string, any>, boolean | undefined>;
}>>;
export declare const defaultValues: NavigationItemCustomField;
//# sourceMappingURL=form.d.ts.map