import React, { Component } from 'react'
import { IColumns } from '../Interfaces/iColumns'
import SMButton from './SMButton';

interface ITableProps{
    columns: IColumns[],
    data: any,
    handlePagination?: (e?: any) => void;

}

export default class Table extends Component<ITableProps, {}> {
    
    render() {
        const { columns, data, handlePagination } = this.props;

        return (
            <div className='h-datatable allow-fixheader'>
                <table className="table table-data-list">
                    {/* <colgroup>
                        <col width="6%" />
                        <col width="15%" />
                        <col width="15%" />
                        <col width="20%" />
                        <col />
                    </colgroup> */}
                    <thead>
                        <tr>
                            {columns.map(item=>{
                                return (
                                    <th style={{width: item.width}} key={item.key}>{item.title}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((item: { key: React.Key | null | undefined; }, index: string | number)=>(
                                <tr key={item.key}>
                                    {
                                        columns.map((row)=> {
                                            return (
                                                <td 
                                                    style={{
                                                        textAlign: row.align
                                                    }} 
                                                    key={row.key}
                                                >
                                                    {row.cell ? row?.cell(data[index]) : ''}
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="pagination">
                    <SMButton onClick={handlePagination}>Xem Thêm</SMButton>
                </div>
            </div>
        )
    }
}
