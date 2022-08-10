import React, { Component, CSSProperties } from 'react'
import { Editor } from 'primereact/editor';

interface iProp {
    style?: any;
    readOnly?: boolean;
    value?: string;

    // Bộ event
    onChange?: (value?: string) => void; // Sự kiện khi change item
}

interface iState {
    value?: string;
}

const modules = {
    toolbar: [
        [{ 'font': [] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        // ['blockquote', 'code-block'],

        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        // [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        // [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        // [{ 'direction': 'rtl' }],                         // text direction

        // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        ['link'],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
    ],
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link',
]

export default class TextEditor extends Component<iProp, iState> {
    public static defaultProps = {
        style: { height: 320 },
        readOnly: false,
    };

    constructor(props: iProp) {
        super(props)
        this.state = {
            value: this.props.value
        }
    }


    componentDidMount() {

    }

    UNSAFE_componentWillReceiveProps(nextProps: iProp) {
        if (nextProps.value && nextProps.value !== this.state.value) {
            this.setState({ value: nextProps.value })
        }
    }


    render() {
        return (
            <Editor style={this.props.style}
                value={this.state.value}
                onTextChange={(e) => {
                    this.setState({ value: e.htmlValue ?? undefined }, () => {
                        if (typeof this.props.onChange === 'function') {
                            this.props.onChange(this.state.value)
                        }
                    })
                }}
                modules={modules}
                formats={formats}
                headerTemplate={<></>}
                readOnly={this.props.readOnly}
            />
        )
    }
}
