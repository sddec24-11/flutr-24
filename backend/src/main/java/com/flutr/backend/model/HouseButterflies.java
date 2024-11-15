package com.flutr.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "house_butterflies")
public class HouseButterflies extends Butterfly {
    private int noInFlight;
    private int totalFlown;
    private int totalReceived;
    private boolean isBOTD;
    private Date firstFlownOn;
    private Date lastFlownOn;

    public HouseButterflies(){
        super();
    }
    
    public HouseButterflies(String buttId, String commonName, String family, String subFamily, int lifespan,
            List<String> range, String plant, String habitat, String funFacts, String imgWingsOpen,
            String imgWingsClosed, int noInFlight, int totalFlown, int totalReceived, boolean isBOTD, Date firstFlownOn,
            Date lastFlownOn, String extraImg1, String extraImg2) {
        super(buttId, commonName, family, subFamily, lifespan, range, plant, habitat, funFacts, imgWingsOpen,
                imgWingsClosed, extraImg1, extraImg2);
        this.noInFlight = noInFlight;
        this.totalFlown = totalFlown;
        this.totalReceived = totalReceived;
        this.isBOTD = isBOTD;
        this.firstFlownOn = firstFlownOn;
        this.lastFlownOn = lastFlownOn;
    }
    
    public int getNoInFlight() {
        return noInFlight;
    }
    public void setNoInFlight(int noInFlight) {
        this.noInFlight = noInFlight;
    }
    public int getTotalFlown() {
        return totalFlown;
    }
    public void setTotalFlown(int totalFlown) {
        this.totalFlown = totalFlown;
    }
    public int getTotalReceived() {
        return totalReceived;
    }
    public void setTotalReceived(int totalReceived) {
        this.totalReceived = totalReceived;
    }
    public boolean isBOTD() {
        return isBOTD;
    }
    public void setBOTD(boolean isBOTD) {
        this.isBOTD = isBOTD;
    }
    public Date getFirstFlownOn() {
        return firstFlownOn;
    }
    public void setFirstFlownOn(Date firstFlownOn) {
        this.firstFlownOn = firstFlownOn;
    }
    public Date getLastFlownOn() {
        return lastFlownOn;
    }
    public void setLastFlownOn(Date lastFlownOn) {
        this.lastFlownOn = lastFlownOn;
    }

    

}