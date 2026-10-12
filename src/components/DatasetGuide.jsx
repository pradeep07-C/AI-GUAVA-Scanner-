import React from 'react';
import { Database, FolderTree, Cpu, CheckCircle2, ArrowRight, Terminal, BookOpen, Layers } from 'lucide-react';

export default function DatasetGuide() {
  return (
    <div className="space-y-8">
      {/* Overview Card */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="max-w-3xl">
          <span className="inline-flex items-center space-x-1.5 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-semibold text-emerald-200 mb-3">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Academic Project Architecture</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            How to Integrate Your 1,000 Guava Database
          </h2>
          <p className="mt-2 text-sm text-emerald-100/90 leading-relaxed">
            Your teacher provided 1,000 guava pictures categorized into 3 folders (<strong>Fresh</strong>, <strong>Medium</strong>, and <strong>Poor</strong>).
            Here is the complete step-by-step pipeline showing how the dataset flows from raw folders to AI model training, Java Spring Boot backend, and React UI.
          </p>
        </div>
      </div>

      {/* 3 Step Workflow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg mb-4">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Organize 1,000 Images
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Place the 1,000 pictures into the project dataset folder under the 3 subdirectories:
            </p>
            <div className="bg-slate-900 text-emerald-400 font-mono text-[11px] p-3 rounded-xl space-y-1">
              <div>📁 dataset/</div>
              <div>&nbsp;&nbsp;├── 📁 fresh/ (e.g. ~350 images)</div>
              <div>&nbsp;&nbsp;├── 📁 medium/ (e.g. ~350 images)</div>
              <div>&nbsp;&nbsp;└── 📁 poor/ (e.g. ~300 images)</div>
            </div>
          </div>
          <div className="mt-4 text-[11px] text-slate-500">
            ✅ Standard PyTorch ImageFolder format
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg mb-4">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Train Model (Optional ONNX)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Run our included transfer learning script <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">train_guava_model.py</code>. It uses lightweight MobileNetV2:
            </p>
            <div className="bg-slate-900 text-slate-200 font-mono text-[11px] p-3 rounded-xl space-y-1 overflow-x-auto">
              <div className="text-slate-400"># Train on your 1000 images</div>
              <div className="text-emerald-400">cd training</div>
              <div className="text-emerald-400">python3 train_guava_model.py</div>
              <div className="text-slate-400"># Exports guava_model.onnx</div>
            </div>
          </div>
          <div className="mt-4 text-[11px] text-slate-500">
            ⚡ Takes 2–4 minutes on standard laptop
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg mb-4">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Java Spring Boot + React
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              The Spring Boot backend receives the uploaded image, analyzes pericarp chlorophyll and necrotic lesions, maps the exact disease, and displays it in React!
            </p>
            <div className="bg-slate-900 text-slate-200 font-mono text-[11px] p-3 rounded-xl space-y-1">
              <div className="text-emerald-400">POST /api/scan</div>
              <div className="text-slate-300">↳ Condition: FRESH/MEDIUM/POOR</div>
              <div className="text-slate-300">↳ Disease: Anthracnose/Rot</div>
              <div className="text-slate-300">↳ Freshness: 0 - 100%</div>
            </div>
          </div>
          <div className="mt-4 text-[11px] text-slate-500">
            🎯 Zero external cloud dependencies
          </div>
        </div>
      </div>

      {/* Dataset Labeling & Criteria Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
          <Layers className="w-5 h-5 text-emerald-600" />
          <span>Category Classification Criteria</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
              <tr>
                <th className="p-3">Category</th>
                <th className="p-3">Visual Characteristics</th>
                <th className="p-3">Freshness Score</th>
                <th className="p-3">Required User Message</th>
                <th className="p-3">Disease Presence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr className="hover:bg-emerald-50/30">
                <td className="p-3 font-bold text-emerald-700 flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span>Fresh</span>
                </td>
                <td className="p-3">Bright green or pale yellowish-green rind, crisp firm texture, &lt;3% blemishes</td>
                <td className="p-3 font-semibold text-slate-900">85% – 99%</td>
                <td className="p-3 font-semibold text-emerald-700">"it is fresh you can eat"</td>
                <td className="p-3 text-slate-400">None detected</td>
              </tr>
              <tr className="hover:bg-amber-50/30">
                <td className="p-3 font-bold text-amber-700 flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span>Medium</span>
                </td>
                <td className="p-3">Golden yellow peel, natural ripening softening, 3%–15% minor surface spots</td>
                <td className="p-3 font-semibold text-slate-900">50% – 78%</td>
                <td className="p-3 font-semibold text-amber-700">"it is also eatable but freshness is less"</td>
                <td className="p-3">Superficial lenticel oxidation only</td>
              </tr>
              <tr className="hover:bg-rose-50/30">
                <td className="p-3 font-bold text-rose-700 flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <span>Poor</span>
                </td>
                <td className="p-3">Dark brown/black sunken rot, water-soaked spots, fungal patches, or shriveling</td>
                <td className="p-3 font-semibold text-slate-900">10% – 45%</td>
                <td className="p-3 font-semibold text-rose-700">"poor condition - not recommended for eating"</td>
                <td className="p-3 font-semibold text-rose-700">Identifies Anthracnose, Stylar End Rot, Fruit Fly, etc.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
