import React, { Component, CSSProperties, useState } from "react";
import TreeNode from "./TreeNode";

export type SelectionMode = "checkbox" | "single" | "tri-state"

interface iProp {
    // Bộ style mặc định của thẻ
    className?: string;
    style?: CSSProperties;
    contentStyle?: CSSProperties;
    enable?: boolean;
    dataSource: TreeNode[];
    selectionMode?: SelectionMode;
    collapseAll?: boolean;
    collapseAllLevel?: number;

    filter?: boolean;

    // Bộ event
    onChange?: (value?: number[], items?: TreeNode[]) => void; // Sự kiện khi change item

    // Bộ control
    selectedValue?: number[];
}

interface iState {
    selectedValue?: number[];
    selectedItem?: TreeNode[];
    dataSource?: TreeNode[];
    collapseAll?: boolean;
    filterValue?: string;
}

const TreeContext = React.createContext({});

interface iTreeContext {
    selectedValue?: number[];
    selectedItem?: TreeNode[];
    setSelectValue?: (values?: number[], items?: TreeNode[]) => void;
}

export default class SMTreeView extends Component<iProp, iState> {
    constructor(props: iProp) {
        super(props);
        this.state = {
            filterValue: '',
            dataSource: this.props.dataSource,
            selectedValue: this.props.selectedValue,
            collapseAll: this.props.collapseAll,
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: iProp) {
        // Note: Sallowed compare, chỉ khác khi length của 2 array khác nhau
        if (nextProps.dataSource !== this.state.dataSource) {
            this.setState({ dataSource: nextProps.dataSource })
        }
        if (nextProps.selectedValue !== this.state.selectedValue) {
            this.setState({ selectedValue: nextProps.selectedValue })
        }
        if (nextProps.collapseAll !== this.state.collapseAll) {
            this.setState({ collapseAll: nextProps.collapseAll })
        }
    }

    setSelectValue = (values?: number[], items?: TreeNode[]) => {
        this.setState({ selectedValue: values, selectedItem: items }, () => {
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(this.state.selectedValue, this.state.selectedItem)
            }
        })
    }

    clearFilter() {
        this.setState({ filterValue: '' })
    }

    renderFilter() {
        if (!this.props.filter)
            return null

        return (
            <div
                className="w-100"
                style={{
                    marginTop: 3,
                    padding: '0 3px',
                }}
            >
                <input
                    className="sm-textbox w-100"
                    value={this.state.filterValue}
                    onChange={(e) => {
                        this.setState({ filterValue: e.currentTarget.value })
                    }}
                />
            </div>
        )
    }

    calcDataSource() {
        let data = [...this.state.dataSource || []]

        if (this.props.filter && this.state.filterValue && this.state.filterValue?.length > 0) {
            TreeRecursiveAction(data!, (node, parentNode) => {
                node.display = false
            })

            TreeRecursiveAction(data!, (node, parentNode) => {
                let nodeDisplay = node.TextFilter?.includes(FormatVNLanguage(this.state.filterValue!, true))

                if (!node.display) {
                    node.display = nodeDisplay
                }

                if (parentNode && !parentNode.display) {
                    parentNode.display = node.display
                }
            }, undefined)
            
        } else {
            TreeRecursiveAction(data!, (node, parentNode) => {
                node.display = true
            })
        }

        return data
    }

    render() {
        const contextProvider: iTreeContext = {
            selectedValue: this.state.selectedValue,
            setSelectValue: this.setSelectValue,
            selectedItem: this.state.selectedItem,
        }

        let data = this.calcDataSource()

        return (
            <div className="sm-tree" style={this.props.style}>
                {this.renderFilter()}
                <ul className="sm-tree-container" style={this.props.contentStyle}>
                    <TreeContext.Provider value={contextProvider}>
                        {
                            data?.filter(x => x.display)
                                ?.map((node, index) => {
                                    let selected = this.state.selectedValue?.includes(Number(node.ID)) || false
                                    let childSelected = this.state.dataSource
                                        ?.filter(x =>
                                            x.children?.filter(y => this.state.selectedValue?.includes(Number(y.ID)))?.length
                                            && x.ID === Number(node.ID)
                                        )
                                    return (
                                        <SMTreeNode
                                            key={index.toString()}
                                            data={node}
                                            selectionMode={this.props.selectionMode}
                                            collapseAll={this.state.collapseAll}
                                            level={1}
                                            collapseAllLevel={this.props.collapseAllLevel}
                                            selected={selected}
                                            childSelected={childSelected ? childSelected.length > 0 : false}
                                        />
                                    )
                                })
                        }
                    </TreeContext.Provider>
                </ul>
            </div>
        )
    }
}

interface iTreeNodeProp {
    // Bộ style mặc định của thẻ
    className?: string;
    style?: CSSProperties;
    contentStyle?: CSSProperties;
    enable?: boolean;
    selectionMode?: SelectionMode;
    data: TreeNode;
    toggled?: boolean;
    collapseAll?: boolean;
    level: number;
    collapseAllLevel?: number;
    selected?: any;
    childSelected?: any;
}

const SMTreeNode = React.memo((props: iTreeNodeProp) => {

    function calculateInitToggle(): boolean {
        if (props.collapseAllLevel && props.level > props.collapseAllLevel) {
            return false;
        }

        return props.collapseAll!
    }

    /// Khi click vào từng hàng trong Tree
    function onSelectNode(context: iTreeContext) {
        if (props.selectionMode === "single") {
            let selectedValue = [props.data?.ID!]
            // Truyền giá trị được select thông qua function setSelectValue trong Context
            context.setSelectValue!(selectedValue, [props.data])
        }

        if (props.selectionMode === "checkbox") {
            handlerCheckBoxEvent(context)
        }

        /// TODO: DEVELOPING
        if (props.selectionMode === "tri-state") {
            handlerTriStateEvent(context)
        }
    }

    function renderIconGroup(context: iTreeContext) {
        return (
            <>
                {/* Toggle Icon */}
                {renderTogglerIcon()}

                {/* Multiselect Icon */}
                {renderCheckBoxIcon(context)}

            </>
        )
    }

    function renderTogglerIcon() {
        const hasChild = props.data?.children?.length ?? 0 > 0

        if (!hasChild)
            return (
                <span className="sm-tree-toggler">
                </span>
            )

        let toggleIconOpen = "fas fa-caret-down"
        let toggleIconClose = "fas fa-caret-right"

        return (
            <span className="sm-tree-toggler"
                onClick={() => setToggle(!toggled)}
            >
                <i className={toggled ? toggleIconOpen : toggleIconClose}></i>
            </span>
        )
    }

    // TODO: DEVELOPING
    function handlerTriStateEvent(context: iTreeContext) {
        const { selectionMode, data } = props

        let id = data?.ID
        let selected = context.selectedValue?.includes(Number(id))

        if (id !== null && id !== undefined) {
            // Nếu đã được click chọn => Unselect all child
            if (selected) {
                let selectedValue = context.selectedValue
                    ?.filter(selectedValue => selectedValue !== id)

                if (data?.children) {
                    selectedValue = selectedValue?.filter(x =>
                        data?.children?.flatMap(y => y.ID)?.includes(x) == false ?? false
                    )
                }

                // Truyền giá trị được select thông qua function setSelectValue trong Context
                context.setSelectValue!(selectedValue)
            } else {
                // nếu chưa được chọn => Select all Child
                let allChild = data?.children?.flatMap(y => y.ID!) || []
                let contextValue = context.selectedValue || []
                let selectedValue = Array.from(new Set([...allChild!, id, ...contextValue]))

                // Truyền giá trị được select thông qua function setSelectValue trong Context
                context.setSelectValue!(selectedValue)
            }
        }
    }

    function handlerCheckBoxEvent(context: iTreeContext) {
        const { selectionMode, data } = props

        let id = data?.ID
        let selected = context.selectedValue?.includes(Number(id))

        if (id !== null && id !== undefined) {
            let selectedValue = selected
                ? context.selectedValue?.filter(selectedValue => selectedValue !== id)
                : context.selectedValue ? [...context.selectedValue, id] : [id]

            let selectedItem = selected
                ? context.selectedItem?.filter(selectedValue => selectedValue.ID !== id)
                : context.selectedItem ? [...context.selectedItem, data] : [data]
            // Truyền giá trị được select thông qua function setSelectValue trong Context
            context.setSelectValue!(selectedValue, selectedItem)
        }
    }

    function renderCheckBoxIcon(context: iTreeContext) {
        let unCheck = "far fa-square"
        let checked = "far fa-check-square"
        let childChecked = "far fa-minus-square"

        const { selectionMode, data } = props

        let id = data?.ID

        if (selectionMode === 'checkbox') {
            let selected = context.selectedValue?.includes(Number(id))

            return (
                <span className="sm-tree-checkbox"
                    onClick={() => {
                        handlerCheckBoxEvent(context)
                    }}
                >
                    <i className={selected ? checked : unCheck}></i>
                </span>
            )
        }

        // TODO: DEVELOPING
        if (selectionMode === 'tri-state') {
            let selected = context.selectedValue?.includes(Number(id))
            return (
                <span className="sm-tree-checkbox"
                    onClick={() => {
                        handlerTriStateEvent(context)
                    }}
                >
                    <i className={selected ? checked : unCheck}></i>
                </span>
            )
        }

        return null
    }

    function isNodeSelected(context: iTreeContext) {
        let id = props.data?.ID

        if (props.selectionMode === 'single') {
            if (context.selectedValue?.includes(Number(id))) {
                return ' sm-treenode-select'
            }
        }

        return ''
    }

    function isSelectable(selectable?: boolean) {
        if (!selectable) {
            return ' sm-treenode-unselectable'
        }

        return ''
    }

    const { data, selected, childSelected, level } = props
    const [toggled, setToggle] = useState(calculateInitToggle())

    return (
        <React.Fragment>
            <TreeContext.Consumer>
                {
                    (context: iTreeContext) => {
                        return (
                            <li className="sm-treenode">
                                {/* Node */}
                                <div className={"sm-treenode-content" + isNodeSelected(context) + isSelectable(data.Selectable)}>
                                    {/* Icon Group */}
                                    {renderIconGroup(context)}
                                    {/* Display Node Text */}
                                    <div className="sm-treenode-label"
                                        onClick={() => {
                                            if (data.Selectable) {
                                                onSelectNode(context)
                                            }
                                        }}
                                    >
                                        {data?.Text}
                                    </div>
                                </div>
                                {/* Child */}
                                {
                                    toggled && data?.children
                                        ?.filter(x => x.display)
                                        ?.map((node, index) => {
                                            let selected = context.selectedValue?.includes(Number(node.ID)) || false
                                            let childSelected = data?.children
                                                ?.filter(x =>
                                                    x.children?.filter(y => context.selectedValue?.includes(Number(y.ID)))?.length
                                                    && x.ID === Number(node.ID)
                                                )

                                            return (
                                                <ul className="sm-treenode-child" key={index.toString()}>
                                                    <SMTreeNode
                                                        key={index.toString()}
                                                        data={node}
                                                        selectionMode={props.selectionMode}
                                                        collapseAll={props.collapseAll}
                                                        level={props.level + 1}
                                                        collapseAllLevel={props.collapseAllLevel}
                                                        selected={selected}
                                                        childSelected={childSelected ? childSelected.length > 0 : false}
                                                    />
                                                </ul>
                                            )
                                        })
                                }
                            </li>
                        )
                    }
                }
            </TreeContext.Consumer>
        </React.Fragment>
    )
})

// Convert Flat Array dạng TreeNode sang Array dạng Tree
export function ConvertDataSource(ds: TreeNode[], parentID?: number) {
    let data: TreeNode[] = [];

    for (let i = 0; i < ds.length; i++) {
        if (ds[i].ParentID !== undefined && parentID !== undefined && ds[i].ParentID === parentID) {
            data.push({
                key: ds[i].ParentID + "-" + ds[i].ID,
                Text: ds[i].Text,
                TextFilter: ds[i].TextFilter,
                // icon: ds[i].Icon,
                children:
                    ConvertDataSource(ds, ds[i].ID).length > 0 ? ConvertDataSource(ds, ds[i].ID) : undefined,
                ID: ds[i].ID,
                ParentID: ds[i].ParentID,
                Selectable: ds[i].Selectable,
            });
        } else if (parentID === undefined && ds[i].ParentID === undefined) {
            data.push({
                key: ds[i].ID?.toString(),
                Text: ds[i].Text,
                TextFilter: ds[i].TextFilter,
                // icon: ds[i].Icon,
                children:
                    ConvertDataSource(ds, ds[i].ID).length > 0 ? ConvertDataSource(ds, ds[i].ID) : undefined,
                ID: ds[i].ID,
                Selectable: ds[i].Selectable,
            });
        }
    }
    return data;
}

// Convert Flat Array dạng cây từ Server sang Flat Array TreeNode
export function BindToTree<T, U extends keyof T, Y extends keyof T, V extends keyof T>
    (data: T[] | undefined, ParentID: U, ID: Y, Text: V): TreeNode[] {
    let lstTreeNode: TreeNode[] = [];
    if (data && data.length > 0) {
        data.forEach((x: any) => {
            let treeItem = new TreeNode();

            if (x[ParentID] == null || x[ParentID] == undefined) {
                treeItem.ID = Number(x[ID]);
                treeItem.Text = String(x[Text] ?? '');
                treeItem.TextFilter = FormatVNLanguage(treeItem.Text, true)
                treeItem.Selectable = (x['Selectable'] === undefined || x['Selectable'] === null) ? true : x['Selectable'];
            } else {
                treeItem.ID = Number(x[ID]);
                treeItem.ParentID = Number(x[ParentID]);
                treeItem.Text = String(x[Text] ?? '');
                treeItem.TextFilter = FormatVNLanguage(treeItem.Text, true)
                treeItem.Selectable = (x['Selectable'] === undefined || x['Selectable'] === null) ? true : x['Selectable'];
            }
            lstTreeNode.push(treeItem);
        });
        return lstTreeNode
    }

    return []
}

function TreeRecursiveAction(treeArr: TreeNode[], fn: (node: TreeNode, parentNode: TreeNode | undefined) => void, parentNode?: TreeNode) {
    for (let i = 0; i < treeArr.length; i++) {
        const node = treeArr[i];
        if (node.children && node.children.length > 0) {
            TreeRecursiveAction(node.children, fn, node)
        }
        fn(node, parentNode)
    }
}

function TreeRecursiveAction_Array(treeArr: TreeNode[], fn: (treeArr?: TreeNode[]) => TreeNode[]): TreeNode[] {
    for (let i = 0; i < treeArr.length; i++) {
        const node = treeArr[i];
        if (node.children && node.children.length > 0) {
            node.children = TreeRecursiveAction_Array(node.children, fn)
        }
    }
    return fn(treeArr)
}

function FormatVNLanguage(str: string, lowerCase = false): string {
    if (lowerCase) {
        str = str.toLowerCase();
    }
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");

    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Y|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // str = str.replace(/\W+/g, ' ');
    // str = str.replace(/\s/g, '-');
    return str;
}