import CAR from "../entities/Car/Car";
import CARCATEGORY from "../entities/CarCategory/CARCATEGORY";
import SERVICE_ORDER from "../entities/ServiceOrder/SERVICE_ORDER";
import TIMECATEGORY from "../entities/TimeCategory/TIMECATEGORY";

//interface quản lý danh mục xe
export interface IDataManageCategory extends CARCATEGORY{
    key?: string | number,
    action_delete?: any,
    action_update?: any,
    stt?: number
}

//interface quản lý xe
export interface IDataManageList extends CAR{
    key?: string | number,
    action_delete?: any,
    action_update?: any,
    stt?: number
}

//interface quản lý thời gian thuê
export interface IDataManageTime extends TIMECATEGORY{
    key?: string | number
    action_delete?: any,
    action_update?: any,
    stt?: number
}

//interface quản lý đặt xe
export interface IDataManageOrder extends SERVICE_ORDER{
    key?: string | number
    action_delete?: any,
    action_update?: any,
    stt?: number
}