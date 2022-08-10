import React, { Component, CSSProperties } from "react";
import { TextBox } from "./ComponentLib";

interface iProp {
  // Bộ style mặc định của thẻ
  className?: string;
  style?: CSSProperties;
  enable?: boolean;

  numberFractionDigits: number;
  value?: string;
  minValue?: number;
  maxValue?: number;
  isHiddenTooltip?: boolean;
  // Bộ event
  onChange?: (value?: string) => void; // Sự kiện khi change item trả ra giá trị number
}

interface iState {
  ValueDisplay: any; //giá trị để nhìn thấy có format
}
//const listMoneyFast = SMX.MoneyFast.dicName;
export default class SMNumberBox extends Component<iProp, iState> {
  constructor(props: iProp) {
    super(props);
    this.state = {
      ValueDisplay: "",
    };
  }
  handleFocus = (event: any) => {
    event.target.select();
  }
  handleOnBlur(value: any) {
    if (this.props.onChange) {
      if (value !== "" && value !== null && value !== undefined) {//trường hợp có giá trị thì thực hiện các cáe
        let parseValue = 0;
        let result = value.toLowerCase().split(",").join("");
        //kiểm tra hợp lệ là số hoặc là nhập số âm thì chữ đầu tiên là dấu -
        if (!isNaN(result)) {
          //nếu là nhập số bình thường
          parseValue = parseFloat(result);
          if (this.props.minValue !== null && this.props.minValue !== undefined) {//min
            if (parseValue < this.props.minValue) {
              parseValue = this.props.minValue;
              this.props.onChange(String(parseValue));//gán trả giá trị số
              this.setState({ ValueDisplay: this.numberWithCommas(String(parseValue)) });
              return;
            }
          }

          this.props.onChange(result); //gán trả giá trị số
          this.setState({ ValueDisplay: this.numberWithCommas(result) });
        } else {
          // Nếu giá trị value không phải là số (TH nhập dấu -)
          if (this.props.minValue !== null && this.props.minValue !== undefined) {
            // và nếu giá trị minValue cho phép nhập số âm
            if (this.props.minValue < 0) {
              this.props.onChange(result)
              this.setState({ ValueDisplay: result });
            } else {
              // Nếu không cho phép nhập số âm, trả về giá trị trống
              this.props.onChange("");
              this.setState({ ValueDisplay: "" });
            }
          } else {
            this.props.onChange(result)
            this.setState({ ValueDisplay: result });
          }
        }
      } else {
        //trường hợp xóa trắng
        this.props.onChange(""); //gán trả giá trị số
        this.setState({ ValueDisplay: "" });
      }
    }
  }
  handleOnChange(value: any) {
    if (this.props.onChange) {
      if (value !== "" && value !== null && value !== undefined) {//trường hợp có giá trị thì thực hiện các cáe

        let parseValue = 0;
        let result = value.toLowerCase().split(",").join("");
        //kiểm tra hợp lệ là số hoặc là nhập số âm thì chữ đầu tiên là dấu -
        if (!isNaN(result) || (result.indexOf("-") === 0 && result.length === 1)) {
          if (result.includes(".")) {
            // nếu là só thập phân
            let resultArray = result.split(".");
            //kiếm tra số thập phân đăng sau cho phép
            if (resultArray[1].length <= this.props.numberFractionDigits) {
              {
                //chỉ check min max khi giá trị lớn hơn 1 ký tự và # dấu -
                if ((result.length === 1 && result.indexOf("-") === 0) === false) {
                  parseValue = parseFloat(result);

                  if (this.props.maxValue !== null && this.props.maxValue !== undefined) {//max
                    if (parseValue > this.props.maxValue) {
                      return;
                    }
                  }
                }
                this.props.onChange(result); //gán trả giá trị số
                this.setState({ ValueDisplay: this.numberWithCommas(result) });
              }
            }
          } else {
            //nếu là nhập số bình thường
            parseValue = parseFloat(result);

            if (this.props.maxValue !== null && this.props.maxValue !== undefined) {//max
              if (parseValue > this.props.maxValue) {
                return;
              }
            }
            if (this.props.minValue !== null && this.props.minValue !== undefined) {
              if (parseValue < this.props.minValue) {
                return;
              }
            }
            if (!isNaN(parseValue)) {
              this.props.onChange(result); //gán trả giá trị số
              this.setState({ ValueDisplay: this.numberWithCommas(result) });
            } else {
              if (
                (this.props.minValue === null
                  || this.props.minValue === undefined
                  || this.props.minValue < 0)
                && (result.indexOf("-") === 0 && result.length === 1)
              ) {
                this.props.onChange(""); //gán trả giá trị trống
                this.setState({ ValueDisplay: this.numberWithCommas(result) });
              }
            }
          }
        }
      } else {
        //trường hợp xóa trắng
        this.props.onChange(""); //gán trả giá trị trống
        this.setState({ ValueDisplay: "" });
      }
    }
  }
  numberWithCommas(x?: string) {
    //hàm format  định dạng số
    if (x === "0") return "0";
    if (x) {
      let y = x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // xóa nhiều hơn 1 số 0 đầu
      return y.replace(/^0{1,}\d+/, "");
    } else {
      return "";
    }
  }
  componentDidMount() {
    // chạy lần đầu để có giá trị format
    if (this.props.value !== "" && this.props.value !== null && this.props.value !== undefined) {
      this.setState({ ValueDisplay: this.numberWithCommas(this.props.value) });
    } else {
      this.setState({ ValueDisplay: "" });
    }
  }

  componentWillReceiveProps(nextProps: iProp) {

    if (this.state.ValueDisplay !== this.numberWithCommas(nextProps.value!)) {
      //thay đổi để gán lại giá trị format
      this.setState({ ValueDisplay: this.numberWithCommas(nextProps.value!) });
    }
  }

  render() {
    return (
      <>
        <span className="sm-status-running " style={{ width: '100%' }}>
          <TextBox
            className={this.props.className}
            style={this.props.style}
            disabled={this.props.enable === false}
            maxLength={20}
            value={this.state.ValueDisplay}
            onChange={(e: any) => {
              this.handleOnChange(e.target.value);
            }}
            onBlur={(e: any) => { this.handleOnBlur(e.target.value) }}
            onFocus={(e: any) => this.handleFocus(e)}

          />
          {(((this.props.minValue !== null && this.props.minValue !== undefined)
            || (this.props.maxValue !== null && this.props.maxValue !== undefined))
            && this.props.isHiddenTooltip !== true) ?
            (<span className="status-tooltip" style={{ left: 'calc(100% + 3px)', top: '3px' }}>
              {(this.props.minValue !== null && this.props.minValue !== undefined) ? ('Min:[' + this.props.minValue + ']') : ''}
              {(this.props.maxValue !== null && this.props.maxValue !== undefined) ? (' Max:[' + this.props.maxValue + ']') : ''}
            </span>)
            : null}
        </span>
      </>
    );
  }
}
