#!/bin/bash

if [ $# -lt 1 ]; then
    echo "Usage: ./create-nextjs.sh <app-name>"
    echo "Example: ./create-nextjs.sh learnflow-frontend"
    exit 1
fi

APP_NAME=$1

echo "Creating Next.js app: $APP_NAME"

# Create Next.js app with TypeScript
npx create-next-app@latest "$APP_NAME" \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*"

cd "$APP_NAME"

# Install additional dependencies
echo "Installing additional packages..."
npm install @monaco-editor/react axios

echo "✅ Next.js app '$APP_NAME' created successfully!"
echo ""
echo "Next steps:"
echo "1. cd $APP_NAME"
echo "2. npm run dev"
echo "3. Open http://localhost:3000"