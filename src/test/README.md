# Test Suite Documentation

This directory contains the test setup and utilities for the React Portfolio project.

## Test Framework

- **Vitest**: Fast unit test framework for Vite projects
- **React Testing Library**: Testing utilities for React components
- **@testing-library/jest-dom**: Custom matchers for DOM testing
- **@testing-library/user-event**: User interaction simulation

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Structure

### Unit Tests

- `src/App.test.jsx` - Tests for the main App component
- `src/components/Welcome.test.jsx` - Comprehensive tests for Welcome component
- `src/components/Welcome.utils.test.jsx` - Tests for internal logic and utilities
- `src/components/index.test.js` - Tests for component exports

### Test Coverage

The test suite covers:

1. **Component Rendering**: Verifies all components render correctly
2. **User Interactions**: Tests mouse events and hover effects
3. **GSAP Animations**: Validates animation setup and cleanup
4. **Accessibility**: Ensures semantic HTML and screen reader compatibility
5. **Edge Cases**: Tests error handling and boundary conditions
6. **Integration**: Validates component composition and data flow

## Test Setup

The `setup.js` file configures:

- Global test utilities
- GSAP mocking for consistent test behavior
- DOM cleanup between tests
- Window.matchMedia mock for responsive tests

## GSAP Mocking

GSAP is mocked globally to:
- Prevent actual animations during tests
- Ensure consistent and fast test execution
- Allow verification of animation calls
- Avoid timing-related test flakiness

## Writing New Tests

### Test Structure

```javascript
describe('ComponentName', () => {
  describe('Feature Category', () => {
    it('should do something specific', () => {
      // Arrange
      render(<Component />);
      
      // Act
      // ... user interactions
      
      // Assert
      expect(something).toBe(expected);
    });
  });
});
```

### Best Practices

1. **Descriptive Names**: Use clear, specific test descriptions
2. **AAA Pattern**: Follow Arrange-Act-Assert pattern
3. **One Assertion Per Test**: Focus tests on single behaviors
4. **Mock External Dependencies**: Use vi.mock() for GSAP, etc.
5. **Clean Up**: Let the setup file handle cleanup automatically
6. **Accessibility**: Test with screen reader-friendly queries

### Common Queries

```javascript
// Preferred (accessible)
screen.getByRole('button', { name: /click me/i });
screen.getByLabelText(/username/i);
screen.getByText(/welcome/i);

// By test ID (when semantic queries aren't possible)
screen.getByTestId('custom-element');

// Query types
getBy* - throws error if not found (best for assertions)
queryBy* - returns null if not found (best for non-existence checks)
findBy* - async, waits for element (best for async operations)
```

## Coverage Goals

- **Statements**: > 90%
- **Branches**: > 85%
- **Functions**: > 90%
- **Lines**: > 90%

## Continuous Integration

Tests run automatically on:
- Every commit
- Pull requests
- Before deployment

## Troubleshooting

### Common Issues

**Tests timing out**
- Increase timeout in test
- Check for unresolved promises
- Verify async operations complete

**GSAP errors**
- Ensure GSAP is properly mocked
- Check setup.js is loaded
- Verify useGSAP mock is working

**DOM not updating**
- Use waitFor() for async updates
- Check React state updates
- Verify component re-renders

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)