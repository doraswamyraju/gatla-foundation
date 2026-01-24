<?php
// api/submit_volunteer.php
// BULLETPROOF VERSION: Suppresses HTML errors to ensure clean JSON

// 1. Start Output Buffering (Traps any HTML warnings/errors)
// 1. Start Output Buffering (Traps any HTML warnings/errors)
ob_start();

// 2. Set Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// 3. Disable Display Errors (Log them instead)
ini_set('display_errors', 0);
error_reporting(E_ALL);

require_once 'config.php';

try {
    // 4. Input Handling (Switch from JSON to POST/FILES)
    $data = $_POST;
    
    // 5. Database Connection (Exception safe)
    try {
        $conn = connectDB();
        if (!$conn) {
             throw new Exception("Database connection returned null");
        }
    } catch (Exception $e) {
         throw new Exception("Database Connection Error: " . $e->getMessage());
    }

    // 6. Extract Data
    $full_name = $data['fullName'] ?? '';
    $father_name = $data['fatherName'] ?? '';
    $address = $data['address'] ?? '';
    $phone_no = $data['phone'] ?? '';
    $email_id = $data['email'] ?? '';
    $aadhaar_no = $data['aadhar'] ?? '';
    $pan_card_no = $data['pan'] ?? '';
    $qualification = $data['qualification'] ?? '';
    $occupation = $data['occupation'] ?? '';
    $availability = $data['availability'] ?? '';
    // $preferred_time = $data['preferredTime'] ?? ''; // DEPRECATED
    $start_date = $data['startDate'] ?? null;
    $end_date = $data['endDate'] ?? null;
    $club_preference = $data['clubPreference'] ?? 'Education Club';

    // 6a. File Upload Handling
    $upload_dir = '../uploads/';
    if (!file_exists($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }
    
    $aadhaar_path = '';
    $photo_path = '';

    // Handle Aadhaar File
    if (isset($_FILES['aadhaarFile']) && $_FILES['aadhaarFile']['error'] === UPLOAD_ERR_OK) {
        $tmp_name = $_FILES['aadhaarFile']['tmp_name'];
        $name = basename($_FILES['aadhaarFile']['name']);
        $aadhaar_path = 'volunteer_aadhaar_' . time() . '_' . $name;
        move_uploaded_file($tmp_name, $upload_dir . $aadhaar_path);
    }

    // Handle Photo File
    if (isset($_FILES['photoFile']) && $_FILES['photoFile']['error'] === UPLOAD_ERR_OK) {
        $tmp_name = $_FILES['photoFile']['tmp_name'];
        $name = basename($_FILES['photoFile']['name']);
        $photo_path = 'volunteer_photo_' . time() . '_' . $name;
        move_uploaded_file($tmp_name, $upload_dir . $photo_path);
    }

    // 7. Route to Correct Table
    $tableMap = [
        'Education Club' => 'education_volunteers',
        'Cricket Club'   => 'cricket_volunteers',
        'Music Club'     => 'music_volunteers',
        'Business Club'  => 'business_volunteers',
        'Awards Club'    => 'awards_volunteers',
        'General'        => 'general_volunteers'
    ];

    $table = $tableMap[$club_preference] ?? 'general_volunteers';

    // 8. Prepare Query
    // Updated to include availability, start_date, end_date, aadhaar_path, photo_path
    // Note: removed preferred_time
    $sql = "INSERT INTO $table (full_name, father_name, address, phone_no, email_id, aadhaar_no, pan_card_no, qualification, occupation, availability, start_date, end_date, aadhaar_path, photo_path, club_preference, status, submission_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())";

    $stmt = $conn->prepare($sql);

    // If prepare fails, it might throw or return false depending on config. Handle both.
    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }

    // Bind 15 parameters (sssssssssssssss)
    $stmt->bind_param("sssssssssssssss", $full_name, $father_name, $address, $phone_no, $email_id, $aadhaar_no, $pan_card_no, $qualification, $occupation, $availability, $start_date, $end_date, $aadhaar_path, $photo_path, $club_preference);

    if ($stmt->execute()) {
        $response = ["status" => "success", "message" => "Application submitted successfully for $club_preference"];
    } else {
        throw new Exception("Execute failed: " . $stmt->error);
    }

    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    // Catch ANY error (Connection, SQL, Logic) and return JSON
    $response = ["status" => "error", "message" => $e->getMessage()];
}

// Final Output
ob_clean(); // Discard any previous noise
echo json_encode($response);
exit;
?>