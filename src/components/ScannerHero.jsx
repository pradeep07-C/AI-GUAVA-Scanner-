import React, { useRef } from 'react';
import { Upload, Sparkles, RefreshCw, Image as ImageIcon, Camera, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export default function ScannerHero({
  selectedFile,
  previewUrl,
  isScanning,
  onFileSelect,
  onScan,
  onReset,
  onLoadSample,
}) {
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
      <div className="text-center max-w-2xl mx-auto mb-6">
        <div className="inline-flex items-center space-x-2 bg-emerald-100/70 border border-emerald-200/60 px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-800 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>Real-time Image Classification &amp; Defect Analysis</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Upload &amp; Scan <span className="text-emerald-600">Guava Condition</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Upload any picture from your 1,000 guava dataset. Our AI model inspects skin chlorophyll, necrotic lesions, and ripening level to determine if it is <strong className="text-emerald-700">Fresh</strong>, <strong className="text-amber-700">Medium</strong>, or <strong className="text-rose-700">Poor</strong>.
        </p>
      </div>

      {/* Main Upload / Preview Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left side / Image viewport */}
        <div className="md:col-span-7">
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => !previewUrl && fileInputRef.current?.click()}
            className={`relative min-h-[320px] sm:min-h-[380px] rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-4 overflow-hidden group ${
              previewUrl
                ? 'border-emerald-300 bg-slate-900 shadow-inner'
                : 'border-slate-300 hover:border-emerald-500 bg-slate-50/70 hover:bg-emerald-50/30 cursor-pointer'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])}
              accept="image/*"
              className="hidden"
            />

            {previewUrl ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={previewUrl}
                  alt="Guava Preview"
                  className="max-h-[350px] w-auto max-w-full rounded-xl object-contain shadow-md"
                />

                {/* Laser Scanning Animation Overlay */}
                {isScanning && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                    {/* Laser line with glowing green bar */}
                    <div className="w-full h-1 bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-400 shadow-[0_0_15px_#10b981] animate-scan-laser absolute top-0 left-0"></div>
                    <div className="absolute inset-0 bg-emerald-500/10 backdrop-blur-[1px] animate-pulse"></div>
                    <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md text-emerald-400 font-mono text-xs px-3 py-1.5 rounded-md flex items-center space-x-2 border border-emerald-500/30 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      <span>ANALYZING PERICARP TISSUE &amp; LESIONS...</span>
                    </div>
                  </div>
                )}

                {/* Remove button */}
                {!isScanning && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onReset();
                    }}
                    className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition-all backdrop-blur-sm"
                    title="Remove image"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <Upload className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-slate-800 text-base mb-1">
                  Drag and drop guava image here
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mb-4">
                  Supports JPG, PNG, WEBP from your guava dataset or device camera.
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-all"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Choose Image File</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right side / Action controls & Sample triggers */}
        <div className="md:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Scanner Action
              </h4>
              <p className="text-xs text-slate-600 mb-4">
                {selectedFile
                  ? `File ready: ${selectedFile.name}`
                  : 'Select an image or use the instant test samples below to simulate guava scan.'}
              </p>

              <button
                onClick={onScan}
                disabled={!previewUrl || isScanning}
                className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-xl font-bold text-sm transition-all shadow-md ${
                  !previewUrl || isScanning
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                    : 'bg-gradient-to-r from-emerald-600 to-lime-600 hover:from-emerald-700 hover:to-lime-700 text-white shadow-emerald-600/30 hover:shadow-lg hover:shadow-emerald-600/40 hover:-translate-y-0.5'
                }`}
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing &amp; Classifying...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Scan Guava Condition</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Demo Samples for Testing */}
            <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                  Quick Demo Test Samples
                </h4>
                <span className="text-[10px] bg-emerald-200 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                  Instant Test
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                Don't have your dataset files right here? Click any demo sample below to test the 3 required categories immediately:
              </p>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => onLoadSample('fresh')}
                  disabled={isScanning}
                  className="flex flex-col items-center text-center p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-200/80 hover:border-emerald-400 transition-all shadow-xs group"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">Fresh</span>
                  <span className="text-[10px] text-slate-500">"You can eat"</span>
                </button>

                <button
                  type="button"
                  onClick={() => onLoadSample('medium')}
                  disabled={isScanning}
                  className="flex flex-col items-center text-center p-2.5 rounded-xl bg-white hover:bg-amber-50 border border-amber-200/80 hover:border-amber-400 transition-all shadow-xs group"
                >
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">Medium</span>
                  <span className="text-[10px] text-slate-500">"Less freshness"</span>
                </button>

                <button
                  type="button"
                  onClick={() => onLoadSample('poor')}
                  disabled={isScanning}
                  className="flex flex-col items-center text-center p-2.5 rounded-xl bg-white hover:bg-rose-50 border border-rose-200/80 hover:border-rose-400 transition-all shadow-xs group"
                >
                  <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">Poor</span>
                  <span className="text-[10px] text-slate-500">Disease diagnosis</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
