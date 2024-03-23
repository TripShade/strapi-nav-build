import React from "react";
import { VoidEffect } from "../../../../../../../types";
import { Navigation, SetState, State } from "../types";
interface FooterBaseProps {
    end?: ActionProps;
    start?: ActionProps;
}
export type Footer = React.FC<{
    navigations: Array<Navigation>;
    onClose?: VoidEffect;
    onReset: VoidEffect;
    onSubmit: VoidEffect;
    setState: SetState;
    state: State;
}>;
interface ActionProps {
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: VoidEffect;
    variant: "danger" | "secondary" | "tertiary" | "default";
}
export declare const FooterBase: React.FC<FooterBaseProps>;
export {};
//# sourceMappingURL=index.d.ts.map