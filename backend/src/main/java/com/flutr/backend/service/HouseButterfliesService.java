package com.flutr.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.flutr.backend.model.HouseButterflies;
import com.flutr.backend.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

@Service
public class HouseButterfliesService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private LoggingService loggingService;

    @Autowired
    private HttpServletRequest request;

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

    public List<HouseButterflies> getAllHouseButterflies() {
        return mongoTemplate.findAll(HouseButterflies.class, getCurrentHouseId() + "_DB.house_butterflies");
    }

    public List<HouseButterflies> getButterflyDetails() {
        Query query = new Query();
        query.fields().include("buttId").include("commonName").include("imgWingsOpen").include("lifespan");
        return mongoTemplate.find(query, HouseButterflies.class, getCurrentHouseId() + "_DB.house_butterflies");
    }

    public HouseButterflies getFullButterflyDetails(String buttId) {
        return mongoTemplate.findById(buttId, HouseButterflies.class, getCurrentHouseId() + "_DB.house_butterflies");
    }

    public void editHouseButterfly(String buttId, String newCommonName, int newLifespan) {
        HouseButterflies butterfly = mongoTemplate.findById(buttId, HouseButterflies.class, getCurrentHouseId() + "_DB.house_butterflies");
        if (butterfly == null) {
            throw new IllegalArgumentException("Butterfly not found with ID: " + buttId);
        }
        butterfly.setCommonName(newCommonName);
        butterfly.setLifespan(newLifespan);
        mongoTemplate.save(butterfly, getCurrentHouseId() + "_DB.house_butterflies");
        loggingService.log("EDIT_BUTTERFLY", "SUCCESS", "Butterfly edited successfully with ID: " + buttId);
    }
}