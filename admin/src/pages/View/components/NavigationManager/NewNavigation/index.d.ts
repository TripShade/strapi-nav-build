import React from "react";
import { Footer } from "../Footer";
import { CommonProps, CreateState, Navigation } from "../types";
interface Props extends CreateState, CommonProps {
}
export declare const INITIAL_NAVIGATION: Navigation;
export declare const NewNavigation: ({ setState, current, isLoading, alreadyUsedNames, }: Props) => React.JSX.Element;
export declare const NewNavigationFooter: Footer;
export {};
//# sourceMappingURL=index.d.ts.map