package com.flutr.backend.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.flutr.backend.model.Butterfly;
import com.flutr.backend.model.HouseButterflies;
import com.flutr.backend.model.Org;
import com.flutr.backend.repository.OrgRepository;
import com.mongodb.client.MongoClients;

import java.io.IOException;

import java.util.List;

@Service
public class MasterService {
    
    @Autowired
    private MongoTemplate masterMongoTemplate;

    @Autowired
    private OrgRepository orgRepository; 

    @Autowired
    private StorageService storageService;

    public void addButterfly(Butterfly newButterfly, MultipartFile imgWingsOpenFile, MultipartFile imgWingsClosedFile) throws IOException {
        if (imgWingsOpenFile != null && !imgWingsOpenFile.isEmpty()) {
            String openKey = newButterfly.getButtId() + "_open." + getFileExtension(imgWingsOpenFile.getOriginalFilename());
            String openUrl = storageService.uploadFile("flutr-butt-images", openKey, imgWingsOpenFile);
            newButterfly.setImgWingsOpen(openUrl);
        }
        if (imgWingsClosedFile != null && !imgWingsClosedFile.isEmpty()) {
            String closedKey = newButterfly.getButtId() + "_closed." + getFileExtension(imgWingsClosedFile.getOriginalFilename());
            String closedUrl = storageService.uploadFile("flutr-butt-images", closedKey, imgWingsClosedFile);
            newButterfly.setImgWingsClosed(closedUrl);
        }
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

    public void editButterfly(Butterfly updatedButterfly, MultipartFile imgWingsOpenFile, MultipartFile imgWingsClosedFile) throws IOException {
        final String openUrl, closedUrl;
        Query existsQuery = new Query();
        existsQuery.addCriteria(Criteria.where("buttId").is(updatedButterfly.getButtId()));
        Butterfly existingButterfly = masterMongoTemplate.findOne(existsQuery, Butterfly.class, "butterflies");
        if (existingButterfly == null) {
            throw new IllegalStateException("Butterfly with ID: " + updatedButterfly.getButtId() + " does not exist.");
        }

        Update masterUpdate = new Update();


        if (imgWingsOpenFile != null && !imgWingsOpenFile.isEmpty()) {
            String openKey = updatedButterfly.getButtId() + "_open." + getFileExtension(imgWingsOpenFile.getOriginalFilename());
            openUrl = storageService.uploadFile("flutr-butt-images", openKey, imgWingsOpenFile);
            masterUpdate.set("imgWingsOpen", openUrl);
        } else {
            openUrl = updatedButterfly.getImgWingsOpen();
        }
    
        if (imgWingsClosedFile != null && !imgWingsClosedFile.isEmpty()) {
            String closedKey = updatedButterfly.getButtId() + "_closed." + getFileExtension(imgWingsClosedFile.getOriginalFilename());
            closedUrl = storageService.uploadFile("flutr-butt-images", closedKey, imgWingsClosedFile);
            masterUpdate.set("imgWingsOpen", openUrl);
        } else {
            closedUrl = updatedButterfly.getImgWingsClosed();
        }

        masterUpdate.set("family", updatedButterfly.getFamily())
          .set("subFamily", updatedButterfly.getSubFamily())
          .set("range", updatedButterfly.getRange())
          .set("plant", updatedButterfly.getPlant())
          .set("habitat", updatedButterfly.getHabitat())
          .set("funFacts", updatedButterfly.getFunFacts());
          masterMongoTemplate.updateFirst(existsQuery, masterUpdate, Butterfly.class);

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
                .set("funFacts", updatedButterfly.getFunFacts())
                .set("imgWingsOpen", openUrl)
                .set("imgWingsClosed", closedUrl);

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

    private String getFileExtension(String fileName) {
        if (fileName.lastIndexOf(".") != -1 && fileName.lastIndexOf(".") != 0) {
            return fileName.substring(fileName.lastIndexOf(".") + 1);
        } else {
            return "";
        }
    }
}