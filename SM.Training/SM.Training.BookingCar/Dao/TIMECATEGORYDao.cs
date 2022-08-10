using Oracle.ManagedDataAccess.Client;
using SM.Training.Common;
using SM.Training.SharedComponent.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SM.Training.BookingCar.Dao
{
    public class TIMECATEGORYDao
    {
        //get all TimeCategory
        public List<TIMECATEGORY> GetAllTIMECATEGORY(int pageIndex, int pageSize)
        {
            var sql = "SELECT * FROM TIMECATEGORY WHERE DELETED = 0 ORDER BY TIMECARTEGORY_ID DESC";
            OracleCommand or = new OracleCommand(sql);
            using (DataContext dataContext = new DataContext())
            {
                var count = 0;
                var query = dataContext.ExecutePaging<TIMECATEGORY>(or, pageIndex - 1, pageSize, out count, true);
                return query;
            }
        }


        //get by id TimeCategory
        public TIMECATEGORY GetByIdTIMECATEGORY(int id)
        {
            var sql = "SELECT * FROM TIMECATEGORY WHERE DELETED = 0 AND TIMECARTEGORY_ID = :timeCategory_id";
            OracleCommand or = new OracleCommand(sql);
            or.Parameters.Add("timeCategory_id", id);
            using (DataContext dataContext = new DataContext())
            {
                var query = dataContext.ExecuteSelect<TIMECATEGORY>(or).FirstOrDefault();
                return query;
            }
        }


        //insert TimeCategory
        public int InsertTIMECATEGORY(TIMECATEGORY item)
        {
            using (DataContext dataContext = new DataContext())
            {
                dataContext.InsertItem<TIMECATEGORY>(item);
                return 1;
            }
        }


        //update TimeCategory
        public int  UpdateTIMECATEGORY(TIMECATEGORY item)
        {
            using (DataContext dataContext = new DataContext())
            {
                var query = dataContext.UpdateItem<TIMECATEGORY>(item);
                return query;
            }
        }


        //get all TimeCategory - select
        public List<TIMECATEGORY> GetAllSelectTIMECATEGORY()
        {
            var sql = "SELECT * FROM TIMECATEGORY WHERE DELETED = 0 ORDER BY TIMECARTEGORY_ID ASC";
            OracleCommand or = new OracleCommand(sql);
            using (DataContext dataContext = new DataContext())
            {

                var query = dataContext.ExecuteSelect<TIMECATEGORY>(or);
                return query;
            }
        }
    }
}
