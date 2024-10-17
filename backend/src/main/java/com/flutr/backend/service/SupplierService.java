package com.flutr.backend.service;

import com.flutr.backend.model.Supplier;
import com.flutr.backend.repository.SupplierRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SupplierService {

    private final SupplierRepository supplierRepository;
    private final LoggingService loggingService;

    @Autowired
    public SupplierService(SupplierRepository supplierRepository, LoggingService loggingService) {
        this.supplierRepository = supplierRepository;
        this.loggingService = loggingService;
    }

    public Supplier addSupplier(Supplier supplier) {
        loggingService.log("ADD_SUPPLIER", "START", "Adding supplier: " + supplier.getSupplier());
        try {
            if (supplierRepository.findBySupplier(supplier.getSupplier()).isPresent()) {
                loggingService.log("ADD_SUPPLIER", "FAILURE", "Supplier already exists: " + supplier.getSupplier());
                throw new RuntimeException("Supplier already exists");
            }
            Supplier savedSupplier = supplierRepository.save(supplier);
            loggingService.log("ADD_SUPPLIER", "SUCCESS", "Supplier added: " + supplier.getSupplier());
            return savedSupplier;
        } catch (Exception e) {
            loggingService.log("ADD_SUPPLIER", "FAILURE", e.getMessage());
            throw new RuntimeException("Error adding supplier: " + e.getMessage());
        }
    }

    public Supplier editSupplier(String oldSupplierName, String newSupplierName) {
        loggingService.log("EDIT_SUPPLIER", "START", "Editing supplier from: " + oldSupplierName + " to: " + newSupplierName);
        try {
            Supplier supplier = supplierRepository.findBySupplier(oldSupplierName)
                    .orElseThrow(() -> new RuntimeException("Supplier not found: " + oldSupplierName));

            supplier.setSupplier(newSupplierName);
            Supplier updatedSupplier = supplierRepository.save(supplier);
            loggingService.log("EDIT_SUPPLIER", "SUCCESS", "Supplier edited successfully: " + newSupplierName);
            return updatedSupplier;
        } catch (Exception e) {
            loggingService.log("EDIT_SUPPLIER", "FAILURE", e.getMessage());
            throw new RuntimeException("Error editing supplier: " + e.getMessage());
        }
    }

    public void deleteSupplier(String supplierName) {
        loggingService.log("DELETE_SUPPLIER", "START", "Deleting supplier: " + supplierName);
        try {
            Supplier supplier = supplierRepository.findBySupplier(supplierName)
                    .orElseThrow(() -> new RuntimeException("Supplier not found: " + supplierName));

            supplierRepository.delete(supplier);
            loggingService.log("DELETE_SUPPLIER", "SUCCESS", "Supplier deleted: " + supplierName);
        } catch (Exception e) {
            loggingService.log("DELETE_SUPPLIER", "FAILURE", e.getMessage());
            throw new RuntimeException("Error deleting supplier: " + e.getMessage());
        }
    }

    public List<Supplier> viewAllSuppliers() {
        loggingService.log("VIEW_ALL_SUPPLIERS", "START", "Viewing all suppliers");
        try {
            List<Supplier> suppliers = supplierRepository.findAll();
            loggingService.log("VIEW_ALL_SUPPLIERS", "SUCCESS", "Viewed all suppliers successfully");
            return suppliers;
        } catch (Exception e) {
            loggingService.log("VIEW_ALL_SUPPLIERS", "FAILURE", e.getMessage());
            throw new RuntimeException("Error viewing all suppliers: " + e.getMessage());
        }
    }

}
