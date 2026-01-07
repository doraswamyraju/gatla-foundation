<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once 'config.php';
$conn = connectDB();

// 1. Handle JSON Input (React typically sends this)
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($data) {
    // If JSON exists, overwrite $_POST
    $_POST = $data;
}

// 2. Map Variables
$id = $_POST['id'] ?? null;
$full_name = $_POST['full_name'] ?? '';
$email_id = $_POST['email_id'] ?? '';
$phone_no = $_POST['phone_no'] ?? '';
$pan_no = $_POST['pan_no'] ?? '';
$amount = $_POST['amount'] ?? 0;
$payment_id = $_POST['payment_id'] ?? 'OFFLINE';
$support_purpose = $_POST['support_purpose'] ?? 'Support Gatla Education Club';

if ($id) {
    // UPDATE
    $sql = "UPDATE education_donors SET full_name=?, email_id=?, phone_no=?, pan_no=?, amount=?, payment_id=?, support_purpose=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssdssi", $full_name, $email_id, $phone_no, $pan_no, $amount, $payment_id, $support_purpose, $id);
} else {
    // INSERT
    $sql = "INSERT INTO education_donors (full_name, email_id, phone_no, pan_no, amount, payment_id, support_purpose, status, submission_date) VALUES (?, ?, ?, ?, ?, ?, ?, 'Success', NOW())";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssdss", $full_name, $email_id, $phone_no, $pan_no, $amount, $payment_id, $support_purpose);
}

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}

$conn->close();
?>