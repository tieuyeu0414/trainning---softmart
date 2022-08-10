import React, { Component } from 'react'
import CKEditor from './RichTextEditor/CKEditor'
import FroalaEditor from './RichTextEditor/ForalaEditor';

interface iProps {
    data?: string
    onChange?: (data: any) => void;
    disabled?: boolean;
}

interface iState {
    data: string
}

export default class RichTextEditor extends Component<iProps, iState> {
    constructor(props: iProps) {
        super(props);
        this.state = {
            data: ''
        }
    }

    render() {
        return (
            <>
                {/* <FroalaEditor
                    data={this.props.data}
                    onChange={(value) => {
                        if (typeof this.props.onChange === 'function') {
                            this.props.onChange(value)
                        }
                    }}
                    disabled={this.props.disabled}
                /> */}
                <CKEditor
                    data={this.props.data}
                    onChange={(data) => {
                        if (typeof this.props.onChange === 'function') {
                            this.props.onChange(data)
                        }
                    }}
                    disabled={this.props.disabled}
                />
            </>

        )
    }
}
