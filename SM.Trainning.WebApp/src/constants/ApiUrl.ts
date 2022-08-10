import EnvConfig from "../Utils/EnvConfig";

class ApiUrl {
    static Role_Execute = EnvConfig.getApiHost() + "/Api/Internal/Administration/Role";

    static Get_All_ServiceOrder = EnvConfig.getApiHost() + "/api/v1/ServiceOrder";
    static Insert_ServiceOrder = EnvConfig.getApiHost() + "/api/v1/ServiceOrder/insert";
    static updateStatus_ServiceOrder = EnvConfig.getApiHost() + "/api/v1/ServiceOrder/update-status";
    static updateTime_ServiceOrder = EnvConfig.getApiHost() + "/api/v1/ServiceOrder/update-time";
    static delete_ServiceOrder = EnvConfig.getApiHost() + "/api/v1/ServiceOrder/delete";


    static Get_All_CarCategory = EnvConfig.getApiHost() + "/api/v1/CarCategory";
    static Get_By_Id_CarCategory = EnvConfig.getApiHost() + "/api/v1/CarCategory/get-by-id";
    static Insert_CarCategory = EnvConfig.getApiHost() + "/api/v1/CarCategory/insert";
    static Update_CarCategory = EnvConfig.getApiHost() + "/api/v1/CarCategory/update";
    static Delete_CarCategory = EnvConfig.getApiHost() + "/api/v1/CarCategory/delete";
    static List_Select_CarCategory = EnvConfig.getApiHost() + "/api/v1/CarCategory/list-select";

    static Get_All_Car = EnvConfig.getApiHost() + "/api/v1/Car";
    static Get_By_Id_Car = EnvConfig.getApiHost() + "/api/v1/Car/get-by-id";
    static Insert_Car = EnvConfig.getApiHost() + "/api/v1/Car/insert";
    static Update_Car = EnvConfig.getApiHost() + "/api/v1/Car/update";
    static Delete_Car = EnvConfig.getApiHost() + "/api/v1/Car/delete";
    static List_Select_Car = EnvConfig.getApiHost() + "/api/v1/Car/list-select";
    static Search_ListID_Car = EnvConfig.getApiHost() + "/api/v1/Car/search-listID";

    static Get_All_TimeCategory = EnvConfig.getApiHost() + "/api/v1/TimeCategory";
    static Insert_TimeCategory = EnvConfig.getApiHost() + "/api/v1/TimeCategory/insert";
    static Get_By_Id_TimeCategory = EnvConfig.getApiHost() + "/api/v1/TimeCategory/get-by-id";
    static Update_TimeCategory = EnvConfig.getApiHost() + "/api/v1/TimeCategory/update";
    static Delete_TimeCategory = EnvConfig.getApiHost() + "/api/v1/TimeCategory/delete";
    static List_Select_TimeCategory = EnvConfig.getApiHost() + "/api/v1/TimeCategory/list-select";
}

export default ApiUrl;