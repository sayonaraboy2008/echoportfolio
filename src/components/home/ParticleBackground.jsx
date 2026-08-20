import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ParticleBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene & Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0d14, 15, 60);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.set(0, 4, 18);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. 3D Wave Wireframe Terrain
    const segments = 50;
    const planeGeo = new THREE.PlaneGeometry(90, 90, segments, segments);
    const posAttr = planeGeo.attributes.position;
    const basePositions = new Float32Array(posAttr.array);

    const gridMaterial = new THREE.MeshBasicMaterial({
      color: 0x64ffda,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });

    const grid = new THREE.Mesh(planeGeo, gridMaterial);
    grid.rotation.x = -Math.PI / 2.3;
    grid.position.y = -5.5;
    grid.position.z = -10;
    scene.add(grid);

    // 2. Starfield Glowing Particles
    const starCount = 220;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const palette = [
      new THREE.Color(0x64ffda), // mint
      new THREE.Color(0xffb454), // amber
      new THREE.Color(0xff8383), // coral
      new THREE.Color(0x58a6ff), // blue
    ];

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 85;
      starPositions[i * 3 + 1] = Math.random() * 32 - 2;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 65 - 15;

      const col = palette[Math.floor(Math.random() * palette.length)];
      starColors[i * 3] = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });

    const stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);

    // Mouse Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event) => {
      targetMouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Undulate Terrain
      for (let i = 0; i < posAttr.count; i++) {
        const x = basePositions[i * 3];
        const y = basePositions[i * 3 + 1];
        const wave =
          Math.sin(x * 0.15 + elapsed * 0.8) * 0.95 +
          Math.cos(y * 0.18 + elapsed * 0.6) * 0.75;
        posAttr.setZ(i, wave);
      }
      posAttr.needsUpdate = true;

      // Rotate Stars slowly
      stars.rotation.y += 0.0005;
      stars.rotation.x += 0.0002;

      // Smooth Camera Parallax
      camera.position.x += (targetMouseX * 2.5 - camera.position.x) * 0.03;
      camera.position.y += (4 - targetMouseY * 1.5 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, -10);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      planeGeo.dispose();
      gridMaterial.dispose();
      starGeo.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
};
