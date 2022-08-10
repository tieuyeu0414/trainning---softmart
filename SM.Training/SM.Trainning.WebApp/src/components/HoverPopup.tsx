import React, { Component, CSSProperties } from "react";

interface iProp {
    style?: CSSProperties;
    className?: string;
    content?: string;
    onRequestContent?: () => any
}

interface iState {
    positionX: string;
    positionY: string;
    hpHeight: string;
    isShowPopup: boolean;
}

export default class HoverPopup extends Component<iProp, iState> {
    constructor(props: iProp) {
        super(props);
        this.state = {
            positionX: 'left',
            positionY: 'top',
            hpHeight: '',
            isShowPopup: false
        }
    }

    handleHover = (e: any) => {
        let el = e.target,
            w = window.innerWidth,
            h = window.innerHeight,
            wd = el.offsetWidth,
            hd = el.offsetHeight;
        let rect = el.getBoundingClientRect();
        this.setState({ hpHeight: String(hd + "px") })
        let xPos = rect.left + wd / 2;
        let yPos = rect.top + hd / 2;
        if (xPos > w / 2) {
            this.setState({ positionX: 'right' })
        } else {
            this.setState({ positionX: 'left' })
        }
        if (yPos > h / 2) {
            this.setState({ positionY: 'bottom' })
        } else {
            this.setState({ positionY: 'top' })
        }
    };

    showPopup(event: any) {
        this.setState({ isShowPopup: true });
        this.handleHover(event)
    }

    hidePopup(event: any) {
        this.setState({ isShowPopup: false });
    }

    renderPopupContent() {
        if (this.props.onRequestContent) {
            return this.props.onRequestContent();
        }
    }

    render() {
        const { hpHeight, positionX, positionY } = this.state;
        return (
            <div style={{ position: 'relative' }}>
                <div style={{ ...this.props.style, display: 'inline-block' }}
                    className={this.props.className}
                    onMouseEnter={(e) => this.showPopup(e)}
                    onMouseLeave={(e) => this.hidePopup(e)}>
                    {this.props.children}
                </div>
                {this.state.isShowPopup &&
                    <div className={`hover-popup ${positionX === "left" ? "hp-left" : "hp-right"}`}
                        style={positionY === "top" ? { top: hpHeight } : { bottom: hpHeight }}>
                        {this.renderPopupContent()}
                    </div>
                }
            </div>
        );
    }
}
