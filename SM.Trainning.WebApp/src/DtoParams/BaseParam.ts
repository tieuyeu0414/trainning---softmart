import PagingInfo from "../models/PagingInfo";
import TabInfo from '../models/TabInfo'

class BaseDTO {
    public PageIndex?: number;
    public PagingInfo?: PagingInfo;
    public FunctionCodes?: Array<string>;
    public TabInfoParam?: string;
    public TabInfo?: TabInfo[];
    public PagePermissions?: string[];
    public FunctionCode?: string;
    public UCToken?: string;
}

class BaseFilter {
    public PageIndex?: number;
    public RowSkip?: number;
}

export { BaseDTO, BaseFilter }