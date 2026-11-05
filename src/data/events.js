// Centralized editable events data for SCRABOTICS — GIFT Autonomous College.
// Uses clear placeholders where official dates and schedules are to be updated.

export const FEATURED_EVENT = {
  id: 'evt-featured',
  type: 'ROBOTICS WORKSHOP & LIVE DEMO',
  status: 'Registration Open (Placeholder)',
  title: 'Hands-On Robotics, Embedded Systems & Autonomy Bootcamp',
  date: '[DATE PLACEHOLDER — UPCOMING SEMESTER]',
  venue: 'Robotics & Innovation Lab, GIFT Autonomous College',
  description:
    'An intensive practical workshop where students assemble mobile robotic platforms, wire motor controllers, flash microcontroller firmware, and test autonomous sensor routines together.',
  highlights: [
    'Microcontroller & Motor Control',
    'Sensor Calibration',
    'Live Rover Trials',
    'Beginner Friendly',
  ],
  image:
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
};

export const UPCOMING_EVENTS = [
  {
    id: 'evt-competition',
    type: 'TECHNICAL COMPETITION',
    title: 'Inter-Departmental Line Follower & RoboRover Challenge',
    date: '[DATE PLACEHOLDER — TBA]',
    venue: 'Main Quadrangle / Engineering Arena, GIFT',
    description:
      'Student teams test speed, PID stability, and obstacle traversal across a custom-engineered track.',
  },
  {
    id: 'evt-hackathon',
    type: 'HARDWARE HACKATHON',
    title: '24-Hour Smart Automation & Mechatronics Buildathon',
    date: '[DATE PLACEHOLDER — TBA]',
    venue: 'Central Innovation Hall, GIFT Autonomous College',
    description:
      'Rapid prototyping sprint focused on solving real campus and industrial automation problems with embedded hardware.',
  },
];

export const CALENDAR_SCHEDULE = [
  {
    id: 'cal-01',
    category: 'Club Orientation',
    activity: 'New Member Induction & Robotics Lab Tour',
    datePlaceholder: '[START OF TERM]',
    note: 'Open to all engineering branches at GIFT Autonomous College',
  },
  {
    id: 'cal-02',
    category: 'Hands-on Workshop',
    activity: 'CAD, PCB Design & Embedded Firmware Lab Series',
    datePlaceholder: '[WEEKLY LABS]',
    note: 'Practical mentor-led sessions inside the SCRABOTICS lab',
  },
  {
    id: 'cal-03',
    category: 'Project Demonstrations',
    activity: 'Open Lab Showcase: Rover, Manipulator & Drone Prototypes',
    datePlaceholder: '[MID-SEMESTER]',
    note: 'Live campus demonstration of student-built prototypes',
  },
  {
    id: 'cal-04',
    category: 'Guest Sessions',
    activity: 'Industry & Alumni Talk on Humanoid Robotics & Edge AI',
    datePlaceholder: '[SCHEDULE TBA]',
    note: 'Interactive seminar and Q&A on modern robotics careers',
  },
];
