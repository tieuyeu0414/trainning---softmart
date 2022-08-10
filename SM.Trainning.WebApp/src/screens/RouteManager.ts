// Common
import RouteInfo from "./../models/RouteInfo";
import RoleAddNew from "./Administrations/Roles/AddNew";
// Administration - Role
import RoleList from "./Administrations/Roles/Default";
import RoleDisplay from "./Administrations/Roles/Display";
import RoleEdit from "./Administrations/Roles/Edit";
import Home from "./Home";
//Component admin
import ManageList from "../layouts/admin/manageList/ManageList";
import ManageOrder from "../layouts/admin/manageOrder/ManageOrder";
import ManageTime from "../layouts/admin/manageTime/ManageTime";
import ManageCategory from "../layouts/admin/manageCategory/ManageCategory";
import UserOrder from "../layouts/user/userOrder/UserOrder";
import InsertManageCategory from "../layouts/admin/manageCategory/components/InsertManageCategory";
import InsertManageCar from "../layouts/admin/manageList/components/InsertManageCar";
import Confirm from "../layouts/user/userOrder/Confirm";
import InsertManageTime from "../layouts/admin/manageTime/components/InsertManageTime";


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
    //route khách hàng
    new RouteInfo("/", "", UserOrder, true, 'Đặt xe', 'fas fa-poop', "dat-xe", true),
    new RouteInfo("/dat-xe/xac-nhan", "", Confirm, true, '', '', "xac-nhan-dat-xe", false),

    //routes quản lý
    new RouteInfo("/quan-ly/loai-xe", "", ManageCategory, true, 'Quản lý loại xe', 'fas fa-folder', "loai-xe", true),
    new RouteInfo("/quan-ly/loai-xe/them-moi", "", InsertManageCategory, true, "", "", "them-moi-loai-xe", false),
    new RouteInfo("/quan-ly/loai-xe/cap-nhat/", ":id", InsertManageCategory, true, "", "", "cap-nhat-loai-xe", false),

    new RouteInfo("/quan-ly/danh-sach-xe", "", ManageList, true, 'Quản lý danh sách xe', 'fas fa-car', "danh-sach-xe", true),
    new RouteInfo("/quan-ly/danh-sach-xe/them-moi", "", InsertManageCar, true, "", "", "them-moi-danh-sach-xe", false),
    new RouteInfo("/quan-ly/danh-sach-xe/cap-nhat/", ":id", InsertManageCar, true, "", "", "cap-nhat-danh-sach-xe", false),

    new RouteInfo("/quan-ly/dat-xe", "", ManageOrder, true, 'Quản lý đặt xe', 'fas fa-smile', "quan-ly-dat-xe", true),

    new RouteInfo("/quan-ly/don-vi-thoi-gian-thue", "", ManageTime, true, 'Quản lý đơn vị thời gian thuê', 'fas fa-clock', "don-vi-thoi-gian-thue", true),
    new RouteInfo("/quan-ly/don-vi-thoi-gian-thue/them-moi", "", InsertManageTime, true, "", "", "them-moi-don-vi-thoi-gian", false),
    new RouteInfo("/quan-ly/don-vi-thoi-gian-thue/cap-nhat/", ":id", InsertManageTime, true, "", "", "cap-nhat-don-vi-thoi-gian", false),
];

const GetRouteInfoByPath = (path: string) => {
    path = path.toLowerCase();
    let enRoute = RouteCollection.find((en) => en.Path.toLowerCase() === path);
    return enRoute;
};

export { RouteUrls, RouteCollection, GetRouteInfoByPath };
