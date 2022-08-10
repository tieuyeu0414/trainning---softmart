import React, { Component, PureComponent } from 'react'
import { Link } from 'react-router-dom';
import ErrorHandler from '../../../components/ErrorHandler';
import LoadingModal from '../../../components/LoadingModal';
import SMButton from '../../../components/SMButton';
import Table from '../../../components/Table'
import TableFilter from '../../../components/TableFilter'
import ApiUrl from '../../../constants/ApiUrl';
import SMX from '../../../constants/SMX';
import { CARCATEGORYDTO } from '../../../DtoParams/CarCategory/CARCATEGORY';
import CARCATEGORY from '../../../entities/CarCategory/CARCATEGORY';
import { IDataManageCategory } from '../../../Interfaces/iData';
import HttpUtils from '../../../Utils/HttpUtils';
import { columns } from './constants/Columns';

interface IState{
  dataList?: Array<CARCATEGORY>,
  pageIndex: number,
  pageSize: number
}

export default class ManageCategory extends PureComponent<any, IState> {
  constructor(props: any){
    super(props);
    this.state = {
      dataList: [],
      pageIndex: 1,
      pageSize: 5
    }
  }

  async componentDidMount(){
    LoadingModal.showLoading();
        try {
            await this.setUpDisplay();
        }
        catch (ex) {
            ErrorHandler.HandlerException(ex);
        }
        LoadingModal.hideLoading();
  }

  async setUpDisplay() {
    const response = await HttpUtils.post<CARCATEGORYDTO>(
      ApiUrl.Get_All_CarCategory,
      SMX.ApiActionCode.SetupDisplay,
      JSON.stringify(this.state)
    )
    
    this.setState({
      dataList: response.CARCATEGORYs?.map((item, index)=>({
        ...item, 
        key: item.CARCATEGORY_ID,
        stt: index + 1,
        action_delete: ()=>this.handleDelete(item.CARCATEGORY_ID),
        action_update: ()=>this.handleUpdate(item.CARCATEGORY_ID)
      }))
    })

}

async handleDelete (id?: number) {
  if(window.confirm(`Bạn có muốn xóa dữ liệu có id = ${id} không`) === true){
    const request = new CARCATEGORYDTO();
    request.id = id;
    await HttpUtils.post<CARCATEGORYDTO>(
      ApiUrl.Delete_CarCategory,
      SMX.ApiActionCode.DeleteItem,
      JSON.stringify(request)
    )
    this.setUpDisplay()
  } 
}

handleUpdate (id?: number | string) {
  this.props.history.push(`/quan-ly/loai-xe/cap-nhat/${id}`)
}

  // onSearch(){

  // }
  // onReload(){}
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
              <h1>Quản lý danh mục xe</h1>
            </div>
          </div>
          <div className='card card-w-title'>
            <SMButton><Link to={`/quan-ly/loai-xe/them-moi`}>Thêm mới</Link></SMButton>
            {/* <TableFilter onSearch={this.onSearch} onReload={this.onReload} /> */}
            <Table columns={columns} data={dataList} handlePagination={this.handlePagination} />
          </div>
        </div>
    )
  }
}
