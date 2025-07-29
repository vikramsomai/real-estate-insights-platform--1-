@echo off
echo  Setting up Al Fozan Insights Backend...

echo  Installing Python dependencies...
pip install -r simple_requirements.txt

echo  Creating reports directory...
if not exist "reports" mkdir reports

echo  Setup completed successfully!
echo  To start the server, run: python simple_app.py
echo  Server will be available at: http://localhost:5000

pause
