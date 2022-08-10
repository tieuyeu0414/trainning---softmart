import React, { Component, CSSProperties } from 'react'
import TextArea from './TextArea';

interface iProp {
    className?: string;
    style?: CSSProperties;
    value?: string;
}

interface iState {

}

export default class MultilineLabel extends Component<iProp, iState> {
    static rg1 = new RegExp("\r\n", "g");
    static rg2 = new RegExp("\r", "g");
    static rg3 = new RegExp("\n", "g");

    renderMultiline(): string {
        let text = this.props.value;
        if (text) {

            text = text.replace(MultilineLabel.rg1, "<br/>");
            text = text.replace(MultilineLabel.rg2, "<br/>");
            text = text.replace(MultilineLabel.rg3, "<br/>");

            return text;
        }

        return "";
    }

    render() {
        return (
            <>
                <TextArea
                    disabled={true}
                    className={this.props.className}
                    value={this.props.value}
                    rows={1}
                />
            </>
        )

        // return (
        //     <span className={this.props.className} style={this.props.style}
        //         dangerouslySetInnerHTML={{ __html: this.renderMultiline() }}>
        //     </span>
        // )
    }
}
