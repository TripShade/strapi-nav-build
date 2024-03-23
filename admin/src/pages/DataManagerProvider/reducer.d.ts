export default reducer;
declare function reducer(state: any, action: any): (base?: ((draftState: any) => any) | undefined, ...args: unknown[]) => ((draftState: any) => any) | Promise<(draftState: any) => any>;
export namespace initialState {
    let items: never[];
    let activeItem: undefined;
    let changedActiveItem: undefined;
    let navigationPopupOpened: boolean;
    let navigationItemPopupOpened: boolean;
    let config: {};
    let isLoading: boolean;
    let isLoadingForDataToBeSet: boolean;
    let isLoadingForDetailsDataToBeSet: boolean;
    let isLoadingForAdditionalDataToBeSet: boolean;
    let isLoadingForSubmit: boolean;
    let error: undefined;
    let i18nEnabled: boolean;
    let cascadeMenuAttached: boolean;
    let availableLocale: never[];
}
//# sourceMappingURL=reducer.d.ts.map