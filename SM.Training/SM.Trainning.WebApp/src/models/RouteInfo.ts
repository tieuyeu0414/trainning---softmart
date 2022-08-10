export default class RouteInfo {
    Path: string;
    Param: string;
    Component: any;
    Exact: boolean;

    constructor(path: string, param: string, component: any, exact: boolean) {
        this.Path = path;
        this.Param = param;
        this.Component = component;
        this.Exact = exact;
    }
}