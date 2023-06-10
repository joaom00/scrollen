import { defineConfig } from 'tsup'

export default defineConfig({
  minify: true,
  target: 'es2020',
  external: ['react'],
  sourcemap: true,
  dts: true,
  format: ['esm', 'cjs'],
  clean: true,
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    }
  },
})
