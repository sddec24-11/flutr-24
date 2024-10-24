package com.flutr.backend.dto.releases;

public 
class ReleasedButterflyUpdate {
    private String butterflyId;
    private int numberReleased;
    private int poorEmergence;
    private int damagedDuringRelease;
    private int diseasedDuringRelease;

    public ReleasedButterflyUpdate() {}

    // Getters and Setters

    public String getButterflyId() {
        return butterflyId;
    }

    public void setButterflyId(String butterflyId) {
        this.butterflyId = butterflyId;
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
}
