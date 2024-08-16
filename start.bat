@echo off

start cmd /k "cd /d api && start.dev.sh"
timeout /t 5
start cmd /k "cd /d client && npm run start"
