package com.flutr.backend.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.flutr.backend.model.Butterfly;
import com.flutr.backend.model.HouseButterflies;
import com.flutr.backend.model.Org;
import com.flutr.backend.repository.OrgRepository;
import com.mongodb.client.MongoClients;

import java.util.List;

@Service
public class MasterService {
    
    @Autowired
    private MongoTemplate masterMongoTemplate;

    @Autowired
    private OrgRepository orgRepository; 

    public void addButterfly(Butterfly newButterfly) {
        masterMongoTemplate.insert(newButterfly, "butterflies");

        List<Org> allOrgs = orgRepository.findAll();

        allOrgs.forEach(org -> {
            MongoTemplate houseMongoTemplate = new MongoTemplate(MongoClients.create(), org.getHouseId() + "_DB");
            HouseButterflies houseButterfly = new HouseButterflies();
            BeanUtils.copyProperties(newButterfly, houseButterfly);
            houseButterfly.setNoInFlight(0);
            houseButterfly.setTotalFlown(0);
            houseButterfly.setTotalReceived(0);
            houseButterfly.setBOTD(false);
            houseButterfly.setFirstFlownOn(null);
            houseButterfly.setLastFlownOn(null);
            houseMongoTemplate.insert(houseButterfly, "house_butterflies");
        });
    }

    public void editButterfly(Butterfly updatedButterfly) {
        masterMongoTemplate.save(updatedButterfly, "butterflies");

        List<Org> allOrgs = masterMongoTemplate.findAll(Org.class, "orgs");

        allOrgs.forEach(org -> {
            MongoTemplate houseMongoTemplate = new MongoTemplate(MongoClients.create(), org.getHouseId() + "_DB");
            Query query = new Query().addCriteria(Criteria.where("buttId").is(updatedButterfly.getButtId()));
            Update update = new Update()
                .set("family", updatedButterfly.getFamily())
                .set("subFamily", updatedButterfly.getSubFamily())
                .set("range", updatedButterfly.getRange())
                .set("plant", updatedButterfly.getPlant())
                .set("habitat", updatedButterfly.getHabitat())
                .set("funFacts", updatedButterfly.getFunFacts());

            houseMongoTemplate.updateFirst(query, update, HouseButterflies.class);
        });
    }

    public void editButterflyCommonNameAndLifespan(String buttId, String commonName, int lifespan) {
        Query query = new Query(Criteria.where("buttId").is(buttId));
        Update update = new Update()
            .set("commonName", commonName)
            .set("lifespan", lifespan);
        masterMongoTemplate.updateFirst(query, update, Butterfly.class, "butterflies");
    }

    public List<Butterfly> getAllButterflies() {
        return masterMongoTemplate.findAll(Butterfly.class, "butterflies");
    }

    public Butterfly getButterflyDetails(String buttId) {
        Query query = Query.query(Criteria.where("buttId").is(buttId));
        query.fields().include("buttId").include("commonName").include("lifespan").include("imgWingsOpen");
        return masterMongoTemplate.findOne(query, Butterfly.class, "butterflies");
    }
    
    public Butterfly getFullButterflyDetails(String buttId) {
        return masterMongoTemplate.findById(buttId, Butterfly.class, "butterflies");
    }
}