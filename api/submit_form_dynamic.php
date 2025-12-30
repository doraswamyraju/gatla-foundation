<?php
// api/submit_form_dynamic.php - FINAL VERSION

// Start Output Buffering (Safety net for phantom characters/errors)
ob_start();

require_once 'config.php'; // Assumes config.php contains the connectDB() function

// Set headers for CORS
header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    ob_clean();
    http_response_code(200);
    exit(); 
}

$data = json_decode(file_get_contents("php://input"), true); 

if ($_SERVER["REQUEST_METHOD"] !== "POST" || empty($data['form_type']) || empty($data['payload'])) {
    ob_clean();
    http_response_code(400);
    echo json_encode(["message" => "Invalid request or incomplete data."]);
    exit();
}

$form_type = $data['form_type'];
$payload = $data['payload'];
$conn = connectDB();

if (!$conn) {
    ob_clean();
    http_response_code(500);
    echo json_encode(["message" => "Database connection failed."]);
    exit();
}

// --- Dynamic Insertion Logic ---

switch ($form_type) {
    // CRITICAL FIX: Handles the 'music_judge' key sent from the frontend
    case 'music_judge': 
        $table = 'music_judges';
        $fields = ['full_name', 'father_name', 'full_address', 'phone_no', 'email_id', 'aadhar_no', 'qualification', 'occupation', 'exposure'];
        $values = [
            $conn->real_escape_string($payload['fullName'] ?? ''),
            $conn->real_escape_string($payload['fatherName'] ?? ''),
            $conn->real_escape_string($payload['fullAddress'] ?? ''),
            $conn->real_escape_string($payload['phoneNo'] ?? ''),
            $conn->real_escape_string($payload['emailId'] ?? ''),
            $conn->real_escape_string($payload['aadharNo'] ?? ''),
            $conn->real_escape_string($payload['qualification'] ?? ''),
            $conn->real_escape_string($payload['occupation'] ?? ''),
            $conn->real_escape_string($payload['exposure'] ?? ''),
        ];
        $types = 'sssssssss';
        break;
    case 'music_singer': // NEW CASE for Singer Form
        $table = 'music_singers';
        $fields = [
            'full_name', 'father_name', 'full_address', 'phone_no', 'aadhar_no', 
            'email_id', 'disability_cert_no', 'music_category', 'goal'
        ];
        $values = [
            $conn->real_escape_string($payload['fullName'] ?? ''),
            $conn->real_escape_string($payload['fatherName'] ?? ''),
            $conn->real_escape_string($payload['fullAddress'] ?? ''),
            $conn->real_escape_string($payload['phoneNo'] ?? ''),
            $conn->real_escape_string($payload['aadharNo'] ?? ''),
            $conn->real_escape_string($payload['emailId'] ?? ''),
            $conn->real_escape_string($payload['disabilityCertNo'] ?? ''),
            $conn->real_escape_string($payload['musicCategory'] ?? ''),
            $conn->real_escape_string($payload['goal'] ?? ''),
        ];
        $types = 'sssssssss'; // All nine fields are strings
        break;
        
    case 'cricket_player':
        $table = 'cricket_players';
        $fields = ['full_name', 'phone_no', 'age', 'role', 'address']; 
        $values = [
            $conn->real_escape_string($payload['fullName'] ?? ''),
            $conn->real_escape_string($payload['phoneNo'] ?? ''),
            $conn->real_escape_string($payload['age'] ?? ''),
            $conn->real_escape_string($payload['role'] ?? ''),
            $conn->real_escape_string($payload['fullAddress'] ?? ''),
        ];
        $types = 'sssss'; 
        break;
        
   

  
    case 'business_entrepreneur':
        $table = 'business_entrepreneurs';
        $fields = ['business_name', 'owner_name', 'phone_no', 'email_id', 'industry']; 
        $values = [
            $conn->real_escape_string($payload['businessName'] ?? ''),
            $conn->real_escape_string($payload['ownerName'] ?? ''),
            $conn->real_escape_string($payload['phoneNo'] ?? ''),
            $conn->real_escape_string($payload['emailId'] ?? ''),
            $conn->real_escape_string($payload['industry'] ?? ''),
        ];
        $types = 'sssss';
        break;
        
    default:
        ob_clean();
        http_response_code(400);
        echo json_encode(["message" => "Unknown form type: " . $form_type]);
        $conn->close();
        exit();
}

// --- Execute Prepared Statement ---
$field_list = implode(', ', $fields);
$placeholder_list = implode(', ', array_fill(0, count($fields), '?'));

// NOTE: Assumes status column is present in all target tables
$stmt = $conn->prepare("INSERT INTO $table ($field_list, status) VALUES ($placeholder_list, 'Pending')");

if ($stmt === false) {
    ob_clean();
    http_response_code(500);
    echo json_encode(["message" => "SQL Prepare Failed: " . $conn->error]);
} else {
    // Bind parameters dynamically
    $bind_params = array_merge([$types], $values);
    // Use call_user_func_array for binding dynamically (more robust than bind_param)
    call_user_func_array(array($stmt, 'bind_param'), $bind_params);
    
    if ($stmt->execute()) {
        $insert_id = $conn->insert_id;
        ob_clean();
        http_response_code(201);
        echo json_encode(["message" => "Submission successful!", "id" => $insert_id]);
    } else {
        ob_clean();
        http_response_code(500);
        echo json_encode(["message" => "Error executing query: " . $stmt->error]);
    }
    $stmt->close();
}

$conn->close();
ob_end_flush();