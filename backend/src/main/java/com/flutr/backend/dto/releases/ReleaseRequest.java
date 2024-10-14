package com.flutr.backend.dto.releases;

import java.util.List;

public class ReleaseRequest {
    private String shipmentId;
    private List<ReleasedButterflyUpdate> butterflyUpdates;

    public ReleaseRequest() {}

    // Getters and Setters

    public String getShipmentId() {
        return shipmentId;
    }

    public void setShipmentId(String shipmentId) {
        this.shipmentId = shipmentId;
    }

    public List<ReleasedButterflyUpdate> getButterflyUpdates() {
        return butterflyUpdates;
    }

    public void setButterflyUpdates(List<ReleasedButterflyUpdate> butterflyUpdates) {
        this.butterflyUpdates = butterflyUpdates;
    }
}
