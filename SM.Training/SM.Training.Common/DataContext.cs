namespace SM.Training.Common
{
    public class DataContext : SoftMart.Core.Dao.EnterpriseService
    {
        public DataContext()
            : base("Data Source=(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=192.168.2.134)(PORT=1521))(CONNECT_DATA=(SID=orcl)));User Id=long123;Password=Long;")
        {
        }
        public DataContext(string connectionString)
        : base(connectionString)
        {
        }
    }
}
