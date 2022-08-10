import React, { CSSProperties, Component, useEffect, useCallback } from 'react'
import { HookUseEventListener, useDidUpdate } from '../Utils/HookUtils'
import Utility from '../Utils/Utility';
import { TextBox } from './ComponentLib';

interface iProp {
    // Bộ style mặc định của thẻ
    className?: string;
    style?: CSSProperties;
    enable?: boolean;
    width?: string | number;

    selectedTime?: Date;

    // Bộ event
    onChange?: ((value?: Date, time?: { day?: number, month?: number }) => void) // Sự kiện khi change item
}

interface iState {
    display?: boolean;
    selectedTime?: Date;
    hour?: number;
    min?: number;
    sec?: number;
    month?: number;
    day?: number;
}

export default class DateMonthPicker extends Component<iProp, iState> {
    constructor(props: iProp) {
        super(props)
        let month = this.props.selectedTime ? this.props.selectedTime?.getMonth() + 1 : undefined
        this.state = {
            selectedTime: this.props.selectedTime,
            month: month,
            day: this.props.selectedTime?.getDay(),
        }
        this._handlerOnChange = this._handlerOnChange.bind(this)
    }

    private monthArr = Array.from({ length: 12 }, (_, i) => i + 1)

    _handlerOnChange({ day, month }: { day?: number, month?: number }) {
        this.setState({ day: day ?? this.state.day, month: month ?? this.state.month }, () => {
            if (this.props.onChange) {
                let date: Date | undefined = undefined;

                if (this.state.day && this.state.month) {
                    date = new Date()
                    date.setDate(this.state.day)
                    date.setMonth(this.state.month)
                }

                this.props.onChange(date, { day: this.state.day, month: this.state.month });
            }
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps: iProp) {
        if (nextProps.selectedTime && nextProps.selectedTime !== this.state.selectedTime) {
            this.setState({
                selectedTime: nextProps.selectedTime,
                month: nextProps.selectedTime?.getMonth() ?? 0 + 1,
                day: nextProps.selectedTime?.getDay() ?? 0 + 1,
            })
        }
    }

    render() {
        let width: CSSProperties = this.props.style ? { width: this.props.width } : {}
        let date = new Date()
        let numberOfDay: undefined | number = date.getDate()

        if (this.state.month) {
            date.setMonth(this.state.month + 1)
        } else {
            numberOfDay = undefined
        }

        let dayArr = Array.from({ length: numberOfDay ?? 31 }, (_, i) => i + 1)

        return (
            <div className="sm-timepicker">
                <TimeSelector
                    timeArr={dayArr}
                    style={{ ...width }}
                    name="day"
                    time={this.state.hour}
                    onChange={this._handlerOnChange}
                />
                <TimeSelector
                    timeArr={this.monthArr}
                    style={{ marginLeft: 5, marginRight: 5, ...width }}
                    name="month"
                    time={this.state.min}
                    onChange={this._handlerOnChange}
                />
            </div>
        )
    }
}

interface iSectorProps {
    className?: string;
    timeArr: number[];
    style?: CSSProperties;
    time?: number;
    name: string;
    onChange: ({ day, month }: { day?: number, month?: number }) => void
}

const TimeSelector = React.memo((props: iSectorProps) => {
    var container: React.MutableRefObject<HTMLDivElement> = React.useRef<any>()
    var menu: React.MutableRefObject<HTMLDivElement> = React.useRef<any>()

    const [display, setDisplay] = React.useState(false);
    const [time, setTime] = React.useState(props.time);

    // Update props từ parent
    useEffect(() => {
        setTime(props.time)
    }, [props.time])

    useDidUpdate(() => {
        if (display)
            scrollToElement(time)
    }, [display])

    const handlerMouseDown = useCallback(
        (event) => {
            if (display) {
                if (container && !container.current?.contains(event.target)) {
                    setDisplay(false)
                }
            }
        },
        [display]
    )

    HookUseEventListener('mousedown', handlerMouseDown)

    function onChange(value?: number) {
        setTime(value)
        props.onChange({ [props.name]: value })
    }

    function scrollToElement(value?: number) {
        // TODO: Scroll đến giá trị được nhập
        let elm = document.querySelector(`#${props.name}${value}`)
        let top = (elm?.getBoundingClientRect()?.top || 0) - (elm?.parentElement?.getBoundingClientRect()?.top || 0)
        menu?.current?.scrollTo({ top: top, behavior: 'auto' })
    }

    return (
        <div
            ref={container}
            style={{ position: 'relative', display: 'inline-block', ...props.style }}
        >
            <TimeInput
                className={'select-box'}
                value={time}
                onFocus={() => {
                    setDisplay(true)
                }}
                onChange={(value) => {
                    onChange(value)
                    scrollToElement(value)
                }}
                onBlur={() => {
                    // Hacky solution, Đợi 0.1s sau blur thì mới đóng
                    setTimeout(() => {
                        if (display)
                            setDisplay(false)
                    }, 100)
                }}
            />
            {
                display && (
                    <div className="list-container" ref={menu}>
                        {props.timeArr.map(x => {
                            return (
                                <div
                                    key={x.toString()}
                                    className={"list-item " + (x === time ? 'selected ' : '')}
                                    onClick={() => {
                                        onChange(x)
                                        setDisplay(false)
                                    }}
                                    id={props.name + x}
                                >
                                    {Utility.AddTrailingLeftZero(x, 2)}
                                </div>
                            )
                        })}
                    </div>
                )
            }
        </div>
    )
})

// Input cho combo nhập Thời gian (Clone từ SMNumericBox)
interface iPropInput {
    min?: number;
    max?: number;
    value?: number;
    className?: string;
    disabled?: boolean;

    // Event
    onChange?: (value?: number, displayValue?: string) => void
    onFocus?: () => void
    onBlur?: () => void
}

interface iStateInput {
    value?: number;
    displayValue?: string;
}

class TimeInput extends Component<iPropInput, iStateInput> {
    static defaultProps: iPropInput = {
        className: 'sm-textbox'
    }

    constructor(props: iPropInput) {
        super(props)
        this.state = {
            displayValue: ''
        }
    }

    componentDidMount() {
        if (this.props.value) {
            let strValue = Utility.AddTrailingLeftZero(this.props.value, 2)
            this.setState({ value: this.props.value, displayValue: strValue })
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: iPropInput) {
        if (nextProps.value != null && nextProps.value !== this.state.value) {
            let strValue = Utility.AddTrailingLeftZero(nextProps.value, 2)
            this.setState({ value: nextProps.value, displayValue: strValue })
        }
    }

    onChangeValue(value: string) {
        if (value !== "" && value != null) {
            let numberValue = Number(value)
            let isNumber = isNaN(numberValue) == false

            if (isNumber) {

                if (this.props.min != null && numberValue < this.props.min) {
                    numberValue = this.props.min
                }

                if (this.props.max != null && numberValue > this.props.max) {
                    numberValue = this.props.max
                }

                let strValue = Utility.AddTrailingLeftZero(numberValue, 2)

                this.setState({ value: numberValue, displayValue: strValue }, () => {
                    if (typeof this.props.onChange === 'function') {
                        this.props.onChange(this.state.value, this.state.displayValue)
                    }
                })
            }
        } else {
            this.setState({ value: undefined, displayValue: '' }, () => {
                if (typeof this.props.onChange === 'function') {
                    this.props.onChange(this.state.value, this.state.displayValue)
                }
            })
        }
    }

    render() {
        return (
            <TextBox
                className={this.props.className}
                onChange={(e) => {
                    // Nếu disable không cho nhập
                    if (!this.props.disabled) {
                        this.onChangeValue(e.currentTarget.value)
                    }
                }}
                value={this.state.displayValue}
                // disabled={this.props.disabled}
                onFocus={(e) => {
                    if (typeof this.props.onFocus === 'function') {
                        this.props.onFocus()
                    }
                }}
                onBlur={(e) => {
                    if (typeof this.props.onBlur === 'function') {
                        this.props.onBlur()
                    }
                }}
            />
        )
    }
}
