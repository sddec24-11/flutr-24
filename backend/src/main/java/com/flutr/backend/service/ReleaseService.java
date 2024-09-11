package com.flutr.backend.service;

import com.flutr.backend.model.Release;
import com.flutr.backend.model.ReleasedSpecies;
import com.flutr.backend.repository.ReleaseRepository;
import com.flutr.backend.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReleaseService {

    @Autowired
    private ReleaseRepository releaseRepository;

    public Release createRelease(Release release) {
        release.setReleaseDateTime(new Date());
        release.setLastUpdated(new Date());
        return releaseRepository.save(release);
    }

    public void deleteRelease(ReleaseOperationRequest request) {
        releaseRepository.deleteById(request.getReleaseId());
    }

    public Release editRelease(EditReleaseRequest request) {
        return releaseRepository.findById(request.getReleaseId()).map(release -> {
            for (ReleasedSpeciesUpdate update : request.getSpeciesUpdates()) {
                for (ReleasedSpecies species : release.getSpeciesDetails()) {
                    if (species.getScientificName().equals(update.getScientificName())) {
                        if (update.getNumberReleased() != null) species.setNumberReleased(update.getNumberReleased());
                        if (update.getEmergedInTransit() != null) species.setEmergedInTransit(update.getEmergedInTransit());
                        if (update.getDamagedInTransit() != null) species.setDamagedInTransit(update.getDamagedInTransit());
                        if (update.getDiseased() != null) species.setDiseased(update.getDiseased());
                        if (update.getParasitized() != null) species.setParasitized(update.getParasitized());
                        if (update.getPoorEmergence() != null) species.setPoorEmergence(update.getPoorEmergence());
                        if (update.getNoEmergence() != null) species.setNoEmergence(update.getNoEmergence());
                    }
                }
            }
            release.setLastUpdated(new Date());
            return releaseRepository.save(release);
        }).orElse(null);
    }

    public void deleteSpecies(DeleteSpeciesRequest request) {
        releaseRepository.findById(request.getReleaseId()).ifPresent(release -> {
            List<ReleasedSpecies> updatedSpecies = release.getSpeciesDetails().stream()
                .filter(species -> !request.getScientificNames().contains(species.getScientificName()))
                .collect(Collectors.toList());
            release.setSpeciesDetails(updatedSpecies);
            releaseRepository.save(release);
        });
    }
}