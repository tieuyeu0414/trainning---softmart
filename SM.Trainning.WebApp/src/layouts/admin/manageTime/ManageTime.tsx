import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import SMButton from '../../../components/SMButton';
import Table from '../../../components/Table';
import ApiUrl from '../../../constants/ApiUrl';
import SMX from '../../../constants/SMX';
import { TIMECATEGORYDTO } from '../../../DtoParams/TimeCategory/TIMECATEGORY';
import TIMECATEGORY from '../../../entities/TimeCategory/TIMECATEGORY';
import HttpUtils from '../../../Utils/HttpUtils';
import { columns } from './constants/Columns';

interface IState{
  dataList?: Array<TIMECATEGORY>,
  pageIndex: number,
  pageSize: number
}

export default class ManageTime extends Component<any, IState> {
  constructor(props: any){
    super(props);
    this.state = {
      dataList: [],
      pageIndex: 1,
      pageSize: 10
    }
  }

  async componentDidMount(){
    await this.setUpDisplay();
  }

  async setUpDisplay() {
    const dtoResponse = new TIMECATEGORYDTO();
    dtoResponse.pageIndex = this.state.pageIndex;
    dtoResponse.pageSize = this.state.pageSize;
    const res = await HttpUtils.post<TIMECATEGORYDTO>(
      ApiUrl.Get_All_TimeCategory,
      SMX.ApiActionCode.SetupDisplay,
      JSON.stringify(dtoResponse)
    )

    this.setState({
      dataList: res.TIMECATEGORies?.map((item, index)=>({
        ...item, 
        key: item.TIMECARTEGORY_ID,
        stt: index + 1,
        action_delete: ()=>this.handleDelete(item.TIMECARTEGORY_ID),
        action_update: ()=>this.handleUpdate(item.TIMECARTEGORY_ID)
      }))
    })
}

async handleDelete (id?: number) {
  if(window.confirm(`Bạn có muốn xóa dữ liệu có id = ${id} không`) === true){
    const dtoResponse = new TIMECATEGORYDTO();
    dtoResponse.id = id;
    await HttpUtils.post<TIMECATEGORYDTO>(
      ApiUrl.Delete_TimeCategory,
      SMX.ApiActionCode.DeleteItem,
      JSON.stringify(dtoResponse)
    )
    this.setUpDisplay()
  }  
}

handleUpdate (id?: number | string) {
  this.props.history.push(`/quan-ly/don-vi-thoi-gian-thue/cap-nhat/${id}`)
  
}

handlePagination = () => {
  this.setState({
    pageSize: this.state.pageSize + 5
  })

  setTimeout(()=>{
    this.setUpDisplay();
  })

}

  render() {
    const { dataList } = this.state;
    return (
        <div className="layout-main">
            <div className="toolbar">
              <div className="p-toolbar-group-left">
                <h1>Quản lý đơn vị thời gian</h1>
              </div>
            </div>
            <div className='card card-w-title'>
            <SMButton><Link to={`/quan-ly/don-vi-thoi-gian-thue/them-moi`}>Thêm mới</Link></SMButton>
              {/* <TableFilter onSearch={this.onSearch} onReload={this.onReload} /> */}
              <Table columns={columns} data={dataList} handlePagination={this.handlePagination} />
            </div>
        </div>
    )
  }
}
