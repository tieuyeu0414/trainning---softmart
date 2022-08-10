import React, { Component, CSSProperties } from "react";
import { MultiSelect } from "primereact/multiselect";

interface iProp {
    // Bộ style mặc định của thẻ
    className?: string;
    style?: CSSProperties;
    enable?: boolean;

    // Bộ prop dữ liệu
    dataSource?: any[];
    textField?: string;
    valueField?: string;
    selectedValues?: any[];
    filter?: boolean;
    selectedItemsLabel?: string;

    // Bộ event
    onChange?: (value: number[]) => void; // Sự kiện khi change item
}

export default class ComboCheckBox extends Component<iProp, any> {
    handleOnChange(e: number[]) {
        //alert(e);
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    render() {
        const arrItem = this.props.dataSource?.map((item, index) => {
            return { label: item[this.props.textField!], value: item[this.props.valueField!] };
        });
        return (
            <MultiSelect
                filter={this.props.filter}
                className={this.props.className}
                style={this.props.style}
                disabled={this.props.enable === false}
                options={arrItem}
                value={this.props.selectedValues}
                onChange={(e) => this.handleOnChange(e.value)}
                selectedItemsLabel={this.props.selectedItemsLabel}
            />
        );
    }
}
