import React, { CSSProperties } from "react";
import { SMButton } from "./ComponentLib";
import { Icons } from "../themes";
import PopupDialog from "./PopupDialog";

interface iProps {
    showConfirmBox: boolean;
    // Header
    header?: string;
    headerClass?: string;
    headerStyle?: CSSProperties;
    headerContainerStyle?: CSSProperties;

    // Content
    contentContainerStyle?: CSSProperties;

    // Footer
    footerContainerStyle?: CSSProperties;
    renderFooter?: () => JSX.Element;

    width?: number | string;
    className?: string;

    onNoPress?: () => void;
    onOkPress?: () => void;

    onHide?: () => void;

    confirmBeforeOk?: boolean;
}

interface iState {
    showConfirmBox: boolean;
}

export default class ConfirmBox extends React.Component<iProps, iState> {
    constructor(props: iProps) {
        super(props);
        this.state = {
            showConfirmBox: this.props.showConfirmBox,
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps: iProps) {
        if (nextProps.showConfirmBox !== this.state.showConfirmBox) {
            this.setState({ showConfirmBox: nextProps.showConfirmBox });
        }
    }

    renderConfirmFooter() {
        return (
            <div>
                <SMButton className={'sm-button'}
                    onClick={async () => {
                        if (this.props.onOkPress) {
                            const result = await this.props.onOkPress();
                            // Hàm onOkPress trả về true/false sau khi validate để đóng thông báo
                            if (this.props.confirmBeforeOk && result) {
                                this.setState({ showConfirmBox: false });
                            }
                        } else {
                            this.setState({ showConfirmBox: false });
                        }
                    }}
                >
                    <i className={Icons.check} /> Đồng ý
                </SMButton>
                <SMButton className={'sm-button margin-left-5'}
                    onClick={() => {
                        if (this.props.onNoPress) {
                            this.props.onNoPress();
                        }
                        this.setState({ showConfirmBox: false });
                    }}
                >
                    <i className={Icons.close} /> Bỏ qua
                </SMButton>
            </div>
        );
    }

    render() {
        return (
            <PopupDialog
                header={this.props.header}
                headerStyle={{ ...this.props.headerStyle }}
                headerContainerStyle={{ ...this.props.headerContainerStyle }}
                contentContainerStyle={{ ...this.props.contentContainerStyle }}
                footerContainerStyle={{ ...this.props.footerContainerStyle }}
                renderFooter={() => {
                    if (typeof this.props.renderFooter == 'function') {
                        return this.props.renderFooter()
                    } else {
                        return this.renderConfirmFooter()
                    }
                }}
            >
                <div className="p-grid">
                    <div className="p-col-6">
                        <span className="title-info">SMMultiSelect</span>
                        <div style={{ width: '100%', height: '10vh' }}></div>

                        <br />

                        <span className="title-info">ComboTreeView</span>
                        <div style={{ width: '100%', height: '10vh' }}></div>

                        <br />
                    </div>
                </div>
            </PopupDialog>
        );
    }
}
