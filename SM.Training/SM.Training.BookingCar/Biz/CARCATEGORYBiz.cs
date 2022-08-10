using SM.Training.BookingCar.Dao;
using SM.Training.SharedComponent.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SM.Training.BookingCar.Biz
{
    public class CARCATEGORYBiz
    {
        //get all CarCategory
        public (List<CARCATEGORY> CarCategorys, object obj) GetAllCARCATEGORY(int pageIndex, int pageSize)
        {
            CARCATEGORYDao dao = new CARCATEGORYDao();
            var listItem = dao.GetAllCARCATEGORY(pageIndex, pageSize);
            return (listItem, null);
        }


        //get by id CarCategory
        public (CARCATEGORY CarCategory, object obj) GetByIdCARCATEGORY(int id)
        {
            CARCATEGORYDao dao = new CARCATEGORYDao();
            var item = dao.GetByIdCARCATEGORY(id);
            return (item, null);
        }


        //inset CarCategory
        public (CARCATEGORY CarCategory, int itemData) InsertCARCATEGORY(CARCATEGORY item)
        {
            CARCATEGORYDao dao = new CARCATEGORYDao();

            item.DELETED = 0;
            item.VERSION = 1;
            item.CREATEDBY = "Admin";
            item.CREATEDDTG = DateTime.Now;
            var itemData = dao.InsertCARCATEGORY(item);
            return (null, itemData);
        }


        //update CarCategory
        public (CARCATEGORY CarCategory, int itemData) UpdateCARCATEGORY(CARCATEGORY item)
        {
            CARCATEGORYDao dao = new CARCATEGORYDao();
            item.UPDATEDBY = "Admin";
            item.UPDATEDDTG = DateTime.Now;
            var itemData = dao.UpdateCARCATEGORY(item);
            return (null, itemData);
        }


        //delete CarCategory
        public (CARCATEGORY CarCategory, int itemData) DeleteCARCATEGORY(int id)
        {
            CARCATEGORYDao dao = new CARCATEGORYDao();
            var itemAdd = dao.GetByIdCARCATEGORY(id);

            itemAdd.DELETED = 1;
            itemAdd.UPDATEDBY = "Admin";
            itemAdd.UPDATEDDTG = DateTime.Now;
            var itemData = dao.UpdateCARCATEGORY(itemAdd);
            return (null, itemData);
        }


        //get all CarCategory - select
        public (List<CARCATEGORY> CarCategorys, object obj) GetAllSelectCARCATEGORY()
        {
            CARCATEGORYDao dao = new CARCATEGORYDao();
            var listItem = dao.GetAllSelectCARCATEGORY();
            return (listItem, null);
        }
    }
}
