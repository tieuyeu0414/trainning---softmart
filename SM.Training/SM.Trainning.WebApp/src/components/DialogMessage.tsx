import React, { Component } from 'react'
import { Icons } from '../themes';

interface iProp {
}

interface iState {
    isShowError: boolean;
    isShowConfirm: boolean;
    isShowInfo: boolean;
    title?: string;
    message?: string;
}

export default class DialogMessage extends Component<iProp, iState>  {
    public static instance: DialogMessage;
    onConfirmOKCallBack?: () => void;

    constructor(props: iProp) {
        super(props);

        this.state = {
            isShowError: false,
            isShowConfirm: false,
            isShowInfo: false
        };

        DialogMessage.instance = this;
    }

    static showError(_title: string, _message: string) {
        DialogMessage.instance.showError(_title, _message);
    }

    showError(_title: string, _message: string) {
        this.setState({
            isShowError: true,
            title: _title,
            message: _message,
        });
    }

    static showConfirm(_title: string, _message: string, onOkCallBack?: () => void) {
        DialogMessage.instance.showConfirm(_title, _message, onOkCallBack);
    }

    showConfirm(_title: string, _message: string, onOkCallBack?: () => void) {
        this.onConfirmOKCallBack = onOkCallBack;

        this.setState({
            isShowConfirm: true,
            title: _title,
            message: _message,
        });
    }

    handleConfirmOK() {
        this.setState({ isShowConfirm: false });

        if (this.onConfirmOKCallBack) {
            this.onConfirmOKCallBack();
        }
    }

    handleShowInfoOK() {
        this.setState({ isShowInfo: false });

        if (this.onConfirmOKCallBack) {
            this.onConfirmOKCallBack();
        }
    }

    static showInfo(_title: string, _message: string, onOkCallBack?: () => void) {
        DialogMessage.instance.showInfo(_title, _message, onOkCallBack);
    }

    showInfo(_title: string, _message: string, onOkCallBack?: () => void) {
        this.onConfirmOKCallBack = onOkCallBack;

        this.setState({
            isShowInfo: true,
            title: _title,
            message: _message,
        });
    }

    render() {
        const isShowPopup = this.state.isShowError || this.state.isShowConfirm || this.state.isShowInfo;

        return (
            <>
                {isShowPopup &&
                    <div className="dialog">
                        <div className="dialog-content"
                            style={{
                                width: 400,
                            }}>
                            <div className="dialog-header" style={{ paddingLeft: '6px' }}>
                                <i style={{ color: 'gold', marginRight: '6px' }} className="fa fa-exclamation-triangle" aria-hidden="true"></i>
                                {this.state.title}
                            </div>
                            <div style={{ padding: 10, minHeight: 60, color: "#000000", lineHeight: '18px' }}>
                                {this.state.message}
                            </div>
                            <div style={{ padding: 10, textAlign: "center" }}>
                                {this.state.isShowError &&
                                    <button className="sm-delete-button" onClick={() => this.setState({ isShowError: false })}>
                                        <i className={Icons.close}></i>  Đóng</button>
                                }
                                {this.state.isShowConfirm &&
                                    <>
                                        <button className="sm-button" onClick={() => this.handleConfirmOK()}>
                                            <i className={Icons.check}></i>  Đồng ý</button>

                                        <button style={{ marginLeft: 15 }} className="sm-delete-button"
                                            onClick={() => this.setState({ isShowConfirm: false })}>
                                            <i className={Icons.close}></i> Bỏ qua</button>
                                    </>
                                }
                                {this.state.isShowInfo &&
                                    <>
                                        <button className="sm-button" onClick={() => this.handleShowInfoOK()}>
                                            <i className={Icons.check}></i>   OK</button>
                                    </>
                                }
                            </div>
                        </div>
                    </div >
                }
            </>
        )
    }
}
