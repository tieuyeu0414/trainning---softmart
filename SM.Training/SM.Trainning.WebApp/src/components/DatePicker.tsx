import React, { Component, CSSProperties } from "react";
import { Calendar } from "primereact/calendar";
import Utility from "../Utils/Utility";
import { SMDatePicker } from "./ComponentLib";

interface iProp {
    // Bộ style mặc định của thẻ
    style?: CSSProperties;
    enable?: boolean;

    selectedDate?: Date;
    minDate?: Date;
    maxDate?: Date;
    placeholder?: string;

    // TODO: Delete unused props
    showTime?: boolean;
    // format?: string;
    view?: string;
    className?: string;
    inputClassName?: string;
    // timeOnly?: boolean;

    // Bộ event
    onChange?: (value?: Date) => void; // Sự kiện khi change item
}

interface iState { }

export default class DatePicker extends Component<iProp, iState> {
    static defaultProps = {
        format: "dd/mm/yy",
        timeOnly: false,
    };

    handleOnChange(value?: Date) {
        if (this.props.onChange) {
            //let dte = Utility.RemoveTimeZone(value)!;
            this.props.onChange(value);
        }
    }

    render() {
        let dte: Date | undefined;
        if (this.props.selectedDate) {
            // Khi giá trị date tự động đc gán từ API thì nó là kiểu string, phải cast ngược về kiểu Date
            if (typeof this.props.selectedDate !== typeof Date) {
                dte = new Date(this.props.selectedDate);
            }
            else {
                dte = this.props.selectedDate!;
            }
        }

        return (
            <SMDatePicker
                maxDate={this.props.maxDate}
                minDate={this.props.minDate}
                enable={this.props.enable}
                style={this.props.style}
                onChange={(value) => this.handleOnChange(value)}
                selectedDate={dte}
                showTime={this.props.showTime}
            />
        )

        // return (
        //     <Calendar
        //         placeholder={this.props.placeholder}
        //         className={this.props.className}
        //         style={this.props.style}
        //         disabled={this.props.enable === false}
        //         inputClassName={this.props.inputClassName}
        //         value={dte}
        //         minDate={this.props.minDate}
        //         maxDate={this.props.maxDate}
        //         onChange={(e: any) => this.handleOnChange(e.value)}
        //         showButtonBar={true}
        //         monthNavigator={true}
        //         yearNavigator={true}
        //         yearRange="1900:2100"
        //         dateFormat={this.props.format}
        //         view={this.props.view}
        //         timeOnly={this.props.timeOnly}
        //         showTime={this.props.showTime}
        //     // showSeconds={true}

        //     />
        // );
    }
}
