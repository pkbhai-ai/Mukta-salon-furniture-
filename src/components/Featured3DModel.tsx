import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, Move3d, Sparkles } from 'lucide-react';

interface Featured3DModelProps {
  activeHotspot: number;
  onSelectHotspot: (index: number) => void;
}

export const Featured3DModel: React.FC<Featured3DModelProps> = ({
  activeHotspot,
  onSelectHotspot,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'3d' | 'photo'>('3d');
  const targetCameraPosRef = useRef({ x: 1.8, y: 1.2, z: 3.2 });
  const scrollRotationRef = useRef(0);

  // Adjust camera focus based on active hotspot
  useEffect(() => {
    if (activeHotspot === 0) {
      // Seams & stitching closeup
      targetCameraPosRef.current = { x: 0.8, y: 0.8, z: 2.1 };
    } else if (activeHotspot === 1) {
      // Hydraulic lift base
      targetCameraPosRef.current = { x: 0.2, y: -0.2, z: 2.4 };
    } else if (activeHotspot === 2) {
      // Lumbar contour
      targetCameraPosRef.current = { x: -1.2, y: 0.6, z: 2.2 };
    } else if (activeHotspot === 3) {
      // Solid walnut armrest
      targetCameraPosRef.current = { x: 1.4, y: 0.7, z: 1.9 };
    }
  }, [activeHotspot]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || viewMode !== '3d') return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(1.8, 1.2, 3.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);
    } catch {
      setViewMode('photo');
      return;
    }

    // Studio lighting
    const key = new THREE.DirectionalLight(0xFFEEDB, 3.4);
    key.position.set(4, 5, 4);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xCCE0F0, 1.4);
    fill.position.set(-4, 2, -2);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xD4B07B, 2.8);
    rim.position.set(0, 3, -4);
    scene.add(rim);

    const ambient = new THREE.AmbientLight(0x2A1D17, 1.3);
    scene.add(ambient);

    // Materials
    const leatherMat = new THREE.MeshStandardMaterial({
      color: 0x8C4A22,
      roughness: 0.42,
      metalness: 0.08,
    });

    const walnutMat = new THREE.MeshStandardMaterial({
      color: 0x241812,
      roughness: 0.5,
      metalness: 0.04,
    });

    const ceramicMat = new THREE.MeshStandardMaterial({
      color: 0x1A1A1D,
      roughness: 0.15,
      metalness: 0.1,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xE8ECF0,
      roughness: 0.1,
      metalness: 0.95,
    });

    // 3D Shampoo Wash Lounger Group
    const stationGroup = new THREE.Group();
    scene.add(stationGroup);
    stationGroup.position.set(0, -0.35, 0);

    // 1. Walnut Cabinet Base
    const cabinetGeo = new THREE.BoxGeometry(0.85, 0.72, 1.4);
    const cabinetMesh = new THREE.Mesh(cabinetGeo, walnutMat);
    cabinetMesh.position.set(0, 0.36, -0.3);
    stationGroup.add(cabinetMesh);

    // 2. Ceramic Wash Basin at rear
    const basinStemGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.25, 32);
    const basinStem = new THREE.Mesh(basinStemGeo, chromeMat);
    basinStem.position.set(0, 0.82, -0.75);
    stationGroup.add(basinStem);

    const basinBowlGeo = new THREE.CylinderGeometry(0.42, 0.28, 0.32, 32);
    const basinBowl = new THREE.Mesh(basinBowlGeo, ceramicMat);
    basinBowl.position.set(0, 0.98, -0.78);
    basinBowl.rotation.x = 0.2; // tilted back
    stationGroup.add(basinBowl);

    // Chrome Faucet on Basin
    const faucetGeo = new THREE.TorusGeometry(0.08, 0.015, 12, 24, Math.PI);
    const faucet = new THREE.Mesh(faucetGeo, chromeMat);
    faucet.position.set(0, 1.15, -0.92);
    faucet.rotation.z = Math.PI / 2;
    stationGroup.add(faucet);

    // 3. Ergonomic Reclining Seat & Lumbar
    const seatGeo = new THREE.BoxGeometry(0.72, 0.16, 0.75);
    const seatMesh = new THREE.Mesh(seatGeo, leatherMat);
    seatMesh.position.set(0, 0.52, 0.22);
    seatMesh.rotation.x = -0.08;
    stationGroup.add(seatMesh);

    const backrestGeo = new THREE.BoxGeometry(0.68, 0.78, 0.14);
    const backrestMesh = new THREE.Mesh(backrestGeo, leatherMat);
    backrestMesh.position.set(0, 0.88, -0.16);
    backrestMesh.rotation.x = -0.42; // relaxed recline angle
    stationGroup.add(backrestMesh);

    // Leg-Rest / Ottoman Extension
    const legRestGeo = new THREE.BoxGeometry(0.68, 0.14, 0.48);
    const legRest = new THREE.Mesh(legRestGeo, leatherMat);
    legRest.position.set(0, 0.42, 0.78);
    legRest.rotation.x = 0.12;
    stationGroup.add(legRest);

    // Sculptural Armrests
    const armLeftGeo = new THREE.BoxGeometry(0.08, 0.32, 0.85);
    const armLeft = new THREE.Mesh(armLeftGeo, walnutMat);
    armLeft.position.set(-0.42, 0.65, 0.15);
    stationGroup.add(armLeft);

    const armRight = armLeft.clone();
    armRight.position.set(0.42, 0.65, 0.15);
    stationGroup.add(armRight);

    // Floating ambient gold dust specks inside model view
    const dustCount = 35;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPos[i] = (Math.random() - 0.5) * 5;
      dustPos[i + 1] = Math.random() * 2.5 - 0.5;
      dustPos[i + 2] = (Math.random() - 0.5) * 4;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xD4B07B,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // Interactive Drag
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let targetRotY = 0.65;
    let targetRotX = 0.1;

    stationGroup.rotation.y = 0.65;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevX = clientX;
      prevY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevX;
      const deltaY = clientY - prevY;
      targetRotY += deltaX * 0.008;
      targetRotX = Math.max(-0.25, Math.min(0.35, targetRotX + deltaY * 0.005));
      prevX = clientX;
      prevY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    dom.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Scroll-driven subtle model rotation
    const onScroll = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.bottom > 0 && rect.top < windowHeight) {
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        scrollRotationRef.current = (progress - 0.5) * 0.8;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!isDragging) {
        targetRotY += 0.0018; // gentle idle rotation
      }

      // Blend user rotation with scroll-driven parallax
      const finalTargetRotY = targetRotY + scrollRotationRef.current;
      stationGroup.rotation.y += (finalTargetRotY - stationGroup.rotation.y) * 0.06;
      stationGroup.rotation.x += (targetRotX - stationGroup.rotation.x) * 0.06;

      // Smooth camera transition to target hotspot focus
      camera.position.x += (targetCameraPosRef.current.x - camera.position.x) * 0.04;
      camera.position.y += (targetCameraPosRef.current.y - camera.position.y) * 0.04;
      camera.position.z += (targetCameraPosRef.current.z - camera.position.z) * 0.04;
      camera.lookAt(0, 0.45, 0);

      // Dust gentle drift
      dust.rotation.y = elapsed * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', onScroll);
      dom.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      dom.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [viewMode]);

  return (
    <div className="relative aspect-16/10 rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#1E1511]">
      {/* 3D Mode Canvas */}
      {viewMode === '3d' ? (
        <div className="relative w-full h-full">
          <div
            ref={containerRef}
            data-cursor="ORBIT 3D"
            className="w-full h-full cursor-grab active:cursor-grabbing"
            title="Drag to inspect 3D furniture model"
          />

          {/* Interactive Floating Hotspot Pins over 3D model */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Hotspot 0: Seams */}
            <button
              onClick={() => onSelectHotspot(0)}
              style={{ top: '42%', left: '44%' }}
              className={`absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300 ${
                activeHotspot === 0 ? 'scale-125 z-30' : 'scale-100 z-20'
              }`}
              title="Inspect Double-Stitched Saddle Seams"
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-[#C8A97E]/30 animate-ping" />
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shadow-lg border ${
                  activeHotspot === 0
                    ? 'bg-[#C8A97E] text-[#1E1511] border-white ring-2 ring-[#C8A97E]'
                    : 'bg-[#1E1511]/90 text-white border-[#C8A97E]/50 group-hover:bg-[#C8A97E] group-hover:text-[#1E1511]'
                }`}>
                  1
                </span>
              </div>
            </button>

            {/* Hotspot 1: Hydraulics */}
            <button
              onClick={() => onSelectHotspot(1)}
              style={{ bottom: '26%', left: '48%' }}
              className={`absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300 ${
                activeHotspot === 1 ? 'scale-125 z-30' : 'scale-100 z-20'
              }`}
              title="Inspect Hydraulic Lift Mechanism"
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-[#C8A97E]/30 animate-ping" />
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shadow-lg border ${
                  activeHotspot === 1
                    ? 'bg-[#C8A97E] text-[#1E1511] border-white ring-2 ring-[#C8A97E]'
                    : 'bg-[#1E1511]/90 text-white border-[#C8A97E]/50 group-hover:bg-[#C8A97E] group-hover:text-[#1E1511]'
                }`}>
                  2
                </span>
              </div>
            </button>

            {/* Hotspot 2: Lumbar */}
            <button
              onClick={() => onSelectHotspot(2)}
              style={{ top: '34%', left: '30%' }}
              className={`absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300 ${
                activeHotspot === 2 ? 'scale-125 z-30' : 'scale-100 z-20'
              }`}
              title="Inspect Orthopedic Lumbar Core"
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-[#C8A97E]/30 animate-ping" />
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shadow-lg border ${
                  activeHotspot === 2
                    ? 'bg-[#C8A97E] text-[#1E1511] border-white ring-2 ring-[#C8A97E]'
                    : 'bg-[#1E1511]/90 text-white border-[#C8A97E]/50 group-hover:bg-[#C8A97E] group-hover:text-[#1E1511]'
                }`}>
                  3
                </span>
              </div>
            </button>

            {/* Hotspot 3: Walnut Armrest */}
            <button
              onClick={() => onSelectHotspot(3)}
              style={{ top: '56%', right: '28%' }}
              className={`absolute pointer-events-auto transform translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300 ${
                activeHotspot === 3 ? 'scale-125 z-30' : 'scale-100 z-20'
              }`}
              title="Inspect Solid American Walnut Armrest"
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-[#C8A97E]/30 animate-ping" />
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shadow-lg border ${
                  activeHotspot === 3
                    ? 'bg-[#C8A97E] text-[#1E1511] border-white ring-2 ring-[#C8A97E]'
                    : 'bg-[#1E1511]/90 text-white border-[#C8A97E]/50 group-hover:bg-[#C8A97E] group-hover:text-[#1E1511]'
                }`}>
                  4
                </span>
              </div>
            </button>
          </div>
        </div>
      ) : (
        <img
          src="/src/assets/images/leather_craft_detail_1790757070053.jpg"
          alt="Mukta luxury upholstery double-stitching and walnut wood craft"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700"
        />
      )}

      {/* Top Toggle: 3D Viewport vs Macro Photo */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 p-1 bg-black/50 backdrop-blur-md rounded-xl border border-white/10 text-xs">
        <button
          onClick={() => setViewMode('3d')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
            viewMode === '3d'
              ? 'bg-[#C8A97E] text-[#1E1511] font-semibold shadow-xs'
              : 'text-[#DDD4C6] hover:text-white'
          }`}
        >
          <Move3d className="w-3.5 h-3.5" />
          <span>Interactive 3D</span>
        </button>
        <button
          onClick={() => setViewMode('photo')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
            viewMode === 'photo'
              ? 'bg-[#C8A97E] text-[#1E1511] font-semibold shadow-xs'
              : 'text-[#DDD4C6] hover:text-white'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Macro Craft</span>
        </button>
      </div>

      {/* Subtle Hint */}
      {viewMode === '3d' && (
        <div className="absolute bottom-5 left-5 pointer-events-none text-[11px] font-mono text-[#C8A97E] bg-black/50 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
          <Move3d className="w-3.5 h-3.5 animate-pulse" />
          <span>Orbit 360° · Scroll Parallax</span>
        </div>
      )}
    </div>
  );
};
