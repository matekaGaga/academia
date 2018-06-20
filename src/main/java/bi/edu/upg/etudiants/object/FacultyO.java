/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bi.edu.upg.etudiants.object;

/**
 *
 * @author upg-ferdi
 */
public class FacultyO {
    
    private int facId;
    private String appelation;
    private String responsable;

    public FacultyO() {
    }

    public FacultyO(int facId, String appelation, String responsable) {
        this.facId = facId;
        this.appelation = appelation;
        this.responsable = responsable;
    }

    public int getFacId() {
        return facId;
    }

    public void setFacId(int facId) {
        this.facId = facId;
    }

    public String getAppelation() {
        return appelation;
    }

    public void setAppelation(String appelation) {
        this.appelation = appelation;
    }

    public String getResponsable() {
        return responsable;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }
    
}
