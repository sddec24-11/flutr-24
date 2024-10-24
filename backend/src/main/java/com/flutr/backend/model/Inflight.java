package com.flutr.backend.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "inflight")
public class Inflight {
    @Id
    private String id;
    private String buttId;
    private int noInFlight;
    private Date releaseDate;
    private Date endDate;

    public Inflight() {}

    public Inflight(String buttId, int noInFlight, Date releaseDate, Date endDate) {
        this.buttId = buttId;
        this.noInFlight = noInFlight;
        this.releaseDate = releaseDate;
        this.endDate = endDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getButtId() {
        return buttId;
    }

    public void setButtId(String buttId) {
        this.buttId = buttId;
    }

    public int getNoInFlight() {
        return noInFlight;
    }

    public void setNoInFlight(int noInFlight) {
        this.noInFlight = noInFlight;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}