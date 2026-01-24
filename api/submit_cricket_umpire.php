<?php
// api/submit_cricket_umpire.php
ob_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'config.php';

try {
    $data = $_POST;
    $conn = connectDB();

    $upload_dir = '../uploads/';
    if (!file_exists($upload_dir)) mkdir($upload_dir, 0777, true);

    $aadhaar_path = '';
    $photo_path = '';

    if (isset($_FILES['aadhaarFile']) && $_FILES['aadhaarFile']['error'] === UPLOAD_ERR_OK) {
        $name = basename($_FILES['aadhaarFile']['name']);
        $aadhaar_path = 'umpire_aadhaar_' . time() . '_' . $name;
        move_uploaded_file($_FILES['aadhaarFile']['tmp_name'], $upload_dir . $aadhaar_path);
    }

    if (isset($_FILES['photoFile']) && $_FILES['photoFile']['error'] === UPLOAD_ERR_OK) {
        $name = basename($_FILES['photoFile']['name']);
        $photo_path = 'umpire_photo_' . time() . '_' . $name;
        move_uploaded_file($_FILES['photoFile']['tmp_name'], $upload_dir . $photo_path);
    }

    $sql = "INSERT INTO cricket_umpires (full_name, father_name, address, phone_no, email_id, aadhaar_no, matches_count, experience_years, aadhaar_path, photo_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssssss", $data['fullName'], $data['fatherName'], $data['address'], $data['phone'], $data['email'], $data['aadhar'], $data['matchesCount'], $data['experience'], $aadhaar_path, $photo_path);

    if ($stmt->execute()) {
        $response = ["status" => "success", "message" => "Umpire registered successfully"];
    } else {
        throw new Exception("Database Error: " . $stmt->error);
    }
    $conn->close();

} catch (Exception $e) {
    $response = ["status" => "error", "message" => $e->getMessage()];
}

ob_clean();
echo json_encode($response);
exit;
?>
