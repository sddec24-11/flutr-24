package com.flutr.backend.controller;

import com.flutr.backend.dto.Response;
import com.flutr.backend.dto.suppliers.EditSupplierRequest;
import com.flutr.backend.model.Supplier;
import com.flutr.backend.service.SupplierService;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/suppliers")
public class SupplierController {

    private final SupplierService supplierService;

    @Autowired
    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }
    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ROLE_SUPERUSER') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Response<Supplier>> addSupplier(@RequestBody Supplier supplier) {
        Supplier addedSupplier = supplierService.addSupplier(supplier);
        return ResponseEntity.ok(new Response<>(true, addedSupplier, null));
    }

    @PutMapping("/edit")
    @PreAuthorize("hasAuthority('ROLE_SUPERUSER') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Response<Supplier>> editSupplier(@RequestBody EditSupplierRequest editSupplierRequest) {
        try {
            Supplier updatedSupplier = supplierService.editSupplier(editSupplierRequest.getOldAbbreviation(), editSupplierRequest.getNewAbbreviation(), editSupplierRequest.getFullName(), editSupplierRequest.isActive());
            return ResponseEntity.ok(new Response<>(true, updatedSupplier, null));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new Response<>(false, null, new Response.ErrorDetails(400, e.getMessage())));
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new Response<>(false, null, new Response.ErrorDetails(403, e.getMessage())));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<>(false, null, new Response.ErrorDetails(500, "Internal server error")));
        }
    }

    @GetMapping("/view/all")
    public ResponseEntity<Response<List<Supplier>>> viewAllSuppliers() {
        List<Supplier> suppliers = supplierService.viewAllSuppliers();
        return ResponseEntity.ok(new Response<>(true, suppliers));
    }

    @GetMapping("/view/active")
    public ResponseEntity<Response<List<Supplier>>> viewActiveSuppliers() {
        List<Supplier> suppliers = supplierService.viewActiveSuppliers();
        return ResponseEntity.ok(new Response<>(true, suppliers, null));
    }

    @PutMapping("/setStatus")
    public ResponseEntity<Response<String>> deactivateActivateSupplier(@RequestParam String abbreviation, @RequestParam boolean isActive) {
        supplierService.deactivateActivateSupplier(abbreviation, isActive);
        String message = isActive ? "Supplier activated successfully." : "Supplier deactivated successfully.";
        return ResponseEntity.ok(new Response<>(true, message, null));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Response<String>> handleException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new Response<>(false, null, new Response.ErrorDetails(500, ex.getMessage())));
    }
}
