import React, { Component, CSSProperties } from 'react'

interface iProp {
    className?: string;
    style?: CSSProperties;
    enable?: boolean;

    checked?: boolean;
    text?: string;
    onChange?: ((value: boolean) => void) // Sự kiện khi change item
}

interface iState {

}

export default class CheckBox extends Component<iProp, iState> {
    handleOnChange() {
        if (this.props.onChange) {
            if (this.props.checked === true) {
                this.props.onChange(false);
            } else {
                this.props.onChange(true);
            }
        }
    }

    render() {
        return (
            <label className={this.props.className} style={this.props.style}>
                <input type="checkbox"
                    disabled={this.props.enable === false}
                    checked={this.props.checked ?? false} // Nếu checked = undefiend/null thì set về false
                    onChange={() => this.handleOnChange()} />
                <span className="checkmark" />
                {this.props.text != undefined ? <span style={{ padding: 3 }}>{this.props.text}</span> : <></>}
            </label>
        )
    }
}