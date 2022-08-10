import React, { Component } from 'react'
import CheckBox from '../../../components/CheckBox';
import { formatNumberVND } from '../../../Utils/Price';

interface IProps{
    item: any,
    handlePush_IDCar: (value: number, check: boolean) => void,
    
}

interface IState{
    checked: boolean
}

export default class ItemCar extends Component<IProps, IState> {
    constructor(props: IProps){
        super(props);
        this.state = {
            checked: false
        }
    }

    handleCheckBox = () => {
        let checkFake = !this.state.checked;
        this.setState({ checked: !this.state.checked })
        if(checkFake){
            this.props.handlePush_IDCar(this.props.item.CAR_ID, checkFake)
        }
        else{
            this.props.handlePush_IDCar(this.props.item.CAR_ID, checkFake)
        }
    }

    render() {
        const { item } = this.props;
        const { checked } = this.state;
        return (
            <div className ="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
                <div className="card">
                <div className='d-flex'>
                    <h4 className="card-title">{item.NAME}</h4>
                    <CheckBox 
                        checked={checked} 
                        onChange={this.handleCheckBox} 
                    />
                </div>
                <p className="card-text">Giá: {formatNumberVND(item.PRICE)}</p>
                <p className="card-text">Màu: {item.COLOR}</p>
                <p className="card-text">Biển số: {item.PLATE_NUMBER}</p>
                </div>
            </div>
        )
    }
}
