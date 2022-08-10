import React, { Component, CSSProperties } from 'react'

interface iProp {
    id: string;
}
interface iState {
    posX: number;
    posY: number;
    isShowMenu: boolean;
    isInTable: boolean;//true là giành cho thuộc tính cho menu table để cho style cách bên phải ko bị che khuất
}

class ContextMenu extends Component<iProp, iState> {
    static lstMenu: Array<ContextMenu>;

    private wrapperRef: React.RefObject<HTMLDivElement>;

    constructor(props: iProp) {
        super(props);

        this.state = {
            posX: 0,
            posY: 0,
            isShowMenu: false,
            isInTable: false//mặc định false là kiểu hiển thị thường theo tọa độ click
        };

        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);

        // Nếu danh sách chưa khởi tạo => Cấp mới
        if (ContextMenu.lstMenu === undefined || ContextMenu.lstMenu === null) {
            ContextMenu.lstMenu = [];
        }

        ContextMenu.lstMenu.push(this);
    }
    static hiddenMenu(menuId: string) {
        const mnu = ContextMenu.lstMenu.find(en => en.props.id === menuId);
        if (mnu) {
            mnu.setState({
                isShowMenu: false,
            });
        }
    }
    static showMenu(event: any, menuId: string, isInTable?: boolean) {
        const mnu = ContextMenu.lstMenu.find(en => en.props.id === menuId);
        if (mnu) {
            const screenW = window.innerWidth;
            const screenH = window.innerHeight;

            const mouseX = event.clientX;
            const mouseY = event.clientY;

            const mnuW = mnu.wrapperRef.current!.clientWidth;
            const mnuH = mnu.wrapperRef.current!.clientHeight;

            let mnuX: number;
            let mnuY: number;

            if (mouseX + mnuW < screenW) {
                mnuX = mouseX;
            }
            else {
                mnuX = mouseX - mnuW;
            }

            if (mouseY + mnuH < screenH) {
                mnuY = mouseY;
            }
            else {
                mnuY = mouseY - mnuH;
            }

            mnu.setState({
                isShowMenu: true,
                posX: mnuX,
                posY: mnuY,
                isInTable: isInTable !== undefined ? isInTable! : false
            });
        }
    }

    // Ẩn toàn bộ context menu
    static hideAll() {
        ContextMenu.lstMenu.forEach((item: ContextMenu) => {
            item.hideMenu();
        });
    }

    hideMenu() {
        if (this.state.isShowMenu) {
            this.setState({ isShowMenu: false });
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        document.addEventListener('scroll', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        document.removeEventListener('scroll', this.handleClickOutside);
        ContextMenu.lstMenu = ContextMenu.lstMenu.filter(en => en !== this);
    }

    handleClickOutside(event: any) {
        if (this.state.isShowMenu) {
            if (this.wrapperRef && !this.wrapperRef.current!.contains(event.target)) {
                this.setState({
                    isShowMenu: false
                });
            }
        }
    }

    render() {
        return (
            <div className="sm-context-menu" style={this.state.isInTable === true ?
                {
                    top: this.state.posY,
                    display: this.state.isShowMenu ? "block" : "none",
                    right: 18,//khác nhau right cho table 
                } :
                {
                    top: this.state.posY,
                    display: this.state.isShowMenu ? "block" : "none",
                    left: this.state.posX,//khác nhau left lấy từ tọa độ click
                }
            }
                ref={this.wrapperRef}>
                <div className="sm-context-menu-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

interface contextMenuItemProp {
    iconClass?: string;
    iConStyle?: CSSProperties;

    className?: string;
    text?: string;
    onClick?: () => void;
}

interface contextMenuItemState {
}

class ContextMenuItem extends Component<contextMenuItemProp, contextMenuItemState> {

    constructor(props: contextMenuItemProp) {
        super(props);

        this.state = {

        };
    }

    handleItemClick() {
        // Ẩn toàn bộ context menu
        ContextMenu.hideAll();

        // Nếu có event thì thực thi event
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        return (
            <div onClick={() => this.handleItemClick()}
                className="sm-context-menu-item">
                <span className={this.props.className} ><i className={this.props.iconClass} style={this.props.iConStyle}></i> {this.props.text}</span>
            </div>
        )
    }
}

export { ContextMenu, ContextMenuItem }