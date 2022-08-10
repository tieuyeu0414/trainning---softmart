import React, { Component } from 'react'

interface iProp {
    title?: string;
    width?: number | string;
    height?: number | string;
    overflow?:  string;
}

interface iState {
}

export default class DialogBox extends Component<iProp, iState> {
    constructor(props: iProp) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <>
                <div className="dialog">
                    <div className="dialog-content"
                         style={{
                             width: this.props.width,
                             height: this.props.height,
                             overflow:this.props.overflow
                         }}>
                        <div className="dialog-header">
                            {this.props.title}
                        </div>
                        {this.props.children}
                    </div>
                </div >
            </>
        )
    }
}