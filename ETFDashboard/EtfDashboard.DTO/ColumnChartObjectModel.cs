using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EtfDashboard.DTO
{
   public  class ColumnChartObjectModel
    {
        public string Name { get; set; }
        public ICollection<double> Data { get; set; }
    }
}
