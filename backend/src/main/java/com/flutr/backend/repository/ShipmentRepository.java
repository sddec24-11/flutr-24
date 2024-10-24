package com.flutr.backend.repository;

import com.flutr.backend.model.Shipment;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Date;
import java.util.List;

public interface ShipmentRepository extends MongoRepository<Shipment, String> {
    
    List<Shipment> findByShipmentDateAndAbbreviation(Date shipmentDate, String abbreviation);
    List<Shipment> findByArrivalDateBetween(Date startDate, Date endDate);
    List<Shipment> findByArrivalDateBetweenAndAbbreviation(Date startDate, Date endDate, String abbreviation);
}