import TabInfo from "../models/TabInfo";

interface iBaseProps {
    history: any;
    match: any;
}

interface iBaseState {
    FunctionCodes?: string[],
    TabInfo?: TabInfo[]
    UCToken?: string;
}

export type { iBaseProps, iBaseState }