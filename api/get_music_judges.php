<?php
// api/get_music_judges.php - FINAL SOLUTION WITH OUTPUT BUFFERING

// Start Output Buffering to catch any rogue output/errors
ob_start();

require_once 'config.php'; 

// Set headers for CORS and JSON response
header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Handle preflight CORS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    // Clean any accidental output before sending the response
    ob_clean();
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

// SQL query to retrieve all data
$sql = "SELECT id, full_name, father_name, full_address, phone_no, email_id, aadhar_no, qualification, occupation, exposure, status, submission_date FROM music_judges ORDER BY submission_date DESC";
$result = $conn->query($sql);

$judges = [];

if ($result === false) {
    http_response_code(500);
    ob_clean();
    echo json_encode(["message" => "SQL Query Failed: " . $conn->error]);
    $conn->close();
    exit();
}

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // MAPPING: Ensure keys match the DataTable.jsx expectations
        $judges[] = [
            'id' => $row['id'],
            'fullName' => $row['full_name'],
            'fatherName' => $row['father_name'],
            'address' => $row['full_address'],
            'phone' => $row['phone_no'],
            'email' => $row['email_id'],
            'aadhar' => $row['aadhar_no'],
            'qualification' => $row['qualification'],
            'occupation' => $row['occupation'],
            'expertise' => $row['exposure'], // Matches 'MUSICAL EXPERTISE' in DataTable
            'status' => $row['status'],
            'date' => $row['submission_date'],
        ];
    }
    http_response_code(200);
    // Clean any accidental output before sending the response
    ob_clean();
    echo json_encode(["data" => $judges]);
} else {
    http_response_code(200);
    ob_clean();
    echo json_encode(["data" => []]); // Return empty array if no records found
}

$conn->close();
// End buffering (it will automatically flush the final clean output)
ob_end_flush();