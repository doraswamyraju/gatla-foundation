<?php
// api/submit_common.php
// MASTER SUBMISSION HANDLER - Supports JSON and Multipart/Form-Data (File Uploads)

// 1. CORS & HEADERS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 2. ERROR REPORTING (Disable display, enable logging)
ini_set('display_errors', 0);
error_reporting(E_ALL);

require_once 'config.php';
$conn = connectDB();

if (!$conn) {
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit();
}

// 3. INPUT HANDLING (Universal)
$type = '';
$data = [];
$file_path = null; // Default to null if no file uploaded

// CHECK: Is this a POST request with FormData (has $_POST) or a raw JSON request?
if (!empty($_POST['formType'])) {
    // A. Handle Multipart/Form-Data (File Uploads come here)
    $type = $_POST['formType'];
    $data = $_POST; // Direct access to fields like 'fullName', 'phone', etc.

    // B. Handle File Upload Logic
    if (!empty($_FILES['document']['name'])) {
        $target_dir = "uploads/";
        
        // Create directory if it doesn't exist
        if (!is_dir($target_dir)) {
            mkdir($target_dir, 0755, true);
        }

        // Clean filename to prevent issues (timestamp + random + original name)
        $filename = time() . "_" . rand(1000, 9999) . "_" . basename($_FILES["document"]["name"]);
        $target_file = $target_dir . $filename;
        
        // Move file
        if (move_uploaded_file($_FILES["document"]["tmp_name"], $target_file)) {
            $file_path = $filename; // Save strictly the filename (or relative path)
        }
    }
} else {
    // C. Handle Raw JSON (Fallback for forms without files)
    $input = json_decode(file_get_contents("php://input"), true);
    if ($input) {
        $type = $input['formType'] ?? '';
        $data = $input['formData'] ?? [];
    }
}

// Validation
if (empty($type) || empty($data)) {
    echo json_encode(["status" => "error", "message" => "Invalid or empty data received."]);
    exit();
}

// 4. MASTER SWITCH - ROUTE TO TABLES
$stmt = null;

switch ($type) {
    
    // --- 1. GENERAL VOLUNTEER (Matches your Frontend + Database) ---
    case 'volunteer-form':
        $sql = "INSERT INTO general_volunteers (
            full_name, father_name, address, phone_no, email_id, 
            aadhaar_no, qualification, occupation, interest_area, 
            availability, preferred_time, document_path, status, submission_date
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())";
        
        $stmt = $conn->prepare($sql);
        // Bind 12 variables (s = string)
        $stmt->bind_param("ssssssssssss", 
            $data['fullName'], 
            $data['fatherName'], 
            $data['address'], 
            $data['phone'], 
            $data['email'], 
            $data['aadhar'],
            $data['qualification'],
            $data['occupation'],
            $data['interest'],
            $data['availability'],   
            $data['preferredTime'], // DateTime string from frontend
            $file_path              // NULL or filename
        );
        break;

    // --- 2. SUPPORTER FORM (Generic) ---
    case 'supporter-form':
        $sql = "INSERT INTO general_supporters (full_name, father_name, address, phone_no, aadhaar_no, pan_card_no, email_id, occupation, support_type, status, submission_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssssss", $data['fullName'], $data['fatherName'], $data['address'], $data['phone'], $data['aadhar'], $data['pan'], $data['email'], $data['occupation'], $data['supportType']);
        break;

    // --- 3. CRICKET CLUB ---
    case 'cricket-player':
        $sql = "INSERT INTO cricket_players (full_name, father_name, full_address, phone_no, email_id, aadhaar_no, disability_cert_no, category, experience_years, status, submission_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssssss", $data['fullName'], $data['fatherName'], $data['address'], $data['phone'], $data['email'], $data['aadhar'], $data['disabilityCert'], $data['category'], $data['experience']);
        break;

    case 'cricket-umpire':
        $sql = "INSERT INTO cricket_umpires (full_name, father_name, address, phone_no, email_id, aadhaar_no, matches_officiated, experience_years, status, submission_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssssss", $data['fullName'], $data['fatherName'], $data['address'], $data['phone'], $data['email'], $data['aadhar'], $data['matchesCount'], $data['experience']);
        break;

    case 'cricket-club-member':
        $sql = "INSERT INTO cricket_members (full_name, father_name, address, phone_no, email_id, aadhaar_no, role, status, submission_date) VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssss", $data['fullName'], $data['fatherName'], $data['address'], $data['phone'], $data['email'], $data['aadhar'], $data['role']);
        break;

    // --- 4. EDUCATION CLUB ---
    case 'education-student':
        $sql = "INSERT INTO education_students (full_name, father_name, address, phone_no, email_id, aadhaar_no, age, school_college_name, college_address, current_class_year, scriber_subject, date_of_exam, status, submission_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssssssssss", $data['fullName'], $data['fatherName'], $data['address'], $data['phone'], $data['email'], $data['aadhar'], $data['age'], $data['college'], $data['collegeAddress'], $data['yearStudy'], $data['scribeSubject'], $data['examDate']);
        break;

    case 'education-scriber':
        $sql = "INSERT INTO education_scribers (full_name, father_name, full_address, phone_no, email_id, aadhaar_no, qualification, subjects, location, status, submission_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssssss", $data['fullName'], $data['fatherName'], $data['address'], $data['phone'], $data['email'], $data['aadhar'], $data['qualification'], $data['subjects'], $data['location']);
        break;

    // --- 5. MUSIC CLUB ---
    case 'music-singer':
        $sql = "INSERT INTO music_singers (full_name, father_name, full_address, phone_no, aadhaar_no, disability_cert_no, music_category, goal, status, submission_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssssss", $data['fullName'], $data['fatherName'], $data['address'], $data['phone'], $data['aadhar'], $data['disabilityCert'], $data['category'], $data['goal']);
        break;

    case 'music-member':
        $sql = "INSERT INTO music_members (full_name, phone_no, role, status, submission_date) VALUES (?, ?, ?, 'Pending', NOW())";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $data['fullName'], $data['phone'], $data['role']);
        break;

    case 'music-judge':
        $sql = "INSERT INTO music_judges (full_name, exposure, phone_no, status, submission_date) VALUES (?, ?, ?, 'Pending', NOW())";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $data['fullName'], $data['expertise'], $data['phone']);
        break;

    // --- 6. BUSINESS CLUB ---
    case 'business-entrepreneur':
        $sql = "INSERT INTO business_entrepreneurs (full_name, business_idea, phone_no, status, submission_date) VALUES (?, ?, ?, 'Pending', NOW())";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $data['fullName'], $data['businessIdea'], $data['phone']);
        break;

    case 'business-member':
        $sql = "INSERT INTO business_members (full_name, business_name, phone_no, status, submission_date) VALUES (?, ?, ?, 'Pending', NOW())";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $data['fullName'], $data['businessName'], $data['phone']);
        break;

    // --- 7. AWARDS ---
    case 'awards-nomination':
        $sql = "INSERT INTO awards_nominations (nominee_name, category, achievement, phone_no, status, submission_date) VALUES (?, ?, ?, ?, 'Pending', NOW())";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssss", $data['nomineeName'], $data['category'], $data['achievement'], $data['phone']);
        break;

    case 'awards-sponsor':
        $sql = "INSERT INTO awards_sponsors (sponsor_name, amount, phone_no, status, submission_date) VALUES (?, ?, ?, 'Pending', NOW())";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $data['sponsorName'], $data['amount'], $data['phone']);
        break;
        
    // --- 8. FALLBACK DONORS (For Manual Entry) ---
    case 'education-donor':
    case 'cricket-donor':
    case 'music-donor':
    case 'business-donor':
        $table_map = [
            'education-donor' => 'education_donors',
            'cricket-donor' => 'cricket_donors', // Ensure table exists
            'music-donor' => 'music_donors',       // Ensure table exists
            'business-donor' => 'business_donors'  // Ensure table exists
        ];
        $target_table = $table_map[$type] ?? 'general_donations';
        
        $sql = "INSERT INTO $target_table (donor_name, amount, phone_no, status, submission_date) VALUES (?, ?, ?, 'Pending', NOW())";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $data['name'], $data['amount'], $data['phone']);
        break;

    default:
        echo json_encode(["status" => "error", "message" => "Unknown Form Type: " . $type]);
        exit();
}

// 5. EXECUTION & RESPONSE
if ($stmt) {
    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Application submitted successfully!"]);
    } else {
        // Detailed error for debugging (remove specific SQL errors in production)
        echo json_encode(["status" => "error", "message" => "Database Error: " . $stmt->error]);
    }
    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Failed to prepare statement. Check Table Structure."]);
}

$conn->close();
?>