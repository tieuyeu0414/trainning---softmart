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
    min?: number;
    max?: number;
    minInterval?: number;
    showSecond?: boolean;
    addBlankItem?: boolean;

    // Bộ event
    onChange?: ((value?: Date, time?: { hour?: number, min?: number, sec?: number }) => void) // Sự kiện khi change item
}

interface iState {
    display?: boolean;
    selectedTime?: Date;
    hour?: number;
    min?: number;
    sec?: number;
}

export default class TimePicker extends Component<iProp, iState> {
    static defaultProps: iProp = {
        min: 0,
        max: 23
    }

    constructor(props: iProp) {
        super(props)
        this.state = {
            selectedTime: this.props.selectedTime,
            hour: this.props.selectedTime?.getHours(),
            min: this.props.selectedTime?.getMinutes(),
            sec: this.props.selectedTime?.getSeconds(),
        }
        this._handlerOnChange = this._handlerOnChange.bind(this)
    }

    private hourArr = Array.from({ length: 24 }, (_, i) => i)
        .filter(x => (this.props.min ? x > this.props.min : true) && (this.props.max ? x < this.props.max + 1 : true))
    private minArr = Array.from({ length: 60 }, (_, i) => i)
        .filter(x => this.props.minInterval ? x % this.props.minInterval === 0 : true)
    private secArr = Array.from({ length: 60 }, (_, i) => i)

    _handlerOnChange({ hour, min, sec }: { hour?: number, min?: number, sec?: number }) {
        this.setState({ hour: hour ?? this.state.hour, min: min ?? this.state.min, sec: sec ?? this.state.sec }, () => {
            if (this.props.onChange) {
                let date: Date | undefined = undefined;

                if (this.state.hour != undefined && this.state.min != undefined) {
                    date = new Date()
                    date.setHours(this.state.hour)
                    date.setMinutes(this.state.min)
                    date.setSeconds(this.state.sec || 0)
                }

                this.props.onChange(date, { hour: this.state.hour, min: this.state.min, sec: this.state.sec });
            }
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps: iProp) {
        if (nextProps.selectedTime && nextProps.selectedTime !== this.state.selectedTime) {
            this.setState({
                selectedTime: nextProps.selectedTime,
                hour: nextProps.selectedTime?.getHours(),
                min: nextProps.selectedTime?.getMinutes(),
                sec: nextProps.selectedTime?.getSeconds(),
            })
        }
    }

    render() {
        let width: CSSProperties = this.props.style ? { width: this.props.width } : {}

        return (
            <div className="sm-timepicker">
                <TimeSelector
                    timeArr={this.hourArr}
                    style={{ ...width }}
                    min={this.props.min}
                    max={this.props.max}
                    name="hour"
                    time={this.state.hour}
                    onChange={this._handlerOnChange}
                    addBlankItem={this.props.addBlankItem}
                />
                <TimeSelector
                    timeArr={this.minArr}
                    style={{ marginLeft: 5, marginRight: 5, ...width }}
                    min={0}
                    max={59}
                    name="min"
                    minInterval={this.props.minInterval}
                    time={this.state.min}
                    onChange={this._handlerOnChange}
                    addBlankItem={this.props.addBlankItem}
                />
                {
                    this.props.showSecond && (
                        <TimeSelector
                            timeArr={this.secArr}
                            style={{ ...width }}
                            min={0}
                            max={59}
                            name="sec"
                            time={this.state.sec}
                            onChange={this._handlerOnChange}
                            addBlankItem={this.props.addBlankItem}
                        />
                    )
                }
            </div>
        )
    }
}

interface iSectorProps {
    className?: string;
    timeArr: number[];
    style?: CSSProperties;
    min?: number;
    max?: number;
    time?: number;
    name: string;
    disabled?: boolean;
    minInterval?: number;
    addBlankItem?: boolean;
    onChange: ({ hour, min, sec }: { hour?: number, min?: number, sec?: number }) => void
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

    useEffect(() => {
        scrollToElement(time)
    }, [time])

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

        if (props.minInterval != undefined) {
            // Nếu là nhập theo các khoảng cách nhau giữa các khung thời gian (0, 15, 30, 45)
            // Thì khi nhập đúng với các khoảng mới bắn event
            if (value != undefined && props.timeArr.includes(value)) {
                props.onChange({ [props.name]: value })
            } else {
                props.onChange({ [props.name]: undefined })
            }
        } else {
            props.onChange({ [props.name]: value })
        }
    }

    function scrollToElement(value?: number) {
        let elm = document.querySelector(`#${props.name}${value}`)
        elm?.scrollIntoView({ block: 'nearest', inline: 'start' })
    }

    function _handlerArrowDown() {
        let index = props.timeArr.findIndex((value) => value === time)

        if (index == -1) {
            setTime(props.timeArr[0])
        } else {
            if (index === props.timeArr.length - 1) {
                index = 0
            } else {
                index += 1
            }

            setTime(props.timeArr[index])
        }
    }

    function _handlerArrowUp() {
        let index = props.timeArr.findIndex((value) => value === time)

        if (index == -1) {
            setTime(props.timeArr[props.timeArr.length - 1])
        } else {
            if (index === 0) {
                index = props.timeArr.length - 1
            } else {
                index -= 1
            }

            setTime(props.timeArr[index])
        }
    }

    return (
        <div
            ref={container}
            style={{ position: 'relative', display: 'inline-block', ...props.style }}
        >
            <TimeInput
                className={'select-box'}
                min={props.min}
                max={props.max}
                value={time}
                onFocus={() => {
                    setDisplay(true)
                }}
                onChange={(value) => {
                    onChange(value)
                }}
                onBlur={() => {
                    // Hacky solution, Đợi 0.3s sau blur thì mới đóng
                    setTimeout(() => {
                        if (display)
                            setDisplay(false)
                    }, 300)
                }}
                onKeyDown={(e) => {
                    if (e.key === 'ArrowUp') {
                        _handlerArrowUp()
                    }

                    if (e.key === 'ArrowDown') {
                        _handlerArrowDown()
                    }
                }}
            />
            {
                display && (
                    <div className="list-container" ref={menu}>
                        {
                            props.addBlankItem && (
                                <div
                                    key={'blank-item'}
                                    className={"list-item blank-item"}
                                    onClick={() => {
                                        onChange(undefined)
                                        setDisplay(false)
                                    }}
                                >
                                    &nbsp;
                                </div>
                            )
                        }
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
    onKeyDown?: (e: React.KeyboardEvent<Element>) => void
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
        if (this.props.value != null) {
            let strValue = Utility.AddTrailingLeftZero(this.props.value, 2)
            this.setState({ value: this.props.value, displayValue: strValue })
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: iPropInput) {
        if (nextProps.value != null && nextProps.value !== this.state.value) {
            let strValue = Utility.AddTrailingLeftZero(nextProps.value, 2)
            this.setState({ value: nextProps.value, displayValue: strValue })
        }

        if (nextProps.value == null) {
            this.setState({ value: undefined, displayValue: '' })
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

                // Nếu giá trị mới nhập khác với state đang có thì mới render 
                // Hạn chế re-render
                if (numberValue !== this.state.value) {
                    this.setState({ value: numberValue, displayValue: strValue }, () => {
                        if (typeof this.props.onChange === 'function') {
                            this.props.onChange(this.state.value, this.state.displayValue)
                        }
                    })
                }
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
                onKeyDown={(e: React.KeyboardEvent<Element>) => {
                    if (typeof this.props.onKeyDown === 'function') {
                        this.props.onKeyDown(e)
                    }
                }}
            />
        )
    }
}
