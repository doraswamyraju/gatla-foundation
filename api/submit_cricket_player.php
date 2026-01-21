<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

// Enable Error Logging
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', 'php_errors.log');
error_reporting(E_ALL);

// Log the request for debugging
file_put_contents('debug_log.txt', date('[Y-m-d H:i:s] ') . "Request received: " . print_r($_POST, true) . "\n", FILE_APPEND);
if (!empty($_FILES)) {
    file_put_contents('debug_log.txt', date('[Y-m-d H:i:s] ') . "Files received: " . print_r($_FILES, true) . "\n", FILE_APPEND);
}

require_once 'config.php';
$conn = connectDB();

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

function uploadFile($key) {
    if (!empty($_FILES[$key]['name']) && $_FILES[$key]['error'] === UPLOAD_ERR_OK) {
        $target_dir = "uploads/";
        if (!is_dir($target_dir)) mkdir($target_dir, 0755, true);
        
        $original_name = basename($_FILES[$key]["name"]);
        $fileType = strtolower(pathinfo($original_name, PATHINFO_EXTENSION));
        $filename = time() . "_" . uniqid() . "." . $fileType;
        
        if (move_uploaded_file($_FILES[$key]["tmp_name"], $target_dir . $filename)) {
            return $filename; 
        } else {
            file_put_contents('debug_log.txt', "Failed to move file: $key\n", FILE_APPEND);
        }
    } elseif (!empty($_FILES[$key]['error'])) {
         file_put_contents('debug_log.txt', "Upload Error for $key: " . $_FILES[$key]['error'] . "\n", FILE_APPEND);
    }
    return null;
}

try {
    $id = $_POST['id'] ?? null;
    // Variables
    $full_name = $_POST['full_name'] ?? '';
    $father_name = $_POST['father_name'] ?? '';
    $address = $_POST['address'] ?? '';
    $phone_no = $_POST['phone_no'] ?? '';
    $email_id = $_POST['email_id'] ?? '';
    $aadhaar_no = $_POST['aadhaar_no'] ?? '';
    $disability_cert_no = $_POST['disability_cert_no'] ?? '';
    $category = $_POST['category'] ?? '';

    // File Uploads
    $aadhaar_path = uploadFile('aadhaar_file');
    $disability_cert_path = uploadFile('disability_cert_file');
    $photo_path = uploadFile('photo_file');

    if ($id) {
        $sql = "UPDATE cricket_players SET full_name=?, father_name=?, address=?, phone_no=?, email_id=?, aadhaar_no=?, disability_cert_no=?, category=? WHERE id=?";
        $stmt = $conn->prepare($sql);
        if (!$stmt) throw new Exception("Prepare failed: " . $conn->error);
        $stmt->bind_param("ssssssssi", $full_name, $father_name, $address, $phone_no, $email_id, $aadhaar_no, $disability_cert_no, $category, $id);
        
        if($aadhaar_path) $conn->query("UPDATE cricket_players SET aadhaar_path='$aadhaar_path' WHERE id=$id");
        if($disability_cert_path) $conn->query("UPDATE cricket_players SET disability_cert_path='$disability_cert_path' WHERE id=$id");
        if($photo_path) $conn->query("UPDATE cricket_players SET photo_path='$photo_path' WHERE id=$id");
    } else {
        $sql = "INSERT INTO cricket_players (full_name, father_name, address, phone_no, email_id, aadhaar_no, disability_cert_no, category, aadhaar_path, disability_cert_path, photo_path, status, submission_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())";
        $stmt = $conn->prepare($sql);
        if (!$stmt) throw new Exception("Prepare failed: " . $conn->error);
        $stmt->bind_param("sssssssssss", $full_name, $father_name, $address, $phone_no, $email_id, $aadhaar_no, $disability_cert_no, $category, $aadhaar_path, $disability_cert_path, $photo_path);
    }

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Record saved successfully"]);
    } else {
        throw new Exception("Execute failed: " . $stmt->error);
    }
    $stmt->close();

} catch (Exception $e) {
    file_put_contents('debug_log.txt', "Exception: " . $e->getMessage() . "\n", FILE_APPEND);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}

$conn->close();
?>