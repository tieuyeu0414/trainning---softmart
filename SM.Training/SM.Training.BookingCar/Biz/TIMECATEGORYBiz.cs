using SM.Training.BookingCar.Dao;
using SM.Training.SharedComponent.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SM.Training.BookingCar.Biz
{
    public class TIMECATEGORYBiz
    {
        //get all TimeCategory
        public (List<TIMECATEGORY> timeCategories, object obj) GetAllTIMECATEGORY(int pageIndex, int pageSize)
        {
            TIMECATEGORYDao dao = new TIMECATEGORYDao();
            var lstItem = dao.GetAllTIMECATEGORY(pageIndex, pageSize);
            return (lstItem, null);
        }


        //get by id TimeCategory
        public (TIMECATEGORY timeCategory, object obj) GetByIdTIMECATEGORY(int id)
        {
            TIMECATEGORYDao dao = new TIMECATEGORYDao();
            var item = dao.GetByIdTIMECATEGORY(id);
            return (item, null);
        }


        //inset TimeCategory
        public (TIMECATEGORY timeCategory, int itemData) InsertTIMECATEGORY(TIMECATEGORY item)
        {
            TIMECATEGORYDao dao = new TIMECATEGORYDao();

            item.DELETED = 0;
            item.VERSION = 1;
            item.CREATEDBY = "Admin";
            item.CREATEDDTG = DateTime.Now;

            var itemData = dao.InsertTIMECATEGORY(item);
            return (null, itemData);
        }


        //update TimeCategory
        public (TIMECATEGORY timeCategory, int itemData) UpdateTIMECATEGORY(TIMECATEGORY item)
        {
            TIMECATEGORYDao dao = new TIMECATEGORYDao();

            item.UPDATEDBY = "Admin";
            item.UPDATEDDTG = DateTime.Now;
            var itemData = dao.UpdateTIMECATEGORY(item);
            return (null, itemData);
        }


        //delete TimeCategory
        public (TIMECATEGORY timeCategory, int itemData) DeleteTIMECATEGORY(int id)
        {
            TIMECATEGORYDao dao = new TIMECATEGORYDao();
            var itemAdd = dao.GetByIdTIMECATEGORY(id);

            itemAdd.DELETED = 1;
            itemAdd.UPDATEDBY = "Admin";
            itemAdd.UPDATEDDTG = DateTime.Now;
            var itemData = dao.UpdateTIMECATEGORY(itemAdd);
            return (null, itemData);
        }


        //get all CarCategory - select
        public (List<TIMECATEGORY> timeCategories, object obj) GetAllSelectTIMECATEGORY()
        {
            TIMECATEGORYDao dao = new TIMECATEGORYDao();
            var lstItem = dao.GetAllSelectTIMECATEGORY();
            return (lstItem, null);
        }
    }
}
