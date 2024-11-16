package com.flutr.backend.service;

import com.flutr.backend.model.LogEntry;
import com.flutr.backend.util.JwtUtil;
import com.mongodb.client.MongoClients;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class LoggingService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private HttpServletRequest request;

    private MongoTemplate getMongoTemplate() {
        String houseId = getCurrentHouseId();
        return new MongoTemplate(MongoClients.create(), houseId + "_DB");
    }

    private MongoTemplate getMongoTemplate(String houseId) {
        return new MongoTemplate(MongoClients.create(), houseId + "_DB");
    }

    private String getCurrentHouseId() {
        final String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            try {
                return jwtUtil.extractHouseId(jwt);
            } catch (Exception e) {
                throw new IllegalStateException("Failed to extract house ID from JWT", e);
            }
        } else {
            throw new SecurityException("No JWT token found in request headers");
        }
    }

    private String getUsernameFromToken() {
        final String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            try {
                return jwtUtil.extractUsername(jwt);
            } catch (Exception e) {
                throw new IllegalStateException("Failed to extract username from JWT", e);
            }
        } else {
            throw new SecurityException("No JWT token found in request headers");
        }
    }

    public void log(String operation, String status, String details) {
        MongoTemplate mongoTemplate = getMongoTemplate();
        LogEntry logEntry = new LogEntry(operation, getUsernameFromToken() + ": " + status, details);
        mongoTemplate.save(logEntry, "logs");
    }

    public void log(String operation, String status, String details, String houseId) {
        MongoTemplate mongoTemplate = getMongoTemplate(houseId);
        LogEntry logEntry = new LogEntry(operation, "System: " + status, details);
        mongoTemplate.save(logEntry, "logs");
    }
}
