<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once 'config.php';
$conn = connectDB();

$sql = "SELECT id, full_name, father_name, phone_no, email_id, aadhaar_no, address, qualification, occupation, subjects_of_interest, present_location, status, submission_date FROM education_scribers ORDER BY submission_date DESC";
$result = $conn->query($sql);

$data = [];
if ($result) { while ($row = $result->fetch_assoc()) { $data[] = $row; } }

echo json_encode($data);
$conn->close();
?>