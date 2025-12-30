<?php
// api/get_education_donors.php

ob_start();
require_once 'config.php'; 
header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { ob_clean(); http_response_code(200); exit(); }
if ($_SERVER["REQUEST_METHOD"] !== "GET") { http_response_code(405); ob_clean(); echo json_encode(["message" => "Method not allowed."]); exit(); }

$conn = connectDB();
if (!$conn) { http_response_code(500); ob_clean(); echo json_encode(["message" => "Server error: Could not connect to database."]); exit(); }

$sql = "SELECT id, full_name, phone_no, email_id, pan_no, donation_type, donation_amount, status, submission_date FROM education_donors ORDER BY submission_date DESC";
$result = $conn->query($sql);
$data = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = [
            'id' => $row['id'],
            'fullName' => $row['full_name'],
            'phone' => $row['phone_no'],
            'email' => $row['email_id'],
            'panNo' => $row['pan_no'],
            'donationType' => $row['donation_type'],
            'donationAmount' => $row['donation_amount'],
            'status' => $row['status'],
            'date' => $row['submission_date'],
        ];
    }
}
http_response_code(200); ob_clean(); echo json_encode(["data" => $data]);
$conn->close();
ob_end_flush();