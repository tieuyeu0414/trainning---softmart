import React, { Component, CSSProperties } from 'react';
import SMTreeView, { ConvertDataSource, SelectionMode } from './SMTreeView';
import TreeNode from "./TreeNode";

interface iProp {
    // Bộ style mặc định của thẻ
    className?: string;
    width?: number;
    style?: CSSProperties;
    contentStyle?: CSSProperties;
    enable?: boolean;
    dataSource: TreeNode[];
    selectionMode?: SelectionMode;
    menuMaxHeight?: number;
    dropdownWidth?: number | string;
    filter?: boolean;

    // Bộ event
    onChange?: (value?: number[], items?: TreeNode[]) => void; // Sự kiện khi change item
    selectedValue?: number[] | undefined;
    collapseAll?: boolean;
}

interface iState {
    dataSource: TreeNode[];
    dataSourceConvert: TreeNode[];
    selectedValue?: number[];
    selectedItem?: TreeNode[];
    collapseAll?: boolean;
    showContent?: boolean;
    posY: number;
    posX: number;
}

export default class ComboTreeView extends Component<iProp, iState> {
    static defaultProps: any;
    private treeBoxDiv: React.RefObject<HTMLDivElement>;
    private containerDiv: React.RefObject<HTMLDivElement>;
    private treeView: React.RefObject<SMTreeView> = React.createRef();

    constructor(props: iProp) {
        super(props);
        this.state = {
            selectedValue: this.props.selectedValue,
            dataSource: this.props.dataSource,
            dataSourceConvert: [],
            collapseAll: this.props.collapseAll,
            showContent: false,
            posX: 0,
            posY: 0,
        };
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.treeBoxDiv = React.createRef()
        this.containerDiv = React.createRef()
    }

    componentDidMount() {
        // Event bắt sự kiện khi click chuột để xác định sự kiện xảy ra bên trong hoặc bên ngoài Component
        document.addEventListener('mousedown', this.handleClickOutside);
        // Event bắt sự kiện khi thanh cuộn bị kéo sẽ đóng Component
        // document.addEventListener('scroll', this.handleClickOutside);
        let selectedItem = this.props.dataSource.filter(x => this.state.selectedValue?.includes(x.ID || 0))
        this.setState({ dataSourceConvert: ConvertDataSource(this.state.dataSource), selectedItem })
    }

    handleClickOutside(event: any) {
        if (this.state.showContent) {
            if (this.treeBoxDiv && !this.treeBoxDiv.current!.contains(event.target)) {
                this.onClosePopup()
            }
        }
    }

    onClosePopup() {
        this.containerDiv.current?.scrollTo({ top: 0 })
        this.setState({
            showContent: false,
        });
        if (this.props.filter) {
            this.treeView.current?.clearFilter()
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        // document.removeEventListener('scroll', this.handleClickOutside);
    }

    UNSAFE_componentWillReceiveProps(nextProps: iProp) {
        if (nextProps.selectedValue !== this.state.selectedValue) {
            let selectedItem = this.state.dataSource.filter(x => this.state.selectedValue?.includes(x.ID || 0))
            this.setState({ selectedValue: nextProps.selectedValue, selectedItem })
        }
        if (nextProps.dataSource && nextProps.dataSource != this.state.dataSource) {
            this.setState({ dataSource: nextProps.dataSource }, () => {
                this.setState({ dataSourceConvert: ConvertDataSource(this.state.dataSource) })
            })
        }
    }

    calculatePosition(event: React.MouseEvent<HTMLElement>) {
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;

        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const mnuW = this.treeBoxDiv.current!.clientWidth;
        const mnuH = this.treeBoxDiv.current!.clientHeight;

        let mnuX: number;
        let mnuY: number;

        if (mouseX + mnuW < screenW) {
            mnuX = mouseX;
        }
        else {
            mnuX = mouseX - mnuW;
        }

        if (mouseY + mnuH + this.props.menuMaxHeight! < screenH) {
            mnuY = 30 + 3;
        }
        else {
            mnuY = - (this.props.menuMaxHeight! + 3);
        }

        this.setState({
            posX: mnuX,
            posY: mnuY,
        });
    }

    displayTextValue() {
        if (this.props.selectionMode === 'single') {
            return this.state.selectedItem && this.state.selectedItem[0] ? this.state.selectedItem[0].Text : ''
        }

        if (this.props.selectionMode === 'checkbox') {
            let text = this.state.selectedItem?.map(x => x.Text).join(', ')
            return text
        }

        return ""
    }

    scrollToSelect() {
        let elm = document?.querySelector('.sm-treenode-select')
        if (elm) {
            elm.scrollIntoView({ behavior: "auto", block: "end", inline: "nearest" });
        }
    }

    render() {
        return (
            <div className="sm-treebox w-100" ref={this.treeBoxDiv} style={{ width: this.props.width }}>
                <div
                    className="treebox"
                    onClick={(e) => {
                        e.persist()

                        if (this.state.showContent) {
                            this.onClosePopup()
                        } else {
                            this.setState({ showContent: true }, () => {
                                this.calculatePosition(e)
                                this.scrollToSelect()
                            })
                        }
                    }}
                    tabIndex={0}
                >
                    <p>
                        {this.displayTextValue()}
                    </p>
                </div>
                <div
                    className="treebox-content"
                    style={{
                        display: this.state.showContent ? "block" : "none",
                        top: this.state.posY,
                        height: this.props.menuMaxHeight,
                        overflow: 'scroll',
                        // maxWidth: '150%',
                        width: this.props.dropdownWidth ?? '100%',
                        zIndex: 99999
                    }}
                    ref={this.containerDiv}
                >
                    <SMTreeView
                        ref={this.treeView}
                        style={this.props.style}
                        contentStyle={{ height: "fit-content", ...this.props.contentStyle }}
                        dataSource={this.state.dataSourceConvert}
                        selectionMode={this.props.selectionMode}
                        onChange={(value, items) => {
                            this.setState({ selectedValue: value, selectedItem: items }, () => {
                                if (typeof this.props.onChange === 'function') {
                                    this.props.onChange(value, items);
                                }
                            })
                            if (this.props.selectionMode === 'single') {
                                this.onClosePopup()
                            }
                        }}
                        selectedValue={this.state.selectedValue}
                        collapseAll={this.props.collapseAll}
                        // Số level được mở khi chọn CollapseAll = true
                        collapseAllLevel={1}
                        filter={this.props.filter}
                    />
                </div>
            </div>
        )
    }
}

// Khai báo các giá trị default của props nếu không được truyền vào
ComboTreeView.defaultProps = {
    collapseAll: true,
    menuMaxHeight: 200,
    contentWidthAuto: true,
    filter: true,
}