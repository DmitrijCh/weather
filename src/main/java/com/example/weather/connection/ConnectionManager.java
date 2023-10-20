package com.example.weather.connection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Component
public class ConnectionManager {

    protected final JdbcTemplate jdbcTemplate;

    @Autowired
    public ConnectionManager(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }
}