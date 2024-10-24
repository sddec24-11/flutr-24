package com.flutr.backend.model;

public class ButterflyDetail {
    private String buttId;
    private int numberReceived;
    private int numberReleased;
    private int emergedInTransit;
    private int damaged;
    private int diseased;
    private int parasite;
    private int poorEmergence;
    private int noEmergence;
    private int totalRemaining;

    public ButterflyDetail() {}

    public ButterflyDetail(String buttId, int numberReceived, int numberReleased, int emergedInTransit, int damaged, int diseased, int parasite, int poorEmergence, int noEmergence, int totalRemaining) {
        this.buttId = buttId;
        this.numberReceived = numberReceived;
        this.numberReleased = numberReleased;
        this.emergedInTransit = emergedInTransit;
        this.damaged = damaged;
        this.diseased = diseased;
        this.parasite = parasite;
        this.poorEmergence = poorEmergence;
        this.noEmergence = noEmergence;
        this.totalRemaining = totalRemaining;
    }

    // Getters and Setters

    public String getButtId() {
        return buttId;
    }

    public void setButtId(String buttId) {
        this.buttId = buttId;
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

    public int getNoEmergence() {
        return noEmergence;
    }

    public void setNoEmergence(int noEmergence) {
        this.noEmergence = noEmergence;
    }
}
