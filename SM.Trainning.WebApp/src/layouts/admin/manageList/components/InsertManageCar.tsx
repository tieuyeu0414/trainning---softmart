import React, { Component } from 'react'
import ComboBox from '../../../../components/ComboBox'
import SMNumericBox from '../../../../components/SMNumericBox'
import TextArea from '../../../../components/TextArea'
import TextBox from '../../../../components/TextBox'
import ApiUrl from '../../../../constants/ApiUrl'
import SMX from '../../../../constants/SMX'
import { CARDTO } from '../../../../DtoParams/Car/Car'
import { CARCATEGORYDTO } from '../../../../DtoParams/CarCategory/CARCATEGORY'
import CAR from '../../../../entities/Car/Car'
import CARCATEGORY from '../../../../entities/CarCategory/CARCATEGORY'
import HttpUtils from '../../../../Utils/HttpUtils'

interface IState{
  dataListCarCategory: Array<CARCATEGORY>,
  car: CAR
}

export default class InsertManageCar extends Component<any, IState> {
  constructor(props: any){
    super(props);
    this.state = {
      dataListCarCategory: [],
      car: {}
    }
  }

  async onSubmit(){
    const id = this.props.match.params.id;
    const dtoResponse = new CARDTO();
    dtoResponse.CAR = this.state.car
    if(!id){
      if(this.state.car.CATEGORY_ID !== 0) {
        await HttpUtils.post<CARDTO>(
          ApiUrl.Insert_Car,
          SMX.ApiActionCode.AddNewItem,
          JSON.stringify(dtoResponse)
        )
          alert("đã thêm");
          this.props.history.push('/quan-ly/danh-sach-xe');
      }
      else{
        alert("Hãy chọn loại xe");
      }
    }
    else{
      await HttpUtils.post<CARDTO>(
        ApiUrl.Update_Car,
        SMX.ApiActionCode.UpdateItem,
        JSON.stringify(dtoResponse)
      )
      alert("đã cập nhật");
      this.props.history.push('/quan-ly/danh-sach-xe')
    }
  }

  async componentDidMount(){
    const id = this.props.match.params.id;
    const dtoResponse = new CARDTO()
    dtoResponse.id = id;
    if(id){
      const res = await HttpUtils.post<CARDTO>(
        ApiUrl.Get_By_Id_Car,
        SMX.ApiActionCode.SetupEditForm,
        JSON.stringify(dtoResponse)
      )
      this.setState({ car: res.CAR || {} })
    }

    const res = await HttpUtils.post<CARCATEGORYDTO>(
      ApiUrl.List_Select_CarCategory,
      SMX.ApiActionCode.SetupDisplay,
      JSON.stringify(this.state)
    )
    this.setState({
      dataListCarCategory: res.CARCATEGORYs || []
    })
  }

  render() {
    const id = this.props.match.params.id;
    const { car, dataListCarCategory } = this.state;

    return (
      <div className="layout-main">
          <div className="toolbar">
            <div className="p-toolbar-group-left">
              <h1>{id?"Cập nhật":"Thêm mới"}</h1>
            </div>
            <div className="p-toolbar-group-right">
              <button className="sm-button" 
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
                onClick={()=>{this.props.history.push('/quan-ly/danh-sach-xe')}}
              >
                <i className="fas fa-arrow-left mr-1"></i>
                Quay lại
              </button>
            </div>
          </div>
          <div className='card card-w-title'>
              <div className="grid-category" style={{justifyContent: 'center', textAlign: 'right'}}>
                <div className="grid-car">
                  <div className="grid-item">
                    <label>Danh mục xe</label>
                    <ComboBox 
                      filter={false} 
                      textField="NAME" 
                      valueField="CARCATEGORY_ID" 
                      blankItemText='----- Danh mục xe -----'
                      addBlankItem={true}
                      className='sm-combobox w-100 text-area' 
                      dataSource={dataListCarCategory} 
                      onChange={(e)=>{
                        car.CATEGORY_ID = +e
                        this.setState({car})
                      }}
                      selectedValue={car.CATEGORY_ID === 0 ? '': car.CATEGORY_ID?.toString()}
                    />
                  </div>
                  <div className="grid-item">
                    <label>Tên xe</label>
                    <TextBox 
                      className='text-box' 
                      name='name' 
                      onChange={(e) => {
                        car.NAME = e.currentTarget.value
                        this.setState({car})
                      }} 
                      value={car.NAME || ''} 
                      required 
                    />
                  </div>
                  <div className="grid-item">
                    <label>Màu sắc</label>
                    <TextBox 
                      className='text-box' 
                      name='color' 
                      onChange={(e) => {
                        car.COLOR = e.currentTarget.value
                        this.setState({car})
                      }} 
                      value={car.COLOR || ''}
                    />
                  </div>
                  <div className="grid-item">
                    <label>Biển số xe</label>
                    <TextBox 
                      className='text-box' 
                      name='plate_number' 
                      onChange={(e) => {
                        car.PLATE_NUMBER = e.currentTarget.value
                        this.setState({car})
                      }} 
                      value={car.PLATE_NUMBER || ''}
                      required 
                      disabled={id ? true: false}
                    />
                  </div>
                  <div className="grid-item">
                    <label>Giá tiền</label>
                    <SMNumericBox 
                      className='text-box' 
                      onChange={(e) => {
                        car.PRICE = e
                        this.setState({car})
                      }} 
                      value={car.PRICE || 0} 
                    />
                  </div>
                </div>
                <div className="grid-item custom-textarea">
                  <label>Mô tả</label>
                  <TextArea 
                    className='text-area' 
                    rows={8} 
                    name='description' 
                    onChange={(e) => {
                      car.DESCRIPTION = e.currentTarget.value
                      this.setState({car})
                    }} 
                    value={car.DESCRIPTION || ''}
                  />
                </div>
                
                <div className="grid-item">
                  <input type='submit' value={id?"Cập nhật":"Thêm"} className='btn-submit' onClick={()=>this.onSubmit()} />
                </div>              
              </div>
          </div>
        </div>
    )
  }
}
