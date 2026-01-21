// api/server_diagnostics.php
ini_set('display_errors', 1);
error_reporting(E_ALL);

echo "<h1>Server Diagnostics - Level 2 (Live Test)</h1>";

// 1. CONFIG CHECK
echo "<h3>1. Loading Config</h3>";
try {
    if (file_exists('config.php')) {
        require_once 'config.php';
        echo "<div style='color:green'>[OK] config.php loaded.</div>";
    } else {
        throw new Exception("config.php missing");
    }
} catch (Exception $e) {
    echo "<div style='color:red'>[FAIL] " . $e->getMessage() . "</div>";
}

// 2. LIBRARY LOAD TEST
echo "<h3>2. Testing Library Loading</h3>";

echo "<strong>A. FPDF:</strong> ";
try {
    $fpdf_path = 'libs/fpdf/fpdf.php';
    if (!file_exists($fpdf_path)) throw new Exception("File not found: $fpdf_path");
    require($fpdf_path);
    if (!class_exists('FPDF')) throw new Exception("Class FPDF not found after require");
    $pdf = new FPDF();
    echo "<span style='color:green'>[OK] FPDF loaded and instantiated.</span><br>";
} catch (Throwable $e) {
    echo "<span style='color:red'>[FAIL] " . $e->getMessage() . "</span><br>";
}

echo "<strong>B. PHPMailer:</strong> ";
try {
    // Exact paths from process_donation.php
    $paths = [
        'libs/PHPMailer/Exception.php',
        'libs/PHPMailer/PHPMailer.php',
        'libs/PHPMailer/SMTP.php'
    ];
    
    foreach ($paths as $p) {
        if (!file_exists($p)) throw new Exception("File not found: $p");
        require_once($p);
    }
    
    // Check Classes
    if (!class_exists('PHPMailer\PHPMailer\PHPMailer')) throw new Exception("Class PHPMailer not loaded");
    if (!class_exists('PHPMailer\PHPMailer\Exception')) throw new Exception("Class Exception not loaded");
    if (!class_exists('PHPMailer\PHPMailer\SMTP')) throw new Exception("Class SMTP not loaded");
    
    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    echo "<span style='color:green'>[OK] PHPMailer loaded and instantiated.</span><br>";
    
} catch (Throwable $e) {
    echo "<span style='color:red'>[FAIL] " . $e->getMessage() . "</span><br>";
}

echo "<h3>3. Database Connection Test</h3>";
try {
    $conn = connectDB();
    if ($conn) {
        echo "<span style='color:green'>[OK] Connected.</span>";
    } else {
        echo "<span style='color:red'>[FAIL] Connection returned false.</span>";
    }
} catch (Throwable $e) {
    echo "<span style='color:red'>[FAIL] DB Error: " . $e->getMessage() . "</span>";
}

