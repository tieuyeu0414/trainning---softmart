using SM.Training.BookingCar.Dao;
using SM.Training.SharedComponent.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SM.Training.BookingCar.Biz
{
    public class CARBiz
    {
        //get all CarCategory
        public (List<CAR> cars, object obj) GetAllCAR(int pageIndex, int pageSize)
        {
            CARDao dao = new CARDao();
            var lstItem = dao.GetAllCar(pageIndex, pageSize);
            return (lstItem, null);
        }


        //get by id CarCategory
        public (CAR car, object obj) GetByIdCAR(int id)
        {
            CARDao dao = new CARDao();
            var item = dao.GetByIdCAR(id);
            return (item, null);
        }


        //inset CarCategory
        public (CAR car, int itemData) InsertCAR(CAR item)
        {
            CARDao dao = new CARDao();

            item.DELETED = 0;
            item.VERSION = 1;
            item.CREATEDBY = "Admin";
            item.CREATEDDTG = DateTime.Now;
            var itemData = dao.InsertCAR(item);
            return (null, itemData);
        }


        //update CarCategory
        public (CAR car, int itemData) UpdateCAR(CAR item)
        {
            CARDao dao = new CARDao();

            item.UPDATEDBY = "Admin";
            item.UPDATEDDTG = DateTime.Now;
            var itemData = dao.UpdateCAR(item);
            return (null, itemData);
        }


        //delete CarCategory
        public (CAR car, int itemData) DeleteCAR(int id)
        {
            CARDao dao = new CARDao();
            var itemAdd = dao.GetByIdCAR(id);

            itemAdd.DELETED = 1;
            itemAdd.UPDATEDBY = "Admin";
            itemAdd.UPDATEDDTG = DateTime.Now;
            var itemData = dao.UpdateCAR(itemAdd);
            return (null, itemData);
        }


        //get all Car - select

        public (List<CAR> cars, object obj) GetAllSelectCAR(int id_Category, DateTime fromDate, DateTime toDate)
        {
            CARDao dao = new CARDao();
            List<int> listNumber = new List<int>();
            listNumber.Add(0);
            var x = dao.GetAllSelectSERVICE_ORDER(fromDate, toDate);
            foreach (var item in x)
            {
                listNumber.Add((int)item.CAR_ID);
            }
            var lstItem = dao.GetAllSelectCAR(id_Category, listNumber);
            return (lstItem, null);
        }


        //search list id Car - select
        public (List<CAR> cars, object obj) SearchIdCAR(List<int> listID)
        {
            CARDao dao = new CARDao();
            var lstItem = dao.SearchIdCAR(listID);
            return (lstItem, null);
        }
    }
}
