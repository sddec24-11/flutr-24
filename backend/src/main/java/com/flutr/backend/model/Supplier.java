package com.flutr.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "suppliers")
public class Supplier {
    @Id
    private String id;
    private String supplier;
    
    public Supplier() {
    }
    public String getSupplier() {
        return supplier;
    }
    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    
}