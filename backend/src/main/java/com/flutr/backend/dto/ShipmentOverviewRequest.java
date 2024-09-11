package com.flutr.backend.dto;

import java.util.Date;

public class ShipmentOverviewRequest {
    private Date startDate;
    private Date endDate;
    private String supplier;
    public Date getStartDate() {
        return startDate;
    }
    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }
    public Date getEndDate() {
        return endDate;
    }
    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
    public String getSupplier() {
        return supplier;
    }
    public void setSupplier(String supplier) {
        this.supplier = supplier;
    } 
    
}