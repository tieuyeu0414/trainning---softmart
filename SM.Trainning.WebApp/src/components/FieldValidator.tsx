import React, { Component, CSSProperties } from "react";

interface iProp {
    className?: string;
    style?: CSSProperties;
    //enable?: boolean;

    required?: boolean;
    requiredMessage?: string;

    regularExpression?: RegExp;
    regularMesssage?: string;

    value?: string | number | Date | null | any[];

    validationGroup?: string;
}

interface iState {
    //enabled: boolean;
    isValid: boolean;
    errorMessage: string;
}

export default class FieldValidator extends Component<iProp, iState> {
    private static lstValidator: Array<FieldValidator>;

    constructor(props: iProp) {
        super(props);

        this.state = {
            //enabled: false,
            isValid: true,
            errorMessage: "",
        };

        // Nếu danh sách chưa khởi tạo => Cấp mới
        if (FieldValidator.lstValidator === undefined || FieldValidator.lstValidator === null) {
            FieldValidator.lstValidator = [];
        }

        FieldValidator.lstValidator.push(this);
    }

    // Validate một nhóm field.
    public static HasError(groupToCheck: string = ""): boolean {
        let hasError: boolean = false;

        // Tìm các validator cùng group để kích hoạt tự validate
        if (this.lstValidator) {
            FieldValidator.lstValidator.forEach((item) => {
                let validationGroup = item.props.validationGroup ?? "";

                if (validationGroup === groupToCheck) {
                    // if (item.state.enabled === false) {
                    //     item.setState({ enabled: true });
                    // }

                    // Thực hiện kiểm tra lỗi của từng validator
                    const result = item.checkError(item.props.value);
                    item.setState({
                        isValid: result.isValid,
                        errorMessage: result.errorMessage,
                    });

                    // Nếu có 1 validator có lỗi thì cả page có lỗi
                    if (result.isValid === false) {
                        hasError = true;
                    }
                }
            });
        }
        return hasError;
    }

    componentWillUnmount() {
        FieldValidator.lstValidator = FieldValidator.lstValidator.filter((en) => en !== this);
    }

    componentWillReceiveProps(nextProp: iProp) {
        // Ko validate khi load page.
        // Điều này làm cho khi vào page sẽ ko tự validate, khi nào phải call hàm trigger Validate mới bắt đầu
        // if (this.state.enabled === true) {
        if (this.props.value !== nextProp.value) {
            const result = this.checkError(nextProp.value);

            if (this.state.isValid !== result.isValid || this.state.errorMessage !== result.errorMessage) {
                this.setState({
                    isValid: result.isValid,
                    errorMessage: result.errorMessage,
                });
            }
        }
        //}
    }

    checkError(val: any) {
        let _isValid: boolean = true;
        let _msg: string = "";

        // Validate Madatory field
        if (this.props.required === true) {
            if (val === undefined || val === null || val.toString().trim() === "" || val.length <= 0) {
                _isValid = false;
                _msg = this.props.requiredMessage!;
            }
        }

        // Validate by regular expression
        // Chỉ validate khi chưa có lỗi
        if (_isValid === true) {
            if (this.props.regularExpression) {
                _isValid = this.props.regularExpression.test(val);

                if (_isValid === false) {
                    _msg = this.props.regularMesssage!;
                }
            }
        }

        return {
            isValid: _isValid,
            errorMessage: _msg,
        };
    }

    render() {
        //console.log(this.state);
        return (
            <>
                {this.state.isValid === false && (
                    <span className={this.props.className} style={this.props.style}>
                        {this.state.errorMessage}
                    </span>
                )}
            </>
        );
    }
}
