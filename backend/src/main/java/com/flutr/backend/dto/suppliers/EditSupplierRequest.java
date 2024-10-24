package com.flutr.backend.dto.suppliers;

public class EditSupplierRequest {

    private String oldAbbreviation;
    private String newAbbreviation;
    private String fullName;
    private boolean isActive;

    public EditSupplierRequest() {
    }
    
    public EditSupplierRequest(String oldAbbreviation, String newAbbreviation, String fullName, boolean isActive) {
        this.oldAbbreviation = oldAbbreviation;
        this.newAbbreviation = newAbbreviation;
        this.fullName = fullName;
        this.isActive = isActive;
    }

    public String getOldAbbreviation() {
        return oldAbbreviation;
    }
    public void setOldAbbreviation(String oldAbbreviation) {
        this.oldAbbreviation = oldAbbreviation;
    }
    public String getNewAbbreviation() {
        return newAbbreviation;
    }
    public void setNewAbbreviation(String newAbbreviation) {
        this.newAbbreviation = newAbbreviation;
    }
    public String getFullName() {
        return fullName;
    }
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    public boolean isActive() {
        return isActive;
    }
    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }

    
}
