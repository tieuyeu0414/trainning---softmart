import React, { Component, CSSProperties } from "react";

interface iProp {
    // Bộ style mặc định của thẻ
    className?: string;
    style?: CSSProperties;
    // Tabs
    tabContentActive: string;
    tabId: string;
}

interface iState {
    TabContentActive: string;
    TabId: string;
}

class SMTabStrip extends Component<iProp, iState> {
    constructor(props: iProp) {
        super(props);
        this.state = {
            TabContentActive: this.props.tabContentActive,
            TabId: this.props.tabId,
        };
    }

    renderChildrenByHeader(children: any) {
        try {
            let data: any = null;
            if (Array.isArray(children)) {
                data = children;
            } else {
                if (typeof (children) === 'object') {
                    let array: any[] = [];
                    array.push(children);
                    children = [...array];
                    data = children;
                }
            }
            if (data) {
                let result: any[] = [];
                for (let child in data) {
                    let item = (
                        <li
                            key={this.state.TabId + children[child].props.id}
                            className={this.state.TabContentActive === children[child].props.id ? 'tabview-selected tabview-highlight' : ''}
                        >
                            <a
                                key={this.state.TabId + children[child].props.id}
                                role="tab"
                                className="grid-link"
                                id={this.state.TabId + children[child].props.id}
                                onClick={() => this.setState({ TabContentActive: children[child].props.id })}
                            >
                                <span className="tabview-title">{children[child].props.header}</span>
                            </a>
                        </li>
                    );
                    result.push(item)
                }
                return result;
            } else {
                return <></>;
            }
        } catch (error) {
            return <></>;
        }
    }

    renderChildrenByContent(children: any) {
        try {
            let data: any = null;
            if (Array.isArray(children)) {
                data = children;
            } else {
                if (typeof (children) === 'object') {
                    let array: any[] = [];
                    array.push(children);
                    children = [...array];
                    data = children;
                }
            }
            if (data) {
                let result: any[] = [];
                for (let child in children) {
                    let item = (
                        <div
                            key={this.state.TabId + children[child].props.id}
                            id={this.state.TabId + children[child].props.id}
                            style={{ display: this.state.TabContentActive === children[child].props.id ? 'block' : 'none' }}
                            className="p-tabview-panel"
                            role="tabpanel"
                        >
                            {children[child]}
                        </div>
                    );
                    result.push(item)
                }
                return result;
            } else {
                return <></>;
            }

        } catch (error) {
            return <></>;
        }
    }

    render() {
        return (
            <div className="sm-tabview" style={{ width: '100%' }}>
                <ul className="tabview-nav" role="tablist">
                    {
                        this.renderChildrenByHeader(this.props.children)
                    }
                </ul>
                <div className="tabview-panels">
                    {
                        this.renderChildrenByContent(this.props.children)
                    }
                </div>
            </div>
        );
    }
}

interface iContentProps {
    header?: string;
    id?: string;
}

class SMTabContent extends Component<iContentProps, any> {
    render() {
        return <> {this.props.children}</>;
    }
}
export { SMTabStrip, SMTabContent };
