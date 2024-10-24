package com.flutr.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import java.util.List;

@Document(collection = "butterflies")
public class Butterfly {
    @Id
    private String buttId;
    private String commonName;
    private String family;
    private String subFamily;
    private int lifespan;
    private List<String> range;
    private String plant;
    private String habitat;
    private String funFacts;
    private String imgWingsOpen;
    private String imgWingsClosed;

    public Butterfly() {
    }

    public Butterfly(String buttId, String commonName, String family, String subFamily, int lifespan,
            List<String> range, String plant, String habitat, String funFacts, String imgWingsOpen,
            String imgWingsClosed) {
        this.buttId = buttId;
        this.commonName = commonName;
        this.family = family;
        this.subFamily = subFamily;
        this.lifespan = lifespan;
        this.range = range;
        this.plant = plant;
        this.habitat = habitat;
        this.funFacts = funFacts;
        this.imgWingsOpen = imgWingsOpen;
        this.imgWingsClosed = imgWingsClosed;
    }

    public String getButtId() {
        return buttId;
    }

    public void setButtId(String buttId) {
        this.buttId = buttId;
    }

    public String getCommonName() {
        return commonName;
    }

    public void setCommonName(String commonName) {
        this.commonName = commonName;
    }

    public String getFamily() {
        return family;
    }

    public void setFamily(String family) {
        this.family = family;
    }

    public String getSubFamily() {
        return subFamily;
    }

    public void setSubFamily(String subFamily) {
        this.subFamily = subFamily;
    }

    public List<String> getRange() {
        return range;
    }

    public void setRange(List<String> range) {
        this.range = range;
    }

    public String getPlant() {
        return plant;
    }

    public void setPlant(String plant) {
        this.plant = plant;
    }

    public String getHabitat() {
        return habitat;
    }

    public void setHabitat(String habitat) {
        this.habitat = habitat;
    }

    public String getFunFacts() {
        return funFacts;
    }

    public void setFunFacts(String funFacts) {
        this.funFacts = funFacts;
    }

    public String getImgWingsOpen() {
        return imgWingsOpen;
    }

    public void setImgWingsOpen(String imgWingsOpen) {
        this.imgWingsOpen = imgWingsOpen;
    }

    public String getImgWingsClosed() {
        return imgWingsClosed;
    }

    public void setImgWingsClosed(String imgWingsClosed) {
        this.imgWingsClosed = imgWingsClosed;
    }

    public int getLifespan() {
        return lifespan;
    }

    public void setLifespan(int lifespan) {
        this.lifespan = lifespan;
    }

    
}