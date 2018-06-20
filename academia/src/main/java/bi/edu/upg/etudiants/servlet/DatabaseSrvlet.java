/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bi.edu.upg.etudiants.servlet;

import bi.edu.upg.etudiants.db.ConnectionFactory;
import bi.edu.upg.etudiants.mapper.StudentsMappers;
import bi.edu.upg.etudiants.object.FacultyO;
import bi.edu.upg.etudiants.object.StudentO;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.TreeMap;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.ibatis.session.SqlSession;

/**
 *
 * @author niragira
 */
public class DatabaseSrvlet extends HttpServlet {

    /**
     * @return - returns students
     */
    private List<StudentO> getStudents() {

        SqlSession session = ConnectionFactory.getSqlSessionFactory().openSession();

        try {
            StudentsMappers mapper = session.getMapper(StudentsMappers.class);
            return mapper.getStudents();
        } catch (Exception e) {
            System.out.println(e);
        } finally {
            session.close();
        }
        return new ArrayList<StudentO>();

    }

    private List<FacultyO> getFaculties() {
        SqlSession session = ConnectionFactory.getSqlSessionFactory().openSession();

        try {
            StudentsMappers mapper = session.getMapper(StudentsMappers.class);
            return mapper.getFaculties();
        } catch (Exception e) {
            System.out.println(e);
        } finally {
            session.close();
        }
        return new ArrayList<FacultyO>();

    }

    /**
     * Processes requests for both HTTP
     * <code>GET</code> and
     * <code>POST</code> methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            String req = request.getParameter("req");

            if (req.equals("reqGetStudent")) {

                List<StudentO> studentsList = getStudents();
                TreeMap<Integer, StudentO> studTree = new TreeMap<Integer, StudentO>();
                for (int i = 0; i < studentsList.size(); i++) {
                    StudentO stud = studentsList.get(i);
                    studTree.put(stud.getId(), stud);
                }
                studTree.keySet();

                Gson gson = new Gson();
                JsonObject obj = new JsonObject();
                obj.addProperty("success", Boolean.TRUE);
                JsonElement studentsObj = gson.toJsonTree(studentsList);
                obj.add("students", studentsObj);

                out.println(obj.toString());
            }
            else if (req.equals("reqGetFaculty")) {
                
              List<FacultyO> facultiesList = getFaculties();
                TreeMap<Integer, FacultyO> facTree = new TreeMap<Integer, FacultyO>();
                for (int i = 0; i < facultiesList.size(); i++) {
                    FacultyO fac= facultiesList.get(i);
                    facTree.put(fac.getFacId(), fac);
                }
                facTree.keySet();

                Gson gson = new Gson();
                JsonObject obj = new JsonObject();
                obj.addProperty("success", Boolean.TRUE);
                JsonElement studentsObj = gson.toJsonTree(facultiesList);
                obj.add("faculties", studentsObj);

                out.println(obj.toString());  
                
            } else {
                JsonObject obj = new JsonObject();
                obj.addProperty("success", false);
                out.println(obj.toString());

            }
        } finally {
            out.close();
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP
     * <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP
     * <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
