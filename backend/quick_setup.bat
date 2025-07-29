@echo off
echo 🚀 Al Fozan Insights - Quick Setup
echo ==================================

echo 📦 Installing Flask and CORS...
pip install Flask==3.0.0 Flask-CORS==4.0.0

echo 📁 Creating directories...
if not exist "reports" mkdir reports
if not exist "logs" mkdir logs

echo ✅ Setup complete!
echo.
echo 🌐 To start the server, run:
echo    python simple_app.py
echo.
echo 📊 API will be available at: http://localhost:5000
echo.
pause
