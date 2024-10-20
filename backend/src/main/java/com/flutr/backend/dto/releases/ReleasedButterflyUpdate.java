package com.flutr.backend.dto.releases;

public 
class ReleasedButterflyUpdate {
    private String buttId;
    private int numberReleased;
    private int poorEmergence;
    private int damagedDuringRelease;
    private int diseasedDuringRelease;
    private int parasiteDuringRelease;

    public ReleasedButterflyUpdate() {}

    // Getters and Setters

    public String getButtId() {
        return buttId;
    }

    public void setButtId(String buttId) {
        this.buttId = buttId;
    }

    public int getNumberReleased() {
        return numberReleased;
    }

    public void setNumberReleased(int numberReleased) {
        this.numberReleased = numberReleased;
    }

    public int getPoorEmergence() {
        return poorEmergence;
    }

    public void setPoorEmergence(int poorEmergence) {
        this.poorEmergence = poorEmergence;
    }

    public int getDamagedDuringRelease() {
        return damagedDuringRelease;
    }

    public void setDamagedDuringRelease(int damagedDuringRelease) {
        this.damagedDuringRelease = damagedDuringRelease;
    }

    public int getDiseasedDuringRelease() {
        return diseasedDuringRelease;
    }

    public void setDiseasedDuringRelease(int diseasedDuringRelease) {
        this.diseasedDuringRelease = diseasedDuringRelease;
    }

    public int getParasiteDuringRelease() {
        return parasiteDuringRelease;
    }

    public void setParasiteDuringRelease(int parasiteDuringRelease) {
        this.parasiteDuringRelease = parasiteDuringRelease;
    }
    
}
