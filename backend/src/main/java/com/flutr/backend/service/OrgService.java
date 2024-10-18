package com.flutr.backend.service;

import com.flutr.backend.model.Org;
import com.flutr.backend.model.OrgInfo;
import com.flutr.backend.repository.OrgRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

@Service
public class OrgService {

    @Autowired
    private OrgRepository orgRepository;

    public String createOrg(Org org) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_SUPERUSER"))) {
            throw new SecurityException("Only SUPERUSER can create organizations");
        }

        if (orgRepository.existsByHouseId(org.getHouseId())) {
            throw new IllegalStateException("Organization already exists with this houseId");
        }

        orgRepository.save(org);

        initializeNewOrgDatabase(org);

        return "Organization created successfully with ID: " + org.getHouseId();
    }

    private void initializeNewOrgDatabase(Org org) {
        MongoClient mongoClient = MongoClients.create();
        MongoDatabase newOrgDatabase = mongoClient.getDatabase(org.getHouseId() + "_DB");

        newOrgDatabase.createCollection("org_info");
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
            org.getAdminEmail(),
            java.util.Arrays.asList("#808080", "#808080", "#808080"),
            org.getSubdomain(),
            new OrgInfo.SocialMediaLinks(),
            "",
            new OrgInfo.Otd(false, ""),
            new OrgInfo.News(false, ""),
            "CST"
        );
        
        OrgInfo.SocialMediaLinks socials = new OrgInfo.SocialMediaLinks(false, "", false, "", false, "", false, "");
        orgInfo.setSocials(socials);

        orgMongoTemplate.insert(orgInfo, "org_info");
    }
}
