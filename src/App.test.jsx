import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the components
vi.mock('#components', () => ({
  Navbar: () => <nav data-testid="navbar">Navbar</nav>,
  Welcome: () => <section data-testid="welcome">Welcome</section>,
}));

describe('App Component', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      expect(() => render(<App />)).not.toThrow();
    });

    it('should render the main element with App class', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
      expect(main).toHaveClass('App');
    });

    it('should render Navbar component', () => {
      render(<App />);
      const navbar = screen.getByTestId('navbar');
      expect(navbar).toBeInTheDocument();
    });

    it('should render Welcome component', () => {
      render(<App />);
      const welcome = screen.getByTestId('welcome');
      expect(welcome).toBeInTheDocument();
    });

    it('should render components in correct order', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');
      const children = Array.from(main.children);
      
      expect(children[0]).toHaveAttribute('data-testid', 'navbar');
      expect(children[1]).toHaveAttribute('data-testid', 'welcome');
    });
  });

  describe('Component Structure', () => {
    it('should have exactly two child components', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main.App');
      expect(main.children.length).toBe(2);
    });

    it('should use semantic HTML with main element', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    it('should properly import and use components from index', () => {
      // This tests that the import statement works correctly
      expect(() => render(<App />)).not.toThrow();
    });

    it('should maintain consistent layout structure', () => {
      const { container, rerender } = render(<App />);
      const initialStructure = container.innerHTML;
      
      rerender(<App />);
      expect(container.innerHTML).toBe(initialStructure);
    });
  });

  describe('Edge Cases', () => {
    it('should handle multiple renders without errors', () => {
      const { rerender } = render(<App />);
      expect(() => {
        rerender(<App />);
        rerender(<App />);
        rerender(<App />);
      }).not.toThrow();
    });

    it('should maintain component references across re-renders', () => {
      const { rerender } = render(<App />);
      const initialNavbar = screen.getByTestId('navbar');
      const initialWelcome = screen.getByTestId('welcome');
      
      rerender(<App />);
      
      expect(screen.getByTestId('navbar')).toBe(initialNavbar);
      expect(screen.getByTestId('welcome')).toBe(initialWelcome);
    });
  });

  describe('Accessibility', () => {
    it('should use semantic main element as root', () => {
      render(<App />);
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });

    it('should have proper landmark structure', () => {
      render(<App />);
      const main = screen.getByRole('main');
      expect(main).toHaveClass('App');
    });
  });

  describe('CSS Classes', () => {
    it('should apply App class to main element', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');
      expect(main).toHaveClass('App');
    });

    it('should not have any additional classes on main', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');
      expect(main.className).toBe('App');
    });
  });
});

describe('App Integration with Routing', () => {
  it('should render both navigation and content sections', () => {
    render(<App />);
    
    const navbar = screen.getByTestId('navbar');
    const welcome = screen.getByTestId('welcome');
    
    expect(navbar).toBeInTheDocument();
    expect(welcome).toBeInTheDocument();
  });

  it('should maintain proper component hierarchy', () => {
    const { container } = render(<App />);
    const main = container.querySelector('main.App');
    const nav = main.querySelector('[data-testid="navbar"]');
    const section = main.querySelector('[data-testid="welcome"]');
    
    expect(main).toContainElement(nav);
    expect(main).toContainElement(section);
  });
});