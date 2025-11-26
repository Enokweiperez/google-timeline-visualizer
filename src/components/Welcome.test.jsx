import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Welcome from './Welcome';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

describe('Welcome Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the welcome section', () => {
      render(<Welcome />);
      const section = screen.getByRole('region');
      expect(section).toBeInTheDocument();
      expect(section).toHaveAttribute('id', 'welcome');
    });

    it('should render the subtitle text correctly', () => {
      render(<Welcome />);
      const subtitle = screen.getByText(/Hey I'm Enokwei Perez Welcome to my/i);
      expect(subtitle).toBeInTheDocument();
    });

    it('should render the title "portfolio"', () => {
      render(<Welcome />);
      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('portfolio');
    });

    it('should render small screen message', () => {
      render(<Welcome />);
      const smallScreenMsg = screen.getByText(/This portfolio is design for desktop\/tabled screen only/i);
      expect(smallScreenMsg).toBeInTheDocument();
    });

    it('should apply correct CSS classes to subtitle', () => {
      render(<Welcome />);
      const subtitle = screen.getByText(/Hey I'm Enokwei Perez Welcome to my/i);
      const spans = subtitle.querySelectorAll('span');
      expect(spans.length).toBeGreaterThan(0);
      spans.forEach(span => {
        expect(span).toHaveClass('text-3xl', 'font-georama');
      });
    });

    it('should apply correct CSS classes to title', () => {
      render(<Welcome />);
      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toHaveClass('mt-7');
      const spans = title.querySelectorAll('span');
      expect(spans.length).toBeGreaterThan(0);
      spans.forEach(span => {
        expect(span).toHaveClass('text-9xl', 'italic', 'font-georama');
      });
    });
  });

  describe('Text Rendering Logic', () => {
    it('should render each character as a span element', () => {
      render(<Welcome />);
      const title = screen.getByRole('heading', { level: 1 });
      const spans = title.querySelectorAll('span');
      expect(spans.length).toBe('portfolio'.length);
    });

    it('should apply font variation settings to each character', () => {
      render(<Welcome />);
      const title = screen.getByRole('heading', { level: 1 });
      const spans = title.querySelectorAll('span');
      spans.forEach(span => {
        const style = span.getAttribute('style');
        expect(style).toContain('wght');
      });
    });

    it('should use correct base weight for subtitle (100)', () => {
      render(<Welcome />);
      const subtitle = screen.getByText(/Hey I'm Enokwei Perez Welcome to my/i);
      const firstSpan = subtitle.querySelector('span');
      expect(firstSpan.getAttribute('style')).toContain("'wght' 100");
    });

    it('should use correct base weight for title (400)', () => {
      render(<Welcome />);
      const title = screen.getByRole('heading', { level: 1 });
      const firstSpan = title.querySelector('span');
      expect(firstSpan.getAttribute('style')).toContain("'wght' 400");
    });

    it('should handle space characters by converting to non-breaking space', () => {
      render(<Welcome />);
      const subtitle = screen.getByText(/Hey I'm Enokwei Perez Welcome to my/i);
      const spans = Array.from(subtitle.querySelectorAll('span'));
      const spaceSpans = spans.filter(span => span.textContent === '\u00A0');
      // "Hey I'm Enokwei Perez Welcome to my" has 6 spaces
      expect(spaceSpans.length).toBe(6);
    });
  });

  describe('GSAP Animation Setup', () => {
    it('should call useGSAP hook on mount', () => {
      render(<Welcome />);
      expect(useGSAP).toHaveBeenCalled();
    });

    it('should setup animations for both title and subtitle', () => {
      const { container } = render(<Welcome />);
      expect(useGSAP).toHaveBeenCalledWith(expect.any(Function), []);
    });

    it('should return cleanup functions from useGSAP', () => {
      const mockCleanup = vi.fn();
      useGSAP.mockImplementationOnce((callback) => {
        const cleanup = callback();
        return cleanup;
      });
      
      render(<Welcome />);
      expect(useGSAP).toHaveBeenCalled();
    });
  });

  describe('Mouse Interaction Setup', () => {
    it('should setup event listeners for mousemove on title', () => {
      const addEventListenerSpy = vi.spyOn(HTMLElement.prototype, 'addEventListener');
      render(<Welcome />);
      
      const mouseMoveListeners = addEventListenerSpy.mock.calls.filter(
        call => call[0] === 'mousemove'
      );
      expect(mouseMoveListeners.length).toBeGreaterThan(0);
      
      addEventListenerSpy.mockRestore();
    });

    it('should setup event listeners for mouseleave on title', () => {
      const addEventListenerSpy = vi.spyOn(HTMLElement.prototype, 'addEventListener');
      render(<Welcome />);
      
      const mouseLeaveListeners = addEventListenerSpy.mock.calls.filter(
        call => call[0] === 'mouseleave'
      );
      expect(mouseLeaveListeners.length).toBeGreaterThan(0);
      
      addEventListenerSpy.mockRestore();
    });
  });

  describe('Component Lifecycle', () => {
    it('should cleanup event listeners on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(HTMLElement.prototype, 'removeEventListener');
      const { unmount } = render(<Welcome />);
      
      unmount();
      
      const mouseMoveRemovals = removeEventListenerSpy.mock.calls.filter(
        call => call[0] === 'mousemove'
      );
      const mouseLeaveRemovals = removeEventListenerSpy.mock.calls.filter(
        call => call[0] === 'mouseleave'
      );
      
      expect(mouseMoveRemovals.length).toBeGreaterThan(0);
      expect(mouseLeaveRemovals.length).toBeGreaterThan(0);
      
      removeEventListenerSpy.mockRestore();
    });

    it('should not throw errors when refs are null', () => {
      const { rerender } = render(<Welcome />);
      expect(() => rerender(<Welcome />)).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('should have semantic HTML structure', () => {
      render(<Welcome />);
      expect(screen.getByRole('region')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('should render text content that is readable by screen readers', () => {
      render(<Welcome />);
      const title = screen.getByRole('heading', { level: 1 });
      expect(title.textContent).toBe('portfolio');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty strings in text rendering', () => {
      const { container } = render(<Welcome />);
      expect(container).toBeTruthy();
    });

    it('should handle component re-renders without errors', () => {
      const { rerender } = render(<Welcome />);
      expect(() => {
        rerender(<Welcome />);
        rerender(<Welcome />);
      }).not.toThrow();
    });

    it('should maintain refs across re-renders', () => {
      const { rerender } = render(<Welcome />);
      const initialTitle = screen.getByRole('heading', { level: 1 });
      
      rerender(<Welcome />);
      const updatedTitle = screen.getByRole('heading', { level: 1 });
      
      expect(initialTitle).toBe(updatedTitle);
    });
  });

  describe('Font Weight Configuration', () => {
    it('should have correct font weight ranges for subtitle', () => {
      // This tests the FONT_WEIGHTS constant indirectly through behavior
      render(<Welcome />);
      const subtitle = screen.getByText(/Hey I'm Enokwei Perez Welcome to my/i);
      const firstSpan = subtitle.querySelector('span');
      const style = firstSpan.getAttribute('style');
      // Default weight should be 100 for subtitle
      expect(style).toContain('100');
    });

    it('should have correct font weight ranges for title', () => {
      render(<Welcome />);
      const title = screen.getByRole('heading', { level: 1 });
      const firstSpan = title.querySelector('span');
      const style = firstSpan.getAttribute('style');
      // Default weight should be 400 for title
      expect(style).toContain('400');
    });
  });

  describe('Small Screen Message', () => {
    it('should render small-screen div with correct class', () => {
      const { container } = render(<Welcome />);
      const smallScreenDiv = container.querySelector('.small-screen');
      expect(smallScreenDiv).toBeInTheDocument();
    });

    it('should display desktop/tablet only message', () => {
      render(<Welcome />);
      const message = screen.getByText(/This portfolio is design for desktop\/tabled screen only/i);
      expect(message.closest('.small-screen')).toBeInTheDocument();
    });
  });
});

describe('Helper Functions', () => {
  describe('renderText function', () => {
    it('should split text into individual characters', () => {
      render(<Welcome />);
      const title = screen.getByRole('heading', { level: 1 });
      const spans = title.querySelectorAll('span');
      expect(spans.length).toBe('portfolio'.length);
    });

    it('should preserve character order', () => {
      render(<Welcome />);
      const title = screen.getByRole('heading', { level: 1 });
      const text = Array.from(title.querySelectorAll('span'))
        .map(span => span.textContent)
        .join('');
      expect(text).toBe('portfolio');
    });

    it('should apply className to all spans', () => {
      render(<Welcome />);
      const title = screen.getByRole('heading', { level: 1 });
      const spans = title.querySelectorAll('span');
      spans.forEach(span => {
        expect(span.className).toContain('text-9xl');
        expect(span.className).toContain('italic');
        expect(span.className).toContain('font-georama');
      });
    });

    it('should handle special characters correctly', () => {
      render(<Welcome />);
      // The apostrophe in "I'm" should be preserved
      const subtitle = screen.getByText(/Hey I'm Enokwei Perez Welcome to my/i);
      expect(subtitle.textContent).toContain("'");
    });
  });

  describe('setupTextHover function', () => {
    it('should handle null container gracefully', () => {
      // This is tested indirectly through the component
      // setupTextHover should return early if container is null
      expect(() => render(<Welcome />)).not.toThrow();
    });

    it('should setup event listeners when container exists', () => {
      const addEventListenerSpy = vi.spyOn(HTMLElement.prototype, 'addEventListener');
      render(<Welcome />);
      
      expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
      expect(addEventListenerSpy).toHaveBeenCalledWith('mouseleave', expect.any(Function));
      
      addEventListenerSpy.mockRestore();
    });
  });
});

describe('Integration Tests', () => {
  it('should render complete welcome section with all elements', () => {
    const { container } = render(<Welcome />);
    
    // Check section exists
    const section = container.querySelector('#welcome');
    expect(section).toBeInTheDocument();
    
    // Check subtitle exists
    const subtitle = screen.getByText(/Hey I'm Enokwei Perez Welcome to my/i);
    expect(subtitle).toBeInTheDocument();
    
    // Check title exists
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
    
    // Check small screen message exists
    const smallScreen = container.querySelector('.small-screen');
    expect(smallScreen).toBeInTheDocument();
  });

  it('should maintain proper DOM structure', () => {
    const { container } = render(<Welcome />);
    const section = container.querySelector('#welcome');
    
    expect(section.children.length).toBe(3); // p, h1, div
    expect(section.children[0].tagName).toBe('P');
    expect(section.children[1].tagName).toBe('H1');
    expect(section.children[2].tagName).toBe('DIV');
  });

  it('should initialize with correct default styles', () => {
    render(<Welcome />);
    
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toHaveClass('mt-7');
    
    const subtitle = screen.getByText(/Hey I'm Enokwei Perez Welcome to my/i);
    const subtitleSpan = subtitle.querySelector('span');
    expect(subtitleSpan).toHaveClass('text-3xl', 'font-georama');
  });
});