import React, { useState, useMemo } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// ใช้ CDN worker - ปลอดภัยสุด
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();
import {
  Building2, Layers, Box, Anchor, Activity, AlertTriangle,
  CheckCircle2, Clock, Bell, Search, Plus, Upload,
  Calculator, Hammer, Gauge, Wind, ArrowRight, Menu,
  Zap, Shield, FileCheck, Cpu, Sparkles, ChevronRight,
  Home, BarChart3, Settings, LogOut, Calendar, Download, Triangle , Grid3x3 , Square, MoveHorizontal, MousePointer2, Trash2
} from 'lucide-react';

// ========== UNIT CONVERSION CONSTANTS ==========
// 1 kN = 102 kgf  |  1 kN·m = 102 kgf·m  |  1 kN/m = 102 kgf/m
const KN_TO_KGF = 101.97; // 1 kN ≈ 101.97 kgf

export default function StructVaultApp() {
  const [page, setPage] = useState('landing');
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a1628] text-slate-200" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif' }}>
      {page === 'landing' && <LandingPage onEnter={() => setPage('dashboard')} />}
      {page !== 'landing' && (
        <AppShell page={page} setPage={setPage} mobileMenu={mobileMenu} setMobileMenu={setMobileMenu}>
          {page === 'dashboard' && <DashboardPage setPage={setPage} />}
          {page === 'beam' && <BeamCalculator />}
          {page === 'column' && <ColumnCalculator />}
          {page === 'foundation' && <FoundationCalculator />}
          {page === 'seismic' && <SeismicCalculator />}
          {page === 'roof' && <RoofCalculator />}
          {page === 'building' && <BuildingDesigner />}
        </AppShell>
      )}
    </div>
  );
}

/* ================== LANDING PAGE ================== */
function LandingPage({ onEnter }) {
  return (
    <div className="min-h-screen relative overflow-hidden"
         style={{
           backgroundImage: `
             radial-gradient(ellipse at top, rgba(34, 211, 238, 0.08), transparent 50%),
             radial-gradient(ellipse at bottom right, rgba(245, 158, 11, 0.05), transparent 50%),
             linear-gradient(rgba(34, 211, 238, 0.02) 1px, transparent 1px),
             linear-gradient(90deg, rgba(34, 211, 238, 0.02) 1px, transparent 1px)
           `,
           backgroundSize: '100% 100%, 100% 100%, 60px 60px, 60px 60px'
         }}>
      <nav className="relative z-10 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <Building2 className="w-6 h-6 text-slate-900" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-bold text-white text-lg tracking-tight">StructVault</div>
            <div className="text-[10px] text-slate-500 tracking-widest uppercase">มยผ. 1301-61</div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm">
          <a className="text-slate-400 hover:text-white transition cursor-pointer">ฟีเจอร์</a>
          <a className="text-slate-400 hover:text-white transition cursor-pointer">มาตรฐาน</a>
          <a className="text-slate-400 hover:text-white transition cursor-pointer">ราคา</a>
          <a className="text-slate-400 hover:text-white transition cursor-pointer">เกี่ยวกับเรา</a>
        </div>
        <button onClick={onEnter}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-5 py-2 rounded-lg text-sm transition shadow-lg shadow-cyan-500/20">
          เข้าสู่ระบบ
        </button>
      </nav>

      <section className="relative z-10 px-8 pt-20 pb-32 max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-8">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs text-cyan-300 tracking-wide">หน่วยไทย kg, kg·m · รองรับ ACI 318-19 และ มยผ. 1301-61</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-6">
          ออกแบบโครงสร้าง<br />
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">แม่นยำ รวดเร็ว</span><br />
          ตามมาตรฐานไทย
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          แพลตฟอร์มคำนวณและตรวจสอบการออกแบบโครงสร้าง RC และเหล็ก ครบวงจร — ในที่เดียว
        </p>
        <div className="flex flex-wrap gap-4 mb-16">
          <button onClick={onEnter}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-7 py-3.5 rounded-lg flex items-center gap-2 transition shadow-xl shadow-cyan-500/30">
            เริ่มใช้งานฟรี <ArrowRight className="w-4 h-4" strokeWidth={3} />
          </button>
          <button className="bg-slate-800/60 border border-slate-700 hover:border-slate-600 text-white font-semibold px-7 py-3.5 rounded-lg transition">ดู Demo</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-slate-800">
          <Stat number="2,400+" label="วิศวกรใช้งาน" />
          <Stat number="48,000" label="โครงการที่คำนวณ" />
          <Stat number="99.7%" label="ความแม่นยำ" />
          <Stat number="0.8s" label="เวลาคำนวณเฉลี่ย" />
        </div>
      </section>

      <section className="relative z-10 px-8 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-cyan-400 text-sm tracking-widest uppercase mb-3">ฟีเจอร์หลัก</div>
          <h2 className="text-4xl font-bold text-white mb-4">ครบทุกอย่างที่วิศวกรต้องการ</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          <FeatureCard icon={<Calculator />} title="คำนวณอัตโนมัติ" desc="วิเคราะห์คาน เสา พื้น ฐานราก พร้อม U-Ratio" color="cyan" />
          <FeatureCard icon={<Activity />} title="แผ่นดินไหว · แรงลม" desc="คำนวณ Response Spectrum ตามมยผ. 1301-61" color="amber" />
          <FeatureCard icon={<FileCheck />} title="ออกแบบรับรองได้" desc="รายงานคำนวณพร้อมส่งกองช่าง" color="emerald" />
          <FeatureCard icon={<Cpu />} title="เชื่อม BIM" desc="Import DWG, IFC, ETABS" color="rose" />
          <FeatureCard icon={<Shield />} title="ตรวจสอบ Code" desc="Real-time check ตาม ACI 318-19, AISC 360" color="cyan" />
          <FeatureCard icon={<Zap />} title="BOQ อัตโนมัติ" desc="คำนวณปริมาณคอนกรีต เหล็กเสริม" color="amber" />
        </div>
      </section>

      <section className="relative z-10 px-8 py-24 max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-br from-cyan-500/10 to-emerald-500/5 border border-cyan-500/20 rounded-2xl p-12">
          <h2 className="text-4xl font-bold text-white mb-4">พร้อมเริ่มออกแบบหรือยัง?</h2>
          <p className="text-slate-400 mb-8">เข้าใช้งาน Demo ได้ทันที</p>
          <button onClick={onEnter}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-8 py-4 rounded-lg inline-flex items-center gap-2 transition shadow-xl shadow-cyan-500/30">
            เข้าสู่ Dashboard <ArrowRight className="w-5 h-5" strokeWidth={3} />
          </button>
        </div>
      </section>

      <footer className="relative z-10 border-t border-slate-800 px-8 py-8 text-center text-xs text-slate-500">
        StructVault © 2026 · มยผ. 1301-61 Compliant · Built for Thai Engineers
      </footer>
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div>
      <div className="text-3xl font-bold text-white tracking-tight">{number}</div>
      <div className="text-sm text-slate-500 mt-1">{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, color }) {
  const colors = {
    cyan: 'from-cyan-400 to-cyan-600 shadow-cyan-500/20',
    amber: 'from-amber-400 to-orange-500 shadow-amber-500/20',
    emerald: 'from-emerald-400 to-teal-500 shadow-emerald-500/20',
    rose: 'from-rose-400 to-pink-500 shadow-rose-500/20',
  };
  return (
    <div className="bg-slate-900/40 border border-slate-800 hover:border-slate-700 rounded-xl p-6 transition group">
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors[color]} flex items-center justify-center text-slate-900 shadow-lg mb-5 group-hover:scale-110 transition`}>
        {React.cloneElement(icon, { className: 'w-6 h-6', strokeWidth: 2.5 })}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

/* ================== APP SHELL ================== */
function AppShell({ page, setPage, children }) {
  const menu = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'beam', name: 'คำนวณคาน RC', icon: Layers, code: '2.1' },
    { id: 'column', name: 'คำนวณเสา RC', icon: Box, code: '2.2' },
    { id: 'foundation', name: 'ฐานราก', icon: Anchor, code: '3.1' },
    { id: 'seismic', name: 'แผ่นดินไหว', icon: Activity, code: '5.1' },
    { id: 'roof', name: 'โครงหลังคา', icon: Triangle, code: '6.1' },
    { id: 'building', name: 'ออกแบบอาคาร', icon: Grid3x3, code: '7.1' },
  ];
  return (
    <div className="flex min-h-screen"
         style={{
           backgroundImage: `
             linear-gradient(rgba(34, 211, 238, 0.025) 1px, transparent 1px),
             linear-gradient(90deg, rgba(34, 211, 238, 0.025) 1px, transparent 1px)
           `,
           backgroundSize: '40px 40px'
         }}>
      <aside className="w-64 border-r border-slate-800/80 bg-slate-950/40 flex flex-col">
        <button onClick={() => setPage('landing')}
          className="flex items-center gap-3 px-5 py-5 border-b border-slate-800 hover:bg-slate-800/30 transition">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Building2 className="w-5 h-5 text-slate-900" strokeWidth={2.5} />
          </div>
          <div className="text-left">
            <div className="font-bold text-white tracking-tight text-sm">StructVault</div>
            <div className="text-[9px] text-slate-500 tracking-widest uppercase">v3.4.2 · TH Units</div>
          </div>
        </button>
        <nav className="flex-1 p-3 space-y-1">
          <div className="text-[10px] text-slate-500 tracking-widest uppercase mb-2 px-3 mt-3">เมนูหลัก</div>
          {menu.map(item => {
            const Icon = item.icon;
            const active = page === item.id;
            return (
              <button key={item.id} onClick={() => setPage(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition ${
                  active
                    ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 border border-transparent'
                }`}>
                <Icon className="w-4 h-4" strokeWidth={1.8} />
                <span className="flex-1 text-left">{item.name}</span>
                {item.code && (
                  <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                    {item.code}
                  </span>
                )}
              </button>
            );
          })}
          <div className="text-[10px] text-slate-500 tracking-widest uppercase mb-2 px-3 mt-6">อื่นๆ</div>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-slate-400 hover:bg-slate-800/40">
            <BarChart3 className="w-4 h-4" strokeWidth={1.8} />
            <span>รายงาน</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-slate-400 hover:bg-slate-800/40">
            <Settings className="w-4 h-4" strokeWidth={1.8} />
            <span>ตั้งค่า</span>
          </button>
        </nav>
        <div className="p-3 border-t border-slate-800">
          <div className="flex items-center gap-3 p-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center font-bold text-slate-900 text-sm">วก</div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">วิศวกร ไปป์ น้อย</div>
              <div className="text-[10px] text-slate-500">ภย. 12345</div>
            </div>
            <button className="text-slate-500 hover:text-slate-300">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

/* ================== DASHBOARD ================== */
function DashboardPage({ setPage }) {
  return (
    <div className="p-8">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] tracking-widest uppercase text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20">
            PROJECT 28 · อาคาร 8 ชั้น พระราม 9
          </span>
          <span className="text-xs text-slate-500">/ Q2-2026</span>
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
          ระบบออกแบบโครงสร้าง <span className="text-cyan-400">CIVIL</span>
        </h1>
        <p className="text-slate-400 max-w-3xl">
          ครบวงจรการออกแบบ · ตรวจสอบตามมยผ. 1301-61 · หน่วยไทย kg, kg·m
        </p>
      </header>
      <div className="grid grid-cols-5 gap-4 mb-8">
        <QuickCard icon={<Layers />} label="คำนวณคาน" desc="Beam RC Design" onClick={() => setPage('beam')} color="cyan" />
        <QuickCard icon={<Box />} label="คำนวณเสา" desc="Column + P-M Diagram" onClick={() => setPage('column')} color="amber" />
        <QuickCard icon={<Anchor />} label="ฐานราก" desc="Footing Design" onClick={() => setPage('foundation')} color="emerald" />
        <QuickCard icon={<Activity />} label="แผ่นดินไหว" desc="Seismic Analysis" onClick={() => setPage('seismic')} color="rose" />
        <QuickCard icon={<Triangle />} label="โครงหลังคา" desc="Roof Structure" onClick={() => setPage('roof')} color="cyan" />
        <QuickCard icon={<Grid3x3 />} label="ออกแบบอาคาร" desc="Building Designer" onClick={() => setPage('building')} color="emerald" />
      </div>
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard label="สมาชิกโครงสร้าง" value="486" sub="คาน 184 · เสา 96 · พื้น 206" progress={74} progressLabel="74% ผ่านการตรวจสอบ" icon={<Layers />} />
        <StatCard label="รอการอนุมัติ" value="8" valueColor="text-amber-400" sub="2 รายการเกินกำหนด" extra="Avg. cycle: 1.8 วัน" icon={<Clock />} iconBg="from-amber-500 to-orange-600" />
        <StatCard label="Utilization สูงสุด" value="0.92" valueColor="text-emerald-400" sub="C-3F-08 (column)" extra="ต่ำกว่าขีดจำกัด 0.95" icon={<Gauge />} iconBg="from-emerald-500 to-teal-600" />
        <StatCard label="Issue ที่ต้องแก้" value="5" valueColor="text-rose-400" icon={<AlertTriangle />} iconBg="from-rose-500 to-red-600" riskBars={{ h: 1, m: 2, l: 2 }} />
      </div>
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-white">รายการสมาชิกโครงสร้าง</h2>
            <span className="text-[10px] text-slate-500">Member Register</span>
          </div>
          <button className="text-xs text-cyan-300 hover:text-cyan-200 flex items-center gap-1">
            ดูทั้งหมด <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-[10px] tracking-widest uppercase text-slate-500 border-b border-slate-800">
              <th className="text-left px-5 py-3 font-medium">รหัส</th>
              <th className="text-left px-5 py-3 font-medium">ชนิด / ขนาด</th>
              <th className="text-left px-5 py-3 font-medium">ชั้น</th>
              <th className="text-left px-5 py-3 font-medium">วัสดุ</th>
              <th className="text-left px-5 py-3 font-medium">U-Ratio</th>
              <th className="text-left px-5 py-3 font-medium">สถานะ</th>
              <th className="text-left px-5 py-3 font-medium">อัปเดต</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <MemberRow code="B-3F-12" name="คาน RC · 0.30 × 0.60 ม." detail="span 6.50 ม." floor="3F" material="fc′ 280" utilization={0.78} status="ผ่าน" statusColor="emerald" date="2026-04-29" />
            <MemberRow code="C-3F-08" name="เสา RC · 0.50 × 0.50 ม." detail="P 290 ตัน · M 14.5 ตัน·ม." floor="3F" material="fc′ 320" utilization={0.92} status="วิกฤต" statusColor="amber" date="2026-04-30" />
            <MemberRow code="S-2F-05" name="แผ่นพื้นไร้คาน · t 0.20 ม." detail="panel 8.0 × 8.0 ม." floor="2F" material="fc′ 280" utilization={0.65} status="ผ่าน" statusColor="emerald" date="2026-04-28" />
            <MemberRow code="F-B1-03" name="ฐานเข็ม · 2.40 × 2.40 ม." detail="6 เข็ม Ø 0.40 ม." floor="B1" material="fc′ 320" utilization={0.71} status="รีวิว" statusColor="cyan" date="2026-04-27" />
            <MemberRow code="B-2F-07" name="คาน RC · 0.25 × 0.50 ม." detail="span 5.00 ม." floor="2F" material="fc′ 240" utilization={1.04} status="แก้ไข" statusColor="rose" date="2026-04-26" />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function QuickCard({ icon, label, desc, onClick, color }) {
  const colors = {
    cyan: 'from-cyan-400 to-cyan-600 shadow-cyan-500/20',
    amber: 'from-amber-400 to-orange-500 shadow-amber-500/20',
    emerald: 'from-emerald-400 to-teal-500 shadow-emerald-500/20',
    rose: 'from-rose-400 to-pink-500 shadow-rose-500/20',
  };
  return (
    <button onClick={onClick}
      className="bg-slate-900/40 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-5 text-left transition group">
      <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${colors[color]} flex items-center justify-center text-slate-900 shadow-lg mb-4 group-hover:scale-110 transition`}>
        {React.cloneElement(icon, { className: 'w-5 h-5', strokeWidth: 2.5 })}
      </div>
      <div className="text-white font-semibold mb-1">{label}</div>
      <div className="text-xs text-slate-500">{desc}</div>
      <div className="text-xs text-cyan-400 mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
        เปิดใช้งาน <ArrowRight className="w-3 h-3" />
      </div>
    </button>
  );
}

// ================================================================
// 📌 วิธีใช้:
// 1. เปิด App.jsx
// 2. กด Ctrl+F → หา "function BeamCalculator"
// 3. ลบ function BeamCalculator เก่าทั้งหมด (รวมถึง BeamDiagram ถ้ามี)
//    ลบจาก "function BeamCalculator() {" 
//    จนถึง "}" ปิดของ BeamDiagram (ก่อน function ColumnCalculator)
// 4. วางโค้ดทั้งหมดข้างล่างนี้แทน
// 5. Ctrl+S
// ================================================================

function BeamCalculator() {
  const [nSpans, setNspans] = useState(2);
  const [spanLengths, setSpanLengths] = useState([5, 5, 5, 5, 5]);
  const [b, setB] = useState(0.30);
  const [h, setH] = useState(0.60);
  const [fc, setFc] = useState(280);
  const [fy, setFy] = useState(4000);
  const [wL_kg, setWlKg] = useState(300); // kg/m (live load only)
  const [wallLoad_kg, setWallLoadKg] = useState(0); // kg/m (wall load)
  const [otherDL_kg, setOtherDLKg] = useState(0); // kg/m (อื่นๆ เช่น พื้น ฝ้า)
  const [cover, setCover] = useState(0.04);
  const [barDia, setBarDia] = useState(20); // mm

  const updateSpan = (i, val) => {
    const newSpans = [...spanLengths];
    newSpans[i] = val;
    setSpanLengths(newSpans);
  };

  const result = useMemo(() => {
    // ===== Self-weight ของคอนกรีตอัตโนมัติ =====
    // ความหนาแน่นคอนกรีต = 2,400 kg/m³
    const concreteDensity = 2400;
    const selfWeight_kg = b * h * concreteDensity; // kg/m

    // รวม Dead Load ทั้งหมด
    const wD_kg = selfWeight_kg + wallLoad_kg + otherDL_kg;

    // แปลงเป็น kN/m
    const wD = wD_kg / KN_TO_KGF;
    const wL = wL_kg / KN_TO_KGF;
    const wu = 1.2 * wD + 1.6 * wL;

    const L = spanLengths.slice(0, nSpans);
    const nSup = nSpans + 1;
    const M_sup = new Array(nSup).fill(0);

    if (nSpans > 1) {
      const n = nSpans - 1;
      const a = new Array(n).fill(0);
      const bb = new Array(n).fill(0);
      const c = new Array(n).fill(0);
      const d = new Array(n).fill(0);
      for (let i = 0; i < n; i++) {
        const i_sup = i + 1;
        const Lleft = L[i_sup - 1];
        const Lright = L[i_sup];
        a[i] = Lleft;
        bb[i] = 2 * (Lleft + Lright);
        c[i] = Lright;
        d[i] = -(wu / 4) * (Math.pow(Lleft, 3) + Math.pow(Lright, 3));
      }
      for (let i = 1; i < n; i++) {
        const m = a[i] / bb[i - 1];
        bb[i] -= m * c[i - 1];
        d[i] -= m * d[i - 1];
      }
      const x = new Array(n).fill(0);
      x[n - 1] = d[n - 1] / bb[n - 1];
      for (let i = n - 2; i >= 0; i--) {
        x[i] = (d[i] - c[i] * x[i + 1]) / bb[i];
      }
      for (let i = 0; i < n; i++) M_sup[i + 1] = x[i];
    }

    const reactions = new Array(nSup).fill(0);
    for (let i = 0; i < nSpans; i++) {
      const Li = L[i];
      const RL = wu * Li / 2 + (M_sup[i] - M_sup[i + 1]) / Li;
      const RR = wu * Li / 2 + (M_sup[i + 1] - M_sup[i]) / Li;
      reactions[i] += RL;
      reactions[i + 1] += RR;
    }

    const sfd = [];
    const bmd = [];
    let xGlobal = 0;
    let M_max_pos = 0;
    let M_max_neg = 0;
    let V_max = 0;

    const POINTS_PER_SPAN = 30;
    for (let i = 0; i < nSpans; i++) {
      const Li = L[i];
      const VL = wu * Li / 2 + (M_sup[i] - M_sup[i + 1]) / Li;
      for (let k = 0; k <= POINTS_PER_SPAN; k++) {
        const xi = (k / POINTS_PER_SPAN) * Li;
        const V = VL - wu * xi;
        const M = M_sup[i] + VL * xi - wu * xi * xi / 2;
        sfd.push({ x: xGlobal + xi, V });
        bmd.push({ x: xGlobal + xi, M });
        if (M > M_max_pos) M_max_pos = M;
        if (M < M_max_neg) M_max_neg = M;
        if (Math.abs(V) > Math.abs(V_max)) V_max = V;
      }
      xGlobal += Li;
    }

    const totalLength = L.reduce((a, b) => a + b, 0);
    const Mu_design = Math.max(M_max_pos, Math.abs(M_max_neg));
    const Vu_design = Math.abs(V_max);

    // Reinforcement design
    const d_eff = h - cover - 0.012 - barDia / 2 / 1000;
    const fcMPa = fc / 10.2;
    const fyMPa = fy / 10.2;
    const Mn = Mu_design / 0.9;
    const bMm = b * 1000;
    const dMm = d_eff * 1000;
    const term = 2 * (Mn * 1e6) / (0.85 * fcMPa * bMm * dMm * dMm);
    const valid = term <= 1;
    const As = valid ? (0.85 * fcMPa * bMm * dMm / fyMPa) * (1 - Math.sqrt(1 - term)) : null;
    const rhoMin = 1.4 / fyMPa;
    const AsMin = rhoMin * bMm * dMm;
    const AsRequired = As ? Math.max(As, AsMin) : AsMin;
    const barArea = Math.PI * barDia * barDia / 4;
    const nBars = Math.ceil(AsRequired / barArea);
    const AsProvided = nBars * barArea;
    const Vc = 0.17 * Math.sqrt(fcMPa) * bMm * dMm / 1000;
    const phiVc = 0.75 * Vc;
    const utilization = As ? AsRequired / AsProvided : 999;
    const shearUtil = Vu_design / phiVc;

    return {
      selfWeight_kg: selfWeight_kg.toFixed(0),
      wD_kg: wD_kg.toFixed(0),
      reactions_kg: reactions.map(r => (r * KN_TO_KGF).toFixed(0)),
      M_max_pos_kg: (M_max_pos * KN_TO_KGF).toFixed(0),
      M_max_neg_kg: (M_max_neg * KN_TO_KGF).toFixed(0),
      Mu_design_kg: (Mu_design * KN_TO_KGF).toFixed(0),
      Vu_design_kg: (Vu_design * KN_TO_KGF).toFixed(0),
      wu_kg: (wu * KN_TO_KGF).toFixed(0),
      sfd, bmd, totalLength,
      d: (d_eff * 100).toFixed(1),
      AsMin: AsMin.toFixed(0),
      AsRequired: AsRequired.toFixed(0),
      AsProvided: AsProvided.toFixed(0),
      nBars,
      barArea: barArea.toFixed(0),
      Vc_kg: (Vc * KN_TO_KGF).toFixed(0),
      phiVc_kg: (phiVc * KN_TO_KGF).toFixed(0),
      utilization: utilization.toFixed(2),
      shearUtil: shearUtil.toFixed(2),
      pass: valid && utilization <= 1,
    };
  }, [nSpans, spanLengths, b, h, fc, fy, wL_kg, wallLoad_kg, otherDL_kg, cover, barDia]);

  return (
    <div className="p-8 max-w-7xl">
      <div className="flex items-start justify-between mb-6">
        <PageHeader code="2.1" title="คำนวณคาน RC" subtitle="คานต่อเนื่อง · พร้อม SFD · BMD · เหล็กเสริม" />
        <div className="flex items-center gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition">
            💾 บันทึก
          </button>
          <button onClick={() => alert('Export PDF (กำลังพัฒนา)')}
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-900 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/30 transition">
            📄 Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* INPUT */}
        <div className="col-span-5 bg-slate-900/40 border border-slate-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
            <span className="w-1 h-5 bg-cyan-400 rounded"></span>ข้อมูลนำเข้า
          </h3>

          {/* Quick Presets */}
          <div className="mb-4 pb-4 border-b border-slate-800">
            <div className="text-[10px] tracking-widest uppercase text-slate-500 mb-2">Preset (ใช้ค่าตั้งต้น)</div>
            <div className="grid grid-cols-3 gap-1.5">
              <button onClick={() => { setB(0.20); setH(0.40); setSpanLengths([4, 4, 4, 4, 4]); setNspans(1); setBarDia(16); setWlKg(200); setOtherDLKg(150); }}
                className="bg-slate-800/40 hover:bg-cyan-500/10 hover:border-cyan-500/40 border border-slate-700 rounded px-2 py-1.5 text-[10px] text-slate-300 transition">
                🏠 บ้าน 1 ชั้น
              </button>
              <button onClick={() => { setB(0.25); setH(0.50); setSpanLengths([5, 5, 5, 5, 5]); setNspans(2); setBarDia(20); setWlKg(300); setOtherDLKg(200); }}
                className="bg-slate-800/40 hover:bg-cyan-500/10 hover:border-cyan-500/40 border border-slate-700 rounded px-2 py-1.5 text-[10px] text-slate-300 transition">
                🏠 บ้าน 2 ชั้น
              </button>
              <button onClick={() => { setB(0.30); setH(0.60); setSpanLengths([6, 6, 6, 6, 6]); setNspans(3); setBarDia(25); setWlKg(400); setOtherDLKg(250); }}
                className="bg-slate-800/40 hover:bg-cyan-500/10 hover:border-cyan-500/40 border border-slate-700 rounded px-2 py-1.5 text-[10px] text-slate-300 transition">
                🏢 อาคาร 3 ชั้น
              </button>
            </div>
          </div>

          <div className="space-y-5">
            <InputGroup title="ชนิดคาน">
              <div>
                <label className="text-xs text-slate-400 mb-2 block">จำนวนช่วง</label>
                <div className="grid grid-cols-5 gap-1">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button key={n} onClick={() => setNspans(n)}
                      className={`py-2 rounded text-sm font-bold transition border ${
                        nSpans === n
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                          : 'bg-slate-800/40 text-slate-400 border-slate-700 hover:border-slate-600'
                      }`}>{n}</button>
                  ))}
                </div>
                <div className="text-[10px] text-slate-500 mt-2">
                  {nSpans === 1 ? 'Simply Supported' : `Continuous · ${nSpans} ช่วง · ${nSpans + 1} จุดรองรับ`}
                </div>
              </div>
              <div className="space-y-2 pt-2">
                {Array.from({ length: nSpans }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between gap-3">
                    <label className="text-sm text-slate-300 flex-1">L<sub>{i + 1}</sub></label>
                    <div className="flex items-center gap-2">
                      <input type="number" value={spanLengths[i]} step={0.5}
                        onChange={e => updateSpan(i, parseFloat(e.target.value) || 0)}
                        className="w-24 bg-slate-800/60 border border-slate-700 rounded px-2 py-1.5 text-right text-sm font-mono text-cyan-300 focus:outline-none focus:border-cyan-500/50"
                      />
                      <span className="text-xs text-slate-500 w-12">ม.</span>
                    </div>
                  </div>
                ))}
              </div>
            </InputGroup>

            <InputGroup title="ขนาดหน้าตัด">
              <NumInput label="ความกว้าง b" value={b} onChange={setB} unit="ม." step={0.05} />
              <NumInput label="ความลึก h" value={h} onChange={setH} unit="ม." step={0.05} />
              <NumInput label="ระยะหุ้ม cover" value={cover} onChange={setCover} unit="ม." step={0.01} />
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded p-2 text-xs">
                <span className="text-emerald-400">⚙ คิดน้ำหนักคอนกรีตอัตโนมัติ:</span>
                <span className="text-white font-mono ml-2 font-bold">{result.selfWeight_kg} kg/m</span>
                <div className="text-slate-500 text-[10px] mt-1">{b} × {h} × 2,400 kg/m³</div>
              </div>
            </InputGroup>

            <InputGroup title="คุณสมบัติวัสดุ">
              <NumInput label="กำลังคอนกรีต fc′" value={fc} onChange={setFc} unit="ksc" step={20} />
              <NumInput label="กำลังเหล็ก fy" value={fy} onChange={setFy} unit="ksc" step={500} />
              <NumInput label="ขนาดเหล็กหลัก" value={barDia} onChange={setBarDia} unit="mm" step={4} />
            </InputGroup>

            <InputGroup title="น้ำหนักบรรทุก (เพิ่มเติม)">
              <NumInput label="น้ำหนักกำแพง" value={wallLoad_kg} onChange={setWallLoadKg} unit="kg/m" step={100} />
              <NumInput label="พื้น/ฝ้า/อื่นๆ (DL)" value={otherDL_kg} onChange={setOtherDLKg} unit="kg/m" step={100} />
              <NumInput label="น้ำหนักจร wL" value={wL_kg} onChange={setWlKg} unit="kg/m" step={100} />
              <div className="bg-slate-800/40 rounded p-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>DL รวม (Self + Wall + อื่นๆ):</span>
                  <span className="font-mono font-bold text-cyan-300">{result.wD_kg} kg/m</span>
                </div>
                <div className="flex justify-between text-slate-500 mt-1">
                  <span>wu (1.2D + 1.6L):</span>
                  <span className="font-mono">{result.wu_kg} kg/m</span>
                </div>
              </div>
            </InputGroup>
          </div>
        </div>

        {/* RESULT */}
        <div className="col-span-7 space-y-5">
          {/* Hero Result */}
          <div className={`relative overflow-hidden border rounded-xl p-6 ${result.pass ? 'bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 border-emerald-500/40' : 'bg-gradient-to-br from-rose-500/15 to-rose-500/5 border-rose-500/40'}`}>
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              {result.pass ? <CheckCircle2 className="w-full h-full text-emerald-400" /> : <AlertTriangle className="w-full h-full text-rose-400" />}
            </div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                {result.pass ? <CheckCircle2 className="w-7 h-7 text-emerald-400" /> : <AlertTriangle className="w-7 h-7 text-rose-400" />}
                <div className={`text-2xl font-bold ${result.pass ? 'text-emerald-300' : 'text-rose-300'}`}>
                  {result.pass ? 'ผ่านการตรวจสอบ' : 'ไม่ผ่าน — ต้องปรับแบบ'}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <div className="text-[10px] tracking-widest uppercase text-slate-500 mb-1">ชนิดคาน</div>
                  <div className="text-sm font-semibold text-white">
                    {nSpans === 1 ? 'Simply Supported' : `Continuous`}
                  </div>
                  <div className="text-xs text-slate-400">{nSpans} ช่วง · {nSpans + 1} จุดรองรับ</div>
                </div>
                <div>
                  <div className="text-[10px] tracking-widest uppercase text-slate-500 mb-1">หน้าตัด</div>
                  <div className="text-sm font-semibold text-white">{(b*100).toFixed(0)} × {(h*100).toFixed(0)} cm</div>
                  <div className="text-xs text-slate-400">fc′ {fc} · fy {fy}</div>
                </div>
                <div>
                  <div className="text-[10px] tracking-widest uppercase text-slate-500 mb-1">Utilization</div>
                  <div className={`text-3xl font-bold font-mono ${result.pass ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {result.utilization}
                  </div>
                  <div className="text-xs text-slate-400">{(result.utilization * 100).toFixed(0)}% ของกำลัง</div>
                </div>
              </div>
            </div>
          </div>

          {/* CROSS SECTION + DIAGRAM */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-cyan-400 rounded"></span>รูปตัดคาน (Cross Section)
            </h3>
            <BeamCrossSection b={b} h={h} cover={cover} nBars={result.nBars} barDia={barDia} />
          </div>

          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-cyan-400 rounded"></span>ไดอะแกรม · SFD · BMD
            </h3>
            <BeamDiagram
              spans={spanLengths.slice(0, nSpans)}
              wu_kg={parseFloat(result.wu_kg)}
              reactions={result.reactions_kg}
              sfd={result.sfd} bmd={result.bmd}
              totalLength={result.totalLength}
            />
          </div>

          {/* Forces */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-amber-400 rounded"></span>แรงและโมเมนต์ออกแบบ
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <ResultBox label="wu" value={result.wu_kg} unit="kg/m" />
              <ResultBox label="Mu max (+)" value={result.M_max_pos_kg} unit="kg·m" highlight />
              <ResultBox label="Mu max (−)" value={result.M_max_neg_kg} unit="kg·m" />
              <ResultBox label="Vu max" value={result.Vu_design_kg} unit="kg" />
              <ResultBox label="Mu ออกแบบ" value={result.Mu_design_kg} unit="kg·m" highlight />
              <ResultBox label="ความยาวรวม" value={result.totalLength.toFixed(1)} unit="ม." small />
            </div>
            <div className="bg-slate-800/40 rounded-lg p-3">
              <div className="text-[10px] tracking-widest uppercase text-slate-500 mb-2">แรงปฏิกิริยา</div>
              <div className="flex flex-wrap gap-3">
                {result.reactions_kg.map((r, i) => (
                  <div key={i} className="text-sm">
                    <span className="text-slate-400">R<sub>{i + 1}</sub> = </span>
                    <span className="font-mono font-bold text-cyan-300">{r}</span>
                    <span className="text-slate-500 text-xs ml-1">kg</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reinforcement */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-cyan-400 rounded"></span>เหล็กเสริม
            </h3>
            <div className="grid grid-cols-4 gap-3 mb-4">
              <ResultBox label="d" value={result.d} unit="ซม." small />
              <ResultBox label="As required" value={result.AsRequired} unit="mm²" small highlight />
              <ResultBox label="As min" value={result.AsMin} unit="mm²" small />
              <ResultBox label="As provided" value={result.AsProvided} unit="mm²" small />
            </div>
            <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border-2 border-cyan-500/40 rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                <Layers className="w-full h-full text-cyan-400" />
              </div>
              <div className="relative">
                <div className="text-xs text-cyan-400 tracking-widest uppercase mb-2 font-semibold">⭐ เหล็กเสริมแนะนำ</div>
                <div className="text-4xl font-bold text-white mb-1">
                  {result.nBars}<span className="text-2xl text-cyan-300 mx-1">-</span>DB{barDia}
                </div>
                <div className="text-sm text-cyan-200 font-mono mb-3">
                  ขนาดเหล็ก Ø{barDia} มม. · จำนวน {result.nBars} เส้น
                </div>
                <div className="bg-slate-900/40 rounded p-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>As provided:</span>
                    <span className="font-mono text-cyan-300 font-bold">{result.AsProvided} mm²</span>
                  </div>
                  <div className="flex justify-between text-slate-400 mt-1">
                    <span>As required:</span>
                    <span className="font-mono">{result.AsRequired} mm²</span>
                  </div>
                  <div className="flex justify-between text-slate-400 mt-1">
                    <span>คำนวณ:</span>
                    <span className="font-mono text-[10px]">{result.nBars} × {result.barArea} mm²</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shear */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-rose-400 rounded"></span>เหล็กปลอก (Stirrups)
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-3">
              <ResultBox label="Vc" value={result.Vc_kg} unit="kg" small />
              <ResultBox label="φVc" value={result.phiVc_kg} unit="kg" small />
              <ResultBox label="Vu/φVc" value={result.shearUtil} small valueColor={parseFloat(result.shearUtil) > 1 ? 'text-rose-400' : 'text-emerald-400'} />
            </div>
            <div className="text-sm text-slate-300">
              {parseFloat(result.shearUtil) > 0.5
                ? <>ใช้ <span className="font-bold text-amber-300">RB9 @ 0.15 ม.</span></>
                : <span className="text-emerald-400">ขั้นต่ำ RB9 @ 0.20 ม.</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   BeamCrossSection — รูปตัดคาน
   ================================================================ */
function BeamCrossSection({ b, h, cover, nBars, barDia }) {
  const SVG_W = 480;
  const SVG_H = 360;

  // คำนวณ scale
  const maxDim = Math.max(b, h);
  const drawSize = 220; // px
  const scale = drawSize / maxDim;
  const beamW = b * scale;
  const beamH = h * scale;

  const cx = SVG_W / 2;
  const cy = SVG_H / 2 + 10;

  const x1 = cx - beamW / 2;
  const y1 = cy - beamH / 2;
  const x2 = cx + beamW / 2;
  const y2 = cy + beamH / 2;

  // ตำแหน่งเหล็ก (ใส่ในแถวล่าง)
  const coverPx = cover * scale;
  const stirrupDia = 9; // ปลอก RB9 = 9mm
  const stirrupPx = (stirrupDia / 1000) * scale;
  const barRadius = (barDia / 1000) * scale / 2;

  // เหล็กล่าง
  const innerLeft = x1 + coverPx + stirrupPx + barRadius;
  const innerRight = x2 - coverPx - stirrupPx - barRadius;
  const barY_bottom = y2 - coverPx - stirrupPx - barRadius;
  const barY_top = y1 + coverPx + stirrupPx + barRadius;

  // จัดเหล็กในแถวล่าง (ถ้ามาก แบ่ง 2 แถว)
  const maxPerRow = Math.floor((innerRight - innerLeft) / (barDia / 1000 * scale * 2.5)) + 1;
  const barsRow1 = Math.min(nBars, maxPerRow);
  const barsRow2 = Math.max(0, nBars - maxPerRow);

  const getBarsX = (count, leftX, rightX) => {
    if (count === 1) return [(leftX + rightX) / 2];
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(leftX + (i / (count - 1)) * (rightX - leftX));
    }
    return arr;
  };

  const row1X = getBarsX(barsRow1, innerLeft, innerRight);
  const row2X = barsRow2 > 0 ? getBarsX(barsRow2, innerLeft, innerRight) : [];
  const barY_row2 = barY_bottom - barDia / 1000 * scale * 1.5;

  // เหล็กบน 2 เส้น (ป้องกันเหล็กปลอก)
  const topBars = getBarsX(2, innerLeft, innerRight);

  return (
    <div className="flex justify-center">
      <svg width={SVG_W} height={SVG_H} viewBox={`0 0 ${SVG_W} ${SVG_H}`}>
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(34, 211, 238, 0.05)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width={SVG_W} height={SVG_H} fill="url(#grid)" />

        {/* Concrete section */}
        <rect x={x1} y={y1} width={beamW} height={beamH}
          fill="rgba(148, 163, 184, 0.15)"
          stroke="#94a3b8"
          strokeWidth="2"
        />

        {/* Concrete hatching */}
        <defs>
          <pattern id="concrete" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(148,163,184,0.2)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect x={x1} y={y1} width={beamW} height={beamH} fill="url(#concrete)" />

        {/* Stirrup (เหล็กปลอก) */}
        <rect
          x={x1 + coverPx}
          y={y1 + coverPx}
          width={beamW - 2 * coverPx}
          height={beamH - 2 * coverPx}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeDasharray="3 2"
        />

        {/* Top bars (2 เส้น) */}
        {topBars.map((x, i) => (
          <g key={`top-${i}`}>
            <circle cx={x} cy={barY_top} r={barRadius} fill="#06b6d4" stroke="#fff" strokeWidth="1.5" />
          </g>
        ))}

        {/* Bottom bars - row 1 */}
        {row1X.map((x, i) => (
          <g key={`bot1-${i}`}>
            <circle cx={x} cy={barY_bottom} r={barRadius} fill="#22d3ee" stroke="#fff" strokeWidth="1.5" />
          </g>
        ))}

        {/* Bottom bars - row 2 */}
        {row2X.map((x, i) => (
          <g key={`bot2-${i}`}>
            <circle cx={x} cy={barY_row2} r={barRadius} fill="#22d3ee" stroke="#fff" strokeWidth="1.5" />
          </g>
        ))}

        {/* Dimension lines - width (b) */}
        <g>
          <line x1={x1} y1={y2 + 30} x2={x2} y2={y2 + 30} stroke="#64748b" strokeWidth="1" />
          <line x1={x1} y1={y2 + 25} x2={x1} y2={y2 + 35} stroke="#64748b" strokeWidth="1" />
          <line x1={x2} y1={y2 + 25} x2={x2} y2={y2 + 35} stroke="#64748b" strokeWidth="1" />
          <text x={cx} y={y2 + 50} fill="#22d3ee" fontSize="13" textAnchor="middle" fontWeight="bold">
            b = {(b * 100).toFixed(0)} ซม.
          </text>
        </g>

        {/* Dimension lines - height (h) */}
        <g>
          <line x1={x2 + 30} y1={y1} x2={x2 + 30} y2={y2} stroke="#64748b" strokeWidth="1" />
          <line x1={x2 + 25} y1={y1} x2={x2 + 35} y2={y1} stroke="#64748b" strokeWidth="1" />
          <line x1={x2 + 25} y1={y2} x2={x2 + 35} y2={y2} stroke="#64748b" strokeWidth="1" />
          <text x={x2 + 45} y={cy + 4} fill="#22d3ee" fontSize="13" fontWeight="bold">
            h = {(h * 100).toFixed(0)} ซม.
          </text>
        </g>

        {/* Cover label */}
        <g>
          <line x1={x1 - 20} y1={y2} x2={x1 + coverPx} y2={y2 - coverPx}
            stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="2 2"
          />
          <text x={x1 - 25} y={y2 + 5} fill="#94a3b8" fontSize="10" textAnchor="end">
            cover {(cover * 100).toFixed(0)} ซม.
          </text>
        </g>

        {/* Title */}
        <text x={cx} y={30} fill="#22d3ee" fontSize="14" fontWeight="bold" textAnchor="middle">
          รูปตัด {(b * 100).toFixed(0)} × {(h * 100).toFixed(0)} ซม.
        </text>

        {/* Legend */}
        <g transform={`translate(20, ${SVG_H - 80})`}>
          <circle cx="8" cy="8" r="5" fill="#22d3ee" stroke="#fff" strokeWidth="1" />
          <text x="20" y="12" fill="#cbd5e1" fontSize="11">{nBars} - DB{barDia} (เหล็กล่าง)</text>

          <circle cx="8" cy="28" r="5" fill="#06b6d4" stroke="#fff" strokeWidth="1" />
          <text x="20" y="32" fill="#cbd5e1" fontSize="11">2 - DB{barDia} (เหล็กบน)</text>

          <line x1="3" y1="48" x2="13" y2="48" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2" />
          <text x="20" y="52" fill="#cbd5e1" fontSize="11">RB9 (เหล็กปลอก)</text>
        </g>
      </svg>
    </div>
  );
}

/* ================================================================
   BeamDiagram — คาน + SFD + BMD
   ================================================================ */
function BeamDiagram({ spans, wu_kg, reactions, sfd, bmd, totalLength }) {
  const W = 700;
  const beamH_section = 80;
  const sfdH_section = 100;
  const bmdH_section = 100;
  const PAD_LEFT = 40;
  const PAD_RIGHT = 40;
  const innerW = W - PAD_LEFT - PAD_RIGHT;

  const xScale = (xMeter) => PAD_LEFT + (xMeter / totalLength) * innerW;
  const maxV = Math.max(...sfd.map(p => Math.abs(p.V))) * KN_TO_KGF || 1;
  const maxM = Math.max(...bmd.map(p => Math.abs(p.M))) * KN_TO_KGF || 1;

  const sfdY0 = beamH_section + 30;
  const sfdYscale = (V_kg) => sfdY0 + (sfdH_section / 2) - (V_kg / maxV) * (sfdH_section / 2 - 5);

  const bmdY0 = beamH_section + 30 + sfdH_section + 40;
  const bmdYscale = (M_kg) => bmdY0 + (bmdH_section / 2) + (M_kg / maxM) * (bmdH_section / 2 - 5);

  const totalH = beamH_section + 30 + sfdH_section + 40 + bmdH_section + 30;

  let cumLen = 0;
  const supportPositions = [0];
  for (const s of spans) {
    cumLen += s;
    supportPositions.push(cumLen);
  }

  return (
    <div className="overflow-x-auto">
      <svg width="100%" height={totalH} viewBox={`0 0 ${W} ${totalH}`} className="min-w-[600px]">
        <g>
          {Array.from({ length: 15 }).map((_, i) => {
            const x = PAD_LEFT + (i / 14) * innerW;
            return (
              <g key={i}>
                <line x1={x} y1={5} x2={x} y2={25} stroke="#f43f5e" strokeWidth="1.2" />
                <path d={`M ${x - 3} ${22} L ${x} ${28} L ${x + 3} ${22}`} stroke="#f43f5e" strokeWidth="1.2" fill="none" />
              </g>
            );
          })}
          <text x={W / 2} y={15} fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">
            wu = {wu_kg.toLocaleString()} kg/m
          </text>
        </g>
        <rect x={PAD_LEFT} y={30} width={innerW} height={20} fill="rgba(34, 211, 238, 0.2)" stroke="#22d3ee" strokeWidth="2" />
        {supportPositions.map((pos, i) => {
          const x = xScale(pos);
          return (
            <g key={i}>
              <path d={`M ${x} 50 L ${x - 8} 65 L ${x + 8} 65 Z`} fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
              <line x1={x - 12} y1={68} x2={x + 12} y2={68} stroke="#64748b" strokeWidth="1.5" />
              {[-9, -5, -1, 3, 7].map((dx, j) => (
                <line key={j} x1={x + dx} y1={68} x2={x + dx + 4} y2={74} stroke="#64748b" strokeWidth="1" />
              ))}
              <text x={x} y={88} fill="#94a3b8" fontSize="10" textAnchor="middle">R{i + 1}</text>
              <text x={x} y={100} fill="#22d3ee" fontSize="10" textAnchor="middle" fontWeight="bold">
                {parseFloat(reactions[i]).toLocaleString()} kg
              </text>
            </g>
          );
        })}
        {spans.map((s, i) => {
          const xMid = xScale((supportPositions[i] + supportPositions[i + 1]) / 2);
          return (
            <text key={i} x={xMid} y={45} fill="#64748b" fontSize="10" textAnchor="middle" fontWeight="bold">
              L{i + 1} = {s} ม.
            </text>
          );
        })}

        <text x={5} y={sfdY0 - 5} fill="#22d3ee" fontSize="11" fontWeight="bold">SFD</text>
        <line x1={PAD_LEFT} y1={sfdY0 + sfdH_section / 2} x2={W - PAD_RIGHT} y2={sfdY0 + sfdH_section / 2} stroke="#475569" strokeWidth="1" />
        <path
          d={`M ${xScale(0)} ${sfdY0 + sfdH_section / 2} ` +
             sfd.map(p => `L ${xScale(p.x)} ${sfdYscale(p.V * KN_TO_KGF)}`).join(' ') +
             ` L ${xScale(totalLength)} ${sfdY0 + sfdH_section / 2} Z`}
          fill="rgba(34, 211, 238, 0.15)" stroke="#22d3ee" strokeWidth="1.5"
        />
        {supportPositions.map((pos, i) => (
          <line key={i} x1={xScale(pos)} y1={sfdY0} x2={xScale(pos)} y2={sfdY0 + sfdH_section} stroke="rgba(148,163,184,0.2)" strokeDasharray="2 2" />
        ))}
        <text x={W - PAD_RIGHT + 5} y={sfdY0 + sfdH_section / 2 + 4} fill="#64748b" fontSize="9">0</text>
        <text x={W - PAD_RIGHT + 5} y={sfdY0 + 8} fill="#22d3ee" fontSize="9">+{maxV.toFixed(0)}</text>
        <text x={W - PAD_RIGHT + 5} y={sfdY0 + sfdH_section} fill="#22d3ee" fontSize="9">−{maxV.toFixed(0)}</text>
        <text x={PAD_LEFT - 5} y={sfdY0 + sfdH_section / 2 - 8} fill="#94a3b8" fontSize="9" textAnchor="end">V (kg)</text>

        <text x={5} y={bmdY0 - 5} fill="#f59e0b" fontSize="11" fontWeight="bold">BMD</text>
        <line x1={PAD_LEFT} y1={bmdY0 + bmdH_section / 2} x2={W - PAD_RIGHT} y2={bmdY0 + bmdH_section / 2} stroke="#475569" strokeWidth="1" />
        <path
          d={`M ${xScale(0)} ${bmdY0 + bmdH_section / 2} ` +
             bmd.map(p => `L ${xScale(p.x)} ${bmdYscale(p.M * KN_TO_KGF)}`).join(' ') +
             ` L ${xScale(totalLength)} ${bmdY0 + bmdH_section / 2} Z`}
          fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="1.5"
        />
        {supportPositions.map((pos, i) => (
          <line key={i} x1={xScale(pos)} y1={bmdY0} x2={xScale(pos)} y2={bmdY0 + bmdH_section} stroke="rgba(148,163,184,0.2)" strokeDasharray="2 2" />
        ))}
        <text x={W - PAD_RIGHT + 5} y={bmdY0 + bmdH_section / 2 + 4} fill="#64748b" fontSize="9">0</text>
        <text x={W - PAD_RIGHT + 5} y={bmdY0 + bmdH_section + 4} fill="#f59e0b" fontSize="9">+{maxM.toFixed(0)}</text>
        <text x={W - PAD_RIGHT + 5} y={bmdY0 + 8} fill="#f59e0b" fontSize="9">−{maxM.toFixed(0)}</text>
        <text x={PAD_LEFT - 5} y={bmdY0 + bmdH_section / 2 - 8} fill="#94a3b8" fontSize="9" textAnchor="end">M (kg·m)</text>
      </svg>

      <div className="flex gap-4 mt-3 text-xs text-slate-400 flex-wrap">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-cyan-500/30 border border-cyan-500"></span>
          <span>SFD = Shear Force Diagram</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500"></span>
          <span>BMD = Bending Moment Diagram</span>
        </div>
      </div>
    </div>
  );
}


/* ================== COLUMN CALCULATOR RC (TH UNITS) ================== */
/* คำนวณเสา RC พร้อม Biaxial Bending (P-Mx-My) + P-M Diagram + Cross-section */

function ColumnCalculator() {
  // ===== Inputs =====
  const [b, setB] = useState(0.40);          // ความกว้าง ม.
  const [h, setH] = useState(0.40);          // ความลึก ม.
  const [cover, setCover] = useState(0.04);  // ระยะหุ้ม ม.
  const [fc, setFc] = useState(280);         // กำลังคอนกรีต ksc
  const [fy, setFy] = useState(4000);        // กำลังเหล็ก ksc
  const [barDia, setBarDia] = useState(20);  // ขนาดเหล็กยืน mm
  const [nBarsX, setNbarsX] = useState(3);   // จำนวนเหล็กแนว b
  const [nBarsY, setNbarsY] = useState(3);   // จำนวนเหล็กแนว h
  const [stirrupDia, setStirrupDia] = useState(10); // ปลอก mm
  
  // ===== Loads (kg, kg·m) =====
  const [Pu_kg, setPuKg] = useState(80000);  // แรงอัดประลัย (kg)
  const [Mux_kg, setMuxKg] = useState(8000); // โมเมนต์รอบแกน X (kg·m)
  const [Muy_kg, setMuyKg] = useState(5000); // โมเมนต์รอบแกน Y (kg·m)

  const result = useMemo(() => {
    // จำนวนเหล็กรวม (รอบขอบ ไม่นับซ้ำ)
    const totalBars = 2 * nBarsX + 2 * nBarsY - 4;
    // พื้นที่เหล็ก
    const barArea_mm2 = Math.PI * Math.pow(barDia, 2) / 4;
    const Ast_mm2 = totalBars * barArea_mm2;
    
    // พื้นที่หน้าตัด (mm²)
    const Ag_mm2 = b * 1000 * h * 1000;
    
    // % เหล็กยืน
    const rho = (Ast_mm2 / Ag_mm2) * 100;
    
    // ตรวจ % เหล็ก: 1% ≤ ρ ≤ 8% (ACI), ไทยใช้ 1-4% สำหรับเสา
    const rhoOK = rho >= 1.0 && rho <= 8.0;
    
    // ===== Pure Axial Capacity (Po) =====
    // Po = 0.85·fc·(Ag - Ast) + fy·Ast  [kg]
    // fc, fy หน่วย ksc → คูณ Ag(cm²) ได้หน่วย kg
    const Ag_cm2 = b * 100 * h * 100;
    const Ast_cm2 = Ast_mm2 / 100;
    const Po_kg = 0.85 * fc * (Ag_cm2 - Ast_cm2) + fy * Ast_cm2;
    
    // φPn,max (compression-controlled tied column): φ=0.65, factor=0.80
    const phiPn_max_kg = 0.65 * 0.80 * Po_kg;
    
    // ===== Pure Moment Capacity (Mo) ประมาณ =====
    // ใช้สูตรอย่างง่าย: Mo ≈ As·fy·d·(1 - 0.59·ρ·fy/fc)
    // เหล็กดึงใช้ครึ่งหนึ่งของ Ast
    const d_mm = h * 1000 - cover * 1000 - stirrupDia - barDia / 2;
    const As_tens_mm2 = Ast_mm2 / 2;
    const fy_MPa = fy * 0.0980665;
    const fc_MPa = fc * 0.0980665;
    const a_mm = (As_tens_mm2 * fy_MPa) / (0.85 * fc_MPa * b * 1000);
    const Mn_Nmm = As_tens_mm2 * fy_MPa * (d_mm - a_mm / 2);
    const Mn_kgm = Mn_Nmm / 9806.65;
    const phiMn_kgm = 0.90 * Mn_kgm;
    
    // ===== Balanced Point (จุดสมดุล) =====
    // cb = 600·d / (600 + fy_ksc) [วิธีง่าย ksc]
    const cb_mm = (600 * d_mm) / (600 + fy / 10);
    const ab_mm = 0.85 * cb_mm;
    // Pb (kg)
    const Cc_kg = 0.85 * fc * (ab_mm / 10) * (b * 100); // ksc·cm² = kg
    const Pb_kg = Cc_kg; // ประมาณ (ละเลยเหล็ก compression)
    const phiPb_kg = 0.65 * Pb_kg;
    // Mb ประมาณ
    const Mb_kgm = Pb_kg * (h / 2 - ab_mm / 2000);
    const phiMb_kgm = 0.65 * Mb_kgm;
    
    // ===== ตรวจ Biaxial: Bresler Reciprocal Method =====
    // 1/Pn ≈ 1/Pnx + 1/Pny - 1/Po
    // หา φPnx (เสาที่ Mux เท่านั้น) และ φPny
    // ประมาณการง่ายๆ: linear interpolation
    const phiPo_kg = 0.65 * Po_kg;
    
    // คำนวณ φPn ที่ Mu แต่ละแกน (ใช้ linear ระหว่าง balanced กับ Po)
    const calc_phiPn_at_M = (Mu_kgm) => {
      if (Mu_kgm <= 0) return phiPo_kg;
      if (Mu_kgm >= phiMn_kgm) return 0; // เกิน pure bending
      if (Mu_kgm <= phiMb_kgm) {
        // จาก Po → Pb (compression-controlled): linear
        const ratio = Mu_kgm / phiMb_kgm;
        return phiPo_kg - ratio * (phiPo_kg - phiPb_kg);
      } else {
        // จาก Pb → 0 (tension-controlled): linear
        const ratio = (Mu_kgm - phiMb_kgm) / (phiMn_kgm - phiMb_kgm);
        return phiPb_kg * (1 - ratio);
      }
    };
    
    const phiPnx_kg = calc_phiPn_at_M(Mux_kg);
    const phiPny_kg = calc_phiPn_at_M(Muy_kg);
    
    // Bresler: 1/Pn = 1/Pnx + 1/Pny - 1/Po
    let phiPn_bresler_kg = 0;
    if (phiPnx_kg > 0 && phiPny_kg > 0) {
      phiPn_bresler_kg = 1 / (1 / phiPnx_kg + 1 / phiPny_kg - 1 / phiPo_kg);
    }
    
    // Utilization
    const utilization = phiPn_bresler_kg > 0 ? Pu_kg / phiPn_bresler_kg : 999;
    const pass = rhoOK && utilization <= 1.0 && phiPn_bresler_kg > 0;
    
    // ===== สร้างจุด P-M Diagram (สำหรับ plot) =====
    const pmCurve = [];
    // จาก Po ลงมา balanced point แล้วลงมา 0
    const nPts = 30;
    for (let i = 0; i <= nPts; i++) {
      const t = i / nPts;
      const M = t * phiMn_kgm;
      const P = calc_phiPn_at_M(M);
      pmCurve.push({ M, P });
    }
    
    return {
      totalBars,
      Ast_mm2: Ast_mm2.toFixed(0),
      rho: rho.toFixed(2),
      rhoOK,
      Po_kg: Po_kg.toFixed(0),
      phiPn_max_kg: phiPn_max_kg.toFixed(0),
      phiMn_kgm: phiMn_kgm.toFixed(0),
      phiPb_kg: phiPb_kg.toFixed(0),
      phiMb_kgm: phiMb_kgm.toFixed(0),
      phiPnx_kg: phiPnx_kg.toFixed(0),
      phiPny_kg: phiPny_kg.toFixed(0),
      phiPn_bresler_kg: phiPn_bresler_kg.toFixed(0),
      utilization: utilization.toFixed(3),
      pass,
      pmCurve,
    };
  }, [b, h, cover, fc, fy, barDia, nBarsX, nBarsY, stirrupDia, Pu_kg, Mux_kg, Muy_kg]);

  return (
    <div className="p-8 max-w-7xl">
      <PageHeader code="2.2" title="คำนวณเสา RC (Biaxial Bending)" subtitle="P-Mx-My · Bresler Reciprocal · พร้อม P-M Diagram และ Cross-section" />

      <div className="grid grid-cols-12 gap-6">
        {/* INPUT */}
        <div className="col-span-5 bg-slate-900/40 border border-slate-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
            <span className="w-1 h-5 bg-amber-400 rounded"></span>ข้อมูลนำเข้า
          </h3>

          <div className="space-y-5">
            <InputGroup title="ขนาดหน้าตัด">
              <NumInput label="ความกว้าง b" value={b} onChange={setB} unit="ม." step={0.05} />
              <NumInput label="ความลึก h" value={h} onChange={setH} unit="ม." step={0.05} />
              <NumInput label="ระยะหุ้ม cover" value={cover} onChange={setCover} unit="ม." step={0.01} />
            </InputGroup>

            <InputGroup title="คุณสมบัติวัสดุ">
              <NumInput label="กำลังคอนกรีต fc′" value={fc} onChange={setFc} unit="ksc" step={20} />
              <NumInput label="กำลังเหล็ก fy" value={fy} onChange={setFy} unit="ksc" step={500} />
            </InputGroup>

            <InputGroup title="เหล็กเสริม">
              <NumInput label="ขนาดเหล็กยืน DB" value={barDia} onChange={setBarDia} unit="mm" step={4} />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">เหล็กแนว b</label>
                  <input type="number" value={nBarsX} min={2} max={10}
                    onChange={e => setNbarsX(Math.max(2, parseInt(e.target.value) || 2))}
                    className="w-full bg-slate-800/60 border border-slate-700 rounded px-2 py-1.5 text-right text-sm font-mono text-amber-300 focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">เหล็กแนว h</label>
                  <input type="number" value={nBarsY} min={2} max={10}
                    onChange={e => setNbarsY(Math.max(2, parseInt(e.target.value) || 2))}
                    className="w-full bg-slate-800/60 border border-slate-700 rounded px-2 py-1.5 text-right text-sm font-mono text-amber-300 focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>
              <NumInput label="ปลอก stirrup" value={stirrupDia} onChange={setStirrupDia} unit="mm" step={1} />
              <div className="bg-amber-500/10 border border-amber-500/30 rounded p-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-amber-400">เหล็กรวม:</span>
                  <span className="text-white font-mono font-bold">{result.totalBars} - DB{barDia}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-slate-400">ρ (เหล็กยืน):</span>
                  <span className={`font-mono font-bold ${result.rhoOK ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {result.rho}% {result.rhoOK ? '✓' : '✗'}
                  </span>
                </div>
                <div className="text-slate-500 text-[10px] mt-1">มาตรฐาน: 1% ≤ ρ ≤ 8%</div>
              </div>
            </InputGroup>

            <InputGroup title="แรงกระทำ (Factored)">
              <NumInput label="แรงอัด Pu" value={Pu_kg} onChange={setPuKg} unit="kg" step={1000} />
              <NumInput label="โมเมนต์ Mux (รอบ X)" value={Mux_kg} onChange={setMuxKg} unit="kg·m" step={500} />
              <NumInput label="โมเมนต์ Muy (รอบ Y)" value={Muy_kg} onChange={setMuyKg} unit="kg·m" step={500} />
            </InputGroup>
          </div>
        </div>

        {/* RESULTS */}
        <div className="col-span-7 space-y-4">
          {/* Status Card */}
          <div className={`border rounded-xl p-5 ${result.pass ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'}`}>
            <div className="flex items-center gap-4">
              {result.pass ? <CheckCircle2 className="w-10 h-10 text-emerald-400" /> : <AlertTriangle className="w-10 h-10 text-rose-400" />}
              <div className="flex-1">
                <div className={`text-xl font-bold ${result.pass ? 'text-emerald-300' : 'text-rose-300'}`}>
                  {result.pass ? '✓ ผ่านการตรวจสอบ' : '✗ ไม่ผ่าน'}
                </div>
                <div className="text-sm text-slate-400 mt-0.5">
                  เสา RC · Biaxial Bending · Bresler Method
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400 mb-1">Utilization</div>
                <div className={`text-5xl font-bold font-mono ${result.pass ? 'text-emerald-400' : 'text-rose-400'}`}>{result.utilization}</div>
              </div>
            </div>
          </div>

          {/* Cross-section + P-M Diagram */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
              <h4 className="text-white font-semibold mb-3 text-sm flex items-center gap-2">
                <span className="w-1 h-4 bg-amber-400 rounded"></span>หน้าตัดเสา
              </h4>
              <ColumnCrossSection b={b} h={h} cover={cover} nBarsX={nBarsX} nBarsY={nBarsY} barDia={barDia} stirrupDia={stirrupDia} />
            </div>
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
              <h4 className="text-white font-semibold mb-3 text-sm flex items-center gap-2">
                <span className="w-1 h-4 bg-cyan-400 rounded"></span>P-M Interaction
              </h4>
              <PMDiagram pmCurve={result.pmCurve} Pu={Pu_kg} Mu={Math.max(Mux_kg, Muy_kg)} />
            </div>
          </div>

          {/* Capacity Details */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
            <h4 className="text-white font-semibold mb-3 text-sm flex items-center gap-2">
              <span className="w-1 h-4 bg-emerald-400 rounded"></span>ความสามารถรับแรง
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <ResultBox label="φPn,max (Pure Axial)" value={result.phiPn_max_kg} unit="kg" />
              <ResultBox label="φMn (Pure Bending)" value={result.phiMn_kgm} unit="kg·m" />
              <ResultBox label="φPb (Balanced)" value={result.phiPb_kg} unit="kg" />
              <ResultBox label="φMb (Balanced)" value={result.phiMb_kgm} unit="kg·m" />
              <ResultBox label="φPnx (ที่ Mux)" value={result.phiPnx_kg} unit="kg" />
              <ResultBox label="φPny (ที่ Muy)" value={result.phiPny_kg} unit="kg" />
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800">
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded p-3">
                <div className="text-xs text-cyan-300 font-semibold mb-1">📐 Bresler Reciprocal Method</div>
                <div className="text-[11px] text-slate-400 font-mono">1/φPn = 1/φPnx + 1/φPny − 1/φPo</div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-slate-300">φPn (ความสามารถจริง):</span>
                  <span className="text-xl font-bold font-mono text-cyan-300">{result.phiPn_bresler_kg} kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Column Cross-Section ===== */
function ColumnCrossSection({ b, h, cover, nBarsX, nBarsY, barDia, stirrupDia }) {
  const SVG_W = 300;
  const SVG_H = 300;
  const drawSize = 240;
  const maxDim = Math.max(b, h);
  const scale = drawSize / maxDim;
  const colW = b * scale;
  const colH = h * scale;
  const x0 = (SVG_W - colW) / 2;
  const y0 = (SVG_H - colH) / 2;
  const coverPx = cover * scale;
  const stirrupPx = (stirrupDia / 1000) * scale;
  const barRadius = (barDia / 1000) * scale / 2;
  
  // ตำแหน่งเหล็กรอบขอบ
  const innerLeft = x0 + coverPx + stirrupPx + barRadius;
  const innerRight = x0 + colW - coverPx - stirrupPx - barRadius;
  const innerTop = y0 + coverPx + stirrupPx + barRadius;
  const innerBottom = y0 + colH - coverPx - stirrupPx - barRadius;
  
  const bars = [];
  // แนวบน (nBarsX bars)
  for (let i = 0; i < nBarsX; i++) {
    const x = innerLeft + (innerRight - innerLeft) * i / (nBarsX - 1);
    bars.push({ x, y: innerTop });
  }
  // แนวล่าง
  for (let i = 0; i < nBarsX; i++) {
    const x = innerLeft + (innerRight - innerLeft) * i / (nBarsX - 1);
    bars.push({ x, y: innerBottom });
  }
  // แนวซ้าย (ไม่นับมุม - เพราะมุมอยู่ในแนวบน/ล่างแล้ว)
  for (let i = 1; i < nBarsY - 1; i++) {
    const y = innerTop + (innerBottom - innerTop) * i / (nBarsY - 1);
    bars.push({ x: innerLeft, y });
  }
  // แนวขวา
  for (let i = 1; i < nBarsY - 1; i++) {
    const y = innerTop + (innerBottom - innerTop) * i / (nBarsY - 1);
    bars.push({ x: innerRight, y });
  }
  
  return (
    <div className="flex flex-col items-center">
      <svg width={SVG_W} height={SVG_H} viewBox={`0 0 ${SVG_W} ${SVG_H}`}>
        {/* คอนกรีต */}
        <rect x={x0} y={y0} width={colW} height={colH}
          fill="rgba(100, 116, 139, 0.15)" stroke="#64748b" strokeWidth="1.5" rx="2" />
        {/* ปลอก stirrup */}
        <rect x={x0 + coverPx} y={y0 + coverPx}
          width={colW - 2 * coverPx} height={colH - 2 * coverPx}
          fill="none" stroke="#f59e0b" strokeWidth="1.5" rx="2" />
        {/* เหล็กยืน */}
        {bars.map((bar, i) => (
          <g key={i}>
            <circle cx={bar.x} cy={bar.y} r={barRadius + 1}
              fill="#0a1628" stroke="#22d3ee" strokeWidth="1.5" />
            <circle cx={bar.x} cy={bar.y} r={barRadius - 0.5}
              fill="#22d3ee" />
          </g>
        ))}
        {/* Dimension labels */}
        <text x={SVG_W / 2} y={y0 - 8} textAnchor="middle"
          fill="#94a3b8" fontSize="11" fontWeight="bold">b = {(b * 100).toFixed(0)} cm</text>
        <text x={x0 - 10} y={SVG_H / 2} textAnchor="middle"
          fill="#94a3b8" fontSize="11" fontWeight="bold"
          transform={`rotate(-90 ${x0 - 10} ${SVG_H / 2})`}>h = {(h * 100).toFixed(0)} cm</text>
      </svg>
      <div className="text-xs text-slate-400 mt-2 text-center">
        <div className="font-mono">{bars.length} - DB{barDia} mm</div>
        <div className="text-[10px] text-slate-500">ปลอก: DB{stirrupDia} · cover {(cover * 100).toFixed(0)} cm</div>
      </div>
    </div>
  );
}

/* ===== P-M Interaction Diagram ===== */
function PMDiagram({ pmCurve, Pu, Mu }) {
  const W = 280;
  const H = 240;
  const padL = 40, padR = 15, padT = 15, padB = 35;
  
  if (!pmCurve || pmCurve.length === 0) {
    return <div className="text-slate-500 text-xs text-center py-12">ไม่มีข้อมูล</div>;
  }
  
  const maxM = Math.max(...pmCurve.map(p => p.M), Mu) * 1.1;
  const maxP = Math.max(...pmCurve.map(p => p.P), Pu) * 1.1;
  
  const sx = (M) => padL + (M / maxM) * (W - padL - padR);
  const sy = (P) => H - padB - (P / maxP) * (H - padT - padB);
  
  const path = pmCurve.map((p, i) => `${i === 0 ? 'M' : 'L'} ${sx(p.M)} ${sy(p.P)}`).join(' ');
  
  // ตำแหน่งจุดที่ต้องตรวจสอบ
  const checkX = sx(Mu);
  const checkY = sy(Pu);
  // ดูว่าจุดอยู่ใน curve ไหม (คร่าวๆ)
  const inside = pmCurve.some(p => p.M >= Mu && p.P >= Pu);
  
  return (
    <div className="flex flex-col items-center">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {/* Background */}
        <rect x={padL} y={padT} width={W - padL - padR} height={H - padT - padB}
          fill="rgba(15, 23, 42, 0.5)" stroke="#334155" strokeWidth="0.5" />
        
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map(t => (
          <g key={t}>
            <line x1={padL + t * (W - padL - padR)} y1={padT}
              x2={padL + t * (W - padL - padR)} y2={H - padB}
              stroke="#1e293b" strokeWidth="0.5" />
            <line x1={padL} y1={padT + t * (H - padT - padB)}
              x2={W - padR} y2={padT + t * (H - padT - padB)}
              stroke="#1e293b" strokeWidth="0.5" />
          </g>
        ))}
        
        {/* Capacity curve (filled) */}
        <path d={path + ` L ${sx(0)} ${sy(0)} Z`}
          fill="rgba(34, 211, 238, 0.1)" stroke="none" />
        {/* Capacity curve (line) */}
        <path d={path}
          fill="none" stroke="#22d3ee" strokeWidth="2" />
        
        {/* Demand point (Pu, Mu) */}
        <circle cx={checkX} cy={checkY} r="6"
          fill={inside ? '#10b981' : '#ef4444'}
          stroke="#fff" strokeWidth="2" />
        <text x={checkX + 10} y={checkY - 8}
          fill={inside ? '#10b981' : '#ef4444'} fontSize="10" fontWeight="bold">
          ({(Mu/1000).toFixed(1)}, {(Pu/1000).toFixed(0)})
        </text>
        
        {/* Axes */}
        <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB}
          stroke="#64748b" strokeWidth="1" />
        <line x1={padL} y1={padT} x2={padL} y2={H - padB}
          stroke="#64748b" strokeWidth="1" />
        
        {/* Axis labels */}
        <text x={W / 2} y={H - 8} textAnchor="middle"
          fill="#94a3b8" fontSize="10">M (kg·m × 1000)</text>
        <text x={12} y={H / 2} textAnchor="middle"
          fill="#94a3b8" fontSize="10"
          transform={`rotate(-90 12 ${H / 2})`}>P (kg × 1000)</text>
        
        {/* Scale labels */}
        <text x={padL - 4} y={padT + 4} textAnchor="end" fill="#64748b" fontSize="9">
          {(maxP / 1000).toFixed(0)}
        </text>
        <text x={padL - 4} y={H - padB + 3} textAnchor="end" fill="#64748b" fontSize="9">0</text>
        <text x={W - padR} y={H - padB + 12} textAnchor="end" fill="#64748b" fontSize="9">
          {(maxM / 1000).toFixed(1)}
        </text>
      </svg>
      <div className={`text-xs mt-2 font-semibold ${inside ? 'text-emerald-400' : 'text-rose-400'}`}>
        {inside ? '✓ จุด (Mu, Pu) อยู่ในขอบเขต' : '✗ จุด (Mu, Pu) อยู่นอกขอบเขต'}
      </div>
    </div>
  );
}
/* ================== FOUNDATION CALCULATOR (TH UNITS) ================== */

function FoundationCalculator() {
  const [P_kg, setPkg] = useState(150000); // kg
  const [qa_kg, setQaKg] = useState(15000); // kg/m²
  const [B, setB] = useState(2.4);
  const [L, setL] = useState(2.4);
  const [t, setT] = useState(0.5);
  const [fc, setFc] = useState(280);
  const [columnB, setColumnB] = useState(0.5);

  const result = useMemo(() => {
    const P = P_kg / KN_TO_KGF;
    const qa = qa_kg / KN_TO_KGF;
    const fcMPa = fc / 10.2;
    const Pu = P * 1.4;
    const A = B * L;
    const q_actual = P / A;
    const q_factored = Pu / A;
    const bearingOK = q_actual <= qa;
    const d = t - 0.075;
    const a_ow = (B - columnB) / 2 - d;
    const Vu_ow = q_factored * L * a_ow;
    const Vc_ow = 0.17 * Math.sqrt(fcMPa) * L * 1000 * d * 1000 / 1000;
    const phiVc_ow = 0.75 * Vc_ow;
    const bo = 4 * (columnB + d);
    const Vu_pn = Pu - q_factored * Math.pow(columnB + d, 2);
    const Vc_pn = 0.33 * Math.sqrt(fcMPa) * bo * 1000 * d * 1000 / 1000;
    const phiVc_pn = 0.75 * Vc_pn;
    const arm = (B - columnB) / 2;
    const Mu = q_factored * L * arm * arm / 2;
    const dMm = d * 1000;
    const LMm = L * 1000;
    const term = 2 * (Mu / 0.9) * 1e6 / (0.85 * fcMPa * LMm * dMm * dMm);
    const As = term <= 1 ? (0.85 * fcMPa * LMm * dMm / 392) * (1 - Math.sqrt(1 - term)) : null;

    return {
      A: A.toFixed(2),
      q_actual_kg: (q_actual * KN_TO_KGF).toFixed(0),
      q_factored_kg: (q_factored * KN_TO_KGF).toFixed(0),
      bearingOK,
      bearingUtil: (q_actual / qa).toFixed(2),
      d: (d * 100).toFixed(1),
      Vu_ow_kg: (Vu_ow * KN_TO_KGF).toFixed(0),
      phiVc_ow_kg: (phiVc_ow * KN_TO_KGF).toFixed(0),
      owOK: Vu_ow <= phiVc_ow,
      Vu_pn_kg: (Vu_pn * KN_TO_KGF).toFixed(0),
      phiVc_pn_kg: (phiVc_pn * KN_TO_KGF).toFixed(0),
      pnOK: Vu_pn <= phiVc_pn,
      Mu_kg: (Mu * KN_TO_KGF).toFixed(0),
      As: As ? As.toFixed(0) : 'N/A',
      pass: bearingOK && Vu_ow <= phiVc_ow && Vu_pn <= phiVc_pn,
    };
  }, [P_kg, qa_kg, B, L, t, fc, columnB]);

  return (
    <div className="p-8 max-w-7xl">
      <PageHeader code="3.1" title="คำนวณฐานราก" subtitle="Spread Footing Design · หน่วยไทย kg, kg·m" />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4 bg-slate-900/40 border border-slate-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
            <span className="w-1 h-5 bg-cyan-400 rounded"></span>ข้อมูลนำเข้า
          </h3>
          <div className="space-y-5">
            <InputGroup title="แรงและดิน">
              <NumInput label="P จากเสา" value={P_kg} onChange={setPkg} unit="kg" step={5000} />
              <NumInput label="qa รับน้ำหนักดิน" value={qa_kg} onChange={setQaKg} unit="kg/m²" step={1000} />
            </InputGroup>
            <InputGroup title="ขนาดฐาน">
              <NumInput label="ความกว้าง B" value={B} onChange={setB} unit="ม." step={0.1} />
              <NumInput label="ความยาว L" value={L} onChange={setL} unit="ม." step={0.1} />
              <NumInput label="ความหนา t" value={t} onChange={setT} unit="ม." step={0.05} />
            </InputGroup>
            <InputGroup title="วัสดุ + เสา">
              <NumInput label="fc′" value={fc} onChange={setFc} unit="ksc" step={20} />
              <NumInput label="ขนาดเสา" value={columnB} onChange={setColumnB} unit="ม." step={0.05} />
            </InputGroup>
          </div>
        </div>
        <div className="col-span-8 space-y-5">
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-cyan-400 rounded"></span>ภาพประกอบฐานราก
            </h3>
            <div className="flex justify-center">
              <svg width="320" height="220" viewBox="0 0 320 220">
                <line x1="20" y1="180" x2="300" y2="180" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
                <text x="20" y="200" fill="#64748b" fontSize="10">ผิวดิน</text>
                <rect x="60" y="140" width="200" height="40" fill="rgba(34, 211, 238, 0.15)" stroke="#22d3ee" strokeWidth="2" />
                <text x="160" y="165" fill="#22d3ee" fontSize="11" textAnchor="middle" fontWeight="bold">Footing {B}×{L}×{t} ม.</text>
                <rect x="140" y="60" width="40" height="80" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2" />
                <text x="160" y="105" fill="#f59e0b" fontSize="10" textAnchor="middle">เสา</text>
                <path d="M 160 30 L 160 55 M 155 50 L 160 60 L 165 50" stroke="#f43f5e" strokeWidth="2" fill="none" />
                <text x="170" y="40" fill="#f43f5e" fontSize="11" fontWeight="bold">P = {(P_kg/1000).toFixed(0)} ตัน</text>
                <g opacity="0.6">
                  {[80, 110, 140, 170, 200, 230, 260].map(x => (
                    <path key={x} d={`M ${x} 195 L ${x} 180 M ${x-3} 184 L ${x} 180 L ${x+3} 184`} stroke="#10b981" strokeWidth="1.5" fill="none" />
                  ))}
                </g>
                <text x="160" y="215" fill="#10b981" fontSize="10" textAnchor="middle">q = {result.q_actual_kg} kg/m²</text>
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <CheckCard title="Bearing" ok={result.bearingOK} value={result.bearingUtil} detail={`q = ${result.q_actual_kg} ≤ ${qa_kg} kg/m²`} />
            <CheckCard title="One-way Shear" ok={result.owOK} value={(parseFloat(result.Vu_ow_kg) / parseFloat(result.phiVc_ow_kg)).toFixed(2)} detail={`Vu ${result.Vu_ow_kg} ≤ φVc ${result.phiVc_ow_kg} kg`} />
            <CheckCard title="Punching Shear" ok={result.pnOK} value={(parseFloat(result.Vu_pn_kg) / parseFloat(result.phiVc_pn_kg)).toFixed(2)} detail={`Vu ${result.Vu_pn_kg} ≤ φVc ${result.phiVc_pn_kg} kg`} />
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-emerald-400 rounded"></span>รายละเอียดการออกแบบ
            </h3>
            <div className="grid grid-cols-4 gap-3">
              <ResultBox label="พื้นที่ A" value={result.A} unit="m²" small />
              <ResultBox label="d" value={result.d} unit="ซม." small />
              <ResultBox label="Mu" value={result.Mu_kg} unit="kg·m" small />
              <ResultBox label="As ต่อทิศ" value={result.As} unit="mm²" highlight small />
            </div>
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 mt-4">
              <div className="text-xs text-cyan-400 tracking-widest uppercase mb-2">เหล็กเสริมแนะนำ</div>
              <div className="text-xl font-bold text-white">DB16 @ 0.20 ม. ทั้งสองทิศ</div>
              <div className="text-xs text-slate-500 mt-1">หุ้มเหล็ก 75 mm</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckCard({ title, ok, value, detail }) {
  return (
    <div className={`border rounded-xl p-4 ${ok ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs tracking-widest uppercase text-slate-400">{title}</div>
        {ok ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertTriangle className="w-5 h-5 text-rose-400" />}
      </div>
      <div className={`text-2xl font-bold mb-1 ${ok ? 'text-emerald-300' : 'text-rose-300'}`}>{value}</div>
      <div className="text-xs text-slate-500 font-mono">{detail}</div>
    </div>
  );
}

/* ================== SEISMIC CALCULATOR (TH UNITS) ================== */
function SeismicCalculator() {
  const [zone, setZone] = useState('2A');
  const [soilType, setSoilType] = useState('D');
  const [W_kg, setWKg] = useState(5100000); // kg (~50,000 kN × 102)
  const [T, setT] = useState(0.8);
  const [I, setI] = useState(1.0);
  const [R, setR] = useState(8);

  const result = useMemo(() => {
    const W = W_kg / KN_TO_KGF;
    const ss_map = { '1': 0.25, '2A': 0.40, '2B': 0.55, '3': 0.75, '4': 1.00 };
    const s1_map = { '1': 0.10, '2A': 0.15, '2B': 0.22, '3': 0.30, '4': 0.40 };
    const pgaMap = { '1': 0.10, '2A': 0.15, '2B': 0.20, '3': 0.30, '4': 0.40 };
    const FaMap = { 'A': 0.8, 'B': 1.0, 'C': 1.2, 'D': 1.4, 'E': 1.7 };
    const FvMap = { 'A': 0.8, 'B': 1.0, 'C': 1.7, 'D': 2.1, 'E': 2.8 };
    const ss = ss_map[zone];
    const s1 = s1_map[zone];
    const Fa = FaMap[soilType];
    const Fv = FvMap[soilType];
    const Sds = (2/3) * Fa * ss;
    const Sd1 = (2/3) * Fv * s1;
    let Cs = Sds / (R / I);
    const Cs_max = Sd1 / (T * (R / I));
    if (T > Sd1/Sds) Cs = Math.min(Cs, Cs_max);
    const Cs_min = Math.max(0.044 * Sds * I, 0.01);
    Cs = Math.max(Cs, Cs_min);
    const V = Cs * W;
    const spectrum = [];
    for (let t = 0; t <= 4; t += 0.05) {
      let Sa;
      const T0 = 0.2 * Sd1 / Sds;
      const Ts = Sd1 / Sds;
      if (t < T0) Sa = Sds * (0.4 + 0.6 * t / T0);
      else if (t <= Ts) Sa = Sds;
      else Sa = Sd1 / t;
      spectrum.push({ T: t, Sa });
    }
    return {
      pga: pgaMap[zone], ss, s1, Fa, Fv,
      Sds: Sds.toFixed(3),
      Sd1: Sd1.toFixed(3),
      Cs: Cs.toFixed(4),
      V_kg: (V * KN_TO_KGF).toFixed(0),
      Vpercent: (V / W * 100).toFixed(1),
      spectrum,
    };
  }, [zone, soilType, W_kg, T, I, R]);

  const chartW = 500;
  const chartH = 280;
  const maxSa = 1.0;
  const maxT = 4;
  const xS = (t) => 50 + (t / maxT) * (chartW - 70);
  const yS = (sa) => chartH - 40 - (sa / maxSa) * (chartH - 60);

  return (
    <div className="p-8 max-w-7xl">
      <PageHeader code="5.1" title="วิเคราะห์แผ่นดินไหว" subtitle="Seismic Analysis · หน่วยไทย kg" />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4 bg-slate-900/40 border border-slate-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
            <span className="w-1 h-5 bg-cyan-400 rounded"></span>ข้อมูลแผ่นดินไหว
          </h3>
          <div className="space-y-5">
            <InputGroup title="พื้นที่และดิน">
              <SelectInput label="โซนแผ่นดินไหว" value={zone} onChange={setZone}
                options={[
                  { v: '1', l: 'Zone 1 · ภาคกลาง/ตะวันออก' },
                  { v: '2A', l: 'Zone 2A · กรุงเทพ' },
                  { v: '2B', l: 'Zone 2B · ภาคเหนือตอนใต้' },
                  { v: '3', l: 'Zone 3 · ภาคเหนือ' },
                  { v: '4', l: 'Zone 4 · เชียงราย/แม่ฮ่องสอน' },
                ]} />
              <SelectInput label="ชนิดดิน" value={soilType} onChange={setSoilType}
                options={[
                  { v: 'A', l: 'A · หินแข็ง' },
                  { v: 'B', l: 'B · หิน' },
                  { v: 'C', l: 'C · ดินแข็งมาก' },
                  { v: 'D', l: 'D · ดินแข็ง' },
                  { v: 'E', l: 'E · ดินอ่อน' },
                ]} />
            </InputGroup>
            <InputGroup title="โครงสร้าง">
              <NumInput label="น้ำหนัก W" value={W_kg} onChange={setWKg} unit="kg" step={100000} />
              <NumInput label="คาบธรรมชาติ T" value={T} onChange={setT} unit="วินาที" step={0.1} />
              <NumInput label="ความสำคัญ I" value={I} onChange={setI} unit="" step={0.25} />
              <NumInput label="R (ระบบรับแรง)" value={R} onChange={setR} unit="" step={1} />
            </InputGroup>
          </div>
        </div>
        <div className="col-span-8 space-y-5">
          <div className="bg-gradient-to-br from-cyan-500/10 to-emerald-500/5 border border-cyan-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs tracking-widest uppercase text-cyan-400 mb-2">BASE SHEAR · แรงเฉือนที่ฐาน</div>
                <div className="text-5xl font-bold text-white mb-2">
                  {result.V_kg} <span className="text-2xl font-normal text-slate-400">kg</span>
                </div>
                <div className="text-sm text-slate-400">
                  คิดเป็น <span className="text-cyan-300 font-bold">{result.Vpercent}%</span> ของน้ำหนักโครงสร้าง
                </div>
              </div>
              <Activity className="w-20 h-20 text-cyan-400/30" strokeWidth={1.5} />
            </div>
            <div className="text-xs text-slate-500 mt-4 font-mono">V = Cs · W = {result.Cs} × {W_kg.toLocaleString()}</div>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-amber-400 rounded"></span>Response Spectrum (Sa vs T)
            </h3>
            <svg width="100%" height={chartH} viewBox={`0 0 ${chartW} ${chartH}`}>
              {[0, 0.25, 0.5, 0.75, 1].map(t => (
                <g key={t}>
                  <line x1={50} y1={yS(maxSa * t)} x2={chartW - 20} y2={yS(maxSa * t)} stroke="rgba(148,163,184,0.1)" />
                  <text x={45} y={yS(maxSa * t) + 4} fill="#64748b" fontSize="10" textAnchor="end">{(maxSa * t).toFixed(2)}g</text>
                </g>
              ))}
              {[0, 1, 2, 3, 4].map(t => (
                <g key={t}>
                  <line x1={xS(t)} y1={40} x2={xS(t)} y2={chartH - 40} stroke="rgba(148,163,184,0.1)" />
                  <text x={xS(t)} y={chartH - 25} fill="#64748b" fontSize="10" textAnchor="middle">{t}s</text>
                </g>
              ))}
              <line x1={50} y1={40} x2={50} y2={chartH - 40} stroke="#475569" strokeWidth="1.5" />
              <line x1={50} y1={chartH - 40} x2={chartW - 20} y2={chartH - 40} stroke="#475569" strokeWidth="1.5" />
              <path d={result.spectrum.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xS(p.T)} ${yS(p.Sa)}`).join(' ')} fill="none" stroke="#22d3ee" strokeWidth="2.5" />
              <path d={result.spectrum.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xS(p.T)} ${yS(p.Sa)}`).join(' ') + ` L ${xS(maxT)} ${yS(0)} L ${xS(0)} ${yS(0)} Z`} fill="rgba(34, 211, 238, 0.1)" />
              <line x1={xS(T)} y1={40} x2={xS(T)} y2={chartH - 40} stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx={xS(T)} cy={yS(result.spectrum.find(p => Math.abs(p.T - T) < 0.05)?.Sa || 0)} r="6" fill="#f43f5e" stroke="#fff" strokeWidth="2" />
              <text x={xS(T) + 8} y={50} fill="#f43f5e" fontSize="11" fontWeight="bold">T = {T}s</text>
              <text x={20} y={30} fill="#94a3b8" fontSize="11" fontWeight="bold">Sa (g)</text>
              <text x={chartW - 20} y={chartH - 10} fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="end">T (วินาที)</text>
            </svg>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-rose-400 rounded"></span>ค่าออกแบบ
            </h3>
            <div className="grid grid-cols-4 gap-3">
              <ResultBox label="PGA" value={result.pga} unit="g" small />
              <ResultBox label="Ss" value={result.ss} unit="g" small />
              <ResultBox label="S1" value={result.s1} unit="g" small />
              <ResultBox label="Fa · Fv" value={`${result.Fa}·${result.Fv}`} unit="" small />
              <ResultBox label="SDS" value={result.Sds} unit="g" small highlight />
              <ResultBox label="SD1" value={result.Sd1} unit="g" small highlight />
              <ResultBox label="Cs" value={result.Cs} unit="" small valueColor="text-cyan-400" />
              <ResultBox label="R/I" value={(R/I).toFixed(1)} unit="" small />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================== ROOF CALCULATOR ================== */
function RoofCalculator() {
  const [activeTab, setActiveTab] = useState('purlin');
  const tabs = [
    { id: 'purlin', name: 'แป (Purlin)', desc: 'รับกระเบื้อง ส่งจันทัน' },
    { id: 'rafter', name: 'จันทัน (Rafter)', desc: 'คานเอียงรับแป' },
    { id: 'wallplate', name: 'อะเส (Wall Plate)', desc: 'คานบนผนัง' },
    { id: 'kingpost', name: 'ดั้ง (King Post)', desc: 'เสากลางสันหลังคา' },
  ];
  return (
    <div className="p-8 max-w-7xl">
      <PageHeader code="6.1" title="คำนวณโครงสร้างหลังคา" subtitle="Roof Structure · หน่วยไทย kg, kg·m · มยผ. 1311-50 / 1502-51" />
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 mb-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-cyan-400 rounded"></span>ส่วนประกอบโครงสร้างหลังคา
        </h3>
        <div className="flex justify-center">
          <svg width="500" height="220" viewBox="0 0 500 220">
            <line x1="80" y1="180" x2="420" y2="180" stroke="#475569" strokeWidth="3" />
            <line x1="80" y1="180" x2="80" y2="200" stroke="#475569" strokeWidth="2" />
            <line x1="420" y1="180" x2="420" y2="200" stroke="#475569" strokeWidth="2" />
            <line x1="80" y1="180" x2="250" y2="60" stroke={activeTab === 'rafter' ? '#22d3ee' : '#64748b'} strokeWidth={activeTab === 'rafter' ? 4 : 2} />
            <line x1="420" y1="180" x2="250" y2="60" stroke={activeTab === 'rafter' ? '#22d3ee' : '#64748b'} strokeWidth={activeTab === 'rafter' ? 4 : 2} />
            <line x1="250" y1="60" x2="250" y2="180" stroke={activeTab === 'kingpost' ? '#22d3ee' : '#64748b'} strokeWidth={activeTab === 'kingpost' ? 4 : 2} strokeDasharray="3 3" />
            <rect x="70" y="175" width="20" height="10" fill={activeTab === 'wallplate' ? '#22d3ee' : '#64748b'} />
            <rect x="410" y="175" width="20" height="10" fill={activeTab === 'wallplate' ? '#22d3ee' : '#64748b'} />
            {[0.2, 0.4, 0.6, 0.8].map((t, i) => {
              const x1 = 80 + (250 - 80) * t;
              const y1 = 180 + (60 - 180) * t;
              const x2 = 420 - (420 - 250) * t;
              const y2 = 180 + (60 - 180) * t;
              return (
                <g key={i}>
                  <circle cx={x1} cy={y1} r={activeTab === 'purlin' ? 6 : 4} fill={activeTab === 'purlin' ? '#22d3ee' : '#64748b'} />
                  <circle cx={x2} cy={y2} r={activeTab === 'purlin' ? 6 : 4} fill={activeTab === 'purlin' ? '#22d3ee' : '#64748b'} />
                </g>
              );
            })}
            <circle cx={250} cy={60} r={activeTab === 'purlin' ? 6 : 4} fill={activeTab === 'purlin' ? '#22d3ee' : '#64748b'} />
            <text x="160" y="115" fill={activeTab === 'rafter' ? '#22d3ee' : '#94a3b8'} fontSize="13" fontWeight="bold" transform="rotate(-35 160 115)">จันทัน</text>
            <text x="265" y="125" fill={activeTab === 'kingpost' ? '#22d3ee' : '#94a3b8'} fontSize="13" fontWeight="bold">ดั้ง</text>
            <text x="40" y="195" fill={activeTab === 'wallplate' ? '#22d3ee' : '#94a3b8'} fontSize="12" fontWeight="bold">อะเส</text>
            <text x="430" y="195" fill={activeTab === 'wallplate' ? '#22d3ee' : '#94a3b8'} fontSize="12" fontWeight="bold">อะเส</text>
            <text x="320" y="100" fill={activeTab === 'purlin' ? '#22d3ee' : '#94a3b8'} fontSize="12" fontWeight="bold">● แป</text>
            <line x1="80" y1="178" x2="250" y2="58" stroke="rgba(245,158,11,0.3)" strokeWidth="8" />
            <line x1="420" y1="178" x2="250" y2="58" stroke="rgba(245,158,11,0.3)" strokeWidth="8" />
          </svg>
        </div>
      </div>
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 rounded-lg text-sm transition border ${
              activeTab === tab.id
                ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}>
            <div className="font-semibold">{tab.name}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">{tab.desc}</div>
          </button>
        ))}
      </div>
      {activeTab === 'purlin' && <PurlinCalc />}
      {activeTab === 'rafter' && <RafterCalc />}
      {activeTab === 'wallplate' && <WallPlateCalc />}
      {activeTab === 'kingpost' && <KingPostCalc />}
    </div>
  );
}

/* ===== PURLIN ===== */
function PurlinCalc() {
  const [material, setMaterial] = useState('steel');
  const [spacing, setSpacing] = useState(1.0);
  const [span, setSpan] = useState(3.0);
  const [angle, setAngle] = useState(30);
  const [tileWeight_kg, setTileWeightKg] = useState(50); // kg/m²
  const [windLoad_kg, setWindLoadKg] = useState(40); // kg/m²
  const [steelSize, setSteelSize] = useState('C100x50');
  const [woodB, setWoodB] = useState(0.05);
  const [woodH, setWoodH] = useState(0.10);

  const result = useMemo(() => {
    const tileWeight = tileWeight_kg / KN_TO_KGF;
    const windLoad = windLoad_kg / KN_TO_KGF;
    const angleRad = (angle * Math.PI) / 180;
    const cosA = Math.cos(angleRad);
    const sinA = Math.sin(angleRad);
    const DL = tileWeight * spacing;
    const LL = (30 / KN_TO_KGF) * spacing; // 30 kg/m² live load
    const W = windLoad * spacing;
    const w_perp = (DL + LL) * cosA + W;
    const w_para = (DL + LL) * sinA;
    const wu_perp = 1.2 * (DL * cosA) + 1.6 * (LL * cosA) + 0.8 * W;
    const wu_para = 1.2 * (DL * sinA) + 1.6 * (LL * sinA);
    const Mu_x = wu_perp * span * span / 8;
    const Mu_y = wu_para * span * span / 8;
    const Vu = wu_perp * span / 2;

    let Sx, Sy, allow, weight, ok, util_x, util_y, util_combined;

    if (material === 'steel') {
      const sections = {
        'C100x50': { Sx: 37.5, Sy: 7.5, w: 9.36, label: 'C 100x50x5' },
        'C125x50': { Sx: 54.5, Sy: 8.4, w: 13.4, label: 'C 125x50x5.5' },
        'C150x75': { Sx: 86.6, Sy: 16.6, w: 18.6, label: 'C 150x75x6.5' },
        'C200x75': { Sx: 152, Sy: 24.3, w: 24.6, label: 'C 200x75x7' },
      };
      const sec = sections[steelSize];
      Sx = sec.Sx;
      Sy = sec.Sy;
      weight = sec.w;
      const fy_design = 245;
      const phiMnx = 0.9 * fy_design * 1000 * Sx / 1e6;
      const phiMny = 0.9 * fy_design * 1000 * Sy / 1e6;
      util_x = Mu_x / phiMnx;
      util_y = Mu_y / phiMny;
      util_combined = util_x + util_y;
      ok = util_combined <= 1.0;
      allow = `${sec.label} (φMnx = ${(phiMnx * KN_TO_KGF).toFixed(0)} kg·m)`;
    } else {
      const Fb = 13;
      const bMm = woodB * 1000;
      const hMm = woodH * 1000;
      Sx = bMm * hMm * hMm / 6 / 1000;
      Sy = hMm * bMm * bMm / 6 / 1000;
      weight = (woodB * woodH * 800);
      const M_x_service = w_perp * span * span / 8;
      const M_y_service = w_para * span * span / 8;
      const M_allow_x = Fb * 1000 * Sx / 1e6;
      const M_allow_y = Fb * 1000 * Sy / 1e6;
      util_x = M_x_service / M_allow_x;
      util_y = M_y_service / M_allow_y;
      util_combined = util_x + util_y;
      ok = util_combined <= 1.0;
      allow = `Wood ${(woodB*100).toFixed(0)}x${(woodH*100).toFixed(0)} ซม. (M_allow = ${(M_allow_x * KN_TO_KGF).toFixed(0)} kg·m)`;
    }

    const E = material === 'steel' ? 200000 : 12000;
    const I = material === 'steel' ? Sx * 5 : (woodB * 1000) * Math.pow(woodH * 1000, 3) / 12 / 10000;
    const deflection = (5 * w_perp * Math.pow(span * 1000, 4)) / (384 * E * I * 10000) / 1000;
    const def_limit = (span * 1000) / 240;
    const def_ok = deflection <= def_limit;

    return {
      DL_kg: (DL * KN_TO_KGF).toFixed(0),
      LL_kg: (LL * KN_TO_KGF).toFixed(0),
      W_kg: (W * KN_TO_KGF).toFixed(0),
      w_perp_kg: (w_perp * KN_TO_KGF).toFixed(0),
      w_para_kg: (w_para * KN_TO_KGF).toFixed(0),
      Mu_x_kg: (Mu_x * KN_TO_KGF).toFixed(0),
      Mu_y_kg: (Mu_y * KN_TO_KGF).toFixed(0),
      Vu_kg: (Vu * KN_TO_KGF).toFixed(0),
      util_x: util_x.toFixed(2),
      util_y: util_y.toFixed(2),
      util_combined: util_combined.toFixed(2),
      pass: ok && def_ok, ok, def_ok, allow,
      weight: weight.toFixed(1),
      deflection: deflection.toFixed(1),
      def_limit: def_limit.toFixed(1),
    };
  }, [material, spacing, span, angle, tileWeight_kg, windLoad_kg, steelSize, woodB, woodH]);

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-4 bg-slate-900/40 border border-slate-800 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
          <span className="w-1 h-5 bg-cyan-400 rounded"></span>ข้อมูลแป (Purlin)
        </h3>
        <div className="space-y-5">
          <InputGroup title="วัสดุ">
            <SelectInput label="ชนิดวัสดุ" value={material} onChange={setMaterial}
              options={[
                { v: 'steel', l: 'เหล็กรูปพรรณ C-channel (LRFD)' },
                { v: 'wood', l: 'ไม้เนื้อแข็ง (WSD)' },
              ]} />
            {material === 'steel' && (
              <SelectInput label="ขนาดเหล็ก" value={steelSize} onChange={setSteelSize}
                options={[
                  { v: 'C100x50', l: 'C 100x50x5 (9.36 kg/m)' },
                  { v: 'C125x50', l: 'C 125x50x5.5 (13.4 kg/m)' },
                  { v: 'C150x75', l: 'C 150x75x6.5 (18.6 kg/m)' },
                  { v: 'C200x75', l: 'C 200x75x7 (24.6 kg/m)' },
                ]} />
            )}
            {material === 'wood' && (
              <>
                <NumInput label="ความกว้าง b" value={woodB} onChange={setWoodB} unit="ม." step={0.01} />
                <NumInput label="ความลึก h" value={woodH} onChange={setWoodH} unit="ม." step={0.01} />
              </>
            )}
          </InputGroup>
          <InputGroup title="รูปทรงหลังคา">
            <NumInput label="มุมหลังคา" value={angle} onChange={setAngle} unit="องศา" step={5} />
            <NumInput label="ระยะห่างแป" value={spacing} onChange={setSpacing} unit="ม." step={0.1} />
            <NumInput label="ช่วง span" value={span} onChange={setSpan} unit="ม." step={0.5} />
          </InputGroup>
          <InputGroup title="น้ำหนักบรรทุก">
            <NumInput label="กระเบื้อง+ระบบ" value={tileWeight_kg} onChange={setTileWeightKg} unit="kg/m²" step={5} />
            <NumInput label="แรงลม (uplift)" value={windLoad_kg} onChange={setWindLoadKg} unit="kg/m²" step={5} />
          </InputGroup>
        </div>
      </div>
      <div className="col-span-8 space-y-5">
        <div className={`border rounded-xl p-5 ${result.pass ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'}`}>
          <div className="flex items-center gap-4">
            {result.pass ? <CheckCircle2 className="w-10 h-10 text-emerald-400" /> : <AlertTriangle className="w-10 h-10 text-rose-400" />}
            <div className="flex-1">
              <div className={`text-xl font-bold ${result.pass ? 'text-emerald-300' : 'text-rose-300'}`}>
                {result.pass ? 'ผ่านการตรวจสอบ' : 'ไม่ผ่าน · เพิ่มขนาด'}
              </div>
              <div className="text-sm text-slate-400 mt-1">{result.allow}</div>
            </div>
            <div className={`text-5xl font-bold font-mono ${result.pass ? 'text-emerald-400' : 'text-rose-400'}`}>{result.util_combined}</div>
          </div>
        </div>
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-amber-400 rounded"></span>น้ำหนักบนแป
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <ResultBox label="DL" value={result.DL_kg} unit="kg/m" small />
            <ResultBox label="LL" value={result.LL_kg} unit="kg/m" small />
            <ResultBox label="W (wind)" value={result.W_kg} unit="kg/m" small />
            <ResultBox label="w ตั้งฉาก" value={result.w_perp_kg} unit="kg/m" small highlight />
            <ResultBox label="w ขนาน" value={result.w_para_kg} unit="kg/m" small />
            <ResultBox label="น้ำหนักแปเอง" value={result.weight} unit="kg/m" small />
          </div>
        </div>
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-cyan-400 rounded"></span>แรงและการตรวจสอบ
          </h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <ResultBox label="Mu (แกนแข็ง)" value={result.Mu_x_kg} unit="kg·m" small highlight />
            <ResultBox label="Mu (แกนอ่อน)" value={result.Mu_y_kg} unit="kg·m" small />
            <ResultBox label="Vu" value={result.Vu_kg} unit="kg" small />
            <ResultBox label="Util x" value={result.util_x} small valueColor={parseFloat(result.util_x) <= 1 ? 'text-emerald-400' : 'text-rose-400'} />
            <ResultBox label="Util y" value={result.util_y} small valueColor={parseFloat(result.util_y) <= 1 ? 'text-emerald-400' : 'text-rose-400'} />
            <ResultBox label="Util รวม" value={result.util_combined} small highlight valueColor={parseFloat(result.util_combined) <= 1 ? 'text-emerald-400' : 'text-rose-400'} />
          </div>
        </div>
        <div className={`border rounded-xl p-4 ${result.def_ok ? 'bg-slate-900/40 border-slate-800' : 'bg-amber-500/10 border-amber-500/30'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs tracking-widest uppercase text-slate-500 mb-1">การโก่งตัว (Deflection)</div>
              <div className="text-sm text-slate-300">
                <span className="font-mono font-bold text-white">{result.deflection} mm</span>
                <span className="text-slate-500 ml-2">≤ L/240 = {result.def_limit} mm</span>
              </div>
            </div>
            {result.def_ok ? <CheckCircle2 className="w-6 h-6 text-emerald-400" /> : <AlertTriangle className="w-6 h-6 text-amber-400" />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== RAFTER ===== */
function RafterCalc() {
  const [material, setMaterial] = useState('wood');
  const [spacing, setSpacing] = useState(1.5);
  const [horizSpan, setHorizSpan] = useState(4.0);
  const [angle, setAngle] = useState(30);
  const [woodB, setWoodB] = useState(0.05);
  const [woodH, setWoodH] = useState(0.20);
  const [steelSize, setSteelSize] = useState('C150x75');

  const result = useMemo(() => {
    const angleRad = (angle * Math.PI) / 180;
    const sloped_span = horizSpan / Math.cos(angleRad);
    const DL = 0.50 * spacing;
    const LL = 0.30 * spacing;
    const w_service = (DL + LL) * Math.cos(angleRad);
    const wu = (1.2 * DL + 1.6 * LL) * Math.cos(angleRad);
    const Mu = wu * sloped_span * sloped_span / 8;
    const M_service = w_service * sloped_span * sloped_span / 8;
    const Vu = wu * sloped_span / 2;
    const reaction = w_service * sloped_span / 2 / Math.cos(angleRad);

    let pass, util, allow, def_ok, deflection, def_limit;
    if (material === 'wood') {
      const Fb = 13;
      const bMm = woodB * 1000;
      const hMm = woodH * 1000;
      const Sx = bMm * hMm * hMm / 6;
      const Ix = bMm * hMm * hMm * hMm / 12;
      const M_allow = Fb * Sx / 1e6;
      util = M_service / M_allow;
      const E = 12000;
      deflection = (5 * w_service * Math.pow(sloped_span * 1000, 4)) / (384 * E * Ix);
      def_limit = (sloped_span * 1000) / 240;
      def_ok = deflection <= def_limit;
      pass = util <= 1.0 && def_ok;
      allow = `Wood ${(woodB*100).toFixed(0)}x${(woodH*100).toFixed(0)} ซม.`;
    } else {
      const sections = {
        'C150x75': { Sx: 86.6, Ix: 689 },
        'C200x75': { Sx: 152, Ix: 1520 },
        'C250x90': { Sx: 240, Ix: 3000 },
      };
      const sec = sections[steelSize] || sections['C150x75'];
      const phiMn = 0.9 * 245 * 1000 * sec.Sx / 1e6;
      util = Mu / phiMn;
      deflection = (5 * w_service * Math.pow(sloped_span * 1000, 4)) / (384 * 200000 * sec.Ix * 10000);
      def_limit = (sloped_span * 1000) / 240;
      def_ok = deflection <= def_limit;
      pass = util <= 1.0 && def_ok;
      allow = `Steel ${steelSize}`;
    }

    return {
      sloped_span: sloped_span.toFixed(2),
      wu_kg: (wu * KN_TO_KGF).toFixed(0),
      Mu_kg: (Mu * KN_TO_KGF).toFixed(0),
      Vu_kg: (Vu * KN_TO_KGF).toFixed(0),
      reaction_kg: (reaction * KN_TO_KGF).toFixed(0),
      util: util.toFixed(2), pass, allow,
      deflection: deflection.toFixed(1),
      def_limit: def_limit.toFixed(1), def_ok,
    };
  }, [material, spacing, horizSpan, angle, woodB, woodH, steelSize]);

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-5 bg-slate-900/40 border border-slate-800 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
          <span className="w-1 h-5 bg-cyan-400 rounded"></span>ข้อมูลจันทัน (Rafter)
        </h3>
        <div className="space-y-5">
          <InputGroup title="วัสดุ">
            <SelectInput label="ชนิดวัสดุ" value={material} onChange={setMaterial}
              options={[
                { v: 'wood', l: 'ไม้เนื้อแข็ง' },
                { v: 'steel', l: 'เหล็กรูปพรรณ C' },
              ]} />
            {material === 'wood' ? (
              <>
                <NumInput label="ความกว้าง" value={woodB} onChange={setWoodB} unit="ม." step={0.01} />
                <NumInput label="ความลึก" value={woodH} onChange={setWoodH} unit="ม." step={0.01} />
              </>
            ) : (
              <SelectInput label="ขนาดเหล็ก" value={steelSize} onChange={setSteelSize}
                options={[
                  { v: 'C150x75', l: 'C 150x75' },
                  { v: 'C200x75', l: 'C 200x75' },
                  { v: 'C250x90', l: 'C 250x90' },
                ]} />
            )}
          </InputGroup>
          <InputGroup title="รูปทรง">
            <NumInput label="ระยะจันทัน" value={spacing} onChange={setSpacing} unit="ม." step={0.1} />
            <NumInput label="ระยะแนวระดับ" value={horizSpan} onChange={setHorizSpan} unit="ม." step={0.5} />
            <NumInput label="มุมหลังคา" value={angle} onChange={setAngle} unit="องศา" step={5} />
          </InputGroup>
        </div>
      </div>
      <div className="col-span-7 space-y-5">
        <div className={`border rounded-xl p-5 ${result.pass ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'}`}>
          <div className="flex items-center gap-4">
            {result.pass ? <CheckCircle2 className="w-10 h-10 text-emerald-400" /> : <AlertTriangle className="w-10 h-10 text-rose-400" />}
            <div className="flex-1">
              <div className={`text-xl font-bold ${result.pass ? 'text-emerald-300' : 'text-rose-300'}`}>
                {result.pass ? 'ผ่าน' : 'ไม่ผ่าน'}
              </div>
              <div className="text-sm text-slate-400 mt-1">{result.allow} · span เอียง {result.sloped_span} ม.</div>
            </div>
            <div className={`text-5xl font-bold font-mono ${result.pass ? 'text-emerald-400' : 'text-rose-400'}`}>{result.util}</div>
          </div>
        </div>
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-amber-400 rounded"></span>แรงและน้ำหนัก
          </h3>
          <div className="grid grid-cols-4 gap-3">
            <ResultBox label="Span เอียง" value={result.sloped_span} unit="ม." small />
            <ResultBox label="wu" value={result.wu_kg} unit="kg/m" small />
            <ResultBox label="Mu" value={result.Mu_kg} unit="kg·m" small highlight />
            <ResultBox label="Vu" value={result.Vu_kg} unit="kg" small />
          </div>
        </div>
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-5">
          <div className="text-xs tracking-widest uppercase text-cyan-400 mb-2">แรงปฏิกิริยาที่อะเส</div>
          <div className="text-3xl font-bold text-white font-mono">{result.reaction_kg} kg</div>
          <div className="text-xs text-slate-500 mt-2">นำไปใส่ในแท็บอะเส</div>
        </div>
      </div>
    </div>
  );
}

/* ===== WALL PLATE ===== */
function WallPlateCalc() {
  const [material, setMaterial] = useState('wood');
  const [columnSpan, setColumnSpan] = useState(3.5);
  const [rafterSpacing, setRafterSpacing] = useState(1.5);
  const [reaction_kg, setReactionKg] = useState(870); // kg
  const [woodB, setWoodB] = useState(0.10);
  const [woodH, setWoodH] = useState(0.15);

  const result = useMemo(() => {
    const reactionPerRafter = reaction_kg / KN_TO_KGF;
    const w_service = reactionPerRafter / rafterSpacing;
    const wu = 1.4 * w_service;
    const sw = material === 'wood' ? woodB * woodH * 800 * 9.81 / 1000 : 0.2;
    const wu_total = wu + 1.2 * sw;
    const Mu = wu_total * columnSpan * columnSpan / 8;
    const M_service = (w_service + sw) * columnSpan * columnSpan / 8;
    const Vu = wu_total * columnSpan / 2;

    let util, allow, pass, def_ok, deflection, def_limit;
    if (material === 'wood') {
      const Fb = 13;
      const bMm = woodB * 1000;
      const hMm = woodH * 1000;
      const Sx = bMm * hMm * hMm / 6;
      const Ix = bMm * hMm * hMm * hMm / 12;
      const M_allow = Fb * Sx / 1e6;
      util = M_service / M_allow;
      const E = 12000;
      deflection = (5 * (w_service + sw) * Math.pow(columnSpan * 1000, 4)) / (384 * E * Ix);
      def_limit = (columnSpan * 1000) / 240;
      def_ok = deflection <= def_limit;
      pass = util <= 1.0 && def_ok;
      allow = `Wood ${(woodB*100).toFixed(0)}x${(woodH*100).toFixed(0)} ซม.`;
    } else {
      const Sx = 152;
      const Ix = 1520;
      const phiMn = 0.9 * 245 * 1000 * Sx / 1e6;
      util = Mu / phiMn;
      deflection = (5 * (w_service + sw) * Math.pow(columnSpan * 1000, 4)) / (384 * 200000 * Ix * 10000);
      def_limit = (columnSpan * 1000) / 240;
      def_ok = deflection <= def_limit;
      pass = util <= 1.0 && def_ok;
      allow = 'Steel C 200x75';
    }
    return {
      wu_total_kg: (wu_total * KN_TO_KGF).toFixed(0),
      Mu_kg: (Mu * KN_TO_KGF).toFixed(0),
      Vu_kg: (Vu * KN_TO_KGF).toFixed(0),
      util: util.toFixed(2), pass, allow,
      deflection: deflection.toFixed(1),
      def_limit: def_limit.toFixed(1), def_ok,
    };
  }, [material, columnSpan, rafterSpacing, reaction_kg, woodB, woodH]);

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-5 bg-slate-900/40 border border-slate-800 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
          <span className="w-1 h-5 bg-cyan-400 rounded"></span>ข้อมูลอะเส (Wall Plate)
        </h3>
        <div className="space-y-5">
          <InputGroup title="วัสดุ">
            <SelectInput label="ชนิดวัสดุ" value={material} onChange={setMaterial}
              options={[
                { v: 'wood', l: 'ไม้เนื้อแข็ง' },
                { v: 'steel', l: 'เหล็กรูปพรรณ C' },
              ]} />
            {material === 'wood' && (
              <>
                <NumInput label="ความกว้าง" value={woodB} onChange={setWoodB} unit="ม." step={0.01} />
                <NumInput label="ความลึก" value={woodH} onChange={setWoodH} unit="ม." step={0.01} />
              </>
            )}
          </InputGroup>
          <InputGroup title="โครงสร้าง">
            <NumInput label="ระยะระหว่างเสา" value={columnSpan} onChange={setColumnSpan} unit="ม." step={0.5} />
            <NumInput label="ระยะจันทัน" value={rafterSpacing} onChange={setRafterSpacing} unit="ม." step={0.1} />
          </InputGroup>
          <InputGroup title="แรง">
            <NumInput label="Reaction จากจันทัน" value={reaction_kg} onChange={setReactionKg} unit="kg" step={50} />
          </InputGroup>
        </div>
      </div>
      <div className="col-span-7 space-y-5">
        <div className={`border rounded-xl p-5 ${result.pass ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'}`}>
          <div className="flex items-center gap-4">
            {result.pass ? <CheckCircle2 className="w-10 h-10 text-emerald-400" /> : <AlertTriangle className="w-10 h-10 text-rose-400" />}
            <div className="flex-1">
              <div className={`text-xl font-bold ${result.pass ? 'text-emerald-300' : 'text-rose-300'}`}>
                {result.pass ? 'ผ่าน' : 'ไม่ผ่าน'}
              </div>
              <div className="text-sm text-slate-400 mt-1">{result.allow}</div>
            </div>
            <div className={`text-5xl font-bold font-mono ${result.pass ? 'text-emerald-400' : 'text-rose-400'}`}>{result.util}</div>
          </div>
        </div>
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-amber-400 rounded"></span>แรงและโมเมนต์
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <ResultBox label="w รวม" value={result.wu_total_kg} unit="kg/m" small />
            <ResultBox label="Mu" value={result.Mu_kg} unit="kg·m" small highlight />
            <ResultBox label="Vu" value={result.Vu_kg} unit="kg" small />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== KING POST ===== */
function KingPostCalc() {
  const [material, setMaterial] = useState('wood');
  const [height, setHeight] = useState(2.0);
  const [P_kg, setPKg] = useState(1500); // kg
  const [woodB, setWoodB] = useState(0.10);
  const [woodH, setWoodH] = useState(0.10);

  const result = useMemo(() => {
    const P = P_kg / KN_TO_KGF;
    const Pu = 1.4 * P;
    let util, allow, pass, slenderness, slender_ok;
    if (material === 'wood') {
      const Fc = 9;
      const E = 12000;
      const A = woodB * woodH * 1e6;
      const r = Math.min(woodB, woodH) * 1000 / Math.sqrt(12);
      const KL = height * 1000;
      slenderness = KL / r;
      slender_ok = slenderness <= 50;
      const FcE = (0.822 * E) / Math.pow(slenderness, 2);
      const ratio = FcE / Fc;
      const c = 0.8;
      const CP = (1 + ratio) / (2 * c) - Math.sqrt(Math.pow((1 + ratio) / (2 * c), 2) - ratio / c);
      const Fc_adj = Fc * CP;
      const P_allow = Fc_adj * A / 1000;
      util = P / P_allow;
      pass = util <= 1.0 && slender_ok;
      allow = `Wood ${(woodB*100).toFixed(0)}x${(woodH*100).toFixed(0)} ซม. · P_allow = ${(P_allow * KN_TO_KGF).toFixed(0)} kg`;
    } else {
      const A = 2400;
      const r = 29;
      const Fy = 245;
      const E = 200000;
      slenderness = (1 * height * 1000) / r;
      slender_ok = slenderness <= 200;
      const Fe = (Math.PI * Math.PI * E) / Math.pow(slenderness, 2);
      const lambda = Math.sqrt(Fy / Fe);
      let Fcr;
      if (lambda <= 1.5) Fcr = Math.pow(0.658, lambda * lambda) * Fy;
      else Fcr = (0.877 / (lambda * lambda)) * Fy;
      const phiPn = 0.9 * Fcr * A / 1000;
      util = Pu / phiPn;
      pass = util <= 1.0 && slender_ok;
      allow = `Steel pipe 75x75x3 · φPn = ${(phiPn * KN_TO_KGF).toFixed(0)} kg`;
    }
    return {
      Pu_kg: (Pu * KN_TO_KGF).toFixed(0),
      util: util.toFixed(2),
      slenderness: slenderness.toFixed(0),
      pass, allow, slender_ok,
    };
  }, [material, height, P_kg, woodB, woodH]);

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-5 bg-slate-900/40 border border-slate-800 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
          <span className="w-1 h-5 bg-cyan-400 rounded"></span>ข้อมูลดั้ง (King Post)
        </h3>
        <div className="space-y-5">
          <InputGroup title="วัสดุ">
            <SelectInput label="ชนิดวัสดุ" value={material} onChange={setMaterial}
              options={[
                { v: 'wood', l: 'ไม้เนื้อแข็ง' },
                { v: 'steel', l: 'ท่อเหล็กกล่อง' },
              ]} />
            {material === 'wood' && (
              <>
                <NumInput label="ขนาด b" value={woodB} onChange={setWoodB} unit="ม." step={0.01} />
                <NumInput label="ขนาด h" value={woodH} onChange={setWoodH} unit="ม." step={0.01} />
              </>
            )}
          </InputGroup>
          <InputGroup title="โครงสร้าง">
            <NumInput label="ความสูงดั้ง" value={height} onChange={setHeight} unit="ม." step={0.1} />
            <NumInput label="แรงกด P" value={P_kg} onChange={setPKg} unit="kg" step={100} />
          </InputGroup>
        </div>
      </div>
      <div className="col-span-7 space-y-5">
        <div className={`border rounded-xl p-5 ${result.pass ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'}`}>
          <div className="flex items-center gap-4">
            {result.pass ? <CheckCircle2 className="w-10 h-10 text-emerald-400" /> : <AlertTriangle className="w-10 h-10 text-rose-400" />}
            <div className="flex-1">
              <div className={`text-xl font-bold ${result.pass ? 'text-emerald-300' : 'text-rose-300'}`}>
                {result.pass ? 'ผ่าน' : 'ไม่ผ่าน'}
              </div>
              <div className="text-sm text-slate-400 mt-1">{result.allow}</div>
            </div>
            <div className={`text-5xl font-bold font-mono ${result.pass ? 'text-emerald-400' : 'text-rose-400'}`}>{result.util}</div>
          </div>
        </div>
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-amber-400 rounded"></span>แรงอัด (Compression)
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <ResultBox label="P (service)" value={P_kg} unit="kg" small />
            <ResultBox label="Pu (factored)" value={result.Pu_kg} unit="kg" small highlight />
            <ResultBox label="KL/r" value={result.slenderness} small valueColor={result.slender_ok ? 'text-emerald-400' : 'text-rose-400'} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ================================================================
// 📌 PHASE 1: GRID BUILDER + MULTI-FLOOR
// 
// วิธีใช้:
// 1. เปิด App.jsx
// 2. เพิ่ม icon ใน import (แก้บรรทัดบนสุด):
//    เพิ่ม Grid3x3, Plus as PlusIcon, Trash2 ใน lucide-react import
//
// 3. เพิ่ม route:
//    หา {page === 'roof' && <RoofCalculator />}
//    เพิ่มต่อ:  {page === 'building' && <BuildingDesigner />}
//
// 4. เพิ่มเมนู sidebar (ใน AppShell):
//    หา { id: 'roof', name: 'โครงหลังคา', ... }
//    เพิ่มต่อ:
//    { id: 'building', name: 'ออกแบบอาคาร', icon: Grid3x3, code: '7.1' },
//
// 5. เพิ่ม QuickCard ใน Dashboard:
//    <QuickCard icon={<Grid3x3 />} label="ออกแบบอาคาร" desc="Building Designer" 
//      onClick={() => setPage('building')} color="emerald" />
//
// 6. คัดลอกโค้ดทั้งหมดข้างล่างนี้ → วางก่อน /* SHARED COMPONENTS */
// 7. Ctrl+S
// ================================================================

// ================================================================
// 📌 PHASE 2A: TOOLBAR + วางเสา/คาน/พื้น + SNAP TO NODE
//
// 🔄 วิธีอัปเดต:
// 1. เปิด App.jsx
// 2. หา function BuildingDesigner เก่าทั้งหมด (ที่เป็น Phase 1)
// 3. ลบทิ้ง — ตั้งแต่ "function BuildingDesigner() {" 
//    จนถึง "}" ปิดของ PhaseStep (ก่อน /* SHARED COMPONENTS */)
// 4. วางโค้ดใหม่ทั้งหมดข้างล่างนี้
// 5. เพิ่ม icon ใน import (บนสุดของ App.jsx) — เพิ่ม:
//    Square, MoveHorizontal, MousePointer2, Trash2
//    ตัวอย่าง: ... Triangle, Grid3x3, Square, MoveHorizontal, MousePointer2, Trash2
// 6. Ctrl+S → F5
//
// ================================================================
// ฟีเจอร์ใน Step 2A:
//   ✅ Toolbar เลือกเครื่องมือ (Select / Column / Beam / Slab / Delete)
//   ✅ Library ขนาดเสา/คาน มาตรฐาน + Custom
//   ✅ Snap to Node (จุด grid) สีเขียว
//   ✅ Hover preview (เห็นเสา/คานก่อนคลิก)
//   ✅ คลิกวาง column ที่ node
//   ✅ คลิก 2 node เพื่อวาด beam
//   ✅ คลิก 4 node เพื่อสร้าง slab
//   ✅ Element list — ดู/ลบ ทุกชิ้นที่วางไว้
//   ✅ บันทึก state ตามชั้น (แต่ละชั้นมี element ของตัวเอง)
// ================================================================

function BuildingDesigner() {
  // ===== Project state =====
  const [projectName, setProjectName] = useState('โครงการตัวอย่าง');
  const [floors, setFloors] = useState([
    { id: 1, name: 'ชั้น 1', height: 3.0, type: 'typical' },
    { id: 2, name: 'ชั้น 2', height: 3.0, type: 'typical' },
    { id: 3, name: 'ดาดฟ้า / Roof', height: 3.0, type: 'roof' },
  ]);
  const [activeFloor, setActiveFloor] = useState(1);

  // ===== Grid state =====
  const [gridX, setGridX] = useState([0.0]);
  const [gridY, setGridY] = useState([0.0]);
  const [cantileverLeft, setCantileverLeft] = useState(0);
  const [cantileverRight, setCantileverRight] = useState(0);
  const [cantileverTop, setCantileverTop] = useState(0);
  const [cantileverBottom, setCantileverBottom] = useState(0);

  // ===== Tools state =====
  // Tool: 'select' | 'column' | 'beam' | 'slab' | 'delete'
  const [tool, setTool] = useState('select');
  const [columnSize, setColumnSize] = useState({ b: 0.30, h: 0.30, label: '0.30×0.30' });
  const [beamSize, setBeamSize] = useState({ b: 0.20, h: 0.40, label: '0.20×0.40' });
  const [slabThickness, setSlabThickness] = useState(0.12);

  // Drawing state
  // beamStart: node ID ที่เลือกเป็นต้น (สำหรับวาดคาน)
  const [beamStart, setBeamStart] = useState(null);
  // slabPoints: array of node IDs (สำหรับสร้างพื้น)
  const [slabPoints, setSlabPoints] = useState([]);
  // hoveredNode: node ที่ mouse กำลัง snap อยู่
  const [hoveredNode, setHoveredNode] = useState(null);

  // ===== Elements state (ตามชั้น) =====
  // structure: { floorId: { columns: [], beams: [], slabs: [] } }
  const [elements, setElements] = useState({
    1: { columns: [], beams: [], slabs: [] },
    2: { columns: [], beams: [], slabs: [] },
    3: { columns: [], beams: [], slabs: [] },
  });

  // ===== UI state =====
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [selectedElement, setSelectedElement] = useState(null);
  const [showLabels, setShowLabels] = useState(true);
  const [showDimensions, setShowDimensions] = useState(false);

  // ===== PDF Underlay state =====
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileName, setPdfFileName] = useState('');
  const [pdfVisible, setPdfVisible] = useState(true);
  const [pdfOpacity, setPdfOpacity] = useState(50);
  // ===== PDF Transform state (Calibrate + Drag + Rotate) =====
  const [pdfX, setPdfX] = useState(50);          // ตำแหน่ง X บน canvas (px)
  const [pdfY, setPdfY] = useState(50);          // ตำแหน่ง Y บน canvas (px)
  const [pdfScale, setPdfScale] = useState(1);   // scale factor
  const [pdfRotation, setPdfRotation] = useState(0); // หมุน 0/90/180/270
  const [calibrating, setCalibrating] = useState(false); // กำลัง calibrate
  const [calibPoints, setCalibPoints] = useState([]); // 2 จุดที่คลิก
  const [calibInputDistance, setCalibInputDistance] = useState(''); // ระยะจริงที่ใส่

  // ===== Pick Grid from PDF (ใหม่) =====
  const [pdfPxPerMeter, setPdfPxPerMeter] = useState(null); // คำนวณจาก Calibrate
  const [pickingGrid, setPickingGrid] = useState('off');    // 'off' | 'x' | 'y'
  const [pickedPoints, setPickedPoints] = useState([]);     // จุดที่คลิกบน PDF

  const resetPdfTransform = () => {
    setPdfX(50);
    setPdfY(50);
    setPdfScale(1);
    setPdfRotation(0);
  };

  // ===== Canvas viewport size (จาก PlanCanvasV2 → ส่งกลับมา) =====
  const [canvasViewport, setCanvasViewport] = useState({ w: 900, h: 600 });

  // ===== Fit PDF to Canvas (auto-scale + center) =====
  const fitPdfToCanvas = () => {
    if (!pdfImage) return;
    // PDF base size = (VIEWPORT_W - 100) × (VIEWPORT_H - 100) at scale=1
    const basePdfW = canvasViewport.w - 100;
    const basePdfH = canvasViewport.h - 100;
    // เป้าหมาย: ให้ PDF พอดี ~80% ของ canvas
    const targetW = canvasViewport.w * 0.85;
    const targetH = canvasViewport.h * 0.85;
    const scaleW = targetW / basePdfW;
    const scaleH = targetH / basePdfH;
    const newScale = Math.min(scaleW, scaleH);
    setPdfScale(newScale);
    // จัดกลาง
    const newPdfDisplayW = basePdfW * newScale;
    const newPdfDisplayH = basePdfH * newScale;
    setPdfX((canvasViewport.w - newPdfDisplayW) / 2);
    setPdfY((canvasViewport.h - newPdfDisplayH) / 2);
  };

  const startCalibrate = () => {
    setCalibrating(true);
    setCalibPoints([]);
    setCalibInputDistance('');
  };

  const cancelCalibrate = () => {
    setCalibrating(false);
    setCalibPoints([]);
  };

  const applyCalibration = () => {
    if (calibPoints.length !== 2 || !calibInputDistance) return;
    const realDistanceM = parseFloat(calibInputDistance);
    if (!realDistanceM || realDistanceM <= 0) return;

    // ระยะ pixel ระหว่าง 2 จุดบนหน้าจอ (svg coords)
    const dx = calibPoints[1].x - calibPoints[0].x;
    const dy = calibPoints[1].y - calibPoints[0].y;
    const pixelDist = Math.hypot(dx, dy);

    // คำนวณ baseScale ปัจจุบันของ canvas (px ต่อ 1 ม. จริง)
    // ใช้สูตรเดียวกับ PlanCanvasV2: Math.min((W-160)/gridW, (H-160)/gridH) * zoom
    const baseScale = Math.min(
      (canvasViewport.w - 160) / Math.max(grid.width, 1),
      (canvasViewport.h - 160) / Math.max(grid.height, 1)
    ) * zoom;

    // เป้าหมาย: ระยะ realDistanceM ม. ต้องแสดงเป็น (realDistanceM × baseScale) px
    const targetPixelDist = realDistanceM * baseScale;
    const newScale = pdfScale * (targetPixelDist / pixelDist);
    setPdfScale(newScale);
    // 💾 เก็บค่า scale จริง: 1 ม. = baseScale px (หลัง calibrate ตรงกับ canvas แล้ว)
    setPdfPxPerMeter(baseScale);
    setCalibrating(false);
    setCalibPoints([]);
    setCalibInputDistance('');

    // 🚨 ตรวจสอบว่าระยะ Calibrate เกิน Grid ไหม
    // ถ้าเกิน → แจ้งเตือน + เก็บค่าไว้ให้ผู้ใช้กด "ปรับ Grid อัตโนมัติ"
    if (realDistanceM > grid.width || realDistanceM > grid.height) {
      setCalibSuggestion({
        realDist: realDistanceM,
        gridW: grid.width,
        gridH: grid.height,
      });
    } else {
      setCalibSuggestion(null);
    }
  };

  // ===== Calibration suggestion (when PDF > Grid) =====
  const [calibSuggestion, setCalibSuggestion] = useState(null);

  // ===== Auto-fit Grid: ขยาย Grid ให้ครอบคลุม PDF จริง =====
  const autoFitGridFromCalibration = () => {
    if (!calibSuggestion) return;
    const target = calibSuggestion.realDist;
    // เพิ่ม span ใน Grid X จนกว่ารวมจะ >= target (ใช้ span 4 ม. มาตรฐาน)
    const currentTotalX = gridX.reduce((s, v) => s + v, 0);
    if (target > currentTotalX) {
      const needed = target - currentTotalX;
      // เพิ่ม span ละ 4 ม. จนพอ (หรือใช้ span ขนาดส่วนต่างถ้าน้อยกว่า 4)
      const newGridX = [...gridX];
      let remaining = needed;
      while (remaining > 0.01) {
        const span = Math.min(4.0, remaining);
        newGridX.push(parseFloat(span.toFixed(2)));
        remaining -= span;
      }
      setGridX(newGridX);
    }
    setCalibSuggestion(null);
  };

  // ===== Pick Grid from PDF =====
  const startPickGrid = (axis) => {
    if (!pdfPxPerMeter) {
      alert('กรุณา Calibrate Scale ก่อนสร้าง Grid จาก PDF');
      return;
    }
    setPickingGrid(axis);
    setPickedPoints([]);
  };

  const cancelPickGrid = () => {
    setPickingGrid('off');
    setPickedPoints([]);
  };

  const removeLastPickedPoint = () => {
    setPickedPoints(prev => prev.slice(0, -1));
  };

  const applyPickedGrid = () => {
    if (pickedPoints.length < 2 || !pdfPxPerMeter) return;
    const axis = pickingGrid;
    const sorted = [...pickedPoints].sort((a, b) => axis === 'x' ? a.x - b.x : a.y - b.y);
    const spans = [];
    for (let i = 1; i < sorted.length; i++) {
      const dx = sorted[i].x - sorted[i - 1].x;
      const dy = sorted[i].y - sorted[i - 1].y;
      const pxDist = Math.hypot(dx, dy);
      const meters = pxDist / pdfPxPerMeter;
      spans.push(parseFloat(meters.toFixed(2)));
    }
    if (axis === 'x') setGridX(spans);
    else setGridY(spans);
    setPickingGrid('off');
    setPickedPoints([]);
  };

  const rotatePdf = (deg) => {
    setPdfRotation((pdfRotation + deg + 360) % 360);
  };

  const [pdfImage, setPdfImage] = useState(null);
  const [pdfWidth, setPdfWidth] = useState(0);
  const [pdfHeight, setPdfHeight] = useState(0);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState('');

  // Render PDF เป็นรูปภาพเมื่อ pdfFile เปลี่ยน
  React.useEffect(() => {
    if (!pdfFile) {
      setPdfImage(null);
      return;
    }
    setPdfLoading(true);
    setPdfError('');

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const typedArray = new Uint8Array(e.target.result);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        await page.render({ canvasContext: ctx, viewport }).promise;
        const imgData = canvas.toDataURL('image/png');
        setPdfImage(imgData);
        setPdfWidth(viewport.width);
        setPdfHeight(viewport.height);
        setPdfLoading(false);
      } catch (err) {
        console.error('PDF error:', err);
        setPdfError('ไม่สามารถโหลด PDF: ' + err.message);
        setPdfLoading(false);
      }
    };
    reader.onerror = () => {
      setPdfError('ไม่สามารถอ่านไฟล์');
      setPdfLoading(false);
    };
    reader.readAsArrayBuffer(pdfFile);
  }, [pdfFile]);

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      alert('กรุณาเลือกไฟล์ PDF เท่านั้น');
      return;
    }
    setPdfFile(file);
    setPdfFileName(file.name);
  };

  const removePdf = () => {
    setPdfFile(null);
    setPdfFileName('');
  };

  // ===== Load state =====
  const [loadPreset, setLoadPreset] = useState('residential');
  const [floorLoads, setFloorLoads] = useState({
    1: { DL: 250, LL: 200, wallLoad: 180 },
    2: { DL: 250, LL: 200, wallLoad: 180 },
    3: { DL: 200, LL: 100, wallLoad: 0 },
  });
  const [showTributary, setShowTributary] = useState(false);

  const updateFloorLoad = (floorId, field, value) => {
    setFloorLoads({
      ...floorLoads,
      [floorId]: { ...floorLoads[floorId], [field]: value }
    });
  };

  const applyLoadPreset = (preset) => {
    const presets = {
      residential: { DL: 250, LL: 200, wallLoad: 180 },
      office:      { DL: 280, LL: 250, wallLoad: 200 },
      retail:      { DL: 280, LL: 400, wallLoad: 200 },
      parking:     { DL: 250, LL: 250, wallLoad: 0 },
    };
    setLoadPreset(preset);
    const newLoads = {};
    floors.forEach(f => {
      newLoads[f.id] = f.type === 'roof'
        ? { DL: 200, LL: 100, wallLoad: 0 }
        : presets[preset];
    });
    setFloorLoads(newLoads);
  };
  
  // ===== Computed: Grid lines & Nodes =====
  const grid = useMemo(() => {
    const xLines = [];
    let xPos = -cantileverLeft;
    if (cantileverLeft > 0) xLines.push({ label: 'A0', pos: xPos, isCantilever: true });
    xPos = 0;
    xLines.push({ label: 'A', pos: xPos, isCantilever: false });
    for (let i = 0; i < gridX.length; i++) {
      xPos += gridX[i];
      xLines.push({ label: String.fromCharCode(66 + i), pos: xPos, isCantilever: false });
    }
    if (cantileverRight > 0) {
      xPos += cantileverRight;
      xLines.push({ label: String.fromCharCode(65 + gridX.length + 1) + "'", pos: xPos, isCantilever: true });
    }

    const yLines = [];
    let yPos = -cantileverTop;
    if (cantileverTop > 0) yLines.push({ label: '0', pos: yPos, isCantilever: true });
    yPos = 0;
    yLines.push({ label: '1', pos: yPos, isCantilever: false });
    for (let i = 0; i < gridY.length; i++) {
      yPos += gridY[i];
      yLines.push({ label: String(2 + i), pos: yPos, isCantilever: false });
    }
    if (cantileverBottom > 0) {
      yPos += cantileverBottom;
      yLines.push({ label: String(2 + gridY.length) + "'", pos: yPos, isCantilever: true });
    }

    const nodes = [];
    for (const xL of xLines) {
      for (const yL of yLines) {
        nodes.push({
          id: `${xL.label}${yL.label}`,
          x: xL.pos,
          y: yL.pos,
          gridX: xL.label,
          gridY: yL.label,
          isCantilever: xL.isCantilever || yL.isCantilever,
        });
      }
    }

    const minX = xLines[0].pos;
    const maxX = xLines[xLines.length - 1].pos;
    const minY = yLines[0].pos;
    const maxY = yLines[yLines.length - 1].pos;
    const width = maxX - minX;
    const height = maxY - minY;

    return { xLines, yLines, nodes, minX, maxX, minY, maxY, width, height };
  }, [gridX, gridY, cantileverLeft, cantileverRight, cantileverTop, cantileverBottom]);

  // Helper: หา node จาก id
  const getNode = (id) => grid.nodes.find(n => n.id === id);

  // Current floor elements
  const currentElements = elements[activeFloor] || { columns: [], beams: [], slabs: [] };

  // ===== Element manipulation =====
  const placeColumn = (nodeId) => {
    const exists = currentElements.columns.find(c => c.nodeId === nodeId);
    if (exists) return;
    const newCol = {
      id: `C-${activeFloor}-${Date.now()}`,
      nodeId,
      b: columnSize.b,
      h: columnSize.h,
      label: columnSize.label,
    };
    setElements({
      ...elements,
      [activeFloor]: {
        ...currentElements,
        columns: [...currentElements.columns, newCol],
      },
    });
  };

  const placeBeam = (startId, endId) => {
    if (startId === endId) return;
    const exists = currentElements.beams.find(b =>
      (b.startId === startId && b.endId === endId) ||
      (b.startId === endId && b.endId === startId)
    );
    if (exists) return;
    const newBeam = {
      id: `B-${activeFloor}-${Date.now()}`,
      startId,
      endId,
      b: beamSize.b,
      h: beamSize.h,
      label: beamSize.label,
    };
    setElements({
      ...elements,
      [activeFloor]: {
        ...currentElements,
        beams: [...currentElements.beams, newBeam],
      },
    });
  };

  const placeSlab = (nodeIds) => {
    if (nodeIds.length < 3) return;
    const newSlab = {
      id: `S-${activeFloor}-${Date.now()}`,
      nodeIds,
      thickness: slabThickness,
    };
    setElements({
      ...elements,
      [activeFloor]: {
        ...currentElements,
        slabs: [...currentElements.slabs, newSlab],
      },
    });
  };

  const deleteElement = (type, id) => {
    setElements({
      ...elements,
      [activeFloor]: {
        ...currentElements,
        [type]: currentElements[type].filter(e => e.id !== id),
      },
    });
  };

  // ===== Click handler =====
  // ===== Add grid line from canvas click =====
  const addGridLineAt = (worldX, worldY, axis) => {
    if (axis === 'x') {
      // หาตำแหน่ง X ในระบบพิกัด (เลขจริง)
      const existing = grid.xLines.map(l => l.pos).filter(p => !grid.xLines.find(l => l.pos === p)?.isCantilever);
      const newPos = worldX;

      // ตรวจซ้อน (ห่างน้อยกว่า 0.3 ม. = ถือว่าซ้อน)
      const tooClose = existing.some(p => Math.abs(p - newPos) < 0.3);
      if (tooClose) {
        alert('ตำแหน่งใกล้กับ grid line เดิมเกินไป (น้อยกว่า 0.3 ม.)');
        return;
      }

      // เก็บ position ทั้งหมดรวม pos ใหม่ → sort → คำนวณ span ใหม่
      const allPos = [0, ...gridX.reduce((acc, span, i) => {
        const last = acc.length ? acc[acc.length - 1] : 0;
        acc.push(last + span);
        return acc;
      }, []), newPos].sort((a, b) => a - b);

      // กรองค่าซ้ำ
      const uniquePos = [...new Set(allPos.map(p => p.toFixed(3)))].map(parseFloat);

      // คำนวณ span ใหม่
      const newGridX = [];
      for (let i = 1; i < uniquePos.length; i++) {
        newGridX.push(parseFloat((uniquePos[i] - uniquePos[i - 1]).toFixed(3)));
      }
      setGridX(newGridX);
    } else {
      const existing = grid.yLines.map(l => l.pos).filter(p => !grid.yLines.find(l => l.pos === p)?.isCantilever);
      const newPos = worldY;

      const tooClose = existing.some(p => Math.abs(p - newPos) < 0.3);
      if (tooClose) {
        alert('ตำแหน่งใกล้กับ grid line เดิมเกินไป (น้อยกว่า 0.3 ม.)');
        return;
      }

      const allPos = [0, ...gridY.reduce((acc, span, i) => {
        const last = acc.length ? acc[acc.length - 1] : 0;
        acc.push(last + span);
        return acc;
      }, []), newPos].sort((a, b) => a - b);

      const uniquePos = [...new Set(allPos.map(p => p.toFixed(3)))].map(parseFloat);

      const newGridY = [];
      for (let i = 1; i < uniquePos.length; i++) {
        newGridY.push(parseFloat((uniquePos[i] - uniquePos[i - 1]).toFixed(3)));
      }
      setGridY(newGridY);
    }
  };
  const handleNodeClick = (node) => {
    if (tool === 'column') {
      placeColumn(node.id);
    } else if (tool === 'beam') {
      if (!beamStart) {
        setBeamStart(node.id);
      } else {
        placeBeam(beamStart, node.id);
        setBeamStart(null);
      }
    } else if (tool === 'slab') {
      const newPoints = [...slabPoints, node.id];
      // ถ้าคลิกซ้ำกับจุดแรก = ปิด polygon
      if (newPoints.length >= 3 && node.id === slabPoints[0]) {
        placeSlab(slabPoints);
        setSlabPoints([]);
      } else {
        setSlabPoints(newPoints);
      }
    } else if (tool === 'select') {
      setSelectedElement({ type: 'node', data: node });
    }
  };

  // กด ESC = cancel
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setBeamStart(null);
        setSlabPoints([]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // เมื่อเปลี่ยน tool ให้รีเซ็ต drawing state
  React.useEffect(() => {
    setBeamStart(null);
    setSlabPoints([]);
  }, [tool, activeFloor]);

  // ===== Grid manipulation =====
  const addGridX = () => setGridX([...gridX, 4.0]);
  const removeGridX = (i) => setGridX(gridX.filter((_, idx) => idx !== i));
  const updateGridX = (i, val) => {
    const newGrid = [...gridX];
    newGrid[i] = val;
    setGridX(newGrid);
  };
  const addGridY = () => setGridY([...gridY, 4.0]);
  const removeGridY = (i) => setGridY(gridY.filter((_, idx) => idx !== i));
  const updateGridY = (i, val) => {
    const newGrid = [...gridY];
    newGrid[i] = val;
    setGridY(newGrid);
  };

  // ===== Floor management =====
  const addFloor = () => {
    const newId = Math.max(...floors.map(f => f.id)) + 1;
    const newFloors = [...floors];
    const roofIdx = newFloors.findIndex(f => f.type === 'roof');
    const insertAt = roofIdx >= 0 ? roofIdx : newFloors.length;
    newFloors.splice(insertAt, 0, {
      id: newId,
      name: `ชั้น ${insertAt + 1}`,
      height: 3.0,
      type: 'typical',
    });
    setFloors(newFloors);
    setElements({
      ...elements,
      [newId]: { columns: [], beams: [], slabs: [] },
    });
  };

  const removeFloor = (id) => {
    if (floors.length <= 1) return;
    setFloors(floors.filter(f => f.id !== id));
    if (activeFloor === id) setActiveFloor(floors[0].id);
    const { [id]: _, ...restElements } = elements;
    setElements(restElements);
  };

  const updateFloorHeight = (id, h) => {
    setFloors(floors.map(f => f.id === id ? { ...f, height: h } : f));
  };
  const updateFloorName = (id, name) => {
    setFloors(floors.map(f => f.id === id ? { ...f, name } : f));
  };

  const totalHeight = floors.reduce((sum, f) => sum + f.height, 0);

  // ===== Statistics =====
  const totalColumns = Object.values(elements).reduce((s, e) => s + e.columns.length, 0);
  const totalBeams = Object.values(elements).reduce((s, e) => s + e.beams.length, 0);
  const totalSlabs = Object.values(elements).reduce((s, e) => s + e.slabs.length, 0);

  return (
    <div className="p-6 max-w-[1500px]">
      <PageHeader code="7.1" title="ออกแบบอาคาร · Phase 2A" subtitle="Drag-and-drop · Snap to Node · เสา / คาน / พื้น" />

      {/* Project header */}
      <div className="bg-gradient-to-br from-cyan-500/10 to-emerald-500/5 border border-cyan-500/30 rounded-xl p-4 mb-5">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-xs tracking-widest uppercase text-cyan-400 mb-1">โครงการ</div>
            <input type="text" value={projectName}
              onChange={e => setProjectName(e.target.value)}
              className="text-2xl font-bold text-white bg-transparent border-b border-slate-700 focus:border-cyan-500 focus:outline-none px-1"
            />
          </div>
          <div className="grid grid-cols-5 gap-5 text-center">
            <div>
              <div className="text-2xl font-bold text-cyan-300">{grid.nodes.length}</div>
              <div className="text-[10px] text-slate-500 tracking-widest uppercase">Nodes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-300">{floors.length}</div>
              <div className="text-[10px] text-slate-500 tracking-widest uppercase">ชั้น</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-300">{totalColumns}</div>
              <div className="text-[10px] text-slate-500 tracking-widest uppercase">เสา</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-rose-300">{totalBeams}</div>
              <div className="text-[10px] text-slate-500 tracking-widest uppercase">คาน</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-300">{totalSlabs}</div>
              <div className="text-[10px] text-slate-500 tracking-widest uppercase">พื้น</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* LEFT: Grid + Floors */}
        <div className="col-span-3 space-y-4">

          {/* Floors */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold flex items-center gap-2 text-sm">
                <span className="w-1 h-4 bg-cyan-400 rounded"></span>
                Floors
              </h3>
              <button onClick={addFloor}
                className="text-[10px] text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-2 py-1 rounded">
                + เพิ่ม
              </button>
            </div>
            <div className="space-y-1.5">
              {floors.map(f => (
                <div key={f.id}
                  className={`p-2 rounded border transition cursor-pointer ${
                    activeFloor === f.id
                      ? 'bg-cyan-500/10 border-cyan-500/40'
                      : 'bg-slate-800/30 border-slate-800 hover:border-slate-700'
                  }`}
                  onClick={() => setActiveFloor(f.id)}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {f.type === 'roof'
                        ? <Triangle className="w-3 h-3 text-amber-400 flex-shrink-0" />
                        : <span className="w-3 h-3 rounded-sm bg-cyan-400 flex-shrink-0"></span>
                      }
                      <input type="text" value={f.name}
                        onChange={e => updateFloorName(f.id, e.target.value)}
                        onClick={e => e.stopPropagation()}
                        className="text-xs text-white bg-transparent w-full focus:outline-none"
                      />
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {(elements[f.id]?.columns.length || 0)}C · {(elements[f.id]?.beams.length || 0)}B · {(elements[f.id]?.slabs.length || 0)}S
                    </span>
                    {floors.length > 1 && (
                      <button onClick={(e) => { e.stopPropagation(); removeFloor(f.id); }}
                        className="text-slate-500 hover:text-rose-400 text-xs">✕</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grid X */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold flex items-center gap-2 text-sm">
                <span className="w-1 h-4 bg-amber-400 rounded"></span>
                Grid X
              </h3>
              <button onClick={addGridX}
                className="text-[10px] text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-1 rounded">
                + Span
              </button>
            </div>
            <div className="space-y-1.5">
              {gridX.map((val, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 w-10 font-mono">
                    {String.fromCharCode(65 + i)}-{String.fromCharCode(66 + i)}
                  </span>
                  <input type="number" value={val} step={0.5}
                    onChange={e => updateGridX(i, parseFloat(e.target.value) || 0)}
                    className="flex-1 bg-slate-800/60 border border-slate-700 rounded px-1.5 py-1 text-right text-xs font-mono text-amber-300 focus:outline-none focus:border-amber-500/50"
                  />
                  <span className="text-[10px] text-slate-500 w-5">ม.</span>
                  {gridX.length > 1 && (
                    <button onClick={() => removeGridX(i)}
                      className="text-slate-500 hover:text-rose-400 text-xs px-0.5">✕</button>
                  )}
                </div>
              ))}
            </div>
            <details className="mt-2">
              <summary className="text-[10px] text-slate-500 cursor-pointer">Cantilever ทิศ X</summary>
              <div className="space-y-1.5 mt-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 w-10">ซ้าย</span>
                  <input type="number" value={cantileverLeft} step={0.5}
                    onChange={e => setCantileverLeft(parseFloat(e.target.value) || 0)}
                    className="flex-1 bg-slate-800/60 border border-slate-700 rounded px-1.5 py-0.5 text-right text-xs font-mono text-rose-300"
                  />
                  <span className="text-[10px] text-slate-500 w-5">ม.</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 w-10">ขวา</span>
                  <input type="number" value={cantileverRight} step={0.5}
                    onChange={e => setCantileverRight(parseFloat(e.target.value) || 0)}
                    className="flex-1 bg-slate-800/60 border border-slate-700 rounded px-1.5 py-0.5 text-right text-xs font-mono text-rose-300"
                  />
                  <span className="text-[10px] text-slate-500 w-5">ม.</span>
                </div>
              </div>
            </details>
          </div>

          {/* Grid Y */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold flex items-center gap-2 text-sm">
                <span className="w-1 h-4 bg-emerald-400 rounded"></span>
                Grid Y
              </h3>
              <button onClick={addGridY}
                className="text-[10px] text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-2 py-1 rounded">
                + Span
              </button>
            </div>
            <div className="space-y-1.5">
              {gridY.map((val, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 w-10 font-mono">{i + 1}-{i + 2}</span>
                  <input type="number" value={val} step={0.5}
                    onChange={e => updateGridY(i, parseFloat(e.target.value) || 0)}
                    className="flex-1 bg-slate-800/60 border border-slate-700 rounded px-1.5 py-1 text-right text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500/50"
                  />
                  <span className="text-[10px] text-slate-500 w-5">ม.</span>
                  {gridY.length > 1 && (
                    <button onClick={() => removeGridY(i)}
                      className="text-slate-500 hover:text-rose-400 text-xs px-0.5">✕</button>
                  )}
                </div>
              ))}
            </div>
            <details className="mt-2">
              <summary className="text-[10px] text-slate-500 cursor-pointer">Cantilever ทิศ Y</summary>
              <div className="space-y-1.5 mt-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 w-10">บน</span>
                  <input type="number" value={cantileverTop} step={0.5}
                    onChange={e => setCantileverTop(parseFloat(e.target.value) || 0)}
                    className="flex-1 bg-slate-800/60 border border-slate-700 rounded px-1.5 py-0.5 text-right text-xs font-mono text-rose-300"
                  />
                  <span className="text-[10px] text-slate-500 w-5">ม.</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 w-10">ล่าง</span>
                  <input type="number" value={cantileverBottom} step={0.5}
                    onChange={e => setCantileverBottom(parseFloat(e.target.value) || 0)}
                    className="flex-1 bg-slate-800/60 border border-slate-700 rounded px-1.5 py-0.5 text-right text-xs font-mono text-rose-300"
                  />
                  <span className="text-[10px] text-slate-500 w-5">ม.</span>
                </div>
              </div>
            </details>
          </div>

          {/* View options */}
          {/* PDF Underlay Panel */}
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
            <h3 className="text-purple-300 font-semibold mb-3 flex items-center gap-2 text-sm">
              <span className="w-1 h-4 bg-purple-400 rounded"></span>
              📄 PDF Underlay
            </h3>

            {!pdfFile ? (
              <div>
                <label className="block">
                  <input type="file" accept="application/pdf"
                    onChange={handlePdfUpload}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-purple-500/40 rounded-lg p-4 text-center cursor-pointer hover:bg-purple-500/5 hover:border-purple-500/60 transition">
                    <div className="text-2xl mb-1">📤</div>
                    <div className="text-xs text-purple-300 font-semibold">อัปโหลด PDF</div>
                    <div className="text-[10px] text-slate-500 mt-1">คลิกเพื่อเลือกไฟล์</div>
                  </div>
                </label>
              </div>
            ) : (
              <div>
                <div className="bg-slate-800/40 border border-slate-700 rounded p-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📄</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-white truncate">{pdfFileName}</div>
                      <div className="text-[10px] text-slate-500">
                        {pdfFile && (pdfFile.size / 1024).toFixed(0)} KB
                      </div>
                    </div>
                    <button onClick={removePdf}
                      className="text-rose-400 hover:text-rose-300 text-xs">✕</button>
                  </div>
                </div>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer mb-2">
                  <input type="checkbox" checked={pdfVisible}
                    onChange={e => setPdfVisible(e.target.checked)}
                    className="accent-purple-500" />
                  แสดง PDF
                </label>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-slate-500">ความโปร่งใส</span>
                    <span className="text-[10px] text-purple-300 font-mono">{pdfOpacity}%</span>
                  </div>
                  <input type="range" min="10" max="100" step="5"
                    value={pdfOpacity}
                    onChange={e => setPdfOpacity(parseInt(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>

                <div className="mt-2 pt-2 border-t border-slate-800">
                  <div className="text-[10px] text-slate-500">
                    ⏳ Patch 2C-2: แสดง PDF บน canvas
                    {pdfLoading && (
                    <div className="text-[10px] text-amber-300 flex items-center gap-1">
                      <span className="animate-spin">⏳</span> กำลังโหลด PDF...
                    </div>
                  )}
                  {pdfError && (
                    <div className="text-[10px] text-rose-400">
                      ❌ {pdfError}
                    </div>
                  )}
                  {pdfImage && !pdfLoading && (
                    <div className="text-[10px] text-emerald-300">
                      {/* PDF Transform Controls */}
                  <div className="mt-3 pt-3 border-t border-slate-800 space-y-2">
                    <div className="text-[10px] tracking-widest uppercase text-purple-400">PDF Transform</div>

                    {/* Fit to Canvas - ⭐ ปุ่มเด่น */}
                    <button onClick={fitPdfToCanvas}
                      className="w-full bg-gradient-to-r from-cyan-500/30 to-emerald-500/30 border border-cyan-500/50 hover:from-cyan-500/40 hover:to-emerald-500/40 rounded px-2 py-2 text-xs text-cyan-100 font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/10">
                      📐 Fit PDF ให้พอดี Canvas
                    </button>

                    {/* 🚨 Calibration Suggestion: PDF > Grid */}
                    {calibSuggestion && (
                      <div className="bg-amber-500/10 border border-amber-500/50 rounded p-2 space-y-1.5">
                        <div className="text-[10px] text-amber-300 font-bold flex items-center gap-1">
                          ⚠️ ระยะ PDF ใหญ่กว่า Grid
                        </div>
                        <div className="text-[10px] text-slate-300 leading-relaxed">
                          PDF: <span className="font-mono text-amber-200">{calibSuggestion.realDist.toFixed(2)} ม.</span>
                          {' / '}
                          Grid: <span className="font-mono text-cyan-200">{calibSuggestion.gridW.toFixed(2)} × {calibSuggestion.gridH.toFixed(2)} ม.</span>
                        </div>
                        <button onClick={autoFitGridFromCalibration}
                          className="w-full bg-amber-500/30 border border-amber-500/60 hover:bg-amber-500/40 rounded px-2 py-1.5 text-[10px] text-amber-100 font-bold">
                          🔧 ขยาย Grid อัตโนมัติให้ครอบคลุม PDF
                        </button>
                        <button onClick={() => setCalibSuggestion(null)}
                          className="w-full bg-slate-700/40 hover:bg-slate-700/60 rounded px-2 py-0.5 text-[9px] text-slate-400">
                          ปิดข้อความ
                        </button>
                      </div>
                    )}

                    {/* Calibrate */}
                    {!calibrating ? (
                      <button onClick={startCalibrate}
                        className="w-full bg-purple-500/20 border border-purple-500/40 hover:bg-purple-500/30 rounded px-2 py-1.5 text-xs text-purple-200 font-semibold flex items-center justify-center gap-1.5">
                        📏 Calibrate Scale
                      </button>
                    ) : (
                      <div className="bg-amber-500/10 border border-amber-500/40 rounded p-2">
                        <div className="text-[10px] text-amber-300 font-semibold mb-1.5">
                          🎯 Calibrate Mode
                        </div>
                        <div className="text-[10px] text-slate-400 mb-2">
                          {calibPoints.length === 0 && 'คลิกจุดที่ 1 บน PDF'}
                          {calibPoints.length === 1 && 'คลิกจุดที่ 2 บน PDF'}
                          {calibPoints.length === 2 && (
                            <div className="space-y-1.5">
                              <div className="text-emerald-300">✓ คลิกครบ 2 จุดแล้ว</div>
                              <div className="flex items-center gap-1">
                                <span className="text-slate-300">ระยะจริง</span>
                                <input type="number" value={calibInputDistance}
                                  onChange={e => setCalibInputDistance(e.target.value)}
                                  step={0.01} placeholder="1.50"
                                  className="flex-1 w-12 bg-slate-800/60 border border-slate-700 rounded px-1.5 py-0.5 text-right text-xs font-mono text-amber-300 focus:outline-none focus:border-amber-500/50"
                                />
                                <span className="text-slate-300">ม.</span>
                              </div>
                              <button onClick={applyCalibration}
                                disabled={!calibInputDistance}
                                className="w-full bg-emerald-500/20 border border-emerald-500/40 hover:bg-emerald-500/30 disabled:opacity-40 disabled:cursor-not-allowed rounded px-2 py-1 text-[10px] text-emerald-200 font-semibold">
                                ✓ ใช้ค่าที่ใส่
                              </button>
                            </div>
                          )}
                        </div>
                        <button onClick={cancelCalibrate}
                          className="w-full bg-slate-700/40 hover:bg-slate-700/60 rounded px-2 py-1 text-[10px] text-slate-300">
                          ✕ ยกเลิก
                        </button>
                      </div>
                    )}

                    {/* 🎯 Pick Grid from PDF */}
                    <div className="bg-cyan-500/5 border border-cyan-500/30 rounded p-2 space-y-2">
                      <div className="text-[10px] tracking-widest uppercase text-cyan-300 flex items-center gap-1">
                        🎯 สร้าง Grid จาก PDF
                      </div>
                      {!pdfPxPerMeter && (
                        <div className="text-[9px] text-amber-300 leading-relaxed">
                          ⚠️ ต้อง Calibrate Scale ก่อน
                        </div>
                      )}
                      {pdfPxPerMeter && pickingGrid === 'off' && (
                        <>
                          <div className="text-[9px] text-slate-400">
                            คลิก node เสาบน PDF ตามลำดับ → สร้าง Grid อัตโนมัติ
                          </div>
                          <div className="grid grid-cols-2 gap-1.5">
                            <button onClick={() => startPickGrid('x')}
                              className="bg-cyan-500/20 border border-cyan-500/40 hover:bg-cyan-500/30 rounded px-2 py-1.5 text-[10px] text-cyan-200 font-bold">
                              📍 Pick Grid X
                            </button>
                            <button onClick={() => startPickGrid('y')}
                              className="bg-emerald-500/20 border border-emerald-500/40 hover:bg-emerald-500/30 rounded px-2 py-1.5 text-[10px] text-emerald-200 font-bold">
                              📍 Pick Grid Y
                            </button>
                          </div>
                        </>
                      )}
                      {pickingGrid !== 'off' && (
                        <div className={`${pickingGrid === 'x' ? 'bg-cyan-500/10 border-cyan-500/50' : 'bg-emerald-500/10 border-emerald-500/50'} border rounded p-2 space-y-1.5`}>
                          <div className={`text-[10px] font-bold ${pickingGrid === 'x' ? 'text-cyan-300' : 'text-emerald-300'}`}>
                            🎯 กำลังเลือก Grid {pickingGrid.toUpperCase()}
                          </div>
                          <div className="text-[10px] text-slate-300">
                            คลิกแล้ว: <span className="font-mono font-bold">{pickedPoints.length}</span> จุด
                            {pickedPoints.length >= 2 && (
                              <span className="text-slate-500"> · จะได้ {pickedPoints.length - 1} span</span>
                            )}
                          </div>
                          <div className="text-[9px] text-slate-400">
                            {pickingGrid === 'x' ? 'คลิกเสาตามแนว X (ซ้าย→ขวา): A, B, C...' : 'คลิกเสาตามแนว Y (บน→ล่าง): 1, 2, 3...'}
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <button onClick={removeLastPickedPoint}
                              disabled={pickedPoints.length === 0}
                              className="bg-slate-700/40 hover:bg-slate-700/60 disabled:opacity-30 disabled:cursor-not-allowed rounded px-2 py-1 text-[9px] text-slate-300">
                              ↶ ลบจุดล่าสุด
                            </button>
                            <button onClick={cancelPickGrid}
                              className="bg-rose-500/20 hover:bg-rose-500/30 rounded px-2 py-1 text-[9px] text-rose-300">
                              ✕ ยกเลิก
                            </button>
                          </div>
                          <button onClick={applyPickedGrid}
                            disabled={pickedPoints.length < 2}
                            className="w-full bg-emerald-500/30 border border-emerald-500/50 hover:bg-emerald-500/40 disabled:opacity-30 disabled:cursor-not-allowed rounded px-2 py-1.5 text-[10px] text-emerald-100 font-bold">
                            ✓ สร้าง Grid {pickingGrid.toUpperCase()} ({pickedPoints.length >= 2 ? pickedPoints.length - 1 : 0} span)
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Rotate */}
                    <div>
                      <div className="text-[10px] text-slate-500 mb-1">หมุน: {pdfRotation}°</div>
                      <div className="grid grid-cols-4 gap-1">
                        <button onClick={() => rotatePdf(-90)}
                          className="bg-slate-800/60 hover:bg-slate-700 rounded px-2 py-1 text-[10px] text-slate-300">↺ 90°</button>
                        <button onClick={() => rotatePdf(90)}
                          className="bg-slate-800/60 hover:bg-slate-700 rounded px-2 py-1 text-[10px] text-slate-300">↻ 90°</button>
                        <button onClick={() => rotatePdf(180)}
                          className="bg-slate-800/60 hover:bg-slate-700 rounded px-2 py-1 text-[10px] text-slate-300">↻ 180°</button>
                        <button onClick={resetPdfTransform}
                          className="bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 rounded px-2 py-1 text-[10px] text-rose-300">Reset</button>
                      </div>
                    </div>

                    {/* Scale display */}
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-500">Scale:</span>
                      <span className="font-mono text-purple-300">{(pdfScale * 100).toFixed(0)}%</span>
                    </div>

                    {/* Manual scale buttons */}
                    <div className="grid grid-cols-3 gap-1">
                      <button onClick={() => setPdfScale(pdfScale * 0.9)}
                        className="bg-slate-800/60 hover:bg-slate-700 rounded px-2 py-0.5 text-[10px] text-slate-300">− 10%</button>
                      <button onClick={() => setPdfScale(1)}
                        className="bg-slate-800/60 hover:bg-slate-700 rounded px-2 py-0.5 text-[10px] text-slate-300">100%</button>
                      <button onClick={() => setPdfScale(pdfScale * 1.1)}
                        className="bg-slate-800/60 hover:bg-slate-700 rounded px-2 py-0.5 text-[10px] text-slate-300">+ 10%</button>
                    </div>

                    <div className="text-[10px] text-slate-500 italic">
                      💡 ลาก PDF บน canvas เพื่อย้าย
                    </div>
                  </div>  
                      ✓ PDF พร้อมใช้งาน · {pdfWidth}×{pdfHeight}px
                    </div>
                  )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-2 flex items-center gap-2 text-sm">
              <span className="w-1 h-4 bg-rose-400 rounded"></span>
              View
            </h3>
            <div className="space-y-1.5 text-xs">
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input type="checkbox" checked={showLabels} onChange={e => setShowLabels(e.target.checked)}
                  className="accent-cyan-500" />
                Grid labels
              </label>
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input type="checkbox" checked={showDimensions} onChange={e => setShowDimensions(e.target.checked)}
                  className="accent-cyan-500" />
                Dimensions
              </label>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-1.5">
                <button onClick={() => setZoom(Math.max(0.1, zoom - 0.2))}
                  className="px-2 py-0.5 bg-slate-800 rounded text-xs">−</button>
                <span className="flex-1 text-center text-xs font-mono text-cyan-300">
                  {(zoom * 100).toFixed(0)}%
                </span>
                <button onClick={() => setZoom(Math.min(5.0, zoom + 0.2))}
                  className="px-2 py-0.5 bg-slate-800 rounded text-xs">+</button>
                <button onClick={() => { setZoom(1); setPan({x: 0, y: 0}); }}
                  className="px-1.5 py-0.5 bg-slate-800 rounded text-[10px]">รีเซ็ต</button>
              </div>
              <div className="text-[9px] text-slate-500 mt-1 text-center">
                Ctrl+Scroll เพื่อ zoom · 10%–500%
              </div>
            </div>
          </div>
        </div>

        {/* CENTER: Canvas */}
        <div className="col-span-7 space-y-4">

          {/* Toolbar */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              <ToolButton tool={tool} setTool={setTool} value="select" icon={<MousePointer2 className="w-4 h-4" />} label="เลือก" hotkey="V" />
              <ToolButton tool={tool} setTool={setTool} value="column" icon={<Box className="w-4 h-4" />} label="เสา" hotkey="C" color="amber" />
              <ToolButton tool={tool} setTool={setTool} value="beam" icon={<MoveHorizontal className="w-4 h-4" />} label="คาน" hotkey="B" color="rose" />
              <ToolButton tool={tool} setTool={setTool} value="slab" icon={<Square className="w-4 h-4" />} label="พื้น" hotkey="S" color="purple" />

              <div className="w-px h-6 bg-slate-700 mx-1"></div>

              <ToolButton tool={tool} setTool={setTool} value="gridX"
                icon={<span className="text-xs font-bold">↔</span>}
                label="+ Grid X" hotkey="X" color="amber" />
              <ToolButton tool={tool} setTool={setTool} value="gridY"
                icon={<span className="text-xs font-bold">↕</span>}
                label="+ Grid Y" hotkey="Y" color="emerald" />
              <div className="w-px h-6 bg-slate-700 mx-2"></div>

              <button onClick={() => {
                setElements({
                  ...elements,
                  [activeFloor]: { columns: [], beams: [], slabs: [] }
                });
              }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs text-rose-300 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20">
                <Trash2 className="w-3.5 h-3.5" /> ล้างชั้นนี้
              </button>

              <div className="ml-auto text-xs text-slate-500">
                {tool === 'beam' && beamStart && (
                  <span className="text-amber-300">📍 เลือกจุดที่ 2 · ESC เพื่อยกเลิก</span>
                )}
                {tool === 'slab' && slabPoints.length > 0 && (
                  <span className="text-purple-300">📍 {slabPoints.length} จุด · คลิกจุดแรกเพื่อปิด · ESC ยกเลิก</span>
                )}
                {tool === 'select' && (
                  <span>คลิกเพื่อเลือก · F8 = Ortho (Step 2B)</span>
                )}
                {tool === 'gridX' && (
                  <span className="text-amber-300">📍 คลิกบน canvas เพื่อสร้าง Grid X ใหม่</span>
                )}
                {tool === 'gridY' && (
                  <span className="text-emerald-300">📍 คลิกบน canvas เพื่อสร้าง Grid Y ใหม่</span>
                )}
              </div>
            </div>

            {/* Tool options */}
            {tool === 'column' && (
              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-500">ขนาดเสา:</span>
                {['0.20×0.20', '0.25×0.25', '0.30×0.30', '0.40×0.40', '0.50×0.50'].map(s => {
                  const [b, h] = s.split('×').map(parseFloat);
                  return (
                    <button key={s} onClick={() => setColumnSize({ b, h, label: s })}
                      className={`px-2 py-1 rounded text-xs font-mono border ${
                        columnSize.label === s
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                          : 'bg-slate-800/40 text-slate-400 border-slate-700'
                      }`}>{s}</button>
                  );
                })}
                <input type="number" placeholder="b" step={0.05}
                  value={columnSize.b}
                  onChange={e => {
                    const b = parseFloat(e.target.value) || 0.3;
                    setColumnSize({ b, h: columnSize.h, label: `${b.toFixed(2)}×${columnSize.h.toFixed(2)}` });
                  }}
                  className="w-16 bg-slate-800/60 border border-slate-700 rounded px-1.5 py-1 text-right text-xs font-mono text-amber-300"
                />
                <span className="text-xs text-slate-500">×</span>
                <input type="number" placeholder="h" step={0.05}
                  value={columnSize.h}
                  onChange={e => {
                    const h = parseFloat(e.target.value) || 0.3;
                    setColumnSize({ b: columnSize.b, h, label: `${columnSize.b.toFixed(2)}×${h.toFixed(2)}` });
                  }}
                  className="w-16 bg-slate-800/60 border border-slate-700 rounded px-1.5 py-1 text-right text-xs font-mono text-amber-300"
                />
              </div>
            )}

            {tool === 'beam' && (
              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-500">ขนาดคาน:</span>
                {['0.20×0.40', '0.20×0.50', '0.25×0.50', '0.30×0.50', '0.30×0.60'].map(s => {
                  const [b, h] = s.split('×').map(parseFloat);
                  return (
                    <button key={s} onClick={() => setBeamSize({ b, h, label: s })}
                      className={`px-2 py-1 rounded text-xs font-mono border ${
                        beamSize.label === s
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                          : 'bg-slate-800/40 text-slate-400 border-slate-700'
                      }`}>{s}</button>
                  );
                })}
              </div>
            )}

            {tool === 'slab' && (
              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-500">ความหนาพื้น:</span>
                {[0.10, 0.12, 0.15, 0.20].map(t => (
                  <button key={t} onClick={() => setSlabThickness(t)}
                    className={`px-2 py-1 rounded text-xs font-mono border ${
                      slabThickness === t
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                        : 'bg-slate-800/40 text-slate-400 border-slate-700'
                    }`}>{(t * 100).toFixed(0)} ซม.</button>
                ))}
              </div>
            )}
            {tool === 'gridX' && (
              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2 flex-wrap">
                <span className="text-xs text-amber-300">↔ Grid X (แนวตั้ง):</span>
                <span className="text-xs text-slate-400">คลิกบน canvas → สร้าง grid line ที่ตำแหน่ง X ที่คลิก · Auto-rename A, B, C, D...</span>
                <button onClick={() => setTool('select')}
                  className="ml-auto px-2 py-1 rounded text-xs text-slate-300 bg-slate-700 hover:bg-slate-600">เสร็จแล้ว</button>
              </div>
            )}

            {tool === 'gridY' && (
              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2 flex-wrap">
                <span className="text-xs text-emerald-300">↕ Grid Y (แนวนอน):</span>
                <span className="text-xs text-slate-400">คลิกบน canvas → สร้าง grid line ที่ตำแหน่ง Y ที่คลิก · Auto-rename 1, 2, 3...</span>
                <button onClick={() => setTool('select')}
                  className="ml-auto px-2 py-1 rounded text-xs text-slate-300 bg-slate-700 hover:bg-slate-600">เสร็จแล้ว</button>
              </div>
            )}
          </div>

          {/* Floor tabs */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-2.5">
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-xs text-slate-500 tracking-widest uppercase mr-2 whitespace-nowrap">
                แปลน:
              </span>
              {floors.map(f => (
                <button key={f.id} onClick={() => setActiveFloor(f.id)}
                  className={`px-3 py-1.5 rounded text-xs transition border whitespace-nowrap ${
                    activeFloor === f.id
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                      : 'bg-slate-800/40 text-slate-400 border-slate-700 hover:border-slate-600'
                  }`}>
                  {f.type === 'roof' ? '🔺 ' : ''}{f.name}
                </button>
              ))}
            </div>
          </div>

          {/* Canvas */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-slate-800">
              <h3 className="text-white font-semibold flex items-center gap-2 text-sm">
                <span className="w-1 h-4 bg-cyan-400 rounded"></span>
                Plan · {floors.find(f => f.id === activeFloor)?.name}
              </h3>
              <div className="text-xs text-slate-500">
                {grid.width.toFixed(1)} × {grid.height.toFixed(1)} ม.
              </div>
            </div>

            <PlanCanvasV2
              grid={grid}
              zoom={zoom}
              pan={pan}
              setPan={setPan}
              setZoom={setZoom}
              setCanvasViewport={setCanvasViewport}
              showLabels={showLabels}
              showDimensions={showDimensions}
              tool={tool}
              elements={currentElements}
              hoveredNode={hoveredNode}
              setHoveredNode={setHoveredNode}
              beamStart={beamStart}
              slabPoints={slabPoints}
              onNodeClick={handleNodeClick}
              columnSize={columnSize}
              beamSize={beamSize}
              selectedElement={selectedElement}
              setSelectedElement={setSelectedElement}
              getNode={getNode}
              onDeleteElement={deleteElement}
              pdfImage={pdfImage}
              pdfVisible={pdfVisible}
              pdfOpacity={pdfOpacity}
              pdfX={pdfX}
              pdfY={pdfY}
              pdfScale={pdfScale}
              pdfRotation={pdfRotation}
              setPdfX={setPdfX}
              setPdfY={setPdfY}
              calibrating={calibrating}
              calibPoints={calibPoints}
              setCalibPoints={setCalibPoints}
              addGridLineAt={addGridLineAt}
              pickingGrid={pickingGrid}
              pickedPoints={pickedPoints}
              setPickedPoints={setPickedPoints}
            />
          </div>
        </div>

        {/* RIGHT: Element list */}
        <div className="col-span-2 space-y-4">

          {/* Active tool info */}
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-3">
            <div className="text-[10px] tracking-widest uppercase text-cyan-400 mb-1">เครื่องมือ</div>
            <div className="text-sm font-bold text-white capitalize mb-2">
              {tool === 'select' ? 'เลือก' : tool === 'column' ? 'วางเสา' : tool === 'beam' ? 'วาดคาน' : tool === 'slab' ? 'สร้างพื้น' : 'ลบ'}
            </div>
            <div className="text-[10px] text-slate-400">
              {tool === 'column' && '🟡 คลิก node เพื่อวางเสา'}
              {tool === 'beam' && '🔴 คลิก 2 node เพื่อวาดคาน'}
              {tool === 'slab' && '🟣 คลิก 3+ node เพื่อสร้างพื้น (คลิกจุดแรกอีกครั้งเพื่อปิด)'}
              {tool === 'select' && '👆 คลิก element เพื่อดู / ลบ'}
            </div>
          </div>

          {/* Elements list */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-3">
            <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-amber-400 rounded"></span>
              Elements (ชั้นนี้)
            </h3>

            {/* Columns */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-amber-300 font-semibold">เสา ({currentElements.columns.length})</span>
              </div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {currentElements.columns.length === 0 ? (
                  <div className="text-[10px] text-slate-500 italic px-2 py-1">ยังไม่มี</div>
                ) : currentElements.columns.map(c => (
                  <div key={c.id} className="flex items-center justify-between bg-amber-500/5 border border-amber-500/20 rounded px-2 py-1 text-xs">
                    <span className="text-amber-300 font-mono">{c.nodeId}</span>
                    <span className="text-slate-400 text-[10px]">{c.label}</span>
                    <button onClick={() => deleteElement('columns', c.id)}
                      className="text-rose-400 hover:text-rose-300 text-xs">✕</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Beams */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-rose-300 font-semibold">คาน ({currentElements.beams.length})</span>
              </div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {currentElements.beams.length === 0 ? (
                  <div className="text-[10px] text-slate-500 italic px-2 py-1">ยังไม่มี</div>
                ) : currentElements.beams.map(b => (
                  <div key={b.id} className="flex items-center justify-between bg-rose-500/5 border border-rose-500/20 rounded px-2 py-1 text-xs">
                    <span className="text-rose-300 font-mono">{b.startId}-{b.endId}</span>
                    <span className="text-slate-400 text-[10px]">{b.label}</span>
                    <button onClick={() => deleteElement('beams', b.id)}
                      className="text-rose-400 hover:text-rose-300 text-xs">✕</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Slabs */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-purple-300 font-semibold">พื้น ({currentElements.slabs.length})</span>
              </div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {currentElements.slabs.length === 0 ? (
                  <div className="text-[10px] text-slate-500 italic px-2 py-1">ยังไม่มี</div>
                ) : currentElements.slabs.map(s => (
                  <div key={s.id} className="flex items-center justify-between bg-purple-500/5 border border-purple-500/20 rounded px-2 py-1 text-xs">
                    <span className="text-purple-300 font-mono text-[10px]">{s.nodeIds.length}-pt</span>
                    <span className="text-slate-400 text-[10px]">{(s.thickness*100).toFixed(0)} ซม.</span>
                    <button onClick={() => deleteElement('slabs', s.id)}
                      className="text-rose-400 hover:text-rose-300 text-xs">✕</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hint */}
          <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-3 text-[10px] text-slate-400 leading-relaxed">
            <div className="text-cyan-300 font-semibold mb-1.5">💡 วิธีใช้</div>
            <div>1. เลือกเครื่องมือบน Toolbar</div>
            <div>2. ขยับ mouse ใกล้ node → snap จะทำงาน</div>
            <div>3. คลิก node เพื่อวาง/วาด</div>
            <div>4. กด ESC เพื่อยกเลิก</div>
            <div className="mt-2 text-amber-300">Step 2B: เพิ่ม Snap mid/perp + Ortho</div>
            <div className="text-emerald-300">Step 2C: PDF underlay + Calibrate</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   ToolButton component
   ================================================================ */
function ToolButton({ tool, setTool, value, icon, label, hotkey, color = 'cyan' }) {
  const active = tool === value;
  const colors = {
    cyan: active ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50' : 'bg-slate-800/40 text-slate-400 border-slate-700',
    amber: active ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' : 'bg-slate-800/40 text-slate-400 border-slate-700',
    rose: active ? 'bg-rose-500/20 text-rose-300 border-rose-500/50' : 'bg-slate-800/40 text-slate-400 border-slate-700',
    purple: active ? 'bg-purple-500/20 text-purple-300 border-purple-500/50' : 'bg-slate-800/40 text-slate-400 border-slate-700',
  };
  return (
    <button onClick={() => setTool(value)}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded border transition ${colors[color]} hover:border-slate-500`}>
      {icon}
      <span className="text-xs font-medium">{label}</span>
      {hotkey && <span className="text-[9px] text-slate-500 font-mono ml-1">[{hotkey}]</span>}
    </button>
  );
}

/* ================================================================
   PlanCanvasV2 — รองรับ snap, drag, click
   ================================================================ */
function PlanCanvasV2({
  grid, zoom, pan, setPan, setZoom, showLabels, showDimensions,
  tool, elements, hoveredNode, setHoveredNode,
  beamStart, slabPoints, onNodeClick,
  columnSize, beamSize, selectedElement, setSelectedElement,
  getNode, onDeleteElement ,
  pdfImage, pdfVisible, pdfOpacity,
  pdfX, pdfY, pdfScale, pdfRotation,
  setPdfX, setPdfY,
  calibrating, calibPoints, setCalibPoints,
  addGridLineAt,
  setCanvasViewport,
  pickingGrid, pickedPoints, setPickedPoints
}) {
  // ===== Responsive viewport size (วัดจาก container จริง) =====
  const containerRef = React.useRef(null);
  const [VIEWPORT_W, setVIEWPORT_W] = useState(900);
  const [VIEWPORT_H, setVIEWPORT_H] = useState(600);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const w = Math.max(400, Math.floor(entry.contentRect.width));
        // ใช้ aspect ratio ~1.5:1 หรืออย่างน้อย 600px
        const h = Math.max(500, Math.floor(w * 0.65));
        setVIEWPORT_W(w);
        setVIEWPORT_H(h);
        if (setCanvasViewport) setCanvasViewport({ w, h });
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [setCanvasViewport]);

  const PADDING = 80;
  const SNAP_RADIUS = 25; // px

  const baseScale = Math.min(
    (VIEWPORT_W - PADDING * 2) / Math.max(grid.width, 1),
    (VIEWPORT_H - PADDING * 2) / Math.max(grid.height, 1)
  );
  const scale = baseScale * zoom;

  const cx = VIEWPORT_W / 2 + pan.x;
  const cy = VIEWPORT_H / 2 + pan.y;
  const offsetX = cx - (grid.minX + grid.width / 2) * scale;
  const offsetY = cy - (grid.minY + grid.height / 2) * scale;

  const sx = (x) => x * scale + offsetX;
  const sy = (y) => y * scale + offsetY;

  const svgRef = React.useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDraggingPdf, setIsDraggingPdf] = useState(false);
  const [pdfDragStart, setPdfDragStart] = useState({ startX: 0, startY: 0, origPdfX: 0, origPdfY: 0 });

  // Convert client coords → SVG coords
  const getSvgCoords = (clientX, clientY) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const xRatio = VIEWPORT_W / rect.width;
    const yRatio = VIEWPORT_H / rect.height;
    return {
      x: (clientX - rect.left) * xRatio,
      y: (clientY - rect.top) * yRatio,
    };
  };

  // Find nearest node within snap radius
  const findSnapNode = (svgX, svgY) => {
    let best = null;
    let bestDist = SNAP_RADIUS;
    for (const node of grid.nodes) {
      const nx = sx(node.x);
      const ny = sy(node.y);
      const d = Math.hypot(nx - svgX, ny - svgY);
      if (d < bestDist) {
        bestDist = d;
        best = node;
      }
    }
    return best;
  };

  const handleMouseMove = (e) => {
    const { x, y } = getSvgCoords(e.clientX, e.clientY);
    setMousePos({ x, y });

    if (isDraggingPdf) {
      setPdfX(pdfDragStart.origPdfX + (e.clientX - pdfDragStart.startX));
      setPdfY(pdfDragStart.origPdfY + (e.clientY - pdfDragStart.startY));
      return;
    }
    if (isDragging) {
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
      return;
    }

    // Snap detection
    if (tool !== 'select') {
      const snapped = findSnapNode(x, y);
      setHoveredNode(snapped);
    } else {
      setHoveredNode(null);
    }
  };

  const handleMouseDown = (e) => {
    // ถ้ากำลัง pick grid → เก็บจุดที่คลิก (ไม่จำกัดจำนวน)
    if (pickingGrid !== 'off') {
      const { x, y } = getSvgCoords(e.clientX, e.clientY);
      setPickedPoints([...pickedPoints, { x, y }]);
      return;
    }
    // ถ้ากำลัง calibrate → เก็บจุดที่คลิก
    if (calibrating) {
      const { x, y } = getSvgCoords(e.clientX, e.clientY);
      const newPoints = [...calibPoints, { x, y }];
      if (newPoints.length <= 2) {
        setCalibPoints(newPoints);
      }
      return;
    }
    // ถ้า tool คือ gridX/gridY → คลิกสร้าง grid line ใหม่
    if (tool === 'gridX' || tool === 'gridY') {
      const { x, y } = getSvgCoords(e.clientX, e.clientY);
      const worldX = (x - offsetX) / scale;
      const worldY = (y - offsetY) / scale;
      if (tool === 'gridX') {
        addGridLineAt(worldX, worldY, 'x');
      } else {
        addGridLineAt(worldX, worldY, 'y');
      }
      return;
    }
    // ถ้า snap อยู่ และ tool ไม่ใช่ select → คลิกวาง
    if (tool !== 'select' && hoveredNode) {
      onNodeClick(hoveredNode);
      return;
    }
    // ถ้า select tool → ลาก pan (หรือลาก PDF ถ้า shift)
    if (tool === 'select') {
      // ถ้ากด Shift + คลิก = ลาก PDF
      if (e.shiftKey && pdfImage) {
        setIsDraggingPdf(true);
        setPdfDragStart({
          startX: e.clientX,
          startY: e.clientY,
          origPdfX: pdfX,
          origPdfY: pdfY
        });
        return;
      }
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsDraggingPdf(false);
  };

  // Mouse wheel zoom (Ctrl + Scroll หรือ Pinch บน trackpad)
  const handleWheel = (e) => {
    if (!setZoom) return;
    // Ctrl/Cmd + scroll = zoom (ป้องกันชนกับ scroll หน้าเว็บปกติ)
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom(prev => Math.max(0.1, Math.min(5.0, prev + delta)));
    }
  };

  // Cursor style
  const cursorStyle = isDragging
    ? 'grabbing'
    : (tool === 'select' ? 'grab' : 'crosshair');

  return (
    <div ref={containerRef} className="relative bg-[#050d18] w-full" style={{ height: VIEWPORT_H }}>
      <svg ref={svgRef} width="100%" height={VIEWPORT_H} viewBox={`0 0 ${VIEWPORT_W} ${VIEWPORT_H}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => { setIsDragging(false); setHoveredNode(null); }}
        onWheel={handleWheel}
        style={{ cursor: cursorStyle }}
      >
        {/* Background */}
        <rect width={VIEWPORT_W} height={VIEWPORT_H} fill="#050d18" />

        {/* PDF Underlay */}
        {/* PDF Underlay (with transform: position, scale, rotate) */}
        {pdfImage && pdfVisible && (() => {
          const pdfDisplayW = (VIEWPORT_W - 100) * pdfScale;
          const pdfDisplayH = (VIEWPORT_H - 100) * pdfScale;
          const pdfCx = pdfX + pdfDisplayW / 2;
          const pdfCy = pdfY + pdfDisplayH / 2;
          return (
            <g transform={`rotate(${pdfRotation} ${pdfCx} ${pdfCy})`}>
              <image
                href={pdfImage}
                x={pdfX}
                y={pdfY}
                width={pdfDisplayW}
                height={pdfDisplayH}
                opacity={pdfOpacity / 100}
                preserveAspectRatio="xMidYMid meet"
                style={{ pointerEvents: 'none' }}
              />
            </g>
          );
        })()}

        {/* Grid line preview (when tool is gridX/gridY) */}
        {(tool === 'gridX' || tool === 'gridY') && (
          <g pointerEvents="none">
            {tool === 'gridX' && (
              <line
                x1={mousePos.x} y1={sy(grid.minY) - 30}
                x2={mousePos.x} y2={sy(grid.maxY) + 30}
                stroke="#f59e0b" strokeWidth="2"
                strokeDasharray="6 3" opacity="0.7"
              />
            )}
            {tool === 'gridY' && (
              <line
                x1={sx(grid.minX) - 30} y1={mousePos.y}
                x2={sx(grid.maxX) + 30} y2={mousePos.y}
                stroke="#10b981" strokeWidth="2"
                strokeDasharray="6 3" opacity="0.7"
              />
            )}
            {/* Position label */}
            <rect
              x={mousePos.x + 12} y={mousePos.y - 28}
              width="100" height="20" rx="3"
              fill="#0f172a" stroke={tool === 'gridX' ? '#f59e0b' : '#10b981'} strokeWidth="1"
            />
            <text x={mousePos.x + 18} y={mousePos.y - 14}
              fill={tool === 'gridX' ? '#f59e0b' : '#10b981'} fontSize="10" fontWeight="bold">
              {tool === 'gridX' ? 'Grid X = ' : 'Grid Y = '}
              {tool === 'gridX'
                ? ((mousePos.x - offsetX) / scale).toFixed(2)
                : ((mousePos.y - offsetY) / scale).toFixed(2)} ม.
            </text>
          </g>
        )}
        {/* Calibrate points marker */}
        {calibrating && calibPoints.map((pt, i) => (
          <g key={i} pointerEvents="none">
            <circle cx={pt.x} cy={pt.y} r="8" fill="rgba(245, 158, 11, 0.4)"
              stroke="#f59e0b" strokeWidth="2" />
            <circle cx={pt.x} cy={pt.y} r="2" fill="#f59e0b" />
            <text x={pt.x + 12} y={pt.y - 8}
              fill="#f59e0b" fontSize="11" fontWeight="bold">{i + 1}</text>
          </g>
        ))}
        {/* Calibrate line between 2 points */}
        {calibrating && calibPoints.length === 2 && (
          <line x1={calibPoints[0].x} y1={calibPoints[0].y}
            x2={calibPoints[1].x} y2={calibPoints[1].y}
            stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2"
            pointerEvents="none"
          />
        )}

        {/* Picked Grid points + connecting line */}
        {pickingGrid !== 'off' && pickedPoints.map((pt, i) => {
          const color = pickingGrid === 'x' ? '#22d3ee' : '#10b981';
          const label = pickingGrid === 'x'
            ? String.fromCharCode(65 + i)
            : String(i + 1);
          return (
            <g key={i} pointerEvents="none">
              <circle cx={pt.x} cy={pt.y} r="10" fill={color} fillOpacity="0.3"
                stroke={color} strokeWidth="2" />
              <circle cx={pt.x} cy={pt.y} r="3" fill={color} />
              <text x={pt.x + 14} y={pt.y - 10}
                fill={color} fontSize="13" fontWeight="bold">{label}</text>
            </g>
          );
        })}
        {pickingGrid !== 'off' && pickedPoints.length >= 2 && (
          <polyline
            points={pickedPoints.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke={pickingGrid === 'x' ? '#22d3ee' : '#10b981'}
            strokeWidth="1.5" strokeDasharray="6 3"
            pointerEvents="none"
          />
        )}

        <defs>
          <pattern id="dotGrid2" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.5" fill="rgba(34, 211, 238, 0.15)" />
          </pattern>
        </defs>
        <rect width={VIEWPORT_W} height={VIEWPORT_H} fill="url(#dotGrid2)" />

        {/* Building outline */}
        <rect
          x={sx(0)}
          y={sy(0)}
          width={(grid.xLines.filter(l => !l.isCantilever).slice(-1)[0]?.pos || 0) * scale}
          height={(grid.yLines.filter(l => !l.isCantilever).slice(-1)[0]?.pos || 0) * scale}
          fill="rgba(34, 211, 238, 0.04)"
          stroke="rgba(34, 211, 238, 0.3)"
          strokeWidth="1.5"
          strokeDasharray="6 3"
        />

        {/* Grid lines X */}
        {grid.xLines.map((line, i) => (
          <g key={`gx-${i}`}>
            <line x1={sx(line.pos)} y1={sy(grid.minY) - 30}
              x2={sx(line.pos)} y2={sy(grid.maxY) + 30}
              stroke={line.isCantilever ? "rgba(244, 63, 94, 0.4)" : "rgba(245, 158, 11, 0.3)"}
              strokeWidth="1" strokeDasharray={line.isCantilever ? "4 2" : "0"}
            />
            {showLabels && (
              <g>
                <circle cx={sx(line.pos)} cy={sy(grid.minY) - 35} r="13"
                  fill={line.isCantilever ? "#f43f5e" : "#f59e0b"} />
                <text x={sx(line.pos)} y={sy(grid.minY) - 30}
                  fill="#0a1628" fontSize="12" fontWeight="bold" textAnchor="middle">
                  {line.label}
                </text>
              </g>
            )}
          </g>
        ))}

        {/* Grid lines Y */}
        {grid.yLines.map((line, i) => (
          <g key={`gy-${i}`}>
            <line x1={sx(grid.minX) - 30} y1={sy(line.pos)}
              x2={sx(grid.maxX) + 30} y2={sy(line.pos)}
              stroke={line.isCantilever ? "rgba(244, 63, 94, 0.4)" : "rgba(16, 185, 129, 0.3)"}
              strokeWidth="1" strokeDasharray={line.isCantilever ? "4 2" : "0"}
            />
            {showLabels && (
              <g>
                <circle cx={sx(grid.minX) - 35} cy={sy(line.pos)} r="13"
                  fill={line.isCantilever ? "#f43f5e" : "#10b981"} />
                <text x={sx(grid.minX) - 35} y={sy(line.pos) + 5}
                  fill="#0a1628" fontSize="12" fontWeight="bold" textAnchor="middle">
                  {line.label}
                </text>
              </g>
            )}
          </g>
        ))}

        {/* ========== ELEMENTS (drawn order: slabs → beams → columns) ========== */}

        {/* SLABS */}
        {elements.slabs.map(slab => {
          const points = slab.nodeIds.map(id => {
            const n = getNode(id);
            return n ? `${sx(n.x)},${sy(n.y)}` : '';
          }).filter(Boolean).join(' ');
          const isSelected = selectedElement?.type === 'slab' && selectedElement.data.id === slab.id;
          return (
            <polygon key={slab.id}
              points={points}
              fill={isSelected ? "rgba(168, 85, 247, 0.25)" : "rgba(168, 85, 247, 0.12)"}
              stroke="#a855f7"
              strokeWidth={isSelected ? 2 : 1.2}
              strokeDasharray="3 2"
              style={{ cursor: tool === 'select' ? 'pointer' : 'inherit' }}
              onClick={(e) => {
                e.stopPropagation();
                if (tool === 'select') setSelectedElement({ type: 'slab', data: slab });
              }}
            />
          );
        })}

        {/* BEAMS */}
        {elements.beams.map(beam => {
          const s = getNode(beam.startId);
          const e = getNode(beam.endId);
          if (!s || !e) return null;
          const isSelected = selectedElement?.type === 'beam' && selectedElement.data.id === beam.id;
          // Beam thickness representation (visual)
          const beamThickness = Math.max(beam.b * scale, 4);
          return (
            <g key={beam.id}>
              <line x1={sx(s.x)} y1={sy(s.y)} x2={sx(e.x)} y2={sy(e.y)}
                stroke={isSelected ? "#fb7185" : "#f43f5e"}
                strokeWidth={beamThickness}
                strokeOpacity="0.6"
                strokeLinecap="butt"
                style={{ cursor: tool === 'select' ? 'pointer' : 'inherit' }}
                onClick={(evt) => {
                  evt.stopPropagation();
                  if (tool === 'select') setSelectedElement({ type: 'beam', data: beam });
                }}
              />
              {/* Center line */}
              <line x1={sx(s.x)} y1={sy(s.y)} x2={sx(e.x)} y2={sy(e.y)}
                stroke="#fff" strokeWidth="0.5" strokeOpacity="0.7" pointerEvents="none"
              />
            </g>
          );
        })}

        {/* Beam preview (when drawing) */}
        {tool === 'beam' && beamStart && hoveredNode && (() => {
          const s = getNode(beamStart);
          if (!s || s.id === hoveredNode.id) return null;
          return (
            <line x1={sx(s.x)} y1={sy(s.y)}
              x2={sx(hoveredNode.x)} y2={sy(hoveredNode.y)}
              stroke="#f43f5e" strokeWidth={Math.max(beamSize.b * scale, 4)}
              strokeOpacity="0.4" strokeDasharray="6 3"
              pointerEvents="none"
            />
          );
        })()}

        {/* Slab preview (when drawing) */}
        {tool === 'slab' && slabPoints.length >= 2 && (() => {
          const points = slabPoints.map(id => {
            const n = getNode(id);
            return n ? `${sx(n.x)},${sy(n.y)}` : '';
          }).filter(Boolean).join(' ');
          return (
            <polyline points={points}
              fill="rgba(168, 85, 247, 0.15)"
              stroke="#a855f7" strokeWidth="2"
              strokeDasharray="6 3"
              pointerEvents="none"
            />
          );
        })()}

        {/* COLUMNS */}
        {elements.columns.map(col => {
          const n = getNode(col.nodeId);
          if (!n) return null;
          const isSelected = selectedElement?.type === 'column' && selectedElement.data.id === col.id;
          const colW = Math.max(col.b * scale, 8);
          const colH = Math.max(col.h * scale, 8);
          return (
            <g key={col.id} style={{ cursor: tool === 'select' ? 'pointer' : 'inherit' }}
              onClick={(e) => {
                e.stopPropagation();
                if (tool === 'select') setSelectedElement({ type: 'column', data: col });
              }}>
              <rect x={sx(n.x) - colW / 2} y={sy(n.y) - colH / 2}
                width={colW} height={colH}
                fill={isSelected ? "#fbbf24" : "#f59e0b"}
                stroke={isSelected ? "#fff" : "#92400e"}
                strokeWidth={isSelected ? 2 : 1}
              />
              <text x={sx(n.x)} y={sy(n.y) + 3}
                fill="#0a1628" fontSize="9" fontWeight="bold" textAnchor="middle"
                pointerEvents="none">
                {col.nodeId}
              </text>
            </g>
          );
        })}

        {/* Column preview */}
        {tool === 'column' && hoveredNode && !elements.columns.find(c => c.nodeId === hoveredNode.id) && (
          <rect
            x={sx(hoveredNode.x) - Math.max(columnSize.b * scale, 8) / 2}
            y={sy(hoveredNode.y) - Math.max(columnSize.h * scale, 8) / 2}
            width={Math.max(columnSize.b * scale, 8)}
            height={Math.max(columnSize.h * scale, 8)}
            fill="rgba(245, 158, 11, 0.4)"
            stroke="#f59e0b" strokeWidth="2"
            strokeDasharray="3 2"
            pointerEvents="none"
          />
        )}

        {/* Beam start marker */}
        {tool === 'beam' && beamStart && (() => {
          const s = getNode(beamStart);
          if (!s) return null;
          return (
            <g>
              <circle cx={sx(s.x)} cy={sy(s.y)} r="12"
                fill="rgba(244, 63, 94, 0.3)" stroke="#f43f5e" strokeWidth="2"
                pointerEvents="none"
              />
              <text x={sx(s.x)} y={sy(s.y) - 18}
                fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle"
                pointerEvents="none">
                START
              </text>
            </g>
          );
        })()}

        {/* Slab points marker */}
        {tool === 'slab' && slabPoints.map((id, i) => {
          const n = getNode(id);
          if (!n) return null;
          return (
            <g key={i} pointerEvents="none">
              <circle cx={sx(n.x)} cy={sy(n.y)} r="10"
                fill="rgba(168, 85, 247, 0.3)" stroke="#a855f7" strokeWidth="2" />
              <text x={sx(n.x)} y={sy(n.y) + 3}
                fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">
                {i + 1}
              </text>
            </g>
          );
        })}

        {/* Nodes */}
        {grid.nodes.map(node => {
          const hasColumn = elements.columns.find(c => c.nodeId === node.id);
          const isSnapping = hoveredNode?.id === node.id;
          return (
            <g key={node.id} pointerEvents="none">
              {!hasColumn && (
                <circle cx={sx(node.x)} cy={sy(node.y)}
                  r={isSnapping ? "5" : "3"}
                  fill={node.isCantilever ? "#f43f5e" : "#22d3ee"}
                  fillOpacity={isSnapping ? 1 : 0.5}
                  stroke={isSnapping ? "#fff" : "transparent"}
                  strokeWidth="1.5"
                />
              )}
              {showLabels && !hasColumn && (
                <text x={sx(node.x) + 8} y={sy(node.y) - 6}
                  fill="#64748b" fontSize="9">
                  {node.id}
                </text>
              )}
            </g>
          );
        })}

        {/* SNAP INDICATOR (เหมือน AutoCAD) */}
        {hoveredNode && tool !== 'select' && (
          <g pointerEvents="none">
            {/* Outer square (AutoCAD-style endpoint snap marker) */}
            <rect
              x={sx(hoveredNode.x) - 10} y={sy(hoveredNode.y) - 10}
              width="20" height="20"
              fill="none" stroke="#10b981" strokeWidth="2"
            />
            {/* Inner dot */}
            <circle cx={sx(hoveredNode.x)} cy={sy(hoveredNode.y)} r="3"
              fill="#10b981" />
            {/* Label */}
            <rect
              x={sx(hoveredNode.x) + 14} y={sy(hoveredNode.y) - 28}
              width="80" height="20" rx="3"
              fill="#0f172a" stroke="#10b981" strokeWidth="1"
            />
            <text x={sx(hoveredNode.x) + 18} y={sy(hoveredNode.y) - 14}
              fill="#10b981" fontSize="10" fontWeight="bold">
              ENDPOINT · {hoveredNode.id}
            </text>
          </g>
        )}

        {/* Status overlay */}
        <g transform="translate(15, 15)">
          <rect x="0" y="0" width="220" height="74" fill="rgba(15, 23, 42, 0.85)"
            stroke="#1e293b" strokeWidth="1" rx="6" />
          <text x="10" y="18" fill="#22d3ee" fontSize="10" fontWeight="bold">PLAN STATUS</text>
          <text x="10" y="34" fill="#cbd5e1" fontSize="11">
            ขนาด: {grid.width.toFixed(1)} × {grid.height.toFixed(1)} ม.
          </text>
          <text x="10" y="48" fill="#cbd5e1" fontSize="11">
            🟡 {elements.columns.length} เสา · 🔴 {elements.beams.length} คาน · 🟣 {elements.slabs.length} พื้น
          </text>
          <text x="10" y="64" fill="#94a3b8" fontSize="10">
            Tool: <tspan fill="#22d3ee" fontWeight="bold">{tool.toUpperCase()}</tspan>
          </text>
        </g>

        {/* Coordinates overlay */}
        {tool !== 'select' && (
          <g transform={`translate(${VIEWPORT_W - 145}, ${VIEWPORT_H - 30})`}>
            <rect x="0" y="0" width="130" height="22" fill="rgba(15, 23, 42, 0.85)"
              stroke="#1e293b" strokeWidth="1" rx="3" />
            <text x="8" y="15" fill="#10b981" fontSize="10" fontFamily="monospace">
              {hoveredNode
                ? `SNAP: ${hoveredNode.id}`
                : `X: ${((mousePos.x - offsetX) / scale).toFixed(2)} Y: ${((mousePos.y - offsetY) / scale).toFixed(2)}`}
            </text>
          </g>
        )}
      </svg>

      <div className="absolute bottom-3 left-3 text-xs text-slate-500 bg-slate-900/80 px-3 py-1.5 rounded">
        💡 {tool === 'select' ? 'ลาก = เลื่อน · คลิก element = เลือก' : 'ขยับเมาส์ → เห็น snap สีเขียว → คลิก'}
      </div>
    </div>
  );
}

function PhaseStep({ done, label, detail }) {
  return (
    <div className="flex items-start gap-3 p-2.5 rounded bg-slate-800/30">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
        done ? 'bg-emerald-500 text-slate-900' : 'bg-slate-800 border border-slate-700 text-slate-500'
      }`}>
        {done ? <CheckCircle2 className="w-4 h-4" strokeWidth={3} /> : <span className="text-xs">○</span>}
      </div>
      <div className="flex-1">
        <div className={`text-sm ${done ? 'text-emerald-300 font-semibold' : 'text-slate-400'}`}>{label}</div>
        <div className="text-xs text-slate-500 mt-0.5">{detail}</div>
      </div>
    </div>
  );
}

/* ================== SHARED COMPONENTS ================== */
function PageHeader({ code, title, subtitle }) {
  return (
    <header className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[10px] tracking-widest uppercase text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20 font-mono">
          MODULE {code}
        </span>
        <span className="text-xs text-slate-500">/ มยผ. 1301-61 · TH Units</span>
      </div>
      <h1 className="text-3xl font-bold text-white tracking-tight mb-1">{title}</h1>
      <p className="text-slate-400 text-sm">{subtitle}</p>
    </header>
  );
}

function InputGroup({ title, children }) {
  return (
    <div>
      <div className="text-[10px] tracking-widest uppercase text-slate-500 mb-2.5 pb-2 border-b border-slate-800">
        {title}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function NumInput({ label, value, onChange, unit, step = 1 }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <label className="text-sm text-slate-300 flex-1">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          step={step}
          onChange={e => onChange(parseFloat(e.target.value) || 0)}
          className="w-28 bg-slate-800/60 border border-slate-700 rounded px-2 py-1.5 text-right text-sm font-mono text-cyan-300 focus:outline-none focus:border-cyan-500/50"
        />
        <span className="text-xs text-slate-500 w-16">{unit}</span>
      </div>
    </div>
  );
}

function SelectInput({ label, value, onChange, options }) {
  return (
    <div>
      <label className="text-xs text-slate-400 mb-1 block">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-slate-800/60 border border-slate-700 rounded px-3 py-2 text-sm text-cyan-300 focus:outline-none focus:border-cyan-500/50"
      >
        {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
    </div>
  );
}

function ResultBox({ label, value, unit, highlight, small, valueColor }) {
  return (
    <div className={`rounded-lg p-3 ${highlight ? 'bg-cyan-500/10 border border-cyan-500/30' : 'bg-slate-800/40'}`}>
      <div className="text-[10px] tracking-widest uppercase text-slate-500 mb-1">{label}</div>
      <div className={`${small ? 'text-lg' : 'text-2xl'} font-bold font-mono ${valueColor || (highlight ? 'text-cyan-300' : 'text-white')}`}>
        {value}
      </div>
      {unit && <div className="text-[10px] text-slate-500 mt-0.5">{unit}</div>}
    </div>
  );
}

function StatCard({ label, value, valueColor = 'text-white', sub, extra, progress, progressLabel, icon, iconBg = 'from-cyan-400 to-cyan-600', riskBars }) {
  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 relative overflow-hidden hover:border-slate-700 transition">
      <div className="flex items-start justify-between mb-4">
        <div className="text-[10px] tracking-widest uppercase text-slate-500">{label}</div>
        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${iconBg} flex items-center justify-center text-slate-900 shadow-lg`}>
          {React.cloneElement(icon, { className: 'w-5 h-5', strokeWidth: 2.5 })}
        </div>
      </div>
      <div className="flex items-baseline gap-2 mb-2">
        <div className={`text-4xl font-bold tracking-tight ${valueColor}`}>{value}</div>
      </div>
      {sub && <div className="text-xs text-slate-400">{sub}</div>}
      {extra && <div className="text-xs text-slate-500 mt-1">{extra}</div>}
      {progress && (
        <div className="mt-4">
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="text-[10px] text-slate-500 mt-2">{progressLabel}</div>
        </div>
      )}
      {riskBars && (
        <div className="mt-4">
          <div className="flex gap-1 h-1.5">
            <div className="bg-rose-500 rounded-full" style={{flex: riskBars.h}}></div>
            <div className="bg-amber-500 rounded-full" style={{flex: riskBars.m}}></div>
            <div className="bg-emerald-500 rounded-full" style={{flex: riskBars.l}}></div>
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 mt-2">
            <span>H {riskBars.h}</span>
            <span>M {riskBars.m}</span>
            <span>L {riskBars.l}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function MemberRow({ code, name, detail, floor, material, utilization, status, statusColor, date }) {
  const colors = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  };
  const utilColor = utilization > 1 ? 'text-rose-400' : utilization > 0.85 ? 'text-amber-400' : 'text-emerald-400';
  return (
    <tr className="border-b border-slate-800/60 hover:bg-slate-800/20 transition">
      <td className="px-5 py-4 font-mono text-cyan-300 text-xs">{code}</td>
      <td className="px-5 py-4">
        <div className="text-slate-200">{name}</div>
        <div className="text-xs text-slate-500 mt-0.5">{detail}</div>
      </td>
      <td className="px-5 py-4">
        <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-1 rounded">{floor}</span>
      </td>
      <td className="px-5 py-4 text-xs text-slate-400 font-mono">{material}</td>
      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <span className={`font-mono font-bold ${utilColor}`}>{utilization.toFixed(2)}</span>
          <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className={`h-full ${utilization > 1 ? 'bg-rose-500' : utilization > 0.85 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(utilization * 100, 100)}%` }}></div>
          </div>
        </div>
      </td>
      <td className="px-5 py-4">
        <span className={`text-xs px-2.5 py-1 rounded border ${colors[statusColor]}`}>● {status}</span>
      </td>
      <td className="px-5 py-4 text-xs text-slate-500 font-mono">{date}</td>
    </tr>
  );
}