package evg_belyavskii.fincurstask.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.MissingResourceException;
import org.apache.log4j.BasicConfigurator;

/*
 * WrapperConnector Class - set connection to BD
 * @version 1.3 29.01.2017
 * @author Yauheni Bialiauski
 */

class WrapperConnector {
    private static final org.apache.log4j.Logger SLOG
            = org.apache.log4j.Logger.getLogger("stdout");
    private static final org.apache.log4j.Logger ERLOG
            = org.apache.log4j.Logger.getLogger("error");
    private Connection connection;

    public WrapperConnector() {
        BasicConfigurator.configure();
        try {
            String username ="root";
            String password = "2004";        
            String url = "jdbc:mysql://localhost:3306/testdb?"
                    + "zeroDateTimeBehavior=convertToNull";
            SLOG.info("WrapperConnector:get coonectio properies");
            try {
                Class.forName("com.mysql.jdbc.Driver");
                SLOG.info("WrapperConnector:try Class.forNam ");
            } catch (ClassNotFoundException e) {
                System.out.println(e.getMessage());
                ERLOG.info("WrapperConnector:try Class.forNam: error: " + e);
            }
            connection = DriverManager.getConnection(url, username, password);
        } catch (MissingResourceException e) {
            System.err.println("properties file is missing " + e);
            ERLOG.info("WrapperConnector: error: properties "
                                        + "file is missing" + e);
        } catch (SQLException e) {
            System.err.println("not obtained connection " + e);
            ERLOG.info("WrapperConnector:not obtained connection error: " + e);
        }
    }

    /**
     * getStatement - get a statement of connection
     */
    
    public Statement getStatement() throws SQLException {
        BasicConfigurator.configure();
        if (connection != null) {
            SLOG.info("WrapperConnector:getStatement connection != null");
            Statement statement = connection.createStatement();
            if (statement != null) {
                SLOG.info("WrapperConnector:getStatement; statement != null");
                return statement;
            }
        }
        throw new SQLException("connection or statement is null");
    }

    /**
     * getPreparedStatement - get a prepared statement of connection
     */
    
    public PreparedStatement getPreparedStatement(String sql)
            throws SQLException {
        BasicConfigurator.configure();
        if (connection != null) {
            SLOG.info("WrapperConnector:getPreparedStatement:"
                    + "connection != null");
            PreparedStatement statement = connection.prepareStatement(sql);
            if (statement != null) {
                SLOG.info("WrapperConnector:getPreparedStatement;"
                        + "statement != null");
                return statement;
            }
        }
        throw new SQLException("connection or statement is null");
    }

    /**
     * closeStatement - close connection statement
     */
    
    public void closeStatement(Statement statement) {
        if (statement != null) {
            try {
                SLOG.info("WrapperConnector:closeStatement;"
                        + "statement != null");
                statement.close();
            } catch (SQLException e) {
                System.err.println("statement is null " + e);
                ERLOG.info("WrapperConnector:closeStatement error;" + e);
            }
        }
    }

     /**
     * closePreparedStatement - close Prepared connection statement
     */
    
    public void closePreparedStatement(PreparedStatement statement) {
        if (statement != null) {
            try {
                SLOG.info("WrapperConnector:closePreparedStatement;"
                        + "statement != null");
                statement.close();
            } catch (SQLException e) {
                System.err.println("statement is null " + e);
                ERLOG.info("WrapperConnector:closePreparedStatement error;"+ e);
            }
        }
    }

    /**
     * closeConnection connection method
     */
    
    public void closeConnection() {
        if (connection != null) {
            try {
                SLOG.info("WrapperConnector:getPreparedStatement:"
                        + "connection != null");
                connection.close();
            } catch (SQLException e) {
                System.err.println(" wrong connection" + e);
                ERLOG.info("WrapperConnector:closeConnection error;" + e);
            }
        }
    }
}
