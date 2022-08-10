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
    public class CARCATEGORYDao
    {
        //get all CarCategory
        public List<CARCATEGORY> GetAllCARCATEGORY(int pageIndex, int pageSize)
        {
            var sql = "SELECT * FROM CARCATEGORY WHERE DELETED = 0 ORDER BY CARCATEGORY_ID DESC";
            OracleCommand or = new OracleCommand(sql);
            using (DataContext dataContext = new DataContext())
            {
                var count = 0;
                var query = dataContext.ExecutePaging<CARCATEGORY>(or, pageIndex - 1, pageSize, out count, true);
                return query;
            }
        }


        //get by id CarCategory
        public CARCATEGORY GetByIdCARCATEGORY(int id)
        {
            var sql = "SELECT * FROM CARCATEGORY WHERE DELETED = 0 AND CARCATEGORY_ID = :id";
            OracleCommand oracleCommand = new OracleCommand(sql);
            oracleCommand.Parameters.Add(":id", id);
            using (DataContext dataContext = new DataContext())
            {
                var query = dataContext.ExecuteSelect<CARCATEGORY>(oracleCommand).FirstOrDefault();
                return query;
            }
        }


        //insert CarCategory
        public int InsertCARCATEGORY(CARCATEGORY item)
        {
            using (DataContext dataContext = new DataContext())
            {
                dataContext.InsertItem<CARCATEGORY>(item);
                return 1;
            }
        }


        //update CarCategory
        public int UpdateCARCATEGORY(CARCATEGORY item)
        {
            using (DataContext dataContext = new DataContext())
            {
                var query = dataContext.UpdateItem<CARCATEGORY>(item);
                return query;
            }
        }


        //get all CarCategory - select
        public List<CARCATEGORY> GetAllSelectCARCATEGORY()
        {
            var sql = "SELECT NAME, CARCATEGORY_ID FROM CARCATEGORY WHERE DELETED = 0 ORDER BY CARCATEGORY_ID ASC";
            using (DataContext dataContext = new DataContext())
            {
                var query = dataContext.ExecuteSelect<CARCATEGORY>(sql);
                return query;
            }
        }
    }
}
