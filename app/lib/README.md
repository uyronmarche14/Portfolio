# Lib Directory

This directory contains shared utilities, types, hooks, and data access logic.

## Structure

```
lib/
├── types/        # TypeScript type definitions
├── data/         # Data access layer and repositories
├── hooks/        # Custom React hooks
├── utils/        # Utility functions and helpers
└── utils.ts      # Main utility functions (existing)
```

## Guidelines

- **Types**: Define comprehensive TypeScript interfaces and types
- **Data**: Implement repository patterns and data transformation logic
- **Hooks**: Create reusable custom hooks for shared logic
- **Utils**: Pure functions for common operations and transformations

## Best Practices

- Keep functions pure and testable
- Use TypeScript for all files
- Export functions and types with clear, descriptive names
- Document complex logic with JSDoc comments