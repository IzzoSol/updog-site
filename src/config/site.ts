/**
 * UPDOG — single source of truth for all site configuration.
 *
 * Edit this file to update CTAs, links, contract fields, legal copy,
 * section labels, and every piece of playful content on the page.
 *
 * Safety rules:
 * - Never invent real URLs, contract addresses, or claims here.
 * - Leave placeholders as `""` / `"COMING SOON"` / `false` until launch.
 * - Never add price, liquidity, APY, or performance claims.
 */
export const siteConfig = {
  siteName: "UPDOG",
  tokenSymbol: "$UPDOG",
  tagline: "The meme that refuses to come down.",
  xUrl: "https://x.com/upDogRH",
  xHandle: "@upDogRH",
  email: "Updoghood@proton.me",
  /** handle only (no @) — used to append "via @upDogRH" on X post intents */
  xIntentVia: "upDogRH",
  telegramUrl: "", // placeholder
  contractAddress: "COMING SOON",
  chainName: "Robinhood Chain", // placeholder only
  buyUrl: "", // placeholder
  isLaunchLive: false,
  legalDisclaimer:
    "$UPDOG is a meme coin. Nothing on this site is financial advice. Crypto assets are volatile and may lose value.",
};

export type SiteConfig = typeof siteConfig;

/** All on-page copy. Edit here, never in components. */
export const content = {
  statusBadge: "THE INTERNET'S FAVORITE ALTITUDE",

  /** Real image assets (public/assets/…). Swap these paths as new art lands. */
  assets: {
    banner: "/assets/brand/updog-banner.png",
    wordmark: "/assets/brand/updog-wordmark.png",
    headerClouds: "/assets/gen/header-clouds.png",
    heroSky: "/assets/gen/hero-sky.png",
    shareClouds: "/assets/gen/share-clouds.png",
    stageWake: "/assets/gen/stage-wake.png",
    stageGear: "/assets/gen/stage-gear.png",
    stageGo: "/assets/gen/stage-go.png",
    stageStay: "/assets/gen/stage-stay.png",
    whyDirection: "/assets/gen/why-direction.png",
    whyPack: "/assets/gen/why-pack.png",
    whyAltitude: "/assets/gen/why-altitude.png",
    dogSky: "/assets/gallery/dog-moneybag-sky.png",
    dogPortrait: "/assets/gallery/dog-moneybag-portrait.png",
    comet: "/assets/gallery/arrow-comet-earth.png",
    // The token "ticker" avatar: close-up dog nose with the brand arrow.
    ticker: "/assets/brand/updog-ticker.jpg",
    dogAlt: "UPDOG — a golden retriever soaring over the clouds with a money bag and a green arrow",
    tickerAlt: "UPDOG token avatar — extreme close-up of a golden retriever's nose with the green UPDOG arrow",
  },

  hero: {
    titleA: "WHAT'S",
    titleB: "UPDOG?",
    reveal: "Not much. What's up with you?",
    support: "The meme that refuses to come down.",
    primaryCta: "JOIN THE PACK",
    secondaryCta: "FOLLOW ON X",
    scrollCue: "SCROLL TO CLIMB",
  },

  punchline: {
    heading: "GO ON. ASK THE DOG.",
    sub: "Tap the cloud. Or the dog. Both are good ideas.",
    reveal: "NOT MUCH. WHAT'S UP WITH YOU?",
    askLabel: "Ask the dog what's up",
    memeLines: [
      "Altitude check: still vibing.",
      "The dog has cleared cloud control.",
      "Tailwind detected.",
      "Please keep paws inside the atmosphere.",
      "Updog season is officially open.",
      "No leash. No limits. Just altitude.",
    ],
  },

  why: {
    label: "WHY UPDOG",
    heading: "Three reasons to look up.",
    sub: "No charts. No promises. Just a dog, a green arrow, and a pack that only moves one way.",
    cards: [
      {
        tag: "DIRECTION",
        title: "UP-ONLY VIBES",
        body: "No dip talk. No “down bad.” The dog knows exactly one direction — and it isn’t down.",
      },
      {
        tag: "OWNERSHIP",
        title: "THE PACK RUNS IT",
        body: "No CEO, no leash. The pack points, the clouds move. That’s the whole org chart.",
      },
      {
        tag: "ALTITUDE",
        title: "STARTED ABOVE THE MOON",
        body: "Everyone else is still aiming for the moon. Updog woke up one cloud higher.",
      },
    ],
  },

  dashboard: {
    label: "ALTITUDE CONTROL",
    heading: "UPDOG FLIGHT STATUS",
    sub: "A completely non-financial vibe report. No charts. No promises.",
    marquee: ["BARK BULLISH", "ALTITUDE VERIFIED", "NO LEASH", "CLOUD CERTIFIED", "UP ONLY"],
    rows: [
      { label: "CURRENT MOOD", value: "UP" },
      { label: "CLOUD COVER", value: "0% FUD" },
      { label: "TAILWIND", value: "FAVORABLE" },
      { label: "PACK ENERGY", value: "HIGH" },
      { label: "ALTITUDE", value: "∞" },
    ],
    footnote: "MARKET DATA: NONE. THIS IS A VIBE REPORT.",
    headerTitle: "DEPARTURES",
    headerState: "ALL CLEAR",
  },

  token: {
    label: "THE COIN",
    heading: "MEET $UPDOG",
    sub: "One dog. One arrow. Infinite altitude.",
    contractLabel: "CONTRACT",
    chainLabel: "CHAIN",
    copyLabel: "Copy contract address",
    copiedLabel: "COPIED!",
    launchPending: "LAUNCH PENDING",
    launchPendingNote: "Contract address coming soon. Links pending launch.",
    liveCta: "GO UP",
    nonAffiliation: "Not affiliated with Robinhood or any third party.",
  },

  roadmap: {
    label: "FLIGHT PLAN",
    heading: "ROUTE: GROUND → ∞",
    sub: "No promises about price. Promises about altitude.",
    stages: [
      { code: "WU", title: "WAKE UP", body: "Open the sky. Turn on the sunshine." },
      { code: "GU", title: "GEAR UP", body: "Harness the pack. Find the tailwind." },
      { code: "GOU", title: "GO UP", body: "Departure confirmed. Clouds ahead." },
      { code: "SU", title: "STAY UP", body: "Float forever. That's the whole plan." },
    ],
  },

  gallery: {
    label: "THE PACK",
    heading: "THE PACK IS ASCENDING.",
    sub: "Shots from the flight deck. Grab one, post one — the pack fills in the rest.",
    ctaNote: "Made one? Send it up.",
    // `src` "" → renders a code-drawn placeholder (see PlaceholderArt).
    // `span` "wide" → the tile spans 2 columns. Drop new images into
    // public/assets/gallery and point `src` at "/assets/gallery/<file>".
    cards: [
      {
        kind: "photo",
        span: "wide",
        title: "MONEYBAG MUTT",
        src: "/assets/gallery/dog-moneybag-sky.png",
        alt: "UPDOG golden retriever soaring over the clouds with a money bag and a green arrow",
      },
      {
        kind: "photo",
        span: "wide",
        title: "ESCAPE VELOCITY",
        src: "/assets/gallery/arrow-comet-earth.png",
        alt: "The green UPDOG arrow streaking around Earth as a comet with a trail of coins",
      },
      {
        kind: "photo",
        span: "std",
        title: "DOG CLOSE-UP",
        src: "/assets/brand/updog-ticker.jpg",
        alt: "Extreme close-up of the UPDOG dog's nose with the green brand arrow",
      },
    ],
    screenshot: {
      asked: "I ASKED WHAT'S UPDOG.",
      answer: "THE DOG SAID: NOT MUCH.",
    },
  },

  share: {
    label: "SIGNAL THE PACK",
    heading: "SAY SOMETHING UP.",
    sub: "Follow the dog, then grab a line and post it. Shuffle for a fresh one, copy it, or send it straight to X.",
    followCta: "FOLLOW @UPDOGRH",
    handleNote: "The official pack HQ. This is the only account.",
    shuffleLabel: "Shuffle",
    copyLabel: "Copy this post",
    copiedLabel: "COPIED — now paste it anywhere",
    postCta: "POST ON X",
    hashtag: "#UPDOG",
    // Copy-paste ready. No price/liquidity/APY/performance claims — vibes only.
    posts: [
      "What's updog? 🐕 Not much — just going straight up. @upDogRH ⬆️",
      "I asked what's updog. The dog said: not much. Then it flew away. 🐕‍🦺☁️ @upDogRH",
      "No leash. No ceiling. Just updog. ⬆️🐾 @upDogRH",
      "Keep your paws inside the atmosphere. Altitude only. 🐾☁️ @upDogRH",
      "Ground floor? Never met her. We started above the clouds. ☁️⬆️ @upDogRH",
      "The whole pack is looking up. 🐕⬆️ Join us. @upDogRH",
      "Tailwind detected. The dog is boarding. 🛫🐶 @upDogRH",
      "Cloud control has cleared updog for takeoff. ☁️🐕 @upDogRH",
      "You're early. The dog is up. 🐾⬆️ @upDogRH",
      "Bark bullish. 🐶 (vibes, not financial advice) @upDogRH",
      "Updog season is officially open. Look up. 👆☁️ @upDogRH",
      "What goes up? Dog. 🐶⬆️ Simple as. @upDogRH",
      "Every sky needs a dog in it. This is ours. 🐕‍🦺☁️ @upDogRH",
      "The meme that refuses to come down. ⬆️ @upDogRH",
      "Told the dog to sit. It ascended instead. 🐕⬆️ @upDogRH",
      "Some look down. The pack looks up. 🐾⬆️ @upDogRH",
    ],
  },

  boardingPass: {
    label: "BOARDING PASS",
    heading: "PRINT YOUR TICKET.",
    sub: "Add your name, get your own UPDOG Airlines boarding pass, and post it. Everyone in the pack flies.",
    nameLabel: "PASSENGER NAME",
    namePlaceholder: "YOUR NAME",
    handleLabel: "@ HANDLE",
    handlePlaceholder: "@yourhandle",
    classLabel: "CLASS",
    classes: ["ECONOMY", "BUSINESS", "FIRST", "PACK LEADER"],
    downloadCta: "DOWNLOAD TICKET",
    shareCta: "POST ON X",
    shareHint: "Your ticket image downloads — attach it to your post for max altitude.",
    shareText: "I just boarded UPDOG-1. Destination: ∞. Wheels up. 🐕⬆️ @upDogRH #UPDOG",
    airline: "UPDOG AIRLINES",
    flight: "UPDOG-1",
    from: "GROUND",
    fromCode: "GRD",
    to: "ALTITUDE",
    toCode: "∞",
    boarding: "ANY TIME",
    gate: "CLOUD 9",
    footnote: "This pass is a vibe, not a security. Not financial advice. Destination not guaranteed, altitude is.",
  },

  finalCta: {
    heading: "THE DOG IS UP.",
    sub: "You asked what's updog. Now you're early.",
    primaryCta: "JOIN THE PACK",
    secondaryCta: "FOLLOW ON X",
    pass: {
      airline: "UPDOG AIRLINES",
      flight: "FLIGHT UPDOG-1",
      from: "GROUND",
      to: "∞",
      seat: "4C",
      boarding: "ANY TIME",
      gate: "CLOUD 9",
    },
  },

  footer: {
    navTitle: "FLY WITH US",
    xLabel: "X (TWITTER)",
    telegramLabel: "TELEGRAM",
    pendingLabel: "PENDING LAUNCH",
    contractLabel: "CONTRACT",
    contract: "COMING SOON",
    notAffiliated:
      "Not affiliated with, endorsed by, or approved by any person, project, or chain. Third-party names appear for reference only.",
    copyright: "© 2026 UPDOG. All the way up.",
  },
};

export type SiteContent = typeof content;
