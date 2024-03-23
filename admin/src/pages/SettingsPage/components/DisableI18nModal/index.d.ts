import React, { FC } from "react";
interface Form {
    pruneNavigations: boolean;
    enabled: boolean;
}
interface SubmitEffect {
    ({ pruneNavigations }: Form): void;
}
interface CancelEffect {
    (): void;
}
interface Props {
    onSubmit: SubmitEffect;
    onCancel: CancelEffect;
}
export declare const DisableI18nModal: FC<Props>;
export declare const useDisableI18nModal: (onSubmit: SubmitEffect) => {
    setDisableI18nModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
    setI18nModalOnCancel: React.Dispatch<React.SetStateAction<() => void>>;
    disableI18nModal: React.JSX.Element | null;
};
export {};
//# sourceMappingURL=index.d.ts.map