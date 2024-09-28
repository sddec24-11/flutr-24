package com.flutr.backend.service;

import com.flutr.backend.model.ButterflyDetail;
import com.flutr.backend.model.Shipment;
import com.flutr.backend.repository.ShipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ShipmentService {

    private final ShipmentRepository shipmentRepository;
    private final LoggingService loggingService;

    @Autowired
    public ShipmentService(ShipmentRepository shipmentRepository, LoggingService loggingService) {
        this.shipmentRepository = shipmentRepository;
        this.loggingService = loggingService;
    }

    public Shipment addShipment(Shipment shipment) {
        loggingService.log("ADD_SHIPMENT", "START", "Adding shipment for supplier: " + shipment.getSupplier());
        try {
            Shipment savedShipment = shipmentRepository.save(shipment);
            loggingService.log("ADD_SHIPMENT", "SUCCESS", "Shipment added SUCCESSfully with ID: " + shipment.getShipmentId());
            return savedShipment;
        } catch (Exception e) {
            loggingService.log("ADD_SHIPMENT", "FAILURE", e.getMessage());
            throw new RuntimeException("Error adding shipment: " + e.getMessage());
        }
    }

    public void deleteShipmentById(String id) {
        loggingService.log("DELETE_SHIPMENT", "START", "Deleting shipment with ID: " + id);
        try {
            shipmentRepository.deleteById(id);
            loggingService.log("DELETE_SHIPMENT", "SUCCESS", "Shipment deleted with ID: " + id);
        } catch (Exception e) {
            loggingService.log("DELETE_SHIPMENT", "FAILURE", e.getMessage());
            throw new RuntimeException("Error deleting shipment: " + e.getMessage());
        }
    }

    public Optional<Shipment> editShipment(String id, Shipment updatedShipment) {
        loggingService.log("EDIT_SHIPMENT", "START", "Editing shipment with ID: " + id);
        try {
            // Find the existing shipment
            Optional<Shipment> existingShipmentOpt = shipmentRepository.findById(id);

            if (existingShipmentOpt.isEmpty()) {
                loggingService.log("EDIT_SHIPMENT", "FAILURE", "Shipment not found with ID: " + id);
                throw new RuntimeException("Shipment not found with ID: " + id);
            }

            Shipment existingShipment = existingShipmentOpt.get();

            // Update all shipment-level fields
            existingShipment.setShipmentDate(updatedShipment.getShipmentDate());
            existingShipment.setArrivalDate(updatedShipment.getArrivalDate());
            existingShipment.setSupplier(updatedShipment.getSupplier());

            // Update the butterfly details
            if (updatedShipment.getButterflyDetails() != null) {
                for (ButterflyDetail updatedDetail : updatedShipment.getButterflyDetails()) {
                    for (ButterflyDetail existingDetail : existingShipment.getButterflyDetails()) {
                        if (existingDetail.getButterflyId().equals(updatedDetail.getButterflyId())) {
                            // Update relevant fields from updatedDetail
                            if (updatedDetail.getNumberReceived() != existingDetail.getNumberReceived()) {
                                existingDetail.setNumberReceived(updatedDetail.getNumberReceived());
                            }
                            if (updatedDetail.getNumberReleased() != existingDetail.getNumberReleased()) {
                                existingDetail.setNumberReleased(updatedDetail.getNumberReleased());
                            }
                            if (updatedDetail.getEmergedInTransit() != existingDetail.getEmergedInTransit()) {
                                existingDetail.setEmergedInTransit(updatedDetail.getEmergedInTransit());
                            }
                            if (updatedDetail.getDamaged() != existingDetail.getDamaged()) {
                                existingDetail.setDamaged(updatedDetail.getDamaged());
                            }
                            if (updatedDetail.getDiseased() != existingDetail.getDiseased()) {
                                existingDetail.setDiseased(updatedDetail.getDiseased());
                            }
                            if (updatedDetail.getPoorEmergence() != existingDetail.getPoorEmergence()) {
                                existingDetail.setPoorEmergence(updatedDetail.getPoorEmergence());
                            }

                            // Recalculate total remaining
                            int totalRemaining = updatedDetail.getNumberReceived() -
                                    (updatedDetail.getNumberReleased() + 
                                    updatedDetail.getEmergedInTransit() + 
                                    updatedDetail.getDamaged() + 
                                    updatedDetail.getDiseased() + 
                                    updatedDetail.getPoorEmergence());
                            existingDetail.setTotalRemaining(totalRemaining);
                        }
                    }
                }
            }

            // Save the updated shipment
            Shipment savedShipment = shipmentRepository.save(existingShipment);

            loggingService.log("EDIT_SHIPMENT", "SUCCESS", "Shipment edited successfully with ID: " + id);
            return Optional.of(savedShipment);
        } catch (Exception e) {
            loggingService.log("EDIT_SHIPMENT", "FAILURE", e.getMessage());
            throw new RuntimeException("Error editing shipment: " + e.getMessage());
        }
    }


    public List<Shipment> viewShipmentsByDateAndSupplier(Date date, String supplier) {
        loggingService.log("VIEW_SHIPMENTS", "START", "Viewing shipments for supplier: " + supplier + " on date: " + date);
        try {
            List<Shipment> shipments = shipmentRepository.findByShipmentDateAndSupplier(date, supplier);
            loggingService.log("VIEW_SHIPMENTS", "SUCCESS", "Shipments viewed SUCCESSfully for supplier: " + supplier);
            return shipments;
        } catch (Exception e) {
            loggingService.log("VIEW_SHIPMENTS", "FAILURE", e.getMessage());
            throw new RuntimeException("Error viewing shipments: " + e.getMessage());
        }
    }

    public List<Shipment> overviewShipments(Date startDate, Date endDate, String supplier) {
        loggingService.log("OVERVIEW_SHIPMENTS", "START", "Overviewing shipments from: " + startDate + " to " + endDate + " for supplier: " + supplier);
        try {
            List<Shipment> shipments = supplier == null || supplier.isEmpty()
                    ? shipmentRepository.findByArrivalDateBetween(startDate, endDate)
                    : shipmentRepository.findByArrivalDateBetweenAndSupplier(startDate, endDate, supplier);
            loggingService.log("OVERVIEW_SHIPMENTS", "SUCCESS", "Overview completed for shipments.");
            return shipments;
        } catch (Exception e) {
            loggingService.log("OVERVIEW_SHIPMENTS", "FAILURE", e.getMessage());
            throw new RuntimeException("Error overviewing shipments: " + e.getMessage());
        }
    }

    public void deleteShipmentsByDateAndSupplier(Date date, String supplier) {
        loggingService.log("DELETE_SHIPMENTS", "START", "Deleting shipments for supplier: " + supplier + " on date: " + date);
        try {
            List<Shipment> shipments = shipmentRepository.findByShipmentDateAndSupplier(date, supplier);
            shipmentRepository.deleteAll(shipments);
            loggingService.log("DELETE_SHIPMENTS", "SUCCESS", "Shipments deleted for supplier: " + supplier);
        } catch (Exception e) {
            loggingService.log("DELETE_SHIPMENTS", "FAILURE", e.getMessage());
            throw new RuntimeException("Error deleting shipments: " + e.getMessage());
        }
    }

    public List<Shipment> viewAllShipments() {
        loggingService.log("VIEW_ALL_SHIPMENTS", "START", "Viewing all shipments");
        try {
            List<Shipment> shipments = shipmentRepository.findAll();
            loggingService.log("VIEW_ALL_SHIPMENTS", "SUCCESS", "Viewed all shipments successfully");
            return shipments;
        } catch (Exception e) {
            loggingService.log("VIEW_ALL_SHIPMENTS", "FAILURE", e.getMessage());
            throw new RuntimeException("Error viewing all shipments: " + e.getMessage());
        }
    }
    

}
