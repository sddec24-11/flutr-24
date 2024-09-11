package com.flutr.backend.controller;

import com.flutr.backend.dto.*;
import com.flutr.backend.model.Release;
import com.flutr.backend.service.ReleaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/release")
public class ReleaseController {

    @Autowired
    private ReleaseService releaseService;

    @PostMapping("/create")
    public Release createRelease(@RequestBody Release release) {
        return releaseService.createRelease(release);
    }

    @PostMapping("/delete")
    public void deleteRelease(@RequestBody ReleaseOperationRequest request) {
        releaseService.deleteRelease(request);
    }

    @PostMapping("/edit")
    public Release editRelease(@RequestBody EditReleaseRequest request) {
        return releaseService.editRelease(request);
    }

    @PostMapping("/deleteSpecies")
    public void deleteSpecies(@RequestBody DeleteSpeciesRequest request) {
        releaseService.deleteSpecies(request);
    }
}