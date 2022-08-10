import React, { Component, CSSProperties } from "react";

interface iProps {
    // Bộ style mặc định của thẻ
    className?: string;
    style?: CSSProperties;
    enable?: boolean;

    selectedValue?: any;
    dataSource?: any[];
    textField?: string;
    valueField?: string;

    offline?: boolean;
    width?: number | string;
    height?: number;

    // Bộ event
    onChange?: (value: SearchBoxModel, onClick: () => void) => void;
    onRequestDataSource?: (filterValue: string) => any[];
    onDrawItem: (item: SearchBoxModel, onClick: () => void) => any;
}
interface iState {
    showContent: boolean;
    filterValue?: string;
    selectedTexts: string[];
    isSelect: boolean;
    dataSourceResponse: any[];
    dataSource: any[];
    selectedValue: any;

    keySelected?: SearchBoxModel;
    index: number;
}
export class ComboSearchBox extends Component<iProps, iState> {
    private searchBox: React.RefObject<HTMLDivElement>;
    private searchContent: React.RefObject<HTMLDivElement>;

    constructor(props: iProps) {
        super(props);
        this.state = {
            showContent: false,
            selectedTexts: [],
            isSelect: false,
            dataSourceResponse: [],
            dataSource: this.props.dataSource || [],
            selectedValue: this.props.selectedValue,
            index: -1,
        };

        this.searchBox = React.createRef();
        this.searchContent = React.createRef();
    }

    public static defaultProps = {
        width: 200,
        offline: true,
        height: 25,
    };

    componentDidMount() {
        document.addEventListener("click", (evt) => {
            this.handleSearchboxClick(evt);
        });
        document.addEventListener("keydown", (evt) => {
            this.handleKeyEnterPress(evt);
        });
    }

    UNSAFE_componentWillMount() {
        document.removeEventListener(
            "click",
            (evt) => {
                this.handleSearchboxClick(evt);
            },
            false
        );
        document.addEventListener("keydown", (evt) => {
            this.handleKeyEnterPress(evt);
        });
    }

    handleKeyEnterPress = (evt: any) => {
        if (evt.keyCode === 13) {
            this.setState({
                showContent: false,
                index: -1,
                keySelected: undefined,
            });
        }
    };

    UNSAFE_componentWillReceiveProps(nextProps: iProps) {
        if (nextProps.selectedValue !== undefined && nextProps.selectedValue !== this.state.selectedValue) {
            this.setState({ selectedValue: nextProps.selectedValue });
        }
        if (nextProps.dataSource !== undefined && nextProps.dataSource !== this.state.dataSource) {
            this.setState({ dataSource: nextProps.dataSource });
        }
    }

    handleOnChange(e: SearchBoxModel) {
        if (this.props.onChange) {
            this.props.onChange(e, () => {
                this.setState({
                    isSelect: true,
                    showContent: true,
                    selectedTexts: [e.Label!],
                });
            });
        }
    }

    handleSearchboxClick = (evt: any) => {
        if (!this.searchBox.current?.contains(evt.target)) {
            this.setState({ showContent: false });
        }
    };

    render() {
        const arrItem: SearchBoxModel[] = this.state.dataSource
            ?.map((item, index) => {
                return { Label: item[this.props.textField!], Value: item[this.props.valueField!] };
            })!
            .filter((en: SearchBoxModel) =>
                en.Label
                    ? en
                          .Label!.toLowerCase()
                          .includes(this.state.filterValue ? this.state.filterValue.toLocaleLowerCase() : "")
                    : undefined
            );
        return (
            <div className={this.props.className} style={{ width: this.props.width }}>
                <div className="search-box-container" ref={this.searchBox}>
                    <input
                        type="text"
                        style={this.props.style}
                        onKeyDown={(evt) => {
                            if (
                                (this.state.dataSourceResponse && this.state.dataSourceResponse.length > 0) ||
                                (this.props.dataSource && this.props.dataSource.length > 0)
                            ) {
                                let dataSourceLength = this.props.offline
                                    ? arrItem.length
                                    : this.state.dataSourceResponse.length;
                                switch (evt.keyCode) {
                                    case 38: // key up
                                        this.setState(
                                            {
                                                index:
                                                    this.state.index - 1 >= 0
                                                        ? this.state.index - 1
                                                        : dataSourceLength - 1,
                                            },
                                            () => {
                                                this.setState(
                                                    {
                                                        keySelected: this.props.offline
                                                            ? arrItem[this.state.index]
                                                            : this.state.dataSourceResponse[this.state.index],
                                                    },
                                                    () => {
                                                        if (this.state.keySelected) {
                                                            for (
                                                                let item = 0;
                                                                item < this.searchContent.current!.children.length;
                                                                item++
                                                            ) {
                                                                if (item === this.state.index) {
                                                                    this.searchContent.current?.children[
                                                                        item
                                                                    ].setAttribute(
                                                                        "style",
                                                                        "background-color: #0388e5; color: white"
                                                                    );
                                                                } else {
                                                                    this.searchContent.current?.children[
                                                                        item
                                                                    ].setAttribute(
                                                                        "style",
                                                                        "background-color: white; color: #333333"
                                                                    );
                                                                }
                                                            }
                                                            this.handleOnChange(this.state.keySelected);
                                                        }
                                                    }
                                                );
                                            }
                                        );
                                        break;

                                    case 40: // key down
                                        this.setState(
                                            {
                                                index:
                                                    this.state.index + 1 < dataSourceLength ? this.state.index + 1 : 0,
                                            },
                                            () => {
                                                this.setState(
                                                    {
                                                        keySelected: this.props.offline
                                                            ? arrItem[this.state.index]
                                                            : this.state.dataSourceResponse[this.state.index],
                                                    },
                                                    () => {
                                                        if (this.state.keySelected) {
                                                            for (
                                                                let item = 0;
                                                                item < this.searchContent.current!.children.length;
                                                                item++
                                                            ) {
                                                                if (item === this.state.index) {
                                                                    this.searchContent.current?.children[
                                                                        item
                                                                    ].setAttribute(
                                                                        "style",
                                                                        "background-color: #0388e5; color: white"
                                                                    );
                                                                } else {
                                                                    this.searchContent.current?.children[
                                                                        item
                                                                    ].setAttribute(
                                                                        "style",
                                                                        "background-color: white; color: #333333"
                                                                    );
                                                                }
                                                            }
                                                            this.handleOnChange(this.state.keySelected);
                                                        }
                                                    }
                                                );
                                            }
                                        );
                                        break;
                                }
                            }
                        }}
                        onClick={() => {
                            if (this.props.offline) {
                                this.setState({
                                    filterValue: "",
                                    selectedTexts: [],
                                    showContent: !this.state.showContent,
                                    index: -1,
                                    keySelected: undefined,
                                });
                            } else {
                                this.setState({ showContent: false });
                            }
                            for (let item = 0; item < this.searchContent.current!.children.length; item++) {
                                this.searchContent.current?.children[item].removeAttribute("style");
                            }
                        }}
                        onChange={(evt) => {
                            this.setState({ filterValue: evt.target.value, isSelect: false }, () => {
                                if (!this.props.offline && this.props.onRequestDataSource) {
                                    let res = this.props.onRequestDataSource(this.state.filterValue || "");
                                    let resDataSource = res!.map((item, index) => {
                                        return {
                                            Label: item[this.props.textField!],
                                            Value: item[this.props.valueField!],
                                        };
                                    });
                                    this.setState({
                                        showContent: true,
                                        index: -1,
                                        keySelected: undefined,
                                        isSelect: false,
                                        dataSourceResponse: resDataSource,
                                    });
                                } else if (this.props.offline) {
                                    this.setState({
                                        showContent: true,
                                        index: -1,
                                        keySelected: undefined,
                                        isSelect: false,
                                    });
                                }
                            });
                        }}
                        value={
                            !this.state.isSelect && this.state.filterValue === undefined
                                ? this.state.selectedValue[this.props.textField!]
                                : !this.state.isSelect
                                ? this.state.filterValue
                                : this.state.selectedTexts.toString()
                        }
                    ></input>
                    <i className="fas fa-search"></i>
                </div>
                <div
                    ref={this.searchContent}
                    className="search-box-content"
                    style={{
                        display: this.state.showContent ? "block" : "none",
                        width: this.props.width,
                        maxHeight: 500,
                        overflowY: "scroll",
                    }}
                >
                    {(this.props.offline ? arrItem : this.state.dataSourceResponse).map((en: SearchBoxModel) =>
                        this.props.onDrawItem(en, () => {
                            this.setState({
                                isSelect: true,
                                showContent: false,
                                selectedTexts: [en.Label!],
                            });
                        })
                    )}
                </div>
            </div>
        );
    }
}

export class SearchBoxModel {
    public Label?: string;
    public Value?: any;
}
