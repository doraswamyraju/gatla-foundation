<?php
// submit_form.php - DEBUG VERSION TO CATCH 400 ERROR

// 1. Database connection configuration (MUST BE CORRECT!)
$servername = "localhost";
$username = "root";       // XAMPP Default
$password = "";           // XAMPP Default (blank)
$dbname = "gatla_foundation";   // Ensure this matches your database name

// 2. Set headers and handle CORS/Preflight
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(); 
}

// 3. Connect to database
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["message" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

// 4. Get and validate data
$raw_input = file_get_contents("php://input");
$data = json_decode($raw_input, true); 

// === DEBUG CODE: Check if data or keys are missing ===
if ($_SERVER["REQUEST_METHOD"] !== "POST" || empty($data) || empty($data['form_type']) || empty($data['payload'])) {
    http_response_code(400);
    $debug_message = [
        "message" => "Invalid request or incomplete data.",
        "received_data" => $data,
        "is_post" => $_SERVER["REQUEST_METHOD"] === "POST",
        "raw_input" => $raw_input
    ];
    echo json_encode($debug_message);
    $conn->close();
    exit();
}
// === END DEBUG CODE ===

$payload = $data['payload'];

// 5. Execution for Music Judge Form
if ($data['form_type'] === 'music_judge_form') {
    
    // ... (rest of the submission logic remains the same, assuming $payload is valid) ...
    // Sanitize and prepare data 
    $full_name = $conn->real_escape_string($payload['fullName'] ?? '');
    $father_name = $conn->real_escape_string($payload['fatherName'] ?? '');
    $full_address = $conn->real_escape_string($payload['fullAddress'] ?? '');
    $phone_no = $conn->real_escape_string($payload['phoneNo'] ?? '');
    $email_id = $conn->real_escape_string($payload['emailId'] ?? '');
    $aadhar_no = $conn->real_escape_string($payload['aadharNo'] ?? '');
    $qualification = $conn->real_escape_string($payload['qualification'] ?? '');
    $occupation = $conn->real_escape_string($payload['occupation'] ?? '');
    $exposure = $conn->real_escape_string($payload['exposure'] ?? '');

    $stmt = $conn->prepare("INSERT INTO music_judges (
        full_name, father_name, full_address, phone_no, email_id, aadhar_no,
        qualification, occupation, exposure
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    
    if ($stmt === false) {
        http_response_code(500);
        echo json_encode(["message" => "SQL Prepare Failed: " . $conn->error]);
    } else {
        $stmt->bind_param("sssssssss", 
            $full_name, $father_name, $full_address, $phone_no, $email_id, $aadhar_no,
            $qualification, $occupation, $exposure
        );
        
        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["message" => "Submission successful!"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Error executing query: " . $stmt->error]);
        }
        $stmt->close();
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Unknown form type."]);
}

$conn->close();