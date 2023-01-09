@echo off
start "" cmd /k call server.bat
choice /t 3 /d y /n >nul
call open_weather.bat