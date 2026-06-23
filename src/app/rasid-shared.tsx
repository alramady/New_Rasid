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
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import rasidLogoGold    from "@/imports/Rased_5__transparent-1.png";   // gold calligraphy (dark mode)
import rasidLogoHero    from "@/imports/Rased_5__transparent-1.png";   // gold calligraphy
import rasidLogoWordmark from "@/imports/Rased_1__transparent__1_-1.png"; // navy full lockup
import rasidLogoLight   from "@/imports/Rased_4__transparent.png";     // navy calligraphy (light mode)
import characterWaving  from "@/imports/Character_1_waving_transparent-2.png";
import characterShmagh  from "@/imports/Character_2_shmagh_transparent-2.png";
import sdaiaLogoImg    from "@/imports/sdaiaLogo.png";
import characterHands   from "@/imports/Character_5_arms_crossed_shmagh_transparent-1.png";
import {
  BarChart, Bar, LineChart, Line, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PieChart, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, Tooltip, Legend, CartesianGrid} from "recharts";
// Re-export everything imported above so App.tsx can import from one place
export { ImageWithFallback };
export { rasidLogoGold, rasidLogoHero, rasidLogoWordmark, rasidLogoLight };
export { characterWaving, characterShmagh, sdaiaLogoImg, characterHands };
export { BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid };
export type Page =
  "leadership" | "kpi-dashboard" | "real-time" |
  "smart-rasid" | "advanced-scan" | "sites" | "mobile-apps" | "scan-history" | "scan-library" | "scan-schedules" | "cases" |
  "pdf-reports" | "custom-reports" | "scheduled-reports" | "message-templates" | "letters" | "export-data" | "improvement-tracker" |
  "advanced-analytics" | "sector-comparison" | "time-comparison" | "compliance-comparison" | "compliance-heatmap" | "advanced-search" | "change-detection" | "interactive-comparison" |
  "documents-registry" | "verify" | "document-stats" | "admin" | "site-profile";
export type ComplianceStatus = "compliant" | "non-compliant" | "partial" | "review" | "inactive";
export type BgCat = "command" | "intelligence" | "scan" | "monitor" | "reports" | "analysis" | "verify" | "admin";
export const GOLD        = "#C5A55A";
export const GOLD_PALE   = "#E1C978";
export const NAVY_BG     = "#04091C";  // أزرق ملكي داكن جداً — خلفية رئيسية
export const NAVY_CARD   = "#07102E";  // أزرق ملكي — سطح الكروت
export const NAVY_SIDEBAR= "#040B2E";  // أزرق ملكي — الشريط الجانبي (ثابت في الوضعين)
export const TEAL        = "#3DB1AC";
export const C_GRN="#1E9E57",C_RED="#B94A55",C_AMB="#C78B2C",C_EMR="#3DBF7A",C_VIO="#7C6BAE",C_SLT="#64748B",C_BLU="#5B8EF0";
export const STATUS_CFG: Record<ComplianceStatus, { label: string; dot: string; text: string; bg: string; border: string }> = {
  compliant:       { label: "ممتثل",         dot: C_GRN, text: "text-[#1E9E57]", bg: "bg-[#1E9E57]/10",  border: "border-[#1E9E57]/20" },
  "non-compliant": { label: "غير ممتثل",     dot: C_RED, text: "text-[#B94A55]", bg: "bg-[#B94A55]/10",  border: "border-[#B94A55]/20" },
  partial:         { label: "ممتثل جزئياً",  dot: C_AMB, text: "text-[#C78B2C]", bg: "bg-[#C78B2C]/10",  border: "border-[#C78B2C]/20" },
  review:          { label: "يحتاج مراجعة",  dot: C_VIO, text: "text-[#7C6BAE]", bg: "bg-[#7C6BAE]/10",  border: "border-[#7C6BAE]/20" },
  inactive:        { label: "لا يعمل",        dot: C_SLT, text: "text-[#64748B]", bg: "bg-[#64748B]/10",  border: "border-[#64748B]/20" }};
export const PAGE_BG: Record<Page, BgCat> = {
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
  admin: "admin"};
export const NAV_GROUPS = [
  { id: "home",    label: "الرئيسية",             icon: LayoutDashboard, badge: null,
    pages: [
      { id: "leadership"  as Page, label: "لوحة القيادة الرئيسية",     icon: LayoutDashboard },{ id: "kpi-dashboard" as Page, label: "مؤشرات الأداء KPI",        icon: Target },{ id: "real-time"   as Page, label: "الإحصائيات المباشرة",        icon: Radio },
    ]},{ id: "rasid",   label: "راصد الذكي",            icon: Bot,             badge: "8",
    pages: [
      { id: "smart-rasid"    as Page, label: "راصد الذكي",              icon: Bot },{ id: "advanced-scan"  as Page, label: "الفحص المتقدم",           icon: Activity },{ id: "sites"          as Page, label: "المواقع",                  icon: Globe },{ id: "mobile-apps"    as Page, label: "التطبيقات",               icon: Smartphone },{ id: "scan-history"   as Page, label: "سجل الفحوصات",            icon: History },{ id: "scan-library"   as Page, label: "مكتبة الفحوصات",          icon: BookOpen },{ id: "scan-schedules" as Page, label: "الجدولة",                 icon: Calendar },{ id: "cases"          as Page, label: "إدارة الحالات",           icon: Folder },
    ]},{ id: "reports", label: "الخطابات والتقارير",    icon: FileText,        badge: null,
    pages: [
      { id: "pdf-reports"          as Page, label: "تقارير PDF",         icon: FileText },{ id: "custom-reports"       as Page, label: "تقارير مخصصة",      icon: Download },{ id: "scheduled-reports"    as Page, label: "تقارير مجدولة",     icon: Calendar },{ id: "message-templates"    as Page, label: "قوالب رسائل",        icon: Mail },{ id: "letters"              as Page, label: "الخطابات",           icon: Send },{ id: "export-data"          as Page, label: "مركز التصدير",       icon: Package },{ id: "improvement-tracker"  as Page, label: "متتبع التحسينات",   icon: TrendingUp },
    ]},{ id: "analytics", label: "تحليلات راصد",        icon: BarChart3,       badge: "8",
    pages: [
      { id: "advanced-analytics"      as Page, label: "التحليلات المتقدمة",        icon: BarChart3 },{ id: "sector-comparison"       as Page, label: "مقارنة القطاعات",           icon: ArrowLeftRight },{ id: "time-comparison"         as Page, label: "المقارنة الزمنية",           icon: Clock },{ id: "compliance-comparison"   as Page, label: "مقارنة الامتثال",            icon: Scale },{ id: "compliance-heatmap"      as Page, label: "خريطة الامتثال الحرارية",   icon: Map },{ id: "advanced-search"         as Page, label: "البحث المتقدم",              icon: SearchIcon },{ id: "change-detection"        as Page, label: "كشف التغييرات",              icon: AlertTriangle },{ id: "interactive-comparison"  as Page, label: "المقارنة التفاعلية",         icon: Layers },
    ]},{ id: "verify",  label: "تحقق راصد",             icon: Shield,          badge: "3",
    pages: [
      { id: "documents-registry" as Page, label: "سجل الوثائق",           icon: Folder },{ id: "verify"             as Page, label: "التحقق من الوثائق",     icon: CheckCircle2 },{ id: "document-stats"     as Page, label: "إحصائيات الوثائق",      icon: BarChart3 },
    ]},
];
export const OVERVIEW_KPIS = [
  { label: "إجمالي المواقع",   value: "24,983", change: "+12%", up: true,  icon: Globe,    color: GOLD    },{ label: "إجمالي الفحوصات", value: "9,945",  change: "+8%",  up: true,  icon: Activity, color: TEAL    },{ label: "مواقع لا تعمل",   value: "10,839", change: "+2%",  up: false, icon: WifiOff,  color: C_RED },{ label: "إجمالي المنتجات", value: "9,945",  change: "+5%",  up: true,  icon: Database, color: C_GRN },
];
export const COMPLIANCE_KPIS = [
  { label: "ممتثل",        value: "911",   pct: 9,  color: C_GRN, textColor: C_EMR },{ label: "غير ممتثل",   value: "7,994", pct: 80, color: C_RED, textColor: "#D9728A" },{ label: "ممتثل جزئياً",value: "1,040", pct: 11, color: C_AMB, textColor: "#DFA947" },
];
export const TREND_DATA = [
  { month: "يناير",  ممتثل: 820, جزئياً: 980  },{ month: "فبراير", ممتثل: 845, جزئياً: 1005 },{ month: "مارس",   ممتثل: 862, جزئياً: 1015 },{ month: "أبريل",  ممتثل: 878, جزئياً: 1025 },{ month: "مايو",   ممتثل: 895, جزئياً: 1033 },{ month: "يونيو",  ممتثل: 911, جزئياً: 1040 },
];
export const PIE_DATA = [
  { name: "ممتثل",         value: 911,  color: C_GRN },{ name: "غير ممتثل",    value: 7994, color: C_RED },{ name: "جزئياً",        value: 1040, color: C_AMB },{ name: "يحتاج مراجعة", value: 520,  color: C_VIO },{ name: "لا يعمل",       value: 518,  color: C_SLT },
];
export const WEBSITES: { name: string; url: string; status: ComplianceStatus; score: number; lastScan: string; sector: string }[] = [
  { name: "وزارة التجارة",            url: "commerce.gov.sa", status: "compliant",     score: 94, lastScan: "منذ ساعتين",   sector: "حكومي"   },{ name: "البنك الأهلي السعودي",     url: "alahli.com",      status: "partial",       score: 67, lastScan: "منذ 4 ساعات", sector: "بنكي"    },{ name: "أمازون السعودية",          url: "amazon.sa",       status: "non-compliant", score: 32, lastScan: "منذ يوم",     sector: "تجاري"   },{ name: "وزارة الصحة",             url: "moh.gov.sa",      status: "compliant",     score: 91, lastScan: "منذ ساعة",    sector: "حكومي"   },{ name: "شركة stc",                 url: "stc.com.sa",      status: "review",        score: 58, lastScan: "منذ 3 ساعات", sector: "اتصالات" },{ name: "هيئة الاتصالات والفضاء",  url: "cst.gov.sa",      status: "compliant",     score: 88, lastScan: "منذ 5 ساعات", sector: "حكومي"   },{ name: "مدى للمدفوعات",           url: "mada.com.sa",     status: "partial",       score: 72, lastScan: "منذ 6 ساعات", sector: "مالي"    },{ name: "نون للتجارة الإلكترونية", url: "noon.com/ar-sa",  status: "non-compliant", score: 41, lastScan: "منذ يومين",   sector: "تجاري"   },{ name: "ثمانية للإعلام",          url: "thmanyah.com",    status: "review",        score: 61, lastScan: "منذ يوم",     sector: "إعلامي"  },{ name: "جامعة الملك عبدالله",     url: "kaust.edu.sa",    status: "inactive",      score: 0,  lastScan: "منذ أسبوع",   sector: "تعليمي"  },{ name: "سلة للتجارة",             url: "salla.sa",        status: "partial",       score: 74, lastScan: "منذ 8 ساعات", sector: "تجاري"   },{ name: "وزارة المالية",           url: "mof.gov.sa",      status: "compliant",     score: 96, lastScan: "منذ 3 ساعات", sector: "حكومي"   },
];
export const SECTOR_DATA = [
  { sector: "حكومي",    ممتثل: 287, جزئياً: 89,  "غير ممتثل": 43   },{ sector: "بنكي",     ممتثل: 156, جزئياً: 178, "غير ممتثل": 234  },{ sector: "تجاري",   ممتثل: 89,  جزئياً: 345, "غير ممتثل": 1456 },{ sector: "صحي",     ممتثل: 134, جزئياً: 234, "غير ممتثل": 567  },{ sector: "اتصالات", ممتثل: 67,  جزئياً: 145, "غير ممتثل": 234  },{ sector: "تعليمي",  ممتثل: 178, جزئياً: 89,  "غير ممتثل": 456  },
];
export const RADAR_DATA = [
  { subject: "جمع البيانات", A: 72 },{ subject: "حق الوصول", A: 45 },{ subject: "الموافقة", A: 38 },{ subject: "الإفصاح",   A: 61 },{ subject: "الحذف", A: 29 },{ subject: "النقل",     A: 53 },
];
export const CHAT_MESSAGES = [
  { role: "assistant", text: "مرحباً! أنا راصد الذكي v6.0، مساعدك لتحليل سياسات الخصوصية والامتثال. كيف يمكنني مساعدتك اليوم؟", time: "10:30" },{ role: "user",      text: "أريد تقريراً عن حالة الامتثال في القطاع البنكي", time: "10:31" },{ role: "assistant", text: "بناءً على تحليلي لـ 568 موقعاً في القطاع البنكي:\n\n• 156 موقع ممتثل (27.5%)\n• 234 موقع غير ممتثل (41.2%)\n• 178 موقع ممتثل جزئياً (31.3%)\n\nأبرز المخالفات: غياب آلية الموافقة الصريحة وعدم وضوح سياسة الاحتفاظ بالبيانات. هل تريد تقرير مفصل؟", time: "10:31" },
];
export const SUGGESTED_PROMPTS = [
  { text: "حلل سياسة الخصوصية لموقع moh.gov.sa",      icon: Eye        },{ text: "المواقع الأكثر مخالفةً في القطاع البنكي",  icon: AlertCircle },{ text: "أنشئ تقرير امتثال شهري PDF",               icon: FileText   },{ text: "قارن سياسات المواقع الحكومية الكبرى",      icon: BarChart3  },
];
export const MOBILE_APPS = [
  { name: "صحتي",         org: "وزارة الصحة",             status: "compliant"     as ComplianceStatus, score: 91 },{ name: "أبشر أفراد",  org: "وزارة الداخلية",           status: "partial"       as ComplianceStatus, score: 74 },{ name: "توكلنا",       org: "مركز الأمن الوطني",        status: "compliant"     as ComplianceStatus, score: 88 },{ name: "موعد",         org: "وزارة الصحة",             status: "compliant"     as ComplianceStatus, score: 85 },{ name: "نفاذ",         org: "هيئة الاتصالات",           status: "partial"       as ComplianceStatus, score: 62 },{ name: "ناجز",         org: "وزارة العدل",              status: "compliant"     as ComplianceStatus, score: 79 },{ name: "وثّق",         org: "وزارة العدل",              status: "non-compliant" as ComplianceStatus, score: 38 },{ name: "الراجحي موبايل",org:"بنك الراجحي",             status: "partial"       as ComplianceStatus, score: 68 },{ name: "stc Pay",      org: "شركة stc",                 status: "non-compliant" as ComplianceStatus, score: 42 },{ name: "بلدي",         org: "وزارة الشؤون البلدية",     status: "partial"       as ComplianceStatus, score: 71 },{ name: "اعتماد",       org: "وزارة الموارد البشرية",   status: "compliant"     as ComplianceStatus, score: 83 },{ name: "نجيز",         org: "وزارة العدل",              status: "review"        as ComplianceStatus, score: 55 },
];
export const SCAN_HISTORY = [
  { title: "فحص دفعي — الجهات الحكومية 1", date: "7 محرم 1448", sites: 45, duration: "12 دقيقة", status: "compliant" as ComplianceStatus },{ title: "فحص دفعي — القطاع الصحي",      date: "6 محرم 1448", sites: 34, duration: "9 دقائق",  status: "partial"   as ComplianceStatus },{ title: "فحص يومي — المواقع النشطة",    date: "5 محرم 1448", sites: 89, duration: "22 دقيقة", status: "compliant" as ComplianceStatus },{ title: "فحص دفعي — الجهات الحكومية 2", date: "4 محرم 1448", sites: 31, duration: "8 دقائق",  status: "review"    as ComplianceStatus },
];
export const CASES = [
  { title: "عدم وجود سياسة خصوصية في بوابة أبشر",       priority: "high",   status: "review"      as ComplianceStatus, date: "3 محرم 1448", assigned: "سارة الزهراني" },{ title: "غياب آلية موافقة صريحة في موقع السدير",     priority: "medium", status: "partial"     as ComplianceStatus, date: "5 محرم 1448", assigned: "فهد الشمري"  },{ title: "عدم الإفصاح عن أطراف ثالثة في موقع نون",   priority: "high",   status: "review"      as ComplianceStatus, date: "1 محرم 1448", assigned: "محمد العتيبي" },{ title: "سياسة خصوصية منتهية الصلاحية — جامعة KAU", priority: "low",    status: "compliant"   as ComplianceStatus, date: "29 ذي الحجة 1447", assigned: "نورة القحطاني" },
];
export const SCHEDULED_REPORTS = [
  { title: "الملخص التنفيذي الأسبوعي",      freq: "أسبوعي",   active: true,  next: "14 محرم 1448" },{ title: "التقرير الشهري المفصّل",         freq: "شهري",     active: true,  next: "1 صفر 1448"  },{ title: "تحليل القطاعات الربع سنوي",     freq: "ربع سنوي", active: false, next: "1 ربيع أول 1448" },{ title: "تنبيه الامتثال الأسبوعي",       freq: "أسبوعي",   active: true,  next: "14 محرم 1448" },{ title: "تقرير القطاع الصحي الشهري",    freq: "شهري",     active: true,  next: "1 صفر 1448"  },{ title: "تقرير القطاع البنكي الربعي",    freq: "ربع سنوي", active: false, next: "1 ربيع أول 1448" },
];
export const ADMIN_SECTIONS = [
  { id: "theme",         label: "إدارة المظهر",       icon: Palette   },{ id: "brand",         label: "الهوية البصرية",     icon: Star      },{ id: "logo",          label: "إعدادات الشعار",     icon: ImageIcon },{ id: "typography",    label: "الخطوط والطباعة",    icon: Type      },{ id: "navigation",    label: "التنقل والقائمة",    icon: Navigation},{ id: "api",           label: "مفاتيح API",          icon: Key       },{ id: "notifications", label: "الإشعارات",           icon: Bell      },{ id: "users",         label: "إدارة المستخدمين",  icon: Users     },
];
export const PAGE_TITLE: Record<Page, string> = {
  leadership: "لوحة القيادة الرئيسية", "kpi-dashboard": "مؤشرات الأداء KPI", "real-time": "الإحصائيات المباشرة",
  "smart-rasid": "راصد الذكي", "advanced-scan": "الفحص المتقدم", sites: "المواقع", "mobile-apps": "التطبيقات",
  "scan-history": "سجل الفحوصات", "scan-library": "مكتبة الفحوصات", "scan-schedules": "الجدولة", cases: "إدارة الحالات",
  "pdf-reports": "تقارير PDF", "custom-reports": "تقارير مخصصة", "scheduled-reports": "تقارير مجدولة",
  "message-templates": "قوالب رسائل", letters: "الخطابات الرسمية", "export-data": "مركز التصدير", "improvement-tracker": "متتبع التحسينات",
  "advanced-analytics": "التحليلات المتقدمة", "sector-comparison": "مقارنة القطاعات", "time-comparison": "المقارنة الزمنية",
  "compliance-comparison": "مقارنة الامتثال", "compliance-heatmap": "خريطة الامتثال الحرارية",
  "advanced-search": "البحث المتقدم", "change-detection": "كشف التغييرات", "interactive-comparison": "المقارنة التفاعلية",
  "documents-registry": "سجل الوثائق", verify: "التحقق من الوثائق", "document-stats": "إحصائيات الوثائق",
  admin: "لوحة التحكم الإداري", "site-profile": "ملف الموقع"};
export const ARTICLE12 = [
  { id: 1, ar: "جمع البيانات وأغراضها",                en: "Data Collection & Purposes"            },{ id: 2, ar: "معالجة البيانات الشخصية",               en: "Personal Data Processing"               },{ id: 3, ar: "تخزين البيانات وفترة الاحتفاظ",        en: "Storage & Retention Period"             },{ id: 4, ar: "الإفصاح ومشاركة البيانات مع الأطراف", en: "Disclosure & Third-Party Sharing"        },{ id: 5, ar: "حقوق أصحاب البيانات الشخصية",          en: "Data Subject Rights"                    },{ id: 6, ar: "آلية تقديم الطلبات والشكاوى",          en: "Requests & Complaints Mechanism"        },{ id: 7, ar: "تحديثات وإخطارات سياسة الخصوصية",     en: "Privacy Policy Updates & Notifications" },{ id: 8, ar: "معلومات التواصل مع المسؤول",            en: "Controller Contact Information"         },
];
export function getArticle12Scores(score: number) {
  return ARTICLE12.map((c, i) => {
    const variation = Math.sin(i * 1.9 + score * 0.07) * 18;
    const pct = Math.max(0, Math.min(100, Math.round(score + variation)));
    const status: "compliant"|"partial"|"non-compliant" = pct >= 70 ? "compliant" : pct >= 40 ? "partial" : "non-compliant";
    const notes: Record<string, string[]> = {
      compliant: ["محدد بوضوح ومفصّل","مستوفى بالكامل","معلومات كافية ووافية","متوافق تماماً مع المتطلبات"],
      partial:   ["يحتاج توضيحاً إضافياً","غير مكتمل جزئياً","يفتقر إلى بعض التفاصيل","يحتاج إلى تحسين"],
      "non-compliant": ["مفقود بالكامل","لا يوجد ذكر له","غائب كلياً","بحاجة عاجلة للإضافة"]};
    return { ...c, pct, status, note: notes[status][i % 4] };
  });
}
export function getScanHistory(score: number) {
  const base = score;
  return [
    { date: "7 محرم 1448",       score: base,         change: +3,  pages: 12, duration: "4 دقائق", id: "SCN-2026-1441" },{ date: "1 محرم 1448",       score: base - 3,     change: +5,  pages: 11, duration: "5 دقائق", id: "SCN-2026-1412" },{ date: "24 ذي الحجة 1447", score: base - 8,     change: -2,  pages: 13, duration: "4 دقائق", id: "SCN-2026-1398" },{ date: "15 ذي الحجة 1447", score: base - 6,     change: +8,  pages: 10, duration: "6 دقائق", id: "SCN-2026-1372" },{ date: "1 ذي الحجة 1447",  score: base - 14,    change: -4,  pages: 9,  duration: "3 دقائق", id: "SCN-2026-1348" },
  ];
}
export function CountUp({ target, duration = 1100 }: { target: string; duration?: number }) {
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
export function CircularProgress({ pct, size = 160 }: { pct: number; size?: number }) {
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
          <stop offset="100%" stopColor={C_EMR} />
          </linearGradient>
        </defs>
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke="var(--border)" strokeWidth={strokeW} />
        <circle cx={size/2} cy={size/2} r={r - 16} fill="none"
          stroke={`${GOLD}08`} strokeWidth={1} strokeDasharray="3 4" />
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke="url(#circ-grad)" strokeWidth={strokeW}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.5s ease",
          filter: `drop-shadow(0 0 8px ${GOLD}70)` }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-black leading-none tabular-nums"
          style={{ color: GOLD,
          fontSize: size > 140 ? "2.5rem" : "1.75rem" }}>
          {Math.round(pct)}
        </span>
        <span className="text-sm font-bold" style={{ color: GOLD}}>%</span>
        <span className="text-[10px] text-muted-foreground mt-1">اكتمل</span>
      </div>
    </div>
  );
}
export function InsetFrame({ radius = 14, accent = GOLD }: { radius?: number; accent?: string }) {
  return (
    <div className="absolute pointer-events-none z-10"
         style={{ inset: 4, borderRadius: radius, border: `1px solid ${accent}14`,
          boxShadow: `inset 0 0 0 0.5px rgba(255,255,255,0.03)` }} />
  );
}
export function CommandFrame({ color = GOLD, size = 14, opacity = 0.55, inset = 0 }: {
  color?: string; size?: number; opacity?: number; inset?: number;
}) {
  const corners = [
    { pos: { top: inset, left: inset },     d: `M0 ${size} L0 0 L${size} 0` },{ pos: { top: inset, right: inset },    d: `M0 0 L${size} 0 L${size} ${size}` },{ pos: { bottom: inset, left: inset },  d: `M0 0 L0 ${size} L${size} ${size}` },{ pos: { bottom: inset, right: inset }, d: `M${size} 0 L${size} ${size} L0 ${size}` },
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
export function HudLabel({ children, color = GOLD, className = "" }: {
  children: React.ReactNode; color?: string; className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[9px] font-mono tracking-[0.18em] uppercase ${className}`}
          style={{ color }}>
      {children}
    </span>
  );
}
export function GlassPanel({ children, className = "", accent = GOLD, frame = true, scanline = false, style: xs = {} }: {
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
           ...xs}}>
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
export const LOGO_GOLD_FILTER = "none";
export function RasidLogo({ variant = "gold", className = "", animate = false, style: xs = {}, tone = "gold" }: {
  variant?: "gold" | "wordmark" | "light"; className?: string; animate?: boolean; style?: React.CSSProperties;
  tone?: "gold" | "navy";
}) {
  // The brand surfaces that show this logo (sidebar, loading) are ALWAYS dark navy,
  // so we display the gold calligraphy (Rased_5) directly — already gold on a
  // transparent background, no filter needed. tone="navy" available for light surfaces.
  const src = variant === "wordmark" ? rasidLogoWordmark : tone === "navy" ? rasidLogoLight : rasidLogoGold;
  return (
    <div className="relative inline-block rl-anim" style={{ ...xs }}>
      <span className="rl-glow" aria-hidden />
      <ImageWithFallback src={src} alt="منصة راصد"
        className={`relative object-contain select-none block ${className}`} />
      <span className="rl-sweep" aria-hidden
        style={{ WebkitMaskImage: `url(${src})`, maskImage: `url(${src})` }} />
    </div>
  );
}
export function SdaiaLogo({ variant = "full" }: { variant?: "full" | "compact" }) {
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
export function ComplianceBadge({ status, clickable = false }: { status: ComplianceStatus; clickable?: boolean }) {
  const c = STATUS_CFG[status];
  const handleClick = clickable ? (e: React.MouseEvent) => {
    e.stopPropagation();
    (window as any)._rasidOpenDrill?.(status, `المواقع — ${c.label}`, c.dot, c.dot);
  } : undefined;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${c.text} ${c.bg} ${c.border} ${clickable ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`}
          onClick={handleClick}>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.dot }} />
      {c.label}
    </span>
  );
}
export function PCard({ children, className = "", goldTop = false, glowColor = "", style: xs = {} }: {
  children: React.ReactNode; className?: string; goldTop?: boolean; glowColor?: string; style?: React.CSSProperties;
}) {
  return (
    <div className={`relative rounded-2xl overflow-hidden pcard-interactive ${className}`}
         style={{
           background: "var(--card)",
           border: "1px solid var(--border)",
           boxShadow: glowColor
          ? `var(--card-shadow), 0 0 70px ${glowColor}0A`
          : "var(--card-shadow)",
           ...xs}}>
      {goldTop && (
        <>
          <div className="absolute top-0 inset-x-0 h-[1.5px] z-10"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${GOLD} 25%, ${GOLD_PALE} 50%, ${GOLD} 75%, transparent 100%)` }} />
          <div className="absolute top-0 inset-x-0 h-28 z-0 pointer-events-none"
          style={{ background: `linear-gradient(180deg, ${GOLD}06 0%, transparent 100%)` }} />
        </>
      )}
      <InsetFrame radius={14} />
      {children}
    </div>
  );
}
export function KPICard({ label, value, change, up, icon: Icon, color }: typeof OVERVIEW_KPIS[0]) {
  return (
    <div className="relative rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-300 cursor-default cs">
      <InsetFrame radius={14} accent={color} />
      <div className="relative z-10 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
          <div className="icon-chip w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}16` }}>
          <Icon size={17} style={{ color }} />
          </div>
          <span className="text-[13px] text-muted-foreground font-medium">{label}</span>
          </div>
          <div className={`flex items-center gap-0.5 text-[11px] font-bold ${up ? "text-[#3DBF7A]" : "text-[#D9728A]"}`}>
          {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {change}
          </div>
        </div>
        <div className="text-[30px] font-black text-foreground tabular-nums tracking-tight leading-none"
          style={{ animation: "count-pop 0.4s ease-out 0.1s both" }}>
          <CountUp target={value} />
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 h-1 rounded-full overflow-hidden cs-muted">
          <div className="h-full rounded-full" style={{ width: up ? "72%" : "40%", background: color, animation: "card-rise 0.8s ease-out 0.3s both" }} />
          </div>
          <span className="text-[10px] text-muted-foreground font-mono">{up ? "72%" : "40%"}</span>
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
           style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
    </div>
  );
}
export function SmallKPI({ label, value, icon: Icon, color, delay = 0 }: {
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
          style={{ color, animation: "count-pop 0.4s ease-out 0.15s both" }}>
          <CountUp target={value} />
          </div>
          <div className="text-xs text-muted-foreground mt-1 font-medium">{label}</div>
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}40, transparent)` }} />
    </div>
  );
}
export function ComplianceCard({ label, value, pct, color, textColor }: typeof COMPLIANCE_KPIS[0]) {
  const r = 24; const circ = 2 * Math.PI * r; const dash = (pct / 100) * circ;
  return (
    <PCard goldTop className="p-5 hover:translate-y-[-2px] transition-all duration-200 cursor-default">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div style={{ color: textColor, animation: "count-pop 0.4s ease-out 0.15s both" }}
          className="text-4xl font-extrabold mb-1 tabular-nums">
          <CountUp target={value} />
          </div>
          <div className="text-sm text-muted-foreground">{label}</div>
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
          <span style={{ color: textColor}} className="text-sm font-bold">{pct}%</span>
          </div>
        </div>
      </div>
    </PCard>
  );
}
export const BANNER_THEMES: Record<BgCat, { from: string; via: string; accent: string; gridColor: string }> = {
  command:      { from: "#04091C", via: "#07102E", accent: GOLD,      gridColor: GOLD    },
  intelligence: { from: "#070A1E", via: "#07102E", accent: C_VIO, gridColor: TEAL   },
  scan:         { from: "#030E0D", via: "#071A18", accent: C_GRN, gridColor: TEAL   },
  monitor:      { from: "#04091C", via: "#091728", accent: TEAL,      gridColor: TEAL   },
  reports:      { from: "#090812", via: "#0F0D1E", accent: C_VIO, gridColor: GOLD   },
  analysis:     { from: "#060A1C", via: "#0A1030", accent: C_BLU, gridColor: C_BLU },
  verify:       { from: "#050F12", via: "#071820", accent: TEAL,      gridColor: TEAL   },
  admin:        { from: "#070914", via: "#0D0F24", accent: GOLD,      gridColor: GOLD   }};
export function HeroBanner({ title, subtitle, badge, actions, page }: {
  title: string; subtitle?: string; badge?: string; actions?: React.ReactNode; page?: Page;
}) {
  const cat: BgCat = page ? (PAGE_BG[page] || "command") : "command";
  const theme = BANNER_THEMES[cat];
  const bannerBg = `linear-gradient(135deg, ${NAVY_BG} 0%, ${NAVY_CARD} 60%, ${NAVY_BG} 100%)`;
  return (
    <div className="relative overflow-hidden rounded-2xl mb-3 flex-shrink-0"
         style={{
           background: bannerBg,
           animation: "hero-reveal 0.45s ease-out both",
           border: `1.5px solid rgba(197,165,90,0.42)`,
           boxShadow: `0 0 0 1px rgba(197,165,90,0.06),  /* طبقة خارجية ناعمة */
          0 12px 40px rgba(4,9,28,0.55),    /* ظل سينمائي */
          inset 0 0 0 1px rgba(197,165,90,0.04)`, /* خط داخلي خفي */}}>
      <InsetFrame radius={15} accent={GOLD} />
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: "absolute", top: "-30%", right: "15%", width: "400px", height: "400px",
          background: `radial-gradient(ellipse, ${GOLD}12, transparent 65%)`, animation: "shimmer-pulse 5s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "-20%", left: "25%", width: "300px", height: "300px",
          background: `radial-gradient(ellipse, ${GOLD}06, transparent 70%)`, animation: "shimmer-pulse 7s ease-in-out 1.5s infinite" }} />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.025 }}>
          <defs><pattern id={`hg-${(title||"").replace(/\s+/g,"")}`} width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M 36 0 L 0 0 0 36" fill="none" stroke={GOLD} strokeWidth="0.5"/>
          </pattern></defs>
          <rect width="100%" height="100%" fill={`url(#hg-${(title||"").replace(/\s+/g,"")})`} />
        </svg>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1.5px",
          background: `linear-gradient(90deg, transparent, ${GOLD}80, ${GOLD_PALE}, ${GOLD}80, transparent)` }} />
        <div className="absolute inset-x-0 top-0 h-16 pointer-events-none"
          style={{ background: `linear-gradient(180deg, ${GOLD}0A, transparent)`, animation: "hud-scanline 8s linear infinite" }} />
      </div>
      <div className="relative z-10 flex items-center justify-between px-6 pt-3">
        <HudLabel color={`${GOLD}85`}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD, animation: "status-blink 1.5s ease-in-out infinite" }} />
          {cat === "command" ? "COMMAND CENTER" : cat === "intelligence" ? "AI INTELLIGENCE" : cat === "scan" ? "SCAN CONSOLE" : cat === "analysis" ? "DATA ANALYTICS" : cat === "reports" ? "REPORTING CENTER" : cat === "verify" ? "VERIFICATION SYSTEM" : "CONTROL CENTER"}
        </HudLabel>
        <HudLabel color="rgba(255,255,255,0.32)">NDMO · RASID v6.0</HudLabel>
      </div>
      <div className="relative z-10 flex items-center justify-between gap-4 px-6 pb-5 pt-2">
        <div className="flex-1 min-w-0">
          <h1 className="text-[26px] font-black text-white leading-tight">{title}</h1>
          {subtitle && (
          <p className="text-sm mt-1.5 leading-relaxed" style={{ color: "rgba(255,255,255,0.48)" }}>{subtitle}</p>
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
        <div className="flex-shrink-0 flex items-center">
          <div className="relative hidden lg:block" style={{ animation: "float-bob 5s ease-in-out infinite" }}>
          <div className="absolute inset-0 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${theme.accent}28, transparent 70%)`, transform: "scale(1.5)", animation: "rasidPulse 3.5s ease-in-out infinite" }} />
          <ImageWithFallback src={characterShmagh} alt="راصد"
          className="relative h-24 w-auto object-contain"
          style={{ filter: `drop-shadow(0 8px 20px rgba(0,0,0,0.45))` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
export function CinematicSharedLayers({ acc }: { acc: string }) {
  return (
    <>
      {/* Large breathing glow orbs — clearly perceivable atmosphere */}
      <div style={{ position:"absolute", top:"-14%", right:"2%", width:"620px", height:"620px",
          background:`radial-gradient(ellipse, ${acc}26 0%, transparent 62%)`,
          animation:"mesh-drift 22s ease-in-out infinite" }} />
      <div style={{ position:"absolute", bottom:"4%", left:"4%", width:"460px", height:"460px",
          background:`radial-gradient(ellipse, ${GOLD}1A 0%, transparent 66%)`,
          animation:"mesh-drift 28s ease-in-out 3s infinite reverse" }} />
      {/* Moving mesh-gradient field */}
      <div style={{ position:"absolute", top:"22%", left:"24%", width:"560px", height:"460px",
          background:`radial-gradient(ellipse, ${acc}1E 0%, transparent 60%)`,
          filter:"blur(8px)", animation:"mesh-drift 26s ease-in-out 1s infinite" }} />
      {/* Digital grid layer — visible but calm */}
      <div style={{ position:"absolute", inset:0, opacity:0.07,
          backgroundImage:`linear-gradient(${acc} 1px, transparent 1px), linear-gradient(90deg, ${acc} 1px, transparent 1px)`,
          backgroundSize:"44px 44px",
          maskImage:"radial-gradient(ellipse at center, black 30%, transparent 85%)",
          WebkitMaskImage:"radial-gradient(ellipse at center, black 30%, transparent 85%)" }} />
      {/* RTL data-stream light trails */}
      {[0,1,2,3].map(i => (
        <div key={`str-${i}`} style={{ position:"absolute", height:"1.5px",
          width:`${180+i*70}px`, top:`${18+i*20}%`, right:0,
          background:`linear-gradient(to left, transparent, ${acc}55, ${GOLD}40, transparent)`,
          boxShadow:`0 0 8px ${acc}40`,
          animation:`stream-rtl ${5+i*1.1}s linear ${i*1.4}s infinite` }} />
      ))}
      {/* Floating data particles */}
      {[0,1,2,3,4,5,6,7].map(i => (
        <div key={`pt-${i}`} style={{ position:"absolute",
          width:`${3+(i%3)}px`, height:`${3+(i%3)}px`, borderRadius:"50%",
          left:`${(i*23+6)%92}%`, bottom:`${(i*16+4)%42}%`,
          background: i%2===0 ? GOLD : acc, opacity:0.7,
          boxShadow:`0 0 8px ${i%2===0 ? GOLD : acc}`,
          animation:`particle-up ${6+i*1.1}s ease-in ${i*0.7}s infinite` }} />
      ))}
      {/* Slow horizontal scan beams — clearly visible cinematic motion */}
      <div style={{ position:"absolute", top:0, bottom:0, width:"200px",
          background:`linear-gradient(90deg, transparent, ${acc}1E, ${acc}30, ${acc}1E, transparent)`,
          animation:"bg-scan-x 10s linear infinite" }} />
      <div style={{ position:"absolute", top:0, bottom:0, width:"140px",
          background:`linear-gradient(90deg, transparent, ${GOLD}18, ${GOLD}24, ${GOLD}18, transparent)`,
          animation:"bg-scan-x 14s linear 5s infinite" }} />
      {/* Corner depth gradients */}
      <div style={{ position:"absolute", top:0, right:0, width:"40%", height:"40%",
          background:`radial-gradient(ellipse at top right, ${acc}1C, transparent 65%)` }} />
      <div style={{ position:"absolute", bottom:0, left:0, width:"32%", height:"34%",
          background:`radial-gradient(ellipse at bottom left, ${GOLD}12, transparent 70%)` }} />
      {/* Edge vignette to focus content & deepen atmosphere (mode-adaptive) */}
      <div className="bg-vignette" style={{ position:"absolute", inset:0 }} />
    </>
  );
}
export function CinematicBg({ page }: { page: Page }) {
  const cat = PAGE_BG[page] || "command";
  const acc = BANNER_THEMES[cat].accent;
  let extra: React.ReactNode = null;
  if (cat === "command") extra = <>{[580,390,220].map((s,i) => (
    <div key={i} style={{position:"absolute",width:s,height:s,right:`${3+i*8}%`,top:`${-20+i*8}%`,
      border:`1px solid ${GOLD}${["2E","24","1A"][i]}`,borderRadius:"50%",
      animation:`${i%2?"orbit-ring-r":"orbit-ring"} ${55+i*18}s linear infinite`}}/>
  ))}</>;
  if (cat === "scan") extra = <svg style={{position:"absolute",left:"10%",top:"5%",width:"320px",height:"320px",opacity:0.20}}>
    {[50,90,130,160].map((r,i)=><circle key={i} cx="160" cy="160" r={r} fill="none" stroke={C_GRN} strokeWidth="0.5" opacity={0.7-i*0.12}/>)}
    <line x1="10" y1="160" x2="310" y2="160" stroke={C_GRN} strokeWidth="0.4" opacity="0.35"/>
    <line x1="160" y1="10" x2="160" y2="310" stroke={C_GRN} strokeWidth="0.4" opacity="0.35"/>
    <g style={{transformOrigin:"160px 160px",animation:"radar-arm 3.5s linear infinite"}}>
      <line x1="160" y1="160" x2="160" y2="12" stroke={C_GRN} strokeWidth="1.6" opacity="0.85"/>
      <path d="M 160 160 L 160 12 A 148 148 0 0 1 272 230 Z" fill={C_GRN} opacity="0.06"/>
    </g>
  </svg>;
  if (cat === "intelligence") extra = <>{[...Array(18)].map((_,i) => {
    const c = i%3===0?GOLD:i%3===1?TEAL:C_VIO;
    return <div key={i} style={{position:"absolute",width:`${3+(i%2)}px`,height:`${3+(i%2)}px`,borderRadius:"50%",
      left:`${(i*71+13)%90}%`,top:`${(i*43+9)%82}%`,background:c,opacity:0.5,
      animation:`neural-pulse ${2.1+(i%4)*0.5}s ease-in-out ${i*0.15}s infinite`}}/>;
  })}</>;
  if (cat === "monitor") extra = <>{[0,1,2,3].map(i => (
    <div key={i} style={{position:"absolute",width:"100%",height:"1.5px",top:`${20+i*18}%`,
      background:`linear-gradient(90deg,transparent,${TEAL}${["2A","38","2A","20"][i]},transparent)`,
      animation:`shimmer-pulse ${3.5+i*0.6}s ease-in-out ${i*0.5}s infinite`}}/>
  ))}</>;
  if (cat === "verify") extra = <svg style={{position:"absolute",right:"10%",top:"-5%",width:"300px",height:"340px",opacity:0.15}}>
    <path d="M 150 18 L 278 72 L 278 180 C 278 262 150 324 150 324 C 150 324 22 262 22 180 L 22 72 Z"
      fill="none" stroke={TEAL} strokeWidth="1.2" style={{animation:"shimmer-pulse 4s ease-in-out infinite"}}/>
    <path d="M 150 48 L 252 92 L 252 180 C 252 244 150 298 150 298 C 150 298 48 244 48 180 L 48 92 Z"
      fill="none" stroke={TEAL} strokeWidth="0.7" opacity="0.5"/>
  </svg>;
  if (cat === "reports") extra = <>{[0,1,2,3].map(i => (
    <div key={i} style={{position:"absolute",width:28,height:36,borderRadius:"4px 10px 4px 4px",
      left:`${12+i*25}%`,top:`${10+(i%2)*20}%`,
      border:`1px solid ${GOLD}${["30","26","30","22"][i]}`,background:`${GOLD}0C`,
      animation:`particle-up ${5+i*0.8}s ease-in ${i*0.7}s infinite`}}/>
  ))}</>;
  if (cat === "analysis") extra = <>{[0,1,2,3,4].map(i => (
    <div key={i} style={{position:"absolute",left:`${12+i*19}%`,top:0,width:"1.5px",height:"65%",
      background:`linear-gradient(180deg,transparent,${C_BLU}55,${TEAL}30,transparent)`,
      boxShadow:`0 0 6px ${C_BLU}30`,
      animation:`data-fall ${4+i*0.8}s linear ${i*1.1}s infinite`}}/>
  ))}</>;
  if (cat === "admin") extra = <>{[0,1,2].map(i => (
    <div key={i} style={{position:"absolute",width:`${180+i*100}px`,height:`${180+i*100}px`,
      right:`${5+i*8}%`,top:`${5+i*8}%`,
      border:`1px solid ${GOLD}${["24","1C","14"][i]}`,borderRadius:"8px",
      animation:`${i%2?"orbit-ring-r":"orbit-ring"} ${40+i*15}s linear infinite`}}/>
  ))}</>;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" style={{zIndex:0}}>
      <CinematicSharedLayers acc={acc}/>
      {extra}
    </div>
  );
}
export function PageHeader({ title, subtitle, icon: Icon, actions }: {
  title: string; subtitle: string; icon?: React.ElementType; actions?: React.ReactNode;
}) {
  const bannerBg = `linear-gradient(135deg, ${NAVY_BG} 0%, ${NAVY_CARD} 60%, ${NAVY_BG} 100%)`;
  return (
    <div className="relative overflow-hidden rounded-2xl mb-3 flex-shrink-0"
         style={{
           background: bannerBg,
           animation: "hero-reveal 0.4s ease-out both",
           border: `1.5px solid rgba(197,165,90,0.42)`,
           boxShadow: `0 0 0 1px rgba(197,165,90,0.06), 0 12px 40px rgba(4,9,28,0.50), inset 0 0 0 1px rgba(197,165,90,0.04)`}}>
      <InsetFrame radius={15} accent={GOLD} />
      <div className="absolute top-0 inset-x-0 h-[1.5px] z-10"
           style={{ background: `linear-gradient(90deg, transparent, ${GOLD}80, ${GOLD_PALE}, ${GOLD}80, transparent)` }} />
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: "absolute", top: "-30%", right: "10%", width: "300px", height: "300px",
          background: `radial-gradient(ellipse, ${GOLD}10, transparent 65%)`, animation: "shimmer-pulse 5s ease-in-out infinite" }} />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.022 }}>
          <defs><pattern id={`phg-${(title||"").replace(/\s+/g,"")}`} width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M 36 0 L 0 0 0 36" fill="none" stroke={GOLD} strokeWidth="0.5"/>
          </pattern></defs>
          <rect width="100%" height="100%" fill={`url(#phg-${(title||"").replace(/\s+/g,"")})`} />
        </svg>
      </div>
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
          <h1 className="text-xl font-black text-white leading-tight">{title}</h1>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
      </div>
    </div>
  );
}
export function FloatingAssistant({ setPage }: { setPage: (p: Page) => void }) {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={() => setPage("smart-rasid")}
          onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
          className="no-press fixed bottom-5 left-5 z-50 flex items-center transition-all duration-300 group"
          style={{ animation: "float-bob 4.5s ease-in-out infinite" }}>
      <div className="overflow-hidden transition-all duration-300 flex items-center"
           style={{ maxWidth: hover ? "180px" : "0px", opacity: hover ? 1 : 0 }}>
        <div className="glass relative rounded-2xl px-4 py-2.5 me-[-14px] ps-4"
          style={{ boxShadow: "0 8px 28px rgba(0,0,0,0.35)" }}>
          <CommandFrame color={GOLD} size={9} opacity={0.5} inset={4} />
          <div className="whitespace-nowrap pe-3">
          <div className="text-xs font-bold leading-none" style={{ color: GOLD }}>راصد الذكي</div>
          <div className="flex items-center gap-1 mt-1">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: C_EMR, animation: "status-blink 1.4s ease-in-out infinite" }} />
          <span className="text-[9px] text-muted-foreground">متاح للمساعدة</span>
          </div>
          </div>
        </div>
      </div>
      <div className="relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
        <div className="absolute inset-0 rounded-full -z-10"
          style={{ background: `radial-gradient(circle, ${GOLD}30, transparent 70%)`, transform: "scale(1.5)", animation: "rasidPulse 3s ease-in-out infinite" }} />
        <div className="absolute inset-0 rounded-full border pointer-events-none"
          style={{ borderColor: `${GOLD}30`, animation: "scan-pulse-ring 2.6s ease-out infinite" }} />
        <div className="relative w-16 h-16 rounded-full overflow-hidden"
          style={{ background: `linear-gradient(160deg, ${NAVY_CARD}, #0B1640)`,
          border: `1.5px solid ${GOLD}40`, boxShadow: `0 8px 28px rgba(0,0,0,0.45), inset 0 2px 8px ${GOLD}12` }}>
          {/* Frame the head/upper-body inside the circular orb (cover + top) */}
          <ImageWithFallback src={characterWaving} alt="راصد الذكي"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "50% 12%", transform: "scale(1.35)" }} />
        </div>
        <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full border-2"
          style={{ background: C_EMR, borderColor: NAVY_CARD, boxShadow: "0 0 8px #3DBF7A" }} />
      </div>
    </button>
  );
}
export function Sidebar({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const defaultOpen = NAV_GROUPS.filter(g => g.pages.some(p => p.id === page)).map(g => g.id);
  const [open, setOpen] = useState<Set<string>>(new Set(defaultOpen.length ? defaultOpen : ["home"]));
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const toggle = (id: string) => setOpen(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  return (
    <div className="w-[272px] h-full flex-shrink-0 flex flex-col relative"
         style={{
           background: `linear-gradient(195deg, #040C2F 0%, #060F36 45%, #03091A 100%)`,
           borderLeft: `1px solid ${GOLD}20`,
           boxShadow: `4px 0 32px rgba(4,9,28,0.55), inset -1px 0 0 ${GOLD}0A`,
         }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position:"absolute", inset:0, opacity:0.05,
          backgroundImage:`linear-gradient(${GOLD}40 1px, transparent 1px), linear-gradient(90deg, ${GOLD}40 1px, transparent 1px)`,
          backgroundSize:"32px 32px" }} />
        {/* Ambient drifting glow orbs for luxury depth */}
        <div style={{ position:"absolute", top:"-6%", right:"-12%", width:"240px", height:"240px",
          background:`radial-gradient(ellipse, ${GOLD}22, transparent 65%)`,
          animation:"mesh-drift 18s ease-in-out infinite" }} />
        <div style={{ position:"absolute", bottom:"12%", left:"-16%", width:"220px", height:"220px",
          background:`radial-gradient(ellipse, ${TEAL}18, transparent 68%)`,
          animation:"mesh-drift 24s ease-in-out 2s infinite reverse" }} />
        <div style={{ position:"absolute", top:0, right:"30%", width:"1px", height:"60%",
          background:`linear-gradient(180deg, transparent, ${GOLD}70, transparent)`,
          animation:"shimmer-pulse 6s ease-in-out infinite" }} />
        <div style={{ position:"absolute", top:"25%", right:"60%", width:"1px", height:"40%",
          background:`linear-gradient(180deg, transparent, ${GOLD}50, transparent)`,
          animation:"shimmer-pulse 8s ease-in-out 2s infinite" }} />
        {/* Slow vertical data stream */}
        <div style={{ position:"absolute", left:"12%", top:0, width:"1px", height:"30%",
          background:`linear-gradient(180deg, transparent, ${GOLD}50, transparent)`,
          animation:"data-fall 7s linear infinite" }} />
      </div>
      <div className="relative px-3 pt-4 pb-3 flex-shrink-0"
           style={{ borderBottom: `1px solid rgba(197,165,90,0.12)` }}>
        <div className="absolute top-0 inset-x-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${GOLD}80, ${GOLD_PALE}, ${GOLD}80, transparent)` }} />
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: C_EMR, boxShadow: "0 0 6px #3DBF7A", animation: "status-blink 1.4s ease-in-out infinite" }} />
          <span className="text-[9px] font-mono tracking-widest uppercase" style={{ color: `${GOLD}60` }}>SYS.RASID</span>
          </div>
          <span className="text-[9px] font-mono tracking-widest" style={{ color: "#3DBF7A50" }}>ONLINE</span>
        </div>
        <div className="flex justify-center" style={{ overflow: "visible" }}>
          <RasidLogo className="w-full h-auto" style={{ width: "72%" }} />
        </div>
        <div className="text-center mt-2 px-2">
          <div className="mx-auto w-24 h-px mb-1.5" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}50, transparent)` }} />
          <p className="text-[8.5px] tracking-[0.18em] uppercase" style={{ color: `${GOLD}55` }}>منصة الخصوصية الوطنية</p>
        </div>
      </div>
      <div className="mx-3 mt-2.5 mb-2 flex-shrink-0">
        <div className="relative px-3 py-2 rounded-xl overflow-hidden"
          style={{ background: "rgba(30,158,87,0.08)", border: "1px solid rgba(30,158,87,0.18)" }}>
          <div className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(30,158,87,0.04)", animation: "shimmer-pulse 3s ease-in-out infinite" }} />
          <div className="relative flex items-center gap-2">
          <div className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: C_EMR, boxShadow: "0 0 8px #3DBF7A80", animation: "status-blink 1.3s ease-in-out infinite" }} />
          <span className="text-[10px] font-semibold flex-1" style={{ color: C_EMR }}>الرصد المباشر نشط</span>
          <div className="flex items-center gap-1">
          <span className="text-[9px] font-mono font-black tabular-nums" style={{ color: GOLD }}>24,983</span>
          <span className="text-[8px]" style={{ color: `${GOLD}50` }}>موقع</span>
          </div>
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-1 px-2 space-y-0.5">
        {NAV_GROUPS.map((group, gi) => {
          const isOpen = open.has(group.id);
          const hasActive = group.pages.some(p => p.id === page);
          return (
          <div key={group.id} className={gi > 0 ? "pt-1" : ""}>
          {gi > 0 && <div className="mx-3 mb-1.5 h-px" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}15, transparent)` }} />}
          <button onClick={() => toggle(group.id)}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-200 relative overflow-hidden"
          style={{ color: hasActive ? GOLD : "rgba(255,255,255,0.50)" }}>
          {hasActive && (
          <div className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ background: `linear-gradient(to left, ${GOLD}08, transparent)` }} />
          )}
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 relative z-10 transition-all duration-200"
          style={{ background: hasActive ? `${GOLD}20` : "rgba(255,255,255,0.05)",
          border: `1px solid ${hasActive ? GOLD+"35" : "rgba(255,255,255,0.08)"}`,
          boxShadow: hasActive ? `0 0 12px ${GOLD}20, inset 0 1px 0 ${GOLD}15` : "none" }}>
          <group.icon size={13} style={{ color: hasActive ? GOLD : "rgba(255,255,255,0.40)" }} />
          </div>
          <span className="flex-1 text-[11.5px] font-bold relative z-10"
          style={{ color: hasActive ? GOLD : "rgba(255,255,255,0.65)", letterSpacing: "0.01em" }}>
          {group.label}
          </span>
          {group.badge && (
          <span className="text-[8.5px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-black px-1 flex-shrink-0 relative z-10"
          style={{ background: `${GOLD}20`, color: GOLD, border: `1px solid ${GOLD}25` }}>
          {group.badge}
          </span>
          )}
          <span className="relative z-10 transition-transform duration-300 flex-shrink-0"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", color: "rgba(255,255,255,0.28)" }}>
          <ChevronDown size={11} />
          </span>
          </button>
          {isOpen && (
          <div className="mt-0.5 space-y-[2px] pr-1">
          {group.pages.map((item, itemIdx) => {
          const active = page === item.id;
          const hovered = hoveredItem === item.id;
          return (
          <button key={item.id}
          onClick={() => setPage(item.id)}
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl relative overflow-hidden transition-all duration-200"
          style={{
          animation: `card-rise 0.2s ease-out ${itemIdx * 0.04}s both`,
          transform: hovered && !active ? "translateX(-2px)" : "none",
          }}>
          {active && (
          <>
          <div className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ background: `linear-gradient(to left, ${GOLD}26, ${GOLD}0C 70%, transparent)`,
          boxShadow: `0 0 20px ${GOLD}1A, inset 0 1px 0 ${GOLD}22` }} />
          {/* Animated glowing active indicator on the trailing (right) edge — RTL */}
          <span className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{ width: 3, background: `linear-gradient(${GOLD_PALE}, ${GOLD})`,
          boxShadow: `0 0 10px ${GOLD}, 0 0 4px ${GOLD}`, animation: "nav-ind 2s ease-in-out infinite" }} />
          {/* One-shot light sweep when an item becomes active */}
          <span className="absolute inset-0 rounded-xl pointer-events-none" style={{
          background: `linear-gradient(105deg, transparent 40%, ${GOLD}30 50%, transparent 60%)`,
          backgroundSize: "220% 100%", animation: "nav-sweep 0.7s ease-out both" }} />
          </>
          )}
          {!active && hovered && (
          <div className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ background: `linear-gradient(to left, ${GOLD}10, rgba(255,255,255,0.03), transparent)`,
          boxShadow: `inset -2px 0 0 ${GOLD}40` }} />
          )}
          <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 relative z-10 transition-all duration-200"
          style={{
          background: active ? `${GOLD}20` : hovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
          border: `1px solid ${active ? GOLD+"30" : "transparent"}`,
          boxShadow: active ? `0 0 10px ${GOLD}25` : "none",
          transform: hovered && !active ? "scale(1.1)" : "scale(1)",
          }}>
          <item.icon size={12} style={{ color: active ? GOLD : hovered ? "rgba(255,255,255,0.70)" : "rgba(255,255,255,0.45)" }} />
          </div>
          <span className="flex-1 text-right text-[11px] relative z-10 transition-colors duration-150"
          style={{ color: active ? GOLD : hovered ? "#FFFFFF" : "rgba(255,255,255,0.75)",
          fontWeight: active ? 600 : 400 }}>
          {item.label}
          </span>
          {active && (
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 relative z-10"
          style={{ background: GOLD, boxShadow: `0 0 8px ${GOLD}80`, animation: "status-blink 2.5s ease-in-out infinite" }} />
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
      <div className="mx-3 mb-2.5 flex-shrink-0">
        <div className="relative p-3 rounded-2xl overflow-hidden"
          style={{ background: `linear-gradient(145deg, ${GOLD}12, ${GOLD}05, rgba(4,9,28,0.6))`,
          border: `1px solid ${GOLD}20`,
          boxShadow: `0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 ${GOLD}18` }}>
          <InsetFrame radius={12} />
          <div className="absolute top-0 inset-x-0 h-[1.5px]"
          style={{ background: `linear-gradient(90deg, transparent, ${GOLD}60, transparent)` }} />
          <div className="relative flex items-center gap-2.5">
          <div className="relative flex-shrink-0">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black"
          style={{ background: `linear-gradient(135deg, ${GOLD}35, ${GOLD}18)`,
          color: GOLD, border: `1px solid ${GOLD}40`,
          boxShadow: `0 0 14px ${GOLD}20, inset 0 1px 0 ${GOLD}30` }}>م</div>
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border"
          style={{ background: C_EMR, borderColor: "#04091C", boxShadow: "0 0 6px #3DBF7A" }} />
          </div>
          <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold truncate" style={{ color: "#FFFFFF" }}>محمد الزيلعي</p>
          <p className="text-[10px] font-medium truncate" style={{ color: `${GOLD}90` }}>مدير النظام الرئيسي</p>
          </div>
          <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-white/10 flex-shrink-0"
          style={{ color: "rgba(255,255,255,0.38)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <LogOut size={12} />
          </button>
          </div>
          <div className="flex items-center gap-2 mt-2 pt-2" style={{ borderTop: `1px solid ${GOLD}12` }}>
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C_EMR, animation: "shimmer-pulse 2.5s ease-in-out infinite" }} />
          <span className="text-[9px] font-medium" style={{ color: "rgba(255,255,255,0.38)" }}>
          نشط · الإثنين 7 محرم 1448 هـ
          </span>
          </div>
        </div>
      </div>
      <div className="mx-3 mb-3 flex-shrink-0">
        <div className="px-3 py-2 rounded-xl flex items-center gap-2"
          style={{ background: "rgba(61,177,172,0.07)", border: "1px solid rgba(61,177,172,0.15)" }}>
          <SdaiaLogo variant="compact" />
          <div className="flex-1 min-w-0">
          <p className="text-[9px] leading-tight" style={{ color: "rgba(61,177,172,0.70)" }}>منتج من مكتب إدارة البيانات الوطنية</p>
          <p className="text-[8.5px] font-mono" style={{ color: "rgba(61,177,172,0.45)" }}>NDMO · RASID v6.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export function TopBar({ page, darkMode, toggleDark, setPage }: {
  page: Page; darkMode: boolean; toggleDark: () => void; setPage: (p: Page) => void;
}) {
  return (
    <div className="glass h-12 flex items-center justify-between px-5 flex-shrink-0 relative z-20"
         style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="flex items-center gap-3">
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
          className="btn-press flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold hover:opacity-90"
          style={{ background: GOLD, color: NAVY_BG, boxShadow: `0 2px 12px ${GOLD}35` }}>
          <Plus size={12} /> فحص جديد
        </button>
      </div>
    </div>
  );
}
export const TT = { background: "var(--popover)", border: `1px solid ${GOLD}30`, borderRadius: "10px", fontSize: "11px",
          color: "var(--popover-foreground)", boxShadow: "var(--card-shadow)" };