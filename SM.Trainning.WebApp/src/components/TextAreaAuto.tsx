import React, { Component, CSSProperties } from "react";
import ReactDOM from 'react-dom';

interface iProp {
  // Bộ style mặc định của thẻ
  className?: string;
  style?: CSSProperties;

  // Bộ event
  onChange?: (value?: string) => void;
}

interface iState {
  height: string;
}

export default class TextAreaAuto extends Component<iProp, iState> {
  constructor(props: iProp) {
    super(props);
    this.state = {
      height: "",
    };
  }

  textareaChange(){
    let textarea: any = ReactDOM.findDOMNode(this);
    this.setState({height: textarea!.scrollHeight+'px'})
  }

  render() {
    return (
        <textarea rows={1}
                  onChange={() => this.textareaChange()}
                  className="sm-textarea"
                  style={{...this.props.style,
                    overflow: 'hidden',
                    height: this.state.height,
                  }}
        >{this.props.children}</textarea>
    );
  }
}
