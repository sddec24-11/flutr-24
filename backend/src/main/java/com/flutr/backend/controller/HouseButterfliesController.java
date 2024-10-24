package com.flutr.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flutr.backend.dto.Response;
import com.flutr.backend.dto.houseButterflies.EditHouseButterflyRequest;
import com.flutr.backend.model.HouseButterflies;
import com.flutr.backend.service.HouseButterfliesService;

import java.util.List;

@RestController
@RequestMapping("/butterflies")
public class HouseButterfliesController {

    @Autowired
    private HouseButterfliesService houseButterfliesService;

    @GetMapping("/all")
    public ResponseEntity<Response<List<HouseButterflies>>> getAllButterflies() {
        try {
            List<HouseButterflies> butterflies = houseButterfliesService.getAllHouseButterflies();
            return ResponseEntity.ok(new Response<>(true, butterflies, null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<>(false, null, new Response.ErrorDetails(500, "Internal server error")));
        }
    }

    // Only names, lifespan, image
    @GetMapping("/details")
    public ResponseEntity<Response<List<HouseButterflies>>> getButterflyDetails() {
        try {
            List<HouseButterflies> butterflyDetails = houseButterfliesService.getButterflyDetails();
            return ResponseEntity.ok(new Response<>(true, butterflyDetails, null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<>(false, null, new Response.ErrorDetails(500, "Internal server error")));
        }
    }

    @GetMapping("/fullDetails/{buttId}")
    public ResponseEntity<Response<HouseButterflies>> getFullButterflyDetails(@PathVariable String buttId) {
        try {
            HouseButterflies butterfly = houseButterfliesService.getFullButterflyDetails(buttId);
            return ResponseEntity.ok(new Response<>(true, butterfly, null));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new Response<>(false, null, new Response.ErrorDetails(500, "Internal server error")));
        }
    }

    @PutMapping("/edit")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Response<String>> editButterfly(@RequestBody EditHouseButterflyRequest editButterflyRequest) {
        try {
            houseButterfliesService.editHouseButterfly(editButterflyRequest.getButtId(), editButterflyRequest.getCommonName(), editButterflyRequest.getLifespan());
            return ResponseEntity.ok(new Response<>(true, "Butterfly edited successfully.", null));
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new Response<>(false, null, new Response.ErrorDetails(403, e.getMessage())));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new Response<>(false, null, new Response.ErrorDetails(400, e.getMessage())));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<>(false, null, new Response.ErrorDetails(500, "Internal server error")));
        }
    }
    
}
