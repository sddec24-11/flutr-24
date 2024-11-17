package com.flutr.backend.dto.stats;

public class ContinentInflightStats {
    private String continent;
    private int totalInFlight;
    
    public ContinentInflightStats() {
    }
    public ContinentInflightStats(String continent, int totalInFlight) {
        this.continent = continent;
        this.totalInFlight = totalInFlight;
    }

    public String getContinent() {
        return continent;
    }
    public void setContinent(String continent) {
        this.continent = continent;
    }
    public int getTotalInFlight() {
        return totalInFlight;
    }
    public void setTotalInFlight(int totalInFlight) {
        this.totalInFlight = totalInFlight;
    }
    
}
