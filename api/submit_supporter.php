<?php
// api/submit_supporter.php
ob_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
ini_set('display_errors', 0);
require_once 'config.php';

$inputJSON = file_get_contents("php://input");
$data = json_decode($inputJSON, true);

if (!$data) {
    ob_clean();
    echo json_encode(["status" => "error", "message" => "No data received"]);
    exit;
}

$conn = connectDB();
if (!$conn) {
    ob_clean();
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit;
}

$full_name = $data['fullName'] ?? '';
$father_name = $data['fatherName'] ?? '';
$address = $data['address'] ?? ''; // Mapped from 'address' in form
$phone_no = $data['phone'] ?? '';
$email_id = $data['email'] ?? '';
$aadhaar_no = $data['aadhar'] ?? '';
$pan_card_no = $data['pan'] ?? '';
$qualification = $data['qualification'] ?? '';
$occupation = $data['occupation'] ?? '';

// Handle Arrays for Checkboxes
$areas = $data['areasOfInterest'] ?? [];
$areas_str = is_array($areas) ? implode(", ", $areas) : $areas;

$support = $data['supportMode'] ?? [];
$support_str = is_array($support) ? implode(", ", $support) : $support;


$sql = "INSERT INTO supporters (full_name, father_name, address, phone_no, email_id, aadhaar_no, pan_card_no, qualification, occupation, areas_of_interest, support_mode, status, submission_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    $errorMsg = $conn->error;
    ob_clean();
    echo json_encode(["status" => "error", "message" => "Database Query Prep Failed: $errorMsg"]);
    exit;
}

$stmt->bind_param("sssssssssss", $full_name, $father_name, $address, $phone_no, $email_id, $aadhaar_no, $pan_card_no, $qualification, $occupation, $areas_str, $support_str);

if ($stmt->execute()) {
    ob_clean();
    echo json_encode(["status" => "success", "message" => "Supporter application submitted successfully!"]);
} else {
    $errorMsg = $stmt->error;
    ob_clean();
    echo json_encode(["status" => "error", "message" => "Database Execution Failed: $errorMsg"]);
}

$stmt->close();
$conn->close();
ob_end_flush();
?>
