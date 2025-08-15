# Modern Portfolio Application

A modern, responsive portfolio website built with Next.js 15, TypeScript, and React 19. Features a clean architecture with type-safe data management, comprehensive component library, and optimized performance.

## ✨ Features

- **Modern Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Type-Safe**: Comprehensive TypeScript coverage with runtime validation
- **Component Library**: Reusable UI components with Shadcn/UI integration
- **Responsive Design**: Mobile-first approach with dark/light theme support
- **Performance Optimized**: Code splitting, image optimization, and caching
- **Accessibility**: WCAG compliant with comprehensive a11y testing
- **Clean Architecture**: Repository pattern with separation of concerns

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or 20.x
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
app/
├── components/           # Reusable UI components
│   ├── ui/              # Base design system components
│   ├── layout/          # Layout-specific components
│   ├── features/        # Feature-specific components
│   └── providers/       # Context providers
├── lib/                 # Utilities and shared logic
│   ├── types/           # TypeScript type definitions
│   ├── data/            # Data access layer
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   └── validation/      # Runtime validation schemas
├── content/             # Static content and data
├── projects/            # Project-specific pages
└── globals.css          # Global styles
```

## 🛠️ Available Scripts

### Development

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # Run TypeScript type checking
```

### Testing

```bash
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run test:ci      # Run tests for CI
```

### Quality Assurance

```bash
npm run quality:check # Run all quality checks
npm run quality:fix   # Fix all auto-fixable issues
npm run pre-commit    # Pre-commit quality check
```

## 🏗️ Architecture

### Component Architecture

The application follows a hierarchical component structure:

- **UI Components**: Reusable design system components
- **Layout Components**: Page structure and navigation
- **Feature Components**: Domain-specific business logic

### Data Layer

Implements a repository pattern with:

- **Type-safe interfaces** for all data models
- **Runtime validation** with Zod schemas
- **Repository pattern** for data access
- **Custom hooks** for state management

### Path Aliases

Clean imports with configured path aliases:

```typescript
import { Button } from "@/components/ui/button";
import { useProjects } from "@/lib/hooks/useProjects";
import { Project } from "@/lib/types/project";
```

## 📚 Documentation

Comprehensive documentation is available:

- **[Architecture Guide](./ARCHITECTURE.md)** - Detailed architecture overview
- **[Component Documentation](./COMPONENTS.md)** - Component usage and examples
- **[Data Models](./DATA_MODELS.md)** - Data models and API interfaces
- **[Code Quality](./CODE_QUALITY.md)** - Code quality tools and standards

### Component READMEs

Each major directory includes specific documentation:

- **[Components README](./app/components/README.md)** - Component organization
- **[Lib README](./app/lib/README.md)** - Utilities and shared logic
- **[Content README](./app/content/README.md)** - Content management

## 🎨 Styling

### Tailwind CSS

The project uses Tailwind CSS with:

- **Custom design tokens** for consistent theming
- **Dark/light mode** support
- **Responsive design** utilities
- **Component variants** with class-variance-authority

### Design System

Built on Shadcn/UI with custom extensions:

- **Consistent spacing** and typography
- **Accessible color palettes**
- **Reusable component variants**
- **Animation utilities** with Framer Motion

## 🔧 Configuration

### TypeScript

Strict TypeScript configuration with path aliases:

```json
{
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./app/*"],
      "@/components/*": ["./app/components/*"],
      "@/lib/*": ["./app/lib/*"]
    }
  }
}
```

### ESLint

Comprehensive linting with:

- **Import ordering** rules
- **TypeScript** specific rules
- **React** and **Next.js** best practices
- **Accessibility** rules

### Prettier

Code formatting with:

- **Consistent indentation** (2 spaces)
- **Tailwind CSS** class sorting
- **Import organization**

## 🧪 Testing

### Testing Stack

- **Jest** for unit testing
- **React Testing Library** for component testing
- **jest-axe** for accessibility testing

### Testing Patterns

```typescript
// Component testing
describe('ProjectCard', () => {
  it('renders project information', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('Project Title')).toBeInTheDocument();
  });

  it('should be accessible', async () => {
    const { container } = render(<ProjectCard project={mockProject} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## 🚀 Deployment

### Build Process

The application builds with:

- **Static optimization** for better performance
- **Image optimization** with Next.js Image
- **Bundle analysis** for size monitoring
- **Type checking** during build

### Environment Variables

Configure environment-specific settings:

```env
NEXT_PUBLIC_SITE_URL=https://yoursite.com
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

## 🤝 Contributing

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Run** quality checks: `npm run quality:check`
5. **Commit** your changes
6. **Push** to your branch
7. **Create** a Pull Request

### Code Standards

- **TypeScript** for all new code
- **ESLint** and **Prettier** compliance
- **Comprehensive tests** for new features
- **Accessibility** compliance
- **Documentation** updates

### Pre-commit Hooks

Automated quality checks run before each commit:

- Type checking
- Linting
- Format checking
- Test execution

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Next.js](https://nextjs.org)** - React framework
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS
- **[Shadcn/UI](https://ui.shadcn.com)** - Component library
- **[Framer Motion](https://framer.com/motion)** - Animation library
- **[Radix UI](https://radix-ui.com)** - Accessible components

## 📞 Support

For questions or support:

- **Documentation**: Check the comprehensive docs in this repository
- **Issues**: Create an issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions

---

Built with ❤️ using modern web technologies and best practices.
