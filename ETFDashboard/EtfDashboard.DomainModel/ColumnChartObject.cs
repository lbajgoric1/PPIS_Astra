using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EtfDashboard.DomainModel
{
   public  class ColumnChartObject
    {
        public string Name { get; set; }
        public ICollection<double> Data { get; set; }
    }
}
