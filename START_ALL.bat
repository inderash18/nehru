@echo off
echo ========================================
echo   LifeLink - Quick Start Guide
echo ========================================
echo.

echo Step 1: Check MongoDB
echo ----------------------
echo Make sure MongoDB is running!
echo.
echo Option 1: Start MongoDB service
echo   net start MongoDB
echo.
echo Option 2: Open MongoDB Compass
echo   Connect to: mongodb://localhost:27017
echo.
pause

echo.
echo Step 2: Start Backend Server
echo -----------------------------
echo Opening new terminal for backend...
start cmd /k "cd backend && python -m uvicorn app.main:app --reload --port 8000"
timeout /t 3 >nul

echo.
echo Step 3: Start Frontend Server
echo ------------------------------
echo Opening new terminal for frontend...
start cmd /k "cd client && npm run dev"
timeout /t 3 >nul

echo.
echo ========================================
echo   LifeLink is Starting!
echo ========================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:5177
echo API Docs: http://localhost:8000/docs
echo.
echo Press any key to open the application...
pause >nul

start http://localhost:5177

echo.
echo ✅ All services started!
echo.
echo To stop services:
echo - Close the terminal windows
echo - Or press Ctrl+C in each terminal
echo.
pause
