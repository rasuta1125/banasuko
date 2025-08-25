#!/bin/bash
# Cloudflare Pages build script

echo "Installing dependencies..."
npm ci

echo "Building application..."
npm run build

echo "Copying public files to dist..."
cp -r public/* dist/ 2>/dev/null || echo "No public files to copy"

echo "Build completed successfully!"
echo "Output directory: dist/"
ls -la dist/