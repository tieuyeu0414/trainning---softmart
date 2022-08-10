import { Popup } from 'leaflet';
import moment from 'moment';
import React, { Component } from 'react'
import ComboBox from '../../../components/ComboBox';
import DatePicker from '../../../components/DatePicker';
import PopupDialog from '../../../components/PopupDialog';
import SMButton from '../../../components/SMButton';
import Table from '../../../components/Table';
import TableFilter from '../../../components/TableFilter';
import TextBox from '../../../components/TextBox';
import ApiUrl from '../../../constants/ApiUrl';
import SMX from '../../../constants/SMX';
import { CARCATEGORYDTO } from '../../../DtoParams/CarCategory/CARCATEGORY';
import { SERVICE_ORDERDTO } from '../../../DtoParams/ServiceOrder/SERVICE_ORDER';
import CARCATEGORY from '../../../entities/CarCategory/CARCATEGORY';
import SERVICE_ORDER from '../../../entities/ServiceOrder/SERVICE_ORDER';
import { IDataManageOrder } from '../../../Interfaces/iData';
import HttpUtils from '../../../Utils/HttpUtils';
import Utility from '../../../Utils/Utility';
import { columns } from './constants/Columns';

const dataStatus = [
  {value: 1, label: "Đang đặt"},
  {value: 2, label: "Đang sử dụng"},
  {value: 3, label: "Đã trả"},
]

interface IState{
  dataList: Array<SERVICE_ORDER>,
  pageIndex: number,
  pageSize: number,
  dataListCarCategory: Array<CARCATEGORY>;
  order: SERVICE_ORDER,
  orderUpdate: SERVICE_ORDER,
  isPopup: boolean
}

export default class ManageOrder extends Component<{}, IState> {
  constructor(props: any){
    super(props);
    this.state = {
      dataList: [],
      pageSize: 10,
      pageIndex: 1,
      order: {},
      dataListCarCategory: [],
      isPopup: false,
      orderUpdate: {}
    }
  }

  async componentDidMount(){
    await this.setUpDisplay();
      
    const res = await HttpUtils.post<CARCATEGORYDTO>(
      ApiUrl.List_Select_CarCategory,
      SMX.ApiActionCode.SetupDisplay,
      JSON.stringify({})
    )
    
    this.setState({
      dataListCarCategory: res.CARCATEGORYs || []
    })
  }

  async setUpDisplay(){
    const dtoResponse = new SERVICE_ORDERDTO()
    dtoResponse.pageIndex = this.state.pageIndex;
    dtoResponse.pageSize = this.state.pageSize;
    dtoResponse.SERVICE_ORDER = this.state.order;
    const res = await HttpUtils.post<SERVICE_ORDERDTO>(
      ApiUrl.Get_All_ServiceOrder,
      SMX.ApiActionCode.SetupDisplay,
      JSON.stringify(dtoResponse)
    )
    this.setState({
      dataList: res.SERVICE_ORDERs?.map((item, index) => ({
        ...item, 
        key: item.ORDER_ID,
        stt: index + 1,
        handleConfirmStatus: () => this.handleUpdateStatus(item, "XAC_NHAN"),
        handleRedoStatus: () => this.handleUpdateStatus(item, "DA_TRA"),
        handleDelete: () => this.handleDelete(item.ORDER_ID),
        handleUpdateTime: () => this.handleUpdateTime(item)
      })) || []
    })
  }

  async onSearch(){
    await this.setUpDisplay();
  }

  async onReset(){
    const clear = new SERVICE_ORDER();
    clear.CUSTOMER_NAME = ''
    clear.STATUS = null
    clear.CARCATEGORY_ID = null
    await this.setState({order: clear})

    await this.setUpDisplay();
  }

  handlePagination () {
    this.setState({
      pageSize: this.state.pageSize + 5
    })

    setTimeout(()=>{
      this.setUpDisplay();
    })
  }

  async handleUpdateStatus(item, type){
    if(window.confirm(`Bạn có muốn ${type==="XAC_NHAN"?"giao xe": "nhận lại xe"} không`) === true){
      const dtoResponse = new SERVICE_ORDERDTO()
      dtoResponse.SERVICE_ORDER = item;
      dtoResponse.type = type;
      await HttpUtils.post<SERVICE_ORDERDTO>(
        ApiUrl.updateStatus_ServiceOrder,
        SMX.ApiActionCode.UpdateItem,
        JSON.stringify(dtoResponse)
      )
      await this.setUpDisplay()
    }    
  }

  async handleDelete (id){
    if(window.confirm(`Bạn có muốn hủy đơn ${id} không`) === true){
      const dtoResponse = new SERVICE_ORDERDTO()
      dtoResponse.id = id;
      await HttpUtils.post<SERVICE_ORDERDTO>(
        ApiUrl.delete_ServiceOrder,
        SMX.ApiActionCode.DeleteItem,
        JSON.stringify(dtoResponse)
      )
      await this.setUpDisplay()
    } 
  }

  handleUpdateTime (item) {    
    this.setState({
      isPopup: true,
      orderUpdate: item
    })
  }

  async onUpdate () {
    const dtoResponse = new SERVICE_ORDERDTO()
    dtoResponse.SERVICE_ORDER = this.state.orderUpdate;
      await HttpUtils.post<SERVICE_ORDERDTO>(
        ApiUrl.updateTime_ServiceOrder,
        SMX.ApiActionCode.UpdateItem,
        JSON.stringify(dtoResponse)
      )
      await this.setUpDisplay()
      this.setState({
        isPopup: false,
      })
  }

  render() {
    const { dataList, order, dataListCarCategory, isPopup, orderUpdate } = this.state;
    return (
        <div className="layout-main">
            <div className="toolbar">
              <div className="p-toolbar-group-left">
                <h1>Quản lý đặt xe</h1>
              </div>
            </div>
            <div className='card card-w-title'>
              <div style={{width: '40%', margin: '0 auto'}}>
                <div className="row d-inline-flex">
                  <div className ="col-sm-6 p-2 ">
                    <TextBox 
                      className='sm-textbox w-100' 
                      placeholder='Tên khách hàng'
                      onChange={(e)=>{
                        order.CUSTOMER_NAME = e.currentTarget.value
                        this.setState({order})
                      }}
                      value={order.CUSTOMER_NAME}
                    />
                  </div>
                  <div className ="col-sm-6 p-2">
                    <ComboBox 
                      filter={false} 
                      textField="label" 
                      valueField="value" 
                      blankItemText='----- Trạng thái -----'
                      addBlankItem={true}
                      className='sm-combobox w-100' 
                      dataSource={dataStatus} 
                      onChange={(e)=>{
                        order.STATUS = +e === 0 ? null : +e
                        this.setState({order})
                      }}
                      selectedValue={order.STATUS === null ? '': order.STATUS?.toString()}               
                    /> 
                  </div>
                  <div className ="col-sm-6 p-2">
                    <DatePicker
                      placeholder="Thời gian bắt đầu" 
                      selectedDate={order.PLANSTART_DTG} 
                      onChange={(e)=>{
                        order.PLANSTART_DTG = Utility.ConvertToUtcDateTime(e)
                        this.setState({order})
                      }}    
                    />
                  </div>
                  <div className ="col-sm-6 p-2">
                  <DatePicker
                      placeholder="Thời gian kết thúc" 
                      selectedDate={order.PLANEND_DTG} 
                      onChange={(e)=>{
                        order.PLANEND_DTG = Utility.ConvertToUtcDateTime(e)
                        this.setState({order})
                      }}    
                    />
                  </div>
                  <div className ="col-sm-6 p-2">
                    <ComboBox 
                      filter={false} 
                      textField="NAME" 
                      valueField="CARCATEGORY_ID" 
                      blankItemText='----- Danh mục xe -----'
                      addBlankItem={true}
                      className='sm-combobox w-100' 
                      dataSource={dataListCarCategory} 
                      onChange={(e)=>{
                        order.CARCATEGORY_ID = +e === 0 ? null : +e
                        this.setState({order})
                      }}
                      selectedValue={order.CARCATEGORY_ID === null ? '': order.CARCATEGORY_ID?.toString()}               
                    />    
                  </div>
                  <div className ="col-12 p-2">
                    <div style={{whiteSpace: "nowrap", textAlign: 'center'}}>
                      <SMButton className="sm-button margin-right-5" onClick={()=>this.onSearch()}>
                        <i className="fas fa-search"></i> Tìm kiếm 
                      </SMButton>
                      <SMButton className="sm-button" onClick={()=>this.onReset()}>
                        <i className="fas fa-sync"></i> Reset 
                      </SMButton>
                    </div>
                  </div>
                </div>
              </div>
              <Table columns={columns} data={dataList} handlePagination={()=>this.handlePagination()} />
            </div>

            {/* popup */}
            {
              isPopup &&
              <PopupDialog 
                onClose={()=>this.setState({isPopup: false})}
                header="Cập nhật"
                contentContainerStyle={{height: '200px'}}
              >
                <div>
                  <label>Thời gian bắt đầu thuê</label>
                  <DatePicker 
                    selectedDate={orderUpdate?.ACTUALSTART_DTG} 
                    onChange={(e)=>{
                      orderUpdate.ACTUALSTART_DTG = Utility.ConvertToUtcDateTime(e)
                      this.setState({orderUpdate})
                    }} 
                  />
                </div>
                <br/>
                <div>
                  <label>Thời gian kết thúc thuê</label>
                  <DatePicker 
                    selectedDate={orderUpdate?.ACTUALEND_DTG} 
                    onChange={(e)=>{
                      orderUpdate.ACTUALEND_DTG = Utility.ConvertToUtcDateTime(e)
                      this.setState({orderUpdate})
                    }} 
                  />
                </div>
                <br/>
                <div style={{textAlign: 'right'}}>
                  <SMButton onClick={()=>this.onUpdate()}>Cập nhật</SMButton>
                </div>
              </PopupDialog>
            }
        </div>
    )
  }
}
