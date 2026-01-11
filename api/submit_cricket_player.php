<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");
require_once 'config.php';
$conn = connectDB();

function uploadFile($key) {
    if (!empty($_FILES[$key]['name'])) {
        $target_dir = "uploads/";
        if (!is_dir($target_dir)) mkdir($target_dir, 0755, true);
        $filename = time() . "_" . basename($_FILES[$key]["name"]);
        if (move_uploaded_file($_FILES[$key]["tmp_name"], $target_dir . $filename)) return $filename;
    }
    return null;
}

$id = $_POST['id'] ?? null;
// ... (Variables match member form)
$full_name = $_POST['full_name'] ?? ''; $father_name = $_POST['father_name'] ?? ''; $address = $_POST['address'] ?? ''; $phone_no = $_POST['phone_no'] ?? ''; $email_id = $_POST['email_id'] ?? ''; $aadhaar_no = $_POST['aadhaar_no'] ?? ''; $disability_cert_no = $_POST['disability_cert_no'] ?? ''; $category = $_POST['category'] ?? '';

$aadhaar_path = uploadFile('aadhaar_file');
$disability_cert_path = uploadFile('disability_cert_file');
$photo_path = uploadFile('photo_file');

if ($id) {
    $sql = "UPDATE cricket_players SET full_name=?, father_name=?, address=?, phone_no=?, email_id=?, aadhaar_no=?, disability_cert_no=?, category=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssssi", $full_name, $father_name, $address, $phone_no, $email_id, $aadhaar_no, $disability_cert_no, $category, $id);
    if($aadhaar_path) $conn->query("UPDATE cricket_players SET aadhaar_path='$aadhaar_path' WHERE id=$id");
    if($disability_cert_path) $conn->query("UPDATE cricket_players SET disability_cert_path='$disability_cert_path' WHERE id=$id");
    if($photo_path) $conn->query("UPDATE cricket_players SET photo_path='$photo_path' WHERE id=$id");
} else {
    $sql = "INSERT INTO cricket_players (full_name, father_name, address, phone_no, email_id, aadhaar_no, disability_cert_no, category, aadhaar_path, disability_cert_path, photo_path, status, submission_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssssssss", $full_name, $father_name, $address, $phone_no, $email_id, $aadhaar_no, $disability_cert_no, $category, $aadhaar_path, $disability_cert_path, $photo_path);
}

if ($stmt->execute()) echo json_encode(["status" => "success"]);
else echo json_encode(["status" => "error", "message" => $conn->error]);
$conn->close();
?>