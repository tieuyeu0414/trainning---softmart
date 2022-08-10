import BaseModel from "../BaseModel";

export default class CAR extends BaseModel {
    public CAR_ID ? : number;
    public CATEGORY_ID ? : number;
    public COLOR ? : string;
    public DESCRIPTION ? : string;
    public PLATE_NUMBER ? : string;
    public PRICE ? : number;
    public NAME ? : string;
    public NAME_CARCATEGORY ? : string;
}