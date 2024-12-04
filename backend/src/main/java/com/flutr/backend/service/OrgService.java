package com.flutr.backend.service;

import com.flutr.backend.model.Butterfly;
import com.flutr.backend.model.HouseButterflies;
import com.flutr.backend.model.Org;
import com.flutr.backend.model.OrgInfo;
import com.flutr.backend.model.Supplier;
import com.flutr.backend.model.User;
import com.flutr.backend.model.UserRole;
import com.flutr.backend.repository.OrgRepository;
import com.flutr.backend.repository.UserRepository;
import com.flutr.backend.util.JwtUtil;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.UpdateResult;

import java.io.IOException;
import java.util.List;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class OrgService {

    @Autowired
    private OrgRepository orgRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private LoggingService loggingService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private StorageService storageService;

    @Value("${facility.placeholder.url}")
    private String defaultFacilityImgUrl;

    @Value("${logo.placeholder.url}")
    private String defaultLogoImgUrl;

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

    private String getCurrentSubdomain() {
        final String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            try {
                return jwtUtil.extractSubdomain(jwt);
            } catch (Exception e) {
                throw new IllegalStateException("Failed to extract subdomain from JWT", e);
            }
        } else {
            throw new SecurityException("No JWT token found in request headers");
        }
    }

    public String createOrg(Org org) {

        if (org.getSubdomain() == null || org.getSubdomain().isEmpty()) {
            throw new IllegalArgumentException("Subdomain is required and cannot be empty");
        }

        org.setHouseId(org.getSubdomain());

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_SUPERUSER"))) {
            throw new SecurityException("Only SUPERUSER can create organizations");
        }

        if (orgRepository.existsBySubdomainOrHouseId(org.getSubdomain(), org.getHouseId())) {
            throw new IllegalStateException("An organization already exists with this subdomain or houseId");
        }
        org.setFacilityImage(defaultFacilityImgUrl);
        org.setLogo(defaultLogoImgUrl);
        orgRepository.save(org);
        initializeNewOrgDatabase(org);
        createInitialAdminUser(org);

        return "Organization created successfully with ID: " + org.getHouseId();
    }


    private void initializeNewOrgDatabase(Org org) {
        MongoClient mongoClient = MongoClients.create();
        MongoDatabase newOrgDatabase = mongoClient.getDatabase(org.getHouseId() + "_DB");

        newOrgDatabase.createCollection("org_info");
        newOrgDatabase.createCollection("house_butterflies");
        newOrgDatabase.createCollection("inflight");
        newOrgDatabase.createCollection("suppliers");
        newOrgDatabase.createCollection("shipments");
        newOrgDatabase.createCollection("logs");

        MongoTemplate orgMongoTemplate = new MongoTemplate(mongoClient, org.getHouseId() + "_DB");
        MongoTemplate reimanTemplate = new MongoTemplate(mongoClient, "reiman-gardens_DB");
        OrgInfo orgInfo = new OrgInfo(
            org.getHouseId(),
            org.getName(),
            org.getAddress(),
            org.getLogo(),
            org.getFacilityImage(),
            org.getAdminEmail(),
            java.util.Arrays.asList("#808080", "#808080", "#808080"),
            org.getSubdomain(),
            new OrgInfo.SocialMediaLinks(),
            "",
            new OrgInfo.Otd(false, ""),
            new OrgInfo.News(false, "News", "", ""),
            true,
            "CST"
        );
        
        OrgInfo.SocialMediaLinks socials = new OrgInfo.SocialMediaLinks(false, "", false, "", false, "", false, "");
        orgInfo.setSocials(socials);

        orgMongoTemplate.insert(orgInfo, "org_info");

        MongoTemplate masterTemplate = new MongoTemplate(mongoClient, "Master_DB");
        List<Butterfly> butterflies = masterTemplate.findAll(Butterfly.class);

        butterflies.forEach(butterfly -> {
            HouseButterflies houseButterfly = new HouseButterflies();
            BeanUtils.copyProperties(butterfly, houseButterfly);
            houseButterfly.setNoInFlight(0);
            houseButterfly.setTotalFlown(0);
            houseButterfly.setTotalReceived(0);
            houseButterfly.setBOTD(false);
            houseButterfly.setFirstFlownOn(null);
            houseButterfly.setLastFlownOn(null);
            orgMongoTemplate.insert(houseButterfly, "house_butterflies");
        });

        List<Supplier> suppliers = reimanTemplate.findAll(Supplier.class, "suppliers");
        suppliers.forEach(supplier -> {
            Supplier newSupplier = new Supplier();
            BeanUtils.copyProperties(supplier, newSupplier);
            orgMongoTemplate.insert(newSupplier, "suppliers");
        });

    }

    private void createInitialAdminUser(Org org) {
        User adminUser = new User();
        adminUser.setUsername(org.getAdminEmail());
        adminUser.setPassword(passwordEncoder.encode("butterfly123"));
        adminUser.setHouseId(org.getHouseId());
        adminUser.setSubdomain(org.getSubdomain());
        adminUser.setRole(UserRole.ADMIN);
	    adminUser.setActive(true);

        userRepository.save(adminUser);
    }

    public OrgInfo editOrg(OrgInfo updatedOrgInfo, MultipartFile logoFile, MultipartFile facilityImageFile, MultipartFile newsImageFile) {
        loggingService.log("EDIT_ORG", "START", "Attempting to update Org with ID: " + updatedOrgInfo.getHouseId());
        MongoTemplate mongoTemplate = getMongoTemplate();
        MongoTemplate masterMongoTemplate = new MongoTemplate(MongoClients.create(), "Master_DB"); 
        String bucketName = "flutr-org-images"; 
    
        Query orgInfoQuery = new Query(Criteria.where("houseId").is(updatedOrgInfo.getHouseId()));
        OrgInfo existingOrgInfo = mongoTemplate.findOne(orgInfoQuery, OrgInfo.class, "org_info");
        if (existingOrgInfo == null) {
            loggingService.log("EDIT_ORG", "ERROR", "Organization with ID: " + updatedOrgInfo.getHouseId() + " not found in org_info.");
            throw new IllegalArgumentException("Organization with ID: " + updatedOrgInfo.getHouseId() + " not found.");
        }

        Query orgQuery = new Query(Criteria.where("houseId").is(updatedOrgInfo.getHouseId()));
        Org existingOrg = masterMongoTemplate.findOne(orgQuery, Org.class, "orgs");
        if (existingOrg == null) {
            loggingService.log("EDIT_ORG", "ERROR", "Master DB Organization with ID: " + updatedOrgInfo.getHouseId() + " not found.");
            throw new IllegalArgumentException("Master DB Organization with ID: " + updatedOrgInfo.getHouseId() + " not found.");
        }

        boolean subdomainUpdated = !existingOrg.getSubdomain().equals(updatedOrgInfo.getWebsite());
    
        try {
            if (logoFile != null && !logoFile.isEmpty()) {
                String logoKey = updatedOrgInfo.getHouseId() + "/" + updatedOrgInfo.getHouseId() + "_logo." + getFileExtension(logoFile.getOriginalFilename());
                loggingService.log("EDIT_ORG", "UPLOAD", "Uploading logo file for Org: " + updatedOrgInfo.getHouseId());
                String logoUrl = storageService.uploadFile(bucketName, logoKey, logoFile);
                existingOrgInfo.setLogoUrl(logoUrl);
                existingOrg.setLogo(logoUrl);
            } else {
                if (updatedOrgInfo.getLogoUrl() == "") {
                    existingOrgInfo.setLogoUrl(defaultLogoImgUrl);
                    existingOrg.setLogo(defaultLogoImgUrl);
                } else {
                    existingOrgInfo.setLogoUrl(updatedOrgInfo.getLogoUrl());
                    existingOrg.setLogo(updatedOrgInfo.getLogoUrl());
                }
            }
    
            if (facilityImageFile != null && !facilityImageFile.isEmpty()) {
                String facilityKey = updatedOrgInfo.getHouseId() + "/" + updatedOrgInfo.getHouseId() + "_facilityImg." + getFileExtension(facilityImageFile.getOriginalFilename());
                loggingService.log("EDIT_ORG", "UPLOAD", "Uploading facility image file for Org: " + updatedOrgInfo.getHouseId());
                String facilityUrl = storageService.uploadFile(bucketName, facilityKey, facilityImageFile);
                existingOrgInfo.setFacilityImgUrl(facilityUrl);
                existingOrg.setFacilityImage(facilityUrl);
            } else {
                if (updatedOrgInfo.getFacilityImgUrl() == "") {
                    existingOrgInfo.setFacilityImgUrl(defaultFacilityImgUrl);
                    existingOrg.setFacilityImage(defaultFacilityImgUrl);
                } else {
                    existingOrgInfo.setFacilityImgUrl(updatedOrgInfo.getFacilityImgUrl());
                    existingOrg.setFacilityImage(updatedOrgInfo.getFacilityImgUrl());
                }
            }

            if (newsImageFile != null && !newsImageFile.isEmpty()) {
                String newsKey = updatedOrgInfo.getHouseId() + "/" + updatedOrgInfo.getHouseId() + "_news." + getFileExtension(newsImageFile.getOriginalFilename());
                loggingService.log("EDIT_ORG", "UPLOAD", "Uploading news image file for Org: " + updatedOrgInfo.getHouseId());
                String newsImageUrl = storageService.uploadFile(bucketName, newsKey, newsImageFile);
                existingOrgInfo.getNews().setNewsImageUrl(newsImageUrl);
            } else {
                existingOrgInfo.getNews().setNewsImageUrl(updatedOrgInfo.getNews().getNewsImageUrl());
            }
        } catch (IOException e) {
            loggingService.log("EDIT_ORG", "FAILURE", "Failed to upload images: " + e.getMessage());
            throw new RuntimeException("Failed to convert multipart file to file: " + e.getMessage());
        }
    
        existingOrgInfo.setName(updatedOrgInfo.getName());
        existingOrgInfo.setAddress(updatedOrgInfo.getAddress());
        existingOrgInfo.setColors(updatedOrgInfo.getColors());
        existingOrgInfo.setWebsite(updatedOrgInfo.getWebsite());
        existingOrgInfo.setSocials(updatedOrgInfo.getSocials());
        existingOrgInfo.setSubheading(updatedOrgInfo.getSubheading());
        existingOrgInfo.setOtd(updatedOrgInfo.getOtd());

        existingOrgInfo.getNews().setActive(updatedOrgInfo.getNews().isActive());
        existingOrgInfo.getNews().setNewsTitle(updatedOrgInfo.getNews().getNewsTitle());
        existingOrgInfo.getNews().setNewsContent(updatedOrgInfo.getNews().getNewsContent());

        existingOrgInfo.setStatsActive(updatedOrgInfo.getStatsActive());
        existingOrgInfo.setTimezone(updatedOrgInfo.getTimezone());
    
        loggingService.log("EDIT_ORG", "SAVE", "Saving updated OrgInfo to org_info collection.");
        mongoTemplate.save(existingOrgInfo, "org_info");

        
        existingOrg.setName(updatedOrgInfo.getName());
        existingOrg.setAddress(updatedOrgInfo.getAddress());
        existingOrg.setSubdomain(updatedOrgInfo.getWebsite());
        loggingService.log("EDIT_ORG", "SAVE", "Saving updated Org to orgs in Master_DB.");
        masterMongoTemplate.save(existingOrg, "orgs");
        
        if (subdomainUpdated) {
            Update update = new Update();
            update.set("subdomain", updatedOrgInfo.getWebsite());
            Query userUpdateQuery = new Query(Criteria.where("houseId").is(updatedOrgInfo.getHouseId()));
            UpdateResult result = masterMongoTemplate.updateMulti(userUpdateQuery, update, User.class, "users");
            loggingService.log("EDIT_ORG", "UPDATE_USERS", "Updated subdomain for users: " + result.getModifiedCount() + " users updated.");
        }

        
        return existingOrgInfo;
    }

    public OrgInfo getOrgInfo(String houseId) {
        MongoTemplate mongoTemplate = getMongoTemplate();
        OrgInfo orgInfo = mongoTemplate.findById(houseId, OrgInfo.class, "org_info");
        System.out.println(getCurrentSubdomain());
        if (orgInfo == null) {
            throw new IllegalArgumentException("Organization with ID: " + houseId + " not found.");
        }
        return orgInfo;
    }

    public List<Org> getAllHousesInfo() {
        List<Org> orgs = orgRepository.findAll();
        orgs.forEach(org -> org.setAdminEmail(null));
        return orgs;
    }

    public OrgInfo publicGetOrgInfo(String houseId) {
        MongoTemplate houseTemplate = new MongoTemplate(MongoClients.create(), houseId + "_DB");
        
        OrgInfo orgInfo = houseTemplate.findById(houseId, OrgInfo.class, "org_info");
        if (orgInfo == null) {
            throw new IllegalArgumentException("Organization with ID: " + houseId + " not found.");
        }

        return orgInfo;
    }

    private String getFileExtension(String fileName) {
        if (fileName.lastIndexOf(".") != -1 && fileName.lastIndexOf(".") != 0) {
            return fileName.substring(fileName.lastIndexOf(".") + 1);
        } else {
            return "";
        }
    }

}
