import React from "react";
import { iBaseProps, iBaseState } from "../Interfaces/iBaseComponent";

interface iProp extends iBaseProps { }
interface iState extends iBaseState { }

export default class Home extends React.Component<iProp, iState> {
    constructor(props: any) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="layout-main">
                <div className="p-grid">
                    <div className="p-col-3">
                        <span className="title-info"
                            onClick={() => {
                                this.props.history.push(`./administration/roles/list`)
                            }}
                        >
                            Quản lý role
                        </span>
                    </div>
                    <div className="p-col-3">
                        <span className="title-info">Quản lý Employee</span>
                    </div>
                </div>
            </div>
        );
    }
}
