import React, { Component, CSSProperties } from 'react'
import { TextBox } from './ComponentLib';

interface iProp {
    // Bộ style mặc định của thẻ
    className?: string;
    style?: CSSProperties;
    enable?: boolean;
    placeholder?: string;
    value?: number;
    minValue?: number;
    maxValue?: number;
    maxLength?: number;
    dNumber: number;
    isHiddenTooltip?: boolean;

    // Bộ event
    onChange?: ((value?: number, ValueDisplay?: string) => void) // Sự kiện khi change item trả ra giá trị number
}

interface iState {
    ValueDisplay: any;//giá trị để nhìn thấy có format
}
export default class SMMaskBox extends Component<iProp, iState> {
    static defaultProps: iProp;

    constructor(props: iProp) {
        super(props);
        this.state = {
            ValueDisplay: ''
        };
    }
    handleFocus = (event: any) => {
        event.target.select();
    }
    handleOnBlur(value: any) {
        if (this.props.onChange) {
            if (value) {
                let parseValue = 0;
                let valueDisplay = '';
                if (!isNaN(value)) {
                    //nếu là nhập số bình thường
                    parseValue = parseFloat(value);
                    if (this.props.minValue !== null && this.props.minValue !== undefined) {//check min
                        if (parseValue < this.props.minValue) {
                            parseValue = this.props.minValue;
                            valueDisplay = this.numberWithCommas(parseValue);
                            this.props.onChange(parseValue, valueDisplay);//gán trả giá trị số
                            this.setState({ ValueDisplay: valueDisplay });
                            return;
                        }
                    }
                    valueDisplay = this.numberWithCommas(parseValue);
                    this.props.onChange(parseFloat(value), valueDisplay);//gán trả giá trị số
                    this.setState({ ValueDisplay: valueDisplay });
                }
            } else {
                //xóa trắng
                this.props.onChange(undefined, '');//gán trả giá trị số
                this.setState({ ValueDisplay: '' })
            }
        }
    }
    handleOnChange(value: any) {
        if (this.props.onChange) {
            if (value) {
                let parseValue = 0;
                let valueDisplay = '';
                if (!isNaN(value) && Number(value) < Math.pow(10, this.props.maxLength!)) {
                    //nếu là nhập số bình thường và giá trị nhập nhỏ hơn 10 mũ maxLength (VD: maxlength = 6 thì giá trị nhập nhỏ hơn 100,000)
                    parseValue = parseFloat(value);
                    if (this.props.maxValue !== null && this.props.maxValue !== undefined) {//check max
                        if (parseValue > this.props.maxValue) {
                            return;
                        }
                    }
                    valueDisplay = this.numberWithCommas(value);
                    this.props.onChange(parseFloat(value), valueDisplay);//gán trả giá trị số
                    this.setState({ ValueDisplay: valueDisplay })
                }
            } else {
                //xóa trắng
                this.props.onChange(undefined, '');//gán trả giá trị số
                this.setState({ ValueDisplay: '' })
            }
        }
    }
    numberWithCommas(x?: number) {
        //hàm format  định dạng số
        // if (x === 0) return this.pad(0, this.props.dNumber);
        if (x || (x === 0)) {
            return this.pad(x, this.props.dNumber);
        } else {
            return '';
        }
    }

    pad(num: number, size: number) {
        var s = Number(num) + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    numberWithCommasWithDNumber(x: number, dNumber: number) {
        // Hàm được gọi trong componentWillReceiveProps do có delay khi props dNumber được truyền vào component
        if (x || (x === 0)) {
            return this.pad(x, dNumber);
        } else {
            return '';
        }
    }

    componentDidMount() {
        // chạy lần đầu để có giá trị format
        if (this.props.value || this.props.value === 0) {
            this.handleOnBlur(this.props.value);
            // this.setState({ ValueDisplay: this.numberWithCommas(this.props.value) })
        } else {

            this.setState({ ValueDisplay: '' })
        }
    }

    componentWillReceiveProps(nextProps: iProp) {
        if (this.state.ValueDisplay !== this.numberWithCommas(nextProps.value!)) {
            //thay đổi để gán lại giá trị format
            this.setState({ ValueDisplay: this.numberWithCommas(nextProps.value!) })
        }
        if (this.props.dNumber !== nextProps.dNumber) {
            this.setState({ ValueDisplay: this.numberWithCommasWithDNumber(nextProps.value!, nextProps.dNumber) })
        }
    }

    render() {
        return (
            <div style={this.props.style}>
                <span className="sm-status-running " style={{ width: '100%' }}>
                    <TextBox className={this.props.className}
                        disabled={this.props.enable === false}
                        maxLength={this.props.maxLength! + 1}
                        style={{ width: '100%' }}
                        placeholder={this.props.placeholder}
                        value={this.state.ValueDisplay}
                        onChange={(e: any) => { this.handleOnChange(e.target.value) }}
                        onBlur={(e: any) => { this.handleOnBlur(e.target.value) }}
                        onFocus={(e: any) => this.handleFocus(e)}
                    />
                    {(((this.props.minValue !== null && this.props.minValue !== undefined)
                        || (this.props.maxValue !== null && this.props.maxValue !== undefined))
                        && this.props.isHiddenTooltip !== true) ?
                        (<span className="status-tooltip" style={{ left: 'calc(100% + 3px)', top: '3px' }}>
                            {(this.props.minValue !== null && this.props.minValue !== undefined) ? ('Min:[' + this.props.minValue + ']') : ''}
                            {(this.props.maxValue !== null && this.props.maxValue !== undefined) ? (' Max:[' + this.props.maxValue + ']') : ''}
                        </span>)
                        : null}
                </span>
            </div>
        )
    }
}

SMMaskBox.defaultProps = {
    maxLength: 9,
    dNumber: 6,
};