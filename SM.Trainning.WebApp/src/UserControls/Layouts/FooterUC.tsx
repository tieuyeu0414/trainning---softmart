import React, { Component } from "react";
import appstore from "../../assets/images/appstore.png";
import playstore from "../../assets/images/playstore.png";
import {
  DialogBox,
  ErrorHandler,
  SMButton,
} from "../../components/ComponentLib";
import LoadingModal from "../../components/LoadingModal";
import ApiUrl from "../../constants/ApiUrl";
import { Icons } from "../../themes";
import HttpUtils from "../../Utils/HttpUtils";

interface iProp {}
interface iState {
  androidLink?: string;
  iosLink?: string;
  androidQRCode?: string;
  iosQRCode?: string;
  showDownloadApp: boolean;
  imgBase64?: string;
  typeDownload: number;
}

export default class FooterUC extends Component<iProp, iState> {
  constructor(props: any) {
    super(props);
    this.state = {
      showDownloadApp: false,
      typeDownload: 0,
    };
  }

  componentDidMount() {
    this.setState({

    });
  }

  showPopup(number: number) {
    if (number == 1) {
      let imgBase64 = `data:jpeg;base64,${this.state.androidQRCode}`;
      this.setState({ showDownloadApp: true, imgBase64, typeDownload: number });
    } else {
      let imgBase64 = `data:jpeg;base64,${this.state.iosQRCode}`;
      this.setState({ showDownloadApp: true, imgBase64, typeDownload: number });
    }
  }

  async downloadFileFromServer(e: any) {

  }

  render() {
    return (
      <div
        className="footer-FlexOffice"
        style={{ padding: "2px 2px 0px 15px" }}
      >
        <div className="p-grid" style={{marginBottom: '-.6em'}}>
          <div className="p-col-7">
            <p style={{ margin: "6px 0 0", textAlign: "right" }}>
              TPBank FlexCollateral - Copyright © 2021 SoftMart JSC.
            </p>
          </div>
          <div className="p-col-1">&nbsp;</div>
          <div className="p-col-4">
            <div style={{ textAlign: "right" }}>
              <SMButton
                className={"sm-button"}
                style={{ padding: 0 }}
                onClick={() => this.showPopup(1)}
              >
                <a target="_blank" title="Mobile app cho thiết bị Android">
                  <img
                    src={playstore}
                    alt="Android App"
                    className="download-app"
                    style={{ width: "100px" }}
                  />
                </a>
              </SMButton>
              <SMButton
                className={"sm-button"}
                style={{ padding: 0 }}
                onClick={() => this.showPopup(2)}
              >
                <a target="_blank" title="Mobile app cho Iphone">
                  <img
                    src={appstore}
                    alt="Ios App"
                    className="download-app"
                    style={{ width: "100px", marginLeft: "5px" }}
                  />
                </a>
              </SMButton>
            </div>
          </div>
        </div>
        {this.state.showDownloadApp && (
          <DialogBox title="Tải ứng dụng" width={500}>
            <div
              className="card card-w-title box-grid-custom"
              style={{ paddingBottom: 10 }}
            >
              <div
                className="p-grid"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "10px",
                  marginRight: "5px",
                }}
              >
                <div className="p-col-12">
                  {this.state.typeDownload == 1 ? (
                    <a
                      href={this.state.androidLink}
                      target="_blank"
                      title="Mobile app cho thiết bị Android"
                      style={{ textDecoration: "underline" }}
                      onClick={(e) => {
                        this.downloadFileFromServer(e);
                      }}
                    >
                      {`Link tải ứng dụng Android`}
                    </a>
                  ) : undefined}
                  {this.state.typeDownload == 2 ? (
                    <a
                      href={this.state.iosLink}
                      target="_blank"
                      title="Mobile app cho thiết bị IOS"
                      style={{ textDecoration: "underline" }}
                    >
                      {`Link tải ứng dụng IOS`}
                    </a>
                  ) : undefined}
                  <p style={{fontWeight: 600, marginTop: 22, color: '#5a5c61', fontSize: 14 }}>Hoặc quét mã QRCode</p>
                </div>
                <div className="p-col-12" style={{ paddingTop: 0 }}>
                  <div>
                    <img
                      style={{ width: 300, height: 300 }}
                      src={this.state.imgBase64}
                    />
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "right", paddingRight: "0px" }}>
                &nbsp;
                {
                  <SMButton
                    className="sm-button"
                    onClick={() =>
                      this.setState({ showDownloadApp: false, typeDownload: 0 })
                    }
                  >
                    <i className={Icons.close}></i> Đóng
                  </SMButton>
                }
              </div>
            </div>
          </DialogBox>
        )}
      </div>
    );
  }
}
