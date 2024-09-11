package com.flutr.backend.controller;

import com.flutr.backend.dto.*;
import com.flutr.backend.model.Shipment;
import com.flutr.backend.model.Supplier;
import com.flutr.backend.service.ShipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shipments")
public class ShipmentController {

    private final ShipmentService shipmentService;

    @Autowired
    public ShipmentController(ShipmentService shipmentService) {
        this.shipmentService = shipmentService;
    }

    @PostMapping("/add")
    public Shipment addShipment(@RequestBody Shipment shipment) {
        return shipmentService.addShipment(shipment);
    }

    @DeleteMapping("/delete")
    public void deleteShipmentById(@RequestBody DeleteShipmentRequest request) {
        shipmentService.deleteShipmentById(request.getId());
    }

    @PutMapping("/edit")
    public Shipment editShipment(@RequestBody EditShipmentRequest request) {
        return shipmentService.editShipment(request.getId(), request.getShipment());
    }

    @GetMapping("/view/date-supplier")
    public List<Shipment> viewShipmentsByDateAndSupplier(@RequestBody ShipmentDateSupplierRequest request) {
        return shipmentService.viewShipmentsByDateAndSupplier(request.getDate(), request.getSupplier());
    }


    @GetMapping("/all")
    public List<Shipment> viewAllShipments() {
        return shipmentService.viewAllShipments();
    }

    @GetMapping("/overview")
    public List<Shipment> getShipmentsOverview(@RequestBody ShipmentOverviewRequest request) {
        return shipmentService.overviewShipments(request.getStartDate(), request.getEndDate(), request.getSupplier());
    }

    @PostMapping("/import")
    public String importShipment() {
        // Placeholder 
        return "placeholder import";
    }

    @GetMapping("/export")
    public String exportShipment() {
        // Placeholder 
        return "placeholder export";
    }


    @PostMapping("/supplier/add")
public Supplier addSupplier(@RequestBody Supplier supplier) {
    return shipmentService.addSupplier(supplier);
}

@PutMapping("/supplier/edit")
public Supplier editSupplier(@RequestBody SupplierEditRequest editRequest) {
    return shipmentService.editSupplier(editRequest.getOldSupplier(), editRequest.getNewSupplier());
}

@DeleteMapping("/supplier/delete")
public void deleteSupplier(@RequestBody Supplier supplier) {
    shipmentService.deleteSupplier(supplier.getSupplier());
}
}