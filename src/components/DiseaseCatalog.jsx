import React from 'react';
import { AlertCircle, ShieldAlert, Sparkles, Sprout, AlertTriangle, Bug } from 'lucide-react';

const DISEASES = [
  {
    id: 'anthracnose',
    name: 'Guava Anthracnose',
    pathogen: 'Colletotrichum gloeosporioides',
    badge: 'Most Common Post-Harvest Disease',
    severity: 'High',
    symptoms: 'Sunken dark brown to black circular lesions on the fruit peel. Lesions enlarge and merge into extensive rotting depressions.',
    cause: 'Fungal spores survive in mummified fruits and tree branches, germinating during high humidity, rain, or poorly ventilated storage.',
    risk: 'Unfit to eat. Fungal mycelium penetrates the inner pulp, producing toxic secondary metabolites and sour bitter decay.',
    prevention: 'Spray copper-based fungicides in orchards; avoid fruit scratching during harvesting; store at 8–10°C in dry airy crates.',
  },
  {
    id: 'stylar_end_rot',
    name: 'Stylar End Rot',
    pathogen: 'Phomopsis psidii / Botryodiplodia theobromae',
    badge: 'Blossom-End Decay',
    severity: 'High',
    symptoms: 'Water-soaked brownish decay starting strictly at the calyx / blossom (stylar) end of the guava, spreading upwards.',
    cause: 'Pathogen infects flower petals during blossom stage, remaining dormant until ripening sugars trigger rapid rot.',
    risk: 'Unfit to eat. Internal core disintegrates into a soft watery mush with unpleasant fermented odor.',
    prevention: 'Disinfect floral remnants; harvest carefully without tearing the calyx end; dip in warm organic fruit wash.',
  },
  {
    id: 'fruit_fly',
    name: 'Fruit Fly Larval Infestation',
    pathogen: 'Bactrocera dorsalis',
    badge: 'Pest-Induced Rot',
    severity: 'Severe',
    symptoms: 'Dark puncture marks (stings), uneven soft mushy spots, internal pulp browning, and secondary bacterial liquefaction.',
    cause: 'Female oriental fruit fly punctures the fruit skin to lay eggs; hatched maggots burrow internally and feed on guava seeds/pulp.',
    risk: 'Strictly unfit for consumption. Dangerous risk of live larvae and bacterial gastroenteritis.',
    prevention: 'Fruit bagging with newspaper/polypropylene sleeves 30–45 days before maturity; pheromone lure traps.',
  },
  {
    id: 'canker_scab',
    name: 'Guava Canker & Scab',
    pathogen: 'Pestalotiopsis psidii',
    badge: 'Corky Rind Infection',
    severity: 'Moderate',
    symptoms: 'Raised brownish-grey corky pustules with crater-like cracks on the outer guava pericarp.',
    cause: 'Spreads via rain splash and wind through small mechanical abrasions, insect bites, or hail damage.',
    risk: 'Not recommended for eating. Advanced scabs harden the skin and turn pulp woody and astringent.',
    prevention: 'Prune dead and interlocking branches; apply copper oxychloride sprays during young fruitlet stage.',
  },
  {
    id: 'wilt_decay',
    name: 'Guava Wilt & Dry Rot',
    pathogen: 'Fusarium oxysporum f. sp. psidii',
    badge: 'Vascular Wilt',
    severity: 'Severe',
    symptoms: 'Fruit shrivels and mummifies while hanging, turning dull yellowish-brown, hard, and dry with wrinkled skin.',
    cause: 'Soil-borne fungal pathogen invades tree roots, choking vascular xylem vessels and depriving fruit of water.',
    risk: 'Unfit to eat. Flesh is woody, despoiled, and lacks juice or vitamins.',
    prevention: 'Graft on wilt-resistant rootstocks (e.g. Psidium cattleianum); soil solarization and good drainage.',
  },
  {
    id: 'algal_spot',
    name: 'Algal Fruit Spot',
    pathogen: 'Cephaleuros virescens',
    badge: 'Algal Infection',
    severity: 'Low to Moderate',
    symptoms: 'Circular crusty reddish-orange to dark brown velvety spots with irregular edges across the skin.',
    cause: 'Parasitic green algae thrive in humid, damp, overcast weather where tree crowns are dense.',
    risk: 'Peel skin completely before eating if spots are only superficial. Discard if deep discoloration exists.',
    prevention: 'Thin orchard canopies to allow direct sunlight; apply copper hydroxide sprays in rainy season.',
  },
];

export default function DiseaseCatalog() {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">
          <Sprout className="w-3.5 h-3.5 text-emerald-600" />
          <span>Guava Pathology Reference</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Guava Diseases &amp; Pathogen Encyclopedia
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          When a guava is classified as <strong className="text-rose-700">Poor</strong>, our system identifies the exact disease and explains why it happened. Below is the full scientific catalog.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DISEASES.map((d) => (
          <div
            key={d.id}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full inline-block mb-1">
                    {d.badge}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{d.name}</h3>
                  <p className="text-xs italic text-slate-500">{d.pathogen}</p>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    d.severity === 'Severe'
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : d.severity === 'High'
                      ? 'bg-orange-100 text-orange-800 border border-orange-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}
                >
                  {d.severity} Risk
                </span>
              </div>

              <div className="space-y-3 mt-4 text-xs text-slate-600">
                <div>
                  <strong className="text-slate-800 block mb-0.5">Symptoms:</strong>
                  <p className="leading-relaxed">{d.symptoms}</p>
                </div>

                <div>
                  <strong className="text-slate-800 block mb-0.5">Why it happens (Cause):</strong>
                  <p className="leading-relaxed">{d.cause}</p>
                </div>

                <div className="bg-rose-50 rounded-xl p-2.5 border border-rose-100 text-rose-900">
                  <strong className="block mb-0.5 flex items-center space-x-1 text-rose-800">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                    <span>Food Safety Advisory:</span>
                  </strong>
                  <p className="text-rose-800/90 leading-relaxed">{d.risk}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-slate-500 text-[11px]">
              <strong className="text-slate-700">Orchard Prevention: </strong>
              <span>{d.prevention}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
