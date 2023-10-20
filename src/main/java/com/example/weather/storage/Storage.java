package com.example.weather.storage;

import com.example.weather.usermanagement.Key;
import com.example.weather.usermanagement.User;
import com.example.weather.util.Timestamp;
import com.example.weather.util.TokenUsers;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class Storage {

    private final TokenUsers tokenUsers;
    private final Timestamp timestamp;
    private final JdbcTemplate jdbcTemplate;

    public Storage(TokenUsers tokenUsers, Timestamp timestamp, JdbcTemplate jdbcTemplate) {
        this.tokenUsers = tokenUsers;
        this.timestamp = timestamp;
        this.jdbcTemplate = jdbcTemplate;
    }

    public void addUsers(String name, String login, String password) {
        String query = "INSERT INTO users (name, login, password) VALUES (?, ?, ?)";
        jdbcTemplate.update(query, name, login, password);
    }

    public void addSessionKeys(String key, String login, String timestamp) {
        String query = "INSERT INTO session_keys (key, user_login, timestamp) VALUES (?, ?, ?)";
        jdbcTemplate.update(query, key, login, timestamp);
    }

    public String registration(String login) {
        String key = tokenUsers.getKey();
        String stamp = timestamp.getStamp();
        addSessionKeys(key, login, stamp);
        Key keys = new Key();
        keys.setKey(key);
        try {
            return new ObjectMapper().writeValueAsString(keys);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public User getUser(String key) {
        String query = "SELECT user_login FROM session_keys WHERE key = ?";
        return jdbcTemplate.queryForObject(query, (resultSet, rowNum) -> {
            String login = resultSet.getString("user_login");
            return new User(login);
        }, key);
    }

    public String searchKey(User user) {
        String query = "SELECT name FROM users WHERE login = ?";
        return jdbcTemplate.queryForObject(query, String.class, user.getLogin());
    }

    public String verificationKey(String login, String password) {
        String query = "SELECT session_keys.key FROM users INNER JOIN session_keys ON users.login = session_keys.user_login " +
                "WHERE login = ? AND password = ?";
        return jdbcTemplate.queryForObject(query, String.class, login, password);
    }
}