# Contributing

Thanks for taking a look at Lume Fashion Commerce. This is a portfolio project, so contributions should preserve the goal: a polished, UX-first e-commerce demo with clear product reasoning and reliable quality checks.

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality Checklist

Run the relevant checks before opening a pull request:

```bash
npm run typecheck
npm run lint
npm run audit
npm run build
npm run test:e2e
```

For UI changes, include desktop and mobile screenshots in the pull request.

## Pull Request Guidelines

- Keep changes focused on one problem or improvement.
- Explain the user-facing behavior that changed.
- Update README or docs when setup, commands, architecture, or product scope changes.
- Do not commit secrets, tokens, real customer data, or generated build folders.
- Prefer accessible components, keyboard support, and clear empty/error states.

## Commit Style

Use short imperative commit messages, for example:

```text
fix: preserve catalog filters on reload
docs: add checkout testing notes
test: cover cart discount rule
```
