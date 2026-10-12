package com.guavascanner;

import com.guavascanner.model.ScanResult;
import com.guavascanner.service.GuavaAnalysisService;
import org.junit.jupiter.api.Test;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;

import static org.junit.jupiter.api.Assertions.*;

public class GuavaAnalysisServiceTest {

    private final GuavaAnalysisService service = new GuavaAnalysisService();

    @Test
    void testFreshGuavaAnalysis() {
        // Create an artificial vibrant green/yellow healthy guava image
        BufferedImage img = new BufferedImage(200, 200, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = img.createGraphics();
        g.setColor(new Color(110, 185, 45)); // Fresh guava green
        g.fillOval(20, 20, 160, 160);
        g.dispose();

        ScanResult result = service.processImageFeatures(img, "test_fresh.png");
        assertNotNull(result);
        assertEquals("FRESH", result.getCondition());
        assertEquals("it is fresh you can eat", result.getMessage());
        assertTrue(result.getFreshnessScore() >= 85.0);
    }

    @Test
    void testPoorGuavaWithAnthracnoseAnalysis() {
        // Create a guava image with heavy dark necrotic lesions (Anthracnose)
        BufferedImage img = new BufferedImage(200, 200, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = img.createGraphics();
        g.setColor(new Color(170, 150, 60)); // dull yellowish base
        g.fillOval(20, 20, 160, 160);

        // Draw multiple large dark rotten lesions
        g.setColor(new Color(25, 20, 15));
        g.fillOval(40, 50, 45, 45);
        g.fillOval(100, 90, 55, 55);
        g.fillOval(60, 120, 40, 40);
        g.dispose();

        ScanResult result = service.processImageFeatures(img, "test_poor.png");
        assertNotNull(result);
        assertEquals("POOR", result.getCondition());
        assertEquals("poor condition - not recommended for eating", result.getMessage());
        assertNotNull(result.getDiseaseName());
        assertNotNull(result.getDiseaseReason());
        assertTrue(result.getFreshnessScore() <= 45.0);
    }

    @Test
    void testSampleScans() {
        ScanResult fresh = service.getSampleScan("fresh");
        assertEquals("FRESH", fresh.getCondition());
        assertEquals("it is fresh you can eat", fresh.getMessage());

        ScanResult medium = service.getSampleScan("medium");
        assertEquals("MEDIUM", medium.getCondition());
        assertEquals("it is also eatable but freshness is less", medium.getMessage());

        ScanResult poor = service.getSampleScan("poor");
        assertEquals("POOR", poor.getCondition());
        assertEquals("poor condition - not recommended for eating", poor.getMessage());
        assertNotNull(poor.getDiseaseName());
    }
}
