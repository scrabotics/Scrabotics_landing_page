import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { Activity, Crosshair, Cpu, Compass, Zap, Sparkles } from 'lucide-react';

// Shared industrial materials — strictly adhering to the SCRABOTICS palette
function useRobotMaterials() {
  return useMemo(() => {
    const graphite = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#222222'),
      metalness: 0.82,
      roughness: 0.28,
    });

    const matteBlack = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#111111'),
      metalness: 0.45,
      roughness: 0.65,
    });

    const brushedSteel = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#78766E'),
      metalness: 0.9,
      roughness: 0.22,
    });

    const concreteMetal = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#B8B6AC'),
      metalness: 0.6,
      roughness: 0.35,
    });

    const chromePiston = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D8D5CC'),
      metalness: 0.96,
      roughness: 0.1,
    });

    const acidLimeLED = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#C7FF35'),
      emissive: new THREE.Color('#C7FF35'),
      emissiveIntensity: 1.6,
      roughness: 0.2,
      metalness: 0.1,
    });

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#111111'),
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });

    return {
      graphite,
      matteBlack,
      brushedSteel,
      concreteMetal,
      chromePiston,
      acidLimeLED,
      wireframeMat,
    };
  }, []);
}

// Reusable Bolt / Fastener Cluster
function BoltRing({ radius = 0.5, count = 8, y = 0, size = 0.025, material }) {
  const bolts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      return [Math.cos(angle) * radius, y, Math.sin(angle) * radius];
    });
  }, [radius, count, y]);

  return (
    <group>
      {bolts.map((pos, idx) => (
        <mesh key={idx} position={pos} material={material} castShadow>
          <cylinderGeometry args={[size, size, size * 1.2, 6]} />
        </mesh>
      ))}
    </group>
  );
}

// Articulated Robotic Arm Assembly (Shoulder -> Upper Arm -> Elbow -> Forearm -> 3-Jaw Gripper)
function MechanicalArm({ side = 1, materials, armRef, elbowRef, gripperRef, explodedOffset = 0 }) {
  const { graphite, matteBlack, brushedSteel, concreteMetal, chromePiston, acidLimeLED } = materials;

  return (
    <group
      ref={armRef}
      position={[side * (1.28 + explodedOffset * 0.45), 0.55, 0]}
    >
      {/* Shoulder Servo Drum */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={graphite} castShadow receiveShadow>
        <cylinderGeometry args={[0.34, 0.34, 0.42, 24]} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} material={matteBlack}>
        <cylinderGeometry args={[0.36, 0.36, 0.12, 16]} />
      </mesh>
      {/* Acid-Lime Shoulder Encoder Ring */}
      <mesh position={[side * 0.22, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={acidLimeLED}>
        <torusGeometry args={[0.22, 0.015, 8, 24]} />
      </mesh>
      {/* End Cap Bolts */}
      <group position={[side * 0.22, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <BoltRing radius={0.16} count={6} y={0} size={0.018} material={brushedSteel} />
      </group>

      {/* Upper Arm Structural Truss (Dual Rails + Hydraulic Damper) */}
      <group position={[side * 0.18, -0.55 - explodedOffset * 0.15, 0]}>
        {/* Outer Rail */}
        <mesh position={[0, 0, 0.1]} material={concreteMetal} castShadow>
          <boxGeometry args={[0.12, 0.85, 0.07]} />
        </mesh>
        {/* Inner Rail */}
        <mesh position={[0, 0, -0.1]} material={concreteMetal} castShadow>
          <boxGeometry args={[0.12, 0.85, 0.07]} />
        </mesh>
        {/* Cross Brace */}
        <mesh position={[0, 0.05, 0]} material={matteBlack}>
          <boxGeometry args={[0.16, 0.22, 0.28]} />
        </mesh>
        {/* Hydraulic Cylinder & Chrome Piston */}
        <mesh position={[side * 0.08, 0.15, 0]} material={graphite}>
          <cylinderGeometry args={[0.045, 0.045, 0.45, 16]} />
        </mesh>
        <mesh position={[side * 0.08, -0.15, 0]} material={chromePiston}>
          <cylinderGeometry args={[0.025, 0.025, 0.45, 16]} />
        </mesh>

        {/* Elbow Rotary Joint */}
        <group ref={elbowRef} position={[0, -0.48 - explodedOffset * 0.15, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={matteBlack} castShadow>
            <cylinderGeometry args={[0.24, 0.24, 0.34, 20]} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} material={brushedSteel}>
            <cylinderGeometry args={[0.14, 0.14, 0.38, 12]} />
          </mesh>
          {/* Forearm Assembly */}
          <group position={[0, -0.45, 0.12]}>
            <mesh rotation={[0.25, 0, 0]} material={graphite} castShadow>
              <boxGeometry args={[0.22, 0.72, 0.24]} />
            </mesh>
            {/* Forearm Cooling Fins */}
            {[-0.15, -0.05, 0.05, 0.15].map((yPos, i) => (
              <mesh key={i} position={[side * 0.12, yPos, 0]} rotation={[0.25, 0, 0]} material={matteBlack}>
                <boxGeometry args={[0.04, 0.03, 0.26]} />
              </mesh>
            ))}
            {/* Forearm Lime Status Strip */}
            <mesh position={[0, 0, 0.13]} rotation={[0.25, 0, 0]} material={acidLimeLED}>
              <boxGeometry args={[0.04, 0.38, 0.015]} />
            </mesh>

            {/* Wrist Servo & Industrial Gripper */}
            <group ref={gripperRef} position={[0, -0.44 - explodedOffset * 0.15, 0.1]}>
              <mesh material={brushedSteel}>
                <cylinderGeometry args={[0.14, 0.16, 0.14, 16]} />
              </mesh>
              {/* Left Claw */}
              <mesh position={[-0.08, -0.16, 0.04]} rotation={[0, 0, 0.18]} material={matteBlack}>
                <boxGeometry args={[0.035, 0.22, 0.06]} />
              </mesh>
              {/* Right Claw */}
              <mesh position={[0.08, -0.16, 0.04]} rotation={[0, 0, -0.18]} material={matteBlack}>
                <boxGeometry args={[0.035, 0.22, 0.06]} />
              </mesh>
              {/* Rear Stabilizer Claw */}
              <mesh position={[0, -0.16, -0.07]} rotation={[-0.18, 0, 0]} material={concreteMetal}>
                <boxGeometry args={[0.05, 0.2, 0.035]} />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

// Main Industrial Robot Assembly
function ScraboticsUnit001({
  isHovered,
  diagnosticMode,
  scrollProgressRef,
  prefersReducedMotion,
}) {
  const materials = useRobotMaterials();
  const {
    graphite,
    matteBlack,
    brushedSteel,
    concreteMetal,
    chromePiston,
    acidLimeLED,
    wireframeMat,
  } = materials;

  const rootRef = useRef();
  const torsoRef = useRef();
  const headGroupRef = useRef();
  const lidarSpinnerRef = useRef();
  const lensRingRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const leftElbowRef = useRef();
  const rightElbowRef = useRef();
  const leftGripperRef = useRef();
  const rightGripperRef = useRef();
  const outerRingRef = useRef();
  const innerRingRef = useRef();

  const { pointer, camera } = useThree();
  const [introComplete, setIntroComplete] = useState(false);

  const explodedTarget = diagnosticMode === 'EXPLODED' ? 1 : 0;
  const explodedRef = useRef(0);

  // 4. INTRO ANIMATION — Smooth 3D mechanical reveal + LED power-up
  useEffect(() => {
    if (!rootRef.current || !headGroupRef.current) return;

    if (prefersReducedMotion) {
      setIntroComplete(true);
      return;
    }

    // Initial state before reveal
    rootRef.current.position.y = -1.6;
    rootRef.current.rotation.y = -0.85;
    rootRef.current.scale.set(0.82, 0.82, 0.82);
    headGroupRef.current.rotation.x = 0.55;
    acidLimeLED.emissiveIntensity = 0.05;

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => setIntroComplete(true),
    });

    tl.to(rootRef.current.position, { y: -0.25, duration: 1.35 }, 0.1)
      .to(rootRef.current.scale, { x: 1, y: 1, z: 1, duration: 1.35 }, 0.1)
      .to(rootRef.current.rotation, { y: -0.22, duration: 1.5 }, 0.1)
      .to(headGroupRef.current.rotation, { x: 0, duration: 1.1, ease: 'back.out(1.6)' }, 0.55)
      .to(
        acidLimeLED,
        {
          emissiveIntensity: 1.8,
          duration: 0.65,
          ease: 'rough({ template: none.out, strength: 1, points: 10, taper: none, randomize: true, clamp: false })',
        },
        0.75
      );

    return () => tl.kill();
  }, [acidLimeLED, prefersReducedMotion]);

  // 1. IDLE + 2. MOUSE + 3. SCROLL + 5. HOVER ANIMATION LOOP
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const scrollProgress = scrollProgressRef?.current || 0;

    // Smoothly interpolate exploded assembly offset
    explodedRef.current = THREE.MathUtils.lerp(explodedRef.current, explodedTarget, delta * 5);

    if (!rootRef.current) return;

    // 1. IDLE ANIMATION: gentle vertical breathing + LED pulse
    const idleFloatY = prefersReducedMotion ? 0 : Math.sin(t * 1.8) * 0.065;
    const speedMult = diagnosticMode === 'SERVO_TEST' ? 2.8 : isHovered ? 1.6 : 1.0;

    // LED Pulse
    if (introComplete) {
      const targetIntensity = isHovered
        ? 2.6 + Math.sin(t * 10) * 0.4
        : 1.5 + Math.sin(t * 3.2) * 0.35;
      acidLimeLED.emissiveIntensity = THREE.MathUtils.lerp(
        acidLimeLED.emissiveIntensity,
        targetIntensity,
        delta * 6
      );
    }

    // 2. MOUSE + 3. SCROLL INTERACTION on Root & Torso
    const mouseX = pointer.x || 0;
    const mouseY = pointer.y || 0;

    const scrollYaw = scrollProgress * Math.PI * 0.85;
    const targetRootYaw = -0.22 + mouseX * 0.32 + scrollYaw;
    const targetRootPitch = -mouseY * 0.12 + scrollProgress * 0.15;

    rootRef.current.rotation.y = THREE.MathUtils.lerp(
      rootRef.current.rotation.y,
      targetRootYaw,
      delta * 3.5
    );
    rootRef.current.rotation.x = THREE.MathUtils.lerp(
      rootRef.current.rotation.x,
      targetRootPitch,
      delta * 3.5
    );
    rootRef.current.position.y = THREE.MathUtils.lerp(
      rootRef.current.position.y,
      -0.25 + idleFloatY,
      delta * 4
    );

    // Subtle camera perspective parallax
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX * 0.38, delta * 2.5);
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      0.35 + mouseY * 0.25 - scrollProgress * 0.3,
      delta * 2.5
    );
    camera.lookAt(0, 0.1, 0);

    // 2. HEAD TRACKING CURSOR + DIAGNOSTIC SCAN
    if (headGroupRef.current) {
      const scanOffset =
        diagnosticMode === 'SCAN' ? Math.sin(t * 2.6) * 0.55 : Math.sin(t * 0.9) * 0.06;
      const headTargetYaw = mouseX * 0.55 + scanOffset;
      const headTargetPitch = -mouseY * 0.38 + Math.cos(t * 1.4) * 0.04;
      const headTargetRoll = -mouseX * 0.12;

      headGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.y,
        headTargetYaw,
        delta * 6
      );
      headGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.x,
        headTargetPitch,
        delta * 6
      );
      headGroupRef.current.rotation.z = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.z,
        headTargetRoll,
        delta * 5
      );
      headGroupRef.current.position.y = 1.38 + explodedRef.current * 0.35;
    }

    // Continuous LiDAR Turret Spin & Optical Aperture Rotation
    if (lidarSpinnerRef.current && !prefersReducedMotion) {
      lidarSpinnerRef.current.rotation.y += delta * (isHovered ? 8.5 : 4.2);
    }
    if (lensRingRef.current && !prefersReducedMotion) {
      lensRingRef.current.rotation.z = Math.sin(t * 1.5 * speedMult) * 0.6;
    }

    // Torso subtle counter-twist
    if (torsoRef.current) {
      torsoRef.current.rotation.y = THREE.MathUtils.lerp(
        torsoRef.current.rotation.y,
        mouseX * 0.15 + Math.sin(t * 1.1) * 0.03,
        delta * 4
      );
    }

    // Articulated Arms & Servo Joints
    if (leftArmRef.current && rightArmRef.current) {
      const hoverLift = isHovered ? -0.25 : 0;
      const servoWave = diagnosticMode === 'SERVO_TEST' ? Math.sin(t * 3.5) * 0.45 : 0;

      leftArmRef.current.rotation.x = THREE.MathUtils.lerp(
        leftArmRef.current.rotation.x,
        -0.18 + Math.sin(t * 1.4) * 0.08 + hoverLift + servoWave,
        delta * 4
      );
      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(
        rightArmRef.current.rotation.x,
        -0.25 - Math.sin(t * 1.4) * 0.08 + hoverLift * 1.2 - servoWave,
        delta * 4
      );

      leftArmRef.current.rotation.z = THREE.MathUtils.lerp(
        leftArmRef.current.rotation.z,
        -0.08 - (isHovered ? 0.12 : 0),
        delta * 4
      );
      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(
        rightArmRef.current.rotation.z,
        0.08 + (isHovered ? 0.12 : 0),
        delta * 4
      );

      // Update exploded horizontal offset on arms
      leftArmRef.current.position.x = -(1.28 + explodedRef.current * 0.42);
      rightArmRef.current.position.x = 1.28 + explodedRef.current * 0.42;
    }

    if (leftElbowRef.current && rightElbowRef.current) {
      const elbowTarget = isHovered ? -0.68 : -0.42;
      leftElbowRef.current.rotation.x = THREE.MathUtils.lerp(
        leftElbowRef.current.rotation.x,
        elbowTarget + Math.cos(t * 1.8) * 0.08,
        delta * 5
      );
      rightElbowRef.current.rotation.x = THREE.MathUtils.lerp(
        rightElbowRef.current.rotation.x,
        elbowTarget - Math.cos(t * 1.8) * 0.08,
        delta * 5
      );
    }

    if (leftGripperRef.current && rightGripperRef.current) {
      leftGripperRef.current.rotation.y = t * 0.8 * speedMult;
      rightGripperRef.current.rotation.y = -t * 0.8 * speedMult;
    }

    // Technical Telemetry Rings in 3D Space
    if (outerRingRef.current && innerRingRef.current && !prefersReducedMotion) {
      outerRingRef.current.rotation.z = t * 0.12;
      innerRingRef.current.rotation.y = -t * 0.18;
    }
  });

  return (
    <group ref={rootRef} position={[0, -0.25, 0]}>
      {/* ============================================================
          1. HEAVY INDUSTRIAL ROTARY BASE PEDESTAL
         ============================================================ */}
      <group position={[0, -1.25 - explodedRef.current * 0.25, 0]}>
        {/* Lower Octagonal/Cylindrical Plinth */}
        <mesh material={matteBlack} castShadow receiveShadow>
          <cylinderGeometry args={[1.15, 1.28, 0.24, 16]} />
        </mesh>
        {/* Brushed Steel Turret Bearing Ring */}
        <mesh position={[0, 0.16, 0]} material={brushedSteel} castShadow receiveShadow>
          <cylinderGeometry args={[0.92, 1.02, 0.14, 24]} />
        </mesh>
        {/* Perimeter Structural Hex Bolts */}
        <BoltRing radius={1.06} count={12} y={0.13} size={0.03} material={concreteMetal} />
        {/* Acid-Lime Base Telemetry Ring */}
        <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]} material={acidLimeLED}>
          <torusGeometry args={[1.22, 0.014, 8, 48]} />
        </mesh>

        {/* Waist Hydraulic Spine & Gimbal */}
        <mesh position={[0, 0.42, 0]} material={graphite} castShadow>
          <cylinderGeometry args={[0.46, 0.58, 0.48, 16]} />
        </mesh>
        {/* Twin Front/Rear Waist Pistons */}
        {[-0.36, 0.36].map((xPos, i) => (
          <group key={i} position={[xPos, 0.48, 0.28]}>
            <mesh material={brushedSteel}>
              <cylinderGeometry args={[0.06, 0.06, 0.42, 12]} />
            </mesh>
            <mesh position={[0, 0.22, 0]} material={chromePiston}>
              <cylinderGeometry args={[0.035, 0.035, 0.38, 12]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ============================================================
          2. ARTICULATED TORSO & REACTOR CHASSIS
         ============================================================ */}
      <group ref={torsoRef} position={[0, 0.18, 0]}>
        {/* Main Armored Graphite Core Block */}
        <mesh material={graphite} castShadow receiveShadow>
          <boxGeometry args={[1.76, 1.42, 1.12]} />
        </mesh>

        {/* Wireframe CAD Overlay Cage (subtle industrial blueprint touch) */}
        <mesh material={wireframeMat} scale={[1.03, 1.03, 1.03]}>
          <boxGeometry args={[1.76, 1.42, 1.12, 2, 2, 2]} />
        </mesh>

        {/* Front Upper Beveled Armor Plate */}
        <mesh
          position={[0, 0.22, 0.56 + explodedRef.current * 0.25]}
          material={matteBlack}
          castShadow
        >
          <boxGeometry args={[1.48, 0.78, 0.14]} />
        </mesh>

        {/* Concrete-Grey Structural Side Cheek Plates */}
        {[-1, 1].map((side) => (
          <group
            key={side}
            position={[side * (0.9 + explodedRef.current * 0.2), 0.05, 0]}
          >
            <mesh material={concreteMetal} castShadow>
              <boxGeometry args={[0.1, 1.12, 0.88]} />
            </mesh>
            {/* Side Bolt Fasteners */}
            {[-0.38, 0.38].map((yPos, yi) =>
              [-0.28, 0.28].map((zPos, zi) => (
                <mesh
                  key={`${yi}-${zi}`}
                  position={[side * 0.06, yPos, zPos]}
                  rotation={[0, 0, Math.PI / 2]}
                  material={matteBlack}
                >
                  <cylinderGeometry args={[0.025, 0.025, 0.03, 6]} />
                </mesh>
              ))
            )}
          </group>
        ))}

        {/* Central Power Core & Diagnostic Acid-Lime Status Array */}
        <group position={[0, 0.22, 0.64 + explodedRef.current * 0.3]}>
          {/* Outer Reactor Bezel */}
          <mesh rotation={[Math.PI / 2, 0, 0]} material={brushedSteel}>
            <cylinderGeometry args={[0.28, 0.31, 0.08, 24]} />
          </mesh>
          {/* Inner Matte Core */}
          <mesh position={[0, 0, 0.03]} rotation={[Math.PI / 2, 0, 0]} material={matteBlack}>
            <cylinderGeometry args={[0.2, 0.2, 0.06, 16]} />
          </mesh>
          {/* Glowing Acid-Lime Core Ring */}
          <mesh position={[0, 0, 0.06]} material={acidLimeLED}>
            <torusGeometry args={[0.16, 0.022, 12, 32]} />
          </mesh>
          {/* Center Lime Beacon */}
          <mesh position={[0, 0, 0.06]} rotation={[Math.PI / 2, 0, 0]} material={acidLimeLED}>
            <cylinderGeometry args={[0.05, 0.05, 0.04, 16]} />
          </mesh>
        </group>

        {/* Lower Torso Radiator Vent Louvers */}
        {[-0.45, -0.35, -0.25, -0.15].map((yPos, idx) => (
          <mesh key={idx} position={[0, yPos, 0.57]} material={brushedSteel}>
            <boxGeometry args={[1.1, 0.04, 0.06]} />
          </mesh>
        ))}

        {/* Rear Spine Cooling Pack & Exhaust Manifold */}
        <group position={[0, 0.1, -0.62 - explodedRef.current * 0.2]}>
          <mesh material={matteBlack} castShadow>
            <boxGeometry args={[1.2, 1.05, 0.26]} />
          </mesh>
          <mesh position={[0, 0, -0.14]} material={acidLimeLED}>
            <boxGeometry args={[0.06, 0.72, 0.02]} />
          </mesh>
        </group>

        {/* Shoulder Collar Mounts */}
        <mesh position={[0, 0.76, 0]} material={brushedSteel}>
          <cylinderGeometry args={[0.42, 0.48, 0.16, 20]} />
        </mesh>

        {/* ============================================================
            3. DUAL ARTICULATED 4-DOF MECHANICAL ARMS
           ============================================================ */}
        <MechanicalArm
          side={-1}
          materials={materials}
          armRef={leftArmRef}
          elbowRef={leftElbowRef}
          gripperRef={leftGripperRef}
          explodedOffset={explodedRef.current}
        />
        <MechanicalArm
          side={1}
          materials={materials}
          armRef={rightArmRef}
          elbowRef={rightElbowRef}
          gripperRef={rightGripperRef}
          explodedOffset={explodedRef.current}
        />
      </group>

      {/* ============================================================
          4. PRECISION SENSOR HEAD & OPTICAL GIMBAL UNIT
         ============================================================ */}
      <group ref={headGroupRef} position={[0, 1.38, 0]}>
        {/* Neck Gimbal Actuator */}
        <mesh position={[0, -0.26, 0]} material={chromePiston}>
          <cylinderGeometry args={[0.18, 0.22, 0.32, 16]} />
        </mesh>

        {/* Main Armored Sensor Head Chassis */}
        <mesh material={graphite} castShadow receiveShadow>
          <boxGeometry args={[1.18, 0.64, 0.86]} />
        </mesh>

        {/* Upper Chamfered Visor Hood */}
        <mesh position={[0, 0.34, 0.04]} material={concreteMetal} castShadow>
          <boxGeometry args={[1.04, 0.08, 0.82]} />
        </mesh>

        {/* Front Recessed Optical Faceplate */}
        <mesh position={[0, 0, 0.44 + explodedRef.current * 0.18]} material={matteBlack}>
          <boxGeometry args={[1.02, 0.48, 0.06]} />
        </mesh>

        {/* Primary Right Optical Camera Lens Assembly (Multi-Element) */}
        <group position={[-0.24, 0.02, 0.48 + explodedRef.current * 0.24]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} material={brushedSteel}>
            <cylinderGeometry args={[0.17, 0.19, 0.12, 24]} />
          </mesh>
          <mesh position={[0, 0, 0.05]} rotation={[Math.PI / 2, 0, 0]} material={matteBlack}>
            <cylinderGeometry args={[0.13, 0.13, 0.08, 20]} />
          </mesh>
          {/* Rotating Aperture Ring with Acid-Lime Index */}
          <group ref={lensRingRef} position={[0, 0, 0.09]}>
            <mesh material={acidLimeLED}>
              <torusGeometry args={[0.11, 0.015, 8, 24]} />
            </mesh>
            <mesh position={[0, 0.11, 0.01]} material={acidLimeLED}>
              <boxGeometry args={[0.025, 0.04, 0.02]} />
            </mesh>
          </group>
          {/* Center Pupil LED */}
          <mesh position={[0, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]} material={acidLimeLED}>
            <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
          </mesh>
        </group>

        {/* Secondary Left Telemetry Matrix / Laser Targeter */}
        <group position={[0.25, 0.02, 0.48 + explodedRef.current * 0.24]}>
          <mesh material={graphite}>
            <boxGeometry args={[0.34, 0.24, 0.08]} />
          </mesh>
          {/* Dual Acid-Lime Horizontal Sensor Bars */}
          <mesh position={[0, 0.04, 0.045]} material={acidLimeLED}>
            <boxGeometry args={[0.26, 0.032, 0.015]} />
          </mesh>
          <mesh position={[0, -0.04, 0.045]} material={acidLimeLED}>
            <boxGeometry args={[0.18, 0.022, 0.015]} />
          </mesh>
        </group>

        {/* Top Spinning 360° LiDAR Puck */}
        <group position={[0, 0.46 + explodedRef.current * 0.18, -0.05]}>
          <mesh material={matteBlack}>
            <cylinderGeometry args={[0.24, 0.26, 0.1, 20]} />
          </mesh>
          <group ref={lidarSpinnerRef} position={[0, 0.09, 0]}>
            <mesh material={brushedSteel}>
              <cylinderGeometry args={[0.22, 0.22, 0.1, 20]} />
            </mesh>
            {/* LiDAR Emitter Window */}
            <mesh position={[0, 0, 0.21]} material={acidLimeLED}>
              <boxGeometry args={[0.14, 0.04, 0.03]} />
            </mesh>
          </group>
        </group>

        {/* Side Comms Antennas & Ear RotaryPods */}
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 0.63, 0, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]} material={brushedSteel}>
              <cylinderGeometry args={[0.18, 0.18, 0.08, 16]} />
            </mesh>
            <mesh
              position={[side * 0.03, 0.38, -0.12]}
              material={matteBlack}
            >
              <cylinderGeometry args={[0.015, 0.022, 0.65, 8]} />
            </mesh>
            {/* Antenna Tip Beacon */}
            <mesh position={[side * 0.03, 0.72, -0.12]} material={acidLimeLED}>
              <sphereGeometry args={[0.028, 10, 10]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ============================================================
          5. ORBITAL ENGINEERING TELEMETRY RINGS & GLOWING CYAN PORTAL
         ============================================================ */}
      {/* Primary Glowing Cyan Halo Portal Ring (CYRON aesthetic) */}
      <group position={[0, 0.42, -0.45]}>
        <mesh>
          <torusGeometry args={[2.05, 0.038, 16, 64]} />
          <meshBasicMaterial color="#00C8E8" />
        </mesh>
        <mesh>
          <torusGeometry args={[2.14, 0.012, 16, 64]} />
          <meshBasicMaterial color="#C7FF35" transparent opacity={0.75} />
        </mesh>
        <pointLight position={[0, 0, 0.2]} intensity={2.4} color="#00C8E8" distance={4.5} />
      </group>

      <group ref={outerRingRef} position={[0, 0.25, -0.2]}>
        <mesh material={matteBlack}>
          <torusGeometry args={[2.15, 0.012, 8, 64]} />
        </mesh>
        {[0, 1, 2, 3].map((idx) => {
          const angle = (idx / 4) * Math.PI * 2;
          return (
            <mesh
              key={idx}
              position={[Math.cos(angle) * 2.15, Math.sin(angle) * 2.15, 0]}
              material={acidLimeLED}
            >
              <boxGeometry args={[0.08, 0.08, 0.08]} />
            </mesh>
          );
        })}
      </group>

      <group ref={innerRingRef} position={[0, 0.25, 0]} rotation={[0.45, 0.2, 0]}>
        <mesh material={concreteMetal}>
          <torusGeometry args={[1.82, 0.008, 8, 48]} />
        </mesh>
      </group>
    </group>
  );
}

export default function Robot3DScene({
  isHeroHovered = false,
  scrollProgressRef,
}) {
  const [diagnosticMode, setDiagnosticMode] = useState('IDLE');
  const [isCanvasHovered, setIsCanvasHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const combinedHover = isHeroHovered || isCanvasHovered;

  if (!webglSupported) {
    // Graceful high-detail fallback for devices without WebGL
    return (
      <div className="relative w-full h-[460px] sm:h-[560px] lg:h-[640px] border-[3px] border-[#111111] bg-[#222222] text-[#F3F0E8] flex flex-col items-center justify-center p-8 brutal-shadow-lg">
        <div className="font-mono text-xs uppercase tracking-widest bg-[#C7FF35] text-[#111111] px-3 py-1 font-bold mb-4">
          UNIT_001 // STATIC CAD FALLBACK MODE
        </div>
        <p className="font-display text-3xl uppercase text-center max-w-md">
          SCRABOTICS MECHANICAL CHASSIS REV 4.2
        </p>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[520px] sm:h-[600px] lg:h-[700px] select-none rounded-2xl border-[3px] border-[#111111] bg-[#090D12] overflow-hidden shadow-[8px_8px_0px_#111111]"
      onMouseEnter={() => setIsCanvasHovered(true)}
      onMouseLeave={() => setIsCanvasHovered(false)}
    >
      {/* Background Cyber Carbon Grid & Glowing Cyan Portal Ring Effect (CYRON Aesthetic) */}
      <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.02)_0px,rgba(255,255,255,0.02)_1px,transparent_1px,transparent_14px)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_48%,rgba(0,200,232,0.32)_0%,rgba(199,255,53,0.1)_38%,transparent_70%)]" />

      {/* Ambient Floating Cyan Orbs */}
      <div className="absolute -left-6 top-1/4 w-28 h-28 rounded-full bg-[#00C8E8]/20 blur-2xl pointer-events-none animate-pulse" />
      <div className="absolute -right-8 bottom-1/4 w-32 h-32 rounded-full bg-[#00C8E8]/25 blur-2xl pointer-events-none animate-pulse" />

      {/* =====================================================================
          CYRON-INSPIRED HUD OVERLAY: Top Header, Floating Widgets & Telemetry
         ===================================================================== */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-3 sm:p-5">
        {/* Top Header: NextGen Status Pill & Oversized Extended Cyber Title */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 bg-[#111111]/90 backdrop-blur-md border border-[#00C8E8]/40 px-3 py-1 rounded-full text-[10px] font-mono text-[#00C8E8]">
              <span className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C8E8] animate-ping" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C8E8]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C8E8]" />
              </span>
              <span className="font-bold tracking-widest uppercase">NEXTGEN // KINEMATIC RIG</span>
            </div>

            <div className="hidden sm:flex items-center gap-3 font-mono text-[10px] text-white/70">
              <span className="border border-white/20 px-2 py-0.5 rounded bg-black/40">SYSTEM // ONLINE</span>
              <span className="border border-[#C7FF35]/40 px-2 py-0.5 rounded bg-black/40 text-[#C7FF35]">BUS // 24V DC</span>
            </div>
          </div>

          {/* Central Oversized Extended Cyber Title (Matching CYRON typography) */}
          <div className="text-center pt-1">
            <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl tracking-[0.25em] sm:tracking-[0.35em] uppercase text-white drop-shadow-[0_0_20px_rgba(0,200,232,0.55)] select-none">
              SCRABOTICS
            </h2>
          </div>
        </div>

        {/* Middle Floating HUD Telemetry Cards (Left & Right) */}
        <div className="grid grid-cols-2 gap-4 items-center">
          {/* LEFT COLUMN: Subtitle + Compass Radar + Real-Time Waveform */}
          <div className="space-y-3 max-w-[210px] sm:max-w-[240px]">
            {/* Mission Subtitle */}
            <div className="hidden sm:block text-[10px] font-mono font-bold uppercase tracking-wider text-white/80 border-l-2 border-[#00C8E8] pl-2 bg-black/30 backdrop-blur-sm py-1">
              THE FUTURE OF AUTONOMOUS SYSTEMS &amp; ROBOTICS
            </div>

            {/* Circular Radar Compass Widget (EXPLORE) */}
            <div className="hidden xs:flex items-center gap-2.5 bg-[#090D12]/80 backdrop-blur-md border border-white/15 p-2 rounded-xl text-white font-mono shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <div className="relative w-8 h-8 rounded-full border border-[#00C8E8] flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5 text-[#00C8E8] animate-[spin_8s_linear_infinite]" />
                <span className="absolute w-1 h-1 bg-[#C7FF35] rounded-full" />
              </div>
              <div>
                <div className="text-[9px] text-[#00C8E8] font-bold tracking-widest uppercase">EXPLORE</div>
                <div className="text-[10px] font-extrabold text-white">UNIT_001 RIG</div>
              </div>
            </div>

            {/* Performance Waveform Chart (CYRON Waveform) */}
            <div className="bg-[#090D12]/85 backdrop-blur-md border border-white/15 p-2.5 rounded-xl text-white font-mono shadow-[0_4px_20px_rgba(0,0,0,0.5)] space-y-1.5">
              <div className="flex items-center justify-between text-[9px] text-[#B8B6AC]">
                <span>PERFORMANCE METRICS</span>
                <span className="text-[#C7FF35] font-bold">60 FPS</span>
              </div>
              {/* Animated SVG Waveform Grid */}
              <div className="h-9 w-full overflow-hidden relative border-b border-white/10">
                <svg viewBox="0 0 160 36" className="w-full h-full" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="18" x2="160" y2="18" stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />
                  {/* Glowing Cyan Wave */}
                  <path
                    d="M 0 24 Q 20 8, 40 20 T 80 14 T 120 22 T 160 10"
                    fill="none"
                    stroke="#00C8E8"
                    strokeWidth="2"
                    className="drop-shadow-[0_0_6px_#00C8E8]"
                  />
                  {/* Acid Lime Wave */}
                  <path
                    d="M 0 20 Q 20 28, 40 14 T 80 26 T 120 12 T 160 22"
                    fill="none"
                    stroke="#C7FF35"
                    strokeWidth="1.5"
                    strokeOpacity="0.8"
                  />
                </svg>
              </div>
              <div className="text-[8px] text-[#00C8E8] font-bold flex items-center justify-between">
                <span>POSITIVE UPTREND</span>
                <span>LATENCY: 4.2ms</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Glowing Plasma Sphere & Power Telemetry Pill */}
          <div className="flex flex-col items-end space-y-3 justify-self-end max-w-[210px] sm:max-w-[240px]">
            {/* Floating Glowing Plasma Core Widget (+480MHz / Neural Storage) */}
            <div className="bg-[#090D12]/85 backdrop-blur-md border border-white/15 p-2.5 rounded-xl text-white font-mono shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center gap-3 w-fit">
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-orange-400 to-[#00C8E8] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.6)] animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-white leading-none">+480 Mhz</div>
                <div className="text-[8px] text-[#B8B6AC] uppercase tracking-wider mt-0.5">LOCAL NEURAL BUS</div>
              </div>
            </div>

            {/* Beveled Energy Fidelity Pill (CYRON Energy Consumption) */}
            <div className="bg-[#F3F0E8] text-[#111111] p-2.5 rounded-xl border-2 border-[#111111] shadow-[4px_4px_0_0_#C7FF35] font-mono w-full max-w-[170px] space-y-1">
              <div className="flex items-center justify-between text-[9px] font-bold">
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-[#111111]" />
                  <span>ENERGY</span>
                </span>
                <span className="text-[#111111]/70">12H</span>
              </div>
              <div className="text-xs font-black">98.6% FIDELITY</div>
              {/* Dynamic Equalizer Bars */}
              <div className="flex items-end gap-1 h-3 pt-0.5">
                {[60, 90, 45, 100, 75, 85, 40, 95].map((height, i) => (
                  <span
                    key={i}
                    className="flex-1 bg-[#111111] rounded-t-sm"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Diagnostic Mode Bar */}
        <div className="pointer-events-auto flex flex-wrap items-center justify-between gap-2 pt-2 bg-black/60 backdrop-blur-md -mx-3 -mb-3 sm:-mx-5 sm:-mb-5 p-3 sm:px-5 border-t border-white/10">
          <div className="text-white/80 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C7FF35] animate-ping" />
            <span>INTERACTIVE 3D RIG — CHOOSE TELEMETRY MODE:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'IDLE', label: '01. IDLE' },
              { id: 'SCAN', label: '02. LIDAR SCAN' },
              { id: 'SERVO_TEST', label: '03. SERVO ACTUATION' },
              { id: 'EXPLODED', label: '04. EXPLODED CAD' },
            ].map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setDiagnosticMode(mode.id)}
                className={`px-2.5 py-1 font-mono text-[10px] font-bold uppercase border-2 transition-all cursor-pointer ${
                  diagnosticMode === mode.id
                    ? 'bg-[#C7FF35] text-[#111111] border-[#C7FF35] shadow-[0_0_10px_#C7FF35]'
                    : 'bg-black/60 text-white border-white/20 hover:border-[#00C8E8] hover:text-[#00C8E8]'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Three.js Canvas with Adaptive Pixel Ratio for 60FPS Performance */}
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.35, 5.1], fov: 38 }}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        {/* High-Contrast Studio & Industrial Rim Lighting (Strictly neutral white/warm-white + lime + cyan key) */}
        <ambientLight intensity={0.9} color="#F3F0E8" />
        <directionalLight
          position={[5, 7, 5]}
          intensity={2.6}
          color="#F3F0E8"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-5, 3, -4]} intensity={1.5} color="#B8B6AC" />
        <pointLight position={[0, 1.5, 2.5]} intensity={1.2} color="#C7FF35" distance={6} />
        <pointLight position={[0, 0.45, -0.4]} intensity={2.8} color="#00C8E8" distance={5} />
        <spotLight
          position={[0, 6, -3]}
          angle={0.5}
          penumbra={0.8}
          intensity={2.2}
          color="#F3F0E8"
        />

        <Float
          speed={prefersReducedMotion ? 0 : 1.5}
          rotationIntensity={prefersReducedMotion ? 0 : 0.08}
          floatIntensity={prefersReducedMotion ? 0 : 0.15}
        >
          <ScraboticsUnit001
            isHovered={combinedHover}
            diagnosticMode={diagnosticMode}
            scrollProgressRef={scrollProgressRef}
            prefersReducedMotion={prefersReducedMotion}
          />
        </Float>

        <ContactShadows
          position={[0, -1.75, 0]}
          opacity={0.65}
          scale={7.5}
          blur={1.8}
          far={4}
          color="#000000"
        />
      </Canvas>
    </div>
  );
}
