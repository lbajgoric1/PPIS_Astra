using EtfDashboard.BLL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EtfDashboard.DTO;
using Oracle.ManagedDataAccess.Client;
using EtfDashboard.DAL;

namespace EtfDashboard.BLL.Services
{
    public class ChartService : IChartService
    {
        private OracleDBConnection _context = new OracleDBConnection();
        public ICollection<PieChartObjectModel> GetPieChartData(int? studyYear = null, int? academicYear = null)
        {
            ICollection<PieChartObjectModel> lista = new List<PieChartObjectModel>();
            try
            {
                OracleConnection connection = _context.OpenConnection();
                OracleCommand cmd = connection.CreateCommand();
                cmd.CommandText = "SELECT Count(*) as Broj,t4.title Smjer FROM BP07.User_Enrollment t1"
                + " JOIN BP07.LabGroup t2 ON t1.LabGroupId = t2.Id"
                + " JOIN BP07.Course_Department t3 ON t2.Course_DepartmentId = t3.Id"
                + " JOIN BP07.Department t4 ON t3.DepartmentId = t4.id"
                + " WHERE t1.studyyearid ='" + studyYear.ToString() + "' AND t3.academicyearid = '" + academicYear.ToString() + "'"
                + " GROUP BY t4.title";
                OracleDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    int broj = reader.GetInt32(0);
                    string smjer = reader.GetString(1);
                    PieChartObjectModel o = new PieChartObjectModel { Name = smjer, Y = broj };
                    lista.Add(o);
                }
                return lista;
            }
            catch (Exception e)
            {

            }
            return null;
        }
        public ICollection<ColumnChartObjectModel> GetColumnChartData(int? godina = null, string ciklus = null)
        {
            try
            {
                ICollection<Double> lista1 = new List<Double>();
                lista1.Add(10);//januar
                lista1.Add(20);//jul
                lista1.Add(30);//decembar
                ICollection<Double> lista2 = new List<Double>();
                lista2.Add(25);//januar
                lista2.Add(25);//jul
                lista2.Add(50);//decembar
                ICollection<Double> lista3 = new List<Double>();
                lista3.Add(15);//januar
                lista3.Add(15);//jul
                lista3.Add(70);//decembar
                ColumnChartObjectModel o1 = new ColumnChartObjectModel { Name = "RI", Data = lista1 };
                ColumnChartObjectModel o2 = new ColumnChartObjectModel { Name = "AIE", Data = lista2 };
                ColumnChartObjectModel o3 = new ColumnChartObjectModel { Name = "EE", Data = lista3 };
                ColumnChartObjectModel o4 = new ColumnChartObjectModel { Name = "TK", Data = lista1 };
                ICollection<ColumnChartObjectModel> lista = new List<ColumnChartObjectModel>();
                lista.Add(o1);
                lista.Add(o2);
                lista.Add(o3);
                lista.Add(o4);
                return lista;
            }
            catch (Exception e)
            {
                return null;
            //    throw new Exception("Error: " + e.Message);
            }
        }

        public ICollection<StudyYearModel> GetStudyYears()
        {
            ICollection<StudyYearModel> lista = new List<StudyYearModel>();
            try
            {
                OracleConnection connection = _context.OpenConnection();
                OracleCommand cmd = connection.CreateCommand();
                cmd.CommandText = "Select id, title from BP07.studyyear";
                OracleDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    int yearId = reader.GetInt32(0);
                    string title = reader.GetString(1);
                    StudyYearModel studyYear = new StudyYearModel { ID = yearId, Title = title };
                    lista.Add(studyYear);
                }
                return lista;
            }
            catch (Exception e)
            {
                return null;
                //throw new Exception("Error: " + e.Message);
            }
        }
        public ICollection<AcademicYearModel> GetAcademicYears()
        {
            ICollection<AcademicYearModel> lista = new List<AcademicYearModel>();
            try
            {
                OracleConnection connection = _context.OpenConnection();
                OracleCommand cmd = connection.CreateCommand();
                cmd.CommandText = "Select id, title from BP07.AcademicYear order by id";
                OracleDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    int yearId = reader.GetInt32(0);
                    string title = reader.GetString(1);
                    AcademicYearModel academicYear = new AcademicYearModel { ID = yearId, Title = title };
                    lista.Add(academicYear);
                }
                return lista;
            }
            catch (Exception e)
            {
                return null; 
                //throw new Exception("Error: " + e.Message);
            }
        }

        public ICollection<DepartmentModel> GetDepartments()
        {
            ICollection<DepartmentModel> lista = new List<DepartmentModel>();
            try
            {
                OracleConnection connection = _context.OpenConnection();
                OracleCommand cmd = connection.CreateCommand();
                cmd.CommandText = "Select id, title from BP07.Department";
                OracleDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    int id = reader.GetInt32(0);
                    string title = reader.GetString(1);
                    DepartmentModel department = new DepartmentModel { ID = id, Title = title };
                    lista.Add(department);
                }
                return lista;
            }
            catch (Exception e)
            {
                return null;
              //  throw new Exception("Error: " + e.Message);
            }
        }

        public ICollection<SubjectModel> GetSubjects(int? studyYearId = default(int?), int? departmentID = default(int?))
        {
            ICollection<SubjectModel> lista = new List<SubjectModel>();
            try
            {
                OracleConnection connection = _context.OpenConnection();
                OracleCommand cmd = connection.CreateCommand();
                cmd.CommandText = "SELECT Distinct t5.id,t5.title  FROM BP07.User_Enrollment t1"
                                   + " JOIN BP07.LabGroup t2 ON t1.LabGroupId = t2.Id"
                                   + " JOIN BP07.Course_Department t3 ON t2.Course_DepartmentId = t3.Id"
                                   + " JOIN BP07.Department t4 ON t3.DepartmentId = t4.id"
                                   + " JOIN BP07.Course t5 ON t5.Id = t3.CourseId"
                                   + " WHERE t1.studyyearid = '" + studyYearId + "' AND t3.departmentId ='" + departmentID + "'";

                OracleDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    int id = reader.GetInt32(0);
                    string naziv = reader.GetString(1);
                    SubjectModel s = new SubjectModel { ID = id, Title = naziv };
                    lista.Add(s);
                }
                return lista;
            }
            catch (Exception e)
            {
                return null;
              //  throw new Exception("Error: " + e.Message);
            }
        }

        public ICollection<PassScoreModel> GetPassScore(int? studyYearId = default(int?), int? departmentID = default(int?), int? courseId = default(int?))
        {
            ICollection<PassScoreModel> lista = new List<PassScoreModel>();
            try
            {
                OracleConnection connection = _context.OpenConnection();
                OracleCommand cmd = connection.CreateCommand();
                cmd.CommandText = "SELECT Count(*) Broj, t5.title AS Predmet  FROM BP07.User_Enrollment t1"
                                + " JOIN BP07.LabGroup t2 ON t1.LabGroupId = t2.Id"
                                + " JOIN BP07.Course_Department t3 ON t2.Course_DepartmentId = t3.Id"
                                + " JOIN BP07.Department t4 ON t3.DepartmentId = t4.id"
                                + " JOIN BP07.Course t5 ON t5.Id = t3.CourseId"
                                + " JOIN BP07.Exam t6 ON t3.id = t6.Course_departmentid"
                                + " JOIN BP07.ExamResults t7 ON t6.id = t7.examid"
                                + " WHERE t1.studyyearid ='" + studyYearId + "' AND t3.departmentId ='" + departmentID + "' AND t5.CourseId ='" + courseId + "'AND t7.Points > 55"
                                + " GROUP BY t5.title";

                OracleDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    int broj = reader.GetInt32(0);
                    string nazivPredmeta = reader.GetString(1);
                    PassScoreModel s = new PassScoreModel { CourseTitle = nazivPredmeta, NumberOfStudents = broj };
                    lista.Add(s);
                }
                return lista;
            }
            catch (Exception e)
            {
                return null;
               // throw new Exception("Error: " + e.Message);
            }
        }
    }
}
