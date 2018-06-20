package bi.edu.upg.etudiants.mapper;


import bi.edu.upg.etudiants.object.FacultyO;
import bi.edu.upg.etudiants.object.StudentO;
import java.util.List;
import org.apache.ibatis.annotations.Select;

/**
 *
 * @author ferdinand
 */
public interface StudentsMappers {

    /**
     *
     * @return
     */
    @Select("SELECT 1")
    String ping();
    
    @Select("SELECT id,firstName,lastName,faculty FROM gps3.students")
    List<StudentO> getStudents();
    
    @Select("SELECT facId,appelation, responsable FROM gps3.faculties")
    List<FacultyO>getFaculties();

   
}
