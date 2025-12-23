#!/bin/bash
set -e

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js if not already installed
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    nvm install 20
    nvm use 20
    nvm alias default 20
fi

# Verify installation
node --version
npm --version

# Install dependencies
echo "Installing dependencies..."
npm install

# Start the dev server
echo "Starting development server..."
npm run dev

