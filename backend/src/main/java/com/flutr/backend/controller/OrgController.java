package com.flutr.backend.controller;

import com.flutr.backend.model.Org;
import com.flutr.backend.model.OrgInfo;
import com.flutr.backend.dto.Response;
import com.flutr.backend.service.OrgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/orgs")
public class OrgController {

    @Autowired
    private OrgService orgService;

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('ROLE_SUPERUSER')")
    public ResponseEntity<Response<String>> createOrg(@RequestBody Org org) {
        try {
            String message = orgService.createOrg(org);
            return ResponseEntity.ok(new Response<>(true, message, null));
        } catch (SecurityException e) {
            return ResponseEntity.status(403).body(new Response<>(false, null, new Response.ErrorDetails(403, e.getMessage())));
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(new Response<>(false, null, new Response.ErrorDetails(400, e.getMessage())));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new Response<>(false, null, new Response.ErrorDetails(500, "Internal server error")));
        }
    }

    @PutMapping("/edit")
    @PreAuthorize("hasAuthority('ROLE_SUPERUSER') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Response<OrgInfo>> editOrg(
        @RequestPart("orgInfo") OrgInfo orgInfo, 
        @RequestPart(value = "logoFile", required = false) MultipartFile logoFile,
        @RequestPart(value = "facilityImageFile", required = false) MultipartFile facilityImageFile) {
        try {
            OrgInfo updatedOrgInfo = orgService.editOrg(orgInfo, logoFile, facilityImageFile);
            return ResponseEntity.ok(new Response<>(true, updatedOrgInfo, null));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new Response<>(false, null, new Response.ErrorDetails(400, e.getMessage())));
        } catch  (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new Response<>(false, null, new Response.ErrorDetails(403, e.getMessage())));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<>(false, null, new Response.ErrorDetails(500, "Internal server error")));
        }
    }

    @GetMapping("/view/{houseId}")
    @PreAuthorize("hasAuthority('ROLE_SUPERUSER') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Response<OrgInfo>> getOrgInfo(@PathVariable String houseId) {
        try {
            OrgInfo orgInfo = orgService.getOrgInfo(houseId);
            return ResponseEntity.ok(new Response<>(true, orgInfo, null));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new Response<>(false, null, new Response.ErrorDetails(400, e.getMessage())));
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new Response<>(false, null, new Response.ErrorDetails(403, e.getMessage())));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<>(false, null, new Response.ErrorDetails(500, "Internal server error")));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<Response<List<Org>>> getAllOrgs() {
        try {
            List<Org> orgs = orgService.getAllHousesInfo();
            return ResponseEntity.ok(new Response<>(true, orgs, null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<>(false, null, new Response.ErrorDetails(500, "Internal server error")));
        }
    }

    @GetMapping("/{houseId}")
    public ResponseEntity<Response<OrgInfo>> publicGetOrgInfo(@PathVariable String houseId) {
        try {
            OrgInfo orgInfo = orgService.publicGetOrgInfo(houseId);
            return ResponseEntity.ok(new Response<>(true, orgInfo, null));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new Response<>(false, null, new Response.ErrorDetails(400, e.getMessage())));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response<>(false, null, new Response.ErrorDetails(500, "Internal server error")));
        }
    }

}
