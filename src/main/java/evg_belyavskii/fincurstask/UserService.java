package evg_belyavskii.fincurstask;

import evg_belyavskii.fincurstask.dao.OrderDao;
import evg_belyavskii.fincurstask.dao.ProductDao;
import evg_belyavskii.fincurstask.dao.UserDao;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import static sun.security.jgss.GSSUtil.login;

/**
 * Class Res, Order, RegInfo - containe Xml formated fieldes to read json 
 * @author Yauheni Bialiauski
 */

@XmlRootElement
class Res{
    @XmlElement String login;
    @XmlElement String password;
    @XmlElement String requestResult;
}

@XmlRootElement
class Order{
    @XmlElement String login;
    @XmlElement ArrayList<String> bagListId;
    @XmlElement ArrayList<String> bagListCount;
}

@XmlRootElement
class RegInfo{
    @XmlElement String lname;
    @XmlElement String fname;
    @XmlElement String address;
    @XmlElement String email;
    @XmlElement String phone;
    @XmlElement String login;
    @XmlElement String password;
    @XmlElement String confPassword;
}

/*
 * UserService Class - class contains methods for 
 * the client to access the Rest
 * @version 1.7 9.02.2016 
 * @author Yauheni Bialiauski
 */


@Path("/UserService")
public class UserService {

    UserDao userDao = new UserDao();
    ProductDao productDao = new ProductDao();
    OrderDao orderDao = new OrderDao();

    /**
     * getProducts - methode to get all products from DB
     * @return List of Products
     */
    @Path("/getproducts")
    @GET
    @Produces({ MediaType.APPLICATION_JSON})
    public ArrayList<Products> getProducts() throws ClassNotFoundException, SQLException {
        ArrayList<Products> prList =  new ArrayList <> ();
        prList=productDao.getAllProducts();
        return prList;
    }

    /**
     * updateUser - method that register new user in system
     * @return result set like: true - registration is successfull
     * false - registration error
     */
    
    @POST
    @Path("/registr")
    @Consumes({ MediaType.APPLICATION_JSON}) 
    @Produces({ MediaType.APPLICATION_JSON})
    public String  updateUser(RegInfo rI) throws IOException, ClassNotFoundException, SQLException {
        System.out.println( "answer" + rI.lname+ " " + rI.fname);
        User uTemp= new User();
        uTemp.setLogin(rI.login);
        uTemp.setPassword(rI.password);
        UserInfo uiTemp=new UserInfo();
        uiTemp.setLname(rI.lname);
        uiTemp.setFname(rI.fname);
        uiTemp.setAddress(rI.address);
        uiTemp.setLogin(rI.login);
        uiTemp.setPhone(rI.phone);
        uiTemp.setEmail(rI.email);
        System.out.println(uTemp.toString()+"|"+uiTemp.toString());
        int res = userDao.registrUser(uiTemp,uTemp);
        Res r= new Res();
        if (res==1) {
            r.requestResult="true";
            return r.requestResult;
        }
        else {
            r.requestResult="false";
            return r.requestResult;
        } 
    }
    
    /**
     * checkUser - a method that checks the user is valid
     * @param r - json data(login and password) from client 
     * @return true/false
     */
    
    @POST
    @Path("/info")
    @Consumes({ MediaType.APPLICATION_JSON}) 
    @Produces({ MediaType.APPLICATION_JSON})
    public String  checkUser(Res r) throws IOException, ClassNotFoundException, SQLException {
        System.out.println( "answer" + r.login + " " + r.password);
        User uTemp= new User();
        uTemp = userDao.getCurrentUserInfo(r.login,r.password);
        System.out.println( "user" + uTemp.getLogin()+ " " + uTemp.getPassword());
        if (uTemp.getLogin()!=null && uTemp.getPassword()!=null) {
            r.requestResult="true";
            return r.requestResult;
        }
        else {
            r.requestResult="false";
            return r.requestResult;
        } 
    }
    
     /**
     * getUserInfo - create new UserInfo object with parames by login
     * @param r - json data(login) from server
     * @return UserInfo object
     */
    @POST
    @Path("/getuserinfo")
    @Consumes({ MediaType.APPLICATION_JSON}) 
    @Produces({ MediaType.APPLICATION_JSON})
    public UserInfo  getUserInfo(Res r) throws IOException, ClassNotFoundException, SQLException {
        System.out.println( "getuserinfo login"+r.login);
        UserInfo ui= new UserInfo();
        ui=userDao.getUserInfo(r.login);
        return ui;
    }
    
    /**
     * createOrder - method to set data about new order in DB 
     * @param o - json object from client. Containe new order info
     * @return 1/0 if success or error 
     */
    
    @POST
    @Path("/createorder")
    @Consumes({ MediaType.APPLICATION_JSON}) 
    @Produces({ MediaType.APPLICATION_JSON})
    public int  createOrder(Order o) throws IOException, ClassNotFoundException, SQLException {
        System.out.println(o.login);
        int result=0;
        for (String f:o.bagListCount) {
            System.out.println(f);
        }
        result=orderDao.createOrder(o.login,o.bagListId,o.bagListCount);
        return result;
    }   
}
