# Test Suite - Installation and Usage Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

This will install all the new testing dependencies:
- vitest@^2.1.8
- @testing-library/react@^16.1.0
- @testing-library/jest-dom@^6.6.3
- @testing-library/user-event@^14.5.2
- jsdom@^25.0.1

### 2. Run Tests
```bash
# Run all tests once
npm test

# Run tests in watch mode (recommended for development)
npm test -- --watch

# Run tests with UI interface
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## What Was Generated

### Test Files (250+ tests total)
1. **src/App.test.jsx** - 40+ tests for App component
2. **src/components/Welcome.test.jsx** - 80+ comprehensive tests
3. **src/components/Welcome.utils.test.jsx** - 60+ utility and edge case tests
4. **src/components/index.test.js** - 30+ export validation tests
5. **src/integration.test.jsx** - 50+ integration tests
6. **package.test.js** - 40+ package.json validation tests
7. **vitest.config.test.js** - 30+ configuration validation tests

### Configuration Files
- **vitest.config.js** - Vitest configuration with React and path aliases
- **src/test/setup.js** - Global test setup with GSAP mocking

### Documentation
- **src/test/README.md** - Detailed testing guide
- **TEST_SUMMARY.md** - Comprehensive test suite overview
- **.test-setup-complete.md** - Setup completion reference
- **INSTALL_AND_RUN.md** - This file

## Test Coverage

### Components Tested
✅ **App.jsx** - Main application component
✅ **Welcome.jsx** - Welcome section with GSAP animations
✅ **index.js** - Component exports barrel file

### What's Tested
- ✅ Component rendering and DOM structure
- ✅ CSS classes and styling application
- ✅ GSAP animation setup and cleanup
- ✅ Mouse event handlers (mousemove, mouseleave)
- ✅ Text rendering and character wrapping
- ✅ Font weight calculations and interpolation
- ✅ Mathematical intensity calculations
- ✅ React refs and lifecycle management
- ✅ Accessibility (semantic HTML, ARIA, screen readers)
- ✅ Edge cases and error handling
- ✅ Performance (render times, DOM node counts)
- ✅ Integration (component composition, data flow)
- ✅ Module exports and imports
- ✅ Package configuration validation

## Example Test Output

When you run `npm test`, you'll see output like: