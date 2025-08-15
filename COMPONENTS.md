# Component Documentation

## Overview

This document provides comprehensive documentation for all components in the portfolio application, including usage examples, props interfaces, and best practices.

## Component Categories

### UI Components

Base design system components that form the foundation of the interface.

### Layout Components

Components responsible for page structure, navigation, and content organization.

### Feature Components

Domain-specific components that implement business logic and user interactions.

---

## UI Components (`@/components/ui/`)

### Shadcn/UI Components

#### Button

A versatile button component with multiple variants and sizes.

```typescript
import { Button } from "@/components/ui/shadcn/button";

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Ghost</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// With loading state
<Button disabled={loading}>
  {loading ? "Loading..." : "Submit"}
</Button>
```

**Props:**

```typescript
interface ButtonProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}
```

#### Card

A flexible card component for content containers.

```typescript
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/shadcn/card";

<Card>
  <CardHeader>
    <CardTitle>Project Title</CardTitle>
    <CardDescription>Brief project description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>View Project</Button>
  </CardFooter>
</Card>
```

#### Input

Form input component with consistent styling.

```typescript
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
</div>
```

### Custom UI Components

#### ProjectCard

Displays project information in a card format.

```typescript
import { ProjectCard } from "@/components/ui/projectCard";

<ProjectCard
  project={{
    id: "1",
    title: "Portfolio Website",
    description: "A modern portfolio built with Next.js",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    images: ["/project-image.jpg"],
    links: [
      { type: "github", url: "https://github.com/user/repo" },
      { type: "demo", url: "https://example.com" }
    ],
    status: "completed",
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }}
  onViewDetails={(id) => router.push(`/projects/${id}`)}
/>
```

**Props:**

```typescript
interface ProjectCardProps {
  project: Project;
  onViewDetails?: (id: string) => void;
  className?: string;
}
```

#### TechBadge

Displays technology badges with icons and colors.

```typescript
import { TechBadge } from "@/components/ui/TechBadge";

<TechBadge
  technology={{
    id: "react",
    name: "React",
    category: "frontend",
    icon: "react",
    color: "#61DAFB"
  }}
  size="sm"
/>
```

**Props:**

```typescript
interface TechBadgeProps {
  technology: Technology;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}
```

#### Timeline

Displays a timeline of events or experiences.

```typescript
import { Timeline } from "@/components/ui/Timeline";

<Timeline
  items={[
    {
      id: "1",
      title: "Senior Developer",
      subtitle: "Tech Company",
      date: "2023 - Present",
      description: "Leading development of web applications",
      icon: "briefcase"
    },
    {
      id: "2",
      title: "Full Stack Developer",
      subtitle: "Startup Inc",
      date: "2021 - 2023",
      description: "Built scalable web applications",
      icon: "code"
    }
  ]}
/>
```

#### OptimizedImage

Wrapper around Next.js Image with additional optimizations.

```typescript
import { OptimizedImage } from "@/components/ui/OptimizedImage";

<OptimizedImage
  src="/project-screenshot.jpg"
  alt="Project screenshot"
  width={800}
  height={600}
  priority={false}
  placeholder="blur"
  className="rounded-lg"
/>
```

#### LoadingSpinner

Animated loading indicator.

```typescript
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

<LoadingSpinner size="lg" />
<LoadingSpinner size="sm" className="text-blue-500" />
```

#### ErrorMessage

Displays error messages with consistent styling.

```typescript
import { ErrorMessage } from "@/components/ui/ErrorMessage";

<ErrorMessage
  title="Something went wrong"
  message="Unable to load projects. Please try again."
  onRetry={() => refetch()}
/>
```

---

## Layout Components (`@/components/layout/`)

### PageLayout

Main page wrapper providing consistent structure.

```typescript
import { PageLayout } from "@/components/layout/PageLayout";

<PageLayout
  title="Projects"
  description="Explore my latest projects and work"
  showNavigation={true}
  showFooter={true}
>
  <main>
    {/* Page content */}
  </main>
</PageLayout>
```

**Props:**

```typescript
interface PageLayoutProps {
  title?: string;
  description?: string;
  showNavigation?: boolean;
  showFooter?: boolean;
  className?: string;
  children: React.ReactNode;
}
```

### SectionLayout

Reusable section container with consistent spacing.

```typescript
import { SectionLayout } from "@/components/layout/SectionLayout";

<SectionLayout
  id="about"
  title="About Me"
  subtitle="Learn more about my background and experience"
  className="bg-gray-50"
>
  <div>
    {/* Section content */}
  </div>
</SectionLayout>
```

**Props:**

```typescript
interface SectionLayoutProps {
  id?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}
```

### Navigation

Header navigation component.

```typescript
import { Navigation } from "@/components/layout/Navigation";

<Navigation
  items={[
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ]}
  currentPath="/projects"
/>
```

### Container

Responsive container with consistent max-width and padding.

```typescript
import { Container } from "@/components/layout/Container";

<Container size="lg" className="py-8">
  <h1>Page Title</h1>
  <p>Content goes here</p>
</Container>
```

**Props:**

```typescript
interface ContainerProps {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
  children: React.ReactNode;
}
```

---

## Feature Components (`@/components/features/`)

### Portfolio Features

#### HeroSection

Main hero section for the homepage.

```typescript
import { HeroSection } from "@/components/features/portfolio/HeroSection";

<HeroSection
  title="John Doe"
  subtitle="Full Stack Developer"
  description="Building modern web applications with React and Node.js"
  ctaText="View My Work"
  ctaHref="/projects"
  backgroundImage="/hero-bg.jpg"
/>
```

#### HomeSection

Complete home page section with hero and introduction.

```typescript
import { HomeSection } from "@/components/features/portfolio/HomeSection";

<HomeSection />
```

### Project Features

#### ProjectsSection

Displays a grid of project cards.

```typescript
import { ProjectsSection } from "@/components/features/projects/ProjectsSection";

<ProjectsSection
  title="My Projects"
  subtitle="Explore my latest work and side projects"
  showFeaturedOnly={false}
  limit={6}
/>
```

**Props:**

```typescript
interface ProjectsSectionProps {
  title?: string;
  subtitle?: string;
  showFeaturedOnly?: boolean;
  limit?: number;
  className?: string;
}
```

### About Features

#### AboutSection

Complete about section with timeline and skills.

```typescript
import { AboutSection } from "@/components/features/about/AboutSection";

<AboutSection
  showTimeline={true}
  showSkills={true}
  showPersonalInfo={true}
/>
```

### Contact Features

#### ContactForm

Contact form with validation and submission handling.

```typescript
import { ContactForm } from "@/components/features/contact/ContactForm";

<ContactForm
  onSubmit={async (data) => {
    // Handle form submission
    await sendMessage(data);
  }}
  onSuccess={() => {
    // Handle success
    showToast("Message sent successfully!");
  }}
  onError={(error) => {
    // Handle error
    showToast("Failed to send message");
  }}
/>
```

#### ContactSection

Complete contact section with form and information.

```typescript
import { ContactSection } from "@/components/features/contact/ContactSection";

<ContactSection
  title="Get In Touch"
  subtitle="Let's discuss your next project"
  showContactInfo={true}
  showSocialLinks={true}
/>
```

---

## Component Patterns

### Compound Components

Many components use the compound component pattern for flexibility:

```typescript
// Card compound component
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description</Card.Description>
  </Card.Header>
  <Card.Content>Content</Card.Content>
  <Card.Footer>Footer</Card.Footer>
</Card>

// Timeline compound component
<Timeline>
  <Timeline.Item>
    <Timeline.Icon />
    <Timeline.Content>
      <Timeline.Title>Title</Timeline.Title>
      <Timeline.Description>Description</Timeline.Description>
    </Timeline.Content>
  </Timeline.Item>
</Timeline>
```

### Render Props Pattern

Some components use render props for maximum flexibility:

```typescript
<DataProvider
  source={() => fetchProjects()}
  render={({ data, loading, error }) => (
    <div>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage error={error} />}
      {data && <ProjectGrid projects={data} />}
    </div>
  )}
/>
```

### Custom Hooks Integration

Components integrate with custom hooks for state management:

```typescript
function ProjectsSection() {
  const { projects, loading, error, refetch } = useProjects();
  const { theme } = useTheme();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={refetch} />;

  return (
    <div className={`projects-section ${theme}`}>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

---

## Styling Guidelines

### Tailwind CSS Classes

Use consistent Tailwind CSS classes:

```typescript
// Spacing
className = "p-4 m-2 space-y-4 space-x-2";

// Layout
className = "flex flex-col items-center justify-between";
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

// Typography
className = "text-lg font-semibold text-gray-900 dark:text-gray-100";

// Colors
className =
  "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700";
```

### CSS Variables

Use CSS variables for consistent theming:

```css
:root {
  --primary: 222.2 84% 4.9%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
}
```

### Responsive Design

Follow mobile-first responsive design:

```typescript
className = "text-sm md:text-base lg:text-lg";
className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
className = "px-4 sm:px-6 lg:px-8";
```

---

## Accessibility Guidelines

### ARIA Labels

Provide appropriate ARIA labels:

```typescript
<button
  aria-label="Close modal"
  aria-expanded={isOpen}
  aria-controls="modal-content"
>
  <CloseIcon />
</button>
```

### Keyboard Navigation

Ensure keyboard accessibility:

```typescript
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
  onClick={handleClick}
>
  Clickable content
</div>
```

### Focus Management

Manage focus appropriately:

```typescript
useEffect(() => {
  if (isModalOpen) {
    modalRef.current?.focus();
  }
}, [isModalOpen]);
```

---

## Testing Components

### Unit Tests

Test individual component behavior:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectCard } from '@/components/ui/projectCard';

describe('ProjectCard', () => {
  const mockProject = {
    id: '1',
    title: 'Test Project',
    description: 'Test description',
    // ... other properties
  };

  it('renders project information', () => {
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
});
```

### Accessibility Tests

Test accessibility compliance:

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('should not have accessibility violations', async () => {
  const { container } = render(<ProjectCard project={mockProject} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## Performance Considerations

### Memoization

Use React.memo for expensive components:

```typescript
export const ProjectCard = React.memo<ProjectCardProps>(
  ({ project, onViewDetails }) => {
    // Component implementation
  }
);
```

### Lazy Loading

Lazy load heavy components:

```typescript
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

Optimize images with Next.js Image:

```typescript
<OptimizedImage
  src="/large-image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={false}
  placeholder="blur"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

This component documentation provides comprehensive guidance for using and maintaining all components in the portfolio application.
