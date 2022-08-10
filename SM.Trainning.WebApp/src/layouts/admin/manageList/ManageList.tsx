import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import SMButton from '../../../components/SMButton';
import Table from '../../../components/Table'
import TableFilter from '../../../components/TableFilter'
import ApiUrl from '../../../constants/ApiUrl';
import SMX from '../../../constants/SMX';
import { CARDTO } from '../../../DtoParams/Car/Car';
import CAR from '../../../entities/Car/Car';
import { IDataManageList } from '../../../Interfaces/iData';
import HttpUtils from '../../../Utils/HttpUtils';
import { columns } from './constants/Columns';

interface IState{
  dataList?: Array<CAR>,
  pageIndex: number,
  pageSize: number
}

export default class ManageList extends Component<any, IState> {
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
    const dtoResponse = new CARDTO()
    dtoResponse.pageIndex = this.state.pageIndex;
    dtoResponse.pageSize = this.state.pageSize;
    const response = await HttpUtils.post<CARDTO>(
      ApiUrl.Get_All_Car,
      SMX.ApiActionCode.SetupDisplay,
      JSON.stringify(dtoResponse)
    )

    this.setState({
      dataList: response.CARs?.map((item, index)=>({
        ...item, 
        key: item.CAR_ID,
        stt: index + 1,
        action_delete: ()=>this.handleDelete(item.CAR_ID),
        action_update: ()=>this.handleUpdate(item.CAR_ID)
      }))
    })
}

async handleDelete (id?: number) {
  if(window.confirm(`Bạn có muốn xóa dữ liệu có id = ${id} không`) === true){
    const dtoResponse = new CARDTO()
    dtoResponse.id = id;
    await HttpUtils.post<CARDTO>(
      ApiUrl.Delete_Car,
      SMX.ApiActionCode.DeleteItem,
      JSON.stringify(dtoResponse)
    )
    this.setUpDisplay()
  }  
}

handleUpdate (id?: number | string) {
  this.props.history.push(`/quan-ly/danh-sach-xe/cap-nhat/${id}`)
  
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
                <h1>Quản lý danh sách xe</h1>
              </div>
            </div>
            <div className='card card-w-title'>
              <SMButton><Link to={`/quan-ly/danh-sach-xe/them-moi`}>Thêm mới</Link></SMButton>
              {/* <TableFilter onSearch={this.onSearch} onReload={this.onReload} /> */}
              <Table columns={columns} data={dataList} handlePagination={this.handlePagination} />
            </div>
        </div>
    )
  }
}
