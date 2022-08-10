import React, { CSSProperties, Component } from 'react'
import Utility from '../Utils/Utility';
import { TextBox } from './ComponentLib';

interface iProp {
    // Bộ style mặc định của thẻ
    className?: string;
    style?: CSSProperties;
    enable?: boolean;

    selectedDate?: Date;
    minDate?: Date;
    maxDate?: Date;

    // Bộ event
    onChange?: ((dateValue?: Date, numberValue?: { month?: number, year?: number }) => void) // Sự kiện khi change item
}

interface iState {
    strValue?: string;
    dateValue?: Date;
    display?: boolean;
    yearRange: number;
    month?: number;
    year?: number;
    posX?: number;
    posY?: number;
    minDate?: Date;
    maxDate?: Date;
}

const _maxYear = 2100
const _minYear = 1900

export default class MonthPicker extends Component<iProp, iState> {
    private container: React.RefObject<HTMLDivElement> = React.createRef();
    private _listContainer: React.RefObject<HTMLDivElement> = React.createRef();
    private _input: React.RefObject<HTMLInputElement> = React.createRef();
    private monthArr = Array.from({ length: 12 }, (_, i) => i + 1)
    private _isFocus = false;

    constructor(props: iProp) {
        super(props)
        this.state = {
            strValue: '',
            display: false,
            minDate: this.props.minDate,
            maxDate: this.props.maxDate,
            yearRange: new Date().getFullYear()
        }
        this.handlerClickOutside = this.handlerClickOutside.bind(this)
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handlerClickOutside)
    }

    componentWillMount() {
        document.removeEventListener('mousedown', this.handlerClickOutside)
    }

    handlerClickOutside(event: any) {
        if (this.state.display) {
            if (this.container && !this.container.current?.contains(event.target)) {
                this.setState({ display: false })
            }
        }
    }

    UNSAFE_componentWillReceiveProps(props: iProp) {
        if (
            props.selectedDate
            && props.selectedDate.getMonth() !== this.state.dateValue?.getMonth()
            && props.selectedDate.getFullYear() !== this.state.dateValue?.getFullYear()
        ) {
            let month = props.selectedDate.getMonth() + 1
            let year = props.selectedDate.getFullYear()
            let strValue = Utility.AddTrailingLeftZero(month, 2) + '/' + year

            this.setState({
                dateValue: props.selectedDate,
                month,
                year,
                strValue
            })
        }

        if (props.minDate !== this.state.minDate) {
            this.setState({ minDate: props.minDate })
        }

        if (props.maxDate !== this.state.maxDate) {
            this.setState({ maxDate: props.maxDate })
        }
    }

    handleOnChange() {
        if (this.props.onChange) {
            this.props.onChange(this.state.dateValue, { month: this.state.month, year: this.state.year });
        }
    }

    generateYearArray(currentYear: number = new Date().getFullYear()): number[] {
        let firstYear = currentYear - (currentYear % 10)
        let lastYear = firstYear + 9

        let minYear = this.state.minDate?.getFullYear()
        let maxYear = this.state.maxDate?.getFullYear() ?? _maxYear

        let yearArr: number[] = []
        for (let i = firstYear; i <= lastYear && i <= maxYear; i++) {
            if (minYear && i >= minYear) {
                yearArr.push(i)
            }
            if (!minYear) {
                yearArr.push(i)
            }
        }

        return yearArr
    }

    onChangeTextValue(value: string) {
        if (Utility.validateDateMonthPickerCharacter(value) || value === '') {
            // 1. Kiểm tra số ký tự đặc biệt / - .
            // Số ký tự cho phép là 1
            // TODO: Thay Regex chỉ cho phép nhập 1 ký tự đặc biệt
            let numberOfSlash = (value.match(/\//g) || []).length;
            let numberOfDot = (value.match(/\./g) || []).length;
            let numberOfDash = (value.match(/\-/g) || []).length;

            if (numberOfDash + numberOfDot + numberOfSlash > 1) {
                return;
            }

            let divideChar = numberOfSlash ? '/'
                : numberOfDot ? '.'
                    : numberOfDash ? '-' : undefined

            // 2. Chia text theo ký tự ngăn cách
            let monthPart = divideChar ? value.split(divideChar)[0] : value
            let yearPart = divideChar ? value.split(divideChar)[1] : undefined


            // 3. Kiểm tra nếu phần Month và Year là nhập đúng Format
            // Month: mm
            // Year: yy (1900 - 1999) | yyyy
            // Xử lý đặc biệt khi xóa trắng hoặc chỉ có số 0
            if ((monthPart === '' || monthPart === '0') && yearPart == undefined) {
                this.setState({
                    strValue: monthPart,
                    dateValue: undefined,
                    month: undefined,
                    year: undefined
                }, () => {
                    this.handleOnChange()
                })
                return;
            }

            let month = Number(monthPart)
            if (month > 13 || month === 0) {
                this.setState({ month: undefined, strValue: value, dateValue: undefined })
                return;
            }

            let year: number | undefined = undefined
            if (yearPart) {
                if (yearPart.length === 2) {
                    let minDateYear = this.state.minDate?.getFullYear()

                    year = minDateYear === undefined ? 1900 + Number(yearPart) : undefined
                }

                if (yearPart.length === 4) {
                    year = Number(yearPart)
                    let minYear = this.state.minDate?.getFullYear() ?? _minYear
                    let maxYear = this.state.maxDate?.getFullYear() ?? _maxYear

                    // Giới hạn đến năm 2100
                    if (year > maxYear) {
                        year = maxYear
                        value = monthPart + divideChar + maxYear
                    }

                    if (year < minYear) {
                        year = minYear
                        value = monthPart + divideChar + minYear
                    }
                }

                if (yearPart.length === 3) {
                    // Trả về giá trị undefined
                    this.setState({ dateValue: undefined, month, year: undefined }, () => {
                        this.handleOnChange()
                    })
                }

                if (yearPart.length > 4) {
                    // Số năm lớn hơn 4 ký tự không xử lý

                    return;
                }
            }

            if (year) {
                let minDateMonth = (this.state.minDate?.getMonth() ?? 0) + 1
                let minDateYear = this.state.minDate?.getFullYear()

                let maxDateMonth = (this.state.maxDate?.getMonth() ?? 0) + 1
                let maxDateYear = this.state.maxDate?.getFullYear()

                if (minDateYear === year) {
                    if (minDateMonth && month < minDateMonth) {
                        let strValue = '/' + year
                        this.setState({ dateValue: undefined, month: undefined, strValue, year }, () => {
                            this.handleOnChange()
                        })
                        return;
                    }
                }

                if (maxDateYear === year) {
                    if (maxDateMonth && month > maxDateMonth) {
                        let strValue = '/' + year
                        this.setState({ dateValue: undefined, month: undefined, strValue, year }, () => {
                            this.handleOnChange()
                        })
                        return;
                    }
                }

                ////////////////

                let dateValue = new Date()
                dateValue.setMonth(month + 1)
                dateValue.setFullYear(year)

                this.setState({ dateValue, year, yearRange: year }, () => {
                    this.handleOnChange()
                })
            }

            this.setState({ strValue: value, month })
        }
    }

    onSelectMonth(x: number) {
        this.setState({ month: x }, () => {
            this.checkValidMonth()
        })
    }

    onSelectYear(x: number) {
        this.setState({ year: x }, () => {
            this.checkValidMonth()
        })
    }

    checkValidMonth() {
        if (this.state.month && this.state.year) {
            let strValue = ''

            let minDateMonth = (this.state.minDate?.getMonth() ?? 0) + 1
            let minDateYear = this.state.minDate?.getFullYear()

            let maxDateMonth = (this.state.maxDate?.getMonth() ?? 0) + 1
            let maxDateYear = this.state.maxDate?.getFullYear()

            if (this.state.year === minDateYear
                && minDateMonth && this.state.month < minDateMonth) {

                strValue = '/' + this.state.year
                this.setState({ strValue, dateValue: undefined, month: undefined }, () => {
                    this.handleOnChange()
                })
                return;
            }

            if (this.state.year === maxDateYear
                && maxDateMonth && this.state.month > maxDateMonth) {
                strValue = '/' + this.state.year
                this.setState({ strValue, dateValue: undefined, month: undefined }, () => {
                    this.handleOnChange()
                })
                return;
            }

            ////////////

            strValue = Utility.AddTrailingLeftZero(this.state.month, 2) + '/' + this.state.year
            let dateValue = new Date()
            dateValue.setMonth(this.state.month + 1) // Tháng 1 bắt đầu từ 0
            dateValue.setFullYear(this.state.year)

            this.setState({ strValue, dateValue }, () => {
                this.handleOnChange()
            })

            return;
        }

        if (this.state.month) {
            let strValue = Utility.AddTrailingLeftZero(this.state.month, 2) + '/'
            this.setState({ strValue })

            return;
        }

        if (this.state.year) {
            let strValue = '/' + this.state.year
            this.setState({ strValue })

            return;
        }
    }

    decreaseYearRange() {
        let yearRange = this.state.yearRange - 10
        let firstYear = yearRange - (yearRange % 10) + 9

        let minYear = this.state.minDate?.getFullYear() ?? _minYear

        if (firstYear < minYear) {
            return;
        }

        this.setState({ yearRange: yearRange })
    }

    increaseYearRange() {
        let yearRange = this.state.yearRange + 10
        let firstYear = yearRange - (yearRange % 10)

        let maxYear = this.state.maxDate?.getFullYear() ?? _maxYear

        if (firstYear > maxYear) {
            return;
        }

        this.setState({ yearRange: yearRange })
    }

    _onClickComponent(e?: React.FocusEvent<HTMLElement>) {
        if (!this.state.display) {
            this.setState({ display: true }, () => {
                if (e) {
                    this.calculatePosition(e)
                }
            })
        }

        this._isFocus = true
        setTimeout(() => {
            this._isFocus = false
        }, 500)
    }

    _onBlurComponent() {
        setTimeout(() => {
            if (this.state.display && !this._isFocus) {
                this.setState({ display: false })
            }
        }, 300)
    }

    calculatePosition(event: React.FocusEvent<HTMLElement>) {
        const screenW = window.outerWidth;
        const screenH = window.outerHeight;

        const mouseX = this._input.current!.getBoundingClientRect().left
        const mouseY = this._input.current!.getBoundingClientRect().top

        const mnuW = this._listContainer.current!.clientWidth;
        const mnuH = this._listContainer.current!.clientHeight;

        const inputW = this._input.current!.clientWidth
        const inputH = this._input.current!.clientHeight

        let mnuX: number;
        let mnuY: number;

        // Hiển thị vị trí theo chiều ngang (X) tại vị trí có nhiều khoảng trống hơn
        if (screenW > 2 * mouseX) {
            mnuX = 0;
        }
        else {
            mnuX = inputW - mnuW;
        }

        // Hiển thị vị trí theo chiều dọc (Y) tại vị trí có nhiều khoảng trống hơn
        if (screenH > 2 * mouseY) {
            mnuY = 30 + 3; // 30: Height của input, 3: Padding
        }
        else {
            mnuY = - (mnuH + 3);
        }

        this.setState({
            posX: mnuX,
            posY: mnuY,
        });
    }

    generateMonthArr() {
        let minDateMonth = (this.state.minDate?.getMonth() ?? 0) + 1
        let minDateYear = this.state.minDate?.getFullYear()

        let maxDateMonth = (this.state.maxDate?.getMonth() ?? 0) + 1
        let maxDateYear = this.state.maxDate?.getFullYear()

        let year = this.state.year

        let monthArr = this.monthArr.map(x => {
            let month = new Month()
            month.value = x
            month.enable = true

            if (minDateYear && minDateYear === year) {
                if (minDateMonth && x >= minDateMonth) {
                    month.enable = true
                } else {
                    month.enable = false
                }

                return month
            }

            if (maxDateYear && maxDateYear === year) {
                if (maxDateMonth && x <= maxDateMonth) {
                    month.enable = true
                } else {
                    month.enable = false
                }

                return month
            }

            return month
        })

        return monthArr
    }

    render() {
        let yearArr = this.generateYearArray(this.state.yearRange)
        let monthArr = this.generateMonthArr()

        return (
            <div
                className="sm-monthpicker"
                ref={this.container}
                style={this.props.style}
            >
                <input
                    ref={this._input}
                    type="text"
                    className="sm-textbox"
                    onChange={(e) => {
                        this.onChangeTextValue(e.currentTarget.value)
                    }}
                    value={this.state.strValue}
                    onFocus={(e) => {
                        e.persist()
                        this._onClickComponent(e)
                    }}
                    onBlur={() => {
                        this._onBlurComponent()
                    }}
                />
                {
                    this.state.display && (
                        <div
                            ref={this._listContainer}
                            tabIndex={-1}
                            className="list-container"
                            onClick={() => {
                                this._onClickComponent()
                            }}
                            onBlur={() => {
                                this._onBlurComponent()
                            }}
                            style={{
                                top: this.state.posY,
                                right: this.state.posX,
                            }}
                        >
                            <div className="month-selector">
                                {
                                    monthArr.map((month, index) => {
                                        if (month.enable) {
                                            return (
                                                <div
                                                    key={month.value?.toString()}
                                                    className={"list-item " + (month.value === this.state.month ? 'selected' : '')}
                                                    onClick={() => {
                                                        this.onSelectMonth(month.value!)
                                                    }}
                                                >
                                                    {Utility.AddTrailingLeftZero(month.value!, 2)}
                                                </div>
                                            )
                                        }

                                        return (
                                            <div
                                                key={month.value?.toString()}
                                                className={"list-item disabled"}
                                            >
                                                {Utility.AddTrailingLeftZero(month.value!, 2)}
                                            </div>
                                        )

                                    })
                                }
                            </div>
                            <div className="year-selector">
                                <div
                                    className="arrow arrow-up"
                                    onClick={() => this.decreaseYearRange()}
                                    onKeyPress={() => {

                                    }}
                                />
                                {
                                    yearArr.map(x => {
                                        return (
                                            <div
                                                key={x.toString()}
                                                className={"list-item " + (x === this.state.year ? 'selected' : '')}
                                                onClick={() => {
                                                    this.onSelectYear(x)
                                                }}
                                            >
                                                {x}
                                            </div>
                                        )
                                    })
                                }
                                <div
                                    className="arrow arrow-down"
                                    onClick={() => this.increaseYearRange()}
                                />
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

class Month {
    value?: number;
    enable?: boolean;
}