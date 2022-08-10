import moment from "moment";
import React from "react";
import SERVICE_ORDER from "../../../../entities/ServiceOrder/SERVICE_ORDER";
import { IColumns } from "../../../../Interfaces/iColumns";
import { IDataManageOrder } from "../../../../Interfaces/iData";
import { formatNumber } from "../../../../Utils/Price";
import Action from "./Action";


export const columns: IColumns[] = [
    {
        title: "STT",
        key: 'stt',
        align: 'center',
        cell: (data: SERVICE_ORDER) => {
            return data.stt
        }
    },
    {
        title: "Xe",
        key: 'car',
        cell: (data: SERVICE_ORDER) => {
            return data.NAME_CAR
        }
    },
    {
        title: "Tên khách hàng",
        key: 'customerName',
        cell: (data: SERVICE_ORDER) => {
            return data.CUSTOMER_NAME
        }
    },
    {
        title: "Đơn vị thời gian",
        key: 'timeCategory',
        align: 'center',
        cell: (data: SERVICE_ORDER) => {
            return data.NAME_TIMECATEGORY
        }
    },
    {
        title: "Thời gian thuê",
        key: 'orderDuration',
        align: 'right',
        cell: (data: SERVICE_ORDER) => {
            return formatNumber(data.ORDER_DURATION)
        }
    },
    {
        title: "Bắt đầu - kết thúc",
        key: 'planStartDTG',
        align: 'center',
        cell: (data: SERVICE_ORDER) => {
            return <div>{moment(data.PLANSTART_DTG).format('DD-MM-YYYY')} - {moment(data.PLANEND_DTG).format('DD-MM-YYYY')}</div>
        }
    },
    {
        title: "Thực tế thuê - trả",
        key: 'actualStartDTG',
        align: 'center',
        cell: (data: SERVICE_ORDER) => {
            return <div>{moment(data.ACTUALSTART_DTG).format('DD-MM-YYYY')} - {moment(data.ACTUALEND_DTG).format('DD-MM-YYYY')}</div>
        }
    },
    {
        title: "Trạng thái",
        key: 'status',
        align: 'center',
        cell: (data: SERVICE_ORDER) => {
            return data.STATUS === 1 ? 'Đang đặt' : data.STATUS === 2 ? "Đang sử dụng" : "Đã trả"
        }
    },
    {
        title: "Mô tả",
        key: 'description',
        cell: (data: SERVICE_ORDER) => {
            return data.DESCRIPTION
        }
    },
    {
        title: "Thao tác",
        key: 'action',
        align: 'center',
        cell: (data: SERVICE_ORDER) => {
            return (
                <Action data={data} />
            )
        }
    },
]