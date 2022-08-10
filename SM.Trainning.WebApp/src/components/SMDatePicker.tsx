import React, { Component, CSSProperties } from 'react'
import { Icons } from '../themes';
import Utility from '../Utils/Utility';
import TimePicker from './TimePicker';

interface iProp {
    // Bộ style mặc định của thẻ
    className?: string;
    inputClassName?: string;

    style?: CSSProperties;
    enable?: boolean;
    timeOnly?: boolean;
    selectedDate?: Date;
    minDate?: Date;
    maxDate?: Date;
    placeholder?: string;
    showTime?: boolean;
    required?: boolean;

    format?: string;
    view?: string;

    // Bộ event
    onChange?: (value?: Date) => void; // Sự kiện khi change item
}

interface iState {
    strValue?: string;
    dateValue?: Date;
    display?: boolean;
    yearRange: number;
    month?: number;
    year?: number;
    dateArr?: DateItem[];
    posX?: number;
    posY?: number;
    minDate?: Date;
    maxDate?: Date;
    timePickerValue?: Date;
}

class DateItem {
    date: Date;
    today?: boolean;
    selected?: boolean;
    prevMonth?: boolean;
    nextMonth?: boolean;
    disabled?: boolean;

    constructor(date: Date, today: boolean = false, selected: boolean = false) {
        this.date = date;
        this.today = today;
        this.selected = selected;
        this.disabled = false;
    }
}

const MAX_YEAR = 9999;
const MIN_YEAR = 1900;

export default class SMDatePicker extends Component<iProp, iState> {
    private _container: React.RefObject<HTMLDivElement> = React.createRef();
    private _listContainer: React.RefObject<HTMLDivElement> = React.createRef();
    private _input: React.RefObject<HTMLInputElement> = React.createRef();
    private monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    private _isFocus = false;
    private displayStack = ['calendar']
    private _inputYear3Char = false;

    static defaultProps: iProp = {
        enable: true,
        style: {},
    }

    constructor(props: iProp) {
        super(props)
        this.state = {
            strValue: '',
            // dateValue: this.props.selectedDate,
            display: false,
            dateArr: [],
            yearRange: new Date().getFullYear(),
        }
        this.handlerClickOutside = this.handlerClickOutside.bind(this)
    }

    componentDidMount() {
        this.renderCalendar()
        this.onSelectDate(this.props.selectedDate)
        this.setState({ timePickerValue: this.props.selectedDate ?? new Date() })
        document.addEventListener('mousedown', this.handlerClickOutside)
    }

    componentWillMount() {
        document.removeEventListener('mousedown', this.handlerClickOutside)
    }

    handlerClickOutside(event: any) {
        if (this.state.display) {
            if (this._container && !this._container.current?.contains(event.target)) {
                this.setState({ display: false })
            }
        }
    }

    componentDidUpdate(prevProps: iProp, prevState: iState, snapshot: any) {
        if (
            prevState.dateValue !== this.state.dateValue
            || prevState.month !== this.state.month
            || prevState.year !== this.state.year
            || prevState.minDate !== this.state.minDate
            || prevState.maxDate !== this.state.maxDate
        ) {
            this.renderCalendar()
        }

        if (prevState.dateValue !== this.state.dateValue || prevState.timePickerValue !== this.state.timePickerValue) {
            // Bắn event cho parent
            if (typeof this.props.onChange === 'function') {
                let date = this.state.dateValue

                // let hour = new Date().getHours()
                // let min = new Date().getMinutes()
                // let sec = new Date().getSeconds()

                // if (date) {
                //     date.setHours(hour)
                //     date.setMinutes(min)
                //     date.setSeconds(sec)
                // }
                
                if (this.props.showTime && date) {
                    let hour = this.state.timePickerValue!.getHours()
                    let min = this.state.timePickerValue!.getMinutes()

                    date.setHours(hour)
                    date.setMinutes(min)
                }

                this.props.onChange(date)
            }
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: iProp) {
        if (nextProps.selectedDate != undefined
            &&
            (
                nextProps.selectedDate.getDate() !== this.state.dateValue?.getDate()
                || nextProps.selectedDate.getMonth() !== this.state.dateValue?.getMonth()
                || nextProps.selectedDate.getFullYear() !== this.state.dateValue?.getFullYear()
            )
        ) {
            this.onSelectDate(nextProps.selectedDate)
        }

        if (nextProps.selectedDate == undefined) {
            // Nếu như selectedDate = undefiend do đang nhập Year đến ký tự thứ 3 thì không update 
            if (this._inputYear3Char === false) {
                this.onSelectDate(nextProps.selectedDate)
            }
        }

        if (nextProps.minDate !== this.state.minDate) {
            this.setState({ minDate: nextProps.minDate })
        }

        if (nextProps.maxDate !== this.state.maxDate) {
            this.setState({ maxDate: nextProps.maxDate })
        }
    }

    onSelectDate(date?: Date) {
        let strValue = ''
        if (date) {
            strValue = Utility.AddTrailingLeftZero(date.getDate(), 2) + '/' + Utility.AddTrailingLeftZero(date.getMonth() + 1, 2) + '/' + date.getFullYear()
            if (this.isLessThanMinDate(date) || this.isMoreThanMaxDate(date)) {
                date = undefined
                strValue = ''
            }
        }

        this.setState({ dateValue: date, strValue: strValue, month: undefined, year: undefined })
    }

    isLessThanMinDate(date?: Date) {
        if (!date) {
            return false
        }

        if (this.state.minDate) {
            if (this.state.minDate.getFullYear() > date.getFullYear()) {
                return true
            } else if (this.state.minDate.getFullYear() < date.getFullYear()) {
                return false
            }

            if (this.state.minDate.getMonth() > date.getMonth()) {
                return true
            } else if (this.state.minDate.getMonth() < date.getMonth()) {
                return false
            }

            if (this.state.minDate.getDate() > date.getDate()) {
                return true;
            }
        }

        return false
    }

    isMoreThanMaxDate(date?: Date) {
        if (!date) {
            return false;
        }

        if (this.state.maxDate) {
            if (this.state.maxDate.getFullYear() < date.getFullYear()) {
                return true
            } else if (this.state.maxDate.getFullYear() > date.getFullYear()) {
                return false
            }

            if (this.state.maxDate.getMonth() < date.getMonth()) {
                return true
            } else if (this.state.maxDate.getMonth() > date.getMonth()) {
                return false
            }

            if (this.state.maxDate.getDate() < date.getDate()) {
                return true;
            }
        }

        return false
    }

    renderCalendar() {
        // Default: Chưa có dateValue => Month, Year từ today
        // Có dateValue => Month, Year từ dateValue
        // Chọn Month, Year => Month, Year từ chọn Month, Year

        let today = new Date()
        let selectedDate = this.state.dateValue ?? today

        let month = this.state.month ?? selectedDate.getMonth() + 1
        let year = this.state.year ?? selectedDate.getFullYear()

        let dayInMonth = this.daysInMonth(month, year)

        let dateArr: DateItem[] = []

        // Tính số ngày tháng trước
        let firstDayInMonth = new Date(year, month - 1, 1)
        let firstDayWeek = firstDayInMonth.getDay()

        for (let i = firstDayWeek - 1; i >= 0; i--) {
            let day = new Date(year, month - 1, -i)
            let dateItem = new DateItem(day)
            dateItem.prevMonth = true
            dateItem.disabled = this.isLessThanMinDate(day) || this.isMoreThanMaxDate(day)
            dateArr.push(dateItem)
        }

        // Tính số ngày trong tháng
        for (let i = 1; i <= dayInMonth; i++) {
            let day = new Date(year, month - 1, i)
            let dateItem = new DateItem(day)
            dateItem.disabled = this.isLessThanMinDate(day) || this.isMoreThanMaxDate(day)

            if (this.state.dateValue
                && day.getDate() === selectedDate.getDate()
                && day.getMonth() === selectedDate.getMonth()
                && day.getFullYear() === selectedDate.getFullYear()
            ) {
                dateItem.selected = true
            }

            if (day.getDate() === today.getDate()
                && day.getMonth() === today.getMonth()
                && day.getFullYear() === today.getFullYear()) {
                dateItem.today = true
            }

            dateArr.push(dateItem)
        }

        // Tính số ngày tháng sau
        let lastDayInMonth = new Date(year, month - 1, dayInMonth)
        let lastDayWeek = lastDayInMonth.getDay()

        for (let i = 1; i <= 6 - lastDayWeek; i++) {
            let day = new Date(year, month, i)
            let dateItem = new DateItem(day)
            dateItem.nextMonth = true
            dateItem.disabled = this.isLessThanMinDate(day) || this.isMoreThanMaxDate(day)
            dateArr.push(dateItem)
        }

        this.setState({ dateArr })
    }

    showCalendar() {
        let tbl: any = []
        let row: any = []
        let cell: any = []

        this.state.dateArr?.forEach((dateItem, i) => {
            let className = ""
            if (dateItem.today) {
                className = "today"
            }

            if (dateItem.selected) {
                className = "highlight"
            }

            if (dateItem.nextMonth || dateItem.prevMonth) {
                className = "other-month"
            }

            if (dateItem.disabled) {
                className = 'day-disabled'
            }

            cell.push(
                <td
                    className={className}
                    key={i.toString()}
                >
                    <span
                        onClick={() => {
                            if (!dateItem.disabled) {
                                this.onSelectDate(dateItem.date)
                            }
                        }}
                    >
                        {dateItem.date.getDate()}
                    </span>
                </td>
            )

            if (i % 7 === 6) {
                row.push(
                    <tr key={`row` + i.toString()}>
                        {cell}
                    </tr>
                )
                cell = []
            }
        })

        tbl.push(row)

        return tbl
    }

    daysInMonth(iMonth: number, iYear: number) {
        return new Date(iYear, iMonth, 0).getDate();
    }

    onClickNextMonth(month: number, year: number) {
        if (month < 12) {
            this.setState({ month: month + 1 })
        } else {
            this.setState({ month: 1, year: year + 1 })
        }
    }

    onClickPrevMonth(month: number, year: number) {
        if (month > 1) {
            this.setState({ month: month - 1 })
        } else {
            this.setState({ month: 12, year: year - 1 })
        }
    }

    onClickNextYear(year: number) {
        this.setState({ year: year + 1 })
    }

    onClickPrevYear(year: number) {
        this.setState({ year: year - 1 })
    }

    generateYearDecadeRange() {
        let year = this.state.year ?? (this.state.dateValue?.getFullYear() ?? new Date().getFullYear())
        let firstYearOfDecade = year - year % 10
        let lastYearOfDecade = firstYearOfDecade + 9

        let yearArr: number[] = []

        for (let i = firstYearOfDecade - 1; i <= lastYearOfDecade + 1; i++) {
            yearArr.push(i)
        }

        return yearArr
    }

    renderPanel() {
        let panel = this.displayStack[this.displayStack.length - 1]

        if (panel === 'calendar') {
            return this.renderCalendarPanel()
        }

        if (panel === 'month') {
            return this.renderMonthPanel()
        }

        if (panel === 'year') {
            return this.renderYearPanel()
        }
    }

    renderCalendarPanel() {
        // Date Select
        let today = new Date()
        let selectedDate = this.state.dateValue ?? today

        let month = this.state.month ?? selectedDate.getMonth() + 1
        let year = this.state.year ?? selectedDate.getFullYear()

        return (
            <>
                <div className="panel-header">
                    <button
                        className="prev-year-btn"
                        onClick={() => this.onClickPrevYear(year)}
                    >
                        <span className={Icons.doubleLeft} />
                    </button>
                    <button
                        className="prev-month-btn"
                        onClick={() => this.onClickPrevMonth(month, year)}
                    >
                        <span className={Icons.angleLeft}></span>
                    </button>
                    <div className="title">
                        <span
                            className="month-select"
                            onClick={() => {
                                this.displayStack.push('month')
                                this.setState({})
                            }}
                        >
                            {this.monthArr[month - 1]}
                        </span>
                        <span
                            className="year-select"
                            onClick={() => {
                                this.displayStack.push('year')
                                this.setState({})
                            }}
                        >
                            {year}
                        </span>
                    </div>
                    <button
                        className="next-btn"
                        onClick={() => this.onClickNextMonth(month, year)}
                    >
                        <span className={Icons.angleRight}></span>
                    </button>
                    <button
                        className="next-year-btn"
                        onClick={() => this.onClickNextYear(year)}
                    >
                        <span className={Icons.doubleRight} />
                    </button>
                </div>
                <table className="">
                    <thead>
                        <tr>
                            <th><span>Su</span></th>
                            <th><span>Mo</span></th>
                            <th><span>Tu</span></th>
                            <th><span>We</span></th>
                            <th><span>Th</span></th>
                            <th><span>Fr</span></th>
                            <th><span>Sa</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showCalendar()}
                    </tbody>
                </table>
            </>
        )
    }

    renderMonthPanel() {
        // Date Select
        let today = new Date()
        let selectedDate = this.state.dateValue ?? today

        let year = this.state.year ?? selectedDate.getFullYear()

        // Month Select
        let monthArr = Utility.chunkArray(this.monthArr, 3)

        return (
            <>
                <div className="panel-header">
                    <button
                        className="prev-year-btn"
                        onClick={() => this.onClickPrevYear(year)}
                    >
                        <span className={Icons.doubleLeft} />
                    </button>
                    <div className="title">
                        <span
                            className="year-select"
                            onClick={() => {
                                this.displayStack.push('year')
                                this.setState({})
                            }}
                        >
                            {year}
                        </span>
                    </div>
                    <button
                        className="next-year-btn"
                        onClick={() => this.onClickNextYear(year)}
                    >
                        <span className={Icons.doubleRight} />
                    </button>
                </div>
                <table className="">
                    <tbody>
                        {
                            monthArr.map((row, i) => {
                                return (
                                    <tr key={i.toString()}>
                                        {
                                            row?.map((_month: any, j: number) => {
                                                return (
                                                    <td
                                                        className="month-panel-cell"
                                                        key={j.toString()}
                                                    >
                                                        <span
                                                            onClick={() => {
                                                                this.displayStack.pop()
                                                                this.setState({ month: i * 3 + (j + 1) })
                                                            }}
                                                        >
                                                            {_month}
                                                        </span>
                                                    </td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </>
        )
    }

    renderYearPanel() {
        // Date Select
        let today = new Date()
        let selectedDate = this.state.dateValue ?? today

        let year = this.state.year ?? selectedDate.getFullYear()

        let decadeRange = this.generateYearDecadeRange()
        let decadeTextRange = decadeRange[1] + '-' + decadeRange[10]
        let yearArr = Utility.chunkArray(decadeRange, 3)

        return (
            <>
                <div className="panel-header">
                    <button
                        className="prev-decade-btn"
                        onClick={() => {
                            this.setState({ year: year - 10 })
                        }}
                    >
                        <span className={Icons.doubleLeft} />
                    </button>
                    <div className="title">
                        <span
                            className="decade-select"
                        >
                            {decadeTextRange}
                        </span>
                    </div>
                    <button
                        className="next-decade-btn"
                        onClick={() =>
                            this.setState({ year: year + 10 })
                        }
                    >
                        <span className={Icons.doubleRight} />
                    </button>
                </div>
                <table className="">
                    <tbody>
                        {
                            yearArr.map((row, i) => {
                                return (
                                    <tr key={i.toString()}>
                                        {
                                            row?.map((_year: any, j: any) => {
                                                let otherDecade = decadeRange[0] === Number(_year) || decadeRange[11] === Number(_year)

                                                return (
                                                    <td
                                                        className={"year-panel-cell " + (otherDecade ? 'other-decade' : '')}
                                                        key={j.toString()}
                                                    >
                                                        <span
                                                            onClick={() => {
                                                                this.displayStack.pop()
                                                                this.setState({ year: _year })
                                                            }}
                                                        >
                                                            {_year}
                                                        </span>
                                                    </td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </>
        )
    }

    onChangeTextValue(_value: string) {
        let value = _value

        if (this.props.showTime) {
            // return;
            value = _value.split(' ')[0]
        }

        if (Utility.validateDateMonthPickerCharacter(value) || value === '') {
            // 1. Kiểm tra số ký tự đặc biệt / - .
            // Số ký tự cho phép là 1
            // TODO: Thay Regex chỉ cho phép nhập 1 ký tự đặc biệt
            let numberOfSlash = (value.match(/\//g) || []).length;
            let numberOfDot = (value.match(/\./g) || []).length;
            let numberOfDash = (value.match(/\-/g) || []).length;

            if (numberOfDash + numberOfDot + numberOfSlash > 2) {
                return;
            }

            let divideChar = numberOfSlash ? '/'
                : numberOfDot ? '.'
                    : numberOfDash ? '-' : undefined

            // 2. Chia text theo ký tự ngăn cách
            let datePart = divideChar ? value.split(divideChar)[0] : value
            let monthPart = divideChar ? value.split(divideChar)[1] : undefined
            let yearPart = divideChar ? value.split(divideChar)[2] : undefined

            // 3. Kiểm tra nếu phần Month và Year là nhập đúng Format
            // Date: d | dd
            // Month: m | mm
            // Year: yy (MIN_YEAR - 1999) | yyyy

            let date = Number(datePart)
            if (date > 31) {
                return;
            }

            let month: number | undefined = undefined
            if (monthPart) {
                month = Number(monthPart)
                if (month > 13) {
                    return;
                }
            }

            let year: number | undefined = undefined
            if (yearPart) {
                if (yearPart.length === 2) {
                    year = MIN_YEAR + Number(yearPart)
                }

                if (yearPart.length === 4) {
                    year = Number(yearPart)
                    // Giới hạn đến năm MAX_YEAR
                    if (year > MAX_YEAR) {
                        year = MAX_YEAR
                        value = datePart + divideChar + monthPart! + divideChar! + MAX_YEAR
                    }

                    if (year < MIN_YEAR) {
                        year = MIN_YEAR
                        value = datePart + divideChar + monthPart! + divideChar! + MIN_YEAR
                    }
                }

                if (yearPart.length === 3) {
                    this._inputYear3Char = true
                    // Trả về giá trị undefined
                    // this.setState({ dateValue: undefined }, () => {
                    //     // this.handleOnChange()
                    // })
                }

                if (yearPart.length > 4) {
                    // Số năm lớn hơn 4 ký tự không xử lý

                    return;
                }
            }

            if (year) {
                let dateValue: undefined | Date = new Date(year, month! - 1, date)

                // Nếu ngày được sinh ra bởi bộ date/month/year lệch so với các số đó
                // VD: 31/02/2021 => 02/03/2021 
                // Trả về giá trị date undefined
                if (
                    dateValue.getDate() !== date
                    || dateValue.getMonth() !== month! - 1
                    || dateValue.getFullYear() !== year
                ) {
                    dateValue = undefined
                }

                if (dateValue) {
                    if (this.state.minDate && this.isLessThanMinDate(dateValue)) {
                        dateValue = undefined
                        // dateValue = this.state.minDate
                        // value = this.state.minDate.getDate()
                        //     + '/' + (this.state.minDate.getMonth() + 1)
                        //     + '/' + this.state.minDate.getFullYear()
                    }

                    if (this.state.maxDate && this.isMoreThanMaxDate(dateValue)) {
                        dateValue = undefined
                        // dateValue = this.state.maxDate
                        // value = this.state.maxDate.getDate()
                        //     + '/' + (this.state.maxDate.getMonth() + 1)
                        //     + '/' + this.state.maxDate.getFullYear()
                    }
                }

                this.setState({ dateValue })
            } else {
                // Nếu chưa có phần năm thì luôn trả về undefiend cho dateValue
                this.setState({ dateValue: undefined })
            }

            this.setState({ strValue: value })
        }
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

    _onBlurComponent(event: any) {
        // event.persist()

        // if (this._container && !this._container.current?.contains(event.target)) {
        //     this.setState({ display: false })
        // }

        // setTimeout(() => {
        //     if (this.state.display && !this._isFocus) {
        //         this.setState({ display: false })
        //     }
        // }, 300)
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
        if (screenH > mouseY + mnuH) {
            mnuY = 26;
        }
        else {
            mnuY = - (mnuH + 8);
        }

        this.setState({
            posX: mnuX,
            posY: mnuY,
        });
    }

    renderTimePicker() {
        if (!this.props.showTime) return null;

        let panel = this.displayStack[this.displayStack.length - 1]
        if (panel !== 'calendar') return null;

        return (
            <div className='panel-time'
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px 7px'
                }}
            >
                <TimePicker
                    onChange={(value, time) => {
                        this.setState({ timePickerValue: value })
                    }}
                    // showSecond={true}
                    // minInterval={15}
                    selectedTime={this.state.timePickerValue}
                />
            </div>
        )
    }

    calcDisplayValue() {
        if (!this.props.showTime) {
            return this.state.strValue
        }

        if (this.state.dateValue) {
            let datePart = this.state.strValue
            let timePart = this.state.dateValue.getHours() + ':' + Utility.AddTrailingLeftZero(this.state.dateValue.getMinutes(), 2)

            return datePart + ' ' + timePart
        }

        return this.state.strValue
    }

    render() {
        return (
            <div
                className="sm-datepicker"
                ref={this._container}
            >
                <input
                    type="text"
                    className={"sm-textbox"}
                    ref={this._input}
                    style={{ ...this.props.style }}
                    onChange={(e) => {
                        this.onChangeTextValue(e.currentTarget.value)
                    }}
                    value={this.calcDisplayValue()}
                    onFocus={(e) => {
                        e.persist()
                        this._onClickComponent(e)
                    }}
                    placeholder={this.props.placeholder}
                    onBlur={(e) => {
                        e.persist()
                        this._onBlurComponent(e)
                    }}
                    disabled={!this.props.enable}
                    required={this.props.required}
                />
                {
                    this.state.display && (
                        <div
                            className="list-container"
                            tabIndex={-1}
                            onClick={() => {
                                this._onClickComponent()
                            }}
                            onBlur={(e) => {
                                this._onBlurComponent(e)
                            }}
                            style={{
                                top: this.state.posY,
                                left: this.state.posX,
                            }}
                            ref={this._listContainer}
                        >
                            {this.renderPanel()}
                            {this.renderTimePicker()}
                            <div className="panel-footer">
                                <button
                                    onClick={() => {
                                        this.displayStack = ['calendar']
                                        let now = new Date();
                                        this.onSelectDate(now)
                                        // this.setState({ timePickerValue: now })
                                    }}
                                >
                                    Today
                                </button>
                                <button
                                    onClick={() => {
                                        this.setState({ display: false })
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )
                }
            </div >
        )
    }
}
