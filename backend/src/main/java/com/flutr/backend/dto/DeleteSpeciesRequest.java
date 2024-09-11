package com.flutr.backend.dto;

import java.util.List;

public class DeleteSpeciesRequest {
    private String releaseId;
    private List<String> scientificNames;

    public String getReleaseId() {
        return releaseId;
    }
    public void setReleaseId(String releaseId) {
        this.releaseId = releaseId;
    }
    public List<String> getScientificNames() {
        return scientificNames;
    }
    public void setScientificNames(List<String> scientificNames) {
        this.scientificNames = scientificNames;
    }
}
