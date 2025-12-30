#!/bin/bash

echo "🚀 Deploying Cast Analyzer..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
fi

# Add all files
echo "📁 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy Cast Analyzer - $(date)"

# Check if remote exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ No git remote found!"
    echo "Please add your GitHub repository URL:"
    echo "git remote add origin https://github.com/yourusername/cast-analyzer.git"
    echo "Then run this script again."
    exit 1
fi

# Push to GitHub
echo "🌐 Pushing to GitHub..."
git push -u origin main

echo "✅ Code pushed to GitHub!"
echo ""
echo "🚀 Next steps:"
echo "1. Go to vercel.com"
echo "2. Import your GitHub repository"
echo "3. Add environment variables:"
echo "   - OPENROUTER_API_KEY"
echo "   - NEXT_PUBLIC_PRIVY_APP_ID"
echo "4. Deploy!"
echo ""
echo "🎉 Your Cast Analyzer will be live!"