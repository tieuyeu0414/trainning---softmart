import React, { Component } from 'react'
import SERVICE_ORDER from '../../../../entities/ServiceOrder/SERVICE_ORDER';

interface IState {
    displayAction: boolean
}

interface IProps {
    data: SERVICE_ORDER,
}

export default class Action extends Component<IProps, IState> {
    constructor(props: IProps){
        super(props);
        this.state = {
            displayAction: false
        }
    }
    render() {
        const { displayAction } = this.state
        const { data } = this.props
        return (
        <div className='action'>
            <div className='icon-action' onClick={()=>this.setState({displayAction: !displayAction})}>
                <i className="fa fa-ellipsis-v"></i>
            </div>
            {
                displayAction && 
                <div className="popupAction">
                    {/* xác nhận giao xe */}
                    {
                        data.STATUS === 1 &&
                        <>
                            <div className='item-action' onClick={data.handleConfirmStatus}>
                                <i className="fas fa-check" style={{color: 'green'}}></i>
                                <span>Giao xe</span>
                            </div>

                            {/* hủy đơn */}
                            <div className='item-action' onClick={data.handleDelete}>
                                <i className="fas fa-times" style={{color: 'red'}}></i>
                                <span>Hủy đơn</span>
                            </div>
                        </>
                    }
                    {/* trả xe */}
                    {
                        data.STATUS === 2 &&
                        <div className='item-action' onClick={data.handleRedoStatus}>
                            <i className="fas fa-redo" style={{color: 'gold'}}></i>
                            <span>Nhận lại</span>
                        </div>
                    }
                    {/* cập nhật */}
                    {
                        data.STATUS !== 3 &&
                        <div className='item-action' onClick={data.handleUpdateTime}>
                            <i className="fas fa-pen" style={{color: 'darkblue'}}></i>
                            <span>Cập nhật</span>
                        </div>
                    }
                    
                </div>
            }
        </div>
        )
    }
}
