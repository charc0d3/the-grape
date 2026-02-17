# Smak-DNA — Ultimate Build Prompt (Final Version)

**Version:** 2.0 — Scan-First, Global, Affiliate-Enabled  
**Last Updated:** February 2026  
**Product Type:** Personal wine recommendation app (anti-Vivino)  
**Core Value:** "Vivino tells you what everyone else likes. We tell you if the wine is right for YOU."

---

## 🎯 Executive Summary

Build a mobile-first wine app that helps users make confident wine purchases through:
1. **Instant scanning** (camera → wine recognition → personal match score)
2. **Color-coded decisions** (🟢 Yes / 🟡 Maybe / 🔴 Pass)
3. **Zero-friction feedback** (async, opt-in, one-tap)
4. **Affiliate monetization** (guide users to purchase, earn commission)
5. **Global from day 1** (not Sweden-specific, works anywhere)

**The Big Shift from Original MVP:**
- ❌ No "blind match" gimmick
- ❌ No manual wine rating before seeing value
- ❌ No Sweden/Systembolaget dependency
- ✅ Instant utility (scan first wine, get immediate value)
- ✅ Piggyback on existing behavior (people already scan wines)
- ✅ Affiliate-first business model
- ✅ Global wine database from day 1

---

## 1. Product Vision & Problem Statement

### The Problem We Solve

**Current state:**
- People use Vivino to scan wines before buying
- Vivino shows crowd ratings (3.8⭐, 4.2⭐, etc.)
- Problem: **Ratings reflect what the majority likes, not what YOU like**
- Result: Many "okay" purchases, few confident choices

**Our solution:**
- Same scanning behavior (zero friction)
- Different output: **Personal match score** instead of crowd rating
- Clear decision framework: 🟢 Safe choice / 🟡 Risk / 🔴 Avoid
- Result: Confident purchases aligned with personal taste

**Core insight:**
```
Scanning happens BEFORE purchase.
Feedback happens AFTER consumption.
```

Therefore: We provide instant value (scan → match), and gather data later (optional feedback).

---

## 2. User Flows

### 2.1 First-Time User Journey

```
1. Landing Page
   "Never buy the wrong wine again"
   [Discover Your Wine Personality]

2. Personality Quiz (45-60 seconds)
   Q1: "Which sounds better?"
       [Fresh & Crisp] vs [Rich & Smooth]
   
   Q2: "Oak or no oak?"
       [Vanilla & Butter] vs [Pure Fruit]
   
   Q3: "How adventurous?"
       [Safe Classics] vs [Wild Experiments]
   
   Q4: "Body preference?"
       [Light & Easy] vs [Full & Bold]
   
   Q5: "Sweetness preference?"
       [Bone Dry] vs [Touch of Sweet]

3. Processing (2 seconds)
   "Analyzing your taste..."
   [Animation of taste dimensions assembling]

4. Personality Reveal
   "You're a FRESH CLASSIC"
   
   "You love crisp, mineral-driven whites 
   and elegant, lighter reds."
   
   Characteristics:
   • High acidity ✓
   • Minimal oak ✓
   • Fresh fruit ✓
   • Light-medium body ✓
   
   [🍷 See Wines for Your Type]
   [📸 Scan Your First Bottle]

5. First Scan
   Camera opens → Point at wine label
   
   [Scanning...]
   [Recognizing...]
   
   → 🟢 87% MATCH
   
   "Chablis Premier Cru
   Domaine Laroche"
   
   Why it matches:
   • High acidity (you love this)
   • Mineral notes (perfect for you)
   • No oak (as you prefer)
   
   [✓ Saved to My Wines]
   [🛒 Where to Buy]

6. Main Feed (Home Screen)
   Camera icon (always visible, primary action)
   "My Scanned Wines" tab
   Bottom nav: [Scan] [My Wines] [Profile]
```

### 2.2 Returning User Journey

```
1. Open App
   → Camera opens immediately (default screen)
   
   OR
   
   → Notification: "Did you try that Chablis?"
      [👍 Loved it] [😐 It was OK] [👎 Not for me]
      → One tap → Profile improves

2. At Wine Shop
   User points camera at bottle
   
   → 🟢 92% MATCH
   
   "Sancerre 2022
   Domaine Vacheron"
   
   This wine is perfect for you.
   
   [Save to My Wines]
   [🛒 Buy Now - $24]  ← Affiliate link

3. Browsing Past Scans
   My Wines tab:
   
   📋 Scanned (15)
   ✓ Tried (8)
   ❤️ Loved (5)
   
   🟢 Chablis Premier Cru - 87%
      [🛒 Buy again - $28]
   
   🟢 Sancerre - 92%
      [👍 Mark as tried]
   
   🟡 Rioja Reserva - 71%
      [🔍 See why]

4. Profile Page
   Your Wine Personality: Fresh Classic
   
   [Taste DNA Visualization]
   Radar chart showing 6 dimensions
   
   You tend to prefer:
   • High acidity wines
   • Minimal oak
   • Light-medium body
   
   Based on 12 scans, 5 ratings
   
   [🔄 Retake Personality Quiz]
```

---

## 3. Core Features (MVP)

### 3.1 Onboarding & Personality

**Purpose:** Fast, fun, creates initial taste profile

**Components:**
1. **Landing page** (logged out state)
2. **Auth** (email/password, no social login for MVP)
3. **Personality quiz** (5 questions, vibe-based)
4. **Processing animation** (builds anticipation)
5. **Personality reveal** (shareable result)

**Personalities (8 types):**
```
1. Fresh Classic
   - High acidity, minimal oak, crisp
   - Example: Chablis, Sancerre, Grüner Veltliner

2. Smooth Operator  
   - Medium body, soft tannins, approachable
   - Example: Merlot, Pinot Noir, Beaujolais

3. Bold Adventurer
   - Full body, high tannin, intense
   - Example: Barolo, Cabernet, Syrah

4. Crisp Minimalist
   - Bone dry, light, mineral
   - Example: Muscadet, Albariño, Vinho Verde

5. Rich Indulger
   - Oaked, buttery, full-bodied
   - Example: Oaked Chardonnay, White Burgundy

6. Sweet Tooth
   - Off-dry to sweet, fruit-forward
   - Example: Riesling, Moscato, Port

7. Wild Experimenter
   - Natural, funky, unconventional
   - Example: Orange wine, Pet-nat, Skin-contact

8. Elegant Classicist
   - Balanced, refined, age-worthy
   - Example: Bordeaux, Red Burgundy, Rioja
```

**Technical Requirements:**
- Questions stored as config (easy to A/B test)
- Answers map to taste vector (6 dimensions)
- Personality assigned based on taste vector clustering
- Localized (EN, SE, FR, ES for MVP)

### 3.2 Wine Scanning & Recognition

**Purpose:** Instant value, primary use case

**Flow:**
```
1. User taps camera icon (or opens app → camera default)
2. Point at wine label
3. Photo taken
4. Recognition process:
   
   Option A: OCR + Text Matching
   - Extract text from label
   - Match against database (name, producer, vintage)
   - If unique match → Done
   - If multiple matches → Show options
   - If no match → Manual search + save for training
   
   Option B: Vivino API (if accessible)
   - Send image to Vivino
   - Get wine ID back
   - Look up in our database
   - Display match score
   
   Option C: Hybrid (Recommended for MVP)
   - Try Vivino API first (if available)
   - Fallback to OCR
   - Last resort: manual search

5. Display result:
   - Wine name, producer, vintage
   - Match score (0-100%)
   - Color code: 🟢 85%+ / 🟡 60-84% / 🔴 <60%
   - Short explanation (max 3 bullet points)
   - CTAs: [Save] [Buy Now]

6. Auto-save to "My Wines" (status: Not Tried)
```

**Match Score Display:**
```
🟢 GREEN (85-100%)
"This wine is perfect for you"

Reasons:
• High acidity (you love this) ✓
• Mineral notes (matches your taste) ✓
• No oak (as you prefer) ✓

[Save to My Wines]
[🛒 Buy at Wine.com - $28]

---

🟡 YELLOW (60-84%)
"This could work, but moderate risk"

Reasons:
• Acidity matches ✓
• This is oaked (you prefer unoaked) ⚠️
• Fuller body than you usually like ⚠️

[See Similar Wines]
[Save Anyway]

---

🔴 RED (<60%)
"Not recommended for your taste"

Reasons:
• Too sweet for your preference ✗
• Low acidity (you prefer high) ✗
• Heavy oak (not your style) ✗

[Show Better Matches]
```

**Technical Requirements:**
- Camera access (React Native Camera or browser API)
- OCR library (Tesseract.js or Google Vision API)
- Wine database with taste profiles (see section 4)
- Match algorithm (weighted Euclidean distance)
- Affiliate link generation (see section 5)

### 3.3 Wine Database & Match Algorithm

**Wine Data Structure:**
```typescript
interface Wine {
  id: string;
  name: string;
  producer: string;
  region: string;
  country: string;
  vintage?: number;
  type: 'red' | 'white' | 'rosé' | 'sparkling' | 'orange' | 'dessert';
  
  // Taste profile (core matching data)
  tasteProfile: {
    acidity: number;     // 0.0-1.0
    tannin: number;      // 0.0-1.0 (0 for whites)
    fruit: number;       // 0.0-1.0 (intensity)
    sweetness: number;   // 0.0-1.0
    body: number;        // 0.0-1.0
    style: number;       // 0.0-1.0 (0=classic, 1=funky)
  };
  
  // Metadata
  description?: string;
  grapeVarieties?: string[];
  abv?: number;
  
  // External IDs
  vivinoId?: string;
  wineSearcherId?: string;
  
  // Images
  labelImageUrl?: string;
  bottleImageUrl?: string;
  
  // Affiliate
  affiliateLinks?: AffiliateLink[];
}
```

**Match Algorithm:**
```typescript
// Dimension weights (empirically tuned)
const WEIGHTS = {
  acidity: 1.0,
  tannin: 1.2,      // High impact on preference
  fruit: 0.9,
  sweetness: 1.1,   // Very polarizing
  body: 1.0,
  style: 0.8        // Less predictive
};

function calculateMatchScore(
  userTaste: TasteVector,
  wineProfile: TasteVector
): number {
  let sumSquaredDiff = 0;
  let sumWeights = 0;
  
  for (const [dimension, weight] of Object.entries(WEIGHTS)) {
    const diff = userTaste[dimension] - wineProfile[dimension];
    sumSquaredDiff += weight * (diff ** 2);
    sumWeights += weight;
  }
  
  const distance = Math.sqrt(sumSquaredDiff);
  const maxDistance = Math.sqrt(sumWeights);
  
  // Convert to percentage (inverse of distance)
  const matchScore = (1 - distance / maxDistance) * 100;
  
  return Math.round(matchScore);
}

// Generate explanation
function generateExplanation(
  userTaste: TasteVector,
  wineProfile: TasteVector,
  matchScore: number
): string[] {
  const reasons: string[] = [];
  const threshold = 0.2; // Significant difference
  
  // Acidity
  if (userTaste.acidity > 0.7 && wineProfile.acidity > 0.7) {
    reasons.push("High acidity (you love this) ✓");
  } else if (Math.abs(userTaste.acidity - wineProfile.acidity) > threshold) {
    if (wineProfile.acidity < userTaste.acidity) {
      reasons.push("Lower acidity than you prefer ⚠️");
    }
  }
  
  // Tannin
  if (userTaste.tannin < 0.3 && wineProfile.tannin > 0.7) {
    reasons.push("High tannin (you prefer soft wines) ✗");
  }
  
  // Oak/Style
  if (userTaste.style < 0.3 && wineProfile.style > 0.6) {
    reasons.push("Funky/experimental style (not your usual) ⚠️");
  }
  
  // Sweetness
  if (Math.abs(userTaste.sweetness - wineProfile.sweetness) > threshold) {
    if (wineProfile.sweetness > userTaste.sweetness) {
      reasons.push("Sweeter than you usually like ⚠️");
    } else {
      reasons.push("Drier than you usually prefer ⚠️");
    }
  }
  
  // Body
  if (userTaste.body < 0.4 && wineProfile.body > 0.7) {
    reasons.push("Full-bodied (you prefer lighter) ⚠️");
  }
  
  return reasons.slice(0, 3); // Max 3 reasons
}
```

**Initial Wine Database:**
- **Source:** Vivino scraping + AI-generated taste profiles
- **Size:** 100,000 wines initially (expand via crowdsourcing)
- **Coverage:** Top wines by country
  - France: 20K
  - Italy: 15K
  - Spain: 10K
  - USA: 15K
  - Australia: 8K
  - Germany: 7K
  - Other: 25K

**Taste Profile Generation (AI):**
```python
# For each wine in database without taste profile:

def generate_taste_profile(wine_description: str) -> TasteVector:
    prompt = f"""
    Analyze this wine description and output a taste profile.
    
    Description: "{wine_description}"
    
    Return ONLY valid JSON with these exact keys (0.0-1.0 scale):
    {{
      "acidity": 0.0-1.0,
      "tannin": 0.0-1.0,
      "fruit": 0.0-1.0,
      "sweetness": 0.0-1.0,
      "body": 0.0-1.0,
      "style": 0.0-1.0
    }}
    
    Guidelines:
    - Acidity: 0=low, 1=high
    - Tannin: 0=soft, 1=grippy (0 for white wines)
    - Fruit: 0=subtle, 1=bold
    - Sweetness: 0=bone dry, 1=sweet
    - Body: 0=light, 1=full
    - Style: 0=classic/clean, 1=funky/natural
    """
    
    response = claude_api.complete(prompt)
    return json.loads(response)

# Run for 100K wines
# Cost: ~$500-1000 (Claude API)
# Time: 1-2 days
```

### 3.4 Async Feedback Loop

**Purpose:** Improve taste profile over time, zero friction

**When It Appears:**
1. **Next app open** after user scanned wine 3+ days ago
2. **Weekly digest** (optional push notification)
3. **Wine detail page** (manual feedback anytime)

**UI:**
```
┌─────────────────────────┐
│  Did you try this?      │
│                         │
│  Chablis Premier Cru    │
│  You scanned this last  │
│  week (87% match)       │
│                         │
│  [👍 Loved it]          │
│  [😐 It was OK]         │
│  [👎 Not for me]        │
│                         │
│  [Skip]                 │
└─────────────────────────┘
```

**Feedback Impact on Taste Profile:**
```typescript
function updateTasteProfile(
  currentTaste: TasteVector,
  wineProfile: TasteVector,
  feedback: 'loved' | 'ok' | 'disliked',
  numFeedbacks: number
): TasteVector {
  // Learning rate decreases over time
  const learningRate = Math.max(0.1, 1.0 / (1 + numFeedbacks / 10));
  
  // Adjustment direction
  const adjustmentFactor = {
    'loved': 1.0,      // Pull toward wine
    'ok': 0.3,         // Small pull toward wine
    'disliked': -0.5   // Push away from wine
  }[feedback];
  
  const newTaste = { ...currentTaste };
  
  for (const dim of Object.keys(currentTaste)) {
    const diff = wineProfile[dim] - currentTaste[dim];
    const adjustment = learningRate * adjustmentFactor * diff;
    
    newTaste[dim] += adjustment;
    newTaste[dim] = Math.max(0, Math.min(1, newTaste[dim])); // Clamp [0,1]
  }
  
  return newTaste;
}
```

**Important:** Feedback is always optional. Users get value without it.

### 3.5 My Wines (Auto-Saved List)

**Purpose:** Memory of scanned wines, enable repurchase

**Structure:**
```
Tabs:
1. Scanned (all wines user scanned)
2. Tried (wines with feedback)
3. Loved (wines with 👍 feedback)

Each wine card shows:
- Wine name, producer
- Match score + color code
- Date scanned
- Feedback status (if given)
- CTAs: [Give Feedback] [Buy Again]
```

**UI Example:**
```
┌─────────────────────────┐
│  My Wines               │
│  [Scanned] [Tried] [♥]  │
│                         │
│  🟢 Chablis PC - 87%    │
│     Scanned 2 days ago  │
│     [👍 Mark as tried]  │
│     [🛒 Buy - $28]      │
│                         │
│  🟢 Sancerre - 92%      │
│     Scanned 1 week ago  │
│     ✓ Loved it          │
│     [🛒 Buy again]      │
│                         │
│  🟡 Rioja - 71%         │
│     Scanned 3 weeks ago │
│     😐 It was OK        │
│     [See similar wines] │
│                         │
└─────────────────────────┘
```

### 3.6 Profile & Taste DNA

**Purpose:** Show progress, make it shareable

**Components:**
1. **Personality badge** (e.g., "Fresh Classic")
2. **Taste DNA radar chart** (6 dimensions)
3. **Preference insights** (top 3 traits)
4. **Stats** (wines scanned, feedback given)
5. **Share button** (social proof)

**UI:**
```
┌─────────────────────────┐
│  Profile                │
│                         │
│  🍷 Fresh Classic       │
│  [Share your type]      │
│                         │
│  Your Taste DNA         │
│  [Radar Chart]          │
│   6 dimensions shown    │
│                         │
│  You tend to prefer:    │
│  • High acidity wines   │
│  • Minimal oak          │
│  • Light-medium body    │
│                         │
│  Based on:              │
│  23 scans, 12 ratings   │
│                         │
│  [🔄 Retake Quiz]       │
│  [⚙️ Settings]          │
│                         │
└─────────────────────────┘
```

**Shareable Component:**
```
┌─────────────────────────┐
│  I'm a FRESH CLASSIC    │
│                         │
│  I love crisp, mineral- │
│  driven wines with high │
│  acidity and no oak.    │
│                         │
│  Discover your wine     │
│  personality:           │
│  [Download Smak-DNA]    │
│                         │
│  [Instagram share icon] │
└─────────────────────────┘
```

---

## 4. Affiliate Integration

### 4.1 When & Where Affiliate Links Appear

**Post-Scan:**
```
🟢 87% MATCH

Chablis Premier Cru
Domaine Laroche

[✓ Save to My Wines]
[🛒 Where to Buy]  ← Tappable
```

**Expanded "Where to Buy":**
```
┌─────────────────────────┐
│  Available at:          │
│                         │
│  Wine.com               │
│  $28 • Ships in 2 days  │
│  [Buy Now] ←──────────  Affiliate
│                         │
│  Vivino                 │
│  $32 • Ships in 3 days  │
│  [Buy Now] ←──────────  Affiliate
│                         │
│  Total Wine             │
│  $29 • In stock nearby  │
│  [Buy Now] ←──────────  Affiliate
│                         │
└─────────────────────────┘
```

**My Wines List:**
```
🟢 Chablis Premier Cru - 87%
   [🛒 Buy - $28] ← One-tap affiliate
```

### 4.2 Affiliate Partners (By Market)

**🇺🇸 USA:**
- Wine.com (primary, 10-12% commission)
- Vivino Marketplace (8-10%)
- Total Wine (5-8%)
- Drizly/Uber (10-15%, delivery)

**🇬🇧 UK:**
- Majestic Wine
- Waitrose Cellar
- The Wine Society
- Amazon Wine (3-4%)

**🇪🇺 Europe:**
- Wine in Black (Germany)
- Uvinum (Spain/EU-wide)
- Millesima (France, fine wine)
- Tannico (Italy)

**🇦🇺 Australia:**
- Dan Murphy's
- Vinomofo

**🇸🇪 Sweden:**
- No Systembolaget affiliate (monopoly)
- Partner with EU retailers that ship to Sweden
- Or: Wine clubs/subscription services

### 4.3 Technical Implementation

**Affiliate Link Management:**
```typescript
// lib/affiliate.ts

interface AffiliatePartner {
  id: string;
  name: string;
  markets: string[];
  commission: number;
  buildLink: (wine: Wine) => string;
}

const PARTNERS: AffiliatePartner[] = [
  {
    id: 'wine_com',
    name: 'Wine.com',
    markets: ['US'],
    commission: 0.10,
    buildLink: (wine) => 
      `https://wine.com/product/${wine.id}?affid=YOUR_AFFILIATE_ID`
  },
  {
    id: 'vivino',
    name: 'Vivino',
    markets: ['GLOBAL'],
    commission: 0.08,
    buildLink: (wine) =>
      `https://vivino.com/wines/${wine.vivinoId}?ref=YOUR_AFFILIATE_ID`
  }
  // ... more partners
];

export function getAffiliateLinks(
  wine: Wine,
  userCountry: string
): AffiliateLink[] {
  return PARTNERS
    .filter(p => 
      p.markets.includes(userCountry) || 
      p.markets.includes('GLOBAL')
    )
    .map(partner => ({
      retailer: partner.name,
      url: partner.buildLink(wine),
      price: null, // Fetch real-time if API available
      shipping: null
    }));
}
```

**Click Tracking:**
```typescript
// app/api/affiliate/click/route.ts

export async function POST(req: Request) {
  const { wineId, retailer, userId } = await req.json();
  
  // Log the click
  await prisma.affiliateClick.create({
    data: {
      wineId,
      retailer,
      userId,
      clickedAt: new Date()
    }
  });
  
  // Return redirect URL
  const link = buildAffiliateLink(wineId, retailer);
  return NextResponse.json({ url: link });
}
```

**Conversion Tracking (Postback):**
```typescript
// app/api/affiliate/conversion/route.ts

export async function POST(req: Request) {
  // Partner sends this when user completes purchase
  const { orderId, amount, wineId, retailer } = await req.json();
  
  await prisma.affiliateConversion.create({
    data: {
      orderId,
      amount,
      commission: amount * COMMISSION_RATES[retailer],
      wineId,
      retailer,
      convertedAt: new Date()
    }
  });
  
  return NextResponse.json({ success: true });
}
```

### 4.4 Monetization Strategy

**Free Tier (Forever Free):**
```
✅ Unlimited scans
✅ Match scores & color codes
✅ Explanations (why it matches)
✅ Save wines to My Wines
✅ Basic feedback (👍😐👎)
✅ Affiliate links (we earn when you buy)

Revenue: Affiliate commission only
```

**Premium Tier ($4.99/month) (Future):**
```
Everything in Free, plus:

✅ Advanced insights
   - "You prefer cool-climate whites"
   - "Your taste is evolving toward..."
   
✅ Curated monthly wine list
   - "10 wines you'll love this month"
   - Based on seasonal availability
   
✅ Food pairing suggestions
   - "This wine pairs with..."
   
✅ Taste Twins
   - Find users with similar taste
   - See what they're drinking
   
✅ Exclusive deals
   - App-only discounts from partners
   
✅ Early access to new features

Revenue: $4.99/month + affiliate commission
```

**Revenue Projection:**
```
Assumptions:
- 10,000 active users
- 5 scans/user/month = 50,000 scans
- 10% click affiliate link = 5,000 clicks
- 20% purchase = 1,000 purchases
- $25 average order value
- 10% average commission

Monthly Revenue:
Affiliate: 1,000 × $25 × 0.10 = $2,500

Add Premium (5% conversion):
500 users × $4.99 = $2,495

Total: ~$5,000/month

At 100K users: ~$50K/month ($600K ARR)
At 1M users: ~$500K/month ($6M ARR)
```

---

## 5. Technical Architecture

### 5.1 Tech Stack

**Frontend (Mobile-first):**
```
Option A: React Native (iOS + Android)
- Expo for rapid development
- React Navigation
- React Native Camera
- Supports barcode scanning natively

Option B: Next.js PWA (Web-first, then native)
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Progressive Web App
- Wrap in Capacitor for native features later

RECOMMENDATION: Start with React Native (better camera UX)
```

**Backend:**
```
Next.js API Routes (serverless)
- TypeScript
- Deployed on Vercel
- PostgreSQL database (Vercel Postgres or Supabase)
- Prisma ORM
```

**External Services:**
```
- OCR: Google Vision API or Tesseract.js
- Image Recognition: Vivino API (if available) or custom
- AI Taste Profiles: Claude API (one-time generation)
- Analytics: Vercel Analytics + Mixpanel
- Push Notifications: OneSignal or Firebase
```

**Authentication:**
```
- NextAuth.js (email/password)
- No social login for MVP
- JWT tokens for API auth
```

### 5.2 Database Schema

```prisma
// prisma/schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// ============================================
// USER
// ============================================

model User {
  id                    String         @id @default(cuid())
  email                 String         @unique
  passwordHash          String
  createdAt             DateTime       @default(now())
  updatedAt             DateTime       @updatedAt
  
  // Localization
  language              String         @default("en")
  country               String?
  
  // Taste profile
  tasteProfile          Json           // TasteVector (6 dimensions)
  personality           String         // "fresh_classic"
  personalityLabel      Json           // Localized names
  
  // Onboarding
  onboardingCompleted   Boolean        @default(false)
  onboardingAnswers     Json?
  
  // Premium
  isPremium             Boolean        @default(false)
  premiumSince          DateTime?
  
  // Relations
  scans                 Scan[]
  feedback              Feedback[]
  
  @@index([email])
  @@index([country, language])
}

// ============================================
// WINE
// ============================================

model Wine {
  id                    String         @id @default(cuid())
  name                  String
  producer              String
  region                String
  country               String
  vintage               Int?
  type                  WineType
  
  // Taste profile
  tasteProfile          Json           // TasteVector
  
  // Descriptions
  description           String?
  grapeVarieties        String[]
  
  // External IDs
  vivinoId              String?        @unique
  wineSearcherId        String?
  barcode               String?
  
  // Images
  labelImageUrl         String?
  bottleImageUrl        String?
  
  // Metadata
  aiGenerated           Boolean        @default(false)
  userContributed       Boolean        @default(false)
  createdAt             DateTime       @default(now())
  updatedAt             DateTime       @updatedAt
  
  // Relations
  scans                 Scan[]
  affiliateLinks        AffiliateLink[]
  
  @@index([name, producer])
  @@index([country, type])
  @@index([vivinoId])
}

enum WineType {
  RED
  WHITE
  ROSE
  SPARKLING
  ORANGE
  DESSERT
}

// ============================================
// SCAN
// ============================================

model Scan {
  id                    String         @id @default(cuid())
  userId                String
  wineId                String
  scannedAt             DateTime       @default(now())
  
  // Match data
  matchScore            Float
  colorCode             String         // "green", "yellow", "red"
  explanation           String[]       // Array of reasons
  
  // Feedback status
  feedbackGiven         Boolean        @default(false)
  
  // Context
  location              Json?          // lat/lng if shared
  
  // Relations
  user                  User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  wine                  Wine           @relation(fields: [wineId], references: [id])
  feedback              Feedback?
  
  @@index([userId, scannedAt])
  @@index([wineId])
}

// ============================================
// FEEDBACK
// ============================================

model Feedback {
  id                    String         @id @default(cuid())
  scanId                String         @unique
  userId                String
  createdAt             DateTime       @default(now())
  
  // Feedback
  rating                FeedbackRating
  notes                 String?
  
  // Relations
  scan                  Scan           @relation(fields: [scanId], references: [id], onDelete: Cascade)
  user                  User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId, createdAt])
}

enum FeedbackRating {
  LOVED      // 👍
  OK         // 😐
  DISLIKED   // 👎
}

// ============================================
// AFFILIATE
// ============================================

model AffiliateLink {
  id                    String         @id @default(cuid())
  wineId                String
  retailer              String
  url                   String
  market                String         // "US", "UK", etc.
  
  wine                  Wine           @relation(fields: [wineId], references: [id])
  
  @@index([wineId, market])
}

model AffiliateClick {
  id                    String         @id @default(cuid())
  userId                String
  wineId                String
  retailer              String
  clickedAt             DateTime       @default(now())
  
  @@index([userId])
  @@index([clickedAt])
}

model AffiliateConversion {
  id                    String         @id @default(cuid())
  orderId               String         @unique
  userId                String?
  wineId                String
  retailer              String
  amount                Float
  commission            Float
  convertedAt           DateTime       @default(now())
  
  @@index([retailer])
  @@index([convertedAt])
}
```

### 5.3 File Structure

```
smak-dna-app/
├── app/                          # Next.js 14 App Router (if web)
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (main)/
│   │   ├── scan/page.tsx        # Camera screen
│   │   ├── my-wines/page.tsx    # Saved wines
│   │   └── profile/page.tsx     # User profile
│   ├── onboarding/
│   │   ├── quiz/page.tsx
│   │   └── reveal/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── scan/route.ts
│   │   ├── wines/[id]/route.ts
│   │   ├── feedback/route.ts
│   │   └── affiliate/
│   │       ├── click/route.ts
│   │       └── conversion/route.ts
│   └── page.tsx                 # Landing
│
├── src/                         # React Native (if native)
│   ├── screens/
│   │   ├── LandingScreen.tsx
│   │   ├── OnboardingQuizScreen.tsx
│   │   ├── PersonalityRevealScreen.tsx
│   │   ├── ScanScreen.tsx
│   │   ├── WineDetailScreen.tsx
│   │   ├── MyWinesScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── components/
│   │   ├── WineCard.tsx
│   │   ├── MatchScoreBadge.tsx
│   │   ├── ColorCodeIndicator.tsx
│   │   ├── TasteRadarChart.tsx
│   │   └── PersonalityBadge.tsx
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   └── services/
│       ├── api.ts
│       ├── camera.ts
│       └── ocr.ts
│
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── recommendation/
│   │   ├── matching.ts
│   │   ├── personality.ts
│   │   └── taste-vector.ts
│   ├── ocr/
│   │   └── wine-recognition.ts
│   ├── affiliate/
│   │   ├── partners.ts
│   │   └── tracking.ts
│   └── ai/
│       └── taste-profile-generator.ts
│
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
│
├── types/
│   ├── wine.ts
│   ├── user.ts
│   └── affiliate.ts
│
├── scripts/
│   ├── generate-taste-profiles.ts
│   └── import-vivino-data.ts
│
└── public/
    └── images/
        └── personalities/
```

---

## 6. Development Roadmap

### Phase 1: Foundation (Week 1-2)

**Goal:** Project setup, basic infrastructure

**Tasks:**
- [ ] Initialize React Native (Expo) or Next.js project
- [ ] Set up TypeScript, ESLint, Prettier
- [ ] Configure database (PostgreSQL + Prisma)
- [ ] Implement authentication (NextAuth.js)
- [ ] Create landing page
- [ ] Set up Vercel deployment

**Deliverables:**
- Working auth flow (signup/login)
- Database connected
- Dev environment ready

### Phase 2: Onboarding (Week 3)

**Goal:** Personality quiz and initial taste profile

**Tasks:**
- [ ] Design personality quiz (5 questions)
- [ ] Build quiz UI (mobile-optimized)
- [ ] Implement personality calculation algorithm
- [ ] Create reveal screen with animation
- [ ] Store initial taste profile in database
- [ ] Design 8 personality types with descriptions

**Deliverables:**
- Working onboarding flow
- Users get personality + initial taste profile

### Phase 3: Wine Database (Week 4)

**Goal:** Populate database with wines + taste profiles

**Tasks:**
- [ ] Research Vivino API access (or scraping strategy)
- [ ] Create wine import script
- [ ] AI-generate taste profiles for 100K wines
- [ ] Validate taste profiles (sample check)
- [ ] Set up wine search/lookup endpoint
- [ ] Create OCR text extraction pipeline

**Deliverables:**
- 100K wines in database with taste profiles
- Working wine lookup by name/producer

### Phase 4: Scanning & Matching (Week 5-6)

**Goal:** Core feature - scan wine, see match

**Tasks:**
- [ ] Implement camera screen (React Native Camera)
- [ ] Build OCR wine recognition
- [ ] Create match algorithm (weighted Euclidean)
- [ ] Generate match explanations
- [ ] Design match result screen (color codes)
- [ ] Auto-save scanned wines
- [ ] Handle edge cases (wine not found, multiple matches)

**Deliverables:**
- Working scan → match flow
- Color-coded results (🟢🟡🔴)
- Explanations shown

### Phase 5: My Wines & Feedback (Week 7)

**Goal:** Wine list and feedback loop

**Tasks:**
- [ ] Build "My Wines" screen (tabs: Scanned/Tried/Loved)
- [ ] Implement feedback UI (👍😐👎)
- [ ] Create taste profile update algorithm
- [ ] Add async feedback prompts (next app open)
- [ ] Wine detail view (from My Wines list)
- [ ] Feedback stats in profile

**Deliverables:**
- Complete feedback loop
- Taste profile improves with use

### Phase 6: Affiliate Integration (Week 8)

**Goal:** Monetization via affiliate links

**Tasks:**
- [ ] Set up affiliate partnerships (Wine.com, Vivino, etc.)
- [ ] Implement affiliate link generation
- [ ] Add "Where to Buy" UI post-scan
- [ ] Create click tracking
- [ ] Set up conversion postback endpoint
- [ ] Build affiliate analytics dashboard

**Deliverables:**
- Working affiliate links
- Tracking clicks and conversions

### Phase 7: Profile & Polish (Week 9-10)

**Goal:** User profile, final UX polish

**Tasks:**
- [ ] Build profile page (personality, taste radar)
- [ ] Implement taste radar chart
- [ ] Generate preference insights
- [ ] Add stats (scans, feedback count)
- [ ] Create shareable personality card (social)
- [ ] Polish animations and transitions
- [ ] Add loading states everywhere
- [ ] Implement error handling
- [ ] Mobile responsiveness testing

**Deliverables:**
- Complete profile page
- App feels polished and professional

### Phase 8: Beta Launch (Week 11-12)

**Goal:** Soft launch with real users

**Tasks:**
- [ ] Deploy to App Store (TestFlight) + Google Play (beta)
- [ ] Recruit 50-100 beta users
- [ ] Gather feedback via surveys
- [ ] Monitor analytics (scans, conversions, retention)
- [ ] Fix critical bugs
- [ ] Iterate based on feedback

**Deliverables:**
- Beta app in users' hands
- Validated product-market fit
- Data on key metrics

---

## 7. Success Metrics

### Product-Market Fit Indicators

**Week 1-4 (Beta):**
- Onboarding completion: >80%
- Users scan at least 1 wine: >70%
- Return next day: >40%
- Give feedback on at least 1 wine: >30%

**Month 1-3 (Early Launch):**
- DAU/MAU ratio: >25% (engaged user base)
- Average scans per user per month: >5
- Affiliate click-through rate: >10%
- Affiliate conversion rate: >15%
- Retention (Day 7): >40%
- Retention (Day 30): >25%

**Month 4-6 (Growth):**
- Viral coefficient: >0.3 (30% of users invite 1+ friend)
- Premium conversion: >5%
- Affiliate revenue per user: >$2/month
- NPS score: >50

### Key Analytics Events

**Track in Mixpanel/Amplitude:**
```
User Events:
- user_signed_up
- onboarding_started
- onboarding_completed
- personality_revealed

Scan Events:
- camera_opened
- photo_taken
- wine_recognized
- wine_not_found
- match_score_shown
- wine_saved

Feedback Events:
- feedback_prompt_shown
- feedback_given (loved/ok/disliked)

Affiliate Events:
- where_to_buy_clicked
- affiliate_link_clicked
- purchase_completed (via postback)

Social Events:
- personality_shared
- app_shared
```

---

## 8. Design System

### 8.1 Color Palette

**Brand Colors:**
```
Primary (Wine Accent): #6B2737
Secondary (Gold): #C9A961
Background: #FAF9F7 (Off-white)
Surface: #FFFFFF

Text:
- Primary: #2D2D2D (Charcoal)
- Secondary: #787878 (Mid Grey)
- Tertiary: #B0B0B0 (Light Grey)

Match Score Colors:
- Green: #5A9367 (Safe choice)
- Yellow: #E8B44C (Moderate risk)
- Red: #C75450 (Avoid)

Feedback:
- Loved: #5A9367
- OK: #E8B44C
- Disliked: #C75450
```

### 8.2 Typography

**Font Family:**
- Primary: Inter or System UI
- Display: Cabinet Grotesk (for headings)

**Scale:**
```
H1: 32px / Bold (Personality reveal)
H2: 24px / SemiBold (Section headers)
H3: 20px / SemiBold (Wine names)
Body Large: 18px / Regular (Explanations)
Body: 16px / Regular (Default)
Body Small: 14px / Regular (Metadata)
Caption: 12px / Medium (Labels)
```

### 8.3 Key Components

**Match Score Badge:**
```
┌──────────────┐
│  🟢 87%      │  Large, prominent
│  MATCH       │  Green background
└──────────────┘
```

**Wine Card (My Wines):**
```
┌─────────────────────────┐
│  🟢 87%                  │
│                         │
│  Chablis Premier Cru    │
│  Domaine Laroche        │
│                         │
│  Scanned 2 days ago     │
│                         │
│  [Give Feedback]        │
│  [🛒 Buy Now - $28]     │
└─────────────────────────┘
```

**Feedback Buttons:**
```
[👍 Loved it]    - Green background
[😐 It was OK]   - Yellow background
[👎 Not for me]  - Red background
```

**Taste Radar Chart:**
```
      Acidity
         △
        /│\
       / │ \
Tannin ─ + ─ Fruit
       \ │ /
        \│/
         ▽
     Sweetness
```

---

## 9. Localization (i18n)

### Supported Languages (MVP)

1. **English** (en) - Default, global
2. **Swedish** (sv) - Home market
3. **French** (fr) - Wine country
4. **Spanish** (es) - Growing market

### Translation Structure

```typescript
// lib/i18n/translations.ts

export const translations = {
  en: {
    onboarding: {
      welcome: "Never buy the wrong wine again",
      cta: "Discover Your Wine Personality"
    },
    quiz: {
      q1: "Which sounds better?",
      q1_a: "Fresh & Crisp",
      q1_b: "Rich & Smooth"
    },
    personalities: {
      fresh_classic: {
        name: "Fresh Classic",
        description: "You love crisp, mineral-driven wines"
      }
    },
    match: {
      perfect: "This wine is perfect for you",
      moderate: "This could work, but moderate risk",
      avoid: "Not recommended for your taste"
    }
  },
  
  sv: {
    onboarding: {
      welcome: "Köp aldrig fel vin igen",
      cta: "Upptäck Din Vinpersonlighet"
    },
    // ... Swedish translations
  },
  
  fr: {
    // ... French translations
  },
  
  es: {
    // ... Spanish translations
  }
}
```

---

## 10. Go-to-Market Strategy

### Phase 1: Soft Launch (Month 1-2)
**Market:** Stockholm, Sweden
**Target:** 1,000 active users
**Channels:**
- Instagram ads (wine enthusiasts)
- Influencer partnerships (local sommeliers)
- Wine bars/restaurants (QR codes)
**Goal:** Validate core product, gather feedback

### Phase 2: Nordic Expansion (Month 3-4)
**Markets:** Copenhagen, Oslo, Helsinki
**Target:** 5,000 active users
**Channels:**
- Same playbook as Stockholm
- Cross-market referrals
**Goal:** Test localization, scale infrastructure

### Phase 3: European Launch (Month 5-6)
**Markets:** London, Berlin, Paris
**Target:** 20,000 active users
**Channels:**
- Press (TechCrunch, Product Hunt)
- Wine influencers (Instagram, TikTok)
- Partnerships (wine shops, clubs)
**Goal:** Achieve viral growth, European footprint

### Phase 4: US Launch (Month 7-8)
**Markets:** California, New York
**Target:** 100,000 active users
**Channels:**
- Product Hunt launch
- Wine TikTok (huge community)
- Wine bars (LA, SF, NYC)
- Affiliate partner co-marketing
**Goal:** US as primary market, scale revenue

---

## 11. Open Questions & Decisions Needed

### Before Starting Development

1. **Native app or PWA?**
   - Recommendation: React Native (better camera UX)
   - Can always add PWA later

2. **Vivino API access?**
   - Research if we can access their data
   - Legal implications
   - Alternative: scraping + AI generation

3. **Initial wine database size?**
   - 100K wines sufficient for MVP?
   - Focus on which countries first?

4. **OCR vs Image Recognition?**
   - Start with OCR (cheaper, works well)
   - Add ML image recognition later

5. **Freemium timing?**
   - Launch free-only initially
   - Add Premium tier after 10K users

### Post-MVP Features (Not Building Now)

- ❌ Social features (follow users, share wines)
- ❌ Food pairing recommendations
- ❌ Retailer stock checking
- ❌ Wine clubs/subscriptions
- ❌ Advanced analytics (taste evolution over time)
- ❌ AR label scanning
- ❌ Voice search
- ❌ Barcode scanning (maybe add if easy)

---

## 12. Critical Success Factors

**This MVP succeeds if:**

1. ✅ Users trust the match scores (>70% accuracy perceived)
2. ✅ Scanning is fast and reliable (>80% recognition rate)
3. ✅ Affiliate conversions happen (>10% CTR, >15% conversion)
4. ✅ Users return to scan more wines (>40% Day 7 retention)
5. ✅ Word-of-mouth growth (viral coefficient >0.3)

**Red flags to watch:**

1. 🚩 Low onboarding completion (<60%)
2. 🚩 Users don't scan wines (<50% scan at least once)
3. 🚩 Match scores feel random (user feedback)
4. 🚩 No affiliate clicks (<5% CTR)
5. 🚩 No retention (Day 7 <20%)

---

## 13. Next Steps to Begin

### Immediate Actions (Before Coding)

1. **Set up development environment**
   - Install Node.js, React Native CLI or Next.js
   - Set up PostgreSQL (local or Vercel Postgres)
   - Create GitHub repository

2. **Research Vivino data access**
   - Can we use their API?
   - Legal to scrape?
   - Alternative wine databases?

3. **Design personality quiz**
   - Finalize 5 questions
   - Map answers to taste dimensions
   - Test with 10 people

4. **Generate initial wine dataset**
   - Scrape or source 1000 test wines
   - AI-generate taste profiles
   - Validate quality

5. **Set up affiliate partnerships**
   - Apply to Wine.com affiliate program
   - Apply to Vivino affiliate program
   - Research commission rates

### Week 1 Sprint

**Goal:** Running app with auth and onboarding

**Tasks:**
1. Initialize React Native (Expo) project
2. Set up Prisma + PostgreSQL
3. Implement auth (email/password)
4. Create landing page
5. Build personality quiz
6. Deploy to TestFlight/Play Store (internal testing)

---

## 14. Final Checklist Before Building

**Product Clarity:**
- [x] Core value prop defined ("personal match, not crowd rating")
- [x] Target user identified (wine enthusiasts, 25-45, overwhelmed by choice)
- [x] MVP scope locked (no feature creep)

**Technical Decisions:**
- [ ] React Native or Next.js PWA? (Decide now)
- [ ] Wine database strategy (Vivino API, scraping, or hybrid)
- [ ] OCR provider (Google Vision, Tesseract, or custom)
- [ ] Hosting (Vercel, AWS, or Railway)

**Business Model:**
- [x] Affiliate-first monetization
- [x] Premium tier roadmap (post-MVP)
- [ ] Affiliate partnerships identified and contacted

**Design:**
- [x] Color palette defined
- [x] Key screens wireframed
- [ ] Design system components built

**Go-to-Market:**
- [x] Launch strategy (Stockholm → Nordics → Europe → US)
- [ ] Beta user recruitment plan
- [ ] Marketing channels identified

---

## 15. Success Mantra

**Remember:**
- **Instant value** (scan → match, no barriers)
- **Trust over engagement** (accurate matches > addictive UX)
- **Global from day 1** (not Sweden-specific)
- **Affiliate-aligned** (we win when users buy good wines)
- **Taste-first, not social** (personal relevance over popularity)

**The North Star:**
"Users buy wines they love, not wines everyone else loves."

---

## 🚀 Ready to Build

This prompt contains everything needed to start building Smak-DNA:

✅ Clear product vision  
✅ Complete feature specifications  
✅ Technical architecture  
✅ Database schema  
✅ Algorithm implementations  
✅ Affiliate strategy  
✅ Go-to-market plan  
✅ Success metrics  

**Next step:** Choose your tech stack (React Native vs Next.js), then start with Phase 1 (Foundation).

Good luck! 🍷✨
