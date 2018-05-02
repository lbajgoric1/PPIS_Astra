using EtfDashboard.BLL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EtfDashboard.WebAPI.Controllers
{
    public class ChartsController : ApiController
    {
        private IChartService _chartService;
        public ChartsController(IChartService chartService)
        {
            _chartService = chartService;
        }

        [HttpGet]
        [Route("api/Charts/Departments")]
        public IHttpActionResult Departments()
        {
            var lista = _chartService.GetDepartments();

            return Ok(lista);
        }

        [HttpGet]
        [Route("api/Charts/Subjects")]
        public IHttpActionResult Subjects(int? godina = null, int? odsjek = null)
        {
            var lista = _chartService.GetSubjects(godina, odsjek);

            return Ok(lista);
        }

        [HttpGet]
        [Route("api/Charts/PieChart")]
        public IHttpActionResult PieChart(int? studyYear = null, int? academicYear = null)
        {
            var lista = _chartService.GetPieChartData(studyYear, academicYear);

            return Ok(lista);
        }
        [HttpGet]
        [Route("api/Charts/StudyYears")]
        public IHttpActionResult GetStudyYears()
        {
            var lista = _chartService.GetStudyYears();

            return Ok(lista);
        }
        [HttpGet]
        [Route("api/Charts/AcademicYears")]
        public IHttpActionResult GetAcademicYears()
        {
            var lista = _chartService.GetAcademicYears();

            return Ok(lista);
        }

        [HttpGet]
        [Route("api/Charts/ColumnChart")]
        public IHttpActionResult ColumnChart(int? godina = null, string ciklus = null)
        {
            var lista = _chartService.GetColumnChartData(godina, ciklus);

            return Ok(lista);
        }
    }
}
