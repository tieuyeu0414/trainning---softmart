import SERVICE_ORDER from "../../entities/ServiceOrder/SERVICE_ORDER";
import { BaseDTO } from "../BaseParam";

    class SERVICE_ORDERDTO extends BaseDTO
    {
		public id? : number;

		public type? : "XAC_NHAN" | "DA_TRA" | "DANG_DAT";

		public pageIndex? : number;

		public pageSize? : number;

		public SERVICE_ORDER? : SERVICE_ORDER;

		public SERVICE_ORDERs? : Array<SERVICE_ORDER>;
		
		public Filter? : SERVICE_ORDERFilter;
    }

    class SERVICE_ORDERFilter
    {
		
    }
	
	export { SERVICE_ORDERDTO, SERVICE_ORDERFilter }
  