---
name: update-dependencies
description: >-
  Triages and applies `bun outdated` updates for this Bun/Next app: patches and
  minors after reading release notes, majors only with permission. Use when the
  user runs or pastes `bun outdated`, asks to bump/update dependencies, or wants
  a safe package upgrade pass.
---

# Update dependencies

Apply dependency updates from `bun outdated` for this repo. Pin exact versions. Leave majors until the user grants permission.

## Steps

Copy and track:

```
- [ ] Inventory
- [ ] Classify
- [ ] Notes (every minor and major)
- [ ] Apply
- [ ] Follow-through
- [ ] Report
```

### Inventory

Run `bun outdated`. If the user pasted a table, still run it — the tree may have moved.

Read `package.json`: this repo pins exact versions, uses Bun, and keeps companion packages in lockstep (`prisma` / `@prisma/client` / `@prisma/adapter-pg`; `react` / `react-dom` / `@types/react*`; Next with the React it ships).

For each row, use **Current → Update** when it stays in the same major. Treat **Latest** as a different line of work when it is a new major, RC, or a types package whose major does not match runtime (`engines.node` vs `@types/node`).

### Classify

| Bucket | When | Action |
|---|---|---|
| Patch | Same major.minor, newer patch | Apply. Changelog only if the package is known-fragile (Prisma, Next, Playwright, Zod). |
| Minor | Same major, newer minor | Read notes, then apply or apply-with-code. |
| Major | New major, RC of next major, or Latest far ahead of Update | Hold until permission. Then read notes and migrate. |

Permission is explicit: “include majors”, “take X to N”, or “update everything including majors”. A generic “update outdated packages” is **not** permission.

Hold without asking again: prerelease Latest (`-rc`, `-beta`, `-canary`) of a new major; `@types/node` Latest whose major ≠ `engines.node` / the Node this app runs.

### Notes

For **every minor and every permitted major**, read upstream release notes or upgrade docs covering Current → target (GitHub Releases, changelog, official upgrade guide). Grep this repo for how the package is used.

Done for notes when you can state, for each package: target version, breaking or behavior changes that hit this repo, required code or install follow-through, or “none, apply as pin bump”.

Opt-in flags in a minor (example: Next Cache Components) stay off unless the notes say the bump itself requires them.

### Apply

Install with Bun and exact versions:

```bash
bun add pkg@x.y.z
bun add -d pkg@x.y.z
```

Bump companions together. Skip held packages.

If notes require code changes, make them in the same pass (codemods, import moves, config, `bunx playwright install` for Playwright).

### Follow-through

Re-run `bun outdated`. Expected leftover: held majors, RCs, and mismatched `@types/node`.

Run whatever the notes named (Playwright browsers, `prisma generate`). Do not commit unless asked.

### Report

List applied pins, code/follow-through done, and held packages with the one-line reason. For held majors, say what taking them would entail so the user can grant permission.

## Completeness

Every `bun outdated` row is applied, applied-with-code, or held with a reason. No Latest major is installed without permission.
