package com.flutr.backend.dto.houseButterflies;

public class EditHouseButterflyRequest {

    private String buttId;
    private String commonName;
    private int lifespan;

    public EditHouseButterflyRequest() {
    }

    public EditHouseButterflyRequest(String buttId, String commonName, int lifespan) {
        this.buttId = buttId;
        this.commonName = commonName;
        this.lifespan = lifespan;
    }

    public String getButtId() {
        return buttId;
    }
    public void setButtId(String buttId) {
        this.buttId = buttId;
    }
    public String getCommonName() {
        return commonName;
    }
    public void setCommonName(String commonName) {
        this.commonName = commonName;
    }
    public int getLifespan() {
        return lifespan;
    }
    public void setLifespan(int lifespan) {
        this.lifespan = lifespan;
    }
    
}
