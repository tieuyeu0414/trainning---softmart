import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";

interface iProps {

}
interface iStates {
    IsLoading: boolean;
}

export default class LoadingModal extends React.Component<iProps, iStates> {
    private static instance: LoadingModal;

    constructor(props: iProps) {
        super(props);
        this.state = {
            IsLoading: false
        }
        LoadingModal.instance = this;
    }

    public static showLoading() {
        LoadingModal.instance._showLoading();
    }

    _showLoading() {
        this.setState({ IsLoading: true });
    }

    public static hideLoading() {
        LoadingModal.instance._hideLoading();
    }

    _hideLoading() {
        this.setState({ IsLoading: false });
    }

    render() {
        return (
            this.state.IsLoading &&
            <div className="loading-popup">
                <div className="loading-icon" style={{  }} />
            </div>
        );
    }
}