import React, { useState } from 'react';
import { Cpu, Zap, Info } from 'lucide-react';

export const PcbTraceCalculator: React.FC = () => {
  const [currentAmps, setCurrentAmps] = useState<number>(2.5);
  const [tempRiseC, setTempRiseC] = useState<number>(10);
  const [copperWeightOz, setCopperWeightOz] = useState<number>(1); // 1oz or 2oz
  const [isInternalLayer, setIsInternalLayer] = useState<boolean>(false);

  // IPC-2221 formula:
  // I = k * (ΔT)^0.44 * (A)^0.725
  // where A = Area in mils^2
  // k = 0.048 for external, 0.024 for internal
  const k = isInternalLayer ? 0.024 : 0.048;
  const areaMilsSq = Math.pow(currentAmps / (k * Math.pow(tempRiseC, 0.44)), 1 / 0.725);
  
  // Copper thickness in mils (1 oz = 1.378 mils = 35 µm, 2 oz = 2.756 mils = 70 µm)
  const thicknessMils = copperWeightOz === 1 ? 1.378 : 2.756;
  const traceWidthMils = areaMilsSq / thicknessMils;
  const traceWidthMm = traceWidthMils * 0.0254;

  // Approximate resistance per 100mm (copper resistivity = 1.7e-8 Ω·m)
  const crossSectionM2 = (areaMilsSq * 6.4516e-10);
  const resistancePer100mm = crossSectionM2 > 0 ? (1.7e-8 * 0.1) / crossSectionM2 : 0;
  const voltageDrop100mm = currentAmps * resistancePer100mm;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-white">Interactive IPC-2221 Trace Width Calculator</h4>
            <p className="text-xs text-slate-400">Calculate required PCB trace width based on target current and thermal limits</p>
          </div>
        </div>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-1 rounded">
          IPC-2221 Standard
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
              <span>Target Current (Amps)</span>
              <span className="font-mono text-cyan-400">{currentAmps.toFixed(1)} A</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="15.0"
              step="0.1"
              value={currentAmps}
              onChange={(e) => setCurrentAmps(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
              <span>0.2 A</span>
              <span>7.5 A</span>
              <span>15.0 A</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
              <span>Max Acceptable Temperature Rise (ΔT)</span>
              <span className="font-mono text-cyan-400">+{tempRiseC} °C</span>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              step="5"
              value={tempRiseC}
              onChange={(e) => setTempRiseC(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
              <span>+5 °C (Conservative)</span>
              <span>+20 °C</span>
              <span>+40 °C (Aggressive)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="text-xs font-medium text-slate-400 block mb-1.5">Copper Thickness</label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setCopperWeightOz(1)}
                  className={`py-1.5 text-xs font-mono font-medium rounded border transition-colors ${
                    copperWeightOz === 1
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
                  }`}
                >
                  1 oz (35µm)
                </button>
                <button
                  type="button"
                  onClick={() => setCopperWeightOz(2)}
                  className={`py-1.5 text-xs font-mono font-medium rounded border transition-colors ${
                    copperWeightOz === 2
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
                  }`}
                >
                  2 oz (70µm)
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-400 block mb-1.5">Layer Location</label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsInternalLayer(false)}
                  className={`py-1.5 text-xs font-mono font-medium rounded border transition-colors ${
                    !isInternalLayer
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
                  }`}
                >
                  External
                </button>
                <button
                  type="button"
                  onClick={() => setIsInternalLayer(true)}
                  className={`py-1.5 text-xs font-mono font-medium rounded border transition-colors ${
                    isInternalLayer
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
                  }`}
                >
                  Internal
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results display */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium mb-1">Recommended Minimum Trace Width</div>
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-3xl font-mono font-bold text-cyan-400 tabular-nums">
                {traceWidthMm.toFixed(2)} mm
              </span>
              <span className="text-sm font-mono text-slate-400 tabular-nums">
                ({traceWidthMils.toFixed(1)} mils)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-4">
              <div className="bg-slate-900 p-2 rounded border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">Cross-Section</span>
                <span className="text-slate-200 font-semibold">{areaMilsSq.toFixed(1)} mil²</span>
              </div>
              <div className="bg-slate-900 p-2 rounded border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">Resistance / 100mm</span>
                <span className="text-slate-200 font-semibold">{(resistancePer100mm * 1000).toFixed(1)} mΩ</span>
              </div>
              <div className="bg-slate-900 p-2 rounded border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">V-Drop @ 100mm</span>
                <span className="text-slate-200 font-semibold">{(voltageDrop100mm * 1000).toFixed(1)} mV</span>
              </div>
              <div className="bg-slate-900 p-2 rounded border border-slate-800/80">
                <span className="text-slate-500 block text-[10px]">Layer Multiplier</span>
                <span className="text-cyan-400 font-semibold">{isInternalLayer ? 'Internal (2x area)' : 'External (Air cooled)'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
            <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
            <span>TRIKONA standard PCB design rules apply a 1.25x engineering safety factor for high-current tracks and power bus routing.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
