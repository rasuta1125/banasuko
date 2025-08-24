#!/bin/bash
# Cloudflare Pages build script

echo "Installing dependencies..."
npm ci

echo "Building application..."
npm run build

echo "Build completed successfully!"
echo "Output directory: dist/"
ls -la dist/