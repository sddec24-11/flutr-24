package com.flutr.backend.model;

public class ButterflyDetail {
    private String butterflyId;
    private String species;
    private int numberReceived;
    private int numberReleased;
    private int emergedInTransit;
    private int damaged;
    private int diseased;
    private int parasite;
    private int poorEmergence;
    private int totalRemaining;

    public ButterflyDetail() {}

    public ButterflyDetail(String butterflyId, String species, int numberReceived, int numberReleased, int emergedInTransit, int damaged, int diseased, int parasite, int poorEmergence, int totalRemaining) {
        this.butterflyId = butterflyId;
        this.species = species;
        this.numberReceived = numberReceived;
        this.numberReleased = numberReleased;
        this.emergedInTransit = emergedInTransit;
        this.damaged = damaged;
        this.diseased = diseased;
        this.parasite = parasite;
        this.poorEmergence = poorEmergence;
        this.totalRemaining = totalRemaining;
    }

    // Getters and Setters

    public String getButterflyId() {
        return butterflyId;
    }

    public void setButterflyId(String butterflyId) {
        this.butterflyId = butterflyId;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public int getNumberReceived() {
        return numberReceived;
    }

    public void setNumberReceived(int numberReceived) {
        this.numberReceived = numberReceived;
    }

    public int getNumberReleased() {
        return numberReleased;
    }

    public void setNumberReleased(int numberReleased) {
        this.numberReleased = numberReleased;
    }

    public int getEmergedInTransit() {
        return emergedInTransit;
    }

    public void setEmergedInTransit(int emergedInTransit) {
        this.emergedInTransit = emergedInTransit;
    }

    public int getDamaged() {
        return damaged;
    }

    public void setDamaged(int damaged) {
        this.damaged = damaged;
    }

    public int getDiseased() {
        return diseased;
    }

    public void setDiseased(int diseased) {
        this.diseased = diseased;
    }

    public int getParasite() {
        return parasite;
    }

    public void setParasite(int parasite) {
        this.parasite = parasite;
    }

    public int getPoorEmergence() {
        return poorEmergence;
    }

    public void setPoorEmergence(int poorEmergence) {
        this.poorEmergence = poorEmergence;
    }

    public int getTotalRemaining() {
        return totalRemaining;
    }

    public void setTotalRemaining(int totalRemaining) {
        this.totalRemaining = totalRemaining;
    }
}