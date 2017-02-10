package evg_belyavskii.fincurstask.dao;

import evg_belyavskii.fincurstask.User;
import evg_belyavskii.fincurstask.UserInfo;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/*
 * UserDao Class - containe methods to accessing DB 
 * entity userauth and userinfo
 * @version 1.4 2.02.2017 
 * @author Yauheni Bialiauski
 */

public class UserDao extends AbstractDao {
    
   private static final org.apache.log4j.Logger SLOG
            = org.apache.log4j.Logger.getLogger("stdout");
   private static final org.apache.log4j.Logger ERLOG
            = org.apache.log4j.Logger.getLogger("error");

   private Connection connection;
   private ArrayList<User> tma= new ArrayList<>();
   private ArrayList<UserInfo> uiList= new ArrayList<>();

   /**
    * UserDao class construst that initialize  WrapperConnector object
    */
   
   public UserDao() {
         this.connector = new WrapperConnector();
   }

   /**
    * getAllUsers  - methode to get User list from database
    * @param login
    * @param passw
    */
   
   public void getAllUsers(String login, String passw) throws ClassNotFoundException, SQLException{
        String query = "Select * from userauth where login=? and password=?;";
        PreparedStatement pstm = null;
        try {
            SLOG.info("UserDao:get Users by login"+login+"and password"+passw);
            pstm = connector.getPreparedStatement(query);
            pstm.setString(1, login);
            pstm.setString(2, passw);
            ResultSet rs = pstm.executeQuery();
            while(rs.next()) {
            User tm = new User();
            tm.setId(rs.getInt("id"));
            tm.setLogin(rs.getString("login"));
            tm.setPassword(rs.getString("password"));
            this.tma.add(tm);
        }
        } catch (SQLException ex) {
            ERLOG.info("UserDao:prepared statment error:"+ex);
        } finally {
            connector.closePreparedStatement(pstm);
        }        
   }
   
   /**
    * registrUser - methode to register new user
    * @param ui - UserInfo object with data to register
    * @param u - User object with login and password fields
    * @return result 1/0 if registr is successfull/unsuccessfull
    */
   public int registrUser(UserInfo ui, User u) throws ClassNotFoundException, SQLException {
        String userAuthInsert ="INSERT INTO userauth (login, password) "
            + "Values (?,?);";   
        String userInsert ="INSERT INTO userinfo (login,lname,fname,"
                + "address,email,phone) Values (?,?,?,?,?,?);";
        PreparedStatement pstm = null;  
        int userAuthRes=0;
        int userRes=0;
        try {
            SLOG.info("UserDao:register user prepared statment");
            pstm = connector.getPreparedStatement(userAuthInsert);
            pstm.setString(1, u.getLogin());
            pstm.setString(2, u.getPassword());
            userAuthRes = pstm.executeUpdate();
        } catch (SQLException ex) {
            ERLOG.info("UserDao:register error:"+ex);
        } finally {
            connector.closePreparedStatement(pstm);
        }
        try {
            SLOG.info("UserDao:user insert process (prepared statment)");
            pstm = connector.getPreparedStatement(userInsert);
            pstm.setString(1, u.getLogin());
            pstm.setString(2, ui.getLname());
            pstm.setString(3, ui.getFname());
            pstm.setString(4, ui.getAddress());
            pstm.setString(5, ui.getEmail());
            pstm.setString(6, ui.getPhone());
            userRes = pstm.executeUpdate();
        } catch (SQLException ex) {
            ERLOG.info("UserDao:user insert process error:"+ex);
        } finally {
            connector.closePreparedStatement(pstm);
        }
        if (userAuthRes==1 && userRes==1) return 1;
        else return 0;
   }
   
   /**
    * getCurrentUserInfo - method to check user in login process
    * @param login
    * @param passw
    * @return answer from database about  user with input login and password
    */
   
   public User getCurrentUserInfo(String login, String passw) throws ClassNotFoundException, SQLException{
       this.getAllUsers(login,passw);
       User userTemp = new User();
       System.out.println( "tma user" + tma.get(0).getLogin()+ " " + tma.get(0).getPassword()+tma.size());
       if (tma.size()==1) userTemp=tma.get(0);
       return userTemp;
   }
   
   /**
    * getUserInfo - methode to get all info about user by login
    * @param login
    * @return UserInfo object
    */
   
   public UserInfo getUserInfo(String login) throws ClassNotFoundException, SQLException{
        String getUserInfo = "Select * from userinfo where login=?;";
        PreparedStatement pstm = null;  
        UserInfo ui= new UserInfo();;
        try {
            SLOG.info("UserDao:get current user info");
            pstm = connector.getPreparedStatement(getUserInfo);
            pstm.setString(1, login);
            ResultSet rs = pstm.executeQuery();
            while(rs.next()) {
                ui.setLogin(rs.getString("login"));
                ui.setLname(rs.getString("lname"));
                ui.setFname(rs.getString("fname"));
                ui.setAddress(rs.getString("address"));
                ui.setEmail(rs.getString("email"));
                ui.setPhone(rs.getString("phone"));
            }
        } catch (SQLException ex) {
            ERLOG.info("UserDao:user get current user info process error:"+ex);
        } finally {
            connector.closePreparedStatement(pstm);
        }
        String getOrderCount="SELECT COUNT(orders.`orderId`) as count fROM orders where login=?;";
        pstm=null;
        try {
            SLOG.info("UserDao:get user order info");
            pstm = connector.getPreparedStatement(getOrderCount);
            pstm.setString(1, login);
            ResultSet rs1 = pstm.executeQuery();
            while(rs1.next()) {
                ui.setCount(rs1.getInt("count"));
            }
        } catch (SQLException ex) {
            ERLOG.info("UserDao:user get user order count error:"+ex);
        } finally {
            connector.closePreparedStatement(pstm);
        }     
        return ui;
    }
}