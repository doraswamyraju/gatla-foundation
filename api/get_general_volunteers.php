<?php
// api/get_general_volunteers.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once 'config.php';

$conn = connectDB();

// Select all fields matching the frontend state names
// Combine all volunteer tables
// Using UNION ALL since IDs might collide, we might want to differentiate or just show them.
// Since Dashboard expects unique key, we can construct one or just rely on data.

// Refactored: Only fetch from general_volunteers (Master Table) to avoid duplicates
// The 'dual write' ensures all data is here.

$sql = "SELECT 
            id, 
            full_name as fullName, 
            father_name as fatherName, 
            phone_no as phone, 
            email_id as email, 
            address, 
            aadhaar_no as aadhar,
            pan_card_no as pan,          
            qualification, 
            occupation, 
            'general_volunteers' as source_table,
            club_preference,
            availability,
            start_date,
            end_date,
            aadhaar_path,
            photo_path,
            submission_date as date 
        FROM general_volunteers ORDER BY id DESC";

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