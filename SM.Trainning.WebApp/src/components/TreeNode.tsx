export default class TreeNode {
    ID?: number;
    ParentID?: number;
    Text?: string;
    TextFilter?: string;
    Icon?: string;
    Selectable?: boolean;
    key?: any;
    // icon?: string;
    children?: TreeNode[];
    display?: boolean;
}
