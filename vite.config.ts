import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";
import PackageJson from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
      federation({
        name: 'payment',
        filename: 'remoteEntry.js',
        exposes: {
            './Payment': './src/components/Payment.tsx',
        },
        shared: {
          ...PackageJson.dependencies,
          react: {
              // eager: true,
              requiredVersion: PackageJson.dependencies['react']
          },
          'react-router-dom': {
              // eager: true,
              requiredVersion: PackageJson.dependencies['react-router-dom']
          },
          'react-dom': {
              // eager: true,
              requiredVersion: PackageJson.dependencies['react-dom']
          }
        }
      }),
  ],
    build: {
        modulePreload: false,
        target: 'esnext',
        minify: false,
        cssCodeSplit: false,
    },
})
