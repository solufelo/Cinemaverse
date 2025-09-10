#!/bin/bash
set -e

echo "🚀 Setting up CinemaVerse for Render deployment..."

# Install Wasp CLI
echo "📦 Installing Wasp CLI..."
curl -sSL https://get.wasp.sh/installer.sh | sh -s -- -v 0.16.0
export PATH="$HOME/.wasp/bin:$PATH"

# Verify installation
wasp version

# Build the Wasp application
echo "🔨 Building Wasp application..."
wasp build

# Install server dependencies
echo "📦 Installing server dependencies..."
cd .wasp/build
npm install --production

echo "✅ Build completed successfully!"
echo "🌐 Ready for Render deployment"
