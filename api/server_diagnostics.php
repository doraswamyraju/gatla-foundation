<?php
// api/server_diagnostics.php
ini_set('display_errors', 1);
error_reporting(E_ALL);

echo "<h1>Server Diagnostics</h1>";
echo "<strong>Server OS:</strong> " . PHP_OS . "<br>";
echo "<strong>PHP Version:</strong> " . phpversion() . "<br><br>";

echo "<h3>1. File System Check</h3>";

// List of critical files to check
$files = [
    'config.php',
    'libs/fpdf/fpdf.php',
    'libs/FPDF/fpdf.php',
    'libs/fpdf/FPDF.php',
    'libs/phpmailer/PHPMailer.php',
    'libs/PHPMailer/PHPMailer.php',
    'libs/PHPMailer/Exception.php',
    'libs/phpmailer/Exception.php',
    'libs/PHPMailer/SMTP.php'
];

foreach ($files as $file) {
    if (file_exists($file)) {
        echo "<div style='color:green'>[OK] Found: $file</div>";
    } else {
        echo "<div style='color:red'>[MISSING] $file</div>";
    }
}

echo "<h3>2. Library Directory Scan (libs/)</h3>";
if (is_dir('libs')) {
    $scanned = scandir('libs');
    foreach ($scanned as $item) {
        if ($item == '.' || $item == '..') continue;
        echo "Found in libs/: <strong>$item</strong><br>";
        if (is_dir("libs/$item")) {
            $sub = scandir("libs/$item");
            echo "-- Contents: " . implode(", ", array_diff($sub, ['.', '..'])) . "<br>";
        }
    }
} else {
    echo "<div style='color:red'>[CRITICAL] 'libs' directory not found.</div>";
}

echo "<h3>3. Database Check</h3>";
if (file_exists('config.php')) {
    require 'config.php';
    $conn = connectDB();
    if ($conn) {
        echo "<div style='color:green'>[OK] Database Connected.</div>";
        
        $tables = ['donations', 'cricket_donors', 'music_donors', 'business_donors', 'education_donors'];
        foreach ($tables as $t) {
            $res = $conn->query("SHOW TABLES LIKE '$t'");
            if ($res && $res->num_rows > 0) {
                echo "<div style='color:green'>[OK] Table exists: $t</div>";
            } else {
                echo "<div style='color:red'>[MISSING] Table missing: $t</div>";
            }
        }
    } else {
        echo "<div style='color:red'>[FAIL] Database Connection Failed.</div>";
    }
}

?>
