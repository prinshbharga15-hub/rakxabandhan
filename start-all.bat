@echo off
title Raksha Bandhan Festival - Launcher
echo =======================================================
echo    🪔 RAKSHA BANDHAN FESTIVAL 3D WEB APPLICATION 🪔
echo =======================================================
echo.
echo Starting Backend Express API Server on port 5000...
start cmd /k "cd server && npm start"

timeout /t 3 /nobreak >nul

echo Starting Frontend Vite React Application on port 5173...
start cmd /k "cd client && npm run dev"

echo.
echo Application successfully launched!
echo Frontend: http://localhost:5173
echo Backend API: http://localhost:5000
echo =======================================================
