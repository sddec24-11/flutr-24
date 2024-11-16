package com.flutr.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.flutr.backend.dto.houseButterflies.ButterflyDetailsDTO;
import com.flutr.backend.model.HouseButterflies;
import com.flutr.backend.util.JwtUtil;
import com.mongodb.client.MongoClients;

import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HouseButterfliesService {

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

    private MongoTemplate getHouseMongoTemplate(String houseId) {
        try {
            return new MongoTemplate(MongoClients.create(), houseId + "_DB");
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid house ID or database connection issue: " + houseId);
        }
    }

    public List<HouseButterflies> getAllHouseButterflies(String houseId) {
        MongoTemplate houseTemplate = getHouseMongoTemplate(houseId);
        List<HouseButterflies> result = houseTemplate.findAll(HouseButterflies.class, "house_butterflies");
        if (result.isEmpty()) {
            throw new IllegalStateException("No butterflies found for house ID: " + houseId);
        }
        return result;
    }

    public List<ButterflyDetailsDTO> getButterflyDetails(String houseId) {
        MongoTemplate houseTemplate = getHouseMongoTemplate(houseId);
        Query query = new Query();
        query.fields().include("buttId").include("commonName").include("imgWingsOpen").include("lifespan").include("noInFlight");
        List<HouseButterflies> butterflies = houseTemplate.find(query, HouseButterflies.class, "house_butterflies");

        if (butterflies.isEmpty()) {
            throw new IllegalStateException("No butterfly details found for house ID: " + houseId);
        }

        return butterflies.stream()
            .map(b -> new ButterflyDetailsDTO(b.getButtId(), b.getCommonName(), b.getImgWingsOpen(), b.getLifespan(), b.getNoInFlight()))
            .collect(Collectors.toList());
    }

    public HouseButterflies getFullButterflyDetails(String houseId, String buttId) {
        MongoTemplate houseTemplate = getHouseMongoTemplate(houseId);
        Query query = new Query(Criteria.where("buttId").is(buttId));
        HouseButterflies butterfly = houseTemplate.findOne(query, HouseButterflies.class, "house_butterflies");
        if (butterfly == null) {
            throw new IllegalArgumentException("Butterfly with buttId: " + buttId + " not found in house ID: " + houseId);
        }
        return butterfly;
    }

    public void editHouseButterfly(String buttId, String newCommonName, int newLifespan) {
        MongoTemplate houseTemplate = getHouseMongoTemplate(getCurrentHouseId());
        Query query = new Query(Criteria.where("buttId").is(buttId));
        HouseButterflies butterfly = houseTemplate.findOne(query, HouseButterflies.class, "house_butterflies");
        if (butterfly == null) {
            throw new IllegalArgumentException("Butterfly with buttId: " + buttId + " not found in house ID: " + getCurrentHouseId());
        }
        Update update = new Update();
        update.set("commonName", newCommonName);
        update.set("lifespan", newLifespan);
        houseTemplate.updateFirst(query, update, HouseButterflies.class, "house_butterflies");
        loggingService.log("EDIT_BUTTERFLY", "SUCCESS", "Butterfly edited successfully with ID: " + buttId);
    }
}