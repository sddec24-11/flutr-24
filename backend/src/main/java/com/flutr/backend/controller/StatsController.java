package com.flutr.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flutr.backend.dto.Response;
import com.flutr.backend.dto.stats.ContinentInflightStats;
import com.flutr.backend.dto.stats.FamilyInflightStats;
import com.flutr.backend.model.HouseButterflies;
import com.flutr.backend.service.StatsService;

@RestController
@RequestMapping("/stats")
public class StatsController {

    @Autowired
    private StatsService statsService;

    @GetMapping("/familyInflight/{houseId}")
    public ResponseEntity<Response<List<FamilyInflightStats>>> getFamilyInflightStats(@PathVariable String houseId) {
        try {
            List<FamilyInflightStats> stats = statsService.getFamilyInflightStats(houseId);
            return ResponseEntity.ok(new Response<>(true, stats, null));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new Response<>(false, null, new Response.ErrorDetails(500, e.getMessage())));
        }
    }

    @GetMapping("/mostInFlight/{houseId}")
    public ResponseEntity<Response<HouseButterflies>> getMostInFlightButterfly(@PathVariable String houseId) {
        try {
            HouseButterflies butterfly = statsService.getMostInFlightButterfly(houseId);
            return ResponseEntity.ok(new Response<>(true, butterfly, null));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new Response<>(false, null, new Response.ErrorDetails(500, e.getMessage())));
        }
    }

    @GetMapping("/leastInFlight/{houseId}")
    public ResponseEntity<Response<HouseButterflies>> getLeastInFlightButterfly(@PathVariable String houseId) {
        try {
            HouseButterflies butterfly = statsService.getLeastInFlightButterfly(houseId);
            return ResponseEntity.ok(new Response<>(true, butterfly, null));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new Response<>(false, null, new Response.ErrorDetails(500, e.getMessage())));
        }
    }

    @GetMapping("/continentInflight/{houseId}")
    public ResponseEntity<Response<List<ContinentInflightStats>>> getContinentInflightStats(@PathVariable String houseId) {
        try {
            List<ContinentInflightStats> stats = statsService.getContinentInflightStats(houseId);
            return ResponseEntity.ok(new Response<>(true, stats, null));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new Response<>(false, null, new Response.ErrorDetails(500, e.getMessage())));
        }
    }
}