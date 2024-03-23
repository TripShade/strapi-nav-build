import * as yup from "yup";
import { NavigationItemAdditionalField } from "../../../../../../../types";
import { RawFormPayload } from "../types";
export declare const schemaFactory: (isSingleSelected: boolean, additionalFields: NavigationItemAdditionalField[]) => import("yup/lib/object").OptionalObjectSchema<{
    title: yup.default<string | undefined, Record<string, any>, string | undefined>;
    uiRouterKey: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    type: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    path: yup.default<string | undefined, Record<string, any>, string | undefined>;
    externalPath: yup.default<string | undefined, Record<string, any>, string | undefined>;
    menuAttached: yup.BooleanSchema<boolean | undefined, Record<string, any>, boolean | undefined>;
    relatedType: import("yup/lib/mixed").MixedSchema<any, Record<string, any>, any>;
    related: import("yup/lib/mixed").MixedSchema<any, Record<string, any>, any>;
    additionalFields: import("yup/lib/object").OptionalObjectSchema<{}, Record<string, any>, import("yup/lib/object").TypeOfShape<{}>>;
}, Record<string, any>, import("yup/lib/object").TypeOfShape<{
    title: yup.default<string | undefined, Record<string, any>, string | undefined>;
    uiRouterKey: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    type: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    path: yup.default<string | undefined, Record<string, any>, string | undefined>;
    externalPath: yup.default<string | undefined, Record<string, any>, string | undefined>;
    menuAttached: yup.BooleanSchema<boolean | undefined, Record<string, any>, boolean | undefined>;
    relatedType: import("yup/lib/mixed").MixedSchema<any, Record<string, any>, any>;
    related: import("yup/lib/mixed").MixedSchema<any, Record<string, any>, any>;
    additionalFields: import("yup/lib/object").OptionalObjectSchema<{}, Record<string, any>, import("yup/lib/object").TypeOfShape<{}>>;
}>>;
export declare const defaultValues: RawFormPayload;
//# sourceMappingURL=form.d.ts.map