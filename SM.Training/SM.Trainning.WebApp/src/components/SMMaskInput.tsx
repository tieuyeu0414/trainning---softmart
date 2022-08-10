import React, { Component } from 'react'

interface iProps {
    mask?: string | (string | RegExp)[];
    maskPlaceHolder?: string;
    value?: string;
    onChange?: (value: string) => void;
}

interface iState {
    displayValue?: string;
    value?: string;
    maskTemplate?: MaskIndex[]
}

const DigitReg = /[0-9]/i;
const LetterReg = /[a-z]/i;
const AnyReg = /[0-9a-z]/i;

const Digit = '9'
const Letter = 'a'
const Any = '*'

const defaultMask = "_"

class MaskIndex {
    value?: string | RegExp;
    regex?: undefined | string | RegExp;
}

export default class SMMaskInput extends Component<iProps, iState> {
    constructor(props: iProps) {
        super(props)
        this.state = {

        }
    }

    private refInput = React.createRef<HTMLInputElement>();
    private _selectionStart = 0;
    private _selectionEnd = 0;
    private _isDelete = false;
    private _isBackspace = false
    private maskLength = 0;

    componentDidMount() {
        let maskTemplate = this.analyzeMask(this.props.mask)
        // let displayValue = this.calcDisplayValue(maskTemplate)

        this.setState({ maskTemplate }, () => {
            this.updateValue(this.props.value || '')
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps: iProps) {
        if (nextProps.value && nextProps.value !== this.state.value) {
            this.updateValue(nextProps.value)
        }
    }

    updateValue(value: string) {
        this._selectionStart = 0
        this._selectionEnd = value.length
        this.onChangeText(value, value.length)
    }

    isValidateRegex(pattern: string | RegExp) {
        if (typeof pattern === 'string') {
            return false
        }

        try {
            let reg = new RegExp(pattern, '');
            return true
        }
        catch (e) {
            return false;
        }
    }

    testRegex(pattern: any): RegExp | undefined {
        var parts = pattern?.toString()?.split('/'),
            regex = pattern,
            options = "i";
        if (parts && parts.length > 1) {
            regex = parts[1];
            options = parts[2];
        }
        try {
            return new RegExp(regex, options);
        }
        catch (e) {
            return undefined;
        }
    }

    analyzeStringMask(mask: string) {
        let maskTemplate: MaskIndex[] = []

        let i = 0
        let n = mask.length
        this.maskLength = mask.length

        while (i < n) {
            let char = mask.charAt(i)
            if (char === '\\') {
                i++
                n++
                this.maskLength--
            }

            let maskIndex = new MaskIndex()

            switch (char) {
                case Digit: {
                    maskIndex.regex = DigitReg
                    break;
                }
                case Letter: {
                    maskIndex.regex = LetterReg
                    break;
                }
                case Any: {
                    maskIndex.regex = AnyReg
                    break;
                }
                case '\\': {
                    maskIndex.value = mask.charAt(i)
                    break;
                }
                default: {
                    maskIndex.value = char
                    break;
                }
            }

            maskTemplate.push(maskIndex)
            i++
        }

        return maskTemplate
    }

    analyzeStringArrMask(mask: (string | RegExp)[]) {
        let maskTemplate: MaskIndex[] = []

        this.maskLength = mask.length

        for (let i = 0; i < mask.length; i++) {
            let maskIndex = new MaskIndex()
            let pattern = mask[i]

            if (this.isValidateRegex(pattern)) {
                maskIndex.regex = pattern
            } else {
                maskIndex.regex = undefined
                maskIndex.value = pattern
            }

            maskTemplate.push(maskIndex)
        }

        return maskTemplate
    }

    analyzeMask(mask?: string | (string | RegExp)[]): MaskIndex[] | undefined {
        if (mask) {
            if (Array.isArray(mask)) {
                return this.analyzeStringArrMask(mask)
            } else {
                return this.analyzeStringMask(mask)
            }
        }
    }

    calcDisplayValue(maskTemplate?: MaskIndex[]): string {
        const { maskPlaceHolder, mask } = this.props
        let maskHolder = maskPlaceHolder?.length == 1 ? maskPlaceHolder : defaultMask

        let displayValue = maskTemplate?.map((item, index) => {
            if (item.regex) {
                if (maskPlaceHolder?.length === this.props.mask?.length) {
                    maskHolder = maskPlaceHolder?.charAt(index) || defaultMask
                }

                return item.value ?? maskHolder
            } else {
                return item.value!
            }
        }).join('')

        return displayValue || ''
    }

    onChangeText(value: string, insertCharIndex: number) {
        const { displayValue, maskTemplate } = this.state
        const { mask } = this.props

        if (maskTemplate) {
            let moveCursorIndex = this._selectionStart
            let changeValue = ''

            // Delete
            if (this._isBackspace || this._isDelete) {
                changeValue = ''

                if (this._isBackspace) {
                    if (this._selectionEnd === this._selectionStart) {
                        this._selectionStart--
                    }
                    this._selectionEnd--

                    if (moveCursorIndex !== 0 && this._selectionEnd === this._selectionStart) {
                        moveCursorIndex--
                    }
                }

                for (let index = this._selectionStart; index <= this._selectionEnd; index++) {
                    const element = maskTemplate[index];
                    if (element && element.regex) {
                        element.value = undefined
                    }
                }

            } else {
                if (this._selectionStart + 1 > this.maskLength) {
                    return;
                }

                // Insert
                if (insertCharIndex === this._selectionStart) {
                    // Insert 1 ký tự
                    changeValue = value.charAt(this._selectionStart)

                    for (let index = this._selectionStart; index <= this._selectionEnd; index++) {
                        const element = maskTemplate[index];
                        if (index === this._selectionStart) {
                            let nextIndex = maskTemplate.findIndex((mask, _index) => mask.regex && _index > index)
                            let charIndex = this._selectionStart

                            // Nếu vị trí nhập là mask 
                            if (maskTemplate[index]?.regex == undefined) {
                                charIndex = nextIndex;
                                nextIndex = maskTemplate.findIndex((mask, _index) => mask.regex && _index > nextIndex)
                            }

                            let maskReg = new RegExp(maskTemplate[charIndex]?.regex!, "i")
                            let moveCursor = false

                            if (this.testRegex(maskTemplate[charIndex]?.regex)?.test(changeValue)) {
                                maskTemplate[charIndex].value = changeValue
                                moveCursor = true
                            }

                            if (moveCursor) {
                                // Nếu vị trí tiếp theo không phải ô nhập thì tìm vị trí nhập mới
                                if (maskTemplate[nextIndex] && maskTemplate[nextIndex].regex == undefined) {
                                    nextIndex = maskTemplate.findIndex((mask, _index) => mask.regex && _index > nextIndex)
                                }
                                moveCursorIndex = nextIndex
                            }

                        } else {
                            // Xóa ký tự
                            if (element && element.regex) {
                                element.value = undefined
                            }
                        }
                    }
                } else {
                    // Insert nhiều ký tự (paste)
                    changeValue = value.slice(this._selectionStart, insertCharIndex + 1)
                    let endChangeIndex = insertCharIndex + 1
                    let changeValueIndex = 0

                    while (this._selectionStart <= endChangeIndex) {
                        let element = maskTemplate[this._selectionStart]
                        let charValue = changeValue.charAt(changeValueIndex)

                        if (element && element.regex) {
                            let maskReg = new RegExp(element.regex, "i")

                            if (maskReg.test(charValue)) {
                                element.value = charValue
                            }

                            changeValueIndex++
                        }

                        if (element && element.regex === undefined) {
                            endChangeIndex++
                        }

                        this._selectionStart++
                    }

                    moveCursorIndex = endChangeIndex
                }
            }

            let displayValue = this.calcDisplayValue(maskTemplate)
            this.setState({ displayValue, maskTemplate }, () => {
                this.setInputCursorPos(moveCursorIndex)
                this.returnValue()
            })
        }
    }

    setInputCursorPos(index: number) {
        this.refInput.current?.setSelectionRange(index, index)
    }

    returnValue() {
        let value = this.state.maskTemplate?.map(x => {
            if (x.regex && x.value) {
                return x.value
            }
        }).join('')

        this.setState({ value: value }, () => {
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(value || '')
            }
        })
    }

    render() {
        return (
            <input
                ref={this.refInput}
                className="sm-textbox"
                value={this.state.displayValue}
                onChange={(e) => {
                    this.onChangeText(e.currentTarget.value, (e.currentTarget.selectionStart ?? 1) - 1)
                }}
                onKeyDown={(e) => {
                    this._selectionEnd = e.currentTarget.selectionEnd ?? 0
                    this._selectionStart = e.currentTarget.selectionStart ?? 0

                    if (e.key === 'Delete') {
                        this._isDelete = true
                        this._isBackspace = false
                        return
                    }

                    if (e.key === 'Backspace') {
                        this._isBackspace = true
                        this._isDelete = false
                        return
                    }

                    this._isBackspace = false
                    this._isDelete = false
                }}
            />
        )
    }
}