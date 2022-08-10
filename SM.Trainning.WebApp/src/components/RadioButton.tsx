import React, { Component, CSSProperties } from "react";

interface iProp {
    className?: string;
    style?: CSSProperties;
    enable?: boolean;

    radioValue?: string;
    value?: string;
    text?: string;
    groupName?: string;
    onChange?: (value: string) => void; // Sự kiện khi change item
}

interface iState {
    radioValue: string;
}
export default class RadioButton extends Component<iProp, iState> {
    constructor(props: iProp) {
        super(props);
        this.state = {
            radioValue: this.props.radioValue || "",
        };
    }

    handleOnChange() {
        if (this.props.onChange) {
            this.props.onChange(this.props.value!);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: iProp) {
        if (nextProps.radioValue !== undefined && nextProps.radioValue !== this.state.radioValue) {
            this.setState({ radioValue: nextProps.radioValue });
        }
    }

    render() {
        return (
            <label className={this.props.className} style={this.props.style}>
                <span style={{ padding: 3 }}>{this.props.text}</span>
                <input
                    type="radio"
                    checked={this.state.radioValue === this.props.value}
                    disabled={this.props.enable === false}
                    value={this.props.value}
                    name={this.props.groupName}
                    onChange={() => this.handleOnChange()}
                ></input>
                <span className="checkmark"></span>
            </label>
        );
    }
}
