import React, { useState } from 'react';
import { FileText, Download, Copy, Check, ShieldCheck, Box, Cpu, Layers, Table, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { DfmAnalyzer } from './DfmAnalyzer';

export const EngineeringTemplatesHub: React.FC = () => {
  const [activeTemplate, setActiveTemplate] = useState<'cad_checklist' | 'pcb_drc' | '3d_dfm' | 'mutual_nda' | 'bom_template'>('cad_checklist');
  const [copied, setCopied] = useState<string | null>(null);

  // NDA Form State for custom generation
  const [ndaClientName, setNdaClientName] = useState('');
  const [ndaProjectTitle, setNdaProjectTitle] = useState('');
  const [ndaSignerRole, setNdaSignerRole] = useState('');

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 3000);
  };

  const handleDownload = (filename: string, content: string, mimeType: string = 'text/plain') => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Template 1: CAD Checklist & Spec
  const cadChecklistContent = `# TRIKONA ENGINEERING — CAD ENCLOSURE DESIGN CHECKLIST & SPEC
Organization: TRIKONA Hardware Engineering & Rapid Prototyping
Facility: Yeola / Nashik, Maharashtra, India | Contact: +91 9970113207

PROJECT: [Insert Project Name]
DATE: ${new Date().toLocaleDateString()}
VERSION: Rev 1.0 (Parasolid / STEP AP242)

1. MECHANICAL ENCLOSURE GEOMETRY & TOLERANCING
[ ] Wall Thickness: 1.5mm – 2.5mm uniform wall thickness throughout.
[ ] Internal Radii: Minimum 0.8mm internal blend radii to prevent stress concentrations.
[ ] Draft Angles: Minimum 1.0° – 1.5° on all vertical core/cavity surfaces for tooling.
[ ] Split-Line / Parting Line: Stepped tongue-and-groove or 0.8mm rebate lip for dust/IP54 sealing.
[ ] Fastener Bosses:
    - Screw Boss Outer Diameter: 2.2x screw nominal diameter.
    - Core Hole Diameter: Sized for ultrasonic / heat-stake brass threaded inserts (M2: 3.2mm, M3: 4.2mm).
    - Gusset Ribs: 0.6x nominal wall thickness to prevent sink marks.

2. PCB MOUNTING & CONNECTOR CLEARANCES
[ ] PCB Edge Clearance: Minimum 1.5mm spacing between PCB boundary and inner enclosure rib.
[ ] Connector Apertures: +0.4mm peripheral clearance for USB Type-C, RJ45, DC Jack ports.
[ ] Component Keepouts: 3.0mm Z-clearance above tallest electrolytic capacitor or inductor.
[ ] Button / Actuator Travel: 0.3mm pre-travel gap between 3D-printed plunger and tactile SMD switch.

3. DFM FIT VERIFICATION
[ ] STEP AP242 / native parasolid (.x_t) export checked for non-manifold edges.
[ ] Interference detection simulated with 0.15mm interference tolerance.
[ ] Ventilation slots: 1.5mm max aperture width to prevent ingress while enabling thermal convection.

TRIKONA SIGN-OFF:
Engineering Lead: Sai Kankrej (TRIKONA Yeola/Nashik)
`;

  // Template 2: PCB DRC Checklist
  const pcbDrcContent = `# TRIKONA ENGINEERING — MULTI-LAYER PCB DESIGN RULE CHECK (DRC)
Facility: TRIKONA Yeola / Nashik, Maharashtra | Phone/WhatsApp: +91 9970113207
Standard: IPC-2221B Generic Standard on Printed Board Design / IPC-A-610 Class 2

PROJECT TITLE: [Insert Hardware Project Name]
DATE: ${new Date().toLocaleDateString()}
STACKUP TARGET: 4-Layer FR-4 (1.6mm Finished Thickness, 1oz Outer / 1oz Inner Copper)

1. PHYSICAL TRACE & CLEARANCE CONSTRAINTS
[ ] Minimum Signal Trace Width: 6 mil (0.152mm) for standard yield; 4 mil for fine pitch.
[ ] Minimum Trace-to-Trace Clearance: 6 mil (0.152mm).
[ ] Minimum Trace-to-Copper Pour Clearance: 10 mil (0.254mm).
[ ] High-Voltage / Mains Clearance: Creepage and clearance compliant with IEC 60950 / 62368.

2. VIAS & HOLES
[ ] Minimum Mechanical Via Drill: 0.30mm (12 mil).
[ ] Minimum Annular Ring: 0.15mm (6 mil) around plated holes.
[ ] Solder Mask Opening: 2 mil (0.05mm) expansion per side.
[ ] Solder Mask Web (Dam): Minimum 4 mil (0.10mm) between adjacent SMD pads to eliminate bridges.
[ ] Tent Vias: All signal and ground test vias tented on both sides.

3. IMPEDANCE & HIGH SPEED ROUTING
[ ] Single-Ended 50Ω Transmission Lines: Sized to 12.5 mil width over Layer 2 Ground Reference.
[ ] Differential 90Ω (USB 2.0 / 3.0): 7 mil trace / 6 mil gap over unbroken ground plane.
[ ] Decoupling Capacitors: Placed within 1.5mm of IC VCC/VDD pins with direct via-in-pad or adjacent via.

4. EXPORT ARTIFACTS REQUIRED
[ ] RS-274X Extended Gerber Files (.gtl, .gbl, .gts, .gbs, .gto, .gbo, .gko).
[ ] Excellon NC Drill File (.drl / .txt) with plated and non-plated hole designations.
[ ] Centroid / Pick-and-Place File (.csv) with X, Y, Rotation, and Layer coordinates.
[ ] Bill of Materials (BOM) in TRIKONA standard CSV schema.
`;

  // Template 3: 3D Printing DFM & Infill Guide
  const d3DfmContent = `# TRIKONA RAPID FABRICATION — 3D PRINTING DFM & INFILL SPEC SHEET
Fabrication Facility: TRIKONA Rapid Prototyping Workcell, Yeola/Nashik
Equipment: High-Precision Direct-Drive CoreXY Printers (0.4mm Hardened Tool Steel Nozzles)

1. MATERIAL SELECTION PROTOCOL
- PLA / PLA-ST (Tough):
  * Best for: Rapid aesthetic mockups, dimensional enclosures, jigs & fixtures.
  * Heat Deflection Temp: 55°C | Layer Height: 0.12mm – 0.20mm | Shrinkage: <0.3%.
- PETG (Polyethylene Terephthalate Glycol):
  * Best for: Functional robotic brackets, outdoor sensor housings, chemical resistance.
  * Heat Deflection Temp: 75°C | Layer Height: 0.16mm – 0.24mm | Water absorption: Low.
- PA-CF (Carbon Fiber Reinforced Nylon):
  * Best for: High-torque motor mounts, drone arms, structural load-bearing linkages.
  * Heat Deflection Temp: 150°C | Tensile Strength: 95 MPa.

2. INFILL GEOMETRY SELECTION
- Gyroid Infill (20% – 35%):
  * Isotropic stress resistance across X, Y, and Z axes. Perfect for liquid/air enclosure seals.
- Grid / Rectilinear Infill (15% – 25%):
  * High-speed printing for quick form & fit checks.
- Honeycomb Infill (40% – 60%):
  * Maximum torsional rigidity for cantilevered arms and brackets.

3. BRASS THREADED INSERT SPECIFICATION (HEAT-SET TAPPING)
Thread Size | Hole Diameter (Top) | Hole Diameter (Bottom) | Min Boss Wall
M2          | 3.20 mm             | 3.00 mm                | 1.20 mm
M2.5        | 3.80 mm             | 3.60 mm                | 1.40 mm
M3          | 4.20 mm             | 4.00 mm                | 1.60 mm
M4          | 5.80 mm             | 5.60 mm                | 2.00 mm
`;

  // Template 4: Mutual Non-Disclosure Agreement (NDA)
  const mutualNdaContent = `MUTUAL NON-DISCLOSURE AND PROPRIETARY INFORMATION AGREEMENT

THIS AGREEMENT is entered into as of ${new Date().toLocaleDateString()}, by and between:

DISCLOSING PARTY:
${ndaClientName || '[Client / Company Name]'}
Representative: ${ndaSignerRole || '[Client Title / Founder]'}
Project Name: ${ndaProjectTitle || '[Hardware Project / Product Name]'}
(Hereinafter referred to as the "Client")

AND

RECEIVING & ENGINEERING PARTY:
TRIKONA Rapid Hardware Prototyping & Engineering
Representative: Sai Kankrej (Founder & Engineering Lead)
Facility Location: Yeola / Nashik, Maharashtra, India
Phone / WhatsApp: +91 9970113207
(Hereinafter referred to as "TRIKONA")

1. PURPOSE & SCOPE
The Parties wish to explore and engage in hardware engineering, computer-aided design (CAD), printed circuit board (PCB) schematic drafting, and physical 3D rapid prototyping services (the "Purpose").

2. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" includes, without limitation:
(a) Computer-Aided Design (CAD) files, including .STEP, .IGES, .STL, Parasolid, and SolidWorks/Fusion files;
(b) Circuit schematics, PCB Gerber files, Bill of Materials (BOM), firmware source code, and netlists;
(c) Proprietary inventions, mechanical mechanisms, product dimensions, and patentable innovations disclosed by the Client to TRIKONA.

3. OBLIGATIONS OF TRIKONA
TRIKONA expressly agrees:
(a) To hold all Confidential Information in strict confidence and not disclose it to any third party without prior written consent from the Client;
(b) To use Confidential Information solely for evaluating, fabricating, and delivering prototype assemblies under the Client's direction;
(c) Not to replicate, reverse engineer, or commercialize the Client's designs for any other entity or proprietary product;
(d) To securely archive or permanently delete client CAD/Gerber files upon written request.

4. INTELLECTUAL PROPERTY OWNERSHIP
The Client retains 100% exclusive worldwide ownership, title, copyright, and patent rights to all designs, 3D models, PCB schematics, and functional prototypes commissioned by the Client.

5. JURISDICTION
This Agreement shall be governed by and construed in accordance with the Laws of India, under the jurisdiction of the courts of Nashik, Maharashtra.

IN WITNESS WHEREOF, the Parties have executed this Mutual Non-Disclosure Agreement.

FOR THE CLIENT:
Name: ${ndaClientName || '__________________________'}
Role: ${ndaSignerRole || '__________________________'}
Date: ${new Date().toLocaleDateString()}

FOR TRIKONA ENGINEERING:
Name: Sai Kankrej
Role: Founder & Lead Mechatronics Engineer, TRIKONA
Facility: Yeola / Nashik, Maharashtra
WhatsApp: +91 9970113207
`;

  // Template 5: Bill of Materials CSV
  const bomCsvContent = `Item,Designator,Qty,Manufacturer,Manufacturer Part Number (MPN),Description,Package / Footprint,Mounting Type,Unit Price (INR),Supplier Link
1,U1,1,STMicroelectronics,STM32F405RGT6,32-Bit ARM Cortex-M4 MCU 168MHz 1MB Flash,LQFP-64,SMD,420.00,https://www.mouser.in
2,U2,1,Texas Instruments,TPS62130RGTR,Step-Down DC-DC Converter 3A 3-17V,QFN-16,SMD,95.00,https://www.mouser.in
3,C1 C2 C3,3,Murata Electronics,GRM188R61C106MA73D,10uF 16V Ceramic Capacitor X5R 10%,0603,SMD,2.50,https://www.mouser.in
4,R1 R2,2,Panasonic,ERJ-3EKF1002V,10k Ohm Resistor 1% 0.1W,0603,SMD,0.85,https://www.mouser.in
5,J1,1,GCT,USB4110-GF-A,USB Type-C 16-Pin Receptacle Right Angle,SMD+TH,Hybrid,38.00,https://www.mouser.in
6,H1 H2 H3 H4,4,Würth Elektronik,9774030360R,M3 Brass Threaded Heat-Stake Insert,M3x5.7mm,Heat-Set,12.00,https://www.mouser.in
`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-left space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Production Engineering Resources</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
          Engineering Templates &amp; DFM Hub
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed text-balance">
          Download battle-tested engineering checklists, export standard PCB rules, generate formal Non-Disclosure Agreements (NDAs), and run interactive Design-for-Manufacturability checks before hardware dispatch.
        </p>

        {/* Legal Advisory & Non-Warranty Scope Notice */}
        <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-400 space-y-1">
          <div className="font-mono text-[11px] uppercase text-cyan-400 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            Advisory Notice &amp; Scope Limitation
          </div>
          <p className="leading-relaxed">
            All engineering checklists, DRC guidelines, infill specifications, and template files are provided strictly for informational and reference purposes &ldquo;AS-IS&rdquo; without express or implied warranties. TRIKONA specializes in digital CAD modeling and PCB circuit design (schematics/Gerbers only); we do not etch or manufacture physical PCBs. Clients are exclusively responsible for independent validation, safety evaluations, and statutory certifications.
          </p>
        </div>
      </div>

      {/* Interactive DFM Analyzer Tool Embedded */}
      <section>
        <DfmAnalyzer />
      </section>

      {/* Templates Selector Section */}
      <section className="space-y-8 text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-800 pb-5 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
              Specification Templates
            </div>
            <h2 className="text-2xl font-bold text-white font-display">
              Hardware Design &amp; Legal Templates
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Click any template below to preview, copy to clipboard, or download directly to your workstation.
          </p>
        </div>

        {/* Tab navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { id: 'cad_checklist', label: 'CAD Enclosure Checklist', icon: Box, sub: 'Tolerance & Bosses' },
            { id: 'pcb_drc', label: 'PCB DRC & Gerber Guide', icon: Cpu, sub: 'IPC-2221 Specs' },
            { id: '3d_dfm', label: '3D Printing DFM Spec', icon: Layers, sub: 'Infill & Thread Inserts' },
            { id: 'mutual_nda', label: 'Bilateral Mutual NDA', icon: ShieldCheck, sub: 'Instant Legal Sign-Off' },
            { id: 'bom_template', label: 'Hardware BOM Schema', icon: Table, sub: 'Excel / CSV Structure' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTemplate === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTemplate(tab.id as any)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-slate-900 border-cyan-500/80 shadow-lg shadow-cyan-950/50'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-900 text-slate-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400" />}
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-display leading-tight">{tab.label}</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">{tab.sub}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Template Content Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          {/* Top Control Bar */}
          <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-semibold text-white uppercase">
                {activeTemplate === 'cad_checklist' && 'CAD_ENCLOSURE_CHECKLIST_v1.0.md'}
                {activeTemplate === 'pcb_drc' && 'PCB_DRC_GERBER_EXPORT_GUIDE.md'}
                {activeTemplate === '3d_dfm' && '3D_PRINTING_DFM_INFILL_SPEC.md'}
                {activeTemplate === 'mutual_nda' && 'TRIKONA_BILATERAL_NDA_TEMPLATE.txt'}
                {activeTemplate === 'bom_template' && 'TRIKONA_HARDWARE_BOM_SCHEMA.csv'}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Copy */}
              <button
                type="button"
                onClick={() => {
                  let content = '';
                  if (activeTemplate === 'cad_checklist') content = cadChecklistContent;
                  else if (activeTemplate === 'pcb_drc') content = pcbDrcContent;
                  else if (activeTemplate === '3d_dfm') content = d3DfmContent;
                  else if (activeTemplate === 'mutual_nda') content = mutualNdaContent;
                  else if (activeTemplate === 'bom_template') content = bomCsvContent;
                  handleCopy(activeTemplate, content);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                {copied === activeTemplate ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>

              {/* Download */}
              <button
                type="button"
                onClick={() => {
                  if (activeTemplate === 'cad_checklist') {
                    handleDownload('TRIKONA_CAD_Enclosure_Checklist.md', cadChecklistContent, 'text/markdown');
                  } else if (activeTemplate === 'pcb_drc') {
                    handleDownload('TRIKONA_PCB_DRC_Guide.md', pcbDrcContent, 'text/markdown');
                  } else if (activeTemplate === '3d_dfm') {
                    handleDownload('TRIKONA_3D_Printing_DFM_Spec.md', d3DfmContent, 'text/markdown');
                  } else if (activeTemplate === 'mutual_nda') {
                    handleDownload('TRIKONA_Mutual_NDA.txt', mutualNdaContent, 'text/plain');
                  } else if (activeTemplate === 'bom_template') {
                    handleDownload('TRIKONA_Hardware_BOM_Template.csv', bomCsvContent, 'text/csv');
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer shadow-sm shadow-cyan-950"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download File</span>
              </button>

              {/* Direct WhatsApp Share */}
              <a
                href={`https://wa.me/919970113207?text=${encodeURIComponent(
                  `Hello TRIKONA, I reviewed the ${activeTemplate.replace('_', ' ').toUpperCase()} template on your website and would like to proceed with my project design.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/70 hover:bg-emerald-950 border border-emerald-800/80 rounded-lg transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-emerald-400" />
                <span className="hidden sm:inline">WhatsApp Inquire</span>
              </a>
            </div>
          </div>

          {/* Special Customizer for NDA if selected */}
          {activeTemplate === 'mutual_nda' && (
            <div className="p-4 sm:p-6 bg-slate-950/70 border-b border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Your Name / Organization
                </label>
                <input
                  type="text"
                  value={ndaClientName}
                  onChange={(e) => setNdaClientName(e.target.value)}
                  placeholder="e.g. AeroDynamics Lab Ltd."
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Project / Product Title
                </label>
                <input
                  type="text"
                  value={ndaProjectTitle}
                  onChange={(e) => setNdaProjectTitle(e.target.value)}
                  placeholder="e.g. Autonomous Agri-Rover Sensor Head"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Signee Role
                </label>
                <input
                  type="text"
                  value={ndaSignerRole}
                  onChange={(e) => setNdaSignerRole(e.target.value)}
                  placeholder="e.g. Founder &amp; Chief Engineer"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          )}

          {/* Template Text Display */}
          <div className="p-6 overflow-x-auto max-h-[500px]">
            <pre className="font-mono text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap select-all">
              {activeTemplate === 'cad_checklist' && cadChecklistContent}
              {activeTemplate === 'pcb_drc' && pcbDrcContent}
              {activeTemplate === '3d_dfm' && d3DfmContent}
              {activeTemplate === 'mutual_nda' && mutualNdaContent}
              {activeTemplate === 'bom_template' && bomCsvContent}
            </pre>
          </div>
        </div>
      </section>

      {/* Direct Inbound Conversion Section */}
      <section className="bg-gradient-to-r from-slate-900 via-cyan-950/20 to-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
          Need a Custom Engineering Spec for Your Startup?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Chat directly with our mechatronics engineering team at Yeola/Nashik. We review initial CAD STEP models and PCB schematics within 2 to 4 hours.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <a
            href="https://wa.me/919970113207?text=Hello%20TRIKONA%2C%20I%20have%20custom%20engineering%20specifications%20for%20my%20hardware%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-emerald-400 bg-emerald-950/70 hover:bg-emerald-950 border border-emerald-800/80 rounded-xl transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-emerald-400" />
            <span>Direct WhatsApp (+91 9970113207)</span>
          </a>
        </div>
      </section>
    </div>
  );
};
