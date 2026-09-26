Add-Type -AssemblyName System.Drawing
$dir = "c:\Users\LENOVO\Desktop\prayer app\icons"
if (-not (Test-Path $dir)) { 
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
}

function Create-Icon($size, $filename) {
    $path = Join-Path $dir $filename
    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    
    $rect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, [System.Drawing.Color]::FromArgb(255, 6, 78, 59), [System.Drawing.Color]::FromArgb(255, 15, 23, 42), 45.0)
    $g.FillRectangle($brush, $rect)
    
    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 245, 158, 11), [Math]::Max(2, $size * 0.03))
    $margin = [int]($size * 0.06)
    $g.DrawRectangle($pen, $margin, $margin, $size - 2 * $margin, $size - 2 * $margin)
    
    $moonBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 245, 158, 11))
    $bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 6, 78, 59))
    $r = [int]($size * 0.22)
    $cx = [int]($size * 0.45)
    $cy = [int]($size * 0.45)
    $g.FillEllipse($moonBrush, $cx - $r, $cy - $r, $r * 2, $r * 2)
    $g.FillEllipse($bgBrush, $cx - [int]($r * 0.4), $cy - [int]($r * 1.1), [int]($r * 1.8), [int]($r * 1.8))
    
    $starBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 251, 191, 36))
    $sr = [int]($size * 0.05)
    $g.FillEllipse($starBrush, $cx + [int]($r * 0.6), $cy - [int]($r * 0.4), $sr * 2, $sr * 2)

    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Created $path"
}

Create-Icon 192 "icon-192.png"
Create-Icon 512 "icon-512.png"
