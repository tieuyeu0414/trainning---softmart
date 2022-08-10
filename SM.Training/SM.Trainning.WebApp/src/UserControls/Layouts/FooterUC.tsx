import React, { Component } from "react";

interface iProp {}
interface iState {
}

export default class FooterUC extends Component<iProp, iState> {
  constructor(props: any) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    return (
      <div
        className="footer-FlexOffice"
        style={{ padding: "2px 2px 0px 15px" }}
      >
        <div className="p-grid" style={{marginBottom: '-.6em'}}>
          <div className="p-col-7">
            <p style={{ margin: "6px 0 6px 0", textAlign: "right" }}>
              Copyright © 2021 SoftMart JSC.
            </p>
          </div>
          <div className="p-col-1">&nbsp;</div>
        </div>
      </div>
    );
  }
}
