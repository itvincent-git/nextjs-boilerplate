# Gemini Project Configuration

This file provides context about the project's setup to help Gemini assist with development.

## Project Overview

- **Name**: next-elelive-home
- **Framework**: Next.js
- **UI**: Radix UI, shadcn/ui, Tailwind CSS
- **State Management**: Zustand
- **Forms**: React Hook Form, Zod
- **i18n**: next-intl
- **Linting/Formatting**: ESLint, Prettier, lint-staged, husky

## Important Scripts

- `pnpm dev`: Starts the development server.
- `pnpm build`: Builds the application for production.
- `pnpm start`: Starts the production server.
- `pnpm lint`: Lints the codebase.
- `pnpm lint --fix`: Lints and automatically fixes issues.

## Coding Style

- **Formatting**: Managed by Prettier.
  - No semicolons.
  - Single quotes.
  - Trailing commas on all multiline expressions.
- **Linting**: Managed by ESLint, extending `next/core-web-vitals` and `next/typescript`.
- **Pre-commit Hook**: `lint-staged` is configured to run `pnpm lint --fix` on staged files.

## Dependencies

### Core

- `next`: ^15.3.1
- `react`: ^19.1.0
- `react-dom`: ^19.1.0
- `typescript`: ^5.8.3

### UI & Styling

- `@radix-ui/*`: Various UI components
- `shadcn/ui`: Component library built on Radix and Tailwind
- `tailwindcss`: ^3.4.17
- `lucide-react`: Icons
- `next-themes`: Theme management

### State Management

- `zustand`: ^5.0.3

### Forms

- `react-hook-form`: ^7.55.0
- `zod`: ^3.24.3

### Internationalization

- `next-intl`: ^4.0.2

### Tooling

- `eslint`: ^9.24.0
- `prettier`: ^5.2.6
- `husky`: ^8.0.3
- `lint-staged`: ^15.5.1
