import React, { Component } from 'react'
import TextArea from '../../../../components/TextArea'
import TextBox from '../../../../components/TextBox'
import ApiUrl from '../../../../constants/ApiUrl'
import SMX from '../../../../constants/SMX'
import { TIMECATEGORYDTO } from '../../../../DtoParams/TimeCategory/TIMECATEGORY'
import TIMECATEGORY from '../../../../entities/TimeCategory/TIMECATEGORY'
import HttpUtils from '../../../../Utils/HttpUtils'

interface IState{
  timeCategory: TIMECATEGORY
}

export default class InsertManageTime extends Component<any, IState> {
  constructor(props: any){
    super(props);
    this.state = {
      timeCategory: {}
    }
  }
  async onSubmit(){    
    const id = this.props.match.params.id;
    const dtoResponse = new TIMECATEGORYDTO();
    dtoResponse.TIMECATEGORY = this.state.timeCategory;
    if(!id){
      await HttpUtils.post<TIMECATEGORYDTO>(
        ApiUrl.Insert_TimeCategory,
        SMX.ApiActionCode.AddNewItem,
        JSON.stringify(dtoResponse)
      )
      alert("đã thêm");
      this.props.history.push('/quan-ly/don-vi-thoi-gian-thue')
    }
    else{
      await HttpUtils.post<any>(
        ApiUrl.Update_TimeCategory,
        SMX.ApiActionCode.UpdateItem,
        JSON.stringify(dtoResponse)
      )
      alert("đã cập nhật");
      this.props.history.push('/quan-ly/don-vi-thoi-gian-thue')
    }
  }

  async componentDidMount(){
    const id = this.props.match.params.id;
    const dtoResponse = new TIMECATEGORYDTO()
    dtoResponse.id = id;
    if(id){
      const reponse = await HttpUtils.post<TIMECATEGORYDTO>(
        ApiUrl.Get_By_Id_TimeCategory,
        SMX.ApiActionCode.SetupEditForm,
        JSON.stringify(dtoResponse)
      )

      this.setState({timeCategory: reponse.TIMECATEGORY || {}})
    }
  }

  render() {
    const id = this.props.match.params.id;
    const { timeCategory } = this.state;
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
                onClick={()=>{this.props.history.push('/quan-ly/don-vi-thoi-gian-thue')}}
              >
                <i className="fas fa-arrow-left mr-1"></i>
                Quay lại
              </button>
            </div>
          </div>
          <div className='card card-w-title'>
              <div className="grid-category">
                <div className="grid-item">
                  <label>Tên thời gian</label>
                  <TextBox 
                    className='text-box' 
                    name="name" 
                    onChange={(e)=>{
                      timeCategory.NAME = e.currentTarget.value;
                      this.setState({timeCategory})
                    }} 
                    value={timeCategory.NAME || ''} 
                    required 
                  />
                </div>
                <div className="grid-item">
                  <label>Mô tả</label>
                  <TextArea 
                    className='text-area' 
                    name="description" 
                    onChange={(e)=>{
                      timeCategory.DESCRIPTION = e.currentTarget.value;
                      this.setState({timeCategory})
                    }} 
                    value={timeCategory.DESCRIPTION || ''} 
                    rows={10} 
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
