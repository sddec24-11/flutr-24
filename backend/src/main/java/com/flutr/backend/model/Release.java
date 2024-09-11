package com.flutr.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import java.util.Date;
import java.util.List;

@Document(collection = "releases")
public class Release {
    @Id
    private String releaseId;
    private List<ReleasedSpecies> speciesDetails;
    private Date releaseDateTime;
    @LastModifiedDate
    private Date lastUpdated;
    
    public Release() {
    }

    public Release(String releaseId, List<ReleasedSpecies> speciesDetails, Date releaseDateTime, Date lastUpdated) {
        this.releaseId = releaseId;
        this.speciesDetails = speciesDetails;
        this.releaseDateTime = releaseDateTime;
        this.lastUpdated = lastUpdated;
    }

    @PrePersist
    @PreUpdate
    private void onUpdate() {
        lastUpdated = new Date();
    }

    public String getReleaseId() {
        return releaseId;
    }

    public void setReleaseId(String releaseId) {
        this.releaseId = releaseId;
    }

    public List<ReleasedSpecies> getSpeciesDetails() {
        return speciesDetails;
    }

    public void setSpeciesDetails(List<ReleasedSpecies> speciesDetails) {
        this.speciesDetails = speciesDetails;
    }

    public Date getReleaseDateTime() {
        return releaseDateTime;
    }

    public void setReleaseDateTime(Date releaseDateTime) {
        this.releaseDateTime = releaseDateTime;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    
}