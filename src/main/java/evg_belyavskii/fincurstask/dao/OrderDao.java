package evg_belyavskii.fincurstask.dao;

import evg_belyavskii.fincurstask.Products;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/*
 * OrderDao Class - containe methods to get/set order information 
 * entity userauth and userinfo
 * @version 1.4 2.02.2017 
 * @author Yauheni Bialiauski
 */

public class OrderDao extends AbstractDao {
    private static final org.apache.log4j.Logger SLOG
            = org.apache.log4j.Logger.getLogger("stdout");
    private static final org.apache.log4j.Logger ERLOG
            = org.apache.log4j.Logger.getLogger("error");
    
    private Connection connection;
    private ArrayList<Products> prList= new ArrayList<Products>();
    
    public OrderDao() {
         this.connector = new WrapperConnector();
    }
    
    /**
     * createOrder - methode create new order object in DB
     * @return 1/0 if order is created or not
     */
    
    public int createOrder(String login,ArrayList<String> prId,ArrayList<String> prCount) throws ClassNotFoundException, SQLException {
        int result=0;
        String userName="";
        String userPhone="";
        String userInfoByLogin ="Select lname,fname,phone from userinfo where login=?;";  
        PreparedStatement pstm = null;  
        try {
            pstm = connector.getPreparedStatement(userInfoByLogin);
            pstm.setString(1, login);
            ResultSet rs = pstm.executeQuery();
            while(rs.next()) {
            userName=rs.getString("fname")+" "+rs.getString("lname");
            userPhone=rs.getString("phone");
        }
        } catch (SQLException ex) {
            System.out.println(ex);
        } finally {
            connector.closePreparedStatement(pstm);
        }
        for (int i=0;i<prId.size();i++) {
            String prName="";
            String getPrName ="Select prName from products where id=?"; 
            pstm = null;  
            try {
                SLOG.info("OrderDao:get prName");
                pstm = connector.getPreparedStatement(userInfoByLogin);
                pstm.setString(1, prId.get(i));
                ResultSet rs1 = pstm.executeQuery();
                while(rs1.next()) {
                    prName=rs1.getString("prName");
                }
            } catch (SQLException ex) {
                ERLOG.info("OrderDao:order get prName error:"+ex);
            } finally {
                connector.closePreparedStatement(pstm);
            }
            String setOrderQuery ="INSERT INTO orders (userName, userPhone, "
                    + "productId,productName,done,productCount,login) "
                    + "Values (?,?,?,?,0,?,?);";                       
            int setOrderRes=0;                             
            pstm = null;  
            try {
                SLOG.info("OrderDao:get prName");
                pstm = connector.getPreparedStatement(setOrderQuery);
                pstm.setString(1, userName);
                pstm.setString(2, userPhone);
                pstm.setString(3, prId.get(i));
                pstm.setString(4, prName);
                pstm.setString(5, prCount.get(i));
                pstm.setString(6, login);
                setOrderRes = pstm.executeUpdate();   
            } catch (SQLException ex) {
                ERLOG.info("OrderDao:insert order data error:"+ex);
            } finally {
                connector.closePreparedStatement(pstm);
            }
            if (setOrderRes==1) result=1;
            else result=0;;
        }
        return result;
   }
}
