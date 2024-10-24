package com.flutr.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "orgs")
public class Org {
    @Id
    private String houseId;
    private String name;
    private String address;
    private String logo;
    private String facilityImage;
    private String subdomain;
    private String adminEmail;
    
    public Org() {
    }

    public Org(String houseId, String name, String address, String logo, String facilityImage, String subdomain, String adminEmail) {
        this.houseId = houseId;
        this.name = name;
        this.address = address;
        this.logo = logo;
        this.facilityImage = facilityImage;
        this.subdomain = subdomain;
        this.adminEmail = adminEmail;
    }
    
    public String getHouseId() {
        return houseId;
    }
    public void setHouseId(String houseId) {
        this.houseId = houseId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getLogo() {
        return logo;
    }
    public void setLogo(String logo) {
        this.logo = logo;
    }
    public String getSubdomain() {
        return subdomain;
    }
    public void setSubdomain(String subdomain) {
        this.subdomain = subdomain;
    }
    public String getAdminEmail() {
        return adminEmail;
    }
    public void setAdminEmail(String adminEmail) {
        this.adminEmail = adminEmail;
    }

    public String getFacilityImage() {
        return facilityImage;
    }

    public void setFacilityImage(String facilityImage) {
        this.facilityImage = facilityImage;
    }

    
}
