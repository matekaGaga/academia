/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bi.edu.upg.etudiants.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author днс
 */
public class WriteServerMessage {

    protected static void writeSuccess(HttpServletResponse response) throws IOException {
        PrintWriter writer = response.getWriter();
        try {
            writer.write("<html><body>");
            writer.write("<h3>success</h3>");
            writer.write("</body></html>");
        } finally {
            writer.close();
        }

    }

    protected static void writeRequestError(HttpServletResponse response, int status, Exception e) throws IOException {
        response.setStatus(status);
        PrintWriter writer = response.getWriter();
        try {
            writer.write("<html><body>");
            writer.write("<h3>server error!</h3>");
            writer.write(e.getMessage());
            writer.write("</body></html>");
        } finally {
            writer.close();
        }
    }
}
