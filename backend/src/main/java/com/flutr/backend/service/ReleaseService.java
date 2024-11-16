package com.flutr.backend.service;

import com.flutr.backend.dto.releases.InflightData;
import com.flutr.backend.dto.releases.ReleaseRequest;
import com.flutr.backend.model.HouseButterflies;
import com.flutr.backend.model.Inflight;
import com.flutr.backend.model.Org;
import com.flutr.backend.model.Shipment;
import com.flutr.backend.repository.OrgRepository;
import com.flutr.backend.util.JwtUtil;
import com.mongodb.client.MongoClients;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Service
public class ReleaseService {

    private final LoggingService loggingService;
    private final JwtUtil jwtUtil;
    private final HttpServletRequest request;
    private final OrgRepository orgRepository;

    @Autowired
    public ReleaseService(LoggingService loggingService, JwtUtil jwtUtil, HttpServletRequest request, OrgRepository orgRepository) {
        this.loggingService = loggingService;
        this.request = request;
        this.jwtUtil = jwtUtil;
        this.orgRepository = orgRepository;
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

            Date releaseDate = request.getReleaseDate() != null ? request.getReleaseDate() : new Date(); 

            // Update butterfly details with release info
            request.getButterflyUpdates().forEach(update -> {
                shipment.getButterflyDetails().forEach(detail -> {
                    if (detail.getButtId().equals(update.getButtId())) {
                        // Update release-related fields
                        detail.setNumberReleased(detail.getNumberReleased() + update.getNumberReleased());
                        detail.setPoorEmergence(detail.getPoorEmergence() + update.getPoorEmergence());
                        detail.setNoEmergence(detail.getNoEmergence() + update.getNoEmergence());
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
                                detail.getPoorEmergence() +
                                detail.getNoEmergence());
                        detail.setTotalRemaining(totalRemaining);
                        
                        if (update.getNumberReleased() > 0) {
                            Query query = new Query(Criteria.where("buttId").is(detail.getButtId()));
                            HouseButterflies houseButterfly = mongoTemplate.findOne(query, HouseButterflies.class, "house_butterflies");
                            if (houseButterfly != null) {
                                // Calculate the endDate
                                Calendar cal = Calendar.getInstance();
                                cal.setTime(releaseDate); // sets to current date
                                cal.add(Calendar.DAY_OF_MONTH, houseButterfly.getLifespan()); // adds the lifespan

                                Inflight inflight = new Inflight(detail.getButtId(), update.getNumberReleased(), releaseDate, cal.getTime());
                                loggingService.log("HANDLE_RELEASE", "INFO", "Preparing to insert inflight data for Butterfly ID: " + detail.getButtId());
                                mongoTemplate.insert(inflight, "inflight");
                                loggingService.log("HANDLE_RELEASE", "INFO", "Inflight data inserted for Butterfly ID: " + detail.getButtId());
                            }
                        }
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

    @Scheduled(cron = "0 59 23 * * ?") // Executes at 23:59 every night
    public void processInflightAndSetBOTD() {
        List<Org> allOrgs = orgRepository.findAll();
        loggingService.log("PROCESS_INFLIGHT_AND_SET_BOTD", "START", "Starting inflight processing and BOTD selection");
        allOrgs.forEach(org -> {
            MongoTemplate houseMongoTemplate = new MongoTemplate(MongoClients.create(), org.getHouseId() + "_DB");
            Query expiredQuery = new Query().addCriteria(Criteria.where("endDate").lte(new Date()));
            houseMongoTemplate.remove(expiredQuery, Inflight.class, "inflight");

            List<Inflight> remainingInflight = houseMongoTemplate.findAll(Inflight.class, "inflight");
            if (!remainingInflight.isEmpty()) {
                String randomButtId = remainingInflight.get(new Random().nextInt(remainingInflight.size())).getButtId();
                Update update = new Update();
                update.set("isBOTD", false);
                houseMongoTemplate.updateMulti(new Query(), update, HouseButterflies.class);

                update = new Update();
                update.set("isBOTD", true);
                houseMongoTemplate.updateFirst(Query.query(Criteria.where("buttId").is(randomButtId)), update, HouseButterflies.class);
                loggingService.log("PROCESS_INFLIGHT_AND_SET_BOTD", "SUCCESS", "BOTD set for house ID: " + org.getHouseId());
            } else {
                loggingService.log("PROCESS_INFLIGHT_AND_SET_BOTD", "FAILURE", "No remaining inflight for house ID: " + org.getHouseId());
            }
        });
    }

    public InflightData getInflightData(String houseId) {
        try{
            MongoTemplate houseMongoTemplate = new MongoTemplate(MongoClients.create(), houseId + "_DB");
            List<Inflight> inflights = houseMongoTemplate.findAll(Inflight.class, "inflight");
            int totalInFlight = inflights.stream().mapToInt(Inflight::getNoInFlight).sum();
            long speciesInFlight = inflights.stream().map(Inflight::getButtId).distinct().count();
        
            return new InflightData(inflights, totalInFlight, speciesInFlight);
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving inflight data: " + e.getMessage());
        }
    }

    public HouseButterflies getBOTD(String houseId) {
        try{
            MongoTemplate houseMongoTemplate = new MongoTemplate(MongoClients.create(), houseId + "_DB");
            return houseMongoTemplate.findOne(Query.query(Criteria.where("isBOTD").is(true)), HouseButterflies.class, "house_butterflies");
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving BOTD: " + e.getMessage());
        }
    }
    
}
