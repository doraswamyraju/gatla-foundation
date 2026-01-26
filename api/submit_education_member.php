<?php
// api/submit_education_member.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'config.php';

try {
    $conn = connectDB();
    
    // Ensure uploads directory exists
    $upload_dir = '../uploads/';
    if (!file_exists($upload_dir)) mkdir($upload_dir, 0777, true);

    // Helpers
    function handleUpload($fileKey, $prefix, $dir) {
        if (isset($_FILES[$fileKey]) && $_FILES[$fileKey]['error'] === UPLOAD_ERR_OK) {
            $ext = pathinfo($_FILES[$fileKey]['name'], PATHINFO_EXTENSION);
            $filename = $prefix . '_' . time() . '_' . uniqid() . '.' . $ext;
            if (move_uploaded_file($_FILES[$fileKey]['tmp_name'], $dir . $filename)) {
                return $filename; // Store relative filename or path as needed
            }
        }
        return '';
    }

    // 1. Get POST Data
    $full_name = $_POST['full_name'] ?? '';
    $father_name = $_POST['father_name'] ?? '';
    $address = $_POST['address'] ?? '';
    $phone_no = $_POST['phone_no'] ?? '';
    $email_id = $_POST['email_id'] ?? '';
    $aadhaar_no = $_POST['aadhaar_no'] ?? '';
    $disability_cert_no = $_POST['disability_cert_no'] ?? '';
    $category = $_POST['category'] ?? '';

    // 2. Handle Files
    $aadhaar_path = handleUpload('aadhaar_file', 'edu_mem_aadhaar', $upload_dir);
    $disability_cert_path = handleUpload('disability_cert_file', 'edu_mem_disability', $upload_dir);
    $photo_path = handleUpload('photo_file', 'edu_mem_photo', $upload_dir);

    // 3. Insert
    $sql = "INSERT INTO education_members (full_name, father_name, address, phone_no, email_id, aadhaar_no, disability_cert_no, category, aadhaar_path, disability_cert_path, photo_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    if (!$stmt) throw new Exception("Prepare failed: " . $conn->error);

    $stmt->bind_param("sssssssssss", $full_name, $father_name, $address, $phone_no, $email_id, $aadhaar_no, $disability_cert_no, $category, $aadhaar_path, $disability_cert_path, $photo_path);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Education Club Member registered successfully"]);
    } else {
        throw new Exception("Execute failed: " . $stmt->error);
    }

    $conn->close();

} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
