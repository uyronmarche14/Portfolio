"use client";

import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
}

const DefaultErrorFallback: React.FC<{ error: Error; retry: () => void }> = ({
  error,
  retry,
}) => (
  <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-8 text-center">
    <div className="mb-4 text-6xl">⚠️</div>
    <h2 className="mb-2 text-xl font-semibold text-red-800">
      Something went wrong
    </h2>
    <p className="mb-4 text-sm text-red-600">
      {error.message || "An unexpected error occurred"}
    </p>
    <button
      onClick={retry}
      className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
      Try again
    </button>
  </div>
);

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} retry={this.retry} />;
    }

    return this.props.children;
  }
}

// Portfolio-specific error boundary with section tracking
interface PortfolioErrorBoundaryProps {
  children: React.ReactNode;
  section?: string;
  fallback?: React.ComponentType<{ error: Error; retry: () => void; section?: string }>;
}

const PortfolioErrorFallback: React.FC<{ 
  error: Error; 
  retry: () => void; 
  section?: string 
}> = ({ error, retry, section }) => (
  <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-destructive/20 bg-destructive/5 p-6 text-center">
    <div className="mb-3 text-4xl">⚠️</div>
    <h3 className="mb-2 text-lg font-semibold text-destructive">
      Error in {section || 'component'}
    </h3>
    <p className="mb-4 text-sm text-muted-foreground max-w-md">
      {error.message || "Something went wrong in this section"}
    </p>
    <button
      onClick={retry}
      className="rounded-md bg-destructive px-3 py-1.5 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2"
    >
      Retry {section}
    </button>
  </div>
);

export class PortfolioErrorBoundary extends React.Component<
  PortfolioErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: PortfolioErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`PortfolioErrorBoundary caught an error in ${this.props.section}:`, error, errorInfo);
    
    // You can add error reporting service here
    // reportError(error, { section: this.props.section, errorInfo });
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || PortfolioErrorFallback;
      return (
        <FallbackComponent 
          error={this.state.error} 
          retry={this.retry} 
          section={this.props.section}
        />
      );
    }

    return this.props.children;
  }
}
