package com.example.weather.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

@Service
public class TimeService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public TimeService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public String getCurrentTime(String name) {
        try {
            String query = "SELECT time FROM city WHERE name = ?";
            String url = jdbcTemplate.queryForObject(query, String.class, name);

            Document document = Jsoup.connect(url).get();

            Element timeElement = document.select(".time").first();
            String time = timeElement.text();

            return "Город: " + name + " - " + "Время: " + time;
        } catch (Exception e) {
            e.printStackTrace();
            return "Ошибка получения текущего времени";
        }
    }
}

