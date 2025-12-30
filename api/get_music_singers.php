<?php
// api/get_music_singer.php - CORS and Output Buffer Fix

// Start Output Buffering (Safety net against phantom errors/characters)
ob_start();

require_once 'config.php'; 

// === CRITICAL FIX: CORS HEADERS ===
header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
// ===================================

// Handle preflight CORS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    ob_clean();
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);
    ob_clean();
    echo json_encode(["message" => "Method not allowed."]);
    exit();
}

$conn = connectDB();
if (!$conn) {
    http_response_code(500);
    ob_clean();
    echo json_encode(["message" => "Server error: Could not connect to database."]);
    exit();
}

// SQL query to retrieve data from the music_singers table
$sql = "SELECT id, full_name, father_name, full_address, phone_no, aadhar_no, email_id, disability_cert_no, music_category, goal, status, submission_date FROM music_singers ORDER BY submission_date DESC";
$result = $conn->query($sql);

$singers = [];

if ($result === false) {
    http_response_code(500);
    ob_clean();
    echo json_encode(["message" => "SQL Query Failed: " . $conn->error]);
    $conn->close();
    exit();
}

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // MAPPING: Map database fields to the camelCase keys expected by the React component.
        $singers[] = [
            'id' => $row['id'],
            'fullName' => $row['full_name'],
            'fatherName' => $row['father_name'],
            'address' => $row['full_address'],
            'phone' => $row['phone_no'],
            'aadhar' => $row['aadhar_no'],
            'email' => $row['email_id'],
            'disabilityCertNo' => $row['disability_cert_no'],
            'musicCategory' => $row['music_category'],
            'goal' => $row['goal'],
            'status' => $row['status'],
            'date' => $row['submission_date'],
        ];
    }
    http_response_code(200);
    ob_clean();
    echo json_encode(["data" => $singers]);
} else {
    http_response_code(200);
    ob_clean();
    echo json_encode(["data" => []]); // Return empty array if no records found
}

$conn->close();
ob_end_flush();