Write-Host "🚀 Al Fozan Insights - Quick Setup" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green

Write-Host "📦 Installing Flask and CORS..." -ForegroundColor Yellow
pip install Flask==3.0.0 Flask-CORS==4.0.0

Write-Host "📁 Creating directories..." -ForegroundColor Yellow
if (!(Test-Path "reports")) { New-Item -ItemType Directory -Name "reports" }
if (!(Test-Path "logs")) { New-Item -ItemType Directory -Name "logs" }

Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 To start the server, run:" -ForegroundColor Cyan
Write-Host "   python simple_app.py" -ForegroundColor White
Write-Host ""
Write-Host "📊 API will be available at: http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to continue"
