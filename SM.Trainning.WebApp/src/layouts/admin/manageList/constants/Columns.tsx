import React from "react";
import CAR from "../../../../entities/Car/Car";
import { IColumns } from "../../../../Interfaces/iColumns";
import { formatNumberVND } from "../../../../Utils/Price";


export const columns: IColumns[] = [
    {
        title: "STT",
        key: 'stt',
        width: 80,
        align: 'center',
        cell: (data: CAR) => {
            return data.stt
        }
    },
    {
        title: "Loại xe",
        key: 'category',
        cell: (data: CAR) => {
            return data.NAME_CARCATEGORY
        }
    },
    {
        title: "Tên xe",
        key: 'name',
        cell: (data: CAR) => {
            return data.NAME
        }
    },
    {
        title: "Màu sắc",
        key: 'color',
        align: 'center',
        cell: (data: CAR) => {
            return data.COLOR
        }
    },
    {
        title: "Biển số xe",
        key: 'plateNumber',
        align: 'center',
        cell: (data: CAR) => {
            return data.PLATE_NUMBER
        }
    },
    {
        title: "Giá xe",
        key: 'price',
        align: 'right',
        cell: (data: CAR) => {
            return formatNumberVND(data.PRICE)
        }
    },
    {
        title: "Mô tả",
        key: 'description',
        width: 500,
        cell: (data: CAR) => {
            return data.DESCRIPTION
        }
    },
    {
        title: "Thao tác",
        key: 'action',
        width: 100,
        align: 'center',
        cell: (data: CAR) => {
            return (
                <div className="d-inline-flex">                 
                    <div className="mr-3 icon-action" title="Sửa" onClick={data.action_update}><i className="fas fa-pen"></i></div>
                    <div className="icon-action" title="Xóa" onClick={data.action_delete}><i className="fas fa-trash"></i></div>
                </div>
            )
        }
    },
]