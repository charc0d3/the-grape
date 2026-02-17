# Smak-DNA — Design Specification v2.0

**Version:** 2.0 — Scan-First, Global, Affiliate-Enabled  
**Last Updated:** February 2026  
**Purpose:** Define the visual identity, interaction patterns, and user experience for the scan-first wine recommendation app

---

## Table of Contents

1. [Design Vision & Principles](#1-design-vision--principles)
2. [Brand Identity](#2-brand-identity)
3. [Information Architecture](#3-information-architecture)
4. [User Flows](#4-user-flows)
5. [Screen Designs (Detailed)](#5-screen-designs-detailed)
6. [Component Library](#6-component-library)
7. [Interaction Patterns](#7-interaction-patterns)
8. [Animation Specifications](#8-animation-specifications)
9. [Responsive Behavior](#9-responsive-behavior)
10. [Accessibility](#10-accessibility)
11. [Localization Guidelines](#11-localization-guidelines)

---

## 1. Design Vision & Principles

### Core Design Philosophy

**"Your personal wine assistant, not a wine encyclopedia"**

Smak-DNA is designed to make wine purchasing confident and effortless through instant, personalized guidance. The design should feel:

- **Immediate, not deliberate** — Scan and know instantly, no thinking required
- **Clear, not clever** — Color codes (🟢🟡🔴) trump elaborate explanations
- **Personal, not social** — Your taste matters, not the crowd
- **Trustworthy, not gimmicky** — Professional, reliable, honest

### Design Principles

**1. Camera-First Interface**
- Scanning is the primary action, not buried in a menu
- Camera opens immediately on app launch (returning users)
- Large, accessible camera button at all times
- Optimized for one-handed use while holding wine bottle

**2. Visual Hierarchy for Quick Decisions**
```
Priority 1: Color code (🟢🟡🔴) — Instant decision
Priority 2: Match percentage — Confidence level
Priority 3: Short explanation — Understanding why
Priority 4: Actions — What to do next
```

**3. Reduce Cognitive Load**
- Maximum 3 reasons shown per wine
- Bullet points, not paragraphs
- Icons over text when possible
- Progressive disclosure (tap to see more)

**4. Delight in Discovery**
- Personality reveal is shareable and fun
- Match animations feel magical
- Subtle haptic feedback reinforces actions
- Celebrate user milestones (10th scan, first purchase)

**5. Trust Through Honesty**
- Show all retailer prices (not just highest commission)
- Acknowledge when match is uncertain
- Explain color codes transparently
- No dark patterns

---

## 2. Brand Identity

### 2.1 Visual Tone

**Sophisticated yet approachable**

- Clean interfaces with generous white space
- Premium feel without being intimidating
- Modern but not trendy (timeless design)
- Warm and inviting, not cold and clinical

**References:**
- Headspace (calm, friendly UX)
- Stripe (clean, professional)
- Airbnb (warm, trustworthy)

### 2.2 Color Palette

**Primary Colors:**
```css
/* Brand */
--wine-primary: #6B2737;      /* Deep burgundy - brand accent */
--wine-secondary: #C9A961;    /* Warm gold - premium touch */

/* Backgrounds */
--bg-primary: #FAF9F7;        /* Off-white - main background */
--bg-surface: #FFFFFF;        /* Pure white - cards, modals */
--bg-elevated: #FFFFFF;       /* White with shadow */

/* Text */
--text-primary: #2D2D2D;      /* Charcoal - main text */
--text-secondary: #787878;    /* Mid grey - supporting text */
--text-tertiary: #B0B0B0;     /* Light grey - disabled/metadata */
--text-inverse: #FFFFFF;      /* White - on dark backgrounds */
```

**Match Score Colors (Critical):**
```css
/* Color codes for wine matching */
--match-green: #5A9367;       /* Safe choice - go for it */
--match-yellow: #E8B44C;      /* Moderate risk - be aware */
--match-red: #C75450;         /* Avoid - not for you */

/* With opacity for backgrounds */
--match-green-bg: rgba(90, 147, 103, 0.1);
--match-yellow-bg: rgba(232, 180, 76, 0.1);
--match-red-bg: rgba(199, 84, 80, 0.1);
```

**Feedback Colors:**
```css
/* User feedback buttons */
--feedback-loved: #5A9367;    /* 👍 Loved it */
--feedback-ok: #E8B44C;       /* 😐 It was OK */
--feedback-disliked: #C75450; /* 👎 Not for me */
```

**Personality Colors (8 types):**
```css
--personality-fresh: #7FCDCD;      /* Fresh Classic - teal */
--personality-smooth: #9B7EBD;     /* Smooth Operator - purple */
--personality-bold: #C75450;       /* Bold Adventurer - red */
--personality-crisp: #A8D8EA;      /* Crisp Minimalist - light blue */
--personality-rich: #D4A574;       /* Rich Indulger - warm brown */
--personality-sweet: #F4A6D7;      /* Sweet Tooth - pink */
--personality-wild: #E8854E;       /* Wild Experimenter - orange */
--personality-elegant: #6B2737;    /* Elegant Classicist - burgundy */
```

### 2.3 Typography

**Font Stack:**
```css
/* Primary typeface - UI and body */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 
                'Segoe UI', system-ui, sans-serif;

/* Display typeface - headlines, personality names */
--font-display: 'Cabinet Grotesk', 'Inter', sans-serif;
```

**Type Scale:**
```css
/* Mobile-first sizing */
--text-h1: 32px;      /* Line height: 40px */
--text-h2: 24px;      /* Line height: 32px */
--text-h3: 20px;      /* Line height: 28px */
--text-body-lg: 18px; /* Line height: 28px */
--text-body: 16px;    /* Line height: 24px */
--text-body-sm: 14px; /* Line height: 20px */
--text-caption: 12px; /* Line height: 16px */

/* Desktop adjustments */
@media (min-width: 768px) {
  --text-h1: 48px;    /* Line height: 56px */
  --text-h2: 32px;    /* Line height: 40px */
}
```

**Font Weights:**
```css
--weight-regular: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
```

**Typography Usage:**
- **H1:** Personality reveals, major headlines
- **H2:** Screen titles, section headers
- **H3:** Wine names, card titles
- **Body Large:** Match explanations, important messaging
- **Body:** Default UI text
- **Body Small:** Metadata, timestamps, secondary info
- **Caption:** Labels, form hints, fine print

### 2.4 Iconography

**Style Guidelines:**
- **Stroke:** 2px line weight
- **Corners:** Rounded terminals
- **Size:** 24x24px base (scale to 20px, 28px, 32px as needed)
- **Style:** Minimal, line-based (not filled)

**Icon Library:** Lucide React or Phosphor Icons

**Key Icons:**
```
Camera       - Primary action (scan)
Check        - Success, confirmation
X            - Close, cancel, error
Info         - Help, explanation
Heart        - Favorites, loved wines
ShoppingBag  - Purchase, buy now
User         - Profile
List         - My wines list
Sparkles     - Personality, discovery
TrendingUp   - Match score
AlertCircle  - Warning, moderate risk
XCircle      - Not recommended
```

### 2.5 Spacing System

**Base unit:** 4px

```css
--space-1: 4px;    /* Tight spacing */
--space-2: 8px;    /* Small spacing */
--space-3: 12px;   /* Default spacing */
--space-4: 16px;   /* Medium spacing */
--space-5: 20px;   /* Card padding */
--space-6: 24px;   /* Large spacing */
--space-8: 32px;   /* Section spacing */
--space-10: 40px;  /* Major sections */
--space-12: 48px;  /* Hero spacing */
--space-16: 64px;  /* Extra large */
```

**Usage:**
- Component internal padding: 16-20px
- Between components: 12-16px
- Section spacing: 24-32px
- Screen margins: 16-20px (mobile), 24px (tablet+)

### 2.6 Border Radius

```css
--radius-sm: 8px;   /* Buttons, inputs */
--radius-md: 12px;  /* Cards, modals */
--radius-lg: 16px;  /* Large cards */
--radius-xl: 24px;  /* Bottom sheets */
--radius-full: 9999px; /* Pills, badges */
```

### 2.7 Shadows

```css
/* Elevation system */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);

/* Specific uses */
--shadow-card: var(--shadow-md);
--shadow-modal: var(--shadow-xl);
--shadow-button: 0 2px 4px rgba(107, 39, 55, 0.2);
```

---

## 3. Information Architecture

### 3.1 App Structure

```
Logged Out
└── Landing Page
    └── Sign Up / Login

Logged In (First Time)
└── Onboarding
    ├── Welcome
    ├── Personality Quiz (5 questions)
    ├── Processing
    └── Personality Reveal
        └── First Scan Prompt

Logged In (Returning)
└── Main App
    ├── Scan (Home/Default)
    ├── My Wines
    │   ├── Scanned
    │   ├── Tried
    │   └── Loved
    └── Profile
        ├── Personality
        ├── Taste DNA
        ├── Stats
        └── Settings
```

### 3.2 Navigation Structure

**Primary Navigation (Bottom Tab Bar):**
```
┌─────────────────────────────────────┐
│                                     │
│         [Content Area]              │
│                                     │
├─────────────────────────────────────┤
│  [Camera] [My Wines] [Profile]     │
└─────────────────────────────────────┘

- Camera: Scan screen (default on open)
- My Wines: Saved wines list
- Profile: User profile & settings
```

**Modal Navigation:**
- Scan result → Full-screen modal
- Wine detail → Full-screen modal
- Where to Buy → Bottom sheet
- Personality quiz → Full-screen takeover

### 3.3 Screen Hierarchy

**Tier 1 (Always accessible):**
- Scan screen
- My Wines
- Profile

**Tier 2 (One tap away):**
- Scan result
- Wine detail
- Feedback prompt
- Settings

**Tier 3 (Contextual):**
- Where to Buy sheet
- Personality retake
- Help/FAQ

---

## 4. User Flows

### 4.1 First-Time User Journey

```
┌─────────────────────┐
│  1. Landing Page    │
│                     │
│  "Never buy the     │
│  wrong wine again"  │
│                     │
│  [Get Started]      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  2. Sign Up         │
│                     │
│  Email              │
│  Password           │
│                     │
│  [Create Account]   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  3. Welcome         │
│                     │
│  "Let's find your   │
│  wine personality"  │
│                     │
│  Takes 60 seconds   │
│                     │
│  [Start Quiz]       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  4. Quiz Q1         │
│                     │
│  Progress: 1 of 5   │
│                     │
│  "Which sounds      │
│  better?"           │
│                     │
│  [Fresh & Crisp]    │
│  [Rich & Smooth]    │
└──────────┬──────────┘
           │
           │ (Q2, Q3, Q4, Q5)
           │
           ▼
┌─────────────────────┐
│  5. Processing      │
│                     │
│  [Animation]        │
│  "Analyzing your    │
│  taste..."          │
│                     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  6. Reveal          │
│                     │
│  🍷 Fresh Classic   │
│                     │
│  "You love crisp,   │
│  mineral-driven     │
│  wines"             │
│                     │
│  [Scan First Wine]  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  7. Camera Opens    │
│                     │
│  [Camera viewfinder]│
│  "Point at label"   │
│                     │
└─────────────────────┘
```

### 4.2 Core Loop (Returning User)

```
┌─────────────────────┐
│  Open App           │
│  → Camera Opens     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Point at Bottle    │
│  Take Photo         │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Recognizing...     │
│  [Animation]        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Match Result       │
│                     │
│  🟢 87% MATCH       │
│                     │
│  Chablis PC         │
│                     │
│  Why it matches:    │
│  • High acidity ✓   │
│  • Mineral notes ✓  │
│                     │
│  [Save] [Buy Now]   │
└──────────┬──────────┘
           │
           ├──────────> [Save] → My Wines
           │
           └──────────> [Buy Now] → Affiliate
```

### 4.3 Feedback Loop

```
┌─────────────────────┐
│  User Scans Wine    │
│  → Auto-saved       │
│  → Status: Scanned  │
└──────────┬──────────┘
           │
           │ (3-7 days later)
           │
           ▼
┌─────────────────────┐
│  Open App           │
│                     │
│  Modal appears:     │
│  "Did you try       │
│  that Chablis?"     │
│                     │
│  [👍] [😐] [👎]     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Feedback Recorded  │
│  → Profile improves │
│  → Status: Tried    │
└─────────────────────┘
```

---

## 5. Screen Designs (Detailed)

### 5.1 Landing Page (Logged Out)

**Purpose:** Convert visitors to sign-ups

**Layout:**
```
┌─────────────────────────────────┐
│                                 │
│         [App Icon]              │
│         Smak-DNA                │
│                                 │
│      Never buy the wrong        │
│      wine again                 │
│                                 │
│      Scan any bottle, get       │
│      instant personal match     │
│                                 │
│      🍷 Your taste, not theirs  │
│                                 │
│                                 │
│      [Get Started]              │
│      Full-width button          │
│                                 │
│      Already have account?      │
│      Log in                     │
│                                 │
└─────────────────────────────────┘
```

**Visual Specs:**
- Background: Gradient from off-white to light wine tint
- App icon: 120x120px, centered
- Headline: H1 (32px), Center-aligned, Charcoal
- Subhead: Body Large (18px), Center-aligned, Mid Grey
- Feature icon: 28px emoji
- CTA button: Wine Primary color, 56px height, 12px radius
- Login link: Body Small (14px), Wine Primary color

**Interaction:**
- "Get Started" → Sign Up flow
- "Log in" → Login screen
- Smooth fade-in animation on load

---

### 5.2 Onboarding: Personality Quiz

**Purpose:** Fast, fun initial calibration (45-60 seconds)

**Question Screen Layout:**
```
┌─────────────────────────────────┐
│  ● ○ ○ ○ ○                      │  Progress dots
│                                 │
│                                 │
│  Which sounds better?           │  H2, center
│                                 │
│                                 │
│  ┌───────────────────────────┐ │
│  │                           │ │
│  │   Fresh & Crisp           │ │  Option A
│  │                           │ │
│  │   Bright, lively wines    │ │  Description
│  │   with high acidity       │ │
│  │                           │ │
│  └───────────────────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │                           │ │
│  │   Rich & Smooth           │ │  Option B
│  │                           │ │
│  │   Full-bodied wines       │ │  Description
│  │   with soft tannins       │ │
│  │                           │ │
│  └───────────────────────────┘ │
│                                 │
└─────────────────────────────────┘
```

**Visual Specs:**

**Progress Dots:**
- Size: 8px diameter
- Active: Wine Primary
- Inactive: Light Grey
- Spacing: 8px between dots

**Question Text:**
- Font: H2 (24px), SemiBold
- Color: Charcoal
- Alignment: Center
- Margin bottom: 32px

**Option Cards:**
- Background: White
- Border: 2px solid Light Grey
- Border Radius: 12px
- Padding: 24px
- Margin: 12px horizontal, 8px vertical
- Shadow: None (hover: shadow-md)

**Option Title:**
- Font: H3 (20px), SemiBold
- Color: Charcoal
- Margin bottom: 8px

**Option Description:**
- Font: Body (16px), Regular
- Color: Mid Grey
- Line height: 24px

**Interaction:**
- Tap anywhere on card to select
- Card animates: scale(0.98) → scale(1)
- Haptic feedback (light tap)
- Auto-advance to next question (300ms delay)
- Smooth slide transition

**Question Set:**
```
Q1: Which sounds better?
   [Fresh & Crisp] vs [Rich & Smooth]

Q2: Oak or no oak?
   [Vanilla & Butter] vs [Pure Fruit]

Q3: How adventurous?
   [Safe Classics] vs [Wild Experiments]

Q4: Body preference?
   [Light & Easy] vs [Full & Bold]

Q5: Sweetness preference?
   [Bone Dry] vs [Touch of Sweet]
```

---

### 5.3 Onboarding: Personality Reveal

**Purpose:** Delightful payoff, shareable moment

**Layout:**
```
┌─────────────────────────────────┐
│                                 │
│         ✨ ✨ ✨                │  Sparkles animation
│                                 │
│      You're a                   │  Body text
│                                 │
│      Fresh Classic              │  H1, personality color
│      🍷                         │  Personality emoji
│                                 │
│                                 │
│  You love crisp, mineral-       │  Description
│  driven wines with high         │  Body Large
│  acidity and no oak.            │
│                                 │
│                                 │
│  Your characteristics:          │  H3
│  • High acidity ✓               │  List items
│  • Minimal oak ✓                │  Body
│  • Fresh fruit ✓                │
│  • Light-medium body ✓          │
│                                 │
│                                 │
│  [Share Your Personality]       │  Secondary button
│                                 │
│  [Scan Your First Wine]         │  Primary button
│                                 │
└─────────────────────────────────┘
```

**Visual Specs:**

**Sparkles Animation:**
- 3 sparkle emojis
- Animate in sequence: fade + scale
- Duration: 1.5s total
- Easing: ease-out

**"You're a" text:**
- Font: Body Large (18px)
- Color: Mid Grey
- Margin bottom: 8px

**Personality Name:**
- Font: H1 (32px), Bold
- Color: Personality-specific (e.g., #7FCDCD for Fresh Classic)
- Margin bottom: 4px

**Personality Emoji:**
- Size: 48px
- Margin bottom: 24px

**Description:**
- Font: Body Large (18px)
- Color: Charcoal
- Line height: 28px
- Max width: 320px (centered)
- Margin bottom: 32px

**Characteristics List:**
- Header: H3 (20px), SemiBold
- Items: Body (16px) with checkmark icon
- Icon color: Match Green
- Margin: 8px between items

**Buttons:**
- Primary: "Scan Your First Wine" (Wine Primary background)
- Secondary: "Share Your Personality" (Outline style)
- Both: 56px height, full width - 32px margin
- Spacing: 12px between buttons

**Share Functionality:**
```
Generates shareable card:
┌─────────────────────────┐
│  I'm a Fresh Classic    │
│  🍷                     │
│                         │
│  I love crisp, mineral- │
│  driven wines with high │
│  acidity.               │
│                         │
│  Discover your wine     │
│  personality:           │
│  [Download Smak-DNA]    │
└─────────────────────────┘
```

---

### 5.4 Scan Screen (Primary Interface)

**Purpose:** Instant scanning, primary use case

**Layout (Camera Active):**
```
┌─────────────────────────────────┐
│  [Camera Viewfinder Full Screen]│
│                                 │
│                                 │
│         Point at label          │  Overlay text
│                                 │
│                                 │
│                                 │
│    ┌─────────────────────┐     │  Scan frame
│    │                     │     │  (guides user)
│    │                     │     │
│    │                     │     │
│    │                     │     │
│    └─────────────────────┘     │
│                                 │
│                                 │
│                                 │
│         [Capture Button]        │  Large circle
│                                 │
│                                 │
│    [Flash] [Close] [Gallery]   │  Controls
└─────────────────────────────────┘
```

**Visual Specs:**

**Camera Viewfinder:**
- Full-screen native camera
- No borders, no chrome
- Auto-focus on center

**Overlay Text:**
- "Point at label"
- Font: Body (16px), Medium
- Color: White with 50% black background blur
- Position: Top, centered, 80px from top

**Scan Frame:**
- Rectangle outline (not filled)
- Size: 80% screen width, 3:4 aspect ratio
- Border: 3px solid white
- Border radius: 12px
- Corner accents (L-shapes in corners)
- Subtle pulse animation (scale 1.0 → 1.02 → 1.0, 2s loop)

**Capture Button:**
- Size: 72px diameter
- Background: White
- Inner circle: Wine Primary, 60px diameter
- Shadow: Large (0 4px 12px rgba(0,0,0,0.3))
- Position: Centered horizontally, 40px from bottom
- Tap: Scale 0.9 → 1.0, capture photo

**Controls (Bottom):**
- Flash toggle: Icon, 32px
- Close: X icon, 32px
- Gallery: Image icon, 32px
- Position: 16px from bottom edge
- Spacing: Evenly distributed
- Color: White with subtle shadow

**Interaction:**
- Tap capture → Photo taken → Recognition starts
- Tap close → Return to My Wines or Profile
- Tap gallery → Select from photos (fallback)

---

### 5.5 Recognition Loading State

**Purpose:** Build anticipation during wine recognition

**Layout:**
```
┌─────────────────────────────────┐
│                                 │
│                                 │
│       [Wine Bottle Image]       │  Captured photo
│       Blurred background        │  with blur
│                                 │
│                                 │
│     ┌─────────────────────┐    │
│     │                     │    │
│     │   [Spinner/Dots]    │    │  Loading animation
│     │                     │    │
│     │   Recognizing...    │    │  Status text
│     │                     │    │
│     └─────────────────────┘    │  Card overlay
│                                 │
│                                 │
│                                 │
└─────────────────────────────────┘
```

**Visual Specs:**

**Background:**
- Captured bottle photo
- Blur: 20px gaussian
- Overlay: 40% black tint

**Loading Card:**
- Background: White
- Border radius: 16px
- Padding: 32px
- Shadow: Extra large
- Position: Centered

**Loading Animation:**
- 3 dots bouncing animation
- Color: Wine Primary
- Size: 12px diameter each
- Spacing: 8px between dots
- Animation: Stagger bounce (0.6s total, infinite loop)

**Status Text:**
- Font: Body (16px), Medium
- Color: Charcoal
- Margin top: 16px

**Duration:** 1-3 seconds (actual recognition time)

**States:**
```
1. "Recognizing..." (0-1s)
2. "Analyzing..." (1-2s)
3. "Calculating match..." (2-3s)
```

---

### 5.6 Match Result Screen (Critical)

**Purpose:** Show match score with clear color-coded decision

**Layout (Green - 85%+ Match):**
```
┌─────────────────────────────────┐
│  [✕ Close]                      │  Top right
│                                 │
│                                 │
│      ┌─────────────────┐       │
│      │                 │       │
│      │   🟢 87%        │       │  Badge (large)
│      │   MATCH         │       │
│      │                 │       │
│      └─────────────────┘       │
│                                 │
│      Chablis Premier Cru        │  H2
│      Domaine Laroche            │  Body
│      Burgundy, France • 2021    │  Body Small
│                                 │
│                                 │
│  ┌─────────────────────────┐   │
│  │ This wine is perfect    │   │  Explanation card
│  │ for you                 │   │  H3
│  │                         │   │
│  │ Why it matches:         │   │  Body
│  │ • High acidity (you     │   │
│  │   love this) ✓          │   │  List with icons
│  │ • Mineral notes         │   │
│  │   (perfect for you) ✓   │   │
│  │ • No oak (as you        │   │
│  │   prefer) ✓             │   │
│  └─────────────────────────┘   │
│                                 │
│  [✓ Save to My Wines]           │  Secondary button
│  [🛒 Where to Buy]              │  Primary button
│                                 │
└─────────────────────────────────┘
```

**Visual Specs:**

**Close Button:**
- Icon: X, 24px
- Position: Top right, 16px margin
- Color: Mid Grey
- Tap target: 44x44px

**Match Badge (Green):**
- Background: Match Green (#5A9367)
- Size: 160px × 80px
- Border radius: 16px
- Centered horizontally
- Margin bottom: 24px

**Badge Content:**
- 🟢 Emoji: 32px, top of badge
- Percentage: 48px, Bold, White
- "MATCH" label: 14px, Medium, White (60% opacity)

**Wine Details:**
- Name: H2 (24px), SemiBold, Charcoal, Center
- Producer: Body (16px), Regular, Mid Grey, Center
- Region/Vintage: Body Small (14px), Mid Grey, Center
- Spacing: 4px between lines

**Explanation Card:**
- Background: Match Green (10% opacity)
- Border: 1px solid Match Green
- Border radius: 12px
- Padding: 20px
- Margin: 24px vertical, 16px horizontal

**Card Title:**
- "This wine is perfect for you"
- Font: H3 (20px), SemiBold
- Color: Charcoal
- Margin bottom: 16px

**Reasons List:**
- Header: "Why it matches:"
- Font: Body (16px), Medium
- Color: Charcoal
- Margin bottom: 12px

**List Items:**
- Icon: ✓ (Match Green)
- Text: Body (16px), Regular, Charcoal
- Line height: 24px
- Margin: 8px between items
- Max 3 reasons shown

**Action Buttons:**
- Save: Secondary style (outline), 56px height
- Buy: Primary style (filled), 56px height
- Both full width - 32px margin
- Spacing: 12px between buttons

**Yellow Variant (60-84% Match):**
```
Badge: Match Yellow (#E8B44C)
Card background: Match Yellow (10% opacity)
Card border: Match Yellow
Title: "This could work, but moderate risk"
Icon: ⚠️ instead of ✓
```

**Red Variant (<60% Match):**
```
Badge: Match Red (#C75450)
Card background: Match Red (10% opacity)
Card border: Match Red
Title: "Not recommended for your taste"
Icon: ✗ instead of ✓
Button text: "Show Better Matches" instead of "Where to Buy"
```

**Animation In:**
1. Screen fades in (200ms)
2. Badge scales in (300ms, ease-out, delay 100ms)
3. Content fades in (300ms, delay 300ms)

---

### 5.7 Where to Buy (Bottom Sheet)

**Purpose:** Show affiliate links, enable purchase

**Layout:**
```
┌─────────────────────────────────┐
│                                 │
│  [Main screen dimmed]           │
│                                 │
│                                 │
│ ┌─────────────────────────────┐│
│ │ ═══                         ││  Handle
│ │                             ││
│ │ Where to Buy                ││  Title
│ │                             ││
│ │ ┌─────────────────────────┐││
│ │ │ Wine.com                │││
│ │ │ $28 • Ships in 2 days   │││  Retailer card
│ │ │ [Buy Now →]             │││
│ │ └─────────────────────────┘││
│ │                             ││
│ │ ┌─────────────────────────┐││
│ │ │ Vivino                  │││
│ │ │ $32 • Ships in 3 days   │││  Retailer card
│ │ │ [Buy Now →]             │││
│ │ └─────────────────────────┘││
│ │                             ││
│ │ ┌─────────────────────────┐││
│ │ │ Total Wine              │││
│ │ │ $29 • In stock nearby   │││  Retailer card
│ │ │ [Buy Now →]             │││
│ │ └─────────────────────────┘││
│ │                             ││
│ └─────────────────────────────┘│
└─────────────────────────────────┘
```

**Visual Specs:**

**Background Dim:**
- Overlay: 60% black
- Blur: 8px (backdrop-filter)

**Bottom Sheet:**
- Background: White
- Border radius: 24px 24px 0 0
- Padding: 24px
- Max height: 70vh
- Scrollable if content overflows

**Handle:**
- Width: 40px
- Height: 4px
- Background: Light Grey
- Border radius: 2px
- Centered, 12px from top

**Title:**
- "Where to Buy"
- Font: H2 (24px), SemiBold
- Color: Charcoal
- Margin: 20px bottom

**Retailer Card:**
- Background: Off-white
- Border: 1px solid Light Grey
- Border radius: 12px
- Padding: 16px
- Margin: 12px bottom
- Tap: Entire card is tappable

**Retailer Name:**
- Font: H3 (20px), SemiBold
- Color: Charcoal
- Margin bottom: 4px

**Retailer Info:**
- Font: Body Small (14px)
- Color: Mid Grey
- Format: "$XX • Shipping/Stock info"

**Buy Button:**
- Style: Text link (not full button)
- Font: Body (16px), Medium
- Color: Wine Primary
- Icon: → (arrow right)
- Position: Right-aligned

**Interaction:**
- Swipe down to dismiss
- Tap outside to dismiss
- Tap card → Open affiliate link (external browser)
- Tap Buy Now → Track click, open link

**States:**
- Default: As shown
- Loading: Show skeleton cards
- Error: "Unable to load retailers. Please try again."
- Empty: "Not available online. Try scanning a different wine."

---

### 5.8 My Wines Screen

**Purpose:** Browse saved wines, repurchase, give feedback

**Layout:**
```
┌─────────────────────────────────┐
│  My Wines              [Filter] │  Header
│                                 │
│  [Scanned] [Tried] [Loved]      │  Tabs
│  ────────                       │  Active underline
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🟢 87%                  │   │  Wine card
│  │                         │   │
│  │ Chablis Premier Cru     │   │
│  │ Domaine Laroche         │   │
│  │                         │   │
│  │ Scanned 2 days ago      │   │  Metadata
│  │                         │   │
│  │ [👍 Mark as tried]      │   │  Quick action
│  │ [🛒 Buy - $28]          │   │  Affiliate
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🟢 92%                  │   │
│  │                         │   │
│  │ Sancerre                │   │
│  │ Domaine Vacheron        │   │
│  │                         │   │
│  │ Scanned 1 week ago      │   │
│  │ ✓ Loved it              │   │  Status
│  │                         │   │
│  │ [🛒 Buy again]          │   │
│  └─────────────────────────┘   │
│                                 │
│  [Load More]                    │
│                                 │
└─────────────────────────────────┘
```

**Visual Specs:**

**Header:**
- Title: "My Wines", H2 (24px), SemiBold
- Filter icon: 24px, top right
- Padding: 20px
- Border bottom: 1px solid Light Grey

**Tabs:**
- Font: Body (16px), Medium
- Active: Wine Primary color, underline (2px)
- Inactive: Mid Grey, no underline
- Spacing: 24px between tabs
- Padding: 16px horizontal, 12px vertical

**Wine Card:**
- Background: White
- Border: 1px solid Light Grey
- Border radius: 12px
- Padding: 16px
- Margin: 12px horizontal, 8px vertical
- Shadow: Small (on hover/tap: medium)

**Match Badge (Small):**
- Size: 60px × 32px
- Border radius: 8px
- Background: Color-coded
- Position: Top left of card
- Content: 🟢 XX%

**Wine Name:**
- Font: H3 (20px), SemiBold
- Color: Charcoal
- Margin: 12px top, 2px bottom

**Producer:**
- Font: Body (16px), Regular
- Color: Mid Grey

**Metadata:**
- Font: Body Small (14px)
- Color: Mid Grey
- Margin: 12px top
- Format: "Scanned X days ago" or "✓ Loved it"

**Quick Actions:**
- Style: Secondary buttons (outline)
- Height: 40px
- Font: Body Small (14px), Medium
- Two buttons side-by-side (if both applicable)
- Margin: 12px top

**Empty State:**
```
┌─────────────────────────┐
│         🍷              │
│                         │
│  No wines yet           │
│                         │
│  Scan your first        │
│  bottle to get started  │
│                         │
│  [Open Camera]          │
└─────────────────────────┘
```

---

### 5.9 Profile Screen

**Purpose:** Show personality, taste DNA, stats

**Layout:**
```
┌─────────────────────────────────┐
│  Profile               [Settings]│
│                                 │
│  ┌─────────────────────────┐   │
│  │                         │   │  Personality card
│  │  🍷 Fresh Classic       │   │
│  │                         │   │
│  │  "You love crisp,       │   │
│  │  mineral-driven wines"  │   │
│  │                         │   │
│  │  [Share Your Type]      │   │
│  └─────────────────────────┘   │
│                                 │
│  Your Taste DNA                 │  Section header
│                                 │
│  ┌─────────────────────────┐   │
│  │                         │   │
│  │    [Radar Chart]        │   │  Taste visualization
│  │    6 dimensions         │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
│  You tend to prefer:            │
│  • High acidity wines           │  Insights
│  • Minimal oak                  │
│  • Light-medium body            │
│                                 │
│  Based on 23 scans, 12 ratings  │  Stats
│                                 │
│  ─────────────────────          │  Divider
│                                 │
│  [🔄 Retake Personality Quiz]   │  Action
│                                 │
└─────────────────────────────────┘
```

**Visual Specs:**

**Personality Card:**
- Background: Gradient (personality color at 20% → transparent)
- Border: 1px solid personality color
- Border radius: 16px
- Padding: 24px
- Margin: 16px

**Personality Name:**
- Font: H2 (24px), Bold
- Color: Personality color
- Icon: 32px emoji before text

**Personality Description:**
- Font: Body (16px), Regular
- Color: Charcoal
- Line height: 24px
- Margin: 12px top/bottom

**Share Button:**
- Style: Secondary (outline)
- Color: Personality color
- Height: 44px
- Full width

**Section Header:**
- "Your Taste DNA"
- Font: H3 (20px), SemiBold
- Color: Charcoal
- Margin: 32px top, 16px bottom

**Radar Chart:**
- Size: 240px × 240px (square)
- Background: White
- Border radius: 12px
- Padding: 20px
- Shadow: Small
- 6 axes (Acidity, Tannin, Fruit, Sweetness, Body, Style)
- Fill: Personality color (20% opacity)
- Stroke: Personality color (2px)
- Labels: Body Small (12px), outside axes

**Insights List:**
- Header: "You tend to prefer:"
- Font: Body (16px), Medium
- Items: Body (16px), Regular
- Bullet: • (Mid Grey)
- Spacing: 8px between items
- Max 3 insights

**Stats:**
- Font: Body Small (14px)
- Color: Mid Grey
- Margin: 16px top

**Retake Quiz Button:**
- Style: Tertiary (text-only)
- Icon: 🔄 before text
- Font: Body (16px), Medium
- Color: Wine Primary

---

## 6. Component Library

### 6.1 Buttons

**Primary Button:**
```css
.btn-primary {
  background: var(--wine-primary);
  color: var(--text-inverse);
  font-size: 16px;
  font-weight: 500;
  height: 56px;
  border-radius: 12px;
  padding: 0 24px;
  box-shadow: var(--shadow-button);
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  background: #5A1F2A; /* Darker */
  box-shadow: var(--shadow-lg);
}

.btn-primary:active {
  transform: scale(0.98);
}

.btn-primary:disabled {
  background: var(--bg-tertiary);
  color: var(--text-tertiary);
  box-shadow: none;
  cursor: not-allowed;
}
```

**Secondary Button (Outline):**
```css
.btn-secondary {
  background: transparent;
  color: var(--wine-primary);
  font-size: 16px;
  font-weight: 500;
  height: 56px;
  border-radius: 12px;
  padding: 0 24px;
  border: 2px solid var(--wine-primary);
  cursor: pointer;
}

.btn-secondary:hover {
  background: rgba(107, 39, 55, 0.05);
}

.btn-secondary:active {
  transform: scale(0.98);
}
```

**Tertiary Button (Text-only):**
```css
.btn-tertiary {
  background: transparent;
  color: var(--wine-primary);
  font-size: 16px;
  font-weight: 500;
  padding: 12px 16px;
  border: none;
  cursor: pointer;
}

.btn-tertiary:hover {
  text-decoration: underline;
}
```

### 6.2 Match Score Badge

**Component:**
```jsx
<MatchBadge score={87} size="large" />
```

**Variants:**
- **Large:** 160px × 80px (for result screen)
- **Small:** 60px × 32px (for wine cards)

**Implementation:**
```css
.match-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  gap: 4px;
}

.match-badge--large {
  width: 160px;
  height: 80px;
}

.match-badge--small {
  width: 60px;
  height: 32px;
  flex-direction: row;
  gap: 4px;
}

.match-badge--green {
  background: var(--match-green);
}

.match-badge--yellow {
  background: var(--match-yellow);
}

.match-badge--red {
  background: var(--match-red);
}

.match-badge__emoji {
  font-size: 32px; /* Large */
  font-size: 16px; /* Small */
}

.match-badge__score {
  font-size: 48px; /* Large */
  font-size: 16px; /* Small */
  font-weight: 700;
  color: white;
}

.match-badge__label {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  display: none; /* Hidden on small */
}

.match-badge--large .match-badge__label {
  display: block;
}
```

### 6.3 Wine Card (My Wines)

**Component:**
```jsx
<WineCard 
  wine={wine}
  matchScore={87}
  status="scanned"
  onFeedback={() => {}}
  onBuy={() => {}}
/>
```

**Implementation:**
```css
.wine-card {
  background: white;
  border: 1px solid var(--text-tertiary);
  border-radius: 12px;
  padding: 16px;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.2s ease;
}

.wine-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.wine-card__badge {
  margin-bottom: 12px;
}

.wine-card__name {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.wine-card__producer {
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.wine-card__meta {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.wine-card__actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.wine-card__action {
  flex: 1;
  height: 40px;
  font-size: 14px;
}
```

### 6.4 Feedback Buttons

**Component:**
```jsx
<FeedbackButtons 
  onFeedback={(rating) => console.log(rating)}
/>
```

**Implementation:**
```css
.feedback-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feedback-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 56px;
  border-radius: 12px;
  border: none;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.feedback-button--loved {
  background: var(--feedback-loved);
  color: white;
}

.feedback-button--ok {
  background: var(--feedback-ok);
  color: var(--text-primary);
}

.feedback-button--disliked {
  background: var(--feedback-disliked);
  color: white;
}

.feedback-button:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-md);
}

.feedback-button:active {
  transform: scale(0.98);
}

.feedback-button__emoji {
  font-size: 24px;
}
```

### 6.5 Taste Radar Chart

**Component:**
```jsx
<TasteRadar tasteVector={user.tasteProfile} />
```

**Using Chart.js:**
```javascript
import { Radar } from 'react-chartjs-2';

const TasteRadar = ({ tasteVector }) => {
  const data = {
    labels: ['Acidity', 'Tannin', 'Fruit', 'Sweetness', 'Body', 'Style'],
    datasets: [{
      label: 'Your Taste',
      data: [
        tasteVector.acidity,
        tasteVector.tannin,
        tasteVector.fruit,
        tasteVector.sweetness,
        tasteVector.body,
        tasteVector.style
      ],
      backgroundColor: 'rgba(107, 39, 55, 0.2)',
      borderColor: '#6B2737',
      borderWidth: 2,
      pointBackgroundColor: '#6B2737',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#6B2737'
    }]
  };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 1,
        ticks: {
          display: false
        },
        grid: {
          color: '#E8E6E3'
        },
        angleLines: {
          color: '#E8E6E3'
        },
        pointLabels: {
          font: {
            size: 12,
            family: 'Inter'
          },
          color: '#2D2D2D'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div className="taste-radar">
      <Radar data={data} options={options} />
    </div>
  );
};
```

---

## 7. Interaction Patterns

### 7.1 Camera Scanning Flow

**States:**
```
1. Camera Ready
   → Viewfinder active
   → Scan frame pulsing
   → "Point at label" hint

2. Capture
   → User taps capture button
   → Button scales down (0.9)
   → Shutter sound + haptic
   → Photo taken

3. Recognition
   → Camera closes
   → Photo displayed (blurred background)
   → Loading animation
   → Status text updates

4. Result
   → Fade to match result screen
   → Badge animates in
   → Content fades in
```

**Timing:**
- Capture animation: 200ms
- Transition to loading: 300ms
- Loading state: 1-3s (actual recognition)
- Transition to result: 400ms

### 7.2 Bottom Sheet Interactions

**Gestures:**
- **Swipe down:** Dismiss sheet
- **Tap outside:** Dismiss sheet
- **Tap card:** Execute action (open link)

**Animation:**
```
Open:
- Sheet slides up from bottom (300ms, ease-out)
- Background dims (200ms)

Close:
- Sheet slides down (250ms, ease-in)
- Background undims (200ms)
```

**Physics:**
- Spring animation for open/close
- Rubber-band effect if user over-swipes
- Snap to top if dragged >50% up
- Snap to closed if dragged <50%

### 7.3 Haptic Feedback

**When to use:**
```
Light tap:
- Button press
- Toggle switch
- Tab selection

Medium impact:
- Photo capture
- Successful scan
- Feedback submitted

Heavy impact:
- Error state
- Failed recognition
```

**Implementation:**
```javascript
// React Native
import { Haptics } from 'expo-haptics';

// Light
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

// Medium
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

// Heavy
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
```

### 7.4 Loading States

**Skeleton Screens:**
```
Use for:
- My Wines list (while loading)
- Profile data (while loading)

Design:
- Grey boxes matching final content layout
- Animated shimmer (left to right)
- No spinners
```

**Spinners:**
```
Use for:
- Inline actions (saving, submitting)
- Small loading indicators

Design:
- Circular spinner
- Wine Primary color
- 24px size (inline), 40px size (full screen)
```

**Progress Indicators:**
```
Use for:
- Onboarding quiz (1 of 5)
- Multi-step processes

Design:
- Dots or thin bar
- Current: Wine Primary
- Upcoming: Light Grey
```

### 7.5 Error Handling

**Error Types:**

**1. Recognition Failed:**
```
Screen: Recognition loading
→ "Couldn't recognize this wine"
   [Try Again] [Search Manually]
```

**2. Network Error:**
```
Toast notification (bottom):
"No internet connection"
Icon: WiFi off
Duration: 4s
Action: Dismiss
```

**3. Invalid Input:**
```
Inline error (below input):
"Please enter a valid email"
Color: Match Red
Icon: AlertCircle
```

**Error Screen Template:**
```
┌─────────────────────────┐
│                         │
│     [Error Icon]        │
│     48px, grey          │
│                         │
│  Couldn't recognize     │
│  this wine              │
│                         │
│  Try these:             │
│  • Better lighting      │
│  • Clearer photo        │
│  • Different angle      │
│                         │
│  [Try Again]            │
│  [Search Manually]      │
│                         │
└─────────────────────────┘
```

---

## 8. Animation Specifications

### 8.1 Page Transitions

**Screen to Screen:**
```css
.page-transition-enter {
  opacity: 0;
  transform: translateY(20px);
}

.page-transition-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: all 300ms ease-out;
}

.page-transition-exit {
  opacity: 1;
  transform: translateY(0);
}

.page-transition-exit-active {
  opacity: 0;
  transform: translateY(-20px);
  transition: all 200ms ease-in;
}
```

### 8.2 Match Badge Animation

**Sequence:**
```
1. Scale In (300ms)
   - Start: scale(0.8), opacity(0)
   - End: scale(1), opacity(1)
   - Easing: cubic-bezier(0.34, 1.56, 0.64, 1) // Bounce

2. Subtle Pulse (optional, after 1s)
   - scale(1) → scale(1.05) → scale(1)
   - Duration: 600ms
   - Easing: ease-in-out
```

**Implementation:**
```css
@keyframes badge-scale-in {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.match-badge {
  animation: badge-scale-in 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 8.3 Scan Frame Pulse

**Animation:**
```css
@keyframes scan-frame-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.02);
    opacity: 0.8;
  }
}

.scan-frame {
  animation: scan-frame-pulse 2s ease-in-out infinite;
}
```

### 8.4 Shimmer Loading

**Animation:**
```css
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 0px,
    #f8f8f8 40px,
    #f0f0f0 80px
  );
  background-size: 1000px 100%;
  animation: shimmer 1.5s linear infinite;
}
```

### 8.5 Button Press

**Animation:**
```css
.button {
  transition: transform 100ms ease;
}

.button:active {
  transform: scale(0.98);
}
```

---

## 9. Responsive Behavior

### 9.1 Breakpoints

```css
/* Mobile (default) */
@media (max-width: 767px) {
  /* Single column, full-width cards */
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  /* Larger margins, max-width containers */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Centered layout, multi-column where appropriate */
}
```

### 9.2 Layout Adaptations

**Mobile (Primary):**
- Full-width screens
- Bottom navigation
- Full-screen modals
- Stack all content vertically

**Tablet:**
- Max-width: 600px, centered
- Larger margins (24px)
- Slightly larger touch targets
- Same single-column layout

**Desktop:**
- Max-width: 480px, centered (app is mobile-optimized)
- Side navigation (left sidebar)
- Modal overlays instead of full-screen
- Larger text sizing (from type scale)

### 9.3 Typography Scaling

```css
/* Mobile */
:root {
  --text-h1: 32px;
  --text-h2: 24px;
  --text-h3: 20px;
  --text-body: 16px;
}

/* Desktop */
@media (min-width: 1024px) {
  :root {
    --text-h1: 48px;
    --text-h2: 32px;
    --text-h3: 24px;
    --text-body: 16px; /* Same */
  }
}
```

---

## 10. Accessibility

### 10.1 Color Contrast

**All text meets WCAG AA (4.5:1 for body, 3:1 for large):**

```
Charcoal (#2D2D2D) on White: 16.5:1 ✓
Wine Primary (#6B2737) on White: 8.2:1 ✓
Mid Grey (#787878) on White: 4.6:1 ✓
White on Match Green (#5A9367): 4.7:1 ✓
White on Match Yellow (#E8B44C): 3.2:1 ⚠️ (use dark text)
White on Match Red (#C75450): 5.1:1 ✓
```

**Fix for Yellow:**
Use dark text (Charcoal) on Yellow backgrounds.

### 10.2 Touch Targets

**Minimum size:** 44x44px (iOS), 48x48px (Android)

**Our standards:**
- Primary buttons: 56px height (exceeds minimum)
- Secondary buttons: 56px height
- Icon buttons: 44x44px minimum
- Cards: Full width, 80px+ height (easy to tap)

### 10.3 Screen Reader Support

**Semantic HTML:**
```jsx
<button aria-label="Scan wine">
  <CameraIcon />
</button>

<img 
  src={wine.image} 
  alt={`${wine.name} by ${wine.producer}`} 
/>

<main role="main">
  <section aria-labelledby="wines-heading">
    <h2 id="wines-heading">My Wines</h2>
    ...
  </section>
</main>
```

**ARIA Labels:**
- All icon-only buttons have `aria-label`
- Form inputs have associated `<label>` elements
- Loading states announce: `aria-live="polite"`
- Error messages: `aria-live="assertive"`

### 10.4 Keyboard Navigation

**Focus Management:**
```css
/* Visible focus indicator */
*:focus-visible {
  outline: 2px solid var(--wine-primary);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Skip to content link (desktop) */
.skip-to-content {
  position: absolute;
  top: -40px;
  left: 0;
  background: white;
  padding: 8px;
  z-index: 100;
}

.skip-to-content:focus {
  top: 0;
}
```

**Tab Order:**
- Logical top-to-bottom, left-to-right
- Skip hidden/disabled elements
- Modal traps focus until dismissed
- Return focus to trigger element on close

**Keyboard Shortcuts:**
- `Enter` / `Space`: Activate buttons
- `Esc`: Close modals, cancel actions
- `Tab`: Navigate forward
- `Shift+Tab`: Navigate backward

### 10.5 Reduced Motion

**Respect user preferences:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Disable:**
- Scan frame pulse
- Badge scale-in
- Page transitions
- Shimmer effects

**Keep:**
- Color changes
- Opacity changes
- Instant state updates

---

## 11. Localization Guidelines

### 11.1 Text Handling

**Design for Expansion:**
- German text is ~30% longer than English
- Leave 40% extra space in buttons/labels
- Use flexible containers (no fixed widths)
- Test with longest language (German)

**Example:**
```
English: "Scan" (4 chars)
German: "Scannen" (8 chars)
Swedish: "Skanna" (7 chars)
French: "Scanner" (7 chars)

Button should accommodate 12+ characters
```

### 11.2 RTL Support (Future)

**Not in MVP, but design considerations:**
- Use logical properties (margin-inline-start vs margin-left)
- Mirror layouts for RTL languages (Arabic, Hebrew)
- Icons that indicate direction should flip

### 11.3 Number & Date Formatting

**Localize:**
```javascript
// Match score (same everywhere)
87% // Universal

// Dates
en: "2 days ago"
sv: "2 dagar sedan"
fr: "il y a 2 jours"
es: "hace 2 días"

// Prices
en-US: "$28"
en-GB: "£22"
sv-SE: "280 kr"
fr-FR: "26 €"
```

### 11.4 Image Localization

**Text in Images:**
- Avoid text in images when possible
- If needed, create separate images per locale
- Use SVG with text elements (easily translatable)

**Personality Quiz:**
- Question images are abstract (no text)
- Safe for all locales

---

## 12. Design Delivery Specifications

### 12.1 Export Requirements

**For Developers:**
```
Assets:
- Icons: SVG, 24x24px, 2px stroke
- Images: PNG @1x, @2x, @3x (iOS)
         WebP + PNG fallback (web)
- Personalities: 8 gradient cards (1080x1920px)

Design System:
- colors.json (all color tokens)
- spacing.json (spacing scale)
- typography.json (font sizes, weights)

Components:
- Figma component specs
- Interaction notes
- Animation parameters
```

### 12.2 Handoff Process

**Use Figma Dev Mode:**
- Inspect spacing, colors, typography
- Export assets directly
- Copy CSS for styles
- See component variants

**Documentation:**
- This design spec (reference)
- Component usage guidelines
- Animation specifications
- Accessibility notes

---

## 13. Open Design Questions

### For Discussion/Iteration:

1. **Personality card visuals:** 
   - Abstract gradients or illustrated characters?
   - Shareable format (Instagram story, square post)?

2. **Wine images in My Wines:**
   - Show bottle thumbnails or just text?
   - Placeholder for wines without images?

3. **Affiliate link presentation:**
   - Show all retailers or just top 3?
   - Display prices (if available) or not?

4. **Premium tier visual differentiation:**
   - Gold badge, different colors, or subtle?

5. **Scan frame design:**
   - Rounded rectangle or wine bottle outline?
   - Animated corners or static?

---

## 14. Success Criteria (Design)

**The design is successful if:**

1. ✅ **Onboarding completes in <60 seconds** (measured)
2. ✅ **Users understand color codes immediately** (no tutorial needed)
3. ✅ **First scan feels magical** (positive feedback)
4. ✅ **Match result is instantly readable** (3-second rule)
5. ✅ **Users describe it as "clean" and "easy"** (surveys)

**Design KPIs:**
- Task completion rate: >90%
- Error rate: <5%
- User satisfaction (SUS score): >70
- Visual appeal rating: >8/10

---

## Appendix: Design System Summary

### Quick Reference

**Colors:**
- Primary: #6B2737
- Match Green: #5A9367
- Match Yellow: #E8B44C
- Match Red: #C75450

**Typography:**
- Font: Inter
- H1: 32px/40px (mobile), 48px/56px (desktop)
- Body: 16px/24px

**Spacing:**
- Base: 4px
- Common: 12px, 16px, 24px, 32px

**Radius:**
- Buttons: 12px
- Cards: 12-16px
- Modals: 24px (top)

**Shadows:**
- Cards: 0 4px 6px rgba(0,0,0,0.07)
- Modals: 0 20px 25px rgba(0,0,0,0.15)

---

**End of Design Specification v2.0**

*This document should evolve as the product is built and tested. Update version number and date when making significant changes.*
