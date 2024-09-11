package com.flutr.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

@Document(collection = "shipments")
public class Shipment {
    @Id
    private String shipmentId;
    private Date shipmentDate;
    private Date arrivalDate;
    private String supplier;
    private int totalReceived;
    private List<ButterflySpecies> butterflySpecies; 
    @LastModifiedDate
    private Date lastUpdated;
    
    public Shipment() {
    }
    public Shipment(String shipmentId, Date shipmentDate, Date arrivalDate, String supplier, int totalReceived,
            List<ButterflySpecies> butterflySpecies) {
        this.shipmentId = shipmentId;
        this.shipmentDate = shipmentDate;
        this.arrivalDate = arrivalDate;
        this.supplier = supplier;
        this.totalReceived = totalReceived;
        this.butterflySpecies = butterflySpecies;
    }
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
    public String getSupplier() {
        return supplier;
    }
    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }
    public int getTotalReceived() {
        return totalReceived;
    }
    public void setTotalReceived(int totalReceived) {
        this.totalReceived = totalReceived;
    }
    public List<ButterflySpecies> getButterflySpecies() {
        return butterflySpecies;
    }

    public void setButterflySpecies(List<ButterflySpecies> butterflySpecies) {
        this.butterflySpecies = butterflySpecies;
    }
    @PrePersist
    @PreUpdate
    private void onUpdate() {
        lastUpdated = new Date();
    }
    
}