This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Issue Templates

This repository uses GitHub Issue Forms for structured backlog management.

### Available templates

- `New feature`: generic feature template.
- `Frontend feature (fast standard)`: frontend-focused template for fast, implementation-ready issues.
- `Bug`: bug report template.
- `Refactor`: refactor request template.

### Frontend feature (fast standard)

Use this template when creating frontend work items (pages, components, navigation, UX states, frontend validations, etc.).

Default metadata:

- Title prefix: `[Feat][Frontend]: `
- Labels: `inbox`, `frontend`
- Project: `UdL-EPS-SoftArch-Igualada/4`

Required fields:

- Feature description
- Goal / user value
- Postconditions
- Scope checklist (in-scope and out-of-scope explicitly confirmed)
- Acceptance criteria
- Mini demo / manual validation
- Story points

Optional fields:

- Preconditions
- UI routes/components affected
- Files to create/modify
- Testing notes
- Dependencies / blockers

Story points available:

- `0.25`, `0.5`, `1`, `2`, `3`, `4`, `5`, `8`

### How to create a frontend issue quickly

1. Go to **Issues** > **New issue**.
2. Select **Frontend feature (fast standard)**.
3. Fill the required fields first.
4. Add optional implementation hints (routes/files/tests) only if they help execution.
5. Submit the issue and move it through your normal project workflow.

### Practical writing guideline

Keep required fields concise and testable:

- Use observable acceptance criteria.
- Include a mini demo with reproducible steps and expected behavior.
- State scope boundaries to avoid hidden work.

## Getting Started

Install dependencies (only needed the first time, or when dependencies change):
```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
