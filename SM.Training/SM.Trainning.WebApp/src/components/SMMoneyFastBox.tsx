import React, { Component, CSSProperties } from 'react'
import { TextBox } from './ComponentLib';
import SMX from '../constants/SMX';
import Utility from '../Utils/Utility';

interface iProp {
    // Bộ style mặc định của thẻ
    className?: string;
    style?: CSSProperties;
    enable?: boolean;
    spanStyle?: CSSProperties;
    value?: number;
    minValue?: number;
    maxValue?: number;
    isHiddenTooltip?: boolean;

    // Bộ event
    onChange?: ((value?: number) => void) // Sự kiện khi change item trả ra giá trị number
    onKeyDown?: (e: any) => void;
}

interface iState {
    ValueDisplay: any;//giá trị để nhìn thấy có format
}
const listMoneyFast = SMX.MoneyFast.dicName;
export default class SMMoneyFastBox extends Component<iProp, iState> {
    constructor(props: iProp) {
        super(props);
        this.state = {
            ValueDisplay: ''
        };
    }
    checkIndexOf(result: string): any {
        let rs: any = null;
        listMoneyFast.forEach(element => {
            if (result.indexOf(element.Key) > 0) {
                rs = element;
            }
        });
        return rs;
    }
    handleFocus = (event: any) => {
        event.target.select();
    }
    handleOnBlur(value: any) {
        if (this.props.onChange) {
            if (value) {
                let parseValue = 0;
                let result = value.toLowerCase().split(',').join('');
                if (!isNaN(result)) {
                    //nếu là nhập số bình thường
                    parseValue = parseFloat(result);
                    if (this.props.minValue !== null && this.props.minValue !== undefined) {//check min
                        if (parseValue < this.props.minValue) {
                            parseValue = this.props.minValue;
                            this.props.onChange(parseValue);//gán trả giá trị số
                            this.setState({ ValueDisplay: this.numberWithCommas(parseValue) });
                            return;
                        }
                    }

                    this.props.onChange(parseFloat(result));//gán trả giá trị số
                    this.setState({ ValueDisplay: this.numberWithCommas(value) });
                } else {
                    let itemDic = this.checkIndexOf(result);
                    if (itemDic) {
                        //nếu là nhập phím tắt thuộc bộ dic cấu hình thì xử lý
                        result = result.replace(itemDic.Key, '');
                        parseValue = parseFloat(result) * itemDic.Value;

                        if (this.props.minValue !== null && this.props.minValue !== undefined) {//check min
                            if (parseValue < this.props.minValue) {
                                parseValue = this.props.minValue;
                            }
                        }

                        this.setState({ ValueDisplay: this.numberWithCommas(parseValue) });//gán giá trị hiển thị có format
                        this.props.onChange(parseValue);//gán trả giá trị số
                    }
                }
            } else {
                //xóa trắng
                this.props.onChange(undefined);//gán trả giá trị số
                this.setState({ ValueDisplay: '' })
            }
        }
    }
    handleOnChange(value: any) {
        if (this.props.onChange) {
            if (value) {
                let parseValue = 0;
                let result = value.toLowerCase().split(',').join('');
                if (!isNaN(result)) {
                    //nếu là nhập số bình thường
                    parseValue = parseFloat(result);
                    if (this.props.maxValue !== null && this.props.maxValue !== undefined) {//check max
                        if (parseValue > this.props.maxValue) {
                            return;
                        }
                    }
                    this.props.onChange(parseFloat(result));//gán trả giá trị số
                    this.setState({ ValueDisplay: this.numberWithCommas(value) })
                } else {
                    let itemDic = this.checkIndexOf(result);
                    if (itemDic) {
                        //nếu là nhập phím tắt thuộc bộ dic cấu hình thì xử lý
                        result = result.replace(itemDic.Key, '');
                        parseValue = parseFloat(result) * itemDic.Value;

                        if (this.props.maxValue !== null && this.props.maxValue !== undefined) {//check max
                            if (parseValue > this.props.maxValue) {
                                parseValue = this.props.maxValue;
                            }
                        }

                        this.setState({ ValueDisplay: this.numberWithCommas(parseValue) });//gán giá trị hiển thị có format
                        this.props.onChange(parseValue);//gán trả giá trị số
                    }
                }
            } else {
                //xóa trắng
                this.props.onChange(undefined);//gán trả giá trị số
                this.setState({ ValueDisplay: '' })
            }
        }
    }
    handleOnKeyDown(e: any) {
        if (typeof this.props.onKeyDown === 'function') {
            this.props.onKeyDown(e);
        }
    }
    numberWithCommas(x?: number) {
        //hàm format  định dạng số
        if (x === 0) return '0';
        if (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
            return '';
        }
    }
    componentDidMount() {
        // chạy lần đầu để có giá trị format
        if (this.props.value || this.props.value === 0) {
            this.setState({ ValueDisplay: this.numberWithCommas(this.props.value) })
        } else {

            this.setState({ ValueDisplay: '' })
        }
    }

    componentWillReceiveProps(nextProps: iProp) {
        if (this.state.ValueDisplay !== this.numberWithCommas(nextProps.value!)) {
            //thay đổi để gán lại giá trị format
            this.setState({ ValueDisplay: this.numberWithCommas(nextProps.value!) })
        }
    }

    render() {
        return (
            <>
                <span className="sm-status-running" style={this.props.spanStyle}>
                    <TextBox className={this.props.className}
                        style={this.props.style}
                        disabled={this.props.enable === false}
                        maxLength={20}
                        value={this.state.ValueDisplay}
                        onChange={(e: any) => { this.handleOnChange(e.target.value) }}
                        onBlur={(e: any) => { this.handleOnBlur(e.target.value) }}
                        onFocus={(e: any) => this.handleFocus(e)}
                        onKeyDown={(e: any) => this.handleOnKeyDown(e)}
                    />

                    {(
                        //this.props.isHiddenTooltip !== true
                        ((this.props.minValue !== null && this.props.minValue !== undefined)
                            || (this.props.maxValue !== null && this.props.maxValue !== undefined))
                        && false) ?
                        (<span className="status-tooltip" style={{ left: 'calc(100% + 3px)', top: '3px' }}>
                            {(this.props.minValue !== null && this.props.minValue !== undefined) ? ('Min:[' + Utility.GetDecimalString(this.props.minValue) + ']') : ''}
                            {(this.props.maxValue !== null && this.props.maxValue !== undefined) ? (' Max:[' + Utility.GetDecimalString(this.props.maxValue) + ']') : ''}
                        </span>)
                        : null}
                </span>
            </>
        )
    }
}
