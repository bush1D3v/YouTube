import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: 'v8',
        reporter: ['text', 'lcov', 'html'],
        all: true,
        include: ['src/**/*.{ts,tsx,js,jsx,vue}'],
        exclude: ['**/__tests__/**', '**/*.spec.*'],
      },
    },
  }),
)
