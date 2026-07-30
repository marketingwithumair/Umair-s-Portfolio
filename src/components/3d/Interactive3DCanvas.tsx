import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Interactive3DCanvasProps {
  theme: 'light' | 'dark';
  interactiveObjectType?: 'all' | 'meta' | 'shopify' | 'chart';
}

export const Interactive3DCanvas: React.FC<Interactive3DCanvasProps> = ({ theme, interactiveObjectType = 'all' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const aspect = width / height;
    const isMobile = width < 768;

    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    // Adjust camera Z according to aspect ratio so 3D objects are clearly visible on mobile screens
    const targetCameraZ = isMobile ? Math.max(24, 18 / Math.max(aspect * 0.95, 0.45)) : 18;
    camera.position.set(0, 0, targetCameraZ);

    // Renderer setup with alpha transparency
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Clear previous canvas if any
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(
      theme === 'dark' ? 0x203050 : 0xf0f5ff,
      theme === 'dark' ? 1.2 : 1.8
    );
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x4ea8ff, theme === 'dark' ? 2.5 : 2.0);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00f0ff, theme === 'dark' ? 1.8 : 1.2);
    dirLight2.position.set(-10, -10, -5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x38bdf8, 2, 25);
    pointLight.position.set(0, 2, 8);
    scene.add(pointLight);

    // Main Group holding all 3D floating assets
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Particle Cloud
    const particleCount = 120;
    const particlesGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 35;
      posArray[i + 1] = (Math.random() - 0.5) * 25;
      posArray[i + 2] = (Math.random() - 0.5) * 15;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      color: theme === 'dark' ? 0x38bdf8 : 0x0284c7,
      transparent: true,
      opacity: theme === 'dark' ? 0.6 : 0.45,
    });
    const particleSystem = new THREE.Points(particlesGeo, particleMat);
    scene.add(particleSystem);

    // Array of animated floating meshes
    const floatingItems: {
      mesh: THREE.Object3D;
      rotSpeedX: number;
      rotSpeedY: number;
      floatSpeed: number;
      floatOffset: number;
      baseY: number;
    }[] = [];

    // Mobile layout multiplier for object positioning
    const posXMult = isMobile ? 0.55 : 1.0;

    // --- Helper 1: Floating Meta Ads / Analytics Dashboard Card ---
    if (interactiveObjectType === 'all' || interactiveObjectType === 'meta') {
      const cardGroup = new THREE.Group();
      
      // Main Card Base (Frosted Glass / Metallic)
      const cardGeo = new THREE.BoxGeometry(4.5, 2.8, 0.2);
      const cardMat = new THREE.MeshStandardMaterial({
        color: theme === 'dark' ? 0x0f172a : 0xffffff,
        metalness: 0.2,
        roughness: 0.3,
        transparent: true,
        opacity: theme === 'dark' ? 0.85 : 0.95,
      });
      const cardMesh = new THREE.Mesh(cardGeo, cardMat);
      cardGroup.add(cardMesh);

      // Cyan / Sky Blue Border Trim
      const wireframeGeo = new THREE.EdgesGeometry(cardGeo);
      const wireframeMat = new THREE.LineBasicMaterial({ color: 0x4ea8ff, linewidth: 2 });
      const wireframe = new THREE.LineSegments(wireframeGeo, wireframeMat);
      cardGroup.add(wireframe);

      // Mini 3D Bar Chart on Card
      const barColors = [0x38bdf8, 0x0284c7, 0x00f0ff, 0x60a5fa];
      const heights = [0.8, 1.2, 1.8, 2.2];
      heights.forEach((h, idx) => {
        const barGeo = new THREE.BoxGeometry(0.4, h, 0.25);
        const barMat = new THREE.MeshStandardMaterial({
          color: barColors[idx],
          emissive: barColors[idx],
          emissiveIntensity: 0.3,
          roughness: 0.2,
        });
        const bar = new THREE.Mesh(barGeo, barMat);
        bar.position.set(-1.4 + idx * 0.8, -0.6 + h / 2, 0.2);
        cardGroup.add(bar);
      });

      cardGroup.position.set(5.5 * posXMult, isMobile ? 5.2 : 2.2, 1);
      if (isMobile) cardGroup.scale.setScalar(0.75);
      mainGroup.add(cardGroup);

      floatingItems.push({
        mesh: cardGroup,
        rotSpeedX: 0.003,
        rotSpeedY: 0.006,
        floatSpeed: 1.5,
        floatOffset: 0,
        baseY: isMobile ? 5.2 : 2.2,
      });
    }

    // --- Helper 2: Floating 3D Shopify Storefront Cube ---
    if (interactiveObjectType === 'all' || interactiveObjectType === 'shopify') {
      const shopifyGroup = new THREE.Group();
      const cubeGeo = new THREE.BoxGeometry(2.4, 2.4, 2.4);
      const cubeMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        emissive: 0x0369a1,
        emissiveIntensity: 0.4,
        roughness: 0.2,
        metalness: 0.5,
      });
      const cube = new THREE.Mesh(cubeGeo, cubeMat);
      shopifyGroup.add(cube);

      // Wireframe overlay
      const wireGeo = new THREE.EdgesGeometry(cubeGeo);
      const wireMat = new THREE.LineBasicMaterial({ color: 0x38bdf8 });
      const wire = new THREE.LineSegments(wireGeo, wireMat);
      shopifyGroup.add(wire);

      // Shopping Bag Handles (3D Torus Arc)
      const handleGeo = new THREE.TorusGeometry(0.7, 0.08, 12, 24, Math.PI);
      const handleMat = new THREE.MeshStandardMaterial({ color: 0xe0f2fe, roughness: 0.1 });
      const handle = new THREE.Mesh(handleGeo, handleMat);
      handle.position.set(0, 1.3, 0);
      shopifyGroup.add(handle);

      shopifyGroup.position.set(-6 * posXMult, isMobile ? -4.2 : -1.8, 2);
      if (isMobile) shopifyGroup.scale.setScalar(0.75);
      mainGroup.add(shopifyGroup);

      floatingItems.push({
        mesh: shopifyGroup,
        rotSpeedX: 0.008,
        rotSpeedY: 0.005,
        floatSpeed: 2.0,
        floatOffset: Math.PI / 2,
        baseY: isMobile ? -4.2 : -1.8,
      });
    }

    // --- Helper 3: Floating 3D ROAS Growth Cylinder / Funnel ---
    if (interactiveObjectType === 'all' || interactiveObjectType === 'chart') {
      const chartGroup = new THREE.Group();

      // Cone Funnel
      const funnelGeo = new THREE.ConeGeometry(1.8, 2.5, 32, 1, true);
      const funnelMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.75,
        side: THREE.DoubleSide,
        roughness: 0.1,
      });
      const funnel = new THREE.Mesh(funnelGeo, funnelMat);
      funnel.rotation.x = Math.PI; // upside down funnel
      chartGroup.add(funnel);

      // Floating 3D Coin spheres above funnel
      for (let c = 0; c < 5; c++) {
        const coinGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 24);
        const coinMat = new THREE.MeshStandardMaterial({
          color: 0xfacc15,
          metalness: 0.9,
          roughness: 0.2,
        });
        const coin = new THREE.Mesh(coinGeo, coinMat);
        coin.rotation.x = Math.PI / 3;
        coin.position.set((Math.random() - 0.5) * 1.8, 1.2 + c * 0.5, (Math.random() - 0.5) * 1.2);
        chartGroup.add(coin);
      }

      chartGroup.position.set(-5.2 * posXMult, isMobile ? 6.5 : 3.5, -2);
      if (isMobile) chartGroup.scale.setScalar(0.75);
      mainGroup.add(chartGroup);

      floatingItems.push({
        mesh: chartGroup,
        rotSpeedX: 0.004,
        rotSpeedY: 0.007,
        floatSpeed: 1.2,
        floatOffset: Math.PI,
        baseY: isMobile ? 6.5 : 3.5,
      });
    }

    // --- Helper 4: Floating 3D Target Bullseye / Ad Campaign Target ---
    const targetGroup = new THREE.Group();
    // Outer Ring
    const ring1Geo = new THREE.TorusGeometry(1.2, 0.12, 16, 32);
    const ring1Mat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    targetGroup.add(ring1);

    // Inner Ring
    const ring2Geo = new THREE.TorusGeometry(0.7, 0.1, 16, 32);
    const ring2Mat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.2 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    targetGroup.add(ring2);

    // Center Bullseye
    const centerGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const centerMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, emissive: 0xe11d48, emissiveIntensity: 0.4 });
    const center = new THREE.Mesh(centerGeo, centerMat);
    targetGroup.add(center);

    targetGroup.position.set(6.2 * posXMult, isMobile ? -5.8 : -3.0, -1);
    if (isMobile) targetGroup.scale.setScalar(0.75);
    mainGroup.add(targetGroup);

    floatingItems.push({
      mesh: targetGroup,
      rotSpeedX: 0.005,
      rotSpeedY: 0.012,
      floatSpeed: 1.8,
      floatOffset: 1.5,
      baseY: isMobile ? -5.8 : -3.0,
    });

    // Mouse & Touch Move listeners
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mousePos.current.targetX = x;
      mousePos.current.targetY = y;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const x = (touch.clientX / window.innerWidth) * 2 - 1;
        const y = -(touch.clientY / window.innerHeight) * 2 + 1;
        mousePos.current.targetX = x;
        mousePos.current.targetY = y;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Resize listener
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      const asp = w / h;
      const mob = w < 768;
      camera.aspect = asp;
      camera.position.z = mob ? Math.max(24, 18 / Math.max(asp * 0.95, 0.45)) : 18;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      const elapsedTime = (performance.now() - startTime) / 1000;

      // Smooth mouse interpolation
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      // Parallax effect + continuous ambient rotation on mobile
      const ambientSwing = Math.sin(elapsedTime * 0.4) * 0.12;
      mainGroup.rotation.y = mousePos.current.x * 0.25 + ambientSwing;
      mainGroup.rotation.x = -mousePos.current.y * 0.15 + Math.cos(elapsedTime * 0.3) * 0.08;

      // Rotate particle system slowly
      particleSystem.rotation.y = elapsedTime * 0.03;

      // Animate floating items
      floatingItems.forEach((item) => {
        item.mesh.rotation.x += item.rotSpeedX;
        item.mesh.rotation.y += item.rotSpeedY;
        item.mesh.position.y = item.baseY + Math.sin(elapsedTime * item.floatSpeed + item.floatOffset) * 0.35;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [theme, interactiveObjectType]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
