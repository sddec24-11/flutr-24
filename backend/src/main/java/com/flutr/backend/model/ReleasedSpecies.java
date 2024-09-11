package com.flutr.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class ReleasedSpecies {
    private String shipmentId;
    private String scientificName;
    private String commonName;
    private int numberReleased;
    private int emergedInTransit;
    private int damagedInTransit;
    private int diseased;
    private int parasitized;
    private int poorEmergence;
    private int noEmergence;
    
    public ReleasedSpecies() {
    }
    public String getShipmentId() {
        return shipmentId;
    }
    public void setShipmentId(String shipmentId) {
        this.shipmentId = shipmentId;
    }
    public String getScientificName() {
        return scientificName;
    }
    public void setScientificName(String scientificName) {
        this.scientificName = scientificName;
    }
    public String getCommonName() {
        return commonName;
    }
    public void setCommonName(String commonName) {
        this.commonName = commonName;
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
    public int getDamagedInTransit() {
        return damagedInTransit;
    }
    public void setDamagedInTransit(int damagedInTransit) {
        this.damagedInTransit = damagedInTransit;
    }
    public int getDiseased() {
        return diseased;
    }
    public void setDiseased(int diseased) {
        this.diseased = diseased;
    }
    public int getParasitized() {
        return parasitized;
    }
    public void setParasitized(int parasitized) {
        this.parasitized = parasitized;
    }
    public int getPoorEmergence() {
        return poorEmergence;
    }
    public void setPoorEmergence(int poorEmergence) {
        this.poorEmergence = poorEmergence;
    }
    public int getNoEmergence() {
        return noEmergence;
    }
    public void setNoEmergence(int noEmergence) {
        this.noEmergence = noEmergence;
    }

}
