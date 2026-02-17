# CLAUDE.md — The Grape

This file is automatically read by Claude Code at the start of every session.
It contains everything you need to know about this project.

---

## 🍇 Project Overview

**Name:** The Grape  
**Tagline:** Your personal wine companion  
**Type:** Mobile-first web app (Next.js → React Native later)  
**Stack:** Next.js 14, TypeScript, Tailwind CSS, Prisma, PostgreSQL, NextAuth.js

**Core Concept:**
Vivino tells you what everyone else likes. The Grape tells you if the wine is right for YOU.
Scan any bottle → instant personal match score → color-coded decision (🟢🟡🔴).

---

## 📋 Specifications

Always read these before building new features:

- **Product & Technical Spec:** `/docs/Smak-DNA_Ultimate_Build_Prompt_v2.md`
- **Design Specification:** `/docs/Smak-DNA_Design_Specification_v2.md`

---

## 🎨 Design Decisions (LOCKED)

### Name
- **Working name:** The Grape
- **Previous name:** Smak-DNA (ignore this in all new code/copy)

### Typography
- **Headlines/Display:** Playfair Display (serif)
- **Body/UI:** Work Sans (sans-serif)
- **Never use:** Inter (too generic)

### Colors
```typescript
// These are LOCKED — do not change
winePrimary:     '#6B2737'  // Deep burgundy
wineSecondary:   '#C9A961'  // Warm gold
matchGreen:      '#5A9367'  // 🟢 85%+ match
matchYellow:     '#E8B44C'  // 🟡 60-84% match  
matchRed:        '#C75450'  // 🔴 <60% match
bgPrimary:       '#FAF9F7'  // Off-white background
textPrimary:     '#2D2D2D'  // Charcoal
textSecondary:   '#787878'  // Mid grey
```

### Logo / Icon
- **Style:** Playful, natural, organic
- **NOT:** Emoji, geometric shapes, wine glass line art, splashes
- **Direction:** Illustrated, friendly, approachable
- **Status:** Still being designed — use text-only lockup for now
- **Placeholder:** A simple burgundy circle with "G" in Playfair Display

### Spacing
- Base unit: 4px
- Common: 12, 16, 24, 32, 48, 56px
- Generous white space — premium feel

### Border Radius
- Buttons: 8px (classic, not too round)
- Cards: 12px
- Modals/sheets: 24px top

---

## 🏗️ Architecture

```
the-grape/
├── app/                        # Next.js 14 App Router
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (main)/
│   │   ├── layout.tsx          # Bottom nav
│   │   ├── scan/page.tsx
│   │   ├── my-wines/page.tsx
│   │   └── profile/page.tsx
│   ├── onboarding/
│   │   ├── quiz/page.tsx
│   │   └── reveal/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── wines/route.ts
│   │   ├── scan/route.ts
│   │   └── feedback/route.ts
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/                     # Base components
│   │   ├── Button.tsx
│   │   ├── Typography.tsx
│   │   └── Layout.tsx
│   ├── wine/                   # Wine-specific components
│   │   ├── MatchBadge.tsx
│   │   ├── WineCard.tsx
│   │   └── FeedbackButtons.tsx
│   └── profile/
│       └── TasteRadar.tsx
├── lib/
│   ├── theme/                  # Design system tokens
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── index.ts
│   ├── recommendation/
│   │   └── matchAlgorithm.ts   # Core matching logic
│   └── auth.ts
├── prisma/
│   └── schema.prisma
├── types/
│   └── wine.ts
└── docs/                       # Spec files
```

---

## 📦 Phase Status

### ✅ Phase 1: Foundation (COMPLETE)
- [x] Project initialized
- [x] Design system (colors, typography, spacing)
- [x] Base components (Button, Typography, Layout)
- [x] Landing page
- [x] Prisma schema
- [x] TypeScript types

### 🔄 Phase 2: Auth + Onboarding (NEXT)
- [ ] Sign up page (`/signup`)
- [ ] Login page (`/login`)
- [ ] NextAuth.js configuration
- [ ] Personality quiz (`/onboarding/quiz`)
- [ ] Processing animation
- [ ] Personality reveal (`/onboarding/reveal`)

### ⏳ Phase 3: Core Scanning
- [ ] Camera/upload screen (`/scan`)
- [ ] Wine recognition (mock → real OCR later)
- [ ] Match algorithm
- [ ] Match result screen (🟢🟡🔴)
- [ ] "Where to Buy" bottom sheet

### ⏳ Phase 4: My Wines + Feedback
- [ ] My Wines list with tabs (`/my-wines`)
- [ ] Wine cards with match scores
- [ ] Async feedback flow (👍😐👎)
- [ ] Taste profile updates

### ⏳ Phase 5: Profile + Polish
- [ ] Profile screen (`/profile`)
- [ ] Taste DNA radar chart
- [ ] Personality badge
- [ ] Animations + transitions
- [ ] Mobile optimization

---

## 🧠 Core Algorithms

### Taste Vector (6 dimensions, all 0.0–1.0)
```typescript
interface TasteVector {
  acidity: number    // 0 = low, 1 = high
  tannin: number     // 0 = soft, 1 = grippy
  fruit: number      // 0 = subtle, 1 = bold
  sweetness: number  // 0 = bone dry, 1 = sweet
  body: number       // 0 = light, 1 = full
  style: number      // 0 = classic, 1 = natural/funky
}
```

### Match Score
```typescript
// Weighted Euclidean distance → 0–100% score
// 85%+ = 🟢 Green (safe choice)
// 60–84% = 🟡 Yellow (moderate risk)
// <60% = 🔴 Red (avoid)
```

### 8 Wine Personalities
```
fresh_classic      → High acidity, minimal oak, crisp
smooth_operator    → Soft tannins, fruit-forward, easy
bold_adventurer    → Big tannins, full body, intense
crisp_minimalist   → Ultra-dry, light, pure
rich_indulger      → Oaked, creamy, full body
sweet_tooth        → Noticeable sweetness, fruity
wild_experimenter  → Natural wines, funky, orange
elegant_classicist → Structured, traditional, refined
```

---

## 🔐 Environment Variables

Required in `.env`:
```
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="min-32-chars-random-string"
```

---

## 📐 Component Conventions

### Always use theme values
```typescript
// ✅ Correct
className="bg-wine-primary text-white rounded-md"

// ❌ Wrong
style={{ backgroundColor: '#6B2737' }}
```

### Typography hierarchy
```typescript
// Headlines → Playfair Display (font-display in Tailwind)
// Body → Work Sans (font-sans in Tailwind)
<h1 className="font-display font-bold text-h1">...</h1>
<p className="font-sans text-body">...</p>
```

### Button sizes
```typescript
// Always use our Button component, never raw <button>
<Button variant="primary" size="lg">Get Started</Button>
<Button variant="secondary" size="md">Learn More</Button>
<Button variant="tertiary" size="sm">Skip</Button>
```

---

## 🚫 Never Do

- Use emoji as icons (use SVG or Lucide React)
- Hardcode colors (use Tailwind theme classes)
- Use Inter font (we use Playfair + Work Sans)
- Call the app "Smak-DNA" (it's "The Grape")
- Use rounded-full on buttons (use rounded-md = 8px)
- Add social login (email/password only for MVP)
- Build anything not in the current phase

---

## ✅ Always Do

- Mobile-first (375px base width)
- Generous spacing (more is better)
- Touch targets minimum 44x44px
- Semantic HTML + ARIA labels
- TypeScript strict mode
- Commit after each completed feature
- Test on mobile viewport in DevTools

---

## 🎯 How to Start Each Session

**Beginning a new feature:**
```
We're building The Grape wine app (see CLAUDE.md for context).
Phase X is complete. Now building Phase Y.
Start with [specific feature].
Read /docs/Smak-DNA_Design_Specification_v2.md Section X 
for the exact design specs.
```

**Fixing a bug:**
```
We're building The Grape wine app (see CLAUDE.md).
There's a bug in [file]: [description].
Fix it following our design system conventions.
```

**Continuing a feature:**
```
We're building The Grape wine app (see CLAUDE.md).
Continue building [feature]. 
Last thing completed: [what was done].
Next: [what's needed].
```

---

## 📱 Key User Flows

**New user:**
Landing → Sign Up → Personality Quiz (5 questions) → 
Reveal → Scan First Wine → Match Result

**Returning user:**
Open App → Camera → Scan → Match Result → Save/Buy

**Feedback loop:**
Scan → Auto-saved → (3-7 days) → "Did you try this?" → 
👍😐👎 → Taste profile improves

---

## 🍷 The Grape is NOT

- A Vivino clone (we're personal, not social)
- A wine encyclopedia (we're a decision tool)
- Sweden-only (global from day 1)
- Complex (one screen, one decision, three colors)
