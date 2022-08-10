import React, { Component, CSSProperties } from 'react'
import { TextBox } from './ComponentLib'

interface iProp {
    min?: number;
    max?: number;
    disabled?: boolean;
    value?: number;
    className?: string;
    style?: CSSProperties;

    // Số ký tự sau phần thập phân
    numberFractionDigits?: number;
    allowComma?: boolean;
    commaFraction?: boolean;

    // Event
    onChange?: (value?: number, displayValue?: string) => void
    onFocus?: () => void
}

interface iState {
    value?: number;
    displayValue?: string;
    decimalChar: string;
    thousandChar: string;
}

export default class SMNumericBox extends Component<iProp, iState> {
    static defaultProps: iProp = {
        allowComma: true,
        className: 'sm-numericbox',
        commaFraction: false,
    }

    constructor(props: iProp) {
        super(props)
        this.state = {
            displayValue: '',
            decimalChar: this.props.commaFraction ? ',' : '.',
            thousandChar: this.props.commaFraction ? '.' : ',',
        }
    }

    componentDidMount() {
        if (this.props.value != null) {
            let strValue = this.numberWithCommas(this.props.value.toString())
            this.setState({ value: this.props.value, displayValue: strValue })
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: iProp) {
        if (nextProps.value != null && nextProps.value !== this.state.value) {
            let strValue = this.numberWithCommas(nextProps.value.toString())
            this.setState({ value: nextProps.value, displayValue: strValue })
        }

        if (nextProps.value == undefined && this.state.value != undefined) {
            let strvalue = ''
            this.setState({ value: undefined, displayValue: strvalue })
        }
    }

    getNumberValue(valueNoComma: string): { numberValue: number, newValue?: string } {
        if (this.props.commaFraction == false) {
            return { numberValue: Number(valueNoComma) }
        }

        let { decimalChar } = this.state

        let includeDecimalChar = valueNoComma.includes(decimalChar)

        if (includeDecimalChar) {
            let numberPart = valueNoComma.split(decimalChar)
            if (numberPart.length > 2) {
                return { numberValue: NaN }
            }

            let number = numberPart[0] === '' ? numberPart[1] : numberPart[0]
            let decimal = numberPart[0] === '' ? numberPart[0] : numberPart[1]

            return {
                numberValue: numberPart[0] === '' ? 0 : Number(number + "." + decimal),
                newValue: numberPart[0] === '' ? '0,' : undefined
            }
        }

        return { numberValue: Number(valueNoComma) }
    }

    onChangeValue(value: string) {
        let { decimalChar, thousandChar } = this.state;

        if (value !== "" && value != null) {
            let valueNoComma = value.toLowerCase().split(thousandChar).join("");
            let { numberValue, newValue } = this.getNumberValue(valueNoComma)
            valueNoComma = newValue ? newValue : valueNoComma
            let isNumber = isNaN(numberValue) == false

            if (isNumber) {

                if (this.props.min != null && numberValue < this.props.min) {
                    valueNoComma = this.props.min.toString()
                    numberValue = this.props.min
                }

                if (this.props.max != null && numberValue > this.props.max) {
                    valueNoComma = this.props.max.toString()
                    numberValue = this.props.max

                    if (numberValue === this.state.value) {
                        return;
                    }
                }

                let strValue = this.numberWithCommas(valueNoComma)

                if (this.props.numberFractionDigits) {
                    let numberValueStr = strValue.split(thousandChar).join("").split(decimalChar)

                    if (numberValueStr && numberValueStr.length == 2) {
                        numberValue = Number(numberValueStr[0] + "." + numberValueStr[1])
                    }
                }

                this.setState({ value: numberValue, displayValue: strValue }, () => {
                    if (typeof this.props.onChange === 'function') {
                        this.props.onChange(this.state.value, this.state.displayValue)
                    }
                })
            } else {
                if (value == '-') {
                    // Nếu nhập dấu - và có set giá trị min > 0 => Không cho nhập dấu -
                    if (this.props.min && this.props.min > 0) {
                        this.setState({ value: undefined, displayValue: '' })
                    } else {
                        this.setState({ value: undefined, displayValue: '-' }, () => {
                            if (typeof this.props.onChange === 'function') {
                                this.props.onChange(this.state.value, this.state.displayValue)
                            }
                        })
                    }
                }
            }
        } else {
            this.setState({ value: undefined, displayValue: '' }, () => {
                if (typeof this.props.onChange === 'function') {
                    this.props.onChange(this.state.value, this.state.displayValue)
                }
            })
        }
    }

    convertToCommaFraction(x?: string) {
        if (!this.props.commaFraction) {
            return x;
        }

        return x?.replace('.', ',')
    }

    numberWithCommas(x?: string) {
        let { decimalChar, thousandChar } = this.state;

        x = this.convertToCommaFraction(x);

        //hàm format  định dạng số
        if (x === "0") return "0";
        if (x) {
            let digitSplit = x.split(decimalChar)
            let phanNguyen = digitSplit[0]
            let thapPhan = digitSplit[1]

            // Nếu có dấu phẩy ngăn cách giữa các phần nghìn
            let y = this.props.allowComma ? phanNguyen.replace(/\B(?=(\d{3})+(?!\d))/g, thousandChar) : phanNguyen

            if (thapPhan != undefined && this.props.numberFractionDigits) {
                // Nếu có props chọn số chữ số sau phần thập phân
                if (this.props.numberFractionDigits != undefined) {
                    thapPhan = thapPhan.substr(0, this.props.numberFractionDigits)
                }

                y += decimalChar + thapPhan
            }

            if (y.charAt(0) === '-') {
                let splitNegetive = y.split('-')
                return '-' + splitNegetive[1].replace(/^0+(\d)/, '$1')
            }

            // xóa nhiều hơn 1 số 0 đầu
            return y.replace(/^0+(\d)/, '$1')

        } else {
            return "";
        }
    }

    render() {
        return (
            <TextBox
                style={this.props.style}
                className={this.props.className}
                onChange={(e) => {
                    this.onChangeValue(e.currentTarget.value)
                }}
                value={this.state.displayValue}
                disabled={this.props.disabled}
                onFocus={(e) => {
                    if (typeof this.props.onFocus === 'function') {
                        this.props.onFocus()
                    }
                }}
            />
        )
    }
}
