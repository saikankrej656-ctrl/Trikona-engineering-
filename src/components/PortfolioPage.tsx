import React, { useState } from 'react';
import { Box, Cpu, Layers, ExternalLink, ShieldCheck, ArrowRight, MessageCircle, CheckCircle2 } from 'lucide-react';
import { ThreeDModelViewer } from './ThreeDModelViewer';

type PortfolioCategory = 'all' | 'cad' | 'pcb' | '3d-printing';

interface ProjectItem {
  id: string;
  title: string;
  category: 'cad' | 'pcb' | '3d-printing';
  clientSector: string;
  image: string;
  summary: string;
  specs: {
    toleranceOrLayer: string;
    materialOrCopper: string;
    infillOrLayers: string;
    leadTime: string;
  };
  keyFeatures: string[];
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'MEC-ENC-001 Industrial Robotics Chassis & Enclosure',
    category: 'cad',
    clientSector: 'Autonomous Robotics',
    image: '/src/assets/images/cad_modeling_showcase_1794039335549.jpg',
    summary: 'Parametric CAD housing with snap-fit cantilever beams, internal PCB standoffs, and M3 brass heat-set bosses engineered for harsh field vibrations.',
    specs: {
      toleranceOrLayer: '±0.05 mm CNC / ±0.1 mm Rapid',
      materialOrCopper: 'AL-6061 / PETG Matte',
      infillOrLayers: 'ASME Y14.5 GD&T compliant',
      leadTime: '48h Dispatch',
    },
    keyFeatures: ['Internal cable routing channels', 'Tool-less snap-fit inspection cover', 'Zero-play sliding dovetail latch'],
  },
  {
    id: 'proj-2',
    title: 'PROTOS V2.1 Multi-Layer Biosensing & MCU Motherboard',
    category: 'pcb',
    clientSector: 'Biomedical IoT',
    image: '/src/assets/images/pcb_circuit_showcase_1794039336507.jpg',
    summary: 'High-speed 4-layer impedance-controlled board with isolated analog front-end, dedicated power polygon pours, and sub-0.2mm micro-vias.',
    specs: {
      toleranceOrLayer: '4 mil / 4 mil Min Trace/Space',
      materialOrCopper: '1 oz FR4 / ENIG Finish',
      infillOrLayers: '4-Layer Symmetrical Stackup',
      leadTime: '72h Turnaround',
    },
    keyFeatures: ['50Ω single-ended & 90Ω USB differential pairs', 'Thermal via arrays beneath switching regulator', 'IPC-A-610 Class 2 assembly netlist'],
  },
  {
    id: 'proj-3',
    title: 'AERO-ARM Carbon Fiber High-Stress Drone Mount',
    category: '3d-printing',
    clientSector: 'Aerospace & UAV',
    image: '/src/assets/images/additive_proto_showcase_1794039335483.jpg',
    summary: 'Continuous carbon fiber chopped nylon (PA-CF) structural motor arm bracket with isotropic gyroid internal matrix withstanding 320N shear load.',
    specs: {
      toleranceOrLayer: '0.12 mm Layer Resolution',
      materialOrCopper: 'PA-CF (15% Carbon Fiber Nylon)',
      infillOrLayers: '45% Gyroid Isotropic Infill',
      leadTime: '24h Dispatch',
    },
    keyFeatures: ['155°C heat deflection temperature', 'M4 ultrasonic brass thread inserts', 'Anti-vibration motor dampener mount'],
  },
  {
    id: 'proj-4',
    title: 'GATEWAY-IP67 Ruggedized Telemetry Enclosure',
    category: 'cad',
    clientSector: 'Smart Agriculture & IoT',
    image: '/src/assets/images/cad_modeling_showcase_1794039335549.jpg',
    summary: 'Waterproof field station enclosure featuring silicone O-ring gasket compression channel, external DIN-rail mounting ears, and SMA antenna port.',
    specs: {
      toleranceOrLayer: '±0.08 mm Gasket Compression',
      materialOrCopper: 'UV-Stabilized ASA / Aluminum',
      infillOrLayers: 'IP67 Environmental Rating',
      leadTime: '48h Prototype',
    },
    keyFeatures: ['Tongue-and-groove perimeter seal', 'Integrated solar bracket boss mounts', 'Pass-through cable gland recesses'],
  },
  {
    id: 'proj-5',
    title: 'PWR-CORE 65W GaN High-Density Power Board',
    category: 'pcb',
    clientSector: 'Power Electronics',
    image: '/src/assets/images/pcb_circuit_showcase_1794039336507.jpg',
    summary: 'Heavy 2oz copper multi-layer board for ultra-compact GaN power converters with optimized creepage/clearance and Kelvin sense traces.',
    specs: {
      toleranceOrLayer: '0.15 mm High-Voltage Clearance',
      materialOrCopper: '2 oz Heavy Copper / TG170 FR4',
      infillOrLayers: '4-Layer Thermal Core',
      leadTime: '4 Days Lab Test',
    },
    keyFeatures: ['Stitched ground return planes', '0.3mm drill thermal matrix', 'Low-ESR ceramic decoupling array'],
  },
  {
    id: 'proj-6',
    title: 'EXO-BRACE Customized Ergonomic Wearable Jigs',
    category: '3d-printing',
    clientSector: 'Medical Mechatronics',
    image: '/src/assets/images/additive_proto_showcase_1794039335483.jpg',
    summary: 'Anatomically contoured exoskeleton arm joint fabricated in semi-flexible tough PETG with variable perimeter wall density and flush M3 hardware.',
    specs: {
      toleranceOrLayer: '0.16 mm Layer Adaptive Slicing',
      materialOrCopper: 'Tough Impact PETG',
      infillOrLayers: '35% 3D Honeycomb Infill',
      leadTime: '24h Rapid Fab',
    },
    keyFeatures: ['Zero skin abrasion radius edges', 'Lightweight 120g total weight', 'Modular snap-in sensor brackets'],
  },
];

interface PortfolioPageProps {
  onNavigateToQuote: (service?: 'cad' | 'pcb' | '3d-printing') => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onNavigateToQuote }) => {
  const [filter, setFilter] = useState<PortfolioCategory>('all');

  const filteredProjects = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  const startWhatsAppInquiry = (projectTitle: string) => {
    const text = `Hello TRIKONA, I was reviewing your portfolio project "${projectTitle}" and would like to discuss engineering a similar hardware solution for our team.`;
    window.open(`https://wa.me/919970113207?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-left space-y-3 max-w-3xl">
        <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
          Hardware Engineering Case Studies
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
          Engineering Portfolio &amp; Prototyping Showcase
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Inspect our field-tested mechanical enclosures, multi-layer high-speed circuit boards, and functional additive prototypes. Built with zero MOQ and strict NDA confidentiality.
        </p>
      </div>

      {/* Interactive 3D Model Inspection Canvas */}
      <section className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
            Interactive 3D Hardware Canvas
          </div>
          <span className="text-xs text-slate-400">
            Click, drag, and rotate the digital enclosure directly in your browser
          </span>
        </div>
        <ThreeDModelViewer />
      </section>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
          {[
            { id: 'all', label: 'All Projects (6)' },
            { id: 'cad', label: '3D CAD Models (2)' },
            { id: 'pcb', label: 'PCB Schematics (2)' },
            { id: '3d-printing', label: '3D Printed Prototypes (2)' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id as any)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === cat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Showing {filteredProjects.length} Verified Assemblies
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all group"
          >
            <div>
              {/* Card Image Banner */}
              <div className="relative h-52 overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Sector Chip */}
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-cyan-400 border border-slate-700/60">
                  {project.clientSector}
                </div>

                {/* Lead-Time Dispatch Badge */}
                <div className="absolute top-3 right-3 bg-emerald-950/90 text-emerald-300 border border-emerald-800/80 px-2 py-0.5 rounded text-[10px] font-mono font-semibold">
                  ⚡ {project.specs.leadTime}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4 text-left">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  {project.category === 'cad' && <Box className="w-3.5 h-3.5" />}
                  {project.category === 'pcb' && <Cpu className="w-3.5 h-3.5" />}
                  {project.category === '3d-printing' && <Layers className="w-3.5 h-3.5" />}
                  <span className="uppercase font-semibold">
                    {project.category === 'cad' ? 'CAD 3D Modeling' : project.category === 'pcb' ? 'PCB Circuit Layout' : '3D Additive Fabrication'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white font-display leading-snug">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.summary}
                </p>

                {/* Technical Specs Matrix */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 text-[11px] font-mono">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Tolerance / Layer:</span>
                    <span className="text-slate-200 font-semibold">{project.specs.toleranceOrLayer}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Material / Spec:</span>
                    <span className="text-cyan-400 font-semibold">{project.specs.materialOrCopper}</span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-slate-800/60">
                    <span className="text-slate-500 block text-[10px]">Internal Struct / Architecture:</span>
                    <span className="text-slate-300">{project.specs.infillOrLayers}</span>
                  </div>
                </div>

                {/* Key Features Bullet points */}
                <div className="space-y-1 pt-1">
                  {project.keyFeatures.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 pt-0 border-t border-slate-800/60 flex items-center justify-between gap-3 mt-4">
              <button
                type="button"
                onClick={() => startWhatsAppInquiry(project.title)}
                className="flex-1 py-2 px-3 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 hover:bg-emerald-950 border border-emerald-800/80 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-emerald-400" />
                <span>Inquire on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToQuote(project.category)}
                className="p-2 text-slate-400 hover:text-white bg-slate-950 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors cursor-pointer"
                title="Contact Engineering"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
