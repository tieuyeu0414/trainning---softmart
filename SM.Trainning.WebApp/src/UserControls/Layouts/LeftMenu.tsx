import React, { Component } from "react";
import flexCashLogo from "../../assets/images/logo-flexcash.png"
import SMX from "../../constants/SMX";
import { inject, observer } from "mobx-react";
import GlobalStore from "../../Stores/GlobalStore";
import { Link } from "react-router-dom";
import { Menu } from "primereact/menu";
import { Dialog } from "primereact/dialog";
import ApiUrl from "../../constants/ApiUrl";
import HttpUtils from "../../Utils/HttpUtils";
import { RouteCollection } from "../../screens/RouteManager";

interface iProps {
    history: any;
    GlobalStore: GlobalStore;
    toggleEnlargeMenu: any;
    removeEnlargeMenu: any;
}

interface iState {
    modalReportVisible: boolean;
}

@inject(SMX.StoreName.GlobalStore)
@observer
export default class LeftMenu extends Component<iProps, iState> {
    menu!: Menu | null;
    constructor(props: iProps) {
        super(props);
        this.state = {
            modalReportVisible: false,
        };
    }

    async componentDidMount() {
        this.setUpLeftMenu();
    }

    async setUpLeftMenu() {
        let featureData;
     
        //console.log(54, this.props.history.location.pathname, featureData)

        let currentURL = this.props.history.location.pathname;
        let defaultFeatureID = featureData && Array.isArray(featureData) && featureData.length > 0 ? featureData[0].FEATURE_ID : 0

    }

    handleActiveMenu = (e: any) => {
        let span = e.target.closest('.icon-menu');
        if (span) {
            this.props.GlobalStore.ActiveMenu = span.parentNode.id;
        }
        this.props.removeEnlargeMenu();
    };

    insertTreeArray(array: any[], dataObj: any, level: number, maxLevel = 2) {
        if (level > maxLevel) {
            return 0;
        }

        array.forEach((parent: any) => {
            if (parent['FeatureID']) {
                let parentID = parent['FeatureID'];
                if (dataObj[parentID]) {
                    // Parent có Child
                    if (!parent['Children']) {
                        // Khởi tạo mảng Children
                        parent['Children'] = []
                    }
                    parent['Children'].push(...dataObj[parentID]);
                    // Tiếp tục với mảng Children
                    this.insertTreeArray(parent['Children'], dataObj, level + 1);
                }
            }
        })
    }

    render() {
        return (
            <div className="leftbar-menu">
                <Link to="/" className="logo-menu">
                    <img src={flexCashLogo} alt="" />
                    {/* <img src={logo} /> */}
                </Link>
                <ul id="main-menu" className="main-menu">
                    {RouteCollection.map((item, index) => item.CheckMenu && (
                        <li key={item.Key}>
                            <Link to={`${item.Path}`}>
                                <span className="icon-menu">
                                    <i className={item.Icon}></i>
                                    <span>{item.Title}</span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>

                <Dialog
                    position="top"
                    header="Danh mục báo cáo"
                    visible={this.state.modalReportVisible}
                    modal={true}
                    onHide={() => this.setState({ modalReportVisible: false })}
                >
                    <div style={{ padding: 30 }}>
                        <Link
                            className="bt-report"
                            onClick={() => this.setState({ modalReportVisible: false })}
                            to="/report/downloadreport"
                        >
                            Tải báo cáo
                        </Link>
                        <br />
                        <br />
                        <Link
                            className="bt-report"
                            onClick={() => this.setState({ modalReportVisible: false })}
                            to="/report/hmkdebt"
                        >
                            Báo cáo dư nợ bàn giao Đối tác thu nợ bên ngoài
                        </Link>
                        <br />
                        <br />
                        <Link
                            className="bt-report"
                            onClick={() => this.setState({ modalReportVisible: false })}
                            to="/report/hmkresult"
                        >
                            Báo cáo kết quả thu nợ của Đối tác thu nợ thuê ngoài
                        </Link>
                        <br />
                        <br />
                        <Link
                            className="bt-report"
                            onClick={() => this.setState({ modalReportVisible: false })}
                            to="/report/customerinfodebt"
                        >
                            Báo cáo thông tin khách hàng bàn giao sang đơn vị thu nợ
                        </Link>
                    </div>
                </Dialog>
            </div>
        );
    }
}
