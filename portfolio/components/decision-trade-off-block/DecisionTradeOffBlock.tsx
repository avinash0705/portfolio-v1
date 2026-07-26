type DecisionTradeOffBlockProps =
  | {
      kind: "decision";
      /** What was chosen. */
      decision: string;
      /** The alternative that was rejected — mandatory, never omitted.
       * A "decision" with nothing rejected doesn't qualify as one
       * (015-case-studies.md's Qualification Criteria). */
      rejectedAlternative: string;
      reasoning: string;
    }
  | {
      kind: "trade-off";
      /** What was gained. */
      gained: string;
      /** What was given up or cost — mandatory, never omitted. */
      given: string;
      reasoning: string;
    };

/**
 * 008-component-library.md, Section 9. One component, not two — both
 * variants render the same shape (a primary statement, a mandatory
 * counter-statement, reasoning), differing only in label, per 008's own
 * "both variants share the same content-ownership rule."
 *
 * No container (006-design-system.md, Section 2, as amended): a <dl>
 * with typographic weight, not a bordered callout box. This sits inside
 * an already-headed section (Section Heading provides that context above
 * it) — it doesn't own a heading of its own.
 *
 * There is no "positive-only" escape hatch: the discriminated union
 * makes a decision or trade-off with no counter-statement or reasoning
 * a compile error, not a runtime possibility (008's explicit rejection
 * of that as a variant).
 */
export function DecisionTradeOffBlock(props: DecisionTradeOffBlockProps) {
  const [primaryLabel, primaryValue, counterLabel, counterValue] =
    props.kind === "decision"
      ? [
          "Decision",
          props.decision,
          "Alternative considered",
          props.rejectedAlternative,
        ]
      : ["Gained", props.gained, "Given up", props.given];

  return (
    <dl className="space-y-3">
      <div>
        <dt className="text-sm text-muted">{primaryLabel}</dt>
        <dd className="text-base text-foreground">{primaryValue}</dd>
      </div>
      <div>
        <dt className="text-sm text-muted">{counterLabel}</dt>
        <dd className="text-base text-foreground">{counterValue}</dd>
      </div>
      <div>
        <dt className="text-sm text-muted">Reasoning</dt>
        <dd className="text-base leading-relaxed text-foreground">
          {props.reasoning}
        </dd>
      </div>
    </dl>
  );
}
