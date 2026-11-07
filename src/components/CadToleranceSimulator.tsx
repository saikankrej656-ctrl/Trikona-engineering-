import React, { useState } from 'react';
import { Box, Layers, HelpCircle, CheckCircle2 } from 'lucide-react';

interface FitPreset {
  id: string;
  name: string;
  isoClass: string;
  type: 'Clearance' | 'Transition' | 'Interference';
  holeTolerance: [number, number]; // [min, max] in microns
  shaftTolerance: [number, number]; // [min, max] in microns
  description: string;
  typicalApp: string;
}

const FIT_PRESETS: FitPreset[] = [
  {
    id: 'h7-g6',
    name: 'Precision Sliding Fit',
    isoClass: 'H7 / g6',
    type: 'Clearance',
    holeTolerance: [0, +25],
    shaftTolerance: [-20, -9],
    description: 'Parts can move and turn freely with oil film lubrication. No noticeable radial play.',
    typicalApp: 'Shaft bearings, precision mechanical indexing pins, optical alignment bushings',
  },
  {
    id: 'h7-h6',
    name: 'Close Locating Fit',
    isoClass: 'H7 / h6',
    type: 'Clearance',
    holeTolerance: [0, +25],
    shaftTolerance: [-16, 0],
    description: 'Zero play under light assembly pressure. Can be assembled by hand without tools.',
    typicalApp: 'Removable gears, test jig locating dowels, precision enclosure guide posts',
  },
  {
    id: 'h7-k6',
    name: 'Snug Transition Fit',
    isoClass: 'H7 / k6',
    type: 'Transition',
    holeTolerance: [0, +25],
    shaftTolerance: [+2, +18],
    description: 'Slight interference or slight clearance. Assembled with a wooden mallet or hand arbor press.',
    typicalApp: 'Permanent gear hubs, bearing inner ring on shaft, precision fixture keyways',
  },
  {
    id: 'h7-p6',
    name: 'Light Press Fit',
    isoClass: 'H7 / p6',
    type: 'Interference',
    holeTolerance: [0, +25],
    shaftTolerance: [+26, +42],
    description: 'Definite interference fit. Requires hydraulic press or thermal shrink expansion to assemble.',
    typicalApp: 'Permanent bushings, drive pulleys, non-slip torque transmission couplings',
  },
];

export const CadToleranceSimulator: React.FC = () => {
  const [nominalSizeMm, setNominalSizeMm] = useState<number>(30);
  const [selectedFitId, setSelectedFitId] = useState<string>('h7-g6');

  const currentFit = FIT_PRESETS.find((f) => f.id === selectedFitId) || FIT_PRESETS[0];

  // Calculate limits in mm
  const holeMinMm = nominalSizeMm + currentFit.holeTolerance[0] / 1000;
  const holeMaxMm = nominalSizeMm + currentFit.holeTolerance[1] / 1000;
  const shaftMinMm = nominalSizeMm + currentFit.shaftTolerance[0] / 1000;
  const shaftMaxMm = nominalSizeMm + currentFit.shaftTolerance[1] / 1000;

  const minGapMicrons = currentFit.holeTolerance[0] - currentFit.shaftTolerance[1];
  const maxGapMicrons = currentFit.holeTolerance[1] - currentFit.shaftTolerance[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
            <Box className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-white">ISO 286 ISO System of Limits &amp; Fits Simulator</h4>
            <p className="text-xs text-slate-400">Parametric tolerance evaluation for mechanical enclosures &amp; mating hardware</p>
          </div>
        </div>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-1 rounded">
          ISO 286-1:2010
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input controls */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
              <span>Nominal Diameter / Feature Size</span>
              <span className="font-mono text-cyan-400">Ø {nominalSizeMm} mm</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              step="5"
              value={nominalSizeMm}
              onChange={(e) => setNominalSizeMm(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
              <span>Ø 10 mm (Fastener)</span>
              <span>Ø 45 mm</span>
              <span>Ø 80 mm (Enclosure)</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-400 block mb-2">Select Fit Standard Class</label>
            <div className="grid grid-cols-1 gap-2">
              {FIT_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setSelectedFitId(preset.id)}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    selectedFitId === preset.id
                      ? 'bg-slate-800 border-cyan-500/60 text-white'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold">{preset.name}</span>
                    <span className="font-mono text-[11px] text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-900/60">
                      {preset.isoClass}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-medium ${
                      preset.type === 'Clearance' ? 'text-emerald-400 bg-emerald-950/50' :
                      preset.type === 'Transition' ? 'text-amber-400 bg-amber-950/50' :
                      'text-rose-400 bg-rose-950/50'
                    }`}>
                      {preset.type} Fit
                    </span>
                    <span className="truncate">{preset.typicalApp}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Technical Diagram & Limits Output */}
        <div className="lg:col-span-7 bg-slate-950/70 border border-slate-800 rounded-lg p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-xs text-slate-400 font-mono">Calculated Fit Envelope ({currentFit.isoClass})</span>
                <div className="text-lg font-bold text-white mt-0.5">{currentFit.name}</div>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block font-mono">Radial Allowance</span>
                <span className="font-mono text-cyan-400 font-bold text-sm">
                  {minGapMicrons > 0 ? `+${minGapMicrons} µm (Gap)` : `${minGapMicrons} µm (Interf.)`}
                </span>
              </div>
            </div>

            {/* Technical schematic bar visualizer */}
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-lg mb-4">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                <span>Hole (Bore) Limit</span>
                <span className="text-emerald-400 font-semibold">{holeMinMm.toFixed(3)} mm &rarr; {holeMaxMm.toFixed(3)} mm</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden mb-3 relative">
                <div className="bg-emerald-500/80 h-full w-2/3 ml-12 rounded-full"></div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                <span>Shaft / Pin Limit</span>
                <span className="text-cyan-400 font-semibold">{shaftMinMm.toFixed(3)} mm &rarr; {shaftMaxMm.toFixed(3)} mm</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden relative">
                <div 
                  className={`h-full rounded-full ${
                    currentFit.type === 'Clearance' ? 'bg-cyan-500/80 w-1/2 ml-6' :
                    currentFit.type === 'Transition' ? 'bg-amber-500/80 w-3/5 ml-10' :
                    'bg-rose-500/80 w-3/4 ml-12'
                  }`}
                ></div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {currentFit.description}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Hole Deviation</span>
                <span className="text-slate-200 font-semibold">0 / +{currentFit.holeTolerance[1]} µm</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Shaft Deviation</span>
                <span className="text-slate-200 font-semibold">
                  {currentFit.shaftTolerance[0] >= 0 ? `+${currentFit.shaftTolerance[0]}` : currentFit.shaftTolerance[0]} / 
                  {currentFit.shaftTolerance[1] >= 0 ? `+${currentFit.shaftTolerance[1]}` : currentFit.shaftTolerance[1]} µm
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 mt-4 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              TRIKONA DFM verification automatically includes 3D interference checking before CAM generation.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
