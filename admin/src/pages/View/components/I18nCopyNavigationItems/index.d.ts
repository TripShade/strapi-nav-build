import { VFC } from "react";
export interface ConfirmEffect {
    (source: string): void;
}
export interface CancelEffect {
    (): void;
}
interface Props {
    onConfirm: ConfirmEffect;
    onCancel: CancelEffect;
}
export declare const I18nCopyNavigationItemsModal: VFC<Props>;
export {};
//# sourceMappingURL=index.d.ts.map