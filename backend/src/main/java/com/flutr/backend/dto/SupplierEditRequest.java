package com.flutr.backend.dto;

public class SupplierEditRequest {
    private String oldSupplier;
    private String newSupplier;
    
    public String getOldSupplier() {
        return oldSupplier;
    }
    public void setOldSupplier(String oldSupplier) {
        this.oldSupplier = oldSupplier;
    }
    public String getNewSupplier() {
        return newSupplier;
    }
    public void setNewSupplier(String newSupplier) {
        this.newSupplier = newSupplier;
    }

}