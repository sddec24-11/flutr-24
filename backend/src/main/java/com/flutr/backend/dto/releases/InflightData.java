package com.flutr.backend.dto.releases;

import com.flutr.backend.model.Inflight;

import java.util.List;

public class InflightData {
    private List<Inflight> inflights;
    private int totalInFlight;
    private long speciesInFlight;

    public InflightData() {
    }

    public InflightData(List<Inflight> inflights, int totalInFlight, long speciesInFlight) {
        this.inflights = inflights;
        this.totalInFlight = totalInFlight;
        this.speciesInFlight = speciesInFlight;
    }

    public List<Inflight> getInflights() {
        return inflights;
    }
    public void setInflights(List<Inflight> inflights) {
        this.inflights = inflights;
    }
    public int getTotalInFlight() {
        return totalInFlight;
    }
    public void setTotalInFlight(int totalInFlight) {
        this.totalInFlight = totalInFlight;
    }
    public long getSpeciesInFlight() {
        return speciesInFlight;
    }
    public void setSpeciesInFlight(long speciesInFlight) {
        this.speciesInFlight = speciesInFlight;
    }
    
}
