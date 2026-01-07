<?php
// api/submit_volunteer.php
// BULLETPROOF VERSION: Suppresses HTML errors to ensure clean JSON

// 1. Start Output Buffering (Traps any HTML warnings/errors)
ob_start();

// 2. Set Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// 3. Disable Display Errors (Log them instead)
ini_set('display_errors', 0);
error_reporting(E_ALL);

require_once 'config.php';

// 4. Input Handling
$inputJSON = file_get_contents("php://input");
$data = json_decode($inputJSON, true);

if (!$data) {
    ob_clean();
    echo json_encode(["status" => "error", "message" => "No data received"]);
    exit;
}

// 5. Database Connection
$conn = connectDB();
if (!$conn) {
    ob_clean();
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit;
}

// 6. Extract Data (Safe handling for missing fields)
$full_name = $data['fullName'] ?? '';
$father_name = $data['fatherName'] ?? '';
$address = $data['address'] ?? '';
$phone_no = $data['phone'] ?? '';
$email_id = $data['email'] ?? '';
$aadhaar_no = $data['aadhar'] ?? '';
$pan_card_no = $data['pan'] ?? '';
$qualification = $data['qualification'] ?? '';
$occupation = $data['occupation'] ?? '';
$club_preference = $data['clubPreference'] ?? 'Education Club';

// 7. Route to Correct Table
$table = ($club_preference === 'Cricket Club') ? 'cricket_volunteers' : 'education_volunteers';

// 8. Prepare Query
$sql = "INSERT INTO $table (full_name, father_name, address, phone_no, email_id, aadhaar_no, pan_card_no, qualification, occupation, club_preference, status, submission_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    // CAPTURE THE SPECIFIC ERROR (Table missing, column missing, etc.)
    $errorMsg = $conn->error;
    ob_clean();
    echo json_encode(["status" => "error", "message" => "Database Error: Table '$table' likely missing. Details: $errorMsg"]);
    exit;
}

$stmt->bind_param("ssssssssss", $full_name, $father_name, $address, $phone_no, $email_id, $aadhaar_no, $pan_card_no, $qualification, $occupation, $club_preference);

if ($stmt->execute()) {
    ob_clean();
    echo json_encode(["status" => "success", "message" => "Application submitted successfully for $club_preference"]);
} else {
    $errorMsg = $stmt->error;
    ob_clean();
    echo json_encode(["status" => "error", "message" => "Submission failed: $errorMsg"]);
}

$stmt->close();
$conn->close();
ob_end_flush();
?>