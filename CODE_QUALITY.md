# Code Quality Configuration

This document outlines the code quality tools and configurations set up for the portfolio project.

## Overview

The project uses a comprehensive code quality setup including:

- **ESLint** for code linting and style enforcement
- **Prettier** for code formatting
- **TypeScript** for type checking
- **Pre-commit hooks** for automated quality checks
- **VS Code settings** for consistent IDE experience
- **GitHub Actions** for CI/CD quality checks

## Configuration Files

### ESLint Configuration (`eslint.config.mjs`)

The ESLint configuration includes:

- **Import ordering**: Enforces consistent import organization with React and Next.js imports first, followed by external packages, then internal modules
- **TypeScript rules**: Strict TypeScript linting with unused variable detection and consistent type imports
- **React rules**: React-specific linting including hooks rules and JSX best practices
- **Accessibility rules**: Enhanced a11y rules for better accessibility compliance
- **Code quality rules**: General code quality enforcement including no-console warnings and prefer-const

### Prettier Configuration (`.prettierrc`)

Prettier is configured with:

- 2-space indentation
- Semicolons enabled
- Double quotes for strings
- 80 character line width
- Tailwind CSS plugin for class sorting

### TypeScript Configuration (`tsconfig.json`)

Path aliases are configured for clean imports:

```json
{
  "paths": {
    "@/*": ["./app/*"],
    "@/components/*": ["./app/components/*"],
    "@/lib/*": ["./app/lib/*"],
    "@/content/*": ["./app/content/*"],
    "@/types/*": ["./app/lib/types/*"],
    "@/data/*": ["./app/lib/data/*"],
    "@/hooks/*": ["./app/lib/hooks/*"],
    "@/utils/*": ["./app/lib/utils/*"]
  }
}
```

## Available Scripts

### Quality Check Scripts

```bash
# Run all quality checks
npm run quality:check

# Fix all auto-fixable issues
npm run quality:fix

# Individual checks
npm run type-check    # TypeScript type checking
npm run lint          # ESLint linting
npm run lint:fix      # Auto-fix ESLint issues
npm run format        # Format code with Prettier
npm run format:check  # Check code formatting

# Pre-commit check (runs automatically on commit)
npm run pre-commit
```

## Pre-commit Hooks

A pre-commit hook is configured to automatically run quality checks before each commit:

1. **Type checking** - Ensures no TypeScript errors
2. **Linting** - Ensures code follows ESLint rules
3. **Format checking** - Ensures code is properly formatted

If any check fails, the commit is blocked with helpful error messages.

## VS Code Integration

The `.vscode/settings.json` file configures:

- **Format on save** with Prettier
- **Auto-fix ESLint issues** on save
- **Auto-organize imports** on save
- **Tailwind CSS IntelliSense** support
- **TypeScript import preferences**

## EditorConfig

The `.editorconfig` file ensures consistent coding style across different editors:

- UTF-8 encoding
- LF line endings
- 2-space indentation for JS/TS/JSON/CSS files
- Trim trailing whitespace
- Insert final newline

## GitHub Actions

The `.github/workflows/quality-check.yml` workflow runs on:

- Push to main/develop branches
- Pull requests to main/develop branches

It tests against Node.js versions 18.x and 20.x and runs:

1. Type checking
2. Linting
3. Format checking
4. Build verification

## Import Organization

Imports are automatically organized in the following order:

1. **React imports** (react, react-dom)
2. **Next.js imports** (next/\*)
3. **External packages** (third-party libraries)
4. **Internal modules** (@/\* path aliases)
5. **Relative imports** (./_, ../_)

Example:

```typescript
import React from "react";

import { NextPage } from "next";
import Link from "next/link";

import { motion } from "framer-motion";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { useProjects } from "@/lib/hooks/useProjects";
import { Project } from "@/lib/types/project";

import { LocalComponent } from "./LocalComponent";
```

## Path Aliases Usage

Use path aliases consistently throughout the project:

```typescript
// ✅ Good - using path aliases
import { Button } from "@/components/ui/button";
import { useProjects } from "@/lib/hooks/useProjects";
import { Project } from "@/lib/types/project";

// ❌ Bad - using relative imports
import { Button } from "../../components/ui/button";
import { useProjects } from "../hooks/useProjects";
```

## Troubleshooting

### Common Issues

1. **Import order violations**: Run `npm run lint:fix` to auto-fix import ordering
2. **Formatting issues**: Run `npm run format` to auto-format code
3. **Type errors**: Check `npm run type-check` output for specific errors
4. **Pre-commit hook failures**: Run `npm run quality:fix` to resolve most issues

### Manual Quality Check

To manually run all quality checks:

```bash
npm run quality:check
```

This will run type checking, linting, and format checking in sequence.

## Best Practices

1. **Always use path aliases** instead of relative imports for internal modules
2. **Run quality checks** before committing code
3. **Fix linting warnings** promptly to maintain code quality
4. **Use TypeScript strictly** - avoid `any` types when possible
5. **Follow import organization** rules for consistency
6. **Write accessible code** - follow a11y guidelines enforced by ESLint

## IDE Recommendations

For the best development experience:

1. **VS Code Extensions**:
   - ESLint
   - Prettier - Code formatter
   - TypeScript Importer
   - Tailwind CSS IntelliSense
   - Auto Rename Tag

2. **Settings**: The project includes VS Code settings for optimal configuration

3. **Format on Save**: Enabled by default in the workspace settings
