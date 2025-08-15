# Development Guide

## Overview

This guide provides comprehensive information for developers working on the portfolio application. It covers development setup, coding standards, testing practices, and contribution guidelines.

## Development Environment Setup

### Prerequisites

- **Node.js**: Version 18.x or 20.x (LTS recommended)
- **Package Manager**: npm, yarn, or pnpm
- **Git**: Latest version
- **VS Code**: Recommended IDE with extensions

### Recommended VS Code Extensions

Install these extensions for the best development experience:

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ]
}
```

### Environment Configuration

1. **Clone the repository**:

```bash
git clone <repository-url>
cd portfolio
```

2. **Install dependencies**:

```bash
npm install
```

3. **Set up environment variables** (if needed):

```bash
cp .env.example .env.local
# Edit .env.local with your values
```

4. **Start development server**:

```bash
npm run dev
```

## Project Architecture

### Directory Structure

```
app/
├── components/           # React components
│   ├── ui/              # Base UI components
│   │   ├── shadcn/      # Shadcn/UI components
│   │   └── ...          # Custom UI components
│   ├── layout/          # Layout components
│   ├── features/        # Feature-specific components
│   └── providers/       # Context providers
├── lib/                 # Shared utilities and logic
│   ├── types/           # TypeScript definitions
│   ├── data/            # Data layer
│   │   └── repositories/ # Repository implementations
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   └── validation/      # Zod schemas
├── content/             # Static content
├── projects/            # Project pages
└── globals.css          # Global styles
```

### Naming Conventions

#### Files and Directories

- **Components**: PascalCase (e.g., `ProjectCard.tsx`)
- **Hooks**: camelCase starting with "use" (e.g., `useProjects.ts`)
- **Utilities**: camelCase (e.g., `dataTransformation.ts`)
- **Types**: camelCase (e.g., `project.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)

#### Code

- **Variables**: camelCase (e.g., `projectData`)
- **Functions**: camelCase (e.g., `fetchProjects`)
- **Components**: PascalCase (e.g., `ProjectCard`)
- **Types/Interfaces**: PascalCase (e.g., `Project`, `ProjectCardProps`)
- **Enums**: PascalCase (e.g., `ProjectStatus`)

## Coding Standards

### TypeScript Guidelines

#### Type Definitions

```typescript
// ✅ Good - Explicit interface
interface ProjectCardProps {
  project: Project;
  onViewDetails?: (id: string) => void;
  className?: string;
}

// ❌ Bad - Using any
interface ProjectCardProps {
  project: any;
  onViewDetails?: any;
}
```

#### Type Imports

```typescript
// ✅ Good - Type-only imports
import type { Project } from "@/lib/types/project";
import type { FC } from "react";

// ✅ Good - Mixed imports
import { useState, type FC } from "react";
```

#### Generic Types

```typescript
// ✅ Good - Descriptive generic names
interface Repository<TEntity extends { id: string }> {
  getById(id: string): Promise<TEntity | null>;
}

// ❌ Bad - Single letter generics without context
interface Repository<T> {
  getById(id: string): Promise<T | null>;
}
```

### React Component Guidelines

#### Component Structure

```typescript
// ✅ Good - Well-structured component
import type { FC } from "react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/shadcn/button";
import { useProjects } from "@/lib/hooks/useProjects";
import type { Project } from "@/lib/types/project";

interface ProjectListProps {
  featured?: boolean;
  limit?: number;
  onProjectSelect?: (project: Project) => void;
}

export const ProjectList: FC<ProjectListProps> = ({
  featured = false,
  limit,
  onProjectSelect,
}) => {
  const { projects, loading, error } = useProjects({ featured, limit });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onViewDetails={() => onProjectSelect?.(project)}
        />
      ))}
    </div>
  );
};
```

#### Hooks Usage

```typescript
// ✅ Good - Custom hook with proper typing
export const useProjects = (options: ProjectOptions = {}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const data = await projectRepository.getAll();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, loading, error, refetch: fetchProjects };
};
```

### CSS and Styling Guidelines

#### Tailwind CSS Usage

```typescript
// ✅ Good - Semantic class grouping
<div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
    Title
  </h2>
  <p className="text-gray-600 dark:text-gray-300 text-center">
    Description
  </p>
</div>

// ❌ Bad - Unorganized classes
<div className="p-6 flex shadow-md bg-white rounded-lg flex-col dark:bg-gray-800 items-center justify-center">
```

#### Responsive Design

```typescript
// ✅ Good - Mobile-first responsive design
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
  {/* Content */}
</div>

// ✅ Good - Responsive typography
<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
  Responsive Title
</h1>
```

#### CSS Variables

```css
/* ✅ Good - Using CSS custom properties */
:root {
  --primary: 222.2 84% 4.9%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
}

.custom-component {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
```

## Testing Guidelines

### Unit Testing

#### Component Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ProjectCard } from '@/components/ui/projectCard';
import type { Project } from '@/lib/types/project';

expect.extend(toHaveNoViolations);

const mockProject: Project = {
  id: '1',
  title: 'Test Project',
  description: 'Test description',
  // ... other required properties
};

describe('ProjectCard', () => {
  it('renders project information correctly', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('calls onViewDetails when clicked', () => {
    const mockOnViewDetails = jest.fn();
    render(
      <ProjectCard
        project={mockProject}
        onViewDetails={mockOnViewDetails}
      />
    );

    fireEvent.click(screen.getByText('View Details'));
    expect(mockOnViewDetails).toHaveBeenCalledWith('1');
  });

  it('should not have accessibility violations', async () => {
    const { container } = render(<ProjectCard project={mockProject} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

#### Hook Testing

```typescript
import { renderHook, waitFor } from "@testing-library/react";
import { useProjects } from "@/lib/hooks/useProjects";

// Mock the repository
jest.mock("@/lib/data/repositories", () => ({
  RepositoryFactory: {
    getProjectRepository: () => ({
      getAll: jest.fn().mockResolvedValue([mockProject]),
    }),
  },
}));

describe("useProjects", () => {
  it("fetches projects successfully", async () => {
    const { result } = renderHook(() => useProjects());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.projects).toHaveLength(1);
    expect(result.current.error).toBeNull();
  });
});
```

### Integration Testing

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { ProjectsSection } from '@/components/features/projects/ProjectsSection';

describe('ProjectsSection Integration', () => {
  it('loads and displays projects', async () => {
    render(<ProjectsSection />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('My Projects')).toBeInTheDocument();
    });

    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });
});
```

## Git Workflow

### Branch Naming

- **Feature branches**: `feature/component-name` or `feature/feature-description`
- **Bug fixes**: `fix/bug-description`
- **Documentation**: `docs/documentation-update`
- **Refactoring**: `refactor/code-improvement`

### Commit Messages

Follow conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```
feat(components): add ProjectCard component

Add a reusable ProjectCard component with proper TypeScript types
and accessibility support.

Closes #123

fix(hooks): handle loading state in useProjects

The useProjects hook was not properly handling the loading state
when refetching data.

docs(readme): update installation instructions

Add missing steps for environment setup and clarify prerequisites.
```

### Pull Request Process

1. **Create feature branch** from `main`
2. **Make changes** following coding standards
3. **Write tests** for new functionality
4. **Run quality checks**: `npm run quality:check`
5. **Update documentation** if needed
6. **Create pull request** with:
   - Clear title and description
   - Link to related issues
   - Screenshots for UI changes
   - Test coverage information

### Pre-commit Hooks

Automated checks run before each commit:

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Format checking
npm run format:check

# Tests
npm run test:ci
```

## Performance Guidelines

### Code Splitting

```typescript
// ✅ Good - Route-based code splitting
const ProjectsPage = dynamic(() => import('./projects/page'), {
  loading: () => <ProjectsPageSkeleton />,
  ssr: true,
});

// ✅ Good - Component-based code splitting
const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyChart />
    </Suspense>
  );
}
```

### Image Optimization

```typescript
// ✅ Good - Optimized images
import { OptimizedImage } from "@/components/ui/OptimizedImage";

<OptimizedImage
  src="/project-screenshot.jpg"
  alt="Project screenshot"
  width={800}
  height={600}
  priority={false}
  placeholder="blur"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### Memoization

```typescript
// ✅ Good - Memoized expensive components
export const ProjectCard = React.memo<ProjectCardProps>(({ project, onViewDetails }) => {
  const handleClick = useCallback(() => {
    onViewDetails?.(project.id);
  }, [project.id, onViewDetails]);

  return (
    <Card onClick={handleClick}>
      {/* Component content */}
    </Card>
  );
});
```

## Accessibility Guidelines

### Semantic HTML

```typescript
// ✅ Good - Semantic HTML structure
<article className="project-card">
  <header>
    <h3>{project.title}</h3>
  </header>
  <main>
    <p>{project.description}</p>
  </main>
  <footer>
    <nav>
      <a href={project.demoUrl}>View Demo</a>
      <a href={project.githubUrl}>View Code</a>
    </nav>
  </footer>
</article>
```

### ARIA Labels

```typescript
// ✅ Good - Proper ARIA labels
<button
  aria-label={`View details for ${project.title}`}
  aria-expanded={isExpanded}
  aria-controls={`project-details-${project.id}`}
  onClick={handleToggle}
>
  <ChevronIcon aria-hidden="true" />
</button>

<div
  id={`project-details-${project.id}`}
  role="region"
  aria-labelledby={`project-title-${project.id}`}
>
  {/* Project details */}
</div>
```

### Keyboard Navigation

```typescript
// ✅ Good - Keyboard accessible
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
  onClick={handleClick}
>
  Clickable content
</div>
```

## Debugging

### Development Tools

1. **React Developer Tools**: Browser extension for React debugging
2. **TypeScript Error Lens**: VS Code extension for inline TypeScript errors
3. **Tailwind CSS IntelliSense**: VS Code extension for Tailwind classes
4. **Network Tab**: Browser dev tools for API debugging

### Common Issues

#### TypeScript Errors

```bash
# Check TypeScript errors
npm run type-check

# Common fixes
# 1. Update type definitions
# 2. Add proper type annotations
# 3. Check import paths
```

#### Import Errors

```bash
# Check path aliases in tsconfig.json
# Verify file exists at specified path
# Check for circular dependencies
```

#### Styling Issues

```bash
# Check Tailwind CSS compilation
npm run build

# Verify class names are correct
# Check for conflicting styles
# Ensure responsive classes are applied correctly
```

## Deployment

### Build Process

```bash
# Production build
npm run build

# Check build output
npm run start

# Analyze bundle
npm run analyze
```

### Environment Variables

```env
# .env.local (development)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ANALYTICS_ID=dev-analytics-id

# .env.production (production)
NEXT_PUBLIC_SITE_URL=https://yoursite.com
NEXT_PUBLIC_ANALYTICS_ID=prod-analytics-id
```

## Troubleshooting

### Common Development Issues

1. **Port already in use**:

```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
npm run dev -- -p 3001
```

2. **Module not found**:

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

3. **TypeScript errors after update**:

```bash
# Clear TypeScript cache
rm -rf .next
npm run type-check
```

4. **Styling not applied**:

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Getting Help

1. **Check documentation** in this repository
2. **Search existing issues** on GitHub
3. **Create new issue** with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment information

## Contributing

### Code Review Checklist

- [ ] Code follows TypeScript and React best practices
- [ ] Components are properly typed
- [ ] Tests are included for new functionality
- [ ] Accessibility guidelines are followed
- [ ] Documentation is updated
- [ ] Performance considerations are addressed
- [ ] Code is properly formatted and linted

### Release Process

1. **Update version** in `package.json`
2. **Update CHANGELOG.md** with new features and fixes
3. **Create release branch**: `release/v1.x.x`
4. **Run full test suite**: `npm run quality:check`
5. **Create pull request** to `main`
6. **Tag release** after merge
7. **Deploy to production**

This development guide ensures consistent, high-quality code and smooth collaboration across the team.
