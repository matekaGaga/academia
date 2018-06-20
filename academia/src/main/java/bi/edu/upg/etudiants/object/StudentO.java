/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bi.edu.upg.etudiants.object;

import java.util.logging.Logger;

/**
 *
 * @author niragira
 */
//La classe definissant un StudentO
public class StudentO {
    private int id;
    private String firstName; 
    private String lastName;
    private String faculty;
   
    private static final Logger LOG = Logger.getLogger(StudentO.class.getName());

    public StudentO() {
    }

     public int getId() {
        return id;
    }

    public void setId(int EtudiantId) {
        this.id = EtudiantId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }
    
    
}
