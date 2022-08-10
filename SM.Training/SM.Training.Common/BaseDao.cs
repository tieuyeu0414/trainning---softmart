using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SM.Training.Common
{
    public abstract class BaseDao
    {
        protected string BuildLikeFilter(string keyword)
        {
            if (string.IsNullOrWhiteSpace(keyword))
                return null;
            return string.Format("%{0}%", keyword.Trim());
        }

        protected string BuildInCondition(List<int> lstValue)
        {
            if (lstValue == null || lstValue.Count == 0)
            {
                return "null";
            }
            else
            {
                return string.Join(", ", lstValue.ToArray());
            }
        }

        protected string BuildInCondition(List<decimal> lstValue)
        {
            if (lstValue.Count == 0)
            {
                return "null";
            }
            else
            {
                return string.Join(", ", lstValue.ToArray());
            }
        }

        protected string BuildInCondition(List<string> lstValue)
        {
            if (lstValue.Count == 0)
            {
                return "null";
            }
            else
            {
                string result = string.Empty;
                string separator = string.Empty;

                foreach (string item in lstValue)
                {
                    if (!string.IsNullOrWhiteSpace(item))
                    {
                        result += separator + "'" + item.Trim().Replace("'", "''") + "'";
                        separator = ",";
                    }
                }
                return result;
            }
        }
    }
}

