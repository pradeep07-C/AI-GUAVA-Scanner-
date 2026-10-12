package com.guavascanner.model;

import java.util.Map;

public class ScanResult {
    private String id;
    private String fileName;
    private String condition; // FRESH, MEDIUM, POOR
    private String message;   // Required exact message
    private double freshnessScore; // 0 to 100 %
    private double confidence;     // 0 to 100 %
    private double defectPercentage;

    // Disease Diagnostics (populated for POOR or MEDIUM when applicable)
    private String diseaseName;
    private String pathogen;
    private String symptoms;
    private String diseaseReason;
    private String healthAdvisory;
    private String recommendedAction;

    private boolean recognized = true;
    private String matchedFile;

    // Detailed visual metrics
    private Map<String, Object> colorMetrics;
    private String timestamp;

    public ScanResult() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public double getFreshnessScore() { return freshnessScore; }
    public void setFreshnessScore(double freshnessScore) { this.freshnessScore = freshnessScore; }

    public double getConfidence() { return confidence; }
    public void setConfidence(double confidence) { this.confidence = confidence; }

    public double getDefectPercentage() { return defectPercentage; }
    public void setDefectPercentage(double defectPercentage) { this.defectPercentage = defectPercentage; }

    public String getDiseaseName() { return diseaseName; }
    public void setDiseaseName(String diseaseName) { this.diseaseName = diseaseName; }

    public String getPathogen() { return pathogen; }
    public void setPathogen(String pathogen) { this.pathogen = pathogen; }

    public String getSymptoms() { return symptoms; }
    public void setSymptoms(String symptoms) { this.symptoms = symptoms; }

    public String getDiseaseReason() { return diseaseReason; }
    public void setDiseaseReason(String diseaseReason) { this.diseaseReason = diseaseReason; }

    public String getHealthAdvisory() { return healthAdvisory; }
    public void setHealthAdvisory(String healthAdvisory) { this.healthAdvisory = healthAdvisory; }

    public String getRecommendedAction() { return recommendedAction; }
    public void setRecommendedAction(String recommendedAction) { this.recommendedAction = recommendedAction; }

    public Map<String, Object> getColorMetrics() { return colorMetrics; }
    public void setColorMetrics(Map<String, Object> colorMetrics) { this.colorMetrics = colorMetrics; }

    public boolean isRecognized() { return recognized; }
    public void setRecognized(boolean recognized) { this.recognized = recognized; }

    public String getMatchedFile() { return matchedFile; }
    public void setMatchedFile(String matchedFile) { this.matchedFile = matchedFile; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}
