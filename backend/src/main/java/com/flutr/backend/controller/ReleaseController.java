package com.flutr.backend.controller;

import com.flutr.backend.dto.Response;
import com.flutr.backend.dto.releases.ReleaseRequest;
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
}
