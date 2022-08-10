import React from "react";
import GlobalStore from "../Stores/GlobalStore";
import { inject, observer } from "mobx-react";
import SMX from "../constants/SMX";

interface iProps {
    GlobalStore?: GlobalStore;
}

type Type = "success" | "warning" | "error"

interface iState {
    AlertShow?: boolean;
    AlertType?: Type;
    AlertContent?: string;
}



@inject(SMX.StoreName.GlobalStore)
@observer
export default class AlertPopup extends React.Component<iProps, iState> {
    public static instance: AlertPopup;
    onConfirmOKCallBack?: () => void;

    constructor(props: iProps) {
        super(props);
        this.state = {

        };

        AlertPopup.instance = this;
    }

    static show(type: Type, content: string, timeout = 3000) {
        AlertPopup.instance.show(type, content, timeout);
    }

    show(type: Type, content: string, timeout: number) {
        this.setState({
            AlertShow: true,
            AlertContent: content,
            AlertType: type,
        }, () => {
            setTimeout(() => {
                this.setState({
                    AlertShow: undefined,
                    AlertContent: undefined,
                    AlertType: undefined,
                })
            }, timeout);
        });
    }

    render() {
        const show = this.state.AlertShow ?? this.props.GlobalStore!.AlertShow;
        const type = this.props.GlobalStore!.AlertType ?? this.state.AlertType;
        const content = this.props.GlobalStore!.AlertContent ?? this.state.AlertContent;

        return (
            show &&
            <div className={`alert-popup ${type}`}>
                <span className="close-popup" onClick={() => this.props.GlobalStore?.CloseAlertPopup()}><i className="fas fa-times"></i></span>
                <span style={{ fontSize: 22, marginRight: 20 }}>
                    {type === "success" &&
                        <i className="fas fa-check"></i>
                    }
                    {type === "warning" &&
                        <i className="fas fa-exclamation-triangle"></i>
                    }
                    {type === "error" &&
                        <i className="fas fa-times"></i>
                    }
                </span>
                <div style={{ lineHeight: '18px' }}>
                    {content}
                </div>
            </div>
        );
    }
}