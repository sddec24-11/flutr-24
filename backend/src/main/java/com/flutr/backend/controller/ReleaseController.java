package com.flutr.backend.controller;

import com.flutr.backend.dto.ReleaseRequest;
import com.flutr.backend.service.ReleaseService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public void handleRelease(@RequestBody ReleaseRequest releaseRequest) {
        releaseService.handleRelease(releaseRequest);
    }
}
