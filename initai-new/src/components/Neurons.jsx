import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const NeuralNetwork = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const nodesRef = useRef([]);
  const linesRef = useRef([]);
  const pulseTimeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouse3DRef = useRef(new THREE.Vector3());

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.015);
    sceneRef.current = scene;

    // Camera - positioned closer
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 35;
    camera.position.y = 5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Lighting - Deep Orange sci-fi theme
    const ambientLight = new THREE.AmbientLight(0x220000, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xFF3300, 5, 100);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xFF4400, 5, 100);
    pointLight2.position.set(-20, -20, 20);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xFF5500, 4, 100);
    pointLight3.position.set(0, 20, -20);
    scene.add(pointLight3);

    const pointLight4 = new THREE.PointLight(0xDD3300, 3, 80);
    pointLight4.position.set(0, -25, 0);
    scene.add(pointLight4);

    // Generate nodes in SPHERICAL distribution
    const nodeCount = 300;
    const nodes = [];
    const nodeGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
    const sphereRadius = 15;

    // Deep Orange color palette
    const colors = [
      0xFF3300, // Deep Red-Orange
      0xFF4400, // Deep Orange
      0xFF5500, // Orange
      0xFF6600, // Bright Orange
      0xDD3300, // Dark Red-Orange
    ];

    for (let i = 0; i < nodeCount; i++) {
      // Fibonacci sphere distribution
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;

      const x = sphereRadius * Math.cos(theta) * Math.sin(phi);
      const y = sphereRadius * Math.sin(theta) * Math.sin(phi);
      const z = sphereRadius * Math.cos(phi);

      const position = new THREE.Vector3(x, y, z);

      const color = colors[Math.floor(Math.random() * colors.length)];

      const material = new THREE.MeshPhongMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 1.5,
        transparent: true,
        opacity: 0.95,
        shininess: 100
      });

      const mesh = new THREE.Mesh(nodeGeometry, material);
      mesh.position.copy(position);
      
      // Random rotation for cubic look
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.rotation.z = Math.random() * Math.PI;
      
      mesh.userData = {
        originalPosition: position.clone(),
        pulsePhase: Math.random() * Math.PI * 2,
        originalColor: color,
        velocity: new THREE.Vector3(),
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        }
      };

      scene.add(mesh);
      nodes.push({ mesh, position: mesh.position });
    }
    nodesRef.current = nodes;

    // Generate connections with MORE chaotic, web-like structure
    const lines = [];
    const connectionDistance = 9;

    for (let i = 0; i < nodes.length; i++) {
      const connectionsPerNode = Math.floor(Math.random() * 3) + 3;
      let connected = 0;

      for (let j = i + 1; j < nodes.length && connected < connectionsPerNode; j++) {
        const distance = nodes[i].mesh.userData.originalPosition.distanceTo(
          nodes[j].mesh.userData.originalPosition
        );

        if (distance < connectionDistance) {
          const points = [
            nodes[i].mesh.position,
            nodes[j].mesh.position
          ];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);

          const colors = new Float32Array(6);
          const color1 = new THREE.Color(nodes[i].mesh.material.color);
          const color2 = new THREE.Color(nodes[j].mesh.material.color);
          
          colors[0] = color1.r;
          colors[1] = color1.g;
          colors[2] = color1.b;
          colors[3] = color2.r;
          colors[4] = color2.g;
          colors[5] = color2.b;

          geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

          const material = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending,
            linewidth: 2
          });

          const line = new THREE.Line(geometry, material);
          line.userData = {
            pulsePhase: Math.random() * Math.PI * 2,
            baseOpacity: 0.5,
            nodeIndices: [i, j]
          };

          scene.add(line);
          lines.push(line);
          connected++;
        }
      }
    }
    linesRef.current = lines;

    // Add energy particles floating around
    const particleCount = 800;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 18 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      const idx = i * 3;
      particlePositions[idx] = radius * Math.cos(theta) * Math.sin(phi);
      particlePositions[idx + 1] = radius * Math.sin(theta) * Math.sin(phi);
      particlePositions[idx + 2] = radius * Math.cos(phi);

      // Deep orange particle colors
      const orangeShade = Math.random() * 0.3;
      particleColors[idx] = 1.0;
      particleColors[idx + 1] = 0.2 + orangeShade;
      particleColors[idx + 2] = 0.0;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.4,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Add detailed geometric core structure
    // Inner icosahedron core - visible triangular faces
    const innerCoreGeometry = new THREE.IcosahedronGeometry(3, 1);
    const innerCoreMaterial = new THREE.MeshPhongMaterial({
      color: 0xFF3300,
      emissive: 0xFF3300,
      emissiveIntensity: 1.5,
      transparent: true,
      opacity: 0.7,
      flatShading: true,
      blending: THREE.AdditiveBlending
    });
    const innerCore = new THREE.Mesh(innerCoreGeometry, innerCoreMaterial);
    scene.add(innerCore);

    // Wireframe over inner core
    const innerWireGeometry = new THREE.IcosahedronGeometry(3, 1);
    const innerWireMaterial = new THREE.MeshBasicMaterial({
      color: 0xFF6600,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const innerWireCore = new THREE.Mesh(innerWireGeometry, innerWireMaterial);
    scene.add(innerWireCore);

    // Middle octahedron layer with visible polygons
    const midCoreGeometry = new THREE.OctahedronGeometry(5, 0);
    const midCoreMaterial = new THREE.MeshPhongMaterial({
      color: 0xFF4400,
      emissive: 0xFF4400,
      emissiveIntensity: 1.0,
      transparent: true,
      opacity: 0.4,
      flatShading: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
    const midCore = new THREE.Mesh(midCoreGeometry, midCoreMaterial);
    scene.add(midCore);

    // Outer dodecahedron wireframe
    const outerCoreGeometry = new THREE.DodecahedronGeometry(7, 0);
    const outerCoreMaterial = new THREE.MeshBasicMaterial({
      color: 0xFF5500,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const outerCore = new THREE.Mesh(outerCoreGeometry, outerCoreMaterial);
    scene.add(outerCore);

    // Create connections from core to neurons
    const coreConnections = [];
    const connectionCount = 30; // Number of neurons to connect to core
    
    for (let i = 0; i < connectionCount; i++) {
      const randomNodeIndex = Math.floor(Math.random() * nodes.length);
      const targetNode = nodes[randomNodeIndex];
      
      const points = [
        new THREE.Vector3(0, 0, 0), // Core center
        targetNode.position
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      
      const material = new THREE.LineBasicMaterial({
        color: 0xFF3300,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });
      
      const line = new THREE.Line(geometry, material);
      line.userData = {
        targetNodeIndex: randomNodeIndex,
        pulsePhase: Math.random() * Math.PI * 2,
        baseOpacity: 0.6
      };
      
      scene.add(line);
      coreConnections.push(line);
    }
    window.coreConnections = coreConnections;

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const distance = 35;
      mouse3DRef.current = raycasterRef.current.ray.origin
        .clone()
        .add(raycasterRef.current.ray.direction.multiplyScalar(distance));
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let rotationAngle = 0;
    const animate = () => {
      requestAnimationFrame(animate);

      pulseTimeRef.current += 0.016;
      rotationAngle += 0.004;

      // Rotate sphere
      const sphereRotation = new THREE.Matrix4().makeRotationY(rotationAngle);

      // Rigid, snappy gravity effect
      const gravityStrength = 8;
      const gravityRadius = 16;

      nodesRef.current.forEach((node) => {
        const mesh = node.mesh;
        const userData = mesh.userData;
        
        const distanceToMouse = mesh.position.distanceTo(mouse3DRef.current);
        
        if (distanceToMouse < gravityRadius) {
          const direction = new THREE.Vector3()
            .subVectors(mouse3DRef.current, mesh.position)
            .normalize();
          
          // More aggressive, instant force application
          const force = (1 - distanceToMouse / gravityRadius) * gravityStrength;
          userData.velocity.add(direction.multiplyScalar(force * 0.025));
        }

        mesh.position.add(userData.velocity);

        const rotatedOriginal = userData.originalPosition.clone().applyMatrix4(sphereRotation);
        const returnForce = new THREE.Vector3()
          .subVectors(rotatedOriginal, mesh.position)
          .multiplyScalar(0.15); // Stronger spring back
        
        userData.velocity.add(returnForce);
        userData.velocity.multiplyScalar(0.85); // Less smooth damping for snappier movement

        // Intense pulsing
        const phase = userData.pulsePhase;
        const pulse = Math.sin(pulseTimeRef.current * 3 + phase) * 0.3 + 1;
        mesh.scale.setScalar(pulse);
        
        // Rotate cubes
        mesh.rotation.x += userData.rotationSpeed.x;
        mesh.rotation.y += userData.rotationSpeed.y;
        mesh.rotation.z += userData.rotationSpeed.z;
        
        const colorShift = Math.sin(pulseTimeRef.current * 0.7 + phase) * 0.5 + 0.5;
        mesh.material.emissiveIntensity = 1.2 + colorShift * 0.8;
      });

      // Update lines with energy flow
      linesRef.current.forEach((line) => {
        const indices = line.userData.nodeIndices;
        const pos1 = nodesRef.current[indices[0]].mesh.position;
        const pos2 = nodesRef.current[indices[1]].mesh.position;
        
        const positions = line.geometry.attributes.position.array;
        positions[0] = pos1.x;
        positions[1] = pos1.y;
        positions[2] = pos1.z;
        positions[3] = pos2.x;
        positions[4] = pos2.y;
        positions[5] = pos2.z;
        
        line.geometry.attributes.position.needsUpdate = true;

        const phase = line.userData.pulsePhase;
        const pulse = Math.sin(pulseTimeRef.current * 4 + phase) * 0.4 + 0.6;
        line.material.opacity = line.userData.baseOpacity * pulse;
      });

      // Rotate particles and animate core
      particles.rotation.y += 0.0015;
      particles.rotation.x += 0.0008;
      
      // Animate core layers with different pulses and rotations
      const corePulse1 = 1 + Math.sin(pulseTimeRef.current * 2) * 0.1;
      const corePulse2 = 1 + Math.sin(pulseTimeRef.current * 1.5 + 1) * 0.15;
      const corePulse3 = 1 + Math.sin(pulseTimeRef.current * 1.8 + 2) * 0.12;
      
      // Inner icosahedron
      innerCore.scale.setScalar(corePulse1);
      innerCore.rotation.x += 0.006;
      innerCore.rotation.y += 0.008;
      innerCore.material.emissiveIntensity = 1.3 + Math.sin(pulseTimeRef.current * 2) * 0.3;
      
      innerWireCore.scale.setScalar(corePulse1);
      innerWireCore.rotation.x += 0.006;
      innerWireCore.rotation.y += 0.008;
      
      // Middle octahedron
      midCore.scale.setScalar(corePulse2);
      midCore.rotation.x -= 0.004;
      midCore.rotation.y += 0.007;
      midCore.material.emissiveIntensity = 0.8 + Math.sin(pulseTimeRef.current * 1.5) * 0.3;
      
      // Outer dodecahedron
      outerCore.scale.setScalar(corePulse3);
      outerCore.rotation.x += 0.003;
      outerCore.rotation.y -= 0.005;
      outerCore.rotation.z += 0.002;
      
      // Update core to neuron connections
      if (window.coreConnections) {
        window.coreConnections.forEach((line) => {
          const targetNode = nodesRef.current[line.userData.targetNodeIndex];
          const positions = line.geometry.attributes.position.array;
          
          positions[0] = 0;
          positions[1] = 0;
          positions[2] = 0;
          positions[3] = targetNode.mesh.position.x;
          positions[4] = targetNode.mesh.position.y;
          positions[5] = targetNode.mesh.position.z;
          
          line.geometry.attributes.position.needsUpdate = true;
          
          // Pulse animation
          const phase = line.userData.pulsePhase;
          const pulse = Math.sin(pulseTimeRef.current * 4 + phase) * 0.4 + 0.6;
          line.material.opacity = line.userData.baseOpacity * pulse;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      nodesRef.current.forEach(node => {
        node.mesh.geometry.dispose();
        node.mesh.material.dispose();
      });
      linesRef.current.forEach(line => {
        line.geometry.dispose();
        line.material.dispose();
      });
      particles.geometry.dispose();
      particleMaterial.dispose();
      innerCore.geometry.dispose();
      innerCore.material.dispose();
      innerWireCore.geometry.dispose();
      innerWireCore.material.dispose();
      midCore.geometry.dispose();
      midCore.material.dispose();
      outerCore.geometry.dispose();
      outerCore.material.dispose();
      if (window.coreConnections) {
        window.coreConnections.forEach(line => {
          line.geometry.dispose();
          line.material.dispose();
        });
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <canvas ref={canvasRef} className="block" />    
    </div>
  );
};

export default NeuralNetwork;