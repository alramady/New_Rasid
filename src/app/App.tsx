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
  CheckCircle, Scale
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
// الشريط الجانبي (يمين): Rased_4 — يملأ الحاوية مع انيميشن كامل
// عند وصول Rased_5: استبدل هذا السطر فقط:
import rasidLogoGold    from "@/imports/Rased_4__transparent__1_.png";
// HeroBanner (يسار): Rased_3 — الشعار الأصلي الذهبي، ثابت
import rasidLogoHero    from "@/imports/Rased_3__transparent__1_.png";
import rasidLogoWordmark from "@/imports/Rased_2__transparent__1_.png";
import rasidLogoLight   from "@/imports/Rased_6__transparent.png";
import characterWaving  from "@/imports/Character_1_waving_transparent.png";
import characterShmagh  from "@/imports/Character_2_shmagh_transparent.png";
import sdaiaLogoImg    from "@/imports/sdaiaLogo.png";
import characterHands   from "@/imports/Character_3_dark_bg_transparent__1_.png";
import {
  BarChart, Bar, LineChart, Line, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PieChart, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, Tooltip, Legend, CartesianGrid,
} from "recharts";

// ─── Types ───────────────────────────────────────────────────────────────────
type Page =
  "leadership" | "kpi-dashboard" | "real-time" |
  "smart-rasid" | "advanced-scan" | "sites" | "mobile-apps" | "scan-history" | "scan-library" | "scan-schedules" | "cases" |
  "pdf-reports" | "custom-reports" | "scheduled-reports" | "message-templates" | "letters" | "export-data" | "improvement-tracker" |
  "advanced-analytics" | "sector-comparison" | "time-comparison" | "compliance-comparison" | "compliance-heatmap" | "advanced-search" | "change-detection" | "interactive-comparison" |
  "documents-registry" | "verify" | "document-stats" | "admin" | "site-profile";

type ComplianceStatus = "compliant" | "non-compliant" | "partial" | "review" | "inactive";
type BgCat = "command" | "intelligence" | "scan" | "monitor" | "reports" | "analysis" | "verify" | "admin";

// ─── Brand ───────────────────────────────────────────────────────────────────
const GOLD        = "#C5A55A";
const GOLD_PALE   = "#E1C978";
const NAVY_BG     = "#04091C";  // أزرق ملكي داكن جداً — خلفية رئيسية
const NAVY_CARD   = "#07102E";  // أزرق ملكي — سطح الكروت
const NAVY_SIDEBAR= "#040B2E";  // أزرق ملكي — الشريط الجانبي (ثابت في الوضعين)
const TEAL        = "#3DB1AC";

const STATUS_CFG: Record<ComplianceStatus, { label: string; dot: string; text: string; bg: string; border: string }> = {
  compliant:       { label: "ممتثل",         dot: "#1E9E57", text: "text-[#1E9E57]", bg: "bg-[#1E9E57]/10",  border: "border-[#1E9E57]/20" },
  "non-compliant": { label: "غير ممتثل",     dot: "#B94A55", text: "text-[#B94A55]", bg: "bg-[#B94A55]/10",  border: "border-[#B94A55]/20" },
  partial:         { label: "ممتثل جزئياً",  dot: "#C78B2C", text: "text-[#C78B2C]", bg: "bg-[#C78B2C]/10",  border: "border-[#C78B2C]/20" },
  review:          { label: "يحتاج مراجعة",  dot: "#7C6BAE", text: "text-[#7C6BAE]", bg: "bg-[#7C6BAE]/10",  border: "border-[#7C6BAE]/20" },
  inactive:        { label: "لا يعمل",        dot: "#64748B", text: "text-[#64748B]", bg: "bg-[#64748B]/10",  border: "border-[#64748B]/20" },
};

const PAGE_BG: Record<Page, BgCat> = {
  leadership: "command", "kpi-dashboard": "command", "real-time": "command",
  "smart-rasid": "intelligence",
  "advanced-scan": "scan", "scan-history": "scan", "scan-library": "scan", "scan-schedules": "scan",
  sites: "monitor", "mobile-apps": "monitor", cases: "monitor",
  "pdf-reports": "reports", "custom-reports": "reports", "scheduled-reports": "reports",
  "message-templates": "reports", letters: "reports", "export-data": "reports", "improvement-tracker": "reports",
  "advanced-analytics": "analysis", "sector-comparison": "analysis", "time-comparison": "analysis",
  "compliance-comparison": "analysis", "compliance-heatmap": "analysis", "advanced-search": "analysis",
  "change-detection": "analysis", "interactive-comparison": "analysis",
  "documents-registry": "verify", verify: "verify", "document-stats": "verify",
  admin: "admin",
};

// ─── Navigation ───────────────────────────────────────────────────────────────
const NAV_GROUPS = [
  { id: "home",    label: "الرئيسية",             icon: LayoutDashboard, badge: null,
    pages: [
      { id: "leadership"  as Page, label: "لوحة القيادة الرئيسية",     icon: LayoutDashboard },
      { id: "kpi-dashboard" as Page, label: "مؤشرات الأداء KPI",        icon: Target },
      { id: "real-time"   as Page, label: "الإحصائيات المباشرة",        icon: Radio },
    ]},
  { id: "rasid",   label: "راصد الذكي",            icon: Bot,             badge: "8",
    pages: [
      { id: "smart-rasid"    as Page, label: "راصد الذكي",              icon: Bot },
      { id: "advanced-scan"  as Page, label: "الفحص المتقدم",           icon: Activity },
      { id: "sites"          as Page, label: "المواقع",                  icon: Globe },
      { id: "mobile-apps"    as Page, label: "التطبيقات",               icon: Smartphone },
      { id: "scan-history"   as Page, label: "سجل الفحوصات",            icon: History },
      { id: "scan-library"   as Page, label: "مكتبة الفحوصات",          icon: BookOpen },
      { id: "scan-schedules" as Page, label: "الجدولة",                 icon: Calendar },
      { id: "cases"          as Page, label: "إدارة الحالات",           icon: Folder },
    ]},
  { id: "reports", label: "الخطابات والتقارير",    icon: FileText,        badge: null,
    pages: [
      { id: "pdf-reports"          as Page, label: "تقارير PDF",         icon: FileText },
      { id: "custom-reports"       as Page, label: "تقارير مخصصة",      icon: Download },
      { id: "scheduled-reports"    as Page, label: "تقارير مجدولة",     icon: Calendar },
      { id: "message-templates"    as Page, label: "قوالب رسائل",        icon: Mail },
      { id: "letters"              as Page, label: "الخطابات",           icon: Send },
      { id: "export-data"          as Page, label: "مركز التصدير",       icon: Package },
      { id: "improvement-tracker"  as Page, label: "متتبع التحسينات",   icon: TrendingUp },
    ]},
  { id: "analytics", label: "تحليلات راصد",        icon: BarChart3,       badge: "8",
    pages: [
      { id: "advanced-analytics"      as Page, label: "التحليلات المتقدمة",        icon: BarChart3 },
      { id: "sector-comparison"       as Page, label: "مقارنة القطاعات",           icon: ArrowLeftRight },
      { id: "time-comparison"         as Page, label: "المقارنة الزمنية",           icon: Clock },
      { id: "compliance-comparison"   as Page, label: "مقارنة الامتثال",            icon: Scale },
      { id: "compliance-heatmap"      as Page, label: "خريطة الامتثال الحرارية",   icon: Map },
      { id: "advanced-search"         as Page, label: "البحث المتقدم",              icon: SearchIcon },
      { id: "change-detection"        as Page, label: "كشف التغييرات",              icon: AlertTriangle },
      { id: "interactive-comparison"  as Page, label: "المقارنة التفاعلية",         icon: Layers },
    ]},
  { id: "verify",  label: "تحقق راصد",             icon: Shield,          badge: "3",
    pages: [
      { id: "documents-registry" as Page, label: "سجل الوثائق",           icon: Folder },
      { id: "verify"             as Page, label: "التحقق من الوثائق",     icon: CheckCircle2 },
      { id: "document-stats"     as Page, label: "إحصائيات الوثائق",      icon: BarChart3 },
    ]},
];

// ─── Data ─────────────────────────────────────────────────────────────────────
const OVERVIEW_KPIS = [
  { label: "إجمالي المواقع",   value: "24,983", change: "+12%", up: true,  icon: Globe,    color: GOLD    },
  { label: "إجمالي الفحوصات", value: "9,945",  change: "+8%",  up: true,  icon: Activity, color: TEAL    },
  { label: "مواقع لا تعمل",   value: "10,839", change: "+2%",  up: false, icon: WifiOff,  color: "#B94A55" },
  { label: "إجمالي المنتجات", value: "9,945",  change: "+5%",  up: true,  icon: Database, color: "#1E9E57" },
];
const COMPLIANCE_KPIS = [
  { label: "ممتثل",        value: "911",   pct: 9,  color: "#1E9E57", textColor: "#3DBF7A" },
  { label: "غير ممتثل",   value: "7,994", pct: 80, color: "#B94A55", textColor: "#D9728A" },
  { label: "ممتثل جزئياً",value: "1,040", pct: 11, color: "#C78B2C", textColor: "#DFA947" },
];
const TREND_DATA = [
  { month: "يناير",  ممتثل: 820, جزئياً: 980  },
  { month: "فبراير", ممتثل: 845, جزئياً: 1005 },
  { month: "مارس",   ممتثل: 862, جزئياً: 1015 },
  { month: "أبريل",  ممتثل: 878, جزئياً: 1025 },
  { month: "مايو",   ممتثل: 895, جزئياً: 1033 },
  { month: "يونيو",  ممتثل: 911, جزئياً: 1040 },
];
const PIE_DATA = [
  { name: "ممتثل",         value: 911,  color: "#1E9E57" },
  { name: "غير ممتثل",    value: 7994, color: "#B94A55" },
  { name: "جزئياً",        value: 1040, color: "#C78B2C" },
  { name: "يحتاج مراجعة", value: 520,  color: "#7C6BAE" },
  { name: "لا يعمل",       value: 518,  color: "#64748B" },
];
const WEBSITES: { name: string; url: string; status: ComplianceStatus; score: number; lastScan: string; sector: string }[] = [
  { name: "وزارة التجارة",            url: "commerce.gov.sa", status: "compliant",     score: 94, lastScan: "منذ ساعتين",   sector: "حكومي"   },
  { name: "البنك الأهلي السعودي",     url: "alahli.com",      status: "partial",       score: 67, lastScan: "منذ 4 ساعات", sector: "بنكي"    },
  { name: "أمازون السعودية",          url: "amazon.sa",       status: "non-compliant", score: 32, lastScan: "منذ يوم",     sector: "تجاري"   },
  { name: "وزارة الصحة",             url: "moh.gov.sa",      status: "compliant",     score: 91, lastScan: "منذ ساعة",    sector: "حكومي"   },
  { name: "شركة stc",                 url: "stc.com.sa",      status: "review",        score: 58, lastScan: "منذ 3 ساعات", sector: "اتصالات" },
  { name: "هيئة الاتصالات والفضاء",  url: "cst.gov.sa",      status: "compliant",     score: 88, lastScan: "منذ 5 ساعات", sector: "حكومي"   },
  { name: "مدى للمدفوعات",           url: "mada.com.sa",     status: "partial",       score: 72, lastScan: "منذ 6 ساعات", sector: "مالي"    },
  { name: "نون للتجارة الإلكترونية", url: "noon.com/ar-sa",  status: "non-compliant", score: 41, lastScan: "منذ يومين",   sector: "تجاري"   },
  { name: "ثمانية للإعلام",          url: "thmanyah.com",    status: "review",        score: 61, lastScan: "منذ يوم",     sector: "إعلامي"  },
  { name: "جامعة الملك عبدالله",     url: "kaust.edu.sa",    status: "inactive",      score: 0,  lastScan: "منذ أسبوع",   sector: "تعليمي"  },
  { name: "سلة للتجارة",             url: "salla.sa",        status: "partial",       score: 74, lastScan: "منذ 8 ساعات", sector: "تجاري"   },
  { name: "وزارة المالية",           url: "mof.gov.sa",      status: "compliant",     score: 96, lastScan: "منذ 3 ساعات", sector: "حكومي"   },
];
const SECTOR_DATA = [
  { sector: "حكومي",    ممتثل: 287, جزئياً: 89,  "غير ممتثل": 43   },
  { sector: "بنكي",     ممتثل: 156, جزئياً: 178, "غير ممتثل": 234  },
  { sector: "تجاري",   ممتثل: 89,  جزئياً: 345, "غير ممتثل": 1456 },
  { sector: "صحي",     ممتثل: 134, جزئياً: 234, "غير ممتثل": 567  },
  { sector: "اتصالات", ممتثل: 67,  جزئياً: 145, "غير ممتثل": 234  },
  { sector: "تعليمي",  ممتثل: 178, جزئياً: 89,  "غير ممتثل": 456  },
];
const RADAR_DATA = [
  { subject: "جمع البيانات", A: 72 }, { subject: "حق الوصول", A: 45 },
  { subject: "الموافقة", A: 38 },    { subject: "الإفصاح",   A: 61 },
  { subject: "الحذف", A: 29 },       { subject: "النقل",     A: 53 },
];
const CHAT_MESSAGES = [
  { role: "assistant", text: "مرحباً! أنا راصد الذكي v6.0، مساعدك لتحليل سياسات الخصوصية والامتثال. كيف يمكنني مساعدتك اليوم؟", time: "10:30" },
  { role: "user",      text: "أريد تقريراً عن حالة الامتثال في القطاع البنكي", time: "10:31" },
  { role: "assistant", text: "بناءً على تحليلي لـ 568 موقعاً في القطاع البنكي:\n\n• 156 موقع ممتثل (27.5%)\n• 234 موقع غير ممتثل (41.2%)\n• 178 موقع ممتثل جزئياً (31.3%)\n\nأبرز المخالفات: غياب آلية الموافقة الصريحة وعدم وضوح سياسة الاحتفاظ بالبيانات. هل تريد تقرير مفصل؟", time: "10:31" },
];
const SUGGESTED_PROMPTS = [
  { text: "حلل سياسة الخصوصية لموقع moh.gov.sa",      icon: Eye        },
  { text: "المواقع الأكثر مخالفةً في القطاع البنكي",  icon: AlertCircle },
  { text: "أنشئ تقرير امتثال شهري PDF",               icon: FileText   },
  { text: "قارن سياسات المواقع الحكومية الكبرى",      icon: BarChart3  },
];
const MOBILE_APPS = [
  { name: "صحتي",         org: "وزارة الصحة",             status: "compliant"     as ComplianceStatus, score: 91 },
  { name: "أبشر أفراد",  org: "وزارة الداخلية",           status: "partial"       as ComplianceStatus, score: 74 },
  { name: "توكلنا",       org: "مركز الأمن الوطني",        status: "compliant"     as ComplianceStatus, score: 88 },
  { name: "موعد",         org: "وزارة الصحة",             status: "compliant"     as ComplianceStatus, score: 85 },
  { name: "نفاذ",         org: "هيئة الاتصالات",           status: "partial"       as ComplianceStatus, score: 62 },
  { name: "ناجز",         org: "وزارة العدل",              status: "compliant"     as ComplianceStatus, score: 79 },
  { name: "وثّق",         org: "وزارة العدل",              status: "non-compliant" as ComplianceStatus, score: 38 },
  { name: "الراجحي موبايل",org:"بنك الراجحي",             status: "partial"       as ComplianceStatus, score: 68 },
  { name: "stc Pay",      org: "شركة stc",                 status: "non-compliant" as ComplianceStatus, score: 42 },
  { name: "بلدي",         org: "وزارة الشؤون البلدية",     status: "partial"       as ComplianceStatus, score: 71 },
  { name: "اعتماد",       org: "وزارة الموارد البشرية",   status: "compliant"     as ComplianceStatus, score: 83 },
  { name: "نجيز",         org: "وزارة العدل",              status: "review"        as ComplianceStatus, score: 55 },
];
const SCAN_HISTORY = [
  { title: "فحص دفعي — الجهات الحكومية 1", date: "7 محرم 1448", sites: 45, duration: "12 دقيقة", status: "compliant" as ComplianceStatus },
  { title: "فحص دفعي — القطاع الصحي",      date: "6 محرم 1448", sites: 34, duration: "9 دقائق",  status: "partial"   as ComplianceStatus },
  { title: "فحص يومي — المواقع النشطة",    date: "5 محرم 1448", sites: 89, duration: "22 دقيقة", status: "compliant" as ComplianceStatus },
  { title: "فحص دفعي — الجهات الحكومية 2", date: "4 محرم 1448", sites: 31, duration: "8 دقائق",  status: "review"    as ComplianceStatus },
];
const CASES = [
  { title: "عدم وجود سياسة خصوصية في بوابة أبشر",       priority: "high",   status: "review"      as ComplianceStatus, date: "3 محرم 1448", assigned: "سارة الزهراني" },
  { title: "غياب آلية موافقة صريحة في موقع السدير",     priority: "medium", status: "partial"     as ComplianceStatus, date: "5 محرم 1448", assigned: "فهد الشمري"  },
  { title: "عدم الإفصاح عن أطراف ثالثة في موقع نون",   priority: "high",   status: "review"      as ComplianceStatus, date: "1 محرم 1448", assigned: "محمد العتيبي" },
  { title: "سياسة خصوصية منتهية الصلاحية — جامعة KAU", priority: "low",    status: "compliant"   as ComplianceStatus, date: "29 ذي الحجة 1447", assigned: "نورة القحطاني" },
];
const SCHEDULED_REPORTS = [
  { title: "الملخص التنفيذي الأسبوعي",      freq: "أسبوعي",   active: true,  next: "14 محرم 1448" },
  { title: "التقرير الشهري المفصّل",         freq: "شهري",     active: true,  next: "1 صفر 1448"  },
  { title: "تحليل القطاعات الربع سنوي",     freq: "ربع سنوي", active: false, next: "1 ربيع أول 1448" },
  { title: "تنبيه الامتثال الأسبوعي",       freq: "أسبوعي",   active: true,  next: "14 محرم 1448" },
  { title: "تقرير القطاع الصحي الشهري",    freq: "شهري",     active: true,  next: "1 صفر 1448"  },
  { title: "تقرير القطاع البنكي الربعي",    freq: "ربع سنوي", active: false, next: "1 ربيع أول 1448" },
];
const ADMIN_SECTIONS = [
  { id: "theme",         label: "إدارة المظهر",       icon: Palette   },
  { id: "brand",         label: "الهوية البصرية",     icon: Star      },
  { id: "logo",          label: "إعدادات الشعار",     icon: ImageIcon },
  { id: "typography",    label: "الخطوط والطباعة",    icon: Type      },
  { id: "navigation",    label: "التنقل والقائمة",    icon: Navigation},
  { id: "api",           label: "مفاتيح API",          icon: Key       },
  { id: "notifications", label: "الإشعارات",           icon: Bell      },
  { id: "users",         label: "إدارة المستخدمين",  icon: Users     },
];
const PAGE_TITLE: Record<Page, string> = {
  leadership: "لوحة القيادة الرئيسية", "kpi-dashboard": "مؤشرات الأداء KPI", "real-time": "الإحصائيات المباشرة",
  "smart-rasid": "راصد الذكي", "advanced-scan": "الفحص المتقدم", sites: "المواقع", "mobile-apps": "التطبيقات",
  "scan-history": "سجل الفحوصات", "scan-library": "مكتبة الفحوصات", "scan-schedules": "الجدولة", cases: "إدارة الحالات",
  "pdf-reports": "تقارير PDF", "custom-reports": "تقارير مخصصة", "scheduled-reports": "تقارير مجدولة",
  "message-templates": "قوالب رسائل", letters: "الخطابات الرسمية", "export-data": "مركز التصدير", "improvement-tracker": "متتبع التحسينات",
  "advanced-analytics": "التحليلات المتقدمة", "sector-comparison": "مقارنة القطاعات", "time-comparison": "المقارنة الزمنية",
  "compliance-comparison": "مقارنة الامتثال", "compliance-heatmap": "خريطة الامتثال الحرارية",
  "advanced-search": "البحث المتقدم", "change-detection": "كشف التغييرات", "interactive-comparison": "المقارنة التفاعلية",
  "documents-registry": "سجل الوثائق", verify: "التحقق من الوثائق", "document-stats": "إحصائيات الوثائق",
  admin: "لوحة التحكم الإداري", "site-profile": "ملف الموقع",
};

// ─── Article 12 — بنود المادة 12 من نظام حماية البيانات الشخصية ─────────────
const ARTICLE12 = [
  { id: 1, ar: "جمع البيانات وأغراضها",                en: "Data Collection & Purposes"            },
  { id: 2, ar: "معالجة البيانات الشخصية",               en: "Personal Data Processing"               },
  { id: 3, ar: "تخزين البيانات وفترة الاحتفاظ",        en: "Storage & Retention Period"             },
  { id: 4, ar: "الإفصاح ومشاركة البيانات مع الأطراف", en: "Disclosure & Third-Party Sharing"        },
  { id: 5, ar: "حقوق أصحاب البيانات الشخصية",          en: "Data Subject Rights"                    },
  { id: 6, ar: "آلية تقديم الطلبات والشكاوى",          en: "Requests & Complaints Mechanism"        },
  { id: 7, ar: "تحديثات وإخطارات سياسة الخصوصية",     en: "Privacy Policy Updates & Notifications" },
  { id: 8, ar: "معلومات التواصل مع المسؤول",            en: "Controller Contact Information"         },
];

// Module-level active site (set before navigating to site-profile)
let _activeSite: typeof WEBSITES[0] = WEBSITES[0];
let _activeDrillDown: { filter: ComplianceStatus | "all"; title: string; color: string; textColor: string } | null = null;

function getArticle12Scores(score: number) {
  return ARTICLE12.map((c, i) => {
    const variation = Math.sin(i * 1.9 + score * 0.07) * 18;
    const pct = Math.max(0, Math.min(100, Math.round(score + variation)));
    const status: "compliant"|"partial"|"non-compliant" = pct >= 70 ? "compliant" : pct >= 40 ? "partial" : "non-compliant";
    const notes: Record<string, string[]> = {
      compliant: ["محدد بوضوح ومفصّل","مستوفى بالكامل","معلومات كافية ووافية","متوافق تماماً مع المتطلبات"],
      partial:   ["يحتاج توضيحاً إضافياً","غير مكتمل جزئياً","يفتقر إلى بعض التفاصيل","يحتاج إلى تحسين"],
      "non-compliant": ["مفقود بالكامل","لا يوجد ذكر له","غائب كلياً","بحاجة عاجلة للإضافة"],
    };
    return { ...c, pct, status, note: notes[status][i % 4] };
  });
}

function getScanHistory(score: number) {
  const base = score;
  return [
    { date: "7 محرم 1448",       score: base,         change: +3,  pages: 12, duration: "4 دقائق", id: "SCN-2026-1441" },
    { date: "1 محرم 1448",       score: base - 3,     change: +5,  pages: 11, duration: "5 دقائق", id: "SCN-2026-1412" },
    { date: "24 ذي الحجة 1447", score: base - 8,     change: -2,  pages: 13, duration: "4 دقائق", id: "SCN-2026-1398" },
    { date: "15 ذي الحجة 1447", score: base - 6,     change: +8,  pages: 10, duration: "6 دقائق", id: "SCN-2026-1372" },
    { date: "1 ذي الحجة 1447",  score: base - 14,    change: -4,  pages: 9,  duration: "3 دقائق", id: "SCN-2026-1348" },
  ];
}

// ─── Animations ───────────────────────────────────────────────────────────────
function CountUp({ target, duration = 1100 }: { target: string; duration?: number }) {
  const numStr = target.replace(/[^0-9]/g, "");
  const num = parseInt(numStr, 10);
  const suffix = target.replace(/[0-9,،.]/g, "");
  const [display, setDisplay] = useState("0" + suffix);
  useEffect(() => {
    if (isNaN(num)) { setDisplay(target); return; }
    let cur = 0;
    const step = Math.max(1, Math.ceil(num / (duration / 16)));
    const id = setInterval(() => {
      cur = Math.min(cur + step, num);
      setDisplay(cur.toLocaleString() + suffix);
      if (cur >= num) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [target]);
  return <span style={{ animation: "count-pop 0.35s ease-out both" }}>{display}</span>;
}

// Circular progress indicator — signature visual for scan operations
function CircularProgress({ pct, size = 160 }: { pct: number; size?: number }) {
  const strokeW = 9;
  const r = (size - strokeW * 2) / 2;
  const circ = 2 * Math.PI * r;
  const dash = Math.min(pct / 100, 1) * circ;
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
           style={{ transform: "rotate(-90deg)" }}>
        <defs>
          <linearGradient id="circ-grad" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={GOLD} />
            <stop offset="100%" stopColor="#3DBF7A" />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle cx={size/2} cy={size/2} r={r} fill="none"
                stroke="var(--border)" strokeWidth={strokeW} />
        {/* Decorative inner ring */}
        <circle cx={size/2} cy={size/2} r={r - 16} fill="none"
                stroke={`${GOLD}08`} strokeWidth={1} strokeDasharray="3 4" />
        {/* Progress arc — gold→emerald gradient with glow */}
        <circle cx={size/2} cy={size/2} r={r} fill="none"
                stroke="url(#circ-grad)" strokeWidth={strokeW}
                strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
                style={{ transition: "stroke-dasharray 0.5s ease",
                         filter: `drop-shadow(0 0 8px ${GOLD}70)` }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-black leading-none tabular-nums"
              style={{ fontFamily: "'Tajawal', sans-serif", color: GOLD,
                       fontSize: size > 140 ? "2.5rem" : "1.75rem" }}>
          {Math.round(pct)}
        </span>
        <span className="text-sm font-bold" style={{ color: GOLD, fontFamily: "'Tajawal', sans-serif" }}>%</span>
        <span className="text-[10px] text-muted-foreground mt-1" style={{ fontFamily: "'Tajawal', sans-serif" }}>اكتمل</span>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// SIGNATURE VISUAL LANGUAGE — "Rasid Command Intelligence Layer"
// HUD corner brackets + coordinate metadata = intelligence command center,
// not a SaaS dashboard. This device repeats across every key surface.
// ════════════════════════════════════════════════════════════════════════════

// Luxury double-line border — outer hairline + faint inner gold inset stroke.
// The premium framing language from the reference login screens. Restrained.
function InsetFrame({ radius = 14, accent = GOLD }: { radius?: number; accent?: string }) {
  return (
    <div className="absolute pointer-events-none z-10"
         style={{ inset: 4, borderRadius: radius, border: `1px solid ${accent}14`,
                  boxShadow: `inset 0 0 0 0.5px rgba(255,255,255,0.03)` }} />
  );
}

// HUD corner brackets — the signature frame that brands every command surface
function CommandFrame({ color = GOLD, size = 14, opacity = 0.55, inset = 0 }: {
  color?: string; size?: number; opacity?: number; inset?: number;
}) {
  const corners = [
    { pos: { top: inset, left: inset },     d: `M0 ${size} L0 0 L${size} 0` },
    { pos: { top: inset, right: inset },    d: `M0 0 L${size} 0 L${size} ${size}` },
    { pos: { bottom: inset, left: inset },  d: `M0 0 L0 ${size} L${size} ${size}` },
    { pos: { bottom: inset, right: inset }, d: `M${size} 0 L${size} ${size} L0 ${size}` },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none z-20" style={{ opacity }}>
      {corners.map((c, i) => (
        <svg key={i} width={size} height={size} viewBox={`0 0 ${size} ${size}`}
             style={{ position: "absolute", ...c.pos, animation: `bracket-in 0.4s ease-out ${0.1 + i * 0.05}s both` }}>
          <path d={c.d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ))}
    </div>
  );
}

// HUD metadata label — monospace system-coordinate text
function HudLabel({ children, color = GOLD, className = "" }: {
  children: React.ReactNode; color?: string; className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[9px] font-mono tracking-[0.18em] uppercase ${className}`}
          style={{ color }}>
      {children}
    </span>
  );
}

// Glass command panel — layered surface with HUD frame, sits over cinematic bg
function GlassPanel({ children, className = "", accent = GOLD, frame = true, scanline = false, style: xs = {} }: {
  children: React.ReactNode; className?: string; accent?: string; frame?: boolean; scanline?: boolean; style?: React.CSSProperties;
}) {
  return (
    <div className={`relative rounded-2xl overflow-hidden ${className}`}
         style={{
           background: "color-mix(in srgb, var(--card) 88%, transparent)",
           backdropFilter: "blur(12px)",
           WebkitBackdropFilter: "blur(12px)",
           border: "1px solid var(--border)",
           boxShadow: `0 16px 48px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.04)`,
           ...xs,
         }}>
      {/* Top gold hairline */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] z-10"
           style={{ background: `linear-gradient(90deg, transparent, ${accent} 30%, ${accent} 70%, transparent)` }} />
      {scanline && (
        <div className="absolute inset-x-0 top-0 h-12 pointer-events-none z-10"
             style={{ background: `linear-gradient(180deg, ${accent}10, transparent)`, animation: "hud-scanline 6s linear infinite" }} />
      )}
      {frame && <CommandFrame color={accent} size={13} opacity={0.4} inset={7} />}
      <InsetFrame radius={14} accent={accent} />
      {children}
    </div>
  );
}

// ─── Shared UI ────────────────────────────────────────────────────────────────
// شعار راصد — نسختان:
// animate=true  → الشريط الجانبي (يمين): Rased_4 + CSS filter ذهبي + 5 طبقات أنيميشن
// animate=false → HeroBanner (يسار):    Rased_3 + screen blend الأصلي، ثابت بدون أنيميشن
const LOGO_GOLD_FILTER = "brightness(0) invert(1) sepia(0.80) saturate(2.8) hue-rotate(12deg)";

function RasidLogo({ variant = "gold", className = "", animate = false, style: xs = {} }: {
  variant?: "gold" | "wordmark" | "light"; className?: string; animate?: boolean; style?: React.CSSProperties;
}) {
  // الشريط الجانبي: Rased_4 محوّل للذهبي | HeroBanner: Rased_3 الأصلي
  const src = animate
    ? (variant === "wordmark" ? rasidLogoWordmark : rasidLogoGold)      // Rased_4
    : (variant === "wordmark" ? rasidLogoWordmark : variant === "light" ? rasidLogoLight : rasidLogoHero); // Rased_3

  // ══ HeroBanner (يسار) — الشعار الأصلي الذهبي، ثابت، بدون أنيميشن ══════════
  if (!animate) {
    return (
      <ImageWithFallback
        src={src} alt="منصة راصد"
        className={`object-contain select-none block ${className}`}
        style={{ mixBlendMode: "screen" as const }}
      />
    );
  }

  // ══ الشريط الجانبي (يمين) — أنيميشن 2D صافٍ يعمل داخل overflow-hidden ══════
  return (
    <div className="relative" style={{ ...xs }}>

      {/* هالة ذهبية تنبض — opacity فقط، لا إطار، لا حدود */}
      <div className="absolute inset-0 pointer-events-none"
           style={{
             background: `radial-gradient(ellipse 90% 70%, ${GOLD}30 0%, transparent 65%)`,
             animation: "logo-glow-pulse 2.8s ease-in-out infinite",
             zIndex: 0,
           }} />

      {/* الشعار المتحرك — scale + translateY + rotate كلها 2D تعمل بضمان */}
      <div className="relative"
           style={{ animation: "logo-breathe-gold 2.8s ease-in-out infinite", zIndex: 1 }}>

        {/* ومضة ذهبية تجتاح كل 2 ثانية */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
          <div style={{
            position: "absolute", top: 0, bottom: 0, width: "55%",
            background: `linear-gradient(90deg, transparent 0%, ${GOLD}60 42%, rgba(255,248,210,0.25) 50%, transparent 100%)`,
            animation: "logo-shimmer-burst 2s ease-in-out 0.6s infinite",
          }} />
        </div>

        {/* الشعار — فلتر ذهبي ثابت، className يتحكم بالحجم */}
        <ImageWithFallback
          src={src} alt="منصة راصد"
          className={`select-none block ${className}`}
          style={{ filter: LOGO_GOLD_FILTER, position: "relative", zIndex: 1 }}
        />
      </div>
    </div>
  );
}

// ─── SDAIA / سدايا — هوية المنظمة الأم (هيئة البيانات والذكاء الاصطناعي) ─────
// الهوية الرسمية لسدايا — الشعار المعتمد كما هو، لا يُعدَّل
function SdaiaLogo({ variant = "full" }: { variant?: "full" | "compact" }) {
  const h = variant === "compact" ? "h-5" : "h-7";
  return (
    <div style={{ animation: "sdaia-pulse 4s ease-in-out infinite" }}>
      <ImageWithFallback
        src={sdaiaLogoImg}
        alt="SDAIA — الهيئة السعودية للبيانات والذكاء الاصطناعي"
        className={`object-contain select-none block ${h}`}
        style={{ filter: "brightness(0) invert(1)", opacity: 0.80 }}
      />
    </div>
  );
}

function ComplianceBadge({ status, clickable = false }: { status: ComplianceStatus; clickable?: boolean }) {
  const c = STATUS_CFG[status];
  const handleClick = clickable ? (e: React.MouseEvent) => {
    e.stopPropagation();
    (window as any)._rasidOpenDrill?.(status, `المواقع — ${c.label}`, c.dot, c.dot);
  } : undefined;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${c.text} ${c.bg} ${c.border} ${clickable ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`}
          style={{ fontFamily: "'Tajawal', sans-serif" }}
          onClick={handleClick}>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.dot }} />
      {c.label}
    </span>
  );
}

// ─── Executive Card System ────────────────────────────────────────────────────
function PCard({ children, className = "", goldTop = false, glowColor = "", style: xs = {} }: {
  children: React.ReactNode; className?: string; goldTop?: boolean; glowColor?: string; style?: React.CSSProperties;
}) {
  return (
    <div className={`relative rounded-2xl overflow-hidden ${className}`}
         style={{
           background: "var(--card)",
           border: "1px solid var(--border)",
           boxShadow: glowColor
             ? `var(--card-shadow), 0 0 70px ${glowColor}0A`
             : "var(--card-shadow)",
           ...xs,
         }}>
      {goldTop && (
        <>
          {/* Premium gold shimmer line */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] z-10"
               style={{ background: `linear-gradient(90deg, transparent 0%, ${GOLD} 25%, ${GOLD_PALE} 50%, ${GOLD} 75%, transparent 100%)` }} />
          {/* Warm gold surface wash */}
          <div className="absolute top-0 inset-x-0 h-28 z-0 pointer-events-none"
               style={{ background: `linear-gradient(180deg, ${GOLD}06 0%, transparent 100%)` }} />
        </>
      )}
      {/* Luxury double-line inset border */}
      <InsetFrame radius={14} />
      {children}
    </div>
  );
}

// Executive KPI Insight Module — one intentional module, icon integrated, no clutter
function KPICard({ label, value, change, up, icon: Icon, color }: typeof OVERVIEW_KPIS[0]) {
  return (
    <div className="relative rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-300 cursor-default"
         style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}>
      {/* Luxury double-line inset border */}
      <InsetFrame radius={14} accent={color} />
      {/* Top: label + integrated icon chip on one rail */}
      <div className="relative z-10 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            {/* Icon — integrated tinted chip, soft, no harsh border */}
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                 style={{ background: `${color}16` }}>
              <Icon size={17} style={{ color }} />
            </div>
            <span className="text-[13px] text-muted-foreground font-medium" style={{ fontFamily: "'Tajawal', sans-serif" }}>{label}</span>
          </div>
          {/* Change badge — minimal, no border */}
          <div className={`flex items-center gap-0.5 text-[11px] font-bold ${up ? "text-[#3DBF7A]" : "text-[#D9728A]"}`}>
            {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {change}
          </div>
        </div>
        {/* The number — powerful but measured */}
        <div className="text-[30px] font-black text-foreground tabular-nums tracking-tight leading-none"
             style={{ fontFamily: "'Tajawal', sans-serif", animation: "count-pop 0.4s ease-out 0.1s both" }}>
          <CountUp target={value} />
        </div>
        {/* Sparkline-style baseline accent */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
            <div className="h-full rounded-full" style={{ width: up ? "72%" : "40%", background: color, animation: "card-rise 0.8s ease-out 0.3s both" }} />
          </div>
          <span className="text-[10px] text-muted-foreground font-mono">{up ? "72%" : "40%"}</span>
        </div>
      </div>
      {/* Bottom accent rail — appears on hover, brand-colored */}
      <div className="absolute bottom-0 inset-x-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
           style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
    </div>
  );
}

// SmallKPI — compact command stat
function SmallKPI({ label, value, icon: Icon, color, delay = 0 }: {
  label: string; value: string; icon: React.ElementType; color: string; delay?: number;
}) {
  return (
    <div className="relative rounded-2xl overflow-hidden"
         style={{ background: "var(--card)", border: "1px solid var(--border)",
                  boxShadow: "var(--card-shadow)", animation: `card-rise 0.4s ease-out ${delay}s both` }}>
      <InsetFrame radius={14} accent={color} />
      <div className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
             style={{ background: `${color}16` }}>
          <Icon size={17} style={{ color }} />
        </div>
        <div>
          <div className="text-[22px] font-black tabular-nums leading-none"
               style={{ fontFamily: "'Tajawal', sans-serif", color, animation: "count-pop 0.4s ease-out 0.15s both" }}>
            <CountUp target={value} />
          </div>
          <div className="text-xs text-muted-foreground mt-1 font-medium" style={{ fontFamily: "'Tajawal', sans-serif" }}>{label}</div>
        </div>
      </div>
      {/* subtle bottom rail */}
      <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}40, transparent)` }} />
    </div>
  );
}

function ComplianceCard({ label, value, pct, color, textColor }: typeof COMPLIANCE_KPIS[0]) {
  const r = 24; const circ = 2 * Math.PI * r; const dash = (pct / 100) * circ;
  return (
    <PCard goldTop className="p-5 hover:translate-y-[-2px] transition-all duration-200 cursor-default">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div style={{ fontFamily: "'Tajawal', sans-serif", color: textColor, animation: "count-pop 0.4s ease-out 0.15s both" }}
               className="text-4xl font-extrabold mb-1 tabular-nums">
            <CountUp target={value} />
          </div>
          <div style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm text-muted-foreground">{label}</div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-xs text-muted-foreground">{pct}% من الإجمالي</span>
          </div>
        </div>
        <div className="relative w-16 h-16 flex-shrink-0">
          <svg width="64" height="64" viewBox="0 0 64 64" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="32" cy="32" r={r} fill="none" stroke={color} strokeOpacity="0.15" strokeWidth="6" />
            <circle cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="6"
                    strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span style={{ color: textColor, fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-bold">{pct}%</span>
          </div>
        </div>
      </div>
    </PCard>
  );
}

// ─── Cinematic Page Banner — unique atmosphere per category ──────────────────
const BANNER_THEMES: Record<BgCat, { from: string; via: string; accent: string; gridColor: string }> = {
  command:      { from: "#04091C", via: "#07102E", accent: GOLD,      gridColor: GOLD    },
  intelligence: { from: "#070A1E", via: "#07102E", accent: "#7C6BAE", gridColor: TEAL   },
  scan:         { from: "#030E0D", via: "#071A18", accent: "#1E9E57", gridColor: TEAL   },
  monitor:      { from: "#04091C", via: "#091728", accent: TEAL,      gridColor: TEAL   },
  reports:      { from: "#090812", via: "#0F0D1E", accent: "#7C6BAE", gridColor: GOLD   },
  analysis:     { from: "#060A1C", via: "#0A1030", accent: "#5B8EF0", gridColor: "#5B8EF0" },
  verify:       { from: "#050F12", via: "#071820", accent: TEAL,      gridColor: TEAL   },
  admin:        { from: "#070914", via: "#0D0F24", accent: GOLD,      gridColor: GOLD   },
};

function HeroBanner({ title, subtitle, badge, actions, page }: {
  title: string; subtitle?: string; badge?: string; actions?: React.ReactNode; page?: Page;
}) {
  const cat: BgCat = page ? (PAGE_BG[page] || "command") : "command";
  const theme = BANNER_THEMES[cat];

  // بنر موحّد بإطار ذهبي فاخر — نفس تهذيب الصورة المرجعية على كامل الصفحات
  const bannerBg = `linear-gradient(135deg, ${NAVY_BG} 0%, ${NAVY_CARD} 60%, ${NAVY_BG} 100%)`;
  return (
    <div className="relative overflow-hidden rounded-2xl mb-3 flex-shrink-0"
         style={{
           background: bannerBg,
           animation: "hero-reveal 0.45s ease-out both",
           // الإطار الذهبي الكامل — كل الجوانب الأربعة كما في الصورة المرجعية
           border: `1.5px solid rgba(197,165,90,0.42)`,
           boxShadow: `0 0 0 1px rgba(197,165,90,0.06),  /* طبقة خارجية ناعمة */
                       0 12px 40px rgba(4,9,28,0.55),    /* ظل سينمائي */
                       inset 0 0 0 1px rgba(197,165,90,0.04)`, /* خط داخلي خفي */
         }}>
      {/* الخط الذهبي المزدوج — InsetFrame يضيف السطر الداخلي */}
      <InsetFrame radius={15} accent={GOLD} />
      {/* Atmospheric glow — always gold-tinted, consistent across pages */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: "absolute", top: "-30%", right: "15%", width: "400px", height: "400px",
                      background: `radial-gradient(ellipse, ${GOLD}12, transparent 65%)`, animation: "shimmer-pulse 5s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "-20%", left: "25%", width: "300px", height: "300px",
                      background: `radial-gradient(ellipse, ${GOLD}06, transparent 70%)`, animation: "shimmer-pulse 7s ease-in-out 1.5s infinite" }} />
        {/* Micro grid */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.025 }}>
          <defs><pattern id="hg" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke={GOLD} strokeWidth="0.5"/>
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#hg)" />
        </svg>
        {/* Gold shimmer at top — يعزز الإطار الذهبي في الأعلى */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1.5px",
                      background: `linear-gradient(90deg, transparent, ${GOLD}80, ${GOLD_PALE}, ${GOLD}80, transparent)` }} />
        {/* HUD scanline sweep */}
        <div className="absolute inset-x-0 top-0 h-16 pointer-events-none"
             style={{ background: `linear-gradient(180deg, ${GOLD}0A, transparent)`, animation: "hud-scanline 8s linear infinite" }} />
      </div>

      {/* Top HUD coordinate strip — gold unified across all pages */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-3">
        <HudLabel color={`${GOLD}85`}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD, animation: "status-blink 1.5s ease-in-out infinite" }} />
          {cat === "command" ? "COMMAND CENTER" : cat === "intelligence" ? "AI INTELLIGENCE" : cat === "scan" ? "SCAN CONSOLE" : cat === "analysis" ? "DATA ANALYTICS" : cat === "reports" ? "REPORTING CENTER" : cat === "verify" ? "VERIFICATION SYSTEM" : "CONTROL CENTER"}
        </HudLabel>
        <HudLabel color="rgba(255,255,255,0.32)">NDMO · RASID v6.0</HudLabel>
      </div>

      <div className="relative z-10 flex items-center justify-between gap-4 px-6 pb-5 pt-2">
        <div className="flex-1 min-w-0">
          <h1 className="text-[26px] font-black text-white leading-tight" style={{ fontFamily: "'Tajawal', sans-serif" }}>{title}</h1>
          {subtitle && (
            <p className="text-sm mt-1.5 leading-relaxed" style={{ fontFamily: "'Tajawal', sans-serif", color: "rgba(255,255,255,0.48)" }}>{subtitle}</p>
          )}
          {badge && (
            <span className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1.5 rounded-full text-[11px] font-bold"
                  style={{ background: `${GOLD}18`, color: GOLD, border: `1px solid ${GOLD}30` }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD }} />
              {badge}
            </span>
          )}
          {actions && <div className="flex items-center gap-2 mt-4">{actions}</div>}
        </div>
        {/* Brand lockup — free-standing, no box; character + logo as one identity */}
        <div className="flex-shrink-0 flex items-center gap-1">
          {/* Official Rasid character peeking — part of the identity */}
          <div className="relative hidden lg:block" style={{ animation: "float-bob 5s ease-in-out infinite" }}>
            <div className="absolute inset-0 rounded-full pointer-events-none"
                 style={{ background: `radial-gradient(circle, ${theme.accent}22, transparent 70%)`, transform: "scale(1.4)" }} />
            <ImageWithFallback src={characterShmagh} alt="راصد"
                               className="relative h-20 w-auto object-contain"
                               style={{ filter: `drop-shadow(0 6px 16px rgba(0,0,0,0.4))` }} />
          </div>
          {/* الشعار الأصلي — HeroBanner يسار، ثابت، بدون أنيميشن */}
          <RasidLogo variant="gold" className="h-28 w-auto" />
        </div>
      </div>
    </div>
  );
}

// ─── Cinematic Animated Background ───────────────────────────────────────────
// ─── Cinematic Background System — distinct atmosphere per intelligence category
function CinematicBg({ page }: { page: Page }) {
  const cat = PAGE_BG[page] || "command";
  const bt = BANNER_THEMES[cat];
  const accentHex = bt.accent;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" style={{ zIndex: 0 }}>
      {/* Primary ambient radial — always present, category-colored */}
      <div style={{ position: "absolute", top: "-10%", right: "5%", width: "550px", height: "550px",
                    background: `radial-gradient(ellipse, ${accentHex}08 0%, transparent 65%)`, animation: "shimmer-pulse 7s ease-in-out infinite" }} />
      {/* Secondary counter-glow */}
      <div style={{ position: "absolute", bottom: "10%", left: "10%", width: "350px", height: "350px",
                    background: `radial-gradient(ellipse, ${accentHex}05 0%, transparent 70%)`, animation: "shimmer-pulse 9s ease-in-out 2s infinite" }} />

      {/* ── COMMAND: Three orbiting rings — national monitoring feel */}
      {cat === "command" && <>
        <div style={{ position: "absolute", width: "620px", height: "620px", right: "2%", top: "-20%",
                      border: `1px solid ${GOLD}0C`, borderRadius: "50%", animation: "orbit-ring 60s linear infinite" }} />
        <div style={{ position: "absolute", width: "420px", height: "420px", right: "10%", top: "-8%",
                      border: `1px solid ${GOLD}09`, borderRadius: "50%", animation: "orbit-ring-r 42s linear infinite" }} />
        <div style={{ position: "absolute", width: "220px", height: "220px", right: "19%", top: "5%",
                      border: `1px solid ${GOLD}07`, borderRadius: "50%", animation: "orbit-ring 24s linear infinite" }} />
        {/* Central gold dot */}
        <div style={{ position: "absolute", width: "8px", height: "8px", borderRadius: "50%", right: "26.5%", top: "calc(5% + 106px)",
                      background: GOLD, boxShadow: `0 0 16px ${GOLD}`, animation: "shimmer-pulse 3s ease-in-out infinite" }} />
      </>}

      {/* ── INTELLIGENCE: Neural mesh — AI command center */}
      {cat === "intelligence" && <>
        {[...Array(22)].map((_, i) => (
          <div key={i} style={{ position: "absolute", width: `${4 + (i % 3)}px`, height: `${4 + (i % 3)}px`, borderRadius: "50%",
                                background: i % 4 === 0 ? GOLD : i % 4 === 1 ? TEAL : i % 4 === 2 ? "#7C6BAE" : "#5B8EF0",
                                left: `${(i * 71 + 13) % 90}%`, top: `${(i * 43 + 9) % 82}%`,
                                opacity: 0.6, animation: `neural-pulse ${2.2 + (i % 4) * 0.5}s ease-in-out ${i * 0.12}s infinite` }} />
        ))}
        {/* Connection lines suggestion */}
        {[...Array(4)].map((_, i) => (
          <div key={`cn-${i}`} style={{ position: "absolute", height: "1px", width: `${80 + i * 40}px`,
                                        top: `${20 + i * 18}%`, left: `${15 + i * 12}%`, borderRadius: "1px",
                                        background: `linear-gradient(90deg, transparent, ${TEAL}18, transparent)`,
                                        animation: `shimmer-pulse ${4 + i}s ease-in-out ${i * 0.8}s infinite` }} />
        ))}
      </>}

      {/* ── SCAN: Radar system — operational launch console */}
      {cat === "scan" && <>
        {[380, 260, 140].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: `${s}px`, height: `${s}px`,
                                left: "16%", top: "8%", borderRadius: "50%",
                                border: `1px solid ${"#1E9E57"}${["10","14","20"][i]}`, transform: "translate(-50%, 0)",
                                animation: `shield-pulse ${5 + i}s ease-in-out ${i * 0.5}s infinite` }} />
        ))}
        <div style={{ position: "absolute", width: "190px", height: "2px", left: "16%", top: "calc(8% + 190px)",
                      background: `linear-gradient(to left, #1E9E5760, transparent)`, transformOrigin: "left center",
                      animation: "orbit-ring 4s linear infinite" }} />
        {/* Cross-hair lines */}
        <div style={{ position: "absolute", width: "1px", height: "380px", left: "16%", top: "8%",
                      background: `linear-gradient(180deg, transparent, ${"#1E9E57"}12, transparent)`, transform: "translateX(-50%)" }} />
        <div style={{ position: "absolute", height: "1px", width: "380px", left: "calc(16% - 190px)", top: "calc(8% + 190px)",
                      background: `linear-gradient(90deg, transparent, ${"#1E9E57"}12, transparent)` }} />
      </>}

      {/* ── MONITOR: Surveillance grid — scanning lines */}
      {cat === "monitor" && <>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ position: "absolute", width: "100%", height: "1px", top: `${18 + i * 16}%`,
                                background: `linear-gradient(90deg, transparent, ${TEAL}${["08","0B","0E","0B","08"][i]}, transparent)`,
                                animation: `shimmer-pulse ${3 + i * 0.5}s ease-in-out ${i * 0.4}s infinite` }} />
        ))}
        {/* Vertical scanning beam */}
        <div style={{ position: "absolute", width: "1px", height: "60%", right: "25%", top: "20%",
                      background: `linear-gradient(180deg, transparent, ${TEAL}15, transparent)`,
                      animation: "data-flow 6s ease-in-out infinite" }} />
      </>}

      {/* ── ANALYSIS: Data streams — intelligence flow */}
      {cat === "analysis" && <>
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{ position: "absolute", height: "1px", width: `${180 + i * 50}px`,
                                top: `${25 + i * 16}%`, right: 0,
                                background: `linear-gradient(to left, transparent, #5B8EF0${["20","28","20","18"][i]}, transparent)`,
                                animation: `data-flow ${4 + i * 0.7}s linear ${i * 1.1}s infinite` }} />
        ))}
        {/* Diagonal accent */}
        <div style={{ position: "absolute", width: "300px", height: "1px", right: "10%", top: "30%",
                      background: `linear-gradient(90deg, transparent, ${GOLD}10, transparent)`,
                      transform: "rotate(-25deg)", animation: "shimmer-pulse 5s ease-in-out infinite" }} />
      </>}

      {/* ── VERIFY: Security shield rings */}
      {cat === "verify" && <>
        {[260, 360, 460].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: `${s}px`, height: `${s}px`, right: "12%", top: "0%",
                                borderRadius: "50%", border: `1px solid ${TEAL}${["22","16","0C"][i]}`,
                                transform: "translate(50%, -20%)", animation: `shield-pulse ${3.5 + i * 0.8}s ease-in-out ${i * 0.6}s infinite` }} />
        ))}
      </>}

      {/* ── REPORTS: Document constellation */}
      {cat === "reports" && <>
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{ position: "absolute", width: "24px", height: "32px", borderRadius: "4px",
                                left: `${14 + i * 22}%`, top: `${10 + (i % 2) * 18}%`,
                                border: `1px solid ${GOLD}${["12","0E","12","0E"][i]}`,
                                animation: `float-bob ${4 + i * 0.7}s ease-in-out ${i * 0.6}s infinite` }} />
        ))}
      </>}

      {/* ── ADMIN: Control grid */}
      {cat === "admin" && <>
        {[...Array(3)].map((_, i) => (
          <div key={i} style={{ position: "absolute", width: `${200 + i * 100}px`, height: `${200 + i * 100}px`,
                                right: `${5 + i * 8}%`, top: `${5 + i * 10}%`,
                                border: `1px solid ${GOLD}${["0A","08","06"][i]}`, borderRadius: "8px",
                                animation: `orbit-ring ${40 + i * 15}s linear ${i % 2 === 0 ? "" : "reverse"} infinite` }} />
        ))}
      </>}

      {/* ── Universal: Animated data-stream lines moving RTL — cinematic tech feel */}
      {[...Array(3)].map((_, i) => (
        <div key={`stream-${i}`} style={{
          position: "absolute", height: "1px", width: `${120 + i * 80}px`,
          top: `${30 + i * 22}%`, right: 0,
          background: `linear-gradient(to left, transparent, ${accentHex}${["18","14","10"][i]}, transparent)`,
          animation: `stream-rtl ${5 + i * 1.5}s linear ${i * 2}s infinite`,
        }} />
      ))}

      {/* ── Universal: floating particles — tech/AI atmosphere */}
      {[...Array(6)].map((_, i) => (
        <div key={`pt-${i}`} style={{
          position: "absolute", width: `${2 + (i % 2)}px`, height: `${2 + (i % 2)}px`, borderRadius: "50%",
          left: `${(i * 17 + 5) % 95}%`, bottom: `${(i * 13 + 3) % 40}%`,
          background: i % 3 === 0 ? GOLD : accentHex,
          opacity: 0.4,
          animation: `particle-up ${6 + i * 1.5}s ease-in ${i * 0.8}s infinite`,
        }} />
      ))}

      {/* ── Universal: Micro data grid — always present, very subtle */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.025 }}>
        <defs>
          <pattern id={`bg-grid-${page}`} width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke={accentHex} strokeWidth="0.4"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#bg-grid-${page})`} />
      </svg>

      {/* ── Universal: corner vignette glow — page-specific color */}
      <div style={{ position: "absolute", top: 0, right: 0, width: "40%", height: "40%",
                    background: `radial-gradient(ellipse at top right, ${accentHex}0E, transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "30%", height: "35%",
                    background: `radial-gradient(ellipse at bottom left, ${GOLD}06, transparent 70%)`, pointerEvents: "none" }} />
    </div>
  );
}

// ─── Page Header — نفس بنر الرئيسية بإطار ذهبي، موحّد على كل الصفحات ──────
function PageHeader({ title, subtitle, icon: Icon, actions }: {
  title: string; subtitle: string; icon?: React.ElementType; actions?: React.ReactNode;
}) {
  const bannerBg = `linear-gradient(135deg, ${NAVY_BG} 0%, ${NAVY_CARD} 60%, ${NAVY_BG} 100%)`;
  return (
    <div className="relative overflow-hidden rounded-2xl mb-3 flex-shrink-0"
         style={{
           background: bannerBg,
           animation: "hero-reveal 0.4s ease-out both",
           border: `1.5px solid rgba(197,165,90,0.42)`,
           boxShadow: `0 0 0 1px rgba(197,165,90,0.06), 0 12px 40px rgba(4,9,28,0.50), inset 0 0 0 1px rgba(197,165,90,0.04)`,
         }}>
      {/* Double-line inner border */}
      <InsetFrame radius={15} accent={GOLD} />
      {/* Gold top shimmer */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] z-10"
           style={{ background: `linear-gradient(90deg, transparent, ${GOLD}80, ${GOLD_PALE}, ${GOLD}80, transparent)` }} />
      {/* Atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: "absolute", top: "-30%", right: "10%", width: "300px", height: "300px",
                      background: `radial-gradient(ellipse, ${GOLD}10, transparent 65%)`, animation: "shimmer-pulse 5s ease-in-out infinite" }} />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.022 }}>
          <defs><pattern id="phg" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke={GOLD} strokeWidth="0.5"/>
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#phg)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between gap-4 px-5 py-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {Icon && (
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                 style={{ background: `${GOLD}14`, border: `1px solid ${GOLD}30`, boxShadow: `0 0 16px ${GOLD}12` }}>
              <Icon size={18} style={{ color: GOLD }} />
            </div>
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: GOLD, animation: "status-blink 1.5s ease-in-out infinite" }} />
              <HudLabel color={`${GOLD}80`}>RASID PLATFORM · NDMO</HudLabel>
            </div>
            <h1 className="text-xl font-black text-white leading-tight" style={{ fontFamily: "'Tajawal', sans-serif" }}>{title}</h1>
            {subtitle && <p className="text-xs text-slate-400 mt-0.5" style={{ fontFamily: "'Tajawal', sans-serif" }}>{subtitle}</p>}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
      </div>
    </div>
  );
}

// ─── Floating Rasid Assistant button ─────────────────────────────────────────
// Assistant widget — glass orb with the official Rasid operator, expands on hover
function FloatingAssistant({ setPage }: { setPage: (p: Page) => void }) {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={() => setPage("smart-rasid")}
            onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
            className="fixed bottom-5 left-5 z-50 flex items-center transition-all duration-300 group"
            style={{ animation: "float-bob 4.5s ease-in-out infinite" }}>
      {/* Expandable label panel */}
      <div className="overflow-hidden transition-all duration-300 flex items-center"
           style={{ maxWidth: hover ? "180px" : "0px", opacity: hover ? 1 : 0 }}>
        <div className="relative rounded-2xl px-4 py-2.5 me-[-14px] ps-4"
             style={{ background: "color-mix(in srgb, var(--card) 90%, transparent)", backdropFilter: "blur(12px)",
                      border: `1px solid ${GOLD}25`, boxShadow: "0 8px 28px rgba(0,0,0,0.35)" }}>
          <CommandFrame color={GOLD} size={9} opacity={0.5} inset={4} />
          <div className="whitespace-nowrap pe-3">
            <div className="text-xs font-bold leading-none" style={{ fontFamily: "'Tajawal', sans-serif", color: GOLD }}>راصد الذكي</div>
            <div className="flex items-center gap-1 mt-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#3DBF7A", animation: "status-blink 1.4s ease-in-out infinite" }} />
              <span className="text-[9px] text-muted-foreground" style={{ fontFamily: "'Tajawal', sans-serif" }}>متاح للمساعدة</span>
            </div>
          </div>
        </div>
      </div>
      {/* Glass orb with character */}
      <div className="relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
        {/* Ambient glow */}
        <div className="absolute inset-0 rounded-full -z-10"
             style={{ background: `radial-gradient(circle, ${GOLD}30, transparent 70%)`, transform: "scale(1.5)", animation: "rasidPulse 3s ease-in-out infinite" }} />
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full border pointer-events-none"
             style={{ borderColor: `${GOLD}30`, animation: "scan-pulse-ring 2.6s ease-out infinite" }} />
        {/* Orb */}
        <div className="relative w-16 h-16 rounded-full flex items-end justify-center overflow-hidden"
             style={{ background: `linear-gradient(160deg, ${NAVY_CARD}, #0B1640)`,
                      border: `1.5px solid ${GOLD}40`, boxShadow: `0 8px 28px rgba(0,0,0,0.45), inset 0 2px 8px ${GOLD}12` }}>
          <ImageWithFallback src={characterWaving} alt="راصد الذكي" className="h-15 w-auto object-contain" style={{ height: "60px", marginBottom: "-2px" }} />
        </div>
        {/* Online dot */}
        <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full border-2"
              style={{ background: "#3DBF7A", borderColor: NAVY_CARD, boxShadow: "0 0 8px #3DBF7A" }} />
      </div>
    </button>
  );
}

// ─── Sidebar — Rasid Command Console ─────────────────────────────────────────
function Sidebar({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const defaultOpen = NAV_GROUPS.filter(g => g.pages.some(p => p.id === page)).map(g => g.id);
  const [open, setOpen] = useState<Set<string>>(new Set(defaultOpen.length ? defaultOpen : ["home"]));
  const toggle = (id: string) => setOpen(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div className="w-[268px] h-full flex-shrink-0 flex flex-col relative overflow-hidden"
         style={{
           /* ثابت في الوضعين — أزرق ملكي داكن جداً */
           background: `linear-gradient(185deg, #040B2E 0%, #060E35 60%, #04091C 100%)`,
           borderLeft: `1px solid rgba(197,165,90,0.22)`,
           boxShadow: `inset -1px 0 0 rgba(197,165,90,0.08), 4px 0 24px rgba(4,9,28,0.35)`,
         }}>

      {/* Top HUD coordinate strip */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1 flex-shrink-0">
        <HudLabel color={`${GOLD}70`}>SYS.RASID</HudLabel>
        <HudLabel color="#3DBF7A">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#3DBF7A", animation: "status-blink 1.5s ease-in-out infinite" }} />
          ONLINE
        </HudLabel>
      </div>

      {/* ── Brand Plaque — شعار بالحجم الكامل، بدون قيد داخلي ──── */}
      <div className="mx-2 mb-3 flex-shrink-0">
        {/* overflow-visible يتيح للأنيميشن الخروج من حدود البطاقة */}
        <div className="relative rounded-2xl px-3 pt-4 pb-3"
             style={{ background: `linear-gradient(160deg, rgba(197,165,90,0.12) 0%, rgba(4,9,28,0.55) 100%)`,
                      border: `1px solid ${GOLD}22`, boxShadow: `0 10px 32px rgba(0,0,0,0.45), inset 0 1px 0 ${GOLD}14` }}>
          {/* Dot grid texture */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04] rounded-2xl overflow-hidden"
               style={{ backgroundImage: `radial-gradient(circle, ${GOLD} 1px, transparent 1px)`, backgroundSize: "14px 14px" }} />
          {/* الشعار بحجم 75% — متوسط ومتحرك، overflow-visible للأنيميشن */}
          <div className="relative flex justify-center" style={{ overflow: "visible" }}>
            <RasidLogo variant="gold" className="h-auto" style={{ width: "75%" }} animate />
          </div>
          {/* Identity line */}
          <div className="relative text-center mt-2">
            <div className="mx-auto w-20 h-px mb-1.5" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}55, transparent)` }} />
            <HudLabel color={`${GOLD}60`} className="justify-center">NDMO · NATIONAL COMPLIANCE INTELLIGENCE</HudLabel>
          </div>
        </div>
      </div>

      {/* ── Live Monitoring Strip ─────────────────────────────── */}
      <div className="mx-3 mb-2.5 px-3 py-2 rounded-xl flex items-center gap-2 flex-shrink-0 relative overflow-hidden"
           style={{ background: "#1E9E570D", border: "1px solid #1E9E571F" }}>
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#1E9E57", boxShadow: "0 0 8px #1E9E57", animation: "status-blink 1.4s ease-in-out infinite" }} />
        <span className="text-[10px] font-semibold flex-1" style={{ color: "#3DBF7A", fontFamily: "'Tajawal', sans-serif" }}>الرصد المباشر نشط</span>
        <span className="text-[10px] font-mono font-black tabular-nums" style={{ color: GOLD }}>24,983</span>
      </div>

      {/* ── Navigation ───────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto py-1 px-2">
        {NAV_GROUPS.map((group, gi) => {
          const isOpen = open.has(group.id);
          const hasActive = group.pages.some(p => p.id === page);
          return (
            <div key={group.id} className={gi > 0 ? "mt-1" : ""}>
              {/* Group header — section label with gold separator */}
              <button onClick={() => toggle(group.id)}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-150 group"
                      style={{ color: hasActive ? GOLD : "rgba(255,255,255,0.55)" }}>
                <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                     style={{ background: hasActive ? `${GOLD}18` : "rgba(255,255,255,0.06)", border: `1px solid ${hasActive ? GOLD + "32" : "rgba(255,255,255,0.08)"}` }}>
                  <group.icon size={12} style={{ color: hasActive ? GOLD : "rgba(255,255,255,0.45)" }} />
                </div>
                <span className="flex-1 text-[11px] font-bold tracking-wide" style={{ color: hasActive ? GOLD : "rgba(255,255,255,0.70)" }}>{group.label}</span>
                {group.badge && (
                  <span className="text-[8.5px] w-5 h-5 rounded-full flex items-center justify-center font-black flex-shrink-0"
                        style={{ background: `${GOLD}22`, color: GOLD, border: `1px solid ${GOLD}20` }}>{group.badge}</span>
                )}
                <div className="text-[10px] transition-transform duration-200" style={{ color: "rgba(255,255,255,0.35)", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                  <ChevronDown size={10} />
                </div>
              </button>

              {/* Nav items */}
              {isOpen && (
                <div className="mt-0.5 mb-1 space-y-px">
                  {group.pages.map(item => {
                    const active = page === item.id;
                    return (
                      <button key={item.id} onClick={() => setPage(item.id)}
                              className="w-full flex items-center gap-2.5 px-3 py-[7px] rounded-xl transition-all duration-200 group/item relative overflow-hidden hover:translate-x-[-2px]"
                              style={active ? {
                                background: `linear-gradient(to left, ${GOLD}14, ${GOLD}05)`,
                                boxShadow: `inset 3px 0 0 ${GOLD}, 0 2px 12px ${GOLD}0A`,
                                color: GOLD,
                              } : { color: "#FFFFFF" }}>
                        {/* Hover sheen — subtle gold */}
                        {!active && (
                          <span className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 pointer-events-none"
                                style={{ background: `linear-gradient(to left, rgba(255,255,255,0.04), transparent)` }} />
                        )}
                        {/* Icon */}
                        <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all relative z-10 group-hover/item:scale-110"
                             style={active ? { background: `${GOLD}18`, boxShadow: `0 0 10px ${GOLD}30` } : { background: "rgba(255,255,255,0.03)" }}>
                          <item.icon size={11} style={{ color: active ? GOLD : "rgba(255,255,255,0.55)" }} />
                        </div>
                        {/* اسم الصفحة — أبيض دائماً، ذهبي عند التفعيل */}
                        <span className="flex-1 text-right text-[11px] font-medium relative z-10 transition-colors group-hover/item:text-white"
                              style={{ color: active ? GOLD : "#FFFFFF", fontWeight: active ? 600 : 400 }}>{item.label}</span>
                        {active && (
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 relative z-10"
                               style={{ background: GOLD, boxShadow: `0 0 8px ${GOLD}`, animation: "status-blink 2s ease-in-out infinite" }} />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* ── Executive Identity Card ───────────────────────────── */}
      <div className="m-3 mt-2 flex-shrink-0">
        <div className="relative p-3 rounded-2xl overflow-hidden"
             style={{ background: `linear-gradient(135deg, ${GOLD}10, ${GOLD}05)`, border: `1px solid ${GOLD}18`,
                      boxShadow: `0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 ${GOLD}15` }}>
          <InsetFrame radius={12} />
          <div className="relative flex items-center gap-2.5">
            {/* Avatar */}
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
                 style={{ background: `linear-gradient(135deg, ${GOLD}28, ${GOLD}14)`, color: GOLD,
                          border: `1px solid ${GOLD}35`, boxShadow: `0 0 12px ${GOLD}15` }}>م</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate" style={{ color: "#FFFFFF" }}>محمد الزيلعي</p>
              <p className="text-[10px] font-medium truncate" style={{ color: GOLD }}>مدير النظام الرئيسي</p>
            </div>
            <button className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-white/8 transition-all flex-shrink-0" style={{ color: "rgba(255,255,255,0.45)" }}>
              <LogOut size={11} />
            </button>
          </div>
          <div className="flex items-center gap-1.5 mt-2.5 pt-2" style={{ borderTop: `1px solid rgba(197,165,90,0.15)` }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E9E57] animate-pulse flex-shrink-0" />
            <span className="text-[9px] font-medium flex-1" style={{ color: "rgba(255,255,255,0.45)" }}>
              نشط — الإثنين 7 محرم 1448 هـ
            </span>
          </div>
        </div>
      </div>

      {/* ── SDAIA / سدايا — هوية المنظمة الأم، ظاهرة في كامل المنصة ── */}
      <div className="mx-3 mb-3 px-3 py-2 rounded-xl flex items-center gap-2 flex-shrink-0"
           style={{ background: "rgba(61,177,172,0.07)", border: "1px solid rgba(61,177,172,0.16)" }}>
        <SdaiaLogo variant="compact" />
        <div className="flex-1 min-w-0">
          <p className="text-[9px] font-medium leading-tight" style={{ color: "rgba(61,177,172,0.75)" }}>منتج من مكتب إدارة</p>
          <p className="text-[9px] font-medium leading-tight" style={{ color: "rgba(61,177,172,0.75)" }}>البيانات الوطنية · NDMO</p>
        </div>
      </div>
    </div>
  );
}

// ─── TopBar ───────────────────────────────────────────────────────────────────
function TopBar({ page, darkMode, toggleDark, setPage }: {
  page: Page; darkMode: boolean; toggleDark: () => void; setPage: (p: Page) => void;
}) {
  return (
    <div className="h-12 flex items-center justify-between px-5 flex-shrink-0"
         style={{ borderBottom: "1px solid var(--border)", background: "var(--card)" }}>
      <div className="flex items-center gap-3">
        {/* SDAIA badge in topbar — دائم في جميع الصفحات */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ background: "rgba(61,177,172,0.08)", border: "1px solid rgba(61,177,172,0.18)" }}>
          <SdaiaLogo variant="compact" />
        </div>
        <span className="text-sm text-muted-foreground hidden md:block">رصد سياسة الخصوصية</span>
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold"
              style={{ background: `${TEAL}15`, border: `1px solid ${TEAL}30`, color: TEAL }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#1E9E57] animate-pulse" />
          مباشر
        </span>
        <span className="text-xs text-muted-foreground hidden lg:block">
          الإثنين، 7 محرم 1448 هـ
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={toggleDark} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
          {darkMode ? <Sun size={14} /> : <Moon size={14} />}
        </button>
        <button className="relative p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
          <Bell size={14} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#C78B2C]" />
        </button>
        <button onClick={() => setPage("admin")} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
          <Settings size={14} />
        </button>
        <button onClick={() => setPage("advanced-scan")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-opacity hover:opacity-90"
                style={{ background: GOLD, color: NAVY_BG, fontFamily: "'Tajawal', sans-serif" }}>
          <Plus size={12} /> فحص جديد
        </button>
      </div>
    </div>
  );
}

// ─── Tooltip style shared ─────────────────────────────────────────────────────
const TT = { background: "var(--popover)", border: `1px solid ${GOLD}30`, borderRadius: "10px", fontSize: "11px",
             color: "var(--popover-foreground)", boxShadow: "var(--card-shadow)" };

// ─── PAGE 1: Leadership Dashboard ────────────────────────────────────────────
function LeadershipPage() {
  // ─── Filter state ─────────────────────────────────────────────
  const [sectorFilter, setSectorFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [catFilter,    setCatFilter]    = useState<string[]>([]);
  const [activeHeatRow, setActiveHeatRow] = useState<number | null>(null);

  const toggleFilter = (arr: string[], set: React.Dispatch<React.SetStateAction<string[]>>, v: string) =>
    set(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);

  // ─── Data ─────────────────────────────────────────────────────
  const sectorChips = [
    { id: "gov",     label: "القطاع الحكومي", icon: Shield  },
    { id: "private", label: "القطاع الخاص",   icon: Database },
  ];
  const statusChips = [
    { id: "compliant",  label: "ممتثل",        color: "#1E9E57" },
    { id: "partial",    label: "ممتثل جزئياً", color: "#C78B2C" },
    { id: "nc",         label: "غير ممتثل",    color: "#B94A55" },
    { id: "working",    label: "يعمل",         color: "#3DB1AC" },
    { id: "inactive",   label: "لا يعمل",      color: "#64748B" },
    { id: "hasEmail",   label: "لديه بريد",    color: "#7C6BAE" },
    { id: "hasSocial",  label: "لديه صفحة تواصل", color: "#C5A55A" },
  ];
  const catChips = [
    "عام","تجاري","عام/تجاري","غير ربحي","تعليمي","منظمات","سيارات",
    "تجارة إلكترونية","إعلام","شبكات/تقنية","حكومي","غير مصنّف","عقارات","خدمات",
  ];

  const article12Data = [
    { id: 1, pct: 43, label: "تحديد وسيلة معالجة البيانات الشخصية",           compliant: 440, nc: 575, color: "#C78B2C" },
    { id: 2, pct: 47, label: "تحديد طريقة حفظ البيانات الشخصية",              compliant: 540, nc: 480, color: "#C5A55A" },
    { id: 3, pct: 47, label: "تحديد مشمول البيانات الشخصية المطلوب جمعها",   compliant: 533, nc: 482, color: "#C5A55A" },
    { id: 4, pct: 48, label: "تحديد الغرض من جمع البيانات الشخصية",           compliant: 523, nc: 492, color: "#3DB1AC" },
    { id: 5, pct: 37, label: "كيفية مواجهة صاحب البيانات لطلبه",              compliant: 375, nc: 640, color: "#B94A55" },
    { id: 6, pct: 47, label: "تحديد حقوق أصحاب البيانات الشخصية",            compliant: 474, nc: 541, color: "#C5A55A" },
    { id: 7, pct: 27, label: "تحديد كيف تتم مشاركة البيانات الشخصية",        compliant: 269, nc: 746, color: "#B94A55" },
    { id: 8, pct: 43, label: "تحديد طريقة معالجة وتحليل البيانات الشخصية",   compliant: 440, nc: 575, color: "#C78B2C" },
  ];

  const sectorAnalysis = [
    {
      label: "القطاع الحكومي", total: 36, icon: Shield, color: "#1E9E57",
      compliant: 36, nc: 461, partial: 127,
      articles: [63, 62, 62, 63, 63, 62, 63, 62],
    },
    {
      label: "القطاع الخاص",  total: 12182, icon: Database, color: "#C5A55A",
      compliant: 236, nc: 10882, partial: 1332,
      articles: [47, 52, 48, 43, 37, 47, 27, 43],
    },
  ];

  const classificationData = [
    {
      label: "عام", total: 6865, pct: 8, color: "#3DB1AC",
      leader: 618, nc: 4208, compliant: 12,
      articles: [52, 48, 50, 51, 42, 48, 34, 44],
    },
    {
      label: "تجاري", total: 575, pct: 8, color: "#C5A55A",
      leader: 265, nc: 2956, compliant: 5,
      articles: [44, 40, 38, 39, 31, 40, 22, 36],
    },
    {
      label: "عام/تجاري", total: 575, pct: 8, color: "#7C6BAE",
      leader: 39, nc: 1535, compliant: 31,
      articles: [46, 44, 45, 46, 38, 45, 29, 41],
    },
  ];

  const heatmapRows = [
    { label: "القطاع الخاص - عام",               values: [52, 48, 50, 51, 42, 48, 34, 44] },
    { label: "القطاع الخاص - تجاري",             values: [44, 40, 38, 39, 31, 40, 22, 36] },
    { label: "القطاع الخاص - عام/تجاري",         values: [46, 44, 45, 46, 38, 45, 29, 41] },
    { label: "القطاع الخاص - تجارة إلكترونية",   values: [38, 35, 36, 38, 28, 37, 20, 32] },
    { label: "القطاع الخاص - خدمات",             values: [42, 39, 40, 42, 33, 41, 25, 37] },
    { label: "القطاع الخاص - غير ربحي",          values: [55, 52, 53, 54, 46, 53, 38, 49] },
    { label: "القطاع الخاص - شبكات/تقنية",      values: [48, 45, 46, 47, 38, 46, 30, 43] },
    { label: "القطاع الحكومي - حكومي",           values: [63, 62, 62, 63, 63, 62, 63, 62] },
    { label: "القطاع الخاص - تعليمي",            values: [41, 38, 39, 40, 32, 39, 24, 35] },
    { label: "القطاع الخاص - عقارات",            values: [36, 33, 34, 35, 27, 34, 19, 30] },
  ];

  const benchmarkData = [
    { sector: "تجاري",           cat: "القطاع الخاص",    sites: 352, score: "3.1/8", low: 0, high: 8, compliance: 39, dist: [70, 15, 15] },
    { sector: "عام",             cat: "القطاع الخاص",    sites: 320, score: "3.1/8", low: 0, high: 8, compliance: 30, dist: [60, 20, 20] },
    { sector: "فلاحي الخاص",    cat: "القطاع الخاص",    sites: 160, score: "5.6/8", low: 0, high: 8, compliance: 20, dist: [50, 25, 25] },
    { sector: "خدمات",          cat: "القطاع الخاص",    sites: 78,  score: "0.5/8", low: 0, high: 8, compliance: 20, dist: [50, 30, 20] },
    { sector: "بلديات/إدارة",   cat: "القطاع الخاص",    sites: 70,  score: "2.5/8", low: 0, high: 8, compliance: 40, dist: [45, 35, 20] },
    { sector: "علمي",           cat: "القطاع الخاص",    sites: 47,  score: "1/8",   low: 0, high: 8, compliance: 30, dist: [55, 25, 20] },
    { sector: "دولة/عقارية",    cat: "القطاع الخاص",    sites: 37,  score: "1/8",   low: 0, high: 8, compliance: 20, dist: [60, 20, 20] },
    { sector: "تعليم",          cat: "القطاع الخاص",    sites: 32,  score: "1.3/8", low: 0, high: 8, compliance: 40, dist: [50, 30, 20] },
    { sector: "ترفيه",          cat: "القطاع الخاص",    sites: 27,  score: "1/8",   low: 0, high: 8, compliance: 30, dist: [55, 25, 20] },
    { sector: "صنع",            cat: "القطاع الخاص",    sites: 21,  score: "4.4/8", low: 0, high: 8, compliance: 20, dist: [45, 35, 20] },
    { sector: "تجارة إلكترونية", cat: "القطاع الخاص",  sites: 17,  score: "5.7/8", low: 0, high: 8, compliance: 20, dist: [50, 30, 20] },
    { sector: "منظمات",         cat: "القطاع الخاص",    sites: 16,  score: "1.5/8", low: 0, high: 8, compliance: 30, dist: [55, 25, 20] },
    { sector: "عقارات",         cat: "القطاع الخاص",    sites: 12,  score: "3.5/8", low: 0, high: 8, compliance: 40, dist: [45, 35, 20] },
    { sector: "شبكات/تقنية",    cat: "القطاع الخاص",    sites: 12,  score: "3.5/8", low: 0, high: 8, compliance: 30, dist: [50, 30, 20] },
  ];

  const heatColor = (v: number) =>
    v >= 60 ? "#1E9E57" : v >= 45 ? "#3DB1AC" : v >= 30 ? "#C78B2C" : "#B94A55";

  const sectorPerf = [
    { name: "حكومي",    pct: 94, color: "#1E9E57", sites: 8841  },
    { name: "بنكي",     pct: 48, color: "#C78B2C", sites: 2340  },
    { name: "تجاري",   pct: 31, color: "#B94A55", sites: 7200  },
    { name: "صحي",     pct: 67, color: "#3DB1AC", sites: 1890  },
    { name: "تعليمي",  pct: 55, color: "#7C6BAE", sites: 1640  },
    { name: "اتصالات", pct: 42, color: "#C5A55A", sites: 1072  },
  ];
  const recentActivity = [
    { site: "commerce.gov.sa", event: "انتهى الفحص — 94%",  status: "compliant" as ComplianceStatus, time: "9:52" },
    { site: "noon.com/ar-sa",  event: "تراجع — 41% (↓ 6%)", status: "non-compliant" as ComplianceStatus, time: "9:48" },
    { site: "moh.gov.sa",      event: "فحص دوري مكتمل",     status: "compliant" as ComplianceStatus, time: "9:41" },
    { site: "stc.com.sa",      event: "يحتاج مراجعة",       status: "review" as ComplianceStatus, time: "9:35" },
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

      {/* ══ HERO BANNER ══ */}
      <HeroBanner page="leadership" title="المؤشرات الرئيسية"
                  subtitle="نظرة قيادية شاملة على حالة الخصوصية الوطنية — 29 قطاعاً · 24,983 موقعاً مرصوداً"
                  actions={<>
                    {[{ l: "إصدار تقرير", i: FileText }, { l: "تصدير PDF", i: Download }, { l: "تحديث", i: RefreshCw }].map(({ l, i: I }) => (
                      <button key={l} style={{ border: `1px solid ${GOLD}30`, color: GOLD }}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium hover:opacity-80 transition-all">
                        <I size={12} /> {l}
                      </button>
                    ))}
                  </>} />

      {/* ══ FILTER BAR ══ */}
      <div className="relative rounded-2xl overflow-hidden p-4 space-y-2.5"
           style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}>
        <InsetFrame />
        {/* Row 1: Sector + Status */}
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
        {/* Row 2: Classification */}
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

      {/* ══ KPI ROW ══ */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {OVERVIEW_KPIS.map((k, i) => <KPICard key={i} {...k} />)}
      </div>

      {/* ══ COMPLIANCE + TREND ══ */}
      <div className="grid grid-cols-4 gap-4">
        <div className="relative rounded-2xl overflow-hidden p-4 flex flex-col items-center"
             style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)", animation: "card-breathe 6s ease-in-out infinite" }}>
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
        <div className="col-span-2 relative rounded-2xl overflow-hidden p-4" style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}>
          <InsetFrame />
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">اتجاهات الامتثال الشهرية</h3>
              <p className="text-xs text-muted-foreground">آخر 6 أشهر — معدل التحسن +3.2%</p>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: "#1E9E57" }} />ممتثل</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: "#C78B2C" }} />جزئياً</span>
            </div>
          </div>
          <div dir="ltr">
            <ResponsiveContainer width="100%" height={190}>
              <LineChart data={TREND_DATA} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#64748B", fontFamily: "Tajawal" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TT} />
                <Line id="trend-compliant-lp" name="trend-compliant-leadership" type="linear" dataKey="ممتثل" stroke="#1E9E57" strokeWidth={2.5} dot={{ fill: "#1E9E57", r: 3, strokeWidth: 0 }} activeDot={{ r: 4 }} />
                <Line id="trend-partial-lp" name="trend-partial-leadership" type="basis" dataKey="جزئياً" stroke="#C78B2C" strokeWidth={2.5} dot={{ fill: "#C78B2C", r: 3, strokeWidth: 0 }} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ══ ARTICLE 12 GRID ══ */}
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
                  {/* Circular gauge */}
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
                        <div className="text-sm font-black tabular-nums" style={{ color: "#1E9E57" }}>{art.compliant.toLocaleString()}</div>
                        <div className="text-[9px] text-muted-foreground">ممتثل</div>
                      </div>
                      <div className="p-1.5 rounded-lg text-center" style={{ background: "#B94A5512" }}>
                        <div className="text-sm font-black tabular-nums" style={{ color: "#B94A55" }}>{art.nc.toLocaleString()}</div>
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

      {/* ══ SECTOR ANALYSIS ══ */}
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
                  <div className="text-center"><div className="text-base font-black" style={{ color: "#1E9E57" }}>{sec.compliant}</div><div className="text-[9px] text-muted-foreground">ممتثل</div></div>
                  <div className="text-center"><div className="text-base font-black" style={{ color: "#B94A55" }}>{sec.nc.toLocaleString()}</div><div className="text-[9px] text-muted-foreground">غير ممتثل</div></div>
                  <div className="text-center"><div className="text-base font-black" style={{ color: "#C78B2C" }}>{sec.partial.toLocaleString()}</div><div className="text-[9px] text-muted-foreground">نقاء</div></div>
                </div>
              </div>
              {/* Article 12 bars */}
              <div className="space-y-1.5">
                {article12Data.map((art, ai) => {
                  const pct = sec.articles[ai];
                  const bc = pct >= 60 ? "#1E9E57" : pct >= 40 ? "#C78B2C" : "#B94A55";
                  return (
                    <div key={ai} className="flex items-center gap-2">
                      <span className="text-[9px] font-mono text-muted-foreground w-8 flex-shrink-0">بند {art.id}</span>
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
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

      {/* ══ CLASSIFICATION ANALYSIS ══ */}
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
                {[{ l: "رائد", v: cls.leader, c: GOLD }, { l: "غير ممتثل", v: cls.nc, c: "#B94A55" }, { l: "ممتثل", v: cls.compliant, c: "#1E9E57" }].map(s => (
                  <div key={s.l} className="p-1.5 rounded-lg text-center" style={{ background: `${s.c}10` }}>
                    <div className="text-sm font-black tabular-nums" style={{ color: s.c }}>{s.v.toLocaleString()}</div>
                    <div className="text-[9px] text-muted-foreground">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-1.5">
                {article12Data.map((art, ai) => {
                  const pct = cls.articles[ai];
                  const bc = pct >= 60 ? "#1E9E57" : pct >= 40 ? "#C78B2C" : "#B94A55";
                  return (
                    <div key={ai} className="flex items-center gap-2">
                      <span className="text-[9px] font-mono text-muted-foreground w-8 flex-shrink-0">بند {art.id}</span>
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
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

      {/* ══ HEATMAP ══ */}
      <div>
        <SectionTitle title="خريطة الامتثال الحرارية وسرعة التحسين" subtitle="خريطة مقارية للقطاعات بنود المادة 12" />
        <div className="grid grid-cols-4 gap-4">
          {/* Improvement speed card */}
          <div className="relative rounded-2xl overflow-hidden p-4"
               style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}>
            <InsetFrame />
            <p className="text-sm font-bold text-foreground mb-3">سرعة التحسين</p>
            <div className="text-center mb-4">
              <div className="text-4xl font-black" style={{ color: GOLD }}>0%</div>
              <div className="text-xs text-muted-foreground mt-1">متوسط التغيير</div>
            </div>
            {[{ l: "تحسّن",    c: "#1E9E57", v: 0 }, { l: "ثبات",    c: "#3DB1AC", v: 0 },
              { l: "تراجع",   c: "#B94A55", v: 0 }, { l: "دون تغيير", c: "#64748B", v: 0 }].map(s => (
              <div key={s.l} className="flex items-center justify-between py-1.5" style={{ borderBottom: "1px solid var(--border)" }}>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: s.c }} />
                  <span className="text-xs text-foreground">{s.l}</span>
                </div>
                <span className="text-xs font-bold tabular-nums" style={{ color: s.c }}>{s.v}</span>
              </div>
            ))}
          </div>
          {/* Heatmap grid */}
          <div className="col-span-3 relative rounded-2xl overflow-hidden p-4"
               style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}>
            <InsetFrame />
            <div className="flex items-center gap-2 mb-3">
              <p className="text-sm font-bold text-foreground">خريطة مقارية للقطاعات</p>
              <div className="flex items-center gap-2 mr-auto text-[10px]">
                {[{ c: "#1E9E57", l: "≥60%" }, { c: "#3DB1AC", l: "45-60%" }, { c: "#C78B2C", l: "30-45%" }, { c: "#B94A55", l: "<30%" }].map(l => (
                  <span key={l.l} className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-sm" style={{ background: l.c }} />{l.l}
                  </span>
                ))}
              </div>
            </div>
            {/* Header row */}
            <div className="flex items-center gap-1 mb-1 pr-36">
              {article12Data.map(a => (
                <div key={a.id} className="flex-1 text-center text-[9px] font-bold text-muted-foreground">بند {a.id}</div>
              ))}
            </div>
            {/* Data rows */}
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

      {/* ══ BENCHMARK TABLE ══ */}
      <div>
        <SectionTitle title="المقارنة المعيارية" subtitle="مقارنة أداء الامتثال بين القطاعات والتصنيفات" />
        <div className="relative rounded-2xl overflow-hidden"
             style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}>
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
                  const cc = row.compliance >= 40 ? "#1E9E57" : row.compliance >= 25 ? "#C78B2C" : "#B94A55";
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
                          <div style={{ width: `${row.dist[0]}%`, background: "#1E9E57", opacity: 0.7 }} />
                          <div style={{ width: `${row.dist[1]}%`, background: "#C78B2C", opacity: 0.7 }} />
                          <div style={{ width: `${row.dist[2]}%`, background: "#B94A55", opacity: 0.7 }} />
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

      {/* ══ SECTOR PERF + RECENT ACTIVITY ══ */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 relative rounded-2xl overflow-hidden p-5" style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}>
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
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                  <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color, boxShadow: `0 0 6px ${s.color}60` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative rounded-2xl overflow-hidden p-4" style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}>
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
              {[{ l: "فحوص اليوم", v: "47", c: TEAL }, { l: "تنبيهات", v: "12", c: "#C78B2C" }].map(s => (
                <div key={s.l} className="p-2 rounded-lg text-center" style={{ background: "var(--muted)" }}>
                  <div className="text-lg font-black tabular-nums" style={{ color: s.c }}>{s.v}</div>
                  <div className="text-[10px] text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ SITES TABLE ══ */}
      <div className="relative rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}>
        <InsetFrame />
        <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
          <h3 className="text-sm font-semibold text-foreground">أبرز المواقع المرصودة</h3>
          <span className="text-[11px] text-muted-foreground">آخر فحوصات</span>
        </div>
        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {WEBSITES.slice(0, 5).map((site, i) => {
            const sc = site.score >= 80 ? "#1E9E57" : site.score >= 50 ? "#C78B2C" : site.score > 0 ? "#B94A55" : "#64748B";
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
                  <div className="w-14 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
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

// ─── PAGE 2: KPI Dashboard ────────────────────────────────────────────────────
function KPIDashboardPage() {
  const groups = [
    { label: "الامتثال", color: "#1E9E57", icon: Shield, items: [
      { name: "نسبة الامتثال الكلية", val: "72%", target: "80%", pct: 72 },
      { name: "امتثال القطاع الصحي", val: "68%", target: "75%", pct: 68 },
      { name: "متوسط نسبة الامتثال", val: "68%", target: "80%", pct: 68 },
    ]},
    { label: "الفحص", color: TEAL, icon: Activity, items: [
      { name: "الفحوصات الشهرية", val: "1,247", target: "1,500", pct: 83 },
      { name: "الجداول النشطة", val: "5", target: "8", pct: 62 },
    ]},
    { label: "الاستجابة", color: "#C78B2C", icon: Clock, items: [
      { name: "نسبة الرد على الخطابات", val: "78%", target: "90%", pct: 78 },
      { name: "الحالات المفتوحة", val: "14", target: "5", pct: 40 },
    ]},
  ];
  return (
    <div className="relative p-5 space-y-4" style={{ zIndex: 1 }}>
      <CinematicBg page="kpi-dashboard" />
      <PageHeader title="مؤشرات الأداء الرئيسية (KPI)" subtitle="مراقبة الأداء مقابل الأهداف المحددة" icon={Target}
                  actions={<>
                    <button style={{ border: "1px solid var(--border)", fontFamily: "'Tajawal', sans-serif" }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:bg-muted">
                      <RefreshCw size={12} /> تحديث
                    </button>
                    <button style={{ background: GOLD, color: NAVY_BG, fontFamily: "'Tajawal', sans-serif" }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold">
                      <Plus size={12} /> إضافة مؤشر
                    </button>
                  </>} />
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "متوسط الأداء",       value: "68%",  icon: Award,  color: GOLD    },
          { label: "الأهداف المحققة",    value: "17",   icon: CheckCircle2, color: "#1E9E57" },
          { label: "المؤشرات النشطة",   value: "86",   icon: Activity, color: TEAL  },
          { label: "معدل الامتثال",      value: "72%",  icon: Shield, color: "#C78B2C" },
        ].map((k, i) => <SmallKPI key={i} {...k} delay={i * 0.07} />)}
      </div>
      <div className="space-y-4">
        {groups.map((g, gi) => (
          <PCard key={gi} goldTop className="p-5" style={{ animation: `card-rise 0.4s ease-out ${gi * 0.1}s both` }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                   style={{ background: g.color }}>{gi + 1}</div>
              <g.icon size={14} style={{ color: g.color }} />
              <h3 style={{ fontFamily: "'Tajawal', sans-serif", color: g.color }} className="text-sm font-bold">{g.label}</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {g.items.map((item, ii) => (
                <div key={ii} className="p-3 rounded-xl" style={{ background: "var(--muted)" }}>
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm text-foreground">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span style={{ color: g.color, fontFamily: "'Tajawal', sans-serif" }} className="text-lg font-black">{item.val}</span>
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

// ─── PAGE 3: Real-Time ────────────────────────────────────────────────────────
function RealTimePage() {
  const alerts = [
    { org: "بنك الراجحي", change: "ممتثل جزئياً → غير ممتثل", badge: "تراجع",  color: "#B94A55", time: "9:42 ص" },
    { org: "وزارة التعليم", change: "غير ممتثل → ممتثل جزئياً", badge: "تحسّن", color: "#C78B2C", time: "9:38 ص" },
    { org: "نون للتجارة",  change: "نشط → لا يعمل",           badge: "انخفاض", color: "#64748B", time: "9:21 ص" },
  ];
  return (
    <div className="relative p-5 space-y-4" style={{ zIndex: 1 }}>
      <CinematicBg page="real-time" />
      <PageHeader title="لوحة الإحصائيات المباشرة" subtitle="آخر تحديث: الإثنين، 7 محرم 1448 هـ — 9:55:00 ص" icon={Radio}
                  actions={<>
                    <button style={{ background: TEAL, color: NAVY_BG, fontFamily: "'Tajawal', sans-serif" }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold">
                      <Radio size={12} /> تحديث تلقائي
                    </button>
                  </>} />
      <div className="grid grid-cols-2 gap-4">
        <PCard goldTop className="p-5" style={{ animation: "card-rise 0.4s ease-out 0s both" }}>
          <h3 style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold mb-3">
            التنبيهات المباشرة <span className="text-muted-foreground font-normal">— {alerts.length} تنبيه</span>
          </h3>
          <div className="space-y-3">
            {alerts.map((a, i) => (
              <div key={i} className="flex items-start justify-between p-3 rounded-xl" style={{ background: "var(--muted)", animation: `card-rise 0.3s ease-out ${i * 0.08}s both` }}>
                <div>
                  <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold text-foreground">{a.org}</p>
                  <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground mt-0.5">{a.change}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{a.time}</p>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${a.color}18`, color: a.color }}>{a.badge}</span>
              </div>
            ))}
          </div>
        </PCard>
        <div className="space-y-4">
          <PCard goldTop className="p-5" style={{ animation: "card-rise 0.4s ease-out 0.1s both" }}>
            <h3 style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold mb-3">آخر الفحوصات <span style={{ color: TEAL }} className="text-xs">● مباشر</span></h3>
            {WEBSITES.slice(0, 4).map((site, i) => (
              <div key={i} className="flex items-center justify-between py-2" style={{ borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
                <span className="text-xs font-mono text-muted-foreground">{site.url}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold tabular-nums" style={{ color: site.score >= 80 ? "#1E9E57" : site.score >= 50 ? "#C78B2C" : "#B94A55" }}>{site.score}%</span>
                  <ComplianceBadge status={site.status} />
                </div>
              </div>
            ))}
          </PCard>
          <PCard goldTop className="p-4" style={{ animation: "card-rise 0.4s ease-out 0.18s both" }}>
            <h3 style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold mb-3">حالة الخادم</h3>
            {[{ l: "وقت التشغيل", v: "14 يوم 7 ساعة" }, { l: "الذاكرة", v: "68%" }, { l: "إصدار Node.js", v: "v22.12.0" }].map((r, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 text-xs">
                <span style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-muted-foreground">{r.l}</span>
                <span className="font-mono text-foreground">{r.v}</span>
              </div>
            ))}
          </PCard>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE 4: Smart Rasid AI ───────────────────────────────────────────────────
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
      {/* Right panel: character + capabilities */}
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
            <p className="text-base font-black" style={{ color: GOLD, fontFamily: "'Tajawal', sans-serif" }}>راصد الذكي</p>
            <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground">v6.0 · مساعد الامتثال الوطني</p>
            <div className="flex items-center justify-center gap-1.5 mt-2">
              <span className={`w-1.5 h-1.5 rounded-full ${thinking ? "bg-[#C78B2C]" : "bg-[#1E9E57]"} animate-pulse`} />
              <span style={{ fontFamily: "'Tajawal', sans-serif" }} className={`text-xs ${thinking ? "text-[#C78B2C]" : "text-[#1E9E57]"}`}>
                {thinking ? "يفكر..." : "نشط ومتاح"}
              </span>
            </div>
          </div>
        </PCard>
        <PCard goldTop className="p-4">
          <h3 style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold mb-3">قدرات راصد الذكي</h3>
          {[
            { label: "تحليل سياسات الخصوصية", icon: Eye },
            { label: "قياس الامتثال التلقائي",  icon: Shield },
            { label: "إنشاء تقارير PDF",        icon: FileText },
            { label: "المقارنة القطاعية",        icon: BarChart3 },
            { label: "كشف المخالفات",            icon: AlertCircle },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <c.icon size={12} style={{ color: GOLD }} className="flex-shrink-0" />
              <span style={{ fontFamily: "'Tajawal', sans-serif" }}>{c.label}</span>
            </div>
          ))}
        </PCard>
        <div>
          <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs font-semibold text-muted-foreground mb-2">اقتراحات سريعة</p>
          <div className="space-y-2">
            {SUGGESTED_PROMPTS.map((p, i) => (
              <button key={i} onClick={() => setMessage(p.text)}
                      style={{ border: "1px solid var(--border)", fontFamily: "'Tajawal', sans-serif" }}
                      className="w-full text-right p-2.5 rounded-xl text-xs text-muted-foreground hover:text-foreground hover:bg-card transition-all">
                <div className="flex items-start gap-2"><p.icon size={11} style={{ color: GOLD }} className="flex-shrink-0 mt-0.5" />{p.text}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Chat area — AI Command Center */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* AI Command Center header */}
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
              <h2 className="text-base font-black text-white" style={{ fontFamily: "'Tajawal', sans-serif" }}>محادثة مع راصد الذكي</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3DBF7A] animate-pulse" />
                <p className="text-[10px] text-slate-400" style={{ fontFamily: "'Tajawal', sans-serif" }}>36 أداة · 7 وكلاء · تحليل فوري</p>
              </div>
            </div>
            <button style={{ border: `1px solid ${GOLD}25`, fontFamily: "'Tajawal', sans-serif", color: GOLD }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[#C5A55A12]"
                    onClick={() => setMessages(CHAT_MESSAGES)}>
              <Plus size={11} /> جلسة جديدة
            </button>
          </div>
          {/* Gold accent line */}
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
                    <span style={{ fontFamily: "'Tajawal', sans-serif", color: GOLD }} className="text-xs font-semibold">راصد الذكي</span>
                    <div className="w-6 h-6 rounded-xl flex items-center justify-center"
                         style={{ background: `linear-gradient(135deg, ${GOLD}25, ${GOLD}10)`, border: `1px solid ${GOLD}30` }}>
                      <Bot size={11} style={{ color: GOLD }} />
                    </div>
                  </div>
                )}
                {/* Message bubble — AI: dark command surface, User: gold-tinted */}
                <div className="text-sm leading-relaxed whitespace-pre-line"
                     style={{
                       padding: "14px 16px",
                       borderRadius: msg.role === "user" ? "20px 4px 20px 20px" : "4px 20px 20px 20px",
                       background: msg.role === "user"
                         ? `linear-gradient(135deg, ${GOLD}14, ${GOLD}08)`
                         : `linear-gradient(135deg, #07102E, #0B1640)`,
                       border: `1px solid ${msg.role === "user" ? GOLD + "25" : TEAL + "15"}`,
                       fontFamily: "'Tajawal', sans-serif", color: "var(--foreground)",
                       boxShadow: msg.role === "assistant" ? `0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 ${TEAL}10` : "none",
                     }}>
                  {msg.text}
                </div>
                <div className={`text-[9px] text-muted-foreground mt-1 font-mono ${msg.role === "user" ? "text-right" : "text-left"}`}>{msg.time}</div>
              </div>
            </div>
          ))}
          {thinking && (
            <div className="flex justify-end">
              <div className="p-3.5 rounded-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2].map(j => <div key={j} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: GOLD, animationDelay: `${j * 0.15}s` }} />)}
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
        {/* Premium AI input bar */}
        <div className="px-5 py-4 flex-shrink-0 relative"
             style={{ background: `linear-gradient(180deg, transparent, var(--card))`, borderTop: `1px solid ${GOLD}12` }}>
          <div className="flex items-end gap-3 p-1 rounded-2xl"
               style={{ background: "var(--card)", border: `1px solid ${GOLD}18`, boxShadow: `0 4px 20px rgba(0,0,0,0.15), 0 0 20px ${GOLD}06` }}>
            <textarea value={message} onChange={e => setMessage(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                      placeholder="اسأل راصد الذكي — تحليل سياسة، مقارنة قطاعات، تقرير فوري…"
                      rows={2} className="flex-1 px-4 py-3 text-sm resize-none focus:outline-none text-foreground placeholder:text-muted-foreground bg-transparent"
                      style={{ fontFamily: "'Tajawal', sans-serif" }} />
            <button onClick={send} disabled={!message.trim()}
                    className="w-11 h-11 m-1 rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-30 hover:opacity-90 active:scale-95 transition-all"
                    style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_PALE})`, color: NAVY_BG, boxShadow: `0 4px 12px ${GOLD}30` }}>
              <Send size={15} />
            </button>
          </div>
          <p className="text-[9px] text-muted-foreground text-center mt-2 tracking-wide" style={{ fontFamily: "'Tajawal', sans-serif" }}>
            RASID AI · محمي بمعايير NDMO · جميع الاستعلامات مسجّلة ومدقّقة
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE 5: Advanced Scan (Complete — matches reference screenshots) ────────
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
  { l: "رابط الموقع", c: true }, { l: "عنوان الصفحة", c: true }, { l: "وصف الموقع", c: false },
  { l: "ترتيب التصفح", c: false }, { l: "نوع الموقع", c: false }, { l: "نص المحتوى", c: true },
  { l: "تاريخ النشر", c: false }, { l: "القطاع", c: false }, { l: "النوع/الفئة", c: false },
  { l: "اللغة المستخدمة", c: false }, { l: "بيانات Meta", c: false }, { l: "وسائل التواصل", c: false },
  { l: "صور الصفحة", c: false }, { l: "عدد الصفحات", c: false }, { l: "سياسة الخصوصية", c: true },
  { l: "الشروط والأحكام", c: false }, { l: "إشعار الكوكيز", c: false }, { l: "أيقونات الموقع", c: false },
];
const SCAN_SECTORS = [
  { id: "all",     l: "القطاع الكلي",   count: 24983 },
  { id: "private", l: "القطاع الخاص",   count: 16142 },
  { id: "gov",     l: "القطاع الحكومي", count: 8841  },
];
const SCAN_SAVED_LISTS = [
  { name: "الجهات الحكومية الكبرى", count: 45, date: "5 محرم 1448" },
  { name: "القطاع البنكي الكامل",   count: 38, date: "3 محرم 1448" },
  { name: "مواقع وزارة الصحة",      count: 27, date: "1 محرم 1448" },
];
const SCAN_TABS = [
  { id: "links",     l: "روابط",       icon: Globe        },
  { id: "search",    l: "بحث",         icon: SearchIcon   },
  { id: "classify",  l: "التصنيفات",   icon: Layers       },
  { id: "contains",  l: "يحتوي",       icon: Hash         },
  { id: "lists",     l: "القوائم",     icon: BookOpen     },
  { id: "settings",  l: "الإعدادات",   icon: Settings     },
  { id: "schedules", l: "الجدولات",    icon: Calendar     },
  { id: "launch",    l: "لوحة الزحف",  icon: Activity     },
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
    extractText: true, scanApps: false, dynamicBypass: false, bypassUnavailable: false,
  });
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
    { l: "تحضير الهدف",      done: scanPct > 8,   active: scanPct <= 8 },
    { l: "الزحف والاستكشاف", done: scanPct > 28,  active: scanPct <= 28 && scanPct > 8 },
    { l: "استخراج النصوص",   done: scanPct > 48,  active: scanPct <= 48 && scanPct > 28 },
    { l: "لقطة الشاشة",      done: scanPct > 66,  active: scanPct <= 66 && scanPct > 48 },
    { l: "تحليل الامتثال",   done: scanPct > 86,  active: scanPct <= 86 && scanPct > 66 },
    { l: "إنشاء التقرير",    done: scanPct >= 100, active: scanPct <= 100 && scanPct > 86 },
  ];

  // ════════ LIVE SCAN OPERATIONS CENTER ════════
  if (scanning) {
    return (
      <div className="relative flex flex-col overflow-hidden" style={{ height: "calc(100vh - 48px)", zIndex: 1 }}>
        <CinematicBg page="advanced-scan" />
        {/* Command bar */}
        <div className="relative flex-shrink-0 px-5 py-3 z-10"
             style={{ background: `linear-gradient(135deg, #04091C 0%, #07102E 100%)`, borderBottom: `1px solid ${GOLD}1F` }}>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#3DBF7A", boxShadow: "0 0 10px #3DBF7A", animation: "status-blink 1.3s ease-in-out infinite" }} />
                <span className="text-xs font-black tracking-[0.18em] uppercase" style={{ color: "#3DBF7A", fontFamily: "'Tajawal', sans-serif" }}>LIVE SCAN OPERATIONS CENTER</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${GOLD}20`, color: GOLD }}>
                {Math.round(scanPct * 4.83)} / {selCount || 483} موقع
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400">~{Math.max(0, Math.round((100 - scanPct) * 0.49))} دقيقة متبقية</span>
          </div>
          {/* Master progress bar */}
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div className="h-full rounded-full transition-all duration-500 relative overflow-hidden"
                 style={{ width: `${scanPct}%`, background: `linear-gradient(90deg, ${GOLD}, #3DBF7A)`, boxShadow: `0 0 12px ${GOLD}70` }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)", animation: "shimmer-sweep 1.8s ease-in-out infinite" }} />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 grid grid-cols-3 gap-4 relative z-10">
          {/* LEFT: progress + character + controls */}
          <div className="flex flex-col gap-4">
            <div className="relative p-5 rounded-2xl flex flex-col items-center"
                 style={{ background: "var(--card)", border: `1px solid ${GOLD}1A`, boxShadow: "var(--card-shadow)" }}>
              <div className="absolute top-0 inset-x-0 h-[1.5px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
              <CircularProgress pct={scanPct} size={168} />
              <p className="text-xs text-muted-foreground mt-2" style={{ fontFamily: "'Tajawal', sans-serif" }}>{Math.round(scanPct * 4.83)} موقع من {selCount || 483}</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { l: "مكتمل", v: Math.floor(scanPct * 4.2), c: "#3DBF7A" },
                { l: "جارٍ",   v: Math.min(8, Math.ceil((100 - scanPct) / 14)), c: GOLD },
                { l: "فشل",   v: Math.floor(scanPct * 0.12), c: "#D9728A" },
              ].map(s => (
                <div key={s.l} className="p-2.5 rounded-xl text-center" style={{ background: "var(--card)", border: `1px solid ${s.c}20` }}>
                  <div style={{ color: s.c, fontFamily: "'Tajawal', sans-serif" }} className="text-lg font-black leading-none">{s.v}</div>
                  <div className="text-[9px] text-muted-foreground mt-0.5" style={{ fontFamily: "'Tajawal', sans-serif" }}>{s.l}</div>
                </div>
              ))}
            </div>
            {/* Rasid operator */}
            <div className="relative flex-1 flex items-end justify-center rounded-2xl overflow-hidden p-3"
                 style={{ background: `linear-gradient(180deg, transparent, ${GOLD}06)` }}>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div style={{ width: 130, height: 130, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}1A, transparent 70%)`, animation: "rasidPulse 2.5s ease-in-out infinite" }} />
              </div>
              <ImageWithFallback src={characterShmagh} alt="راصد يفحص" className="relative h-40 w-auto object-contain"
                                 style={{ filter: `drop-shadow(0 8px 20px ${GOLD}28)`, animation: "float-bob 3.5s ease-in-out infinite" }} />
              <div className="absolute bottom-3 inset-x-3 text-center">
                <span className="text-[10px] px-2 py-1 rounded-full" style={{ background: `${GOLD}15`, color: GOLD, fontFamily: "'Tajawal', sans-serif" }}>راصد يدير العملية</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-xl text-xs font-bold" style={{ background: "#C78B2C26", color: "#C78B2C", border: "1px solid #C78B2C30", fontFamily: "'Tajawal', sans-serif" }}>⏸ إيقاف مؤقت</button>
              <button onClick={() => { setScanning(false); setScanPct(0); }} className="flex-1 py-2 rounded-xl text-xs font-bold" style={{ background: "#B94A5526", color: "#D9728A", border: "1px solid #B94A5530", fontFamily: "'Tajawal', sans-serif" }}>◼ إيقاف</button>
            </div>
          </div>

          {/* CENTER: current site + pipeline */}
          <div className="space-y-3">
            <div className="p-4 rounded-2xl" style={{ background: "var(--card)", border: `1px solid ${GOLD}1F`, boxShadow: "var(--card-shadow)" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full" style={{ background: GOLD, animation: "status-blink 1s ease-in-out infinite" }} />
                <HudLabel color={`${GOLD}90`}>SCANNING NOW</HudLabel>
              </div>
              <p className="text-sm font-mono font-bold text-foreground mb-3">{SCAN_SITES[Math.floor(scanPct / 15) % SCAN_SITES.length]}</p>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                <div style={{ width: `${Math.min(100, (scanPct % 15) * 6.7)}%`, height: "100%", background: `linear-gradient(90deg, ${GOLD}, #3DBF7A)`, transition: "width 0.3s", boxShadow: `0 0 6px ${GOLD}80` }} />
              </div>
            </div>
            <div className="p-4 rounded-2xl space-y-1.5" style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-4 rounded-full" style={{ background: GOLD }} />
                <p className="text-xs font-bold text-foreground" style={{ fontFamily: "'Tajawal', sans-serif" }}>مراحل الفحص</p>
              </div>
              {phases.map((ph, i) => (
                <div key={i} className="flex items-center gap-2.5 py-1.5 px-2.5 rounded-xl transition-all duration-300"
                     style={{ background: ph.active ? `${GOLD}0A` : "transparent", border: `1px solid ${ph.active ? GOLD + "22" : "transparent"}` }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                       style={{ background: ph.done ? "#3DBF7A20" : ph.active ? `${GOLD}20` : "var(--muted)", border: `1px solid ${ph.done ? "#3DBF7A" : ph.active ? GOLD : "var(--border)"}` }}>
                    {ph.done ? <CheckCircle2 size={11} style={{ color: "#3DBF7A" }} /> : ph.active ? <div style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD, animation: "shimmer-pulse 0.8s ease-in-out infinite" }} /> : <span style={{ color: "var(--muted-foreground)", fontSize: 9 }}>{i + 1}</span>}
                  </div>
                  <span className="text-xs flex-1" style={{ fontFamily: "'Tajawal', sans-serif", color: ph.done ? "#3DBF7A" : ph.active ? GOLD : "var(--muted-foreground)", fontWeight: ph.active ? 600 : 400 }}>{ph.l}</span>
                  {ph.active && <span className="text-[9px] font-mono animate-pulse" style={{ color: GOLD }}>جارٍ</span>}
                  {ph.done && <CheckCircle2 size={10} style={{ color: "#3DBF7A" }} />}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: activity stream */}
          <div className="rounded-2xl flex flex-col overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}>
            <div className="px-4 py-3 flex-shrink-0 flex items-center gap-2" style={{ borderBottom: "1px solid var(--border)" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: "#3DBF7A", animation: "status-blink 1.3s ease-in-out infinite" }} />
              <p className="text-xs font-bold text-foreground" style={{ fontFamily: "'Tajawal', sans-serif" }}>سجل العمليات المباشر</p>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {Object.entries(siteProgress).map(([site, pct], i) => {
                const done = pct >= 100; const active = pct > 0 && pct < 100;
                const sc = done ? "#3DBF7A" : active ? GOLD : "#64748B";
                return (
                  <div key={site} className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-muted/40 transition-all" style={{ animation: `card-rise 0.25s ease-out ${i * 0.04}s both` }}>
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: sc, boxShadow: active ? `0 0 6px ${GOLD}` : "none", animation: active ? "shimmer-pulse 1s ease-in-out infinite" : "none" }} />
                    <span className="text-[10px] font-mono text-foreground truncate flex-1">{site}</span>
                    <span style={{ color: sc, fontFamily: "'Tajawal', sans-serif" }} className="text-[10px] font-bold">{done ? "تم" : active ? `${Math.round(pct)}%` : "—"}</span>
                  </div>
                );
              })}
              {SCAN_SITES.slice(7).map((site, i) => (
                <div key={`q-${i}`} className="flex items-center gap-2 py-1.5 px-2 rounded-lg opacity-40">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#64748B" }} />
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

  // ════════ PRE-SCAN CONSOLE ════════
  return (
    <div className="relative flex overflow-hidden" style={{ height: "calc(100vh - 48px)", zIndex: 1 }}>
      <CinematicBg page="advanced-scan" />

      {/* ═══ RIGHT: Selected-sites command panel ═══ */}
      <div className="w-60 flex-shrink-0 flex flex-col overflow-hidden relative z-10"
           style={{ borderLeft: "1px solid var(--border)", background: "var(--muted)" }}>
        <div className="px-3 py-3 flex-shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-bold text-foreground" style={{ fontFamily: "'Tajawal', sans-serif" }}>المواقع المحددة</span>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black transition-all"
                 style={{ background: selCount > 0 ? GOLD : "var(--border)", color: selCount > 0 ? NAVY_BG : "var(--muted-foreground)",
                          animation: selCount > 0 ? "count-pop 0.3s ease-out" : "none" }}>
              {selCount || 0}
            </div>
          </div>
          <HudLabel color={`${GOLD}70`}>SCAN TARGETS</HudLabel>
        </div>

        {/* Body: empty state or list */}
        <div className="flex-1 overflow-y-auto p-2.5">
          {selCount === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-2">
              <div className="relative mb-3">
                <div style={{ position: "absolute", inset: -10, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}18, transparent 70%)`, animation: "rasidPulse 3s ease-in-out infinite" }} />
                <ImageWithFallback src={characterWaving} alt="راصد" className="relative h-24 w-auto object-contain" style={{ filter: `drop-shadow(0 4px 12px ${GOLD}25)` }} />
              </div>
              <p className="text-xs font-semibold text-foreground mb-1" style={{ fontFamily: "'Tajawal', sans-serif" }}>لم تختر أي موقع بعد</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed" style={{ fontFamily: "'Tajawal', sans-serif" }}>
                اختر المواقع من التصنيفات أو أضف روابط، وسأبدأ الفحص فوراً.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {/* Enabled options chips */}
              {enabledChips.length > 0 && (
                <div>
                  <p className="text-[9px] text-muted-foreground mb-1.5 font-semibold tracking-wide" style={{ fontFamily: "'Tajawal', sans-serif" }}>الخيارات المفعّلة</p>
                  <div className="flex flex-wrap gap-1">
                    {enabledChips.map(c => (
                      <span key={c} className="text-[9px] px-1.5 py-0.5 rounded-md font-medium" style={{ background: "#3DBF7A18", color: "#3DBF7A", fontFamily: "'Tajawal', sans-serif" }}>✓ {c}</span>
                    ))}
                  </div>
                </div>
              )}
              {/* Selected domains */}
              {selectedSites.size > 0 && (
                <div className="space-y-1">
                  <p className="text-[9px] text-muted-foreground mb-1 font-semibold tracking-wide" style={{ fontFamily: "'Tajawal', sans-serif" }}>النطاقات المحددة</p>
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
                  <p className="text-[10px] text-muted-foreground" style={{ fontFamily: "'Tajawal', sans-serif" }}>محدد عبر التصنيف: <span className="font-bold" style={{ color: GOLD }}>{selCount}</span> موقع</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-3 space-y-2 flex-shrink-0" style={{ borderTop: "1px solid var(--border)" }}>
          <button onClick={() => selCount > 0 && setShowConfirm(true)} disabled={selCount === 0}
                  className="w-full py-2.5 rounded-xl text-sm font-black flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40"
                  style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_PALE})`, color: NAVY_BG, fontFamily: "'Tajawal', sans-serif", boxShadow: selCount > 0 ? `0 4px 18px ${GOLD}35` : "none" }}>
            <Play size={14} fill={NAVY_BG} /> بدء الفحص
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button className="py-1.5 rounded-lg text-[11px] font-medium text-muted-foreground hover:bg-card transition-all" style={{ border: "1px solid var(--border)", fontFamily: "'Tajawal', sans-serif" }}>جدولة</button>
            <button className="py-1.5 rounded-lg text-[11px] font-medium text-muted-foreground hover:bg-card transition-all" style={{ border: "1px solid var(--border)", fontFamily: "'Tajawal', sans-serif" }}>سجل الفحوصات</button>
          </div>
        </div>
      </div>

      {/* ═══ LEFT: Engine console ═══ */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Hero header */}
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
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#3DBF7A", animation: "status-blink 1.5s ease-in-out infinite" }} />
                <HudLabel color="#3DBF7A">SCAN COMMAND CONSOLE · ENGINE READY</HudLabel>
              </div>
              <h1 className="text-xl font-black text-white" style={{ fontFamily: "'Tajawal', sans-serif" }}>محرك الفحص الموحّد</h1>
              <p className="text-xs text-slate-400 mt-0.5" style={{ fontFamily: "'Tajawal', sans-serif" }}>مركز تشغيل الفحص الوطني — اختر المصدر، اضبط الإعدادات، ثم انطلق</p>
            </div>
            {/* الشخصية فقط — بدون شعار مكرر */}
            <ImageWithFallback src={characterShmagh} alt="راصد" className="h-16 w-auto object-contain flex-shrink-0"
                               style={{ filter: `drop-shadow(0 4px 12px ${GOLD}25)`, animation: "float-bob 4s ease-in-out infinite" }} />
          </div>
        </div>

        {/* Tab rail */}
        <div className="flex items-center gap-1 px-3 pt-3 flex-shrink-0 overflow-x-auto" style={{ borderBottom: "1px solid var(--border)" }}>
          {SCAN_TABS.map(t => {
            const on = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold whitespace-nowrap transition-all border-b-2 relative"
                      style={{ fontFamily: "'Tajawal', sans-serif", color: on ? GOLD : "var(--muted-foreground)", borderColor: on ? GOLD : "transparent" }}>
                <t.icon size={13} style={{ color: on ? GOLD : "var(--muted-foreground)" }} />
                {t.l}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-4" key={tab} style={{ animation: "fadeInPage 0.25s ease-out" }}>

          {/* ── ROUABT: Links ── */}
          {tab === "links" && (
            <div className="max-w-2xl space-y-4">
              <GlassPanel frame={false} className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Globe size={15} style={{ color: GOLD }} />
                  <h3 className="text-sm font-bold" style={{ fontFamily: "'Tajawal', sans-serif" }}>إدخال الروابط يدوياً</h3>
                </div>
                <textarea value={urlText} onChange={e => setUrlText(e.target.value)} rows={7} dir="ltr"
                          placeholder={"https://example.gov.sa\nhttps://site2.com.sa\nرابط واحد في كل سطر..."}
                          className="w-full px-4 py-3 rounded-xl text-sm font-mono resize-none focus:outline-none focus:ring-1 text-foreground placeholder:text-muted-foreground"
                          style={{ border: "1px solid var(--border)", background: "var(--input-background)" }} />
                <div className="flex items-center gap-2 mt-3">
                  <button className="px-4 py-2 rounded-lg text-sm font-bold" style={{ background: GOLD, color: NAVY_BG, fontFamily: "'Tajawal', sans-serif" }}>إضافة إلى القائمة</button>
                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted transition-all" style={{ border: "1px solid var(--border)", fontFamily: "'Tajawal', sans-serif" }}>
                    <Upload size={13} /> رفع CSV / Excel
                  </button>
                </div>
              </GlassPanel>
            </div>
          )}

          {/* ── Search ── */}
          {tab === "search" && (
            <div className="max-w-2xl space-y-4">
              <GlassPanel frame={false} className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <SearchIcon size={15} style={{ color: GOLD }} />
                  <h3 className="text-sm font-bold" style={{ fontFamily: "'Tajawal', sans-serif" }}>بحث عن المواقع</h3>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <SearchIcon size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input value={searchText} onChange={e => setSearchText(e.target.value)} dir="rtl"
                           placeholder="ابحث بالكلمة المفتاحية أو النطاق..."
                           className="w-full pr-9 pl-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 text-foreground placeholder:text-muted-foreground"
                           style={{ border: "1px solid var(--border)", background: "var(--input-background)", fontFamily: "'Tajawal', sans-serif" }} />
                  </div>
                  <button className="px-5 py-2.5 rounded-xl text-sm font-bold" style={{ background: GOLD, color: NAVY_BG, fontFamily: "'Tajawal', sans-serif" }}>بحث</button>
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
                    <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Tajawal', sans-serif" }}>ابدأ البحث للعثور على المواقع وإضافتها</p>
                  </div>
                )}
              </GlassPanel>
            </div>
          )}

          {/* ── Classifications ── */}
          {tab === "classify" && (
            <div className="space-y-4">
              <button onClick={() => { setSector("all"); setActiveCat("كل المحتوى"); }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                      style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_PALE})`, color: NAVY_BG, fontFamily: "'Tajawal', sans-serif", boxShadow: `0 4px 16px ${GOLD}30` }}>
                <CheckCircle2 size={14} fill={NAVY_BG} /> تحديد مجموع المواقع (24,983)
              </button>

              <GlassPanel frame={false} className="p-4">
                <p className="text-xs text-muted-foreground mb-2 font-semibold" style={{ fontFamily: "'Tajawal', sans-serif" }}>القطاع</p>
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  {SCAN_SECTORS.map(s => (
                    <button key={s.id} onClick={() => setSector(s.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                            style={{ fontFamily: "'Tajawal', sans-serif", background: sector === s.id ? GOLD : "var(--muted)", color: sector === s.id ? NAVY_BG : "var(--muted-foreground)" }}>
                      {s.l} <span className="opacity-70 font-mono">({s.count.toLocaleString()})</span>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mb-2 font-semibold" style={{ fontFamily: "'Tajawal', sans-serif" }}>التصنيفات</p>
                <div className="flex flex-wrap gap-1.5">
                  {SCAN_CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => setActiveCat(cat)}
                            className="px-2.5 py-1 rounded-full text-[11px] font-medium transition-all"
                            style={{ fontFamily: "'Tajawal', sans-serif", background: activeCat === cat ? "#7C6BAE" : "var(--muted)", color: activeCat === cat ? "#fff" : "var(--muted-foreground)", border: `1px solid ${activeCat === cat ? "#7C6BAE" : "transparent"}` }}>
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
                  <span className="text-[10px] text-muted-foreground" style={{ fontFamily: "'Tajawal', sans-serif" }}>{filteredSites.length} نتيجة</span>
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

          {/* ── Contains ── */}
          {tab === "contains" && (
            <div className="max-w-2xl space-y-4">
              <GlassPanel frame={false} className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Hash size={15} style={{ color: GOLD }} />
                  <h3 className="text-sm font-bold" style={{ fontFamily: "'Tajawal', sans-serif" }}>المواقع التي تحتوي على</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-3" style={{ fontFamily: "'Tajawal', sans-serif" }}>أدخل نمط نطاق أو مصطلحاً للعثور على المواقع المطابقة (مثال: gov.sa أو "خصوصية").</p>
                <input value={containsText} onChange={e => setContainsText(e.target.value)} dir="ltr" placeholder="gov.sa"
                       className="w-full px-4 py-2.5 rounded-xl text-sm font-mono focus:outline-none focus:ring-1 text-foreground placeholder:text-muted-foreground"
                       style={{ border: "1px solid var(--border)", background: "var(--input-background)" }} />
                <button className="mt-3 px-4 py-2 rounded-lg text-sm font-bold" style={{ background: GOLD, color: NAVY_BG, fontFamily: "'Tajawal', sans-serif" }}>تطبيق المطابقة</button>
              </GlassPanel>
            </div>
          )}

          {/* ── Lists ── */}
          {tab === "lists" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold" style={{ fontFamily: "'Tajawal', sans-serif" }}>القوائم المحفوظة <span className="text-muted-foreground font-normal">({SCAN_SAVED_LISTS.length})</span></h3>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: GOLD, color: NAVY_BG, fontFamily: "'Tajawal', sans-serif" }}><Plus size={12} /> قائمة جديدة</button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {SCAN_SAVED_LISTS.map((l, i) => (
                  <GlassPanel key={i} frame={false} className="p-4" style={{ animation: `card-rise 0.3s ease-out ${i * 0.07}s both` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen size={14} style={{ color: GOLD }} />
                      <p className="text-sm font-semibold text-foreground flex-1" style={{ fontFamily: "'Tajawal', sans-serif" }}>{l.name}</p>
                    </div>
                    <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Tajawal', sans-serif" }}>{l.count} موقع · {l.date}</p>
                    <button className="w-full mt-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: `${GOLD}15`, color: GOLD, fontFamily: "'Tajawal', sans-serif" }}>استخدام القائمة</button>
                  </GlassPanel>
                ))}
              </div>
            </div>
          )}

          {/* ── Settings ── */}
          {tab === "settings" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2.5">
                <p className="text-xs font-bold text-foreground mb-1" style={{ fontFamily: "'Tajawal', sans-serif" }}>خيارات الفحص</p>
                {[
                  { k: "deepScan",          l: "فحص عميق",          d: "زحف أعمق لكل صفحات الموقع" },
                  { k: "parallel",          l: "فحص متوازٍ",        d: "تشغيل عدة فحوص في آن واحد" },
                  { k: "screenshots",       l: "التقاط لقطات شاشة", d: "حفظ صورة لكل صفحة مفحوصة" },
                  { k: "extractText",       l: "استخراج النصوص",    d: "تحليل النص الكامل للصفحات" },
                  { k: "scanApps",          l: "فحص التطبيقات",     d: "كشف وتحليل تطبيقات الويب" },
                  { k: "dynamicBypass",     l: "تجاوز ديناميكي",    d: "تجاوز الحماية (Headless)" },
                  { k: "bypassUnavailable", l: "تجاوز المحتوى غير المتاح", d: "متابعة الفحص عند تعذّر الوصول" },
                ].map(opt => (
                  <div key={opt.k} className="flex items-center justify-between p-3 rounded-xl gap-3" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Tajawal', sans-serif" }}>{opt.l}</p>
                      <p className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: "'Tajawal', sans-serif" }}>{opt.d}</p>
                    </div>
                    <div onClick={() => setToggles(p => ({ ...p, [opt.k]: !(p as any)[opt.k] }))}
                         className="w-10 h-5 rounded-full relative cursor-pointer flex-shrink-0 transition-all"
                         style={{ background: (toggles as any)[opt.k] ? "#1E9E57" : "var(--border)" }}>
                      <div className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all" style={{ right: (toggles as any)[opt.k] ? "2px" : "auto", left: (toggles as any)[opt.k] ? "auto" : "2px" }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <p className="text-xs font-bold text-foreground mb-1" style={{ fontFamily: "'Tajawal', sans-serif" }}>الإعدادات الرقمية</p>
                <GlassPanel frame={false} className="p-4 space-y-3">
                  {[
                    { k: "saveInterval", l: "فاصل الحفظ التدريجي", unit: "موقع" },
                    { k: "connTimeout",  l: "مهلة الاتصال",        unit: "ثانية" },
                    { k: "depth",        l: "عمق الفحص",           unit: "مستوى" },
                    { k: "concurrency",  l: "تزامن المحرك",        unit: "خيط" },
                    { k: "pageTimeout",  l: "مهلة الصفحة",         unit: "ثانية" },
                  ].map(f => (
                    <div key={f.k} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-foreground" style={{ fontFamily: "'Tajawal', sans-serif" }}>{f.l}</p>
                        <p className="text-[10px] text-muted-foreground" style={{ fontFamily: "'Tajawal', sans-serif" }}>{f.unit}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setNums(p => ({ ...p, [f.k]: Math.max(1, (p as any)[f.k] - 1) }))} className="w-7 h-7 rounded-lg text-sm font-bold flex items-center justify-center hover:bg-muted transition-all" style={{ border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>−</button>
                        <span className="w-10 text-center text-sm font-black tabular-nums" style={{ color: GOLD, fontFamily: "'Tajawal', sans-serif" }}>{(nums as any)[f.k]}</span>
                        <button onClick={() => setNums(p => ({ ...p, [f.k]: (p as any)[f.k] + 1 }))} className="w-7 h-7 rounded-lg text-sm font-bold flex items-center justify-center hover:bg-muted transition-all" style={{ border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>+</button>
                      </div>
                    </div>
                  ))}
                </GlassPanel>
                {/* ScraperAPI status */}
                <GlassPanel frame={false} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Cpu size={14} style={{ color: TEAL }} />
                      <p className="text-sm font-bold text-foreground" style={{ fontFamily: "'Tajawal', sans-serif" }}>البروكسي الذكي · ScraperAPI</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: "#3DBF7A18", color: "#3DBF7A", fontFamily: "'Tajawal', sans-serif" }}>● متصل</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[{ l: "الرصيد المتبقي", v: "84,210" }, { l: "نجاح الطلبات", v: "99.2%" }].map(r => (
                      <div key={r.l} className="p-2 rounded-lg" style={{ background: "var(--muted)" }}>
                        <p className="text-[10px] text-muted-foreground" style={{ fontFamily: "'Tajawal', sans-serif" }}>{r.l}</p>
                        <p className="text-sm font-black" style={{ color: TEAL, fontFamily: "'Tajawal', sans-serif" }}>{r.v}</p>
                      </div>
                    ))}
                  </div>
                </GlassPanel>
                <button className="w-full py-2.5 rounded-xl text-sm font-bold" style={{ background: "#1E9E57", color: "#fff", fontFamily: "'Tajawal', sans-serif" }}>✓ تطبيق الإعدادات</button>
              </div>
            </div>
          )}

          {/* ── Schedules ── */}
          {tab === "schedules" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold" style={{ fontFamily: "'Tajawal', sans-serif" }}>الجدولات المحفوظة</h3>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: GOLD, color: NAVY_BG, fontFamily: "'Tajawal', sans-serif" }}><Plus size={12} /> جدولة جديدة</button>
              </div>
              <GlassPanel frame={false} className="p-12 flex flex-col items-center text-center">
                <div className="relative mb-3">
                  <div style={{ position: "absolute", inset: -8, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}15, transparent 70%)` }} />
                  <Calendar size={30} className="relative text-muted-foreground opacity-40" />
                </div>
                <p className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Tajawal', sans-serif" }}>لا توجد جدولات بعد</p>
                <p className="text-xs text-muted-foreground mt-1" style={{ fontFamily: "'Tajawal', sans-serif" }}>أنشئ جدولاً لأتمتة الفحوص الدورية</p>
              </GlassPanel>
            </div>
          )}

          {/* ── Launch Board ── */}
          {tab === "launch" && (
            <div className="max-w-3xl space-y-4">
              <GlassPanel frame className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Activity size={16} style={{ color: GOLD }} />
                  <h3 className="text-base font-black text-foreground" style={{ fontFamily: "'Tajawal', sans-serif" }}>لوحة الزحف — جاهزية الإطلاق</h3>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { l: "المواقع المحددة", v: String(selCount || 0), c: GOLD },
                    { l: "الخيارات المفعّلة", v: String(enabledChips.length), c: TEAL },
                    { l: "الوقت المتوقع", v: `~${Math.round((selCount || 0) * 0.1)} د`, c: "#7C6BAE" },
                  ].map(s => (
                    <div key={s.l} className="p-3 rounded-xl text-center" style={{ background: "var(--muted)" }}>
                      <div className="text-2xl font-black" style={{ color: s.c, fontFamily: "'Tajawal', sans-serif" }}>{s.v}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5" style={{ fontFamily: "'Tajawal', sans-serif" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
                {enabledChips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {enabledChips.map(c => <span key={c} className="text-[11px] px-2.5 py-1 rounded-full font-medium" style={{ background: "#3DBF7A15", color: "#3DBF7A", border: "1px solid #3DBF7A25", fontFamily: "'Tajawal', sans-serif" }}>✓ {c}</span>)}
                  </div>
                )}
                <button onClick={() => selCount > 0 && setShowConfirm(true)} disabled={selCount === 0}
                        className="w-full py-3.5 rounded-xl text-base font-black flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-40"
                        style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_PALE})`, color: NAVY_BG, fontFamily: "'Tajawal', sans-serif", boxShadow: selCount > 0 ? `0 6px 24px ${GOLD}35` : "none" }}>
                  <Play size={17} fill={NAVY_BG} /> إطلاق الفحص الآن
                </button>
              </GlassPanel>
            </div>
          )}
        </div>
      </div>

      {/* ═══ Confirmation Modal ═══ */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(3,8,16,0.78)", backdropFilter: "blur(6px)" }}>
          <div className="relative w-full max-w-md mx-4 rounded-2xl overflow-hidden"
               style={{ background: NAVY_CARD, border: `1px solid ${GOLD}28`, animation: "hero-reveal 0.3s ease-out", boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 60px ${GOLD}12` }}>
            <CommandFrame color={GOLD} size={16} opacity={0.5} inset={10} />
            <div className="absolute top-0 inset-x-0 h-[1.5px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
            <div className="absolute inset-x-0 top-0 h-16 pointer-events-none" style={{ background: `linear-gradient(180deg, ${GOLD}0C, transparent)`, animation: "hud-scanline 5s linear infinite" }} />
            {/* Character header */}
            <div className="relative flex items-center gap-3 px-5 pt-5 pb-3">
              <div className="relative flex-shrink-0">
                <div style={{ position: "absolute", inset: -6, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}25, transparent 70%)`, animation: "rasidPulse 2.5s ease-in-out infinite" }} />
                <ImageWithFallback src={characterShmagh} alt="راصد" className="relative h-16 w-auto object-contain" />
              </div>
              <div className="flex-1">
                <HudLabel color={`${GOLD}80`}>SCAN.LAUNCH // CONFIRM</HudLabel>
                <h3 className="text-base font-black text-white mt-1" style={{ fontFamily: "'Tajawal', sans-serif" }}>تأكيد إطلاق الفحص</h3>
              </div>
              <button onClick={() => setShowConfirm(false)} className="text-slate-500 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-all">✕</button>
            </div>
            <div className="relative px-5 pb-5">
              <p className="text-sm text-slate-300 mb-3" style={{ fontFamily: "'Tajawal', sans-serif" }}>
                سيقوم راصد بفحص <strong style={{ color: GOLD }}>{selCount || 483}</strong> موقع بالقدرات المحددة.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {(enabledChips.length ? enabledChips : ["فحص عميق", "استخراج النصوص"]).map(c => (
                  <span key={c} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: "#3DBF7A18", color: "#3DBF7A", border: "1px solid #3DBF7A28", fontFamily: "'Tajawal', sans-serif" }}>✓ {c}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 mb-5 text-xs text-slate-400" style={{ fontFamily: "'Tajawal', sans-serif" }}>
                <Clock size={12} /> الوقت المتوقع: ~{Math.round((selCount || 483) * 0.1)} دقيقة
              </div>
              <button onClick={startScan} className="w-full py-3.5 rounded-xl text-base font-black flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all"
                      style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_PALE})`, color: NAVY_BG, fontFamily: "'Tajawal', sans-serif", boxShadow: `0 4px 20px ${GOLD}40` }}>
                <Play size={16} fill={NAVY_BG} /> تأكيد وبدء الفحص
              </button>
              <button onClick={() => setShowConfirm(false)} className="w-full mt-2 py-2 text-sm text-slate-400 hover:text-white transition-all" style={{ fontFamily: "'Tajawal', sans-serif" }}>إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PAGE 6: Sites (Monitoring) ───────────────────────────────────────────────
function SitesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ComplianceStatus | "all">("all");
  const filters: { key: ComplianceStatus | "all"; label: string }[] = [
    { key: "all", label: "الكل" }, { key: "compliant", label: "ممتثل" }, { key: "non-compliant", label: "غير ممتثل" },
    { key: "partial", label: "جزئياً" }, { key: "review", label: "مراجعة" }, { key: "inactive", label: "لا يعمل" },
  ];
  const counts: Record<string, number> = {
    all: WEBSITES.length,
    compliant: WEBSITES.filter(w => w.status === "compliant").length,
    "non-compliant": WEBSITES.filter(w => w.status === "non-compliant").length,
    partial: WEBSITES.filter(w => w.status === "partial").length,
    review: WEBSITES.filter(w => w.status === "review").length,
    inactive: WEBSITES.filter(w => w.status === "inactive").length,
  };
  const filtered = WEBSITES.filter(w => {
    const ms = search === "" || w.name.includes(search) || w.url.includes(search);
    const mf = statusFilter === "all" || w.status === statusFilter;
    return ms && mf;
  });
  return (
    <div className="relative p-5 space-y-4" style={{ zIndex: 1 }}>
      <CinematicBg page="sites" />
      <HeroBanner page="sites" title="المواقع" subtitle="قائمة بجميع المواقع السعودية المرصودة وحالة امتثالها" badge={`${WEBSITES.length} موقع نشط`}
                  actions={<>
                    <button style={{ border: `1px solid ${GOLD}30`, color: GOLD, fontFamily: "'Tajawal', sans-serif" }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs hover:opacity-80"><Download size={12} /> تصدير</button>
                    <button style={{ background: GOLD, color: NAVY_BG, fontFamily: "'Tajawal', sans-serif" }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"><Plus size={12} /> إضافة موقع</button>
                  </>} />
      <div className="flex items-center gap-2 flex-wrap">
        {filters.map(({ key, label }) => (
          <button key={key} onClick={() => setStatusFilter(key)}
                  style={statusFilter === key ? { background: GOLD, color: NAVY_BG, fontFamily: "'Tajawal', sans-serif", border: `1px solid ${GOLD}` }
                    : { border: "1px solid var(--border)", fontFamily: "'Tajawal', sans-serif" }}
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
                 style={{ border: "1px solid var(--border)", background: "var(--card)", fontFamily: "'Tajawal', sans-serif" }} />
        </div>
      </div>
      <PCard goldTop>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["الموقع", "القطاع", "حالة الامتثال", "درجة الامتثال", "آخر فحص", "الإجراءات"].map(h => (
                  <th key={h} style={{ fontFamily: "'Tajawal', sans-serif" }} className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((site, i) => {
                const sc = site.score >= 80 ? "#1E9E57" : site.score >= 50 ? "#C78B2C" : site.score > 0 ? "#B94A55" : "#64748B";
                return (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors" style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none", animation: `card-rise 0.3s ease-out ${i * 0.04}s both` }}>
                    <td className="px-4 py-3">
                      <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-medium text-foreground">{site.name}</p>
                      <p className="text-xs text-muted-foreground font-mono mt-0.5">{site.url}</p>
                    </td>
                    <td className="px-4 py-3"><span style={{ fontFamily: "'Tajawal', sans-serif", background: "var(--muted)" }} className="text-xs text-muted-foreground px-2 py-0.5 rounded-md">{site.sector}</span></td>
                    <td className="px-4 py-3"><ComplianceBadge status={site.status} /></td>
                    <td className="px-4 py-3">
                      {site.score > 0 ? (
                        <div className="flex items-center gap-2 min-w-[90px]">
                          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                            <div className="h-full rounded-full" style={{ width: `${site.score}%`, background: sc }} />
                          </div>
                          <span className="text-xs font-mono text-muted-foreground w-6">{site.score}</span>
                        </div>
                      ) : <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="px-4 py-3"><span style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground">{site.lastScan}</span></td>
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
          <span style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground">عرض {filtered.length} من {WEBSITES.length}</span>
          <div className="flex gap-1">{[1, 2, 3].map(n => <button key={n} className={`w-7 h-7 rounded-lg text-xs ${n === 1 ? "text-[#04091C] font-bold" : "text-muted-foreground hover:bg-muted"}`} style={n === 1 ? { background: GOLD } : {}}>{n}</button>)}</div>
        </div>
      </PCard>
    </div>
  );
}

// ─── PAGE 7: Mobile Apps ──────────────────────────────────────────────────────
function MobileAppsPage() {
  return (
    <div className="relative p-5 space-y-4" style={{ zIndex: 1 }}>
      <CinematicBg page="mobile-apps" />
      <PageHeader title="رصد تطبيقات الأجهزة الذكية" subtitle="رصد ومراقبة امتثال تطبيقات الجوال للوائح الخصوصية" icon={Smartphone}
                  actions={<button style={{ background: GOLD, color: NAVY_BG, fontFamily: "'Tajawal', sans-serif" }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"><Plus size={12} /> إضافة تطبيق</button>} />
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "إجمالي التطبيقات", value: "38", icon: Smartphone,   color: GOLD    },
          { label: "ممتثل",             value: "14", icon: CheckCircle2, color: "#1E9E57" },
          { label: "ممتثل جزئياً",     value: "11", icon: AlertCircle,  color: "#C78B2C" },
          { label: "غير ممتثل",        value: "7",  icon: WifiOff,      color: "#B94A55" },
        ].map((k, i) => <SmallKPI key={i} {...k} delay={i * 0.07} />)}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {MOBILE_APPS.map((app, i) => {
          const sc = app.score >= 80 ? "#1E9E57" : app.score >= 50 ? "#C78B2C" : "#B94A55";
          return (
            <PCard key={i} goldTop className="p-4" style={{ animation: `card-rise 0.35s ease-out ${i * 0.06}s both` }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-bold text-foreground">{app.name}</p>
                  <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground">{app.org}</p>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                     style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
                  <Smartphone size={16} className="text-muted-foreground" />
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <ComplianceBadge status={app.status} />
                <span style={{ fontFamily: "'Tajawal', sans-serif", color: sc }} className="text-xl font-black">{app.score}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                <div className="h-full rounded-full" style={{ width: `${app.score}%`, background: sc }} />
              </div>
              <button className="w-full mt-3 py-1.5 rounded-lg text-xs border text-muted-foreground hover:bg-muted transition-all"
                      style={{ border: "1px solid var(--border)", fontFamily: "'Tajawal', sans-serif" }}>○ فحص</button>
            </PCard>
          );
        })}
      </div>
    </div>
  );
}

// ─── PAGE 8: Scan History ─────────────────────────────────────────────────────
function ScanHistoryPage() {
  return (
    <div className="relative p-5 space-y-4" style={{ zIndex: 1 }}>
      <CinematicBg page="scan-history" />
      <PageHeader title="سجل الفحوصات" subtitle="متابعة جميع عمليات الفحص السابقة وإعادة فتح شاشات التنفيذ" icon={History} />
      <div className="grid grid-cols-4 gap-4">
        {[{ label: "إجمالي الفحوصات", value: "34", icon: Activity, color: GOLD },
          { label: "قيد التنفيذ", value: "2", icon: Timer, color: TEAL },
          { label: "مكتمل", value: "30", icon: CheckCircle2, color: "#1E9E57" },
          { label: "فاشل / ملغي", value: "2", icon: AlertCircle, color: "#B94A55" }].map((k, i) => <SmallKPI key={i} {...k} delay={i * 0.07} />)}
      </div>
      <PCard goldTop>
        {SCAN_HISTORY.map((scan, i) => (
          <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-all"
               style={{ borderBottom: i < SCAN_HISTORY.length - 1 ? "1px solid var(--border)" : "none", animation: `card-rise 0.3s ease-out ${i * 0.06}s both` }}>
            <div>
              <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold text-foreground">{scan.title}</p>
              <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground mt-0.5">{scan.date} · {scan.sites} موقع · {scan.duration}</p>
            </div>
            <div className="flex items-center gap-3">
              <ComplianceBadge status={scan.status} />
              <button style={{ border: "1px solid var(--border)", fontFamily: "'Tajawal', sans-serif" }} className="px-3 py-1 rounded-lg text-xs text-muted-foreground hover:bg-muted">فتح</button>
            </div>
          </div>
        ))}
      </PCard>
    </div>
  );
}

// ─── PAGE 9: Scan Library ─────────────────────────────────────────────────────
function ScanLibraryPage() {
  const libs = WEBSITES.map(w => ({ domain: w.url, name: w.name, score: w.score, status: w.status }));
  return (
    <div className="relative p-5 space-y-4" style={{ zIndex: 1 }}>
      <CinematicBg page="scan-library" />
      <HeroBanner page="scan-library" title="مكتبة الفحوصات" subtitle="أرشيف شامل لجميع عمليات الفحص مع لقطات الشاشة الفعلية" badge="1,183 فحص"
                  actions={<button style={{ background: GOLD, color: NAVY_BG, fontFamily: "'Tajawal', sans-serif" }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"><Download size={12} /> تصدير Excel</button>} />
      <div className="grid grid-cols-3 gap-4">
        {libs.map((lib, i) => {
          const sc = lib.score >= 80 ? "#1E9E57" : lib.score >= 50 ? "#C78B2C" : lib.score > 0 ? "#B94A55" : "#64748B";
          return (
            <PCard key={i} goldTop className="overflow-hidden" style={{ animation: `card-rise 0.35s ease-out ${i * 0.05}s both` }}>
              <div className="relative h-28 flex items-center justify-center" style={{ background: "var(--muted)" }}>
                <Globe size={28} className="text-muted-foreground opacity-40" />
                <div className="absolute top-2 left-2"><ComplianceBadge status={lib.status} /></div>
              </div>
              <div className="p-3">
                <p className="text-sm font-mono text-foreground">{lib.domain}</p>
                <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground">{lib.name}</p>
                <div className="flex items-center justify-between mt-2">
                  <span style={{ color: sc, fontFamily: "'Tajawal', sans-serif" }} className="text-lg font-black">{lib.score}%</span>
                  <span style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground">البنود المحققة 5/9</span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden mt-1" style={{ background: "var(--muted)" }}>
                  <div className="h-full rounded-full" style={{ width: `${lib.score}%`, background: sc }} />
                </div>
              </div>
            </PCard>
          );
        })}
      </div>
    </div>
  );
}

// ─── PAGE 10: Scan Schedules ──────────────────────────────────────────────────
function ScanSchedulesPage() {
  return (
    <div className="relative p-5 space-y-4" style={{ zIndex: 1 }}>
      <CinematicBg page="scan-schedules" />
      <PageHeader title="جدولة الفحص الدوري" subtitle="إعداد فحوصات تلقائية دورية للمواقع والتطبيقات" icon={Calendar}
                  actions={<button style={{ background: GOLD, color: NAVY_BG, fontFamily: "'Tajawal', sans-serif" }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"><Plus size={12} /> جدولة جديدة</button>} />
      <PCard goldTop className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1E9E57] animate-pulse" />
            <span style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold text-foreground">محرك الجدولة التلقائية</span>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${TEAL}15`, color: TEAL, fontFamily: "'Tajawal', sans-serif" }}>يعمل</span>
          </div>
          <button style={{ border: "1px solid #B94A55", color: "#B94A55", fontFamily: "'Tajawal', sans-serif" }} className="px-3 py-1 rounded-lg text-xs hover:bg-[#B94A55]/10">⏸ إيقاف المحرك</button>
        </div>
        <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground mt-1">يفحص الجدولات كل 5 دقائق · آخر فحص 9:55:00 ص</p>
      </PCard>
      <div className="space-y-3">
        {SCHEDULED_REPORTS.map((s, i) => (
          <PCard key={i} goldTop className="p-4" style={{ animation: `card-rise 0.35s ease-out ${i * 0.06}s both` }}>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold text-foreground">{s.title}</p>
                <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground">{s.freq} · التشغيل القادم: {s.next}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${s.active ? "text-[#1E9E57] bg-[#1E9E57]/10" : "text-muted-foreground bg-muted"}`}
                      style={{ fontFamily: "'Tajawal', sans-serif" }}>
                  {s.active ? "● نشط" : "متوقف"}
                </span>
                <button style={{ border: "1px solid var(--border)", fontFamily: "'Tajawal', sans-serif", color: "#1E9E57" }} className="px-2 py-1 rounded-lg text-xs hover:bg-muted">▷ تنفيذ</button>
              </div>
            </div>
          </PCard>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE 11: Cases ───────────────────────────────────────────────────────────
function CasesPage() {
  const priorityColor = (p: string) => p === "high" ? "#B94A55" : p === "medium" ? TEAL : "#64748B";
  const priorityLabel = (p: string) => p === "high" ? "عالية" : p === "medium" ? "متوسطة" : "منخفضة";
  return (
    <div className="relative p-5 space-y-4" style={{ zIndex: 1 }}>
      <CinematicBg page="cases" />
      <PageHeader title="إدارة الحالات" subtitle="متابعة حالات عدم الامتثال وإدارة سير العمل" icon={Folder}
                  actions={<button style={{ background: GOLD, color: NAVY_BG, fontFamily: "'Tajawal', sans-serif" }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"><Plus size={12} /> حالة جديدة</button>} />
      <div className="grid grid-cols-4 gap-4">
        {[{ label: "مفتوحة", value: "3", icon: Folder, color: "#B94A55" }, { label: "قيد المعالجة", value: "5", icon: Timer, color: TEAL }, { label: "محلولة", value: "2", icon: CheckCircle2, color: "#1E9E57" }, { label: "مغلقة", value: "2", icon: Lock, color: "#64748B" }].map((k, i) => <SmallKPI key={i} {...k} delay={i * 0.07} />)}
      </div>
      <div className="space-y-3">
        {CASES.map((c, i) => (
          <PCard key={i} goldTop className="p-4" style={{ animation: `card-rise 0.35s ease-out ${i * 0.07}s both` }}>
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: `${priorityColor(c.priority)}15`, color: priorityColor(c.priority), fontFamily: "'Tajawal', sans-serif" }}>
                    {priorityLabel(c.priority)}
                  </span>
                </div>
                <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold text-foreground">{c.title}</p>
                <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground mt-1">{c.date} · {c.assigned}</p>
              </div>
              <ComplianceBadge status={c.status} />
            </div>
          </PCard>
        ))}
      </div>
    </div>
  );
}

// ─── Simple page wrapper ──────────────────────────────────────────────────────
function SimplePage({ page, title, subtitle, icon, kpis, children, useHero = false }: {
  page: Page; title: string; subtitle: string; icon?: React.ElementType;
  kpis?: { label: string; value: string; icon: React.ElementType; color: string }[];
  children?: React.ReactNode; useHero?: boolean;
}) {
  return (
    <div className="relative p-5 space-y-4" style={{ zIndex: 1 }}>
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

// ─── PAGE 12: PDF Reports ─────────────────────────────────────────────────────
function PdfReportsPage() {
  return (
    <SimplePage page="pdf-reports" title="تقارير PDF التلقائية" subtitle="إنشاء تقارير دورية بصيغة احترافية PDF" icon={FileText} useHero>
      <div className="grid grid-cols-3 gap-4">
        <PCard goldTop className="p-5 space-y-3">
          <button className="w-full py-3 rounded-xl text-sm font-bold hover:opacity-90"
                  style={{ background: NAVY_CARD, border: `1px solid ${GOLD}30`, color: GOLD, fontFamily: "'Tajawal', sans-serif" }}>
            📄 إنشاء التقرير
          </button>
          <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground text-center">سيتم إنشاء تقرير يتضمن 1 قسم</p>
          <div style={{ borderTop: "1px solid var(--border)" }} className="pt-3">
            <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold mb-2">سجل التقارير</p>
            {["تقرير الامتثال الشهري", "مقارنة القطاعات الأسبوعية", "التقرير السنوي الشامل"].map((r, i) => (
              <div key={i} className="flex items-center gap-2 py-2" style={{ borderBottom: "1px solid var(--border)" }}>
                <FileText size={12} style={{ color: GOLD }} />
                <span style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-foreground flex-1">{r}</span>
                <span style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-[10px] text-muted-foreground">PDF</span>
              </div>
            ))}
          </div>
        </PCard>
        <div className="col-span-2 space-y-3">
          <PCard goldTop className="p-5">
            <label style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground mb-1.5 block">عنوان التقرير</label>
            <input defaultValue="تقرير راصد الشامل" className="w-full px-3 py-2 rounded-lg text-sm text-foreground focus:outline-none"
                   style={{ border: "1px solid var(--border)", background: "var(--muted)", fontFamily: "'Tajawal', sans-serif" }} />
          </PCard>
          <PCard goldTop className="p-5">
            <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold mb-3">أقسام التقرير</p>
            {[{ l: "ملخص الامتثال", checked: true }, { l: "مقارنة القطاعات", checked: false }, { l: "تحليل البنود (المادة 12)", checked: false }, { l: "تفاصيل المواقع", checked: false }, { l: "تحليل الاتجاهات", checked: false }].map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted cursor-pointer" style={{ border: s.checked ? `1px solid ${GOLD}30` : "1px solid transparent" }}>
                <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                     style={{ background: s.checked ? GOLD : "var(--muted)", border: `1px solid ${s.checked ? GOLD : "var(--border)"}` }}>
                  {s.checked && <CheckCircle2 size={10} style={{ color: NAVY_BG }} />}
                </div>
                <span style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm text-foreground">{s.l}</span>
              </div>
            ))}
          </PCard>
        </div>
      </div>
    </SimplePage>
  );
}

// ─── PAGE 13: Custom Reports ──────────────────────────────────────────────────
function CustomReportsPage() {
  const modules = [
    { l: "بنود المادة 12",       c: GOLD,      checked: true,  icon: Hash },
    { l: "تفاصيل الامتثال",     c: TEAL,      checked: false, icon: Shield },
    { l: "الإحصائيات العامة",   c: "#1E9E57", checked: true,  icon: BarChart3 },
    { l: "تفاصيل المواقع",      c: "#7C6BAE", checked: false, icon: Globe },
    { l: "تحليل التصنيفات",     c: "#C78B2C", checked: false, icon: Layers },
    { l: "مقارنة القطاعات",     c: "#B94A55", checked: false, icon: ArrowLeftRight },
  ];
  return (
    <SimplePage page="custom-reports" title="تصدير تقارير مخصصة" subtitle="اختر البيانات والفترة الزمنية وصيغة التصدير" icon={Download}>
      <div className="space-y-4">
        <PCard goldTop className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={14} style={{ color: GOLD }} />
            <h3 style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold">الفترة الزمنية</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["من تاريخ", "إلى تاريخ"].map(l => (
              <div key={l}>
                <label style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground mb-1 block">{l}</label>
                <input type="text" placeholder="mm/dd/yyyy" className="w-full px-3 py-2 rounded-lg text-sm text-foreground focus:outline-none"
                       style={{ border: "1px solid var(--border)", background: "var(--muted)", fontFamily: "monospace" }} />
              </div>
            ))}
          </div>
        </PCard>
        <PCard goldTop className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Clipboard size={14} style={{ color: GOLD }} />
            <h3 style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold">وحدات البيانات</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {modules.map((m, i) => (
              <div key={i} className="p-3 rounded-xl cursor-pointer hover:bg-muted/50 transition-all"
                   style={{ border: `1px solid ${m.checked ? m.c : "var(--border)"}`, background: m.checked ? `${m.c}08` : "var(--card)",
                            animation: `card-rise 0.35s ease-out ${i * 0.06}s both` }}>
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${m.c}15` }}>
                    <m.icon size={14} style={{ color: m.c }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p style={{ fontFamily: "'Tajawal', sans-serif", color: m.checked ? m.c : "" }} className="text-xs font-semibold">{m.l}</p>
                    {m.checked && <CheckCircle2 size={10} style={{ color: m.c }} className="mt-1" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PCard>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {[{ l: "تصدير PowerPoint", c: "#C78B2C" }, { l: "تصدير Excel", c: "#1E9E57" }, { l: "تصدير PDF", c: "#B94A55" }].map(b => (
              <button key={b.l} style={{ background: b.c, color: "#fff", fontFamily: "'Tajawal', sans-serif" }} className="px-4 py-2 rounded-lg text-xs font-bold hover:opacity-90 transition-opacity">{b.l}</button>
            ))}
          </div>
          <button style={{ border: "1px solid var(--border)", fontFamily: "'Tajawal', sans-serif" }} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs text-muted-foreground hover:bg-muted">
            <Eye size={12} /> معاينة البيانات
          </button>
        </div>
      </div>
    </SimplePage>
  );
}

// ─── PAGE 14: Scheduled Reports ───────────────────────────────────────────────
function ScheduledReportsPage() {
  return (
    <SimplePage page="scheduled-reports" title="تقارير مجدولة" subtitle="إدارة التقارير التلقائية المجدولة حسب الوقت" icon={Calendar}
                kpis={[{ label: "تقارير نشطة", value: "9", icon: CheckCircle2, color: "#1E9E57" }, { label: "متوقفة", value: "3", icon: Clock, color: "#64748B" }, { label: "اليوم", value: "2", icon: Timer, color: GOLD }, { label: "هذا الشهر", value: "14", icon: FileText, color: TEAL }]}>
      <div className="grid grid-cols-3 gap-4">
        {SCHEDULED_REPORTS.map((r, i) => (
          <PCard key={i} goldTop className="p-4" style={{ animation: `card-rise 0.35s ease-out ${i * 0.07}s both` }}>
            <div className="flex items-start justify-between mb-2">
              <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold text-foreground flex-1 min-w-0">{r.title}</p>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0 ms-2 ${r.active ? "text-[#1E9E57] bg-[#1E9E57]/10" : "text-muted-foreground bg-muted"}`}
                    style={{ fontFamily: "'Tajawal', sans-serif" }}>{r.active ? "نشط" : "متوقف"}</span>
            </div>
            {[{ l: "التكرار", v: r.freq }, { l: "التشغيل القادم", v: r.next }].map(f => (
              <div key={f.l} className="flex items-center justify-between text-xs py-1">
                <span style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-muted-foreground">{f.l}</span>
                <span style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-foreground">{f.v}</span>
              </div>
            ))}
            <div className="flex gap-2 mt-3">
              <button style={{ background: r.active ? "#B94A55" : "#1E9E57", color: "#fff", fontFamily: "'Tajawal', sans-serif" }} className="flex-1 py-1 rounded-lg text-xs font-medium">{r.active ? "⏸ إيقاف" : "▷ تفعيل"}</button>
            </div>
          </PCard>
        ))}
      </div>
    </SimplePage>
  );
}

// ─── PAGE 15: Message Templates ───────────────────────────────────────────────
function MessageTemplatesPage() {
  const templates = [
    { title: "إشعار عدم امتثال",           type: "تنبيه",  typeColor: "#B94A55" },
    { title: "إشعار امتثال جزئي",          type: "تنبيه",  typeColor: "#C78B2C" },
    { title: "شهادة تحقيق الامتثال",       type: "شهادة",  typeColor: "#1E9E57" },
    { title: "رسالة متابعة",               type: "متابعة", typeColor: TEAL       },
    { title: "إشعار تصعيد",               type: "تصعيد",  typeColor: "#B94A55" },
    { title: "تذكير بالموعد النهائي",      type: "تذكير",  typeColor: "#C78B2C" },
  ];
  return (
    <SimplePage page="message-templates" title="قوالب الرسائل" subtitle="إدارة قوالب الرسائل والإشعارات الآلية" icon={Mail}
                kpis={[{ label: "قوالب نشطة", value: "13", icon: Mail, color: GOLD }, { label: "مرسلة هذا الشهر", value: "247", icon: Send, color: "#1E9E57" }, { label: "قوالب جديدة", value: "3", icon: Plus, color: TEAL }, { label: "المتوسط اليومي", value: "8", icon: Activity, color: "#C78B2C" }]}>
      <div className="grid grid-cols-2 gap-4">
        {templates.map((t, i) => (
          <PCard key={i} goldTop className="p-4" style={{ animation: `card-rise 0.35s ease-out ${i * 0.06}s both` }}>
            <div className="flex items-center gap-3 mb-3">
              <Mail size={14} style={{ color: GOLD }} />
              <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold text-foreground flex-1">{t.title}</p>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
                    style={{ background: `${t.typeColor}15`, color: t.typeColor, fontFamily: "'Tajawal', sans-serif" }}>{t.type}</span>
            </div>
            <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground">السلام عليكم، نُعلمكم بنتيجة مراجعة مستوى الامتثال...</p>
            <div className="flex gap-1.5 mt-3 flex-wrap">
              {["{{entity_name}}", "{{site_url}}", "{{deadline}}"].map(v => (
                <span key={v} className="text-[10px] px-1.5 py-0.5 rounded font-mono" style={{ background: "#7C6BAE20", color: "#7C6BAE" }}>{v}</span>
              ))}
            </div>
          </PCard>
        ))}
      </div>
    </SimplePage>
  );
}

// ─── PAGE 16: Letters ─────────────────────────────────────────────────────────
function LettersPage() {
  const letters = [
    { num: "RASID-LTR-2026-000101", org: "وزارة التعليم",  subject: "طلب تحديث سياسة الخصوصية",       status: "partial"       as ComplianceStatus, date: "7 محرم 1448" },
    { num: "RASID-LTR-2026-000100", org: "شركة نون",       subject: "إنذار بعدم الامتثال — المرحلة 2", status: "non-compliant" as ComplianceStatus, date: "6 محرم 1448" },
    { num: "RASID-LTR-2026-000099", org: "وزارة الصحة",   subject: "شهادة الامتثال 2025-2026",        status: "compliant"     as ComplianceStatus, date: "5 محرم 1448" },
    { num: "RASID-LTR-2026-000098", org: "البنك الأهلي",  subject: "متابعة خطة التحسين",              status: "review"        as ComplianceStatus, date: "4 محرم 1448" },
  ];
  return (
    <SimplePage page="letters" title="الخطابات الرسمية" subtitle="مركز إدارة الخطابات والمراسلات الرسمية مع رموز QR للتحقق" icon={Send}
                kpis={[{ label: "الإجمالي", value: "14", icon: FileText, color: GOLD }, { label: "مُرسلة", value: "3", icon: Send, color: TEAL }, { label: "تم الرد", value: "3", icon: CheckCircle2, color: "#1E9E57" }, { label: "متأخرة", value: "3", icon: AlertTriangle, color: "#B94A55" }]}>
      <PCard goldTop>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["رقم الخطاب", "الجهة", "الموضوع", "الحالة", "التاريخ", "إجراءات"].map(h => (
                <th key={h} style={{ fontFamily: "'Tajawal', sans-serif" }} className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {letters.map((l, i) => (
              <tr key={i} className="hover:bg-muted/20 transition-colors" style={{ borderBottom: i < letters.length - 1 ? "1px solid var(--border)" : "none", animation: `card-rise 0.3s ease-out ${i * 0.06}s both` }}>
                <td className="px-4 py-3"><span className="text-xs font-mono text-muted-foreground">{l.num}</span></td>
                <td className="px-4 py-3"><span style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm text-foreground">{l.org}</span></td>
                <td className="px-4 py-3"><span style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground">{l.subject}</span></td>
                <td className="px-4 py-3"><ComplianceBadge status={l.status} /></td>
                <td className="px-4 py-3"><span style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground">{l.date}</span></td>
                <td className="px-4 py-3"><div className="flex gap-1"><button className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted transition-all"><Eye size={12} /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </PCard>
    </SimplePage>
  );
}

// ─── PAGE 17: Export Data ─────────────────────────────────────────────────────
function ExportDataPage() {
  const exports = [
    { l: "القطاعات",        d: "بيانات الامتثال حسب القطاعات",    c: TEAL    },
    { l: "بنود المادة 12",  d: "تفاصيل الامتثال لكل بند",          c: GOLD    },
    { l: "الرصد العام",     d: "ملخص شامل لحالة الامتثال",         c: "#1E9E57" },
    { l: "تصدير شامل",      d: "جميع البيانات في ملف متعدد الأوراق", c: "#7C6BAE" },
    { l: "التصنيفات",       d: "بيانات الامتثال حسب تصنيف المواقع", c: "#C78B2C" },
  ];
  return (
    <SimplePage page="export-data" title="مركز تصدير البيانات" subtitle="تصدير بيانات الامتثال والفحوصات بتنسيقات متعددة" icon={Package}>
      <div className="grid grid-cols-3 gap-4">
        {exports.map((e, i) => (
          <PCard key={i} goldTop className="p-5 text-center" style={{ animation: `card-rise 0.35s ease-out ${i * 0.08}s both` }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: `${e.c}15`, border: `1px solid ${e.c}30` }}>
              <Download size={20} style={{ color: e.c }} />
            </div>
            <h3 style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-bold text-foreground mb-1">{e.l}</h3>
            <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground mb-4">{e.d}</p>
            <button className="w-full py-2 rounded-lg text-xs font-bold hover:opacity-90 transition-opacity"
                    style={{ background: e.c, color: "#fff", fontFamily: "'Tajawal', sans-serif" }}>📄 تصدير Excel</button>
          </PCard>
        ))}
      </div>
      <div className="p-4 rounded-xl flex items-center gap-3" style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
        <Shield size={16} className="text-muted-foreground flex-shrink-0" />
        <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground">
          <strong>ملاحظة مهمة:</strong> جميع البيانات المُصدّرة تحتوي على معلومات حساسة. يُرجى التعامل معها بسرية تامة.
        </p>
      </div>
    </SimplePage>
  );
}

// ─── PAGE 18: Improvement Tracker ────────────────────────────────────────────
function ImprovementTrackerPage() {
  return (
    <SimplePage page="improvement-tracker" title="متتبع التحسينات" subtitle="توصيات ذكية لتحسين مستوى الامتثال بناءً على نتائج الفحوصات" icon={TrendingUp}>
      <PCard goldTop className="p-12 text-center" style={{ animation: "card-rise 0.4s ease-out 0.1s both" }}>
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
          <Zap size={26} className="text-muted-foreground" style={{ animation: "shimmer-pulse 2s ease-in-out infinite" }} />
        </div>
        <h2 style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xl font-bold text-foreground mb-2">لا توجد توصيات بعد</h2>
        <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
          انقر على زر "توليد التوصيات" لبدء تحليل بيانات الامتثال وإنشاء خطة تحسين ذكية مخصصة
        </p>
        <button className="px-8 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
                style={{ background: GOLD, color: NAVY_BG, fontFamily: "'Tajawal', sans-serif" }}>
          ✦ توليد التوصيات
        </button>
      </PCard>
    </SimplePage>
  );
}

// ─── PAGE 19: Advanced Analytics ─────────────────────────────────────────────
function AdvancedAnalyticsPage() {
  const [tab, setTab] = useState(0);
  const tabs = ["اتجاهات الامتثال", "التحليل القطاعي", "الخريطة الرادارية", "بنود المادة 12"];
  return (
    <div className="relative p-5 space-y-4" style={{ zIndex: 1 }}>
      <CinematicBg page="advanced-analytics" />
      <HeroBanner page="advanced-analytics" title="التحليلات المتقدمة" subtitle="اتجاهات الامتثال الشهرية مع مقارنة بين القطاعات والتصنيفات" />
      <div className="flex items-center gap-1 p-1 rounded-xl w-fit" style={{ background: "var(--muted)" }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)} style={{ fontFamily: "'Tajawal', sans-serif" }}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${tab === i ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>{t}</button>
        ))}
      </div>
      {tab === 0 && (
        <div className="grid grid-cols-2 gap-4">
          <PCard goldTop className="p-5">
            <h3 style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold mb-4">اتجاه الامتثال الشهري</h3>
            <div dir="ltr">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={TREND_DATA} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#64748B", fontFamily: "Tajawal" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={TT} />
                  <Line id="an-c" name="line-compliant-an" type="linear" dataKey="ممتثل" stroke="#1E9E57" strokeWidth={2.5} dot={{ fill: "#1E9E57", r: 3, strokeWidth: 0 }} activeDot={{ r: 4 }} />
                  <Line id="an-p" name="line-partial-an" type="basis" dataKey="جزئياً" stroke="#C78B2C" strokeWidth={2.5} dot={{ fill: "#C78B2C", r: 3, strokeWidth: 0 }} activeDot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </PCard>
          <PCard goldTop className="p-5">
            <h3 style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold mb-4">توزيع المواقع</h3>
            <div dir="ltr">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={TREND_DATA} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#64748B", fontFamily: "Tajawal" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={TT} />
                  <Bar name="bar-ممتثل-1" dataKey="ممتثل" fill="#1E9E57" fillOpacity={0.85} radius={[3, 3, 0, 0]} />
                  <Bar name="bar-جزئياً-2" dataKey="جزئياً" fill="#C78B2C" fillOpacity={0.85} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </PCard>
        </div>
      )}
      {tab === 1 && (
        <PCard goldTop className="p-5">
          <h3 style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold mb-4">الامتثال بحسب القطاع</h3>
          <div dir="ltr">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={SECTOR_DATA} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="sector" tick={{ fontSize: 11, fill: "#64748B", fontFamily: "Tajawal" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TT} />
                <Legend wrapperStyle={{ fontFamily: "Tajawal", fontSize: "11px" }} />
                <Bar name="bar-ممتثل-3" dataKey="ممتثل" fill="#1E9E57" fillOpacity={0.88} radius={[2, 2, 0, 0]} stackId="s" />
                <Bar name="bar-جزئياً-4" dataKey="جزئياً" fill="#C78B2C" fillOpacity={0.88} stackId="s" />
                <Bar name="bar-غير_ممتثل-5" dataKey="غير ممتثل" fill="#B94A55" fillOpacity={0.88} radius={[2, 2, 0, 0]} stackId="s" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </PCard>
      )}
      {tab === 2 && (
        <PCard goldTop className="p-5">
          <h3 style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold mb-4">خريطة الامتثال الرادارية</h3>
          <div dir="ltr">
            <ResponsiveContainer width="100%" height={340}>
              <RadarChart data={RADAR_DATA} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: "#64748B", fontFamily: "Tajawal" }} />
                <Radar name="الامتثال الحالي" dataKey="A" stroke={GOLD} fill={GOLD} fillOpacity={0.18} strokeWidth={2} />
                <Tooltip contentStyle={TT} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </PCard>
      )}
      {tab === 3 && (
        <PCard goldTop className="p-5">
          <h3 style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold mb-4">تحليل بنود المادة 12</h3>
          <div className="space-y-3">
            {RADAR_DATA.map((r, i) => (
              <div key={i} className="flex items-center gap-4">
                <span style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm text-foreground w-32 flex-shrink-0">{r.subject}</span>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${r.A}%`, background: r.A >= 60 ? "#1E9E57" : r.A >= 40 ? "#C78B2C" : "#B94A55", animation: `card-rise 0.5s ease-out ${i * 0.08}s both` }} />
                </div>
                <span style={{ color: r.A >= 60 ? "#1E9E57" : r.A >= 40 ? "#C78B2C" : "#B94A55", fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-bold w-10 text-left">{r.A}%</span>
              </div>
            ))}
          </div>
        </PCard>
      )}
    </div>
  );
}

// ─── PAGE 20: Sector Comparison ───────────────────────────────────────────────
function SectorComparisonPage() {
  return (
    <div className="relative p-5 space-y-4" style={{ zIndex: 1 }}>
      <CinematicBg page="sector-comparison" />
      <PageHeader title="مقارنة القطاعات" subtitle="مقارنة تفاعلية بين أداء القطاع العام والخاص" icon={ArrowLeftRight}
                  actions={<button style={{ border: "1px solid var(--border)", fontFamily: "'Tajawal', sans-serif" }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:bg-muted"><Download size={12} /> تصدير Excel</button>} />
      <div className="grid grid-cols-3 gap-4">
        {[{ label: "نسبة الامتثال الكلية", value: "55%", icon: Award, color: GOLD }, { label: "إجمالي الممتثل", value: "294", icon: CheckCircle2, color: "#1E9E57" }, { label: "إجمالي المواقع", value: "536", icon: Globe, color: TEAL }].map((k, i) => <SmallKPI key={i} {...k} delay={i * 0.07} />)}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[{ l: "القطاع الخاص", total: 224, compliant: 108, partial: 61, nc: 55, pct: 48, score: 64 },
          { l: "القطاع العام",  total: 312, compliant: 186, partial: 74, nc: 52, pct: 60, score: 78 }].map((s, i) => {
          const r = 30; const circ = 2 * Math.PI * r; const dash = (s.pct / 100) * circ;
          return (
            <PCard key={i} goldTop className="p-5" style={{ animation: `card-rise 0.4s ease-out ${i * 0.1}s both` }}>
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-base font-bold text-foreground">{s.l}</h3>
                <span style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground">إجمالي المواقع: {s.total}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 space-y-2">
                  {[{ l: "ممتثل", v: s.compliant, c: "#1E9E57" }, { l: "ممتثل جزئياً", v: s.partial, c: "#C78B2C" }, { l: "غير ممتثل", v: s.nc, c: "#B94A55" }].map(r2 => (
                    <div key={r2.l} className="flex items-center gap-2">
                      <span style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground w-20">{r2.l}</span>
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                        <div className="h-full rounded-full" style={{ width: `${(r2.v / s.total) * 100}%`, background: r2.c }} />
                      </div>
                      <span style={{ color: r2.c, fontFamily: "'Tajawal', sans-serif" }} className="text-xs font-bold w-8">{r2.v}</span>
                    </div>
                  ))}
                </div>
                <div className="relative w-20 h-20 flex-shrink-0">
                  <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="40" cy="40" r={r} fill="none" stroke={GOLD} strokeOpacity="0.12" strokeWidth="7" />
                    <circle cx="40" cy="40" r={r} fill="none" stroke={GOLD} strokeWidth="7" strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span style={{ color: GOLD, fontFamily: "'Tajawal', sans-serif" }} className="text-lg font-black">{s.pct}%</span>
                    <span style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-[9px] text-muted-foreground">امتثال</span>
                  </div>
                </div>
              </div>
              <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground mt-3">متوسط الدرجة: {s.score}%</p>
            </PCard>
          );
        })}
      </div>
      <PCard goldTop className="p-5">
        <h3 style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold mb-4">المقارنة التفصيلية</h3>
        <div dir="ltr">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={SECTOR_DATA.slice(0, 4)} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="sector" tick={{ fontSize: 11, fill: "#64748B", fontFamily: "Tajawal" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TT} />
              <Legend wrapperStyle={{ fontFamily: "Tajawal", fontSize: "11px" }} />
              <Bar name="bar-ممتثل-6" dataKey="ممتثل" fill="#1E9E57" fillOpacity={0.88} radius={[3, 3, 0, 0]} />
              <Bar name="bar-جزئياً-7" dataKey="جزئياً" fill="#C78B2C" fillOpacity={0.88} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </PCard>
    </div>
  );
}

// ─── PAGE 21: Time Comparison ─────────────────────────────────────────────────
function TimeComparisonPage() {
  return (
    <div className="relative p-5 space-y-4" style={{ zIndex: 1 }}>
      <CinematicBg page="time-comparison" />
      <PageHeader title="المقارنة الزمنية" subtitle="مقارنة مؤشرات يونيو 2026 مع مايو 2026" icon={Clock} />
      {/* Main comparison banner */}
      <PCard goldTop className="overflow-hidden" style={{ animation: "hero-reveal 0.45s ease-out both" }}>
        <div className="p-6" style={{ background: `linear-gradient(135deg, #0B1640, #7C6BAE30)` }}>
          <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold text-white mb-4">نسبة الامتثال الإجمالية</p>
          <div className="flex items-center justify-around">
            {[{ month: "مايو 2026", pct: "57%" }, { month: "يونيو 2026", pct: "62%" }].map((m, i) => (
              <div key={i} className="text-center">
                <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-slate-400 mb-1">{m.month}</p>
                <p style={{ fontFamily: "'Tajawal', sans-serif", color: GOLD }} className="text-5xl font-black">{m.pct}</p>
              </div>
            ))}
            <div className="text-center">
              <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-slate-400 mb-1">التغيّر</p>
              <span className="text-2xl font-black text-[#1E9E57]">+5%</span>
              <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-[#1E9E57] mt-1">↗ تحسّن</p>
            </div>
          </div>
        </div>
      </PCard>
      <div className="grid grid-cols-3 gap-4">
        {[{ l: "غير ممتثل", curr: 1456, prev: 1523, color: "#B94A55" }, { l: "ممتثل جزئياً", curr: 1040, prev: 980, color: "#C78B2C" }, { l: "ممتثل", curr: 911, prev: 832, color: "#1E9E57" }].map((c, i) => (
          <PCard key={i} goldTop className="p-4" style={{ animation: `card-rise 0.4s ease-out ${i * 0.08}s both` }}>
            <ComplianceBadge status={i === 0 ? "non-compliant" : i === 1 ? "partial" : "compliant"} />
            <div className="grid grid-cols-2 gap-3 mt-3">
              {[{ l: "الشهر الحالي", v: c.curr }, { l: "الشهر السابق", v: c.prev }].map(m => (
                <div key={m.l}>
                  <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-[10px] text-muted-foreground">{m.l}</p>
                  <p style={{ fontFamily: "'Tajawal', sans-serif", color: c.color }} className="text-2xl font-black">{m.v.toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="w-full h-1.5 rounded-full overflow-hidden mt-2" style={{ background: "var(--muted)" }}>
              <div className="h-full rounded-full" style={{ width: `${(c.curr / (c.curr + 2000)) * 100}%`, background: c.color }} />
            </div>
            <p style={{ fontFamily: "'Tajawal', sans-serif" }} className={`text-xs mt-1 ${c.curr > c.prev ? (i === 0 ? "text-[#B94A55]" : "text-[#1E9E57]") : "text-[#B94A55]"}`}>
              {c.curr > c.prev ? "+" : ""}{(c.curr - c.prev).toLocaleString()} موقع
            </p>
          </PCard>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE 22-26: Analytics group (structured) ─────────────────────────────────
function ComplianceComparisonPage() {
  return (
    <SimplePage page="compliance-comparison" title="مقارنة الامتثال" subtitle="مقارنة حالة الامتثال بين جهتين أو أكثر جنباً إلى جنب" icon={Scale}>
      <div className="grid grid-cols-3 gap-4">
        <PCard goldTop className="p-5">
          <h3 style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold mb-3">اختيار الجهات</h3>
          <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground mb-3">اختر 2-8 جهات للمقارنة</p>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {WEBSITES.slice(0, 8).map((w, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer transition-all">
                <div className="w-4 h-4 rounded border border-border flex-shrink-0" style={{ background: "var(--muted)" }} />
                <Globe size={12} className="text-muted-foreground flex-shrink-0" />
                <span style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-foreground flex-1">{w.name}</span>
              </div>
            ))}
          </div>
        </PCard>
        <div className="col-span-2">
          <PCard goldTop className="p-12 text-center h-full flex items-center justify-center flex-col gap-4">
            <ArrowLeftRight size={40} className="text-muted-foreground opacity-30" />
            <h3 style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-lg font-bold text-foreground">اختر جهتين على الأقل</h3>
            <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm text-muted-foreground">حدد الجهات من القائمة الجانبية لعرض المقارنة التفصيلية</p>
          </PCard>
        </div>
      </div>
    </SimplePage>
  );
}

function ComplianceHeatmapPage() {
  const regions = [
    { name: "المنطقة الشرقية", pct: 70, sites: 254 }, { name: "الرياض", pct: 65, sites: 412 },
    { name: "مكة المكرمة", pct: 60, sites: 286 }, { name: "المدينة المنورة", pct: 57, sites: 143 },
    { name: "القصيم", pct: 64, sites: 98 }, { name: "تبوك", pct: 55, sites: 76 },
    { name: "عسير", pct: 52, sites: 89 }, { name: "الجوف", pct: 47, sites: 44 },
    { name: "جازان", pct: 47, sites: 62 }, { name: "نجران", pct: 45, sites: 38 },
    { name: "الباحة", pct: 42, sites: 29 }, { name: "الحدود الشمالية", pct: 41, sites: 31 },
  ];
  return (
    <SimplePage page="compliance-heatmap" title="خريطة الامتثال الحرارية" subtitle="التوزيع الجغرافي لامتثال المواقع حسب مناطق المملكة" icon={Map}
                kpis={[{ label: "الحدود الشمالية (أدنى)", value: "41%", icon: AlertTriangle, color: "#B94A55" }, { label: "الشرقية (أعلى)", value: "70%", icon: Award, color: "#1E9E57" }, { label: "متوسط الامتثال", value: "55%", icon: BarChart3, color: GOLD }, { label: "إجمالي المواقع", value: "1,634", icon: Globe, color: TEAL }]}>
      <PCard goldTop className="p-5">
        <h3 style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold mb-4">ترتيب المناطق حسب نسبة الامتثال</h3>
        <div className="space-y-2.5">
          {regions.map((r, i) => {
            const c = r.pct >= 65 ? "#1E9E57" : r.pct >= 50 ? "#C78B2C" : "#B94A55";
            return (
              <div key={i} className="flex items-center gap-3" style={{ animation: `card-rise 0.3s ease-out ${i * 0.04}s both` }}>
                <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
                <span style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm text-foreground w-32">{r.name}</span>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                  <div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: c }} />
                </div>
                <span style={{ color: c, fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-black w-10 text-left">{r.pct}%</span>
                <span style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground w-14">{r.sites} موقع</span>
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
              <label style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground mb-1 block">{f}</label>
              <input className="w-full px-3 py-2 rounded-lg text-sm text-foreground focus:outline-none" placeholder={f}
                     style={{ border: "1px solid var(--border)", background: "var(--muted)", fontFamily: "'Tajawal', sans-serif" }} />
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <button style={{ background: GOLD, color: NAVY_BG, fontFamily: "'Tajawal', sans-serif" }} className="px-5 py-2 rounded-lg text-sm font-bold hover:opacity-90">بحث</button>
          <button style={{ border: "1px solid var(--border)", fontFamily: "'Tajawal', sans-serif" }} className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted">إعادة تعيين</button>
        </div>
      </PCard>
      <PCard goldTop>
        <div className="p-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
          <span style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold">نتائج البحث <span className="text-muted-foreground font-normal">(7 نتيجة)</span></span>
          <button style={{ border: "1px solid var(--border)", fontFamily: "'Tajawal', sans-serif" }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:bg-muted"><Download size={12} /> تصدير النتائج</button>
        </div>
        {WEBSITES.slice(0, 5).map((site, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-muted/20 transition-colors cursor-pointer"
               style={{ borderBottom: i < 4 ? "1px solid var(--border)" : "none" }}
               onClick={() => (window as any)._rasidOpenSite?.(site)}>
            <div>
              <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-medium text-foreground">{site.name}</p>
              <p className="text-xs text-muted-foreground font-mono">{site.url}</p>
            </div>
            <div className="flex items-center gap-3">
              <span style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground">{site.sector}</span>
              <ComplianceBadge status={site.status} />
              <span style={{ fontFamily: "'Tajawal', sans-serif", color: site.score >= 80 ? "#1E9E57" : site.score >= 50 ? "#C78B2C" : "#B94A55" }} className="text-sm font-bold">{site.score}</span>
            </div>
          </div>
        ))}
      </PCard>
    </SimplePage>
  );
}

function ChangeDetectionPage() {
  const changes = [
    { org: "وزارة التعليم", domain: "moe.gov.sa", desc: "تمت إضافة سياسة خصوصية جديدة وتحسين بنود جمع البيانات", type: "إضافة سياسة", typeColor: "#1E9E57", pct: "+13.0%", dir: "↗" },
    { org: "نون للتجارة",   domain: "noon.com",   desc: "تم حذف قسم حقوق أصحاب البيانات من سياسة الخصوصية", type: "إزالة سياسة", typeColor: "#B94A55", pct: "-14.0%", dir: "↘" },
    { org: "شركة stc",      domain: "stc.com.sa", desc: "تعديل طفيف في سياسة الاحتفاظ بالبيانات", type: "تعديل",       typeColor: "#C78B2C", pct: "+2.0%",  dir: "↗" },
  ];
  return (
    <SimplePage page="change-detection" title="كشف التغييرات" subtitle="مراقبة التغييرات في سياسات الخصوصية بين الفحوصات المتتالية" icon={AlertTriangle}
                kpis={[{ label: "إجمالي التغييرات", value: "6", icon: AlertTriangle, color: GOLD }, { label: "سياسات مضافة", value: "2", icon: CheckCircle2, color: "#1E9E57" }, { label: "تغييرات جوهرية", value: "3", icon: AlertCircle, color: "#C78B2C" }, { label: "سياسات محذوفة", value: "1", icon: WifiOff, color: "#B94A55" }]}>
      <div className="space-y-3">
        {changes.map((c, i) => (
          <PCard key={i} goldTop className="p-5" style={{ animation: `card-rise 0.35s ease-out ${i * 0.08}s both` }}>
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: `${c.typeColor}15`, color: c.typeColor, fontFamily: "'Tajawal', sans-serif" }}>{c.type}</span>
                </div>
                <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold text-foreground">{c.org} ({c.domain})</p>
                <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground mt-1">{c.desc}</p>
              </div>
              <div className="text-left flex-shrink-0 ms-4">
                <p style={{ fontFamily: "'Tajawal', sans-serif", color: c.typeColor }} className="text-xl font-black">{c.pct}</p>
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
        <h3 style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold mb-3">اختر المواقع للمقارنة <span className="text-muted-foreground font-normal">(2-8 مواقع)</span></h3>
        <div className="grid grid-cols-3 gap-3">
          {WEBSITES.slice(0, 6).map((w, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted cursor-pointer transition-all" style={{ border: "1px solid var(--border)" }}>
              <div>
                <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs font-medium text-foreground">{w.name}</p>
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
        <h3 style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-lg font-bold text-foreground mb-2">حدد موقعين على الأقل</h3>
        <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm text-muted-foreground">استخدم لوحة البحث أعلاه لاختيار المواقع المراد مقارنتها</p>
      </PCard>
    </SimplePage>
  );
}

// ─── PAGE 27: Documents Registry ─────────────────────────────────────────────
function DocumentsRegistryPage() {
  const docs = [
    { id: "RASID-DOC-2026-001042", title: "تقرير امتثال وزارة الصحة",      type: "تقرير امتثال", status: "compliant" as ComplianceStatus, date: "7 محرم 1448" },
    { id: "RASID-DOC-2026-001041", title: "ملخص تنفيذي — القطاع البنكي",  type: "ملخص تنفيذي",  status: "compliant" as ComplianceStatus, date: "6 محرم 1448" },
    { id: "RASID-DOC-2026-001040", title: "توثيق حالة رصد — نون",         type: "توثيق رصد",    status: "compliant" as ComplianceStatus, date: "5 محرم 1448" },
    { id: "RASID-DOC-2026-001039", title: "تقرير مخصص — التعليم",         type: "تقرير مخصص",   status: "compliant" as ComplianceStatus, date: "4 محرم 1448" },
  ];
  return (
    <SimplePage page="documents-registry" title="سجل الوثائق" subtitle="عرض وإدارة جميع الوثائق والتقارير الصادرة من المنصة" icon={Folder}
                kpis={[{ label: "إجمالي التوثيقات", value: "16", icon: FileText, color: GOLD }, { label: "تقارير مخصصة", value: "6", icon: Download, color: TEAL }, { label: "توثيق حالات رصد", value: "6", icon: Folder, color: "#7C6BAE" }, { label: "موظفون مُصدرون", value: "4", icon: Users, color: "#1E9E57" }]}>
      <PCard goldTop>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["رقم الوثيقة", "العنوان", "النوع", "التاريخ", "الحالة", "إجراءات"].map(h => (
                <th key={h} style={{ fontFamily: "'Tajawal', sans-serif" }} className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {docs.map((d, i) => (
              <tr key={i} className="hover:bg-muted/20 transition-colors" style={{ borderBottom: i < docs.length - 1 ? "1px solid var(--border)" : "none", animation: `card-rise 0.3s ease-out ${i * 0.06}s both` }}>
                <td className="px-4 py-3"><span className="text-xs font-mono text-muted-foreground">{d.id}</span></td>
                <td className="px-4 py-3"><span style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm text-foreground">{d.title}</span></td>
                <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${GOLD}15`, color: GOLD, fontFamily: "'Tajawal', sans-serif" }}>{d.type}</span></td>
                <td className="px-4 py-3"><span style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground">{d.date}</span></td>
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

// ─── PAGE 28: Verify ─────────────────────────────────────────────────────────
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
          <h1 style={{ fontFamily: "'Tajawal', sans-serif", color: TEAL }} className="text-2xl font-black">نظام التحقق من الوثائق</h1>
          <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm text-slate-400 mt-1">Document Verification System – NDMO Rasid Platform</p>
        </div>
        <PCard goldTop className="p-6 space-y-4 text-right">
          <div>
            <label style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground mb-1.5 block">رمز التحقق</label>
            <div className="relative">
              <input type="text" value={code} onChange={e => setCode(e.target.value)} dir="ltr"
                     placeholder="NDMO-DOC-2026-XXXXXXXX"
                     className="w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 font-mono"
                     style={{ border: `1px solid ${TEAL}30`, background: "var(--muted)" }} />
            </div>
          </div>
          <button className="w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  style={{ background: TEAL, color: NAVY_BG, fontFamily: "'Tajawal', sans-serif" }}>
            <SearchIcon size={15} /> تحقق
          </button>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            <span style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-muted-foreground">أو</span>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[{ l: "رفع ملف (PDF / HTML)", i: Upload }, { l: "مسح QR بالكاميرا", i: Cpu }].map(b => (
              <button key={b.l} style={{ border: "1px solid var(--border)", fontFamily: "'Tajawal', sans-serif" }}
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs text-muted-foreground hover:bg-muted transition-all">
                <b.i size={13} /> {b.l}
              </button>
            ))}
          </div>
        </PCard>
        <div>
          <p style={{ fontFamily: "'Tajawal', sans-serif", color: TEAL }} className="text-sm font-bold">حماية البيانات الشخصية متطلب وطني</p>
          <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-slate-500 mt-1">منصة راصد – مكتب إدارة البيانات الوطنية (NDMO)</p>
          <p className="text-[10px] text-slate-600 mt-1 font-mono">NDMO_RASID_VERIFY_ENGINE v4.0</p>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE 29: Document Stats ──────────────────────────────────────────────────
function DocumentStatsPage() {
  const docTypes = [
    { l: "توثيق حالة رصد",  v: 98, pct: 40, c: GOLD      },
    { l: "تقرير مخصص",      v: 54, pct: 22, c: TEAL       },
    { l: "ملخص تنفيذي",     v: 31, pct: 13, c: "#7C6BAE"  },
    { l: "تقرير امتثال",    v: 42, pct: 17, c: "#1E9E57"  },
    { l: "تقرير قطاعي",     v: 22, pct: 9,  c: "#C78B2C"  },
  ];
  return (
    <SimplePage page="document-stats" title="إحصائيات الوثائق" subtitle="تحليل شامل لجميع الوثائق والتقارير المصدرة من المنصة" icon={BarChart3}
                kpis={[{ label: "إجمالي الوثائق", value: "247", icon: FileText, color: GOLD }, { label: "ملخصات تنفيذية", value: "31", icon: Clipboard, color: TEAL }, { label: "تقارير مخصصة", value: "54", icon: Download, color: "#7C6BAE" }, { label: "توثيق حالات رصد", value: "98", icon: Folder, color: "#1E9E57" }]}>
      <div className="grid grid-cols-2 gap-4">
        <PCard goldTop className="p-5">
          <h3 style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold mb-4">الوثائق عبر الزمن</h3>
          <div dir="ltr">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={TREND_DATA} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#64748B", fontFamily: "Tajawal" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TT} />
                <Line name="line-docs-teal" type="monotone" dataKey="ممتثل" stroke={TEAL} strokeWidth={2.5} dot={{ fill: TEAL, r: 3, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </PCard>
        <PCard goldTop className="p-5">
          <h3 style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold mb-4">تفصيل أنواع الوثائق</h3>
          <div className="space-y-3">
            {docTypes.map((d, i) => (
              <div key={i} className="space-y-1" style={{ animation: `card-rise 0.3s ease-out ${i * 0.06}s both` }}>
                <div className="flex items-center justify-between text-xs">
                  <span style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-muted-foreground">{d.l}</span>
                  <span style={{ fontFamily: "'Tajawal', sans-serif", color: d.c }} className="font-bold">{d.v} ({d.pct}%)</span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
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

// ─── Admin Page ───────────────────────────────────────────────────────────────
function AdminPage() {
  const [section, setSection] = useState("theme");
  return (
    <div className="relative flex overflow-hidden" style={{ height: "calc(100vh - 48px)" }}>
      <CinematicBg page="admin" />
      <div className="w-52 flex-shrink-0 flex flex-col py-5 overflow-y-auto relative z-10"
           style={{ borderLeft: "1px solid var(--border)", background: "var(--muted)" }}>
        <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="px-4 text-[9px] text-muted-foreground font-semibold tracking-[0.2em] uppercase mb-3">إعدادات المنصة</p>
        <div className="px-2 space-y-0.5">
          {ADMIN_SECTIONS.map(s => (
            <button key={s.id} onClick={() => setSection(s.id)}
                    style={section === s.id ? { background: "var(--card)", boxShadow: `inset 3px 0 0 ${GOLD}` } : {}}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${section === s.id ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-card/50"}`}>
              <s.icon size={13} style={{ color: section === s.id ? GOLD : "" }} />
              <span style={{ fontFamily: "'Tajawal', sans-serif" }}>{s.label}</span>
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
              <h3 style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold mb-4">نمط العرض</h3>
              <div className="grid grid-cols-3 gap-3">
                {[{ id: "dark", label: "الوضع الداكن", bg: NAVY_BG, active: true }, { id: "light", label: "الوضع الفاتح", bg: "#F7F4EC", active: false }, { id: "auto", label: "تلقائي", bg: `linear-gradient(135deg, ${NAVY_BG} 50%, #F7F4EC 50%)`, active: false }].map(t => (
                  <div key={t.id} className="p-3 rounded-xl cursor-pointer" style={{ border: `1px solid ${t.active ? GOLD : "var(--border)"}`, background: t.active ? `${GOLD}08` : "var(--muted)" }}>
                    <div className="w-full h-12 rounded-lg mb-2 overflow-hidden" style={{ background: t.bg }} />
                    <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs text-center text-foreground">{t.label}</p>
                    {t.active && <div className="w-2 h-2 rounded-full mx-auto mt-1.5" style={{ background: GOLD }} />}
                  </div>
                ))}
              </div>
            </PCard>
            <PCard goldTop className="p-5">
              <h3 style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm font-semibold mb-4">ألوان النظام</h3>
              <div className="grid grid-cols-2 gap-3">
                {[{ l: "اللون الأساسي", c: NAVY_SIDEBAR, d: "Deep Navy" }, { l: "لون التمييز", c: GOLD, d: "Soft Gold" }, { l: "الامتثال الكامل", c: "#1E9E57", d: "Muted Emerald" }, { l: "عدم الامتثال", c: "#B94A55", d: "Muted Crimson" }].map((col, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ border: "1px solid var(--border)" }}>
                    <div className="w-8 h-8 rounded-lg flex-shrink-0 border border-white/10" style={{ background: col.c }} />
                    <div>
                      <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-xs font-medium text-foreground">{col.l}</p>
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
                <p style={{ fontFamily: "'Tajawal', sans-serif" }} className="text-sm text-muted-foreground">إعدادات {s.label} متاحة قريباً</p>
              </>
            ) : null; })()}
          </PCard>
        )}
      </div>
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
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
  admin: AdminPage,
};

// ════════════════════════════════════════════════════════════════════════════
// DRILL-DOWN MODAL — نافذة التعمق في البيانات
// تظهر عند الضغط على أي بطاقة KPI أو امتثال، تعرض قائمة المواقع المصفّاة
// ════════════════════════════════════════════════════════════════════════════
function DrillDownModal({
  open, onClose, filter, title, color, textColor, onOpenSite,
}: {
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

  // Reset on open
  useEffect(() => { if (open) { setSearch(""); setPage(0); } }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center"
         style={{ background: "rgba(4,9,28,0.82)", backdropFilter: "blur(8px)", animation: "fadeInPage 0.2s ease-out" }}>
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal card */}
      <div className="relative w-full max-w-2xl mx-4 rounded-2xl overflow-hidden"
           style={{ background: "var(--card)", border: `1px solid ${color}30`,
                    boxShadow: `0 32px 80px rgba(4,9,28,0.7), 0 0 80px ${color}10`,
                    animation: "hero-reveal 0.35s cubic-bezier(0.34,1.56,0.64,1) both" }}>
        <InsetFrame accent={color} />

        {/* Gold top shimmer */}
        <div className="absolute top-0 inset-x-0 h-[2px]"
             style={{ background: `linear-gradient(90deg, transparent, ${color} 30%, ${GOLD_PALE} 50%, ${color} 70%, transparent)` }} />

        {/* Scanline */}
        <div className="absolute inset-x-0 top-0 h-20 pointer-events-none opacity-50"
             style={{ background: `linear-gradient(180deg, ${color}0C, transparent)` }} />

        {/* Header */}
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

          {/* Search + export */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex-1 relative">
              <SearchIcon size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={e => { setSearch(e.target.value); setPage(0); }} dir="rtl"
                     placeholder="ابحث في القائمة..."
                     className="w-full pr-9 pl-4 py-2 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                     style={{ border: "1px solid var(--border)", background: "var(--muted)" }} />
            </div>
            {[{ l: "Excel", i: Download }, { l: "PDF", i: FileText }].map(b => (
              <button key={b.l} className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80"
                      style={{ background: `${color}14`, color, border: `1px solid ${color}22` }}>
                <b.i size={12} /> {b.l}
              </button>
            ))}
          </div>
        </div>

        {/* Site list */}
        <div className="divide-y max-h-[380px] overflow-y-auto" style={{ borderColor: "var(--border)" }}>
          {slice.length === 0 && (
            <div className="py-12 text-center text-muted-foreground text-sm">لا توجد نتائج</div>
          )}
          {slice.map((site, i) => {
            const sc = site.score >= 80 ? "#1E9E57" : site.score >= 50 ? "#C78B2C" : site.score > 0 ? "#B94A55" : "#64748B";
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
                    <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
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

        {/* Pagination footer */}
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


// ════════════════════════════════════════════════════════════════════════════
// SITE PROFILE PAGE — ملف الموقع الإلكتروني
// أهم صفحة في المنصة — تفاصيل كاملة لكل موقع مرصود
// ════════════════════════════════════════════════════════════════════════════
function SiteProfilePage({ onBack }: { onBack: () => void }) {
  const site = _activeSite;
  const [tab, setTab] = useState<"compliance"|"scans"|"screenshots"|"text"|"compare">("compliance");
  const [prevTab, setPrevTab] = useState(tab);
  const [tabDir, setTabDir] = useState<"left"|"right">("left");
  const [scanDetail, setScanDetail] = useState<number | null>(null);

  const a12  = getArticle12Scores(site.score);
  const hist = getScanHistory(site.score);
  const sc = site.score >= 80 ? "#1E9E57" : site.score >= 50 ? "#C78B2C" : site.score > 0 ? "#B94A55" : "#64748B";

  const tabs = [
    { id: "compliance"  as const, label: "الامتثال للمادة 12",   icon: Shield      },
    { id: "scans"       as const, label: "سجل الفحوصات",         icon: History     },
    { id: "screenshots" as const, label: "صور سياسة الخصوصية",   icon: Eye         },
    { id: "text"        as const, label: "المحتوى النصي",         icon: FileText    },
    { id: "compare"     as const, label: "المقارنة البصرية",      icon: ArrowLeftRight },
  ];
  const tabIdx = tabs.findIndex(t => t.id === tab);
  const switchTab = (id: typeof tab) => {
    const newIdx = tabs.findIndex(t => t.id === id);
    setTabDir(newIdx > tabIdx ? "left" : "right");
    setPrevTab(tab); setTab(id);
  };

  return (
    <div className="relative flex flex-col min-h-full" style={{ zIndex: 1, animation: "fadeInPage 0.35s ease-out" }}>
      <CinematicBg page="sites" />

      {/* ── HERO BANNER — صورة الموقع + هوية الصفحة ── */}
      <div className="relative flex-shrink-0 overflow-hidden"
           style={{ background: `linear-gradient(135deg, ${NAVY_BG} 0%, ${NAVY_CARD} 60%, ${NAVY_BG} 100%)`,
                    borderBottom: `1px solid ${GOLD}18` }}>
        {/* Screenshot placeholder */}
        <div className="relative h-32 overflow-hidden"
             style={{ background: `linear-gradient(135deg, ${sc}08, ${GOLD}06, ${TEAL}04)` }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-3 opacity-20">
              <Globe size={40} className="text-foreground" />
              <span className="text-2xl font-mono text-foreground font-bold">{site.url}</span>
            </div>
          </div>
          {/* Scan line animation over screenshot area */}
          <div className="absolute inset-x-0 top-0 h-0.5 opacity-40"
               style={{ background: `linear-gradient(90deg, transparent, ${sc}80, transparent)`, animation: "hud-scanline 3s linear infinite" }} />
        </div>

        {/* Site identity block */}
        <div className="relative px-5 py-4 z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {/* Back button */}
              <button onClick={onBack}
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-white/10 flex-shrink-0 mt-0.5"
                      style={{ border: `1px solid ${GOLD}20`, color: GOLD }}>
                <ChevronRight size={16} />
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h1 className="text-xl font-black text-white">{site.name}</h1>
                  {/* Compliance badge — premium version */}
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
                {/* Privacy policy link + social icons */}
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
            {/* Score ring */}
            <div className="relative flex-shrink-0">
              <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="36" cy="36" r="28" fill="none" stroke={sc} strokeOpacity="0.15" strokeWidth="7" />
                <circle cx="36" cy="36" r="28" fill="none" stroke={sc} strokeWidth="7"
                        strokeDasharray={`${(site.score / 100) * 176} 176`} strokeLinecap="round"
                        style={{ filter: `drop-shadow(0 0 6px ${sc}80)` }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black tabular-nums" style={{ color: sc, fontFamily: "'Tajawal', sans-serif" }}>{site.score}</span>
                <span className="text-[9px] text-slate-400">%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
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

      {/* ── TAB CONTENT ── */}
      <div className="flex-1 overflow-y-auto p-5" key={tab}
           style={{ animation: `fadeInPage 0.28s ease-out` }}>

        {/* ════ TAB 1: COMPLIANCE — بنود المادة 12 ════ */}
        {tab === "compliance" && (
          <div className="space-y-4">
            {/* Overall score banner */}
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
                    { l: "مستوفية",      v: a12.filter(x=>x.status==="compliant").length,       c: "#1E9E57" },
                    { l: "جزئية",        v: a12.filter(x=>x.status==="partial").length,          c: "#C78B2C" },
                    { l: "غير مستوفية",  v: a12.filter(x=>x.status==="non-compliant").length,    c: "#B94A55" },
                    { l: "إجمالي",       v: 8,                                                    c: GOLD      },
                  ].map(s => (
                    <div key={s.l} className="p-2 rounded-xl text-center" style={{ background: `${s.c}10`, border: `1px solid ${s.c}20` }}>
                      <div className="text-lg font-black" style={{ color: s.c }}>{s.v}</div>
                      <div className="text-[9px] text-muted-foreground">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Article 12 criteria grid */}
            <div className="grid grid-cols-2 gap-3">
              {a12.map((c, i) => {
                const cc = c.status === "compliant" ? "#1E9E57" : c.status === "partial" ? "#C78B2C" : "#B94A55";
                return (
                  <div key={c.id} className="relative rounded-2xl overflow-hidden p-4 hover:-translate-y-0.5 transition-all duration-200"
                       style={{ background: `linear-gradient(135deg, var(--card), color-mix(in srgb, var(--card) 90%, ${cc}))`,
                                border: `1px solid ${cc}20`, boxShadow: "var(--card-shadow)",
                                animation: `card-rise 0.35s ease-out ${i * 0.06}s both` }}>
                    <InsetFrame accent={cc} radius={12} />
                    <div className="relative flex items-start gap-3">
                      {/* Number badge */}
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
                           style={{ background: `${cc}18`, color: cc, border: `1px solid ${cc}30` }}>{c.id}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1 gap-2">
                          <p className="text-xs font-bold text-foreground leading-tight">{c.ar}</p>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold flex-shrink-0"
                                style={{ background: `${cc}15`, color: cc }}>{c.pct}%</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground mb-2">{c.en}</p>
                        <div className="w-full h-1.5 rounded-full overflow-hidden mb-1.5" style={{ background: "var(--muted)" }}>
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

        {/* ════ TAB 2: SCAN HISTORY — سجل الفحوصات ════ */}
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
              const sc2 = scan.score >= 80 ? "#1E9E57" : scan.score >= 50 ? "#C78B2C" : "#B94A55";
              const isUp = scan.change > 0;
              return (
                <div key={scan.id} className="relative rounded-2xl overflow-hidden cursor-pointer"
                     style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)",
                              animation: `card-rise 0.3s ease-out ${i * 0.07}s both` }}
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
                          <span className="text-sm font-bold" style={{ color: isUp ? "#1E9E57" : "#B94A55" }}>
                            {isUp ? "↑" : "↓"}{Math.abs(scan.change)}%
                          </span>
                          <span className="text-xs text-muted-foreground">{scan.pages} صفحة · {scan.duration}</span>
                        </div>
                      </div>
                      <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                        <div className="h-full rounded-full" style={{ width: `${scan.score}%`, background: sc2 }} />
                      </div>
                      <ChevronDown size={14} className="text-muted-foreground transition-transform"
                                   style={{ transform: scanDetail === i ? "rotate(180deg)" : "rotate(0)" }} />
                    </div>

                    {/* Expanded details */}
                    {scanDetail === i && (
                      <div className="mt-4 pt-4 space-y-3" style={{ borderTop: "1px solid var(--border)", animation: "fadeInPage 0.25s ease-out" }}>
                        <p className="text-xs font-semibold text-muted-foreground">نتائج المادة 12 لهذا الفحص</p>
                        <div className="grid grid-cols-4 gap-2">
                          {getArticle12Scores(scan.score).map((c, j) => {
                            const cc = c.status === "compliant" ? "#1E9E57" : c.status === "partial" ? "#C78B2C" : "#B94A55";
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

        {/* ════ TAB 3: SCREENSHOTS — صور سياسة الخصوصية ════ */}
        {tab === "screenshots" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground">صور سياسة الخصوصية المرصودة</h3>
              <span className="text-xs text-muted-foreground">{hist[0].pages} صفحة مرصودة</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[...Array(hist[0].pages)].map((_, i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden group cursor-pointer"
                     style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)",
                              animation: `card-rise 0.3s ease-out ${i * 0.04}s both` }}>
                  <InsetFrame radius={14} />
                  <div className="h-28 flex items-center justify-center"
                       style={{ background: `linear-gradient(135deg, ${sc}06, ${GOLD}04)` }}>
                    <div className="text-center opacity-30">
                      <Eye size={22} className="text-foreground mx-auto mb-1" />
                      <p className="text-[10px] font-mono text-foreground">صفحة {i + 1}</p>
                    </div>
                  </div>
                  <div className="p-2.5">
                    <p className="text-[11px] font-semibold text-foreground truncate">صفحة سياسة الخصوصية {i + 1}</p>
                    <p className="text-[10px] text-muted-foreground">{hist[0].date}</p>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${GOLD}90` }}>
                        <Eye size={16} style={{ color: NAVY_BG }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ TAB 4: TEXT CONTENT — المحتوى النصي ════ */}
        {tab === "text" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground">المحتوى النصي المستخرج</h3>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                      style={{ background: GOLD, color: NAVY_BG }}><Download size={12} /> تصدير</button>
            </div>
            <div className="relative rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}>
              <InsetFrame />
              <p className="text-xs text-muted-foreground mb-3 font-mono">— محتوى مستخرج من {hist[0].pages} صفحة —</p>
              <div className="space-y-3 text-sm text-foreground leading-relaxed" dir="rtl">
                <p>تلتزم {site.name} بحماية خصوصية بياناتك الشخصية وفقاً لأحكام نظام حماية البيانات الشخصية الصادر بالمرسوم الملكي رقم م/19 بتاريخ 1443/02/09 هـ.</p>
                <p>نجمع البيانات الشخصية عند تسجيلك أو استخدامك لخدماتنا الإلكترونية بهدف تقديم الخدمات المطلوبة وتحسين تجربة المستخدم ورفع كفاءة العمليات.</p>
                <p className="text-muted-foreground text-xs">[... محتوى مستخرج إضافي من {hist[0].pages - 1} صفحات أخرى ...]</p>
              </div>
            </div>
          </div>
        )}

        {/* ════ TAB 5: VISUAL COMPARISON — المقارنة البصرية ════ */}
        {tab === "compare" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground">المقارنة البصرية بين الفحوصات</h3>
              <div className="flex items-center gap-2">
                {hist.slice(0, 3).map((s, i) => (
                  <button key={s.id} className="text-xs px-2.5 py-1 rounded-lg font-semibold transition-all"
                          style={{ background: i === 0 ? GOLD : "var(--muted)", color: i === 0 ? NAVY_BG : "var(--muted-foreground)", border: `1px solid ${i === 0 ? GOLD : "var(--border)"}` }}>
                    {s.date.split(" ").slice(0, 2).join(" ")}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {hist.slice(0, 2).map((scan, i) => {
                const sc2 = scan.score >= 80 ? "#1E9E57" : scan.score >= 50 ? "#C78B2C" : "#B94A55";
                const a = getArticle12Scores(scan.score);
                return (
                  <div key={i} className="relative rounded-2xl p-4"
                       style={{ background: "var(--card)", border: `1px solid ${i === 0 ? GOLD : "var(--border)"}22`, boxShadow: "var(--card-shadow)",
                                animation: `card-rise 0.35s ease-out ${i * 0.1}s both` }}>
                    <InsetFrame accent={sc2} />
                    <div className="relative flex items-center gap-2 mb-3">
                      <span className="text-[11px] font-bold text-muted-foreground">{scan.date}</span>
                      {i === 0 && <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: `${GOLD}20`, color: GOLD }}>أحدث</span>}
                      <span className="text-xl font-black ms-auto" style={{ color: sc2 }}>{scan.score}%</span>
                    </div>
                    <div className="space-y-1.5">
                      {a.map((c, j) => {
                        const cc = c.status === "compliant" ? "#1E9E57" : c.status === "partial" ? "#C78B2C" : "#B94A55";
                        return (
                          <div key={j} className="flex items-center gap-2">
                            <span className="text-[10px] text-muted-foreground w-4 flex-shrink-0">{c.id}</span>
                            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                              <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: cc }} />
                            </div>
                            <span className="text-[10px] font-mono" style={{ color: cc, minWidth: "28px" }}>{c.pct}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Branded Loading / Intro Experience ──────────────────────────────────────
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const steps = ["تهيئة محرك الرصد الوطني", "تحميل بيانات الامتثال", "الاتصال بـ راصد الذكي", "جاهز للانطلاق"];
  const [step, setStep] = useState(0);
  useEffect(() => {
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 9 + 4;
      if (p >= 100) {
        p = 100; clearInterval(iv); setPct(100); setStep(3);
        setTimeout(onDone, 650);
      } else {
        setPct(p);
        setStep(p < 35 ? 0 : p < 65 ? 1 : p < 92 ? 2 : 3);
      }
    }, 240);
    return () => clearInterval(iv);
  }, []);
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
         style={{ background: `radial-gradient(ellipse at 50% 35%, #0B1D38 0%, #04091C 70%)` }}>
      {/* Ambient command field */}
      <div className="absolute inset-0 pointer-events-none">
        {[640, 460, 300].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: s, height: s, top: "38%", left: "50%",
                                transform: "translate(-50%,-50%)", borderRadius: "50%",
                                border: `1px solid ${GOLD}${["0C","0A","08"][i]}`,
                                animation: `${i % 2 ? "orbit-ring-r" : "orbit-ring"} ${30 + i * 14}s linear infinite` }} />
        ))}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.03 }}>
          <defs><pattern id="ld-grid" width="46" height="46" patternUnits="userSpaceOnUse">
            <path d="M 46 0 L 0 0 0 46" fill="none" stroke={GOLD} strokeWidth="0.5"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#ld-grid)" />
        </svg>
      </div>

      {/* Character with halo */}
      <div className="relative mb-6" style={{ animation: "float-bob 3.5s ease-in-out infinite" }}>
        <div className="absolute inset-0 rounded-full pointer-events-none"
             style={{ background: `radial-gradient(circle, ${GOLD}30, transparent 65%)`, transform: "scale(1.7)", animation: "logo-glow 3s ease-in-out infinite" }} />
        {[0, 1].map(i => (
          <div key={i} className="absolute inset-0 rounded-full pointer-events-none"
               style={{ border: `1px solid ${GOLD}30`, animation: `scan-pulse-ring 2.6s ease-out ${i * 0.9}s infinite` }} />
        ))}
        <ImageWithFallback src={characterWaving} alt="راصد"
                           className="relative h-44 w-auto object-contain"
                           style={{ filter: `drop-shadow(0 12px 32px ${GOLD}30)` }} />
      </div>

      {/* Logo */}
      <div className="relative mb-8" style={{ animation: "hero-reveal 0.8s ease-out both" }}>
        <RasidLogo variant="gold" className="h-20 w-auto" animate />
      </div>

      {/* Progress */}
      <div className="w-72 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <HudLabel color={`${GOLD}90`}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD, animation: "status-blink 1.2s ease-in-out infinite" }} />
            RASID v6.0
          </HudLabel>
          <span className="text-xs font-mono font-bold" style={{ color: GOLD }}>{Math.round(pct)}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div className="h-full rounded-full relative overflow-hidden transition-all duration-300"
               style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${GOLD}, ${GOLD_PALE})`, boxShadow: `0 0 12px ${GOLD}70` }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)", animation: "shimmer-sweep 1.5s ease-in-out infinite" }} />
          </div>
        </div>
        <p className="text-center text-xs text-slate-400 mt-3" style={{ fontFamily: "'Tajawal', sans-serif", animation: "fadeInPage 0.3s ease-out" }} key={step}>
          {steps[step]}
        </p>
      </div>

      {/* Footer identity */}
      <div className="absolute bottom-8 text-center">
        <p className="text-[10px] tracking-[0.25em] uppercase" style={{ color: `${GOLD}50`, fontFamily: "'Tajawal', sans-serif" }}>منصة راصد · مكتب إدارة البيانات الوطنية</p>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage]       = useState<Page>("leadership");
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [drillDown, setDrillDown] = useState<typeof _activeDrillDown>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Global navigation helpers available via module scope
  const openSiteProfile = (site: typeof WEBSITES[0]) => {
    _activeSite = site;
    setPage("site-profile");
  };
  const openDrillDown = (filter: ComplianceStatus | "all", title: string, color: string, textColor: string) => {
    _activeDrillDown = { filter, title, color, textColor };
    setDrillDown({ filter, title, color, textColor });
  };

  // Expose helpers globally so child components can call them
  (window as any)._rasidOpenSite = openSiteProfile;
  (window as any)._rasidOpenDrill = openDrillDown;

  if (loading) return <LoadingScreen onDone={() => setLoading(false)} />;

  const PageComp = PAGE_COMPONENT[page] || LeadershipPage;

  return (
    <div dir="rtl" className="h-screen w-screen flex overflow-hidden bg-background text-foreground"
         style={{ fontFamily: "'Tajawal', sans-serif", animation: "fadeInPage 0.4s ease-out" }}>
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

      {/* DrillDown modal — available from any page */}
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
