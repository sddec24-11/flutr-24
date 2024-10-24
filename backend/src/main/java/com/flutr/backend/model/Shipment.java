package com.flutr.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

import java.util.Date;
import java.util.List;

@Document(collection = "shipments")
public class Shipment {
    @Id
    private String shipmentId;
    private Date shipmentDate;
    private Date arrivalDate;
    private String abbreviation;
    private List<ButterflyDetail> butterflyDetails;  // Details for each butterfly in the shipment
    @LastModifiedDate
    private Date lastUpdated;

    public Shipment() {}

    public Shipment(String shipmentId, Date shipmentDate, Date arrivalDate, String abbreviation, List<ButterflyDetail> butterflyDetails) {
        this.shipmentId = shipmentId;
        this.shipmentDate = shipmentDate;
        this.arrivalDate = arrivalDate;
        this.abbreviation = abbreviation;
        this.butterflyDetails = butterflyDetails;
    }

    // Getters and Setters

    public String getShipmentId() {
        return shipmentId;
    }

    public void setShipmentId(String shipmentId) {
        this.shipmentId = shipmentId;
    }

    public Date getShipmentDate() {
        return shipmentDate;
    }

    public void setShipmentDate(Date shipmentDate) {
        this.shipmentDate = shipmentDate;
    }

    public Date getArrivalDate() {
        return arrivalDate;
    }

    public void setArrivalDate(Date arrivalDate) {
        this.arrivalDate = arrivalDate;
    }

    public String getAbbreviation() {
        return abbreviation;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    public List<ButterflyDetail> getButterflyDetails() {
        return butterflyDetails;
    }

    public void setButterflyDetails(List<ButterflyDetail> butterflyDetails) {
        this.butterflyDetails = butterflyDetails;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    @PrePersist
    @PreUpdate
    private void onUpdate() {
        lastUpdated = new Date();
    }
}
