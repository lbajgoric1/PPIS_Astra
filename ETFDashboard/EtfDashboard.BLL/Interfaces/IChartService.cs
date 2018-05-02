using EtfDashboard.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EtfDashboard.BLL.Interfaces
{
    public interface IChartService
    {
        ICollection<PieChartObjectModel> GetPieChartData(int? studyYear = null, int? academicYear = null);
        ICollection<ColumnChartObjectModel> GetColumnChartData(int? godina = null, string ciklus = null);
        ICollection<StudyYearModel> GetStudyYears();
        ICollection<AcademicYearModel> GetAcademicYears();
        ICollection<DepartmentModel> GetDepartments();
        ICollection<SubjectModel> GetSubjects(int? studyYearId = null, int? departmentID = null);
        ICollection<PassScoreModel> GetPassScore(int? studyYearId = null, int? departmentID = null, int? courseId = null);
    }
}
