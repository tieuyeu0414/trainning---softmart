import TIMECATEGORY from "../../entities/TimeCategory/TIMECATEGORY";
import { BaseDTO } from "../BaseParam";

    class TIMECATEGORYDTO extends BaseDTO
    {
		public id? : number;

		public pageIndex? : number;

		public pageSize? : number;

		public TIMECATEGORY? : TIMECATEGORY;

		public TIMECATEGORies? : Array<TIMECATEGORY>;
		
		public Filter? : TIMECATEGORYFilter;
    }

    class TIMECATEGORYFilter
    {
		
    }
	
	export { TIMECATEGORYDTO, TIMECATEGORYFilter }
  