package com.example.weather.controller;

import com.example.weather.service.TimeService;
import com.example.weather.service.WeatherService;
import com.example.weather.storage.Storage;
import com.example.weather.usermanagement.Key;
import com.example.weather.usermanagement.User;
import com.example.weather.usermanagement.UserMessage;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class Controller {

    private final WeatherService weatherService;
    private final TimeService timeService;
    private final Storage storage;


    @Autowired
    public Controller(WeatherService weatherService, TimeService timeService, Storage storage) {
        this.weatherService = weatherService;
        this.timeService = timeService;
        this.storage = storage;
    }

    @RequestMapping("/hello")
    ModelAndView page() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("form.html");
        return modelAndView;
    }

    @PostMapping("/register")
    public String registerUser(@RequestParam String name, @RequestParam String login, @RequestParam String password) {
        storage.addUsers(name, login, password);
        return storage.registration(login);
    }

    @PostMapping("/logins")
    public String loginUser(@RequestParam String login, @RequestParam String password) throws JsonProcessingException {
        String key = storage.verificationKey(login, password);
        if (key != null) {
            Key keys = new Key();
            keys.setKey(key);
            return new ObjectMapper().writeValueAsString(keys);
        } else {
            return "Error";
        }
    }

    @PostMapping("/message/user")
    public String messageUser(@RequestParam String key) throws JsonProcessingException {
        User user = storage.getUser(key);
        String name = storage.searchKey(user);
        if (name != null) {
            UserMessage userMessage = new UserMessage();
            userMessage.setMessage("Добро пожаловать, " + name);
            return new ObjectMapper().writeValueAsString(userMessage);
        } else {
            return "Error";
        }
    }

    @PostMapping("/data")
    public String getData(String name) throws JsonProcessingException {
        String currentTime = timeService.getCurrentTime(name);
        UserMessage userMessage = new UserMessage();
        userMessage.setMessage("Взято с time100" + " " + "-" + " " + currentTime);
        return new ObjectMapper().writeValueAsString(userMessage);
    }

    @PostMapping("/city")
    public String getCity(@RequestParam String name) throws JsonProcessingException {
        System.out.println(name);
        String weatherData = weatherService.getWeatherData(name);
        UserMessage userMessage = new UserMessage();
        userMessage.setMessage("Взято с Gismeteo" + " " + "-" + " " + weatherData);
        return new ObjectMapper().writeValueAsString(userMessage);
    }
}
