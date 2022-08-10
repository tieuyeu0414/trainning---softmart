import { inject, observer } from "mobx-react";
import { Menu } from "primereact/menu";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import SMX from "../../constants/SMX";
import GlobalStore from "../../Stores/GlobalStore";
import { Icons } from "../../themes";

interface iProps {
    history: any;
    GlobalStore: GlobalStore;
    toggleEnlargeMenu: any;
    removeEnlargeMenu: any;
}

interface iState {
    userName: string;
    isShowProfile: boolean;
    showMenuUser: string;
    //employee?: Employee;
    accountNumber: string;
    showPopupBangKe: boolean;
    total: number;
    showMenuOption: boolean;

    showPopupUserInfo: boolean;
    showPopupSetTellerID: boolean;
    showPopupChangePass: boolean;
    Areas?: any;
    Funds?: any;
    Roles?: Array<any>;

    showNotification: boolean;

    PageIndex: number;

    ListTellerID?: any;
    CurrentTellerID?: string;

    passOld?: string;
    passNew?: string;
    passConfirm?: string;

    ShowInchargingAuthorities?: boolean;
    Authoriting_Name?: string; // Tên tài khoản đang ủy quyền
}

@inject(SMX.StoreName.GlobalStore)
@observer
export default class TopMenu extends Component<iProps, iState> {
    menu!: Menu | null;
    private menuRef: React.RefObject<HTMLLIElement>;
    private menuOptionRef: React.RefObject<HTMLLIElement>;
    private notificationContentRef: React.RefObject<HTMLLIElement>;
    constructor(props: iProps) {
        super(props);
        this.state = {
            userName: "",
            isShowProfile: false,
            showMenuUser: "",
            accountNumber: "",
            showPopupBangKe: false,
            total: 0,
            showMenuOption: false,
            showPopupUserInfo: false,
            showPopupSetTellerID: false,
            showPopupChangePass: false,
            showNotification: false,
            ListTellerID: [],
            CurrentTellerID: '',
            PageIndex: 0,
        };
        this.menuRef = React.createRef();
        this.menuOptionRef = React.createRef();
        this.notificationContentRef = React.createRef();
    }

    async componentDidMount() {
        //await this.SetupForm();

        document.addEventListener("click", this.handleToggleMenuLogin);
        document.addEventListener("click", this.handleToggleMenuOption);
        document.addEventListener("click", this.handleToggleNotificationContent);

        // this.LoadAnnouncement(0);
        // window.setInterval(() => {
        //     this.LoadAnnouncement(0);
        // }, 60000); // 60000ms = 1phut
    }

    componentWillUnmount() {
        // important
        document.removeEventListener("click", this.handleToggleMenuLogin);
        document.removeEventListener("click", this.handleToggleMenuOption);
        document.removeEventListener("click", this.handleToggleNotificationContent);
    }

    handleToggleMenuLogin = (e: any) => {
        if (!this.menuRef.current?.contains(e.target)) {
            this.setState({ showMenuUser: "" });
        } else {
            let show = this.state.showMenuUser === "" ? "show" : "";
            this.setState({ showMenuUser: show });
        }
    };

    handleToggleNotificationContent = (e: any) => {
        if (!this.notificationContentRef.current?.contains(e.target)) {
            this.setState({ showNotification: false });
        } else {
            this.setState({ showNotification: !this.state.showMenuOption });
        }
    };

    handleToggleMenuOption = (e: any) => {
        if (!this.menuOptionRef.current?.contains(e.target)) {
            this.setState({ showMenuOption: false });
        } else {
            this.setState({ showMenuOption: !this.state.showMenuOption });
        }
    };

   
    render() {

        return (
            <div className="topbar-menu">
                <div className="topbar-menu-left flex">
                    <button
                        type="submit"
                        className="btn-close-menu button-no-style"
                        onClick={this.props.toggleEnlargeMenu}
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                </div>
                <ul className="topbar-menu-right">
                    {/* <li className="notification-list" style={{marginTop:'10px'}}>
                       <img src={playstore} alt="Logo" className="w-75" style={{ width: "100px" }} />
                        <img src={appstore} alt="Logo" className="w-75" style={{ width: "100px",marginLeft:'8px' }} /> 
                    </li>*/}
                    <li
                        className={`notification-list dropdown-user ${this.state.showMenuOption ? "show" : ""}`}
                        ref={this.menuOptionRef}
                    >
                        <Link to={"#"} className="notification-icon">
                            <i className={Icons.cog}></i>
                        </Link>
                        <div className="dropdown-user-menu default-border">
                            <ul>
                                <li>
                                    {/* <Link
                                        to="#"
                                        onClick={() => {
                                            this.setState({ showPopupBangKe: true });
                                        }}
                                    >
                                        <i className={Icons.search} style={{ marginRight: 5 }} /> Kiểm tra chi tiết tài
                                        khoản
                                    </Link> */}
                                    <Link
                                        to="/store/briefcase/exportbark" target="_blank"
                                    >
                                        <i className={Icons.download} style={{ marginRight: 5 }} /> Xuất vỏ bì
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li
                        className={`notification-list dropdown-user ${this.state.showNotification ? "show" : ""}`}
                        ref={this.notificationContentRef}
                    >
                        <Link to={"#"} onClick={() => { }} className="notification-icon">
                            <i className="far fa-bell">
                         
                            </i>
                        </Link>

                        <div className="dropdown-user-menu default-border box-notify">
                           
                            <div style={{ width: "100%", textAlign: "right" }}>
                                <a
                                    href=""
                                    onClick={() => this.props.history.push(`/notifications`)}
                                    style={{ padding: 10, display: "block" }}
                                >
                                    Xem tất cả
                                </a>
                            </div>
                        </div>
                    </li>
                    <li className={`dropdown-user ${this.state.showMenuUser}`} ref={this.menuRef}>
                        <span
                            className="grid-link dropdown-user-name"
                            onClick={() => {
                                document.addEventListener("click", this.handleToggleMenuLogin);
                            }}
                        >
                            <span className="box-top-userinfo">
                            

                                {/* <span className="tag-teller">
                                    <span className="tag-teller-title">TellerId: </span>
                                    {this.state.CurrentTellerID}
                                </span> */}
                            </span>

                            <i className="fas fa-chevron-down"></i>
                        </span>
                        <div className="dropdown-user-menu">
                            <ul>
                                {/* <li>
                                    <Link to="#" onClick={() => this.SetupTellerID()}>
                                        Dùng TellerID khác
                                    </Link>
                                </li> */}
                                {/* <li>
                                    <Link to="#" onClick={() => this.SetupForm()}>
                                        Xem thông tin cá nhân
                                    </Link>
                                </li>
                                {
                                    (!this.state.Employee!.Authorized_EmployeeName
                                        || this.state.Employee!.Authorized_EmployeeName === "") &&
                                    <li>
                                        <Link to="#" onClick={() => this.showInchargingAuthorities()}>
                                            Dùng tài khoản được ủy quyền
                                        </Link>
                                    </li>
                                }
                                {
                                    this.state.Employee!.AUTHENTICATION_TYPE === AuthenticationType.Local &&
                                    <li>
                                        <Link to="#" onClick={() => this.setState({ showPopupChangePass: true, passNew: '', passConfirm: '', passOld: '' })}>
                                            Đổi mật khẩu đăng nhập
                                        </Link>
                                    </li>
                                } */}

                                {/* <li style={{ borderTop: "1px solid #aaa" }}> */}
                                <li >
                                    <a style={{ padding: "10px 25px" }} href="#" onClick={() => {}}>
                                        <i className={Icons.signout}></i> Đăng xuất
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>

            </div>
        );
    }
}
