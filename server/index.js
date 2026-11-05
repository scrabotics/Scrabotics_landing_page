import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// ponytail: in-memory store until MONGODB_URI is configured for Scrabotics Club Management System
const db = {
  registrations: [],
  eventSignups: [],
  messages: [],
};

app.get('/api/health', (_req, res) => {
  res.json({
    unit: 'UNIT_001',
    status: 'SYSTEM ONLINE',
    division: 'SCRABOTICS ENGINEERING DIVISION',
  });
});

app.post('/api/login', (req, res) => {
  const { memberId } = req.body || {};
  if (!memberId || typeof memberId !== 'string') {
    return res.status(400).json({ error: 'MEMBER_ID_REQUIRED' });
  }
  const callSign = memberId.trim().toUpperCase();
  return res.json({
    ok: true,
    callSign,
    message: `AUTHENTICATED AS ${callSign} // LAB TELEMETRY UNLOCKED.`,
  });
});

app.post('/api/register', (req, res) => {
  const { fullName, email, branchYear, division, experience } = req.body || {};
  if (!fullName || !email) {
    return res.status(400).json({ error: 'NAME_AND_EMAIL_REQUIRED' });
  }
  const record = {
    id: `MEM-${Date.now()}`,
    fullName,
    email,
    branchYear,
    division,
    experience,
    createdAt: new Date().toISOString(),
  };
  db.registrations.push(record);
  return res.status(201).json({
    ok: true,
    message: `DOSSIER LOGGED FOR ${fullName.toUpperCase()} // ASSIGNED TO ${(division || 'CORE').toUpperCase()} INTAKE.`,
  });
});

app.post('/api/events/register', (req, res) => {
  const { fullName, email, eventCode, eventTitle } = req.body || {};
  if (!fullName || !email) {
    return res.status(400).json({ error: 'PARTICIPANT_INFO_REQUIRED' });
  }
  db.eventSignups.push({
    id: `EVT-REG-${Date.now()}`,
    fullName,
    email,
    eventCode,
    eventTitle,
    createdAt: new Date().toISOString(),
  });
  return res.status(201).json({
    ok: true,
    message: `SLOT CONFIRMED FOR ${eventCode || 'WORKSHOP'} // PASS SENT TO ${email}.`,
  });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'ALL_FIELDS_REQUIRED' });
  }
  db.messages.push({
    id: `MSG-${Date.now()}`,
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  });
  return res.status(201).json({
    ok: true,
    message: 'TRANSMISSION RECEIVED // SCRABOTICS COMMAND WILL RESPOND WITHIN 24H.',
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`SCRABOTICS CMS API listening on http://localhost:${PORT}`);
  });
}

export default app;
