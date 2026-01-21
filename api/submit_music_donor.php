<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once 'config.php';
$conn = connectDB();
$json = file_get_contents('php://input');
$data = json_decode($json, true);
if ($data) $_POST = $data;

$id = $_POST['id'] ?? null;
$donor_name = $_POST['donor_name'] ?? ($_POST['full_name'] ?? ''); 
$email_id = $_POST['email_id'] ?? '';
$phone_no = $_POST['phone_no'] ?? '';
$pan_card_no = $_POST['pan_card_no'] ?? ($_POST['pan_no'] ?? ''); 
$amount = $_POST['amount'] ?? 0;
$payment_id = $_POST['payment_id'] ?? 'OFFLINE';
$support_purpose = $_POST['support_purpose'] ?? 'Support Gatla Music Club';

if ($id) {
    $sql = "UPDATE music_donors SET donor_name=?, email_id=?, phone_no=?, pan_card_no=?, amount=?, payment_id=?, support_purpose=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssdssi", $donor_name, $email_id, $phone_no, $pan_card_no, $amount, $payment_id, $support_purpose, $id);
} else {
    $sql = "INSERT INTO music_donors (donor_name, email_id, phone_no, pan_card_no, amount, payment_id, support_purpose, status, submission_date) VALUES (?, ?, ?, ?, ?, ?, ?, 'Success', NOW())";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssdss", $donor_name, $email_id, $phone_no, $pan_card_no, $amount, $payment_id, $support_purpose);
}

if ($stmt->execute()) { echo json_encode(["status" => "success"]); } 
else { echo json_encode(["status" => "error", "message" => $conn->error]); }
$conn->close();
?>
