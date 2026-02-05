@echo off
echo Starting LifeLink Backend Server...
echo.
echo Make sure MongoDB is running on localhost:27017
echo.
cd backend
python -m uvicorn app.main:app --reload --port 8000
