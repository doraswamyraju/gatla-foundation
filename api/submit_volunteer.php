<?php
// api/submit_volunteer.php
// BULLETPROOF VERSION: Suppresses HTML errors to ensure clean JSON

ob_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

ini_set('display_errors', 0);
error_reporting(E_ALL);

require_once 'config.php';

try {
    $data = $_POST;
    
    $conn = connectDB();
    if (!$conn) throw new Exception("Database connection returned null");

    // Extract Data
    $full_name = $data['fullName'] ?? '';
    $father_name = $data['fatherName'] ?? '';
    $address = $data['address'] ?? '';
    $phone_no = $data['phone'] ?? '';
    $email_id = $data['email'] ?? '';
    $aadhaar_no = $data['aadhar'] ?? '';
    $pan_card_no = $data['pan'] ?? '';
    $qualification = $data['qualification'] ?? '';
    $occupation = $data['occupation'] ?? '';
    $club_preference = $data['clubPreference'] ?? 'Education Club';
    $interest_area = $club_preference; // Redundant as per user request
    $availability = $data['availability'] ?? '';
    $start_date = $data['startDate'] ?? null;
    $end_date = $data['endDate'] ?? null;

    // File Upload Handling
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

    // 1. Insert into GENERAL_VOLUNTEERS (Master Table)
    // Using explicit columns: aadhaar_path, photo_path. Removing status to rely on default.
    $general_sql = "INSERT INTO general_volunteers (full_name, father_name, address, phone_no, email_id, aadhaar_no, pan_card_no, qualification, occupation, interest_area, club_preference, availability, start_date, end_date, aadhaar_path, photo_path, submission_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";

    $stmt = $conn->prepare($general_sql);
    if (!$stmt) throw new Exception("Prepare General failed: " . $conn->error);
    
    $stmt->bind_param("ssssssssssssssss", $full_name, $father_name, $address, $phone_no, $email_id, $aadhaar_no, $pan_card_no, $qualification, $occupation, $interest_area, $club_preference, $availability, $start_date, $end_date, $aadhaar_path, $photo_path);
    
    if (!$stmt->execute()) {
        throw new Exception("Execute General failed: " . $stmt->error);
    }
    $stmt->close();

    // 2. Insert into SPECIFIC CLUB TABLE (Dual Write)
    if ($club_preference !== 'General') {
        $tableMap = [
            'Education Club' => 'education_volunteers',
            'Cricket Club'   => 'cricket_volunteers',
            'Music Club'     => 'music_volunteers',
            'Business Club'  => 'business_volunteers',
            'Awards Club'    => 'awards_volunteers'
        ];

        if (array_key_exists($club_preference, $tableMap)) {
            $specific_table = $tableMap[$club_preference];
            
            $club_sql = "INSERT INTO $specific_table (full_name, father_name, address, phone_no, email_id, aadhaar_no, pan_card_no, qualification, occupation, interest_area, club_preference, availability, start_date, end_date, aadhaar_path, photo_path, submission_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";
            
            $stmt_club = $conn->prepare($club_sql);
            if ($stmt_club) {
                $stmt_club->bind_param("ssssssssssssssss", $full_name, $father_name, $address, $phone_no, $email_id, $aadhaar_no, $pan_card_no, $qualification, $occupation, $interest_area, $club_preference, $availability, $start_date, $end_date, $aadhaar_path, $photo_path);
                $stmt_club->execute();
                $stmt_club->close();
            }
        }
    }

    $response = ["status" => "success", "message" => "Application submitted successfully"];
    $conn->close();

} catch (Exception $e) {
    ob_clean();
    $response = ["status" => "error", "message" => $e->getMessage()];
}

ob_clean();
echo json_encode($response);
exit;
?>