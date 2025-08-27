# Winner Machineries Development Script
# This script helps manage common development tasks

param(
    [Parameter(Position=0)]
    [string]$Command = "dev"
)

function Start-DevServer {
    Write-Host "Starting development server..." -ForegroundColor Green
    npm run dev
}

function Clear-Cache {
    Write-Host "Clearing Next.js cache..." -ForegroundColor Yellow
    if (Test-Path ".next") {
        Remove-Item -Recurse -Force .next
        Write-Host "Cache cleared successfully!" -ForegroundColor Green
    } else {
        Write-Host "No cache to clear." -ForegroundColor Yellow
    }
}

function Install-Dependencies {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install --legacy-peer-deps
    Write-Host "Dependencies installed successfully!" -ForegroundColor Green
}

function Clean-Install {
    Write-Host "Performing clean install..." -ForegroundColor Yellow
    if (Test-Path "node_modules") {
        Remove-Item -Recurse -Force node_modules
        Write-Host "node_modules removed." -ForegroundColor Yellow
    }
    if (Test-Path ".next") {
        Remove-Item -Recurse -Force .next
        Write-Host "Cache cleared." -ForegroundColor Yellow
    }
    npm install --legacy-peer-deps
    Write-Host "Clean install completed!" -ForegroundColor Green
}

function Show-Help {
    Write-Host @"
Winner Machineries Development Script

Usage: .\dev.ps1 [command]

Commands:
  dev          - Start development server (default)
  cache        - Clear Next.js cache
  install      - Install dependencies
  clean        - Clean install (remove node_modules and cache, then install)
  help         - Show this help message

Examples:
  .\dev.ps1 dev
  .\dev.ps1 cache
  .\dev.ps1 clean
"@ -ForegroundColor Cyan
}

# Main script logic
switch ($Command.ToLower()) {
    "dev" { Start-DevServer }
    "cache" { Clear-Cache }
    "install" { Install-Dependencies }
    "clean" { Clean-Install }
    "help" { Show-Help }
    default { 
        Write-Host "Unknown command: $Command" -ForegroundColor Red
        Write-Host "Use '.\dev.ps1 help' for available commands." -ForegroundColor Yellow
    }
} 