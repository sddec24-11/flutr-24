package com.flutr.backend.model;

public class ButterflySpecies {
    private String scientificName;
    private int count;

    public ButterflySpecies() {}

    public ButterflySpecies(String scientificName, int count) {
        this.scientificName = scientificName;
        this.count = count;
    }

    public String getScientificName() {
        return scientificName;
    }

    public void setScientificName(String scientificName) {
        this.scientificName = scientificName;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}