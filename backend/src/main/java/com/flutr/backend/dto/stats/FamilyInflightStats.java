package com.flutr.backend.dto.stats;

public class FamilyInflightStats {
    private String family;
    private int totalInFlight;
    
    public FamilyInflightStats() {
    }
    public FamilyInflightStats(String family, int totalInFlight) {
        this.family = family;
        this.totalInFlight = totalInFlight;
    }

    public String getFamily() {
        return family;
    }
    public void setFamily(String family) {
        this.family = family;
    }
    public int getTotalInFlight() {
        return totalInFlight;
    }
    public void setTotalInFlight(int totalInFlight) {
        this.totalInFlight = totalInFlight;
    }
}
