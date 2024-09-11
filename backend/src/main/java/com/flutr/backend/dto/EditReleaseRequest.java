package com.flutr.backend.dto;

import java.util.List;

public class EditReleaseRequest {
    private String releaseId;
    private List<ReleasedSpeciesUpdate> speciesUpdates;
    public String getReleaseId() {
        return releaseId;
    }
    public void setReleaseId(String releaseId) {
        this.releaseId = releaseId;
    }
    public List<ReleasedSpeciesUpdate> getSpeciesUpdates() {
        return speciesUpdates;
    }
    public void setSpeciesUpdates(List<ReleasedSpeciesUpdate> speciesUpdates) {
        this.speciesUpdates = speciesUpdates;
    }

}