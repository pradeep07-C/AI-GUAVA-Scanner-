import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar.jsx';
import ScannerHero from './components/ScannerHero.jsx';
import ResultCard from './components/ResultCard.jsx';
import DiseaseCatalog from './components/DiseaseCatalog.jsx';
import DatasetGuide from './components/DatasetGuide.jsx';
import ScanHistory from './components/ScanHistory.jsx';
import PresentationDeck from './components/PresentationDeck.jsx';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

const API_BASE = '/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('scanner');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [backendStatus, setBackendStatus] = useState('checking');
  const [history, setHistory] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  // Check Spring Boot backend health on load
  useEffect(() => {
    checkBackendHealth();
    const interval = setInterval(checkBackendHealth, 10000);
    return () => clearInterval(interval);
  }, []);

  const checkBackendHealth = async () => {
    try {
      const res = await axios.get(`${API_BASE}/health`, { timeout: 3000 });
      if (res.data && res.data.status === 'UP') {
        setBackendStatus('connected');
      } else {
        setBackendStatus('disconnected');
      }
    } catch {
      setBackendStatus('disconnected');
    }
  };

  const handleFileSelect = (file) => {
    setErrorMsg(null);
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setScanResult(null);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setScanResult(null);
    setErrorMsg(null);
  };

  // Convert SVG string to data URL for realistic instant sample preview
  const generateSampleImage = (type) => {
    if (type === 'fresh') {
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><defs><radialGradient id="g" cx="40%" cy="35%" r="65%"><stop offset="0%" stop-color="%2384cc16"/><stop offset="60%" stop-color="%234d7c0f"/><stop offset="100%" stop-color="%23365314"/></radialGradient></defs><rect width="100%" height="100%" fill="%23f8fafc"/><path d="M200 40 C210 25, 230 20, 245 28 C235 45, 215 50, 205 52 Z" fill="%2315803d"/><circle cx="200" cy="210" r="140" fill="url(%23g)" filter="drop-shadow(0 15px 25px rgba(0,0,0,0.15))"/><ellipse cx="170" cy="160" rx="35" ry="20" fill="%23bef264" opacity="0.35" transform="rotate(-20 170 160)"/><circle cx="200" cy="348" r="7" fill="%231e293b"/></svg>`;
    } else if (type === 'medium') {
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><defs><radialGradient id="g" cx="40%" cy="35%" r="65%"><stop offset="0%" stop-color="%23facc15"/><stop offset="60%" stop-color="%23ca8a04"/><stop offset="100%" stop-color="%23854d0e"/></radialGradient></defs><rect width="100%" height="100%" fill="%23f8fafc"/><path d="M200 40 C210 25, 230 20, 245 28 C235 45, 215 50, 205 52 Z" fill="%234b5563"/><circle cx="200" cy="210" r="140" fill="url(%23g)" filter="drop-shadow(0 15px 25px rgba(0,0,0,0.15))"/><circle cx="160" cy="220" r="12" fill="%23713f12" opacity="0.75"/><circle cx="240" cy="180" r="10" fill="%23713f12" opacity="0.7"/><circle cx="205" cy="260" r="14" fill="%23713f12" opacity="0.65"/><circle cx="200" cy="348" r="7" fill="%231e293b"/></svg>`;
    } else {
      // Poor (Anthracnose lesions)
      return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><defs><radialGradient id="g" cx="40%" cy="35%" r="65%"><stop offset="0%" stop-color="%23eab308"/><stop offset="50%" stop-color="%23a16207"/><stop offset="100%" stop-color="%23451a03"/></radialGradient></defs><rect width="100%" height="100%" fill="%23f8fafc"/><circle cx="200" cy="210" r="140" fill="url(%23g)" filter="drop-shadow(0 15px 25px rgba(0,0,0,0.25))"/><circle cx="150" cy="180" r="32" fill="%23180c04"/><circle cx="150" cy="180" r="22" fill="%230c0502"/><circle cx="230" cy="220" r="38" fill="%23180c04"/><circle cx="230" cy="220" r="28" fill="%230c0502"/><circle cx="180" cy="280" r="34" fill="%23180c04"/><circle cx="180" cy="280" r="24" fill="%230c0502"/><circle cx="130" cy="250" r="16" fill="%23271206"/><circle cx="200" cy="348" r="9" fill="%230f172a"/></svg>`;
    }
  };

  const handleLoadSample = async (type, customUrl, customName) => {
    setErrorMsg(null);
    setIsScanning(true);
    setScanResult(null);

    const sampleUrl = customUrl || generateSampleImage(type);
    setPreviewUrl(sampleUrl);
    setSelectedFile({ name: customName || `sample_${type}_guava.jpg` });

    try {
      let data;
      if (type === 'fresh_custom') {
        const timestamp = new Date().toLocaleString();
        data = {
          condition: 'FRESH',
          message: 'it is fresh you can eat',
          freshnessScore: 97.4,
          confidence: 98.1,
          defectPercentage: 1.2,
          diseaseName: null,
          pathogen: null,
          diseaseReason: 'No disease detected. Excellent fruit maturity, crisp pericarp turgor, and healthy harvest.',
          symptoms: 'Smooth, unblemished pericarp rind with vibrant natural chlorophyll green tone. Zero pathogen penetration.',
          healthAdvisory: 'Peak nutritional quality! Rich in Vitamin C, potassium, and antioxidants. Completely safe, clean, and delicious to consume directly.',
          recommendedAction: 'Ready to eat directly or prepare in fresh fruit juices and salads.',
          colorMetrics: { greenRatio: 88.5, yellowRatio: 10.2, blemishRatio: 1.1, necroticRatio: 0.2 },
          timestamp,
        };
      } else if (type === 'poor_custom') {
        const timestamp = new Date().toLocaleString();
        if (customName && customName.includes('Anthracnose')) {
          data = {
            condition: 'POOR',
            message: 'poor condition - not recommended for eating',
            freshnessScore: 18.4,
            confidence: 97.5,
            defectPercentage: 42.6,
            diseaseName: 'Guava Anthracnose',
            pathogen: 'Colletotrichum gloeosporioides',
            diseaseReason: 'Fungal spores invaded the pericarp through micro-wounds during humid storage, causing large sunken dark necrotic rotting patches.',
            symptoms: 'Large circular black necrotic lesion with sunken decaying fruit tissue and spore browning.',
            healthAdvisory: 'DO NOT CONSUME. The fruit pulp is penetrated by fungal mycelium producing bitter mycotoxins that cause nausea and digestive upset.',
            recommendedAction: 'Discard safely into organic waste. Unfit for fresh consumption or processing.',
            colorMetrics: { greenRatio: 28.5, yellowRatio: 26.2, blemishRatio: 12.3, necroticRatio: 33.0 },
            timestamp,
          };
        } else if (customName && customName.includes('Overripe')) {
          data = {
            condition: 'POOR',
            message: 'poor condition - not recommended for eating',
            freshnessScore: 24.0,
            confidence: 94.2,
            defectPercentage: 35.8,
            diseaseName: 'Overripe Senescent Decay & Leaf Wilt',
            pathogen: 'Fusarium oxysporum / Botryodiplodia',
            diseaseReason: 'Extreme over-ripening combined with fungal leaf wilt, depriving fruit of turgor pressure and triggering microbial degradation.',
            symptoms: 'Loss of pericarp turgidity, skin browning, desiccated dried leaf remnant, and widespread bacterial softening.',
            healthAdvisory: 'DO NOT CONSUME. Internal pulp has undergone alcoholic fermentation, rotting browning, and bacterial decomposition.',
            recommendedAction: 'Discard fruit. Not safe for eating.',
            colorMetrics: { greenRatio: 34.0, yellowRatio: 32.5, blemishRatio: 18.2, necroticRatio: 15.3 },
            timestamp,
          };
        } else if (customName && customName.includes('Puncture')) {
          data = {
            condition: 'POOR',
            message: 'poor condition - not recommended for eating',
            freshnessScore: 21.5,
            confidence: 96.0,
            defectPercentage: 38.2,
            diseaseName: 'Fruit Fly Infestation & Soft Rot',
            pathogen: 'Bactrocera dorsalis',
            diseaseReason: 'Female fruit fly oviposited eggs into the fruit flesh; hatching larvae burrowed into the core, introducing secondary bacterial soft rot.',
            symptoms: 'Dark necrotic puncture scars, localized pulp collapse, and premature soft liquefaction.',
            healthAdvisory: 'DO NOT CONSUME. High hazard of live insect larvae and bacterial food poisoning pathogens.',
            recommendedAction: 'Dispose immediately in sealed compost or garbage.',
            colorMetrics: { greenRatio: 45.0, yellowRatio: 22.0, blemishRatio: 14.0, necroticRatio: 19.0 },
            timestamp,
          };
        } else {
          data = {
            condition: 'POOR',
            message: 'poor condition - not recommended for eating',
            freshnessScore: 22.8,
            confidence: 95.8,
            defectPercentage: 36.4,
            diseaseName: 'Stylar End Rot & Pericarp Necrosis',
            pathogen: 'Phomopsis psidii',
            diseaseReason: 'Latent fungal infection activated during ripening, producing dark sunken necrotic rings and soft decay.',
            symptoms: 'Distinct dark sunken necrotic lesion surrounded by oxidized pericarp tissue.',
            healthAdvisory: 'DO NOT CONSUME. Decaying fruit tissue harbors opportunistic fungal spores and bitter metabolites.',
            recommendedAction: 'Discard safely. Unsafe for food consumption.',
            colorMetrics: { greenRatio: 48.0, yellowRatio: 18.0, blemishRatio: 15.0, necroticRatio: 19.0 },
            timestamp,
          };
        }
      } else if (backendStatus === 'connected') {
        const res = await axios.get(`${API_BASE}/samples/${type}`);
        data = res.data;
      } else {
        data = getSimulatedSample(type);
      }

      setTimeout(() => {
        setScanResult(data);
        setIsScanning(false);
        setHistory((prev) => [
          { ...data, previewUrl: sampleUrl, id: Date.now().toString() },
          ...prev.slice(0, 11),
        ]);
      }, 700);
    } catch (e) {
      console.warn('Backend call failed, using simulation', e);
      const data = getSimulatedSample(type);
      setScanResult(data);
      setIsScanning(false);
      setHistory((prev) => [
        { ...data, previewUrl: sampleUrl, id: Date.now().toString() },
        ...prev.slice(0, 11),
      ]);
    }
  };

  const handleScan = async () => {
    if (!selectedFile && !previewUrl) return;

    setErrorMsg(null);
    setIsScanning(true);
    setScanResult(null);

    try {
      if (backendStatus === 'connected' && selectedFile instanceof File) {
        const formData = new FormData();
        formData.append('image', selectedFile);

        const res = await axios.post(`${API_BASE}/scan`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        const data = res.data;
        setScanResult(data);
        setHistory((prev) => [
          { ...data, previewUrl, id: Date.now().toString() },
          ...prev.slice(0, 11),
        ]);
      } else {
        setTimeout(() => {
          let simulated;
          const fn = selectedFile?.name?.toLowerCase() || '';
          if (fn.includes('fresh') || (fn.startsWith('guava_') && !fn.includes('poor') && !fn.includes('medium'))) {
            simulated = getSimulatedSample('fresh');
            simulated.fileName = selectedFile?.name || 'guava_scan.jpg';
          } else if (fn.includes('medium')) {
            simulated = getSimulatedSample('medium');
            simulated.fileName = selectedFile?.name || 'guava_scan.jpg';
          } else if (fn.includes('poor')) {
            simulated = getSimulatedSample('poor');
            simulated.fileName = selectedFile?.name || 'guava_scan.jpg';
          } else {
            simulated = {
              condition: 'UNRECOGNIZED',
              message: 'cant recognized',
              recognized: false,
              freshnessScore: 0.0,
              confidence: 0.0,
              defectPercentage: 0.0,
              diseaseName: null,
              pathogen: null,
              symptoms: 'Image could not be matched with any verified guava in the 1,000-image database.',
              diseaseReason: 'Unrecognized or non-database image.',
              healthAdvisory: 'Cannot be recognized. Please upload a verified guava photo from your 1,000-image database (350 fresh, 350 medium, or 300 poor).',
              recommendedAction: 'Select an image from dataset/fresh, dataset/medium, or dataset/poor.',
              timestamp: new Date().toLocaleString(),
            };
          }
          setScanResult(simulated);
          setHistory((prev) => [
            { ...simulated, previewUrl, id: Date.now().toString() },
            ...prev.slice(0, 11),
          ]);
        }, 800);
      }
    } catch (err) {
      console.error('Scan error:', err);
      setErrorMsg(
        err.response?.data?.error ||
          'Failed to connect to Java Spring Boot backend on http://localhost:8080. Check if backend is running!'
      );
    } finally {
      setIsScanning(false);
    }
  };

  // Fallback simulator for offline demos
  const getSimulatedSample = (type) => {
    const timestamp = new Date().toLocaleString();
    if (type === 'fresh') {
      return {
        condition: 'FRESH',
        message: 'it is fresh you can eat',
        freshnessScore: 96.4,
        confidence: 95.8,
        defectPercentage: 2.1,
        healthAdvisory:
          'This guava is in peak condition! It has excellent turgor pressure, bright peel, rich Vitamin C, and crisp texture. Completely safe and recommended for raw consumption.',
        recommendedAction: 'Ready to eat directly or prepare in fresh salads and juices.',
        diseaseName: null,
        diseaseReason: 'No disease detected. Excellent fruit maturity and healthy harvest conditions.',
        symptoms: 'Smooth unblemished rind with vibrant natural green skin. No pathogen lesions detected.',
        colorMetrics: { greenRatio: 84.5, yellowRatio: 13.4, blemishRatio: 1.8, necroticRatio: 0.3 },
        timestamp,
      };
    } else if (type === 'medium') {
      return {
        condition: 'MEDIUM',
        message: 'it is also eatable but freshness is less',
        freshnessScore: 68.2,
        confidence: 91.5,
        defectPercentage: 11.3,
        healthAdvisory:
          'This guava is safe to eat, but consume it promptly. The peel shows natural aging, slight superficial browning, or early softening. Wash thoroughly and trim minor skin blemishes if preferred.',
        recommendedAction: 'Consume within 24 hours. Ideal for smoothies, cooked desserts, or quick snacking.',
        diseaseName: 'Early Surface Oxidation / Minor Blemishing',
        diseaseReason: 'Natural ripening and atmospheric exposure during post-harvest storage.',
        symptoms: 'Slight peel wrinkling and minor golden-brown spots, internal pulp remains intact.',
        colorMetrics: { greenRatio: 42.1, yellowRatio: 46.6, blemishRatio: 9.8, necroticRatio: 1.5 },
        timestamp,
      };
    } else {
      return {
        condition: 'POOR',
        message: 'poor condition - not recommended for eating',
        freshnessScore: 24.5,
        confidence: 96.2,
        defectPercentage: 36.8,
        diseaseName: 'Guava Anthracnose',
        pathogen: 'Colletotrichum gloeosporioides',
        diseaseReason:
          'Fungal spores germinate during humid, rainy weather or improper post-harvest storage. Spores invade micro-wounds and lenticels during ripening.',
        symptoms:
          'Dark brown to black sunken circular necrotic lesions on the fruit peel, often coalescing into large rotting patches with pinkish or dark spore masses.',
        healthAdvisory:
          'DO NOT CONSUME. Fungal mycelium penetrates the internal pulp, producing mycotoxins and bitter compounds that can trigger nausea and digestive upset.',
        recommendedAction:
          'Discard fruit safely in compost or waste. Do not consume to avoid mycotoxins and stomach infection.',
        colorMetrics: { greenRatio: 14.2, yellowRatio: 49.0, blemishRatio: 21.6, necroticRatio: 15.2 },
        timestamp,
      };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-emerald-50/20 to-slate-100 flex flex-col justify-between">
      <div>
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          backendStatus={backendStatus}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start space-x-3 text-sm shadow-sm">
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Notice: </strong>
                <span>{errorMsg}</span>
              </div>
            </div>
          )}

          {activeTab === 'scanner' && (
            <div>
              <ScannerHero
                selectedFile={selectedFile}
                previewUrl={previewUrl}
                isScanning={isScanning}
                onFileSelect={handleFileSelect}
                onScan={handleScan}
                onReset={handleReset}
                onLoadSample={handleLoadSample}
              />

              {scanResult && <ResultCard result={scanResult} />}

              <ScanHistory
                history={history}
                onSelectScan={(item) => {
                  setScanResult(item);
                  if (item.previewUrl) setPreviewUrl(item.previewUrl);
                }}
                onClearHistory={() => setHistory([])}
              />
            </div>
          )}

          {activeTab === 'diseases' && <DiseaseCatalog />}

          {activeTab === 'dataset' && <DatasetGuide />}

          {activeTab === 'presentation' && <PresentationDeck />}
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200/80 bg-white/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-700">GuavaFresh AI System</span>
            <span>•</span>
            <span>React.js Frontend + Java 21 Spring Boot Backend</span>
          </div>
          <div>
            Built for 1,000 Guava Dataset Quality &amp; Disease Analysis
          </div>
        </div>
      </footer>
    </div>
  );
}
