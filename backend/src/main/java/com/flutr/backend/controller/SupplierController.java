package com.flutr.backend.controller;

import com.flutr.backend.model.Supplier;
import com.flutr.backend.service.SupplierService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
    public Supplier addSupplier(@RequestBody Supplier supplier) {
        return supplierService.addSupplier(supplier);
    }

    @PutMapping("/edit")
    public Supplier editSupplier(@RequestParam String oldSupplierName, @RequestParam String newSupplierName) {
        return supplierService.editSupplier(oldSupplierName, newSupplierName);
    }

    @DeleteMapping("/delete")
    public void deleteSupplier(@RequestParam String supplierName) {
        supplierService.deleteSupplier(supplierName);
    }

    @GetMapping("/view/all")
    public List<Supplier> viewAllSuppliers() {
        return supplierService.viewAllSuppliers();
    }

}
