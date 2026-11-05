// Centralized editable content for SCRABOTICS — Robotics Club of GIFT Autonomous College.
// All statistics and project statuses use honest, editable placeholders ready for actual club updates.

export const CLUB_INFO = {
  name: 'SCRABOTICS',
  institution: 'GIFT Autonomous College',
  location: 'Bhubaneswar, Odisha',
  coreMessage: 'BUILDING THE FUTURE, TOGETHER.',
  tagline: 'BUILDING THE FUTURE, TOGETHER.',
  finalStatement: 'WE IMAGINE. WE ENGINEER. WE BUILD.',
  footerTagline: 'ENGINEER THE FUTURE.',
  email: 'scrabotics@gift.edu.in',
  socials: {
    instagram: '#instagram',
    linkedin: '#linkedin',
    github: '#github',
  },
  // Editable placeholder statistics — never invent fake completed claims
  activityPlaceholders: [
    {
      id: 'stat-members',
      label: 'Members',
      value: '[XX+]',
      note: 'Active Builders (Placeholder)',
    },
    {
      id: 'stat-projects',
      label: 'Projects',
      value: '[XX]',
      note: 'Lab Prototypes (Placeholder)',
    },
    {
      id: 'stat-workshops',
      label: 'Workshops',
      value: '[XX]',
      note: 'Hands-on Sessions (Placeholder)',
    },
    {
      id: 'stat-competitions',
      label: 'Competitions',
      value: '[XX]',
      note: 'Technical Trials (Placeholder)',
    },
  ],
};

export const ABOUT_CARDS = [
  {
    id: 'about-01',
    tag: '01 / HANDS-ON PEDAGOGY',
    title: 'LEARN BY BUILDING',
    description:
      'Students learn through practical experiments and hands-on engineering—moving directly from breadboard schematics and CAD sketches to physical prototypes.',
    colSpan: 'md:col-span-6 lg:col-span-7',
    image:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1100&q=80',
  },
  {
    id: 'about-02',
    tag: '02 / CORE SYSTEMS',
    title: 'ENGINEERING INNOVATION',
    description:
      'Explore mechanical systems, custom multi-layer electronics, sensor fusion, and intelligent automation in an open laboratory environment.',
    colSpan: 'md:col-span-6 lg:col-span-5',
    accent: 'violet',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'about-03',
    tag: '03 / ARENA & FIELD',
    title: 'COMPETE & COLLABORATE',
    description:
      'Participate in national technical competitions, hackathons, and team robotics challenges that test engineering resilience under pressure.',
    colSpan: 'md:col-span-6 lg:col-span-5',
    image:
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'about-04',
    tag: '04 / OPEN MENTORSHIP',
    title: 'BUILD TOGETHER',
    description:
      'Create an inclusive engineering studio where first-year beginners and senior builders work side by side across disciplines.',
    colSpan: 'md:col-span-6 lg:col-span-7',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1100&q=80',
  },
];

export const DOMAINS_DATA = [
  {
    id: 'domain-humanoid',
    code: 'DOM_01 // BIOMECHATRONICS',
    title: 'Humanoid Robotics',
    description:
      'Bipedal balance, anthropomorphic robotic hands, tendon-driven actuators, and natural human-robot interaction.',
    colSpan: 'md:col-span-6 lg:col-span-8',
    metrics: ['Anthropomorphic Actuators', 'Bipedal Kinematics', 'HRI Sensors'],
    image:
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'domain-autonomous',
    code: 'DOM_02 // NAVIGATION',
    title: 'Autonomous Systems',
    description:
      'LiDAR SLAM mapping, path planning, obstacle avoidance, and self-piloted ground & aerial vehicles.',
    colSpan: 'md:col-span-3 lg:col-span-4',
    metrics: ['ROS2 Navigation', 'LiDAR SLAM', 'Path Planning'],
    image:
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'domain-embedded',
    code: 'DOM_03 // HARDWARE',
    title: 'Embedded Electronics',
    description:
      'Custom PCB layout, microcontroller firmware (STM32, ESP32, RISC-V), motor drivers, and power distribution.',
    colSpan: 'md:col-span-3 lg:col-span-4',
    metrics: ['STM32 & ESP32', 'Custom Multi-Layer PCB', 'BMS & ESC'],
    image:
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'domain-mechanical',
    code: 'DOM_04 // KINEMATICS',
    title: 'Mechanical Design',
    description:
      'Parametric 3D CAD modeling, cycloidal gearboxes, structural stress analysis, and additive fabrication.',
    colSpan: 'md:col-span-3 lg:col-span-4',
    metrics: ['SolidWorks / Fusion', 'Cycloidal Drives', 'Carbon & CNC'],
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'domain-vision',
    code: 'DOM_05 // PERCEPTION',
    title: 'Computer Vision',
    description:
      'Real-time object detection, depth estimation, gesture tracking, and edge neural inference on embedded GPUs.',
    colSpan: 'md:col-span-3 lg:col-span-4',
    metrics: ['OpenCV & YOLO', 'Stereo Depth', 'Edge AI Inference'],
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'domain-industrial',
    code: 'DOM_06 // MECHATRONICS',
    title: 'Industrial Automation',
    description:
      'Multi-axis robotic manipulators, closed-loop PID control, pneumatic grippers, and smart sensor networks.',
    colSpan: 'md:col-span-6 lg:col-span-12',
    metrics: ['6-DOF Manipulators', 'Closed-Loop PID', 'IIoT Telemetry'],
    image:
      'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1400&q=80',
  },
];

// Varied Bento Grid structure as specified in Section 7:
// - 1 large featured project card (8 cols)
// - 2 medium project cards (4 cols & 6 cols)
// - 2 smaller cards (3 cols & 3 cols)
// - 1 wide project showcase (12 cols)
export const PROJECTS_DATA = [
  {
    id: 'prj-roborover',
    category: 'AUTONOMOUS ROVER',
    size: 'large',
    colSpan: 'md:col-span-6 lg:col-span-8',
    title: 'RoboRover',
    status: 'Sample / Active Exploration',
    description:
      'All-terrain rocker-bogie exploration rover platform designed for autonomous waypoint navigation, environmental telemetry, and uneven surface traversal in campus field trials.',
    tags: ['ROS2', 'Python', 'LiDAR SLAM', 'STM32', '6061 Aluminum CAD'],
    image:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'prj-pickplace',
    category: 'MANIPULATION',
    size: 'medium',
    colSpan: 'md:col-span-6 lg:col-span-4',
    title: 'Pick and Place Robot',
    status: 'Sample / Lab Prototype',
    description:
      'Articulated multi-axis robotic manipulator engineered for automated sorting, inverse kinematics trajectory testing, and precision end-effector gripping.',
    tags: ['Inverse Kinematics', 'Stepper Servos', 'C++', '3D Printed Harmonics'],
    image:
      'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'prj-drone',
    category: 'AERIAL ROBOTICS',
    size: 'medium',
    colSpan: 'md:col-span-6 lg:col-span-6',
    title: 'Autonomous Drone',
    status: 'Sample / Research Concept',
    description:
      'Carbon-frame quadrotor testbed exploring optical-flow indoor stabilization, GPS-denied hover control, and lightweight aerial vision payloads.',
    tags: ['PX4 / ArduPilot', 'Optical Flow', 'Carbon Airframe', 'OpenCV'],
    image:
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'prj-linefollower',
    category: 'CONTROL SYSTEMS',
    size: 'small',
    colSpan: 'md:col-span-3 lg:col-span-3',
    title: 'Line Following Robot',
    status: 'Sample / Workshop Build',
    description:
      'High-speed PID path tracker utilizing a custom IR reflectance sensor array and low-inertia micro-gear motors.',
    tags: ['Embedded C', 'PID Control', 'Custom PCB', 'IR Array'],
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'prj-automation',
    category: 'INDUSTRIAL IOT',
    size: 'small',
    colSpan: 'md:col-span-3 lg:col-span-3',
    title: 'Smart Automation System',
    status: 'Sample / IoT Testbed',
    description:
      'Connected sensor-actuator network for laboratory energy telemetry, automated climate relays, and fault alerts.',
    tags: ['ESP32', 'MQTT', 'Sensor Fusion', 'Solid-State Relays'],
    image:
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'prj-humanoid',
    category: 'HUMANOID R&D',
    size: 'wide',
    colSpan: 'md:col-span-6 lg:col-span-12',
    title: 'Humanoid Robot Experiments',
    status: 'Sample / Flagship R&D Initiative',
    description:
      'Long-term collaborative research into tendon-driven anthropomorphic upper-body mechanics, expressive head-eye tracking, voice-vision synthesis, and safe human-machine interaction at GIFT Autonomous College.',
    tags: [
      'Anthropomorphic CAD',
      'Brushless Actuators',
      'ROS2 Control',
      'Computer Vision',
      'Human-Robot Interaction',
    ],
    image:
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=80',
  },
];

export const HUMAN_STORIES = [
  {
    id: 'story-01',
    caption: 'Every great machine starts with a curious mind.',
    context: 'Students Assembling Prototypes',
    detail:
      'Late-evening chassis alignment and servo calibration in the GIFT Autonomous College robotics workspace.',
    colSpan: 'md:col-span-6 lg:col-span-7',
    image:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'story-02',
    caption: 'Built through experiments. Improved through failure.',
    context: 'Debugging Circuits & Firmware',
    detail:
      'Tracing PWM motor signals and logic levels with oscilloscopes before arena trials.',
    colSpan: 'md:col-span-6 lg:col-span-5',
    image:
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'story-03',
    caption: 'Better ideas happen together.',
    context: 'Collaborative Design Reviews',
    detail:
      'Cross-year students brainstorming kinematics, CAD tolerances, and sensor placement.',
    colSpan: 'md:col-span-3 lg:col-span-5',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'story-04',
    caption: 'Where human intuition meets physical motion.',
    context: 'Testing Machines on the Floor',
    detail:
      'Tuning PID loops and obstacle-avoidance trajectories in real workshop conditions.',
    colSpan: 'md:col-span-3 lg:col-span-7',
    image:
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1100&q=80',
  },
];
