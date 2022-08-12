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
    public class SERVICE_ORDERDao : BaseDao
    {
        //get all Service_Order
        public List<SERVICE_ORDER> GetAllSERVICE_ORDER(int pageIndex, int pageSize, SERVICE_ORDER item)
        {
            var totalString = String.Empty;
            var sql = @"SELECT 
                        enCar.NAME AS NAME_CAR, 
                        enTime.NAME AS NAME_TIMECATEGORY, 
                        enOrder.CAR_ID, 
                        enOrder.TIME_CATEGORY, 
                        enOrder.ORDER_ID, 
                        enOrder.ORDER_DURATION,  
                        enOrder.PLANSTART_DTG, 
                        enOrder.PLANEND_DTG, 
                        enOrder.ACTUALSTART_DTG, 
                        enOrder.ACTUALEND_DTG,
                        enOrder.CUSTOMER_NAME,  
                        enOrder.DESCRIPTION, 
                        enOrder.STATUS 
                      FROM SERVICE_ORDER enOrder 
                      RIGHT JOIN CAR enCar ON enCar.CAR_ID = enOrder.CAR_ID 
                      RIGHT JOIN TIMECATEGORY enTime ON enTime.TIMECARTEGORY_ID = enOrder.TIME_CATEGORY 
                      RIGHT JOIN CARCATEGORY enCategory ON enCar.CATEGORY_ID = enCategory.CARCATEGORY_ID
                      WHERE enOrder.DELETED = 0 {0} ORDER BY enOrder.ORDER_ID DESC";
                      //ORDER BY enOrder.ORDER_ID DESC";
            if (!String.IsNullOrWhiteSpace(item.CUSTOMER_NAME))
            {
                totalString += String.Format(totalString + " AND CUSTOMER_NAME COLLATE BINARY_CI LIKE '{0}'", BuildLikeFilter(item.CUSTOMER_NAME));
            }
            if (item.STATUS != null)
            {
                totalString += " AND STATUS = :STATUS";
            }
            if (item.PLANSTART_DTG != null)
            {
                totalString = String.Format(totalString + " AND TRUNC(PLANSTART_DTG) >= TO_DATE('{0:dd/MM/yyyy}','dd/mm/yyyy')", item.PLANSTART_DTG);
            }
            if (item.PLANEND_DTG != null)
            {
                totalString = String.Format(totalString + " AND TRUNC(PLANEND_DTG) <= TO_DATE('{0:dd/MM/yyyy}','dd/mm/yyyy')", item.PLANEND_DTG);
            }
            if (item.CARCATEGORY_ID != null)
            {
                totalString += " AND enCar.CATEGORY_ID = :CARCATEGORY_ID";
            }
            sql = String.Format(sql, totalString);
            OracleCommand or = new OracleCommand(sql);
            or.Parameters.Add(":STATUS", item.STATUS);
            or.Parameters.Add(":CARCATEGORY_ID", item.CARCATEGORY_ID);
            using (DataContext dataContext = new DataContext())
            {
                var count = 0;
                var query = dataContext.ExecutePaging<SERVICE_ORDER>(or, pageIndex - 1, pageSize, out count, true);
                return query;
            }
        }


        //inset Service_Order
        public int InsertSERVICE_ORDER(List<SERVICE_ORDER> items)
        {
            using (DataContext dataContext = new DataContext())
            {
                dataContext.InsertItems<SERVICE_ORDER>(items);
                return 1;
            }
        }


        //update Service_Order
        public int UpdateStatusSERVICE_ORDER(SERVICE_ORDER item)
        {
            using (DataContext dataContext = new DataContext())
            {
                dataContext.UpdateItem<SERVICE_ORDER>(item);
                return 1;
            }
        }


        //get by id Service_Order
        public SERVICE_ORDER GetByIdSERVICE_ORDER(int id)
        {
            var sql = "SELECT * FROM SERVICE_ORDER WHERE DELETED = 0 AND ORDER_ID = :id";
            OracleCommand oracleCommand = new OracleCommand(sql);
            oracleCommand.Parameters.Add(":id", id);
            using (DataContext dataContext = new DataContext())
            {
                var query = dataContext.ExecuteSelect<SERVICE_ORDER>(oracleCommand).FirstOrDefault();
                return query;
            }
        }


        //delete Service_Order
        public int DeleteSERVICE_ORDER(int id)
        {
            using (DataContext dataContext = new DataContext())
            {
                var query = dataContext.DeleteItem<SERVICE_ORDER>(id);
                return query;
            }
        }


        //gets Service_Order
        public List<SERVICE_ORDER> GetsSERVICE_ORDER()
        {
            var totalString = String.Empty;
            var sql = @"SELECT * FROM SERVICE_ORDER WHERE DELETED = 0 AND STATUS = 1";
            OracleCommand or = new OracleCommand(sql);
            using (DataContext dataContext = new DataContext())
            {
                var query = dataContext.ExecuteSelect<SERVICE_ORDER>(or);
                return query;
            }
        }
    }
}
