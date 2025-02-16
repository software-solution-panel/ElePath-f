import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['app/test/**/*.spec.ts'],
    environment: 'node',
  },
})