import React, { CSSProperties } from "react";

interface iProps {
    className?: string;
    style?: CSSProperties;
    enable?: boolean;

    debounce?: boolean;
    onClick?: (e?: any) => void;
}
export default class SMButton extends React.Component<iProps, any> {

    handleOnClick = (e: any) => {
        // Giá trị default của debounce = true nếu không truyền props ở ngoài Component cha
        // Nếu truyền debounce = false thì sẽ không sử dụng debounce
        const {
            debounce = true
        } = this.props

        if (typeof this.props.onClick === 'function') {
            if (debounce) {
                // Thời gian default của Debounce là 250ms
                this.handleDebounce(() => this.props.onClick!(e), 250)
                return
            }

            this.props.onClick(e)
        }
    }

    private _debounceTimeout = false

    handleDebounce(fn: (e?: any) => void, ms: number) {
        // Nếu _debounceTimeout = false, thực hiện fn
        if (this._debounceTimeout === false) {
            // Thực hiện fn, gán _debounceTimeout = true để các lần gọi sau sẽ không gọi fn
            // SetTimeout theo ms để gán lại _debounceTimeout = false để chờ nhận event
            fn()
            this._debounceTimeout = true
            setTimeout(() => {
                // Timeout complete
                this._debounceTimeout = false
            }, ms)
        }
    }

    handleThrottling() {

    }

    render() {
        return (
            <button
                style={this.props.style}
                disabled={this.props.enable === false}
                className={this.props.className}
                onClick={this.handleOnClick}
            >
                {this.props.children}
            </button>
        );
    }
}
