package com.flutr.backend.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.flutr.backend.dto.Response;
import com.flutr.backend.dto.Response.ErrorDetails;
import com.flutr.backend.service.ReportService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/reports")
public class ReportController {
    @Autowired
    private ReportService reportService;

    @GetMapping("/export")
    @PreAuthorize("hasAuthority('ROLE_SUPERUSER') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Response<List<List<String>>>> exportShipments(HttpServletResponse response,
                                @RequestParam(required = false) Integer startYear,
                                @RequestParam(required = false) Integer startMonth,
                                @RequestParam(required = false) Integer endYear,
                                @RequestParam(required = false) Integer endMonth,
                                @RequestParam(required = false) String houseId) throws IOException {
        
        try {
            List<List<String>> csvData = reportService.exportShipmentData(startYear, startMonth, endYear, endMonth, houseId);
            return ResponseEntity.ok(new Response<>(true, csvData, null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new Response<>(false, null, new Response.ErrorDetails(500, "Internal server error:" + e)));
        }
    }

    @PostMapping("/import")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Response<List<String>>> importShipments(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(new Response<>(false, null, new ErrorDetails(400, "No file uploaded")));
            }
            List<String> errors = reportService.importShipmentsFromCsv(file);
            if (!errors.isEmpty()) {
                return ResponseEntity.badRequest().body(new Response<>(false, errors, new ErrorDetails(400, "Errors encountered during file processing")));
            }
            return ResponseEntity.ok(new Response<>(true, null, new ErrorDetails(200, "File processed successfully")));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(new Response<>(false, null, new ErrorDetails(500, "Failed to process file: " + e.getMessage())));
        }
    }
}
