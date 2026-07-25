# Deployment

**Version:** 1.0
**Status:** Active

---

## 1. Purpose

`020-tech-stack.md`, Section 9 already establishes the deployment assumption this document builds on: a rebuild-on-publish platform with first-party Next.js support and a global edge network. `023-testing.md` already defines every gate a change must pass. This document does not introduce new architecture — it describes how a change actually moves from commit to production, using the gates and assumptions those two documents already established.

---

## 2. Deployment Philosophy

> **Deployment is the controlled publication of a verified specification, not merely the act of copying files to production.**

A deployment succeeds only because the specifications are satisfied — content validates (`023-testing.md`, Section 6), components behave as specified (`023-testing.md`, Section 5), accessibility and performance gates hold (`023-testing.md`, Sections 7–8), and every persona journey still completes (`023-testing.md`, Section 9). "The build finished" is not the same claim as "this deployment is verified," and this document treats them as genuinely different things.

Consistent with `004-product-goals.md`'s single-author constraint, the process is simple enough to operate alone, continuously, and without dedicated release engineering — but simplicity never comes at the cost of skipping a gate. A faster path that skips verification is not a faster deployment; it's an unverified one.

---

## 3. Build Pipeline

A change moves through the same sequence every time, each stage blocking the next on failure:

1. Type-check (`022-coding-standards.md`, Section 3's strict TypeScript).
2. Automated formatting and static analysis (`020-tech-stack.md`, Section 3).
3. Content validation (`023-testing.md`, Section 6) — structural checks on Case Studies, Journal entries, AgentPrep's append-only enforcement, and Resume/Experience/PDF fact synchronisation.
4. Unit and component tests (`023-testing.md`, Sections 4–5).
5. Static build (`020-tech-stack.md`, Section 4).
6. Performance gate (`023-testing.md`, Section 8; budgets defined in `011-performance.md`).
7. Automated accessibility audit floor (`023-testing.md`, Section 7).
8. Deploy.

Manual review — each content type's own review checklist (`015-case-studies.md`, `016-agentprep.md`, `017-journal.md`) and the manual keyboard/screen-reader pass (`010-accessibility.md`, Section 10) — happens before a change is even proposed for merge, not as a pipeline stage. It requires human judgment the pipeline cannot perform, per `023-testing.md`, Section 10.

---

## 4. Validation Gates

No gate in Section 3 is skipped for urgency, exactly as `011-performance.md`'s budgets are never renegotiated to fit whatever was built. If a gate fails, the change is fixed to pass the gate — the gate is never loosened to let the change through. This applies equally to every gate: a failing type-check, a Case Study missing a required section, a broken persona journey, and a performance regression are all treated as the same category of problem — something that blocks release until resolved.

---

## 5. Release Process

Publishing is a merge to the main branch, which triggers the pipeline in Section 3 and, on success, deployment — there is no separate manual "publish" action outside of git, consistent with `020-tech-stack.md`, Section 6's decision to keep content in the repository rather than behind a third-party service.

This maps directly onto `013-content-strategy.md`, Section 9's content lifecycle:

- **Draft** — a branch or pull request not yet merged.
- **Published** — merged to main, passed every gate, deployed.
- **Updated** — a subsequent commit (a living AgentPrep update, or a correction to static content).
- **Retired** — content removed in a commit, with a redirect added (`027-application-behaviour.md`) and the page deindexed (`012-seo.md`, Section 8) as part of the same change.

There is no separate release-approval role. The single author is both the author and the release gate — which is exactly why Section 4's gates are never treated as advisory: with no second person reviewing a release before it ships, the automated gates and the manual checklists in Section 3 are the only check that exists.

---

## 6. Rollback Strategy

Each deployment is an immutable build tied to a specific commit, so rollback is redeploying the previous known-good commit — not a manual, file-by-file revert. Because content is git-tracked (`020-tech-stack.md`, Section 6), a content regression is rolled back the same way a code regression is: a git revert, run back through the same pipeline in Section 3, not through a separate "hotfix" path that skips gates. A previous commit that already passed every gate when it was originally deployed may be redeployed immediately without re-running the pipeline, since nothing about it has changed.

---

## 7. Environment Management

Two environments only: **Production** (the live public site) and an automatic **Preview** deployment per pull request or branch, generated by the hosting platform assumed in `020-tech-stack.md`, Section 9. Preview deployments are where the author runs the manual review and persona-journey checks (Section 3) before merging.

No persistent, separate staging environment is maintained. Per `004-product-goals.md`'s single-author constraint, a long-lived staging environment is an operational cost with no corresponding benefit here — there is no team that needs a shared pre-production environment, and a per-change preview deployment already serves the same purpose.

---

## 8. Monitoring After Deployment

This document does not define a new, deployment-specific monitoring system. The ongoing practices already established elsewhere continue on their own schedule, independent of any single release:

- `011-performance.md`, Section 10's periodic field-data review.
- `012-seo.md`, Section 10's periodic indexing and crawl-error check.

A deployment is considered fully successful only once the next scheduled check under those practices confirms no regression — not merely once the build pipeline finishes. This is Section 2's governing principle applied concretely: "copied to production" and "verified" are not the same milestone.

---

## 9. Disaster Recovery

Because content lives in git (`020-tech-stack.md`, Section 6) and there is no database or other dynamic state (`020-tech-stack.md`, Section 7's rejection of a headless CMS and global state library pays off directly here), the actual disaster surface is small: recovery from a broken deployment or lost hosting environment is redeploying any previous commit from git history. There is no database to restore and no dynamic state that could be lost independently of the repository itself.

The real, honest single-author risk is not data loss — it's losing access to the hosting account or domain registration. This document names that risk directly rather than glossing over it with generic "we have backups" language: credentials and domain renewal dates are tracked somewhere durable and checked periodically, not held only in memory.

---

## Review Checklist

- [ ] Every stage in the build pipeline (Section 3) ran and passed before deployment; none was skipped for urgency (Section 4).
- [ ] Manual review and the relevant content type's checklist were completed before merge, not treated as optional (Section 3).
- [ ] The release maps cleanly onto one of the four lifecycle stages in `013-content-strategy.md`, Section 9 (Section 5).
- [ ] A rollback, if needed, redeploys a previously verified commit rather than patching production directly (Section 6).
- [ ] No persistent staging environment has been introduced without revisiting Section 7's reasoning.
- [ ] The next scheduled performance and SEO monitoring check (Section 8) has confirmed no regression since this deployment.
- [ ] Hosting account and domain credentials remain tracked and current (Section 9).

---

## What This Document Is Not

This document does not specify a CI provider, exact pipeline configuration syntax, or hosting account setup steps — those are implementation details. It defines the process, the gates, and the sequence any such implementation must satisfy.
