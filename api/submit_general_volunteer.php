<?php
// api/submit_general_volunteer.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once 'config.php';
$conn = connectDB();

// 1. Handle File Upload
$file_path = null;
if (!empty($_FILES['document']['name'])) {
    $target_dir = "uploads/";
    if (!is_dir($target_dir)) mkdir($target_dir, 0755, true);
    $filename = time() . "_" . basename($_FILES["document"]["name"]);
    if (move_uploaded_file($_FILES["document"]["tmp_name"], $target_dir . $filename)) {
        $file_path = $filename;
    }
}

// 2. Prepare Data
$id = $_POST['id'] ?? null;
$fullName = $_POST['fullName'] ?? '';
$fatherName = $_POST['fatherName'] ?? '';
$phone = $_POST['phone'] ?? '';
$email = $_POST['email'] ?? '';
$address = $_POST['address'] ?? '';
$aadhar = $_POST['aadhar'] ?? '';       // New
$qualification = $_POST['qualification'] ?? ''; // New
$occupation = $_POST['occupation'] ?? '';       // New
$interest = $_POST['interest'] ?? '';           // New
$availability = $_POST['availability'] ?? '';
$preferredTime = $_POST['preferredTime'] ?? '';

if ($id) {
    // UPDATE
    $sql = "UPDATE general_volunteers SET full_name=?, father_name=?, phone_no=?, email_id=?, address=?, aadhaar_no=?, qualification=?, occupation=?, interest_area=?, availability=?, preferred_time=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssssssssi", $fullName, $fatherName, $phone, $email, $address, $aadhar, $qualification, $occupation, $interest, $availability, $preferredTime, $id);
    
    // Update file if new one uploaded
    if($file_path) {
        $conn->query("UPDATE general_volunteers SET document_path='$file_path' WHERE id=$id");
    }
} else {
    // INSERT
    $sql = "INSERT INTO general_volunteers (full_name, father_name, phone_no, email_id, address, aadhaar_no, qualification, occupation, interest_area, availability, preferred_time, document_path, status, submission_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssssssss", $fullName, $fatherName, $phone, $email, $address, $aadhar, $qualification, $occupation, $interest, $availability, $preferredTime, $file_path);
}

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}
$conn->close();
?>