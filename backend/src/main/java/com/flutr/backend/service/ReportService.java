package com.flutr.backend.service;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.flutr.backend.model.ButterflyDetail;
import com.flutr.backend.model.HouseButterflies;
import com.flutr.backend.model.Shipment;
import com.flutr.backend.util.JwtUtil;
import com.mongodb.client.MongoClients;
import com.opencsv.CSVWriter;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class ReportService {

    private final LoggingService loggingService;
    private final JwtUtil jwtUtil;
    private final HttpServletRequest request;

    @Autowired
    public ReportService(LoggingService loggingService, JwtUtil jwtUtil, HttpServletRequest request) {
        this.loggingService = loggingService;
        this.request = request;
        this.jwtUtil = jwtUtil;
    }

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

    private boolean isSuperUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getAuthorities().stream()
                            .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_SUPERUSER"));
    }

    public void exportShipmentData(HttpServletResponse response, @RequestParam(required = false) Integer startYear, @RequestParam(required = false) Integer endYear, @RequestParam(required = false) String houseId) throws IOException {
        MongoTemplate mongoTemplate;
        if (houseId != null && isSuperUser()){
            mongoTemplate = getMongoTemplate(houseId);
        } else {
            mongoTemplate = getMongoTemplate();
        }
        Criteria criteria = new Criteria();
        loggingService.log("HANDLE_EXPORT", "START", "Starting report export");
        try {
            if (startYear != null && endYear != null) {
                criteria.and("arrivalDate").gte(new SimpleDateFormat("yyyy").parse(startYear + ""))
                        .lte(new SimpleDateFormat("yyyy").parse((endYear + 1) + ""));
            } else if (startYear != null) {
                criteria.and("arrivalDate").gte(new SimpleDateFormat("yyyy").parse(startYear + ""))
                        .lt(new SimpleDateFormat("yyyy").parse((startYear + 1) + ""));
            }
        } catch (Exception e) {
            throw new RuntimeException("Error parsing date: " + e.getMessage());
        }

        Query query = new Query(criteria).with(Sort.by(Sort.Direction.DESC, "arrivalDate"));
        List<Shipment> shipments = mongoTemplate.find(query, Shipment.class, "shipments");

        response.setContentType("text/csv");
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"shipment_report.csv\"");

        try (CSVWriter csvWriter = new CSVWriter(new PrintWriter(response.getWriter()))) {
            csvWriter.writeNext(new String[]{"Species", "Common name", "No. rec", "Supplier", "Ship date", "Arrival date", "Emerg. in transit", "Damag in transit", "No. disea", "No. parasit", "No emerg", "Poor emerg"});

            for (Shipment shipment : shipments) {
                for (ButterflyDetail detail : shipment.getButterflyDetails()) {
                    HouseButterflies houseButterfly = mongoTemplate.findOne(Query.query(Criteria.where("buttId").is(detail.getButtId())), HouseButterflies.class, "house_butterflies");

                    String[] row = new String[]{
                            detail.getButtId(),
                            houseButterfly != null ? houseButterfly.getCommonName() : "Unknown",
                            String.valueOf(detail.getNumberReceived()),
                            shipment.getAbbreviation(),
                            new SimpleDateFormat("MM-dd-yyyy").format(shipment.getShipmentDate()),
                            new SimpleDateFormat("MM-dd-yyyy").format(shipment.getArrivalDate()),
                            String.valueOf(detail.getEmergedInTransit()),
                            String.valueOf(detail.getDamaged()),
                            String.valueOf(detail.getDiseased()),
                            String.valueOf(detail.getParasite()),
                            String.valueOf(detail.getNoEmergence()),
                            String.valueOf(detail.getPoorEmergence())
                    };
                    csvWriter.writeNext(row);
                }
            }
            loggingService.log("HANDLE_EXPORT", "SUCCESS", "Finished report export successfully");
        } catch (Exception e){
            loggingService.log("HANDLE_EXPORT", "FAILURE", e.getMessage());
        }
    }
}