<?php
// api/get_general_volunteers.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once 'config.php';

$conn = connectDB();

// Select all fields matching the frontend state names
$sql = "SELECT 
            id, 
            full_name as fullName, 
            father_name as fatherName, 
            phone_no as phone, 
            email_id as email, 
            address, 
            aadhaar_no as aadhar,          
            qualification, 
            occupation, 
            interest_area as interest,     
            availability, 
            preferred_time as preferredTime, 
            document_path, 
            status, 
            submission_date as date 
        FROM general_volunteers 
        ORDER BY submission_date DESC";

$result = $conn->query($sql);
$data = [];
if($result) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);
$conn->close();
?>