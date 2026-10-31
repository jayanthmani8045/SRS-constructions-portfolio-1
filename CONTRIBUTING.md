# SRS Constructions — Development Workflow

## Branching strategy

The `main` branch contains validated application code.

All future development must happen on a separate branch.

Branch naming:

- `feature/<description>` — New features
- `fix/<description>` — Bug fixes

Use lowercase descriptive names separated by hyphens.

Examples:

- `feature/homepage`
- `feature/projects-gallery`
- `fix/mobile-navigation`

## Creating a development branch

After the initial baseline is published:

```bash
git switch main
git pull --ff-only origin main
git switch -c feature/my-feature
```

Never develop directly on `main`.

## Local validation

Before submitting a pull request, run:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test:e2e
npm run build
```

The `test:e2e` command will be introduced in Step 5.

All automated tests must be maintained under `tests/`.

## Pull request process

1. Develop and validate changes on a feature or fix branch.
2. Add or update automated tests for affected behavior.
3. Push the branch to GitHub.
4. Open a pull request targeting `main`.
5. Wait for GitHub Actions CI to complete.
6. Resolve every failed required check.
7. Merge only when all required checks pass.

## Merge policy

- No direct feature-development commits to `main`.
- No merging with failed or missing required checks.
- No skipping automated tests.
- No bypassing branch protection.
- Do not commit passwords, tokens, or `.env.local`.

Branch protection will be configured after the initial CI
baseline is available on GitHub.
