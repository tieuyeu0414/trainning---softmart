import BaseModel from "../BaseModel";

    export default class SERVICE_ORDER extends BaseModel
    {
        public LIST_ID?: Array<number>;
        public CARCATEGORY_ID?: number | null;

        public NAME_CAR?: string;
        public NAME_TIMECATEGORY?: string;
        public ORDER_ID?: number;    
        public CAR_ID?: number;    
        public TIME_CATEGORY?: number;    
        public ORDER_DURATION?: number;    
        public PLANSTART_DTG?: Date;    
        public PLANEND_DTG?: Date;    
        public ACTUALSTART_DTG?: Date;    
        public ACTUALEND_DTG?: Date;    
        public CUSTOMER_NAME?: string;    
        public DESCRIPTION?: string;    
        public STATUS?: number | null;    
        public DELETED?: number;    
        public VERSION?: number;    
        public CREATEDBY?: string;    
        public CREATEDDTG?: Date;    
        public UPDATEDBY?: string;    
        public UPDATEDDTG?: Date;    
    }
  