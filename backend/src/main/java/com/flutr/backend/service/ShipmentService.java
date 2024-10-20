package com.flutr.backend.service;

import com.flutr.backend.model.Shipment;
import com.flutr.backend.model.Supplier;
import com.flutr.backend.repository.ShipmentRepository;
import com.flutr.backend.util.JwtUtil;
import com.mongodb.client.MongoClients;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ShipmentService {

    private final ShipmentRepository shipmentRepository;
    private final LoggingService loggingService;
    private final JwtUtil jwtUtil;
    private final HttpServletRequest request;

    @Autowired
    public ShipmentService(JwtUtil jwtUtil, ShipmentRepository shipmentRepository, LoggingService loggingService, HttpServletRequest request) {
        this.jwtUtil = jwtUtil;
        this.shipmentRepository = shipmentRepository;
        this.loggingService = loggingService;
        this.request = request;
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

    public Shipment addShipment(Shipment shipment) {
        MongoTemplate mongoTemplate = getMongoTemplate();
        loggingService.log("ADD_SHIPMENT", "START", "Adding shipment for supplier: " + shipment.getAbbreviation());
        
        if (!mongoTemplate.exists(query(where("abbreviation").is(shipment.getAbbreviation())), Supplier.class, "suppliers")) {
            loggingService.log("ADD_SHIPMENT", "FAILURE", "No supplier found with abbreviation: " + shipment.getAbbreviation());
            throw new IllegalStateException("Supplier does not exist for abbreviation: " + shipment.getAbbreviation());
        }

        try {
            Shipment savedShipment = mongoTemplate.insert(shipment, "shipments");
            loggingService.log("ADD_SHIPMENT", "SUCCESS", "Shipment added successfully with ID: " + shipment.getShipmentId());
            return savedShipment;
        } catch (Exception e) {
            loggingService.log("ADD_SHIPMENT", "FAILURE", e.getMessage());
            throw new RuntimeException("Error adding shipment: " + e.getMessage());
        }
    }


    public void deleteShipmentById(String id) {
        MongoTemplate mongoTemplate = getMongoTemplate();
        loggingService.log("DELETE_SHIPMENT", "START", "Deleting shipment with ID: " + id);
        try {
            mongoTemplate.remove(query(where("shipmentId").is(id)), Shipment.class, "shipments");
            loggingService.log("DELETE_SHIPMENT", "SUCCESS", "Shipment deleted with ID: " + id);
        } catch (Exception e) {
            loggingService.log("DELETE_SHIPMENT", "FAILURE", e.getMessage());
            throw new RuntimeException("Error deleting shipment: " + e.getMessage());
        }
    }

    public Optional<Shipment> editShipment(String id, Shipment updatedShipment) {
        MongoTemplate mongoTemplate = getMongoTemplate();
        loggingService.log("EDIT_SHIPMENT", "START", "Editing shipment with ID: " + id);
        try {
            Shipment existingShipment = mongoTemplate.findById(id, Shipment.class, "shipments");
            if (existingShipment == null) {
                loggingService.log("EDIT_SHIPMENT", "FAILURE", "Shipment not found with ID: " + id);
                throw new RuntimeException("Shipment not found with ID: " + id);
            }
    
            // Update all shipment-level fields
            existingShipment.setShipmentDate(updatedShipment.getShipmentDate());
            existingShipment.setArrivalDate(updatedShipment.getArrivalDate());
            existingShipment.setAbbreviation(updatedShipment.getAbbreviation());
    
            // Update the butterfly details
            if (updatedShipment.getButterflyDetails() != null) {
                existingShipment.getButterflyDetails().forEach(existingDetail -> {
                    updatedShipment.getButterflyDetails().stream()
                        .filter(updatedDetail -> updatedDetail.getButtId().equals(existingDetail.getButtId()))
                        .findFirst()
                        .ifPresent(updatedDetail -> {
                            existingDetail.setNumberReceived(updatedDetail.getNumberReceived());
                            existingDetail.setNumberReleased(updatedDetail.getNumberReleased());
                            existingDetail.setEmergedInTransit(updatedDetail.getEmergedInTransit());
                            existingDetail.setDamaged(updatedDetail.getDamaged());
                            existingDetail.setDiseased(updatedDetail.getDiseased());
                            existingDetail.setParasite(updatedDetail.getParasite());
                            existingDetail.setPoorEmergence(updatedDetail.getPoorEmergence());
    
                            // Recalculate total remaining
                            existingDetail.setTotalRemaining(updatedDetail.getNumberReceived() -
                                    (updatedDetail.getNumberReleased() +
                                    updatedDetail.getEmergedInTransit() +
                                    updatedDetail.getDamaged() +
                                    updatedDetail.getDiseased() +
                                    updatedDetail.getParasite() +
                                    updatedDetail.getPoorEmergence()));
                        });
                });
            }
    
            // Save the updated shipment
            Shipment savedShipment = mongoTemplate.save(existingShipment, "shipments");
            loggingService.log("EDIT_SHIPMENT", "SUCCESS", "Shipment edited successfully with ID: " + id);
            return Optional.of(savedShipment);
        } catch (Exception e) {
            loggingService.log("EDIT_SHIPMENT", "FAILURE", e.getMessage());
            throw new RuntimeException("Error editing shipment: " + e.getMessage());
        }
    }
    


    public List<Shipment> viewShipmentsByDateAndAbbreviation(Date date, String abbreviation) {
        MongoTemplate mongoTemplate = getMongoTemplate();
        loggingService.log("VIEW_SHIPMENTS", "START", "Viewing shipments for supplier: " + abbreviation + " on date: " + date);
        try {
            List<Shipment> shipments = mongoTemplate.find(query(where("shipmentDate").is(date).and("abbreviation").is(abbreviation)), Shipment.class, "shipments");
            loggingService.log("VIEW_SHIPMENTS", "SUCCESS", "Shipments viewed successfully for supplier: " + abbreviation);
            return shipments;
        } catch (Exception e) {
            loggingService.log("VIEW_SHIPMENTS", "FAILURE", e.getMessage());
            throw new RuntimeException("Error viewing shipments: " + e.getMessage());
        }
    }

    public List<Shipment> overviewShipments(Date startDate, Date endDate, String abbreviation) {
        MongoTemplate mongoTemplate = getMongoTemplate();
        loggingService.log("OVERVIEW_SHIPMENTS", "START", "Overviewing shipments from: " + startDate + " to " + endDate + " for supplier: " + abbreviation);
        try {
            List<Shipment> shipments = abbreviation == null || abbreviation.isEmpty() ?
                    mongoTemplate.find(query(where("arrivalDate").gte(startDate).lte(endDate)), Shipment.class, "shipments") :
                    mongoTemplate.find(query(where("arrivalDate").gte(startDate).lte(endDate).and("abbreviation").is(abbreviation)), Shipment.class, "shipments");
            loggingService.log("OVERVIEW_SHIPMENTS", "SUCCESS", "Overview completed for shipments.");
            return shipments;
        } catch (Exception e) {
            loggingService.log("OVERVIEW_SHIPMENTS", "FAILURE", e.getMessage());
            throw new RuntimeException("Error overviewing shipments: " + e.getMessage());
        }
    }

    public void deleteShipmentsByDateAndAbbreviation(Date date, String abbreviation) {
        loggingService.log("DELETE_SHIPMENTS", "START", "Deleting shipments for supplier: " + abbreviation + " on date: " + date);
        try {
            List<Shipment> shipments = shipmentRepository.findByShipmentDateAndAbbreviation(date, abbreviation);
            shipmentRepository.deleteAll(shipments);
            loggingService.log("DELETE_SHIPMENTS", "SUCCESS", "Shipments deleted for supplier: " + abbreviation);
        } catch (Exception e) {
            loggingService.log("DELETE_SHIPMENTS", "FAILURE", e.getMessage());
            throw new RuntimeException("Error deleting shipments: " + e.getMessage());
        }
    }

    public List<Shipment> viewAllShipments() {
        MongoTemplate mongoTemplate = getMongoTemplate();
        loggingService.log("VIEW_ALL_SHIPMENTS", "START", "Viewing all shipments");
        try {
            List<Shipment> shipments = mongoTemplate.findAll(Shipment.class, "shipments");
            loggingService.log("VIEW_ALL_SHIPMENTS", "SUCCESS", "Viewed all shipments successfully");
            return shipments;
        } catch (Exception e) {
            loggingService.log("VIEW_ALL_SHIPMENTS", "FAILURE", e.getMessage());
            throw new RuntimeException("Error viewing all shipments: " + e.getMessage());
        }
    }
    

}
