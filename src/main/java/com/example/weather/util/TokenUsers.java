package com.example.weather.util;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class TokenUsers {
    public String getKey() {
        return UUID.randomUUID().toString();
    }
}