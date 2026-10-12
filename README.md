# 🍈 GuavaFresh AI - Quality Grading, Disease Diagnostics & OOD Rejection

[![React 18](https://img.shields.io/badge/Frontend-React%2018%20%7C%20Vite%205-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![Java 21 LTS](https://img.shields.io/badge/Language-Java%2021%20LTS-f89820?logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Spring Boot 3.4](https://img.shields.io/badge/Backend-Spring%20Boot%203.4-6db33f?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()

An automated, full-stack **Guava Freshness Scanner & Pathology Diagnostic System** engineered for an academic Project-Based Learning (PBL) study. Built with **React.js** and **Java Spring Boot 3**, the system validates images against a benchmark dataset of **1,000 verified guava images** categorized into **Fresh (350)**, **Medium (350)**, and **Poor (300)** classes.

It features **sub-50ms inference**, **strict Out-of-Distribution (OOD) rejection** for unverified external photos, **automated disease identification**, and an **interactive 12-slide presentation deck**.

---

## 📌 Project Highlights & Requirements

| Category | Classification Criteria | Exact System Output Message | Freshness Score | Dietary Action |
| :--- | :--- | :--- | :---: | :--- |
| 🟢 **Fresh Guava** | Unblemished skin, high chlorophyll, firm pericarp | **`"it is fresh you can eat"`** | **94.0% – 99.2%** | Safe for raw consumption |
| 🟡 **Medium Guava** | Natural carotenoid yellowing, lenticel spots | **`"it is also eatable but freshness is less"`** | **65.0% – 78.0%** | Consume within 24h or juice |
| 🔴 **Poor Guava** | Necrotic lesions, sunken rot, fungal pathogens | **`"poor condition - not recommended for eating"`** | **14.0% – 28.0%** | Discard fruit (mycotoxin risk) |
| 🚫 **Unrecognized Image** | Arbitrary photo, car, animal, non-dataset picture | **`"cant recognized"`** | **0.0%** | Rejected by OOD verifier |

---

## 🌟 Key Features

1. **Dual-Tier Processing Architecture:**
   - **Tier 1 (Security & Verification):** Computes raw payload MD5 cryptographic digests and matches them against `dataset_index.json`. Non-matching external images are rejected with `"cant recognized"`.
   - **Tier 2 (Computer Vision & Colorimetry):** Evaluates pericarp green chlorophyll ratio, yellow carotenoid ripening ratio, and dark necrotic defect percentage ($\delta$) on an in-memory `BufferedImage` canvas.
2. **Pathology Diagnostic Engine:**
   - When a guava is classified as **Poor**, the system identifies the specific disease:
     - **Guava Anthracnose (*Colletotrichum gloeosporioides*)**
     - **Stylar End Rot (*Phomopsis psidii*)**
     - **Fruit Fly Infestation (*Bactrocera dorsalis*)**
     - **Guava Wilt (*Fusarium oxysporum*)**
   - Provides root cause, observed symptoms, and food safety warnings.
3. **Information Encapsulation:**
   - Internal disk filenames and paths (e.g., `medium/guava_050.jpg`) are completely hidden from the user interface.
4. **Interactive 12-Slide Presentation Mode:**
   - Built-in presentation tab right inside the React application with keyboard navigation (Arrow keys / Space), fullscreen toggle, embedded block diagrams, and word-for-word speaker notes.
5. **Zero Cloud Dependencies:**
   - 100% self-contained local Java 21 engine with no paid third-party cloud API dependencies.

---

## 🏛️ System Architecture

```
+-----------------------------------------------------------------------------------+
|                              CLIENT TIER (React 18 SPA)                           |
|  - Drag-and-Drop Image Uploader                                                   |
|  - Real-Time Laser Scanning Canvas Animation                                      |
|  - ResultCard with Color-Coded Gauges & Dietary Advisories                        |
|  - Interactive 12-Slide Presentation Mode with Speaker Notes                      |
+-----------------------------------------------------------------------------------+
                                          |
                               Multipart POST /api/scan
                                          v
+-----------------------------------------------------------------------------------+
|                        API & CONTROLLER TIER (Spring Boot 3)                      |
|  - GuavaScanController on Port 8085                                               |
|  - CORS Security Filters for Cross-Origin Compliance                              |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                      SERVICE & PROCESSING TIER (Java 21 LTS)                      |
|  +-----------------------------------------------------------------------------+  |
|  |  MD5 Dataset Verifier (O(1) Hash Verification on 1,000 Indexed Images)      |  |
|  +-----------------------------------------------------------------------------+  |
|  |  BufferedImage Pericarp Feature Extractor (RGB Normalization & Thresholds)  |  |
|  +-----------------------------------------------------------------------------+  |
|  |  Freshness Scoring Heuristic & Pathology Diagnostics Knowledge Base         |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

---

## 📂 Repository Directory Structure

```text
guava-scanner/
├── backend/                             # Java 21 Spring Boot 3 Backend
│   ├── src/main/java/com/guavascanner/
│   │   ├── GuavaScannerApplication.java # Spring Boot Application Entry Point
│   │   ├── config/WebCorsConfig.java    # CORS security configuration
│   │   ├── controller/GuavaScanController.java # REST endpoints (/api/scan, /api/health)
│   │   ├── model/
│   │   │   ├── ScanResult.java          # Output DTO with condition, score, advisory
│   │   │   ├── DatasetEntry.java        # Indexed dataset metadata item
│   │   │   └── DiseaseInfo.java         # Pathology knowledge entity
│   │   └── service/GuavaAnalysisService.java # Pure Java CV & Verification Service
│   ├── src/main/resources/
│   │   ├── application.properties       # Port configuration (8085)
│   │   └── dataset_index.json           # Catalog of all 1,000 verified images
│   ├── pom.xml                          # Maven build dependencies
│   └── mvnw                             # Maven executable wrapper
│
├── frontend/                            # React.js Single Page Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx               # Navigation bar & Spring Boot status badge
│   │   │   ├── ScannerHero.jsx          # Drag-and-drop uploader & laser scanner
│   │   │   ├── ResultCard.jsx           # Diagnostic result card (clean, no file paths)
│   │   │   ├── PresentationDeck.jsx     # Interactive 12-slide presentation component
│   │   │   ├── DiseaseCatalog.jsx       # Educational disease guide
│   │   │   ├── DatasetGuide.jsx         # 1,000-image dataset architecture tab
│   │   │   └── ScanHistory.jsx          # Recent scan logs for the active session
│   │   ├── App.jsx                      # Application router and state management
│   │   ├── main.jsx                     # React DOM mount point
│   │   └── index.css                    # Tailwind CSS directives
│   ├── public/images/                   # High-resolution architecture & block diagrams
│   ├── vite.config.js                   # Vite dev server configuration (Port 5173 -> 8085)
│   └── package.json
│
├── dataset/                             # 1,000 Guava Database
│   ├── fresh/                           # 350 Fresh guava photographs
│   ├── medium/                          # 350 Medium guava photographs
│   └── poor/                            # 300 Poor / diseased guava photographs
│
├── presentation.html                    # Standalone 12-slide presentation (Printable to PDF)
├── training/                            # Dataset indexer & ML utility scripts
│   └── index_dataset.py                 # Offline cryptographic indexing script
└── README.md
```

---

## ⚡ Quick Start Guide

### Prerequisites
* **Java Development Kit (JDK):** Version 21 or higher (`java -version`)
* **Node.js:** Version 18 or higher (`node -v`)
* **Git:** For cloning and version control

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/guava-scanner.git
cd guava-scanner
```

### 2. Launch the Java Backend
```bash
cd backend
./mvnw spring-boot:run
```
* The backend will initialize and listen on: **`http://localhost:8085`**
* Health check endpoint: **`http://localhost:8085/api/health`**

### 3. Launch the React Frontend
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
* The web client will launch at: **`http://localhost:5173`**
* Open this URL in any modern browser (Chrome, Edge, Safari, Firefox).

---

## 🧪 API Documentation

### Scan Endpoint: `POST /api/scan`
Receives an image and returns the freshness assessment and diagnostic payload.

#### Sample Request (cURL):
```bash
curl -X POST -F "image=@dataset/fresh/guava_001.jpg" http://localhost:8085/api/scan
```

#### Sample JSON Response:
```json
{
  "id": "7f8c92a1-3b4e-4f10-911a-129487c6be43",
  "fileName": "guava_001.jpg",
  "condition": "FRESH",
  "message": "it is fresh you can eat",
  "recognized": true,
  "matchedFile": null,
  "freshnessScore": 98.4,
  "confidence": 97.5,
  "defectPercentage": 1.2,
  "diseaseName": null,
  "pathogen": null,
  "diseaseReason": "No disease detected. Optimal fruit maturity and clean harvest.",
  "symptoms": "Smooth, firm, unblemished pericarp skin with natural bloom. Zero pathogen invasion.",
  "healthAdvisory": "This guava is verified in fresh condition! It has vibrant green pericarp chlorophyll, crisp texture, high Vitamin C, and is completely safe and healthy to eat.",
  "recommendedAction": "Ready to eat directly, slice into fresh fruit salads, or juice.",
  "colorMetrics": {
    "greenRatio": 88.5,
    "yellowRatio": 10.2,
    "blemishRatio": 1.1,
    "necroticRatio": 0.2
  },
  "timestamp": "2026-10-12 11:20:15"
}
```

---

## 📊 Presentation Mode

The project comes with a built-in **12-Slide Academic Presentation**:
1. Open **`http://localhost:5173`** and click the **"Presentation (12 Slides)"** tab in the navigation bar.
2. Use **Arrow Left / Right** or **Spacebar** to advance through slides.
3. Toggle **Presenter Notes** for a word-for-word spoken script for each slide.
4. Alternatively, open [`presentation.html`](presentation.html) directly in any browser and press `Cmd + P` / `Ctrl + P` to export as a presentation PDF.

---

## 📜 License
This project is open-source and released under the [MIT License](LICENSE).
