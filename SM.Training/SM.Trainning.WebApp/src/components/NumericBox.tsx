import React, { Component, CSSProperties } from "react";
// import { InputNumber } from "primereact/inputnumber";
import { SMNumericBox, SMNumericBox_OnBlurEvent } from "./ComponentLib";

interface iProp {
    // Bộ style mặc định của thẻ
    className?: string;
    inputClassName?: string;
    style?: CSSProperties;
    enable?: boolean;
    mode?: string;
    useGrouping?: boolean;

    value?: number;
    minValue?: number;
    maxValue?: number;
    numberFractionDigits?: number;
    placeholder?: string;

    // Bộ event
    onChange?: (value?: number) => void; // Sự kiện khi change item
    selectAllWhenFocus?: boolean;
    allowComma?: boolean;
    commaFraction?: boolean;
}

interface iState { }

export default class NumericBox extends Component<iProp, iState> {
    static defaultProps = {
        mode: "decimal",
        enable: true,
        commaFraction: false,
    };

    handleOnChange(value?: number) {
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    render() {
        return (
            <SMNumericBox_OnBlurEvent
                value={this.props.value}
                style={this.props.style}
                max={this.props.maxValue}
                min={this.props.minValue}
                numberFractionDigits={this.props.numberFractionDigits}
                onChange={(value) => {
                    this.handleOnChange(value)
                }}
                disabled={!this.props.enable}
                allowComma={this.props.allowComma}
                commaFraction={this.props.commaFraction}
            />
            // <SMNumericBox
            //     value={this.props.value}
            //     style={this.props.style}
            //     max={this.props.maxValue}
            //     min={this.props.minValue}
            //     numberFractionDigits={this.props.numberFractionDigits}
            //     onChange={(value) => {
            //         this.handleOnChange(value)
            //     }}
            //     disabled={!this.props.enable}
            //     allowComma={this.props.allowComma}
            //     commaFraction={this.props.commaFraction}
            // />
        );
    }
}
