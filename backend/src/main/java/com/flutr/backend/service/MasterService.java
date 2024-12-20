package com.flutr.backend.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${butterfly.placeholder.url}")
    private String defaultImageUrl;

    public void addButterfly(Butterfly newButterfly, MultipartFile imgWingsOpenFile, MultipartFile imgWingsClosedFile, MultipartFile extraImg1File, MultipartFile extraImg2File) throws IOException {
        if (imgWingsOpenFile != null && !imgWingsOpenFile.isEmpty()) {
            String openKey = newButterfly.getButtId() + "_open." + getFileExtension(imgWingsOpenFile.getOriginalFilename());
            String openUrl = storageService.uploadFile("flutr-butt-images", openKey, imgWingsOpenFile);
            newButterfly.setImgWingsOpen(openUrl);
        } else {
            newButterfly.setImgWingsOpen(defaultImageUrl);
        }
        if (imgWingsClosedFile != null && !imgWingsClosedFile.isEmpty()) {
            String closedKey = newButterfly.getButtId() + "_closed." + getFileExtension(imgWingsClosedFile.getOriginalFilename());
            String closedUrl = storageService.uploadFile("flutr-butt-images", closedKey, imgWingsClosedFile);
            newButterfly.setImgWingsClosed(closedUrl);
        } else {
            newButterfly.setImgWingsClosed(defaultImageUrl);
        }
        if (extraImg1File != null && !extraImg1File.isEmpty()) {
            String extra1Key = newButterfly.getButtId() + "_extra1." + getFileExtension(extraImg1File.getOriginalFilename());
            String extra1Url = storageService.uploadFile("flutr-butt-images", extra1Key, extraImg1File);
            newButterfly.setExtraImg1(extra1Url);
        } else {
            newButterfly.setExtraImg1("");
        }
        if (extraImg2File != null && !extraImg2File.isEmpty()) {
            String extra2Key = newButterfly.getButtId() + "_extra2." + getFileExtension(extraImg2File.getOriginalFilename());
            String extra2Url = storageService.uploadFile("flutr-butt-images", extra2Key, extraImg2File);
            newButterfly.setExtraImg2(extra2Url);
        } else {
            newButterfly.setExtraImg2("");
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

    public void checkAndAddButterfly(Butterfly newButterfly, MultipartFile imgWingsOpenFile, MultipartFile imgWingsClosedFile, MultipartFile extraImg1File, MultipartFile extraImg2File) throws IOException {
        // Check if butterfly already exists in Master_DB
        Butterfly existingMasterButterfly = masterMongoTemplate.findOne(
            Query.query(Criteria.where("buttId").is(newButterfly.getButtId())), 
            Butterfly.class, 
            "butterflies"
        );
    
        if (existingMasterButterfly == null) {
            // Butterfly does not exist in Master_DB, add it
            if (imgWingsOpenFile != null && !imgWingsOpenFile.isEmpty()) {
                String openKey = newButterfly.getButtId() + "_open." + getFileExtension(imgWingsOpenFile.getOriginalFilename());
                String openUrl = storageService.uploadFile("flutr-butt-images", openKey, imgWingsOpenFile);
                newButterfly.setImgWingsOpen(openUrl);
            } else {
                newButterfly.setImgWingsOpen(defaultImageUrl);
            }
            if (imgWingsClosedFile != null && !imgWingsClosedFile.isEmpty()) {
                String closedKey = newButterfly.getButtId() + "_closed." + getFileExtension(imgWingsClosedFile.getOriginalFilename());
                String closedUrl = storageService.uploadFile("flutr-butt-images", closedKey, imgWingsClosedFile);
                newButterfly.setImgWingsClosed(closedUrl);
            } else {
                newButterfly.setImgWingsClosed(defaultImageUrl);
            }
            if (extraImg1File != null && !extraImg1File.isEmpty()) {
                String extra1Key = newButterfly.getButtId() + "_extra1." + getFileExtension(extraImg1File.getOriginalFilename());
                String extra1Url = storageService.uploadFile("flutr-butt-images", extra1Key, extraImg1File);
                newButterfly.setExtraImg1(extra1Url);
            } else {
                newButterfly.setExtraImg1("");
            }
            if (extraImg2File != null && !extraImg2File.isEmpty()) {
                String extra2Key = newButterfly.getButtId() + "_extra2." + getFileExtension(extraImg2File.getOriginalFilename());
                String extra2Url = storageService.uploadFile("flutr-butt-images", extra2Key, extraImg2File);
                newButterfly.setExtraImg2(extra2Url);
            } else {
                newButterfly.setExtraImg2("");
            }
    
            // Insert into Master_DB
            masterMongoTemplate.insert(newButterfly, "butterflies");
        } else {
            newButterfly.setImgWingsOpen(existingMasterButterfly.getImgWingsOpen());
            newButterfly.setImgWingsClosed(existingMasterButterfly.getImgWingsClosed());
            newButterfly.setExtraImg1(existingMasterButterfly.getExtraImg1());
            newButterfly.setExtraImg2(existingMasterButterfly.getExtraImg2());
        }
    
        List<Org> allOrgs = orgRepository.findAll();
    
        allOrgs.forEach(org -> {
            MongoTemplate houseMongoTemplate = new MongoTemplate(MongoClients.create(), org.getHouseId() + "_DB");
            
            HouseButterflies houseButterfly = houseMongoTemplate.findOne(
                Query.query(Criteria.where("buttId").is(newButterfly.getButtId())), 
                HouseButterflies.class, 
                "house_butterflies"
            );
    
            if (houseButterfly == null) {
                houseButterfly = new HouseButterflies();
                BeanUtils.copyProperties(newButterfly, houseButterfly);
                houseButterfly.setNoInFlight(0);
                houseButterfly.setTotalFlown(0);
                houseButterfly.setTotalReceived(0);
                houseButterfly.setBOTD(false);
                houseButterfly.setFirstFlownOn(null);
                houseButterfly.setLastFlownOn(null);
                houseMongoTemplate.insert(houseButterfly, "house_butterflies");
            } else {
                Update update = new Update()
                    .set("imgWingsOpen", newButterfly.getImgWingsOpen())
                    .set("imgWingsClosed", newButterfly.getImgWingsClosed())
                    .set("extraImg1", newButterfly.getExtraImg1())
                    .set("extraImg2", newButterfly.getExtraImg2())
                    .set("family", newButterfly.getFamily())
                    .set("subFamily", newButterfly.getSubFamily())
                    .set("lifespan", newButterfly.getLifespan())
                    .set("range", newButterfly.getRange())
                    .set("plant", newButterfly.getPlant())
                    .set("habitat", newButterfly.getHabitat())
                    .set("funFacts", newButterfly.getFunFacts());
                houseMongoTemplate.updateFirst(Query.query(Criteria.where("buttId").is(houseButterfly.getButtId())), update, HouseButterflies.class);
            }
        });
    }

    public void editButterfly(Butterfly updatedButterfly, MultipartFile imgWingsOpenFile, MultipartFile imgWingsClosedFile, MultipartFile extraImg1File, MultipartFile extraImg2File) throws IOException {
        final String openUrl, closedUrl, extraImg1Url, extraImg2Url;
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
            openUrl = existingButterfly.getImgWingsOpen();
        }
    
        if (imgWingsClosedFile != null && !imgWingsClosedFile.isEmpty()) {
            String closedKey = updatedButterfly.getButtId() + "_closed." + getFileExtension(imgWingsClosedFile.getOriginalFilename());
            closedUrl = storageService.uploadFile("flutr-butt-images", closedKey, imgWingsClosedFile);
            masterUpdate.set("imgWingsOpen", openUrl);
        } else {
            closedUrl = existingButterfly.getImgWingsClosed();
        }

        if (extraImg1File != null && !extraImg1File.isEmpty()) {
            String extra1Key = updatedButterfly.getButtId() + "_extra1." + getFileExtension(extraImg1File.getOriginalFilename());
            extraImg1Url = storageService.uploadFile("flutr-butt-images", extra1Key, extraImg1File);
            masterUpdate.set("extraImg1", extraImg1Url);
        } else {
            extraImg1Url = updatedButterfly.getExtraImg1();
        }
    
        if (extraImg2File != null && !extraImg2File.isEmpty()) {
            String extra2Key = updatedButterfly.getButtId() + "_extra2." + getFileExtension(extraImg2File.getOriginalFilename());
            extraImg2Url = storageService.uploadFile("flutr-butt-images", extra2Key, extraImg2File);
            masterUpdate.set("extraImg2", extraImg2Url);
        } else {
            extraImg2Url = updatedButterfly.getExtraImg2();
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
                .set("imgWingsClosed", closedUrl)
                .set("extraImg1", extraImg1Url)
                .set("extraImg2", extraImg2Url);

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

    public void deleteButterfly(String buttId) {
        Query query = new Query(Criteria.where("buttId").is(buttId));
        if (!masterMongoTemplate.exists(query, Butterfly.class, "butterflies")) {
            throw new IllegalStateException("Butterfly with ID: " + buttId + " does not exist.");
        }
    
        masterMongoTemplate.remove(query, Butterfly.class, "butterflies");
    
        List<Org> allOrgs = masterMongoTemplate.findAll(Org.class, "orgs");
        allOrgs.forEach(org -> {
            MongoTemplate houseMongoTemplate = new MongoTemplate(MongoClients.create(), org.getHouseId() + "_DB");
            houseMongoTemplate.remove(query, HouseButterflies.class, "house_butterflies");
        });
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
        Query query = Query.query(Criteria.where("buttId").is(buttId));
        return masterMongoTemplate.findOne(query, Butterfly.class, "butterflies");
    }

    private String getFileExtension(String fileName) {
        if (fileName.lastIndexOf(".") != -1 && fileName.lastIndexOf(".") != 0) {
            return fileName.substring(fileName.lastIndexOf(".") + 1);
        } else {
            return "";
        }
    }
}