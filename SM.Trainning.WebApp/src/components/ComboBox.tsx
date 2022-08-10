import React, { Component, CSSProperties, ChangeEvent } from "react";
import SMMultiSelect, { ListItem } from "./SMMultiSelect";

interface iProp {
    // Bộ style mặc định của thẻ
    className?: string;
    name?: string;
    style?: CSSProperties;
    enable?: boolean;
    filter?: boolean;

    // Bộ prop dữ liệu
    dataSource?: any[];
    textField: string;
    valueField: string;
    selectedValue?: string;

    // Add Blank item
    addBlankItem?: boolean;
    blankItemText?: string;

    // Group
    dataOrderBy?: number;
    groupOrderBy?: number;
    groupBy?: string;

    // Bộ event
    onChange?: (value: string) => void; // Sự kiện khi change item
}

interface iState {
    selectedValue?: string;
    dataSource?: ListItem[];
    filter?: boolean;
}

const _maxLength = 12;

export default class ComboBox extends Component<iProp, iState> {
    constructor(props: iProp) {
        super(props)
        let dataSource = this.prepMultiSelectData(this.props.dataSource)
        this.state = {
            selectedValue: this.props.selectedValue,
            dataSource: dataSource,
            filter: this.props.filter ?? (dataSource && dataSource.length > _maxLength),
        }
    }

    static defaultProps = {
        dataOrderBy: 1,
        groupOrderBy: 1,
        // filter: false,
    };

    // static getDerivedStateFromProps(props: iProp, state: iState) {
    //     // Any time the current user changes,
    //     // Reset any parts of state that are tied to that user.
    //     // In this simple example, that's just the email.
    //     if (props.selectedValue && props.selectedValue != 'undefined'
    //         && props.selectedValue?.toString() !== state.selectedValue?.toString()) {
    //         return {
    //             selectedValue: props.selectedValue,
    //         };
    //     }
    //     return null;
    // }

    UNSAFE_componentWillReceiveProps(nextProps: iProp) {
        if (nextProps.dataSource !== this.state.dataSource) {
            let data = this.prepMultiSelectData(nextProps.dataSource)
            this.setState({ dataSource: data, filter: nextProps.filter ?? (data && data.length > _maxLength) })
        }

        if (this.state.filter) {
            if (nextProps.selectedValue !== this.state.selectedValue) {
                if (this.containInList(nextProps.selectedValue)) {
                    this.setState({ selectedValue: nextProps.selectedValue })
                } else {
                    this.setState({ selectedValue: '' })
                }
            }
        } else {
            if (nextProps.selectedValue !== this.state.selectedValue) {
                this.setState({ selectedValue: nextProps.selectedValue })
            }
        }
    }

    containInList(value?: string) {
        return this.state.dataSource?.find(x => x.id?.toString() === value)
    }

    handleOnChange(event: ChangeEvent<HTMLSelectElement>) {
        if (this.props.onChange) {
            this.props.onChange(event.target.value);
        }
    }

    renderBlankItem() {
        if (this.props.addBlankItem === true) {
            return <option value="">{this.props.blankItemText}</option>;
        }
    }

    prepData() {
        let { dataSource, groupBy } = this.props

        let dataGrp: any = {}

        dataSource?.forEach(x => {
            if (groupBy) {
                let grpValue = x[groupBy]

                if (dataGrp[grpValue] == undefined) {
                    dataGrp[grpValue] = [x]
                } else {
                    dataGrp[grpValue].push(x)
                }
            }
        })

        return dataGrp;
    }

    renderGroupItems() {
        let { groupBy, dataOrderBy, groupOrderBy, textField } = this.props
        let data = this.prepData()

        let renderGrpItem: any[] = []
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const grpItems: any[] = data[key];

                let renderGrpItems = grpItems
                    ?.sort((item1: any, item2: any) => {
                        if (groupOrderBy && groupOrderBy > 0 && textField) {
                            if (item1[textField] < item2[textField]) {
                                return -1;
                            }
                            if (item1[textField] > item2[textField]) {
                                return 1;
                            }
                        } else if (groupOrderBy && groupOrderBy < 0 && textField) {
                            if (item1[textField] < item2[textField]) {
                                return 1;
                            }
                            if (item1[textField] > item2[textField]) {
                                return -1;
                            }
                        }
                        return 0
                    })

                renderGrpItems = renderGrpItems?.map((item, index) => {
                    return (
                        <option value={item[this.props.valueField!]} key={item[this.props.textField!] + index.toString()}>
                            {item[this.props.textField!]}
                        </option>
                    )
                })

                if (renderGrpItems.length > 0) {
                    let label = key

                    renderGrpItem.push(
                        <optgroup label={label} key={label}>
                            {renderGrpItems}
                        </optgroup>
                    )
                }
            }
        }

        renderGrpItem = renderGrpItem?.sort((item1: any, item2: any) => {
            let label1 = item1?.props?.label
            let label2 = item2?.props?.label

            if (dataOrderBy && dataOrderBy > 0) {
                if (label1 < label2)
                    return -1;
                if (label1 > label2)
                    return 1;
            } else if (dataOrderBy && dataOrderBy < 0 && groupBy) {
                if (label1 < label2)
                    return 1;
                if (label1 > label2)
                    return -1;
            }
            return 0
        })


        return renderGrpItem;
    }

    renderListItem() {
        return this.props.dataSource?.map((item: any, index: number) => {
            return (
                <option value={item[this.props.valueField!]} key={item[this.props.textField!] + index.toString()}>
                    {item[this.props.textField!]}
                </option>
            );
        })
    }

    renderItem() {
        if (this.props.groupBy) {
            return this.renderGroupItems()
        } else {
            return this.renderListItem()
        }
    }

    prepMultiSelectData(dataSource: any) {
        let { textField, valueField } = this.props

        let lstData: ListItem[] = dataSource?.map((x: any) => {
            let item: ListItem = new ListItem()

            item.id = x[valueField]?.toString()
            item.label = x[textField]

            return item
        }) || []

        return lstData;
    }

    TEMP_renderMultiSelect() {
        let { dataSource } = this.state

        return (
            <SMMultiSelect
                dataSource={dataSource}
                textField="label"
                valueField="id"
                style={this.props.style}
                addBlankItem={this.props.addBlankItem}
                blankItemText={this.props.blankItemText ?? "-------------------- CHỌN --------------------"}
                filter={true}
                onChange={(value, item) => {
                    if (this.props.onChange) {
                        this.props.onChange(value?.toString() || '');
                    }
                    this.setState({ selectedValue: value?.toString() || '' })
                }}
                selectAll={true}
                mode="single"
                selectedValue={this.state.selectedValue}
            />
        )
    }

    render() {
        if (this.state.filter) {
            return this.TEMP_renderMultiSelect()
        }

        return (
            <select
                name={this.props.name}
                className={this.props.className}
                style={this.props.style}
                value={this.props.selectedValue}
                onChange={(event) => this.handleOnChange(event)}
                disabled={this.props.enable === false}
            >
                {this.renderBlankItem()}
                {this.renderItem()}
            </select>
        );
    }
}