import React, { useState } from 'react';
import { Layers, Flame, Gauge, Check } from 'lucide-react';

interface MaterialProfile {
  id: string;
  name: string;
  family: string;
  tensileStrengthMpa: number; // MPa
  heatDeflectionC: number; // °C at 0.45MPa
  impactResistance: 'Moderate' | 'High' | 'Very High' | 'Exceptional';
  surfaceFinish: string;
  bestFor: string;
}

const MATERIALS: MaterialProfile[] = [
  {
    id: 'pla-plus',
    name: 'PLA+ Precision Rigidity',
    family: 'Polylactic Acid',
    tensileStrengthMpa: 58,
    heatDeflectionC: 55,
    impactResistance: 'Moderate',
    surfaceFinish: 'Smooth matte / crisp edge definition',
    bestFor: 'Rapid ergonomic mockups, visual customer prototypes, dimension checks',
  },
  {
    id: 'petg',
    name: 'PETG Functional Toughness',
    family: 'Polyethylene Terephthalate Glycol',
    tensileStrengthMpa: 50,
    heatDeflectionC: 73,
    impactResistance: 'High',
    surfaceFinish: 'Semi-gloss, excellent interlayer bonding',
    bestFor: 'Water-resistant enclosures, mechanical snap-fits, battery compartments',
  },
  {
    id: 'abs',
    name: 'ABS / ASA Industrial Grade',
    family: 'Acrylonitrile Butadiene Styrene',
    tensileStrengthMpa: 44,
    heatDeflectionC: 98,
    impactResistance: 'Very High',
    surfaceFinish: 'Matte, post-processable with acetone vapor smoothing',
    bestFor: 'Automotive interiors, outdoor UV exposed housings, heat-tolerant parts',
  },
  {
    id: 'pa-cf',
    name: 'PA-CF (Carbon Fiber Nylon)',
    family: 'Polyamide 12 with 15% Chopped Carbon Fiber',
    tensileStrengthMpa: 92,
    heatDeflectionC: 155,
    impactResistance: 'Exceptional',
    surfaceFinish: 'Micro-textured satin black, hidden layer lines',
    bestFor: 'High-stress robot arms, functional drone frames, CNC workholding jigs',
  },
];

export const InfillMaterialMatrix: React.FC = () => {
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('petg');
  const [infillDensity, setInfillDensity] = useState<number>(35);
  const [infillPattern, setInfillPattern] = useState<'gyroid' | 'honeycomb' | 'grid'>('gyroid');

  const selectedMaterial = MATERIALS.find((m) => m.id === selectedMaterialId) || MATERIALS[1];

  // Infill strength multiplier: Gyroid has superior isotropic strength
  const patternMultiplier = infillPattern === 'gyroid' ? 1.15 : infillPattern === 'honeycomb' ? 1.08 : 1.0;
  const effectiveStrength = Math.round(selectedMaterial.tensileStrengthMpa * (0.35 + (infillDensity / 100) * 0.65) * patternMultiplier);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-white">Polymer &amp; Infill Matrix Optimization</h4>
            <p className="text-xs text-slate-400">Evaluate mechanical strength, thermal limits, and infill parameters</p>
          </div>
        </div>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-1 rounded">
          Additive DFM
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Material choices */}
        <div className="lg:col-span-5 space-y-3">
          <label className="text-xs font-medium text-slate-400 block">Select Engineering Filament</label>
          {MATERIALS.map((mat) => (
            <button
              key={mat.id}
              type="button"
              onClick={() => setSelectedMaterialId(mat.id)}
              className={`w-full p-3 rounded-lg border text-left transition-all ${
                selectedMaterialId === mat.id
                  ? 'bg-slate-800 border-cyan-500/60 text-white'
                  : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold">{mat.name}</span>
                <span className="text-[11px] font-mono text-cyan-400">{mat.heatDeflectionC}°C HDT</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">{mat.family}</div>
            </button>
          ))}

          {/* Infill Controls */}
          <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-lg space-y-3 mt-2">
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                <span>Infill Density</span>
                <span className="font-mono text-cyan-400">{infillDensity}%</span>
              </div>
              <input
                type="range"
                min="15"
                max="100"
                step="5"
                value={infillDensity}
                onChange={(e) => setInfillDensity(parseInt(e.target.value, 10))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                <span>15% (Draft)</span>
                <span>35% (Optimal)</span>
                <span>100% (Solid)</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-400 block mb-1.5">Infill Pattern</label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['gyroid', 'honeycomb', 'grid'] as const).map((pat) => (
                  <button
                    key={pat}
                    type="button"
                    onClick={() => setInfillPattern(pat)}
                    className={`py-1 text-xs font-mono capitalize rounded border transition-colors ${
                      infillPattern === pat
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                        : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {pat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Calculated specs */}
        <div className="lg:col-span-7 bg-slate-950/70 border border-slate-800 rounded-lg p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs text-slate-400 font-mono">Structural Profile</span>
                <div className="text-lg font-bold text-white mt-0.5">{selectedMaterial.name}</div>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block font-mono">Calculated Tensile</span>
                <span className="font-mono text-cyan-400 font-bold text-xl tabular-nums">
                  ~{effectiveStrength} MPa
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5 mb-4">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-mono mb-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Max Temp</span>
                </div>
                <div className="text-base font-bold font-mono text-slate-100">{selectedMaterial.heatDeflectionC} °C</div>
                <span className="text-[10px] text-slate-500">Continuous rating</span>
              </div>

              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-mono mb-1">
                  <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Impact</span>
                </div>
                <div className="text-base font-bold font-mono text-slate-100">{selectedMaterial.impactResistance}</div>
                <span className="text-[10px] text-slate-500">ASTM D256 Izod</span>
              </div>

              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-mono mb-1">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Infill Shear</span>
                </div>
                <div className="text-base font-bold font-mono text-emerald-400">
                  {infillPattern === 'gyroid' ? 'Isotropic' : infillPattern === 'honeycomb' ? 'High Radial' : 'Planar'}
                </div>
                <span className="text-[10px] text-slate-500">Stress dissipation</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300 bg-slate-900/60 p-3.5 rounded-lg border border-slate-800/80">
              <div>
                <span className="text-slate-400 font-medium">Surface Characteristics: </span>
                <span>{selectedMaterial.surfaceFinish}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Recommended Prototyping Applications: </span>
                <span>{selectedMaterial.bestFor}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 mt-4 text-[11px] text-slate-400 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>TRIKONA maintains active heated dryboxes for PA-CF and hygroscopic polymers to prevent moisture bubbling.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
