import assert from 'node:assert/strict';
import {
  CLUB_META,
  EXPERTISE_ITEMS,
  PROJECTS_DATA,
  CLUB_STATS,
  TEAMS_DATA,
  EVENTS_DATA,
  ACHIEVEMENTS_DATA,
} from '../src/data/scraboticsData.js';

// Self-check verifying data integrity and strict design constraints
assert.equal(CLUB_META.name, 'SCRABOTICS');
assert.equal(CLUB_META.unitCode, 'UNIT_001');
assert.equal(EXPERTISE_ITEMS.length, 4, 'Must have 4 brutalist expertise pillars');
assert.equal(PROJECTS_DATA.length, 4, 'Must showcase all 4 featured builds');
assert.equal(CLUB_STATS.length, 4, 'Must include 4 club telemetry stats');
assert.equal(TEAMS_DATA.length, 5, 'Must include all 5 engineering divisions');
assert.equal(EVENTS_DATA.length, 5, 'Must include all 5 event categories');
assert.equal(ACHIEVEMENTS_DATA.length, 5, 'Must include 5 clearly marked milestone placeholders');

for (const milestone of ACHIEVEMENTS_DATA) {
  assert.ok(
    milestone.title.includes('PLACEHOLDER') && milestone.placeholderTag.includes('PLACEHOLDER'),
    'Achievements must never be invented and must clearly indicate placeholder status'
  );
}

console.log('ALL SCRABOTICS DATA & CONSTRAINT CHECKS PASSED.');
