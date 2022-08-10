import React, { Component, CSSProperties } from 'react'
import { Icons } from '../themes';

interface iProps {
    // PopupStyle
    popupStyle?: CSSProperties;

    // Header
    header?: string;
    headerClass?: string;
    headerStyle?: CSSProperties;
    headerContainerStyle?: CSSProperties;

    // Content
    contentContainerStyle?: CSSProperties;

    // Footer
    renderFooter?: () => JSX.Element;
    footerContainerStyle?: CSSProperties;

    // Event
    onClose?: () => void;
}

interface iState {

}

export default class PopupDialog extends Component<iProps, iState> {
    public static defaultProps: iProps = {
        headerClass: ''
    };

    constructor(props: iProps) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className="sm-dialog-overlay">
                <div className="sm-dialog"
                    style={{ ...this.props.popupStyle }}
                >
                    <div className={"sm-dialog-header " + this.props.headerClass}
                        style={{ ...this.props.headerContainerStyle }}
                    >
                        <span style={{ ...this.props.headerStyle }}>
                            {this.props.header}
                        </span>
                        <i
                            style={{ cursor: 'pointer' }}
                            className={Icons.close}
                            onClick={() => {
                                if (typeof this.props.onClose === 'function') {
                                    this.props.onClose()
                                }
                            }}
                        />
                    </div>
                    <div className="sm-dialog-content"
                        style={{ ...this.props.contentContainerStyle }}
                    >
                        {this.props.children}
                    </div>
                    {
                        typeof this.props.renderFooter === 'function' && (
                            <div className="sm-dialog-footer"
                                style={{ ...this.props.footerContainerStyle }}
                            >
                                {this.props.renderFooter()}
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

