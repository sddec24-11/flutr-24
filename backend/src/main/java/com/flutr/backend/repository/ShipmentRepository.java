package com.flutr.backend.repository;

import com.flutr.backend.model.Shipment;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Date;
import java.util.List;

public interface ShipmentRepository extends MongoRepository<Shipment, String> {
    
    List<Shipment> findByShipmentDateAndSupplier(Date shipmentDate, String supplier);
    List<Shipment> findByArrivalDateBetween(Date startDate, Date endDate);
    List<Shipment> findByArrivalDateBetweenAndSupplier(Date startDate, Date endDate, String supplier);
}