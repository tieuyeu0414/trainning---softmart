import CARCATEGORY from "../../entities/CarCategory/CARCATEGORY";
import { BaseDTO } from "../BaseParam";

    class CARCATEGORYDTO extends BaseDTO
    {
        public id? : number;

        public CARCATEGORY? : CARCATEGORY;

        public CARCATEGORYs? : Array<CARCATEGORY>;
        
        public Filter? : CARCATEGORYFilter;
    }

    class CARCATEGORYFilter
    {
    }
	
	export { CARCATEGORYDTO, CARCATEGORYFilter }
  