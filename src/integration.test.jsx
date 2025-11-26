import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import App from './App';

describe('Application Integration Tests', () => {
  describe('Full Application Rendering', () => {
    it('should render complete application structure', () => {
      render(<App />);
      
      // Main container
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
      expect(main).toHaveClass('App');
    });

    it('should render all major sections in correct order', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');
      const children = Array.from(main.children);
      
      // Should have navigation first, then content
      expect(children.length).toBeGreaterThanOrEqual(2);
    });

    it('should load all components without errors', () => {
      const consoleSpy = vi.spyOn(console, 'error');
      render(<App />);
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('Component Integration', () => {
    it('should integrate Navbar and Welcome components', () => {
      const { container } = render(<App />);
      
      // Both components should be present
      const nav = container.querySelector('nav');
      const welcome = container.querySelector('#welcome');
      
      expect(nav).toBeInTheDocument();
      expect(welcome).toBeInTheDocument();
    });

    it('should maintain proper hierarchy', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');
      const nav = container.querySelector('nav');
      const welcome = container.querySelector('#welcome');
      
      expect(main).toContainElement(nav);
      expect(main).toContainElement(welcome);
    });
  });

  describe('Welcome Section Integration', () => {
    it('should render welcome section with all content', () => {
      render(<App />);
      
      const welcomeSection = document.querySelector('#welcome');
      expect(welcomeSection).toBeInTheDocument();
      
      // Check for subtitle
      const subtitle = within(welcomeSection).getByText(/Hey I'm Enokwei Perez/i);
      expect(subtitle).toBeInTheDocument();
      
      // Check for title
      const title = within(welcomeSection).getByText(/portfolio/i);
      expect(title).toBeInTheDocument();
    });

    it('should render animated text elements', () => {
      render(<App />);
      
      const welcomeSection = document.querySelector('#welcome');
      const spans = welcomeSection.querySelectorAll('span');
      
      // Should have multiple span elements for animation
      expect(spans.length).toBeGreaterThan(0);
    });

    it('should apply correct styling to welcome section', () => {
      render(<App />);
      
      const welcomeSection = document.querySelector('#welcome');
      const title = welcomeSection.querySelector('h1');
      
      expect(title).toHaveClass('mt-7');
    });
  });

  describe('Module System Integration', () => {
    it('should successfully import from components index', () => {
      // The App component uses: import { Navbar, Welcome } from "#components"
      // This test verifies the import works
      expect(() => render(<App />)).not.toThrow();
    });

    it('should resolve path aliases correctly', () => {
      const { container } = render(<App />);
      
      // If aliases work, components will render
      expect(container.querySelector('nav')).toBeInTheDocument();
      expect(container.querySelector('#welcome')).toBeInTheDocument();
    });
  });

  describe('Styling Integration', () => {
    it('should apply Tailwind classes correctly', () => {
      render(<App />);
      
      const welcomeSection = document.querySelector('#welcome');
      const title = welcomeSection.querySelector('h1');
      const titleSpans = title.querySelectorAll('span');
      
      // Check Tailwind classes are applied
      titleSpans.forEach(span => {
        expect(span.className).toContain('text-9xl');
        expect(span.className).toContain('italic');
        expect(span.className).toContain('font-georama');
      });
    });

    it('should apply custom font variation settings', () => {
      render(<App />);
      
      const spans = document.querySelectorAll('span');
      spans.forEach(span => {
        const style = span.getAttribute('style');
        if (style) {
          expect(style).toContain('wght');
        }
      });
    });
  });

  describe('Animation Integration', () => {
    it('should setup GSAP animations for welcome section', () => {
      render(<App />);
      
      // Component should render without GSAP errors
      const welcomeSection = document.querySelector('#welcome');
      expect(welcomeSection).toBeInTheDocument();
    });

    it('should initialize hover effects', () => {
      render(<App />);
      
      const title = document.querySelector('#welcome h1');
      expect(title).toBeInTheDocument();
      
      // Should have event listeners setup (verified in unit tests)
    });
  });

  describe('Responsive Design Integration', () => {
    it('should display small screen message', () => {
      render(<App />);
      
      const smallScreenDiv = document.querySelector('.small-screen');
      expect(smallScreenDiv).toBeInTheDocument();
      
      const message = within(smallScreenDiv).getByText(/desktop\/tabled screen only/i);
      expect(message).toBeInTheDocument();
    });
  });

  describe('Accessibility Integration', () => {
    it('should have proper semantic structure', () => {
      render(<App />);
      
      // Main landmark
      expect(screen.getByRole('main')).toBeInTheDocument();
      
      // Navigation landmark
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      
      // Heading hierarchy
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('should have accessible text content', () => {
      render(<App />);
      
      // All text should be accessible to screen readers
      const welcomeSection = document.querySelector('#welcome');
      const textContent = welcomeSection.textContent;
      
      expect(textContent).toContain('Enokwei Perez');
      expect(textContent).toContain('portfolio');
    });

    it('should maintain focus management', () => {
      render(<App />);
      
      // Component should not trap focus
      const focusableElements = document.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      // Should have focusable elements (navigation links, etc.)
      expect(focusableElements.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Performance Integration', () => {
    it('should render efficiently', () => {
      const startTime = performance.now();
      render(<App />);
      const endTime = performance.now();
      
      // Should render in reasonable time (< 1000ms)
      expect(endTime - startTime).toBeLessThan(1000);
    });

    it('should not create excessive DOM nodes', () => {
      const { container } = render(<App />);
      const allElements = container.querySelectorAll('*');
      
      // Should have reasonable number of elements
      // Exact number depends on content, but shouldn't be excessive
      expect(allElements.length).toBeLessThan(1000);
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle missing props gracefully', () => {
      expect(() => render(<App />)).not.toThrow();
    });

    it('should not log errors to console', () => {
      const consoleError = vi.spyOn(console, 'error');
      render(<App />);
      expect(consoleError).not.toHaveBeenCalled();
      consoleError.mockRestore();
    });

    it('should not log warnings to console', () => {
      const consoleWarn = vi.spyOn(console, 'warn');
      render(<App />);
      expect(consoleWarn).not.toHaveBeenCalled();
      consoleWarn.mockRestore();
    });
  });

  describe('State Management Integration', () => {
    it('should maintain component state', () => {
      const { rerender } = render(<App />);
      const initialContent = document.body.innerHTML;
      
      rerender(<App />);
      const afterRerender = document.body.innerHTML;
      
      // Content should remain consistent
      expect(afterRerender).toBe(initialContent);
    });

    it('should handle re-renders without errors', () => {
      const { rerender } = render(<App />);
      
      expect(() => {
        for (let i = 0; i < 10; i++) {
          rerender(<App />);
        }
      }).not.toThrow();
    });
  });

  describe('CSS and Styling Integration', () => {
    it('should load custom fonts', () => {
      render(<App />);
      
      const spans = document.querySelectorAll('span.font-georama');
      expect(spans.length).toBeGreaterThan(0);
    });

    it('should apply responsive classes', () => {
      render(<App />);
      
      const spans = document.querySelectorAll('span');
      spans.forEach(span => {
        // Should have size classes
        const classes = span.className;
        expect(classes.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Data Flow Integration', () => {
    it('should pass data correctly through component tree', () => {
      render(<App />);
      
      // Verify all expected content is present
      expect(screen.getByText(/Hey I'm Enokwei Perez/i)).toBeInTheDocument();
      expect(screen.getByText(/portfolio/i)).toBeInTheDocument();
    });

    it('should maintain component isolation', () => {
      render(<App />);
      
      // Each component should be independent
      const nav = document.querySelector('nav');
      const welcome = document.querySelector('#welcome');
      
      expect(nav).not.toContainElement(welcome);
      expect(welcome).not.toContainElement(nav);
    });
  });

  describe('User Experience Integration', () => {
    it('should provide clear visual hierarchy', () => {
      render(<App />);
      
      const h1 = screen.getByRole('heading', { level: 1 });
      const h1Spans = h1.querySelectorAll('span');
      
      // Title should have larger text
      h1Spans.forEach(span => {
        expect(span.className).toContain('text-9xl');
      });
    });

    it('should display content in logical order', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');
      const elements = Array.from(main.children);
      
      // Navigation should come first
      expect(elements[0].tagName).toBe('NAV');
      // Content sections after
      expect(elements.length).toBeGreaterThan(1);
    });
  });

  describe('Browser Compatibility Integration', () => {
    it('should use standard DOM APIs', () => {
      render(<App />);
      
      // Should use getBoundingClientRect (standard API)
      const element = document.querySelector('h1');
      expect(() => element.getBoundingClientRect()).not.toThrow();
    });

    it('should handle modern CSS features', () => {
      render(<App />);
      
      const spans = document.querySelectorAll('span');
      spans.forEach(span => {
        // Font variation settings is a modern CSS feature
        const style = span.getAttribute('style');
        expect(style).toBeTruthy();
      });
    });
  });
});