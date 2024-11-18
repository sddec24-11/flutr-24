package com.flutr.backend.dto.houseButterflies;

public class ButterflyDetailsDTO {
    private String buttId;
    private String commonName;
    private String imgWingsOpen;
    private int lifespan;
    private int noInFlight;

    public ButterflyDetailsDTO(String buttId, String commonName, String imgWingsOpen, int lifespan, int noInFlight) {
        this.buttId = buttId;
        this.commonName = commonName;
        this.imgWingsOpen = imgWingsOpen;
        this.lifespan = lifespan;
        this.noInFlight = noInFlight;
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

    public String getImgWingsOpen() {
        return imgWingsOpen;
    }

    public void setImgWingsOpen(String imgWingsOpen) {
        this.imgWingsOpen = imgWingsOpen;
    }

    public int getLifespan() {
        return lifespan;
    }

    public void setLifespan(int lifespan) {
        this.lifespan = lifespan;
    }

    public int getNoInFlight() {
        return noInFlight;
    }

    public void setNoInFlight(int noInFlight) {
        this.noInFlight = noInFlight;
    }

}