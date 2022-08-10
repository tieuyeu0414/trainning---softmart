import React, { Component } from 'react'

interface iProp extends React.HTMLProps<HTMLTextAreaElement> {

}

export default class TextArea extends Component<iProp, any> {
    private _ref = React.createRef<HTMLTextAreaElement>();

    constructor(props: iProp) {
        super(props)
        this.state = {
            height: 'auto'
        }

        this.OnInput = this.OnInput.bind(this)
    }

    componentDidMount() {
        this.OnInput()
    }

    componentWillUnmount() {
    }

    UNSAFE_componentWillReceiveProps(nextProps: iProp) {
        this.OnInput()
    }

    OnInput() {
        let element = this._ref.current
        if (element) {
            let elmHeight = isNaN(Number(element.style.height.split('px')[0])) ? 0 : Number(element.style.height.split('px')[0])
            if (element.scrollHeight > elmHeight) {
                element.style.height = "auto";
                element.style.height = element.scrollHeight + "px";
            }

        }
    }

    render() {
        return (
            <textarea
                {...this.props}
                data-class="sm-textarea"
                ref={this._ref}
                style={{
                    overflowY: 'hidden',
                }}
            />
        )
    }
}