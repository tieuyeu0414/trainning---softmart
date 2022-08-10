import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import SMX from "../../constants/SMX";
import GlobalStore from "../../Stores/GlobalStore";

interface iProps {
    history: any;
    GlobalStore: GlobalStore;
}

interface iState {
    
}

@inject(SMX.StoreName.GlobalStore)
@observer
export default class TopMenu extends Component<iProps, iState> {
    constructor(props: iProps) {
        super(props);
        // this.state = {
            
        // };
    }

    async componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className="topbar-menu">
                <div className="topbar-menu-left flex">
                </div>
                <ul className="topbar-menu-right">
                </ul>
            </div>
        );
    }
}
