<?php
// api/process_donation.php
// SAFE MODE: Database Insertion Only (No Email/PDF yet)

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// 1. Error Handling (Show errors to debug 500 issues)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'config.php';

// 2. Get Input Data
$inputJSON = file_get_contents("php://input");
$data = json_decode($inputJSON, true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "No data received"]);
    exit;
}

// 3. Connect to Database
$conn = connectDB();
if (!$conn) {
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit;
}

// 4. Extract Variables
$name = $data['name'] ?? 'Anonymous';
$email = $data['email'] ?? '';
$phone = $data['phone'] ?? '';
$amount = $data['amount'] ?? 0;
$payment_id = $data['payment_id'] ?? 'OFFLINE';

// 5. Insert into Database
// We use 'd' for amount (double/decimal) instead of 'i'
$stmt = $conn->prepare("INSERT INTO donations (donor_name, email, phone, amount, payment_id) VALUES (?, ?, ?, ?, ?)");

if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Prepare failed: " . $conn->error]);
    exit;
}

// Bind: s=string, s=string, s=string, d=double, s=string
$stmt->bind_param("sssds", $name, $email, $phone, $amount, $payment_id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Donation saved successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Execute failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>