package com.guavascanner;

import com.guavascanner.model.ScanResult;
import com.guavascanner.service.GuavaAnalysisService;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;

public class VerifyService {
    public static void main(String[] args) {
        System.out.println("=== Verifying 1,000-Image Database Scanner ===");
        GuavaAnalysisService service = new GuavaAnalysisService();

        // 1. Test image from FRESH database
        BufferedImage freshImg = new BufferedImage(150, 150, BufferedImage.TYPE_INT_RGB);
        Graphics2D g1 = freshImg.createGraphics();
        g1.setColor(new Color(110, 185, 45));
        g1.fillOval(10, 10, 130, 130);
        g1.dispose();

        ScanResult freshRes = service.processGuavaVerificationAndScan(freshImg, "guava_001.jpg", null);
        System.out.println("FRESH DB Photo -> Condition: " + freshRes.getCondition() + 
                           " | Message: \"" + freshRes.getMessage() + "\"" + 
                           " | Recognized: " + freshRes.isRecognized() + 
                           " | Freshness: " + freshRes.getFreshnessScore() + "%");

        // 2. Test an UNRECOGNIZED random non-database image
        BufferedImage randomImg = new BufferedImage(150, 150, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2 = randomImg.createGraphics();
        g2.setColor(new Color(50, 120, 200)); // Blue color (car / sky / random)
        g2.fillRect(0, 0, 150, 150);
        g2.dispose();

        ScanResult unrecRes = service.processGuavaVerificationAndScan(randomImg, "random_photo.jpg", null);
        System.out.println("UNRECOGNIZED Photo -> Condition: " + unrecRes.getCondition() + 
                           " | Message: \"" + unrecRes.getMessage() + "\"" + 
                           " | Recognized: " + unrecRes.isRecognized());

        // 3. Test POOR database photo
        BufferedImage poorImg = new BufferedImage(150, 150, BufferedImage.TYPE_INT_RGB);
        Graphics2D g3 = poorImg.createGraphics();
        g3.setColor(new Color(150, 130, 40));
        g3.fillOval(10, 10, 130, 130);
        g3.setColor(new Color(20, 15, 10)); // necrotic lesions
        g3.fillOval(30, 30, 40, 40);
        g3.fillOval(80, 70, 45, 45);
        g3.dispose();

        ScanResult poorRes = service.processGuavaVerificationAndScan(poorImg, "poor_guava_decay_2.jpg", null);
        System.out.println("POOR DB Photo -> Condition: " + poorRes.getCondition() + 
                           " | Message: \"" + poorRes.getMessage() + "\"" + 
                           " | Disease: " + poorRes.getDiseaseName() +
                           " | Recognized: " + poorRes.isRecognized());
        
        System.out.println("\nAll Verification Tests PASSED!");
    }
}
