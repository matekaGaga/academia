/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bi.edu.upg.etudiants.servlet;

import bi.edu.upg.etudiants.db.ConnectionFactory;
import bi.edu.upg.etudiants.mapper.StudentsMappers;
import bi.edu.upg.etudiants.object.StudentO;
import com.google.gson.Gson;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.ValidationException;
import org.apache.ibatis.session.SqlSession;

/**
 *
 * @author днс
 */
@WebServlet(name = "AddEtudiant", urlPatterns = {"/AddEtudiant"})
public class AddEtudiant extends HttpServlet {

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
        response.setContentType("text/json;charset=UTF-8");

        try {
            doProcessRequest(request);
            WriteServerMessage.writeSuccess(response);
        } catch (ValidationException e) {
            WriteServerMessage.writeRequestError(response, HttpServletResponse.SC_BAD_REQUEST, e);

        } catch (Exception e) {
            WriteServerMessage.writeRequestError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, e);

        }
    }

    private class Input {

        StudentO[] etudiants;
    }

    protected void doProcessRequest(HttpServletRequest request)
            throws ServletException, IOException {
        String etudiantsJSON = request.getParameter("etudiants").trim();

        Gson gson = new Gson();

        Input input = gson.fromJson(etudiantsJSON, Input.class);

        if (input != null) {

            SqlSession session = ConnectionFactory.getSqlSessionFactory().openSession();

            int len = input.etudiants.length; //
            //  try {

            for (int i = 0; i < len; i++) {
                    StudentsMappers mapper = session.getMapper(StudentsMappers.class);
                    StudentO etudiant = input.etudiants[i];
                    
                    String nom = etudiant.getFirstName();
                    
//                    String validcity = validateString(apartment.getCity(), city);
//                    String validadress = validateString(apartment.getAddress(), address);
//                    String validnumber = validateString(apartment.getNumber(), number);
//                    String validpageurl = validateString(apartment.getPage_url(), pageUrl);
//                    String validoccupancy = validateString(apartment.getOccupancy(), occupancy);
//                    // String validlat = validateFloat(apartment.getLat(), lat);
//                    // find if apartment is alreadry registered  by address, buildingNumber and page_url
//                    Integer id = mapper.findApartmentByNumberAndUrl(validcity, apartment.getAddress(), apartment.getNumber(), apartment.getPage_url());
//                    if (id != null) {
//                        throw new ServletException("apartment already registered");
//                    }
//
//                    mapper.insertApartmentsForRent(apartment.getCity(), apartment.getAddress(), apartment.getNumber(), apartment.getPage_url(),
//                            apartment.getOccupancy(), apartment.getLat(), apartment.getLon());
//                    session.commit();
//
//                }
//            } finally {
//                session.close();
//            }
            }
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
