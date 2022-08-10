import React, { Component, CSSProperties, ChangeEvent } from "react";
import { SMXException } from "../models/SMXException";
import Utility from "../Utils/Utility";
import { CheckBox, ErrorHandler } from "./ComponentLib";

type Mode = 'single' | 'multiple'

interface iProp {
    // Bộ style mặc định của thẻ
    className?: string;
    name?: string;
    style?: CSSProperties;
    enable?: boolean;
    mode?: Mode;

    // Bộ prop dữ liệu
    dataSource?: ListItem[];
    textField?: keyof ListItem;
    valueField?: keyof ListItem;
    selectedValue?: any;
    filter?: boolean;
    maxItem?: number;

    // Add Blank item
    addBlankItem?: boolean;
    blankItemText?: string;
    shortTemplate?: string;
    placeHolder?: string;

    renderItem?: (item: any) => void;
    icon?: () => void;

    selectAll?: boolean;

    // Bộ event
    onChange?: (values?: number[], items?: ListItem[]) => void; // Sự kiện khi change item
}

interface iState {
    display: boolean;
    posY: number;
    posX: number;
    selectedValue?: any;
    filterValue: string;
    selectAll?: boolean;
}

class ListItem {
    id?: number;
    checked?: boolean;
    label?: string;
}

const parentContainer = ['sm-dialog-content', 'layout-main', 'h-datatable']

export { ListItem }

export default class SMMultiSelect extends Component<iProp, iState> {
    static defaultProps: iProp = {
        className: '',
        shortTemplate: '{0} đối tượng đã được chọn',
        selectAll: false,
        mode: 'multiple',
        addBlankItem: true,
    }

    private menu: React.RefObject<HTMLDivElement>;
    private _divHolder: React.RefObject<HTMLDivElement> = React.createRef();
    private _divTextHidden: React.RefObject<HTMLDivElement> = React.createRef();
    private _listContainer: React.RefObject<HTMLDivElement> = React.createRef();
    private _showShortDisplay = false;
    private _menuWidth: number | undefined = 0;

    constructor(props: iProp) {
        super(props);
        this.state = {
            display: false,
            posX: 0,
            posY: 0,
            selectedValue: this.props.selectedValue,
            filterValue: '',
            selectAll: false,
        }

        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.menu = React.createRef();
    }

    componentDidMount() {
        // Event bắt sự kiện khi click chuột để xác định sự kiện xảy ra bên trong hoặc bên ngoài Component
        document.addEventListener('mousedown', this.handleClickOutside);
        // Event bắt sự kiện khi thanh cuộn bị kéo sẽ đóng Component
        // document.addEventListener('scroll', this.handleClickOutside);
        this.props.dataSource?.forEach(data => {
            if (Array.isArray(this.state.selectedValue) && this.state.selectedValue.includes(data.id)) {
                data.checked = true
            } else {
                data.checked = false
            }
        })

        if (this._divTextHidden.current?.clientWidth != undefined && this._divHolder.current?.clientWidth != undefined) {
            this._showShortDisplay = this._divTextHidden.current?.clientWidth > this._divHolder.current?.clientWidth
            this.setState({})
        }

        //console.log(this.menu.current)

        const menuOffsetHeight = this.menu.current?.offsetHeight
        const menuOffsetWidth = this.menu.current?.offsetWidth

        const mnuW = this.menu.current!.clientWidth;
        const mnuH = this.menu.current!.clientHeight;

        //console.log({ menuOffsetWidth, menuOffsetHeight, mnuW, mnuH })

        this._menuWidth = this.menu.current?.clientWidth;
        this.setState({})
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        // document.removeEventListener('scroll', this.handleClickOutside);
    }

    static getDerivedStateFromProps(props: iProp, state: iState) {
        // Any time the current user changes,
        // Reset any parts of state that are tied to that user.
        // In this simple example, that's just the email.
        if (props.selectedValue !== state.selectedValue) {
            return {
                selectedValue: props.selectedValue,
            };
        }
        return null;
    }

    componentDidUpdate(prevProps: iProp, prevState: iState, snapshot: any) {
        if (this.state.selectedValue !== prevState.selectedValue) {
            if (this._divTextHidden.current?.clientWidth != undefined && this._divHolder.current?.clientWidth != undefined) {
                this._showShortDisplay = this._divTextHidden.current?.clientWidth > this._divHolder.current?.clientWidth
                this.setState({})
            }
        }
    }

    handleOnChange(value: boolean, item: ListItem, event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (this.props.mode === 'single' && this.props.onChange) {
            let dataSource = this.props.dataSource?.map((x: ListItem) => {
                if (item.id === x.id) {
                    x.checked = value
                }
                return x
            })

            let selectedItems = dataSource?.filter((x: ListItem) => x['checked'])

            if (selectedItems) {
                let selectedValues = selectedItems.map(x => x.id!) || []
                this.props.onChange(selectedValues, selectedItems);

            } else {
                this.props.onChange(undefined, undefined)
            }

            this.setState({ selectedValue: selectedItems })
            this.onClosePopup()

            return;
        }


        if (this.props.onChange) {
            let dataSource = this.props.dataSource?.map((x: ListItem) => {
                if (item.id === x.id) {
                    x.checked = value
                }
                return x
            })

            let selectedItems = dataSource?.filter((x: ListItem) => x['checked'])

            // Nếu có chọn giới hạn số lượng Item
            if (this.props.maxItem && selectedItems && selectedItems?.length > this.props.maxItem) {
                let ex = new SMXException()
                ex.Type = 3
                ex.Message = `Không được chọn quá ${this.props.maxItem} đối tượng`

                throw ex;
            }

            if (selectedItems) {
                let selectedValues = selectedItems.map(x => x.id!) || []
                this.props.onChange(selectedValues, selectedItems);

            } else {
                this.props.onChange(undefined, undefined)
            }

            this.setState({ selectedValue: selectedItems })
        }
    }

    handleClickOutside(event: any) {
        if (this.state.display) {
            if (this.menu && !this.menu.current!.contains(event.target)) {
                this.onClosePopup()
            }
        }
    }

    onClosePopup() {
        this.setState({
            display: false,
            filterValue: '',
        });
    }

    private menuMaxHeight = 250

    calculatePosition(event: React.MouseEvent<HTMLElement>) {
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;

        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const menuOffsetHeight = this.menu.current?.offsetHeight
        const menuOffsetWidth = this.menu.current?.offsetWidth

        const mnuW = this.menu.current!.clientWidth;
        const mnuH = this.menu.current!.clientHeight;

        //console.log({ menuOffsetWidth, menuOffsetHeight, mnuW, mnuH })

        let mnuX: number;
        let mnuY: number;

        if (mouseX + mnuW < screenW) {
            mnuX = mouseX;
        }
        else {
            mnuX = mouseX - mnuW;
        }

        if (mouseY + mnuH + this.menuMaxHeight < screenH) {
            mnuY = 30;
        }
        else {
            mnuY = - (this.menuMaxHeight + 3);
        }

        this.setState({
            posX: mnuX,
            posY: mnuY,
        });
    }

    calculateScreenPosition(event: React.MouseEvent<HTMLElement>) {
        const screenW = window.innerWidth;
        let screenH = window.innerHeight;

        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const menuOffsetHeight = this.menu.current?.offsetHeight
        const menuOffsetWidth = this.menu.current?.offsetWidth

        const mnuW = this.menu.current!.clientWidth;
        const mnuH = this.menu.current!.clientHeight;

        let pos = this.getElementCoords(this.menu.current);

        let posY = (pos?.top ?? 0) + mnuH + 3

        let mnuX: number;
        let mnuY: number;

        // console.log({ mouseX, mnuW, screenW })

        if (mouseX + mnuW < screenW) {
            mnuX = mouseX;
        }
        else {
            mnuX = mouseX - mnuW;
        }

        var mainWrapper = document.getElementsByClassName('main-wrapper');
        if (mainWrapper.length > 0) {
            screenH = mainWrapper[0].getBoundingClientRect().height
        }

        if (mouseY + mnuH + this.menuMaxHeight < screenH) {
            mnuY = 0;
        }
        else {
            mnuY = - (this.menuMaxHeight + 3) - 30;
        }

        this.setState({
            posX: (pos?.left ?? 0), posY: posY + mnuY
        })
    }

    getElementCoords(elem: HTMLDivElement | null) {
        if (elem == undefined) {
            return undefined;
        }

        function recursiveLoopElem(el) {
            let countBreak = 1;

            while ((el = el.parentElement) && countBreak < 10 && countBreak++) {
                let boundingRect = el.getBoundingClientRect()

                const menuOffsetHeight = el?.offsetHeight
                const menuOffsetWidth = el?.offsetWidth

                const scrollTop = el?.scrollTop
                const scrollLeft = el?.scrollLeft
                console.log('----------')
                console.log(el)
                console.log(boundingRect)
                console.log({ menuOffsetHeight, menuOffsetWidth })
                console.log({ scrollTop, scrollLeft })
                let elStyle = el.style
                console.log({ elStyle })
                var out = ""
                var computedStyle = window.getComputedStyle(el, null);
                for (let prop in elStyle) {
                    if (elStyle.hasOwnProperty(prop) && prop === 'display' || prop === 'position') {
                        out += "  " + prop + " = '" + elStyle[prop] + "' > '" + computedStyle[prop] + "'\n";
                    }
                }
                console.log(out)
                console.log('----------')
            }
        }

        function getStyle(el: any, styleProp: any) {
            var value, defaultView = (el.ownerDocument || document).defaultView;
            // W3C standard way:
            if (defaultView && defaultView.getComputedStyle) {
                // sanitize property name to css notation
                // (hypen separated words eg. font-Size)
                styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
                return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
            } else if (el.currentStyle) { // IE
                // sanitize property name to camelCase
                styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
                    return letter.toUpperCase();
                });
                value = el.currentStyle[styleProp];
                // convert other units to pixels on IE
                if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
                    return (function (value) {
                        var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
                        el.runtimeStyle.left = el.currentStyle.left;
                        el.style.left = value || 0;
                        value = el.style.pixelLeft + "px";
                        el.style.left = oldLeft;
                        el.runtimeStyle.left = oldRsLeft;
                        return value;
                    })(value);
                }
                return value;
            }
        }

        // recursiveLoopElem(elem);

        function findAncestor(el, cls) {
            let countBreak = 1;
            while ((el = el.parentElement) && cls.filter(x => el.classList.contains(x)).length === 0 && countBreak < 10 && countBreak++);
            return el;
        }

        var container = findAncestor(elem, parentContainer)

        var containerStyle = container.style
        var containerComputedStyle = window.getComputedStyle(container, null);

        var containerStyleTxt = ''
        for (let prop in containerStyle) {
            if (containerStyle.hasOwnProperty(prop) && prop === 'display' || prop === 'position') {
                containerStyleTxt += "  " + prop + " = '" + containerStyle[prop] + "' > '" + containerComputedStyle[prop] + "'\n";
            }
        }

        console.log(container)
        console.log(containerStyleTxt)


        var root = document.documentElement,
            body = document.body,
            sTop = window.pageYOffset || root.scrollTop || body.scrollTop,
            sLeft = window.pageXOffset || root.scrollLeft || body.scrollLeft,
            cTop = root.clientTop || body.clientTop || 0,
            cLeft = root.clientLeft || body.clientLeft || 0,
            rect = elem.getBoundingClientRect(),
            top = 0,
            left = Math.round(rect.left + sLeft - cLeft);

        // console.log('------------------')

        // console.log(rect.top, sTop, cTop)
        // console.log(container.classList.contains('sm-dialog-content'))

        top = Math.round(rect.top + sTop - cTop) - 50

        // WARNING: PATCH ONLY - Dont reuse
        if (container.classList.contains('sm-dialog-content')) {
            top = Math.round(rect.top - cTop)

            return {
                top: top,
                left: left,
            };
        }

        // WARNING: PATCH ONLY - Dont reuse
        if (container.classList.contains('h-datatable')) {
            top = Math.round(rect.top - container.getBoundingClientRect().top - cTop)
            left = left - container.getBoundingClientRect().x

            return {
                top: top,
                left: left,
            };
        }

        // WARNING: PATCH ONLY - Dont reuse
        var mainWrapper = document.getElementsByClassName('main-wrapper');
        if (mainWrapper.length > 0) {
            var mainContent = document.getElementsByClassName('main-content');

            top = Math.round(rect.top - container.getBoundingClientRect().top - cTop + mainContent[0].scrollTop)
            left = left - container.getBoundingClientRect().x

            var leftMenu = document.getElementsByClassName('left-menu');
            if (leftMenu.length > 0) {
                left = left - 180
            }

            let leftMenuOffIndicator = document.getElementsByClassName('enlarge-menu');
            if (leftMenuOffIndicator.length == 0) {
                left = left + 6
            }
        }

        return {
            top: top,
            left: left,
        };
    }

    renderSelectIcon(item: ListItem) {
        if (this.props.mode === 'single') {
            return <></>
        }

        return (
            <>
                <CheckBox
                    className="sm-checkbox"
                    checked={item.checked}
                    onChange={(value) => {
                        // this.handleOnChange(value, item)
                    }}
                />
            </>
        )
    }

    displayValue() {
        if (this.props.mode === 'single') {
            return this.displaySingleValue()
        }

        if (this._showShortDisplay) {
            return this.displayShortValue()
        } else {
            return this.displayFullValue()
        }
    }

    displaySingleValue() {
        let item = this.props.dataSource?.find(x => this.state.selectedValue === x[this.props.valueField!])
        return item?.label || this.props.blankItemText || ''
    }

    displayFullValue() {
        if (Array.isArray(this.state.selectedValue) && this.state.selectedValue.length > 0) {
            let lstItem = this.props.dataSource
                ?.filter(x => this.state.selectedValue.includes(x[this.props.valueField!]))
                ?.map(x => x[this.props.textField!])
            return lstItem?.join(', ')
        }

        return this.props.placeHolder || ''
    }

    displayShortValue() {
        if (Array.isArray(this.state.selectedValue) && this.state.selectedValue.length > 0) {
            let lstItem = this.props.dataSource
                ?.filter(x => this.state.selectedValue.includes(x[this.props.valueField!]))
                ?.map(x => x[this.props.textField!])

            let count = lstItem?.length
            let displayValue = this.props.shortTemplate?.replace(/{(\d+)}/g, count?.toString() || '')
            return displayValue
        }

        return this.props.placeHolder || ''
    }

    onFilter(value: string) {
        this.setState({ filterValue: value }, () => {

        })
    }

    getDataSource() {
        return this.props.dataSource?.filter(x => {
            if (this.state.filterValue?.length === 0) {
                return true
            } else {
                let label = Utility.FormatVNLanguage(x.label!.toLocaleLowerCase())
                let filterValue = Utility.FormatVNLanguage(this.state.filterValue.toLocaleLowerCase())
                return label.includes(filterValue)
            }
        })
    }

    onSelectAll() {
        let value = !this.state.selectAll

        this.props.dataSource?.forEach(x => x.checked = value)

        this.setState({ selectAll: value }, () => {
            if (this.props.onChange) {
                if (this.state.selectAll) {
                    let selectedValues = this.props.dataSource?.map(x => x.id!) || []
                    this.props.onChange(selectedValues, this.props.dataSource)
                } else {
                    this.props.onChange([], [])
                }
            }
        })
    }

    onSelectBlank_Single() {
        if (this.props.onChange) {
            this.props.onChange([], undefined)
        }
        this.onClosePopup()
    }

    renderSelectBlank_Single() {
        return (
            <div className={"list-item"}
                onClick={(e) => {
                    e.preventDefault()
                    this.onSelectBlank_Single()
                }}
            >
                {this.props.blankItemText}
            </div>
        )
    }

    renderSelectAll() {
        if (!this.props.selectAll)
            return null

        if (!this.props.addBlankItem)
            return null


        if (this.props.mode == 'single') {
            return this.renderSelectBlank_Single()
        }

        if (this.props.maxItem != undefined) {
            return;
        }

        return (
            <div className={"list-item"}
                onClick={(e) => {
                    e.preventDefault()
                    this.onSelectAll()
                }}
            >
                <CheckBox
                    className="sm-checkbox"
                    checked={this.state.selectAll}
                    onChange={(value) => {
                        // this.handleOnChange(value, item)
                    }}
                />
                {'--- Chọn tất cả ---'}
            </div>
        )
    }

    render() {
        return (
            <>
                <div
                    className={'sm-multiselect ' + this.props.className}
                    ref={this.menu}
                    style={this.props.style}
                >
                    <div
                        className="holder"
                        tabIndex={0}
                        onClick={(e: any) => {
                            e.persist()
                            this.setState({ display: !this.state.display }, () => {
                                if (this.state.display) {
                                    // this.calculatePosition(e)
                                    this.calculateScreenPosition(e)
                                }
                            })
                        }}
                        ref={this._divHolder}
                    >
                        {this.displayValue()}
                    </div>
                    {
                        this.state.display && (
                            <div
                                className="list-container"
                                ref={this._listContainer}
                                style={{
                                    top: this.state.posY,
                                    // display: this.state.display ? "block" : "none",
                                    left: this.state.posX,//khác nhau left lấy từ tọa độ click
                                    width: this._menuWidth,
                                    paddingTop: 35,
                                }}
                            >
                                {this.renderSelectAll()}
                                {
                                    this.getDataSource()?.map((item: ListItem, index: number) => {
                                        return (
                                            <div
                                                key={index.toString()}
                                                className={"list-item"}
                                                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                                                    e.preventDefault()
                                                    try {
                                                        this.handleOnChange(!(item.checked || false), item, e)
                                                    } catch (ex) {
                                                        ErrorHandler.HandlerException(ex);
                                                    }
                                                }}
                                            >
                                                <>
                                                    {
                                                        typeof this.props.icon === 'function' ? this.props.icon() : this.renderSelectIcon(item)
                                                    }
                                                    {
                                                        typeof this.props.renderItem === 'function' ? this.props.renderItem(item[this.props.textField!]) : item[this.props.textField!]
                                                    }
                                                </>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        )
                    }
                    {
                        this.state.display && this.props.filter && (
                            <div
                                className="filter-area"
                                style={{
                                    position: 'absolute',
                                    top: this.state.posY,
                                    left: this.state.posX,
                                    zIndex: 100,
                                    width: this._menuWidth ? this._menuWidth - 8 : this._menuWidth,
                                    marginTop: 1,
                                    marginLeft: 1,
                                    backgroundColor: "white"
                                }}
                            >
                                <input
                                    value={this.state.filterValue}
                                    onChange={(e) => {
                                        this.onFilter(e.currentTarget.value)
                                    }}
                                />
                            </div>
                        )
                    }
                </div>
                <div
                    ref={this._divTextHidden}
                    style={{
                        position: 'absolute',
                        visibility: 'hidden',
                        height: 'auto',
                        width: 'auto',
                        // whiteSpace: 'nowrap',
                        top: 0,
                        left: 0,
                    }}
                >
                    {this.displayFullValue()}
                </div>
            </>
        );
    }
}
