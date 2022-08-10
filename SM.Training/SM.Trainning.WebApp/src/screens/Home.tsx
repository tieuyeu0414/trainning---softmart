import React from "react";
import { adm_RoleDTO } from "../DtoParams/Administration/RoleDto";
import { iBaseProps, iBaseState } from "../Interfaces/iBaseComponent";
import EnvConfig from "../Utils/EnvConfig";
import HttpUtils from "../Utils/HttpUtils";

interface iProp extends iBaseProps { }
interface iState extends iBaseState { }

export default class Home extends React.Component<iProp, iState> {
    constructor(props: any) {
        super(props);

        let id = this.props.match.params.id;
        this.state = {

        };
    }

    async componentDidMount() {
        const request = new adm_RoleDTO();
        request.FunctionCodes = [];
        
        const response = await HttpUtils.post<adm_RoleDTO>(
            EnvConfig.getApiHost() + "/Api/webs/sample/testpost",
            JSON.stringify(request)
        );
        
        console.log(response);
    }

    render() {
        return (
            <div className="layout-main">
                <div className="card card-w-title">
                    <div className="p-grid">
                        <div className="p-col-3">
                        HOME
                        </div>
                        <div className="p-col-3">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
