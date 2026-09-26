$appDir = "C:\Users\LENOVO\Desktop\prayer app"
Set-Location $appDir

$portableDir = Join-Path $appDir ".git_portable"
$git = Join-Path $portableDir "cmd\git.exe"

Write-Host "[1] Using MinGit at: $git"
Write-Host "[2] Git version: $(& $git --version)"

Write-Host "[3] Removing old .git folder..."
$gitDir = Join-Path $appDir ".git"
if (Test-Path $gitDir) {
    Remove-Item -Recurse -Force $gitDir
}

Write-Host "[4] Deleting locked zip file if exists..."
$zipFile = Join-Path $appDir "mingit_temp.zip"
if (Test-Path $zipFile) {
    Remove-Item -Force $zipFile -ErrorAction SilentlyContinue
}

Write-Host "[5] Initializing fresh repository..."
& $git init
& $git branch -M main
& $git config user.name "Sayyid-ctrl"
& $git config user.email "sayyid@example.com"

Write-Host "[6] Staging app files only (respecting .gitignore)..."
& $git add index.html
& $git add manifest.json
& $git add sw.js
& $git add README.md
& $git add ".gitignore"
& $git add "css/"
& $git add "js/"
& $git add "icons/"
& $git add ".github/"

Write-Host "[7] Commit status:"
& $git status

Write-Host "[8] Creating commit..."
& $git commit -m "Deploy Prayer App PWA to main branch"

Write-Host "[9] Pushing to GitHub..."
& $git remote add origin https://github.com/Sayyid-ctrl/prayer-app.git
& $git push -u origin main --force

Write-Host "=================================================="
Write-Host " SUCCESS! Files pushed to GitHub!"
Write-Host " https://github.com/Sayyid-ctrl/prayer-app"
Write-Host "=================================================="
