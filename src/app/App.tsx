import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard, Globe, BarChart3, Bot, Activity,
  Bell, Sun, Moon, Download, RefreshCw, Search as SearchIcon,
  Upload, Shield, CheckCircle2, AlertCircle, Clock, WifiOff,
  TrendingUp, TrendingDown, Eye, Users, Key, Palette, Type,
  LogOut, Plus, FileText, Play, Database, Star, Navigation,
  Settings, Send, Image as ImageIcon, ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  Smartphone, Calendar, Folder, Mail, BookOpen, Layers, Target, Map,
  AlertTriangle, History, ArrowLeftRight, Radio, Award,
  Zap, Lock, Hash, Cpu, Timer, Filter, Package, Clipboard,
  CheckCircle, Scale, ArrowUpRight
} from "lucide-react";
import {
  Page,
  ComplianceStatus,
  BgCat,
  GOLD,
  GOLD_PALE,
  NAVY_BG,
  NAVY_CARD,
  NAVY_SIDEBAR,
  TEAL,
  C_GRN,
  C_RED,
  C_AMB,
  C_EMR,
  C_VIO,
  C_SLT,
  C_BLU,
  STATUS_CFG,
  PAGE_BG,
  NAV_GROUPS,
  OVERVIEW_KPIS,
  COMPLIANCE_KPIS,
  TREND_DATA,
  PIE_DATA,
  WEBSITES,
  SECTOR_DATA,
  RADAR_DATA,
  CHAT_MESSAGES,
  SUGGESTED_PROMPTS,
  MOBILE_APPS,
  SCAN_HISTORY,
  CASES,
  SCHEDULED_REPORTS,
  ADMIN_SECTIONS,
  PAGE_TITLE,
  ARTICLE12,
  getArticle12Scores,
  getScanHistory,
  CountUp,
  CircularProgress,
  InsetFrame,
  CommandFrame,
  HudLabel,
  GlassPanel,
  LOGO_GOLD_FILTER,
  RasidLogo,
  SdaiaLogo,
  ComplianceBadge,
  PCard,
  KPICard,
  SmallKPI,
  ComplianceCard,
  BANNER_THEMES,
  HeroBanner,
  CinematicSharedLayers,
  CinematicBg,
  PageHeader,
  FloatingAssistant,
  Sidebar,
  TopBar,
  TT,
  rasidLogoGold,
  rasidLogoHero,
  rasidLogoWordmark,
  rasidLogoLight,
  characterWaving,
  characterShmagh,
  sdaiaLogoImg,
  characterHands,
  ImageWithFallback,
  BarChart,
  Bar,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from "./rasid-shared";

let _activeSite: typeof WEBSITES[0] = WEBSITES[0];
let _activeDrillDown: { filter: ComplianceStatus | "all"; title: string; color: string; textColor: string } | null = null;
function LeadershipPage() {
  const [sectorFilter, setSectorFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [catFilter,    setCatFilter]    = useState<string[]>([]);
  const [activeHeatRow, setActiveHeatRow] = useState<number | null>(null);
  const toggleFilter = (arr: string[], set: React.Dispatch<React.SetStateAction<string[]>>, v: string) =>
    set(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);
  const sectorChips = [
    { id: "gov",     label: "القطاع الحكومي", icon: Shield  },{ id: "private", label: "القطاع الخاص",   icon: Database },
  ];
  const statusChips = [
    { id: "compliant",  label: "ممتثل",        color: C_GRN },{ id: "partial",    label: "ممتثل جزئياً", color: C_AMB },{ id: "nc",         label: "غير ممتثل",    color: C_RED },{ id: "working",    label: "يعمل",         color: TEAL },{ id: "inactive",   label: "لا يعمل",      color: C_SLT },{ id: "hasEmail",   label: "لديه بريد",    color: C_VIO },{ id: "hasSocial",  label: "لديه صفحة تواصل", color: "#C5A55A" },
  ];
  const catChips = [
    "عام","تجاري","عام/تجاري","غير ربحي","تعليمي","منظمات","سيارات",
    "تجارة إلكترونية","إعلام","شبكات/تقنية","حكومي","غير مصنّف","عقارات","خدمات",
  ];
  const article12Data = [{ id: 1, pct: 43, label: "تحديد وسيلة معالجة البيانات الشخصية",           compliant: 440, nc: 575, color: C_AMB },{ id: 2, pct: 47, label: "تحديد طريقة حفظ البيانات الشخصية",              compliant: 540, nc: 480, color: "#C5A55A" },{ id: 3, pct: 47, label: "تحديد مشمول البيانات الشخصية المطلوب جمعها",   compliant: 533, nc: 482, color: "#C5A55A" },{ id: 4, pct: 48, label: "تحديد الغرض من جمع البيانات الشخصية",           compliant: 523, nc: 492, color: TEAL }];
  const sectorAnalysis = [
    {
      label: "القطاع الحكومي", total: 36, icon: Shield, color: C_GRN,
      compliant: 36, nc: 461, partial: 127,
      articles: [63, 62, 62, 63, 63, 62, 63, 62]},{
      label: "القطاع الخاص",  total: 12182, icon: Database, color: "#C5A55A",
      compliant: 236, nc: 10882, partial: 1332,
      articles: [47, 52, 48, 43, 37, 47, 27, 43]},
  ];
  const classificationData = [
    {
      label: "عام", total: 6865, pct: 8, color: TEAL,
      leader: 618, nc: 4208, compliant: 12,
      articles: [52, 48, 50, 51, 42, 48, 34, 44]},{
      label: "تجاري", total: 575, pct: 8, color: "#C5A55A",
      leader: 265, nc: 2956, compliant: 5,
      articles: [44, 40, 38, 39, 31, 40, 22, 36]},{
      label: "عام/تجاري", total: 575, pct: 8, color: C_VIO,
      leader: 39, nc: 1535, compliant: 31,
      articles: [46, 44, 45, 46, 38, 45, 29, 41]},
  ];
  const heatmapRows = [{ label: "القطاع الخاص - عام",               values: [52, 48, 50, 51, 42, 48, 34, 44] },{ label: "القطاع الخاص - تجاري",             values: [44, 40, 38, 39, 31, 40, 22, 36] },{ label: "القطاع الخاص - عام/تجاري",         values: [46, 44, 45, 46, 38, 45, 29, 41] },{ label: "القطاع الخاص - تجارة إلكترونية",   values: [38, 35, 36, 38, 28, 37, 20, 32] },{ label: "القطاع الخاص - خدمات",             values: [42, 39, 40, 42, 33, 41, 25, 37] },{ label: "القطاع الخاص - غير ربحي",          values: [55, 52, 53, 54, 46, 53, 38, 49] }];
  const benchmarkData = [
    { sector: "تجاري",           cat: "القطاع الخاص",    sites: 352, score: "3.1/8", low: 0, high: 8, compliance: 39, dist: [70, 15, 15] },{ sector: "عام",             cat: "القطاع الخاص",    sites: 320, score: "3.1/8", low: 0, high: 8, compliance: 30, dist: [60, 20, 20] },{ sector: "فلاحي الخاص",    cat: "القطاع الخاص",    sites: 160, score: "5.6/8", low: 0, high: 8, compliance: 20, dist: [50, 25, 25] },{ sector: "خدمات",          cat: "القطاع الخاص",    sites: 78,  score: "0.5/8", low: 0, high: 8, compliance: 20, dist: [50, 30, 20] },{ sector: "بلديات/إدارة",   cat: "القطاع الخاص",    sites: 70,  score: "2.5/8", low: 0, high: 8, compliance: 40, dist: [45, 35, 20] },{ sector: "علمي",           cat: "القطاع الخاص",    sites: 47,  score: "1/8",   low: 0, high: 8, compliance: 30, dist: [55, 25, 20] },{ sector: "دولة/عقارية",    cat: "القطاع الخاص",    sites: 37,  score: "1/8",   low: 0, high: 8, compliance: 20, dist: [60, 20, 20] },{ sector: "تعليم",          cat: "القطاع الخاص",    sites: 32,  score: "1.3/8", low: 0, high: 8, compliance: 40, dist: [50, 30, 20] },{ sector: "ترفيه",          cat: "القطاع الخاص",    sites: 27,  score: "1/8",   low: 0, high: 8, compliance: 30, dist: [55, 25, 20] },{ sector: "صنع",            cat: "القطاع الخاص",    sites: 21,  score: "4.4/8", low: 0, high: 8, compliance: 20, dist: [45, 35, 20] },{ sector: "تجارة إلكترونية", cat: "القطاع الخاص",  sites: 17,  score: "5.7/8", low: 0, high: 8, compliance: 20, dist: [50, 30, 20] },{ sector: "منظمات",         cat: "القطاع الخاص",    sites: 16,  score: "1.5/8", low: 0, high: 8, compliance: 30, dist: [55, 25, 20] },{ sector: "عقارات",         cat: "القطاع الخاص",    sites: 12,  score: "3.5/8", low: 0, high: 8, compliance: 40, dist: [45, 35, 20] },{ sector: "شبكات/تقنية",    cat: "القطاع الخاص",    sites: 12,  score: "3.5/8", low: 0, high: 8, compliance: 30, dist: [50, 30, 20] },
  ];
  const heatColor = (v: number) =>
    v >= 60 ? C_GRN : v >= 45 ? TEAL : v >= 30 ? C_AMB : C_RED;
  const sectorPerf = [
    { name: "حكومي",    pct: 94, color: C_GRN, sites: 8841  },{ name: "بنكي",     pct: 48, color: C_AMB, sites: 2340  },{ name: "تجاري",   pct: 31, color: C_RED, sites: 7200  },{ name: "صحي",     pct: 67, color: TEAL, sites: 1890  },{ name: "تعليمي",  pct: 55, color: C_VIO, sites: 1640  },{ name: "اتصالات", pct: 42, color: "#C5A55A", sites: 1072  },
  ];
  const recentActivity = [
    { site: "commerce.gov.sa", event: "انتهى الفحص — 94%",  status: "compliant" as ComplianceStatus, time: "9:52" },{ site: "noon.com/ar-sa",  event: "تراجع — 41% (↓ 6%)", status: "non-compliant" as ComplianceStatus, time: "9:48" },{ site: "moh.gov.sa",      event: "فحص دوري مكتمل",     status: "compliant" as ComplianceStatus, time: "9:41" },{ site: "stc.com.sa",      event: "يحتاج مراجعة",       status: "review" as ComplianceStatus, time: "9:35" },
  ];
  const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div className="flex items-center justify-between mb-3">
      <div>
        <div className="flex items-center gap-2">
        <span className="w-1 h-5 rounded-full" style={{ background: GOLD }} />
        <h2 className="text-base font-black text-foreground">{title}</h2>
        </div>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5 pr-3">{subtitle}</p>}
      </div>
    </div>
  );
  return (
    <div className="relative p-5 space-y-5" style={{ zIndex: 1 }}>
      <CinematicBg page="leadership" />
      <HeroBanner page="leadership" title="المؤشرات الرئيسية"
        subtitle="نظرة قيادية شاملة على حالة الخصوصية الوطنية — 29 قطاعاً · 24,983 موقعاً مرصوداً"
        actions={<>
        {[{ l: "إصدار تقرير", i: FileText },{ l: "تصدير PDF", i: Download },{ l: "تحديث", i: RefreshCw }].map(({ l, i: I }) => (
        <button key={l} style={{ border: `1px solid ${GOLD}30`, color: GOLD }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium hover:opacity-80 transition-all">
        <I size={12} /> {l}
        </button>
        ))}
        </>} />
      <div className="relative rounded-2xl overflow-hidden p-4 space-y-2.5 cs">
        <InsetFrame />
        <div className="flex items-center gap-2 flex-wrap">
        <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground flex-shrink-0">
        <Filter size={12} style={{ color: GOLD }} /> التصفية:
        </span>
        {sectorChips.map(c => (
        <button key={c.id} onClick={() => toggleFilter(sectorFilter, setSectorFilter, c.id)}
        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all"
        style={{ border: `1px solid ${sectorFilter.includes(c.id) ? GOLD : "var(--border)"}`,
        background: sectorFilter.includes(c.id) ? `${GOLD}15` : "var(--muted)",
        color: sectorFilter.includes(c.id) ? GOLD : "var(--muted-foreground)" }}>
        <c.icon size={10} /> {c.label}
        </button>
        ))}
        <div className="w-px h-4 flex-shrink-0" style={{ background: "var(--border)" }} />
        {statusChips.map(c => (
        <button key={c.id} onClick={() => toggleFilter(statusFilter, setStatusFilter, c.id)}
        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all"
        style={{ border: `1px solid ${statusFilter.includes(c.id) ? c.color : "var(--border)"}`,
        background: statusFilter.includes(c.id) ? `${c.color}14` : "var(--muted)",
        color: statusFilter.includes(c.id) ? c.color : "var(--muted-foreground)" }}>
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
        {c.label}
        </button>
        ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
        <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground flex-shrink-0">
        <Layers size={12} style={{ color: GOLD }} /> التصنيف:
        </span>
        {catChips.map(c => (
        <button key={c} onClick={() => toggleFilter(catFilter, setCatFilter, c)}
        className="px-3 py-1 rounded-full text-xs font-medium transition-all"
        style={{ border: `1px solid ${catFilter.includes(c) ? GOLD : "var(--border)"}`,
        background: catFilter.includes(c) ? `${GOLD}15` : "var(--muted)",
        color: catFilter.includes(c) ? GOLD : "var(--muted-foreground)" }}>
        {c}
        </button>
        ))}
        {(sectorFilter.length + statusFilter.length + catFilter.length) > 0 && (
        <button onClick={() => { setSectorFilter([]); setStatusFilter([]); setCatFilter([]); }}
        className="px-3 py-1 rounded-full text-xs font-medium text-[#B94A55] hover:opacity-80 transition-all"
        style={{ border: "1px solid #B94A5530", background: "#B94A5510" }}>
        ✕ مسح الكل
        </button>
        )}
        </div>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {OVERVIEW_KPIS.map((k, i) => <KPICard key={i} {...k} />)}
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="relative rounded-2xl overflow-hidden p-4 flex flex-col items-center cs"
        style={{ animation: "card-breathe 6s ease-in-out infinite" }}>
        <InsetFrame />
        <p className="text-xs font-semibold text-foreground mb-2 w-full">توزيع الامتثال</p>
        <div dir="ltr" className="w-full">
        <ResponsiveContainer width="100%" height={130}>
        <PieChart>
        <Pie data={PIE_DATA} innerRadius={38} outerRadius={55} dataKey="value" paddingAngle={2} startAngle={90} endAngle={-270}>
        {PIE_DATA.map(e => <Cell key={`pie-lp-${e.name}`} fill={e.color} opacity={0.9} />)}
        </Pie>
        <Tooltip contentStyle={TT} />
        </PieChart>
        </ResponsiveContainer>
        </div>
        <div className="space-y-1 w-full mt-1">
        {PIE_DATA.slice(0, 3).map((d, i) => (
        <div key={i} className="flex items-center justify-between text-[11px]">
        <span className="flex items-center gap-1.5 text-muted-foreground">
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />{d.name}
        </span>
        <span className="tabular-nums font-bold text-foreground">{d.value.toLocaleString()}</span>
        </div>
        ))}
        </div>
        </div>
        <div className="space-y-2">
        {COMPLIANCE_KPIS.map((c, i) => {
        const statusMap: ComplianceStatus[] = ["compliant", "non-compliant", "partial"];
        return (
        <div key={i} className="relative rounded-xl p-3 overflow-hidden cursor-pointer hover:scale-[1.01] transition-transform duration-200"
        style={{ animation: `card-rise 0.4s ease-out ${i * 0.08}s both`,
        background: `linear-gradient(135deg, var(--card), color-mix(in srgb, var(--card) 90%, ${c.color}))`,
        border: `1px solid ${c.color}22`, boxShadow: `var(--card-shadow), 0 0 20px ${c.color}08` }}
        onClick={() => (window as any)._rasidOpenDrill?.(statusMap[i], `المواقع — ${c.label}`, c.color, c.textColor)}>
        <InsetFrame accent={c.color} />
        <div className="relative flex items-center justify-between">
        <div>
        <div className="text-[22px] font-black tabular-nums leading-none" style={{ color: c.textColor }}>{c.value}</div>
        <div className="text-[11px] text-muted-foreground mt-0.5">{c.label}</div>
        </div>
        <div className="relative w-12 h-12 flex-shrink-0">
        <svg width="48" height="48" viewBox="0 0 48 48" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="24" cy="24" r="18" fill="none" stroke={c.color} strokeOpacity="0.15" strokeWidth="5"/>
        <circle cx="24" cy="24" r="18" fill="none" stroke={c.color} strokeWidth="5"
        strokeDasharray={`${(c.pct/100)*113} 113`} strokeLinecap="round"/>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black" style={{ color: c.textColor }}>{c.pct}%</div>
        </div>
        </div>
        </div>
        );
        })}
        </div>
        <div className="col-span-2 relative rounded-2xl overflow-hidden p-4 cs">
        <InsetFrame />
        <div className="flex items-center justify-between mb-3">
        <div>
        <h3 className="text-sm font-semibold text-foreground">اتجاهات الامتثال الشهرية</h3>
        <p className="text-xs text-muted-foreground">آخر 6 أشهر — معدل التحسن +3.2%</p>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: C_GRN }} />ممتثل</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: C_AMB }} />جزئياً</span>
        </div>
        </div>
        {(() => {
        const W=560, H=160, PAD=16;
        const vals1 = TREND_DATA.map(d=>d.ممتثل as number);
        const vals2 = TREND_DATA.map(d=>d.جزئياً as number);
        const allVals=[...vals1,...vals2];
        const min=Math.min(...allVals)-20, max=Math.max(...allVals)+20;
        const xStep=(W-PAD*2)/(TREND_DATA.length-1);
        const yScale=(v:number)=>PAD+(1-(v-min)/(max-min))*(H-PAD*2);
        const pts=(vals:number[])=>vals.map((v,i)=>`${PAD+i*xStep},${yScale(v)}`).join(" ");
        return (
        <div dir="ltr" style={{ overflow:"hidden" }}>
        <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} style={{ display:"block" }}>
        {[0,1,2,3].map(i=>(
        <line key={`gl-${i}`} x1={PAD} y1={PAD+i*(H-PAD*2)/3} x2={W-PAD} y2={PAD+i*(H-PAD*2)/3}
        stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
        ))}
        <polyline points={pts(vals2)} fill="none" stroke={C_AMB} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
        {vals2.map((v,i)=><circle key={`d2-${i}`} cx={PAD+i*xStep} cy={yScale(v)} r="3" fill={C_AMB}/>)}
        <polyline points={pts(vals1)} fill="none" stroke={C_GRN} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
        {vals1.map((v,i)=><circle key={`d1-${i}`} cx={PAD+i*xStep} cy={yScale(v)} r="3" fill={C_GRN}/>)}
        {TREND_DATA.map((d,i)=>(
        <text key={`lbl-${i}`} x={PAD+i*xStep} y={H-2} textAnchor="middle"
        style={{ fontSize:9, fill:C_SLT, fontFamily:"Tajawal" }}>{d.month}</text>
        ))}
        </svg>
        </div>
        );
        })()}
        </div>
      </div>
      <div>
        <SectionTitle title="امتثال بنود المادة 12" subtitle="تفاصيل الامتثال لكل بند من البنود الثمانية لنظام حماية البيانات الشخصية" />
        <div className="grid grid-cols-4 gap-3">
        {article12Data.map((art, i) => {
        const r = 28; const circ = 2 * Math.PI * r; const dash = (art.pct / 100) * circ;
        return (
        <div key={art.id} className="relative rounded-2xl overflow-hidden p-4"
        style={{ background: `linear-gradient(145deg, var(--card), color-mix(in srgb, var(--card) 92%, ${art.color}))`,
        border: `1px solid ${art.color}22`, boxShadow: "var(--card-shadow)",
        animation: `card-rise 0.35s ease-out ${i * 0.05}s both` }}>
        <InsetFrame accent={art.color} radius={12} />
        <div className="relative flex items-start gap-3">
        <div className="relative flex-shrink-0 w-16 h-16">
        <svg width="64" height="64" viewBox="0 0 64 64" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="32" cy="32" r={r} fill="none" stroke={art.color} strokeOpacity="0.15" strokeWidth="6" />
        <circle cx="32" cy="32" r={r} fill="none" stroke={art.color} strokeWidth="6"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 4px ${art.color}60)` }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-black" style={{ color: art.color }}>{art.pct}%</span>
        <span className="text-[8px] text-muted-foreground font-mono">بند {art.id}</span>
        </div>
        </div>
        <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold text-foreground leading-tight mb-2">{art.label}</p>
        <div className="grid grid-cols-2 gap-1">
        <div className="p-1.5 rounded-lg text-center" style={{ background: "#1E9E5712" }}>
        <div className="text-sm font-black tabular-nums" style={{ color: C_GRN }}>{art.compliant.toLocaleString()}</div>
        <div className="text-[9px] text-muted-foreground">ممتثل</div>
        </div>
        <div className="p-1.5 rounded-lg text-center" style={{ background: "#B94A5512" }}>
        <div className="text-sm font-black tabular-nums" style={{ color: C_RED }}>{art.nc.toLocaleString()}</div>
        <div className="text-[9px] text-muted-foreground">غير ممتثل</div>
        </div>
        </div>
        </div>
        </div>
        </div>
        );
        })}
        </div>
      </div>
      <div>
        <SectionTitle title="التحليل حسب القطاع" subtitle="مقارنة الامتثال بين القطاع الحكومي والخاص" />
        <div className="grid grid-cols-2 gap-4">
        {sectorAnalysis.map((sec, si) => (
        <div key={si} className="relative rounded-2xl overflow-hidden p-4"
        style={{ background: "var(--card)", border: `1px solid ${sec.color}20`, boxShadow: "var(--card-shadow)", animation: `card-rise 0.4s ease-out ${si * 0.1}s both` }}>
        <InsetFrame accent={sec.color} />
        <div className="relative flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${sec.color}14` }}>
        <sec.icon size={15} style={{ color: sec.color }} />
        </div>
        <div>
        <h3 className="text-sm font-bold text-foreground">{sec.label}</h3>
        <p className="text-[10px] text-muted-foreground">{sec.total.toLocaleString()} موقع</p>
        </div>
        </div>
        <div className="flex items-center gap-3">
        <div className="text-center"><div className="text-base font-black" style={{ color: C_GRN }}>{sec.compliant}</div><div className="text-[9px] text-muted-foreground">ممتثل</div></div>
        <div className="text-center"><div className="text-base font-black" style={{ color: C_RED }}>{sec.nc.toLocaleString()}</div><div className="text-[9px] text-muted-foreground">غير ممتثل</div></div>
        <div className="text-center"><div className="text-base font-black" style={{ color: C_AMB }}>{sec.partial.toLocaleString()}</div><div className="text-[9px] text-muted-foreground">نقاء</div></div>
        </div>
        </div>
        <div className="space-y-1.5">
        {article12Data.map((art, ai) => {
        const pct = sec.articles[ai];
        const bc = pct >= 60 ? C_GRN : pct >= 40 ? C_AMB : C_RED;
        return (
        <div key={ai} className="flex items-center gap-2">
        <span className="text-[9px] font-mono text-muted-foreground w-8 flex-shrink-0">بند {art.id}</span>
        <div className="flex-1 h-1.5 rounded-full overflow-hidden cs-muted">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: bc }} />
        </div>
        <span className="text-[9px] font-bold tabular-nums w-7 text-left" style={{ color: bc }}>{pct}%</span>
        </div>
        );
        })}
        </div>
        </div>
        ))}
        </div>
      </div>
      <div>
        <SectionTitle title="التحليل حسب التصنيف" subtitle="تفصيل الامتثال حسب تصنيف المواقع" />
        <div className="grid grid-cols-3 gap-4">
        {classificationData.map((cls, ci) => (
        <div key={ci} className="relative rounded-2xl overflow-hidden p-4"
        style={{ background: "var(--card)", border: `1px solid ${cls.color}20`, boxShadow: "var(--card-shadow)", animation: `card-rise 0.4s ease-out ${ci * 0.09}s both` }}>
        <InsetFrame accent={cls.color} />
        <div className="relative flex items-center justify-between mb-3">
        <div>
        <h3 className="text-sm font-bold text-foreground">{cls.label}</h3>
        <p className="text-[10px] text-muted-foreground">{cls.total.toLocaleString()} موقع</p>
        </div>
        <span className="text-xs font-black px-2 py-0.5 rounded-full" style={{ background: `${cls.color}15`, color: cls.color }}>{cls.pct}%</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 mb-3">
        {[{ l: "رائد", v: cls.leader, c: GOLD },{ l: "غير ممتثل", v: cls.nc, c: C_RED },{ l: "ممتثل", v: cls.compliant, c: C_GRN }].map(s => (
        <div key={s.l} className="p-1.5 rounded-lg text-center" style={{ background: `${s.c}10` }}>
        <div className="text-sm font-black tabular-nums" style={{ color: s.c }}>{s.v.toLocaleString()}</div>
        <div className="text-[9px] text-muted-foreground">{s.l}</div>
        </div>
        ))}
        </div>
        <div className="space-y-1.5">
        {article12Data.map((art, ai) => {
        const pct = cls.articles[ai];
        const bc = pct >= 60 ? C_GRN : pct >= 40 ? C_AMB : C_RED;
        return (
        <div key={ai} className="flex items-center gap-2">
        <span className="text-[9px] font-mono text-muted-foreground w-8 flex-shrink-0">بند {art.id}</span>
        <div className="flex-1 h-1.5 rounded-full overflow-hidden cs-muted">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: bc }} />
        </div>
        <span className="text-[9px] font-bold tabular-nums w-7 text-left" style={{ color: bc }}>{pct}%</span>
        </div>
        );
        })}
        </div>
        </div>
        ))}
        </div>
      </div>
      <div>
        <SectionTitle title="خريطة الامتثال الحرارية وسرعة التحسين" subtitle="خريطة مقارية للقطاعات بنود المادة 12" />
        <div className="grid grid-cols-4 gap-4">
        <div className="relative rounded-2xl overflow-hidden p-4 cs">
        <InsetFrame />
        <p className="text-sm font-bold text-foreground mb-3">سرعة التحسين</p>
        <div className="text-center mb-4">
        <div className="text-4xl font-black" style={{ color: GOLD }}>0%</div>
        <div className="text-xs text-muted-foreground mt-1">متوسط التغيير</div>
        </div>
        {[{ l: "تحسّن",    c: C_GRN, v: 0 },{ l: "ثبات",    c: TEAL, v: 0 },{ l: "تراجع",   c: C_RED, v: 0 },{ l: "دون تغيير", c: C_SLT, v: 0 }].map(s => (
        <div key={s.l} className="flex items-center justify-between py-1.5" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full" style={{ background: s.c }} />
        <span className="text-xs text-foreground">{s.l}</span>
        </div>
        <span className="text-xs font-bold tabular-nums" style={{ color: s.c }}>{s.v}</span>
        </div>
        ))}
        </div>
        <div className="col-span-3 relative rounded-2xl overflow-hidden p-4 cs">
        <InsetFrame />
        <div className="flex items-center gap-2 mb-3">
        <p className="text-sm font-bold text-foreground">خريطة مقارية للقطاعات</p>
        <div className="flex items-center gap-2 mr-auto text-[10px]">
        {[{ c: C_GRN, l: "≥60%" },{ c: TEAL, l: "45-60%" },{ c: C_AMB, l: "30-45%" },{ c: C_RED, l: "<30%" }].map(l => (
        <span key={l.l} className="flex items-center gap-1">
        <span className="w-3 h-3 rounded-sm" style={{ background: l.c }} />{l.l}
        </span>
        ))}
        </div>
        </div>
        <div className="flex items-center gap-1 mb-1 pr-36">
        {article12Data.map(a => (
        <div key={a.id} className="flex-1 text-center text-[9px] font-bold text-muted-foreground">بند {a.id}</div>
        ))}
        </div>
        <div className="space-y-1 max-h-64 overflow-y-auto">
        {heatmapRows.map((row, ri) => (
        <div key={ri} className="flex items-center gap-1 group cursor-pointer"
        onMouseEnter={() => setActiveHeatRow(ri)} onMouseLeave={() => setActiveHeatRow(null)}>
        <div className="text-[9px] text-muted-foreground truncate flex-shrink-0 w-36 group-hover:text-foreground transition-colors">{row.label}</div>
        {row.values.map((v, vi) => (
        <div key={vi} className="flex-1 h-6 rounded flex items-center justify-center text-[9px] font-bold text-white transition-all"
        style={{ background: heatColor(v), opacity: activeHeatRow === ri ? 1 : 0.75,
        transform: activeHeatRow === ri ? "scaleY(1.1)" : "scaleY(1)" }}>
        {v}%
        </div>
        ))}
        </div>
        ))}
        </div>
        </div>
        </div>
      </div>
      <div>
        <SectionTitle title="المقارنة المعيارية" subtitle="مقارنة أداء الامتثال بين القطاعات والتصنيفات" />
        <div className="relative rounded-2xl overflow-hidden cs">
        <InsetFrame />
        <div className="overflow-x-auto">
        <table className="w-full text-xs">
        <thead>
        <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--muted)" }}>
        {["القطاع", "التصنيف", "عدد المواقع", "مستوى الدرجة", "أدنى", "أعلى", "معدل الامتثال", "التوزيع"].map(h => (
        <th key={h} className="px-3 py-2.5 text-right font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
        ))}
        </tr>
        </thead>
        <tbody>
        {benchmarkData.map((row, i) => {
        const cc = row.compliance >= 40 ? C_GRN : row.compliance >= 25 ? C_AMB : C_RED;
        return (
        <tr key={i} className="hover:bg-muted/30 transition-colors" style={{ borderBottom: "1px solid var(--border)", animation: `card-rise 0.25s ease-out ${i * 0.03}s both` }}>
        <td className="px-3 py-2 font-semibold text-foreground">{row.sector}</td>
        <td className="px-3 py-2 text-muted-foreground">{row.cat}</td>
        <td className="px-3 py-2 font-mono font-bold text-foreground tabular-nums">{row.sites.toLocaleString()}</td>
        <td className="px-3 py-2 font-mono font-bold" style={{ color: GOLD }}>{row.score}</td>
        <td className="px-3 py-2 tabular-nums text-muted-foreground">{row.low}</td>
        <td className="px-3 py-2 tabular-nums text-muted-foreground">{row.high}</td>
        <td className="px-3 py-2">
        <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)", minWidth: "40px" }}>
        <div className="h-full rounded-full" style={{ width: `${row.compliance}%`, background: cc }} />
        </div>
        <span className="font-bold tabular-nums" style={{ color: cc }}>{row.compliance}%</span>
        </div>
        </td>
        <td className="px-3 py-2">
        <div className="flex h-3 rounded overflow-hidden gap-px" style={{ minWidth: "60px" }}>
        <div style={{ width: `${row.dist[0]}%`, background: C_GRN, opacity: 0.7 }} />
        <div style={{ width: `${row.dist[1]}%`, background: C_AMB, opacity: 0.7 }} />
        <div style={{ width: `${row.dist[2]}%`, background: C_RED, opacity: 0.7 }} />
        </div>
        </td>
        </tr>
        );
        })}
        </tbody>
        </table>
        </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 relative rounded-2xl overflow-hidden p-5 cs">
        <InsetFrame />
        <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">أداء القطاعات</h3>
        <span className="text-[11px] text-muted-foreground">نسبة الامتثال لكل قطاع</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
        {sectorPerf.map((s, i) => (
        <div key={i} className="p-3 rounded-xl" style={{ background: `${s.color}0A`, border: `1px solid ${s.color}1E`, animation: `card-rise 0.35s ease-out ${i * 0.06}s both` }}>
        <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-foreground">{s.name}</span>
        <div className="text-right">
        <span className="text-base font-black tabular-nums" style={{ color: s.color }}>{s.pct}%</span>
        <span className="block text-[9px] text-muted-foreground">{s.sites.toLocaleString()} موقع</span>
        </div>
        </div>
        <div className="w-full h-1.5 rounded-full overflow-hidden cs-muted">
        <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color, boxShadow: `0 0 6px ${s.color}60` }} />
        </div>
        </div>
        ))}
        </div>
        </div>
        <div className="relative rounded-2xl overflow-hidden p-4 cs">
        <InsetFrame />
        <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-[#1E9E57] animate-pulse flex-shrink-0" />
        <h3 className="text-sm font-semibold text-foreground">النشاط المباشر</h3>
        </div>
        <div className="space-y-2.5">
        {recentActivity.map((a, i) => {
        const c = STATUS_CFG[a.status];
        return (
        <div key={i} className="flex items-start gap-2.5" style={{ animation: `card-rise 0.3s ease-out ${i * 0.07}s both` }}>
        <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: c.dot }} />
        <div className="flex-1 min-w-0">
        <p className="text-[11px] font-mono text-foreground truncate">{a.site}</p>
        <p className="text-[10px] text-muted-foreground">{a.event}</p>
        </div>
        <span className="text-[9px] text-muted-foreground font-mono flex-shrink-0 mt-0.5">{a.time}</span>
        </div>
        );
        })}
        </div>
        <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="grid grid-cols-2 gap-2">
        {[{ l: "فحوص اليوم", v: "47", c: TEAL },{ l: "تنبيهات", v: "12", c: C_AMB }].map(s => (
        <div key={s.l} className="p-2 rounded-lg text-center cs-muted">
        <div className="text-lg font-black tabular-nums" style={{ color: s.c }}>{s.v}</div>
        <div className="text-[10px] text-muted-foreground">{s.l}</div>
        </div>
        ))}
        </div>
        </div>
        </div>
      </div>
      <div className="relative rounded-2xl overflow-hidden cs">
        <InsetFrame />
        <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
        <h3 className="text-sm font-semibold text-foreground">أبرز المواقع المرصودة</h3>
        <span className="text-[11px] text-muted-foreground">آخر فحوصات</span>
        </div>
        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
        {WEBSITES.slice(0, 5).map((site, i) => {
        const sc = site.score >= 80 ? C_GRN : site.score >= 50 ? C_AMB : site.score > 0 ? C_RED : C_SLT;
        return (
        <div key={i} className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/30 transition-all cursor-pointer"
        style={{ animation: `card-rise 0.3s ease-out ${i * 0.05}s both` }}
        onClick={() => (window as any)._rasidOpenSite?.(site)}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${sc}12` }}>
        <Globe size={14} style={{ color: sc }} />
        </div>
        <div className="flex-1 min-w-0">
        <p className="text-[12px] font-semibold text-foreground truncate">{site.name}</p>
        <p className="text-[10px] font-mono text-muted-foreground">{site.url}</p>
        </div>
        <ComplianceBadge status={site.status} />
        <div className="flex items-center gap-2 flex-shrink-0">
        <div className="w-14 h-1.5 rounded-full overflow-hidden cs-muted">
        <div className="h-full rounded-full" style={{ width: `${site.score}%`, background: sc }} />
        </div>
        <span className="text-[11px] font-mono font-bold w-6 text-left" style={{ color: sc }}>{site.score}</span>
        </div>
        <span className="text-[10px] text-muted-foreground hidden lg:block">{site.lastScan}</span>
        </div>
        );
        })}
        </div>
      </div>
    </div>
  );
}
function KPIDashboardPage() {
  const groups = [
    { label: "الامتثال", color: C_GRN, icon: Shield, items: [
      { name: "نسبة الامتثال الكلية", val: "72%", target: "80%", pct: 72 },{ name: "امتثال القطاع الصحي", val: "68%", target: "75%", pct: 68 },{ name: "متوسط نسبة الامتثال", val: "68%", target: "80%", pct: 68 },
    ]},{ label: "الفحص", color: TEAL, icon: Activity, items: [
      { name: "الفحوصات الشهرية", val: "1,247", target: "1,500", pct: 83 },{ name: "الجداول النشطة", val: "5", target: "8", pct: 62 },
    ]},{ label: "الاستجابة", color: C_AMB, icon: Clock, items: [
      { name: "نسبة الرد على الخطابات", val: "78%", target: "90%", pct: 78 },{ name: "الحالات المفتوحة", val: "14", target: "5", pct: 40 },
    ]},
  ];
  return (
    <div className="relative p-5 space-y-4 stagger" style={{ zIndex: 1 }}>
      <CinematicBg page="kpi-dashboard" />
      <PageHeader title="مؤشرات الأداء الرئيسية (KPI)" subtitle="مراقبة الأداء مقابل الأهداف المحددة" icon={Target}
          actions={<>
          <button style={{ border: "1px solid var(--border)"}} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:bg-muted">
          <RefreshCw size={12} /> تحديث
          </button>
          <button style={{ background: GOLD, color: NAVY_BG}} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold">
          <Plus size={12} /> إضافة مؤشر
          </button>
          </>} />
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "متوسط الأداء",       value: "68%",  icon: Award,  color: GOLD    },{ label: "الأهداف المحققة",    value: "17",   icon: CheckCircle2, color: C_GRN },{ label: "المؤشرات النشطة",   value: "86",   icon: Activity, color: TEAL  },{ label: "معدل الامتثال",      value: "72%",  icon: Shield, color: C_AMB },
        ].map((k, i) => <SmallKPI key={i} {...k} delay={i * 0.07} />)}
      </div>
      <div className="space-y-4">
        {groups.map((g, gi) => (
          <PCard key={gi} goldTop className="p-5" style={{ animation: `card-rise 0.4s ease-out ${gi * 0.1}s both` }}>
          <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ background: g.color }}>{gi + 1}</div>
          <g.icon size={14} style={{ color: g.color }} />
          <h3 style={{ color: g.color }} className="text-sm font-bold">{g.label}</h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
          {g.items.map((item, ii) => (
          <div key={ii} className="p-3 rounded-xl cs-muted">
          <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-foreground">{item.name}</span>
          <div className="flex items-center gap-2">
          <span style={{ color: g.color}} className="text-lg font-black">{item.val}</span>
          <span className="text-xs text-muted-foreground">/ هدف: {item.target}</span>
          </div>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${item.pct}%`, background: g.color }} />
          </div>
          </div>
          ))}
          </div>
          </PCard>
        ))}
      </div>
    </div>
  );
}
function RealTimePage() {
  const alerts = [
    { org: "بنك الراجحي", change: "ممتثل جزئياً → غير ممتثل", badge: "تراجع",  color: C_RED, time: "9:42 ص" },{ org: "وزارة التعليم", change: "غير ممتثل → ممتثل جزئياً", badge: "تحسّن", color: C_AMB, time: "9:38 ص" },{ org: "نون للتجارة",  change: "نشط → لا يعمل",           badge: "انخفاض", color: C_SLT, time: "9:21 ص" },
  ];
  return (
    <div className="relative p-5 space-y-4 stagger" style={{ zIndex: 1 }}>
      <CinematicBg page="real-time" />
      <PageHeader title="لوحة الإحصائيات المباشرة" subtitle="آخر تحديث: الإثنين، 7 محرم 1448 هـ — 9:55:00 ص" icon={Radio}
          actions={<>
          <button style={{ background: TEAL, color: NAVY_BG}} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold">
          <Radio size={12} /> تحديث تلقائي
          </button>
          </>} />
      <div className="grid grid-cols-2 gap-4">
        <PCard goldTop className="p-5" style={{ animation: "card-rise 0.4s ease-out 0s both" }}>
          <h3 className="text-sm font-semibold mb-3">
          التنبيهات المباشرة <span className="text-muted-foreground font-normal">— {alerts.length} تنبيه</span>
          </h3>
          <div className="space-y-3">
          {alerts.map((a, i) => (
          <div key={i} className="flex items-start justify-between p-3 rounded-xl" style={{ background: "var(--muted)", animation: `card-rise 0.3s ease-out ${i * 0.08}s both` }}>
          <div>
          <p className="text-sm font-semibold text-foreground">{a.org}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{a.change}</p>
          <p className="text-[10px] text-muted-foreground mt-1">{a.time}</p>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${a.color}18`, color: a.color }}>{a.badge}</span>
          </div>
          ))}
          </div>
        </PCard>
        <div className="space-y-4">
          <PCard goldTop className="p-5" style={{ animation: "card-rise 0.4s ease-out 0.1s both" }}>
          <h3 className="text-sm font-semibold mb-3">آخر الفحوصات <span style={{ color: TEAL }} className="text-xs">● مباشر</span></h3>
          {WEBSITES.slice(0, 4).map((site, i) => (
          <div key={i} className="flex items-center justify-between py-2" style={{ borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
          <span className="text-xs font-mono text-muted-foreground">{site.url}</span>
          <div className="flex items-center gap-2">
          <span className="text-xs font-bold tabular-nums" style={{ color: site.score >= 80 ? C_GRN : site.score >= 50 ? C_AMB : C_RED }}>{site.score}%</span>
          <ComplianceBadge status={site.status} />
          </div>
          </div>
          ))}
          </PCard>
          <PCard goldTop className="p-4" style={{ animation: "card-rise 0.4s ease-out 0.18s both" }}>
          <h3 className="text-sm font-semibold mb-3">حالة الخادم</h3>
          {[{ l: "وقت التشغيل", v: "14 يوم 7 ساعة" },{ l: "الذاكرة", v: "68%" },{ l: "إصدار Node.js", v: "v22.12.0" }].map((r, i) => (
          <div key={i} className="flex items-center justify-between py-1.5 text-xs">
          <span className="text-muted-foreground">{r.l}</span>
          <span className="font-mono text-foreground">{r.v}</span>
          </div>
          ))}
          </PCard>
        </div>
      </div>
    </div>
  );
}
function SmartRasidPage() {
  const [message, setMessage]   = useState("");
  const [messages, setMessages] = useState(CHAT_MESSAGES);
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, thinking]);
  const send = () => {
    if (!message.trim()) return;
    const t = new Date().toLocaleTimeString("ar", { hour: "2-digit", minute: "2-digit" });
    setMessages(prev => [...prev, { role: "user", text: message, time: t }]);
    setMessage("");
    setThinking(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant",
        text: "شكراً على سؤالك. بناءً على تحليل البيانات المتاحة لأكثر من 24,000 موقع مرصود، يمكنني تقديم تقرير مفصل. يرجى تحديد النطاق الزمني المطلوب.",
        time: new Date().toLocaleTimeString("ar", { hour: "2-digit", minute: "2-digit" }) }]);
      setThinking(false);
    }, 1600);
  };
  return (
    <div className="relative flex overflow-hidden" style={{ height: "calc(100vh - 48px)", zIndex: 1 }}>
      <CinematicBg page="smart-rasid" />
      <div className="w-72 flex-shrink-0 flex flex-col gap-4 p-4 overflow-y-auto" style={{ borderLeft: "1px solid var(--border)" }}>
        <PCard goldTop className="overflow-hidden">
        <div className="relative flex justify-center pt-4 pb-2"
        style={{ background: `linear-gradient(180deg, ${GOLD}08 0%, transparent 100%)` }}>
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
        <div className="w-32 h-16 rounded-full blur-2xl opacity-20" style={{ background: GOLD }} />
        </div>
        <ImageWithFallback src={thinking ? characterHands : characterWaving} alt="راصد الذكي"
        className="relative h-44 w-auto object-contain"
        style={{ filter: `drop-shadow(0 8px 24px ${GOLD}20)`, animation: thinking ? undefined : "float-bob 4s ease-in-out infinite" }} />
        </div>
        <div className="px-4 pb-4 text-center">
        <p className="text-base font-black" style={{ color: GOLD}}>راصد الذكي</p>
        <p className="text-xs text-muted-foreground">v6.0 · مساعد الامتثال الوطني</p>
        <div className="flex items-center justify-center gap-1.5 mt-2">
        <span className={`w-1.5 h-1.5 rounded-full ${thinking ? "bg-[#C78B2C]" : "bg-[#1E9E57]"} animate-pulse`} />
        <span className={`text-xs ${thinking ? "text-[#C78B2C]" : "text-[#1E9E57]"}`}>
        {thinking ? "يفكر..." : "نشط ومتاح"}
        </span>
        </div>
        </div>
        </PCard>
        <PCard goldTop className="p-4">
        <h3 className="text-sm font-semibold mb-3">قدرات راصد الذكي</h3>
        {[
        { label: "تحليل سياسات الخصوصية", icon: Eye },{ label: "قياس الامتثال التلقائي",  icon: Shield },{ label: "إنشاء تقارير PDF",        icon: FileText },{ label: "المقارنة القطاعية",        icon: BarChart3 },{ label: "كشف المخالفات",            icon: AlertCircle },
        ].map((c, i) => (
        <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
        <c.icon size={12} style={{ color: GOLD }} className="flex-shrink-0" />
        <span>{c.label}</span>
        </div>
        ))}
        </PCard>
        <div>
        <p className="text-xs font-semibold text-muted-foreground mb-2">اقتراحات سريعة</p>
        <div className="space-y-2">
        {SUGGESTED_PROMPTS.map((p, i) => (
        <button key={i} onClick={() => setMessage(p.text)}
        style={{ border: "1px solid var(--border)"}}
        className="w-full text-right p-2.5 rounded-xl text-xs text-muted-foreground hover:text-foreground hover:bg-card transition-all">
        <div className="flex items-start gap-2"><p.icon size={11} style={{ color: GOLD }} className="flex-shrink-0 mt-0.5" />{p.text}</div>
        </button>
        ))}
        </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="relative flex-shrink-0"
        style={{ background: `linear-gradient(135deg, ${NAVY_BG} 0%, #07102E 100%)`, borderBottom: `1px solid #7C6BAE25` }}>
        <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: "absolute", top: "-50%", left: "30%", width: "300px", height: "200px",
        background: `radial-gradient(ellipse, #7C6BAE12, transparent 65%)`, animation: "shimmer-pulse 6s ease-in-out infinite" }} />
        </div>
        <div className="relative z-10 flex items-center justify-between px-5 py-3">
        <div>
        <div className="flex items-center gap-2 mb-0.5">
        <span className="text-[8px] tracking-[0.3em] uppercase font-bold" style={{ color: "#7C6BAE80" }}>AI INTELLIGENCE COMMAND CENTER</span>
        <span className="text-[8px] tracking-widest font-black" style={{ color: `${GOLD}60` }}>// RASID v6.0</span>
        </div>
        <h2 className="text-base font-black text-white">محادثة مع راصد الذكي</h2>
        <div className="flex items-center gap-2 mt-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#3DBF7A] animate-pulse" />
        <p className="text-[10px] text-slate-400">36 أداة · 7 وكلاء · تحليل فوري</p>
        </div>
        </div>
        <button style={{ border: `1px solid ${GOLD}25`, color: GOLD }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[#C5A55A12]"
        onClick={() => setMessages(CHAT_MESSAGES)}>
        <Plus size={11} /> جلسة جديدة
        </button>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
        background: `linear-gradient(90deg, transparent, ${GOLD}30, transparent)` }} />
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.map((msg, i) => (
        <div key={i} className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}
        style={{ animation: `card-rise 0.3s ease-out ${i * 0.04}s both` }}>
        <div className="max-w-[72%]">
        {msg.role === "assistant" && (
        <div className="flex items-center gap-2 mb-1.5 justify-end">
        <span style={{ color: GOLD }} className="text-xs font-semibold">راصد الذكي</span>
        <div className="w-6 h-6 rounded-xl flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${GOLD}25, ${GOLD}10)`, border: `1px solid ${GOLD}30` }}>
        <Bot size={11} style={{ color: GOLD }} />
        </div>
        </div>
        )}
        <div className="text-sm leading-relaxed whitespace-pre-line"
        style={{
        padding: "14px 16px",
        borderRadius: msg.role === "user" ? "20px 4px 20px 20px" : "4px 20px 20px 20px",
        background: msg.role === "user"
        ? `linear-gradient(135deg, ${GOLD}14, ${GOLD}08)`
        : `linear-gradient(135deg, #07102E, #0B1640)`,
        border: `1px solid ${msg.role === "user" ? GOLD + "25" : TEAL + "15"}`, color: "var(--foreground)",
        boxShadow: msg.role === "assistant" ? `0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 ${TEAL}10` : "none"}}>
        {msg.text}
        </div>
        <div className={`text-[9px] text-muted-foreground mt-1 font-mono ${msg.role === "user" ? "text-right" : "text-left"}`}>{msg.time}</div>
        </div>
        </div>
        ))}
        {thinking && (
        <div className="flex justify-end" style={{ animation: "reveal-up 0.3s ease-out both" }}>
        <div className="glass-card p-3.5 rounded-2xl">
        <div className="flex items-center gap-1.5">
        {[0, 1, 2].map(j => <div key={j} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: GOLD, animationDelay: `${j * 0.15}s` }} />)}
        </div>
        </div>
        </div>
        )}
        <div ref={endRef} />
        </div>
        <div className="px-5 py-4 flex-shrink-0 relative"
        style={{ background: `linear-gradient(180deg, transparent, var(--card))`, borderTop: `1px solid ${GOLD}12` }}>
        <div className="flex items-end gap-3 p-1 rounded-2xl"
        style={{ background: "var(--card)", border: `1px solid ${GOLD}18`, boxShadow: `0 4px 20px rgba(0,0,0,0.15), 0 0 20px ${GOLD}06` }}>
        <textarea value={message} onChange={e => setMessage(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
        placeholder="اسأل راصد الذكي — تحليل سياسة، مقارنة قطاعات، تقرير فوري…"
        rows={2} className="flex-1 px-4 py-3 text-sm resize-none focus:outline-none text-foreground placeholder:text-muted-foreground bg-transparent" />
        <button onClick={send} disabled={!message.trim()}
        className="w-11 h-11 m-1 rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-30 hover:opacity-90 active:scale-95 transition-all"
        style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_PALE})`, color: NAVY_BG, boxShadow: `0 4px 12px ${GOLD}30` }}>
        <Send size={15} />
        </button>
        </div>
        <p className="text-[9px] text-muted-foreground text-center mt-2 tracking-wide">
        RASID AI · محمي بمعايير NDMO · جميع الاستعلامات مسجّلة ومدقّقة
        </p>
        </div>
      </div>
    </div>
  );
}
const SCAN_CATEGORIES = [
  "كل المحتوى", "سفارات", "تعليم", "تجارة إلكترونية", "دفاع", "خدمات",
  "مصارف/بنوك", "بلديات/إدارات", "غير مصنف", "صحة", "قانون", "نشر",
  "بيانات/استخبارات", "محطة", "مستشفى", "علوم", "الاتصالات",
];
const SCAN_SITES = [
  "abdulhamed.med.sa", "ablagh.med.sa", "albga.med.sa", "ajk.med.sa",
  "amc-sa.com", "charity.gov.sa", "misa.gov.sa", "spa.gov.sa",
  "vision2030.gov.sa", "cdc.gov.sa", "moh.gov.sa", "sfda.gov.sa",
];
const SCAN_FIELDS = [
  { l: "رابط الموقع", c: true },{ l: "عنوان الصفحة", c: true },{ l: "وصف الموقع", c: false },{ l: "ترتيب التصفح", c: false },{ l: "نوع الموقع", c: false },{ l: "نص المحتوى", c: true },{ l: "تاريخ النشر", c: false },{ l: "القطاع", c: false },{ l: "النوع/الفئة", c: false },{ l: "اللغة المستخدمة", c: false },{ l: "بيانات Meta", c: false },{ l: "وسائل التواصل", c: false },{ l: "صور الصفحة", c: false },{ l: "عدد الصفحات", c: false },{ l: "سياسة الخصوصية", c: true },{ l: "الشروط والأحكام", c: false },{ l: "إشعار الكوكيز", c: false },{ l: "أيقونات الموقع", c: false },
];
const SCAN_SECTORS = [
  { id: "all",     l: "القطاع الكلي",   count: 24983 },{ id: "private", l: "القطاع الخاص",   count: 16142 },{ id: "gov",     l: "القطاع الحكومي", count: 8841  },
];
const SCAN_SAVED_LISTS = [
  { name: "الجهات الحكومية الكبرى", count: 45, date: "5 محرم 1448" },{ name: "القطاع البنكي الكامل",   count: 38, date: "3 محرم 1448" },{ name: "مواقع وزارة الصحة",      count: 27, date: "1 محرم 1448" },
];
const SCAN_TABS = [
  { id: "links",     l: "روابط",       icon: Globe        },{ id: "search",    l: "بحث",         icon: SearchIcon   },{ id: "classify",  l: "التصنيفات",   icon: Layers       },{ id: "contains",  l: "يحتوي",       icon: Hash         },{ id: "lists",     l: "القوائم",     icon: BookOpen     },{ id: "settings",  l: "الإعدادات",   icon: Settings     },{ id: "schedules", l: "الجدولات",    icon: Calendar     },{ id: "launch",    l: "لوحة الزحف",  icon: Activity     },
];
function AdvancedScanPage() {
  const [tab, setTab]               = useState<"links"|"search"|"classify"|"contains"|"lists"|"settings"|"schedules"|"launch">("classify");
  const [sector, setSector]         = useState("all");
  const [activeCat, setActiveCat]   = useState("كل المحتوى");
  const [selectedSites, setSelectedSites] = useState<Set<string>>(new Set());
  const [siteSearch, setSiteSearch] = useState("");
  const [urlText, setUrlText]       = useState("");
  const [searchText, setSearchText] = useState("");
  const [containsText, setContainsText] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [scanning, setScanning]     = useState(false);
  const [scanPct, setScanPct]       = useState(0);
  const [siteProgress, setSiteProgress] = useState<Record<string, number>>({});
  const [toggles, setToggles] = useState({
    deepScan: true, parallel: true, screenshots: false,
    extractText: true, scanApps: false, dynamicBypass: false, bypassUnavailable: false});
  const [nums, setNums] = useState({ saveInterval: 50, connTimeout: 20, depth: 3, concurrency: 8, pageTimeout: 30 });
  const selCount = selectedSites.size || (sector !== "all" || activeCat !== "كل المحتوى" ? 483 : 0);
  const enabledChips = [
    toggles.deepScan && "فحص عميق", toggles.parallel && "فحص متوازٍ", toggles.screenshots && "لقطات شاشة",
    toggles.extractText && "استخراج النصوص", toggles.scanApps && "فحص التطبيقات", toggles.dynamicBypass && "تجاوز ديناميكي",
  ].filter(Boolean) as string[];
  const filteredSites = SCAN_SITES.filter(s => siteSearch === "" || s.includes(siteSearch));
  const toggleSite = (s: string) => setSelectedSites(prev => { const n = new Set(prev); n.has(s) ? n.delete(s) : n.add(s); return n; });
  const startScan = () => {
    setShowConfirm(false); setScanning(true); setScanPct(0);
    const initProg: Record<string, number> = {};
    SCAN_SITES.slice(0, 7).forEach(s => { initProg[s] = 0; });
    setSiteProgress(initProg);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 2.4;
      if (p >= 100) { clearInterval(iv); setScanPct(100); setTimeout(() => setScanning(false), 1100); }
      else {
        setScanPct(p);
        setSiteProgress(prev => { const n = { ...prev }; Object.keys(n).forEach(k => { n[k] = Math.min(100, (n[k] || 0) + Math.random() * 11); }); return n; });
      }
    }, 300);
  };
  const phases = [
    { l: "تحضير الهدف",      done: scanPct > 8,   active: scanPct <= 8 },{ l: "الزحف والاستكشاف", done: scanPct > 28,  active: scanPct <= 28 && scanPct > 8 },{ l: "استخراج النصوص",   done: scanPct > 48,  active: scanPct <= 48 && scanPct > 28 },{ l: "لقطة الشاشة",      done: scanPct > 66,  active: scanPct <= 66 && scanPct > 48 },{ l: "تحليل الامتثال",   done: scanPct > 86,  active: scanPct <= 86 && scanPct > 66 },{ l: "إنشاء التقرير",    done: scanPct >= 100, active: scanPct <= 100 && scanPct > 86 },
  ];
  if (scanning) {
    return (
      <div className="relative flex flex-col overflow-hidden" style={{ height: "calc(100vh - 48px)", zIndex: 1 }}>
        <CinematicBg page="advanced-scan" />
        <div className="relative flex-shrink-0 px-5 py-3 z-10"
        style={{ background: `linear-gradient(135deg, #04091C 0%, #07102E 100%)`, borderBottom: `1px solid ${GOLD}1F` }}>
        <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: C_EMR, boxShadow: "0 0 10px #3DBF7A", animation: "status-blink 1.3s ease-in-out infinite" }} />
        <span className="text-xs font-black tracking-[0.18em] uppercase" style={{ color: C_EMR}}>LIVE SCAN OPERATIONS CENTER</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${GOLD}20`, color: GOLD }}>
        {Math.round(scanPct * 4.83)} / {selCount || 483} موقع
        </span>
        </div>
        <span className="text-xs font-mono text-slate-400">~{Math.max(0, Math.round((100 - scanPct) * 0.49))} دقيقة متبقية</span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
        <div className="h-full rounded-full transition-all duration-500 relative overflow-hidden"
        style={{ width: `${scanPct}%`, background: `linear-gradient(90deg, ${GOLD}, #3DBF7A)`, boxShadow: `0 0 12px ${GOLD}70` }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)", animation: "shimmer-sweep 1.8s ease-in-out infinite" }} />
        </div>
        </div>
        </div>
        <div className="flex-1 overflow-auto p-4 grid grid-cols-3 gap-4 relative z-10">
        <div className="flex flex-col gap-4">
        <div className="relative p-5 rounded-2xl flex flex-col items-center"
        style={{ background: "var(--card)", border: `1px solid ${GOLD}1A`, boxShadow: "var(--card-shadow)" }}>
        <div className="absolute top-0 inset-x-0 h-[1.5px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
        <CircularProgress pct={scanPct} size={168} />
        <p className="text-xs text-muted-foreground mt-2">{Math.round(scanPct * 4.83)} موقع من {selCount || 483}</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
        {[
        { l: "مكتمل", v: Math.floor(scanPct * 4.2), c: C_EMR },{ l: "جارٍ",   v: Math.min(8, Math.ceil((100 - scanPct) / 14)), c: GOLD },{ l: "فشل",   v: Math.floor(scanPct * 0.12), c: "#D9728A" },
        ].map(s => (
        <div key={s.l} className="p-2.5 rounded-xl text-center" style={{ background: "var(--card)", border: `1px solid ${s.c}20` }}>
        <div style={{ color: s.c}} className="text-lg font-black leading-none">{s.v}</div>
        <div className="text-[9px] text-muted-foreground mt-0.5">{s.l}</div>
        </div>
        ))}
        </div>
        <div className="relative flex-1 flex items-end justify-center rounded-2xl overflow-hidden p-3"
        style={{ background: `linear-gradient(180deg, transparent, ${GOLD}06)` }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div style={{ width: 130, height: 130, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}1A, transparent 70%)`, animation: "rasidPulse 2.5s ease-in-out infinite" }} />
        </div>
        <ImageWithFallback src={characterShmagh} alt="راصد يفحص" className="relative h-40 w-auto object-contain"
        style={{ filter: `drop-shadow(0 8px 20px ${GOLD}28)`, animation: "float-bob 3.5s ease-in-out infinite" }} />
        <div className="absolute bottom-3 inset-x-3 text-center">
        <span className="text-[10px] px-2 py-1 rounded-full" style={{ background: `${GOLD}15`, color: GOLD}}>راصد يدير العملية</span>
        </div>
        </div>
        <div className="flex gap-2">
        <button className="flex-1 py-2 rounded-xl text-xs font-bold" style={{ background: "#C78B2C26", color: C_AMB, border: "1px solid #C78B2C30"}}>⏸ إيقاف مؤقت</button>
        <button onClick={() => { setScanning(false); setScanPct(0); }} className="flex-1 py-2 rounded-xl text-xs font-bold" style={{ background: "#B94A5526", color: "#D9728A", border: "1px solid #B94A5530"}}>◼ إيقاف</button>
        </div>
        </div>
        <div className="space-y-3">
        <div className="p-4 rounded-2xl" style={{ background: "var(--card)", border: `1px solid ${GOLD}1F`, boxShadow: "var(--card-shadow)" }}>
        <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-2 rounded-full" style={{ background: GOLD, animation: "status-blink 1s ease-in-out infinite" }} />
        <HudLabel color={`${GOLD}90`}>SCANNING NOW</HudLabel>
        </div>
        <p className="text-sm font-mono font-bold text-foreground mb-3">{SCAN_SITES[Math.floor(scanPct / 15) % SCAN_SITES.length]}</p>
        <div className="w-full h-2 rounded-full overflow-hidden cs-muted">
        <div style={{ width: `${Math.min(100, (scanPct % 15) * 6.7)}%`, height: "100%", background: `linear-gradient(90deg, ${GOLD}, #3DBF7A)`, transition: "width 0.3s", boxShadow: `0 0 6px ${GOLD}80` }} />
        </div>
        </div>
        <div className="p-4 rounded-2xl space-y-1.5 cs">
        <div className="flex items-center gap-2 mb-3">
        <div className="w-1.5 h-4 rounded-full" style={{ background: GOLD }} />
        <p className="text-xs font-bold text-foreground">مراحل الفحص</p>
        </div>
        {phases.map((ph, i) => (
        <div key={i} className="flex items-center gap-2.5 py-1.5 px-2.5 rounded-xl transition-all duration-300"
        style={{ background: ph.active ? `${GOLD}0A` : "transparent", border: `1px solid ${ph.active ? GOLD + "22" : "transparent"}` }}>
        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: ph.done ? "#3DBF7A20" : ph.active ? `${GOLD}20` : "var(--muted)", border: `1px solid ${ph.done ? C_EMR : ph.active ? GOLD : "var(--border)"}` }}>
        {ph.done ? <CheckCircle2 size={11} style={{ color: C_EMR }} /> : ph.active ? <div style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD, animation: "shimmer-pulse 0.8s ease-in-out infinite" }} /> : <span style={{ color: "var(--muted-foreground)", fontSize: 9 }}>{i + 1}</span>}
        </div>
        <span className="text-xs flex-1" style={{ color: ph.done ? C_EMR : ph.active ? GOLD : "var(--muted-foreground)", fontWeight: ph.active ? 600 : 400 }}>{ph.l}</span>
        {ph.active && <span className="text-[9px] font-mono animate-pulse" style={{ color: GOLD }}>جارٍ</span>}
        {ph.done && <CheckCircle2 size={10} style={{ color: C_EMR }} />}
        </div>
        ))}
        </div>
        </div>
        <div className="rounded-2xl flex flex-col overflow-hidden cs">
        <div className="px-4 py-3 flex-shrink-0 flex items-center gap-2" style={{ borderBottom: "1px solid var(--border)" }}>
        <span className="w-2 h-2 rounded-full" style={{ background: C_EMR, animation: "status-blink 1.3s ease-in-out infinite" }} />
        <p className="text-xs font-bold text-foreground">سجل العمليات المباشر</p>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {Object.entries(siteProgress).map(([site, pct], i) => {
        const done = pct >= 100; const active = pct > 0 && pct < 100;
        const sc = done ? C_EMR : active ? GOLD : C_SLT;
        return (
        <div key={site} className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-muted/40 transition-all" style={{ animation: `card-rise 0.25s ease-out ${i * 0.04}s both` }}>
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: sc, boxShadow: active ? `0 0 6px ${GOLD}` : "none", animation: active ? "shimmer-pulse 1s ease-in-out infinite" : "none" }} />
        <span className="text-[10px] font-mono text-foreground truncate flex-1">{site}</span>
        <span style={{ color: sc}} className="text-[10px] font-bold">{done ? "تم" : active ? `${Math.round(pct)}%` : "—"}</span>
        </div>
        );
        })}
        {SCAN_SITES.slice(7).map((site, i) => (
        <div key={`q-${i}`} className="flex items-center gap-2 py-1.5 px-2 rounded-lg opacity-40">
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: C_SLT }} />
        <span className="text-[10px] font-mono text-muted-foreground truncate flex-1">{site}</span>
        <span className="text-[10px] text-muted-foreground">قائمة الانتظار</span>
        </div>
        ))}
        </div>
        <div className="px-3 py-2 flex-shrink-0 text-center" style={{ borderTop: "1px solid var(--border)" }}>
        <span className="text-[9px] text-muted-foreground font-mono">{Math.round(scanPct * 4.83)} حدث · تحديث كل 300ms</span>
        </div>
        </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative flex overflow-hidden" style={{ height: "calc(100vh - 48px)", zIndex: 1 }}>
      <CinematicBg page="advanced-scan" />
      <div className="w-60 flex-shrink-0 flex flex-col overflow-hidden relative z-10"
         style={{ borderLeft: "1px solid var(--border)", background: "var(--muted)" }}>
        <div className="px-3 py-3 flex-shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-bold text-foreground">المواقع المحددة</span>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black transition-all"
        style={{ background: selCount > 0 ? GOLD : "var(--border)", color: selCount > 0 ? NAVY_BG : "var(--muted-foreground)",
        animation: selCount > 0 ? "count-pop 0.3s ease-out" : "none" }}>
        {selCount || 0}
        </div>
        </div>
        <HudLabel color={`${GOLD}70`}>SCAN TARGETS</HudLabel>
        </div>
        <div className="flex-1 overflow-y-auto p-2.5">
        {selCount === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center px-2">
        <div className="relative mb-3">
        <div style={{ position: "absolute", inset: -10, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}18, transparent 70%)`, animation: "rasidPulse 3s ease-in-out infinite" }} />
        <ImageWithFallback src={characterWaving} alt="راصد" className="relative h-24 w-auto object-contain" style={{ filter: `drop-shadow(0 4px 12px ${GOLD}25)` }} />
        </div>
        <p className="text-xs font-semibold text-foreground mb-1">لم تختر أي موقع بعد</p>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
        اختر المواقع من التصنيفات أو أضف روابط، وسأبدأ الفحص فوراً.
        </p>
        </div>
        ) : (
        <div className="space-y-2.5">
        {enabledChips.length > 0 && (
        <div>
        <p className="text-[9px] text-muted-foreground mb-1.5 font-semibold tracking-wide">الخيارات المفعّلة</p>
        <div className="flex flex-wrap gap-1">
        {enabledChips.map(c => (
        <span key={c} className="text-[9px] px-1.5 py-0.5 rounded-md font-medium" style={{ background: "#3DBF7A18", color: C_EMR}}>✓ {c}</span>
        ))}
        </div>
        </div>
        )}
        {selectedSites.size > 0 && (
        <div className="space-y-1">
        <p className="text-[9px] text-muted-foreground mb-1 font-semibold tracking-wide">النطاقات المحددة</p>
        {[...selectedSites].map((s, i) => (
        <div key={s} className="flex items-center gap-1.5 p-1.5 rounded-lg group/sel" style={{ background: "var(--card)", border: "1px solid var(--border)", animation: `card-rise 0.25s ease-out ${i * 0.04}s both` }}>
        <Globe size={10} className="text-muted-foreground flex-shrink-0" />
        <span className="text-[10px] font-mono text-foreground truncate flex-1">{s}</span>
        <button onClick={() => toggleSite(s)} className="text-muted-foreground hover:text-[#D9728A] opacity-0 group-hover/sel:opacity-100 transition-all flex-shrink-0">✕</button>
        </div>
        ))}
        </div>
        )}
        {selectedSites.size === 0 && selCount > 0 && (
        <div className="p-2.5 rounded-lg text-center" style={{ background: "var(--card)", border: `1px dashed ${GOLD}30` }}>
        <p className="text-[10px] text-muted-foreground">محدد عبر التصنيف: <span className="font-bold" style={{ color: GOLD }}>{selCount}</span> موقع</p>
        </div>
        )}
        </div>
        )}
        </div>
        <div className="p-3 space-y-2 flex-shrink-0" style={{ borderTop: "1px solid var(--border)" }}>
        <button onClick={() => selCount > 0 && setShowConfirm(true)} disabled={selCount === 0}
        className="w-full py-2.5 rounded-xl text-sm font-black flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40"
        style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_PALE})`, color: NAVY_BG, boxShadow: selCount > 0 ? `0 4px 18px ${GOLD}35` : "none" }}>
        <Play size={14} fill={NAVY_BG} /> بدء الفحص
        </button>
        <div className="grid grid-cols-2 gap-2">
        <button className="py-1.5 rounded-lg text-[11px] font-medium text-muted-foreground hover:bg-card transition-all" style={{ border: "1px solid var(--border)"}}>جدولة</button>
        <button className="py-1.5 rounded-lg text-[11px] font-medium text-muted-foreground hover:bg-card transition-all" style={{ border: "1px solid var(--border)"}}>سجل الفحوصات</button>
        </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="relative px-5 py-4 flex-shrink-0" style={{ background: `linear-gradient(135deg, #04091C 0%, #071A18 60%, #04091C 100%)`, borderBottom: "1px solid var(--border)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: "absolute", top: "-40%", right: "12%", width: 320, height: 320, background: `radial-gradient(circle, #1E9E5712, transparent 65%)`, animation: "shimmer-pulse 5s ease-in-out infinite" }} />
        {[260, 170, 90].map((s, i) => (
        <div key={i} style={{ position: "absolute", width: s, height: s, left: "8%", top: "10%", borderRadius: "50%", border: `1px solid #1E9E57${["12","18","22"][i]}`, transform: "translate(-50%,0)", animation: `shield-pulse ${4 + i}s ease-in-out ${i * 0.5}s infinite` }} />
        ))}
        </div>
        <div className="relative z-10 flex items-center gap-3">
        <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: C_EMR, animation: "status-blink 1.5s ease-in-out infinite" }} />
        <HudLabel color={C_EMR}>SCAN COMMAND CONSOLE · ENGINE READY</HudLabel>
        </div>
        <h1 className="text-xl font-black text-white">محرك الفحص الموحّد</h1>
        <p className="text-xs text-slate-400 mt-0.5">مركز تشغيل الفحص الوطني — اختر المصدر، اضبط الإعدادات، ثم انطلق</p>
        </div>
        <ImageWithFallback src={characterShmagh} alt="راصد" className="h-16 w-auto object-contain flex-shrink-0"
        style={{ filter: `drop-shadow(0 4px 12px ${GOLD}25)`, animation: "float-bob 4s ease-in-out infinite" }} />
        </div>
        </div>
        <div className="flex items-center gap-1 px-3 pt-3 flex-shrink-0 overflow-x-auto" style={{ borderBottom: "1px solid var(--border)" }}>
        {SCAN_TABS.map(t => {
        const on = tab === t.id;
        return (
        <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
        className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold whitespace-nowrap transition-all border-b-2 relative"
        style={{ color: on ? GOLD : "var(--muted-foreground)", borderColor: on ? GOLD : "transparent" }}>
        <t.icon size={13} style={{ color: on ? GOLD : "var(--muted-foreground)" }} />
        {t.l}
        </button>
        );
        })}
        </div>
        <div className="flex-1 overflow-y-auto p-4" key={tab} style={{ animation: "fadeInPage 0.25s ease-out" }}>
        {tab === "links" && (
        <div className="max-w-2xl space-y-4">
        <GlassPanel frame={false} className="p-5">
        <div className="flex items-center gap-2 mb-3">
        <Globe size={15} style={{ color: GOLD }} />
        <h3 className="text-sm font-bold">إدخال الروابط يدوياً</h3>
        </div>
        <textarea value={urlText} onChange={e => setUrlText(e.target.value)} rows={7} dir="ltr"
        placeholder={"https://example.gov.sa\nhttps://site2.com.sa\nرابط واحد في كل سطر..."}
        className="w-full px-4 py-3 rounded-xl text-sm font-mono resize-none focus:outline-none focus:ring-1 text-foreground placeholder:text-muted-foreground"
        style={{ border: "1px solid var(--border)", background: "var(--input-background)" }} />
        <div className="flex items-center gap-2 mt-3">
        <button className="px-4 py-2 rounded-lg text-sm font-bold" style={{ background: GOLD, color: NAVY_BG}}>إضافة إلى القائمة</button>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted transition-all" style={{ border: "1px solid var(--border)"}}>
        <Upload size={13} /> رفع CSV / Excel
        </button>
        </div>
        </GlassPanel>
        </div>
        )}
        {tab === "search" && (
        <div className="max-w-2xl space-y-4">
        <GlassPanel frame={false} className="p-5">
        <div className="flex items-center gap-2 mb-3">
        <SearchIcon size={15} style={{ color: GOLD }} />
        <h3 className="text-sm font-bold">بحث عن المواقع</h3>
        </div>
        <div className="flex items-center gap-2">
        <div className="flex-1 relative">
        <SearchIcon size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={searchText} onChange={e => setSearchText(e.target.value)} dir="rtl"
        placeholder="ابحث بالكلمة المفتاحية أو النطاق..."
        className="w-full pr-9 pl-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 text-foreground placeholder:text-muted-foreground"
        style={{ border: "1px solid var(--border)", background: "var(--input-background)"}} />
        </div>
        <button className="px-5 py-2.5 rounded-xl text-sm font-bold" style={{ background: GOLD, color: NAVY_BG}}>بحث</button>
        </div>
        {searchText ? (
        <div className="mt-4 space-y-1.5">
        {filteredSites.slice(0, 5).map(s => (
        <div key={s} onClick={() => toggleSite(s)} className="flex items-center gap-2 p-2.5 rounded-xl cursor-pointer hover:bg-muted transition-all" style={{ border: `1px solid ${selectedSites.has(s) ? GOLD : "var(--border)"}` }}>
        <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0" style={{ border: `1px solid ${selectedSites.has(s) ? GOLD : "var(--border)"}`, background: selectedSites.has(s) ? GOLD : "transparent" }}>
        {selectedSites.has(s) && <CheckCircle2 size={9} style={{ color: NAVY_BG }} />}
        </div>
        <span className="text-xs font-mono text-foreground">{s}</span>
        </div>
        ))}
        </div>
        ) : (
        <div className="mt-6 flex flex-col items-center text-center py-6">
        <SearchIcon size={26} className="text-muted-foreground opacity-30 mb-2" />
        <p className="text-xs text-muted-foreground">ابدأ البحث للعثور على المواقع وإضافتها</p>
        </div>
        )}
        </GlassPanel>
        </div>
        )}
        {tab === "classify" && (
        <div className="space-y-4">
        <button onClick={() => { setSector("all"); setActiveCat("كل المحتوى"); }}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
        style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_PALE})`, color: NAVY_BG, boxShadow: `0 4px 16px ${GOLD}30` }}>
        <CheckCircle2 size={14} fill={NAVY_BG} /> تحديد مجموع المواقع (24,983)
        </button>
        <GlassPanel frame={false} className="p-4">
        <p className="text-xs text-muted-foreground mb-2 font-semibold">القطاع</p>
        <div className="flex items-center gap-2 flex-wrap mb-4">
        {SCAN_SECTORS.map(s => (
        <button key={s.id} onClick={() => setSector(s.id)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
        style={{ background: sector === s.id ? GOLD : "var(--muted)", color: sector === s.id ? NAVY_BG : "var(--muted-foreground)" }}>
        {s.l} <span className="opacity-70 font-mono">({s.count.toLocaleString()})</span>
        </button>
        ))}
        </div>
        <p className="text-xs text-muted-foreground mb-2 font-semibold">التصنيفات</p>
        <div className="flex flex-wrap gap-1.5">
        {SCAN_CATEGORIES.map(cat => (
        <button key={cat} onClick={() => setActiveCat(cat)}
        className="px-2.5 py-1 rounded-full text-[11px] font-medium transition-all"
        style={{ background: activeCat === cat ? C_VIO : "var(--muted)", color: activeCat === cat ? "#fff" : "var(--muted-foreground)", border: `1px solid ${activeCat === cat ? C_VIO : "transparent"}` }}>
        {cat}
        </button>
        ))}
        </div>
        </GlassPanel>
        <GlassPanel frame={false} className="p-4">
        <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 relative">
        <SearchIcon size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={siteSearch} onChange={e => setSiteSearch(e.target.value)} dir="ltr" placeholder="ابحث عن موقع أو نطاق"
        className="w-full pr-8 pl-4 py-2 rounded-lg text-xs focus:outline-none text-foreground placeholder:text-muted-foreground"
        style={{ border: "1px solid var(--border)", background: "var(--input-background)", fontFamily: "monospace" }} />
        </div>
        <span className="text-[10px] text-muted-foreground">{filteredSites.length} نتيجة</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 max-h-64 overflow-y-auto">
        {filteredSites.map((s, i) => (
        <div key={s} onClick={() => toggleSite(s)} className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-muted transition-all"
        style={{ border: `1px solid ${selectedSites.has(s) ? GOLD : "var(--border)"}`, background: selectedSites.has(s) ? `${GOLD}08` : "transparent", animation: `card-rise 0.25s ease-out ${i * 0.03}s both` }}>
        <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0" style={{ border: `1px solid ${selectedSites.has(s) ? GOLD : "var(--border)"}`, background: selectedSites.has(s) ? GOLD : "transparent" }}>
        {selectedSites.has(s) && <CheckCircle2 size={9} style={{ color: NAVY_BG }} />}
        </div>
        <span className="text-[11px] font-mono text-foreground truncate">{s}</span>
        </div>
        ))}
        </div>
        </GlassPanel>
        </div>
        )}
        {tab === "contains" && (
        <div className="max-w-2xl space-y-4">
        <GlassPanel frame={false} className="p-5">
        <div className="flex items-center gap-2 mb-3">
        <Hash size={15} style={{ color: GOLD }} />
        <h3 className="text-sm font-bold">المواقع التي تحتوي على</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-3">أدخل نمط نطاق أو مصطلحاً للعثور على المواقع المطابقة (مثال: gov.sa أو "خصوصية").</p>
        <input value={containsText} onChange={e => setContainsText(e.target.value)} dir="ltr" placeholder="gov.sa"
        className="w-full px-4 py-2.5 rounded-xl text-sm font-mono focus:outline-none focus:ring-1 text-foreground placeholder:text-muted-foreground"
        style={{ border: "1px solid var(--border)", background: "var(--input-background)" }} />
        <button className="mt-3 px-4 py-2 rounded-lg text-sm font-bold" style={{ background: GOLD, color: NAVY_BG}}>تطبيق المطابقة</button>
        </GlassPanel>
        </div>
        )}
        {tab === "lists" && (
        <div className="space-y-4">
        <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold">القوائم المحفوظة <span className="text-muted-foreground font-normal">({SCAN_SAVED_LISTS.length})</span></h3>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: GOLD, color: NAVY_BG}}><Plus size={12} /> قائمة جديدة</button>
        </div>
        <div className="grid grid-cols-3 gap-3">
        {SCAN_SAVED_LISTS.map((l, i) => (
        <GlassPanel key={i} frame={false} className="p-4" style={{ animation: `card-rise 0.3s ease-out ${i * 0.07}s both` }}>
        <div className="flex items-center gap-2 mb-2">
        <BookOpen size={14} style={{ color: GOLD }} />
        <p className="text-sm font-semibold text-foreground flex-1">{l.name}</p>
        </div>
        <p className="text-xs text-muted-foreground">{l.count} موقع · {l.date}</p>
        <button className="w-full mt-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: `${GOLD}15`, color: GOLD}}>استخدام القائمة</button>
        </GlassPanel>
        ))}
        </div>
        </div>
        )}
        {tab === "settings" && (
        <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2.5">
        <p className="text-xs font-bold text-foreground mb-1">خيارات الفحص</p>
        {[
        { k: "deepScan",          l: "فحص عميق",          d: "زحف أعمق لكل صفحات الموقع" },{ k: "parallel",          l: "فحص متوازٍ",        d: "تشغيل عدة فحوص في آن واحد" },{ k: "screenshots",       l: "التقاط لقطات شاشة", d: "حفظ صورة لكل صفحة مفحوصة" },{ k: "extractText",       l: "استخراج النصوص",    d: "تحليل النص الكامل للصفحات" },{ k: "scanApps",          l: "فحص التطبيقات",     d: "كشف وتحليل تطبيقات الويب" },{ k: "dynamicBypass",     l: "تجاوز ديناميكي",    d: "تجاوز الحماية (Headless)" },{ k: "bypassUnavailable", l: "تجاوز المحتوى غير المتاح", d: "متابعة الفحص عند تعذّر الوصول" },
        ].map(opt => (
        <div key={opt.k} className="flex items-center justify-between p-3 rounded-xl gap-3" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">{opt.l}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{opt.d}</p>
        </div>
        <div onClick={() => setToggles(p => ({ ...p, [opt.k]: !(p as any)[opt.k] }))}
        className="w-10 h-5 rounded-full relative cursor-pointer flex-shrink-0 transition-all"
        style={{ background: (toggles as any)[opt.k] ? C_GRN : "var(--border)" }}>
        <div className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all" style={{ right: (toggles as any)[opt.k] ? "2px" : "auto", left: (toggles as any)[opt.k] ? "auto" : "2px" }} />
        </div>
        </div>
        ))}
        </div>
        <div className="space-y-3">
        <p className="text-xs font-bold text-foreground mb-1">الإعدادات الرقمية</p>
        <GlassPanel frame={false} className="p-4 space-y-3">
        {[
        { k: "saveInterval", l: "فاصل الحفظ التدريجي", unit: "موقع" },{ k: "connTimeout",  l: "مهلة الاتصال",        unit: "ثانية" },{ k: "depth",        l: "عمق الفحص",           unit: "مستوى" },{ k: "concurrency",  l: "تزامن المحرك",        unit: "خيط" },{ k: "pageTimeout",  l: "مهلة الصفحة",         unit: "ثانية" },
        ].map(f => (
        <div key={f.k} className="flex items-center justify-between">
        <div>
        <p className="text-sm text-foreground">{f.l}</p>
        <p className="text-[10px] text-muted-foreground">{f.unit}</p>
        </div>
        <div className="flex items-center gap-1">
        <button onClick={() => setNums(p => ({ ...p, [f.k]: Math.max(1, (p as any)[f.k] - 1) }))} className="w-7 h-7 rounded-lg text-sm font-bold flex items-center justify-center hover:bg-muted transition-all" style={{ border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>−</button>
        <span className="w-10 text-center text-sm font-black tabular-nums" style={{ color: GOLD}}>{(nums as any)[f.k]}</span>
        <button onClick={() => setNums(p => ({ ...p, [f.k]: (p as any)[f.k] + 1 }))} className="w-7 h-7 rounded-lg text-sm font-bold flex items-center justify-center hover:bg-muted transition-all" style={{ border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>+</button>
        </div>
        </div>
        ))}
        </GlassPanel>
        <GlassPanel frame={false} className="p-4">
        <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
        <Cpu size={14} style={{ color: TEAL }} />
        <p className="text-sm font-bold text-foreground">البروكسي الذكي · ScraperAPI</p>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: "#3DBF7A18", color: C_EMR}}>● متصل</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
        {[{ l: "الرصيد المتبقي", v: "84,210" },{ l: "نجاح الطلبات", v: "99.2%" }].map(r => (
        <div key={r.l} className="p-2 rounded-lg cs-muted">
        <p className="text-[10px] text-muted-foreground">{r.l}</p>
        <p className="text-sm font-black" style={{ color: TEAL}}>{r.v}</p>
        </div>
        ))}
        </div>
        </GlassPanel>
        <button className="w-full py-2.5 rounded-xl text-sm font-bold" style={{ background: C_GRN, color: "#fff"}}>✓ تطبيق الإعدادات</button>
        </div>
        </div>
        )}
        {tab === "schedules" && (
        <div className="space-y-4">
        <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold">الجدولات المحفوظة</h3>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: GOLD, color: NAVY_BG}}><Plus size={12} /> جدولة جديدة</button>
        </div>
        <GlassPanel frame={false} className="p-12 flex flex-col items-center text-center">
        <div className="relative mb-3">
        <div style={{ position: "absolute", inset: -8, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}15, transparent 70%)` }} />
        <Calendar size={30} className="relative text-muted-foreground opacity-40" />
        </div>
        <p className="text-sm font-semibold text-foreground">لا توجد جدولات بعد</p>
        <p className="text-xs text-muted-foreground mt-1">أنشئ جدولاً لأتمتة الفحوص الدورية</p>
        </GlassPanel>
        </div>
        )}
        {tab === "launch" && (
        <div className="max-w-3xl space-y-4">
        <GlassPanel frame className="p-5">
        <div className="flex items-center gap-2 mb-4">
        <Activity size={16} style={{ color: GOLD }} />
        <h3 className="text-base font-black text-foreground">لوحة الزحف — جاهزية الإطلاق</h3>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
        {[
        { l: "المواقع المحددة", v: String(selCount || 0), c: GOLD },{ l: "الخيارات المفعّلة", v: String(enabledChips.length), c: TEAL },{ l: "الوقت المتوقع", v: `~${Math.round((selCount || 0) * 0.1)} د`, c: C_VIO },
        ].map(s => (
        <div key={s.l} className="p-3 rounded-xl text-center cs-muted">
        <div className="text-2xl font-black" style={{ color: s.c}}>{s.v}</div>
        <div className="text-[11px] text-muted-foreground mt-0.5">{s.l}</div>
        </div>
        ))}
        </div>
        {enabledChips.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
        {enabledChips.map(c => <span key={c} className="text-[11px] px-2.5 py-1 rounded-full font-medium" style={{ background: "#3DBF7A15", color: C_EMR, border: "1px solid #3DBF7A25"}}>✓ {c}</span>)}
        </div>
        )}
        <button onClick={() => selCount > 0 && setShowConfirm(true)} disabled={selCount === 0}
        className="w-full py-3.5 rounded-xl text-base font-black flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-40"
        style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_PALE})`, color: NAVY_BG, boxShadow: selCount > 0 ? `0 6px 24px ${GOLD}35` : "none" }}>
        <Play size={17} fill={NAVY_BG} /> إطلاق الفحص الآن
        </button>
        </GlassPanel>
        </div>
        )}
        </div>
      </div>
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(3,8,16,0.78)", backdropFilter: "blur(6px)" }}>
        <div className="glass-card relative w-full max-w-md mx-4 rounded-2xl overflow-hidden"
        style={{ border: `1px solid ${GOLD}28`, animation: "hero-reveal 0.3s cubic-bezier(0.34,1.56,0.64,1) both", boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 60px ${GOLD}12` }}>
        <CommandFrame color={GOLD} size={16} opacity={0.5} inset={10} />
        <div className="absolute top-0 inset-x-0 h-[1.5px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
        <div className="absolute inset-x-0 top-0 h-16 pointer-events-none" style={{ background: `linear-gradient(180deg, ${GOLD}0C, transparent)`, animation: "hud-scanline 5s linear infinite" }} />
        <div className="relative flex items-center gap-3 px-5 pt-5 pb-3">
        <div className="relative flex-shrink-0">
        <div style={{ position: "absolute", inset: -6, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}25, transparent 70%)`, animation: "rasidPulse 2.5s ease-in-out infinite" }} />
        <ImageWithFallback src={characterShmagh} alt="راصد" className="relative h-16 w-auto object-contain" />
        </div>
        <div className="flex-1">
        <HudLabel color={`${GOLD}80`}>SCAN.LAUNCH // CONFIRM</HudLabel>
        <h3 className="text-base font-black text-white mt-1">تأكيد إطلاق الفحص</h3>
        </div>
        <button onClick={() => setShowConfirm(false)} className="text-slate-500 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-all">✕</button>
        </div>
        <div className="relative px-5 pb-5">
        <p className="text-sm text-slate-300 mb-3">
        سيقوم راصد بفحص <strong style={{ color: GOLD }}>{selCount || 483}</strong> موقع بالقدرات المحددة.
        </p>
        <div className="flex flex-wrap gap-1.5 mb-3">
        {(enabledChips.length ? enabledChips : ["فحص عميق", "استخراج النصوص"]).map(c => (
        <span key={c} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: "#3DBF7A18", color: C_EMR, border: "1px solid #3DBF7A28"}}>✓ {c}</span>
        ))}
        </div>
        <div className="flex items-center gap-2 mb-5 text-xs text-slate-400">
        <Clock size={12} /> الوقت المتوقع: ~{Math.round((selCount || 483) * 0.1)} دقيقة
        </div>
        <button onClick={startScan} className="w-full py-3.5 rounded-xl text-base font-black flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all"
        style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_PALE})`, color: NAVY_BG, boxShadow: `0 4px 20px ${GOLD}40` }}>
        <Play size={16} fill={NAVY_BG} /> تأكيد وبدء الفحص
        </button>
        <button onClick={() => setShowConfirm(false)} className="w-full mt-2 py-2 text-sm text-slate-400 hover:text-white transition-all">إلغاء</button>
        </div>
        </div>
        </div>
      )}
    </div>
  );
}
function SitesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ComplianceStatus | "all">("all");
  const filters: { key: ComplianceStatus | "all"; label: string }[] = [
    { key: "all", label: "الكل" },{ key: "compliant", label: "ممتثل" },{ key: "non-compliant", label: "غير ممتثل" },{ key: "partial", label: "جزئياً" },{ key: "review", label: "مراجعة" },{ key: "inactive", label: "لا يعمل" },
  ];
  const counts: Record<string, number> = {
    all: WEBSITES.length,
    compliant: WEBSITES.filter(w => w.status === "compliant").length,
    "non-compliant": WEBSITES.filter(w => w.status === "non-compliant").length,
    partial: WEBSITES.filter(w => w.status === "partial").length,
    review: WEBSITES.filter(w => w.status === "review").length,
    inactive: WEBSITES.filter(w => w.status === "inactive").length};
  const filtered = WEBSITES.filter(w => {
    const ms = search === "" || w.name.includes(search) || w.url.includes(search);
    const mf = statusFilter === "all" || w.status === statusFilter;
    return ms && mf;
  });
  return (
    <div className="relative p-5 space-y-4 stagger" style={{ zIndex: 1 }}>
      <CinematicBg page="sites" />
      <HeroBanner page="sites" title="المواقع" subtitle="قائمة بجميع المواقع السعودية المرصودة وحالة امتثالها" badge={`${WEBSITES.length} موقع نشط`}
          actions={<>
          <button style={{ border: `1px solid ${GOLD}30`, color: GOLD}} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs hover:opacity-80"><Download size={12} /> تصدير</button>
          <button style={{ background: GOLD, color: NAVY_BG}} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"><Plus size={12} /> إضافة موقع</button>
          </>} />
      <div className="flex items-center gap-2 flex-wrap">
        {filters.map(({ key, label }) => (
          <button key={key} onClick={() => setStatusFilter(key)}
          style={statusFilter === key ? { background: GOLD, color: NAVY_BG, border: `1px solid ${GOLD}` }
          : { border: "1px solid var(--border)"}}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${statusFilter !== key ? "text-muted-foreground hover:text-foreground hover:bg-muted" : ""}`}>
          {label} <span className="opacity-60 mr-1">({counts[key]})</span>
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <SearchIcon size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="بحث بالنطاق أو اسم الموقع"
          className="w-full pr-9 pl-4 py-2.5 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          style={{ border: "1px solid var(--border)", background: "var(--card)"}} />
        </div>
      </div>
      <PCard goldTop>
        <div className="overflow-x-auto">
          <table className="w-full">
          <thead>
          <tr style={{ borderBottom: "1px solid var(--border)" }}>
          {["الموقع", "القطاع", "حالة الامتثال", "درجة الامتثال", "آخر فحص", "الإجراءات"].map(h => (
          <th key={h} className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">{h}</th>
          ))}
          </tr>
          </thead>
          <tbody>
          {filtered.map((site, i) => {
          const sc = site.score >= 80 ? C_GRN : site.score >= 50 ? C_AMB : site.score > 0 ? C_RED : C_SLT;
          return (
          <tr key={i} className="hover:bg-white/[0.02] transition-colors" style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none", animation: `card-rise 0.3s ease-out ${i * 0.04}s both` }}>
          <td className="px-4 py-3">
          <p className="text-sm font-medium text-foreground">{site.name}</p>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">{site.url}</p>
          </td>
          <td className="px-4 py-3"><span className="cs-muted text-xs text-muted-foreground px-2 py-0.5 rounded-md">{site.sector}</span></td>
          <td className="px-4 py-3"><ComplianceBadge status={site.status} /></td>
          <td className="px-4 py-3">
          {site.score > 0 ? (
          <div className="flex items-center gap-2 min-w-[90px]">
          <div className="flex-1 h-1.5 rounded-full overflow-hidden cs-muted">
          <div className="h-full rounded-full" style={{ width: `${site.score}%`, background: sc }} />
          </div>
          <span className="text-xs font-mono text-muted-foreground w-6">{site.score}</span>
          </div>
          ) : <span className="text-muted-foreground">—</span>}
          </td>
          <td className="px-4 py-3"><span className="text-xs text-muted-foreground">{site.lastScan}</span></td>
          <td className="px-4 py-3">
          <div className="flex gap-1">
          <button className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"><Eye size={13} /></button>
          <button className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"><RefreshCw size={13} /></button>
          </div>
          </td>
          </tr>
          );
          })}
          </tbody>
          </table>
        </div>
        <div className="px-4 py-3 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
          <span className="text-xs text-muted-foreground">عرض {filtered.length} من {WEBSITES.length}</span>
          <div className="flex gap-1">{[1, 2, 3].map(n => <button key={n} className={`w-7 h-7 rounded-lg text-xs ${n === 1 ? "text-[#04091C] font-bold" : "text-muted-foreground hover:bg-muted"}`} style={n === 1 ? { background: GOLD } : {}}>{n}</button>)}</div>
        </div>
      </PCard>
    </div>
  );
}
function MobileAppsPage() {
  const APPS = [
    { name: "adidas: Sneakers & Clothing", org: "adidas",          platform: "iOS & Android", status: "non-compliant" as ComplianceStatus, score: 38, rating: 4.8, cat: "رياضي",         color: "#1C1C1C", desc: "com.adidas.app" },{ name: "YouTube Music",               org: "Google LLC",       platform: "iOS & Android", status: "non-compliant" as ComplianceStatus, score: 41, rating: 4.6, cat: "موسيقى",         color: "#FF0000", desc: "com.google.ios.youtubemusic" },{ name: "Spotify: Music and Podcasts", org: "Spotify",          platform: "iOS & Android", status: "non-compliant" as ComplianceStatus, score: 52, rating: 4.7, cat: "موسيقى",         color: "#1DB954", desc: "com.spotify.client" },{ name: "WhatsApp Messenger",          org: "WhatsApp Inc.",     platform: "iOS & Android", status: "non-compliant" as ComplianceStatus, score: 45, rating: 4.5, cat: "تواصل",          color: "#25D366", desc: "net.whatsapp.WhatsApp" },{ name: "Silicon Access",              org: "Silicon Access",    platform: "iOS & Android", status: "partial"       as ComplianceStatus, score: 61, rating: 3.9, cat: "أعمال",          color: C_BLU, desc: "com.siliconaccess.mobile.silabs.eap" },{ name: "Zaha",                        org: "Arabeque Charity",  platform: "iOS & Android", status: "partial"       as ComplianceStatus, score: 67, rating: 4.1, cat: "خيري",           color: C_VIO, desc: "com.arabeque.charity.Zaha" },{ name: "Firefox Fast & Private Browser",org: "Mozilla",       platform: "iOS & Android", status: "partial"       as ComplianceStatus, score: 71, rating: 4.4, cat: "متصفح",          color: "#FF9500", desc: "org.mozilla.Firefox" },{ name: "adidas: Sneakers & Clothing", org: "adidas",           platform: "iOS & Android", status: "non-compliant" as ComplianceStatus, score: 38, rating: 4.8, cat: "رياضي",          color: "#1C1C1C", desc: "com.adidas.app" },{ name: "Grab - AI Assistant",         org: "Grab",             platform: "iOS & Android", status: "compliant"     as ComplianceStatus, score: 88, rating: 4.3, cat: "نقل",            color: "#00B14F", desc: "com.grabtaxi.passenger" },
    ...MOBILE_APPS.map(a => ({
      name: a.name, org: a.org, platform: "iOS & Android", status: a.status,
      score: a.score, rating: (3.5 + Math.random() * 1.4).toFixed(1) as unknown as number,
      cat: "خدمات", color: a.score >= 80 ? C_GRN : a.score >= 50 ? C_AMB : C_RED,
      desc: `${a.org.toLowerCase().replace(/\s/g,".")}.app`})),
  ];
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all"|"compliant"|"partial"|"non-compliant">("all");
  const filtered = APPS.filter(a => {
    const ms = search === "" || a.name.toLowerCase().includes(search.toLowerCase()) || a.org.toLowerCase().includes(search.toLowerCase());
    const mf = statusFilter === "all" || a.status === statusFilter;
    return ms && mf;
  });
  const counts = {
    total: APPS.length,
    rating: 1,
    nc: APPS.filter(a => a.status === "non-compliant").length,
    compliant: APPS.filter(a => a.status === "compliant").length};
  const AppIcon = ({ app }: { app: typeof APPS[0] }) => (
    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-xs font-black"
         style={{ background: app.color, boxShadow: `0 4px 12px ${app.color}40` }}>
      {app.name.charAt(0)}
    </div>
  );
  return (
    <div className="relative p-5 space-y-4 stagger" style={{ zIndex: 1 }}>
      <CinematicBg page="mobile-apps" />
      <div className="relative overflow-hidden rounded-2xl"
         style={{ background: `linear-gradient(135deg, ${NAVY_BG}, ${NAVY_CARD})`,
        border: `1.5px solid rgba(197,165,90,0.42)`,
        boxShadow: `0 0 0 1px rgba(197,165,90,0.06), 0 12px 40px rgba(4,9,28,0.50)` }}>
        <InsetFrame radius={15} accent={GOLD} />
        <div className="absolute top-0 inset-x-0 h-[1.5px]"
        style={{ background: `linear-gradient(90deg, transparent, ${GOLD}80, ${GOLD_PALE}, ${GOLD}80, transparent)` }} />
        <div className="relative z-10 px-5 py-4 flex items-center justify-between gap-4">
        <div>
        <div className="flex items-center gap-2 mb-0.5">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD, animation: "status-blink 1.5s ease-in-out infinite" }} />
        <HudLabel color={`${GOLD}80`}>SMART RASID · MOBILE APPS MONITORING</HudLabel>
        </div>
        <h1 className="text-xl font-black text-white">رصد تطبيقات الأجهزة الذكية</h1>
        <p className="text-xs text-slate-400 mt-0.5">متابعة الامتثال — التصنيفات والأجهزة الذكية وإدارة البيانات الشخصية</p>
        </div>
        <button style={{ background: GOLD, color: NAVY_BG }} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold hover:opacity-90 flex-shrink-0">
        <Plus size={13} /> إضافة تطبيق
        </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {[
        { label: "إجمالي التطبيقات", value: counts.total.toString(), icon: Smartphone,   color: GOLD,     delay: 0    },{ label: "مستوى تقييم",       value: counts.rating.toString(),icon: Award,       color: TEAL,     delay: 0.07 },{ label: "غير ممتثل",        value: counts.nc.toString(),    icon: AlertCircle,  color: C_RED,delay: 0.14 },{ label: "ممتثل",            value: counts.compliant.toString(),icon: CheckCircle2,color: C_GRN,delay: 0.21 },
        ].map(k => <SmallKPI key={k.label} label={k.label} value={k.value} icon={k.icon} color={k.color} delay={k.delay} />)}
      </div>
      <div className="relative rounded-2xl overflow-hidden px-4 py-2.5 flex items-center gap-3 cs">
        <InsetFrame />
        <span className="text-xs font-semibold text-muted-foreground flex-shrink-0">بحث</span>
        <div className="flex-1 relative">
        <SearchIcon size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)}
        placeholder="ابحث عن التطبيق..."
        className="w-full pr-9 pl-4 py-1.5 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        style={{ border: "1px solid var(--border)", background: "var(--muted)" }} />
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
        {[
        { id: "all"          as const, l: "الكل"         },{ id: "compliant"    as const, l: "ممتثل"        },{ id: "partial"      as const, l: "جزئياً"       },{ id: "non-compliant"as const, l: "غير ممتثل"   },
        ].map(f => (
        <button key={f.id} onClick={() => setStatusFilter(f.id)}
        className="px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all"
        style={{ background: statusFilter === f.id ? `${GOLD}15` : "var(--muted)",
        color: statusFilter === f.id ? GOLD : "var(--muted-foreground)",
        border: `1px solid ${statusFilter === f.id ? GOLD+"30" : "var(--border)"}` }}>
        {f.l}
        </button>
        ))}
        </div>
        <span className="text-[10px] text-muted-foreground flex-shrink-0">{filtered.length} تطبيق</span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {filtered.map((app, i) => {
        const sc = app.status === "compliant" ? C_GRN : app.status === "partial" ? C_AMB : C_RED;
        const cfg = STATUS_CFG[app.status];
        return (
        <div key={i} className="relative rounded-2xl overflow-hidden group hover:scale-[1.01] transition-all duration-200 cursor-pointer"
        style={{ background: "var(--card)", border: `1.5px solid ${sc}22`,
        boxShadow: `var(--card-shadow), 0 0 16px ${sc}08`,
        animation: `card-rise 0.35s ease-out ${(i % 9) * 0.05}s both` }}>
        <div className="absolute top-0 inset-x-0 h-[1.5px]"
        style={{ background: `linear-gradient(90deg, transparent, ${sc}70, transparent)` }} />
        <InsetFrame radius={14} accent={sc} />
        <div className="relative p-4">
        <div className="flex items-start justify-between mb-3">
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
        style={{ background: `${sc}15`, color: sc, border: `1px solid ${sc}25` }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: sc }} />
        {app.status === "compliant" ? "ممتثل" : app.status === "partial" ? "جزئياً" : "ليس"}
        </span>
        <AppIcon app={app} />
        </div>
        <div className="mb-2 min-w-0">
        <p className="text-sm font-bold text-foreground leading-tight truncate">{app.name}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">{app.org}</p>
        </div>
        <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center gap-0.5">
        {[1,2,3,4,5].map(s => (
        <Star key={s} size={9} fill={s <= Math.round(Number(app.rating)) ? GOLD : "transparent"}
        style={{ color: s <= Math.round(Number(app.rating)) ? GOLD : C_SLT }} />
        ))}
        </div>
        <span className="text-[10px] font-bold" style={{ color: GOLD }}>{app.rating}</span>
        <span className="text-[9px] text-muted-foreground">· {app.platform}</span>
        </div>
        <p className="text-[10px] text-muted-foreground truncate mb-3">{app.desc}</p>
        <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 h-1.5 rounded-full overflow-hidden cs-muted">
        <div className="h-full rounded-full transition-all"
        style={{ width: `${app.score}%`, background: sc, boxShadow: `0 0 6px ${sc}60` }} />
        </div>
        <span className="text-[10px] font-bold tabular-nums" style={{ color: sc }}>{app.score}%</span>
        </div>
        <div className="flex items-center gap-2">
        <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-muted"
        style={{ border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>
        <ArrowUpRight size={11} />
        </button>
        <button className="flex-1 py-1.5 rounded-lg text-[11px] font-semibold transition-all hover:opacity-80"
        style={{ background: `${sc}15`, color: sc, border: `1px solid ${sc}25` }}>
        فحص ↺
        </button>
        <span className="text-[9px] px-1.5 py-0.5 rounded flex-shrink-0"
        style={{ background: "var(--muted)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }}>
        {app.cat}
        </span>
        </div>
        </div>
        </div>
        );
        })}
      </div>
      {filtered.length === 0 && (
        <div className="py-16 text-center">
        <Smartphone size={36} className="text-muted-foreground opacity-20 mx-auto mb-3" />
        <p className="text-sm font-semibold text-foreground">لا توجد تطبيقات</p>
        <p className="text-xs text-muted-foreground mt-1">جرّب مصطلح بحث مختلف</p>
        </div>
      )}
    </div>
  );
}
function ScanHistoryPage() {
  return (
    <div className="relative p-5 space-y-4 stagger" style={{ zIndex: 1 }}>
      <CinematicBg page="scan-history" />
      <PageHeader title="سجل الفحوصات" subtitle="متابعة جميع عمليات الفحص السابقة وإعادة فتح شاشات التنفيذ" icon={History} />
      <div className="grid grid-cols-4 gap-4">
        {[{ label: "إجمالي الفحوصات", value: "34", icon: Activity, color: GOLD },{ label: "قيد التنفيذ", value: "2", icon: Timer, color: TEAL },{ label: "مكتمل", value: "30", icon: CheckCircle2, color: C_GRN },{ label: "فاشل / ملغي", value: "2", icon: AlertCircle, color: C_RED }].map((k, i) => <SmallKPI key={i} {...k} delay={i * 0.07} />)}
      </div>
      <PCard goldTop>
        {SCAN_HISTORY.map((scan, i) => (
          <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-all"
          style={{ borderBottom: i < SCAN_HISTORY.length - 1 ? "1px solid var(--border)" : "none", animation: `card-rise 0.3s ease-out ${i * 0.06}s both` }}>
          <div>
          <p className="text-sm font-semibold text-foreground">{scan.title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{scan.date} · {scan.sites} موقع · {scan.duration}</p>
          </div>
          <div className="flex items-center gap-3">
          <ComplianceBadge status={scan.status} />
          <button style={{ border: "1px solid var(--border)"}} className="px-3 py-1 rounded-lg text-xs text-muted-foreground hover:bg-muted">فتح</button>
          </div>
          </div>
        ))}
      </PCard>
    </div>
  );
}
function ScanLibraryPage() {
  const LIBRARY = [
    ...WEBSITES,
    { name: "مركز الأمن الوطني", url: "nsc.gov.sa",    status: "compliant"     as ComplianceStatus, score: 89, lastScan: "منذ ساعتين",   sector: "حكومي"   },{ name: "وزارة التعليم",     url: "moe.gov.sa",    status: "partial"       as ComplianceStatus, score: 71, lastScan: "منذ 3 ساعات", sector: "حكومي"   },{ name: "جرير للإلكترونيات", url: "jarir.com",     status: "non-compliant" as ComplianceStatus, score: 38, lastScan: "أمس",          sector: "تجاري"   },{ name: "موارد بشرية",       url: "hrsd.gov.sa",   status: "compliant"     as ComplianceStatus, score: 92, lastScan: "منذ ساعة",     sector: "حكومي"   },
  ];
  const [search, setSearch]   = useState("");
  const [viewMode, setViewMode] = useState<"grid"|"list">("grid");
  const [sortBy,   setSortBy]   = useState<"score"|"date"|"name">("score");
  const filtered = LIBRARY.filter(l =>
    search === "" || l.name.includes(search) || l.url.includes(search)
  ).sort((a, b) => sortBy === "score" ? b.score - a.score : sortBy === "name" ? a.name.localeCompare(b.name) : 0);
  const totalScans = 1246;
  return (
    <div className="relative p-5 space-y-4 stagger" style={{ zIndex: 1 }}>
      <CinematicBg page="scan-library" />
      <div className="relative overflow-hidden rounded-2xl"
         style={{ background: `linear-gradient(135deg, ${NAVY_BG}, ${NAVY_CARD})`,
        border: `1.5px solid rgba(197,165,90,0.42)`,
        boxShadow: `0 0 0 1px rgba(197,165,90,0.06), 0 12px 40px rgba(4,9,28,0.50)` }}>
        <InsetFrame radius={15} accent={GOLD} />
        <div className="absolute top-0 inset-x-0 h-[1.5px]"
        style={{ background: `linear-gradient(90deg, transparent, ${GOLD}80, ${GOLD_PALE}, ${GOLD}80, transparent)` }} />
        <div className="relative z-10 px-5 py-4 flex items-center justify-between gap-4">
        <div>
        <div className="flex items-center gap-2 mb-0.5">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD, animation: "status-blink 1.5s ease-in-out infinite" }} />
        <HudLabel color={`${GOLD}80`}>SMART RASID · SCAN LIBRARY</HudLabel>
        </div>
        <h1 className="text-xl font-black text-white">مكتبة الفحوصات</h1>
        <p className="text-xs text-slate-400 mt-0.5">استعرض جميع نتائج الفحوصات السابقة مع لقطات الشاشة الفعلية والتقارير</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}30` }}>
        <BookOpen size={13} style={{ color: GOLD }} />
        <span className="text-xs font-black" style={{ color: GOLD }}>{totalScans.toLocaleString()} فحص</span>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold" style={{ background: GOLD, color: NAVY_BG }}>
        <Download size={12} /> تصدير Excel
        </button>
        </div>
        </div>
      </div>
      <div className="relative rounded-2xl overflow-hidden px-4 py-3 flex items-center gap-3 cs">
        <InsetFrame />
        <div className="flex items-center gap-1.5 flex-shrink-0">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:bg-muted"
        style={{ border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>
        <Filter size={11} /> تصفية
        </button>
        {[{ l: "بحث", active: true },{ l: "تصنيفية", active: false }].map(t => (
        <button key={t.l} className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
        style={{ background: t.active ? `${GOLD}15` : "var(--muted)",
        color: t.active ? GOLD : "var(--muted-foreground)",
        border: `1px solid ${t.active ? GOLD + "30" : "var(--border)"}` }}>
        {t.l}
        </button>
        ))}
        </div>
        <div className="flex-1 relative">
        <SearchIcon size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)}
        placeholder="ابحث عن الموقع أو النطاق..."
        className="w-full pr-9 pl-4 py-2 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        style={{ border: "1px solid var(--border)", background: "var(--muted)" }} />
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
        <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
        className="text-xs text-muted-foreground px-2 py-1.5 rounded-lg focus:outline-none"
        style={{ border: "1px solid var(--border)", background: "var(--muted)" }}>
        <option value="score">الأعلى درجةً</option>
        <option value="date">الأحدث</option>
        <option value="name">الاسم</option>
        </select>
        {[{ mode: "grid" as const, icon: Layers },{ mode: "list" as const, icon: FileText }].map(v => (
        <button key={v.mode} onClick={() => setViewMode(v.mode)}
        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
        style={{ background: viewMode === v.mode ? `${GOLD}15` : "var(--muted)",
        border: `1px solid ${viewMode === v.mode ? GOLD + "30" : "var(--border)"}`,
        color: viewMode === v.mode ? GOLD : "var(--muted-foreground)" }}>
        <v.icon size={13} />
        </button>
        ))}
        </div>
      </div>
      <div className={viewMode === "grid" ? "grid grid-cols-3 gap-4" : "space-y-2"}>
        {filtered.map((lib, i) => {
        const sc = lib.score >= 80 ? C_GRN : lib.score >= 50 ? C_AMB : lib.score > 0 ? C_RED : C_SLT;
        const articlesOk = Math.round((lib.score / 100) * 8);
        if (viewMode === "list") {
        return (
        <div key={i} className="relative rounded-2xl overflow-hidden flex items-center gap-4 px-4 py-3 hover:bg-muted/20 transition-all cursor-pointer cs"
        style={{ animation: `card-rise 0.25s ease-out ${i * 0.03}s both` }}>
        <InsetFrame radius={14} accent={sc} />
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${sc}10` }}>
        <Globe size={18} style={{ color: sc, opacity: 0.6 }} />
        </div>
        <div className="flex-1 min-w-0">
        <p className="text-sm font-mono font-bold text-foreground">{lib.url}</p>
        <p className="text-xs text-muted-foreground">{lib.name} · {lib.sector}</p>
        </div>
        <ComplianceBadge status={lib.status} />
        <div className="flex items-center gap-2 flex-shrink-0">
        <div className="w-20 h-1.5 rounded-full overflow-hidden cs-muted">
        <div className="h-full rounded-full" style={{ width: `${lib.score}%`, background: sc }} />
        </div>
        <span className="text-sm font-black tabular-nums" style={{ color: sc }}>{lib.score}</span>
        </div>
        <span className="text-xs text-muted-foreground flex-shrink-0">{lib.lastScan}</span>
        <div className="flex gap-1 flex-shrink-0">
        {["فحص","تقرير","مقارنة"].map(a => (
        <button key={a} className="px-2 py-1 rounded-lg text-[10px] font-medium transition-all hover:opacity-80"
        style={{ background: "var(--muted)", border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>{a}</button>
        ))}
        </div>
        </div>
        );
        }
        return (
        <div key={i} className="relative rounded-2xl overflow-hidden group cursor-pointer hover:scale-[1.01] transition-all duration-200"
        style={{ background: "var(--card)", border: `1.5px solid ${sc}22`,
        boxShadow: `var(--card-shadow), 0 0 20px ${sc}08`,
        animation: `card-rise 0.35s ease-out ${i * 0.04}s both` }}>
        <div className="absolute top-0 inset-x-0 h-[1.5px] z-10"
        style={{ background: `linear-gradient(90deg, transparent, ${sc}80, transparent)` }} />
        <InsetFrame radius={14} accent={sc} />
        <div className="relative h-32 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(145deg, ${NAVY_CARD}, ${sc}06)` }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }}>
        <defs><pattern id={`lib-grid-${i}`} width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke={sc} strokeWidth="0.5"/>
        </pattern></defs>
        <rect width="100%" height="100%" fill={`url(#lib-grid-${i})`} />
        </svg>
        <div className="relative flex flex-col items-center gap-2">
        <Globe size={26} style={{ color: sc, opacity: 0.35 }} />
        <span className="text-[9px] font-mono text-muted-foreground opacity-60">{lib.url}</span>
        </div>
        <div className="absolute top-2.5 left-2.5 z-10">
        <ComplianceBadge status={lib.status} />
        </div>
        <div className="absolute top-2.5 right-2.5 z-10">
        <span className="text-[10px] font-mono text-white bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">{lib.url}</span>
        </div>
        </div>
        <div className="relative p-3.5">
        <div className="flex items-start justify-between mb-2">
        <div className="min-w-0 flex-1">
        <p className="text-[12px] font-bold text-foreground truncate">{lib.name}</p>
        <p className="text-[10px] text-muted-foreground">{lib.sector} · {lib.lastScan}</p>
        </div>
        <span className="text-xl font-black tabular-nums flex-shrink-0 mr-2" style={{ color: sc }}>{lib.score}%</span>
        </div>
        <div className="flex items-center gap-1.5 mb-2">
        <span className="text-[10px] text-muted-foreground">تقرير الفحص:</span>
        <span className="text-[10px] font-semibold" style={{ color: sc }}>
        {STATUS_CFG[lib.status].label}
        </span>
        <span className="text-muted-foreground mx-1 text-[10px]">·</span>
        <span className="text-[10px] text-muted-foreground">البنود المحققة: {articlesOk}/8</span>
        </div>
        <div className="w-full h-1.5 rounded-full overflow-hidden mb-3 cs-muted">
        <div className="h-full rounded-full transition-all"
        style={{ width: `${lib.score}%`, background: sc, boxShadow: `0 0 6px ${sc}60` }} />
        </div>
        <div className="flex items-center gap-1.5">
        {["فحص","تقرير","مقارنة"].map(a => (
        <button key={a} className="flex-1 py-1.5 rounded-lg text-[10px] font-semibold transition-all hover:opacity-80"
        style={{ background: "var(--muted)", border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>
        {a}
        </button>
        ))}
        <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-muted"
        style={{ border: "1px solid var(--border)", color: "var(--muted-foreground)" }}
        onClick={() => (window as any)._rasidOpenSite?.(lib)}>
        <Eye size={11} />
        </button>
        </div>
        </div>
        </div>
        );
        })}
      </div>
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
        <BookOpen size={36} className="text-muted-foreground opacity-25 mb-3" />
        <p className="text-sm font-semibold text-foreground">لا توجد نتائج</p>
        <p className="text-xs text-muted-foreground mt-1">جرّب مصطلح بحث مختلف</p>
        </div>
      )}
    </div>
  );
}
function ScanSchedulesPage() {
  return (
    <div className="relative p-5 space-y-4 stagger" style={{ zIndex: 1 }}>
      <CinematicBg page="scan-schedules" />
      <PageHeader title="جدولة الفحص الدوري" subtitle="إعداد فحوصات تلقائية دورية للمواقع والتطبيقات" icon={Calendar}
          actions={<button style={{ background: GOLD, color: NAVY_BG}} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"><Plus size={12} /> جدولة جديدة</button>} />
      <PCard goldTop className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1E9E57] animate-pulse" />
          <span className="text-sm font-semibold text-foreground">محرك الجدولة التلقائية</span>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${TEAL}15`, color: TEAL}}>يعمل</span>
          </div>
          <button style={{ border: "1px solid #B94A55", color: C_RED}} className="px-3 py-1 rounded-lg text-xs hover:bg-[#B94A55]/10">⏸ إيقاف المحرك</button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">يفحص الجدولات كل 5 دقائق · آخر فحص 9:55:00 ص</p>
      </PCard>
      <div className="space-y-3">
        {SCHEDULED_REPORTS.map((s, i) => (
          <PCard key={i} goldTop className="p-4" style={{ animation: `card-rise 0.35s ease-out ${i * 0.06}s both` }}>
          <div className="flex items-center justify-between">
          <div>
          <p className="text-sm font-semibold text-foreground">{s.title}</p>
          <p className="text-xs text-muted-foreground">{s.freq} · التشغيل القادم: {s.next}</p>
          </div>
          <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${s.active ? "text-[#1E9E57] bg-[#1E9E57]/10" : "text-muted-foreground bg-muted"}`}>
          {s.active ? "● نشط" : "متوقف"}
          </span>
          <button style={{ border: "1px solid var(--border)", color: C_GRN }} className="px-2 py-1 rounded-lg text-xs hover:bg-muted">▷ تنفيذ</button>
          </div>
          </div>
          </PCard>
        ))}
      </div>
    </div>
  );
}
function CasesPage() {
  const priorityColor = (p: string) => p === "high" ? C_RED : p === "medium" ? TEAL : C_SLT;
  const priorityLabel = (p: string) => p === "high" ? "عالية" : p === "medium" ? "متوسطة" : "منخفضة";
  return (
    <div className="relative p-5 space-y-4 stagger" style={{ zIndex: 1 }}>
      <CinematicBg page="cases" />
      <PageHeader title="إدارة الحالات" subtitle="متابعة حالات عدم الامتثال وإدارة سير العمل" icon={Folder}
        actions={<button style={{ background: GOLD, color: NAVY_BG}} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"><Plus size={12} /> حالة جديدة</button>} />
      <div className="grid grid-cols-4 gap-4">
        {[{ label: "مفتوحة", value: "3", icon: Folder, color: C_RED },{ label: "قيد المعالجة", value: "5", icon: Timer, color: TEAL },{ label: "محلولة", value: "2", icon: CheckCircle2, color: C_GRN },{ label: "مغلقة", value: "2", icon: Lock, color: C_SLT }].map((k, i) => <SmallKPI key={i} {...k} delay={i * 0.07} />)}
      </div>
      <div className="space-y-3">
        {CASES.map((c, i) => (
        <PCard key={i} goldTop className="p-4" style={{ animation: `card-rise 0.35s ease-out ${i * 0.07}s both` }}>
        <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
        style={{ background: `${priorityColor(c.priority)}15`, color: priorityColor(c.priority)}}>
        {priorityLabel(c.priority)}
        </span>
        </div>
        <p className="text-sm font-semibold text-foreground">{c.title}</p>
        <p className="text-xs text-muted-foreground mt-1">{c.date} · {c.assigned}</p>
        </div>
        <ComplianceBadge status={c.status} />
        </div>
        </PCard>
        ))}
      </div>
    </div>
  );
}
function SimplePage({ page, title, subtitle, icon, kpis, children, useHero = false }: {
  page: Page; title: string; subtitle: string; icon?: React.ElementType;
  kpis?: { label: string; value: string; icon: React.ElementType; color: string }[];
  children?: React.ReactNode; useHero?: boolean;
}) {
  return (
    <div className="relative p-5 space-y-4 stagger" style={{ zIndex: 1 }}>
      <CinematicBg page={page} />
      {useHero ? <HeroBanner page={page} title={title} subtitle={subtitle} /> : <PageHeader title={title} subtitle={subtitle} icon={icon} />}
      {kpis && (
        <div className="grid grid-cols-4 gap-4">
          {kpis.map((k, i) => <SmallKPI key={i} {...k} delay={i * 0.07} />)}
        </div>
      )}
      {children}
    </div>
  );
}
function PdfReportsPage() {
  return (
    <SimplePage page="pdf-reports" title="تقارير PDF التلقائية" subtitle="إنشاء تقارير دورية بصيغة احترافية PDF" icon={FileText} useHero>
      <div className="grid grid-cols-3 gap-4">
        <PCard goldTop className="p-5 space-y-3">
          <button className="w-full py-3 rounded-xl text-sm font-bold hover:opacity-90"
          style={{ background: NAVY_CARD, border: `1px solid ${GOLD}30`, color: GOLD}}>
          📄 إنشاء التقرير
          </button>
          <p className="text-xs text-muted-foreground text-center">سيتم إنشاء تقرير يتضمن 1 قسم</p>
          <div style={{ borderTop: "1px solid var(--border)" }} className="pt-3">
          <p className="text-sm font-semibold mb-2">سجل التقارير</p>
          {["تقرير الامتثال الشهري", "مقارنة القطاعات الأسبوعية", "التقرير السنوي الشامل"].map((r, i) => (
          <div key={i} className="flex items-center gap-2 py-2" style={{ borderBottom: "1px solid var(--border)" }}>
          <FileText size={12} style={{ color: GOLD }} />
          <span className="text-xs text-foreground flex-1">{r}</span>
          <span className="text-[10px] text-muted-foreground">PDF</span>
          </div>
          ))}
          </div>
        </PCard>
        <div className="col-span-2 space-y-3">
          <PCard goldTop className="p-5">
          <label className="text-xs text-muted-foreground mb-1.5 block">عنوان التقرير</label>
          <input defaultValue="تقرير راصد الشامل" className="w-full px-3 py-2 rounded-lg text-sm text-foreground focus:outline-none"
          style={{ border: "1px solid var(--border)", background: "var(--muted)"}} />
          </PCard>
          <PCard goldTop className="p-5">
          <p className="text-sm font-semibold mb-3">أقسام التقرير</p>
          {[{ l: "ملخص الامتثال", checked: true },{ l: "مقارنة القطاعات", checked: false },{ l: "تحليل البنود (المادة 12)", checked: false },{ l: "تفاصيل المواقع", checked: false },{ l: "تحليل الاتجاهات", checked: false }].map((s, i) => (
          <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted cursor-pointer" style={{ border: s.checked ? `1px solid ${GOLD}30` : "1px solid transparent" }}>
          <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
          style={{ background: s.checked ? GOLD : "var(--muted)", border: `1px solid ${s.checked ? GOLD : "var(--border)"}` }}>
          {s.checked && <CheckCircle2 size={10} style={{ color: NAVY_BG }} />}
          </div>
          <span className="text-sm text-foreground">{s.l}</span>
          </div>
          ))}
          </PCard>
        </div>
      </div>
    </SimplePage>
  );
}
function CustomReportsPage() {
  const MODULES_DEF = [
    { id: "art12",   l: "بنود المادة 12",        d: "تكليف البنود القانونية مع نتيجة الامتثال لكل بند",      c: GOLD,          icon: Hash,          checked: true  },{ id: "detail",  l: "تفاصيل الامتثال",       d: "قائمة تصنيفية بحالة الامتثال لكل موقع",               c: TEAL,          icon: Shield,        checked: true  },{ id: "stats",   l: "الإحصاءات العامة",      d: "إجمالي المواقع والمعلومات وتسبب الامتثال",            c: C_VIO,     icon: BarChart3,     checked: true  },{ id: "sites",   l: "تفاصيل المواقع",        d: "بيانات تصنيفية لكل موقع مع آخر فحص",                 c: C_BLU,     icon: Globe,         checked: false },{ id: "class",   l: "تحليل التصنيفات",       d: "توزيع الامتثال حسب تصنيف الجهات",                   c: C_GRN,     icon: Layers,        checked: false },{ id: "sector",  l: "مقارنة القطاعات",       d: "مقارنة الامتثال بين القطاع الحكومي والخاص",          c: C_AMB,     icon: ArrowLeftRight,checked: false },
  ];
  const [modules, setModules] = useState(MODULES_DEF);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo,   setDateTo]   = useState("");
  const selectedCount = modules.filter(m => m.checked).length;
  const toggle = (id: string) => setModules(prev => prev.map(m => m.id === id ? { ...m, checked: !m.checked } : m));
  return (
    <div className="relative p-5 space-y-4 stagger" style={{ zIndex: 1 }}>
      <CinematicBg page="reports" />
      <div className="relative overflow-hidden rounded-2xl"
         style={{ background: `linear-gradient(135deg, ${NAVY_BG}, ${NAVY_CARD})`,
        border: `1.5px solid rgba(197,165,90,0.42)`,
        boxShadow: `0 0 0 1px rgba(197,165,90,0.06), 0 12px 40px rgba(4,9,28,0.50)` }}>
        <InsetFrame radius={15} accent={GOLD} />
        <div className="absolute top-0 inset-x-0 h-[1.5px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}80, ${GOLD_PALE}, ${GOLD}80, transparent)` }} />
        <div className="relative z-10 px-5 py-4 flex items-center justify-between gap-4">
        <div>
        <div className="flex items-center gap-2 mb-0.5">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD, animation: "status-blink 1.5s ease-in-out infinite" }} />
        <HudLabel color={`${GOLD}80`}>REPORTING CENTER · CUSTOM EXPORT</HudLabel>
        </div>
        <h1 className="text-xl font-black text-white">تصدير تقارير مخصصة</h1>
        <p className="text-xs text-slate-400 mt-0.5">اختر البيانات والفترة الزمنية وصيغة التصدير</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
        {selectedCount > 0 && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
        style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}30` }}>
        <CheckCircle2 size={14} style={{ color: GOLD }} />
        <span className="text-xs font-bold" style={{ color: GOLD }}>{selectedCount} وحدات مختارة</span>
        </div>
        )}
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold"
        style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
        <Eye size={12} className="text-muted-foreground" /> معاينة
        </button>
        </div>
        </div>
      </div>
      <div className="relative rounded-2xl overflow-hidden cs">
        <InsetFrame />
        <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
        <Calendar size={15} style={{ color: GOLD }} />
        <h3 className="text-sm font-bold text-foreground">الفترة الزمنية</h3>
        </div>
        <span className="text-[11px] text-muted-foreground">اختياري — حدد فترة زمنية لتصفية البيانات</span>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
        {[
        { label: "من تاريخ", val: dateFrom, set: setDateFrom, placeholder: "mm/dd/yyyy" },{ label: "إلى تاريخ", val: dateTo,   set: setDateTo,   placeholder: "mm/dd/yyyy" },
        ].map(f => (
        <div key={f.label}>
        <label className="text-xs text-muted-foreground mb-1.5 block">{f.label}</label>
        <div className="relative">
        <input type="text" value={f.val} onChange={e => f.set(e.target.value)}
        placeholder={f.placeholder}
        className="w-full px-4 py-2.5 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-all"
        style={{ border: "1px solid var(--border)", background: "var(--muted)", fontFamily: "monospace" }} />
        <Calendar size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
        </div>
        ))}
        </div>
        </div>
      </div>
      <div className="relative rounded-2xl overflow-hidden cs">
        <InsetFrame />
        <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
        <Clipboard size={15} style={{ color: GOLD }} />
        <h3 className="text-sm font-bold text-foreground">وحدات البيانات</h3>
        </div>
        <span className="text-[11px] text-muted-foreground">اختر البيانات التي تريد تضمينها في التقرير</span>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
        {modules.map((m, i) => (
        <button key={m.id} onClick={() => toggle(m.id)}
        className="relative text-right p-4 rounded-2xl cursor-pointer transition-all duration-200 hover:scale-[1.01] group overflow-hidden"
        style={{ border: `1.5px solid ${m.checked ? m.c : "var(--border)"}`,
        background: m.checked ? `linear-gradient(145deg, ${m.c}12, ${m.c}06)` : "var(--muted)",
        boxShadow: m.checked ? `0 4px 20px ${m.c}18` : "none",
        animation: `card-rise 0.35s ease-out ${i * 0.06}s both` }}>
        {m.checked && (
        <div className="absolute top-0 inset-x-0 h-[1.5px]"
        style={{ background: `linear-gradient(90deg, transparent, ${m.c}80, transparent)` }} />
        )}
        <div className="flex items-start justify-between gap-2 mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${m.c}18`, border: `1px solid ${m.c}28` }}>
        <m.icon size={15} style={{ color: m.c }} />
        </div>
        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all"
        style={{ background: m.checked ? m.c : "var(--border)",
        border: `1.5px solid ${m.checked ? m.c : "var(--muted-foreground)"}` }}>
        {m.checked && <CheckCircle2 size={11} style={{ color: m.c === GOLD ? NAVY_BG : "#fff" }} />}
        </div>
        </div>
        <p className="text-xs font-bold mb-1 leading-tight" style={{ color: m.checked ? m.c : "var(--foreground)" }}>{m.l}</p>
        <p className="text-[10px] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{m.d}</p>
        </button>
        ))}
        </div>
        </div>
      </div>
      <div className="relative rounded-2xl overflow-hidden px-5 py-3 flex items-center justify-between gap-3 cs">
        <InsetFrame />
        <div className="relative flex items-center gap-2">
        {[
        { l: "تصدير PowerPoint", c: C_AMB, icon: FileText },{ l: "تصدير Excel",      c: C_GRN, icon: Download },{ l: "تصدير PDF",        c: C_RED, icon: FileText },
        ].map(b => (
        <button key={b.l}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity"
        style={{ background: `${b.c}18`, color: b.c, border: `1px solid ${b.c}30` }}>
        <b.icon size={12} /> {b.l}
        </button>
        ))}
        </div>
        <div className="relative flex items-center gap-1.5 text-[11px] text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
        <Shield size={12} style={{ color: TEAL }} />
        <span style={{ color: TEAL }}>حماية البيانات</span>
        </div>
      </div>
    </div>
  );
}
function ScheduledReportsPage() {
  return (
    <SimplePage page="scheduled-reports" title="تقارير مجدولة" subtitle="إدارة التقارير التلقائية المجدولة حسب الوقت" icon={Calendar}
        kpis={[{ label: "تقارير نشطة", value: "9", icon: CheckCircle2, color: C_GRN },{ label: "متوقفة", value: "3", icon: Clock, color: C_SLT },{ label: "اليوم", value: "2", icon: Timer, color: GOLD },{ label: "هذا الشهر", value: "14", icon: FileText, color: TEAL }]}>
      <div className="grid grid-cols-3 gap-4">
        {SCHEDULED_REPORTS.map((r, i) => (
        <PCard key={i} goldTop className="p-4" style={{ animation: `card-rise 0.35s ease-out ${i * 0.07}s both` }}>
        <div className="flex items-start justify-between mb-2">
        <p className="text-sm font-semibold text-foreground flex-1 min-w-0">{r.title}</p>
        <span className={`text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0 ms-2 ${r.active ? "text-[#1E9E57] bg-[#1E9E57]/10" : "text-muted-foreground bg-muted"}`}>{r.active ? "نشط" : "متوقف"}</span>
        </div>
        {[{ l: "التكرار", v: r.freq },{ l: "التشغيل القادم", v: r.next }].map(f => (
        <div key={f.l} className="flex items-center justify-between text-xs py-1">
        <span className="text-muted-foreground">{f.l}</span>
        <span className="text-foreground">{f.v}</span>
        </div>
        ))}
        <div className="flex gap-2 mt-3">
        <button style={{ background: r.active ? C_RED : C_GRN, color: "#fff"}} className="flex-1 py-1 rounded-lg text-xs font-medium">{r.active ? "⏸ إيقاف" : "▷ تفعيل"}</button>
        </div>
        </PCard>
        ))}
      </div>
    </SimplePage>
  );
}
function MessageTemplatesPage() {
  const templates = [
    { title: "إشعار عدم امتثال",           type: "تنبيه",  typeColor: C_RED },{ title: "إشعار امتثال جزئي",          type: "تنبيه",  typeColor: C_AMB },{ title: "شهادة تحقيق الامتثال",       type: "شهادة",  typeColor: C_GRN },{ title: "رسالة متابعة",               type: "متابعة", typeColor: TEAL       },{ title: "إشعار تصعيد",               type: "تصعيد",  typeColor: C_RED },{ title: "تذكير بالموعد النهائي",      type: "تذكير",  typeColor: C_AMB },
  ];
  return (
    <SimplePage page="message-templates" title="قوالب الرسائل" subtitle="إدارة قوالب الرسائل والإشعارات الآلية" icon={Mail}
          kpis={[{ label: "قوالب نشطة", value: "13", icon: Mail, color: GOLD },{ label: "مرسلة هذا الشهر", value: "247", icon: Send, color: C_GRN },{ label: "قوالب جديدة", value: "3", icon: Plus, color: TEAL },{ label: "المتوسط اليومي", value: "8", icon: Activity, color: C_AMB }]}>
      <div className="grid grid-cols-2 gap-4">
        {templates.map((t, i) => (
          <PCard key={i} goldTop className="p-4" style={{ animation: `card-rise 0.35s ease-out ${i * 0.06}s both` }}>
          <div className="flex items-center gap-3 mb-3">
          <Mail size={14} style={{ color: GOLD }} />
          <p className="text-sm font-semibold text-foreground flex-1">{t.title}</p>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
          style={{ background: `${t.typeColor}15`, color: t.typeColor}}>{t.type}</span>
          </div>
          <p className="text-xs text-muted-foreground">السلام عليكم، نُعلمكم بنتيجة مراجعة مستوى الامتثال...</p>
          <div className="flex gap-1.5 mt-3 flex-wrap">
          {["{{entity_name}}", "{{site_url}}", "{{deadline}}"].map(v => (
          <span key={v} className="text-[10px] px-1.5 py-0.5 rounded font-mono" style={{ background: "#7C6BAE20", color: C_VIO }}>{v}</span>
          ))}
          </div>
          </PCard>
        ))}
      </div>
    </SimplePage>
  );
}
function LettersPage() {
  const letters = [
    { num: "RASID-LTR-2026-000101", org: "وزارة التعليم",  subject: "طلب تحديث سياسة الخصوصية",       status: "partial"       as ComplianceStatus, date: "7 محرم 1448" },{ num: "RASID-LTR-2026-000100", org: "شركة نون",       subject: "إنذار بعدم الامتثال — المرحلة 2", status: "non-compliant" as ComplianceStatus, date: "6 محرم 1448" },{ num: "RASID-LTR-2026-000099", org: "وزارة الصحة",   subject: "شهادة الامتثال 2025-2026",        status: "compliant"     as ComplianceStatus, date: "5 محرم 1448" },{ num: "RASID-LTR-2026-000098", org: "البنك الأهلي",  subject: "متابعة خطة التحسين",              status: "review"        as ComplianceStatus, date: "4 محرم 1448" },
  ];
  return (
    <SimplePage page="letters" title="الخطابات الرسمية" subtitle="مركز إدارة الخطابات والمراسلات الرسمية مع رموز QR للتحقق" icon={Send}
          kpis={[{ label: "الإجمالي", value: "14", icon: FileText, color: GOLD },{ label: "مُرسلة", value: "3", icon: Send, color: TEAL },{ label: "تم الرد", value: "3", icon: CheckCircle2, color: C_GRN },{ label: "متأخرة", value: "3", icon: AlertTriangle, color: C_RED }]}>
      <PCard goldTop>
        <table className="w-full">
          <thead>
          <tr style={{ borderBottom: "1px solid var(--border)" }}>
          {["رقم الخطاب", "الجهة", "الموضوع", "الحالة", "التاريخ", "إجراءات"].map(h => (
          <th key={h} className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">{h}</th>
          ))}
          </tr>
          </thead>
          <tbody>
          {letters.map((l, i) => (
          <tr key={i} className="hover:bg-muted/20 transition-colors" style={{ borderBottom: i < letters.length - 1 ? "1px solid var(--border)" : "none", animation: `card-rise 0.3s ease-out ${i * 0.06}s both` }}>
          <td className="px-4 py-3"><span className="text-xs font-mono text-muted-foreground">{l.num}</span></td>
          <td className="px-4 py-3"><span className="text-sm text-foreground">{l.org}</span></td>
          <td className="px-4 py-3"><span className="text-xs text-muted-foreground">{l.subject}</span></td>
          <td className="px-4 py-3"><ComplianceBadge status={l.status} /></td>
          <td className="px-4 py-3"><span className="text-xs text-muted-foreground">{l.date}</span></td>
          <td className="px-4 py-3"><div className="flex gap-1"><button className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted transition-all"><Eye size={12} /></button></div></td>
          </tr>
          ))}
          </tbody>
        </table>
      </PCard>
    </SimplePage>
  );
}
function ExportDataPage() {
  const exports = [
    { l: "القطاعات",        d: "بيانات الامتثال حسب القطاعات",    c: TEAL    },{ l: "بنود المادة 12",  d: "تفاصيل الامتثال لكل بند",          c: GOLD    },{ l: "الرصد العام",     d: "ملخص شامل لحالة الامتثال",         c: C_GRN },{ l: "تصدير شامل",      d: "جميع البيانات في ملف متعدد الأوراق", c: C_VIO },{ l: "التصنيفات",       d: "بيانات الامتثال حسب تصنيف المواقع", c: C_AMB },
  ];
  return (
    <SimplePage page="export-data" title="مركز تصدير البيانات" subtitle="تصدير بيانات الامتثال والفحوصات بتنسيقات متعددة" icon={Package}>
      <div className="grid grid-cols-3 gap-4">
        {exports.map((e, i) => (
          <PCard key={i} goldTop className="p-5 text-center" style={{ animation: `card-rise 0.35s ease-out ${i * 0.08}s both` }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: `${e.c}15`, border: `1px solid ${e.c}30` }}>
          <Download size={20} style={{ color: e.c }} />
          </div>
          <h3 className="text-sm font-bold text-foreground mb-1">{e.l}</h3>
          <p className="text-xs text-muted-foreground mb-4">{e.d}</p>
          <button className="w-full py-2 rounded-lg text-xs font-bold hover:opacity-90 transition-opacity"
          style={{ background: e.c, color: "#fff"}}>📄 تصدير Excel</button>
          </PCard>
        ))}
      </div>
      <div className="p-4 rounded-xl flex items-center gap-3" style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
        <Shield size={16} className="text-muted-foreground flex-shrink-0" />
        <p className="text-xs text-muted-foreground">
          <strong>ملاحظة مهمة:</strong> جميع البيانات المُصدّرة تحتوي على معلومات حساسة. يُرجى التعامل معها بسرية تامة.
        </p>
      </div>
    </SimplePage>
  );
}
function ImprovementTrackerPage() {
  return (
    <SimplePage page="improvement-tracker" title="متتبع التحسينات" subtitle="توصيات ذكية لتحسين مستوى الامتثال بناءً على نتائج الفحوصات" icon={TrendingUp}>
      <PCard goldTop className="p-12 text-center" style={{ animation: "card-rise 0.4s ease-out 0.1s both" }}>
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
          <Zap size={26} className="text-muted-foreground" style={{ animation: "shimmer-pulse 2s ease-in-out infinite" }} />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">لا توجد توصيات بعد</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
          انقر على زر "توليد التوصيات" لبدء تحليل بيانات الامتثال وإنشاء خطة تحسين ذكية مخصصة
        </p>
        <button className="px-8 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
          style={{ background: GOLD, color: NAVY_BG}}>
          ✦ توليد التوصيات
        </button>
      </PCard>
    </SimplePage>
  );
}
function AdvancedAnalyticsPage() {
  const [tab, setTab] = useState(0);
  const tabs = ["اتجاهات الامتثال", "التحليل القطاعي", "الخريطة الرادارية", "بنود المادة 12"];
  return (
    <div className="relative p-5 space-y-4 stagger" style={{ zIndex: 1 }}>
      <CinematicBg page="advanced-analytics" />
      <HeroBanner page="advanced-analytics" title="التحليلات المتقدمة" subtitle="اتجاهات الامتثال الشهرية مع مقارنة بين القطاعات والتصنيفات" />
      <div className="flex items-center gap-1 p-1 rounded-xl w-fit cs-muted">
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${tab === i ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>{t}</button>
        ))}
      </div>
      {tab === 0 && (
        <div className="grid grid-cols-2 gap-4">
          <div className="relative rounded-2xl overflow-hidden p-5 pcard-interactive" style={{ background:"var(--card)", border:"1px solid var(--border)", boxShadow:"var(--card-shadow)" }}>
          <h3 className="text-sm font-semibold mb-4 relative z-10">اتجاه الامتثال الشهري</h3>
          <div dir="ltr">
          <ResponsiveContainer width="100%" height={220}>
          <LineChart data={TREND_DATA} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 10, fill: C_SLT, fontFamily: "Tajawal" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: C_SLT }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={TT} />
          <Line id="an-c" name="line-compliant-an" type="natural" dataKey="ممتثل" stroke={C_GRN} strokeWidth={2.5} dot={{ fill: C_GRN, r: 3, strokeWidth: 0 }} activeDot={{ r: 4 }} />
          <Line id="an-p" name="line-partial-an" type="step" dataKey="جزئياً" stroke={C_AMB} strokeWidth={2.5} dot={{ fill: C_AMB, r: 3, strokeWidth: 0 }} activeDot={{ r: 4 }} />
          </LineChart>
          </ResponsiveContainer>
          </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden p-5 pcard-interactive" style={{ background:"var(--card)", border:"1px solid var(--border)", boxShadow:"var(--card-shadow)" }}>
          <h3 className="text-sm font-semibold mb-4 relative z-10">توزيع المواقع</h3>
          <div dir="ltr">
          <ResponsiveContainer width="100%" height={220}>
          <BarChart data={TREND_DATA} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 10, fill: C_SLT, fontFamily: "Tajawal" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: C_SLT }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={TT} />
          <Bar name="bar-ممتثل-1" dataKey="ممتثل" fill={C_GRN} fillOpacity={0.85} radius={[3, 3, 0, 0]} />
          <Bar name="bar-جزئياً-2" dataKey="جزئياً" fill={C_AMB} fillOpacity={0.85} radius={[3, 3, 0, 0]} />
          </BarChart>
          </ResponsiveContainer>
          </div>
          </div>
        </div>
      )}
      {tab === 1 && (
        <div className="relative rounded-2xl overflow-hidden p-5" style={{ background:"var(--card)", border:"1px solid var(--border)", boxShadow:"var(--card-shadow)" }}>
          <h3 className="text-sm font-semibold mb-4 relative z-10">الامتثال بحسب القطاع</h3>
          <div dir="ltr">
          <ResponsiveContainer width="100%" height={300}>
          <BarChart data={SECTOR_DATA} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="sector" tick={{ fontSize: 11, fill: C_SLT, fontFamily: "Tajawal" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: C_SLT }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={TT} />
          <Legend wrapperStyle={{ fontFamily: "Tajawal", fontSize: "11px" }} />
          <Bar name="bar-ممتثل-3" dataKey="ممتثل" fill={C_GRN} fillOpacity={0.88} radius={[2, 2, 0, 0]} stackId="s" />
          <Bar name="bar-جزئياً-4" dataKey="جزئياً" fill={C_AMB} fillOpacity={0.88} stackId="s" />
          <Bar name="bar-غير_ممتثل-5" dataKey="غير ممتثل" fill={C_RED} fillOpacity={0.88} radius={[2, 2, 0, 0]} stackId="s" />
          </BarChart>
          </ResponsiveContainer>
          </div>
        </div>
      )}
      {tab === 2 && (
        <div className="relative rounded-2xl overflow-hidden p-5" style={{ background:"var(--card)", border:"1px solid var(--border)", boxShadow:"var(--card-shadow)" }}>
          <h3 className="text-sm font-semibold mb-4 relative z-10">خريطة الامتثال الرادارية</h3>
          <div dir="ltr">
          <ResponsiveContainer width="100%" height={340}>
          <RadarChart data={RADAR_DATA} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
          <PolarGrid stroke="rgba(255,255,255,0.08)" />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: C_SLT, fontFamily: "Tajawal" }} />
          <Radar name="الامتثال الحالي" dataKey="A" stroke={GOLD} fill={GOLD} fillOpacity={0.18} strokeWidth={2} />
          <Tooltip contentStyle={TT} />
          </RadarChart>
          </ResponsiveContainer>
          </div>
        </div>
      )}
      {tab === 3 && (
        <PCard goldTop className="p-5">
          <h3 className="text-sm font-semibold mb-4">تحليل بنود المادة 12</h3>
          <div className="space-y-3">
          {RADAR_DATA.map((r, i) => (
          <div key={i} className="flex items-center gap-4">
          <span className="text-sm text-foreground w-32 flex-shrink-0">{r.subject}</span>
          <div className="flex-1 h-2 rounded-full overflow-hidden cs-muted">
          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${r.A}%`, background: r.A >= 60 ? C_GRN : r.A >= 40 ? C_AMB : C_RED, animation: `card-rise 0.5s ease-out ${i * 0.08}s both` }} />
          </div>
          <span style={{ color: r.A >= 60 ? C_GRN : r.A >= 40 ? C_AMB : C_RED}} className="text-sm font-bold w-10 text-left">{r.A}%</span>
          </div>
          ))}
          </div>
        </PCard>
      )}
    </div>
  );
}
function SectorComparisonPage() {
  const [activeTab, setActiveTab] = useState<"visual"|"table"|"benchmark">("visual");
  const GOV  = { label: "القطاع العام",  total: 16028, compliant: 274,  partial: 127, nc: 15627, pct: 2, color: C_GRN, icon: Shield   };
  const PRIV = { label: "القطاع الخاص", total: 12182, compliant: 236,  partial: 1332,nc: 10614, pct: 2, color: GOLD,       icon: Database };
  const classBars = [
    { label: "إجمالي المواقع: عام الخاصي",     gov: 6865, priv: 12182, color: "#3B82F6" },{ label: "إجمالي المواقع: تجاري",           gov: 0,    priv: 575,  color: "#10B981" },{ label: "بلديات / اتصالات",                gov: 70,   priv: 350,  color: "#EC4899" },{ label: "إجمالي المواقع: منظمات",          gov: 0,    priv: 47,   color: "#8B5CF6" },{ label: "إجمالي المواقع: عقارات",          gov: 0,    priv: 37,   color: "#F59E0B" },
  ];
  const subCats = [{ name: "إجمالي المواقع", gov: 16028, priv: 12182, pctGov: 57, pctPriv: 43 },{ name: "ممتثل",          gov: 274,   priv: 236,   pctGov: 54, pctPriv: 46 },{ name: "ممتثل جزئياً",  gov: 127,   priv: 1332,  pctGov: 9,  pctPriv: 91 },{ name: "غير ممتثل",     gov: 15627, priv: 10614, pctGov: 60, pctPriv: 40 },{ name: "نسبة الامتثال",  gov: 2,     priv: 2,     pctGov: 50, pctPriv: 50 },{ name: "الفئة: عام",     gov: 6865,  priv: 0,     pctGov: 100,pctPriv: 0  }];
  const benchRows = [
    { cat: "إعلام ورياضي",       gov: "ممتثل",   govV: 68,  priv: "ممتثل",       privV: 63,  status: "compliant"     as ComplianceStatus },{ cat: "غير محدد دولة",      gov: "جزئياً",  govV: 12,  priv: "غير ممتثل",   privV: 188, status: "partial"       as ComplianceStatus },{ cat: "منظمات دولية",       gov: "ممتثل",   govV: 8,   priv: "جزئياً",      privV: 44,  status: "compliant"     as ComplianceStatus },{ cat: "تجاري",              gov: "جزئياً",  govV: 0,   priv: "غير ممتثل",   privV: 352, status: "partial"       as ComplianceStatus },{ cat: "مؤسسة الدولة",       gov: "ممتثل",   govV: 37,  priv: "غير ممتثل",   privV: 0,   status: "compliant"     as ComplianceStatus },{ cat: "عام",                gov: "جزئياً",  govV: 127, priv: "غير ممتثل",   privV: 6865,status: "partial"       as ComplianceStatus },{ cat: "صحة",                gov: "ممتثل",   govV: 18,  priv: "جزئياً",      privV: 42,  status: "compliant"     as ComplianceStatus },
  ];
  const TABS = [
    { id: "visual"    as const, label: "المقارنة المرئية",       icon: Eye         },{ id: "table"     as const, label: "جدول المقارنة",          icon: Layers      },{ id: "benchmark" as const, label: "المعيارية الحاسوبية",    icon: BarChart3   },
  ];
  const PieRing = ({ s }: { s: typeof GOV }) => {
    const r = 36; const circ = 2 * Math.PI * r;
    const dash = (s.compliant / s.total) * circ;
    return (
      <div className="relative w-24 h-24 flex-shrink-0">
        <svg width="96" height="96" viewBox="0 0 96 96" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="48" cy="48" r={r} fill="none" stroke={s.color} strokeOpacity="0.12" strokeWidth="8" />
        <circle cx="48" cy="48" r={r} fill="none" stroke={s.color} strokeWidth="8"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 6px ${s.color}70)` }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-black" style={{ color: s.color }}>{s.pct}%</span>
        <span className="text-[8px] text-muted-foreground">امتثال</span>
        </div>
      </div>
    );
  };
  return (
    <div className="relative p-5 space-y-4 stagger" style={{ zIndex: 1 }}>
      <CinematicBg page="sector-comparison" />
      <div className="relative overflow-hidden rounded-2xl mb-1"
         style={{ background: `linear-gradient(135deg, ${NAVY_BG}, ${NAVY_CARD})`,
        border: `1.5px solid rgba(197,165,90,0.42)`,
        boxShadow: `0 0 0 1px rgba(197,165,90,0.06), 0 12px 40px rgba(4,9,28,0.50)` }}>
        <InsetFrame radius={15} accent={GOLD} />
        <div className="absolute top-0 inset-x-0 h-[1.5px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}80, ${GOLD_PALE}, ${GOLD}80, transparent)` }} />
        <div className="relative z-10 px-5 py-4 flex items-center justify-between gap-4">
        <div>
        <div className="flex items-center gap-2 mb-0.5">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD, animation: "status-blink 1.5s ease-in-out infinite" }} />
        <HudLabel color={`${GOLD}80`}>DATA ANALYTICS · SECTOR COMPARISON</HudLabel>
        </div>
        <h1 className="text-xl font-black text-white">مقارنة القطاعات</h1>
        <p className="text-xs text-slate-400 mt-0.5">مقارنة تفاعلية بين القطاع الحكومي والخاص بالتفصيل</p>
        </div>
        <div className="flex items-center gap-3">
        {[
        { label: "إجمالي المواقع", value: "16,028", color: TEAL,      icon: Globe        },{ label: "ممتثل",          value: "274",     color: C_GRN, icon: CheckCircle2 },{ label: "التحسين",        value: "+2%",     color: GOLD,      icon: TrendingUp   },
        ].map((k, i) => (
        <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl"
        style={{ background: `${k.color}10`, border: `1px solid ${k.color}22` }}>
        <k.icon size={14} style={{ color: k.color }} />
        <div>
        <p className="text-base font-black tabular-nums leading-none" style={{ color: k.color }}>{k.value}</p>
        <p className="text-[9px] text-slate-400">{k.label}</p>
        </div>
        </div>
        ))}
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold" style={{ background: GOLD, color: NAVY_BG }}>
        <Download size={12} /> تصدير
        </button>
        </div>
        </div>
      </div>
      <div className="flex items-center gap-1 p-1 rounded-xl w-fit cs-muted">
        {TABS.map(t => (
        <button key={t.id} onClick={() => setActiveTab(t.id)}
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
        style={{ background: activeTab === t.id ? "var(--card)" : "transparent",
        color: activeTab === t.id ? GOLD : "var(--muted-foreground)",
        boxShadow: activeTab === t.id ? "0 2px 8px rgba(0,0,0,0.15)" : "none" }}>
        <t.icon size={13} style={{ color: activeTab === t.id ? GOLD : "var(--muted-foreground)" }} />
        {t.label}
        </button>
        ))}
      </div>
      {activeTab === "visual" && (
        <div className="space-y-4" key="visual" style={{ animation: "fadeInPage 0.25s ease-out" }}>
        <div className="grid grid-cols-2 gap-4">
        {[GOV, PRIV].map((s, i) => (
        <div key={i} className="relative rounded-2xl overflow-hidden p-5"
        style={{ background: "var(--card)", border: `1px solid ${s.color}22`, boxShadow: "var(--card-shadow)",
        animation: `card-rise 0.35s ease-out ${i * 0.1}s both` }}>
        <InsetFrame accent={s.color} />
        <div className="relative flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${s.color}14` }}>
        <s.icon size={15} style={{ color: s.color }} />
        </div>
        <div>
        <h3 className="text-sm font-bold text-foreground">{s.label}</h3>
        <p className="text-[10px] text-muted-foreground">{s.total.toLocaleString()} موقع</p>
        </div>
        </div>
        <PieRing s={s} />
        </div>
        <div className="relative space-y-2">
        {[
        { l: "ممتثل",         v: s.compliant, c: C_GRN },{ l: "ممتثل جزئياً", v: s.partial,  c: C_AMB },{ l: "غير ممتثل",    v: s.nc,        c: C_RED },
        ].map(r2 => (
        <div key={r2.l} className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground w-24 flex-shrink-0">{r2.l}</span>
        <div className="flex-1 h-2 rounded-full overflow-hidden cs-muted">
        <div className="h-full rounded-full transition-all" style={{ width: `${(r2.v / s.total) * 100}%`, background: r2.c, boxShadow: `0 0 6px ${r2.c}50` }} />
        </div>
        <span className="text-xs font-bold tabular-nums w-14 text-left" style={{ color: r2.c }}>{r2.v.toLocaleString()}</span>
        </div>
        ))}
        </div>
        <p className="text-[10px] text-muted-foreground mt-3 relative">متوسط الدرجة: {s.pct}% &nbsp;·&nbsp; شرح الدوائر</p>
        </div>
        ))}
        </div>
        <div className="relative rounded-2xl overflow-hidden p-5 cs">
        <InsetFrame />
        <div className="flex items-center gap-2 mb-4">
        <Layers size={14} style={{ color: GOLD }} />
        <h3 className="text-sm font-bold text-foreground">المقارنة التصنيفية</h3>
        </div>
        <div className="space-y-3">
        {classBars.map((cb, i) => {
        const total = cb.gov + cb.priv;
        const govPct = Math.round((cb.gov / total) * 100);
        return (
        <div key={i} className="flex items-center gap-3" style={{ animation: `card-rise 0.3s ease-out ${i * 0.06}s both` }}>
        <span className="text-[11px] text-muted-foreground w-52 flex-shrink-0">{cb.label}</span>
        <div className="flex-1 flex gap-0.5 h-5 rounded-lg overflow-hidden">
        {cb.gov > 0 && (
        <div className="flex items-center justify-center text-[9px] font-bold text-white"
        style={{ width: `${govPct}%`, background: cb.color, minWidth: "30px" }}>
        {cb.gov.toLocaleString()}
        </div>
        )}
        {cb.priv > 0 && (
        <div className="flex items-center justify-center text-[9px] font-bold text-white"
        style={{ width: `${100 - govPct}%`, background: `${cb.color}80`, minWidth: "30px" }}>
        {cb.priv.toLocaleString()}
        </div>
        )}
        </div>
        <div className="text-[10px] text-muted-foreground w-36 text-left">
        إجمالي: {total.toLocaleString()}
        </div>
        </div>
        );
        })}
        <div className="flex items-center gap-4 pt-2" style={{ borderTop: "1px solid var(--border)" }}>
        <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><span className="w-3 h-2 rounded inline-block" style={{ background: "#3B82F6" }} />القطاع العام</span>
        <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><span className="w-3 h-2 rounded inline-block" style={{ background: "#3B82F680" }} />القطاع الخاص</span>
        </div>
        </div>
        </div>
        </div>
      )}
      {activeTab === "table" && (
        <div className="space-y-4" key="table" style={{ animation: "fadeInPage 0.25s ease-out" }}>
        <div className="grid grid-cols-5 gap-3">
        {subCats.map((sc, i) => (
        <div key={i} className="relative rounded-xl overflow-hidden p-3 cs"
        style={{ animation: `card-rise 0.28s ease-out ${i * 0.04}s both` }}>
        <InsetFrame radius={10} />
        <p className="text-[11px] font-semibold text-foreground mb-2 leading-tight">{sc.name}</p>
        <div className="flex items-center gap-1.5 mb-1">
        <Shield size={9} style={{ color: C_GRN }} className="flex-shrink-0" />
        <div className="flex-1 h-1.5 rounded-full overflow-hidden cs-muted">
        <div className="h-full rounded-full" style={{ width: `${sc.pctGov}%`, background: C_GRN }} />
        </div>
        <span className="text-[9px] font-mono text-[#1E9E57] w-10 text-left">{sc.gov.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1.5">
        <Database size={9} style={{ color: GOLD }} className="flex-shrink-0" />
        <div className="flex-1 h-1.5 rounded-full overflow-hidden cs-muted">
        <div className="h-full rounded-full" style={{ width: `${sc.pctPriv}%`, background: GOLD }} />
        </div>
        <span className="text-[9px] font-mono w-10 text-left" style={{ color: GOLD }}>{sc.priv.toLocaleString()}</span>
        </div>
        </div>
        ))}
        </div>
        <div className="flex items-center justify-center gap-6 p-3 rounded-xl" style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
        {[{ l: "القطاع العام", c: C_GRN, i: Shield },{ l: "القطاع الخاص", c: GOLD, i: Database }].map(f => (
        <div key={f.l} className="flex items-center gap-1.5 text-xs text-foreground cursor-pointer hover:opacity-80 transition-opacity">
        <f.i size={12} style={{ color: f.c }} />
        <span style={{ color: f.c }}>{f.l}</span>
        </div>
        ))}
        </div>
        </div>
      )}
      {activeTab === "benchmark" && (
        <div className="space-y-4" key="benchmark" style={{ animation: "fadeInPage 0.25s ease-out" }}>
        <div className="grid grid-cols-2 gap-4">
        {[{ label: "اختيار تصنيف للمقارنة — القطاع العام", color: C_GRN, icon: Shield },{ label: "اختيار تصنيف للمقارنة — القطاع الخاص", color: GOLD, icon: Database }].map((p, i) => (
        <div key={i} className="relative rounded-2xl overflow-hidden p-6 flex flex-col items-center justify-center text-center"
        style={{ background: "var(--card)", border: `1px dashed ${p.color}30`, boxShadow: "var(--card-shadow)",
        minHeight: "120px", animation: `card-rise 0.3s ease-out ${i * 0.08}s both` }}>
        <p.icon size={22} style={{ color: p.color, opacity: 0.3 }} className="mb-2" />
        <p className="text-xs text-muted-foreground">{p.label}</p>
        <p className="text-[10px] text-muted-foreground mt-1 opacity-60">لا توجد فئات محددة</p>
        </div>
        ))}
        </div>
        <div className="relative rounded-2xl overflow-hidden cs">
        <InsetFrame />
        <div className="px-4 py-3 flex items-center gap-2" style={{ borderBottom: "1px solid var(--border)" }}>
        <BarChart3 size={14} style={{ color: GOLD }} />
        <h3 className="text-sm font-bold text-foreground">جدول المقارنة المتقدم</h3>
        </div>
        <table className="w-full text-xs">
        <thead>
        <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
        {["التصنيف", "القطاع العام", "", "القطاع الخاص", "", "الامتثال"].map((h, i) => (
        <th key={i} className="px-4 py-2.5 text-right font-semibold text-muted-foreground">{h}</th>
        ))}
        </tr>
        </thead>
        <tbody>
        {benchRows.map((row, i) => (
        <tr key={i} className="hover:bg-muted/20 transition-colors"
        style={{ borderBottom: i < benchRows.length - 1 ? "1px solid var(--border)" : "none",
        animation: `card-rise 0.25s ease-out ${i * 0.04}s both` }}>
        <td className="px-4 py-2.5 font-semibold text-foreground">{row.cat}</td>
        <td className="px-4 py-2.5">
        <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)", minWidth: "40px" }}>
        <div className="h-full rounded-full bg-[#1E9E57]" style={{ width: `${Math.min(100, (row.govV / 200) * 100)}%` }} />
        </div>
        <span className="font-mono text-[#1E9E57] tabular-nums">{row.govV}</span>
        </div>
        </td>
        <td className="px-2 py-2.5 text-muted-foreground text-[10px]">{row.gov}</td>
        <td className="px-4 py-2.5">
        <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)", minWidth: "40px" }}>
        <div className="h-full rounded-full" style={{ width: `${Math.min(100, (row.privV / 7000) * 100)}%`, background: GOLD }} />
        </div>
        <span className="font-mono tabular-nums" style={{ color: GOLD }}>{row.privV.toLocaleString()}</span>
        </div>
        </td>
        <td className="px-2 py-2.5 text-muted-foreground text-[10px]">{row.priv}</td>
        <td className="px-4 py-2.5"><ComplianceBadge status={row.status} /></td>
        </tr>
        ))}
        </tbody>
        </table>
        </div>
        </div>
      )}
    </div>
  );
}
function TimeComparisonPage() {
  const PERIODS = ["مارس 2025","أبريل 2025","مايو 2025","يونيو 2025","يوليو 2025","أغسطس 2025",
        "سبتمبر 2025","أكتوبر 2025","نوفمبر 2025","ديسمبر 2025","يناير 2026","فبراير 2026",
        "مارس 2026","أبريل 2026","مايو 2026","يونيو 2026"];
  const [p1Idx, setP1Idx] = useState(3);   // يونيو 2025
  const [p2Idx, setP2Idx] = useState(13);  // أبريل 2026
  const p1 = PERIODS[p1Idx];
  const p2 = PERIODS[p2Idx];
  const compliance = (idx: number) => ({
    overall: 5.2 + idx * 0.08,
    compliant:   { old: 832  + idx * 12,  curr: 911  + idx * 14  },
    partial:     { old: 980  + idx * 8,   curr: 1040 + idx * 6   },
    nc:          { old: 1523 + idx * 5,   curr: 1456 - idx * 10  },
    govTotal:    314 + idx,
    govComp:     127 + idx,
    privTotal:   12181 - idx * 10,
    privComp:    688  + idx * 5});
  const d1 = compliance(p1Idx);
  const d2 = compliance(p2Idx);
  const article12 = [
    { label: "الإجراءات الشخصية",                              p1: 43, p2: 47 },{ label: "إشعار أصحاب البيانات مع أهداف البيانات",        p1: 47, p2: 52 },{ label: "جمع البيانات",                                   p1: 37, p2: 42 },{ label: "حقوق البيانات",                                  p1: 27, p2: 31 },{ label: "النشاطات والتفاصيل",                             p1: 43, p2: 46 },{ label: "المعالجة والتحليل",                              p1: 48, p2: 51 },{ label: "حفظ البيانات والاحتفاظ بها",                    p1: 47, p2: 49 },{ label: "مشاركة البيانات مع الأطراف",                    p1: 38, p2: 44 },
  ];
  const SectionLabel = ({ title, icon: Icon }: { title: string; icon: React.ElementType }) => (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <Icon size={15} style={{ color: GOLD }} />
        <h3 className="text-sm font-bold text-foreground">{title}</h3>
      </div>
      <div className="flex items-center gap-2 text-[10px] font-semibold">
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: `${GOLD}15`, color: GOLD }}><span className="w-2 h-2 rounded-full" style={{ background: GOLD }} />{p1}</span>
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: "#7C6BAE18", color: C_VIO }}><span className="w-2 h-2 rounded-full bg-[#7C6BAE]" />{p2}</span>
      </div>
    </div>
  );
  return (
    <div className="relative p-5 space-y-4 stagger" style={{ zIndex: 1 }}>
      <CinematicBg page="time-comparison" />
      <div className="relative overflow-hidden rounded-2xl mb-1"
         style={{ background: `linear-gradient(135deg, ${NAVY_BG}, ${NAVY_CARD})`,
        border: `1.5px solid rgba(197,165,90,0.42)`,
        boxShadow: `0 0 0 1px rgba(197,165,90,0.06), 0 12px 40px rgba(4,9,28,0.50), inset 0 0 0 1px rgba(197,165,90,0.04)` }}>
        <InsetFrame radius={15} accent={GOLD} />
        <div className="absolute top-0 inset-x-0 h-[1.5px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}80, ${GOLD_PALE}, ${GOLD}80, transparent)` }} />
        <div className="relative z-10 px-5 py-4 flex items-center justify-between gap-4">
        <div>
        <div className="flex items-center gap-2 mb-0.5">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD, animation: "status-blink 1.5s ease-in-out infinite" }} />
        <HudLabel color={`${GOLD}80`}>DATA ANALYTICS · TIME COMPARISON</HudLabel>
        </div>
        <h1 className="text-xl font-black text-white">المقارنة الزمنية</h1>
        <p className="text-xs text-slate-400 mt-0.5">قارن الاتجاهات عبر الفترات الزمنية المختلفة</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
        <div className="flex items-center gap-1 px-3 py-2 rounded-xl" style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}30` }}>
        <button onClick={() => setP1Idx(i => Math.max(0, i - 1))} className="text-muted-foreground hover:text-white transition-colors px-1">‹</button>
        <span className="text-xs font-bold text-white px-2">{p1}</span>
        <button onClick={() => setP1Idx(i => Math.min(PERIODS.length - 1, i + 1))} className="text-muted-foreground hover:text-white transition-colors px-1">›</button>
        </div>
        <span className="text-muted-foreground text-xs">VS</span>
        <div className="flex items-center gap-1 px-3 py-2 rounded-xl" style={{ background: "#7C6BAE18", border: "1px solid #7C6BAE40" }}>
        <button onClick={() => setP2Idx(i => Math.max(0, i - 1))} className="text-muted-foreground hover:text-white transition-colors px-1">‹</button>
        <span className="text-xs font-bold text-white px-2">{p2}</span>
        <button onClick={() => setP2Idx(i => Math.min(PERIODS.length - 1, i + 1))} className="text-muted-foreground hover:text-white transition-colors px-1">›</button>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold" style={{ background: GOLD, color: NAVY_BG }}>
        <Download size={12} /> تصدير
        </button>
        </div>
        </div>
      </div>
      <div className="relative rounded-2xl overflow-hidden cs" style={{ animation: "hero-reveal 0.4s ease-out both" }}>
        <InsetFrame />
        <div className="absolute top-0 inset-x-0 h-[1.5px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}70, transparent)` }} />
        <div className="p-4 pb-2">
        <div className="flex items-center gap-2 mb-3">
        <Activity size={14} style={{ color: GOLD }} />
        <h3 className="text-sm font-bold text-foreground">نسبة الامتثال الإجمالية</h3>
        <span className="text-[11px] text-muted-foreground">تغيّر الامتثال بين الفترتين المحددتين</span>
        </div>
        </div>
        <div className="grid grid-cols-2 divide-x" style={{ borderColor: "var(--border)" }}>
        {[{ label: p1, val: d1.overall, color: GOLD },{ label: p2, val: d2.overall, color: C_VIO }].map((m, i) => {
        const diff = d2.overall - d1.overall;
        return (
        <div key={i} className="px-6 pb-5 pt-2 relative" style={{ direction: i === 1 ? "rtl" : "rtl" }}>
        <div className="absolute top-2 inset-x-3 h-px" style={{ background: `linear-gradient(90deg, transparent, ${m.color}30, transparent)` }} />
        <p className="text-xs text-muted-foreground mb-2">{m.label}</p>
        <div className="flex items-end gap-3">
        <span className="text-5xl font-black leading-none" style={{ color: m.color}}>
        {m.val.toFixed(1)}%
        </span>
        {i === 1 && (
        <div className="pb-1">
        <span className="text-lg font-black" style={{ color: diff > 0 ? C_GRN : C_RED }}>
        {diff > 0 ? "↑" : "↓"}{Math.abs(diff).toFixed(1)}%
        </span>
        <p className="text-[10px]" style={{ color: diff > 0 ? C_GRN : C_RED }}>{diff > 0 ? "تحسّن" : "تراجع"}</p>
        </div>
        )}
        </div>
        <div className="mt-3 w-full h-2 rounded-full overflow-hidden cs-muted">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${m.val}%`, background: m.color, boxShadow: `0 0 8px ${m.color}60` }} />
        </div>
        </div>
        );
        })}
        </div>
      </div>
      <div>
        <SectionLabel title="مقارنة حالات الامتثال" icon={Shield} />
        <div className="grid grid-cols-3 gap-4">
        {[
        { label: "غير ممتثل",    status: "non-compliant" as ComplianceStatus, color: C_RED, d1: d1.nc,       d2: d2.nc       },{ label: "ممتثل جزئياً", status: "partial"       as ComplianceStatus, color: C_AMB, d1: d1.partial,  d2: d2.partial  },{ label: "ممتثل",        status: "compliant"     as ComplianceStatus, color: C_GRN, d1: d1.compliant,d2: d2.compliant },
        ].map((c, i) => {
        const maxV = Math.max(c.d1.old, c.d1.curr, c.d2.old, c.d2.curr);
        const diff1 = c.d1.curr - c.d1.old;
        const diff2 = c.d2.curr - c.d2.old;
        return (
        <div key={i} className="relative rounded-2xl overflow-hidden p-4"
        style={{ background: `linear-gradient(145deg, var(--card), color-mix(in srgb, var(--card) 90%, ${c.color}))`,
        border: `1px solid ${c.color}22`, boxShadow: "var(--card-shadow)",
        animation: `card-rise 0.35s ease-out ${i * 0.07}s both` }}>
        <InsetFrame accent={c.color} radius={12} />
        <div className="relative">
        <ComplianceBadge status={c.status} />
        <div className="grid grid-cols-2 gap-3 mt-3">
        {[{ label: p1, v: c.d1.curr, prev: c.d1.old, diff: diff1, tc: GOLD },{ label: p2, v: c.d2.curr, prev: c.d2.old, diff: diff2, tc: C_VIO }].map((m, j) => (
        <div key={j}>
        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded" style={{ background: `${m.tc}15`, color: m.tc }}>{m.label}</span>
        <p className="text-[22px] font-black tabular-nums mt-1 leading-none" style={{ color: c.color }}>{m.v.toLocaleString()}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">سابقاً: {m.prev.toLocaleString()}</p>
        </div>
        ))}
        </div>
        <div className="mt-3 space-y-1.5">
        {[{ label: p1, v: c.d1.curr, tc: GOLD },{ label: p2, v: c.d2.curr, tc: C_VIO }].map((m, j) => (
        <div key={j} className="flex items-center gap-2">
        <span className="text-[9px] text-muted-foreground w-16 flex-shrink-0 text-left">{m.label}</span>
        <div className="flex-1 h-1.5 rounded-full overflow-hidden cs-muted">
        <div className="h-full rounded-full" style={{ width: `${(m.v / maxV) * 100}%`, background: m.tc }} />
        </div>
        <span className="text-[9px] font-mono" style={{ color: m.tc, minWidth: "36px" }}>{m.v.toLocaleString()}</span>
        </div>
        ))}
        </div>
        </div>
        </div>
        );
        })}
        </div>
      </div>
      <div>
        <SectionLabel title="مقارنة القطاعات" icon={Globe} />
        <div className="grid grid-cols-2 gap-4">
        {[
        { label: "القطاع العام",  icon: Shield,   total: d2.govTotal,  comp: d2.govComp,
        prevTotal: d1.govTotal, prevComp: d1.govComp, color: C_GRN },{ label: "القطاع الخاص", icon: Database,  total: d2.privTotal, comp: d2.privComp,
        prevTotal: d1.privTotal, prevComp: d1.privComp, color: "#C5A55A" },
        ].map((s, i) => {
        const pct1 = Math.round((s.prevComp / s.prevTotal) * 100);
        const pct2 = Math.round((s.comp / s.total) * 100);
        return (
        <div key={i} className="relative rounded-2xl overflow-hidden p-4"
        style={{ background: "var(--card)", border: `1px solid ${s.color}20`, boxShadow: "var(--card-shadow)",
        animation: `card-rise 0.35s ease-out ${i * 0.1}s both` }}>
        <InsetFrame accent={s.color} />
        <div className="relative flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${s.color}14` }}>
        <s.icon size={15} style={{ color: s.color }} />
        </div>
        <div>
        <h4 className="text-sm font-bold text-foreground">{s.label}</h4>
        <p className="text-[10px] text-muted-foreground">{s.total.toLocaleString()} موقع</p>
        </div>
        <div className="mr-auto text-left">
        <span className="text-2xl font-black tabular-nums" style={{ color: s.color }}>{s.comp.toLocaleString()}</span>
        <p className="text-[10px] text-muted-foreground">ممتثل حالياً</p>
        </div>
        </div>
        <div className="space-y-2">
        {[{ label: p1, val: pct1, abs: s.prevComp, color: GOLD },{ label: p2, val: pct2, abs: s.comp, color: C_VIO }].map((m, j) => (
        <div key={j}>
        <div className="flex items-center justify-between mb-1">
        <span className="text-[9px] px-1.5 py-0.5 rounded font-semibold" style={{ background: `${m.color}14`, color: m.color }}>{m.label}</span>
        <span className="text-[10px] font-bold tabular-nums text-foreground">{m.abs.toLocaleString()}</span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden cs-muted">
        <div className="h-full rounded-full transition-all" style={{ width: `${m.val}%`, background: m.color, boxShadow: `0 0 6px ${m.color}50` }} />
        </div>
        </div>
        ))}
        </div>
        </div>
        );
        })}
        </div>
      </div>
      <div>
        <SectionLabel title="مقارنة بنود المادة 12" icon={FileText} />
        <div className="relative rounded-2xl overflow-hidden p-5 cs">
        <InsetFrame />
        <div className="flex items-center gap-4 mb-4 text-[11px]">
        <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full inline-block" style={{ background: GOLD }} />{p1}</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full inline-block bg-[#7C6BAE]" />{p2}</span>
        <span className="flex items-center gap-1.5 mr-auto text-[10px] text-muted-foreground">↑ = تحسّن &nbsp; ↓ = تراجع</span>
        </div>
        <div className="space-y-3">
        {article12.map((art, i) => {
        const diff = art.p2 - art.p1;
        const c1 = art.p1 >= 50 ? C_GRN : art.p1 >= 35 ? C_AMB : C_RED;
        const c2 = art.p2 >= 50 ? C_GRN : art.p2 >= 35 ? C_AMB : C_RED;
        return (
        <div key={i} className="group hover:bg-muted/20 rounded-xl p-2 transition-all -mx-2"
        style={{ animation: `card-rise 0.3s ease-out ${i * 0.05}s both` }}>
        <div className="flex items-start gap-3">
        <span className="text-[10px] font-black text-muted-foreground w-12 flex-shrink-0 mt-0.5">بند {i + 1}</span>
        <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
        <p className="text-[12px] font-semibold text-foreground leading-tight">{art.label}</p>
        <span className="text-[11px] font-black flex-shrink-0 mr-3" style={{ color: diff >= 0 ? C_GRN : C_RED }}>
        {diff >= 0 ? "↑" : "↓"}{Math.abs(diff)}%
        </span>
        </div>
        <div className="flex items-center gap-2 mb-1">
        <span className="text-[9px] font-mono w-6 text-left" style={{ color: GOLD }}>{art.p1}%</span>
        <div className="flex-1 h-2 rounded-full overflow-hidden cs-muted">
        <div className="h-full rounded-full" style={{ width: `${art.p1}%`, background: c1, boxShadow: `0 0 5px ${c1}50` }} />
        </div>
        <span className="text-[9px] text-muted-foreground w-16 text-right">{p1}</span>
        </div>
        <div className="flex items-center gap-2">
        <span className="text-[9px] font-mono w-6 text-left" style={{ color: C_VIO }}>{art.p2}%</span>
        <div className="flex-1 h-2 rounded-full overflow-hidden cs-muted">
        <div className="h-full rounded-full" style={{ width: `${art.p2}%`, background: c2, boxShadow: `0 0 5px ${c2}50` }} />
        </div>
        <span className="text-[9px] text-muted-foreground w-16 text-right">{p2}</span>
        </div>
        </div>
        </div>
        {i < article12.length - 1 && <div className="mt-2 mx-2 h-px" style={{ background: "var(--border)" }} />}
        </div>
        );
        })}
        </div>
        </div>
      </div>
    </div>
  );
}
function ComplianceComparisonPage() {
  return (
    <SimplePage page="compliance-comparison" title="مقارنة الامتثال" subtitle="مقارنة حالة الامتثال بين جهتين أو أكثر جنباً إلى جنب" icon={Scale}>
      <div className="grid grid-cols-3 gap-4">
        <PCard goldTop className="p-5">
          <h3 className="text-sm font-semibold mb-3">اختيار الجهات</h3>
          <p className="text-xs text-muted-foreground mb-3">اختر 2-8 جهات للمقارنة</p>
          <div className="space-y-2 max-h-80 overflow-y-auto">
          {WEBSITES.slice(0, 8).map((w, i) => (
          <div key={i} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer transition-all">
          <div className="w-4 h-4 rounded border border-border flex-shrink-0 cs-muted" />
          <Globe size={12} className="text-muted-foreground flex-shrink-0" />
          <span className="text-xs text-foreground flex-1">{w.name}</span>
          </div>
          ))}
          </div>
        </PCard>
        <div className="col-span-2">
          <PCard goldTop className="p-12 text-center h-full flex items-center justify-center flex-col gap-4">
          <ArrowLeftRight size={40} className="text-muted-foreground opacity-30" />
          <h3 className="text-lg font-bold text-foreground">اختر جهتين على الأقل</h3>
          <p className="text-sm text-muted-foreground">حدد الجهات من القائمة الجانبية لعرض المقارنة التفصيلية</p>
          </PCard>
        </div>
      </div>
    </SimplePage>
  );
}
function ComplianceHeatmapPage() {
  const regions = [
    { name: "المنطقة الشرقية", pct: 70, sites: 254 },{ name: "الرياض", pct: 65, sites: 412 },{ name: "مكة المكرمة", pct: 60, sites: 286 },{ name: "المدينة المنورة", pct: 57, sites: 143 },{ name: "القصيم", pct: 64, sites: 98 },{ name: "تبوك", pct: 55, sites: 76 },{ name: "عسير", pct: 52, sites: 89 },{ name: "الجوف", pct: 47, sites: 44 },{ name: "جازان", pct: 47, sites: 62 },{ name: "نجران", pct: 45, sites: 38 },{ name: "الباحة", pct: 42, sites: 29 },{ name: "الحدود الشمالية", pct: 41, sites: 31 },
  ];
  return (
    <SimplePage page="compliance-heatmap" title="خريطة الامتثال الحرارية" subtitle="التوزيع الجغرافي لامتثال المواقع حسب مناطق المملكة" icon={Map}
          kpis={[{ label: "الحدود الشمالية (أدنى)", value: "41%", icon: AlertTriangle, color: C_RED },{ label: "الشرقية (أعلى)", value: "70%", icon: Award, color: C_GRN },{ label: "متوسط الامتثال", value: "55%", icon: BarChart3, color: GOLD },{ label: "إجمالي المواقع", value: "1,634", icon: Globe, color: TEAL }]}>
      <PCard goldTop className="p-5">
        <h3 className="text-sm font-semibold mb-4">ترتيب المناطق حسب نسبة الامتثال</h3>
        <div className="space-y-2.5">
          {regions.map((r, i) => {
          const c = r.pct >= 65 ? C_GRN : r.pct >= 50 ? C_AMB : C_RED;
          return (
          <div key={i} className="flex items-center gap-3" style={{ animation: `card-rise 0.3s ease-out ${i * 0.04}s both` }}>
          <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
          <span className="text-sm text-foreground w-32">{r.name}</span>
          <div className="flex-1 h-2 rounded-full overflow-hidden cs-muted">
          <div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: c }} />
          </div>
          <span style={{ color: c}} className="text-sm font-black w-10 text-left">{r.pct}%</span>
          <span className="text-xs text-muted-foreground w-14">{r.sites} موقع</span>
          </div>
          );
          })}
        </div>
      </PCard>
    </SimplePage>
  );
}
function AdvancedSearchPage() {
  return (
    <SimplePage page="advanced-search" title="البحث والتصفية المتقدمة" subtitle="بحث متقدم في قاعدة بيانات الجهات مع إمكانية حفظ قوالب التصفية" icon={SearchIcon}>
      <PCard goldTop className="p-5">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {["بحث نصي", "القطاع", "حالة الامتثال"].map(f => (
          <div key={f}>
          <label className="text-xs text-muted-foreground mb-1 block">{f}</label>
          <input className="w-full px-3 py-2 rounded-lg text-sm text-foreground focus:outline-none" placeholder={f}
          style={{ border: "1px solid var(--border)", background: "var(--muted)"}} />
          </div>
          ))}
        </div>
        <div className="flex gap-2">
          <button style={{ background: GOLD, color: NAVY_BG}} className="px-5 py-2 rounded-lg text-sm font-bold hover:opacity-90">بحث</button>
          <button style={{ border: "1px solid var(--border)"}} className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted">إعادة تعيين</button>
        </div>
      </PCard>
      <PCard goldTop>
        <div className="p-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
          <span className="text-sm font-semibold">نتائج البحث <span className="text-muted-foreground font-normal">(7 نتيجة)</span></span>
          <button style={{ border: "1px solid var(--border)"}} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:bg-muted"><Download size={12} /> تصدير النتائج</button>
        </div>
        {WEBSITES.slice(0, 5).map((site, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-muted/20 transition-colors cursor-pointer"
          style={{ borderBottom: i < 4 ? "1px solid var(--border)" : "none" }}
          onClick={() => (window as any)._rasidOpenSite?.(site)}>
          <div>
          <p className="text-sm font-medium text-foreground">{site.name}</p>
          <p className="text-xs text-muted-foreground font-mono">{site.url}</p>
          </div>
          <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">{site.sector}</span>
          <ComplianceBadge status={site.status} />
          <span style={{ color: site.score >= 80 ? C_GRN : site.score >= 50 ? C_AMB : C_RED }} className="text-sm font-bold">{site.score}</span>
          </div>
          </div>
        ))}
      </PCard>
    </SimplePage>
  );
}
function ChangeDetectionPage() {
  const changes = [
    { org: "وزارة التعليم", domain: "moe.gov.sa", desc: "تمت إضافة سياسة خصوصية جديدة وتحسين بنود جمع البيانات", type: "إضافة سياسة", typeColor: C_GRN, pct: "+13.0%", dir: "↗" },{ org: "نون للتجارة",   domain: "noon.com",   desc: "تم حذف قسم حقوق أصحاب البيانات من سياسة الخصوصية", type: "إزالة سياسة", typeColor: C_RED, pct: "-14.0%", dir: "↘" },{ org: "شركة stc",      domain: "stc.com.sa", desc: "تعديل طفيف في سياسة الاحتفاظ بالبيانات", type: "تعديل",       typeColor: C_AMB, pct: "+2.0%",  dir: "↗" },
  ];
  return (
    <SimplePage page="change-detection" title="كشف التغييرات" subtitle="مراقبة التغييرات في سياسات الخصوصية بين الفحوصات المتتالية" icon={AlertTriangle}
          kpis={[{ label: "إجمالي التغييرات", value: "6", icon: AlertTriangle, color: GOLD },{ label: "سياسات مضافة", value: "2", icon: CheckCircle2, color: C_GRN },{ label: "تغييرات جوهرية", value: "3", icon: AlertCircle, color: C_AMB },{ label: "سياسات محذوفة", value: "1", icon: WifiOff, color: C_RED }]}>
      <div className="space-y-3">
        {changes.map((c, i) => (
          <PCard key={i} goldTop className="p-5" style={{ animation: `card-rise 0.35s ease-out ${i * 0.08}s both` }}>
          <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ background: `${c.typeColor}15`, color: c.typeColor}}>{c.type}</span>
          </div>
          <p className="text-sm font-semibold text-foreground">{c.org} ({c.domain})</p>
          <p className="text-xs text-muted-foreground mt-1">{c.desc}</p>
          </div>
          <div className="text-left flex-shrink-0 ms-4">
          <p style={{ color: c.typeColor }} className="text-xl font-black">{c.pct}</p>
          <p style={{ color: c.typeColor }} className="text-sm">{c.dir}</p>
          </div>
          </div>
          </PCard>
        ))}
      </div>
    </SimplePage>
  );
}
function InteractiveComparisonPage() {
  return (
    <SimplePage page="interactive-comparison" title="لوحة المقارنة التفاعلية" subtitle="مقارنة بصرية شاملة بين المواقع مع رسوم بيانية تفاعلية" icon={Layers}>
      <PCard goldTop className="p-5">
        <h3 className="text-sm font-semibold mb-3">اختر المواقع للمقارنة <span className="text-muted-foreground font-normal">(2-8 مواقع)</span></h3>
        <div className="grid grid-cols-3 gap-3">
          {WEBSITES.slice(0, 6).map((w, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted cursor-pointer transition-all" style={{ border: "1px solid var(--border)" }}>
          <div>
          <p className="text-xs font-medium text-foreground">{w.name}</p>
          <p className="text-[10px] text-muted-foreground font-mono">{w.url}</p>
          </div>
          <button className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all hover:scale-110"
          style={{ background: `${GOLD}15`, color: GOLD, border: `1px solid ${GOLD}30` }}>+</button>
          </div>
          ))}
        </div>
      </PCard>
      <PCard goldTop className="p-12 text-center">
        <Layers size={36} className="text-muted-foreground opacity-25 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-foreground mb-2">حدد موقعين على الأقل</h3>
        <p className="text-sm text-muted-foreground">استخدم لوحة البحث أعلاه لاختيار المواقع المراد مقارنتها</p>
      </PCard>
    </SimplePage>
  );
}
function DocumentsRegistryPage() {
  const docs = [
    { id: "RASID-DOC-2026-001042", title: "تقرير امتثال وزارة الصحة",      type: "تقرير امتثال", status: "compliant" as ComplianceStatus, date: "7 محرم 1448" },{ id: "RASID-DOC-2026-001041", title: "ملخص تنفيذي — القطاع البنكي",  type: "ملخص تنفيذي",  status: "compliant" as ComplianceStatus, date: "6 محرم 1448" },{ id: "RASID-DOC-2026-001040", title: "توثيق حالة رصد — نون",         type: "توثيق رصد",    status: "compliant" as ComplianceStatus, date: "5 محرم 1448" },{ id: "RASID-DOC-2026-001039", title: "تقرير مخصص — التعليم",         type: "تقرير مخصص",   status: "compliant" as ComplianceStatus, date: "4 محرم 1448" },
  ];
  return (
    <SimplePage page="documents-registry" title="سجل الوثائق" subtitle="عرض وإدارة جميع الوثائق والتقارير الصادرة من المنصة" icon={Folder}
          kpis={[{ label: "إجمالي التوثيقات", value: "16", icon: FileText, color: GOLD },{ label: "تقارير مخصصة", value: "6", icon: Download, color: TEAL },{ label: "توثيق حالات رصد", value: "6", icon: Folder, color: C_VIO },{ label: "موظفون مُصدرون", value: "4", icon: Users, color: C_GRN }]}>
      <PCard goldTop>
        <table className="w-full">
          <thead>
          <tr style={{ borderBottom: "1px solid var(--border)" }}>
          {["رقم الوثيقة", "العنوان", "النوع", "التاريخ", "الحالة", "إجراءات"].map(h => (
          <th key={h} className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">{h}</th>
          ))}
          </tr>
          </thead>
          <tbody>
          {docs.map((d, i) => (
          <tr key={i} className="hover:bg-muted/20 transition-colors" style={{ borderBottom: i < docs.length - 1 ? "1px solid var(--border)" : "none", animation: `card-rise 0.3s ease-out ${i * 0.06}s both` }}>
          <td className="px-4 py-3"><span className="text-xs font-mono text-muted-foreground">{d.id}</span></td>
          <td className="px-4 py-3"><span className="text-sm text-foreground">{d.title}</span></td>
          <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${GOLD}15`, color: GOLD}}>{d.type}</span></td>
          <td className="px-4 py-3"><span className="text-xs text-muted-foreground">{d.date}</span></td>
          <td className="px-4 py-3"><ComplianceBadge status={d.status} /></td>
          <td className="px-4 py-3"><button className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted"><Download size={12} /></button></td>
          </tr>
          ))}
          </tbody>
        </table>
      </PCard>
    </SimplePage>
  );
}
function VerifyPage() {
  const [code, setCode] = useState("");
  return (
    <div className="relative min-h-full flex items-center justify-center p-6"
         style={{ background: NAVY_BG, zIndex: 1 }}>
      <CinematicBg page="verify" />
      <div className="relative z-10 w-full max-w-md text-center space-y-6" style={{ animation: "hero-reveal 0.5s ease-out both" }}>
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto"
          style={{ background: `${TEAL}15`, border: `1.5px solid ${TEAL}40`, boxShadow: `0 0 40px ${TEAL}20` }}>
          <Shield size={36} style={{ color: TEAL }} />
        </div>
        <div>
          <h1 style={{ color: TEAL }} className="text-2xl font-black">نظام التحقق من الوثائق</h1>
          <p className="text-sm text-slate-400 mt-1">Document Verification System – NDMO Rasid Platform</p>
        </div>
        <PCard goldTop className="p-6 space-y-4 text-right">
          <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">رمز التحقق</label>
          <div className="relative">
          <input type="text" value={code} onChange={e => setCode(e.target.value)} dir="ltr"
          placeholder="NDMO-DOC-2026-XXXXXXXX"
          className="w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 font-mono"
          style={{ border: `1px solid ${TEAL}30`, background: "var(--muted)" }} />
          </div>
          </div>
          <button className="w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          style={{ background: TEAL, color: NAVY_BG}}>
          <SearchIcon size={15} /> تحقق
          </button>
          <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          <span className="text-xs text-muted-foreground">أو</span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>
          <div className="grid grid-cols-2 gap-3">
          {[{ l: "رفع ملف (PDF / HTML)", i: Upload },{ l: "مسح QR بالكاميرا", i: Cpu }].map(b => (
          <button key={b.l} style={{ border: "1px solid var(--border)"}}
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs text-muted-foreground hover:bg-muted transition-all">
          <b.i size={13} /> {b.l}
          </button>
          ))}
          </div>
        </PCard>
        <div>
          <p style={{ color: TEAL }} className="text-sm font-bold">حماية البيانات الشخصية متطلب وطني</p>
          <p className="text-xs text-slate-500 mt-1">منصة راصد – مكتب إدارة البيانات الوطنية (NDMO)</p>
          <p className="text-[10px] text-slate-600 mt-1 font-mono">NDMO_RASID_VERIFY_ENGINE v4.0</p>
        </div>
      </div>
    </div>
  );
}
function DocumentStatsPage() {
  const docTypes = [
    { l: "توثيق حالة رصد",  v: 98, pct: 40, c: GOLD      },{ l: "تقرير مخصص",      v: 54, pct: 22, c: TEAL       },{ l: "ملخص تنفيذي",     v: 31, pct: 13, c: C_VIO  },{ l: "تقرير امتثال",    v: 42, pct: 17, c: C_GRN  },{ l: "تقرير قطاعي",     v: 22, pct: 9,  c: C_AMB  },
  ];
  return (
    <SimplePage page="document-stats" title="إحصائيات الوثائق" subtitle="تحليل شامل لجميع الوثائق والتقارير المصدرة من المنصة" icon={BarChart3}
          kpis={[{ label: "إجمالي الوثائق", value: "247", icon: FileText, color: GOLD },{ label: "ملخصات تنفيذية", value: "31", icon: Clipboard, color: TEAL },{ label: "تقارير مخصصة", value: "54", icon: Download, color: C_VIO },{ label: "توثيق حالات رصد", value: "98", icon: Folder, color: C_GRN }]}>
      <div className="grid grid-cols-2 gap-4">
        <div className="relative rounded-2xl overflow-hidden p-5" style={{ background:"var(--card)", border:"1px solid var(--border)", boxShadow:"var(--card-shadow)" }}>
          <h3 className="text-sm font-semibold mb-4 relative z-10">الوثائق عبر الزمن</h3>
          <div dir="ltr">
          <ResponsiveContainer width="100%" height={180}>
          <LineChart data={TREND_DATA} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 10, fill: C_SLT, fontFamily: "Tajawal" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: C_SLT }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={TT} />
          <Line name="line-docs-teal" type="basis" dataKey="ممتثل" stroke={TEAL} strokeWidth={2.5} dot={{ fill: TEAL, r: 3, strokeWidth: 0 }} />
          </LineChart>
          </ResponsiveContainer>
          </div>
        </div>
        <PCard goldTop className="p-5">
          <h3 className="text-sm font-semibold mb-4">تفصيل أنواع الوثائق</h3>
          <div className="space-y-3">
          {docTypes.map((d, i) => (
          <div key={i} className="space-y-1" style={{ animation: `card-rise 0.3s ease-out ${i * 0.06}s both` }}>
          <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{d.l}</span>
          <span style={{ color: d.c }} className="font-bold">{d.v} ({d.pct}%)</span>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden cs-muted">
          <div className="h-full rounded-full" style={{ width: `${d.pct * 2.5}%`, background: d.c }} />
          </div>
          </div>
          ))}
          </div>
        </PCard>
      </div>
    </SimplePage>
  );
}
function AdminPage() {
  const [section, setSection] = useState("theme");
  return (
    <div className="relative flex overflow-hidden" style={{ height: "calc(100vh - 48px)" }}>
      <CinematicBg page="admin" />
      <div className="w-52 flex-shrink-0 flex flex-col py-5 overflow-y-auto relative z-10"
         style={{ borderLeft: "1px solid var(--border)", background: "var(--muted)" }}>
        <p className="px-4 text-[9px] text-muted-foreground font-semibold tracking-[0.2em] uppercase mb-3">إعدادات المنصة</p>
        <div className="px-2 space-y-0.5">
        {ADMIN_SECTIONS.map(s => (
        <button key={s.id} onClick={() => setSection(s.id)}
        style={section === s.id ? { background: "var(--card)", boxShadow: `inset 3px 0 0 ${GOLD}` } : {}}
        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${section === s.id ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-card/50"}`}>
        <s.icon size={13} style={{ color: section === s.id ? GOLD : "" }} />
        <span>{s.label}</span>
        </button>
        ))}
        </div>
      </div>
      <div className="relative flex-1 overflow-y-auto p-6 space-y-5" style={{ zIndex: 1 }}>
        <PageHeader title={ADMIN_SECTIONS.find(s => s.id === section)?.label || "الإعدادات"} subtitle="إدارة إعدادات المنصة والهوية البصرية"
        icon={ADMIN_SECTIONS.find(s => s.id === section)?.icon} />
        {section === "theme" && (
        <div className="space-y-4">
        <PCard goldTop className="p-5">
        <h3 className="text-sm font-semibold mb-4">نمط العرض</h3>
        <div className="grid grid-cols-3 gap-3">
        {[{ id: "dark", label: "الوضع الداكن", bg: NAVY_BG, active: true },{ id: "light", label: "الوضع الفاتح", bg: "#F7F4EC", active: false },{ id: "auto", label: "تلقائي", bg: `linear-gradient(135deg, ${NAVY_BG} 50%, #F7F4EC 50%)`, active: false }].map(t => (
        <div key={t.id} className="p-3 rounded-xl cursor-pointer" style={{ border: `1px solid ${t.active ? GOLD : "var(--border)"}`, background: t.active ? `${GOLD}08` : "var(--muted)" }}>
        <div className="w-full h-12 rounded-lg mb-2 overflow-hidden" style={{ background: t.bg }} />
        <p className="text-xs text-center text-foreground">{t.label}</p>
        {t.active && <div className="w-2 h-2 rounded-full mx-auto mt-1.5" style={{ background: GOLD }} />}
        </div>
        ))}
        </div>
        </PCard>
        <PCard goldTop className="p-5">
        <h3 className="text-sm font-semibold mb-4">ألوان النظام</h3>
        <div className="grid grid-cols-2 gap-3">
        {[{ l: "اللون الأساسي", c: NAVY_SIDEBAR, d: "Deep Navy" },{ l: "لون التمييز", c: GOLD, d: "Soft Gold" },{ l: "الامتثال الكامل", c: C_GRN, d: "Muted Emerald" },{ l: "عدم الامتثال", c: C_RED, d: "Muted Crimson" }].map((col, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ border: "1px solid var(--border)" }}>
        <div className="w-8 h-8 rounded-lg flex-shrink-0 border border-white/10" style={{ background: col.c }} />
        <div>
        <p className="text-xs font-medium text-foreground">{col.l}</p>
        <p className="text-[10px] text-muted-foreground font-mono">{col.c} · {col.d}</p>
        </div>
        </div>
        ))}
        </div>
        </PCard>
        </div>
        )}
        {section !== "theme" && (
        <PCard goldTop className="p-10 text-center">
        {(() => { const s = ADMIN_SECTIONS.find(x => x.id === section); return s ? (
        <>
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: `${GOLD}12` }}>
        <s.icon size={22} style={{ color: GOLD }} />
        </div>
        <p className="text-sm text-muted-foreground">إعدادات {s.label} متاحة قريباً</p>
        </>
        ) : null; })()}
        </PCard>
        )}
      </div>
    </div>
  );
}
const PAGE_COMPONENT: Partial<Record<Page, React.FC>> = {
  leadership: LeadershipPage, "kpi-dashboard": KPIDashboardPage, "real-time": RealTimePage,
  "smart-rasid": SmartRasidPage, "advanced-scan": AdvancedScanPage, sites: SitesPage,
  "mobile-apps": MobileAppsPage, "scan-history": ScanHistoryPage, "scan-library": ScanLibraryPage,
  "scan-schedules": ScanSchedulesPage, cases: CasesPage,
  "pdf-reports": PdfReportsPage, "custom-reports": CustomReportsPage, "scheduled-reports": ScheduledReportsPage,
  "message-templates": MessageTemplatesPage, letters: LettersPage, "export-data": ExportDataPage,
  "improvement-tracker": ImprovementTrackerPage,
  "advanced-analytics": AdvancedAnalyticsPage, "sector-comparison": SectorComparisonPage,
  "time-comparison": TimeComparisonPage, "compliance-comparison": ComplianceComparisonPage,
  "compliance-heatmap": ComplianceHeatmapPage, "advanced-search": AdvancedSearchPage,
  "change-detection": ChangeDetectionPage, "interactive-comparison": InteractiveComparisonPage,
  "documents-registry": DocumentsRegistryPage, verify: VerifyPage, "document-stats": DocumentStatsPage,
  admin: AdminPage};
function DrillDownModal({
  open, onClose, filter, title, color, textColor, onOpenSite}: {
  open: boolean; onClose: () => void;
  filter: ComplianceStatus | "all"; title: string; color: string; textColor: string;
  onOpenSite: (site: typeof WEBSITES[0]) => void;
}) {
  const [search, setSearch]   = useState("");
  const [page, setPage]       = useState(0);
  const PER_PAGE = 8;
  const sites = filter === "all" ? WEBSITES : WEBSITES.filter(w => w.status === filter);
  const filtered = sites.filter(s =>
    search === "" || s.name.includes(search) || s.url.includes(search)
  );
  const total = filtered.length;
  const slice = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);
  useEffect(() => { if (open) { setSearch(""); setPage(0); } }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center"
         style={{ background: "rgba(4,9,28,0.82)", backdropFilter: "blur(8px)", animation: "fadeInPage 0.2s ease-out" }}>
      <div className="absolute inset-0" onClick={onClose} />
      <div className="glass-card relative w-full max-w-2xl mx-4 rounded-2xl overflow-hidden"
           style={{ border: `1px solid ${color}30`,
          boxShadow: `0 32px 80px rgba(4,9,28,0.7), 0 0 80px ${color}10`,
          animation: "hero-reveal 0.35s cubic-bezier(0.34,1.56,0.64,1) both" }}>
        <InsetFrame accent={color} />
        <div className="absolute top-0 inset-x-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${color} 30%, ${GOLD_PALE} 50%, ${color} 70%, transparent)` }} />
        <div className="absolute inset-x-0 top-0 h-20 pointer-events-none opacity-50"
          style={{ background: `linear-gradient(180deg, ${color}0C, transparent)` }} />
        <div className="relative px-5 pt-5 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
          <Globe size={18} style={{ color }} />
          </div>
          <div>
          <div className="flex items-center gap-2 mb-0.5">
          <span className="text-base font-black text-foreground">{title}</span>
          <span className="text-xs px-2 py-0.5 rounded-full font-bold"
          style={{ background: `${color}18`, color, border: `1px solid ${color}25` }}>
          {total} موقع
          </span>
          </div>
          <p className="text-xs text-muted-foreground">مرتبة حسب درجة الامتثال تنازلياً</p>
          </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-muted flex-shrink-0"
          style={{ color: "var(--muted-foreground)", marginTop: "2px" }}>✕</button>
          </div>
          <div className="flex items-center gap-2 mt-3">
          <div className="flex-1 relative">
          <SearchIcon size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(0); }} dir="rtl"
          placeholder="ابحث في القائمة..."
          className="w-full pr-9 pl-4 py-2 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          style={{ border: "1px solid var(--border)", background: "var(--muted)" }} />
          </div>
          {[{ l: "Excel", i: Download },{ l: "PDF", i: FileText }].map(b => (
          <button key={b.l} className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80"
          style={{ background: `${color}14`, color, border: `1px solid ${color}22` }}>
          <b.i size={12} /> {b.l}
          </button>
          ))}
          </div>
        </div>
        <div className="divide-y max-h-[380px] overflow-y-auto" style={{ borderColor: "var(--border)" }}>
          {slice.length === 0 && (
          <div className="py-12 text-center text-muted-foreground text-sm">لا توجد نتائج</div>
          )}
          {slice.map((site, i) => {
          const sc = site.score >= 80 ? C_GRN : site.score >= 50 ? C_AMB : site.score > 0 ? C_RED : C_SLT;
          return (
          <div key={site.url}
          className="flex items-center gap-3 px-5 py-3 hover:bg-muted/40 transition-all cursor-pointer group"
          style={{ animation: `card-rise 0.25s ease-out ${i * 0.04}s both` }}
          onClick={() => { onOpenSite(site); onClose(); }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${sc}10`, border: `1px solid ${sc}20` }}>
          <Globe size={14} style={{ color: sc }} />
          </div>
          <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{site.name}</p>
          <p className="text-xs font-mono text-muted-foreground">{site.url}</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
          <div className="hidden sm:flex items-center gap-1.5">
          <div className="w-20 h-1.5 rounded-full overflow-hidden cs-muted">
          <div className="h-full rounded-full" style={{ width: `${site.score}%`, background: sc }} />
          </div>
          <span className="text-xs font-mono font-bold w-6" style={{ color: sc }}>{site.score}</span>
          </div>
          <ComplianceBadge status={site.status} />
          <Eye size={13} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          </div>
          );
          })}
        </div>
        <div className="px-5 py-3 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
          <span className="text-xs text-muted-foreground">
          عرض {Math.min((page + 1) * PER_PAGE, total)} من {total}
          </span>
          <div className="flex items-center gap-2">
          <button disabled={page === 0} onClick={() => setPage(p => p - 1)}
          className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-30 hover:bg-muted transition-all"
          style={{ border: "1px solid var(--border)" }}>
          <ChevronRight size={14} className="text-muted-foreground" />
          </button>
          <span className="text-xs font-mono text-muted-foreground px-2">{page + 1} / {Math.max(1, Math.ceil(total / PER_PAGE))}</span>
          <button disabled={(page + 1) * PER_PAGE >= total} onClick={() => setPage(p => p + 1)}
          className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-30 hover:bg-muted transition-all"
          style={{ border: "1px solid var(--border)" }}>
          <ChevronLeft size={14} className="text-muted-foreground" />
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function SiteProfilePage({ onBack }: { onBack: () => void }) {
  const site = _activeSite;
  const [tab, setTab] = useState<"compliance"|"scans"|"screenshots"|"text">("compliance");
  const [prevTab, setPrevTab] = useState(tab);
  const [tabDir, setTabDir] = useState<"left"|"right">("left");
  const [scanDetail, setScanDetail] = useState<number | null>(null);
  const a12  = getArticle12Scores(site.score);
  const hist = getScanHistory(site.score);
  const sc = site.score >= 80 ? C_GRN : site.score >= 50 ? C_AMB : site.score > 0 ? C_RED : C_SLT;
  const tabs = [
    { id: "compliance"  as const, label: "الامتثال للمادة 12",   icon: Shield      },{ id: "scans"       as const, label: "سجل الفحوصات",         icon: History     },{ id: "screenshots" as const, label: "صور سياسة الخصوصية",   icon: Eye         },{ id: "text"        as const, label: "المحتوى النصي",         icon: FileText    },  ];
  const tabIdx = tabs.findIndex(t => t.id === tab);
  const switchTab = (id: typeof tab) => {
    const newIdx = tabs.findIndex(t => t.id === id);
    setTabDir(newIdx > tabIdx ? "left" : "right");
    setPrevTab(tab); setTab(id);
  };
  return (
    <div className="relative flex flex-col min-h-full" style={{ zIndex: 1, animation: "fadeInPage 0.35s ease-out" }}>
      <CinematicBg page="sites" />
      <div className="relative flex-shrink-0 overflow-hidden"
           style={{ background: `linear-gradient(135deg, ${NAVY_BG} 0%, ${NAVY_CARD} 60%, ${NAVY_BG} 100%)`,
          borderBottom: `1px solid ${GOLD}18` }}>
        <div className="relative h-32 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${sc}08, ${GOLD}06, ${TEAL}04)` }}>
          <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-3 opacity-20">
          <Globe size={40} className="text-foreground" />
          <span className="text-2xl font-mono text-foreground font-bold">{site.url}</span>
          </div>
          </div>
          <div className="absolute inset-x-0 top-0 h-0.5 opacity-40"
          style={{ background: `linear-gradient(90deg, transparent, ${sc}80, transparent)`, animation: "hud-scanline 3s linear infinite" }} />
        </div>
        <div className="relative px-5 py-4 z-10">
          <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
          <button onClick={onBack}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-white/10 flex-shrink-0 mt-0.5"
          style={{ border: `1px solid ${GOLD}20`, color: GOLD }}>
          <ChevronRight size={16} />
          </button>
          <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h1 className="text-xl font-black text-white">{site.name}</h1>
          <span className="px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5"
          style={{ background: `${sc}22`, color: sc, border: `1px solid ${sc}35`,
          boxShadow: `0 0 12px ${sc}20`, animation: "sdaia-pulse 3s ease-in-out infinite" }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: sc, boxShadow: `0 0 6px ${sc}` }} />
          {STATUS_CFG[site.status].label}
          </span>
          </div>
          <div className="flex items-center gap-3 flex-wrap text-xs text-slate-400">
          <span className="font-mono">{site.url}</span>
          <span>·</span>
          <span>{site.sector}</span>
          <span>·</span>
          <span>آخر فحص: {site.lastScan}</span>
          </div>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
          <a href="#" className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-lg hover:opacity-80 transition-all"
          style={{ background: `${GOLD}12`, color: GOLD, border: `1px solid ${GOLD}20` }}>
          <Eye size={11} /> سياسة الخصوصية
          </a>
          {["Twitter/X", "LinkedIn", "Instagram"].map(s => (
          <span key={s} className="text-[10px] text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">{s}</span>
          ))}
          </div>
          </div>
          </div>
          <div className="relative flex-shrink-0">
          <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="36" cy="36" r="28" fill="none" stroke={sc} strokeOpacity="0.15" strokeWidth="7" />
          <circle cx="36" cy="36" r="28" fill="none" stroke={sc} strokeWidth="7"
          strokeDasharray={`${(site.score / 100) * 176} 176`} strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${sc}80)` }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black tabular-nums" style={{ color: sc}}>{site.score}</span>
          <span className="text-[9px] text-slate-400">%</span>
          </div>
          </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-0 px-5 flex-shrink-0 overflow-x-auto"
           style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
        {tabs.map(t => {
          const on = tab === t.id;
          return (
          <button key={t.id} onClick={() => switchTab(t.id)}
          className="flex items-center gap-1.5 px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-all duration-200 relative"
          style={{ color: on ? GOLD : "var(--muted-foreground)", borderColor: on ? GOLD : "transparent" }}>
          <t.icon size={13} style={{ color: on ? GOLD : "var(--muted-foreground)" }} />
          {t.label}
          {on && <span className="absolute bottom-0 inset-x-0 h-0.5 rounded-full" style={{ background: GOLD }} />}
          </button>
          );
        })}
      </div>
      <div className="flex-1 overflow-y-auto p-5" key={tab}
           style={{ animation: `fadeInPage 0.28s ease-out` }}>
        {tab === "compliance" && (
          <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden p-5"
          style={{ background: `linear-gradient(135deg, ${sc}10, ${GOLD}06)`, border: `1px solid ${sc}22`, animation: "hero-reveal 0.4s ease-out" }}>
          <InsetFrame accent={sc} />
          <div className="relative flex items-center gap-4">
          <div>
          <p className="text-xs text-muted-foreground mb-1">درجة الامتثال الإجمالية — المادة 12</p>
          <p className="text-4xl font-black tabular-nums" style={{ color: sc }}>{site.score}%</p>
          <p className="text-xs text-muted-foreground mt-1">{8} معيار · {a12.filter(x => x.status === "compliant").length} مستوفية</p>
          </div>
          <div className="flex-1 grid grid-cols-4 gap-1.5 me-4">
          {[
          { l: "مستوفية",      v: a12.filter(x=>x.status==="compliant").length,       c: C_GRN },{ l: "جزئية",        v: a12.filter(x=>x.status==="partial").length,          c: C_AMB },{ l: "غير مستوفية",  v: a12.filter(x=>x.status==="non-compliant").length,    c: C_RED },{ l: "إجمالي",       v: 8,                                                    c: GOLD      },
          ].map(s => (
          <div key={s.l} className="p-2 rounded-xl text-center" style={{ background: `${s.c}10`, border: `1px solid ${s.c}20` }}>
          <div className="text-lg font-black" style={{ color: s.c }}>{s.v}</div>
          <div className="text-[9px] text-muted-foreground">{s.l}</div>
          </div>
          ))}
          </div>
          </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
          {a12.map((c, i) => {
          const cc = c.status === "compliant" ? C_GRN : c.status === "partial" ? C_AMB : C_RED;
          return (
          <div key={c.id} className="relative rounded-2xl overflow-hidden p-4 hover:-translate-y-0.5 transition-all duration-200"
          style={{ background: `linear-gradient(135deg, var(--card), color-mix(in srgb, var(--card) 90%, ${cc}))`,
          border: `1px solid ${cc}20`, boxShadow: "var(--card-shadow)",
          animation: `card-rise 0.35s ease-out ${i * 0.06}s both` }}>
          <InsetFrame accent={cc} radius={12} />
          <div className="relative flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
          style={{ background: `${cc}18`, color: cc, border: `1px solid ${cc}30` }}>{c.id}</div>
          <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1 gap-2">
          <p className="text-xs font-bold text-foreground leading-tight">{c.ar}</p>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold flex-shrink-0"
          style={{ background: `${cc}15`, color: cc }}>{c.pct}%</span>
          </div>
          <p className="text-[10px] text-muted-foreground mb-2">{c.en}</p>
          <div className="w-full h-1.5 rounded-full overflow-hidden mb-1.5 cs-muted">
          <div className="h-full rounded-full transition-all"
          style={{ width: `${c.pct}%`, background: cc, animation: `card-rise 0.8s ease-out ${i * 0.1 + 0.3}s both`, boxShadow: `0 0 6px ${cc}60` }} />
          </div>
          <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cc }} />
          <p className="text-[10px] text-muted-foreground">{c.note}</p>
          </div>
          </div>
          </div>
          </div>
          );
          })}
          </div>
          </div>
        )}
        {tab === "scans" && (
          <div className="space-y-3">
          <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-foreground">سجل الفحوصات الكامل</h3>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
          style={{ background: GOLD, color: NAVY_BG }}>
          <Download size={12} /> تصدير السجل
          </button>
          </div>
          {hist.map((scan, i) => {
          const sc2 = scan.score >= 80 ? C_GRN : scan.score >= 50 ? C_AMB : C_RED;
          const isUp = scan.change > 0;
          return (
          <div key={scan.id} className="relative rounded-2xl overflow-hidden cursor-pointer cs"
          style={{ animation: `card-rise 0.3s ease-out ${i * 0.07}s both` }}
          onClick={() => setScanDetail(scanDetail === i ? null : i)}>
          <InsetFrame radius={14} accent={sc2} />
          <div className="relative p-4">
          <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${sc2}12`, border: `1px solid ${sc2}25` }}>
          <Activity size={16} style={{ color: sc2 }} />
          </div>
          <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs font-mono text-muted-foreground">{scan.id}</span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">{scan.date}</span>
          </div>
          <div className="flex items-center gap-3">
          <span className="text-2xl font-black tabular-nums" style={{ color: sc2 }}>{scan.score}%</span>
          <span className="text-sm font-bold" style={{ color: isUp ? C_GRN : C_RED }}>
          {isUp ? "↑" : "↓"}{Math.abs(scan.change)}%
          </span>
          <span className="text-xs text-muted-foreground">{scan.pages} صفحة · {scan.duration}</span>
          </div>
          </div>
          <div className="w-24 h-1.5 rounded-full overflow-hidden cs-muted">
          <div className="h-full rounded-full" style={{ width: `${scan.score}%`, background: sc2 }} />
          </div>
          <ChevronDown size={14} className="text-muted-foreground transition-transform"
          style={{ transform: scanDetail === i ? "rotate(180deg)" : "rotate(0)" }} />
          </div>
          {scanDetail === i && (
          <div className="mt-4 pt-4 space-y-3" style={{ borderTop: "1px solid var(--border)", animation: "fadeInPage 0.25s ease-out" }}>
          <p className="text-xs font-semibold text-muted-foreground">نتائج المادة 12 لهذا الفحص</p>
          <div className="grid grid-cols-4 gap-2">
          {getArticle12Scores(scan.score).map((c, j) => {
          const cc = c.status === "compliant" ? C_GRN : c.status === "partial" ? C_AMB : C_RED;
          return (
          <div key={j} className="p-2 rounded-lg text-center" style={{ background: `${cc}0A`, border: `1px solid ${cc}18` }}>
          <div className="text-[10px] text-muted-foreground mb-1">م{c.id}</div>
          <div className="text-sm font-black" style={{ color: cc }}>{c.pct}%</div>
          </div>
          );
          })}
          </div>
          </div>
          )}
          </div>
          </div>
          );
          })}
          </div>
        )}
        {tab === "screenshots" && (
          <div className="space-y-3">
          <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground">صور سياسة الخصوصية</h3>
          <span className="text-xs text-muted-foreground">{hist[0].pages} صفحة</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
          {[...Array(Math.min(hist[0].pages,8))].map((_,i)=>(
          <div key={i} className="rounded-xl overflow-hidden cursor-pointer cs" style={{animation:`card-rise 0.25s ease-out ${i*0.04}s both`}}>
          <div className="h-24 flex items-center justify-center cs-muted">
          <div className="text-center opacity-25"><Eye size={18} className="text-foreground mx-auto mb-1"/><p className="text-[10px] font-mono text-foreground">صفحة {i+1}</p></div>
          </div>
          <div className="p-2"><p className="text-[10px] font-semibold text-foreground truncate">صفحة {i+1}</p></div>
          </div>
          ))}
          </div>
          </div>
        )}
        {tab === "text" && (
          <div className="space-y-3">
          <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground">المحتوى النصي المستخرج</h3>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{background:GOLD,color:NAVY_BG}}><Download size={12}/> تصدير</button>
          </div>
          <div className="relative rounded-2xl p-5 cs" style={{boxShadow:"var(--card-shadow)"}}>
          <InsetFrame/>
          <p className="text-xs text-muted-foreground mb-3 font-mono">— محتوى مستخرج من {hist[0].pages} صفحة —</p>
          <div className="space-y-2 text-sm text-foreground leading-relaxed">
          <p>تلتزم {site.name} بحماية خصوصية بياناتك الشخصية وفقاً لأحكام نظام حماية البيانات الشخصية.</p>
          <p>نجمع البيانات الشخصية لتقديم الخدمات المطلوبة وتحسين تجربة المستخدم ورفع كفاءة العمليات.</p>
          </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}
function LoadingScreen({onDone}){
  const[pct,setPct]=useState(0);
  useEffect(()=>{let p=0;const iv=setInterval(()=>{p+=Math.random()*8+3;if(p>=100){clearInterval(iv);setPct(100);setTimeout(onDone,500);}else setPct(p);},200);return()=>clearInterval(iv);},[]);
  return(<div className="fixed inset-0 z-[100] flex flex-col items-center justify-center" style={{background:'radial-gradient(ellipse at 50% 35%,#0B1D38,#04091C)'}}>
      <div className="relative mb-6" style={{animation:'float-bob 3.5s ease-in-out infinite'}}>
        <ImageWithFallback src={characterWaving} alt="راصد" className="relative h-44 w-auto object-contain" style={{filter:'drop-shadow(0 12px 32px rgba(197,165,90,0.3))',animation:'logo-glow 3s ease-in-out infinite'}}/>
      </div>
      <div className="mb-8"><RasidLogo variant="gold" className="h-20 w-auto" animate/></div>
      <div className="w-72">
        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{background:'rgba(255,255,255,0.08)'}}>
          <div style={{width:Math.min(100,pct)+'%',height:'100%',borderRadius:'9999px',background:'linear-gradient(90deg,#C5A55A,#E1C978)',transition:'width 0.3s'}}/>
        </div>
        <p className="text-center text-xs text-slate-400 mt-3">{Math.round(Math.min(100,pct))}%</p>
      </div>
      <p className="absolute bottom-8 text-[10px] tracking-widest uppercase" style={{color:'rgba(197,165,90,0.5)'}}>منصة راصد · NDMO</p>
    </div>);
}

export default function App() {
  const [page, setPage]       = useState<Page>("leadership");
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [drillDown, setDrillDown] = useState<typeof _activeDrillDown>(null);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);
  const openSiteProfile = (site: typeof WEBSITES[0]) => {
    _activeSite = site;
    setPage("site-profile");
  };
  const openDrillDown = (filter: ComplianceStatus | "all", title: string, color: string, textColor: string) => {
    _activeDrillDown = { filter, title, color, textColor };
    setDrillDown({ filter, title, color, textColor });
  };
  (window as any)._rasidOpenSite = openSiteProfile;
  (window as any)._rasidOpenDrill = openDrillDown;
  if (loading) return <LoadingScreen onDone={() => setLoading(false)} />;
  const PageComp = PAGE_COMPONENT[page] || LeadershipPage;
  return (
    <div dir="rtl" className="h-screen w-screen flex overflow-hidden bg-background text-foreground"
         style={{ animation: "fadeInPage 0.4s ease-out" }}>
      <Sidebar page={page} setPage={setPage} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar page={page} darkMode={darkMode} toggleDark={() => setDarkMode(d => !d)} setPage={setPage} />
        <main key={page} className="flex-1 overflow-y-auto relative" style={{ animation: "fadeInPage 0.32s ease-out" }}>
          {page === "site-profile"
          ? <SiteProfilePage onBack={() => setPage("sites")} />
          : <PageComp />
          }
        </main>
      </div>
      <FloatingAssistant setPage={setPage} />
      {drillDown && (
        <DrillDownModal
          open={!!drillDown}
          onClose={() => setDrillDown(null)}
          filter={drillDown.filter}
          title={drillDown.title}
          color={drillDown.color}
          textColor={drillDown.textColor}
          onOpenSite={openSiteProfile}
        />
      )}
    </div>
  );
}
