import React, { Component } from "react";
import ApiUrl from "../constants/ApiUrl";
import SMX from "../constants/SMX";
import { ExceptionType, SMXException } from "../models/SMXException";
import HttpUtils from "../Utils/HttpUtils";
import LoadingModal from "./LoadingModal";

interface iProps {
}

interface iState {
    htmlResult: any;
}

export default class ErrorHandler extends Component<iProps, any> {
    private static instance: ErrorHandler;

    constructor(props: iProps) {
        super(props);

        this.state = {
            exception: null
        };

        ErrorHandler.instance = this;
    }

    handleCloseError = () => {
        //this.setState({ exception: undefined });
        this.setState({ htmlResult: undefined });
    };

    handlerPostFailed(msg?: string) {
        let html = (
            <div className="custom-dialog">
                <div
                    style={{
                        backgroundColor: "#ffff5e",
                        borderRadius: 5,
                        paddingTop: 50,
                        border: "2px solid #f00",
                    }}
                >
                    <div style={{ textAlign: "center", fontSize: 30, color: "#000" }}>{msg}</div>
                    <div
                        style={{
                            textAlign: "center",
                            paddingTop: 100,
                            paddingBottom: 10,
                        }}
                    >
                        <span
                            style={{
                                padding: "10px 30px",
                                borderRadius: 5,
                                backgroundColor: "#00f",
                                color: "#fff",
                                cursor: "pointer",
                                display: "inline-block",
                            }}
                            onClick={this.handleCloseError}
                        >
                            Đóng
                        </span>
                    </div>
                </div>
            </div>
        );
        this.setState({ htmlResult: html });
    }

    handlerGetFailed(msg?: string) {
        let html = (
            <div className="custom-dialog">
                <div
                    style={{
                        backgroundColor: "#ffff5e",
                        borderRadius: 5,
                        paddingTop: 50,
                        border: "2px solid #f00",
                    }}
                >
                    <div style={{ textAlign: "center", fontSize: 30, color: "#000" }}>{msg}</div>
                    <div
                        style={{
                            textAlign: "center",
                            paddingTop: 100,
                            paddingBottom: 10,
                        }}
                    >
                        <span
                            style={{
                                padding: "10px 30px",
                                borderRadius: 5,
                                backgroundColor: "#00f",
                                color: "#fff",
                                cursor: "pointer",
                                display: "inline-block",
                            }}
                            onClick={() => {
                                this.setState({ exception: undefined });
                                window.location.reload();
                            }}
                        >
                            Thử lại
                        </span>
                    </div>
                </div>
            </div>
        );
        this.setState({ htmlResult: html });
    }

    handlerBadRequest(msg?: string) {
        let html = (
            <div
                className="error-popup"
                style={{
                    backgroundColor: "#ff0000",
                    border: "1px solid #bc0000",
                    color: "#fff",
                    maxHeight: 300,
                    minHeight: 80,
                    position: "fixed",
                    zIndex: 9999999999999,
                    bottom: 2,
                    right: 2,
                    width: 450,
                    padding: 5,
                    whiteSpace: 'pre-wrap'
                }}

            >
                {msg}
                <span style={{ position: 'absolute', top: '2px', right: '5px', color: '#ffff00', cursor: 'pointer' }}
                    onClick={this.handleCloseError}>
                    <i className="fas fa-times"></i>
                </span>
            </div>
        );
        this.setState({ htmlResult: undefined },
            () => {
                this.setState({ htmlResult: html });
            });
    }

    handlerUnauthorized(msg?: string) {
        window.location.href = window.location.origin + "/login";
    }

    handlerNotAcceptable(msg?: string) {
        let errSrc = encodeURIComponent(window.location.href);
        window.location.href = window.location.origin + `/error/${errSrc}/${encodeURI(msg!)}`;
    }

    closeError() {
        this.setState({ htmlResult: undefined })
    }

    public static hanlerCloseError() {
        if (ErrorHandler.instance) {
            ErrorHandler.instance.closeError()
        }
    }

    public static HandlerException(ex?: SMXException | unknown) {
        LoadingModal.hideLoading();
        if (ErrorHandler.instance) {
            if (ex instanceof SMXException) {
                let msg = ex?.Message;
                let type = ex.Type;
                switch (type) {
                    case ExceptionType.PostFailed:
                        ErrorHandler.instance.handlerPostFailed(msg);
                        break;

                    case ExceptionType.GetFailed:
                        ErrorHandler.instance.handlerGetFailed(msg);
                        break;

                    case ExceptionType.BadRequest:
                        ErrorHandler.instance.handlerBadRequest(msg);
                        break;

                    case ExceptionType.Unauthorized:
                        ErrorHandler.instance.handlerUnauthorized(msg);
                        break;

                    case ExceptionType.NotAcceptable:
                        ErrorHandler.instance.handlerNotAcceptable(msg);
                        break;
                  
                    default:
                        // let clientMsg = this.handleClientSideException(ex)
                        // ErrorHandler.instance.handlerBadRequest(clientMsg);
                        break;
                }
            }
            else {
                ErrorHandler.instance.handleCloseError();
            }
        }
    }

    render() {
        return <>
            {this.state.htmlResult}
        </>;
    }
}
