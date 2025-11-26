import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

describe('package.json Configuration', () => {
  let packageJson;

  beforeAll(() => {
    const packagePath = resolve(process.cwd(), 'package.json');
    const content = readFileSync(packagePath, 'utf-8');
    packageJson = JSON.parse(content);
  });

  describe('Basic Package Information', () => {
    it('should have a valid package name', () => {
      expect(packageJson.name).toBe('react-portfolio');
    });

    it('should have a version number', () => {
      expect(packageJson.version).toBeDefined();
      expect(typeof packageJson.version).toBe('string');
    });

    it('should be marked as private', () => {
      expect(packageJson.private).toBe(true);
    });

    it('should use ES modules', () => {
      expect(packageJson.type).toBe('module');
    });
  });

  describe('Scripts', () => {
    it('should have dev script', () => {
      expect(packageJson.scripts.dev).toBe('vite');
    });

    it('should have build script', () => {
      expect(packageJson.scripts.build).toBe('vite build');
    });

    it('should have lint script', () => {
      expect(packageJson.scripts.lint).toBe('eslint .');
    });

    it('should have preview script', () => {
      expect(packageJson.scripts.preview).toBe('vite preview');
    });

    it('should have test scripts', () => {
      expect(packageJson.scripts.test).toBe('vitest');
      expect(packageJson.scripts['test:ui']).toBe('vitest --ui');
      expect(packageJson.scripts['test:coverage']).toBe('vitest --coverage');
    });
  });

  describe('Dependencies', () => {
    it('should include React 19', () => {
      expect(packageJson.dependencies.react).toBe('^19.2.0');
      expect(packageJson.dependencies['react-dom']).toBe('^19.2.0');
    });

    it('should include Tailwind CSS', () => {
      expect(packageJson.dependencies.tailwindcss).toBe('^4.1.17');
      expect(packageJson.dependencies['@tailwindcss/vite']).toBe('^4.1.17');
    });

    it('should include GSAP for animations', () => {
      expect(packageJson.dependencies.gsap).toBe('^3.13.0');
      expect(packageJson.dependencies['@gsap/react']).toBe('^2.1.2');
    });

    it('should include lucide-react for icons', () => {
      expect(packageJson.dependencies['lucide-react']).toBe('^0.554.0');
    });

    it('should include dayjs for date handling', () => {
      expect(packageJson.dependencies.dayjs).toBe('^1.11.19');
    });

    it('should have all required production dependencies', () => {
      const requiredDeps = [
        'react',
        'react-dom',
        'tailwindcss',
        '@tailwindcss/vite',
        'gsap',
        '@gsap/react',
        'lucide-react',
        'dayjs',
      ];

      requiredDeps.forEach(dep => {
        expect(packageJson.dependencies).toHaveProperty(dep);
      });
    });
  });

  describe('Dev Dependencies', () => {
    it('should include Vite', () => {
      expect(packageJson.devDependencies.vite).toBeDefined();
    });

    it('should include React plugin for Vite', () => {
      expect(packageJson.devDependencies['@vitejs/plugin-react']).toBeDefined();
    });

    it('should include ESLint', () => {
      expect(packageJson.devDependencies.eslint).toBeDefined();
      expect(packageJson.devDependencies['@eslint/js']).toBeDefined();
    });

    it('should include React ESLint plugins', () => {
      expect(packageJson.devDependencies['eslint-plugin-react-hooks']).toBeDefined();
      expect(packageJson.devDependencies['eslint-plugin-react-refresh']).toBeDefined();
    });

    it('should include testing libraries', () => {
      expect(packageJson.devDependencies.vitest).toBe('^2.1.8');
      expect(packageJson.devDependencies['@testing-library/react']).toBe('^16.1.0');
      expect(packageJson.devDependencies['@testing-library/jest-dom']).toBe('^6.6.3');
      expect(packageJson.devDependencies['@testing-library/user-event']).toBe('^14.5.2');
      expect(packageJson.devDependencies.jsdom).toBe('^25.0.1');
    });

    it('should include TypeScript type definitions', () => {
      expect(packageJson.devDependencies['@types/react']).toBeDefined();
      expect(packageJson.devDependencies['@types/react-dom']).toBeDefined();
    });

    it('should include globals for ESLint', () => {
      expect(packageJson.devDependencies.globals).toBeDefined();
    });
  });

  describe('Version Compatibility', () => {
    it('should use compatible React and React DOM versions', () => {
      expect(packageJson.dependencies.react).toBe(packageJson.dependencies['react-dom']);
    });

    it('should use compatible Tailwind packages', () => {
      expect(packageJson.dependencies.tailwindcss).toBe(packageJson.dependencies['@tailwindcss/vite']);
    });

    it('should use compatible React types', () => {
      expect(packageJson.devDependencies['@types/react']).toBeDefined();
      expect(packageJson.devDependencies['@types/react-dom']).toBeDefined();
    });
  });

  describe('Semantic Versioning', () => {
    it('should use caret ranges for dependencies', () => {
      Object.values(packageJson.dependencies).forEach(version => {
        expect(version).toMatch(/^\^/);
      });
    });

    it('should use caret ranges for devDependencies', () => {
      Object.values(packageJson.devDependencies).forEach(version => {
        expect(version).toMatch(/^\^/);
      });
    });
  });

  describe('Package Structure', () => {
    it('should have all required top-level fields', () => {
      expect(packageJson).toHaveProperty('name');
      expect(packageJson).toHaveProperty('version');
      expect(packageJson).toHaveProperty('type');
      expect(packageJson).toHaveProperty('scripts');
      expect(packageJson).toHaveProperty('dependencies');
      expect(packageJson).toHaveProperty('devDependencies');
    });

    it('should not have unnecessary fields', () => {
      // Ensure no unexpected top-level fields
      const expectedFields = [
        'name',
        'private',
        'version',
        'type',
        'scripts',
        'dependencies',
        'devDependencies',
      ];

      Object.keys(packageJson).forEach(key => {
        expect(expectedFields).toContain(key);
      });
    });
  });

  describe('Dependency Integrity', () => {
    it('should not have duplicate dependencies', () => {
      const deps = Object.keys(packageJson.dependencies || {});
      const devDeps = Object.keys(packageJson.devDependencies || {});
      const overlap = deps.filter(dep => devDeps.includes(dep));
      
      expect(overlap).toHaveLength(0);
    });

    it('should have valid version strings', () => {
      const versionRegex = /^\^?\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?$/;
      
      Object.values(packageJson.dependencies).forEach(version => {
        expect(version).toMatch(versionRegex);
      });

      Object.values(packageJson.devDependencies).forEach(version => {
        expect(version).toMatch(versionRegex);
      });
    });
  });

  describe('New Dependencies Added', () => {
    it('should include @gsap/react (new dependency)', () => {
      expect(packageJson.dependencies['@gsap/react']).toBe('^2.1.2');
    });

    it('should include gsap (new dependency)', () => {
      expect(packageJson.dependencies.gsap).toBe('^3.13.0');
    });

    it('should include lucide-react (new dependency)', () => {
      expect(packageJson.dependencies['lucide-react']).toBe('^0.554.0');
    });

    it('should include vitest (new dev dependency)', () => {
      expect(packageJson.devDependencies.vitest).toBe('^2.1.8');
    });

    it('should include @testing-library/react (new dev dependency)', () => {
      expect(packageJson.devDependencies['@testing-library/react']).toBe('^16.1.0');
    });

    it('should include @testing-library/jest-dom (new dev dependency)', () => {
      expect(packageJson.devDependencies['@testing-library/jest-dom']).toBe('^6.6.3');
    });

    it('should include @testing-library/user-event (new dev dependency)', () => {
      expect(packageJson.devDependencies['@testing-library/user-event']).toBe('^14.5.2');
    });

    it('should include jsdom (new dev dependency)', () => {
      expect(packageJson.devDependencies.jsdom).toBe('^25.0.1');
    });
  });
});