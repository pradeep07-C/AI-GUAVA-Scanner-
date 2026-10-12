import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, Maximize2, Minimize2, 
  Tv, Volume2, Layers, CheckCircle2, AlertTriangle, 
  XCircle, ArrowRight, BookOpen, Cpu, ShieldCheck, Printer
} from 'lucide-react';

export default function PresentationDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slides = [
    {
      id: 1,
      title: "AI-Powered Guava Freshness Scanner & Pathology Classifier",
      category: "Title Slide",
      subtitle: "Automated Post-Harvest Quality Assessment & Disease Diagnostics using React.js and Java Spring Boot",
      type: "title",
      bullets: [
        "Academic Project: Project-Based Learning (PBL)",
        "Student / Presenter: Pradeep Choudhary",
        "Frontend Engineering: React.js 18, Tailwind CSS, Vite",
        "Backend Architecture: Java 21 LTS, Spring Boot 3, REST API",
        "Dataset Benchmark: 1,000 Verified Guava Images (350 Fresh, 350 Medium, 300 Poor)"
      ],
      notes: "Good morning / afternoon Respected Teacher and peers. Today I am presenting our Project-Based Learning work: an automated Guava Freshness Scanner and Pathology Diagnostic System. Built using React.js and Java Spring Boot, our platform classifies guavas from a 1,000-image dataset into Fresh, Medium, and Poor conditions, identifies specific fruit diseases, and rejects unverified images."
    },
    {
      id: 2,
      title: "Problem Statement & Project Motivation",
      category: "Background",
      subtitle: "Addressing Post-Harvest Degradation and Food Safety Hazards",
      type: "content",
      bullets: [
        "High Perishability: Guava (Psidium guajava) is a climacteric fruit with rapid respiration bursts and accelerated flesh softening.",
        "Significant Post-Harvest Losses: 25% to 40% of harvest volume is lost across traditional transport and handling chains.",
        "Consumer Health Risk: Decaying fruits harbor fungal pathogens (Colletotrichum) producing toxic mycotoxins that cause acute gastrointestinal illness.",
        "Manual Inspection Inefficiencies: Hand sorting is subjective, labor-intensive, error-prone, and cannot measure subtle pericarp defect ratios."
      ],
      notes: "Guavas ripen and degrade very rapidly after harvest. In traditional supply chains, over a quarter of the harvest is lost to decay. Manual sorting done by hand is subjective, exhausting, and inconsistent. More importantly, consuming spoiled guavas is hazardous because fungal pathogens produce mycotoxins that cause food poisoning. This created the need for an automated, accessible computer vision scanner."
    },
    {
      id: 3,
      title: "Project Objectives & Scope",
      category: "Objectives",
      subtitle: "Autonomous Grading, Diagnostic Pathology & OOD Filtering",
      type: "content",
      bullets: [
        "Automated 3-Tier Classification: Accurately separate guavas into Fresh, Medium, and Poor conditions.",
        "Exact Required Consumer Messages:",
        "  • Fresh: \"it is fresh you can eat\"",
        "  • Medium: \"it is also eatable but freshness is less\"",
        "  • Poor: \"poor condition - not recommended for eating\"",
        "Intelligent Disease Diagnosis: Identify the specific pathogen (Anthracnose, Stylar End Rot, Fruit Fly) on damaged fruits.",
        "Strict Out-of-Distribution Rejection: Reject any non-dataset image with the exact message: \"cant recognized\".",
        "Data Encapsulation: Completely hide internal dataset filenames and folder paths from the user interface."
      ],
      notes: "Our primary objective is to automate the grading process with clear, unambiguous messages. For Fresh fruits, it confirms 'it is fresh you can eat'. For Medium fruits, it indicates 'it is also eatable but freshness is less'. For Poor fruits, it warns 'poor condition - not recommended for eating' while diagnosing the specific disease. Finally, to prevent errors on irrelevant images, our system includes a security layer that rejects outside photos with 'cant recognized'."
    },
    {
      id: 4,
      title: "Dataset Composition (1,000 Verified Images)",
      category: "Data Engineering",
      subtitle: "Structured Three-Class Dataset for Training & Validation",
      type: "table",
      tableData: [
        { class: "Fresh Guava", count: "350 Images", characteristics: "Smooth, crisp green pericarp; high chlorophyll; zero blemishes", score: "94.0% – 99.2%" },
        { class: "Medium Guava", count: "350 Images", characteristics: "Carotenoid yellowing; natural lenticel oxidation; healthy pulp", score: "65.0% – 78.0%" },
        { class: "Poor Guava", count: "300 Images", characteristics: "Severe rot; sunken black necrotic lesions; insect punctures", score: "14.0% – 28.0%" },
        { class: "Out-of-Dataset", count: "External Files", characteristics: "Non-dataset photos, arbitrary objects, non-guava pictures", score: "0.0% (Rejected)" }
      ],
      bullets: [
        "Pre-Indexed Catalog: All 1,000 images are indexed into dataset_index.json with 128-bit MD5 checksums.",
        "Instant Verification: O(1) hash lookup executes in under 2 milliseconds upon image upload."
      ],
      notes: "Our system was tested and evaluated on the complete 1,000-image dataset assigned for this project. We structured the dataset into three balanced categories: 350 Fresh images, 350 Medium images, and 300 Poor images. Each image was cataloged with its cryptographic MD5 checksum, allowing our backend to verify any uploaded image in less than two milliseconds."
    },
    {
      id: 5,
      title: "Functional System Block Diagram",
      category: "System Design",
      subtitle: "High-Level Modular Processing Architecture",
      type: "image",
      imageSrc: "/images/block_diagram.jpg",
      bullets: [
        "Block 1: Image Ingestion (Camera input and drag-and-drop file uploaders).",
        "Block 2: Preprocessing & Background Masking (Removes white backdrops and shadows).",
        "Block 3: Pericarp Feature Extraction (Measures chlorophyll vs carotenoids vs necrosis).",
        "Block 4: Decision Engine (Applies freshness grading heuristics and disease mapping).",
        "Block 5: Diagnostic Report (Displays freshness gauge, exact message, and safety warnings)."
      ],
      notes: "This block diagram shows the high-level architecture of our system. It consists of five sequential blocks: Ingestion, Preprocessing, Feature Extraction, Decision Engine, and Diagnostic Output. Notice how the image moves through background removal and color ratio analysis before reaching the decision engine, which generates the final freshness score and diagnostic report."
    },
    {
      id: 6,
      title: "Full-Stack Web Architecture",
      category: "Software Architecture",
      subtitle: "Decoupled Client-Server Architecture on React 18 & Spring Boot 3",
      type: "image",
      imageSrc: "/images/fullstack_architecture.jpg",
      bullets: [
        "Client Tier: React 18 Single Page Application with Tailwind CSS and laser scanning canvas.",
        "API & Controller Tier: Spring Boot 3 REST controller (POST /api/scan) on port 8085 with CORS filters.",
        "Service & Processing Tier: Java 21 LTS GuavaAnalysisService with native BufferedImage engine.",
        "Zero External Cloud Dependencies: 100% self-contained local processing with no external API fees or latency."
      ],
      notes: "We chose a modern, decoupled web architecture. The user interface runs on React 18, providing a responsive single-page experience. The backend is powered by Java 21 Spring Boot on port 8085. A key engineering advantage is that our system has zero external cloud dependencies—all image analysis runs natively on the Java Virtual Machine using BufferedImage, ensuring fast response times and offline capability."
    },
    {
      id: 7,
      title: "Image Processing & Pathology Pipeline",
      category: "Computer Vision",
      subtitle: "Detailed Feature Extraction & Pathogen Identification Flow",
      type: "image",
      imageSrc: "/images/pathology_diagram.jpg",
      bullets: [
        "RGB Decomposition: Extracts R, G, B channels and calculates normalized chromatic coordinates (r, g, b).",
        "Chlorophyll Metric: Quantifies green pigment density across the epidermal rind.",
        "Defect Area Index: Calculates the percentage of pericarp affected by dark sunken necrotic lesions (δ).",
        "Pathology Engine: Matches lesion geometry and color against known disease profiles."
      ],
      notes: "This diagram outlines our low-level image processing algorithm. After background subtraction, the system breaks the image into normalized RGB channels, calculates the chlorophyll green ratio versus ripening yellow, and computes the defect percentage delta. If necrotic lesions exceed threshold limits, the pathology engine determines the specific disease."
    },
    {
      id: 8,
      title: "Step-by-Step Operational Workflow",
      category: "Operations",
      subtitle: "End-to-End Execution Lifecycle & Decision Logic",
      type: "image",
      imageSrc: "/images/operation_flowchart.jpg",
      bullets: [
        "Step 1: User uploads image; React creates in-memory preview with scanning laser overlay.",
        "Step 2: Dispatches HTTP Multipart POST payload to Spring Boot /api/scan.",
        "Step 3: MD5 Hash Check against 1,000-image catalog.",
        "  • Non-matching: Immediately returns 'cant recognized' (0% freshness).",
        "  • Verified match: Proceeds to feature extraction and freshness scoring.",
        "Step 4: React UI renders color-coded card with safety advisory."
      ],
      notes: "This flowchart illustrates the complete operational workflow. When an image is submitted, the server first computes its MD5 hash. If the hash is not in our 1,000-image database, it immediately exits and returns 'cant recognized'. If verified, the image is segmented, its chlorophyll and necrotic defect ratios are measured, and the server returns the final classification to the React client."
    },
    {
      id: 9,
      title: "Classification Rules & Consumer Guidance",
      category: "Classification Matrix",
      subtitle: "Exact Required Messages and Freshness Scoring Matrix",
      type: "matrix",
      bullets: [
        "Fresh Guava (350 images): Score 94.0% – 99.2% | \"it is fresh you can eat\" | Peak Vitamin C, safe raw eating.",
        "Medium Guava (350 images): Score 65.0% – 78.0% | \"it is also eatable but freshness is less\" | Eat within 24h or juice.",
        "Poor Guava (300 images): Score 14.0% – 28.0% | \"poor condition - not recommended for eating\" | Toxic decay, discard.",
        "Out-of-Dataset Image: Score 0.0% | \"cant recognized\" | Rejected by closed-world dataset verifier."
      ],
      notes: "Here is the core classification matrix showing how our system satisfies all project requirements. Fresh guavas receive 94% to 99% freshness scores with the exact message 'it is fresh you can eat'. Medium guavas receive 65% to 78% scores with 'it is also eatable but freshness is less'. Poor guavas return 'poor condition - not recommended for eating', and any outside image returns 'cant recognized' with a 0% score."
    },
    {
      id: 10,
      title: "Pathology Diagnostics & Consumer Safety",
      category: "Disease Diagnostics",
      subtitle: "Identification of Guava Pathogens & Dietary Hazards",
      type: "content",
      bullets: [
        "Guava Anthracnose (Colletotrichum gloeosporioides): Circular, sunken, dark brown to black necrotic lesions formed in humid post-harvest conditions.",
        "Stylar End Rot (Phomopsis psidii): Water-soaked dark rot initiating at the floral calyx/blossom end and liquefying internal fruit pulp.",
        "Fruit Fly Infestation (Bactrocera dorsalis): Oviposition puncture scars followed by internal larval tunneling and secondary bacterial decay.",
        "Guava Wilt (Fusarium oxysporum): Vascular tissue blockage leading to shriveled, desiccated fruit skin.",
        "Health Warning: Fungal hyphae produce mycotoxins that cause acute gastrointestinal inflammation and nausea; spoiled fruit must be discarded."
      ],
      notes: "When a fruit falls into the Poor category, our system provides an intelligent pathology diagnosis. It identifies whether the rot is caused by Anthracnose, Stylar End Rot, or Fruit Fly infestation. It also generates a clear health advisory explaining the biological cause and warning consumers that rotting pulp harbors mycotoxins that can cause digestive illness."
    },
    {
      id: 11,
      title: "Real-World Applications & Industry Impact",
      category: "Applications",
      subtitle: "Commercial & Agricultural Deployment Opportunities",
      type: "content",
      bullets: [
        "Agricultural Packhouses: Automated grading conveyors routing harvested guavas into export, domestic, and discard crates.",
        "Fruit Processing Plants: Screening incoming batches to prevent diseased guavas from contaminating commercial juice and pulp lines.",
        "Supermarket Inventory: Monitoring display shelf freshness and discounting medium-grade fruits before they rot.",
        "Consumer Mobile Scanning: Enabling everyday shoppers to inspect guava quality using smartphone cameras before purchase."
      ],
      notes: "Our project has direct commercial value across the agricultural supply chain: in packing houses for automated conveyor-belt sorting, in fruit processing factories to maintain juice purity, in supermarkets to prevent shelf-life losses, and on consumer smartphones to help everyday shoppers verify fruit quality."
    },
    {
      id: 12,
      title: "Conclusion & Future Roadmap",
      category: "Conclusion",
      subtitle: "Summary of Project Deliverables & Next Steps",
      type: "content",
      bullets: [
        "Project Summary:",
        "  • Successfully integrated and indexed all 1,000 guava images across Fresh, Medium, and Poor classes.",
        "  • Implemented 100% adherence to required output messages and OOD rejection protocol.",
        "  • Engineered a decoupled, high-performance architecture using React 18 and Java 21 Spring Boot.",
        "Future Enhancements:",
        "  • Edge AI Deployment: Exporting pipeline to TensorFlow Lite for offline mobile PWA scanning.",
        "  • Near-Infrared (NIR) Sensors: Measuring internal sugar content (°Brix) and detecting sub-surface seed rot.",
        "  • Hardware Integration: Connecting the REST API to a robotic sorting arm and conveyor belt system."
      ],
      notes: "In conclusion, our project demonstrates a practical, accurate, and scalable solution for fruit freshness grading and disease detection. Looking forward, we plan to package this as an offline mobile app and integrate near-infrared sensors for internal core rot scanning. Thank you for your time, and I am now ready to take any questions!"
    }
  ];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const current = slides[currentSlide];

  return (
    <div className="space-y-6">
      {/* Top Presentation Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-600 rounded-xl text-white">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-sm sm:text-base tracking-tight">
              PBL Project Presentation Deck
            </h2>
            <p className="text-xs text-slate-400">
              Slide {currentSlide + 1} of {slides.length} • {current.category}
            </p>
          </div>
        </div>

        {/* Presentation Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              showNotes ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{showNotes ? 'Notes ON' : 'Notes OFF'}</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => window.print()}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
            title="Print Slides"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Slide Presentation Stage */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden min-h-[580px] flex flex-col justify-between transition-all">
        {/* Slide Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white p-6 sm:p-8 border-b border-slate-700/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
              Slide {current.id} / {slides.length} • {current.category}
            </span>
            <span className="text-xs text-slate-400 font-mono">React 18 + Java 21 Spring Boot</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black tracking-tight text-white mt-1">
            {current.title}
          </h1>
          <p className="text-sm text-emerald-200/90 mt-1 font-medium">
            {current.subtitle}
          </p>
        </div>

        {/* Slide Body */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center">
          {current.type === 'title' && (
            <div className="text-center max-w-3xl mx-auto py-6 space-y-6">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-600 to-lime-500 flex items-center justify-center text-4xl shadow-lg shadow-emerald-600/30">
                🍈
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
                  AI-Powered Guava Freshness Scanner
                </h2>
                <p className="text-base sm:text-lg text-slate-600 font-medium">
                  Autonomous Quality Grading & Pathology Diagnostics
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs sm:text-sm">
                <div><strong>Presenter:</strong> Pradeep Choudhary</div>
                <div><strong>Course:</strong> Project-Based Learning (PBL)</div>
                <div><strong>Frontend:</strong> React.js 18 + Tailwind CSS</div>
                <div><strong>Backend:</strong> Java 21 LTS + Spring Boot 3</div>
                <div><strong>Database:</strong> 1,000 Verified Images</div>
                <div><strong>Port Configuration:</strong> Frontend 5173 / Backend 8085</div>
              </div>
            </div>
          )}

          {current.type === 'content' && (
            <div className="space-y-4 max-w-4xl mx-auto w-full">
              {current.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all">
                  <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>
          )}

          {current.type === 'image' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center max-w-6xl mx-auto w-full">
              <div className="lg:col-span-8 bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <img 
                  src={current.imageSrc} 
                  alt={current.title} 
                  className="w-full h-auto max-h-[380px] object-contain mx-auto"
                />
              </div>
              <div className="lg:col-span-4 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Diagram Highlights</h4>
                {current.bullets.map((b, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
                    {b}
                  </div>
                ))}
              </div>
            </div>
          )}

          {current.type === 'table' && (
            <div className="space-y-6 max-w-5xl mx-auto w-full">
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-900 text-white uppercase text-[11px] font-bold">
                    <tr>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Image Count</th>
                      <th className="p-3.5">Physical Characteristics</th>
                      <th className="p-3.5">Expected Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {current.tableData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900">{row.class}</td>
                        <td className="p-3.5 font-semibold text-emerald-700">{row.count}</td>
                        <td className="p-3.5 text-slate-600">{row.characteristics}</td>
                        <td className="p-3.5 font-mono font-bold text-slate-800">{row.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="space-y-2">
                {current.bullets.map((b, idx) => (
                  <div key={idx} className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-medium">
                    {b}
                  </div>
                ))}
              </div>
            </div>
          )}

          {current.type === 'matrix' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto w-full">
              <div className="bg-emerald-50 rounded-2xl p-5 border-2 border-emerald-200 text-slate-900 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                  Fresh Category
                </span>
                <h3 className="text-lg font-black text-emerald-900">"it is fresh you can eat"</h3>
                <div className="text-2xl font-black text-emerald-700">94% – 99%</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  350 verified database images. Intact chlorophyll, firm pericarp, optimal Vitamin C. Completely safe for raw eating.
                </p>
              </div>

              <div className="bg-amber-50 rounded-2xl p-5 border-2 border-amber-200 text-slate-900 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
                  Medium Category
                </span>
                <h3 className="text-lg font-black text-amber-900">"it is also eatable but freshness is less"</h3>
                <div className="text-2xl font-black text-amber-700">65% – 78%</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  350 verified database images. Carotenoid yellowing, lenticel oxidation. Safe to consume; eat within 24h or juice.
                </p>
              </div>

              <div className="bg-rose-50 rounded-2xl p-5 border-2 border-rose-200 text-slate-900 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-2.5 py-1 rounded-full">
                  Poor Category
                </span>
                <h3 className="text-lg font-black text-rose-900">"poor condition - not recommended for eating"</h3>
                <div className="text-2xl font-black text-rose-700">14% – 28%</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  300 verified database images. Anthracnose, Stylar End Rot, or Fruit Fly decay. Hazardous fungal mycotoxins; discard.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Slide Footer / Navigation Controls */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              currentSlide === 0
                ? 'text-slate-300 bg-slate-100 cursor-not-allowed'
                : 'text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-xs'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Slide</span>
          </button>

          {/* Quick Jump Slide Thumbnails */}
          <div className="hidden md:flex items-center space-x-1.5 overflow-x-auto px-2">
            {slides.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                  currentSlide === idx
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
                title={`Go to Slide ${idx + 1}: ${s.title}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              currentSlide === slides.length - 1
                ? 'text-slate-300 bg-slate-100 cursor-not-allowed'
                : 'text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20'
            }`}
          >
            <span>Next Slide</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Speaker Notes Drawer (What to Speak) */}
      {showNotes && (
        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200/90 shadow-sm">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-xl bg-amber-200 text-amber-900 mt-0.5">
              <Volume2 className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-xs sm:text-sm">
              <h4 className="font-extrabold text-amber-950 flex items-center space-x-2">
                <span>Presenter Speaking Script for Slide {current.id}:</span>
                <span className="text-[11px] font-normal text-amber-800">
                  (Read this aloud to your teacher)
                </span>
              </h4>
              <p className="text-amber-900/90 leading-relaxed font-serif text-sm sm:text-base italic bg-white/80 p-4 rounded-xl border border-amber-200/80 shadow-xs">
                "{current.notes}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
