import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

/**
 * Layout Component
 * 
 * Design Decision: Mobile-first container with max-width constraints
 * Rationale: Doctors often use mobile devices between patients, need responsive design
 * that works well on phones but scales nicely to tablets and desktop
 */
export function Layout({ children, className = "" }: LayoutProps) {
  return (
    <div className={`min-h-screen bg-gradient-subtle ${className}`}>
      <div className="mx-auto max-w-md min-h-screen bg-background shadow-soft md:my-4 md:rounded-lg md:max-w-lg">
        {children}
      </div>
    </div>
  );
}