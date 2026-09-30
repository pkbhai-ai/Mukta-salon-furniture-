import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { MagneticButton } from './MagneticButton';
import { Camera, Sparkles, Move3d, ArrowRight, ShieldCheck, Award, Factory, Instagram } from 'lucide-react';

interface Hero3DProps {
  onExploreClick: () => void;
  onQuoteClick: () => void;
}

export const Hero3DCanvas: React.FC<Hero3DProps> = ({ onExploreClick, onQuoteClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [activeFinish, setActiveFinish] = useState<'cognac' | 'obsidian' | 'sand' | 'olive'>('cognac');
  const [activeMetal, setActiveMetal] = useState<'gold' | 'chrome' | 'black'>('gold');
  const [activePreset, setActivePreset] = useState<'hero' | 'front' | 'detail'>('hero');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHydraulicLifted, setIsHydraulicLifted] = useState(false);
  const isHydraulicLiftedRef = useRef(false);
  const scrollOffsetRef = useRef(0);

  // References to 3D elements
  const leatherMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const metalMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const cameraTargetPosRef = useRef<{ x: number; y: number; z: number }>({ x: 0, y: 0.82, z: 4.3 });
  const chairGroupRef = useRef<THREE.Group | null>(null);
  const upperGroupRef = useRef<THREE.Group | null>(null);
  const columnMeshRef = useRef<THREE.Mesh | null>(null);
  const backrestGroupRef = useRef<THREE.Group | null>(null);
  const pedalLeverRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    isHydraulicLiftedRef.current = isHydraulicLifted;
  }, [isHydraulicLifted]);

  const finishColors = {
    cognac: { leather: 0x945228, name: 'Cognac Saddle Hide', hex: '#945228' },
    obsidian: { leather: 0x1E1E22, name: 'Obsidian Noir', hex: '#1E1E22' },
    sand: { leather: 0xD8CDBC, name: 'Cashmere Sand', hex: '#D8CDBC' },
    olive: { leather: 0x484B3D, name: 'Tuscan Olive', hex: '#484B3D' },
  };

  const metalColors = {
    gold: { metal: 0xD4B07B, roughness: 0.22, metalness: 0.92, name: 'Champagne Brass' },
    chrome: { metal: 0xD8DDE3, roughness: 0.12, metalness: 0.98, name: 'Polished Chrome' },
    black: { metal: 0x222224, roughness: 0.38, metalness: 0.82, name: 'Matte Gunmetal' },
  };

  // Switch leather material color
  useEffect(() => {
    if (leatherMaterialRef.current) {
      leatherMaterialRef.current.color.setHex(finishColors[activeFinish].leather);
      leatherMaterialRef.current.needsUpdate = true;
    }
  }, [activeFinish]);

  // Switch metal material
  useEffect(() => {
    if (metalMaterialRef.current) {
      metalMaterialRef.current.color.setHex(metalColors[activeMetal].metal);
      metalMaterialRef.current.roughness = metalColors[activeMetal].roughness;
      metalMaterialRef.current.metalness = metalColors[activeMetal].metalness;
      metalMaterialRef.current.needsUpdate = true;
    }
  }, [activeMetal]);

  // Switch camera angle presets
  useEffect(() => {
    if (activePreset === 'hero') {
      cameraTargetPosRef.current = { x: 0, y: 0.82, z: 4.3 };
    } else if (activePreset === 'front') {
      cameraTargetPosRef.current = { x: 0, y: 0.45, z: 3.6 };
    } else if (activePreset === 'detail') {
      cameraTargetPosRef.current = { x: 0.85, y: 1.05, z: 2.5 };
    }
  }, [activePreset]);

  // Trigger entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 120);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability safely
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      35,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.82, 4.3);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.18;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);
    } catch {
      setWebglSupported(false);
      return;
    }

    // Procedural Pebble-Leather Micro Bump Texture
    const bumpCanvas = document.createElement('canvas');
    bumpCanvas.width = 128;
    bumpCanvas.height = 128;
    const bCtx = bumpCanvas.getContext('2d');
    if (bCtx) {
      bCtx.fillStyle = '#808080';
      bCtx.fillRect(0, 0, 128, 128);
      for (let i = 0; i < 700; i++) {
        const x = Math.random() * 128;
        const y = Math.random() * 128;
        const r = Math.random() * 1.8 + 0.8;
        const shade = Math.floor(Math.random() * 60 + 100);
        bCtx.fillStyle = `rgb(${shade},${shade},${shade})`;
        bCtx.beginPath();
        bCtx.arc(x, y, r, 0, Math.PI * 2);
        bCtx.fill();
      }
    }
    const leatherBumpTex = new THREE.CanvasTexture(bumpCanvas);
    leatherBumpTex.wrapS = THREE.RepeatWrapping;
    leatherBumpTex.wrapT = THREE.RepeatWrapping;
    leatherBumpTex.repeat.set(5, 5);

    // Three-point Studio Lighting
    // Warm Champagne Key Light
    const keyLight = new THREE.DirectionalLight(0xFFF3E3, 3.2);
    keyLight.position.set(4.5, 5.5, 4.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // Sand Soft Fill Light
    const fillLight = new THREE.DirectionalLight(0xEDE0CE, 1.7);
    fillLight.position.set(-4.5, 2.5, 2.5);
    scene.add(fillLight);

    // Specular Champagne Rim Light
    const rimLight = new THREE.DirectionalLight(0xFFFFFF, 2.4);
    rimLight.position.set(0, 4.2, -4.5);
    scene.add(rimLight);

    // Under-Chassis Warm Bounce Light
    const bounceLight = new THREE.DirectionalLight(0xD6B485, 0.7);
    bounceLight.position.set(0, -3, 2);
    scene.add(bounceLight);

    // Ambient Studio Illumination
    const ambientLight = new THREE.AmbientLight(0xF7F2EB, 0.95);
    scene.add(ambientLight);

    // Physically-based Materials
    const leatherMat = new THREE.MeshStandardMaterial({
      color: finishColors[activeFinish].leather,
      roughness: 0.42,
      metalness: 0.08,
      bumpMap: leatherBumpTex,
      bumpScale: 0.016,
    });
    leatherMaterialRef.current = leatherMat;

    const metalMat = new THREE.MeshStandardMaterial({
      color: metalColors[activeMetal].metal,
      roughness: metalColors[activeMetal].roughness,
      metalness: metalColors[activeMetal].metalness,
    });
    metalMaterialRef.current = metalMat;

    const walnutWoodMat = new THREE.MeshStandardMaterial({
      color: 0x2A1D17,
      roughness: 0.46,
      metalness: 0.04,
    });

    const rubberMat = new THREE.MeshStandardMaterial({
      color: 0x1A1A1A,
      roughness: 0.88,
      metalness: 0.0,
    });

    const marbleDaisMat = new THREE.MeshStandardMaterial({
      color: 0xF4EFE6,
      roughness: 0.35,
      metalness: 0.05,
    });

    // Main 3D Salon Chair Group
    const chairGroup = new THREE.Group();
    scene.add(chairGroup);
    chairGroupRef.current = chairGroup;
    chairGroup.position.set(0, -0.62, 0);

    // 0. Architectural Studio Dais / Podium (anchors the object in 3D showroom)
    const daisGroup = new THREE.Group();
    daisGroup.position.y = -0.04;
    chairGroup.add(daisGroup);

    const daisBaseGeo = new THREE.CylinderGeometry(1.4, 1.45, 0.06, 64);
    const daisBase = new THREE.Mesh(daisBaseGeo, marbleDaisMat);
    daisBase.receiveShadow = true;
    daisGroup.add(daisBase);

    const daisTrimGeo = new THREE.TorusGeometry(1.42, 0.016, 16, 64);
    daisTrimGeo.rotateX(Math.PI / 2);
    const daisTrim = new THREE.Mesh(daisTrimGeo, metalMat);
    daisTrim.position.y = 0.02;
    daisGroup.add(daisTrim);

    // 1. Heavy Disc Base with Beveled Rim
    const baseGeo = new THREE.CylinderGeometry(0.85, 0.88, 0.06, 64);
    const baseMesh = new THREE.Mesh(baseGeo, metalMat);
    baseMesh.position.y = 0.04;
    baseMesh.receiveShadow = true;
    chairGroup.add(baseMesh);

    // Base rubber gasket ring
    const baseRingGeo = new THREE.TorusGeometry(0.87, 0.015, 16, 64);
    baseRingGeo.rotateX(Math.PI / 2);
    const baseRingMesh = new THREE.Mesh(baseRingGeo, rubberMat);
    baseRingMesh.position.y = 0.025;
    chairGroup.add(baseRingMesh);

    // 2. Hydraulic Column & Collar
    const columnGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.65, 32);
    const columnMesh = new THREE.Mesh(columnGeo, metalMat);
    columnMesh.position.y = 0.39;
    columnMesh.castShadow = true;
    chairGroup.add(columnMesh);
    columnMeshRef.current = columnMesh;

    const collarGeo = new THREE.CylinderGeometry(0.14, 0.16, 0.15, 32);
    const collarMesh = new THREE.Mesh(collarGeo, metalMat);
    collarMesh.position.y = 0.13;
    chairGroup.add(collarMesh);

    // 3. Hydraulic Foot Pump Pedal
    const pedalLeverGeo = new THREE.BoxGeometry(0.04, 0.02, 0.5);
    const pedalLever = new THREE.Mesh(pedalLeverGeo, metalMat);
    pedalLever.position.set(0, 0.23, 0.35);
    pedalLever.rotation.x = 0.12;
    chairGroup.add(pedalLever);
    pedalLeverRef.current = pedalLever;

    const pedalPadGeo = new THREE.BoxGeometry(0.22, 0.035, 0.09);
    const pedalPad = new THREE.Mesh(pedalPadGeo, rubberMat);
    pedalPad.position.set(0, 0.27, 0.58);
    chairGroup.add(pedalPad);

    // Upper Assembly Group (lifts and reclines on hydraulic action)
    const upperGroup = new THREE.Group();
    chairGroup.add(upperGroup);
    upperGroupRef.current = upperGroup;

    // 4. Seat Under-Pan / Wooden Shell
    const seatShellGeo = new THREE.CylinderGeometry(0.68, 0.64, 0.12, 48);
    seatShellGeo.scale(1, 1, 1.05);
    const seatShellMesh = new THREE.Mesh(seatShellGeo, walnutWoodMat);
    seatShellMesh.position.y = 0.74;
    seatShellMesh.castShadow = true;
    upperGroup.add(seatShellMesh);

    // 5. Plush Seat Cushion (Curved Ergonomic Slab)
    const seatCushionGeo = new THREE.CylinderGeometry(0.65, 0.66, 0.14, 48);
    seatCushionGeo.scale(0.96, 1, 1.02);
    const seatCushion = new THREE.Mesh(seatCushionGeo, leatherMat);
    seatCushion.position.y = 0.85;
    seatCushion.castShadow = true;
    upperGroup.add(seatCushion);

    // 6. Curved Backrest Shell (Walnut)
    const backrestShellGroup = new THREE.Group();
    backrestShellGroup.position.set(0, 1.35, -0.42);
    backrestShellGroup.rotation.x = -0.15;
    upperGroup.add(backrestShellGroup);
    backrestGroupRef.current = backrestShellGroup;

    const backShellGeo = new THREE.BoxGeometry(0.92, 0.75, 0.08);
    const backShell = new THREE.Mesh(backShellGeo, walnutWoodMat);
    backShell.castShadow = true;
    backrestShellGroup.add(backShell);

    // 7. Contoured Leather Backrest Cushion with Fluted Tufting
    const backCushionGeo = new THREE.BoxGeometry(0.86, 0.7, 0.14);
    const backCushion = new THREE.Mesh(backCushionGeo, leatherMat);
    backCushion.position.z = 0.08;
    backCushion.castShadow = true;
    backrestShellGroup.add(backCushion);

    // Lumbar accent stitch lines & fluting details
    for (let s = -1; s <= 1; s++) {
      const flutingGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.6, 12);
      flutingGeo.rotateX(Math.PI / 2);
      const flutingMesh = new THREE.Mesh(flutingGeo, metalMat);
      flutingMesh.position.set(s * 0.22, 0, 0.153);
      backrestShellGroup.add(flutingMesh);
    }

    const stitchGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.76, 16);
    stitchGeo.rotateZ(Math.PI / 2);
    const stitchMesh = new THREE.Mesh(stitchGeo, metalMat);
    stitchMesh.position.set(0, -0.05, 0.154);
    backrestShellGroup.add(stitchMesh);

    // 8. Adjustable Headrest
    const headrestStemGeo1 = new THREE.CylinderGeometry(0.014, 0.014, 0.28, 16);
    const stem1 = new THREE.Mesh(headrestStemGeo1, metalMat);
    stem1.position.set(-0.14, 0.44, -0.02);
    backrestShellGroup.add(stem1);

    const stem2 = stem1.clone();
    stem2.position.set(0.14, 0.44, -0.02);
    backrestShellGroup.add(stem2);

    const headrestCushionGeo = new THREE.BoxGeometry(0.48, 0.18, 0.12);
    const headrestCushion = new THREE.Mesh(headrestCushionGeo, leatherMat);
    headrestCushion.position.set(0, 0.58, 0.02);
    headrestCushion.castShadow = true;
    backrestShellGroup.add(headrestCushion);

    // 9. Sculptural Curved Armrests (Left & Right)
    const armrestSupportGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.38, 20);
    const armrestCapGeo = new THREE.BoxGeometry(0.12, 0.05, 0.62);

    // Left Armrest
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.58, 1.05, -0.05);
    upperGroup.add(leftArmGroup);

    const leftArmPillar = new THREE.Mesh(armrestSupportGeo, metalMat);
    leftArmPillar.position.set(0, -0.12, 0);
    leftArmGroup.add(leftArmPillar);

    const leftArmCap = new THREE.Mesh(armrestCapGeo, walnutWoodMat);
    leftArmCap.castShadow = true;
    leftArmGroup.add(leftArmCap);

    const leftArmPadGeo = new THREE.BoxGeometry(0.1, 0.025, 0.48);
    const leftArmPad = new THREE.Mesh(leftArmPadGeo, leatherMat);
    leftArmPad.position.set(0, 0.035, 0.02);
    leftArmGroup.add(leftArmPad);

    // Right Armrest
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.58, 1.05, -0.05);
    upperGroup.add(rightArmGroup);

    const rightArmPillar = leftArmPillar.clone();
    rightArmGroup.add(rightArmPillar);

    const rightArmCap = leftArmCap.clone();
    rightArmGroup.add(rightArmCap);

    const rightArmPad = leftArmPad.clone();
    rightArmGroup.add(rightArmPad);

    // 10. Heavy Cast Footrest Bar Assembly
    const footrestStemGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.52, 16);
    footrestStemGeo.rotateX(Math.PI / 3);
    const footStemLeft = new THREE.Mesh(footrestStemGeo, metalMat);
    footStemLeft.position.set(-0.25, 0.58, 0.38);
    upperGroup.add(footStemLeft);

    const footStemRight = footStemLeft.clone();
    footStemRight.position.set(0.25, 0.58, 0.38);
    upperGroup.add(footStemRight);

    const footBarGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.68, 24);
    footBarGeo.rotateZ(Math.PI / 2);
    const footBar = new THREE.Mesh(footBarGeo, metalMat);
    footBar.position.set(0, 0.38, 0.62);
    upperGroup.add(footBar);

    // 11. Subtle Ambient Floating Dust / Light Specks (Floating particles)
    const particleCount = 65;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = Math.random() * 4 - 0.6;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xD4B07B,
      size: 0.035,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Soft Contact Shadow Plane beneath chair & dais
    const shadowGeo = new THREE.PlaneGeometry(4.2, 4.2);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const ctx = shadowCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(128, 128, 12, 128, 128, 124);
      grad.addColorStop(0, 'rgba(42, 29, 23, 0.32)');
      grad.addColorStop(0.4, 'rgba(42, 29, 23, 0.16)');
      grad.addColorStop(0.8, 'rgba(42, 29, 23, 0.04)');
      grad.addColorStop(1, 'rgba(42, 29, 23, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.y = -0.07;
    chairGroup.add(shadowMesh);

    // Initial sculptural 3D turn
    chairGroup.rotation.y = 0.35;

    // Interaction handling
    let targetRotationY = 0.35;
    let targetRotationX = 0;
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousPointerX = clientX;
      previousPointerY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - previousPointerX;
        const deltaY = clientY - previousPointerY;
        targetRotationY += deltaX * 0.007;
        targetRotationX = Math.max(-0.25, Math.min(0.25, targetRotationX + deltaY * 0.004));
        previousPointerX = clientX;
        previousPointerY = clientY;
      } else {
        const rect = container.getBoundingClientRect();
        const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, cameraTargetPosRef.current.x + normX * 0.28, 0.05);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, cameraTargetPosRef.current.y + normY * 0.15, 0.05);
        camera.lookAt(0, 0.45, 0);
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    domElement.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Scroll-based camera dolly factor stored in ref
    const onScroll = () => {
      const scrollY = window.scrollY;
      const factor = Math.min(scrollY / 750, 1);
      scrollOffsetRef.current = factor;
      camera.position.z = cameraTargetPosRef.current.z + factor * 0.85;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous gentle idle spin when not dragging
      if (!isDragging) {
        targetRotationY += 0.002;
      }

      // Smooth damping (lerp)
      chairGroup.rotation.y += (targetRotationY - chairGroup.rotation.y) * 0.06;
      chairGroup.rotation.x += (targetRotationX - chairGroup.rotation.x) * 0.06;

      // Live Hydraulic Lift & Recline Animation
      if (upperGroupRef.current && columnMeshRef.current && backrestGroupRef.current && pedalLeverRef.current) {
        const targetElevation = isHydraulicLiftedRef.current ? 0.16 : 0;
        const targetRecline = isHydraulicLiftedRef.current ? -0.42 : -0.15;
        const targetScaleY = isHydraulicLiftedRef.current ? 1.35 : 1.0;
        const targetPedal = isHydraulicLiftedRef.current ? 0.22 : 0.12;

        upperGroupRef.current.position.y += (targetElevation - upperGroupRef.current.position.y) * 0.05;
        backrestGroupRef.current.rotation.x += (targetRecline - backrestGroupRef.current.rotation.x) * 0.05;
        columnMeshRef.current.scale.y += (targetScaleY - columnMeshRef.current.scale.y) * 0.05;
        pedalLeverRef.current.rotation.x += (targetPedal - pedalLeverRef.current.rotation.x) * 0.08;
      }

      // Camera lerp towards active preset
      camera.position.x += (cameraTargetPosRef.current.x - camera.position.x) * 0.04;
      camera.position.y += (cameraTargetPosRef.current.y - camera.position.y) * 0.04;
      camera.position.z += (cameraTargetPosRef.current.z - camera.position.z) * 0.04;
      camera.lookAt(0, 0.45, 0);

      // Blended scroll depth dolly with natural breathing float
      const scrollDrop = scrollOffsetRef.current * 0.35;
      chairGroup.position.y = -0.62 - scrollDrop + Math.sin(elapsedTime * 1.3) * 0.015;

      // Animate ambient dust specks
      particles.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', onScroll);
      domElement.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      domElement.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const headlineWords = [
    { text: 'Furniture', italic: false, highlight: false },
    { text: 'That', italic: false, highlight: false },
    { text: 'Defines', italic: true, highlight: true },
    { text: 'Your', italic: true, highlight: false },
    { text: 'Space.', italic: true, highlight: false },
  ];

  return (
    <div className="relative w-full min-h-[95vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#FDFBF7] pt-24 pb-16">
      {/* Layered Animated Architectural Ambient Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(ellipse 65% 55% at 50% 48%, rgba(200, 169, 126, 0.15) 0%, rgba(253, 251, 247, 0) 70%)',
        }}
      />
      <div className="absolute top-1/4 -left-36 w-96 h-96 rounded-full bg-[#EFE8DC]/60 blur-3xl pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-1/4 -right-36 w-96 h-96 rounded-full bg-[#ECE3D4]/60 blur-3xl pointer-events-none animate-pulse duration-[10000ms]" />

      {/* 3D Canvas / WebGL Layer */}
      <div
        ref={containerRef}
        data-cursor="DRAG 360°"
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0"
        title="Click and drag to rotate the 3D chair model"
      />

      {/* WebGL Fallback if device unsupported */}
      {!webglSupported && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <img
            src="/src/assets/images/hero_salon_chair_1790757004757.jpg"
            alt="MUKTA Royale Architectural Salon Chair"
            loading="eager"
            decoding="async"
            className="w-full max-w-2xl max-h-[75vh] object-contain drop-shadow-2xl"
          />
        </div>
      )}

      {/* Semantic Text Content Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-between min-h-[82vh] pointer-events-none">
        {/* Top Kicker & Staggered Split-Word Headline */}
        <div className="pt-2 max-w-2xl">
          <div
            className={`inline-flex items-center gap-2 text-xs tracking-[0.24em] uppercase text-[#9E5B32] font-semibold mb-4 transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#9E5B32]" />
            <span>MUKTA ATELIER</span>
            <span aria-hidden="true" className="text-[#C8A97E]">·</span>
            <span>COMMERCIAL SALON ARCHITECTURE</span>
            <span aria-hidden="true" className="text-[#C8A97E]">·</span>
            <span>EST. 2014</span>
          </div>

          {/* Split-Word Cinematic Blur-to-Sharp Headline Reveal */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-[#1E1C1A] leading-[1.06] mb-6 flex flex-wrap gap-x-3.5 gap-y-1">
            {headlineWords.map((item, idx) => (
              <span key={idx} className="inline-block overflow-hidden py-1">
                <span
                  className={`inline-block will-change-transform ${
                    item.italic
                      ? 'font-serif italic font-normal text-[#2A1D17]'
                      : 'font-sans font-light text-[#1E1C1A]'
                  } ${
                    item.highlight
                      ? 'relative underline decoration-[#C8A97E]/40 decoration-wavy decoration-1 underline-offset-8 text-[#2A1D17]'
                      : ''
                  }`}
                  style={{
                    opacity: isLoaded ? 1 : 0,
                    filter: isLoaded ? 'blur(0px)' : 'blur(10px)',
                    transform: isLoaded ? 'translate3d(0, 0, 0)' : 'translate3d(0, 32px, 0)',
                    letterSpacing: isLoaded ? '-0.02em' : '0.04em',
                    transition: `all 850ms cubic-bezier(0.16, 1, 0.3, 1) ${140 + idx * 85}ms`,
                  }}
                >
                  {item.text}
                </span>
              </span>
            ))}
          </h1>

          <p
            className={`text-base sm:text-lg text-[#554E46] font-light leading-relaxed max-w-xl mb-8 transition-all duration-800 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-4 blur-sm'
            }`}
          >
            Premium salon and spa furniture designed for modern beauty spaces.
            Engineered with high-resilience memory foam, Italian hydraulic mechanics, and bespoke finishes crafted in our Delhi facility.
          </p>

          {/* Magnetic Action Buttons with Friendly Cute-Luxury Rounded Styling */}
          <div
            className={`flex flex-wrap items-center gap-4 pointer-events-auto transition-all duration-800 delay-600 mb-8 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <MagneticButton
              onClick={onExploreClick}
              className="group px-7 py-3.5 bg-[#2A1D17] hover:bg-[#1E1511] text-[#FDFBF7] text-xs font-medium tracking-wide rounded-2xl shadow-md hover:shadow-xl btn-cute whitespace-nowrap flex items-center gap-2 ring-1 ring-[#C8A97E]/30"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
            </MagneticButton>

            <MagneticButton
              onClick={onQuoteClick}
              className="px-7 py-3.5 bg-white/90 hover:bg-white text-[#2A1D17] border border-[#2A1D17]/15 text-xs font-medium tracking-wide rounded-2xl backdrop-blur-sm shadow-xs hover:shadow-md btn-cute whitespace-nowrap"
            >
              Get a Quote
            </MagneticButton>

            <a
              href="https://www.instagram.com/muktasalonfurniturepvtltd/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 py-3 px-4.5 rounded-2xl bg-white/70 hover:bg-white text-[#5C534A] hover:text-[#1E1C1A] border border-[#2A1D17]/10 text-xs font-medium tracking-wide transition-all duration-200 group backdrop-blur-xs shadow-2xs hover:shadow-xs cursor-pointer btn-cute"
              title="Follow @muktasalonfurniturepvtltd on Instagram"
            >
              <Instagram className="w-3.5 h-3.5 text-[#9E5B32] group-hover:scale-115 transition-transform duration-200" />
              <span>Follow @muktasalonfurniturepvtltd</span>
            </a>
          </div>

          {/* Trust Badges Bar */}
          <div
            className={`flex flex-wrap items-center gap-6 text-xs text-[#7A7065] transition-all duration-800 delay-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Factory className="w-3.5 h-3.5 text-[#9E5B32]" />
              <span>25,000+ Sq Ft Facility</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#9E5B32]" />
              <span>10-Year Warranty</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#9E5B32]" />
              <span>1,200+ Salons Supplied</span>
            </span>
          </div>
        </div>

        {/* Bottom Bar: 3D Material Live Switcher, Viewport Presets, and Scroll Cue */}
        <div className="pt-8 pb-2 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pointer-events-auto">
          {/* Material Finishes Customizer Live Box */}
          <div className="bg-white/90 backdrop-blur-md border border-[#2A1D17]/10 p-4 rounded-2xl shadow-lg max-w-sm ring-1 ring-black/5">
            <div className="flex items-center justify-between gap-4 mb-2.5">
              <span className="text-xs uppercase tracking-wider text-[#6B6156] font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#9E5B32]" />
                <span>3D Material Atelier</span>
              </span>
              <span className="text-[11px] text-[#9E5B32] font-semibold">{finishColors[activeFinish].name}</span>
            </div>

            {/* Leather Swatches */}
            <div className="flex items-center gap-2.5 mb-3">
              {(Object.keys(finishColors) as Array<keyof typeof finishColors>).map((key) => {
                const item = finishColors[key];
                return (
                  <button
                    key={key}
                    onClick={() => setActiveFinish(key)}
                    className={`w-7 h-7 rounded-full transition-all duration-200 cursor-pointer relative ${
                      activeFinish === key
                        ? 'ring-2 ring-offset-2 ring-[#2A1D17] scale-110 shadow-sm'
                        : 'opacity-85 hover:opacity-100 hover:scale-105'
                    }`}
                    style={{ backgroundColor: item.hex }}
                    title={item.name}
                    aria-label={`Select ${item.name} upholstery`}
                  />
                );
              })}
            </div>

            {/* Metal Trim Selector */}
            <div className="flex items-center justify-between pt-2 border-t border-[#2A1D17]/8 text-xs">
              <span className="text-[#7A7065] text-[11px]">Pedestal Trim:</span>
              <div className="flex items-center gap-1.5">
                {(Object.keys(metalColors) as Array<keyof typeof metalColors>).map((mKey) => (
                  <button
                    key={mKey}
                    onClick={() => setActiveMetal(mKey)}
                    className={`px-2 py-0.5 text-[10px] rounded transition-colors cursor-pointer ${
                      activeMetal === mKey
                        ? 'bg-[#2A1D17] text-white font-medium shadow-xs'
                        : 'text-[#6B6156] hover:bg-[#F2ECE1]'
                    }`}
                  >
                    {metalColors[mKey].name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* 3D Viewport Angle Presets */}
            <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#2A1D17]/8 text-[11px]">
              <span className="text-[#7A7065] flex items-center gap-1">
                <Camera className="w-3 h-3 text-[#9E5B32]" />
                <span>Angle:</span>
              </span>
              <div className="flex items-center gap-1">
                {(['hero', 'front', 'detail'] as const).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setActivePreset(preset)}
                    className={`px-2 py-0.5 text-[10px] uppercase font-mono rounded cursor-pointer transition-colors ${
                      activePreset === preset
                        ? 'bg-[#EFE8DC] text-[#2A1D17] font-semibold'
                        : 'text-[#8C8276] hover:text-[#2A1D17]'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Hydraulic Stroke & Recline Demo */}
            <button
              onClick={() => setIsHydraulicLifted(!isHydraulicLifted)}
              className="w-full mt-2.5 py-1.5 px-2.5 rounded-lg text-[10px] font-mono uppercase tracking-wider bg-[#F4EFE6] hover:bg-[#EAE2D5] text-[#2A1D17] border border-[#2A1D17]/10 flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${isHydraulicLifted ? 'bg-[#9E5B32] animate-ping' : 'bg-emerald-500'}`} />
                <span>Hydraulic Stroke Demo</span>
              </span>
              <span className="font-semibold text-[#9E5B32]">{isHydraulicLifted ? 'LIFTED + RECLINE' : 'STANDARD HEIGHT'}</span>
            </button>
          </div>

          {/* Interactive Hint & Scroll Indicator */}
          <div className="hidden md:flex flex-col items-end gap-3 text-xs text-[#8C8276]">
            <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-[#9E5B32] bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full border border-[#2A1D17]/8 shadow-xs">
              <Move3d className="w-3.5 h-3.5 animate-pulse" />
              <span>Drag to Orbit 360°</span>
            </div>

            <div className="flex flex-col items-center gap-1 text-[10px] tracking-widest uppercase">
              <span>Scroll to Explore</span>
              <div className="w-4 h-7 rounded-full border border-[#2A1D17]/25 flex items-start justify-center p-1">
                <div className="w-1 h-2 rounded-full bg-[#2A1D17] animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
