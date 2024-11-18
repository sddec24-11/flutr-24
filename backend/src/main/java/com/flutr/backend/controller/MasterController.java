package com.flutr.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.flutr.backend.dto.Response;
import com.flutr.backend.dto.houseButterflies.EditHouseButterflyRequest;
import com.flutr.backend.model.Butterfly;
import com.flutr.backend.service.MasterService;

import java.util.List;

@RestController
@RequestMapping("/master")
public class MasterController {
    
    @Autowired
    private MasterService masterService;

    @PostMapping("/addButterfly")
    @PreAuthorize("hasAuthority('ROLE_SUPERUSER')")
    public ResponseEntity<Response<String>> addButterfly(
            @RequestPart("butterfly") Butterfly butterfly, 
            @RequestPart(value = "imgWingsOpen", required = false) MultipartFile imgWingsOpen,
            @RequestPart(value = "imgWingsClosed", required = false) MultipartFile imgWingsClosed,
            @RequestPart(value = "extraImg1", required = false) MultipartFile extraImg1,
            @RequestPart(value = "extraImg2", required = false) MultipartFile extraImg2) {
        try {
            masterService.addButterfly(butterfly, imgWingsOpen, imgWingsClosed, extraImg1, extraImg2);
            return ResponseEntity.ok(new Response<>(true, "Butterfly added successfully to Master DB and all houses.", null));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new Response<>(false, null, new Response.ErrorDetails(500, "Internal server error")));
        }
    }

    @PutMapping("/editButterfly")
    @PreAuthorize("hasAuthority('ROLE_SUPERUSER')")
    public ResponseEntity<Response<String>> editButterfly(
            @RequestPart("butterfly") Butterfly butterfly,
            @RequestPart(value = "imgWingsOpen", required = false) MultipartFile imgWingsOpen,
            @RequestPart(value = "imgWingsClosed", required = false) MultipartFile imgWingsClosed,
            @RequestPart(value = "extraImg1", required = false) MultipartFile extraImg1,
            @RequestPart(value = "extraImg2", required = false) MultipartFile extraImg2) {
        try {
            masterService.editButterfly(butterfly, imgWingsOpen, imgWingsClosed, extraImg1, extraImg2);
            return ResponseEntity.ok(new Response<>(true, "Butterfly details updated successfully across all houses.", null));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new Response<>(false, null, new Response.ErrorDetails(500, "Internal server error")));
        }
    }

    @PutMapping("/editButterflyLite")
    @PreAuthorize("hasAuthority('ROLE_SUPERUSER')")
    public ResponseEntity<Response<String>> editButterflyCommonNameAndLifespan(@RequestBody EditHouseButterflyRequest editHouseButterflyRequest) {
        try {
            masterService.editButterflyCommonNameAndLifespan(editHouseButterflyRequest.getButtId(), editHouseButterflyRequest.getCommonName(), editHouseButterflyRequest.getLifespan());
            return ResponseEntity.ok(new Response<>(true, "Butterfly common name and lifespan updated successfully.", null));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new Response<>(false, null, new Response.ErrorDetails(400, e.getMessage())));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new Response<>(false, null, new Response.ErrorDetails(500, "Internal server error")));
        }
    }

    @GetMapping("/butterflyDetails/{buttId}")
    @PreAuthorize("hasAuthority('ROLE_SUPERUSER')")
    public ResponseEntity<Response<Butterfly>> getFullButterflyDetails(@PathVariable String buttId) {
        try {
            Butterfly butterfly = masterService.getFullButterflyDetails(buttId);
            return ResponseEntity.ok(new Response<>(true, butterfly, null));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new Response<>(false, null, new Response.ErrorDetails(500, "Internal server error")));
        }
    }

    @GetMapping("/butterflyLiteDetails/{buttId}")
    @PreAuthorize("hasAuthority('ROLE_SUPERUSER')")
    public ResponseEntity<Response<Butterfly>> getButterflyDetails(@PathVariable String buttId) {
        try {
            Butterfly butterfly = masterService.getButterflyDetails(buttId);
            return ResponseEntity.ok(new Response<>(true, butterfly, null));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new Response<>(false, null, new Response.ErrorDetails(500, "Internal server error")));
        }
    }

    @GetMapping("/allButterflies")
    @PreAuthorize("hasAuthority('ROLE_SUPERUSER')")
    public ResponseEntity<Response<List<Butterfly>>> getAllButterflies() {
        try {
            List<Butterfly> butterflies = masterService.getAllButterflies();
            return ResponseEntity.ok(new Response<>(true, butterflies, null));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new Response<>(false, null, new Response.ErrorDetails(500, "Internal server error")));
        }
    }

    @DeleteMapping("/deleteButterfly/{buttId}")
    @PreAuthorize("hasAuthority('ROLE_SUPERUSER')")
    public ResponseEntity<Response<String>> deleteButterfly(@PathVariable String buttId) {
        try {
            masterService.deleteButterfly(buttId);
            return ResponseEntity.ok(new Response<>(true, "Butterfly deleted successfully.", null));
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(new Response<>(false, null, new Response.ErrorDetails(400, e.getMessage())));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new Response<>(false, null, new Response.ErrorDetails(500, "Internal server error")));
        }
    }
}
