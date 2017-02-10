/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package evg_belyavskii.fincurstask.dao;

import evg_belyavskii.fincurstask.Products;
import evg_belyavskii.fincurstask.ws.Answer;
import evg_belyavskii.fincurstask.ws.SoapImplService;
import evg_belyavskii.fincurstask.ws.SoapService;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

/*
 * ProductDao Class - containe methods to accessing product info
 * entity userauth and userinfo
 * @version 1.4 2.02.2017 
 * @author Yauheni Bialiauski
 */

public class ProductDao extends AbstractDao {
    private static final org.apache.log4j.Logger SLOG
            = org.apache.log4j.Logger.getLogger("stdout");
    private static final org.apache.log4j.Logger ERLOG
            = org.apache.log4j.Logger.getLogger("error");
    
    private Connection connection;
    private ArrayList<Products> prList= new ArrayList<Products>();
    
    /**
    * ProductDao class construst that initialize  WrapperConnector object
    */
    
    public ProductDao() {
         this.connector = new WrapperConnector();
    }
   
    /**
     * getAllProducts - method to get information about all products in DB
     * @return
     */
    
    public ArrayList<Products>  getAllProducts() throws ClassNotFoundException, SQLException{
        String query = "Select * from products;";
        SoapImplService sis=new SoapImplService();
        SoapService soapServ= sis.getSoapImplPort();
        Statement stm=null;
        try {
            stm = connector.getStatement();
            ResultSet rs = stm.executeQuery(query);
        while(rs.next()) {
            Products prObj = new Products();
            prObj.setId(rs.getInt("id"));
            prObj.setPrName(rs.getString("prName"));
            prObj.setTitleImgSrc(rs.getString("titleImgSrc"));
            prObj.setImgSrc(rs.getString("imgSrc"));
            prObj.setPriceText(rs.getFloat("priceText"));
            prObj.setCategory(rs.getInt("category"));
            prObj.setImgSrc(rs.getString("imgSrc"));
            Answer s= soapServ.getPriceString(rs.getInt("id"));
            prObj.setPriceText(s.getCost());
            prObj.setStrike(s.getHotcost());
            prObj.setStars(rs.getInt("stars"));
            this.prList.add(prObj);
            }
            SLOG.info("ProductDao: get products - success");            
        } catch (SQLException ex) {
           ERLOG.info("ProductDao:get products error:"+ex);
        }
        finally {
            connector.closeStatement(stm);
            return this.prList;
        }
        
   }
}
