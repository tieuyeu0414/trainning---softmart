export default class RouteInfo {
    Path: string;
    Param: string;
    Component: any;
    Exact: boolean;
    Title?: string;
    Icon?: string;
    Key: string;
    CheckMenu?: boolean

    constructor(path: string, param: string, component: any, exact: boolean, title: string, icon: string, key: string, checkMenu: boolean) {
        this.Path = path;
        this.Param = param;
        this.Component = component;
        this.Exact = exact;
        this.Title = title;
        this.Icon = icon;
        this.Key = key;
        this.CheckMenu = checkMenu
    }
}