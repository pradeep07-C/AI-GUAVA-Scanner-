package com.guavascanner.model;

public class DiseaseInfo {
    private String id;
    private String name;
    private String scientificName;
    private String symptoms;
    private String cause;
    private String preventionTips;
    private String foodSafetyRisk;

    public DiseaseInfo() {}

    public DiseaseInfo(String id, String name, String scientificName, String symptoms, String cause, String preventionTips, String foodSafetyRisk) {
        this.id = id;
        this.name = name;
        this.scientificName = scientificName;
        this.symptoms = symptoms;
        this.cause = cause;
        this.preventionTips = preventionTips;
        this.foodSafetyRisk = foodSafetyRisk;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getScientificName() { return scientificName; }
    public void setScientificName(String scientificName) { this.scientificName = scientificName; }

    public String getSymptoms() { return symptoms; }
    public void setSymptoms(String symptoms) { this.symptoms = symptoms; }

    public String getCause() { return cause; }
    public void setCause(String cause) { this.cause = cause; }

    public String getPreventionTips() { return preventionTips; }
    public void setPreventionTips(String preventionTips) { this.preventionTips = preventionTips; }

    public String getFoodSafetyRisk() { return foodSafetyRisk; }
    public void setFoodSafetyRisk(String foodSafetyRisk) { this.foodSafetyRisk = foodSafetyRisk; }
}
