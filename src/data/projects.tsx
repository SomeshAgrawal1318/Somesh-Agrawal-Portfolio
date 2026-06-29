import AceTernityLogo from "@/components/logos/aceternity";
import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import {
  ArrowUpRight,
  Bot,
  Boxes,
  BrainCircuit,
  Camera,
  CircuitBoard,
  Cpu,
  DraftingCompass,
  FileText,
  FlaskConical,
  Gamepad2,
  Image as ImageIcon,
  Link2,
  Play,
  Presentation,
  Smartphone,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
// Spline has no thesvg entry — keep the Three.js mark as its stand-in.
import { SiThreedotjs } from "react-icons/si";
const BASE_PATH = "/assets/projects-screenshots";

// Renders a brand SVG from /public as a monochrome glyph that inherits the
// surrounding text color (the skill dock styles every icon via currentColor),
// so full-color marks like Mistral flatten to match the rest of the set.
const MaskIcon = ({ src, title }: { src: string; title?: string }) => (
  <span
    role="img"
    aria-label={title}
    className="block bg-current"
    style={{
      width: "1em",
      height: "1em",
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);

const ProjectsLinks = ({ live, repo }: { live?: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && live !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={live}
        >
          <Button variant={"default"} size={"sm"}>
            Visit Website
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {repo && repo !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

// ── Placeholders ────────────────────────────────────────────────────────────
// Somesh's data-science, robotics, hardware and CAD work doesn't ship a live
// URL, so each project shows its write-up plus labelled drop-zones for the
// screenshots, prototype photos and posters to be filled in later.
const MediaPlaceholder = ({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) => (
  <div className="flex min-h-[120px] flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/70 bg-secondary/20 px-4 py-6 text-center">
    <span className="text-muted-foreground/70 [&>svg]:h-6 [&>svg]:w-6">
      {icon}
    </span>
    <span className="text-xs font-medium text-foreground/70">{label}</span>
    <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/50">
      coming soon
    </span>
  </div>
);

const PLACEHOLDERS = {
  screens: { icon: <Camera />, label: "Screenshots" },
  prototype: { icon: <Boxes />, label: "Prototype photos" },
  poster: { icon: <Presentation />, label: "Poster" },
  demo: { icon: <ImageIcon />, label: "Demo / video" },
  link: { icon: <Link2 />, label: "Live & source" },
  cad: { icon: <DraftingCompass />, label: "CAD renders" },
  schematic: { icon: <CircuitBoard />, label: "Schematics" },
  photos: { icon: <Camera />, label: "Photos" },
} satisfies Record<string, { icon: ReactNode; label: string }>;

const ComingSoon = ({ items }: { items: (keyof typeof PLACEHOLDERS)[] }) => (
  <div className="my-5 flex flex-col gap-3 sm:flex-row">
    {items.map((k) => (
      <MediaPlaceholder key={k} {...PLACEHOLDERS[k]} />
    ))}
  </div>
);

const Tags = ({ items }: { items: string[] }) => (
  <div className="mt-3 flex flex-wrap gap-1.5">
    {items.map((t) => (
      <span
        key={t}
        className="rounded-full border border-border/60 bg-secondary/30 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
      >
        {t}
      </span>
    ))}
  </div>
);

// One entry inside a "collection" modal (Robotics / Hardware / CAD / DS & ML).
// `images` renders a real screenshot/chart carousel; `media` falls back to the
// "coming soon" placeholders when there's nothing to show yet.
const Entry = ({
  title,
  period,
  children,
  tags,
  media,
  images,
  repo,
  report,
  video,
  logo,
}: {
  title: string;
  period?: string;
  children: ReactNode;
  tags?: string[];
  media?: (keyof typeof PLACEHOLDERS)[];
  images?: string[];
  repo?: string;
  report?: string;
  video?: string;
  logo?: string;
}) => (
  <div className="mt-8 border-t border-border/60 pt-8 first:mt-0 first:border-0 first:pt-0">
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <TypographyH3 className="!text-xl">{title}</TypographyH3>
      {period && (
        <span className="font-mono text-xs text-muted-foreground">{period}</span>
      )}
    </div>
    <p className="mt-3 font-mono text-sm leading-relaxed text-muted-foreground">
      {children}
    </p>
    {tags && <Tags items={tags} />}
    {repo && (
      <div className="mt-3">
        <Link href={repo} target="_blank" rel="noopener">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            View code on GitHub
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    )}
    {report && <DocLink href={report} />}
    {video && (
      <>
        <div className="mt-3 mb-1">
          <Link href={`https://youtu.be/${video}`} target="_blank" rel="noopener">
            <Button size="sm" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Watch the video
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <YouTubeEmbed id={video} title={`${title} — video`} />
      </>
    )}
    {logo && (
      <div className="mt-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt={title}
          className="h-28 w-auto rounded-xl border border-border/60 bg-background/30 object-contain p-1.5"
        />
      </div>
    )}
    {images ? (
      <SlideShow images={images} />
    ) : media ? (
      <ComingSoon items={media} />
    ) : null}
  </div>
);

// Responsive 16:9 YouTube embed for project demo reels.
const YouTubeEmbed = ({ id, title }: { id: string; title: string }) => (
  <div
    className="my-4 overflow-hidden rounded-xl border border-border ring-1 ring-white/5"
    style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
  >
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${id}`}
      title={title}
      loading="lazy"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  </div>
);

// "Read the report (PDF)" link button — opens a generated report in /public.
const DocLink = ({
  href,
  label = "Read the report (PDF)",
}: {
  href: string;
  label?: string;
}) => (
  <div className="my-4">
    <Link href={href} target="_blank" rel="noopener">
      <Button size="sm" variant="outline" className="flex items-center gap-2">
        <FileText className="h-4 w-4" />
        {label}
        <ArrowUpRight className="h-4 w-4" />
      </Button>
    </Link>
  </div>
);

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};
// Brand chips sourced from thesvg CLI mono SVGs in /public/assets/logos,
// rendered via MaskIcon so each one inherits the dock's currentColor.
const brand = (title: string, file: string): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <MaskIcon src={`/assets/logos/${file}`} title={title} />,
});
// Compact text-mark chip for tools that aren't in the mono-SVG logo set
// (KiCad, Fusion 360, PyTorch, …) — mirrors the inline text marks below.
const text = (title: string, label: string): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <span className="text-[10px] font-bold leading-none">{label}</span>,
});
const PROJECT_SKILLS = {
  next: brand("Next.js", "nextdotjs-mono.svg"),
  chakra: brand("Chakra UI", "chakra-ui-mono.svg"),
  node: brand("Node.js", "nodedotjs-mono.svg"),
  python: brand("Python", "python-mono.svg"),
  prisma: brand("Prisma", "prisma-mono.svg"),
  postgres: brand("PostgreSQL", "postgresql-mono.svg"),
  mongo: brand("MongoDB", "mongodb-mono.svg"),
  express: brand("Express", "express-mono.svg"),
  reactQuery: brand("React Query", "react-query-mono.svg"),
  shadcn: brand("shadcn/ui", "shadcn-ui-mono.svg"),
  // Not in the thesvg registry — keep the existing custom logo.
  aceternity: {
    title: "Aceternity",
    bg: "black",
    fg: "white",
    icon: <AceTernityLogo />,
  },
  tailwind: brand("Tailwind", "tailwind-css-mono.svg"),
  docker: brand("Docker", "docker-mono.svg"),
  // Not in the thesvg registry — keep the text mark.
  yjs: {
    title: "Y.js",
    bg: "black",
    fg: "white",
    icon: (
      <span>
        <strong>Y</strong>js
      </span>
    ),
  },
  firebase: brand("Firebase", "firebase-mono.svg"),
  sockerio: brand("Socket.io", "socketdotio-mono.svg"),
  js: brand("JavaScript", "javascript-mono.svg"),
  ts: brand("TypeScript", "typescript-mono.svg"),
  vue: brand("Vue.js", "vuedotjs-mono.svg"),
  react: brand("React.js", "react-mono.svg"),
  sanity: brand("Sanity", "sanity-mono.svg"),
  // Not in the thesvg registry — keep the Three.js stand-in.
  spline: {
    title: "Spline",
    bg: "black",
    fg: "white",
    icon: <SiThreedotjs />,
  },
  gsap: brand("GSAP", "gsap-mono.svg"),
  motion: brand("Motion", "motion.svg"),
  supabase: brand("Supabase", "supabase-mono.svg"),
  trpc: brand("tRPC", "trpc-mono.svg"),
  drizzle: brand("Drizzle ORM", "drizzle-mono.svg"),
  hono: brand("Hono", "hono-mono.svg"),
  redis: brand("Redis / BullMQ", "redis-mono.svg"),
  cloudflare: brand("Cloudflare", "cloudflare-mono.svg"),
  // React Native reuses the React mark.
  reactNative: brand("React Native", "react-mono.svg"),
  betterAuth: brand("Better Auth", "better-auth-mono.svg"),
  // Not in the thesvg registry — keep the text marks.
  zustand: {
    title: "Zustand",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Zu</span>,
  },
  partykit: {
    title: "PartyKit",
    bg: "black",
    fg: "white",
    icon: <span className="text-base">🎈</span>,
  },
  hocuspocus: {
    title: "Hocuspocus",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Hp</span>,
  },
  // React Flow ships under the xyflow brand.
  reactFlow: brand("React Flow", "xyflow-mono.svg"),
  codemirror: brand("CodeMirror", "codemirror-mono.svg"),
  // "Satori / sharp" — uses the sharp mark.
  satori: brand("Satori / sharp", "sharp-mono.svg"),
  turborepo: brand("Turborepo", "turborepo-mono.svg"),
  // Vercel AI SDK uses the Vercel mark.
  aiSDK: brand("Vercel AI SDK", "vercel-mono.svg"),
  anthropic: brand("Anthropic Claude", "anthropic-mono.svg"),
  mistral: brand("Mistral AI", "mistral-ai-mono.svg"),
  // Not in the thesvg registry — keep the text mark.
  nextIntl: {
    title: "next-intl",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">i18n</span>,
  },
  // Not in the thesvg registry — keep the text marks.
  expo: {
    title: "Expo",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Expo</span>,
  },
  mcp: {
    title: "MCP",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">MCP</span>,
  },
  // — Somesh's ML / data / mobile / hardware / CAD stack (text marks: no
  //   mono-SVG logos shipped for these) —
  pytorch: text("PyTorch", "PyT"),
  tensorflow: text("TensorFlow", "TF"),
  numpy: text("NumPy", "Np"),
  pandas: text("pandas", "pd"),
  fastapi: text("FastAPI", "API"),
  flask: text("Flask", "Flk"),
  sqlite: text("SQLite", "SQL"),
  sbert: text("Sentence-BERT", "SB"),
  streamlit: text("Streamlit", "St"),
  matplotlib: text("Matplotlib", "plt"),
  ollama: text("Ollama", "Olm"),
  huggingface: text("Hugging Face", "🤗"),
  geminiApi: text("Gemini API", "Gem"),
  whisper: text("Whisper", "Wh"),
  awsIot: text("AWS IoT Core", "IoT"),
  esp32: text("ESP32", "ESP"),
  kicad: text("KiCad", "KiC"),
  autocad: text("AutoCAD", "ACAD"),
  fusion360: text("Fusion 360", "F360"),
  pdf: text("PDF Reports", "PDF"),
  pytest: text("pytest", "pyt"),
  opencv: text("OpenCV", "CV"),
  yolo: text("YOLOv5", "YOLO"),
  tkinter: text("Tkinter", "Tk"),
  java: text("Java", "Jv"),
  kotlin: text("Kotlin", "Kt"),
  android: text("Android", "And"),
  firestore: text("Cloud Firestore", "FS"),
  retrofit: text("Retrofit", "Rf"),
  tmdb: text("TMDB API", "TMDB"),
  websockets: text("WebSockets", "WS"),
  vitest: text("Vitest", "Vi"),
};
export type Project = {
  id: string;
  category: string;
  title: string;
  // Screenshot for the card preview. Omit for projects without a shipped UI —
  // the card renders a branded poster (accent + icon) instead.
  src?: string;
  screenshots?: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live?: string;
  // Poster styling for cards without a screenshot, and for collection cards.
  accent?: string;
  icon?: ReactNode;
  // "collection" cards group several smaller projects behind one tile that
  // opens a modal listing them (with placeholders for screenshots/posters).
  kind?: "project" | "collection";
  count?: number;
};
const projects: Project[] = [
  // ───────────────────────── Featured projects ─────────────────────────
  {
    id: "flickmatch",
    category: "Mobile · Real-time",
    title: "FlickMatch",
    src: `${BASE_PATH}/flickmatch/cover.jpg`,
    accent: "#f43f5e",
    icon: <Smartphone />,
    skills: {
      frontend: [PROJECT_SKILLS.java, PROJECT_SKILLS.android],
      backend: [
        PROJECT_SKILLS.firebase,
        PROJECT_SKILLS.firestore,
        PROJECT_SKILLS.retrofit,
        PROJECT_SKILLS.tmdb,
      ],
    },
    content: (
      <div>
        <TypographyP className="font-mono text-2xl text-center">
          {`Tinder-style group movie matching — swipe together, match in real time.`}
        </TypographyP>
        <TypographyP className="font-mono">
          {`A real-time Android app where a friend group spins up a shared room, sets filters (genre, runtime, age rating, release year) and swipes through a synchronized, TMDB-powered movie queue together. When everyone in the room swipes right on the same title, it surfaces as a group match — no more 40-minute "what should we watch" standoffs. Built in Java on Android Studio as a six-person team project for SUTD's 50.001 (Information Systems & Programming).`}
        </TypographyP>

        <div className="my-3 mb-6 flex justify-center">
          <Link
            href="https://youtu.be/dqReQDC4wZU"
            target="_blank"
            rel="noopener"
          >
            <Button size="sm" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Watch the demo
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <YouTubeEmbed id="dqReQDC4wZU" title="FlickMatch — demo" />

        <TypographyH3 className="my-4 mt-8">Get in — name, rooms, join</TypographyH3>
        <p className="font-mono mb-2">
          {`Anonymous sign-in drops you straight onto a name screen, then a homepage listing your rooms. Spin up a new room or join a friend's with a 6-character invite code.`}
        </p>
        <SlideShow images={[`${BASE_PATH}/flickmatch/board-main.png`]} />

        <TypographyH3 className="my-4 mt-8">Set the vibe — room filters</TypographyH3>
        <p className="font-mono mb-2">
          {`The room creator picks genres and dials in max runtime, age ratings and a release-year range. Those filters scope the shared TMDB movie queue everyone in the room swipes through.`}
        </p>
        <SlideShow images={[`${BASE_PATH}/flickmatch/board-create.png`]} />

        <TypographyH3 className="my-4 mt-8">
          Match — lobby, swipe, watchlist
        </TypographyH3>
        <p className="font-mono mb-2">
          {`From the lobby (share the code, see who's in) everyone starts swiping the same queue. Likes and matches sync live; matched movies land in a shared watchlist you can sort by match order, rating or popularity, and tick off as watched.`}
        </p>
        <SlideShow images={[`${BASE_PATH}/flickmatch/board-room.png`]} />

        <TypographyH3 className="my-4 mt-8">Real-time group sync</TypographyH3>
        <p className="font-mono mb-2">
          {`Firebase anonymous auth plus Cloud Firestore listeners keep every member's queue, swipes, watchlists, watched history and matches in lockstep live — no manual refresh. Movie data is pulled from the TMDB API through Retrofit and cached into each room's queue.`}
        </p>

        <TypographyH3 className="my-4 mt-8">How matching works</TypographyH3>
        <p className="font-mono mb-2">
          {`Group matching is a set intersection: each member's liked movies become a HashSet and the app keeps only titles liked by everyone (retainAll), short-circuiting as soon as no common match can remain. A final linear pass (isMovieMatchedByAll) re-checks a title across all members' swipe records before confirming, and a comparator sorts matches by rating or popularity so the strongest picks surface first.`}
        </p>
        <Tags
          items={[
            "Set intersection (HashSet)",
            "Queue / LinkedList swipe order",
            "HashMap lookups",
            "Comparator sorting",
          ]}
        />

        <TypographyH3 className="my-4 mt-8">Under the hood</TypographyH3>
        <p className="font-mono mb-2">
          {`Three Android activities — MainActivity (auth + room list), CreateRoomActivity (room setup) and RoomActivity (swipe stack + live match listener) — sit over a service layer of FirebaseHelper, TMDBHelper, MatchingHelper and a Retrofit client. The swipe deck runs on a Queue (LinkedList) for FIFO order with peek() look-ahead, while a HashMap maps room IDs to rooms for constant-time lookups during matching.`}
        </p>
        <Tags
          items={[
            "Java",
            "Android Studio",
            "Firebase Auth",
            "Cloud Firestore",
            "Retrofit",
            "TMDB API",
          ]}
        />

        <p className="mt-8 text-center font-mono text-sm text-muted-foreground">
          {`Built by Team 46 — Alister, Michelle, Janani, Aarushi, Mahek & Somesh.`}
        </p>
      </div>
    ),
  },
  {
    id: "robocred",
    category: "Hardware · Compliance Automation",
    title: "RoboCred — PCB & AutoCAD Compliance Checker",
    accent: "#22d3ee",
    icon: <CircuitBoard />,
    skills: {
      frontend: [],
      backend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.kicad,
        PROJECT_SKILLS.autocad,
        PROJECT_SKILLS.supabase,
        PROJECT_SKILLS.pdf,
        PROJECT_SKILLS.pytest,
      ],
    },
    content: (
      <div>
        <TypographyP className="font-mono text-2xl text-center">
          {`Static analysis for hardware — turns KiCad schematics into audit-ready compliance reports.`}
        </TypographyP>
        <TypographyP className="font-mono">
          {`A Python automation tool that parses KiCad schematics, runs standards-oriented design checks, diffs BOM revisions across versions, generates PDF audit reports, and stores the audit history in Supabase. Conceived during my DEEP Robotics internship as a compliance layer for engineering documentation — bringing software-style CI rigor (auditability, traceability, regression diffing) to hardware design review.`}
        </TypographyP>
        <Tags
          items={[
            "Python",
            "KiCad",
            "AutoCAD",
            "Supabase",
            "PDF reports",
            "pytest",
          ]}
        />

        <TypographyH3 className="my-4 mt-8">Compliance pipeline</TypographyH3>
        <p className="font-mono mb-2">
          {`Parse schematic → rule-based standards checks → BOM revision diff → generated PDF audit report → Supabase audit store. The workflow stays focused on automation, traceable outputs and clear handoff documentation for engineering review.`}
        </p>
        <ComingSoon items={["screens", "schematic"]} />

        <TypographyH3 className="my-4 mt-8">Architecture</TypographyH3>
        <p className="font-mono mb-2">
          {`20+ Python modules organized around validation, reporting, revision comparison and tests — a test-focused structure that emphasizes maintainable backend architecture and reliable, reproducible report generation.`}
        </p>
        <ComingSoon items={["poster", "prototype"]} />
      </div>
    ),
  },
  {
    id: "kookey",
    category: "Design · Hardware Product",
    title: "Kookey",
    src: `${BASE_PATH}/kookey/cover.png`,
    accent: "#38bdf8",
    icon: <Cpu />,
    skills: { frontend: [], backend: [] },
    content: (
      <div>
        <TypographyP className="font-mono text-2xl text-center">
          {`Seamless hostel access — a self-service kiosk + smart wristband that gets security guards out of the ID-checking business.`}
        </TypographyP>
        <TypographyP className="font-mono">
          {`A Design Thinking & Innovation project at SUTD. We found that 92.3% of hostel entries go untapped — residents tailgate, and guards burn ~2 minutes per manual ID check (8–10 minutes escorting a student who forgot their card). Kookey replaces that friction with an automated self-service kiosk and an all-in-one NFC wristband, turning entry into a 30-second self-serve flow instead of a guard interruption.`}
        </TypographyP>
        <Tags
          items={[
            "Design Thinking",
            "Fusion 360 CAD",
            "3D printing",
            "XIAO C6 (ESP32-C6)",
            "NFC / RFID",
            "Prototyping",
          ]}
        />

        <div className="my-3 mb-6 flex justify-center">
          <Link
            href="https://www.youtube.com/watch?v=aCHEXbj2dUg"
            target="_blank"
            rel="noopener"
          >
            <Button size="sm" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Watch the walkthrough
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <YouTubeEmbed id="aCHEXbj2dUg" title="Kookey — walkthrough" />

        <TypographyH3 className="my-4 mt-8">The concept</TypographyH3>
        <p className="font-mono mb-2">
          {`Self-service kiosks sit at hostel entry/exit points so hostellers and contractors can issue their own temporary passes — no guard in the loop. The screen is mounted at 30° to kill glare, with a return receptacle and a dust-sealed housing refined across testing rounds.`}
        </p>
        <SlideShow
          images={[
            `${BASE_PATH}/kookey/render-pov.png`,
            `${BASE_PATH}/kookey/render-corridor.png`,
            `${BASE_PATH}/kookey/kiosk-cad.png`,
          ]}
        />

        <TypographyH3 className="my-4 mt-8">The smart wristband</TypographyH3>
        <p className="font-mono mb-2">
          {`An all-in-one wearable carries the access credential: a Seeed XIAO C6 microcontroller (Wi-Fi + BLE), a 3.7V LiPo cell and an RFID/NFC tag inside a printed carriage. It went through several iterations — the material switched from rigid PETG to soft TPE for comfort, and the colourway from green/yellow to blue for at-a-glance distinguishability.`}
        </p>
        <SlideShow
          images={[
            `${BASE_PATH}/kookey/wristband-exploded.png`,
            `${BASE_PATH}/kookey/proto-wristband.png`,
            `${BASE_PATH}/kookey/wristband-final.png`,
          ]}
        />

        <TypographyH3 className="my-4 mt-8">From sketch to 1:5 prototype</TypographyH3>
        <p className="font-mono mb-2">
          {`The kiosk evolved sketch → 3D CAD → a 1:10 cardboard study model → a 1:5 working prototype, each step driven by user-testing notes (screen glare, return-slot ergonomics, band comfort).`}
        </p>
        <SlideShow images={[`${BASE_PATH}/kookey/proto-cardboard.png`]} />

        <TypographyH3 className="my-4 mt-8">Impact</TypographyH3>
        <p className="font-mono mb-2">
          {`User testing showed manual guard authentication can take up to ~2 minutes; Kookey's NFC flow averages 30 seconds — 83% faster. Guard interventions dropped ~80%, 8 of 10 daily card issues now resolve autonomously, and peak-hour entry bottlenecks ease.`}
        </p>

        <TypographyH3 className="my-4 mt-8">Full case study</TypographyH3>
        <p className="font-mono mb-2">
          {`The complete DTI deliverable — site analysis, user journey map, solution design and the prototyping/testing log (zoom in to read).`}
        </p>
        <SlideShow
          images={[
            `${BASE_PATH}/kookey/page1.png`,
            `${BASE_PATH}/kookey/page2.png`,
            `${BASE_PATH}/kookey/page3.png`,
            `${BASE_PATH}/kookey/page4.png`,
          ]}
        />

        <p className="mt-8 text-center font-mono text-sm text-muted-foreground">
          {`SUTD Design Thinking & Innovation — Group 2 · Sheil, Xavier, Iestin, Srijeet & Somesh.`}
        </p>
      </div>
    ),
  },
  {
    id: "sculptsync-benchmark",
    category: "ML · LLM Evaluation",
    title: "SculptSync LLM Evaluation Benchmark",
    src: `${BASE_PATH}/sculptsync/cover.jpg`,
    accent: "#a78bfa",
    icon: <FlaskConical />,
    skills: {
      frontend: [],
      backend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.ollama,
        PROJECT_SKILLS.huggingface,
        PROJECT_SKILLS.awsIot,
        PROJECT_SKILLS.numpy,
      ],
    },
    content: (
      <div>
        <TypographyP className="font-mono text-2xl text-center">
          {`Made LLM feedback measurable — a repeatable benchmark across models and prompts.`}
        </TypographyP>
        <TypographyP className="font-mono">
          {`Reframed SculptSync (an AI fitness-feedback product) into a repeatable LLM evaluation benchmark. Benchmarked models across Ollama, Hugging Face and API-based providers, scoring generated exercise-posture feedback against structured rubrics — consistency, specificity, safety and actionability — to replace demo impressions with comparison tables that actually drive model selection.`}
        </TypographyP>
        <Tags
          items={[
            "Python",
            "Ollama",
            "Hugging Face",
            "LLM APIs",
            "AWS IoT Core",
            "NumPy",
          ]}
        />
        <DocLink href="/assets/sculptsync/SculptSync-Report.pdf" />

        <TypographyH3 className="my-4 mt-8">The prompt benchmark</TypographyH3>
        <p className="font-mono mb-2">
          {`Seven prompt styles — from terse PT-style cues to friendly beginner coaching — were run across Gemini 2.0 Flash, LLaMA 3 and Qwen 3. Python scoring scripts compared the outputs on consistency, specificity, safety and actionability, turning "which model sounds best" into measurable comparison tables.`}
        </p>
        <SlideShow images={[`${BASE_PATH}/sculptsync/prompt-styles.png`]} />

        <TypographyH3 className="my-4 mt-8">
          The signal — pose-estimation form scoring
        </TypographyH3>
        <p className="font-mono mb-2">
          {`The feedback the LLMs reason over is a pose-estimation form score: MediaPipe landmarks are DTW-aligned against ideal form and reduced to per-joint angle deviations. Tuning that scorer (restricting key-points, weighting, sequence length) lifted good-vs-bad-form ROC-AUC from 0.79 to 0.979.`}
        </p>
        <SlideShow
          images={[
            `${BASE_PATH}/sculptsync/joint-deviation.png`,
            `${BASE_PATH}/sculptsync/roc-auc.png`,
            `${BASE_PATH}/sculptsync/form-score-separation.png`,
          ]}
        />

        <TypographyH3 className="my-4 mt-8">IoT-grounded prompts</TypographyH3>
        <p className="font-mono mb-2">
          {`An AWS IoT Core pipeline ingests ESP32 telemetry from gym machines, feeding real repetition data and backend context into prompts so the models produce concise, region-level posture recommendations from actual exercise signals rather than toy inputs.`}
        </p>

        <p className="mt-8 text-center font-mono text-sm text-muted-foreground">
          {`Team project — pose-estimation core by the SculptSync team; LLM evaluation & IoT telemetry by Somesh.`}
        </p>
      </div>
    ),
  },
  {
    id: "cinematch",
    category: "Data Science · Generative AI",
    title: "CineMatch — GenAI Movie Recommender",
    accent: "#f59e0b",
    icon: <Sparkles />,
    skills: {
      frontend: [PROJECT_SKILLS.react],
      backend: [
        PROJECT_SKILLS.fastapi,
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.sbert,
        PROJECT_SKILLS.sqlite,
      ],
    },
    content: (
      <div>
        <TypographyP className="font-mono text-2xl text-center">
          {`Describe a vibe, get ranked films — embeddings + LLM explanations over 9,000 titles.`}
        </TypographyP>
        <TypographyP className="font-mono">
          {`A recommendation chatbot that turns natural-language taste ("something cozy but smart") into ranked suggestions across a 9,000-title MovieLens catalog using sentence embeddings and cosine similarity, with short LLM-generated explanations for each pick. Served through a FastAPI backend, a React chat interface and SQLite persistence.`}
        </TypographyP>
        <Tags
          items={["Python", "FastAPI", "React", "Sentence-BERT", "SQLite"]}
        />

        <TypographyH3 className="my-4 mt-8">Recommendation engine</TypographyH3>
        <p className="font-mono mb-2">
          {`Sentence-embedding similarity ranks the catalog against a user's described tastes; like / dislike feedback re-ranks results in real time, storing lightweight preference data in SQLite to simulate session-level preference memory.`}
        </p>
        <ComingSoon items={["screens", "demo"]} />

        <TypographyH3 className="my-4 mt-8">Evaluation</TypographyH3>
        <p className="font-mono mb-2">
          {`Ranking quality is measured with Recall@K and NDCG@K on held-out user ratings, used to compare embedding models and retrieval strategies rather than eyeballing demos.`}
        </p>
        <ComingSoon items={["poster"]} />
      </div>
    ),
  },
  {
    id: "ds-ml",
    category: "Collection · 4 projects",
    title: "Data Science & ML",
    src: `${BASE_PATH}/ds-ml/cover.jpg`,
    accent: "#818cf8",
    icon: <BrainCircuit />,
    kind: "collection",
    count: 4,
    skills: { frontend: [], backend: [] },
    content: (
      <div>
        <TypographyP className="font-mono">
          {`Applied ML and data-science work — from models built bare-metal in NumPy to a solar-forecasting pipeline, an IB research essay on data augmentation, and AI assistants.`}
        </TypographyP>

        <Entry
          title="ML Fundamentals From Scratch"
          period="2026"
          tags={["Python", "NumPy", "Matplotlib", "Jupyter"]}
          repo="https://github.com/SomeshAgrawal1318/Machine-Learning-Algorithms-from-Scratch"
          images={[
            `${BASE_PATH}/ml-scratch/linear.png`,
            `${BASE_PATH}/ml-scratch/gd-vs-sgd.png`,
            `${BASE_PATH}/ml-scratch/poly-deg2.png`,
            `${BASE_PATH}/ml-scratch/poly-fits.png`,
            `${BASE_PATH}/ml-scratch/error-vs-degree.png`,
            `${BASE_PATH}/ml-scratch/ridge-loss.png`,
            `${BASE_PATH}/ml-scratch/kmeans.png`,
          ]}
        >
          {`Classic ML algorithms implemented from first principles in pure NumPy — no sklearn, no TensorFlow. A perceptron classifies handwritten digits (1 vs 5) from intensity/symmetry features at 96.7% test accuracy; closed-form, gradient-descent and SGD linear regression are compared head-to-head; polynomial regression is swept from degree 1 to 15 to watch overfitting kick in; ridge regression is tuned by validation loss across λ; and K-Means (K=8) compresses a 210,012-pixel image down to eight colours. The charts below are pulled straight from the report.`}
        </Entry>

        <Entry
          title="Solar Plant Regression & Energy Analytics"
          period="2025 · SUTD Data-Driven World"
          tags={["Python", "pandas", "Linear Regression", "Streamlit"]}
          repo="https://github.com/SomeshAgrawal1318/Solar-Power-Plant-regression"
          report="/assets/reports/Solar-Power-Regression-Report.pdf"
          images={[
            `${BASE_PATH}/solar-reg/features.png`,
            `${BASE_PATH}/solar-reg/pred-linear.png`,
            `${BASE_PATH}/solar-reg/pred-poly.png`,
          ]}
        >
          {`Short-term (15-minute) solar-output forecasting for an Indian power plant. I merged inverter-level generation data with weather-sensor readings (irradiation, module and ambient temperature) from a Kaggle dataset, aggregated the 21 inverters per timestamp, and engineered features after filtering night-time zero-output rows. A linear-regression model — trained closed-form and with gradient descent, plus a polynomial variant — predicts power output and flags performance anomalies, evaluated with RMSE and R² and shipped as a Streamlit web app.`}
        </Entry>

        <Entry
          title="Data Augmentation in Computer Vision — IB Extended Essay"
          period="2024 · IB Computer Science"
          tags={["Python", "TensorFlow / Keras", "CNNs", "Data Augmentation"]}
          report="/assets/reports/Somesh-Agrawal-EE-Data-Augmentation.pdf"
          images={[
            `${BASE_PATH}/ee/augmentations.png`,
            `${BASE_PATH}/ee/cnn-diagram.png`,
            `${BASE_PATH}/ee/results-bars2.png`,
          ]}
        >
          {`My ~3,900-word IB Computer Science Extended Essay: how do combinations of affine transformations, noise injection and intensity transformations affect a CNN's object-detection accuracy and computational cost? I trained CNNs across systematically varied augmentation combinations, measuring test accuracy against training time on primary and secondary datasets — a structured early dive into the accuracy-versus-cost trade-off of data augmentation. Full essay linked below.`}
        </Entry>

        <Entry
          title="geo — Gemini Voice Assistant for Chongqing"
          period="2025"
          tags={["Python", "Gemini API", "Whisper", "pyttsx3 TTS", "Tkinter"]}
          repo="https://github.com/SomeshAgrawal1318/Geo-Gemini-Voice-Assistant-for-Chongqing"
        >
          {`A local, multimodal voice assistant built for Chongqing — it pipes Whisper speech-to-text into Gemini and back out through pyttsx3 text-to-speech behind a Tkinter desktop UI, so you can talk to it and get spoken answers about the city. A practical LLM-application prototype focused on the full voice loop: prompt flow, user interaction and API-backed model integration.`}
        </Entry>
      </div>
    ),
  },
  {
    id: "mahjong",
    category: "Full-Stack · Real-time Game",
    title: "Real-Time Mahjong Multiplayer",
    accent: "#34d399",
    icon: <Gamepad2 />,
    src: `${BASE_PATH}/mahjong/cover.jpg`,
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.zustand,
      ],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.express,
        PROJECT_SKILLS.sockerio,
        PROJECT_SKILLS.vitest,
      ],
    },
    live: "https://mahjong-team2.netlify.app/",
    github: "https://github.com/SomeshAgrawal1318/Mahjong",
    content: (
      <div>
        <TypographyP className="font-mono text-2xl text-center">
          {`Real-time 4-player Mahjong — spin up a room, share the code, play from any device.`}
        </TypographyP>
        <TypographyP className="font-mono">
          {`A production-quality multiplayer Mahjong web app: rooms with a 6-character code, four seats (East / South / West / North), and a server-authoritative engine so the rules — not the clients — decide every move. Built as a clean monorepo: a React + Vite + Zustand client, a Node + Express + Socket.IO server, and a shared rules module, with Vitest covering the engine.`}
        </TypographyP>
        <Tags
          items={[
            "React",
            "Vite",
            "Zustand",
            "Node.js",
            "Express",
            "Socket.IO",
            "Vitest",
          ]}
        />

        <TypographyH3 className="my-4 mt-8">Server-authoritative engine</TypographyH3>
        <p className="font-mono mb-2">
          {`Real-time state syncs over Socket.IO with proper turn management; the server validates every draw, discard and claim so a client can't cheat. It detects a winning hand (4 melds + 1 pair), supports Pong (three of a kind) and Chow (a run claimed from the previous player), and restores game state when a player reconnects.`}
        </p>

        <TypographyH3 className="my-4 mt-8">An authentic table, built by hand</TypographyH3>
        <p className="font-mono mb-2">
          {`SVG tiles render the traditional suits — characters (萬, red), bamboo (索, green) and dots (筒, blue) plus winds and dragons — over a deep-green felt table with glass-morphism player panels and subtle draw / discard animations.`}
        </p>

        <p className="font-mono mb-2 text-muted-foreground">
          {`Heads-up: the live server runs on Render's free tier, so the first connection after it has been idle takes ~30s to wake.`}
        </p>
      </div>
    ),
  },

  // ─────────────────── Collections (links to more work) ───────────────────
  {
    id: "robotics",
    category: "Collection · 5 projects",
    title: "Robotics",
    src: `${BASE_PATH}/robotics/cover.jpg`,
    accent: "#fb923c",
    icon: <Bot />,
    kind: "collection",
    count: 5,
    skills: { frontend: [], backend: [] },
    content: (
      <div>
        <TypographyP className="font-mono">
          {`Hands-on robotics — from training an embodied-AI manipulation policy on LeRobot arms to a quadruped-robotics internship in China and a beach-cleaning robot's chassis.`}
        </TypographyP>

        <Entry
          title="Embodied AI — ACT policy on SO-101 arms"
          period="2025"
          tags={[
            "LeRobot",
            "ACT (Action Chunking)",
            "Imitation Learning",
            "Teleoperation",
            "PyTorch",
          ]}
          video="uUBpf-cmuTI"
        >
          {`Trained an ACT (Action Chunking with Transformers) policy on a pair of LeRobot SO-101 arms for a block pick-and-place. I teleoperated the follower with a leader arm to collect demonstrations, then trained an imitation-learning policy — following LeRobot's framework — that generalizes the motion to new block positions. The bet behind it: AI already crushes chess, code and essays, but everyday physical tasks (folding laundry, picking up a block) are still hard. Cheap arms + modern ML put that "physical intelligence" frontier within reach of a desk, not just a lab. Full build write-up coming; inference video below.`}
        </Entry>

        <Entry
          title="ROS 2 — Learning Journey"
          period="2025"
          tags={["ROS 2 Humble", "rclpy", "Nodes / Topics", "Linux"]}
          repo="https://github.com/SomeshAgrawal1318/ROS2-Practice"
          logo={`${BASE_PATH}/ros2/humble.png`}
        >
          {`Getting hands-on with ROS 2 (Humble Hawksbill) — nodes, topics, publishers / subscribers, services and the workspace / build tooling the rest of modern robotics runs on. My practice repo as I ramp toward bigger robotics and embodied-AI work.`}
        </Entry>

        <Entry
          title="DEEP Robotics — Robotics Internship"
          period="Sept–Dec 2025 · Hangzhou, China"
          tags={["Quadruped robots", "Embedded", "Product"]}
          media={["photos", "poster"]}
        >
          {`Shadowed product and engineering teams to understand quadruped-robot workflows spanning hardware, embedded systems, software and product requirements, then brainstormed RoboCred — a robotics compliance concept focused on audit trails, safety documentation and engineering validation (now a full project, above).`}
        </Entry>

        <Entry
          title="Team SeaSOAR — Beach-Cleaning Robot"
          period="SUTD SOAR · Sustainability Award"
          tags={["Fusion 360", "CAD", "Fabrication"]}
          media={["prototype", "poster"]}
        >
          {`Designed and fabricated the chassis of an autonomous beach-cleaning robot with SUTD's autonomous robotics organization (SOAR) using Fusion 360 and workshop fabrication equipment — work that earned the team a Sustainability Award.`}
        </Entry>

        <Entry
          title="RoboCred — Robotics Compliance"
          period="2026"
          tags={["Python", "Compliance", "Validation"]}
        >
          {`The compliance and engineering-validation concept that grew out of the DEEP Robotics internship — see the dedicated RoboCred card above for the PCB & AutoCAD compliance checker it became.`}
        </Entry>
      </div>
    ),
  },
  {
    id: "hardware-cad",
    category: "Collection · 6 projects",
    title: "Hardware & CAD",
    src: `${BASE_PATH}/hardware-cad/cover.jpg`,
    accent: "#38bdf8",
    icon: <DraftingCompass />,
    kind: "collection",
    count: 6,
    skills: { frontend: [], backend: [] },
    content: (
      <div>
        <TypographyP className="font-mono">
          {`Where the bits meet the physical world — FPGA electronics, embedded IoT, mechanical and PCB CAD, and maker-space fabrication.`}
        </TypographyP>

        <Entry
          title="Whack-a-Green — FPGA Reaction Game"
          period="SUTD · 50.002 Computation Structures · Team 46"
          tags={[
            "FPGA",
            "Lucid / Alchitry",
            "Custom ALU",
            "FSM",
            "Fusion 360 CAD",
          ]}
          repo="https://github.com/50002-computation-structures/1d-project-cl04-team-46"
          images={[
            `${BASE_PATH}/whack/enclosure.png`,
            `${BASE_PATH}/whack/fsm.png`,
            `${BASE_PATH}/whack/datapath.png`,
            `${BASE_PATH}/whack/poster.png`,
          ]}
        >
          {`A whack-a-mole-style arcade reaction game built on an FPGA for SUTD's 50.002 (Computation Structures). Players hit green LEDs for points and dodge red ones across a 30-second, three-lives round, with pseudo-random mole generation (LFSR), RGB-LED feedback and dual 7-segment displays for score, timer and high score. I worked on the electronics and the CAD — designing the angled arcade enclosure with its mole-button layout in Fusion 360. Under the hood it runs a custom 32-bit datapath: a register file, an FSM (START → GENERATE MOLE → BUTTON PRESS → UPDATE SCORE → END GAME) and an ALU extended with BITSET/BITCLR (LED control), ADDSAT/SUBSAT (overflow-safe scoring) and MOD (valid mole positioning).`}
        </Entry>

        <Entry
          title="Foldable Solar Heating Pad — CAD & Product Design"
          period="DES 1D"
          tags={["CAD", "3D printing", "MPPT", "Li-ion", "Product design"]}
          images={[
            `${BASE_PATH}/solar/cad-angled.png`,
            `${BASE_PATH}/solar/cad-top.png`,
            `${BASE_PATH}/solar/cad-assembly.png`,
            `${BASE_PATH}/solar/product.png`,
            `${BASE_PATH}/solar/schematic.png`,
          ]}
        >
          {`CAD and product design for a solar-powered portable heating pad for sleeping bags — warmth for campers and mountaineers where there is no mains power. I designed a fold-flat panel array with a 3D-printed casing that houses the electronics (4× 5.5V panels → DFR0559 MPPT controller → 3.7V Li-ion → 5V heating pad) plus an insulation layer to cut heat loss. It charges by day and pre-warms the bag for ~90 minutes at night — lightweight and packable.`}
        </Entry>

        <Entry
          title="ESP32 Gym-Machine Telemetry"
          period="2025"
          tags={["ESP32", "AWS IoT Core", "MQTT / TLS", "AWS Lambda"]}
          report="/assets/sculptsync/SculptSync-Report.pdf"
          images={[`${BASE_PATH}/sculptsync/iot-architecture.png`]}
        >
          {`An ESP32 on the gym machine streams workout telemetry — reps, sets, tempo, score, feedback — to AWS IoT Core over TLS-secured MQTT (mutual X.509 auth). An IoT Rule routes each message to an AWS Lambda that parses and stores it: the cloud-backed telemetry layer behind the SculptSync benchmark.`}
        </Entry>

        <Entry
          title="Team SeaSOAR — Chassis, Electronics & Fabrication"
          period="SUTD SOAR · Sustainability Award"
          tags={["Fusion 360", "Mechanical CAD", "Electronics", "Fabrication"]}
          media={["cad", "prototype", "poster"]}
        >
          {`Designed the chassis of an autonomous beach-cleaning robot in Fusion 360 and fabricated its mechanical and electrical subsystems with SUTD's autonomous robotics organization (SOAR), taking parts from CAD to physical hardware with workshop equipment — work that earned the team a Sustainability Award.`}
        </Entry>

        <Entry
          title="RoboCred — PCB & Schematic Checks"
          period="2026"
          tags={["KiCad", "AutoCAD", "PCB"]}
          media={["schematic", "screens"]}
        >
          {`The CAD side of RoboCred — parsing KiCad schematics and AutoCAD drawings to run automated standards / compliance checks and BOM diffs. See the RoboCred card above for the full tool.`}
        </Entry>

        <Entry
          title="Innovation Maker / Breaker Space (IMBS)"
          period="2025–2026 · Founding President"
          tags={["3D printing", "Laser cutting", "Maker ops"]}
          media={["photos"]}
        >
          {`Helped stand up a student maker space — 3D printers, laser cutters, drills and workbenches — owning procurement, operating policies and maintenance processes on a budget of over S$25,000, while leading a team of 25 maker guides.`}
        </Entry>
      </div>
    ),
  },
  {
    id: "systems-c",
    category: "Collection · 2 projects",
    title: "Systems & C",
    src: `${BASE_PATH}/shell/cover.jpg`,
    accent: "#34d399",
    icon: <Cpu />,
    kind: "collection",
    count: 2,
    skills: { frontend: [], backend: [] },
    content: (
      <div>
        <TypographyP className="font-mono">
          {`Low-level systems work in C on Linux — building a shell from scratch and the OS / security fundamentals underneath it.`}
        </TypographyP>

        <Entry
          title="CSEShell — a Unix Shell in C"
          period="2025"
          tags={["C", "Linux", "Processes", "Unity tests", "Make"]}
          repo="https://github.com/SomeshAgrawal1318/Shell-in-Linux"
          images={[`${BASE_PATH}/shell/ss.png`]}
        >
          {`A custom Unix shell written in C — built-in commands plus a set of system programs (find, ld, ldr) compiled from source via a makefile. It handles command parsing and execution with fork/exec process control, and ships its own test suite: C unit tests on the helper libraries (Unity framework) plus black-box Bash integration tests that drive ./cseshell. A hands-on tour of how a shell, processes and the Unix toolchain actually fit together.`}
        </Entry>

        <Entry
          title="Computer Systems & Security Labs"
          period="2026 · SUTD"
          tags={["C", "Linux", "TOCTOU", "Banker's Algorithm"]}
          media={["screens"]}
        >
          {`C and Linux systems exercises covering process control, shell behaviour, environment variables, memory handling and command execution — plus a TOCTOU race-condition security lab and a Banker's Algorithm deadlock-avoidance implementation: OS-level reasoning about how concurrency and resource allocation go wrong.`}
        </Entry>
      </div>
    ),
  },
];
export default projects;
