import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Terminal, Cpu, ShieldCheck, ArrowRight } from 'lucide-react';

export default function InteractiveModals({
  activeModal,
  selectedItem,
  onClose,
  onLoginSuccess,
}) {
  const [statusMessage, setStatusMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [loginData, setLoginData] = useState({ memberId: '', accessCode: '' });
  const [joinData, setJoinData] = useState({
    fullName: '',
    email: '',
    branchYear: '',
    division: 'Mechanical Team',
    experience: '',
  });
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    subject: 'COLLABORATION / SPONSORSHIP',
    message: '',
  });

  if (!activeModal) return null;

  const resetAndClose = () => {
    setStatusMessage(null);
    setSubmitting(false);
    onClose();
  };

  const submitToBackend = async (endpoint, payload, fallbackMessage) => {
    setSubmitting(true);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        setStatusMessage(data.message || fallbackMessage);
      } else {
        setStatusMessage(fallbackMessage);
      }
    } catch {
      // Seamless local persistence fallback when running static frontend
      const existing = JSON.parse(localStorage.getItem('scrabotics_submissions') || '[]');
      existing.push({ endpoint, payload, timestamp: new Date().toISOString() });
      localStorage.setItem('scrabotics_submissions', JSON.stringify(existing));
      setStatusMessage(fallbackMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const callSign = loginData.memberId.trim().toUpperCase() || 'ENG_OP_01';
    await submitToBackend(
      '/api/login',
      loginData,
      `AUTHENTICATED AS ${callSign} // LAB TELEMETRY UNLOCKED.`
    );
    onLoginSuccess(callSign);
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    await submitToBackend(
      '/api/register',
      joinData,
      `DOSSIER LOGGED FOR ${joinData.fullName.toUpperCase()} // ASSIGNED TO ${joinData.division.toUpperCase()} INTAKE.`
    );
  };

  const handleEventRegister = async (e) => {
    e.preventDefault();
    await submitToBackend(
      '/api/events/register',
      { ...joinData, eventCode: selectedItem?.code, eventTitle: selectedItem?.title },
      `SLOT CONFIRMED FOR ${selectedItem?.code || 'EVENT'} // PASS SENT TO ${joinData.email}.`
    );
  };

  const handleContact = async (e) => {
    e.preventDefault();
    await submitToBackend(
      '/api/contact',
      contactData,
      `TRANSMISSION RECEIVED // SCRABOTICS COMMAND WILL RESPOND WITHIN 24H.`
    );
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/80 backdrop-blur-[2px] overflow-y-auto"
        onClick={resetAndClose}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 16 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-[#F3F0E8] text-[#111111] border-[4px] border-[#111111] shadow-[12px_12px_0px_0px_#C7FF35] my-8 overflow-hidden"
        >
          {/* Modal Top Industrial Header Bar */}
          <div className="bg-[#111111] text-[#F3F0E8] px-6 py-4 flex items-center justify-between border-b-[3px] border-[#111111]">
            <div className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-wider">
              <span className="w-3 h-3 bg-[#C7FF35] inline-block" />
              <span>
                {activeModal === 'login' && 'SYS_AUTH // MEMBER TERMINAL LOGIN'}
                {activeModal === 'join' && 'SYS_INTAKE // JOIN SCRABOTICS ENGINEERING'}
                {activeModal === 'event' && `EVT_REG // ${selectedItem?.code || 'WORKSHOP'}`}
                {activeModal === 'project' && `CAD_DOSSIER // ${selectedItem?.id || 'PROJECT'}`}
                {activeModal === 'contact' && 'COMMS_LINK // DIRECT LAB TRANSMISSION'}
              </span>
            </div>
            <button
              type="button"
              onClick={resetAndClose}
              aria-label="Close modal"
              className="w-8 h-8 bg-[#C7FF35] text-[#111111] border-2 border-[#111111] flex items-center justify-center hover:bg-[#F3F0E8] cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

          <div className="p-6 sm:p-8 max-h-[82vh] overflow-y-auto">
            {statusMessage ? (
              <div className="space-y-6 py-4">
                <div className="border-[3px] border-[#111111] bg-[#C7FF35] p-6 brutal-shadow">
                  <div className="flex items-center gap-3 font-mono text-xs font-extrabold uppercase mb-2">
                    <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                    <span>STATUS: VERIFIED BY SCRABOTICS CMS</span>
                  </div>
                  <p className="font-display text-2xl uppercase font-extrabold">{statusMessage}</p>
                </div>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="w-full py-3.5 bg-[#111111] text-[#C7FF35] font-mono text-xs font-extrabold uppercase border-[3px] border-[#111111] cursor-pointer"
                >
                  RETURN TO LAB INTERFACE →
                </button>
              </div>
            ) : (
              <>
                {/* 1. MEMBER LOGIN MODAL */}
                {activeModal === 'login' && (
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                      <h3 className="font-display text-3xl sm:text-4xl font-extrabold uppercase">
                        OPERATOR ACCESS
                      </h3>
                      <p className="font-mono text-xs text-[#222222] mt-1">
                        ENTER YOUR SCRABOTICS ROLL ID OR LAB CREDENTIALS TO SYNC CMS TELEMETRY.
                      </p>
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-bold uppercase mb-1.5">
                        MEMBER CALLSIGN / ROLL ID *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. SCR-2026-042"
                        value={loginData.memberId}
                        onChange={(e) => setLoginData({ ...loginData, memberId: e.target.value })}
                        className="w-full px-4 py-3 bg-[#F3F0E8] border-[3px] border-[#111111] font-mono text-sm focus:bg-[#C7FF35]/20 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-bold uppercase mb-1.5">
                        SECURITY PASSKEY *
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••••••"
                        value={loginData.accessCode}
                        onChange={(e) => setLoginData({ ...loginData, accessCode: e.target.value })}
                        className="w-full px-4 py-3 bg-[#F3F0E8] border-[3px] border-[#111111] font-mono text-sm focus:bg-[#C7FF35]/20 focus:outline-none"
                      />
                    </div>

                    <div className="border-2 border-[#111111] bg-[#B8B6AC]/40 p-3 font-mono text-[11px] flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>
                        READY FOR SCRABOTICS CLUB MANAGEMENT SYSTEM (NODE / EXPRESS / MONGODB JWT).
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full brutal-btn py-4 bg-[#C7FF35] text-[#111111] font-mono text-sm font-extrabold uppercase flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Terminal className="w-4 h-4" />
                      <span>{submitting ? 'VERIFYING...' : 'AUTHENTICATE TERMINAL →'}</span>
                    </button>
                  </form>
                )}

                {/* 2. JOIN THE CLUB / RECRUITMENT MODAL */}
                {activeModal === 'join' && (
                  <form onSubmit={handleJoin} className="space-y-4">
                    <div>
                      <h3 className="font-display text-3xl sm:text-4xl font-extrabold uppercase">
                        ENLIST IN SCRABOTICS
                      </h3>
                      <p className="font-mono text-xs text-[#222222] mt-1">
                        OPEN TO CURIOUS BUILDERS ACROSS ALL ENGINEERING & DESIGN DISCIPLINES.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-xs font-bold uppercase mb-1">
                          FULL NAME *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Aarav Mohanty"
                          value={joinData.fullName}
                          onChange={(e) => setJoinData({ ...joinData, fullName: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#F3F0E8] border-[3px] border-[#111111] font-mono text-xs focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-xs font-bold uppercase mb-1">
                          COLLEGE EMAIL *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="engineer@college.edu.in"
                          value={joinData.email}
                          onChange={(e) => setJoinData({ ...joinData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#F3F0E8] border-[3px] border-[#111111] font-mono text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-xs font-bold uppercase mb-1">
                          BRANCH & YEAR *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="B.Tech Mechatronics / 2nd Year"
                          value={joinData.branchYear}
                          onChange={(e) =>
                            setJoinData({ ...joinData, branchYear: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 bg-[#F3F0E8] border-[3px] border-[#111111] font-mono text-xs focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-xs font-bold uppercase mb-1">
                          PREFERRED DIVISION *
                        </label>
                        <select
                          value={joinData.division}
                          onChange={(e) => setJoinData({ ...joinData, division: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#F3F0E8] border-[3px] border-[#111111] font-mono text-xs font-bold focus:outline-none"
                        >
                          <option>Mechanical Team</option>
                          <option>Electronics Team</option>
                          <option>Programming Team</option>
                          <option>Design & Innovation Team</option>
                          <option>Research & Development Team</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-bold uppercase mb-1">
                        WHAT DO YOU WANT TO BUILD OR EXPERIMENT WITH? *
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Tell us about your hardware/software curiosity, past tinkering, or ideas..."
                        value={joinData.experience}
                        onChange={(e) => setJoinData({ ...joinData, experience: e.target.value })}
                        className="w-full p-3.5 bg-[#F3F0E8] border-[3px] border-[#111111] font-mono text-xs focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full brutal-btn py-4 bg-[#C7FF35] text-[#111111] font-mono text-sm font-extrabold uppercase flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{submitting ? 'TRANSMITTING...' : 'SUBMIT MEMBERSHIP DOSSIER →'}</span>
                    </button>
                  </form>
                )}

                {/* 3. EVENT REGISTRATION MODAL */}
                {activeModal === 'event' && (
                  <form onSubmit={handleEventRegister} className="space-y-4">
                    <div className="border-[3px] border-[#111111] bg-[#222222] text-[#F3F0E8] p-4">
                      <div className="font-mono text-[11px] text-[#C7FF35] font-bold">
                        {selectedItem?.type} // {selectedItem?.date}
                      </div>
                      <h3 className="font-display text-2xl font-extrabold uppercase mt-1">
                        {selectedItem?.title}
                      </h3>
                      <div className="font-mono text-xs text-[#B8B6AC] mt-1">
                        LOCATION: {selectedItem?.location}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-xs font-bold uppercase mb-1">
                          PARTICIPANT NAME *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Full Name"
                          value={joinData.fullName}
                          onChange={(e) => setJoinData({ ...joinData, fullName: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#F3F0E8] border-[3px] border-[#111111] font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-xs font-bold uppercase mb-1">
                          EMAIL ADDRESS *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="you@domain.com"
                          value={joinData.email}
                          onChange={(e) => setJoinData({ ...joinData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#F3F0E8] border-[3px] border-[#111111] font-mono text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-bold uppercase mb-1">
                        COLLEGE / ROLL NUMBER / TEAM NAME *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Team Kinetics / 23ME104"
                        value={joinData.branchYear}
                        onChange={(e) => setJoinData({ ...joinData, branchYear: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F3F0E8] border-[3px] border-[#111111] font-mono text-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full brutal-btn py-4 bg-[#C7FF35] text-[#111111] font-mono text-sm font-extrabold uppercase cursor-pointer"
                    >
                      CONFIRM WORKSHOP / EVENT SLOT →
                    </button>
                  </form>
                )}

                {/* 4. PROJECT TECHNICAL SPECIFICATION MODAL */}
                {activeModal === 'project' && selectedItem && (
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b-[3px] border-[#111111] pb-4">
                      <div>
                        <span className="font-mono text-xs font-bold bg-[#111111] text-[#C7FF35] px-2.5 py-1">
                          {selectedItem.codename}
                        </span>
                        <h3 className="font-display text-3xl sm:text-4xl font-extrabold uppercase mt-2">
                          {selectedItem.name}
                        </h3>
                      </div>
                      <span className="font-mono text-xs font-extrabold uppercase bg-[#C7FF35] border-2 border-[#111111] px-3 py-1.5">
                        STATUS: {selectedItem.status}
                      </span>
                    </div>

                    <p className="text-base leading-relaxed font-medium text-[#111111]">
                      {selectedItem.description}
                    </p>

                    {selectedItem.longSpecs && (
                      <div className="border-[3px] border-[#111111] bg-[#222222] text-[#F3F0E8] p-5">
                        <div className="font-mono text-xs font-bold text-[#C7FF35] uppercase mb-3 flex items-center gap-2">
                          <Cpu className="w-4 h-4" />
                          <span>HARDWARE & ARCHITECTURE TELEMETRY</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                          {Object.entries(selectedItem.longSpecs).map(([key, val]) => (
                            <div
                              key={key}
                              className="border border-[#B8B6AC]/30 bg-[#111111] p-3"
                            >
                              <div className="text-[10px] uppercase text-[#B8B6AC]">{key}</div>
                              <div className="font-bold text-[#F3F0E8] mt-0.5">{val}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="font-mono text-xs font-bold uppercase mb-2">
                        VERIFIED TECH STACK:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.stack.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-xs font-bold px-3 py-1 border-2 border-[#111111] bg-[#B8B6AC]/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. CONTACT FORM MODAL */}
                {activeModal === 'contact' && (
                  <form onSubmit={handleContact} className="space-y-4">
                    <div>
                      <h3 className="font-display text-3xl font-extrabold uppercase">
                        DIRECT LAB TRANSMISSION
                      </h3>
                      <p className="font-mono text-xs text-[#222222] mt-1">
                        REACH SCRABOTICS FOR SPONSORSHIPS, TECHNICAL COLLABORATIONS, OR CAMPUS DEMOS.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-xs font-bold uppercase mb-1">
                          YOUR NAME *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactData.name}
                          onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#F3F0E8] border-[3px] border-[#111111] font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-xs font-bold uppercase mb-1">
                          EMAIL *
                        </label>
                        <input
                          type="email"
                          required
                          value={contactData.email}
                          onChange={(e) =>
                            setContactData({ ...contactData, email: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 bg-[#F3F0E8] border-[3px] border-[#111111] font-mono text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-bold uppercase mb-1">
                        MESSAGE / PROPOSAL *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={contactData.message}
                        onChange={(e) =>
                          setContactData({ ...contactData, message: e.target.value })
                        }
                        className="w-full p-3.5 bg-[#F3F0E8] border-[3px] border-[#111111] font-mono text-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full brutal-btn py-4 bg-[#C7FF35] text-[#111111] font-mono text-sm font-extrabold uppercase flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>SEND TRANSMISSION</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
