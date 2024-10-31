package com.flutr.backend.controller;

import com.flutr.backend.dto.Response;
import com.flutr.backend.model.Shipment;
import com.flutr.backend.service.ShipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin(origins = {"http://206.81.3.155", "http://flutr.org"}, maxAge = 3600)
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
    public ResponseEntity<Response<Shipment>> addShipment(@RequestBody Shipment shipment) {
        try {
            Shipment addedShipment = shipmentService.addShipment(shipment);
            return ResponseEntity.ok(new Response<>(true, addedShipment, null));
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(new Response<>(false, null, new Response.ErrorDetails(400, e.getMessage())));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new Response<>(false, null, new Response.ErrorDetails(500, "Failed to add shipment due to an unexpected error.")));
        }
    }

    // Edit an existing shipment
    @PutMapping("/edit/{id}")
    @PreAuthorize("hasAuthority('ROLE_SUPERUSER') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Response<Shipment>> editShipment(@PathVariable String id, @RequestBody Shipment updatedShipment) {
        try {
            Shipment editedShipment = shipmentService.editShipment(id, updatedShipment).orElseThrow(() -> new IllegalStateException("Shipment not found with ID: " + id));
            return ResponseEntity.ok(new Response<>(true, editedShipment, null));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response<>(false, null, new Response.ErrorDetails(404, e.getMessage())));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new Response<>(false, null, new Response.ErrorDetails(500, "Error editing shipment: " + e.getMessage())));
        }
    }

    // Delete a shipment by ID
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ROLE_SUPERUSER') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Response<String>> deleteShipmentById(@PathVariable String id) {
        try {
            shipmentService.deleteShipmentById(id);
            return ResponseEntity.ok(new Response<>(true, "Shipment deleted successfully."));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new Response<>(false, null, new Response.ErrorDetails(500, "Failed to delete shipment: " + e.getMessage())));
        }
    }

    // View shipments by date and supplier
    @GetMapping("/view/date-supplier")
    public ResponseEntity<Response<List<Shipment>>> viewShipmentsByDateAndAbbreviation(@RequestParam Date date, @RequestParam String abbreviation) {
        try {
            List<Shipment> shipments = shipmentService.viewShipmentsByDateAndAbbreviation(date, abbreviation);
            return ResponseEntity.ok(new Response<>(true, shipments));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new Response<>(false, null, new Response.ErrorDetails(500, "Error viewing shipments: " + e.getMessage())));
        }
    }

    // Overview shipments by date range and supplier
    @GetMapping("/overview")
    public ResponseEntity<Response<List<Shipment>>> overviewShipments(@RequestParam Date startDate, @RequestParam Date endDate, @RequestParam(required = false) String abbreviation) {
        try {
            List<Shipment> shipments = shipmentService.overviewShipments(startDate, endDate, abbreviation);
            return ResponseEntity.ok(new Response<>(true, shipments));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new Response<>(false, null, new Response.ErrorDetails(500, "Error overviewing shipments: " + e.getMessage())));
        }
    }

    // Delete shipments by date and supplier
    @DeleteMapping("/delete/date-supplier")
    @PreAuthorize("hasAuthority('ROLE_SUPERUSER') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Response<String>> deleteShipmentsByDateAndAbbreviation(@RequestParam Date date, @RequestParam String abbreviation) {
        try {
            shipmentService.deleteShipmentsByDateAndAbbreviation(date, abbreviation);
            return ResponseEntity.ok(new Response<>(true, "Shipments deleted successfully."));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new Response<>(false, null, new Response.ErrorDetails(500, "Error deleting shipments: " + e.getMessage())));
        }
    }

    // View all shipments
    @GetMapping("/view/all")
    public ResponseEntity<Response<List<Shipment>>> viewAllShipments() {
        try {
            List<Shipment> shipments = shipmentService.viewAllShipments();
            return ResponseEntity.ok(new Response<>(true, shipments));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new Response<>(false, null, new Response.ErrorDetails(500, "Error viewing all shipments: " + e.getMessage())));
        }
    }
}
