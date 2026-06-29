import AceTernityLogo from "@/components/logos/aceternity";
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
  FlaskConical,
  Gamepad2,
  Image as ImageIcon,
  Link2,
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
const Entry = ({
  title,
  period,
  children,
  tags,
  media,
}: {
  title: string;
  period?: string;
  children: ReactNode;
  tags?: string[];
  media?: (keyof typeof PLACEHOLDERS)[];
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
    {media && <ComingSoon items={media} />}
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
    accent: "#f43f5e",
    icon: <Smartphone />,
    skills: {
      frontend: [PROJECT_SKILLS.java, PROJECT_SKILLS.android],
      backend: [
        PROJECT_SKILLS.firebase,
        PROJECT_SKILLS.firestore,
        PROJECT_SKILLS.tmdb,
      ],
    },
    // Web/mobile project — live & source links going up later.
    live: "#",
    content: (
      <div>
        <TypographyP className="font-mono text-2xl text-center">
          {`Tinder-style group movie matching — swipe together, match in real time.`}
        </TypographyP>
        <TypographyP className="font-mono">
          {`A real-time Android app where a friend group spins up a shared room, sets filters (genre, runtime, age rating, release year) and swipes through a synchronized, TMDB-powered movie queue together. When everyone swipes right on the same title, it surfaces as a group match — no more 40-minute "what do you want to watch" standoffs.`}
        </TypographyP>

        <TypographyH3 className="my-4 mt-8">Real-time group sync</TypographyH3>
        <p className="font-mono mb-2">
          {`Built on Firebase anonymous auth and Cloud Firestore listeners so every member's queue, swipes, watchlists, watched history and matches stay in lockstep live. Group match-detection logic resolves a match the moment the whole room agrees, with configurable filters scoping the shared TMDB queue.`}
        </p>
        <ComingSoon items={["screens", "demo", "link"]} />
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
    id: "sculptsync-benchmark",
    category: "ML · LLM Evaluation",
    title: "SculptSync LLM Evaluation Benchmark",
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

        <TypographyH3 className="my-4 mt-8">Evaluation harness</TypographyH3>
        <p className="font-mono mb-2">
          {`Python scoring scripts compare prompt versions and model outputs, turning subjective LLM feedback quality into measurable results. Rubric-based scoring is summarized in comparison tables alongside an analysis of each model's weaknesses and failure patterns.`}
        </p>
        <ComingSoon items={["screens", "poster"]} />

        <TypographyH3 className="my-4 mt-8">IoT-grounded prompts</TypographyH3>
        <p className="font-mono mb-2">
          {`An AWS IoT Core pipeline ingests ESP32 telemetry from gym machines, feeding real repetition data and backend context into prompts so the models produce concise, region-level posture recommendations from actual exercise signals rather than toy inputs.`}
        </p>
        <ComingSoon items={["prototype"]} />
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
    id: "mahjong",
    category: "Full-Stack · Real-time Game",
    title: "Real-Time Mahjong Multiplayer",
    accent: "#34d399",
    icon: <Gamepad2 />,
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.ts],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.websockets,
        PROJECT_SKILLS.vitest,
      ],
    },
    // Web project — live & source links going up later.
    live: "#",
    content: (
      <div>
        <TypographyP className="font-mono text-2xl text-center">
          {`A real-time multiplayer Mahjong engine — clean monorepo, tested game logic.`}
        </TypographyP>
        <TypographyP className="font-mono">
          {`A real-time multiplayer Mahjong game with a React frontend, a Node.js game engine and a shared game-logic module, using WebSocket-style state updates and Vitest unit tests. Structured as a clean monorepo separating client, server and shared logic to keep multiplayer state consistent, maintainable and correctness-tested.`}
        </TypographyP>

        <TypographyH3 className="my-4 mt-8">Authoritative game logic</TypographyH3>
        <p className="font-mono mb-2">
          {`A shared rules module drives game state across clients with WebSocket-style updates, and Vitest unit tests pin down correctness for the trickier multiplayer transitions — so the same logic stays trustworthy on both client and server.`}
        </p>
        <ComingSoon items={["screens", "link"]} />
      </div>
    ),
  },

  // ─────────────────── Collections (links to more work) ───────────────────
  {
    id: "ds-ml",
    category: "Collection · 4 projects",
    title: "Data Science & ML",
    accent: "#818cf8",
    icon: <BrainCircuit />,
    kind: "collection",
    count: 4,
    skills: { frontend: [], backend: [] },
    content: (
      <div>
        <TypographyP className="font-mono">
          {`Applied ML and data-science work — from models built bare-metal in NumPy to forecasting pipelines and AI assistants. (Screenshots, plots and posters going up soon.)`}
        </TypographyP>

        <Entry
          title="ML Fundamentals From Scratch"
          period="2026"
          tags={["Python", "NumPy", "Jupyter", "Matplotlib"]}
          media={["screens", "poster"]}
        >
          {`Implemented Perceptron, linear / polynomial / ridge regression, gradient descent, stochastic gradient descent, K-Means and neural networks in pure NumPy — no sklearn, no TensorFlow. Hit 96.7% Perceptron accuracy and ran K-Means image compression on a 210k-pixel image while studying regularization and numerical stability.`}
        </Entry>

        <Entry
          title="Solar Plant Regression & Energy Analytics"
          period="2025 · SUTD Data-Driven World"
          tags={["Python", "pandas", "Regression", "Streamlit"]}
          media={["screens", "poster"]}
        >
          {`A solar-power forecasting pipeline joining inverter-level power readings with irradiation, module temperature, ambient temperature and time features. Engineered features, filtered night-time zero-output rows, and compared closed-form regression, gradient descent and polynomial models (RMSE / R²), packaged into a Streamlit-style analytics workflow for inspecting model behavior.`}
        </Entry>

        <Entry
          title="CNN Robustness — IB Extended Essay"
          period="2024"
          tags={["Python", "PyTorch / TensorFlow", "CNNs"]}
          media={["poster", "screens"]}
        >
          {`Independent research on how combinations of affine transformations, noise injection and intensity transformations affect a CNN's object-detection accuracy and computational cost — an early, structured dive into ML robustness and the cost/accuracy trade-off.`}
        </Entry>

        <Entry
          title="geo — Gemini Voice Assistant"
          period="2025"
          tags={["Python", "Gemini API", "Whisper", "Tkinter"]}
          media={["screens", "demo"]}
        >
          {`A local multimodal AI assistant combining Whisper speech-to-text, Gemini responses, pyttsx3 text-to-speech and a Tkinter desktop UI — a practical LLM-application prototype focused on prompt flow, user interaction and API-backed model integration.`}
        </Entry>
      </div>
    ),
  },
  {
    id: "robotics",
    category: "Collection · 3 projects",
    title: "Robotics",
    accent: "#fb923c",
    icon: <Bot />,
    kind: "collection",
    count: 3,
    skills: { frontend: [], backend: [] },
    content: (
      <div>
        <TypographyP className="font-mono">
          {`Hands-on robotics — from a beach-cleaning robot's chassis to a quadruped-robotics internship in China. (On-site photos, prototype shots and posters going up soon.)`}
        </TypographyP>

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
    id: "hardware",
    category: "Collection · 3 projects",
    title: "Hardware",
    accent: "#2dd4bf",
    icon: <Cpu />,
    kind: "collection",
    count: 3,
    skills: { frontend: [], backend: [] },
    content: (
      <div>
        <TypographyP className="font-mono">
          {`Embedded and electronics work — IoT telemetry, sensors and maker-space fabrication. (Prototype photos and bench shots going up soon.)`}
        </TypographyP>

        <Entry
          title="ESP32 Gym-Machine Telemetry"
          period="2025"
          tags={["ESP32", "AWS IoT Core", "Sensors"]}
          media={["prototype", "screens"]}
        >
          {`Built an AWS IoT Core ingestion pipeline for ESP32 telemetry from gym machines — wiring sensors for repetition-count experiments with cloud-backed logging. This is the hardware layer behind the SculptSync benchmark.`}
        </Entry>

        <Entry
          title="SeaSOAR — Electronics & Fabrication"
          period="SUTD SOAR"
          tags={["Fabrication", "Electronics", "Workshop"]}
          media={["prototype", "poster"]}
        >
          {`Built and fabricated mechanical and electrical subsystems for the SOAR beach-cleaning robot, taking parts from CAD to physical hardware using workshop fabrication equipment.`}
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
    id: "cad",
    category: "Collection · 2 projects",
    title: "CAD",
    accent: "#60a5fa",
    icon: <DraftingCompass />,
    kind: "collection",
    count: 2,
    skills: { frontend: [], backend: [] },
    content: (
      <div>
        <TypographyP className="font-mono">
          {`Mechanical and electrical CAD — chassis design in Fusion 360 and PCB / schematic work in KiCad and AutoCAD. (CAD renders and schematics going up soon.)`}
        </TypographyP>

        <Entry
          title="SeaSOAR Chassis — Fusion 360"
          period="SUTD SOAR · Sustainability Award"
          tags={["Fusion 360", "Mechanical CAD", "Fabrication"]}
          media={["cad", "prototype", "poster"]}
        >
          {`Designed the chassis of the SOAR beach-cleaning robot in Fusion 360 and carried it from model to fabricated part with workshop equipment — the mechanical-CAD half of the SeaSOAR project that earned a Sustainability Award.`}
        </Entry>

        <Entry
          title="RoboCred — PCB & Schematic Checks"
          period="2026"
          tags={["KiCad", "AutoCAD", "PCB"]}
          media={["schematic", "screens"]}
        >
          {`The CAD side of RoboCred — parsing KiCad schematics and AutoCAD drawings to run automated standards / compliance checks and BOM diffs. See the RoboCred card above for the full tool.`}
        </Entry>
      </div>
    ),
  },
];
export default projects;
