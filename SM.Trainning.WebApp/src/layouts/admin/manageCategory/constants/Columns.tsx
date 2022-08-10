import React from "react";
import CARCATEGORY from "../../../../entities/CarCategory/CARCATEGORY";
import { IColumns } from "../../../../Interfaces/iColumns";

export const columns: IColumns[] = [
    {
        title: "STT",
        key: 'stt',
        align: 'center',
        width: 80,
        cell: (data: CARCATEGORY) => {
            return data?.stt
        }
    },
    {
        title: "Tên loại xe",
        key: 'name',
        width: 200,
        cell: (data: CARCATEGORY) => {
            return data?.NAME
        }
    },
    {
        title: "Mô tả",
        key: 'description',
        cell: (data: CARCATEGORY) => {
            return data?.DESCRIPTION
        }
    },
    {
        title: "Thao tác",
        key: 'action',
        align: 'center',
        width: 100,
        cell: (data: CARCATEGORY) => {
            return (
                <div className="d-inline-flex">                 
                    <div className="mr-3 icon-action" title="Sửa" onClick={data.action_update}><i className="fas fa-pen"></i></div>
                    <div className="icon-action" title="Xóa" onClick={data.action_delete}><i className="fas fa-trash"></i></div>
                </div>
            )
        }
    },
]