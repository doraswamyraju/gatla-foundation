<?php
// api/submit_form_dynamic_education.php
// Handles Submission for Education Supporters

// 1. ALLOW CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 2. ERROR HANDLING (Prevents 500 errors from hiding the real message)
ini_set('display_errors', 0);
error_reporting(E_ALL);
ob_start();

require_once 'config.php';

$conn = connectDB();
if (!$conn) {
    ob_clean();
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit();
}

// 3. PREPARE DATA (Matching the FormData sent from React)
$fullName = $_POST['full_name'] ?? '';
$fatherName = $_POST['father_name'] ?? '';
$address = $_POST['address'] ?? '';
$phone = $_POST['phone_no'] ?? '';
$email = $_POST['email_id'] ?? '';
$aadhaar = $_POST['aadhaar_no'] ?? '';
$pan = $_POST['pan_card_no'] ?? '';
$qualification = $_POST['qualification'] ?? '';
$occupation = $_POST['occupation'] ?? '';
$areas = $_POST['areas_of_interest'] ?? '';
$supportType = $_POST['support_type'] ?? '';
$status = 'Pending';

// 4. INSERT INTO DATABASE
// Ensure your database has a table named 'education_supporters'
$sql = "INSERT INTO education_supporters (
    full_name, father_name, address, phone_no, email_id, aadhaar_no, 
    pan_card_no, qualification, occupation, areas_of_interest, 
    support_type, status, submission_date
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";

$stmt = $conn->prepare($sql);

if ($stmt) {
    // s = string. We have 12 variables binding here.
    $stmt->bind_param("ssssssssssss", 
        $fullName, 
        $fatherName, 
        $address, 
        $phone, 
        $email, 
        $aadhaar,
        $pan,
        $qualification,
        $occupation,
        $areas,
        $supportType,
        $status
    );

    if ($stmt->execute()) {
        $last_id = $stmt->insert_id;
        ob_clean();
        echo json_encode([
            "status" => "success", 
            "message" => "Supporter Application submitted",
            "id" => $last_id
        ]);
    } else {
        ob_clean();
        echo json_encode(["status" => "error", "message" => "SQL Error: " . $stmt->error]);
    }
    $stmt->close();
} else {
    ob_clean();
    echo json_encode(["status" => "error", "message" => "Prepare Error: " . $conn->error]);
}

$conn->close();
?>