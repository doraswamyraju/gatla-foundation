<?php
// api/get_education_students.php

// 1. ALLOW CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 2. SUPPRESS HTML ERRORS
ini_set('display_errors', 0);
error_reporting(E_ALL);
ob_start();

require_once 'config.php'; 

$conn = connectDB();
if (!$conn) {
    ob_clean();
    echo json_encode(["status" => "error", "message" => "DB Connection failed"]); 
    exit(); 
}

// 3. FETCH DATA
$sql = "SELECT * FROM education_students ORDER BY id DESC";
$result = $conn->query($sql);
$data = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = [
            'id' => $row['id'],
            'studentName'      => $row['full_name'] ?? '',
            'fatherName'       => $row['father_name'] ?? '',
            'phone'            => $row['phone_no'] ?? '',
            'email'            => $row['email_id'] ?? '',
            'aadhaar'          => $row['aadhaar_no'] ?? '',
            'age'              => $row['age'] ?? '',
            'address'          => $row['address'] ?? '',
            'college'          => $row['school_college_name'] ?? '',
            'collegeAddress'   => $row['college_address'] ?? '',
            'year'             => $row['current_class_year'] ?? '',
            'subject'          => $row['scriber_subject'] ?? '',
            'examPlace'        => $row['place_of_exam'] ?? '',
            'examDate'         => $row['date_of_exam'] ?? '',
            'certNo'           => $row['disability_cert_no'] ?? '',
            'certificate'      => $row['disability_certificate'] ?? '',
            'status'           => $row['status'] ?? 'Pending',
            'date'             => isset($row['submission_date']) ? date('d M Y', strtotime($row['submission_date'])) : ''
        ];
    }
}

// 4. RETURN CLEAN JSON
ob_clean();
echo json_encode(["data" => $data]); // This wrapper matches your AdminDashboard logic
?>