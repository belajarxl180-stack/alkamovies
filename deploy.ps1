# Quick Deploy to Vercel - AlkaMovies

Write-Host "🚀 DEPLOY ALKAMOVIES KE VERCEL" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initialize Git Repository..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit - AlkaMovies Horror Premium"
    Write-Host "✅ Git repository initialized!" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "✅ Git already initialized" -ForegroundColor Green
    Write-Host ""
}

# Check if vercel is installed
Write-Host "🔍 Checking Vercel CLI..." -ForegroundColor Yellow
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "📥 Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
    Write-Host "✅ Vercel CLI installed!" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "✅ Vercel CLI already installed" -ForegroundColor Green
    Write-Host ""
}

Write-Host "🔐 Login to Vercel..." -ForegroundColor Yellow
Write-Host "Browser akan terbuka untuk login. Gunakan akun GitHub Anda." -ForegroundColor Gray
Write-Host ""
vercel login

Write-Host ""
Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Cyan
Write-Host ""

# Deploy to Vercel
vercel

Write-Host ""
Write-Host "✅ DEPLOYMENT SELESAI!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 LANGKAH SELANJUTNYA:" -ForegroundColor Yellow
Write-Host "1. Buka dashboard Vercel: https://vercel.com/dashboard" -ForegroundColor White
Write-Host "2. Pilih project 'alkamovies'" -ForegroundColor White
Write-Host "3. Settings → Environment Variables" -ForegroundColor White
Write-Host "4. Tambahkan:" -ForegroundColor White
Write-Host "   Name: YOUTUBE_API_KEY" -ForegroundColor Gray
Write-Host "   Value: AIzaSyBZL7dc2iZrjcbcj_XwIXfqcFqpnyz0yLU" -ForegroundColor Gray
Write-Host "5. Redeploy project dari dashboard" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Website Anda akan LIVE dalam 2-3 menit!" -ForegroundColor Cyan
Write-Host ""
