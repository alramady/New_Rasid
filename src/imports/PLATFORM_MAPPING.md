# دليل العكس على المنصة — أين يقع كل عنصر تصميمي (متكامل)

هذا المستند يربط كل قرار تصميمي بمكانه الفعلي في كود منصة راصد، ليُطبَّق تعديل المصمم
**بدقة وبأقل مجهود**. (المسارات نسبةً إلى جذر المستودع.)

## 1) نظام الألوان والتوكنز — المصدر الأساسي
**الملف:** `client/src/index.css` — يحوي ~213 قيمة لونية كمتغيّرات CSS، موزّعة على:
- **الوضع الفاتح:** المُعرّفة في `:root`.
- **الوضع الداكن:** المُعرّفة تحت `.dark`.
- **12 نمط تصميم** (default, ocean, emerald, sunset, royal, crimson, sdaia, atlas, luxury,
  cyber, minimal, silver) — كلاسات نمطية تتجاوز التوكنز.

**أهم المتغيّرات التي يضبطها المصمم (لكل وضع):**
| الغرض | المتغيّر |
|------|---------|
| خلفية الصفحة | `--background` / `--color-background` |
| لون النص | `--foreground` / `--color-foreground` |
| البطاقة وخلفيتها | `--card`, `--card-foreground` |
| اللون الأساسي (الكحلي) | `--primary`, `--primary-foreground` |
| الثانوي | `--secondary`, `--secondary-foreground` |
| الخافت | `--muted`, `--muted-foreground` |
| التمييز (Accent) | `--accent`, `--accent-foreground` |
| الحدود/الإطارات | `--border`, `--input`, `--ring` |
| التحذير/الخطر | `--destructive`, `--destructive-foreground` |
| الشريط الجانبي | `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-accent`, `--sidebar-border` |
| توهّجات (glow) | `--color-cyan-glow`, `--color-amber-glow`, `--color-emerald-glow`, `--color-purple-glow`, `--color-red-glow`, `--color-violet-glow` |

> **قاعدة:** غيّر القيمة في `index.css` (للوضعين) → ينعكس على كل الصفحات. لا حاجة لتعديل الصفحات.

## 2) نظام السمات (الوضعان + الأنماط)
**الملف:** `client/src/contexts/ThemeContext.tsx`
- يدير: `light` / `dark` / `auto`، و`DesignStyle` (الـ12 نمطًا)، و`themeAccents` (ألوان الشريط/الإطار لكل نمط).
- زر تبديل الوضع في الترويسة يستدعي `toggleTheme` من هنا.
> لإضافة نمط جديد أو ضبط لون التمييز لكل نمط: عدّل `themeAccents` هنا.

## 3) ألوان حالات الامتثال (القلب)
**الملف:** `shared/compliance.ts`
- `COMPLIANCE_COLORS` (قيم HEX لكل حالة)، `COMPLIANCE_LABELS` (الأسماء)، `COMPLIANCE_BADGE_CLASSES`.
- المفاتيح الثابتة: `compliant`, `partially_compliant`, `non_compliant`, `not_working` (+ `needs_review`).
> غيّر القيم اللونية هنا فقط؛ لا تغيّر المفاتيح. كلاسات الشارات: `badge-compliant`, `badge-partial`,
> `badge-non-compliant`, `badge-no-policy` (منسّقة في `index.css`).

## 4) الإطار العام (الشريط الجانبي + الترويسة)
**الملف:** `client/src/components/DashboardLayout.tsx`
- الشريط الجانبي (المجموعات الخمس + عناصرها)، الترويسة العلوية، زر السمة، جرس الإشعارات.
- الألوان تأتي من `themeAccents` + توكنز `--sidebar*`. تنسيق العناصر عبر كلاسات Tailwind
  (`sidebar-nav-item`, `sidebar-group-header` …) — موجودة في `index.css`.

## 5) مكوّنات الواجهة المشتركة (Primitives)
**المجلد:** `client/src/components/ui/` (نمط shadcn) — الأزرار، البطاقات، الجداول، التبويبات،
الشارات، النوافذ، الحقول… تعتمد كلها على توكنز القسم (1). تعديل شكل «كل الأزرار/البطاقات/الجداول»
يتم هنا مرة واحدة.

## 6) الخطوط
- Tajawal/Cairo مُعرّفة في `client/src/index.css` و`client/index.html`. لتغيير الخط:
  حدّث `@font-face`/`font-family` ومتغيّر الخط هنا.

## 7) الصفحات الـ29 وملفّاتها (للمرجع عند التعديلات الخاصة بصفحة)
| المجموعة | الصفحة | الملف |
|---------|--------|------|
| الرئيسية | المؤشرات الرئيسية | `client/src/pages/LeadershipDashboard.tsx` |
| الرئيسية | المؤشرات القيادية | `client/src/pages/KpiDashboard.tsx` |
| الرئيسية | مؤشرات الأداء KPI | `client/src/pages/RealTimeDashboard.tsx` |
| راصد الذكي | راصد الذكي | `client/src/pages/SmartRasid.tsx` |
| راصد الذكي | الفحص المتقدم | `client/src/pages/AdvancedScan.tsx` |
| راصد الذكي | المواقع | `client/src/pages/Sites.tsx` |
| راصد الذكي | التطبيقات | `client/src/pages/MobileApps.tsx` |
| راصد الذكي | سجل الفحوصات | `client/src/pages/ScanHistory.tsx` |
| راصد الذكي | مكتبة الفحوصات | `client/src/pages/ScanLibrary.tsx` |
| راصد الذكي | الجدولة | `client/src/pages/ScanSchedules.tsx` |
| راصد الذكي | إدارة الحالات | `client/src/pages/Cases.tsx` |
| الخطابات والتقارير | تقارير PDF | `client/src/pages/PdfReports.tsx` |
| الخطابات والتقارير | تقارير مخصصة | `client/src/pages/CustomReports.tsx` |
| الخطابات والتقارير | تقارير مجدولة | `client/src/pages/ScheduledReports.tsx` |
| الخطابات والتقارير | قوالب رسائل | `client/src/pages/MessageTemplates.tsx` |
| الخطابات والتقارير | الخطابات | `client/src/pages/Letters.tsx` |
| الخطابات والتقارير | مركز التصدير | `client/src/pages/ExportData.tsx` |
| الخطابات والتقارير | متتبع التحسينات | `client/src/pages/ImprovementTracker.tsx` |
| تحليلات راصد | التحليلات المتقدمة | `client/src/pages/AdvancedAnalytics.tsx` |
| تحليلات راصد | مقارنة القطاعات | `client/src/pages/SectorComparison.tsx` |
| تحليلات راصد | المقارنة الزمنية | `client/src/pages/TimeComparison.tsx` |
| تحليلات راصد | مقارنة الامتثال | `client/src/pages/ComplianceComparison.tsx` |
| تحليلات راصد | خريطة الامتثال | `client/src/pages/ComplianceHeatmap.tsx` |
| تحليلات راصد | البحث المتقدم | `client/src/pages/AdvancedSearch.tsx` |
| تحليلات راصد | كشف التغييرات | `client/src/pages/ChangeDetection.tsx` |
| تحليلات راصد | المقارنة التفاعلية | `client/src/pages/InteractiveComparison.tsx` |
| تحقق راصد | سجل الوثائق | `client/src/pages/DocumentsRegistry.tsx` |
| تحقق راصد | التحقق من الوثائق | `client/src/pages/VerifyDocument.tsx` |
| تحقق راصد | إحصائيات الوثائق | `client/src/pages/DocumentStats.tsx` |

## 8) الرسوم البيانية
المنصة تستخدم **Recharts**. ألوان السلاسل تُشتقّ من التوكنز/الـ accents. لتوحيد لغة الرسوم:
اضبط لوحة ألوان الرسوم في التوكنز ومرّرها للمكوّنات (معظم الصفحات تعرّف `STATUS_COLORS` محليًا —
يمكن توحيدها لاحقًا في طبقة مشتركة عند التطبيق).

## 9) آلية التطبيق (Workflow)
1. يسلّم المصمم «مواصفة التصميم» (راجع DESIGNER_GUIDE §5).
2. نطبّق التوكنز في `client/src/index.css` (الوضعين) + `themeAccents` في `ThemeContext`.
3. نطبّق ألوان الامتثال في `shared/compliance.ts`.
4. نطبّق تعديلات المكوّنات في `client/src/components/ui/*` و`DashboardLayout.tsx`.
5. نتحقّق: الوضعان سليمان، RTL سليم، صفر تغيير في المنطق، صفر أخطاء بناء.

> النتيجة: عكس تصميم المصمم على المنصة الحقيقية **بأقل تفسير وأعلى دقّة**.
