import React, { Component } from 'react'
import TextArea from '../../../../components/TextArea'
import TextBox from '../../../../components/TextBox'
import ApiUrl from '../../../../constants/ApiUrl'
import SMX from '../../../../constants/SMX'
import { CARCATEGORYDTO } from '../../../../DtoParams/CarCategory/CARCATEGORY'
import CARCATEGORY from '../../../../entities/CarCategory/CARCATEGORY'
import HttpUtils from '../../../../Utils/HttpUtils'

interface IState{
  carCategory: CARCATEGORY
}

export default class InsertManageCategory extends Component<any, IState> {
  constructor(props: any){
    super(props);
    this.state = {
      carCategory: {}
    }
  }
  async onSubmit(){
    
    const id = this.props.match.params.id;
    const dtoResponse = new CARCATEGORYDTO();
    dtoResponse.CARCATEGORY = this.state.carCategory
    if(!id){
      await HttpUtils.post<CARCATEGORYDTO>(
        ApiUrl.Insert_CarCategory,
        SMX.ApiActionCode.AddNewItem,
        JSON.stringify(dtoResponse)
      )

          alert("đã thêm");
          // this.setState({
          //   carCategory: {
          //     NAME: '',
          //     DESCRIPTION: ''
          //   }
          // })
          this.props.history.push(`/quan-ly/loai-xe`)
    }
    else{
      await HttpUtils.post<CARCATEGORYDTO>(
        ApiUrl.Update_CarCategory,
        SMX.ApiActionCode.UpdateItem,
        JSON.stringify(dtoResponse)
      )
      alert("đã cập nhật");
      this.props.history.push(`/quan-ly/loai-xe`)
    }
  }

  async componentDidMount(){
    const id = this.props.match.params.id;
    if(id){
      const request = new CARCATEGORYDTO();
      request.id = id;      
      const reponse = await HttpUtils.post<CARCATEGORYDTO>(
        ApiUrl.Get_By_Id_CarCategory,
        SMX.ApiActionCode.SetupEditForm,
        JSON.stringify(request)
      )
      
      this.setState({
        carCategory: reponse.CARCATEGORY || {}
      })
    }
  }

  render() {
    const id = this.props.match.params.id;
    const { carCategory } = this.state;
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
                onClick={()=>{this.props.history.push('/quan-ly/loai-xe')}}
              >
                <i className="fas fa-arrow-left mr-1"></i>
                Quay lại
              </button>
            </div>
          </div>
          <div className='card card-w-title'>
              <div className="grid-category">
                <div className="grid-item">
                  <label>Tên loại xe</label>
                  <TextBox 
                    className='text-box' 
                    name="name" 
                    onChange={(e)=>{
                      carCategory.NAME = e.currentTarget.value
                      this.setState({ carCategory })
                    }} 
                    required 
                    value={carCategory?.NAME} 
                  />
                </div>
                <div className="grid-item">
                  <label>Mô tả</label>
                  <TextArea 
                    className='text-area' 
                    name="description" 
                    onChange={(e)=>{
                      carCategory.DESCRIPTION = e.currentTarget.value
                      this.setState({ carCategory })
                    }}  
                    rows={10} 
                    value={carCategory?.DESCRIPTION} 
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
