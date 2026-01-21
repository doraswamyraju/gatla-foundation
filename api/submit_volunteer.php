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
    // 4. Input Handling
    $inputJSON = file_get_contents("php://input");
    $data = json_decode($inputJSON, true);

    if (!$data) {
        throw new Exception("No data received");
    }

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
    $club_preference = $data['clubPreference'] ?? 'Education Club';

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
    $sql = "INSERT INTO $table (full_name, father_name, address, phone_no, email_id, aadhaar_no, pan_card_no, qualification, occupation, club_preference, status, submission_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())";

    $stmt = $conn->prepare($sql);

    // If prepare fails, it might throw or return false depending on config. Handle both.
    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("ssssssssss", $full_name, $father_name, $address, $phone_no, $email_id, $aadhaar_no, $pan_card_no, $qualification, $occupation, $club_preference);

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