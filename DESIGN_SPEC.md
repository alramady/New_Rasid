# مواصفة التصميم (Design Spec) — منصة راصد

> **الغرض:** مرجع التوكنز الوحيد (Source of Truth) المُستخرَج من ريبو التصميم
> (`theme.css` + `rasid-shared.tsx`) لتطبيقه على منصة `alramady/rasid-privacy`
> **بأقل تفسير وأعلى دقّة، وصفر تغيير في المنطق**.
>
> أسماء الملفات الهدف مأخوذة من `src/imports/PLATFORM_MAPPING.md`.
> هذا التصدير يمثّل **النمط الافتراضي (default)** فقط — الأنماط الـ12 الأخرى تعيش في المنصة.
> النظام مُصمَّم للوضعين (فاتح/داكن)؛ الهوية البصرية الأبرز هي الوضع الداكن.

---

## 0) خريطة التطبيق (أين يذهب كل شيء)
| القسم في هذه المواصفة | الملف الهدف في المنصة |
|---|---|
| توكنز الألوان (§2) | `client/src/index.css` → `:root` و `.dark` |
| الزوايا/الظلال (§3، §4) | `client/src/index.css` |
| لوحة الرسوم (§5) | `client/src/index.css` (`--chart-1..5`) |
| ألوان الامتثال (§6) | `shared/compliance.ts` |
| الخطوط (§7) | `client/src/index.css` + `client/index.html` |
| نظام الحركة (§8) | `client/src/index.css` (keyframes + utilities) |
| المكوّنات الخاصة (§9) | `client/src/components/` (طبقة مشتركة) |
| ألوان التمييز للأنماط | `client/src/contexts/ThemeContext.tsx` (`themeAccents`) |

---

## 1) هوية العلامة (ثوابت مرجعية)
| الغرض | القيمة |
|---|---|
| الذهبي (الأساسي) | `#C5A55A` |
| الذهبي الفاتح | `#E1C978` |
| الكحلي — الخلفية الداكنة | `#04091C` |
| الكحلي — سطح الكروت | `#07102E` |
| الكحلي — الشريط الجانبي | `#040B2E` (ثابت في الوضعين) |
| التركوازي | `#3DB1AC` |
| الخط | Tajawal / Cairo (عربي، RTL) |

ألوان دلالية مساعدة: `C_GRN #1E9E57` · `C_RED #B94A55` · `C_AMB #C78B2C` ·
`C_EMR #3DBF7A` · `C_VIO #7C6BAE` · `C_SLT #64748B` · `C_BLU #5B8EF0`.

---

## 2) توكنز الألوان الأساسية — الوضعان
> القاعدة الذهبية: غيّر القيمة هنا (للوضعين) → تنعكس على كل الـ29 صفحة. لا تكتب HEX داخل الصفحات.

| التوكن | فاتح (`:root`) | داكن (`.dark`) |
|---|---|---|
| `--background` | `#FFFFFF` | `#04091C` |
| `--foreground` | `#040B2E` | `#E6E2D6` |
| `--card` | `#FFFFFF` | `#07102E` |
| `--card-foreground` | `#040B2E` | `#E6E2D6` |
| `--popover` | `#FFFFFF` | `#07102E` |
| `--popover-foreground` | `#040B2E` | `#E6E2D6` |
| `--primary` | `#040B2E` | `#C5A55A` |
| `--primary-foreground` | `#FFFFFF` | `#04091C` |
| `--secondary` | `#EEF2FF` | `#0B1640` |
| `--secondary-foreground` | `#040B2E` | `#E6E2D6` |
| `--muted` | `#F0F4FF` | `#0B1640` |
| `--muted-foreground` | `#4A5880` | `#5A6E96` |
| `--accent` | `#C5A55A` | `#C5A55A` |
| `--accent-foreground` | `#040B2E` | `#04091C` |
| `--destructive` | `#B94A55` | `#B94A55` |
| `--destructive-foreground` | `#ffffff` | `#fecaca` |
| `--border` | `rgba(4,11,46,0.10)` | `rgba(197,165,90,0.13)` |
| `--input` | `transparent` | `#0B1640` |
| `--input-background` | `#F0F4FF` | `#0B1640` |
| `--switch-background` | `#C5A55A` | `#C5A55A` |
| `--ring` | `#C5A55A` | `#C5A55A` |
| `--panel-bg` | `rgba(255,255,255,0.80)` | `rgba(7,16,46,0.78)` |

### الشريط الجانبي (نفس القيم في الوضعين — الأزرق الملكي الداكن)
| التوكن | القيمة |
|---|---|
| `--sidebar` | `#040B2E` |
| `--sidebar-foreground` | `#E6E2D6` |
| `--sidebar-primary` | `#C5A55A` |
| `--sidebar-primary-foreground` | `#040B2E` (فاتح) / `#04091C` (داكن) |
| `--sidebar-accent` | `rgba(197,165,90,0.14)` |
| `--sidebar-accent-foreground` | `#C5A55A` |
| `--sidebar-border` | `rgba(197,165,90,0.12)` |
| `--sidebar-ring` | `#C5A55A` |

> ملاحظة Tailwind: التصدير يستخدم **Tailwind v4** (`@theme inline` يربط `--color-*` بالتوكنز،
> و`@custom-variant dark`). إن كانت المنصة على **v3**، تُترجم هذه إلى `tailwind.config` + متغيّرات CSS.

---

## 3) الزوايا (Radius)
| التوكن | القيمة |
|---|---|
| `--radius` (الأساس) | `0.875rem` (14px) |
| `--radius-sm` | `calc(var(--radius) - 4px)` |
| `--radius-md` | `calc(var(--radius) - 2px)` |
| `--radius-lg` | `var(--radius)` |
| `--radius-xl` | `calc(var(--radius) + 4px)` |

---

## 4) الظلال والأسطح
| التوكن | فاتح | داكن |
|---|---|---|
| `--card-shadow` | `0 1px 3px rgba(4,11,46,.06), 0 6px 20px rgba(4,11,46,.07)` | `0 12px 40px rgba(0,0,0,.45), 0 2px 8px rgba(0,0,0,.30), inset 0 1px 0 rgba(197,165,90,.07)` |
| `--card-shadow-lg` | `0 2px 6px rgba(4,11,46,.07), 0 16px 40px rgba(4,11,46,.09)` | `0 24px 70px rgba(0,0,0,.55), 0 4px 14px rgba(0,0,0,.38), inset 0 1px 0 rgba(197,165,90,.09)` |

اختصارات جاهزة: `.cs` (بطاقة)، `.cs-muted`، `.cs-input`. توهّج التحويم الذهبي:
`box-shadow: var(--card-shadow-lg), 0 0 0 1px rgba(197,165,90,.18), 0 0 32px rgba(197,165,90,.10)`.

---

## 5) لوحة ألوان الرسوم (Recharts)
| التوكن | القيمة | الدور |
|---|---|---|
| `--chart-1` | `#C5A55A` | ذهبي |
| `--chart-2` | `#1E9E57` | أخضر (ممتثل) |
| `--chart-3` | `#3DB1AC` | تركوازي |
| `--chart-4` | `#C78B2C` | كهرماني (جزئي) |
| `--chart-5` | `#7C6BAE` | بنفسجي (مراجعة) |

---

## 6) ألوان حالات الامتثال — القلب (→ `shared/compliance.ts`)
> المفاتيح ثابتة المعنى — **غيّر اللون فقط، لا المفتاح**. العمود الأخير يربط مفتاح هذا
> التصدير بمفتاح المنصة (راجع PLATFORM_MAPPING §3).

| الحالة | اللون (dot) | نص التمييز | الكلاس (badge) | مفتاح التصدير | مفتاح المنصة |
|---|---|---|---|---|---|
| ممتثل | `#1E9E57` | `#3DBF7A` | `badge-compliant` | `compliant` | `compliant` |
| غير ممتثل | `#B94A55` | `#D9728A` | `badge-non-compliant` | `non-compliant` | `non_compliant` |
| ممتثل جزئياً | `#C78B2C` | `#DFA947` | `badge-partial` | `partial` | `partially_compliant` |
| يحتاج مراجعة | `#7C6BAE` | — | (مراجعة) | `review` | `needs_review` |
| لا يعمل | `#64748B` | `#AEBAD0` | `badge-no-policy` | `inactive` | `not_working` |

نمط الشارة: خلفية `اللون/10`، حدود `اللون/20`، نقطة باللون الصريح، نص باللون.

---

## 7) الطباعة (Typography)
- **الاستيراد:** `Tajawal` (300/400/500/700/900) · `Cairo` (300/400/600/700/900) · `JetBrains Mono` (400/500).
- **الأساس:** `--font-size: 16px`، `--font-weight-normal: 400`، `--font-weight-medium: 500`.
- **العناوين:** h1=`text-2xl`، h2=`text-xl`، h3=`text-lg` — جميعها `font-weight: 500`، `line-height: 1.5`.
- **قاعدة شاملة:** `Tajawal` مفروض على كل العناصر (بما فيها `.font-mono`/`code`) عبر
  `*,*::before,*::after { font-family:'Tajawal' !important }` مع `font-feature-settings:"tnum"` للأرقام.
- **شريط التمرير:** عرض 4px، إبهام `rgba(201,168,76,.25)` (تحويم `.4`)، نحيف.

---

## 8) نظام الحركة (Motion) — 56 حركة
انقل كتلة `@keyframes` وكلاسات الـ utilities المرتبطة كما هي (تحترم `prefers-reduced-motion`؛
عند تقليل الحركة تُبطّأ حزم الخلفية إلى 24s وتُلغى حلقات الـ CountUp).

`fadeInPage, rasidPulse, orbit-ring, orbit-ring-r, neural-pulse, radar-sweep, scan-sweep,
float-bob, shimmer-pulse, card-rise, hero-reveal, count-pop, glow-border, data-flow,
shield-pulse, shimmer-sweep, logo-glow, logo-float, scan-pulse-ring, stream-rtl, hex-rotate,
particle-up, ink-expand, sdaia-pulse, logo-breathe-gold, logo-glow-pulse, logo-shimmer-burst,
logo-heartbeat, radar-arm, neural-draw, hex-drift, trace-pulse, scan-ping, data-fall,
card-hover-breathe, card-shimmer-enter, char-float-idle, char-pulse-glow, card-breathe,
hud-scanline, bracket-in, status-blink, ticker-dash, skeleton-shine, reveal-up, reveal-up-lg,
cc-pulse, cc-ring-draw, cc-bar-grow, mesh-drift, bg-scan-x, nav-ind, nav-sweep,
rl-breathe, rl-glow-pulse, rl-sweep2`

توهّج الإطار المرجعي: `glow-border` → `0 0 24px 4px rgba(197,165,90,0.22)`.

---

## 9) المكوّنات الخاصة (غير shadcn) — مصدرها `src/app/rasid-shared.tsx`
ترفع كطبقة مشتركة في المنصة وتُربط ببياناتها (لا منطق جديد):
`GlassPanel` · `HudLabel` · `InsetFrame` · `CommandFrame` · `CircularProgress` ·
`CountUp` · `RasidLogo` · `SdaiaLogo` · `ComplianceBadge`.
المكوّنات الأولية (الأزرار/البطاقات/الجداول/التبويبات…) قياسية shadcn وتعيش في
`client/src/components/ui/*` — فروقات className/توكنز فقط، لا إعادة كتابة.

---

## 10) قواعد إلزامية عند التطبيق
- **RTL عربي** كامل — خصائص `start/end` لا `left/right`.
- **صفر** تغيير في منطق أي صفحة أو مصادر بياناتها (التصميم فقط).
- **الوضعان** ممتازان معاً (الداكن ليس مجرد عكس).
- مفاتيح حالات الامتثال الخمس ثابتة — اللون فقط.
- تباين كافٍ للقراءة + احترام `prefers-reduced-motion`.
- **صفر** أخطاء بناء، وعدم تفريع مكوّنات shadcn عن الأصل.

---

## 11) آلية التطبيق المقترحة
1. توكنز §2–§5 + خطوط §7 → `client/src/index.css` (الوضعان).
2. ألوان الامتثال §6 → `shared/compliance.ts` (+ ألوان التمييز في `ThemeContext.tsx`).
3. نظام الحركة §8 → `client/src/index.css`.
4. المكوّنات الخاصة §9 → طبقة مشتركة.
5. تلميع المكوّنات الأولية و`DashboardLayout.tsx` عند الحاجة.
6. **التحقق البكسلي:** أداة Playwright + pixelmatch تقارن كل صفحة (فاتح/داكن) بين الريبوين
   حتى تقترب نسبة الفرق من الصفر.
