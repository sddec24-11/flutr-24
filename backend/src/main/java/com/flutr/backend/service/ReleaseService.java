package com.flutr.backend.service;

import com.flutr.backend.dto.releases.ReleaseRequest;
import com.flutr.backend.model.Shipment;
import com.flutr.backend.util.JwtUtil;
import com.mongodb.client.MongoClients;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class ReleaseService {

    private final LoggingService loggingService;
    private final JwtUtil jwtUtil;
    private final HttpServletRequest request;

    @Autowired
    public ReleaseService(LoggingService loggingService, JwtUtil jwtUtil, HttpServletRequest request) {
        this.loggingService = loggingService;
        this.request = request;
        this.jwtUtil = jwtUtil;
    }

    private MongoTemplate getMongoTemplate() {
        String houseId = getCurrentHouseId();
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

    public void handleRelease(ReleaseRequest request) {
        MongoTemplate mongoTemplate = getMongoTemplate();
        loggingService.log("HANDLE_RELEASE", "START", "Releasing butterflies for shipment ID: " + request.getShipmentId());
        try {
            Shipment shipment = mongoTemplate.findById(request.getShipmentId(), Shipment.class, "shipments");
            if (shipment == null) {
                loggingService.log("HANDLE_RELEASE", "FAILURE", "Shipment not found with ID: " + request.getShipmentId());
                throw new RuntimeException("Shipment not found with ID: " + request.getShipmentId());
            }

            // Update butterfly details with release info
            request.getButterflyUpdates().forEach(update -> {
                shipment.getButterflyDetails().forEach(detail -> {
                    if (detail.getButterflyId().equals(update.getButterflyId())) {
                        // Update release-related fields
                        detail.setNumberReleased(detail.getNumberReleased() + update.getNumberReleased());
                        detail.setPoorEmergence(detail.getPoorEmergence() + update.getPoorEmergence());
                        detail.setDamaged(detail.getDamaged() + update.getDamagedDuringRelease());
                        detail.setDiseased(detail.getDiseased() + update.getDiseasedDuringRelease());
                        detail.setParasite(detail.getParasite() + update.getParasiteDuringRelease());

                        // Recalculate total remaining
                        int totalRemaining = detail.getNumberReceived() -
                                (detail.getNumberReleased() +
                                detail.getEmergedInTransit() +
                                detail.getDamaged() +
                                detail.getDiseased() +
                                detail.getParasite() +
                                detail.getPoorEmergence());
                        detail.setTotalRemaining(totalRemaining);
                    }
                });
            });

            mongoTemplate.save(shipment, "shipments");

            loggingService.log("HANDLE_RELEASE", "SUCCESS", "Release operation completed for shipment ID: " + request.getShipmentId());
        } catch (Exception e) {
            loggingService.log("HANDLE_RELEASE", "FAILURE", e.getMessage());
            throw new RuntimeException("Error releasing butterflies: " + e.getMessage());
        }
    }
}
