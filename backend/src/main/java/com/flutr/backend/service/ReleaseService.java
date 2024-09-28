package com.flutr.backend.service;

import com.flutr.backend.dto.ReleaseRequest;
import com.flutr.backend.model.Shipment;
import com.flutr.backend.repository.ShipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReleaseService {

    private final ShipmentRepository shipmentRepository;
    private final LoggingService loggingService;

    @Autowired
    public ReleaseService(ShipmentRepository shipmentRepository, LoggingService loggingService) {
        this.shipmentRepository = shipmentRepository;
        this.loggingService = loggingService;
    }

    public void handleRelease(ReleaseRequest request) {
        loggingService.log("HANDLE_RELEASE", "START", "Releasing butterflies for shipment ID: " + request.getShipmentId());
        try {
            Optional<Shipment> shipmentOpt = shipmentRepository.findById(request.getShipmentId());

            if (shipmentOpt.isEmpty()) {
                loggingService.log("HANDLE_RELEASE", "FAILURE", "Shipment not found with ID: " + request.getShipmentId());
                throw new RuntimeException("Shipment not found with ID: " + request.getShipmentId());
            }

            Shipment shipment = shipmentOpt.get();

            // Update butterfly details with release info
            request.getButterflyUpdates().forEach(update -> {
                shipment.getButterflyDetails().forEach(detail -> {
                    if (detail.getButterflyId().equals(update.getButterflyId())) {
                        // Update release-related fields
                        detail.setNumberReleased(detail.getNumberReleased() + update.getNumberReleased());
                        detail.setPoorEmergence(detail.getPoorEmergence() + update.getPoorEmergence());
                        detail.setDamaged(detail.getDamaged() + update.getDamagedDuringRelease());
                        detail.setDiseased(detail.getDiseased() + update.getDiseasedDuringRelease());

                        // Recalculate total remaining
                        int totalRemaining = detail.getNumberReceived() -
                                (detail.getNumberReleased() + 
                                 detail.getEmergedInTransit() + 
                                 detail.getDamaged() + 
                                 detail.getDiseased() + 
                                 detail.getPoorEmergence());
                        detail.setTotalRemaining(totalRemaining);
                    }
                });
            });

            shipmentRepository.save(shipment);

            loggingService.log("HANDLE_RELEASE", "SUCCESS", "Release operation completed for shipment ID: " + request.getShipmentId());
        } catch (Exception e) {
            loggingService.log("HANDLE_RELEASE", "FAILURE", e.getMessage());
            throw new RuntimeException("Error releasing butterflies: " + e.getMessage());
        }
    }
}
