package com.flutr.backend.controller;

import com.flutr.backend.model.Shipment;
import com.flutr.backend.service.ShipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/shipments")
public class ShipmentController {

    private final ShipmentService shipmentService;

    @Autowired
    public ShipmentController(ShipmentService shipmentService) {
        this.shipmentService = shipmentService;
    }

    // Add a new shipment
    @PostMapping("/add")
    public Shipment addShipment(@RequestBody Shipment shipment) {
        return shipmentService.addShipment(shipment);
    }

    // Edit an existing shipment
    @PutMapping("/edit/{id}")
    public Optional<Shipment> editShipment(@PathVariable String id, @RequestBody Shipment updatedShipment) {
        return shipmentService.editShipment(id, updatedShipment);
    }

    // Delete a shipment by ID
    @DeleteMapping("/delete/{id}")
    public void deleteShipmentById(@PathVariable String id) {
        shipmentService.deleteShipmentById(id);
    }

    // View shipments by date and supplier
    @GetMapping("/view/date-supplier")
    public List<Shipment> viewShipmentsByDateAndSupplier(@RequestParam Date date, @RequestParam String supplier) {
        return shipmentService.viewShipmentsByDateAndSupplier(date, supplier);
    }

    // Overview shipments by date range and supplier
    @GetMapping("/overview")
    public List<Shipment> overviewShipments(@RequestParam Date startDate, @RequestParam Date endDate, @RequestParam(required = false) String supplier) {
        return shipmentService.overviewShipments(startDate, endDate, supplier);
    }

    // Delete shipments by date and supplier
    @DeleteMapping("/delete/date-supplier")
    public void deleteShipmentsByDateAndSupplier(@RequestParam Date date, @RequestParam String supplier) {
        shipmentService.deleteShipmentsByDateAndSupplier(date, supplier);
    }

    // View all shipments (optional for debugging purposes)
    @GetMapping("/view/all")
    public List<Shipment> viewAllShipments() {
        return shipmentService.viewAllShipments();
    }
}
