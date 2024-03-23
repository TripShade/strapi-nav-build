import React from "react";
import { Effect } from "../../../../types";
interface Props {
    value: string;
    setValue: Effect<{
        value: string;
        index: number;
    }>;
    initialIndex?: number;
}
declare const Search: ({ value, setValue, initialIndex }: Props) => React.JSX.Element;
export default Search;
//# sourceMappingURL=index.d.ts.map