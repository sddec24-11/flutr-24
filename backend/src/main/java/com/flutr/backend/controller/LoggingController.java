package com.flutr.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flutr.backend.dto.Response;
import com.flutr.backend.model.LogEntry;
import com.flutr.backend.service.LoggingService;

@RestController
@RequestMapping("/logs")
public class LoggingController {
    @Autowired
    private LoggingService loggingService;

    @GetMapping("/allLogs")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Response<List<LogEntry>>> getAllLogs() {
        try {
            List<LogEntry> logEntries = loggingService.getAllLogsSorted();
            return ResponseEntity.ok(new Response<>(true, logEntries, null));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new Response<>(false, null, new Response.ErrorDetails(500, "Internal server error")));
        }
    }
}