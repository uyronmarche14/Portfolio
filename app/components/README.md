# Components Directory

This directory contains all React components organized by their purpose and scope.

## Structure

```
components/
├── ui/           # Base design system components (buttons, inputs, cards, etc.)
├── layout/       # Layout-specific components (page layouts, navigation)
└── features/     # Feature-specific components organized by domain
    ├── portfolio/
    ├── projects/
    ├── contact/
    └── about/
```

## Guidelines

- **UI Components**: Reusable, generic components that form the design system
- **Layout Components**: Components responsible for page structure and navigation
- **Feature Components**: Domain-specific components that implement business logic

## Naming Conventions

- Use PascalCase for component names
- Use descriptive names that clearly indicate the component's purpose
- Prefer composition over inheritance
- Keep components focused on a single responsibility