import { ClientReview, ServiceArticle } from '../types';

export const INITIAL_REVIEWS: ClientReview[] = [];


export const SERVICE_ARTICLES: Record<'cad' | 'pcb' | '3d-printing', ServiceArticle> = {
  cad: {
    id: 'cad',
    title: 'Computer-Aided Design (CAD) & 3D Modeling',
    subtitle: 'Parametric Solid Modeling, Enclosure Architecture, Tolerancing & Fit Validation',
    shortDesc: 'End-to-end parametric CAD modeling engineered for structural durability, assembly ergonomics, and high-yield manufacturing (DFM).',
    image: '/src/assets/images/cad_modeling_showcase_1794039335549.jpg',
    turnaround: '2 – 4 Days',
    tolerances: '±0.02 mm (CNC) / ±0.15 mm (3D)',
    deliverables: [
      'Parametric Native Files (SolidWorks, STEP AP214/AP242, IGES)',
      'Detailed 2D Manufacturing Drawings with GD&T (ISO 1101 / ASME Y14.5)',
      'Exploded Assembly Models with Bill of Materials (BOM)',
      'Interference Fit & Tolerance Stack-Up Reports',
    ],
    articleSections: [
      {
        heading: 'Parametric Mechanical Modeling & Digital Prototyping',
        body: 'Every physical product begins with robust geometric constraints. At TRIKONA, we construct native parametric models using history-based feature trees, ensuring that revision changes propagate cleanly across mating parts without broken mates or orphan sketches. Whether designing slim handheld consumer electronics or ruggedized industrial IoT housings, our mechanical architecture focuses on draft angles, uniform wall thicknesses, and internal structural ribbing.',
        keyPoints: [
          'Fully constrained sketches with parametric driven dimension variables',
          'Draft angle verification (1.0° – 2.5°) for tooling release',
          'Corner fillet optimization to mitigate stress concentration factors',
        ],
      },
      {
        heading: 'Tolerance Stack-Up Analysis & Fit Clearance',
        body: 'A digital model that fits on screen can seize or rattle in real production. We perform systematic root-sum-square (RSS) and worst-case tolerance stack-up analysis across all mated components. From sliding dovetail latches to press-fit silicone gaskets, we define precise clearance allowances according to ISO 2768-m standards.',
        keyPoints: [
          'Calculated clearances: 0.15 mm for snug sliding, 0.30 mm for standard clearance',
          'Snap-fit cantilever beam calculations preventing plastic strain exceedance',
          'Standardized boss diameters calibrated for sonic welding or heat-set inserts',
        ],
      },
      {
        heading: 'Design for Assembly (DFA) & Structural Testing',
        body: 'Before cutting metal or sending files to high-volume injection molding, we simulate the complete assembly sequence. We verify tool clearance for torque drivers, ensure fastener standardization (minimizing screw variety), and incorporate poke-yoke alignment features so assemblers cannot install internal PCBs backwards.',
        keyPoints: [
          'Standardization to metric socket head / button head fasteners (M2, M2.5, M3)',
          'Asymmetric indexing pins preventing 180° inversion errors',
          'Virtual interference checks across the entire mechanical envelope',
        ],
      },
    ],
    specTable: [
      { parameter: 'Geometric Standards', specification: 'ASME Y14.5-2018 / ISO 1101', standards: 'Industry Standard' },
      { parameter: 'General Machining Tolerances', specification: 'ISO 2768-m (±0.05 mm to ±0.2 mm)', standards: 'ISO Metric' },
      { parameter: 'Nominal Wall Thickness', specification: '1.8 mm – 3.2 mm (Uniform)', standards: 'DFM Recommended' },
      { parameter: 'Fastener Boss Threading', specification: 'Metric Brass Heat-Set Inserts (M2–M4)', standards: 'PEM / McMaster' },
      { parameter: 'Export Deliverables', specification: 'STEP AP242, Parasolid (.x_t), PDF 2D Drawings', standards: 'Multi-CAD Universal' },
    ],
  },
  pcb: {
    id: 'pcb',
    title: 'PCB Design & Circuit Schematic Drafting',
    subtitle: 'Schematic Capture, Multi-Layer Routing, Impedance Control & Footprinting',
    shortDesc: 'High-speed, low-noise multi-layer printed circuit board design tailored for signal integrity, thermal dissipation, and automated SMT assembly.',
    image: '/src/assets/images/pcb_circuit_showcase_1794039336507.jpg',
    turnaround: '3 – 5 Days',
    tolerances: '4 mil trace/space, 0.2mm micro-vias',
    deliverables: [
      'Production-Ready RS-274X Extended Gerber & ODB++ Files',
      'IPC-D-356 Electrical Netlist & NC Drill Files',
      'Complete Bill of Materials (BOM) with Digikey/Mouser Source Links',
      'Pick & Place (Centroid) CPL Assembly Files',
    ],
    articleSections: [
      {
        heading: 'Schematic Capture & Component Architecture',
        body: 'A robust PCB starts with a pristine schematic hierarchy. We implement modular block designs separating noisy high-power switching regulators from sensitive analog-to-digital sensor inputs. Every active IC is protected with dedicated decoupling capacitors located in direct loop proximity to power pins, along with TVS diode arrays on exposed connectors.',
        keyPoints: [
          'Hierarchical schematic capture in Altium Designer and KiCad v8',
          'Zero-tolerance electrical rules check (ERC) for floating nets and bus conflicts',
          'Part lifecycle validation to eliminate obsolete (EOL) components before fabrication',
        ],
      },
      {
        heading: 'Multi-Layer Stackup & Controlled Impedance Routing',
        body: 'For high-speed digital lines (USB 2.0/3.0, PCIe, SPI, I2C, RF 2.4GHz), controlled dielectric layer thicknesses are paramount. We construct symmetrical 4-layer and 6-layer stackups with continuous solid reference ground planes directly beneath high-speed signals. We maintain 50Ω single-ended and 90Ω/100Ω differential pair geometry throughout the routing phase.',
        keyPoints: [
          'Calculated microstrip & stripline trace widths using IPC-2152 standards',
          'Length-matched differential pairs with skew margins under ±0.15 mm',
          'Minimization of layer transitions and via stubs in RF / clock channels',
        ],
      },
      {
        heading: 'Thermal Management & Trace Width Optimization',
        body: 'Power delivery tracks carrying multiple amperes must not overheat under peak loads. We calculate copper cross-sectional areas based on 1oz (35µm) and 2oz (70µm) weights, integrating thermal relief spoke patterns on ground pads and stitched thermal via arrays beneath exposed thermal pads (QFN/DFN).',
        keyPoints: [
          'IPC-2221 current capacity sizing ensuring temperature rise < 10°C',
          'Thermal via arrays with 0.3mm drill pitch beneath power switches',
          'Creepage and clearance distances verified for high-voltage isolation',
        ],
      },
    ],
    specTable: [
      { parameter: 'Layer Count Capabilities', specification: '2 to 8 Layers (Rigid / Flex / Rigid-Flex)', standards: 'IPC Class 2 & 3' },
      { parameter: 'Minimum Trace / Clearance', specification: '0.10 mm / 0.10 mm (4 mil / 4 mil)', standards: 'Standard Fab' },
      { parameter: 'Controlled Impedance', specification: '50Ω Single-Ended / 90Ω & 100Ω Diff Pair ±8%', standards: 'Polar Speedstack' },
      { parameter: 'Surface Finishes', specification: 'ENIG (Electroless Nickel Immersion Gold), HASL', standards: 'RoHS Compliant' },
      { parameter: 'Component Footprints', specification: '0201 passives, 0.4mm pitch QFN/BGA', standards: 'IPC-7351B' },
    ],
  },
  '3d-printing': {
    id: '3d-printing',
    title: '3D Printing & Physical Rapid Prototyping',
    subtitle: 'Functional Additive Manufacturing, Material Selection & Rapid Iteration',
    shortDesc: 'Precision physical prototyping utilizing industrial FDM and SLA technologies with engineering-grade thermoplastics for rapid mechanical validation.',
    image: '/src/assets/images/additive_proto_showcase_1794039335483.jpg',
    turnaround: '24 – 48 Hours',
    tolerances: '±0.12 mm layer accuracy',
    deliverables: [
      'Functional Assembled Physical Prototypes',
      'Installed Brass Threaded Heat-Set Inserts',
      'Material Certification & Dimensional Inspection Report',
      'Optimized Print Slicing Profiles (.3MF / G-code)',
    ],
    articleSections: [
      {
        heading: 'Rapid Additive Fabrication & Machine Calibration',
        body: 'Transforming CAD models into tactile prototypes within hours enables rapid iteration cycles that prevent costly tooling errors. Our in-house farm of industrial high-flow direct-drive printers is calibrated for dimensional repeatability using resonance compensation (input shaping) and linear advance pressure control.',
        keyPoints: [
          'Direct-drive all-metal hotends capable of continuous 300°C chamber extrusion',
          'Automatic bed mesh leveling with sub-5 micron inductive probing',
          'Controlled ambient chambers eliminating warping in engineering polymers',
        ],
      },
      {
        heading: 'Technical Material Selection Matrix',
        body: 'Choosing the right polymer determines whether a prototype survives drop testing, outdoor UV exposure, or thermal proximity to hot electronics. We offer custom prints in PLA+ for rapid visual checks, PETG for chemical and moisture resistance, ABS/ASA for outdoor weatherability, and Carbon-Fiber Nylon (PA-CF) for high-rigidity structural chassis.',
        keyPoints: [
          'PLA+: Rapid visual ergonomics, low shrinkage, high tensile rigidity',
          'PETG: Impact resistance, flexible snap-fits, continuous 70°C resistance',
          'PA-CF (Carbon Fiber Nylon): Extreme stiffness, 150°C HDT, lightweight strength',
        ],
      },
      {
        heading: 'Infill Geometries & Post-Print Thread Assembly',
        body: 'Solid infill is rarely optimal for strength or weight. We deploy isotropic Gyroid and 3D Honeycomb internal matrices that distribute mechanical stresses uniformly across all axes. Additionally, for components requiring repeated disassembly, we install threaded brass M2, M3, and M4 inserts using temperature-calibrated press heads.',
        keyPoints: [
          'Gyroid infill (25% – 50%) for multidirectional shear resistance',
          '3 to 5 perimeter wall loops providing 80% of total part tensile strength',
          'Ultrasonic / heat-set brass threaded inserts with pull-out strengths > 250N',
        ],
      },
    ],
    specTable: [
      { parameter: 'Max Build Volume', specification: '300 × 300 × 330 mm', standards: 'Continuous Bed' },
      { parameter: 'Layer Resolution', specification: '0.08 mm (Fine) to 0.28 mm (Rapid draft)', standards: 'Variable Slicing' },
      { parameter: 'Available Materials', specification: 'PLA, PETG, ABS, ASA, TPU 95A, PA-CF (Nylon)', standards: 'ISO Grade' },
      { parameter: 'Hardware Integration', specification: 'M2 / M2.5 / M3 / M4 Brass Heat-Set Inserts', standards: 'ISO 261' },
      { parameter: 'Surface Post-Processing', specification: 'Deburring, bead-blasting, vapor smoothing, matte paint', standards: 'Lab Finished' },
    ],
  },
};
