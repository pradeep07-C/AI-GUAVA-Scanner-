import React from 'react';
import { Sparkles, Server, CheckCircle2, AlertCircle, BookOpen, Database, Scan } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, backendStatus }) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and App Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('scanner')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-lime-500 flex items-center justify-center shadow-md shadow-emerald-500/20 text-white font-bold text-xl">
              🍈
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
                  Guava<span className="text-emerald-600">Fresh</span> AI
                </span>
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  React + Java
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Automated Freshness Grading & Disease Identification
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('scanner')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'scanner'
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Scan className="w-4 h-4 text-emerald-600" />
              <span>Scanner</span>
            </button>

            <button
              onClick={() => setActiveTab('diseases')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'diseases'
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Disease Guide</span>
              <span className="sm:hidden">Diseases</span>
            </button>

            <button
              onClick={() => setActiveTab('dataset')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'dataset'
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Database className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">1000 Images Dataset</span>
              <span className="sm:hidden">Dataset</span>
            </button>

            <button
              onClick={() => setActiveTab('presentation')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'presentation'
                  ? 'bg-emerald-600 text-white shadow-sm font-bold'
                  : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="hidden sm:inline">Presentation (12 Slides)</span>
              <span className="sm:hidden">Slides</span>
            </button>
          </nav>

          {/* Backend Connection Indicator */}
          <div className="flex items-center">
            {backendStatus === 'connected' ? (
              <div className="flex items-center space-x-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs px-2.5 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-semibold hidden sm:inline">Spring Boot:</span>
                <span>Online</span>
              </div>
            ) : backendStatus === 'checking' ? (
              <div className="flex items-center space-x-1.5 bg-slate-100 border border-slate-200 text-slate-600 text-xs px-2.5 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                <span>Connecting...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs px-2.5 py-1 rounded-full" title="Make sure Spring Boot backend is running on port 8080">
                <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                <span className="font-semibold hidden sm:inline">Backend:</span>
                <span>Offline</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
