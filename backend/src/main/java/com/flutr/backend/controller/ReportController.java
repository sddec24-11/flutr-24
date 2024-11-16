package com.flutr.backend.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.flutr.backend.dto.Response;
import com.flutr.backend.service.ReportService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/reports")
public class ReportController {
    @Autowired
    private ReportService reportService;

    @GetMapping("/export")
    @PreAuthorize("hasAuthority('ROLE_SUPERUSER') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Response<String>> exportShipments(HttpServletResponse response,
                                @RequestParam(required = false) Integer startYear,
                                @RequestParam(required = false) Integer endYear,
                                @RequestParam(required = false) String houseId) throws IOException {
        
        try {
            reportService.exportShipmentData(response, startYear, endYear, houseId);
            return ResponseEntity.ok(new Response<>(true, "Export completed successfully.", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new Response<>(false, null, new Response.ErrorDetails(500, "Internal server error")));
        }
    }
}
