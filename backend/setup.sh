#!/bin/bash

echo "🚀 Setting up Al Fozan Insights Backend..."

echo "📦 Installing Python dependencies..."
pip install -r simple_requirements.txt

echo "📁 Creating reports directory..."
mkdir -p reports

echo "✅ Setup completed successfully!"
echo "🔧 To start the server, run: python simple_app.py"
echo "📊 Server will be available at: http://localhost:5000"
