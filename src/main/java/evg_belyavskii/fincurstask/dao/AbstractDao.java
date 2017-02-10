package evg_belyavskii.fincurstask.dao;

import java.sql.Statement;

/*
 * AbstractDao Class - abstract class of DAO sructure
 * @version 1.1 25.01.2017
 * @author Yauheni Bialiauski
 */

public abstract class AbstractDao{

    protected WrapperConnector connector;

    public void close() {
        connector.closeConnection();
    }

    protected void closeStatement(Statement statement) {
        connector.closeStatement(statement);
    }
}
