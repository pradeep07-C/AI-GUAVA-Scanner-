import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, ShieldCheck, ShieldAlert, Activity, Info, AlertOctagon, HelpCircle, Database, Check } from 'lucide-react';

export default function ResultCard({ result }) {
  if (!result) return null;

  const isUnrecognized = result.condition === 'UNRECOGNIZED' || result.recognized === false;
  const isFresh = result.condition === 'FRESH';
  const isMedium = result.condition === 'MEDIUM';
  const isPoor = result.condition === 'POOR';

  // If UNRECOGNIZED
  if (isUnrecognized) {
    return (
      <div className="mt-8 rounded-3xl p-6 sm:p-8 border-2 border-slate-300 bg-slate-100/80 shadow-xl transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
          <div className="flex items-start sm:items-center space-x-4">
            <div className="p-3 rounded-2xl bg-slate-800 text-amber-400 shadow-md">
              <HelpCircle className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase font-extrabold tracking-wider text-slate-500">
                  Database Verification
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full border bg-slate-200 text-slate-700 border-slate-300">
                  NOT IN DATABASE
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 mt-0.5">
                "{result.message}"
              </h2>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-3 shadow-xs border border-slate-200 text-center sm:min-w-[170px]">
            <span className="text-[11px] font-semibold text-slate-400 block">Database Status</span>
            <span className="text-sm font-bold text-rose-600 block mt-0.5">Unrecognized</span>
            <span className="text-[10px] text-slate-400">Match score: 0%</span>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800 mt-0.5">
              <Info className="w-5 h-5" />
            </div>
            <div className="space-y-2 text-xs sm:text-sm">
              <h4 className="font-bold text-slate-900">
                Why could this image not be recognized?
              </h4>
              <p className="text-slate-600 leading-relaxed">
                The scanner is strictly trained to verify against your teacher's <strong>1,000-image guava database</strong> (350 Fresh, 350 Medium, 300 Poor). Any photo uploaded that is outside this verified collection is rejected as unverified.
              </p>
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 text-xs text-slate-700 flex items-center space-x-2">
                <Database className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  <strong>Tip:</strong> Please choose any photo from <code>dataset/fresh/</code>, <code>dataset/medium/</code>, or <code>dataset/poor/</code> to receive an accurate freshness and disease report.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Badge and theme colors based on classification
  const theme = isFresh
    ? {
        border: 'border-emerald-200',
        bg: 'bg-emerald-50/40',
        badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        icon: <CheckCircle2 className="w-8 h-8 text-emerald-600" />,
        barColor: 'bg-emerald-500',
        textColor: 'text-emerald-700',
        title: 'Fresh Guava',
      }
    : isMedium
    ? {
        border: 'border-amber-200',
        bg: 'bg-amber-50/40',
        badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
        icon: <AlertTriangle className="w-8 h-8 text-amber-600" />,
        barColor: 'bg-amber-500',
        textColor: 'text-amber-700',
        title: 'Medium Condition Guava',
      }
    : {
        border: 'border-rose-200',
        bg: 'bg-rose-50/40',
        badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
        icon: <XCircle className="w-8 h-8 text-rose-600" />,
        barColor: 'bg-rose-500',
        textColor: 'text-rose-700',
        title: 'Poor Condition Guava',
      };

  return (
    <div className={`mt-8 rounded-3xl p-6 sm:p-8 border shadow-xl transition-all ${theme.border} ${theme.bg}`}>
      {/* Top Banner with Condition & Required Message */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200/80 gap-4">
        <div className="flex items-start sm:items-center space-x-4">
          <div className="p-2.5 rounded-2xl bg-white shadow-md border border-slate-100">
            {theme.icon}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase font-extrabold tracking-wider text-slate-500">
                Scan Classification Result
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${theme.badgeBg}`}>
                {result.condition}
              </span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${theme.textColor} mt-0.5`}>
              "{result.message}"
            </h2>
          </div>
        </div>

        {/* Freshness Score Metric */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 min-w-[180px] text-right sm:text-center">
          <span className="text-xs font-semibold text-slate-500 block">Freshness Score</span>
          <div className="flex items-center justify-end sm:justify-center space-x-1 mt-0.5">
            <span className="text-3xl font-black text-slate-900">{result.freshnessScore}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${theme.barColor}`}
              style={{ width: `${Math.min(100, Math.max(5, result.freshnessScore))}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Middle Grid: Detailed Inspection Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
        <div className="bg-white/80 rounded-2xl p-4 border border-slate-100 shadow-xs">
          <div className="flex items-center space-x-2 text-slate-500 text-xs font-semibold mb-1">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>AI Confidence</span>
          </div>
          <span className="text-xl font-bold text-slate-900">{result.confidence}%</span>
          <p className="text-[11px] text-slate-500 mt-1">Verified against 1,000-image database</p>
        </div>

        <div className="bg-white/80 rounded-2xl p-4 border border-slate-100 shadow-xs">
          <div className="flex items-center space-x-2 text-slate-500 text-xs font-semibold mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Blemish / Defect Area</span>
          </div>
          <span className="text-xl font-bold text-slate-900">{result.defectPercentage}%</span>
          <p className="text-[11px] text-slate-500 mt-1">Pericarp defect ratio</p>
        </div>

        <div className="bg-white/80 rounded-2xl p-4 border border-slate-100 shadow-xs">
          <div className="flex items-center space-x-2 text-slate-500 text-xs font-semibold mb-1">
            {isPoor ? (
              <ShieldAlert className="w-4 h-4 text-rose-500" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            )}
            <span>Consumption Safety</span>
          </div>
          <span
            className={`text-base font-bold ${
              isFresh ? 'text-emerald-700' : isMedium ? 'text-amber-700' : 'text-rose-700'
            }`}
          >
            {isFresh ? 'Safe to Eat' : isMedium ? 'Eat Soon / Trim' : 'Unsafe to Consume'}
          </span>
          <p className="text-[11px] text-slate-500 mt-1">
            {isFresh ? 'Ready for raw eating' : isMedium ? 'Consume today' : 'Fungal toxins risk'}
          </p>
        </div>
      </div>

      {/* Disease Diagnosis Card (for POOR condition) */}
      {isPoor && result.diseaseName && (
        <div className="bg-rose-100/70 border-2 border-rose-300/80 rounded-2xl p-5 mb-6 text-slate-900">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-rose-600 text-white rounded-xl shadow-md">
              <AlertOctagon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800 bg-rose-200/80 px-2.5 py-0.5 rounded-full">
                  Identified Guava Disease
                </span>
                {result.pathogen && (
                  <span className="text-xs italic text-rose-900 font-medium">
                    ({result.pathogen})
                  </span>
                )}
              </div>
              <h3 className="text-xl font-extrabold text-rose-950 mb-2">
                {result.diseaseName}
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="bg-white/90 rounded-xl p-3 border border-rose-200">
                  <h4 className="font-bold text-rose-900 mb-0.5 flex items-center space-x-1">
                    <Info className="w-3.5 h-3.5 text-rose-700" />
                    <span>Why did this happen? (Cause &amp; Reason):</span>
                  </h4>
                  <p className="text-slate-700 leading-relaxed">{result.diseaseReason}</p>
                </div>

                <div className="bg-white/90 rounded-xl p-3 border border-rose-200">
                  <h4 className="font-bold text-rose-900 mb-0.5 flex items-center space-x-1">
                    <Activity className="w-3.5 h-3.5 text-rose-700" />
                    <span>Observed Disease Symptoms:</span>
                  </h4>
                  <p className="text-slate-700 leading-relaxed">{result.symptoms}</p>
                </div>

                <div className="bg-rose-950 text-rose-100 rounded-xl p-3 shadow-inner">
                  <h4 className="font-bold text-rose-300 mb-0.5 flex items-center space-x-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    <span>Health Advisory &amp; Food Risk:</span>
                  </h4>
                  <p className="text-rose-100/90 leading-relaxed">{result.healthAdvisory}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fresh / Medium Advisory Note */}
      {!isPoor && (
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs mb-6">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-xl text-white ${isFresh ? 'bg-emerald-600' : 'bg-amber-600'}`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">
                Recommendation &amp; Eating Advice
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {result.healthAdvisory}
              </p>
              <div className="mt-2 text-xs font-semibold text-slate-700">
                Action: <span className="font-normal text-slate-600">{result.recommendedAction}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Color Profile Breakdown */}
      {result.colorMetrics && (
        <div className="bg-white/90 rounded-2xl p-4 border border-slate-100 shadow-xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Pericarp Color Spectrum Analysis
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-emerald-50 rounded-xl p-2.5 border border-emerald-100">
              <span className="text-[11px] font-semibold text-emerald-800 block">Healthy Green</span>
              <span className="text-base font-bold text-emerald-950">{result.colorMetrics.greenRatio}%</span>
            </div>
            <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-100">
              <span className="text-[11px] font-semibold text-amber-800 block">Ripe Golden</span>
              <span className="text-base font-bold text-amber-950">{result.colorMetrics.yellowRatio}%</span>
            </div>
            <div className="bg-orange-50 rounded-xl p-2.5 border border-orange-100">
              <span className="text-[11px] font-semibold text-orange-800 block">Superficial Blemish</span>
              <span className="text-base font-bold text-orange-950">{result.colorMetrics.blemishRatio}%</span>
            </div>
            <div className="bg-rose-50 rounded-xl p-2.5 border border-rose-100">
              <span className="text-[11px] font-semibold text-rose-800 block">Necrotic / Spots</span>
              <span className="text-base font-bold text-rose-950">{result.colorMetrics.necroticRatio}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
