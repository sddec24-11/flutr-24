package com.flutr.backend.dto;

import java.util.Date;

public class ShipmentDateSupplierRequest {
    private Date date;
    private String supplier;
    public Date getDate() {
        return date;
    }
    public void setDate(Date date) {
        this.date = date;
    }
    public String getSupplier() {
        return supplier;
    }
    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }
    
}