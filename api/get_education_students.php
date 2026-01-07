<?php
// api/get_education_students.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once 'config.php';

$conn = connectDB();

// Select all fields matching the Frontend Form State names
$sql = "SELECT 
            id, 
            full_name, 
            father_name, 
            phone_no, 
            email_id, 
            aadhaar_no, 
            age, 
            address, 
            school_college_name, 
            current_class_year, 
            college_address, 
            scriber_subject, 
            place_of_exam, 
            date_of_exam, 
            disability_cert_no, 
            disability_certificate_path, 
            status, 
            submission_date 
        FROM education_students 
        ORDER BY submission_date DESC";

$result = $conn->query($sql);
$data = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);
$conn->close();
?>