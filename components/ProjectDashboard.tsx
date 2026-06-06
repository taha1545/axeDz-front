import { useState } from "react";

const CopyIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#2dce89"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SendIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const SpinnerIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2.5"
    strokeLinecap="round"
    className="animate-spin"
  >
    <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="10" />
  </svg>
);

const SentCheckIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function ProjectDashboard() {
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("re_pk_example_key_here").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendTest = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 2500);
    }, 1200);
  };

  const steps = [
    { number: 1, title: "Install SDK", code: "npm i @relay/node" },
    { number: 2, title: "Initialize", code: "const r = new Relay('r…" },
    { number: 3, title: "Send Request", action: true },
  ];

  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="flex flex-wrap gap-4 w-full max-w-3xl">
          {/* ── Project Status Card ── */}
          <div className="bg-white rounded-2xl p-7 shadow-lg border border-slate-100 w-64 shrink-0">
            <h2 className="text-[15px] font-semibold text-[#1a1d2e] tracking-tight mb-5">
              Project Status
            </h2>

            {/* Environment */}
            <div className="mb-5">
              <p className="text-[10.5px] font-semibold text-[#9096b8] uppercase tracking-widest mb-1.5">
                Environment
              </p>
              <div className="flex items-center gap-2.5">
                <span className="text-[14.5px] font-semibold text-[#1a1d2e] leading-snug">
                  RelayEngine
                  <br />
                  Production
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Active
                </span>
              </div>
            </div>

            {/* API Key */}
            <div className="mb-5">
              <p className="text-[10.5px] font-semibold text-[#9096b8] uppercase tracking-widest mb-2">
                Primary API Key
              </p>
              <div className="flex items-center justify-between bg-[#f7f8fc] border border-[#e8eaf2] hover:border-[#c5c9e0] transition-colors rounded-xl px-3.5 py-2.5">
                <span
                  className="text-[12.5px] text-[#3d4460] tracking-wide"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  re_pk•••••••••••••
                </span>
                <button
                  onClick={handleCopy}
                  title={copied ? "Copied!" : "Copy key"}
                  className="text-[#8b91b0] hover:text-indigo-600 hover:scale-110 transition-all duration-150 p-0.5 cursor-pointer"
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                </button>
              </div>
            </div>

            {/* Manage button */}
            <button className="w-full border border-[#e0e3f0] hover:border-[#c5c9e0] hover:bg-[#f4f5fc] hover:-translate-y-px active:translate-y-0 transition-all duration-150 rounded-xl py-2.5 text-[13px] font-medium text-[#3d4460] cursor-pointer">
              Manage Project Settings
            </button>
          </div>

          {/* ── Quick Start Guide Card ── */}
          <div className="bg-white rounded-2xl p-7 shadow-lg border border-slate-100 flex-1 min-w-[300px]">
            <h2 className="text-[15px] font-semibold text-[#1a1d2e] tracking-tight mb-6">
              Quick Start Guide
            </h2>

            <div className="flex flex-wrap gap-3.5">
              {steps.map((step) => (
                <div key={step.number} className="flex-1 min-w-[110px]">
                  {/* Step header */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-[26px] h-[26px] rounded-full bg-[#eef0fb] border border-[#d0d4ee] flex items-center justify-center shrink-0">
                      <span className="text-[11.5px] font-semibold text-[#5a6490]">
                        {step.number}
                      </span>
                    </div>
                    <span className="text-[12.5px] font-semibold text-[#3d4460]">
                      {step.title}
                    </span>
                  </div>

                  {/* Step body */}
                  {step.action ? (
                    <button
                      onClick={handleSendTest}
                      disabled={sending}
                      className={[
                        "flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-white text-[12.5px] font-semibold whitespace-nowrap cursor-pointer",
                        "transition-all duration-150 shadow-md",
                        "hover:-translate-y-px active:translate-y-0 disabled:opacity-75 disabled:cursor-default",
                        sent
                          ? "bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-200"
                          : "bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-indigo-200",
                      ].join(" ")}
                    >
                      {sending ? (
                        <>
                          <SpinnerIcon /> Sending…
                        </>
                      ) : sent ? (
                        <>
                          <SentCheckIcon /> Sent!
                        </>
                      ) : (
                        <>
                          Send Test Email <SendIcon />
                        </>
                      )}
                    </button>
                  ) : (
                    <div
                      className="bg-[#f7f8fc] border border-[#e8eaf2] rounded-lg px-3 py-2.5 text-[11.5px] text-[#4a5080] whitespace-nowrap overflow-hidden text-ellipsis"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {step.code}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
