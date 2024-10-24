package com.flutr.backend.controller;

import com.flutr.backend.dto.Response;
import com.flutr.backend.dto.releases.InflightData;
import com.flutr.backend.dto.releases.ReleaseRequest;
import com.flutr.backend.model.HouseButterflies;
import com.flutr.backend.service.ReleaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/releases")
public class ReleaseController {

    private final ReleaseService releaseService;

    @Autowired
    public ReleaseController(ReleaseService releaseService) {
        this.releaseService = releaseService;
    }

    @PostMapping("/release")
    public ResponseEntity<Response<String>> handleRelease(@RequestBody ReleaseRequest releaseRequest) {
        try {
            releaseService.handleRelease(releaseRequest);
            return ResponseEntity.ok(new Response<>(true, "Release operation completed successfully.", null));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new Response<>(false, null, new Response.ErrorDetails(HttpStatus.BAD_REQUEST.value(), e.getMessage())));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new Response<>(false, null, new Response.ErrorDetails(500, "Internal server error")));
        }
    }

    @GetMapping("/inflight/{houseId}")
    public ResponseEntity<Response<InflightData>> getInflightData(@PathVariable String houseId) {
        try {
            InflightData inflightData = releaseService.getInflightData(houseId);
            return ResponseEntity.ok(new Response<>(true, inflightData, null));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new Response<>(false, null, new Response.ErrorDetails(400, e.getMessage())));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<>(false, null, new Response.ErrorDetails(500, "Internal server error")));
        }
    }

    @GetMapping("/botd/{houseId}")
    public ResponseEntity<Response<HouseButterflies>> getBOTD(@PathVariable String houseId) {
        try {
            HouseButterflies botd = releaseService.getBOTD(houseId);
            if (botd != null) {
                return ResponseEntity.ok(new Response<>(true, botd, null));
            } else {
                return ResponseEntity.ok(new Response<>(false, null, new Response.ErrorDetails(404, "No BOTD found")));
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new Response<>(false, null, new Response.ErrorDetails(400, e.getMessage())));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<>(false, null, new Response.ErrorDetails(500, "Internal server error")));
        }
    }
}
