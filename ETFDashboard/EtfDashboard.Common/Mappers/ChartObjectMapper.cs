using EtfDashboard.DomainModel;
using EtfDashboard.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EtfDashboard.Common.Mappers
{
   public static class ChartObjectMapper
    {
        public static PieChartObjectModel MapChartObjectToChartObjectModel(this PieChartObject chartObject)
        {
            if (chartObject == null)
            {
                return null;
            }
            return new PieChartObjectModel
            {
                Name = chartObject.Name,
                Y = chartObject.Y
            };

        }
    }
}
