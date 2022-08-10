import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import GlobalStore from "../Stores/GlobalStore";
import { inject, observer } from "mobx-react";
import SMX from "../constants/SMX";

interface iProps {
    IsLoading: boolean;
    GlobalStore?: GlobalStore;
}

@inject(SMX.StoreName.GlobalStore)
@observer
export default class Loading extends React.Component<iProps, any> {
    render() {
        let loading = this.props.IsLoading || this.props.GlobalStore!.IsLoading;
        return (
            loading &&
            <div className="loading-popup">
                <div style={{ backgroundColor: "#ffffff", borderRadius: 5, padding: 0 }}>
                    <ProgressSpinner animationDuration="1" />
                </div>
            </div>
        );
    }
}