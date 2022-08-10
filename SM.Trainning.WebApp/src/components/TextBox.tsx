import React, { Component, RefObject } from 'react'

interface iProp extends React.HTMLProps<HTMLInputElement> {
    ref?: RefObject<any>,

    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    // Bộ prop dữ liệu
    dataSource?: string[];

    // Các option cho textBox
    regex?: RegExp | RegExp[];
    value?: any
}

export default class TextBox extends Component<iProp, any> {

    _inputRef: React.RefObject<HTMLInputElement> = React.createRef();

    getInputRef(): HTMLInputElement | null {
        return this._inputRef.current
    }

    testRegex(value: string) {
        let regex = this.props.regex!;
        // Thực hiện test regex
        if (Array.isArray(regex)) {
            let result = false
            regex.forEach(x => {
                if (x.test(value) == true) {
                    result = true
                }
            })
            return true;
        } else {
            return regex!.test(value)
        }

        return true
    }

    render() {
        return (
            <input
                {...this.props}
                type={this.props.type ?? "text"}
                ref={this._inputRef}
                // value={this.props.value}
                onChange={(e) => {
                    let value = e.currentTarget.value
                    if (this.props.regex && value != '') {
                        let result = this.testRegex(value)
                        if (result == false) {
                            return;
                        }
                    }

                    if (typeof this.props.onChange === 'function') {
                        this.props.onChange(e)
                    }
                }}
            >
            </input>
        )
    }
}