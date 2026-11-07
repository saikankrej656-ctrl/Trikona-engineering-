import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Box, ZoomIn, ZoomOut, Maximize2, Layers, Cpu, Compass } from 'lucide-react';

type ModelPreset = 'enclosure' | 'drone_arm' | 'heatsink' | 'robot_bracket';

interface ModelMeta {
  id: ModelPreset;
  title: string;
  partNumber: string;
  dims: string;
  volume: string;
  weight: string;
  leadTime: string;
  tolerance: string;
}

const PRESETS: Record<ModelPreset, ModelMeta> = {
  enclosure: {
    id: 'enclosure',
    title: 'Precision Mechatronics Enclosure',
    partNumber: 'MEC-ENC-04A',
    dims: '110 × 75 × 35 mm',
    volume: '88.4 cm³',
    weight: '92 g (PETG)',
    leadTime: '24–48 Hours',
    tolerance: '±0.05 mm',
  },
  drone_arm: {
    id: 'drone_arm',
    title: 'Quadcopter Motor Arm & Strut',
    partNumber: 'AERO-ARM-220',
    dims: '160 × 42 × 18 mm',
    volume: '44.2 cm³',
    weight: '58 g (PA-CF)',
    leadTime: '24 Hours',
    tolerance: '±0.04 mm',
  },
  heatsink: {
    id: 'heatsink',
    title: 'Staggered Pin-Fin Thermal Heat Sink',
    partNumber: 'THRM-SINK-80',
    dims: '80 × 80 × 25 mm',
    volume: '62.0 cm³',
    weight: '168 g (Al 6061)',
    leadTime: '48 Hours',
    tolerance: '±0.02 mm',
  },
  robot_bracket: {
    id: 'robot_bracket',
    title: 'Dual-Axis Robotic Servo Bracket',
    partNumber: 'ROBO-JNT-M3',
    dims: '65 × 50 × 45 mm',
    volume: '36.5 cm³',
    weight: '48 g (ABS-ESD)',
    leadTime: '24 Hours',
    tolerance: '±0.05 mm',
  },
};

export const ThreeDModelViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeModel, setActiveModel] = useState<ModelPreset>('enclosure');
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [exploded, setExploded] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [materialColor, setMaterialColor] = useState<string>('#06b6d4');

  // References to three objects for interaction
  const sceneRef = useRef<THREE.Scene | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Function to build chosen CAD geometry inside group
  const buildModelGeometry = (group: THREE.Group, model: ModelPreset, colorHex: string, isWire: boolean, isExplode: boolean) => {
    // Clear previous children
    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
      if ((child as any).geometry) (child as any).geometry.dispose();
    }

    const mainMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colorHex),
      metalness: 0.65,
      roughness: 0.35,
      wireframe: isWire,
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.25,
      wireframe: isWire,
    });

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      metalness: 0.9,
      roughness: 0.15,
      wireframe: isWire,
    });

    if (model === 'enclosure') {
      // 1. Base Enclosure
      const baseGeo = new THREE.BoxGeometry(3.6, 1.0, 2.4);
      const baseMesh = new THREE.Mesh(baseGeo, mainMat);
      baseMesh.position.y = isExplode ? -0.4 : 0;
      group.add(baseMesh);

      // 2. Lid (Separates on exploded view)
      const lidGeo = new THREE.BoxGeometry(3.7, 0.2, 2.5);
      const lidMesh = new THREE.Mesh(lidGeo, accentMat);
      lidMesh.position.y = isExplode ? 1.4 : 0.55;
      group.add(lidMesh);

      // 3. Brass Threaded Inserts (4 corners)
      const bossGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.8, 16);
      const bossPositions = [
        [-1.5, 0.1, -0.9],
        [1.5, 0.1, -0.9],
        [-1.5, 0.1, 0.9],
        [1.5, 0.1, 0.9],
      ];
      bossPositions.forEach(([x, y, z]) => {
        const boss = new THREE.Mesh(bossGeo, brassMat);
        boss.position.set(x, isExplode ? y - 0.4 : y, z);
        group.add(boss);
      });

      // 4. PCB Board
      const pcbGeo = new THREE.BoxGeometry(3.0, 0.05, 1.8);
      const pcbMat = new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.4, wireframe: isWire });
      const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
      pcbMesh.position.y = isExplode ? 0.3 : 0.05;
      group.add(pcbMesh);

      // 5. USB-C cutout
      const portGeo = new THREE.BoxGeometry(0.6, 0.2, 0.1);
      const portMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
      const portMesh = new THREE.Mesh(portGeo, portMat);
      portMesh.position.set(0, isExplode ? -0.3 : 0.1, 1.21);
      group.add(portMesh);

    } else if (model === 'drone_arm') {
      // Main hollow arm beam
      const armGeo = new THREE.BoxGeometry(4.2, 0.35, 0.5);
      const armMesh = new THREE.Mesh(armGeo, mainMat);
      group.add(armMesh);

      // Motor mount circular head
      const motorMountGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.4, 24);
      const motorMountMesh = new THREE.Mesh(motorMountGeo, accentMat);
      motorMountMesh.position.set(2.1, isExplode ? 0.5 : 0.1, 0);
      group.add(motorMountMesh);

      // Motor shaft center hole
      const holeGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.42, 16);
      const holeMat = new THREE.MeshBasicMaterial({ color: 0x0b0f19 });
      const holeMesh = new THREE.Mesh(holeGeo, holeMat);
      holeMesh.position.set(2.1, isExplode ? 0.5 : 0.1, 0);
      group.add(holeMesh);

      // Chassis mounting block at opposite end
      const chassisGeo = new THREE.BoxGeometry(0.8, 0.7, 0.8);
      const chassisMesh = new THREE.Mesh(chassisGeo, accentMat);
      chassisMesh.position.set(-2.0, isExplode ? -0.4 : 0, 0);
      group.add(chassisMesh);

      // Bolt holes
      const boltPositions = [
        [-2.2, 0, -0.25],
        [-2.2, 0, 0.25],
        [-1.8, 0, -0.25],
        [-1.8, 0, 0.25],
      ];
      boltPositions.forEach(([x, y, z]) => {
        const b = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.75, 12), brassMat);
        b.position.set(x, isExplode ? -0.4 : y, z);
        group.add(b);
      });

    } else if (model === 'heatsink') {
      // Solid base plate
      const baseGeo = new THREE.BoxGeometry(3.2, 0.3, 3.2);
      const baseMesh = new THREE.Mesh(baseGeo, mainMat);
      baseMesh.position.y = -0.5;
      group.add(baseMesh);

      // Array of pin fins
      const finGeo = new THREE.BoxGeometry(0.12, 1.4, 0.12);
      const count = 7;
      const step = 2.6 / (count - 1);
      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          const finMesh = new THREE.Mesh(finGeo, accentMat);
          const x = -1.3 + i * step;
          const z = -1.3 + j * step;
          const yOffset = isExplode ? 0.6 : 0.35;
          finMesh.position.set(x, yOffset, z);
          group.add(finMesh);
        }
      }

      // Mounting corner holes
      const cornerGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.32, 12);
      const corners = [
        [-1.4, -0.5, -1.4],
        [1.4, -0.5, -1.4],
        [-1.4, -0.5, 1.4],
        [1.4, -0.5, 1.4],
      ];
      corners.forEach(([x, y, z]) => {
        const c = new THREE.Mesh(cornerGeo, brassMat);
        c.position.set(x, y, z);
        group.add(c);
      });

    } else if (model === 'robot_bracket') {
      // U-channel robotic bracket
      const bottomGeo = new THREE.BoxGeometry(2.4, 0.25, 2.0);
      const bottomMesh = new THREE.Mesh(bottomGeo, mainMat);
      bottomMesh.position.y = -0.7;
      group.add(bottomMesh);

      const sideGeo = new THREE.BoxGeometry(0.25, 1.8, 2.0);
      const side1Mesh = new THREE.Mesh(sideGeo, mainMat);
      side1Mesh.position.set(-1.1, isExplode ? 0.3 : 0.1, 0);
      group.add(side1Mesh);

      const side2Mesh = new THREE.Mesh(sideGeo, mainMat);
      side2Mesh.position.set(1.1, isExplode ? 0.3 : 0.1, 0);
      group.add(side2Mesh);

      // Bearing hubs on both sides
      const hubGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.4, 20);
      hubGeo.rotateZ(Math.PI / 2);

      const hub1 = new THREE.Mesh(hubGeo, brassMat);
      hub1.position.set(-1.15, isExplode ? 0.6 : 0.4, 0);
      group.add(hub1);

      const hub2 = new THREE.Mesh(hubGeo, brassMat);
      hub2.position.set(1.15, isExplode ? 0.6 : 0.4, 0);
      group.add(hub2);

      // Lightweighting skeletal ribs
      const ribGeo = new THREE.CylinderGeometry(0.1, 0.1, 2.0, 12);
      ribGeo.rotateZ(Math.PI / 2);
      const rib = new THREE.Mesh(ribGeo, accentMat);
      rib.position.set(0, -0.2, 0.6);
      group.add(rib);
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 420;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(5.5, 4.2, 6.5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x06b6d4, 2.2);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight2.position.set(-6, -4, -5);
    scene.add(dirLight2);

    // 5. Build Initial Group
    const group = new THREE.Group();
    meshGroupRef.current = group;
    buildModelGeometry(group, activeModel, materialColor, wireframe, exploded);
    scene.add(group);

    // 6. Grid helper for blueprint workbench feel
    const gridHelper = new THREE.GridHelper(10, 20, 0x06b6d4, 0x1e293b);
    gridHelper.position.y = -1.3;
    scene.add(gridHelper);

    // 7. Mouse Orbit interaction handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !meshGroupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      meshGroupRef.current.rotation.y += deltaX * 0.01;
      meshGroupRef.current.rotation.x += deltaY * 0.01;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // 8. Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (autoRotate && meshGroupRef.current && !isDraggingRef.current) {
        meshGroupRef.current.rotation.y += 0.007;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 9. Resize Observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, []);

  // Re-build geometry whenever model, color, wireframe, or exploded changes
  useEffect(() => {
    if (meshGroupRef.current) {
      buildModelGeometry(meshGroupRef.current, activeModel, materialColor, wireframe, exploded);
    }
  }, [activeModel, materialColor, wireframe, exploded]);

  const handleZoom = (direction: 'in' | 'out') => {
    if (!cameraRef.current) return;
    const factor = direction === 'in' ? 0.85 : 1.15;
    cameraRef.current.position.multiplyScalar(factor);
  };

  const resetCamera = () => {
    if (!cameraRef.current || !meshGroupRef.current) return;
    cameraRef.current.position.set(5.5, 4.2, 6.5);
    cameraRef.current.lookAt(0, 0, 0);
    meshGroupRef.current.rotation.set(0, 0, 0);
  };

  const meta = PRESETS[activeModel];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden relative group space-y-0">
      {/* Top Model Selector Tabs */}
      <div className="p-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(Object.keys(PRESETS) as ModelPreset[]).map((key) => {
            const p = PRESETS[key];
            const isCur = activeModel === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveModel(key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  isCur
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/60'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {p.title}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {/* Exploded View Toggle */}
          <button
            type="button"
            onClick={() => setExploded(!exploded)}
            className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors cursor-pointer ${
              exploded
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/60'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
            title="Inspect Internal Clearance"
          >
            {exploded ? 'Exploded: ON' : 'Assembly: ASSEMBLED'}
          </button>

          {/* Wireframe toggle */}
          <button
            type="button"
            onClick={() => setWireframe(!wireframe)}
            className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors cursor-pointer ${
              wireframe
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {wireframe ? 'Mesh: WIRE' : 'Mesh: SOLID'}
          </button>

          {/* Auto rotate toggle */}
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-1.5 rounded border transition-colors cursor-pointer ${
              autoRotate
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
            title="Toggle Auto-Rotation"
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
          </button>

          {/* Zoom controls */}
          <button
            type="button"
            onClick={() => handleZoom('in')}
            className="p-1.5 bg-slate-900 text-slate-400 hover:text-white border border-slate-800 rounded transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleZoom('out')}
            className="p-1.5 bg-slate-900 text-slate-400 hover:text-white border border-slate-800 rounded transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={resetCamera}
            className="p-1.5 bg-slate-900 text-slate-400 hover:text-white border border-slate-800 rounded transition-colors cursor-pointer"
            title="Reset View"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Real-time Bounding Box & Spec Telemetry Strip */}
      <div className="bg-slate-950/70 border-b border-slate-800/80 px-4 py-2 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-3">
        <div className="flex items-center gap-4">
          <span className="text-white font-bold">{meta.title}</span>
          <span className="text-cyan-400">PN: {meta.partNumber}</span>
          <span>Envelope: <strong className="text-slate-200">{meta.dims}</strong></span>
        </div>
        <div className="flex items-center gap-4">
          <span>Vol: <strong className="text-slate-200">{meta.volume}</strong></span>
          <span>Mass: <strong className="text-slate-200">{meta.weight}</strong></span>
          <span>Tol: <strong className="text-cyan-300">{meta.tolerance}</strong></span>
        </div>
      </div>

      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="w-full h-80 sm:h-[420px] cursor-grab active:cursor-grabbing bg-slate-950 relative"
      />

      {/* Bottom overlay: Material swatch & inspection notes */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <span className="text-slate-400 font-mono text-[11px]">Material Shader:</span>
          <div className="flex items-center gap-1.5">
            {[
              { color: '#06b6d4', name: 'Cyan Technical Resin' },
              { color: '#1e293b', name: 'Matte Carbon PETG' },
              { color: '#94a3b8', name: 'Anodized 6061-T6 Aluminum' },
              { color: '#f97316', name: 'Hi-Temp Orange PA-CF' },
              { color: '#fbbf24', name: 'Brass / Gold ENIG' },
            ].map((swatch) => (
              <button
                key={swatch.color}
                type="button"
                onClick={() => setMaterialColor(swatch.color)}
                className={`w-5 h-5 rounded-full border-2 transition-transform hover:scale-110 cursor-pointer ${
                  materialColor === swatch.color ? 'border-white scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: swatch.color }}
                title={swatch.name}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
          <span>Click &amp; Drag to Rotate 360°</span>
          <span className="text-slate-600">·</span>
          <span>Scroll to Zoom</span>
          <span className="text-slate-600">·</span>
          <a
            href={`https://wa.me/919970113207?text=${encodeURIComponent(
              `Hello TRIKONA, I was inspecting your 3D model ${meta.title} (${meta.partNumber}) and would like to fabricate a similar custom assembly.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:underline font-semibold cursor-pointer"
          >
            Fabricate this Part on WhatsApp &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};
