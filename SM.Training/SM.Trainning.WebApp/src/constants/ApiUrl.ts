import EnvConfig from "../Utils/EnvConfig";

class ApiUrl {
    static Role_Execute = EnvConfig.getApiHost() + "/Api/Internal/Administration/Role";
}

export default ApiUrl;