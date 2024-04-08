package com.joeun.server;

import org.junit.jupiter.api.Test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import static com.jayway.jsonpath.internal.path.PathCompiler.fail;

public class DatabseConnectionTests {
    static{
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
    @Test
    public void testConnection(){
        try(Connection con =
                    DriverManager.getConnection(
                            "jdbc:mysql//localhost:3306/user?serverTimezone=Asia/Seoul",
                            "root",
                            "1234")){
                    System.out.println(con);
        } catch (SQLException e) {
            fail(e.getMessage());
        }
    }
}
