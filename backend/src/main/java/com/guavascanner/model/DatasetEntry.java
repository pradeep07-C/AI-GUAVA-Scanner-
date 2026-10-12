package com.guavascanner.model;

public class DatasetEntry {
    private String id;
    private String category; // FRESH, MEDIUM, POOR
    private String fileName;
    private String relativePath;
    private String md5;
    private long size;
    private String diseaseName;
    private String pathogen;
    private String symptoms;

    public DatasetEntry() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getRelativePath() { return relativePath; }
    public void setRelativePath(String relativePath) { this.relativePath = relativePath; }

    public String getMd5() { return md5; }
    public void setMd5(String md5) { this.md5 = md5; }

    public long getSize() { return size; }
    public void setSize(long size) { this.size = size; }

    public String getDiseaseName() { return diseaseName; }
    public void setDiseaseName(String diseaseName) { this.diseaseName = diseaseName; }

    public String getPathogen() { return pathogen; }
    public void setPathogen(String pathogen) { this.pathogen = pathogen; }

    public String getSymptoms() { return symptoms; }
    public void setSymptoms(String symptoms) { this.symptoms = symptoms; }
}
