package com.flutr.backend.service;

import com.flutr.backend.model.Shipment;
import com.flutr.backend.model.Supplier;
import com.flutr.backend.util.JwtUtil;
import com.mongodb.client.MongoClients;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import java.util.List;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
public class SupplierService {

    private final JwtUtil jwtUtil;
    private final LoggingService loggingService;
    private final HttpServletRequest request;

    @Autowired
    public SupplierService(JwtUtil jwtUtil, LoggingService loggingService, HttpServletRequest request) {
        this.jwtUtil = jwtUtil;
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

    public Supplier addSupplier(Supplier supplier) {
        MongoTemplate mongoTemplate = getMongoTemplate();
        loggingService.log("ADD_SUPPLIER", "START", "Adding supplier: " + supplier.getFullName() + " to house: " + getCurrentHouseId());
        try {
            if (mongoTemplate.exists(query(where("abbreviation").is(supplier.getAbbreviation())), Supplier.class, "suppliers")) {
                throw new IllegalStateException("Supplier with the same abbreviation already exists");
            }
            supplier.setActive(true);
            Supplier savedSupplier = mongoTemplate.insert(supplier, "suppliers");
            loggingService.log("ADD_SUPPLIER", "SUCCESS", "Supplier added: " + supplier.getFullName());
            return savedSupplier;
        } catch (Exception e) {
            loggingService.log("ADD_SUPPLIER", "FAILURE", e.getMessage());
            throw new RuntimeException("Error adding supplier: " + e.getMessage(), e);
        }
    }

    public Supplier editSupplier(String oldAbbreviation, String newAbbreviation, String fullName, boolean isActive) {
        MongoTemplate mongoTemplate = getMongoTemplate();
        loggingService.log("EDIT_SUPPLIER", "START", "Editing supplier: " + oldAbbreviation);
        try {
            Supplier supplier = mongoTemplate.findOne(query(where("abbreviation").is(oldAbbreviation)), Supplier.class, "suppliers");
            if (supplier == null) {
                throw new RuntimeException("Supplier not found with abbreviation: " + oldAbbreviation);
            }
            supplier.setAbbreviation(newAbbreviation);
            supplier.setFullName(fullName);
            supplier.setActive(isActive);
            mongoTemplate.save(supplier, "suppliers");

            Update update = new Update().set("abbreviation", newAbbreviation);
            mongoTemplate.updateMulti(query(where("abbreviation").is(oldAbbreviation)), update, Shipment.class, "shipments");

            loggingService.log("EDIT_SUPPLIER", "SUCCESS", "Supplier: " + fullName + " and related shipments edited successfully.");
            return supplier;
        } catch (Exception e) {
            loggingService.log("EDIT_SUPPLIER", "FAILURE", e.getMessage());
            throw new RuntimeException("Error editing supplier: " + e.getMessage(), e);
        }
    }

    public void deactivateActivateSupplier(String abbreviation, boolean isActive) {
        MongoTemplate mongoTemplate = getMongoTemplate();
        loggingService.log("DEACTIVATE_ACTIVATE_SUPPLIER", "START", "Setting active status to " + isActive + " for supplier: " + abbreviation);
        try {
            Supplier supplier = mongoTemplate.findOne(query(where("abbreviation").is(abbreviation)), Supplier.class, "suppliers");
            if (supplier == null) {
                throw new RuntimeException("Supplier not found with abbreviation: " + abbreviation);
            }
            supplier.setActive(isActive);
            mongoTemplate.save(supplier, "suppliers");
            loggingService.log("DEACTIVATE_ACTIVATE_SUPPLIER", "SUCCESS", "Supplier active status changed: " + isActive);
        } catch (Exception e) {
            loggingService.log("DEACTIVATE_ACTIVATE_SUPPLIER", "FAILURE", e.getMessage());
            throw new RuntimeException("Error setting active status for supplier: " + e.getMessage(), e);
        }
    }

    public List<Supplier> viewAllSuppliers() {
        MongoTemplate mongoTemplate = getMongoTemplate();
        loggingService.log("VIEW_ALL_SUPPLIERS", "START", "Viewing all suppliers for house: " + getCurrentHouseId());
        try {
            List<Supplier> suppliers = mongoTemplate.findAll(Supplier.class, "suppliers");
            loggingService.log("VIEW_ALL_SUPPLIERS", "SUCCESS", "Viewed all suppliers successfully");
            return suppliers;
        } catch (Exception e) {
            loggingService.log("VIEW_ALL_SUPPLIERS", "FAILURE", e.getMessage());
            throw new RuntimeException("Error viewing all suppliers: " + e.getMessage(), e);
        }
    }

    public List<Supplier> viewActiveSuppliers() {
        MongoTemplate mongoTemplate = getMongoTemplate();
        loggingService.log("VIEW_ACTIVE_SUPPLIERS", "START", "Viewing all active suppliers for house: " + getCurrentHouseId());
        try {
            List<Supplier> activeSuppliers = mongoTemplate.find(query(where("isActive").is(true)), Supplier.class, "suppliers");
            loggingService.log("VIEW_ACTIVE_SUPPLIERS", "SUCCESS", "Viewed all active suppliers successfully");
            return activeSuppliers;
        } catch (Exception e) {
            loggingService.log("VIEW_ACTIVE_SUPPLIERS", "FAILURE", e.getMessage());
            throw new RuntimeException("Error viewing active suppliers: " + e.getMessage(), e);
        }
    }
    
}
