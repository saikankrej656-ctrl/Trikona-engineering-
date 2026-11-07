import React, { useState } from 'react';
import { Sliders, CheckCircle2, AlertTriangle, AlertCircle, Copy, Check, MessageCircle, FileText, ArrowRight } from 'lucide-react';

type ProcessType = 'fdm_print' | 'sla_resin' | 'pcb_2layer' | 'pcb_4layer' | 'cnc_milling';

interface DfmRule {
  parameter: string;
  value: number;
  unit: string;
  minRecommended: number;
  maxRecommended?: number;
  feedback: string;
  status: 'optimal' | 'warning' | 'critical';
}

export const DfmAnalyzer: React.FC = () => {
  const [process, setProcess] = useState<ProcessType>('fdm_print');

  // Sliders for 3D Printing / CNC
  const [wallThickness, setWallThickness] = useState<number>(1.6);
  const [minHoleDiameter, setMinHoleDiameter] = useState<number>(3.0);
  const [overhangAngle, setOverhangAngle] = useState<number>(45);
  const [infillDensity, setInfillDensity] = useState<number>(30);

  // Sliders for PCB
  const [traceWidth, setTraceWidth] = useState<number>(8); // mils
  const [traceSpacing, setTraceSpacing] = useState<number>(8); // mils
  const [viaDrillSize, setViaDrillSize] = useState<number>(0.3); // mm
  const [copperWeight, setCopperWeight] = useState<number>(1); // oz

  const [copied, setCopied] = useState(false);

  // Evaluate DFM Rules
  const evaluateDfm = (): { score: number; rules: DfmRule[]; verdict: string } => {
    const rules: DfmRule[] = [];

    if (process === 'fdm_print') {
      // Wall thickness
      let wallStatus: 'optimal' | 'warning' | 'critical' = 'optimal';
      let wallFeedback = 'Ideal for 0.4mm nozzle (4 perimeters). Excellent structural integrity.';
      if (wallThickness < 0.8) {
        wallStatus = 'critical';
        wallFeedback = 'Wall is too thin (< 0.8mm). High risk of delamination or print failure.';
      } else if (wallThickness < 1.2) {
        wallStatus = 'warning';
        wallFeedback = 'Acceptable for non-structural cosmetic parts, but vulnerable to impact.';
      }
      rules.push({ parameter: 'Nominal Wall Thickness', value: wallThickness, unit: 'mm', minRecommended: 1.2, feedback: wallFeedback, status: wallStatus });

      // Hole diameter
      let holeStatus: 'optimal' | 'warning' | 'critical' = 'optimal';
      let holeFeedback = 'Standard drill/tap clearance hole. High dimensional fidelity.';
      if (minHoleDiameter < 1.5) {
        holeStatus = 'critical';
        holeFeedback = 'Hole diameter < 1.5mm tends to close up due to polymer thermal shrinkage.';
      } else if (minHoleDiameter < 2.5) {
        holeStatus = 'warning';
        holeFeedback = 'Requires reaming or undersized compensation in slicer.';
      }
      rules.push({ parameter: 'Minimum Hole Diameter', value: minHoleDiameter, unit: 'mm', minRecommended: 2.0, feedback: holeFeedback, status: holeStatus });

      // Overhang
      let overStatus: 'optimal' | 'warning' | 'critical' = 'optimal';
      let overFeedback = 'Self-supporting angle; zero print support structures required.';
      if (overhangAngle > 60) {
        overStatus = 'critical';
        overFeedback = 'Severe overhang (>60°). Will cause surface sagging unless supported.';
      } else if (overhangAngle > 45) {
        overStatus = 'warning';
        overFeedback = 'Moderate overhang; requires aggressive auxiliary part cooling fans.';
      }
      rules.push({ parameter: 'Maximum Overhang Angle', value: overhangAngle, unit: '°', minRecommended: 45, feedback: overFeedback, status: overStatus });

    } else if (process === 'sla_resin') {
      let wallStatus: 'optimal' | 'warning' | 'critical' = 'optimal';
      let wallFeedback = 'Sturdy for stereolithography engineering resins.';
      if (wallThickness < 0.6) {
        wallStatus = 'critical';
        wallFeedback = 'Dangerously thin for SLA peel forces; prone to warping in curing oven.';
      } else if (wallThickness < 1.0) {
        wallStatus = 'warning';
        wallFeedback = 'Thin wall; ensure internal support scaffolding is added.';
      }
      rules.push({ parameter: 'Wall Thickness', value: wallThickness, unit: 'mm', minRecommended: 0.8, feedback: wallFeedback, status: wallStatus });

      let holeStatus: 'optimal' | 'warning' | 'critical' = 'optimal';
      let holeFeedback = 'Excellent fluid resin drainage during platform lift.';
      if (minHoleDiameter < 0.8) {
        holeStatus = 'critical';
        holeFeedback = 'Capillary suction will trap uncured resin inside hole.';
      } else if (minHoleDiameter < 1.5) {
        holeStatus = 'warning';
        holeFeedback = 'Requires isopropyl alcohol flushing with ultrasonic bath.';
      }
      rules.push({ parameter: 'Fluid Drain / Hole Diameter', value: minHoleDiameter, unit: 'mm', minRecommended: 1.2, feedback: holeFeedback, status: holeStatus });

    } else if (process.startsWith('pcb')) {
      // Trace width
      let traceStatus: 'optimal' | 'warning' | 'critical' = 'optimal';
      let traceFeedback = 'Comfortably within standard IPC Class 2 fabrication limits.';
      if (traceWidth < 5) {
        traceStatus = 'critical';
        traceFeedback = 'Sub-5mil trace requires high-spec laser direct imaging (LDI); increases fabrication cost.';
      } else if (traceWidth < 6) {
        traceStatus = 'warning';
        traceFeedback = 'Fine-pitch routing. Verify current carrying capacity with IPC-2152.';
      }
      rules.push({ parameter: 'Minimum Trace Width', value: traceWidth, unit: 'mil', minRecommended: 6, feedback: traceFeedback, status: traceStatus });

      // Trace spacing
      let spaceStatus: 'optimal' | 'warning' | 'critical' = 'optimal';
      let spaceFeedback = 'Prevents solder bridging during hot air leveling / reflow.';
      if (traceSpacing < 5) {
        spaceStatus = 'critical';
        spaceFeedback = 'High risk of copper micro-shorts under chemical etching tolerance.';
      } else if (traceSpacing < 6) {
        spaceStatus = 'warning';
        spaceFeedback = 'Dense trace clearance; requires precise solder mask dam.';
      }
      rules.push({ parameter: 'Trace-to-Trace Clearance', value: traceSpacing, unit: 'mil', minRecommended: 6, feedback: spaceFeedback, status: spaceStatus });

      // Via drill
      let viaStatus: 'optimal' | 'warning' | 'critical' = 'optimal';
      let viaFeedback = 'Standard mechanical CNC drill diameter with high barrel plating yield.';
      if (viaDrillSize < 0.2) {
        viaStatus = 'critical';
        viaFeedback = 'Micro-via territory (<0.2mm). Requires laser drilling and blind/buried stackup.';
      } else if (viaDrillSize < 0.3) {
        viaStatus = 'warning';
        viaFeedback = 'Tight mechanical drill; check annular ring aspect ratio.';
      }
      rules.push({ parameter: 'Minimum Via Drill Diameter', value: viaDrillSize, unit: 'mm', minRecommended: 0.3, feedback: viaFeedback, status: viaStatus });
    } else {
      // CNC milling
      let wallStatus: 'optimal' | 'warning' | 'critical' = 'optimal';
      let wallFeedback = 'Safe for aluminum 6061 without tool chatter or deflection.';
      if (wallThickness < 1.0) {
        wallStatus = 'critical';
        wallFeedback = 'Sub-1mm wall in CNC will vibrate and deform under endmill cutting forces.';
      } else if (wallThickness < 1.5) {
        wallStatus = 'warning';
        wallFeedback = 'Requires low feed-rate finish passes and custom sacrificial fixturing.';
      }
      rules.push({ parameter: 'Milled Wall Thickness', value: wallThickness, unit: 'mm', minRecommended: 1.5, feedback: wallFeedback, status: wallStatus });
    }

    // Compute composite score
    const criticalCount = rules.filter((r) => r.status === 'critical').length;
    const warningCount = rules.filter((r) => r.status === 'warning').length;
    let score = 100 - criticalCount * 35 - warningCount * 15;
    if (score < 20) score = 20;

    let verdict = 'Design is fully manufacturable with high yield and standard tooling.';
    if (criticalCount > 0) {
      verdict = 'Critical DFM constraints detected. Revisions recommended to avoid fabrication scrap.';
    } else if (warningCount > 0) {
      verdict = 'Manufacturable with minor advisories. Tooling costs may be slightly elevated.';
    }

    return { score, rules, verdict };
  };

  const { score, rules, verdict } = evaluateDfm();

  const generateReportSummary = () => {
    return `TRIKONA DFM PRE-FLIGHT EVALUATION
Process: ${process.toUpperCase()}
Feasibility Score: ${score}/100
Verdict: ${verdict}
${rules.map((r) => `• ${r.parameter}: ${r.value}${r.unit} [${r.status.toUpperCase()}] - ${r.feedback}`).join('\n')}

TRIKONA Hardware Engineering & Rapid Prototyping
Yeola & Nashik, Maharashtra | Phone/WhatsApp: +91 9970113207`;
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(generateReportSummary());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const whatsAppDfmUrl = `https://wa.me/919970113207?text=${encodeURIComponent(
    `Hello TRIKONA, here is my DFM Pre-Flight Report for ${process.toUpperCase()}:\nScore: ${score}/100\nVerdict: ${verdict}\nPlease review my CAD/Gerber file for fabrication.`
  )}`;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 text-left relative overflow-hidden">
      {/* Background blueprint subtle effect */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
            <Sliders className="w-4 h-4" />
            <span>Interactive Engineering Tool</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
            Design for Manufacturability (DFM) Rule Analyzer
          </h3>
          <p className="text-xs text-slate-400 pt-0.5">
            Validate physical tolerances, wall thicknesses, and trace clearances against TRIKONA manufacturing constraints.
          </p>
        </div>

        {/* Feasibility score ring/badge */}
        <div className="flex items-center gap-3 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 shrink-0">
          <div className="text-right">
            <div className="text-[10px] font-mono uppercase text-slate-400">DFM Feasibility</div>
            <div className={`text-xl font-black font-mono tabular-nums ${
              score >= 85 ? 'text-emerald-400' : score >= 65 ? 'text-amber-400' : 'text-rose-400'
            }`}>
              {score} <span className="text-xs text-slate-500">/ 100</span>
            </div>
          </div>
          <div className={`w-3.5 h-3.5 rounded-full ${
            score >= 85 ? 'bg-emerald-400 shadow-sm shadow-emerald-500' : score >= 65 ? 'bg-amber-400' : 'bg-rose-400'
          }`} />
        </div>
      </div>

      {/* Process Selector Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-950 rounded-xl border border-slate-800">
        {[
          { id: 'fdm_print', label: 'FDM 3D Printing' },
          { id: 'sla_resin', label: 'SLA Technical Resin' },
          { id: 'pcb_2layer', label: '2-Layer PCB' },
          { id: 'pcb_4layer', label: '4-Layer High Speed PCB' },
          { id: 'cnc_milling', label: 'CNC Milled Aluminum' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setProcess(tab.id as ProcessType)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              process === tab.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Interactive Controls & Rules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input sliders */}
        <div className="lg:col-span-6 space-y-5 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Adjust Project Parameters
          </div>

          {process === 'fdm_print' && (
            <>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Nominal Wall Thickness</span>
                  <span className="font-mono text-cyan-400 font-semibold">{wallThickness} mm</span>
                </div>
                <input
                  type="range"
                  min="0.4"
                  max="4.0"
                  step="0.1"
                  value={wallThickness}
                  onChange={(e) => setWallThickness(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>0.4 mm (Fragile)</span>
                  <span>1.6 mm (Recommended)</span>
                  <span>4.0 mm (Heavy duty)</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Minimum Hole Diameter</span>
                  <span className="font-mono text-cyan-400 font-semibold">{minHoleDiameter} mm</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="10.0"
                  step="0.5"
                  value={minHoleDiameter}
                  onChange={(e) => setMinHoleDiameter(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>1.0 mm (Tight)</span>
                  <span>3.0 mm (M3 Clearance)</span>
                  <span>10.0 mm</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Maximum Overhang Angle</span>
                  <span className="font-mono text-cyan-400 font-semibold">{overhangAngle}°</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  step="5"
                  value={overhangAngle}
                  onChange={(e) => setOverhangAngle(parseInt(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>20° (Self supporting)</span>
                  <span>45° (Standard)</span>
                  <span>80° (Requires supports)</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Internal Infill Density</span>
                  <span className="font-mono text-cyan-400 font-semibold">{infillDensity}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={infillDensity}
                  onChange={(e) => setInfillDensity(parseInt(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>15% (Cosmetic)</span>
                  <span>30% (Standard Enclosure)</span>
                  <span>100% (Solid Billet)</span>
                </div>
              </div>
            </>
          )}

          {process === 'sla_resin' && (
            <>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Resin Shell Wall Thickness</span>
                  <span className="font-mono text-cyan-400 font-semibold">{wallThickness} mm</span>
                </div>
                <input
                  type="range"
                  min="0.4"
                  max="3.0"
                  step="0.1"
                  value={wallThickness}
                  onChange={(e) => setWallThickness(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>0.4 mm</span>
                  <span>1.2 mm (Ideal)</span>
                  <span>3.0 mm</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Drainage &amp; Vent Hole Diameter</span>
                  <span className="font-mono text-cyan-400 font-semibold">{minHoleDiameter} mm</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="6.0"
                  step="0.2"
                  value={minHoleDiameter}
                  onChange={(e) => setMinHoleDiameter(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </>
          )}

          {process.startsWith('pcb') && (
            <>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Minimum Copper Trace Width</span>
                  <span className="font-mono text-cyan-400 font-semibold">{traceWidth} mil</span>
                </div>
                <input
                  type="range"
                  min="3.5"
                  max="20"
                  step="0.5"
                  value={traceWidth}
                  onChange={(e) => setTraceWidth(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>3.5 mil (High-density)</span>
                  <span>8 mil (Standard IPC)</span>
                  <span>20 mil (Power rail)</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Trace-to-Trace Spacing</span>
                  <span className="font-mono text-cyan-400 font-semibold">{traceSpacing} mil</span>
                </div>
                <input
                  type="range"
                  min="3.5"
                  max="20"
                  step="0.5"
                  value={traceSpacing}
                  onChange={(e) => setTraceSpacing(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Via Drill Hole Diameter</span>
                  <span className="font-mono text-cyan-400 font-semibold">{viaDrillSize} mm</span>
                </div>
                <input
                  type="range"
                  min="0.15"
                  max="0.8"
                  step="0.05"
                  value={viaDrillSize}
                  onChange={(e) => setViaDrillSize(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </>
          )}

          {process === 'cnc_milling' && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Milled Fin / Wall Thickness</span>
                <span className="font-mono text-cyan-400 font-semibold">{wallThickness} mm</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={wallThickness}
                onChange={(e) => setWallThickness(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>0.5 mm (Chatter risk)</span>
                <span>2.0 mm (Rigid)</span>
                <span>5.0 mm</span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Real-time DFM Rule Validation Feed */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-4 rounded-xl border bg-slate-950/80 border-slate-800 space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Manufacturing Synthesis
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {verdict}
            </p>
          </div>

          <div className="space-y-3">
            {rules.map((rule, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                  rule.status === 'optimal'
                    ? 'bg-emerald-950/20 border-emerald-800/40'
                    : rule.status === 'warning'
                    ? 'bg-amber-950/20 border-amber-800/40'
                    : 'bg-rose-950/20 border-rose-800/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {rule.status === 'optimal' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : rule.status === 'warning' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                    <span className="font-semibold text-white">{rule.parameter}</span>
                  </div>
                  <span className="font-mono text-[11px] text-cyan-300">
                    {rule.value} {rule.unit}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 pl-6 leading-relaxed">
                  {rule.feedback}
                </p>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCopyReport}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'DFM Report Copied!' : 'Copy DFM Report'}</span>
            </button>

            <a
              href={whatsAppDfmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/70 hover:bg-emerald-950 border border-emerald-800/80 rounded-lg transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-400" />
              <span>Send DFM to WhatsApp (9970113207)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
