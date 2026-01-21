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

$tables = [
    'general_volunteers',
    'education_volunteers',
    'cricket_volunteers',
    'music_volunteers',
    'business_volunteers',
    'awards_volunteers'
];

$sqlParts = [];

foreach ($tables as $t) {
    // Ensure table exists to prevent SQL error if one is missing
    $check = $conn->query("SHOW TABLES LIKE '$t'");
    if ($check && $check->num_rows > 0) {
        $sqlParts[] = "SELECT 
            id, 
            full_name as fullName, 
            father_name as fatherName, 
            phone_no as phone, 
            email_id as email, 
            address, 
            aadhaar_no as aadhar,
            pan_card_no as pan, /* Making sure PAN is here too */
            qualification, 
            occupation, 
            availability,       /* NEW */
            preferred_time,     /* NEW */
            aadhaar_path,       /* NEW */
            photo_path,         /* NEW */
            '$t' as source_table, 
            club_preference,
            status, 
            submission_date as date 
        FROM $t";
    }
}

if (empty($sqlParts)) {
    echo json_encode([]);
    exit;
}

$sql = implode(" UNION ALL ", $sqlParts) . " ORDER BY date DESC";

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