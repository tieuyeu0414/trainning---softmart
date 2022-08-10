import React, { Component, CSSProperties } from "react";
import SMTreeView, { ConvertDataSource, SelectionMode } from "./SMTreeView";
import TreeNode from "./TreeNode";

interface iProp {
    // Bộ style mặc định của thẻ
    className?: string;
    style?: CSSProperties;
    contentStyle?: CSSProperties;
    enable?: boolean;
    dataSource?: TreeNode[];
    selectionMode?: SelectionMode;

    // Bộ event
    onChange?: (value: number[]) => void; // Sự kiện khi change item
    selectedValue?: number[] | undefined;
    collapseAll?: boolean;
}

interface iState {
    selectKey?: TreeNode;
    dataSource: TreeNode[];
    dataSourceConvert: TreeNode[];
    selectedValue?: number[] | undefined;
    collapseAll?: boolean;
}

export default class TreeView extends Component<iProp, iState> {
    static defaultProps: any;

    constructor(props: iProp) {
        super(props);
        this.state = {
            selectKey: new TreeNode(),
            selectedValue: this.props.selectedValue,
            dataSource: this.props.dataSource || [],
            dataSourceConvert: [],
            collapseAll: this.props.collapseAll,
        };
    }

    componentDidMount() {
        this.setState({ dataSourceConvert: ConvertDataSource(this.state.dataSource) })
    }

    UNSAFE_componentWillReceiveProps(nextProps: iProp) {
        if (nextProps.selectedValue !== this.state.selectedValue) {
            this.setState({ selectedValue: nextProps.selectedValue })
        }
        if (nextProps.dataSource && nextProps.dataSource != this.state.dataSource) {
            this.setState({ dataSource: nextProps.dataSource }, () => {
                this.setState({ dataSourceConvert: ConvertDataSource(this.state.dataSource) })
            })
        }
    }

    render() {
        return (
            <div>
                <SMTreeView
                    style={this.props.style}
                    contentStyle={{ height: "fit-content", ...this.props.contentStyle }}
                    dataSource={this.state.dataSourceConvert}
                    selectionMode={this.props.selectionMode}
                    onChange={(value) => {
                        this.setState({ selectedValue: value }, () => {
                            this.props.onChange!(value!);
                        })
                    }}
                    selectedValue={this.state.selectedValue}
                    collapseAll={this.props.collapseAll}
                    // Số level được mở khi chọn CollapseAll = true
                    collapseAllLevel={1}
                />
            </div>
        );
    }
}

// Khai báo các giá trị default của props nếu không được truyền vào
TreeView.defaultProps = {
    collapseAll: true,
}