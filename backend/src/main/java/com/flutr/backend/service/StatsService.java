package com.flutr.backend.service;

import java.util.List;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.flutr.backend.dto.stats.ContinentInflightStats;
import com.flutr.backend.dto.stats.FamilyInflightStats;
import com.flutr.backend.model.HouseButterflies;
import com.mongodb.client.MongoClients;

@Service
public class StatsService {

    private MongoTemplate getHouseMongoTemplate(String houseId) {
        return new MongoTemplate(MongoClients.create(), houseId + "_DB");
    }
    
    public List<FamilyInflightStats> getFamilyInflightStats(String houseId) {
        MongoTemplate houseTemplate = getHouseMongoTemplate(houseId);
        Aggregation aggregation = Aggregation.newAggregation(
            Aggregation.group("family").sum("noInFlight").as("totalInFlight"),
            Aggregation.project("totalInFlight").and("family").previousOperation()
        );
        return houseTemplate.aggregate(aggregation, "house_butterflies", FamilyInflightStats.class).getMappedResults();
    }

    public HouseButterflies getMostInFlightButterfly(String houseId) {
        MongoTemplate houseTemplate = getHouseMongoTemplate(houseId);
        Query query = new Query().with(Sort.by(Sort.Direction.DESC, "noInFlight")).limit(1);
        return houseTemplate.findOne(query, HouseButterflies.class, "house_butterflies");
    }

    public HouseButterflies getLeastInFlightButterfly(String houseId) {
        MongoTemplate houseTemplate = getHouseMongoTemplate(houseId);
        Query query = new Query(Criteria.where("noInFlight").gt(0)).with(Sort.by(Sort.Direction.ASC, "noInFlight")).limit(1);
        return houseTemplate.findOne(query, HouseButterflies.class, "house_butterflies");
    }

    public List<ContinentInflightStats> getContinentInflightStats(String houseId) {
        MongoTemplate houseTemplate = getHouseMongoTemplate(houseId);
        Aggregation aggregation = Aggregation.newAggregation(
            Aggregation.unwind("range"),
            Aggregation.group("range").sum("noInFlight").as("totalInFlight"),
            Aggregation.project("totalInFlight").and("continent").previousOperation()
        );
        return houseTemplate.aggregate(aggregation, "house_butterflies", ContinentInflightStats.class).getMappedResults();
    }
}
