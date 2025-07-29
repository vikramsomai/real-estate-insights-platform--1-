#!/bin/bash

echo "🚀 Starting Al Fozan Insights Backend Server..."

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate  # For Linux/Mac
# venv\Scripts\activate  # For Windows

# Install requirements
echo "📥 Installing requirements..."
pip install -r requirements.txt

# Create necessary directories
mkdir -p reports
mkdir -p logs

# Initialize database
echo "🗄️ Initializing database..."
python -c "from app import init_database; init_database()"

# Start the Flask server
echo "🌐 Starting Flask server on http://localhost:5000"
python app.py
