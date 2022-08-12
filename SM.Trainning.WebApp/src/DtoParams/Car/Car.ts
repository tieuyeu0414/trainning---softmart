import CAR from "../../entities/Car/Car";
import { BaseDTO } from "../BaseParam";

    class CARDTO extends BaseDTO
    {
		public id? : number;

		public id_Category? : number;

		public fromDate?: Date;

		public toDate?: Date;

		public pageIndex?: number;

		public pageSize? : number;

		public CAR? : CAR;

		public CARs? : Array<CAR>;
		
		public Filter? : CARFilter;

		public listID?: Array<number>;
    }

    class CARFilter
    {
		
    }
	
	export { CARDTO, CARFilter }
  