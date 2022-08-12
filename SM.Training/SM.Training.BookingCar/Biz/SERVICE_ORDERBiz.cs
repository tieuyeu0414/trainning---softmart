using SM.Training.BookingCar.Dao;
using SM.Training.SharedComponent.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SM.Training.BookingCar.Biz
{
    public class SERVICE_ORDERBiz
    {
        //get all Service_Order
        public (List<SERVICE_ORDER> orders, object obj) GetAllSERVICE_ORDER(int pageIndex, int pageSize, SERVICE_ORDER item)
        {
            SERVICE_ORDERDao dao = new SERVICE_ORDERDao();
            var lstItem = dao.GetAllSERVICE_ORDER(pageIndex, pageSize, item);
            return (lstItem, null);
        }


        //get by id Service_Order
        public (SERVICE_ORDER order, object obj) GetByIdSERVICE_ORDER(int id)
        {
            SERVICE_ORDERDao dao = new SERVICE_ORDERDao();
            var item = dao.GetByIdSERVICE_ORDER(id);
            return (item, null);
        }


        //inset Service_Order
        public (SERVICE_ORDER order, int itemData) InsertSERVICE_ORDER(SERVICE_ORDER item)
        {
            SERVICE_ORDERDao dao = new SERVICE_ORDERDao();


            List<SERVICE_ORDER> orders = new List<SERVICE_ORDER>();

            foreach (var x in item.LIST_ID)
            {
                SERVICE_ORDER orderClone = new SERVICE_ORDER();
                orderClone.CAR_ID = x;
                orderClone.CUSTOMER_NAME = item.CUSTOMER_NAME;
                orderClone.PLANSTART_DTG = item.PLANSTART_DTG;
                orderClone.PLANEND_DTG = item.PLANEND_DTG;
                orderClone.TIME_CATEGORY = item.TIME_CATEGORY;
                orderClone.ACTUALEND_DTG = item.PLANEND_DTG;
                orderClone.ACTUALSTART_DTG = item.PLANSTART_DTG;
                orderClone.DESCRIPTION = item.DESCRIPTION;
                orderClone.ORDER_DURATION = item.ORDER_DURATION;

                orderClone.STATUS = 1;
                orderClone.DELETED = 0;
                orderClone.VERSION = 1;
                orderClone.CREATEDBY = "Admin";
                orderClone.CREATEDDTG = DateTime.Now;
                orders.Add(orderClone);
            }

            var itemData = dao.InsertSERVICE_ORDER(orders);
            return (null, itemData);
        }


        //updateStatus Service_Order
        public (SERVICE_ORDER order, int itemData) UpdateStatusSERVICE_ORDER(SERVICE_ORDER item, string type)
        {
            SERVICE_ORDERDao dao = new SERVICE_ORDERDao();

            if (type == "XAC_NHAN")
            {
                item.STATUS = 2;
            }
            else if (type == "DA_TRA")
            {
                item.STATUS = 3;
            }
            item.UPDATEDBY = "Admin";
            item.UPDATEDDTG = DateTime.Now;

            var itemData = dao.UpdateStatusSERVICE_ORDER(item);
            return (null, itemData);
        }


        //updateTime Service_Order
        public (SERVICE_ORDER order, int itemData) UpdateTimeSERVICE_ORDER(SERVICE_ORDER item)
        {
            SERVICE_ORDERDao dao = new SERVICE_ORDERDao();
            SERVICE_ORDER order = new SERVICE_ORDER();

            var itemAdd = dao.GetByIdSERVICE_ORDER((int)item.ORDER_ID);

            if (itemAdd.STATUS == 2)
            {
                order.ORDER_ID = item.ORDER_ID;
                order.ACTUALEND_DTG = item.ACTUALEND_DTG;
            }
            else if (itemAdd.STATUS == 1)
            {
                order.ORDER_ID = item.ORDER_ID;
                order.ACTUALSTART_DTG = item.ACTUALSTART_DTG;
                order.ACTUALEND_DTG = item.ACTUALEND_DTG;
            }
            order.UPDATEDBY = "Admin";
            order.UPDATEDDTG = DateTime.Now;

            var itemData = dao.UpdateStatusSERVICE_ORDER(order);
            return (null, itemData);
        }


        //delete Service_Order
        public (SERVICE_ORDER order, int itemData) DeleteSERVICE_ORDER(int id)
        {
            SERVICE_ORDERDao dao = new SERVICE_ORDERDao();

            var itemData = dao.DeleteSERVICE_ORDER(id);
            return (null, itemData);
        }


        //auto delete Service_Order
        public (int number, object obj) AutoDeleteSERVICE_ORDER()
        {
            SERVICE_ORDERDao dao = new SERVICE_ORDERDao();

            var x = dao.GetsSERVICE_ORDER();
           
            foreach (var item in x)
            {
                DateTime checkTime = new DateTime();
                DateTime ngaymuon = Convert.ToDateTime(item.CREATEDDTG);
                DateTime ngaytra = Convert.ToDateTime(checkTime);
                TimeSpan Time = ngaytra - ngaymuon;
                int TongSoNgay = Time.Minutes;

                if (TongSoNgay == 15)
                {
                    dao.DeleteSERVICE_ORDER((int)item.ORDER_ID);
                }
            }
            return (1, null);
        }
    }
}
