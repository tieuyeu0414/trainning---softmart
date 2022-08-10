import { inject, observer } from 'mobx-react';
import moment from 'moment';
import React, { Component } from 'react'
import ComboBox from '../../../components/ComboBox';
import DatePicker from '../../../components/DatePicker';
import SMNumericBox from '../../../components/SMNumericBox';
import Table from '../../../components/Table';
import TextArea from '../../../components/TextArea';
import TextBox from '../../../components/TextBox';
import ApiUrl from '../../../constants/ApiUrl';
import SMX from '../../../constants/SMX';
import { CARDTO } from '../../../DtoParams/Car/Car';
import { SERVICE_ORDERDTO } from '../../../DtoParams/ServiceOrder/SERVICE_ORDER';
import { TIMECATEGORYDTO } from '../../../DtoParams/TimeCategory/TIMECATEGORY';
import CAR from '../../../entities/Car/Car';
import SERVICE_ORDER from '../../../entities/ServiceOrder/SERVICE_ORDER';
import TIMECATEGORY from '../../../entities/TimeCategory/TIMECATEGORY';
import { IColumns } from '../../../Interfaces/iColumns';
import OrderStore from '../../../Stores/OrderStore';
import HttpUtils from '../../../Utils/HttpUtils';
import { formatNumberVND } from '../../../Utils/Price';
import Utility from '../../../Utils/Utility';

interface IProps{
  history: any
  OrderStore?: OrderStore;
}

interface IState{
  dataSearch?: Array<CAR>;
  serviceOrder: SERVICE_ORDER
  dataTimeCategory: Array<TIMECATEGORY>;
}

const columns: IColumns[] = [
  {
      title: "STT",
      key: 'stt',
      width: 80,
      align: 'center',
      cell: (data: CAR) => {
          return data.stt
      }
  },
  {
      title: "Loại xe",
      key: 'category',
      cell: (data: CAR) => {
          return data.NAME_CARCATEGORY
      }
  },
  {
      title: "Tên xe",
      key: 'name',
      cell: (data: CAR) => {
          return data.NAME
      }
  },
  {
      title: "Màu sắc",
      key: 'color',
      align: 'center',
      cell: (data: CAR) => {
          return data.COLOR
      }
  },
  {
      title: "Biển số xe",
      key: 'plateNumber',
      align: 'center',
      cell: (data: CAR) => {
          return data.PLATE_NUMBER
      }
  },
  {
      title: "Giá xe",
      key: 'price',
      align: 'right',
      cell: (data: CAR) => {
          return formatNumberVND(data.PRICE)
      }
  },
]

@inject(SMX.StoreName.OrderStore)
@observer
export default class Confirm extends Component<IProps, IState> {
  constructor(props: IProps){
    super(props);
    this.state = {
      dataSearch: [],
      serviceOrder: {},
      dataTimeCategory: []
    }
  }

  async componentDidMount(){
    //select Car
    const dtoResponse = new CARDTO()
    dtoResponse.listID = this.props.OrderStore?.list_IDCar;
    const res = await HttpUtils.post<CARDTO>(
      ApiUrl.Search_ListID_Car,
      SMX.ApiActionCode.SetupDisplay,
      JSON.stringify(dtoResponse)
    )
    let check = res.CARs ?? []
    if(check?.length > 0){
      this.setState({
        dataSearch: res.CARs?.map((item, index)=>({...item, stt: index + 1, key: item.CAR_ID}))
      })
    }
    else{
      this.props.history.push('/')
    }

    //select TimeCategory
    const resTime = await HttpUtils.post<TIMECATEGORYDTO>(
      ApiUrl.List_Select_TimeCategory,
      SMX.ApiActionCode.SetupDisplay,
      JSON.stringify({})
    )
    
    this.setState({
      dataTimeCategory: resTime.TIMECATEGORies || []
    })

    const { serviceOrder } = this.state
    serviceOrder.PLANSTART_DTG = this.props.OrderStore?.planStartDTG;
    serviceOrder.PLANEND_DTG = this.props.OrderStore?.planEndDTG;
    serviceOrder.LIST_ID = this.props.OrderStore?.list_IDCar;
    serviceOrder.TIME_CATEGORY = 1;
    this.setState({serviceOrder})
  }

  async onSubmit(){
    const dtoResponse = new SERVICE_ORDERDTO();
    dtoResponse.SERVICE_ORDER = this.state.serviceOrder;
    await HttpUtils.post<SERVICE_ORDERDTO>(
      ApiUrl.Insert_ServiceOrder,
      SMX.ApiActionCode.AddNewItem,
      JSON.stringify(dtoResponse)
    )
    alert("Đã đặt xe");
    this.props.history.push('/')
    this.props.OrderStore?.handlePlanEndDTG(undefined)
    this.props.OrderStore?.handlePlanStartDTG(undefined)
    this.props.OrderStore?.handleList_IDCar(0) 
  }
  render() {  
    
    const { 
      dataSearch, 
      serviceOrder,
      dataTimeCategory 
    } = this.state;
    
    return (
      <div className="layout-main">
        <div className="toolbar">
          <div className="p-toolbar-group-left">
            <h1>Xác nhận đặt xe</h1>
          </div>
          <div className="p-toolbar-group-right">
              <button className="sm-button" 
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
                onClick={()=>{
                  this.props.history.push('/')
                  this.props.OrderStore?.handlePlanEndDTG(undefined)
                  this.props.OrderStore?.handlePlanStartDTG(undefined)
                  this.props.OrderStore?.handleList_IDCar(0)
                }}
              >
                <i className="fas fa-arrow-left mr-1"></i>
                Quay lại
              </button>
            </div>
        </div>
        <div className='card card-w-title'>
          <div className='d-inline-flex row' style={{justifyContent: 'space-between'}}>
            <div className ="col-lg-3 col-12 p-2">
              <div className="grid-category confirm-grid"  style={{justifyContent: 'center'}}>

                  <div className="grid-item">
                    <label>Đơn vị thời gian</label>
                    <ComboBox 
                      filter={false} 
                      textField="NAME" 
                      valueField="TIMECARTEGORY_ID" 
                      className='sm-combobox w-100 text-area' 
                      dataSource={dataTimeCategory} 
                      onChange={(e)=>{
                        serviceOrder.TIME_CATEGORY = +e
                        this.setState({serviceOrder})
                      }}
                      selectedValue={serviceOrder.TIME_CATEGORY?.toString()}
                    />
                  </div>
                  <div className="grid-item">
                    <label>Số thời gian thuê</label>
                    <SMNumericBox 
                      className='text-box' 
                      value={serviceOrder.ORDER_DURATION} 
                      onChange={(e)=>{
                        serviceOrder.ORDER_DURATION = e;
                        this.setState({serviceOrder})
                      }} 
                      required={true}
                    />
                  </div>
                  <div className="grid-item">
                    <label>Thời gian bắt đầu</label>
                    <DatePicker 
                      selectedDate={serviceOrder.PLANSTART_DTG} 
                      onChange={(e)=>{
                        serviceOrder.PLANSTART_DTG = Utility.ConvertToUtcDateTime(e);
                        this.setState({serviceOrder})
                      }} 
                      required={true}
                    />
                  </div>
                  <div className="grid-item">
                    <label>Thời gian kết thúc</label>
                    <DatePicker 
                      selectedDate={serviceOrder.PLANEND_DTG} 
                      onChange={(e)=>{
                        serviceOrder.PLANEND_DTG = Utility.ConvertToUtcDateTime(e);
                        this.setState({serviceOrder})
                      }} 
                      minDate={serviceOrder.PLANEND_DTG}
                      required={true}
                    />
                  </div>
                  <div className="grid-item">
                    <label>Tên khách hàng</label>
                    <TextBox 
                      className='text-box' 
                      value={serviceOrder.CUSTOMER_NAME} 
                      onChange={(e)=>{
                        serviceOrder.CUSTOMER_NAME = e.currentTarget.value;
                        this.setState({serviceOrder})
                      }} 
                      required
                    />
                  </div>

                <div className="grid-item custom-textarea">
                  <label>Mô tả</label>
                  <TextArea 
                    className='text-area' 
                    rows={8} 
                    value={serviceOrder.DESCRIPTION} 
                    onChange={(e)=>{
                      serviceOrder.DESCRIPTION = e.currentTarget.value;
                      this.setState({serviceOrder})
                    }} 
                  />
                </div>
                
                <div className="grid-item">
                  <input type='submit' value="Xác nhận" className='btn-submit' onClick={()=>this.onSubmit()} />
                </div>
              </div>
            </div>
            <div className ="col-xl-8 col-lg-7 col-12 p-2">
              <Table columns={columns} data={dataSearch}  />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
