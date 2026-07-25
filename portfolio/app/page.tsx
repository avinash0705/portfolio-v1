/**
 * Phase 1 walking skeleton (025-roadmap.md, Section 3) — a minimal, honest
 * placeholder, not the real Homepage specification (014-homepage.md), which
 * is built in Phase 2 (025-roadmap.md, Section 4). Nothing here is fabricated
 * content; it exists only to exercise the layout, navigation, and pipeline
 * end to end.
 */
export default function Home() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24">
      <p className="text-sm text-muted">Under construction</p>
      <h1 className="mt-2 text-2xl font-medium text-foreground">
        The real homepage isn&apos;t built yet.
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        This is a Phase 1 walking skeleton — infrastructure, navigation, and the
        deployment pipeline are being verified before any real page content is
        written.
      </p>
    </div>
  );
}
