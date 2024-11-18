package com.flutr.backend.service;

import com.flutr.backend.model.LogEntry;
import com.flutr.backend.model.Org;
import com.flutr.backend.repository.OrgRepository;
import com.flutr.backend.util.JwtUtil;
import com.mongodb.client.MongoClients;
import com.mongodb.client.result.DeleteResult;

import jakarta.servlet.http.HttpServletRequest;

import java.util.Calendar;
import java.util.List;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.scheduling.annotation.Scheduled;

@Service
public class LoggingService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private OrgRepository orgRepository;

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
        LogEntry logEntry = new LogEntry(operation, status, getUsernameFromToken() + ": " + details);
        mongoTemplate.save(logEntry, "logs");
    }

    public void log(String operation, String status, String details, String houseId) {
        MongoTemplate mongoTemplate = getMongoTemplate(houseId);
        LogEntry logEntry = new LogEntry(operation, status, "System: " + details);
        mongoTemplate.save(logEntry, "logs");
    }

    public List<LogEntry> getAllLogsSorted() {
        MongoTemplate mongoTemplate = getMongoTemplate();
        Query query = new Query();
        query.with(Sort.by(Sort.Direction.DESC, "timestamp"));
        return mongoTemplate.find(query, LogEntry.class, "logs");
    }

    @Scheduled(cron = "0 0 1 1 * ?") // at 01:00 on the first day of every month
    public void deleteOldLogs() {
        List<Org> allOrgs = orgRepository.findAll();
        allOrgs.forEach(org -> {
            try {
                MongoTemplate houseMongoTemplate = getMongoTemplate(org.getHouseId());
                Calendar threeMonthsAgo = Calendar.getInstance();
                threeMonthsAgo.add(Calendar.MONTH, -3);
                Date threeMonthsAgoDate = threeMonthsAgo.getTime();

                Query oldLogsQuery = new Query().addCriteria(Criteria.where("timestamp").lt(threeMonthsAgoDate));
                DeleteResult result = houseMongoTemplate.remove(oldLogsQuery, LogEntry.class, "logs");
                log("DELETE_OLD_LOGS", "SUCCESS", "Deleted " + result.getDeletedCount() + " logs older than 3 months for house ID: " + org.getHouseId(), org.getHouseId());
            } catch (Exception e) {
                log("DELETE_OLD_LOGS", "FAILURE", "Error deleting old logs for house ID: " + org.getHouseId() + ": " + e.getMessage(), org.getHouseId());
            }
        });
    }
}
