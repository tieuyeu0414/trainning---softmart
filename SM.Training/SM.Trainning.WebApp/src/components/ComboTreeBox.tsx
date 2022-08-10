import { Tree } from "primereact/tree";
import React, { Component, CSSProperties } from "react";
import TreeNode from "./TreeNode";

interface iProp {
    // Bộ style mặc định của thẻ
    className?: string;
    style?: CSSProperties;
    enable?: boolean;

    width?: number | string;

    dataSource: TreeNode[];
    selectedValue?: TreeNode;
    selectionMode?: "checkbox" | "single";

    propagateSelectionDown?: boolean;

    // Bộ event
    onChange?: (value: number[]) => void; // Sự kiện khi change item
    reset?: boolean;
}

interface iState {
    showContent: boolean;
    selectKey?: TreeNode;
    selectedValues?: number[];
    selectedTexts?: string[];

    propagateSelectionDown?: boolean;
    dataSource: TreeNode[];
    reset?: boolean;
}
export default class ComboTreeBox extends Component<iProp, iState> {
    public static defaultProps = {
        selectionMode: "single",
        width: "100%",
        propagateSelectionDown: true,
    };

    private treeBoxDiv: React.RefObject<HTMLDivElement>;

    constructor(props: iProp) {
        super(props);
        this.state = {
            showContent: false,
            selectKey: this.props.selectedValue,
            propagateSelectionDown: this.props.propagateSelectionDown,
            //selectedTexts: [this.props.selectedValue!.Text!],
            dataSource: this.props.dataSource,
            reset: this.props.reset
        };
        this.treeBoxDiv = React.createRef();
    }

    componentDidMount() {
        document.addEventListener("click", this.handleTreeboxClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleTreeboxClick)
    }

    UNSAFE_componentWillReceiveProps(nextProps: iProp) {
        if (nextProps.selectedValue && nextProps.selectedValue !== this.state.selectKey) {
            this.setState({ selectKey: nextProps.selectedValue, selectedTexts: [nextProps.selectedValue!.Text!] });
        }

        if (nextProps.dataSource !== this.state.dataSource) {
            this.setState({ dataSource: nextProps.dataSource });
        }

        if (
            nextProps.propagateSelectionDown !== undefined &&
            this.state.propagateSelectionDown !== undefined &&
            nextProps.propagateSelectionDown != this.state.propagateSelectionDown
        ) {
            this.setState({ propagateSelectionDown: nextProps.propagateSelectionDown });
        }

        if (nextProps.reset !== this.state.reset) {
            this.clearData();
            this.setState({ reset: nextProps.reset })
        }
    }

    clearData() {
        this.setState({ selectKey: undefined, selectedTexts: [] });
    }

    handleTreeboxClick = (evt: any) => {
        if (!this.treeBoxDiv.current?.contains(evt.target)) {
            this.setState({ showContent: false });
        }
    };

    ConvertDataSource(parentID?: number) {
        let data: any[] = [];
        let ds = this.state.dataSource!;
        for (let i = 0; i < ds.length; i++) {
            if (ds[i].ParentID && parentID && ds[i].ParentID === parentID) {
                data.push({
                    key: ds[i].ParentID + "-" + ds[i].ID,
                    label: ds[i].Text,
                    icon: ds[i].Icon,
                    selectable: ds[i].Selectable !== undefined ? ds[i].Selectable : true,
                    children: this.ConvertDataSource(ds[i].ID).length > 0 ? this.ConvertDataSource(ds[i].ID) : null,
                });
            } else if (parentID === undefined && ds[i].ParentID === undefined) {
                data.push({
                    key: ds[i].ID?.toString(),
                    label: ds[i].Text,
                    icon: ds[i].Icon,
                    selectable: ds[i].Selectable !== undefined ? ds[i].Selectable : true,
                    children: this.ConvertDataSource(ds[i].ID).length > 0 ? this.ConvertDataSource(ds[i].ID) : null,
                });
            }
        }
        return data;
    }

    render() {
        return (
            <div className="sm-treebox w-100" ref={this.treeBoxDiv} style={{ width: this.props.width }}>
                {/* <div
                    className="treebox"
                    onClick={() => {
                        this.setState({ showContent: !this.state.showContent });
                    }}
                >
                    <p>
                        {this.props.selectionMode === "single"
                            ? this.state.selectedTexts?.toString()
                            : this.state.selectedTexts && this.state.selectedTexts.length > 0
                                ? `Đã chọn ${this.state.selectedTexts.length} item`
                                : ""}
                    </p>
                    <i className="pi pi-chevron-down"></i>
                </div>
                <div className="treebox-content" style={{ display: this.state.showContent ? "block" : "none" }}>
                    <Tree
                        contentStyle={{ height: "fit-content", maxHeight: 500 }}
                        value={this.ConvertDataSource()}
                        selectionMode={this.props.selectionMode}
                        selectionKeys={this.state.selectKey}
                        metaKeySelection={false}
                        propagateSelectionUp={false}
                        propagateSelectionDown={this.state.propagateSelectionDown}
                        onSelectionChange={(e) => {
                            let ids = [];
                            if (this.props.selectionMode === "checkbox") {
                                this.setState({ selectKey: e.value });

                                for (let en in e.value) {
                                    if (en.includes("-") && e.value[en].checked) {
                                        ids.push(parseInt(en.split("-")[1]));
                                    } else if (e.value[en].checked) {
                                        ids.push(parseInt(en));
                                    }
                                }

                                let texts: string[] = [];
                                ids.forEach((id) => {
                                    this.state.dataSource.forEach((item) => {
                                        if (id === item.ID) {
                                            texts.push(item.Text!);
                                        }
                                    });
                                });
                                this.setState({ selectedTexts: texts });
                            } else {
                                let id = "";
                                if (e.value.includes("-")) {
                                    id = e.value.split("-")[1];
                                } else {
                                    id = e.value;
                                }
                                ids.push(parseInt(id));

                                let texts: string[] = [];
                                ids.forEach((id) => {
                                    let dataSource = this.state.dataSource;
                                    dataSource.forEach((item) => {
                                        if (id === item.ID) {
                                            texts.push(item.Text!);
                                            item.Icon = "fa fa-check";
                                        } else {
                                            item.Icon = "";
                                        }
                                    });
                                });

                                this.setState({ showContent: false, selectedTexts: texts });
                            }

                            this.props.onChange!(ids);
                        }}
                    />
                </div> */}
            </div>
        );
    }
}
