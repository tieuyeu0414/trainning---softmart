import React, { Component, CSSProperties } from 'react'

interface iProp {
    className?: string;
    style?: CSSProperties;
    type?: string;
    tooltip?: string;
}
interface iState {}

export default class StatusTooltip extends Component<iProp, iState> {
    renderIcon(name:any) {
        switch (name) {
            case "inactive":
                return "fas fa-minus-circle";
            case "running":
                return "far fa-pause-circle";
            case "fail":
                return "far fa-times-circle";
            case "active":
                return "far fa-check-circle";
        }
    }

    render() {
        return (
            <span className={`sm-status-${this.props.type}`}>
                <i className={this.renderIcon(this.props.type)}></i>
                <span className="status-tooltip">{this.props.tooltip}</span>
            </span>
        )
    }
}
