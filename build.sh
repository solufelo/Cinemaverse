#!/bin/bash

# Exit on any error
set -e

echo "🚀 Starting CinemaVerse Wasp build process..."

# Install Wasp CLI if not present
if ! command -v wasp &> /dev/null; then
    echo "📦 Installing Wasp CLI..."
    curl -sSL https://get.wasp-lang.dev/installer.sh | sh
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

echo "✅ Build completed successfully!"
echo "📁 Build output is in .wasp/out/client"
