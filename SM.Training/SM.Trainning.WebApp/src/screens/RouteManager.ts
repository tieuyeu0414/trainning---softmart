// Common
import RouteInfo from "./../models/RouteInfo";
// Administration - Role
import Home from "./Home";


const RouteUrls = class {
    static Default: string = "list";
    static AddNew: string = "addnew";
    static Edit: string = "edit";
    static Display: string = "display";
    static Setting: string = "setting";
    static Review: string = "review";

    static ExportProposal: string = "exportproposal";
    static ImportProposal: string = "importproposal";

    static TabHopDongEdit: string = 'mortgage-contract-edit';
    static TabHopDongDisplay: string = 'mortgage-contract-info';
};

/**
 * Full Route collection
 */
const RouteCollection: RouteInfo[] = [
    new RouteInfo("/home", "", Home, true),
    new RouteInfo("/list", "/:id", Home, true),
];

const GetRouteInfoByPath = (path: string) => {
    path = path.toLowerCase();
    let enRoute = RouteCollection.find((en) => en.Path.toLowerCase() === path);
    return enRoute;
};

export { RouteUrls, RouteCollection, GetRouteInfoByPath };

