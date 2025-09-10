#!/bin/bash

# Exit on any error
set -e

echo "🚀 Starting CinemaVerse Wasp build process..."

# Check Node.js version
echo "🔍 Checking Node.js version..."
node_version=$(node --version | cut -d'v' -f2)
echo "Node.js version: $node_version"

# Install Wasp CLI if not present
if ! command -v wasp &> /dev/null; then
    echo "📦 Installing Wasp CLI version 0.16.0..."
    curl -sSL https://get.wasp.sh/installer.sh | sh -s -- -v 0.16.0
    export PATH="$HOME/.wasp/bin:$PATH"
fi

# Verify Wasp installation
wasp version

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the Wasp application
echo "🔨 Building Wasp application..."
wasp build

# Build the client application
echo "🔨 Building client application..."
cd .wasp/out/web-app

# Install dependencies first
echo "📦 Installing client dependencies..."
npm install

# Build the client (skip TypeScript compilation to avoid Wasp type issues)
echo "🔨 Running client build..."
npx vite build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist directory not created"
    exit 1
fi

cd ../../..

echo "✅ Build completed successfully!"
echo "📁 Build output is in .wasp/out/web-app/dist"
