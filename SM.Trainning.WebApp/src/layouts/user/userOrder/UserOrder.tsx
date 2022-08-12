import { inject, observer } from 'mobx-react';
import React, { Component } from 'react'
import ComboBox from '../../../components/ComboBox';
import DatePicker from '../../../components/DatePicker';
import SMButton from '../../../components/SMButton';
import ApiUrl from '../../../constants/ApiUrl';
import SMX from '../../../constants/SMX';
import { CARDTO } from '../../../DtoParams/Car/Car';
import { CARCATEGORYDTO } from '../../../DtoParams/CarCategory/CARCATEGORY';
import { SERVICE_ORDERDTO } from '../../../DtoParams/ServiceOrder/SERVICE_ORDER';
import CAR from '../../../entities/Car/Car';
import CARCATEGORY from '../../../entities/CarCategory/CARCATEGORY';
import { IDataManageList } from '../../../Interfaces/iData';
import OrderStore from '../../../Stores/OrderStore';
import HttpUtils from '../../../Utils/HttpUtils';
import Utility from '../../../Utils/Utility';
import ItemCar from './ItemCar';

interface IProps{
  history: any
  OrderStore?: OrderStore;
}

interface IState{
  data: Array<CAR>
  dataListCarCategory: Array<CARCATEGORY>;
  list_IDCar: number[],
  id_Category?: number
}

@inject(SMX.StoreName.OrderStore)
@observer
export default class UserOrder extends Component<IProps, IState> {
  constructor(props: IProps){
    super(props);
    this.state = {
      dataListCarCategory: [],
      data: [],
      list_IDCar: [],
      id_Category: 0
    }
  }

  async componentDidMount(){
    const res = await HttpUtils.post<CARCATEGORYDTO>(
      ApiUrl.List_Select_CarCategory,
      SMX.ApiActionCode.SetupDisplay,
      JSON.stringify({})
    )
    
    this.setState({
      dataListCarCategory: res.CARCATEGORYs || []
    })
  }

  async onSubmit(){
    const dtoResponse = new CARDTO();
    dtoResponse.id_Category = this.state.id_Category;
    dtoResponse.fromDate = Utility.ConvertToUtcDateTime(this.props.OrderStore?.planStartDTG);
    dtoResponse.toDate = Utility.ConvertToUtcDateTime(this.props.OrderStore?.planEndDTG);
    const res = await HttpUtils.post<CARDTO>(
      ApiUrl.List_Select_Car,
      SMX.ApiActionCode.SetupDisplay,
      JSON.stringify(dtoResponse)
    )

    this.setState({
      data: res.CARs || []
    })
  }

  handleOrder = () =>{
    this.props.history.push('/dat-xe/xac-nhan')  
  }

  render() {
    const { data, dataListCarCategory, id_Category } = this.state;
    const { OrderStore } = this.props
    
    return (
      <div className="layout-main">
        <div className="toolbar">
          <div className="p-toolbar-group-left">
            <h1>Đặt xe</h1>
          </div>
        </div>
        <div className='card card-w-title'>
          <div>
              <div className="row d-inline-flex">
                <div className ="col-sm-6 col-md-2 p-2">
                  <DatePicker 
                    placeholder="Bắt đầu dự định" 
                    selectedDate={OrderStore?.planStartDTG} 
                    onChange={(e)=>OrderStore?.handlePlanStartDTG(e)}    
                    required        
                    showTime
                  />
                </div>
                <div className ="col-sm-6 col-md-2 p-2">
                  <DatePicker 
                    placeholder="Kết thúc dự định" 
                    selectedDate={OrderStore?.planEndDTG} 
                    onChange={(e)=>OrderStore?.handlePlanEndDTG(e)} 
                    required
                    minDate={OrderStore?.planStartDTG}
                    showTime
                  />
                </div>
                <div className ="col-sm-6 col-md-2 p-2">
                  <ComboBox 
                    filter={false} 
                    textField="NAME" 
                    valueField="CARCATEGORY_ID" 
                    blankItemText='----- Danh mục xe -----'
                    addBlankItem={true}
                    className='sm-combobox w-100' 
                    dataSource={dataListCarCategory} 
                    onChange={(e)=>{
                      this.setState({id_Category: +e})
                    }}
                    selectedValue={id_Category === 0 ? '': id_Category?.toString()}               
                  />                  
                </div>
                <div className ="col-sm-6 col-md-2 p-2">
                  <input type='submit' value="Tìm Kiếm" className='btn-submit' onClick={()=>this.onSubmit()} />
                </div>
              </div>
          </div>
          <div className="row d-inline-flex">
              {
                data.map(item=>(
                  <ItemCar item={item} key={item.CAR_ID} handlePush_IDCar={(value: number, check: boolean)=>OrderStore?.handleList_IDCar(value, check)} />
                ))
              }
          </div>
          {
            data.length > 0 &&
            <SMButton style={{marginLeft: '8px'}} onClick={this.handleOrder}>Đặt xe</SMButton>
          }
        </div>
      </div>
    )
  }
}
