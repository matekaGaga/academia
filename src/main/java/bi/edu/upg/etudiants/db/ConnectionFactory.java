
package bi.edu.upg.etudiants.db;

import bi.edu.upg.etudiants.mapper.StudentsMappers;
import java.io.IOException;
import java.io.Reader;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;




/**
 *
 * @author ferdinand
 */
public class ConnectionFactory {
    
    private static SqlSessionFactory sqlSessionFactory;
    
    //Инициялизация подключение к БД
    
    public static void initialize() throws IOException {
        
          String resource = "bi/edu/upg/etudiants/db/SqlMapConfig.xml";
          
          Reader reader = Resources.getResourceAsReader(resource);
          
        if (sqlSessionFactory == null) {
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);

            //добавление myBatis-интерфейсов
            sqlSessionFactory.getConfiguration().addMapper(StudentsMappers.class);
        }
         // пробуем соединение
        SqlSession session = sqlSessionFactory.openSession();
        try {
            StudentsMappers mapper =session.getMapper(StudentsMappers.class);
            mapper.ping();
        }finally{
           session.close();  
        }
    }
    
   public static SqlSessionFactory getSqlSessionFactory(){
       
        return sqlSessionFactory;
    }      
    
}
