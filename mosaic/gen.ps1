$ErrorActionPreference = "Stop"

$n = 80 # Generate a matrix of N * N squares.
$z = 4 # Generate squares of size Z * Z.
$g = 1 # Space between squares.

$o = ""
$v = $n * ($z + $g)

for ($r = 0; $r -lt $n; ++$r) {
    for ($c = 0; $c -lt $n; ++$c) {
        $u = Get-Random -Minimum 1 -Maximum 14 # Random rectangle.
        $x = ($c * ($z + $g) + $g / 2) / 0.75 # px -> pt
        $y = ($r * ($z + $g) + $g / 2) / 0.75 # px -> pt
        $a = Get-Random -Minimum -3.0 -Maximum 3.0 # Random rotation.
        $s = Get-Random -Minimum 0.98 -Maximum 1.02 # Random scale.
        $o +=  "`n" + '<use xlink:href="#R{0}" transform="translate({1:f2}, {2:f2}) rotate({3:f2}, 3, 3) scale({4:f2})"/>' -f $u, $x, $y, $a, $s
    }
}

$v /= 0.75 # px -> pt
$z /= 0.75 # I like pt...

Set-Content -Path "./map.svg" -Value (@"
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="${v}" height="${v}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<defs>
<rect id="R1" width="${z}" height="${z}" style="fill: #1f1c21;"/>
<rect id="R2" width="${z}" height="${z}" style="fill: #302e33;"/>
<rect id="R3" width="${z}" height="${z}" style="fill: #474649;"/>
<rect id="R4" width="${z}" height="${z}" style="fill: #191423;"/>
<rect id="R5" width="${z}" height="${z}" style="fill: #3a3745;"/>
<rect id="R6" width="${z}" height="${z}" style="fill: #242424;"/>
<rect id="R7" width="${z}" height="${z}" style="fill: #3d3d3d;"/>
<rect id="R8" width="${z}" height="${z}" style="fill: #1a2123;"/>
<rect id="R9" width="${z}" height="${z}" style="fill: #2b3636;"/>
<rect id="R10" width="${z}" height="${z}" style="fill: #444b4a;"/>
<rect id="R11" width="${z}" height="${z}" style="fill: #21211c;"/>
<rect id="R12" width="${z}" height="${z}" style="fill: #33322e;"/>
<rect id="R13" width="${z}" height="${z}" style="fill: #494846;"/>
</defs>{0}
</svg>
"@ -f $o)
