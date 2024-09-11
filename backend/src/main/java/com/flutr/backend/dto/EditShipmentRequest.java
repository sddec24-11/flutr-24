package com.flutr.backend.dto;

import com.flutr.backend.model.Shipment;

public class EditShipmentRequest {
    private String id;
    private Shipment shipment;
    
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public Shipment getShipment() {
        return shipment;
    }
    public void setShipment(Shipment shipment) {
        this.shipment = shipment;
    }

    
}