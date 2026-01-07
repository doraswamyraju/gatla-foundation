<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once 'config.php';

$conn = connectDB();
$sql = "SELECT id, full_name as fullName, father_name as fatherName, phone_no as phone, email_id as email, club_preference as clubPreference, status FROM cricket_volunteers ORDER BY submission_date DESC";
$result = $conn->query($sql);

$data = [];
while($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
$conn->close();
?>