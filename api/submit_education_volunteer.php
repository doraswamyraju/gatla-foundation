<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");
require_once 'config.php';
$conn = connectDB();

// File Uploads
$aadhaar_path = uploadFile('aadhaar_file', __DIR__ . '/../uploads/');
$photo_path = uploadFile('photo_file', __DIR__ . '/../uploads/');

function uploadFile($key, $target_dir) {
    if (!empty($_FILES[$key]['name'])) {
        if (!is_dir($target_dir)) mkdir($target_dir, 0755, true);
        $filename = time() . "_" . basename($_FILES[$key]["name"]);
        if (move_uploaded_file($_FILES[$key]["tmp_name"], $target_dir . $filename)) return $filename;
    }
    return null;
}

$id = $_POST['id'] ?? null;
$full_name = $_POST['full_name'] ?? '';
$father_name = $_POST['father_name'] ?? '';
$address = $_POST['address'] ?? '';
$phone_no = $_POST['phone_no'] ?? '';
$email_id = $_POST['email_id'] ?? '';
$aadhaar_no = $_POST['aadhaar_no'] ?? '';
$qualification = $_POST['qualification'] ?? '';
$occupation = $_POST['occupation'] ?? '';
$area_of_interest = $_POST['area_of_interest'] ?? '';
$availability = $_POST['availability'] ?? '';

if ($id) {
    $sql = "UPDATE education_volunteers SET full_name=?, father_name=?, address=?, phone_no=?, email_id=?, aadhaar_no=?, qualification=?, occupation=?, area_of_interest=?, availability=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssssssi", $full_name, $father_name, $address, $phone_no, $email_id, $aadhaar_no, $qualification, $occupation, $area_of_interest, $availability, $id);
    if($aadhaar_path) $conn->query("UPDATE education_volunteers SET aadhaar_path='$aadhaar_path' WHERE id=$id");
    if($photo_path) $conn->query("UPDATE education_volunteers SET photo_path='$photo_path' WHERE id=$id");
} else {
    $sql = "INSERT INTO education_volunteers (full_name, father_name, address, phone_no, email_id, aadhaar_no, qualification, occupation, area_of_interest, availability, aadhaar_path, photo_path, status, submission_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssssssss", $full_name, $father_name, $address, $phone_no, $email_id, $aadhaar_no, $qualification, $occupation, $area_of_interest, $availability, $aadhaar_path, $photo_path);
}

if ($stmt->execute()) echo json_encode(["status" => "success"]);
else echo json_encode(["status" => "error", "message" => $conn->error]);
$conn->close();
?>