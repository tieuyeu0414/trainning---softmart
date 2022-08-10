import React, { Component, CSSProperties } from 'react'
import Utility from '../Utils/Utility'
import { TextBox } from './ComponentLib'

interface iProp {
    min?: number;
    max?: number;
    disabled?: boolean;
    strValue?: string;
    numberValue?: number;
    className?: string;
    style?: CSSProperties;
    maxLength?: number;

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

export default class SMNumericBox_FreeTyping extends Component<iProp, iState> {
    static defaultProps: iProp = {
        allowComma: true,
        className: 'sm-numericbox',
        commaFraction: false,
    }

    constructor(props: iProp) {
        super(props)
        this.state = {
            displayValue: this.props.strValue || '',
            decimalChar: this.props.commaFraction ? ',' : '.',
            thousandChar: this.props.commaFraction ? '.' : ',',
        }
    }

    componentDidMount() {
        if (this.props.strValue != null && this.props.strValue != this.state.displayValue) {
            this.onChangeValue(this.props.strValue);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: iProp) {
        if (nextProps.strValue != null && nextProps.strValue !== this.state.displayValue) {
            this.onChangeValue(nextProps.strValue);
        }

        if (nextProps.strValue == undefined) {
            this.setState({ value: undefined, displayValue: '' })
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

    calcValue(value: string) {
        this.onChangeValue(value);
    }

    onChangeValue(value: string) {
        // Nếu decimal = '.' || decimal = ','
        // Khi decimal chia value thành 2 phần và phần số thập phân không chứa ký tự khác
        // Nếu value gồm 1 phần => return value
        // Nếu value gồm 3 phần 
        //  => Lấy ký tự bên trái cùng là decimal
        //  => Lấy phần bên trái deicmal là phần nguyên
        //  => Lấy phần bên phải tới ký tự tiếp theo là phần thập phân

        // Binding
        let _this = this;

        // Function
        function validateStrNumber(value: string) {
            return Utility.validateStrNumber(value);
        }

        function validateNumberCharacter(value: string) {
            return Utility.validateNumberCharacter(value);
        }

        function isValidNonNumberChar(char: string) {
            return char == '.' || char == ',';
        }

        function isValidNumberPart(numberPart: string) {
            let pos = 1
            for (let i = numberPart.length - 1; i >= 0; i--) {
                let char = numberPart[i];

                if (pos % 4 == 0) {
                    if (!isValidNonNumberChar(char)) {
                        return false;
                    }
                } else {
                    if (!validateNumberCharacter(char)) {
                        return false;
                    }
                }

                pos++;
            }

            return true;
        }

        // Start 
        if (value == '') {
            this.setState({ displayValue: '', value: undefined }, () => {
                if (typeof this.props.onChange === 'function') {
                    this.props.onChange(this.state.value, this.state.displayValue)
                }
            })

            return;
        }

        if (!validateStrNumber(value)) {
            return;
        }

        var comma = ',',
            dot = '.';

        var dotSplit = value.split(dot),
            commaSplit = value.split(comma)

        var isDotDecimal = dotSplit && dotSplit.length == 2 && dotSplit[1].includes(comma) == false,// && isValidNumberPart(dotSplit[0]) == false,
            isCommaDecimal = commaSplit && commaSplit.length == 2 && commaSplit[1].includes(dot) == false,// && isValidNumberPart(commaSplit[0]) == false,
            isNormal = (dotSplit.length == 1 || commaSplit.length == 1) && isValidNumberPart(value),// || isValidNumberPart(dotSplit[0]) || isValidNumberPart(commaSplit[0]),
            orElse = !isDotDecimal && !isCommaDecimal && !isNormal;

        let _need_OrElse = true;

        if (isDotDecimal || isCommaDecimal) {
            let part = isDotDecimal ? dotSplit : commaSplit,
                decimalChar = isDotDecimal ? dot : comma,
                thosandChar = isDotDecimal ? comma : dot;

            let decimalPart = part[1],
                numberPart = part[0],
                numberPart_NoComma = isDotDecimal ? numberPart.replace(/\,/g, '') : numberPart.replace(/\./g, '');

            if (isValidNumberPart(numberPart)) {
                _need_OrElse = false;
                // VD: 123.456 có thể hiểu là 123 phẩy 456 hoặc 123 nghìn 456
                // Set isNormal = false để luôn ưu tiên ký tự đầu tiên là số thập phân
                isNormal = false; 

                let numberValue = Number(numberPart_NoComma + '.' + decimalPart)
                this.setState({ displayValue: value, value: numberValue }, () => {
                    if (typeof this.props.onChange === 'function') {
                        this.props.onChange(this.state.value, this.state.displayValue)
                    }
                })

            }

            // If _need_OrElse = true => isValidNumberPart = false <=> NumberPart have wrong placing of thousand seperator
        }

        if (isNormal) {
            let valueNoChar = value.replace(/\,/g, '').replace(/\./g, '');

            this.setState({ value: Number(valueNoChar), displayValue: value }, () => {
                if (typeof this.props.onChange === 'function') {
                    this.props.onChange(this.state.value, this.state.displayValue)
                }
            })

            return;
        }

        if (orElse || _need_OrElse) {
            let numberPart = "",
                decimalPart = "",
                decimalChar = '';

            for (var c = 0; c < value.length; c++) {
                let char = value[c];
                if (validateNumberCharacter(char)) {
                    if (decimalChar == '') {
                        numberPart += char;
                    } else {
                        decimalPart += char;
                    }
                    continue;
                }

                if (!isValidNonNumberChar(char)) {
                    return;
                }

                if (decimalChar != '') {
                    break;
                }

                decimalChar = decimalChar == '' ? char : decimalChar;
            }

            let strValue = numberPart + '.' + decimalPart;

            this.setState({ displayValue: value, value: Number(strValue) }, () => {
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
                maxLength={this.props.maxLength}
            />
        )
    }
}
