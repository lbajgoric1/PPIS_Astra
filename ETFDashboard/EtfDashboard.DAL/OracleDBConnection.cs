using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EtfDashboard.DAL
{
    public class OracleDBConnection
    {
        public OracleConnection OpenConnection()
        {
            OracleConnection connection = new OracleConnection();

            try
            {
                string constring = "Data Source=" +
               " (DESCRIPTION =(ADDRESS_LIST =(ADDRESS = (PROTOCOL = TCP)(HOST = 80.65.65.66)(PORT = 1521)))(CONNECT_DATA =(SID = etflab)));User Id=BP21;password=wP78eev7;";
                connection.ConnectionString = constring;
                connection.Open();
            }
            catch { }
            return connection;
        }
    }
}
