package com.flutr.backend.dto;

public class ReleasedSpeciesUpdate {
    private String scientificName;
    private Integer numberReleased;
    private Integer emergedInTransit;
    private Integer damagedInTransit;
    private Integer diseased;
    private Integer parasitized;
    private Integer poorEmergence;
    private Integer noEmergence;
    
    public String getScientificName() {
        return scientificName;
    }
    public void setScientificName(String scientificName) {
        this.scientificName = scientificName;
    }
    public Integer getNumberReleased() {
        return numberReleased;
    }
    public void setNumberReleased(Integer numberReleased) {
        this.numberReleased = numberReleased;
    }
    public Integer getEmergedInTransit() {
        return emergedInTransit;
    }
    public void setEmergedInTransit(Integer emergedInTransit) {
        this.emergedInTransit = emergedInTransit;
    }
    public Integer getDamagedInTransit() {
        return damagedInTransit;
    }
    public void setDamagedInTransit(Integer damagedInTransit) {
        this.damagedInTransit = damagedInTransit;
    }
    public Integer getDiseased() {
        return diseased;
    }
    public void setDiseased(Integer diseased) {
        this.diseased = diseased;
    }
    public Integer getParasitized() {
        return parasitized;
    }
    public void setParasitized(Integer parasitized) {
        this.parasitized = parasitized;
    }
    public Integer getPoorEmergence() {
        return poorEmergence;
    }
    public void setPoorEmergence(Integer poorEmergence) {
        this.poorEmergence = poorEmergence;
    }
    public Integer getNoEmergence() {
        return noEmergence;
    }
    public void setNoEmergence(Integer noEmergence) {
        this.noEmergence = noEmergence;
    }

}