import React from "react";
import { useIntl } from "react-intl";
import { Effect } from "../../../../../../../types";
import { Navigation } from "../types";
interface Props {
    navigation: Partial<Navigation>;
    onChange: Effect<Navigation>;
    isLoading?: boolean;
    validationSchema: ReturnType<typeof validationSchemaFactory>;
}
export declare const Form: ({ navigation, onChange: onChangeBase, isLoading, validationSchema, }: Props) => React.JSX.Element;
export declare const validationSchemaFactory: (alreadyUsedNames: Array<string>, formatMessage: ReturnType<typeof useIntl>["formatMessage"]) => import("yup/lib/object").OptionalObjectSchema<{
    name: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    visible: import("yup/lib/boolean").RequiredBooleanSchema<boolean | undefined, Record<string, any>>;
}, Record<string, any>, import("yup/lib/object").TypeOfShape<{
    name: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    visible: import("yup/lib/boolean").RequiredBooleanSchema<boolean | undefined, Record<string, any>>;
}>>;
export {};
//# sourceMappingURL=index.d.ts.map