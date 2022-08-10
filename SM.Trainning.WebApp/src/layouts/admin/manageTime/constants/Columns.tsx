import React from "react";
import TIMECATEGORY from "../../../../entities/TimeCategory/TIMECATEGORY";
import { IColumns } from "../../../../Interfaces/iColumns";


export const columns: IColumns[] = [
    {
        title: "STT",
        key: 'stt',
        width: 100,
        align: 'center',
        cell: (data: TIMECATEGORY) => {
            return data.stt
        }
    },
    {
        title: "Tên thời gian thuê",
        key: 'name',
        width: 500,
        cell: (data: TIMECATEGORY) => {
            return data.NAME
        }
    },
    {
        title: "Mô tả",
        key: 'description',
        cell: (data: TIMECATEGORY) => {
            return data.DESCRIPTION
        }
    },
    {
        title: "Thao tác",
        key: 'action',
        width: 100,
        align: 'center',
        cell: (data: TIMECATEGORY) => {
            return (
                <div className="d-inline-flex">                 
                    <div className="mr-3 icon-action" title="Sửa" onClick={data.action_update}><i className="fas fa-pen"></i></div>
                    <div className="icon-action" title="Xóa" onClick={data.action_delete}><i className="fas fa-trash"></i></div>
                </div>
            )
        }
    },
]