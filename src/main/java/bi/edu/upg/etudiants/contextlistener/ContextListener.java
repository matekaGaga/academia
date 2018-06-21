package bi.edu.upg.etudiants.contextlistener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 *
 * @author niragira
 */
public class ContextListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        /*try {
         ConnectionFactory.initialize();
         } catch (IOException ex) {
         Logger.getLogger(ContextListener.class.getName()).log(Level.SEVERE, null, ex);
         }*/
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
    }
}
