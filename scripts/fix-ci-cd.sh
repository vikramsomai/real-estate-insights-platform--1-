#!/bin/bash

echo "🔧 Fixing CI/CD Pipeline Issues..."

# Create backend directory if it doesn't exist
mkdir -p backend

# Create simple_requirements.txt
cat > backend/simple_requirements.txt << EOF
Flask==3.0.0
Flask-CORS==4.0.0
Werkzeug==3.0.1
EOF

# Clear npm cache and reinstall
echo "📦 Fixing npm dependencies..."
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Run linting fix
echo "🔍 Running ESLint fixes..."
npm run lint:fix

# Test build
echo "🏗️ Testing build process..."
npm run build

echo "✅ CI/CD fixes completed!"
echo ""
echo "Next steps:"
echo "1. Commit and push these changes"
echo "2. GitHub Actions should now pass"
echo "3. Backend will work with simple_app.py"
