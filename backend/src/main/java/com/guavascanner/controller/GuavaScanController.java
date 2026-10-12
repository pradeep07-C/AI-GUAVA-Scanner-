package com.guavascanner.controller;

import com.guavascanner.model.DiseaseInfo;
import com.guavascanner.model.ScanResult;
import com.guavascanner.service.GuavaAnalysisService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class GuavaScanController {

    private final GuavaAnalysisService analysisService;

    public GuavaScanController(GuavaAnalysisService analysisService) {
        this.analysisService = analysisService;
    }

    /**
     * Main endpoint to scan an uploaded guava image.
     * Accepts multipart file parameter 'image' or 'file'.
     */
    @PostMapping("/scan")
    public ResponseEntity<?> scanGuava(@RequestParam(value = "image", required = false) MultipartFile image,
                                       @RequestParam(value = "file", required = false) MultipartFile file) {
        MultipartFile targetFile = image != null ? image : file;

        if (targetFile == null || targetFile.isEmpty()) {
            Map<String, String> err = new HashMap<>();
            err.put("error", "No image provided. Please upload a guava picture.");
            return ResponseEntity.badRequest().body(err);
        }

        try {
            ScanResult result = analysisService.analyzeGuavaImage(targetFile);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            Map<String, String> err = new HashMap<>();
            err.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(err);
        } catch (IOException e) {
            Map<String, String> err = new HashMap<>();
            err.put("error", "Failed to process image: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }

    /**
     * Get list of all known guava diseases and causes
     */
    @GetMapping("/diseases")
    public ResponseEntity<List<DiseaseInfo>> getAllDiseases() {
        return ResponseEntity.ok(analysisService.getAllDiseases());
    }

    /**
     * Get details for a specific disease
     */
    @GetMapping("/diseases/{id}")
    public ResponseEntity<?> getDiseaseById(@PathVariable String id) {
        DiseaseInfo info = analysisService.getDiseaseById(id);
        if (info == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(info);
    }

    /**
     * Instant test sample scans for fresh, medium, or poor guavas
     */
    @GetMapping("/samples/{type}")
    public ResponseEntity<ScanResult> getSampleScan(@PathVariable String type) {
        ScanResult result = analysisService.getSampleScan(type);
        return ResponseEntity.ok(result);
    }

    /**
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> resp = new HashMap<>();
        resp.put("status", "UP");
        resp.put("service", "Guava Scanner AI Backend");
        resp.put("version", "1.0.0");
        resp.put("javaVersion", System.getProperty("java.version"));
        return ResponseEntity.ok(resp);
    }
}
