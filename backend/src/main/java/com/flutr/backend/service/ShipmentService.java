package com.flutr.backend.service;

import com.flutr.backend.model.Shipment;
import com.flutr.backend.model.Supplier;
import com.flutr.backend.repository.ShipmentRepository;
import com.flutr.backend.repository.SupplierRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ShipmentService {

    private final ShipmentRepository shipmentRepository;
    private final SupplierRepository supplierRepository;

    @Autowired
    public ShipmentService(ShipmentRepository shipmentRepository, SupplierRepository supplierRepository) {
        this.shipmentRepository = shipmentRepository;
        this.supplierRepository = supplierRepository;
    }

    public Shipment addShipment(Shipment shipment) {
        return shipmentRepository.save(shipment);
    }

    public void deleteShipmentById(String id) {
        shipmentRepository.deleteById(id);
    }

    public void deleteShipmentsByDateAndSupplier(Date date, String supplier) {
        List<Shipment> shipments = shipmentRepository.findByShipmentDateAndSupplier(date, supplier);
        shipmentRepository.deleteAll(shipments);
    }

    public Shipment editShipment(String id, Shipment updatedShipment) {
        return shipmentRepository.findById(id)
            .map(existingShipment -> {
                if (updatedShipment.getShipmentDate() != null) {
                    existingShipment.setShipmentDate(updatedShipment.getShipmentDate());
                }
                if (updatedShipment.getArrivalDate() != null) {
                    existingShipment.setArrivalDate(updatedShipment.getArrivalDate());
                }
                if (updatedShipment.getSupplier() != null) {
                    existingShipment.setSupplier(updatedShipment.getSupplier());
                }
                if (updatedShipment.getTotalReceived() != 0) {
                    existingShipment.setTotalReceived(updatedShipment.getTotalReceived());
                }
                if (updatedShipment.getButterflySpecies() != null) {
                    existingShipment.setButterflySpecies(updatedShipment.getButterflySpecies());
                }
                return shipmentRepository.save(existingShipment);
            }).orElse(null);
    }

    public Optional<Shipment> viewShipmentById(String id) {
        return shipmentRepository.findById(id);
    }

    public List<Shipment> viewShipmentsByDateAndSupplier(Date date, String supplier) {
        return shipmentRepository.findByShipmentDateAndSupplier(date, supplier);
    }

    public List<Shipment> viewAllShipments() {
        return shipmentRepository.findAll();
    }

    public void importShipment() {
        // placeholder 
    }

    public void exportShipment() {
        // placeholder 
    }

    public List<Shipment> overviewShipments(Date startDate, Date endDate, String supplier) {
        if(supplier == null || supplier.isEmpty()) {
            return shipmentRepository.findByArrivalDateBetween(startDate, endDate);
        } else {
            return shipmentRepository.findByArrivalDateBetweenAndSupplier(startDate, endDate, supplier);
        }
    }


    public Supplier addSupplier(Supplier supplier) {
        if(supplierRepository.findBySupplier(supplier.getSupplier()).isEmpty()) {
            return supplierRepository.save(supplier);
        } else {
            throw new IllegalArgumentException("Supplier already exists");
        }
    }
    
    public Supplier editSupplier(String oldSupplierName, String newSupplierName) {
        Supplier supplier = supplierRepository.findBySupplier(oldSupplierName)
                .orElseThrow(() -> new IllegalArgumentException("Supplier not found"));
        supplier.setSupplier(newSupplierName);
        return supplierRepository.save(supplier);
    }
    
    public void deleteSupplier(String supplierName) {
        Supplier supplier = supplierRepository.findBySupplier(supplierName)
                .orElseThrow(() -> new IllegalArgumentException("Supplier not found"));
        supplierRepository.delete(supplier);
    }
}