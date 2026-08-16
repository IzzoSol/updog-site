import type { Metadata } from "next";
import type { ReactNode } from "react";
import { UpdogArrow } from "@/components/arrows/UpdogArrow";
import { CodeGate } from "@/components/ui/CodeGate";

export const metadata: Metadata = {
  title: "Dogpaper",
  description: "$UPDOG — The Dog Is Up. A community meme coin for the pack, the clouds, and the internet.",
};

/** A single decorative paw print. */
function Paw({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden="true">
      <g fill="currentColor">
        <ellipse cx="24" cy="33" rx="11" ry="9" />
        <ellipse cx="10" cy="20" rx="5" ry="6.5" />
        <ellipse cx="19" cy="13" rx="5" ry="6.5" />
        <ellipse cx="29" cy="13" rx="5" ry="6.5" />
        <ellipse cx="38" cy="20" rx="5" ry="6.5" />
      </g>
    </svg>
  );
}

function H({ tag, children }: { tag: string; children: ReactNode }) {
  return (
    <div className="mt-12 flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy">
        <UpdogArrow size={18} />
      </span>
      <div>
        <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-navy/45">{tag}</p>
      </div>
    </div>
  );
}

function Card({ children }: { children: ReactNode }) {
  return <div className="cloud-card mt-4 px-6 py-6 text-left sm:px-8 sm:py-7">{children}</div>;
}

export default function DogpaperPage() {
  return (
    <main
      className="relative min-h-screen overflow-hidden pb-24 pt-40 sm:pt-44"
      style={{ background: "linear-gradient(180deg, #159BFF 0%, #7CCBFF 22%, #DDF1FF 55%, #EAF6FF 100%)" }}
    >
      {/* scattered paw prints in the background */}
      <div className="pointer-events-none absolute inset-0 text-navy/[0.05]" aria-hidden="true">
        <Paw className="absolute left-[6%] top-[14%] rotate-12" size={70} />
        <Paw className="absolute right-[8%] top-[22%] -rotate-12" size={54} />
        <Paw className="absolute left-[12%] top-[42%] rotate-[24deg]" size={44} />
        <Paw className="absolute right-[14%] top-[52%] rotate-6" size={64} />
        <Paw className="absolute left-[20%] top-[70%] -rotate-6" size={50} />
        <Paw className="absolute right-[18%] top-[80%] rotate-[18deg]" size={58} />
        <Paw className="absolute left-[46%] top-[90%] -rotate-12" size={40} />
      </div>

      <article className="relative mx-auto max-w-3xl px-5">
        {/* title */}
        <header className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white/80 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.25em] text-navy/70">
            <UpdogArrow size={13} /> DOGPAPER
          </p>
          <h1 className="font-display mt-6 text-6xl font-extrabold tracking-tight text-white text-shadow-navy sm:text-8xl">
            $UPDOG
          </h1>
          <p className="font-display mt-2 text-3xl font-extrabold text-navy sm:text-4xl">The Dog Is Up.</p>
          <p className="mt-4 text-base font-semibold italic text-navy/70 sm:text-lg">
            A community meme coin for the pack, the clouds, and the internet.
          </p>
        </header>

        <CodeGate>
        {/* 1 */}
        <H tag="Preflight">1 · What Is $UPDOG?</H>
        <Card>
          <p className="text-navy/80">
            It starts with the oldest good joke in the sky: <strong>“What’s updog?” “Not much. What’s up with you?”</strong>
          </p>
          <p className="mt-3 text-navy/80">
            $UPDOG is a meme coin built around that grin — a project about shared culture, humor, creativity, and showing
            up as a community. The identity is simple: a happy dog, a bright sky world, and a rounded lime-green up-right
            arrow. That arrow means momentum, optimism, and internet culture. It is not a promise of anything. $UPDOG is
            not a financial product or a guarantee — it’s a joke the whole pack is in on.
          </p>
        </Card>

        {/* 2 */}
        <H tag="The Sky">2 · The World</H>
        <Card>
          <p className="text-navy/80">
            The UPDOG world is a bright, friendly sky you want to hang out in. It’s cartoon-blue, sunlit, and full of
            room to float.
          </p>
          <ul className="mt-4 space-y-2 text-navy/80">
            <li>☁️ A bright blue sky and puffy clouds</li>
            <li>🐕 The UPDOG mascot — a happy dog just enjoying the altitude</li>
            <li>⬆️ The lime-green up-right arrow</li>
            <li>🐾 The pack — everyone who gets the joke</li>
            <li>✈️ Altitude, flight, weather, and playful aviation language</li>
          </ul>
          <p className="mt-4 text-sm font-semibold text-navy/60">
            “Altitude” here is a creative community metaphor for energy and vibes — not a price or market-performance
            indicator.
          </p>
        </Card>

        {/* 3 */}
        <H tag="The Pack">3 · The Pack</H>
        <Card>
          <p className="text-navy/80">The pack runs on a few simple values:</p>
          <ul className="mt-4 space-y-2 text-navy/80">
            <li>• Humor over hype</li>
            <li>• Creation over passive spectatorship</li>
            <li>• Memes, art, reply culture, banners, stickers, and shared jokes</li>
            <li>• Community participation and recognition</li>
            <li>• A welcoming space for people who get the joke</li>
          </ul>
          <p className="mt-5 font-display text-lg font-extrabold text-navy">How to join the pack</p>
          <ul className="mt-2 space-y-2 text-navy/80">
            <li>• Follow verified official channels</li>
            <li>• Share or create UPDOG content</li>
            <li>• Join community conversations</li>
            <li>• Take part in public polls, events, and meme prompts when available</li>
            <li>• Verify contracts and links through official announcements before interacting</li>
          </ul>
        </Card>

        {/* 4 */}
        <H tag="Command Center">4 · SkyDEX</H>
        <Card>
          <p className="text-navy/80">
            <strong>SkyDEX — UPDOG’s Pack Command Center</strong> is a future community-hub concept for the pack.
          </p>
          <p className="mt-3 text-navy/80">
            The idea: one friendly place that could eventually bring together community updates, creative missions,
            polls, featured memes, DogTag profiles, and official links. To be clear about what it isn’t — SkyDEX is not
            an exchange, a DEX, a trading terminal, a swap service, a financial dashboard, or a portfolio tracker.
          </p>
          <p className="mt-3 text-navy/80">
            Where possible, public areas should stay explorable without a wallet. If any wallet-connected features are
            ever introduced, they should be transparent, optional, and clearly communicated. This is a concept the pack
            gets to shape — not a launch commitment.
          </p>
        </Card>

        {/* 5 */}
        <H tag="Identity">5 · UPDOG DogTags</H>
        <Card>
          <p className="text-navy/80">
            <strong>UPDOG DogTags — your identity in the pack.</strong> A potential collectible community-identity system,
            boarding-pass and dog-tag inspired.
          </p>
          <p className="mt-3 text-navy/80">A DogTag could one day show things like:</p>
          <ul className="mt-3 space-y-2 text-navy/80">
            <li>• A call sign, pack status, season, and sky class</li>
            <li>• Cosmetic stamps and profile customization</li>
            <li>• Community recognition, polls, and sticker or banner moments</li>
          </ul>
          <p className="mt-4 text-navy/80">
            DogTags are collectibles and community-identity tools, not investments. No mint, cost, supply, chain, access
            rules, or future benefit is guaranteed until officially announced. We’re still just exploring what — if
            anything — the pack would actually enjoy here.
          </p>
        </Card>

        {/* 6 — Flight Plan */}
        <H tag="Route: Ground → ∞">6 · Flight Plan</H>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Phase title="WAKE UP">
            <li>The dog enters the sky</li>
            <li>The first members of the pack arrive</li>
            <li>Official community channels and core visuals take shape</li>
          </Phase>
          <Phase title="GEAR UP">
            <li>Memes, profile assets, stickers, and community content</li>
            <li>Early community prompts, polls, and shared sky-world culture</li>
            <li>The pack helps shape the personality of UPDOG</li>
          </Phase>
          <Phase title="GO UP">
            <li>Community events, creative challenges, and featured pack content</li>
            <li>Exploration of SkyDEX and DogTags concepts, only when practical and clearly announced</li>
            <li>More ways for the community to participate in the UPDOG universe</li>
          </Phase>
          <Phase title="STAY UP">
            <li>Keep the culture active</li>
            <li>Celebrate community milestones</li>
            <li>Evolve the sky world with the pack</li>
            <li>Continue building only what the community actually enjoys and uses</li>
          </Phase>
        </div>
        <p className="mt-4 text-center text-sm font-semibold text-navy/60">
          This Flight Plan is a creative direction, not a schedule or promise. Plans may change as the pack grows.
        </p>

        {/* 7 */}
        <H tag="Stay Safe Up There">7 · Community Safety</H>
        <Card>
          <ul className="space-y-2 text-navy/80">
            <li>• Follow only verified official accounts and links.</li>
            <li>• Never share seed phrases or private keys.</li>
            <li>• Check wallet prompts and transaction details before signing.</li>
            <li>• Don’t trust impersonators, fake airdrops, or unofficial contract addresses.</li>
            <li>
              • If DogTags, SkyDEX, or any connected experience becomes available, use only official links and verify the
              network and contract information.
            </li>
            <li>• Participation is optional; never risk more than you can afford to lose.</li>
          </ul>
          <p className="mt-4 text-sm font-semibold text-navy/70">
            Intended chain: [TBD]. Chain details will be shared through verified official channels.
          </p>
        </Card>

        {/* 8 */}
        <H tag="Cleared For Takeoff">8 · The Dog Is Up</H>
        <Card>
          <p className="text-lg font-semibold text-navy/85">
            The dog is up. The sky is open. The pack decides what comes next.
          </p>
          <blockquote className="mt-5 border-l-4 border-green pl-4 text-sm font-semibold italic text-navy/65">
            $UPDOG is a meme coin created for community and culture. Crypto assets are volatile and can lose value.
            Nothing in this document is financial, legal, or investment advice.
          </blockquote>
        </Card>

        <div className="mt-14 flex items-center justify-center gap-3 text-navy/40">
          <Paw size={26} />
          <Paw size={34} />
          <Paw size={26} />
        </div>
        </CodeGate>
      </article>
    </main>
  );
}

function Phase({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="cloud-card px-6 py-6">
      <div className="mb-2 flex items-center gap-2">
        <UpdogArrow size={18} />
        <h3 className="font-display text-xl font-extrabold text-navy">{title}</h3>
      </div>
      <ul className="space-y-1.5 text-sm font-semibold text-navy/75 [&>li]:before:mr-1.5 [&>li]:before:text-green [&>li]:before:content-['▲']">
        {children}
      </ul>
    </div>
  );
}
