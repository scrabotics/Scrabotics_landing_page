// Central data store for SCRABOTICS — structured for CMS / MongoDB backend integration.
// All sample values and milestone placeholders are explicitly flagged for easy replacement.

export const CLUB_META = {
  name: 'SCRABOTICS',
  division: 'SCRABOTICS ENGINEERING DIVISION',
  established: 'EST. 20XX',
  tagline: 'ROBOTICS / ENGINEERING / INNOVATION',
  location: 'ODISHA, INDIA',
  unitCode: 'UNIT_001',
  systemStatus: 'SYSTEM ONLINE',
  motionStatus: 'MOTION ACTIVE',
  coordinates: '20.2961° N, 85.8245° E',
};

export const EXPERTISE_ITEMS = [
  {
    id: '01',
    code: 'SYS_MECH_01',
    title: 'ROBOTICS DEVELOPMENT',
    subtitle: 'CAD ARCHITECTURE / KINEMATICS / ACTUATION',
    description:
      'Designing, assembling and programming robots from raw aluminum extrusions and custom carbon-reinforced chassis to closed-loop servo actuation systems.',
    specs: ['6-DOF Kinematics', 'CNC & 3D Fabrication', 'ROS2 Control Stack'],
    spanClass: 'lg:col-span-7',
    bgClass: 'bg-[#F3F0E8]',
  },
  {
    id: '02',
    code: 'SYS_COMP_02',
    title: 'COMPETITIONS',
    subtitle: 'NATIONAL ARENAS / AUTONOMOUS TRIALS',
    description:
      'Participating in high-stakes robotics challenges and engineering competitions across India—testing durability, speed, and precision under extreme field conditions.',
    specs: ['Combat & Terrain Trials', 'Autonomous Navigation', 'Rapid Field Repair'],
    spanClass: 'lg:col-span-5',
    bgClass: 'bg-[#B8B6AC]',
  },
  {
    id: '03',
    code: 'SYS_RND_03',
    title: 'RESEARCH & EXPERIMENTATION',
    subtitle: 'EMBEDDED SYSTEMS / PCB DESIGN / EDGE AI',
    description:
      'Exploring custom multi-layer electronics, sensor fusion, machine vision, and low-latency automation using industrial microcontrollers and edge compute nodes.',
    specs: ['STM32 & ESP32 Firmware', 'LiDAR SLAM Mapping', 'Custom Power PCBs'],
    spanClass: 'lg:col-span-5',
    bgClass: 'bg-[#222222] text-[#F3F0E8]',
    isDark: true,
  },
  {
    id: '04',
    code: 'SYS_LAB_04',
    title: 'COLLABORATIVE LEARNING',
    subtitle: 'OPEN HARDWARE LAB / PEER MENTORSHIP',
    description:
      'Sharing engineering knowledge and building together through intensive hands-on bootcamps, schematic reviews, and cross-disciplinary hardware sprints.',
    specs: ['Weekly Lab Sprints', 'Open-Source Schematics', 'Cross-Year Mentorship'],
    spanClass: 'lg:col-span-7',
    bgClass: 'bg-[#F3F0E8]',
  },
];

export const PROJECTS_DATA = [
  {
    id: 'PRJ-001',
    number: '01',
    name: 'Autonomous Rover',
    codename: 'NOMAD-X4 // TERRAIN RECON',
    status: 'FIELD TESTING',
    category: 'AUTONOMOUS MOBILITY',
    description:
      'Six-wheel rocker-bogie autonomous exploration rover engineered for uneven terrain traversal, real-time 2D/3D LiDAR SLAM mapping, and obstacle avoidance without GPS dependency.',
    longSpecs: {
      chassis: '6061-T6 Aluminum + Carbon Fiber Linkages',
      compute: 'Jetson Orin Nano + STM32F407 Motor Controller',
      sensors: '360° RPLiDAR A2, Stereo Depth Camera, 9-Axis IMU',
      power: '4S2P 21700 Li-Ion Pack (14.8V, 10Ah) with custom BMS',
      mass: '14.2 KG',
      telemetry: 'Sub-GHz LoRa + WebRTC Diagnostics Dashboard',
    },
    stack: ['ROS2 Humble', 'C++', 'Python', 'RPLiDAR SLAM', 'STM32', 'SolidWorks'],
    layout: 'lg:col-span-7',
    schematicType: 'rover',
    image:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'PRJ-002',
    number: '02',
    name: 'Line Following Robot',
    codename: 'VECTOR-PID // HIGH-VELOCITY TRACKER',
    status: 'COMPETITION READY',
    category: 'HIGH-SPEED CONTROL',
    description:
      'Ultra-low-center-of-gravity high-speed path tracker featuring a 16-channel custom IR reflectance array, closed-loop PID velocity profiling, and active downforce turbine.',
    longSpecs: {
      chassis: 'Custom 2mm Matte-Black FR4 Structural PCB Chassis',
      compute: 'STM32H743 ARM Cortex-M7 @ 480MHz',
      sensors: '16-Ch Multiplexed IR Array + Quadrature Magnetic Encoders',
      power: '3S LiPo High-Discharge 85C Pack',
      mass: '0.48 KG',
      telemetry: 'Bluetooth Low Energy Live PID Tuning Interface',
    },
    stack: ['Embedded C', 'PID Control', 'KiCad PCB', 'STM32H7', 'Micro-Motors'],
    layout: 'lg:col-span-5',
    schematicType: 'linefollower',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'PRJ-003',
    number: '03',
    name: 'Robotic Arm',
    codename: 'KINESIS-6 // 6-DOF INDUSTRIAL MANIPULATOR',
    status: 'ACTIVE PROTOTYPE',
    category: 'KINEMATIC MANIPULATION',
    description:
      'Six-degree-of-freedom articulated industrial robotic arm with planetary cycloidal gearboxes, inverse kinematics trajectory planner, and modular pneumatic/servo end-effectors.',
    longSpecs: {
      chassis: 'SLS Nylon-12 Printed Housing + Steel Harmonic Bearings',
      compute: 'Raspberry Pi 5 + CAN-Bus Stepper Servo Network',
      sensors: '14-Bit Magnetic Absolute Angle Encoders on All 6 Joints',
      power: '24V 15A Regulated Industrial Switching Supply',
      mass: '8.6 KG (Payload: 2.1 KG)',
      telemetry: 'Digital Twin Sync via WebSockets & Three.js',
    },
    stack: ['Inverse Kinematics', 'CAN-Bus', 'NEMA Closed-Loop', 'Fusion 360', 'Python'],
    layout: 'lg:col-span-5',
    schematicType: 'arm',
    image:
      'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'PRJ-004',
    number: '04',
    name: 'Smart Surveillance Robot',
    codename: 'SENTINEL-V2 // PERIMETER UNIT',
    status: 'DEPLOYED IN LAB',
    category: 'VISION & SECURITY',
    description:
      'All-weather omni-directional patrol platform equipped with pan-tilt thermal/optical vision turret, automated anomaly detection, and autonomous docking station recharge.',
    longSpecs: {
      chassis: 'Welded Sheet Metal Enclosure + Mecanum Wheel Drive',
      compute: 'Raspberry Pi 5 + Hailo-8L AI Accelerator',
      sensors: 'Low-Light Sony IMX Sensor, Ultrasonic Perimeter Array, Gas/Smoke Telemetry',
      power: '24V LiFePO4 Pack with Autonomous Contact Charging Pads',
      mass: '11.4 KG',
      telemetry: 'Encrypted RTSP Video Stream + Operator Command HUD',
    },
    stack: ['OpenCV', 'YOLOv8 Edge', 'Mecanum Kinematics', 'WebRTC', 'Node.js'],
    layout: 'lg:col-span-7',
    schematicType: 'surveillance',
    image:
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
  },
];

// Sample values — replaceable dynamically via Scrabotics Club Management System API
export const CLUB_STATS = [
  {
    id: 'STAT_01',
    value: 128,
    suffix: '+',
    label: 'MEMBERS',
    code: 'ACTIVE_ENGINEERS // SAMPLE_DATA',
    accent: true,
  },
  {
    id: 'STAT_02',
    value: 8,
    prefix: '0',
    suffix: '+',
    label: 'ACTIVE PROJECTS',
    code: 'IN_DEVELOPMENT // SAMPLE_DATA',
    accent: false,
  },
  {
    id: 'STAT_03',
    value: 15,
    suffix: '+',
    label: 'COMPLETED BUILDS',
    code: 'VERIFIED_UNITS // SAMPLE_DATA',
    accent: true,
  },
  {
    id: 'STAT_04',
    value: 10,
    suffix: '+',
    label: 'EVENTS',
    code: 'WORKSHOPS_&_TRIALS // SAMPLE_DATA',
    accent: false,
  },
];

export const TEAMS_DATA = [
  {
    id: 'TEAM-01',
    index: '01',
    name: 'Mechanical Team',
    divisionCode: 'DIV_MECH // STRUCTURAL & KINEMATICS',
    leadRole: 'CAD, FEA Simulation, CNC Machining & Additive Manufacturing',
    description:
      'Architects of physical motion. Responsible for chassis geometry, gear train ratios, tolerance analysis, stress testing, and rapid structural prototyping.',
    tools: ['SolidWorks', 'Fusion 360', 'ANSYS', '3D Printing / CNC'],
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'TEAM-02',
    index: '02',
    name: 'Electronics Team',
    divisionCode: 'DIV_ELEC // POWER & EMBEDDED HARDWARE',
    leadRole: 'PCB Layout, Sensor Interfacing, Motor Drivers & BMS',
    description:
      'Designing the nervous system of every machine. From custom 4-layer KiCad circuit boards and high-current H-bridges to signal conditioning and telemetry.',
    tools: ['KiCad', 'STM32 / AVR', 'Oscilloscope Debug', 'CAN / SPI / I2C'],
    image:
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'TEAM-03',
    index: '03',
    name: 'Programming Team',
    divisionCode: 'DIV_PROG // AUTONOMY & CONTROL SYSTEMS',
    leadRole: 'ROS2 Middleware, Computer Vision, SLAM & Control Algorithms',
    description:
      'Writing deterministic firmware and intelligent autonomy stacks that transform raw sensor data into split-second mechanical decisions.',
    tools: ['ROS2', 'C++ / Rust', 'Python / OpenCV', 'Linux RTOS'],
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'TEAM-04',
    index: '04',
    name: 'Design & Innovation Team',
    divisionCode: 'DIV_DSGN // INDUSTRIAL DESIGN & HUMAN-MACHINE UI',
    leadRole: 'Industrial Styling, Operator Dashboards, 3D Visualization & Brand Systems',
    description:
      'Bridging brutalist industrial engineering with human usability—crafting operator telemetry consoles, enclosure ergonomics, and technical documentation.',
    tools: ['Blender 3D', 'Three.js / WebGL', 'Figma', 'Industrial Ergonomics'],
    image:
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'TEAM-05',
    index: '05',
    name: 'Research & Development Team',
    divisionCode: 'DIV_RND // NEXT-GEN ACTUATION & EXPERIMENTAL LAB',
    leadRole: 'Swarm Robotics, Soft Actuators, Edge Neural Compute & Technical Papers',
    description:
      'Pushing beyond standard competition playbooks into experimental robotics—testing bio-inspired locomotion, custom cycloidal drives, and edge AI models.',
    tools: ['PyTorch Edge', 'MATLAB / Simulink', 'MuJoCo Physics', 'arXiv Research'],
    image:
      'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=80',
  },
];

export const EVENTS_DATA = [
  {
    id: 'EVT-01',
    code: 'WRK_ROBO_101',
    title: 'Autonomous Robotics & ROS2 Kinematics Bootcamp',
    date: 'NOV 18, 2026',
    location: 'CENTRAL ROBOTICS LAB — BLOCK B',
    type: 'ROBOTICS WORKSHOP',
    status: 'REGISTRATION OPEN',
    isOpen: true,
    seats: '40 SEATS',
  },
  {
    id: 'EVT-02',
    code: 'WRK_EMB_204',
    title: 'Bare-Metal STM32 & Custom PCB Design Intensive',
    date: 'DEC 04, 2026',
    location: 'ELECTRONICS PROTOTYPING BAY',
    type: 'EMBEDDED SYSTEMS WORKSHOP',
    status: 'REGISTRATION OPEN',
    isOpen: true,
    seats: '30 SEATS',
  },
  {
    id: 'EVT-03',
    code: 'CMP_ARENA_09',
    title: 'ROBO-FORGE: Inter-College Autonomous & Combat Trials',
    date: 'JAN 14–16, 2027',
    location: 'MAIN ENGINEERING AUDITORIUM & ARENA',
    type: 'INTER-COLLEGE COMPETITION',
    status: 'TEAM SLOTS FILLING',
    isOpen: true,
    seats: '24 TEAMS',
  },
  {
    id: 'EVT-04',
    code: 'EXH_OPEN_03',
    title: 'SCRABOTICS Annual Hardware Showcase & Live Machine Demo',
    date: 'FEB 08, 2027',
    location: 'INNOVATION QUADRANGLE',
    type: 'ROBOTICS EXHIBITION',
    status: 'OPEN TO PUBLIC',
    isOpen: true,
    seats: 'UNLIMITED',
  },
  {
    id: 'EVT-05',
    code: 'MTG_SYNC_12',
    title: 'Architecture Review: 6-DOF Manipulator & Rover Telemetry Sync',
    date: 'EVERY FRIDAY // 17:30 IST',
    location: 'SCRABOTICS COMMAND ROOM 204',
    type: 'TECHNICAL MEETING',
    status: 'MEMBERS ONLY',
    isOpen: false,
    seats: 'CLUB ROSTER',
  },
];

// Strictly marked placeholders as required: "Never invent real achievements. Use clearly marked placeholders until actual data is supplied."
export const ACHIEVEMENTS_DATA = [
  {
    id: 'MIL-01',
    category: 'COMPETITION PARTICIPATION',
    code: 'RECORD_SLOT // 01',
    title: '[PLACEHOLDER: NATIONAL ROBOTICS COMPETITION ENTRY]',
    year: '20XX // AWAITING OFFICIAL RECORD',
    description:
      'Reserved slot for verified inter-college and national robotics competition entries, arena rankings, and technical qualification records.',
    placeholderTag: 'PLACEHOLDER — REPLACE VIA CMS',
  },
  {
    id: 'MIL-02',
    category: 'AWARDS & PODIUMS',
    code: 'RECORD_SLOT // 02',
    title: '[PLACEHOLDER: ENGINEERING DESIGN & PERFORMANCE AWARD]',
    year: '20XX // AWAITING OFFICIAL RECORD',
    description:
      'Reserved slot for official podium finishes, Best Mechanical Design honors, or judges citations from accredited engineering tournaments.',
    placeholderTag: 'PLACEHOLDER — REPLACE VIA CMS',
  },
  {
    id: 'MIL-03',
    category: 'HACKATHON ACHIEVEMENTS',
    code: 'RECORD_SLOT // 03',
    title: '[PLACEHOLDER: HARDWARE & EMBEDDED HACKATHON MILESTONE]',
    year: '20XX // AWAITING OFFICIAL RECORD',
    description:
      'Reserved slot for 36-hour / 48-hour hardware hackathon builds, smart automation sprints, and robotics problem statements.',
    placeholderTag: 'PLACEHOLDER — REPLACE VIA CMS',
  },
  {
    id: 'MIL-04',
    category: 'PROJECT EXHIBITIONS',
    code: 'RECORD_SLOT // 04',
    title: '[PLACEHOLDER: ANNUAL TECH FEST & INDUSTRIAL EXPO SHOWCASE]',
    year: '20XX // AWAITING OFFICIAL RECORD',
    description:
      'Reserved slot for public demonstrations of the Autonomous Rover, 6-DOF Robotic Arm, and student-engineered prototypes.',
    placeholderTag: 'PLACEHOLDER — REPLACE VIA CMS',
  },
  {
    id: 'MIL-05',
    category: 'TECHNICAL RECOGNITIONS',
    code: 'RECORD_SLOT // 05',
    title: '[PLACEHOLDER: RESEARCH PUBLICATION / PATENT / GRANT RECORD]',
    year: '20XX // AWAITING OFFICIAL RECORD',
    description:
      'Reserved slot for student research papers, institutional funding grants, or open-source hardware recognitions.',
    placeholderTag: 'PLACEHOLDER — REPLACE VIA CMS',
  },
];
