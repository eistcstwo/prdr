import { useState, useCallback, useRef, useEffect } from "react";

const ALL_IPS = [
  "10.177.40.101","10.177.40.102","10.177.40.103","10.177.40.104","10.177.40.105",
  "10.177.40.106","10.177.40.10","10.177.40.110","10.177.40.111","10.177.40.112",
  "10.177.40.113","10.177.40.114","10.177.40.115","10.177.40.11","10.177.40.12",
  "10.177.40.131","10.177.40.132","10.177.40.133","10.177.40.134","10.177.40.135",
  "10.177.40.13","10.177.40.141","10.177.40.142","10.177.40.143","10.177.40.144",
  "10.177.40.145","10.177.40.146","10.177.40.14","10.177.40.155","10.177.40.156",
  "10.177.40.157","10.177.40.158","10.177.40.159","10.177.40.15","10.177.40.160",
  "10.177.40.163","10.177.40.164","10.177.40.165","10.177.40.166","10.177.40.167",
  "10.177.40.168","10.177.40.169","10.177.40.170","10.177.40.171","10.177.40.173",
  "10.177.40.174","10.177.40.175","10.177.40.176","10.177.40.177","10.177.40.178",
  "10.177.40.190","10.177.40.191","10.177.40.192","10.177.40.194","10.177.40.195",
  "10.177.40.196","10.177.40.197","10.177.40.230","10.177.40.231","10.177.40.232",
  "10.177.40.233","10.177.40.234","10.177.40.235","10.177.40.31","10.177.40.32",
  "10.177.40.33","10.177.40.34","10.177.40.41","10.177.40.42","10.177.40.43",
  "10.177.40.44","10.177.40.45","10.177.40.55","10.177.40.56","10.177.40.57",
  "10.177.40.58","10.177.40.59","10.177.40.63","10.177.40.64","10.177.40.65",
  "10.177.40.66","10.177.40.67","10.177.40.68","10.177.40.69","10.177.40.70",
  "10.177.40.71","10.177.40.73","10.177.40.74","10.177.40.75","10.177.40.81",
  "10.177.40.82","10.177.40.83","10.177.40.84","10.177.40.85","10.177.40.86",
  "10.177.40.87","10.177.40.88","10.177.40.89",
  "10.177.41.101","10.177.41.102","10.177.41.10","10.177.41.110","10.177.41.111",
  "10.177.41.112","10.177.41.113","10.177.41.114","10.177.41.115","10.177.41.11",
  "10.177.41.12","10.177.41.131","10.177.41.132","10.177.41.133","10.177.41.134",
  "10.177.41.135","10.177.41.13","10.177.41.141","10.177.41.142","10.177.41.143",
  "10.177.41.144","10.177.41.145","10.177.41.146","10.177.41.14","10.177.41.155",
  "10.177.41.156","10.177.41.157","10.177.41.158","10.177.41.159","10.177.41.15",
  "10.177.41.160","10.177.41.163","10.177.41.164","10.177.41.165","10.177.41.166",
  "10.177.41.168","10.177.41.169","10.177.41.170","10.177.41.171","10.177.41.173",
  "10.177.41.174","10.177.41.175","10.177.41.176","10.177.41.190","10.177.41.191",
  "10.177.41.192","10.177.41.194","10.177.41.195","10.177.41.196","10.177.41.197",
  "10.177.41.20","10.177.41.21","10.177.41.230","10.177.41.231","10.177.41.232",
  "10.177.41.233","10.177.41.234","10.177.41.31","10.177.41.32","10.177.41.33",
  "10.177.41.34","10.177.41.41","10.177.41.42","10.177.41.43","10.177.41.44",
  "10.177.41.45","10.177.41.55","10.177.41.56","10.177.41.57","10.177.41.58",
  "10.177.41.59","10.177.41.63","10.177.41.64","10.177.41.65","10.177.41.66",
  "10.177.41.67","10.177.41.68","10.177.41.69","10.177.41.70","10.177.41.71",
  "10.177.41.73","10.177.41.74","10.177.41.75",
  "10.188.24.101","10.188.24.102","10.188.24.103","10.188.24.104","10.188.24.105",
  "10.188.24.106","10.188.24.10","10.188.24.110","10.188.24.111","10.188.24.112",
  "10.188.24.113","10.188.24.114","10.188.24.115","10.188.24.11","10.188.24.12",
  "10.188.24.131","10.188.24.132","10.188.24.133","10.188.24.134","10.188.24.135",
  "10.188.24.13","10.188.24.141","10.188.24.142","10.188.24.143","10.188.24.144",
  "10.188.24.145","10.188.24.146","10.188.24.14","10.188.24.155","10.188.24.156",
  "10.188.24.157","10.188.24.158","10.188.24.159","10.188.24.15","10.188.24.160",
  "10.188.24.163","10.188.24.164","10.188.24.165","10.188.24.166","10.188.24.167",
  "10.188.24.168","10.188.24.169","10.188.24.170","10.188.24.171","10.188.24.173",
  "10.188.24.174","10.188.24.175","10.188.24.176","10.188.24.177","10.188.24.178",
  "10.188.24.190","10.188.24.191","10.188.24.192","10.188.24.194","10.188.24.195",
  "10.188.24.196","10.188.24.197","10.188.24.230","10.188.24.231","10.188.24.232",
  "10.188.24.234","10.188.24.31","10.188.24.32","10.188.24.33","10.188.24.34",
  "10.188.24.41","10.188.24.42","10.188.24.43","10.188.24.44","10.188.24.45",
  "10.188.24.55","10.188.24.56","10.188.24.57","10.188.24.58","10.188.24.59",
  "10.188.24.63","10.188.24.64","10.188.24.65","10.188.24.66","10.188.24.67",
  "10.188.24.68","10.188.24.69","10.188.24.70","10.188.24.71","10.188.24.73",
  "10.188.24.74","10.188.24.75","10.188.24.77","10.188.24.78",
  "10.188.25.101","10.188.25.102","10.188.25.10","10.188.25.110","10.188.25.111",
  "10.188.25.112","10.188.25.113","10.188.25.114","10.188.25.115","10.188.25.11",
  "10.188.25.12","10.188.25.131","10.188.25.132","10.188.25.133","10.188.25.134",
  "10.188.25.135","10.188.25.13","10.188.25.141","10.188.25.142","10.188.25.143",
  "10.188.25.144","10.188.25.145","10.188.25.146","10.188.25.14","10.188.25.155",
  "10.188.25.156","10.188.25.157","10.188.25.158","10.188.25.159","10.188.25.15",
  "10.188.25.160","10.188.25.164","10.188.25.165","10.188.25.166","10.188.25.167",
  "10.188.25.168","10.188.25.169","10.188.25.170","10.188.25.171","10.188.25.173",
  "10.188.25.174","10.188.25.175","10.188.25.176","10.188.25.190","10.188.25.191",
  "10.188.25.192","10.188.25.194","10.188.25.195","10.188.25.196","10.188.25.197",
  "10.188.25.20","10.188.25.21","10.188.25.230","10.188.25.232","10.188.25.234",
  "10.188.25.31","10.188.25.32","10.188.25.33","10.188.25.34","10.188.25.41",
  "10.188.25.42","10.188.25.43","10.188.25.44","10.188.25.45","10.188.25.55",
  "10.188.25.56","10.188.25.57","10.188.25.58","10.188.25.59","10.188.25.63",
  "10.188.25.64","10.188.25.65","10.188.25.66","10.188.25.67","10.188.25.68",
  "10.188.25.69","10.188.25.70","10.188.25.71","10.188.25.73","10.188.25.74",
  "10.188.25.75","10.188.25.80"
];

function getPairs() {
  const pairs = [];
  for (const pr of ALL_IPS.filter(ip => ip.startsWith("10.188."))) {
    const parts = pr.split(".");
    const drThird = parts[2] === "24" ? "40" : "41";
    const dr = `10.177.${drThird}.${parts[3]}`;
    if (ALL_IPS.includes(dr)) pairs.push({ pr, dr, id: `${pr}|${dr}` });
  }
  return pairs;
}

const PAIRS = getPairs();
const API_URL = "https://10.191.171.12:5443/EISHOME/prdSync/checkSyncIPSpecific/";

const GROUPS = [
  { id: "a", label: "SUBNET A", sublabel: "10.188.24.x  /  10.177.40.x", prefix: "10.188.24." },
  { id: "b", label: "SUBNET B", sublabel: "10.188.25.x  /  10.177.41.x", prefix: "10.188.25." },
];

const C = {
  bg: "#070910", surface: "#0b0d16", card: "#0f1220",
  cardHover: "#131628", border: "#181e30", borderMid: "#1f2840",
  accent: "#4f8ef7", accentDim: "rgba(79,142,247,0.15)",
  green: "#00d68f", greenBg: "rgba(0,214,143,0.08)", greenBorder: "rgba(0,214,143,0.22)",
  red: "#ff4060", redBg: "rgba(255,64,96,0.08)", redBorder: "rgba(255,64,96,0.22)",
  amber: "#f5a623", amberBg: "rgba(245,166,35,0.08)", amberBorder: "rgba(245,166,35,0.22)",
  text: "#d8e4f5", textSub: "#6b7fa6", textMuted: "#323d58",
};

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; width: 100%; overflow: hidden; }
  .subnet-scroll-area::-webkit-scrollbar { width: 4px; }
  .subnet-scroll-area::-webkit-scrollbar-thumb { background: #1f2840; border-radius: 3px; }
  body { background: ${C.bg}; color: ${C.text}; font-family: 'Courier New', Courier, monospace; }
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: ${C.surface}; }
  ::-webkit-scrollbar-thumb { background: ${C.borderMid}; border-radius: 3px; }

  @keyframes spin    { to { transform: rotate(360deg); } }
  @keyframes shimmer { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
  @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0.3} }
  @keyframes cardPageIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeSlideIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }

  .card-page-in { animation: cardPageIn 0.2s ease forwards; }

  /* ── Cards ── */
  .sc {
    border-radius: 7px; border: 1px solid ${C.border};
    background: ${C.card}; cursor: pointer; position: relative; overflow: hidden;
    transition: transform 0.14s, border-color 0.14s, box-shadow 0.14s, background 0.14s;
    user-select: none; padding: 11px 11px 11px 15px;
  }
  .sc:hover { transform: translateY(-1px); background: ${C.cardHover}; }
  .sc.synced  { border-color: ${C.greenBorder}; background: linear-gradient(150deg, ${C.card} 55%, rgba(0,214,143,0.05)); }
  .sc.synced:hover  { border-color: rgba(0,214,143,0.45); box-shadow: 0 4px 20px rgba(0,214,143,0.09); }
  .sc.drifted { border-color: ${C.redBorder};   background: linear-gradient(150deg, ${C.card} 55%, rgba(255,64,96,0.05)); }
  .sc.drifted:hover { border-color: rgba(255,64,96,0.45); box-shadow: 0 4px 20px rgba(255,64,96,0.1); }
  .sc.errored { border-color: ${C.amberBorder}; background: linear-gradient(150deg, ${C.card} 55%, rgba(245,166,35,0.04)); }

  .sc-bar { position:absolute; left:0; top:0; bottom:0; width:3px; border-radius:7px 0 0 7px; }
  .sc-bar.synced  { background:${C.green}; box-shadow:0 0 8px ${C.green}88; }
  .sc-bar.drifted { background:${C.red};   box-shadow:0 0 8px ${C.red}88; }
  .sc-bar.errored { background:${C.amber}; }
  .sc-bar.pending { background:${C.borderMid}; }
  .sc-bar.loading { background:${C.accent}; animation:blink 1s ease infinite; }

  .sc-shimmer {
    position:absolute; inset:0; pointer-events:none; border-radius:7px;
    background:linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.025) 50%, transparent 100%);
    background-size:600px 100%; animation:shimmer 1.5s infinite;
  }

  .slabel {
    font-size:10px; font-weight:700; letter-spacing:0.08em;
    border-radius:3px; padding:2px 6px; display:inline-block; white-space:nowrap;
  }
  .slabel.synced  { color:${C.green}; background:${C.greenBg}; border:1px solid ${C.greenBorder}; }
  .slabel.drifted { color:${C.red};   background:${C.redBg};   border:1px solid ${C.redBorder}; }
  .slabel.errored { color:${C.amber}; background:${C.amberBg}; border:1px solid ${C.amberBorder}; }
  .slabel.loading { color:${C.accent}; background:${C.accentDim}; border:1px solid rgba(79,142,247,0.3); }
  .slabel.pending { color:${C.textMuted}; border:1px solid ${C.border}; }

  /* ── Buttons ── */
  .btn {
    display:inline-flex; align-items:center; gap:6px;
    border:none; border-radius:6px; cursor:pointer;
    font-family:'Courier New',monospace; font-size:11px; font-weight:700;
    letter-spacing:0.08em; padding:7px 14px; text-transform:uppercase;
    transition:all 0.13s; flex-shrink:0;
  }
  .btn:active { transform:scale(0.97); }
  .btn:disabled { opacity:0.35; cursor:not-allowed; }
  .btn-primary { background:${C.accent}; color:#fff; }
  .btn-primary:hover:not(:disabled) { background:#3a78e8; box-shadow:0 0 18px rgba(79,142,247,0.4); }
  .btn-ghost { background:transparent; color:${C.textSub}; border:1px solid ${C.border}; }
  .btn-ghost:hover:not(:disabled) { border-color:${C.borderMid}; color:${C.text}; }
  .btn-stop { background:${C.redBg}; color:${C.red}; border:1px solid ${C.redBorder}; }
  .btn-stop:hover { background:rgba(255,64,96,0.15); }
  .btn-csv { background:${C.greenBg}; color:${C.green}; border:1px solid ${C.greenBorder}; }
  .btn-csv:hover { background:rgba(0,214,143,0.14); }

  /* ── Carousel nav arrow buttons ── */
  .car-btn {
    display:flex; align-items:center; justify-content:center;
    width:40px; height:40px; border-radius:8px; border:1px solid ${C.border};
    background:${C.card}; color:${C.textSub}; cursor:pointer;
    font-size:18px; transition:all 0.15s; flex-shrink:0;
    font-family:monospace; user-select:none;
  }
  .car-btn:hover:not(:disabled) {
    border-color:${C.accent}; color:${C.accent};
    background:${C.accentDim}; box-shadow:0 0 14px rgba(79,142,247,0.2);
  }
  .car-btn:disabled { opacity:0.2; cursor:not-allowed; }

  /* ── Page-within-subnet nav ── */
  .pg-btn {
    display:flex; align-items:center; justify-content:center;
    width:30px; height:30px; border-radius:6px; border:1px solid ${C.border};
    background:transparent; color:${C.textSub}; cursor:pointer;
    font-size:14px; transition:all 0.13s; flex-shrink:0; font-family:monospace;
  }
  .pg-btn:hover:not(:disabled) { border-color:${C.accent}; color:${C.accent}; background:${C.accentDim}; }
  .pg-btn:disabled { opacity:0.2; cursor:not-allowed; }

  /* ── Page dots ── */
  .pdot {
    width:6px; height:6px; border-radius:50%; background:${C.border};
    cursor:pointer; transition:all 0.18s; border:none; flex-shrink:0;
  }
  .pdot.on { background:${C.accent}; width:16px; border-radius:3px; }
  .pdot:hover:not(.on) { background:${C.borderMid}; }

  /* ── Subnet carousel dots ── */
  .subnet-dot {
    height:3px; border-radius:2px; cursor:pointer;
    transition:all 0.3s ease; border:none; flex-shrink:0;
  }
  .subnet-dot.on  { background:${C.accent}; width:32px; box-shadow:0 0 8px rgba(79,142,247,0.5); }
  .subnet-dot.off { background:${C.border}; width:16px; }
  .subnet-dot:hover.off { background:${C.borderMid}; }

  /* ── Filter pills ── */
  .fp {
    border:1px solid ${C.border}; background:transparent; color:${C.textSub};
    border-radius:4px; padding:4px 10px; font-family:'Courier New',monospace;
    font-size:11px; font-weight:700; cursor:pointer;
    transition:all 0.13s; letter-spacing:0.06em; text-transform:uppercase;
  }
  .fp:hover { border-color:${C.borderMid}; color:${C.text}; }
  .fp.on { background:${C.accent}; border-color:${C.accent}; color:#fff; }

  /* ── Search ── */
  .srch {
    background:${C.card}; border:1px solid ${C.border}; border-radius:5px;
    color:${C.text}; padding:6px 11px; font-family:'Courier New',monospace;
    font-size:12px; outline:none; width:175px; transition:border 0.13s;
  }
  .srch:focus { border-color:${C.accent}; }
  .srch::placeholder { color:${C.textMuted}; }

  /* ── Stat boxes ── */
  .stat { background:${C.card}; border:1px solid ${C.border}; border-radius:7px; padding:10px 14px; flex:1; min-width:80px; }
  .pbar { height:2px; background:${C.border}; border-radius:1px; overflow:hidden; margin-top:7px; }
  .pfill { height:100%; border-radius:1px; transition:width 0.5s ease; }

  /* ── Modal ── */
  .overlay { position:fixed; inset:0; background:rgba(0,0,0,0.82); z-index:200; display:flex; align-items:center; justify-content:center; padding:20px; backdrop-filter:blur(5px); }
  .modal { background:${C.surface}; border:1px solid ${C.borderMid}; border-radius:11px; width:100%; max-width:860px; max-height:90vh; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 32px 100px rgba(0,0,0,0.75); }
  .mh { padding:16px 20px; border-bottom:1px solid ${C.border}; flex-shrink:0; display:flex; align-items:center; justify-content:space-between; }
  .mb { padding:18px 20px; overflow-y:auto; flex:1; }
  .mf { padding:12px 20px; border-top:1px solid ${C.border}; display:flex; gap:8px; justify-content:flex-end; flex-shrink:0; }

  /* ── Diff rows ── */
  .dr { background:${C.card}; border:1px solid ${C.border}; border-radius:6px; padding:10px 13px; margin-bottom:7px; }
  .dr.d2 { border-left:3px solid ${C.red}; }
  .dr.d1 { border-left:3px solid ${C.amber}; }

  /* ── Diagnostic sections ── */
  .diag-section { margin-bottom:22px; animation: fadeSlideIn 0.25s ease forwards; }
  .diag-header {
    display:flex; align-items:center; gap:10px; margin-bottom:12px;
    padding-bottom:8px; border-bottom:1px solid ${C.border};
  }
  .diag-icon {
    width:28px; height:28px; border-radius:7px; display:flex; align-items:center;
    justify-content:center; font-size:13px; flex-shrink:0;
  }
  .diag-badge {
    font-size:10px; font-weight:700; letter-spacing:0.08em;
    border-radius:20px; padding:2px 8px; display:inline-flex; align-items:center; gap:4px;
  }
  .diff-table { width:100%; border-collapse:separate; border-spacing:0 5px; }
  .diff-table th {
    font-size:9px; font-weight:700; letter-spacing:0.1em; color:${C.textMuted};
    text-align:left; padding:4px 10px; text-transform:uppercase;
  }
  .diff-row {
    background:${C.card}; border-radius:6px;
    animation: fadeSlideIn 0.2s ease forwards;
  }
  .diff-row td { padding:9px 10px; font-size:11px; vertical-align:top; }
  .diff-row td:first-child { border-radius:6px 0 0 6px; border-left:3px solid transparent; }
  .diff-row td:last-child  { border-radius:0 6px 6px 0; }
  .diff-row.miss-dr td:first-child { border-left-color:${C.red}; }
  .diff-row.miss-pr td:first-child { border-left-color:${C.amber}; }

  .val-chip {
    display:inline-block; padding:2px 8px; border-radius:4px;
    font-size:11px; font-weight:700; max-width:180px;
    overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
  }
  .val-pr { background:rgba(0,214,143,0.1); color:${C.green}; border:1px solid rgba(0,214,143,0.2); }
  .val-dr { background:rgba(255,64,96,0.1);  color:${C.red};   border:1px solid rgba(255,64,96,0.2); }
  .val-empty { background:${C.border}; color:${C.textMuted}; font-style:italic; }

  .summary-bar {
    display:flex; gap:8px; padding:12px 16px; border-radius:8px; margin-bottom:18px;
    background:${C.card}; border:1px solid ${C.border}; align-items:center; flex-wrap:wrap;
  }
  .summary-pill {
    display:flex; align-items:center; gap:6px; padding:5px 12px;
    border-radius:5px; font-size:11px; font-weight:700; letter-spacing:0.06em;
  }

  .spin-anim { animation:spin 0.7s linear infinite; }
  .tab-btn {
    padding:6px 14px; border:none; background:transparent; cursor:pointer;
    font-family:'Courier New',monospace; font-size:11px; font-weight:700;
    letter-spacing:0.07em; text-transform:uppercase; transition:all 0.13s;
    border-bottom:2px solid transparent; color:${C.textSub};
  }
  .tab-btn.on { color:${C.accent}; border-bottom-color:${C.accent}; }
  .tab-btn:hover:not(.on) { color:${C.text}; }
`;

// ─── Helpers ─────────────────────────────────────────────────────────────────
const oct = ip => ip.split(".")[3];

function downloadCSV(pairs, results) {
  const rows = [["PR IP","DR IP","Status","Missing in DR","Missing in PR","Error","Checked At"]];
  for (const p of pairs) {
    const r = results[p.id];
    if (!r) { rows.push([p.pr, p.dr,"PENDING","","","",""]); continue; }
    const d = r.data?.differences;
    rows.push([
      p.pr, p.dr,
      r.loading ? "CHECKING" : r.error ? "ERROR" : (r.data?.status || ""),
      d?.missing_in_env2?.length ?? "",
      d?.missing_in_env1?.length ?? "",
      r.error || "",
      r.timestamp || ""
    ]);
  }
  const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type:"text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href=url; a.download=`sync_report_${Date.now()}.csv`; a.click();
  URL.revokeObjectURL(url);
}

function cardState(r) {
  if (!r)        return "pending";
  if (r.loading) return "loading";
  if (r.error)   return "errored";
  if (r.data?.status === "IN SYNC")     return "synced";
  if (r.data?.status === "NOT IN SYNC") return "drifted";
  return "pending";
}
const STATE_LABEL = { synced:"IN SYNC", drifted:"OUT OF SYNC", errored:"ERROR", loading:"CHECKING", pending:"PENDING" };

// ─── Small Components ─────────────────────────────────────────────────────────
function Spinner({ size=14, color=C.accent }) {
  return <div className="spin-anim" style={{ width:size, height:size, border:`2px solid ${C.border}`, borderTopColor:color, borderRadius:"50%", flexShrink:0 }} />;
}

function ServerCard({ pair, result, onClick }) {
  const state = cardState(result);
  const diff = result?.data?.differences;
  const diffCount = diff ? (diff.missing_in_env2?.length||0)+(diff.missing_in_env1?.length||0) : 0;
  let cardCls = "sc";
  if (state==="synced")  cardCls+=" synced";
  if (state==="drifted") cardCls+=" drifted";
  if (state==="errored") cardCls+=" errored";

  return (
    <div className={cardCls} onClick={() => onClick(pair, result)}>
      <div className={`sc-bar ${state}`} />
      {state==="loading" && <div className="sc-shimmer" />}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
        <span style={{ fontSize:18, fontWeight:700, color:C.text }}>.{oct(pair.pr)}</span>
        <div style={{ display:"flex", alignItems:"center", gap:5 }}>
          {state==="loading" && <Spinner size={10} />}
          <span className={`slabel ${state}`}>{STATE_LABEL[state]}</span>
        </div>
      </div>
      <div style={{ fontSize:10, lineHeight:1.75, color:C.textMuted }}>
        <div><span style={{ marginRight:4 }}>PR</span><span style={{ color:C.textSub }}>{pair.pr}</span></div>
        <div><span style={{ marginRight:4 }}>DR</span><span style={{ color:C.textSub }}>{pair.dr}</span></div>
      </div>
      {state==="drifted" && diffCount>0 && (
        <div style={{ marginTop:6, fontSize:10, color:C.red, fontWeight:700 }}>{diffCount} difference{diffCount!==1?"s":""}</div>
      )}
      {state==="errored" && (
        <div style={{ marginTop:6, fontSize:10, color:C.amber, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{result.error}</div>
      )}
    </div>
  );
}

// ─── Diagnostic diff section ──────────────────────────────────────────────────
function DiagDiffTable({ items, type }) {
  const [expanded, setExpanded] = useState(true);
  if (!items?.length) return null;
  const isMissDR = type === "env2";
  const color = isMissDR ? C.red : C.amber;
  const rowCls = isMissDR ? "diff-row miss-dr" : "diff-row miss-pr";
  const heading = isMissDR
    ? "Configuration missing on DR — DR is behind PR"
    : "Configuration missing on PR — PR doesn't have what DR has";
  const icon = isMissDR ? "⬇" : "⬆";
  const bgIcon = isMissDR ? C.redBg : C.amberBg;

  return (
    <div className="diag-section">
      <div className="diag-header">
        <div className="diag-icon" style={{ background: bgIcon, border:`1px solid ${color}33` }}>
          <span style={{ color }}>{icon}</span>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:11, fontWeight:700, color, letterSpacing:"0.07em" }}>
            {isMissDR ? "MISSING IN DR" : "MISSING IN PR"}
            <span className="diag-badge" style={{ marginLeft:8, background:`${color}18`, color, border:`1px solid ${color}33` }}>
              {items.length} {items.length === 1 ? "issue" : "issues"}
            </span>
          </div>
          <div style={{ fontSize:11, color:C.textSub, marginTop:2 }}>{heading}</div>
        </div>
        <button
          className="btn btn-ghost"
          style={{ padding:"3px 9px", fontSize:11 }}
          onClick={() => setExpanded(o => !o)}
        >
          {expanded ? "COLLAPSE" : "EXPAND"}
        </button>
      </div>

      {expanded && (
        <table className="diff-table">
          <thead>
            <tr>
              <th style={{ width:"40%" }}>Location / Path</th>
              <th style={{ width:"18%" }}>Property</th>
              <th style={{ width:"21%" }}>PR Value</th>
              <th style={{ width:"21%" }}>DR Value</th>
            </tr>
          </thead>
          <tbody>
            {items.map((d, i) => (
              <tr key={i} className={rowCls}>
                <td>
                  <span style={{ color:C.textSub, wordBreak:"break-all", lineHeight:1.5, display:"block" }}>
                    {d.location || <em style={{ color:C.textMuted }}>—</em>}
                  </span>
                </td>
                <td>
                  <span style={{ color:C.text, fontWeight:700 }}>{d.property || "—"}</span>
                </td>
                <td>
                  {d.env1 !== undefined
                    ? <span className={`val-chip ${d.env1 ? "val-pr" : "val-empty"}`}>{d.env1 || "(empty)"}</span>
                    : <span style={{ color:C.textMuted, fontSize:11 }}>—</span>
                  }
                </td>
                <td>
                  {d.env2 !== undefined
                    ? <span className={`val-chip ${d.env2 ? "val-dr" : "val-empty"}`}>{d.env2 || "(empty)"}</span>
                    : <span style={{ color:C.textMuted, fontSize:11 }}>—</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// ─── Grouped by location view ─────────────────────────────────────────────────
function GroupedDiffView({ diff }) {
  const allItems = [
    ...(diff.missing_in_env2 || []).map(d => ({ ...d, _kind:"env2" })),
    ...(diff.missing_in_env1 || []).map(d => ({ ...d, _kind:"env1" })),
  ];
  const grouped = {};
  for (const item of allItems) {
    const loc = item.location || "(unknown)";
    if (!grouped[loc]) grouped[loc] = [];
    grouped[loc].push(item);
  }
  const locations = Object.keys(grouped);

  return (
    <div>
      {locations.map((loc, li) => (
        <div key={li} style={{ marginBottom:14 }}>
          <div style={{ fontSize:10, color:C.accent, fontWeight:700, letterSpacing:"0.07em", marginBottom:6, display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ color:C.textMuted }}>PATH</span>
            <span style={{ color:C.textSub, wordBreak:"break-all" }}>{loc}</span>
          </div>
          {grouped[loc].map((item, i) => {
            const isMissDR = item._kind === "env2";
            const color = isMissDR ? C.red : C.amber;
            const label = isMissDR ? "MISSING IN DR" : "MISSING IN PR";
            return (
              <div key={i} className={`dr ${isMissDR ? "d2" : "d1"}`} style={{ display:"flex", alignItems:"flex-start", gap:14, flexWrap:"wrap" }}>
                <span style={{ fontSize:9, fontWeight:700, color, letterSpacing:"0.08em", marginTop:2, flexShrink:0 }}>{label}</span>
                <span style={{ fontSize:12 }}>
                  <span style={{ color:C.textMuted }}>property </span>
                  <span style={{ color:C.text, fontWeight:700 }}>{item.property}</span>
                </span>
                {item.env1 !== undefined && (
                  <span style={{ fontSize:12 }}>
                    <span style={{ color:C.textMuted }}>PR </span>
                    <span className={`val-chip ${item.env1 ? "val-pr" : "val-empty"}`}>{item.env1 || "(empty)"}</span>
                  </span>
                )}
                {item.env2 !== undefined && (
                  <span style={{ fontSize:12 }}>
                    <span style={{ color:C.textMuted }}>DR </span>
                    <span className={`val-chip ${item.env2 ? "val-dr" : "val-empty"}`}>{item.env2 || "(empty)"}</span>
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────
function DetailModal({ pair, result, onClose }) {
  const [view, setView] = useState("table"); // "table" | "grouped"

  const data   = result?.data;
  const status = data?.status;
  const isSynced = status === "IN SYNC";
  const diff   = data?.differences;
  const missDR = diff?.missing_in_env2 || [];
  const missPR = diff?.missing_in_env1 || [];
  const totalDiff = missDR.length + missPR.length;
  const state  = cardState(result);
  const barColor = state==="synced" ? C.green : state==="drifted" ? C.red : C.amber;

  // health breakdown
  const checks = [
    { label:"DR missing config",  count:missDR.length, color:C.red,   icon:"⬇", desc:"Items present on PR but absent on DR" },
    { label:"PR missing config",  count:missPR.length, color:C.amber, icon:"⬆", desc:"Items present on DR but absent on PR" },
  ];

  return (
    <div className="overlay" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="modal">
        {/* Header */}
        <div className="mh">
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:3, height:26, borderRadius:2, background:barColor, boxShadow:`0 0 8px ${barColor}88` }} />
            <div>
              <div style={{ fontSize:15, fontWeight:700, letterSpacing:"0.04em" }}>
                Server Pair <span style={{ color:C.accent }}>.{oct(pair.pr)}</span>
                <span className={`slabel ${state}`} style={{ marginLeft:10, verticalAlign:"middle" }}>{STATE_LABEL[state]}</span>
              </div>
              <div style={{ fontSize:11, color:C.textMuted, marginTop:3 }}>{result?.timestamp}</div>
            </div>
          </div>
          <button className="btn btn-ghost" onClick={onClose} style={{ padding:"3px 9px", fontSize:14 }}>✕</button>
        </div>

        {/* Body */}
        <div className="mb">

          {/* Error banner */}
          {result?.error && (
            <div style={{ background:C.amberBg, border:`1px solid ${C.amberBorder}`, borderRadius:7, padding:"12px 16px", marginBottom:16 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
                <span style={{ fontSize:16 }}>⚠</span>
                <span style={{ fontSize:11, fontWeight:700, color:C.amber, letterSpacing:"0.07em" }}>REQUEST FAILED</span>
              </div>
              <div style={{ fontSize:12, color:C.textSub, lineHeight:1.6 }}>{result.error}</div>
              <div style={{ marginTop:8, fontSize:11, color:C.textMuted }}>
                This could indicate a network issue, the server is unreachable, or the sync API returned an unexpected response.
                Verify connectivity to <span style={{ color:C.text }}>{pair.pr}</span> and <span style={{ color:C.text }}>{pair.dr}</span> before retrying.
              </div>
            </div>
          )}

          {/* Server info row */}
          <div style={{ display:"flex", gap:10, marginBottom:16, flexWrap:"wrap" }}>
            {[
              { label:"PR SERVER", val:pair.pr, color:C.accent, sub:"Primary / Production" },
              { label:"DR SERVER", val:pair.dr, color:C.green,  sub:"Disaster Recovery" },
            ].map(s => (
              <div key={s.label} style={{ flex:1, minWidth:140, background:C.card, border:`1px solid ${C.border}`, borderRadius:7, padding:"10px 14px" }}>
                <div style={{ fontSize:9, color:C.textMuted, fontWeight:700, letterSpacing:"0.1em", marginBottom:2 }}>{s.label}</div>
                <div style={{ fontSize:13, color:s.color, fontWeight:700 }}>{s.val}</div>
                <div style={{ fontSize:10, color:C.textMuted, marginTop:2 }}>{s.sub}</div>
              </div>
            ))}
            {!isSynced && totalDiff > 0 && (
              <div style={{ flex:1, minWidth:140, background:`rgba(255,64,96,0.06)`, border:`1px solid ${C.redBorder}`, borderRadius:7, padding:"10px 14px" }}>
                <div style={{ fontSize:9, color:C.textMuted, fontWeight:700, letterSpacing:"0.1em", marginBottom:2 }}>TOTAL ISSUES</div>
                <div style={{ fontSize:22, color:C.red, fontWeight:700, lineHeight:1 }}>{totalDiff}</div>
                <div style={{ fontSize:10, color:C.textMuted, marginTop:3 }}>config differences found</div>
              </div>
            )}
          </div>

          {/* In-sync celebration */}
          {isSynced && (
            <div style={{ textAlign:"center", padding:"30px 0", background:`rgba(0,214,143,0.04)`, borderRadius:10, border:`1px solid ${C.greenBorder}`, marginBottom:16 }}>
              <div style={{ fontSize:32, marginBottom:8 }}>✓</div>
              <div style={{ fontSize:20, fontWeight:700, color:C.green, letterSpacing:"0.05em", marginBottom:6 }}>FULLY IN SYNC</div>
              <div style={{ fontSize:13, color:C.textSub }}>No configuration drift detected between PR and DR.</div>
              <div style={{ fontSize:11, color:C.textMuted, marginTop:4 }}>Both servers are running identical configurations.</div>
            </div>
          )}

          {/* Drift present: summary + diff tables */}
          {!isSynced && diff && totalDiff > 0 && (
            <>
              {/* Summary bar */}
              <div className="summary-bar">
                <span style={{ fontSize:11, color:C.textMuted, fontWeight:700, letterSpacing:"0.08em", marginRight:4 }}>BREAKDOWN</span>
                {checks.map(c => c.count > 0 && (
                  <div key={c.label} className="summary-pill" style={{ background:`${c.color}14`, border:`1px solid ${c.color}30` }}>
                    <span style={{ color:c.color }}>{c.icon}</span>
                    <span style={{ color:c.color, fontWeight:700 }}>{c.count}</span>
                    <span style={{ color:C.textSub }}>{c.label}</span>
                  </div>
                ))}
                <span style={{ marginLeft:"auto", fontSize:10, color:C.textMuted }}>
                  DR must be updated to resolve {missDR.length > 0 ? `${missDR.length} missing item${missDR.length!==1?"s":""}` : ""}{missDR.length>0&&missPR.length>0?" and ":""}{missPR.length > 0 ? `${missPR.length} extra item${missPR.length!==1?"s":""} need review` : ""}
                </span>
              </div>

              {/* View toggle */}
              <div style={{ display:"flex", borderBottom:`1px solid ${C.border}`, marginBottom:16 }}>
                <button className={`tab-btn ${view==="table"?"on":""}`} onClick={() => setView("table")}>BY TYPE</button>
                <button className={`tab-btn ${view==="grouped"?"on":""}`} onClick={() => setView("grouped")}>BY LOCATION</button>
              </div>

              {view === "table" && (
                <>
                  <DiagDiffTable items={missDR} type="env2" />
                  <DiagDiffTable items={missPR} type="env1" />
                </>
              )}
              {view === "grouped" && <GroupedDiffView diff={diff} />}
            </>
          )}

          {/* Drifted but no parsed diff details */}
          {!isSynced && !result?.error && (!diff || totalDiff === 0) && (
            <div style={{ background:C.redBg, border:`1px solid ${C.redBorder}`, borderRadius:7, padding:"12px 16px" }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.red, letterSpacing:"0.07em", marginBottom:4 }}>OUT OF SYNC — NO DIFF DETAIL</div>
              <div style={{ fontSize:12, color:C.textSub }}>
                The API reported this pair as out of sync but did not return any specific diff details.
                This may indicate a structural configuration mismatch or a non-property-level divergence.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mf">
          <button className="btn btn-ghost" onClick={onClose}>CLOSE</button>
        </div>
      </div>
    </div>
  );
}

// ─── Subnet Scroll Panel ──────────────────────────────────────────────────────
function SubnetScroll({ pairs, results, onCardClick }) {
  const gs = pairs.filter(p => results[p.id]?.data?.status==="IN SYNC").length;
  const gd = pairs.filter(p => results[p.id]?.data?.status==="NOT IN SYNC").length;
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:8, flexShrink:0 }}>
        <span style={{ fontSize:11, color:C.green }}>{gs} synced</span>
        <span style={{ fontSize:11, color:gd>0?C.red:C.textMuted }}>{gd} drifted</span>
        <span style={{ fontSize:11, color:C.textMuted }}>{pairs.length} total</span>
      </div>
      <div style={{ flex:1, overflowY:"auto", paddingRight:4 }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(175px, 1fr))", gap:8, alignContent:"start" }}>
          {pairs.map(pair => (
            <ServerCard key={pair.id} pair={pair} result={results[pair.id]} onClick={onCardClick} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [results,    setResults]    = useState({});
  const [modal,      setModal]      = useState(null);
  const [filter,     setFilter]     = useState("all");
  const [search,     setSearch]     = useState("");
  const [isRunning,  setIsRunning]  = useState(false);
  const [subnetIdx,  setSubnetIdx]  = useState(0);
  const [sliding,    setSliding]    = useState(false);
  const [slideDir,   setSlideDir]   = useState(1);
  const abortRef   = useRef(null);

  const updateResult = useCallback((id, patch) => {
    setResults(prev => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  }, []);

  async function checkPair(pair, signal) {
    updateResult(pair.id, { loading:true, error:null, data:null });
    try {
      const res = await fetch(API_URL, {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({ ip1:pair.pr, ip2:pair.dr }),
        signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      updateResult(pair.id, { loading:false, data, timestamp:new Date().toLocaleString() });
    } catch(e) {
      if (e.name==="AbortError") return;
      updateResult(pair.id, { loading:false, error:e.message, timestamp:new Date().toLocaleString() });
    }
  }

  async function runAll() {
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setIsRunning(true);
    const fresh = {};
    PAIRS.forEach(p => { fresh[p.id] = { loading:true }; });
    setResults(fresh);
    let idx = 0;
    async function worker() {
      while (idx < PAIRS.length && !ctrl.signal.aborted) {
        const pair = PAIRS[idx++];
        await checkPair(pair, ctrl.signal);
      }
    }
    await Promise.all(Array.from({ length:6 }, worker));
    setIsRunning(false);
  }

  function stopAll() {
    abortRef.current?.abort();
    setIsRunning(false);
    setResults(prev => {
      const next = { ...prev };
      for (const k of Object.keys(next)) {
        if (next[k]?.loading) next[k] = { ...next[k], loading:false, error:"Cancelled" };
      }
      return next;
    });
  }

  function slideToSubnet(idx) {
    if (idx === subnetIdx || sliding) return;
    setSlideDir(idx > subnetIdx ? 1 : -1);
    setSliding(true);
    setTimeout(() => {
      setSubnetIdx(idx);
      setSliding(false);
    }, 320);
  }

  const vals       = Object.values(results);
  const total      = PAIRS.length;
  const checked    = vals.filter(r => r && !r.loading && (r.data||r.error)).length;
  const synced     = vals.filter(r => r?.data?.status==="IN SYNC").length;
  const notSynced  = vals.filter(r => r?.data?.status==="NOT IN SYNC").length;
  const errors     = vals.filter(r => r?.error && !r.loading).length;
  const inProgress = vals.filter(r => r?.loading).length;

  function getFiltered(group) {
    return PAIRS.filter(p => {
      if (!p.pr.startsWith(group.prefix)) return false;
      const r = results[p.id];
      if (search) {
        const q = search.toLowerCase();
        if (!p.pr.includes(q) && !p.dr.includes(q) && !oct(p.pr).includes(q)) return false;
      }
      if (filter==="synced")     return r?.data?.status==="IN SYNC";
      if (filter==="not-synced") return r?.data?.status==="NOT IN SYNC";
      if (filter==="error")      return !!r?.error;
      if (filter==="pending")    return !r || r.loading;
      return true;
    });
  }

  const activeGroup = GROUPS[subnetIdx];

  return (
    <>
      <style>{css}</style>
      <div style={{ height:"100vh", display:"flex", flexDirection:"column", overflow:"hidden" }}>

        {/* Header */}
        <header style={{ background:C.surface, borderBottom:`1px solid ${C.border}`, padding:"0 22px", display:"flex", alignItems:"center", justifyContent:"space-between", height:52, flexShrink:0, gap:16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:3, height:24, borderRadius:2, background:`linear-gradient(180deg,${C.accent},#1a4fb5)` }} />
            <div>
              <div style={{ fontSize:13, fontWeight:700, letterSpacing:"0.12em", color:C.text }}>EIS SYNC PORTAL</div>
              <div style={{ fontSize:9, color:C.textMuted, letterSpacing:"0.1em" }}>PR / DR SYNCHRONIZATION MONITOR</div>
            </div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            {checked>0 && <button className="btn btn-csv" onClick={() => downloadCSV(PAIRS, results)}>DOWNLOAD CSV</button>}
            {isRunning
              ? <button className="btn btn-stop" onClick={stopAll}>STOP</button>
              : <button className="btn btn-primary" onClick={runAll}>CHECK ALL SERVERS</button>
            }
          </div>
        </header>

        {/* Stats row */}
        <div style={{ display:"flex", gap:8, padding:"8px 22px", flexShrink:0, borderBottom:`1px solid ${C.border}` }}>
          {[
            { label:"TOTAL",       val:total,      color:C.text },
            { label:"CHECKED",     val:checked,    color:C.accent,  pct:total?checked/total*100:0,       pc:C.accent },
            { label:"IN SYNC",     val:synced,     color:C.green,   pct:checked?synced/checked*100:0,    pc:C.green },
            { label:"OUT OF SYNC", val:notSynced,  color:C.red,     pct:checked?notSynced/checked*100:0, pc:C.red },
            { label:"ERRORS",      val:errors,     color:C.amber },
            { label:"IN PROGRESS", val:inProgress, color:C.textSub },
          ].map(s => (
            <div key={s.label} className="stat">
              <div style={{ fontSize:9, color:C.textMuted, fontWeight:700, letterSpacing:"0.1em", marginBottom:2 }}>{s.label}</div>
              <div style={{ fontSize:22, fontWeight:700, color:s.color, lineHeight:1.1 }}>{s.val}</div>
              {s.pct!==undefined && <div className="pbar"><div className="pfill" style={{ width:`${s.pct}%`, background:s.pc }} /></div>}
            </div>
          ))}
          <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", gap:4, marginLeft:"auto", flexShrink:0 }}>
            {[{ color:C.green, label:"In Sync" },{ color:C.red, label:"Out of Sync" },{ color:C.amber, label:"Error" },{ color:C.borderMid, label:"Pending" }].map(l => (
              <div key={l.label} style={{ display:"flex", alignItems:"center", gap:6 }}>
                <div style={{ width:7, height:7, borderRadius:"50%", background:l.color, flexShrink:0, boxShadow:l.color!==C.borderMid?`0 0 5px ${l.color}`:"none" }} />
                <span style={{ fontSize:10, color:C.textSub, whiteSpace:"nowrap" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter / Search bar */}
        <div style={{ display:"flex", gap:8, padding:"7px 22px", flexShrink:0, alignItems:"center", flexWrap:"wrap", borderBottom:`1px solid ${C.border}` }}>
          <input className="srch" type="text" placeholder="Search IP or octet" value={search} onChange={e=>setSearch(e.target.value)} />
          <div style={{ display:"flex", gap:4 }}>
            {[["all","ALL"],["synced","IN SYNC"],["not-synced","OUT OF SYNC"],["error","ERROR"],["pending","PENDING"]].map(([v,l]) => (
              <button key={v} className={`fp${filter===v?" on":""}`} onClick={() => setFilter(v)}>{l}</button>
            ))}
          </div>
          <span style={{ marginLeft:"auto", fontSize:11, color:C.textMuted, flexShrink:0 }}>
            {getFiltered(activeGroup).length} pairs shown — click any card for details
          </span>
        </div>

        {/* Subnet Carousel header */}
        <div style={{ display:"flex", alignItems:"center", gap:0, padding:"0 22px", height:48, flexShrink:0, borderBottom:`1px solid ${C.border}`, background:C.surface }}>
          <button className="car-btn" disabled={subnetIdx === 0 || sliding} onClick={() => slideToSubnet(subnetIdx - 1)} style={{ marginRight:14 }}>{"<"}</button>
          <div style={{ flex:1, overflow:"hidden", position:"relative", height:"100%", display:"flex", alignItems:"center" }}>
            <div style={{
              display:"flex",
              transform: sliding ? `translateX(${slideDir > 0 ? "-60px" : "60px"})` : "translateX(0)",
              opacity: sliding ? 0 : 1,
              transition: `transform 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.32s ease`,
              alignItems:"center", gap:14,
            }}>
              <span style={{ fontSize:12, fontWeight:700, color:C.accent, letterSpacing:"0.1em" }}>{activeGroup.label}</span>
              <span style={{ fontSize:11, color:C.textMuted }}>{activeGroup.sublabel}</span>
              <span style={{ fontSize:11, color:C.textMuted }}>— {PAIRS.filter(p=>p.pr.startsWith(activeGroup.prefix)).length} pairs</span>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginRight:14 }}>
            {GROUPS.map((g, i) => (
              <button key={g.id} className={`subnet-dot ${i===subnetIdx?"on":"off"}`} onClick={() => slideToSubnet(i)} title={g.label} />
            ))}
          </div>
          <button className="car-btn" disabled={subnetIdx === GROUPS.length - 1 || sliding} onClick={() => slideToSubnet(subnetIdx + 1)}>{">"}</button>
        </div>

        {/* Carousel Track */}
        <div style={{ flex:1, minHeight:0, overflow:"hidden", position:"relative" }}>
          <div style={{
            display:"flex",
            width:`${GROUPS.length * 100}%`,
            height:"100%",
            transform:`translateX(${-subnetIdx * (100 / GROUPS.length)}%)`,
            transition:`transform 0.32s cubic-bezier(0.4,0,0.2,1)`,
          }}>
            {GROUPS.map((group) => {
              const fp = getFiltered(group);
              return (
                <div key={group.id} style={{ width:`${100 / GROUPS.length}%`, height:"100%", padding:"10px 22px 12px", display:"flex", flexDirection:"column", flexShrink:0 }}>
                  {fp.length > 0
                    ? <SubnetScroll
                        key={group.id + filter + search}
                        pairs={fp}
                        results={results}
                        onCardClick={(p, r) => {
                          if (!r) { checkPair(p, new AbortController().signal); return; }
                          setModal({ pair:p, result:r });
                        }}
                      />
                    : <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", color:C.textMuted, fontSize:13, letterSpacing:"0.05em" }}>
                        No servers match the current filter
                      </div>
                  }
                </div>
              );
            })}
          </div>
        </div>

        {modal && <DetailModal pair={modal.pair} result={modal.result} onClose={() => setModal(null)} />}
      </div>
    </>
  );
}
