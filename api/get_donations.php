<?php
// api/get_donations.php
// Modular API to fetch Donation History

// 1. SILENCE HTML ERRORS (Prevents JSON breaking)
ini_set('display_errors', 0);
error_reporting(E_ALL);

// 2. SHUTDOWN HANDLER (Catches Fatal Crashes)
register_shutdown_function(function() {
    $error = error_get_last();
    if ($error && ($error['type'] === E_ERROR || $error['type'] === E_PARSE)) {
        if (ob_get_length()) ob_clean();
        header("Content-Type: application/json");
        echo json_encode(["status" => "error", "message" => "Fatal Error: " . $error['message']]);
        exit;
    }
});

// 3. START BUFFER & HEADERS
ob_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { 
    ob_clean(); http_response_code(200); exit(); 
}

// 4. CONNECT TO DATABASE
if (!file_exists('config.php')) {
    ob_clean(); echo json_encode(["status" => "error", "message" => "config.php missing"]); exit();
}
require_once 'config.php';
$conn = connectDB();

if (!$conn) {
    ob_clean(); echo json_encode(["status" => "error", "message" => "Database Connection Failed"]); exit();
}

// 5. FETCH DATA
// Check table existence first
$check = $conn->query("SHOW TABLES LIKE 'donations'");
if (!$check || $check->num_rows == 0) {
    ob_clean(); echo json_encode([]); exit(); // Return empty if table missing
}

// Fetch and Alias fields to match Frontend (name, phone, amount, status, date)
$sql = "SELECT 
            id, 
            donor_name as name, 
            phone, 
            email, 
            pan_number as pan, 
            amount, 
            payment_id, 
            payment_status as status, 
            donation_date as date 
        FROM donations 
        ORDER BY donation_date DESC";

$result = $conn->query($sql);

$data = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// 6. OUTPUT JSON
ob_clean();
echo json_encode($data);
$conn->close();
?>