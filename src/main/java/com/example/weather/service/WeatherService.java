package com.example.weather.service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class WeatherService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public WeatherService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public String getWeatherData(String name) {
        try {
            String query = "SELECT url FROM city WHERE name = ?";
            String url = jdbcTemplate.queryForObject(query, String.class, name);

            Document document = Jsoup.connect(url).get();

            Element dateElement = document.select(".date").first();
            String date = dateElement.text();

            Element temperatureElement = document.select(".unit_temperature_c").first();
            String temperature = temperatureElement.text();

            String weatherData = "Дата: " + date + " " + "Температура воздуха: " + temperature;

            System.out.println(weatherData);
            return weatherData;
        } catch (EmptyResultDataAccessException e) {
            return "Город не найден в базе данных";
        } catch (Exception e) {
            e.printStackTrace();
            return "Ошибка получения данных о погоде";
        }
    }
}