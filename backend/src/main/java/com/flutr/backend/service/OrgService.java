package com.flutr.backend.service;

import com.flutr.backend.model.Butterfly;
import com.flutr.backend.model.HouseButterflies;
import com.flutr.backend.model.Org;
import com.flutr.backend.model.OrgInfo;
import com.flutr.backend.model.User;
import com.flutr.backend.model.UserRole;
import com.flutr.backend.repository.OrgRepository;
import com.flutr.backend.repository.UserRepository;
import com.flutr.backend.util.JwtUtil;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

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
    private JwtUtil jwtUtil;

    @Autowired
    private HttpServletRequest request;

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
        newOrgDatabase.createCollection("logging");

        MongoTemplate orgMongoTemplate = new MongoTemplate(mongoClient, org.getHouseId() + "_DB");
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
            new OrgInfo.News(false, ""),
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

    }

    private void createInitialAdminUser(Org org) {
        User adminUser = new User();
        adminUser.setUsername(org.getAdminEmail());
        adminUser.setPassword(passwordEncoder.encode("butterfly123"));
        adminUser.setHouseId(org.getHouseId());
        adminUser.setSubdomain(org.getSubdomain());
        adminUser.setRole(UserRole.ADMIN);

        userRepository.save(adminUser);
    }

    public OrgInfo editOrg(OrgInfo updatedOrgInfo) {
        MongoTemplate mongoTemplate = getMongoTemplate();
        OrgInfo existingOrgInfo = mongoTemplate.findById(updatedOrgInfo.getHouseId(), OrgInfo.class, "org_info");
        if (existingOrgInfo == null) {
            throw new IllegalArgumentException("Organization with ID: " + updatedOrgInfo.getHouseId() + " not found.");
        }

        existingOrgInfo.setName(updatedOrgInfo.getName());
        existingOrgInfo.setAddress(updatedOrgInfo.getAddress());
        existingOrgInfo.setLogoUrl(updatedOrgInfo.getLogoUrl());
        existingOrgInfo.setFacilityImgUrl(updatedOrgInfo.getFacilityImgUrl());
        existingOrgInfo.setColors(updatedOrgInfo.getColors());
        existingOrgInfo.setWebsite(updatedOrgInfo.getWebsite());
        existingOrgInfo.setSocials(updatedOrgInfo.getSocials());
        existingOrgInfo.setSubheading(updatedOrgInfo.getSubheading());
        existingOrgInfo.setOtd(updatedOrgInfo.getOtd());
        existingOrgInfo.setNews(updatedOrgInfo.getNews());
        existingOrgInfo.setStatsActive(updatedOrgInfo.getStatsActive());
        existingOrgInfo.setTimezone(updatedOrgInfo.getTimezone());

        mongoTemplate.save(existingOrgInfo, "org_info");

        return existingOrgInfo;
    }

    public OrgInfo getOrgInfo(String houseId) {
        MongoTemplate mongoTemplate = getMongoTemplate();
        OrgInfo orgInfo = mongoTemplate.findById(houseId, OrgInfo.class, "org_info");
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
}
