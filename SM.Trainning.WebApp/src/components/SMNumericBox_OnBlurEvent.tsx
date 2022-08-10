import React, { Component, CSSProperties } from 'react'

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

let allowKey = ['k', 'm', 'b', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-']
let fastKey = ['k', 'm', 'b']
let numberKey = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

const K = 1000
const M = 1000000
const B = 1000000000

export default class SMNumericBox_OnBlurEvent extends Component<iProp, iState> {
    private _inputRef: React.RefObject<HTMLInputElement> = React.createRef();

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

        allowKey.push(this.props.commaFraction ? ',' : '.')
    }

    componentDidMount() {
        if (this.props.value != null) {
            let strValue = this.numberWithCommas(this.props.value.toString())
            this.setState({ value: this.props.value, displayValue: strValue })
        }
    }

    /// Dùng để nhận các props mới được truyền đến
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

    /// Dùng để bắn sự kiện ngược về component cha
    componentDidUpdate(prevProps: iProp, prevState: iState, snapshot: any) {
        if (prevState.value !== this.state.value) {
            // console.log('componentDidUpdate', prevState.value, this.state.value)
            // if (typeof this.props.onChange === 'function') {
            //     this.props.onChange(this.state.value)
            // }
        }
    }

    private _selectionStart = 0;

    checkValidKey(value?: string) {
        if (value == undefined) return true;
        if (value == '') return true;

        let negativeCount = 0

        for (let index = 0; index < value.length; index++) {
            let char = value.charAt(index).toLowerCase()
            if (allowKey.includes(char) == false) {
                return false;
            }

            if (char == '-') {
                negativeCount++
            }

            if (negativeCount > 1) {
                return false;
            }
        }

        return true;
    }

    isFastChar(c: string) {
        return fastKey.includes(c) == true
    }

    isNumberChar(c: string) {
        return numberKey.includes(c) == true
    }

    analyzeString(value: string | undefined): number {
        if (value == undefined) return 0

        let groupValue: string[] | undefined = []
        let group: string = ''

        let prevChar = ''
        // VD: Str có dạng sau 
        // 1B2M3K
        // Tách thành groupValue = ['1B', '2M', '3K']
        for (let index = 0; index < value.length; index++) {
            let char = value.charAt(index)

            if (this.isFastChar(prevChar) && this.isNumberChar(char)) {
                groupValue.push(group)
                group = ''
            }

            group += char

            if (index == value.length - 1) {
                groupValue.push(group)
            }
        }

        // groupValue = ['1B', '2M', '3K']

        let finalValue = 0

        for (let groupIndex = 0; groupIndex < groupValue.length; groupIndex++) {
            const strValue = groupValue[groupIndex];

            let numberPart = ''
            let keyPart = ''

            for (let index = 0; index < strValue.length; index++) {
                const char = strValue.charAt(index);
                if (this.isNumberChar(char)) {
                    numberPart += char
                } else {
                    keyPart += char
                }
            }

            // Tính giá trị của NumberPart và KeyPart

            let numberValue = numberPart == '' ? 1 : Number(numberPart)
            let keyValue = 1

            for (let index = 0; index < keyPart.length; index++) {
                const key = keyPart[index];

                switch (key) {
                    case 'k':
                        keyValue = keyValue * K
                        break;
                    case 'm':
                        keyValue = keyValue * M
                        break;
                    case 'b':
                        keyValue = keyValue * B
                        break;
                }
            }

            finalValue = finalValue + numberValue * keyValue
        }

        return finalValue
    }

    onChangeValue(strValue: string) {
        try {
            if (this.checkValidKey(strValue) == false) {
                return;
            }

            // Khi truyền strValue rỗng
            if (strValue === '' || strValue == undefined) {
                this.setState({ value: undefined, displayValue: '' })
                return;
            }

            // Khi truyền strValue là dấu "-"
            if (strValue === '-') {
                // Khi có minValue và minValue > 0 => Không có số âm
                if (this.props.min && this.props.min > 0) {
                    this.setState({ value: undefined, displayValue: '' })
                    return;
                }

                this.setState({ value: undefined, displayValue: '-' })
                return;
            }

            let { numberValue, displayValue, numberPart, decimalPart } = this.getNumberPart(strValue)

            let value: number | undefined = numberValue

            // Set giá trị 
            // value: number
            // displayValue: string
            if (this.props.min != undefined && numberValue < this.props.min) {
                value = this.props.min
                displayValue = value.toString()
            }

            if (this.props.max != undefined && numberValue > this.props.max) {
                value = this.props.max
                displayValue = value.toString()
            }

            this.setState({ value, displayValue })
        } catch (ex) {
            // Lỗi, không xử lý event
        }
    }

    getNumberPart(value: string) {
        let { decimalChar, thousandChar } = this.state

        let valuePart = value.split(decimalChar)
        let displayValue = value

        // Nếu nhập nhiều hơn 1 ký tự thập phân, không xử lý
        if (valuePart.length > 2) {
            throw ''
        }

        let numberPart = valuePart[0].replace(thousandChar, '')
        let decimalPart = valuePart[1]

        // Xử lý khi có giới hạn số ký tự sau phần thập phân
        if (this.props.numberFractionDigits && decimalPart != undefined) {
            decimalPart = decimalPart.substr(0, this.props.numberFractionDigits)

            value = numberPart + '.' + decimalPart
            displayValue = numberPart + decimalChar + decimalPart
        }

        let numberValue = Number(value)

        return { numberValue, displayValue, numberPart, decimalPart }
    }

    convertFromCommaFraction(x?: string) {
        if (!this.props.commaFraction) {
            return x;
        }

        return x?.replace('.', ',')
    }

    maintainCursorPosition() {
        // Xử lý thêm để các trường hợp nhập ký tự không đúng định dạng sẽ giữ nguyên 
        // cursor ở tại vị trí input
        this.setState({}, () => {
            this._inputRef.current?.setSelectionRange(this._selectionStart, this._selectionStart)
        })
    }

    numberWithCommas(x?: string) {
        let { decimalChar, thousandChar } = this.state;

        x = this.convertFromCommaFraction(x);

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

    _onFocus(displayValue: string) {
        let { decimalChar, thousandChar } = this.state;
        let valueNoComma = displayValue.split(thousandChar).join("");

        this.setState({ displayValue: valueNoComma })
    }

    calculateStrValue() {
        let { decimalChar, thousandChar } = this.state

        let { numberValue, displayValue, numberPart, decimalPart } = this.getNumberPart(this.state.displayValue || '')

        let isNumber = isNaN(numberValue) == false

        // Khi có nhập các giá trị số viết tắt
        if (!isNumber) {
            // B: 1 tỷ
            // M: 1 triệu
            // K: 1 nghìn
            let isNegetive = numberPart.charAt(0) == '-'
            if (isNegetive) {
                numberPart = numberPart.slice(1, numberPart.length - 1)
            }

            let numberPartGroup = this.analyzeString(numberPart?.toLowerCase())
            let decimalPartGroup = this.analyzeString(decimalPart?.toLowerCase())

            // value = Number(isNegetive ? '-' : '' + numberPartGroup + '.' + decimalPartGroup)
            // displayValue = isNegetive ? '-' : '' + numberPartGroup + decimalChar + decimalPartGroup
        }
    }

    render() {
        return (
            <input
                ref={this._inputRef}
                style={this.props.style}
                className={this.props.className}
                value={this.state.displayValue}
                disabled={this.props.disabled}
                onChange={(e) => {
                    // Xử lý thêm để các trường hợp nhập ký tự không đúng định dạng sẽ giữ nguyên 
                    // cursor ở tại vị trí input
                    this._selectionStart = (e.currentTarget.selectionStart || 1) - 1
                    this.onChangeValue(e.currentTarget.value)
                }}
                onFocus={(e) => {
                    if (typeof this.props.onFocus === 'function') {
                        this.props.onFocus()
                    }

                    this._onFocus(e.currentTarget.value)
                }}
                onBlur={(e) => {
                    // let

                    let strValue = this.numberWithCommas(this.state.displayValue)
                    this.setState({ displayValue: strValue })
                }}
            />
        )
    }
}
