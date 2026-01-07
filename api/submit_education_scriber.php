<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");
require_once 'config.php';
$conn = connectDB();

$id = $_POST['id'] ?? null;
$full_name = $_POST['full_name'] ?? '';
$father_name = $_POST['father_name'] ?? '';
$phone_no = $_POST['phone_no'] ?? '';
$email_id = $_POST['email_id'] ?? '';
$aadhaar_no = $_POST['aadhaar_no'] ?? '';
$address = $_POST['address'] ?? '';
$qualification = $_POST['qualification'] ?? '';
$occupation = $_POST['occupation'] ?? '';
$subjects = $_POST['subjects_of_interest'] ?? '';
$location = $_POST['present_location'] ?? '';

if ($id) {
    // UPDATE
    $sql = "UPDATE education_scribers SET full_name=?, father_name=?, phone_no=?, email_id=?, aadhaar_no=?, address=?, qualification=?, occupation=?, subjects_of_interest=?, present_location=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssssssi", $full_name, $father_name, $phone_no, $email_id, $aadhaar_no, $address, $qualification, $occupation, $subjects, $location, $id);
} else {
    // INSERT
    $sql = "INSERT INTO education_scribers (full_name, father_name, phone_no, email_id, aadhaar_no, address, qualification, occupation, subjects_of_interest, present_location, status, submission_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssssss", $full_name, $father_name, $phone_no, $email_id, $aadhaar_no, $address, $qualification, $occupation, $subjects, $location);
}

if ($stmt->execute()) { echo json_encode(["status" => "success"]); } 
else { echo json_encode(["status" => "error", "message" => $conn->error]); }
$conn->close();
?>