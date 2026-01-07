<?php
// api/submit_education_student.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require_once 'config.php';
$conn = connectDB();

// 1. Handle File Upload (Certificate)
$file_path = null;
if (!empty($_FILES['disability_certificate']['name'])) {
    $target_dir = "uploads/";
    if (!is_dir($target_dir)) mkdir($target_dir, 0755, true);
    $filename = time() . "_edu_" . basename($_FILES["disability_certificate"]["name"]);
    if (move_uploaded_file($_FILES["disability_certificate"]["tmp_name"], $target_dir . $filename)) {
        $file_path = $filename;
    }
}

// 2. Prepare Data
$id = $_POST['id'] ?? null;
// Mapped variables from React Form to MySQL Columns
$full_name = $_POST['full_name'] ?? '';
$father_name = $_POST['father_name'] ?? '';
$phone_no = $_POST['phone_no'] ?? '';
$email_id = $_POST['email_id'] ?? '';
$aadhaar_no = $_POST['aadhaar_no'] ?? '';
$age = $_POST['age'] ?? '';
$address = $_POST['address'] ?? '';
$school_college_name = $_POST['school_college_name'] ?? '';
$current_class_year = $_POST['current_class_year'] ?? '';
$college_address = $_POST['college_address'] ?? '';
$scriber_subject = $_POST['scriber_subject'] ?? '';
$place_of_exam = $_POST['place_of_exam'] ?? '';
$date_of_exam = $_POST['date_of_exam'] ?? '';
$disability_cert_no = $_POST['disability_cert_no'] ?? '';

if ($id) {
    // UPDATE
    $sql = "UPDATE education_students SET full_name=?, father_name=?, phone_no=?, email_id=?, aadhaar_no=?, age=?, address=?, school_college_name=?, current_class_year=?, college_address=?, scriber_subject=?, place_of_exam=?, date_of_exam=?, disability_cert_no=? WHERE id=?";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssssssssssi", $full_name, $father_name, $phone_no, $email_id, $aadhaar_no, $age, $address, $school_college_name, $current_class_year, $college_address, $scriber_subject, $place_of_exam, $date_of_exam, $disability_cert_no, $id);
    
    // Update file path only if new file is uploaded
    if ($file_path) {
        $conn->query("UPDATE education_students SET disability_certificate_path='$file_path' WHERE id=$id");
    }

} else {
    // INSERT
    $sql = "INSERT INTO education_students (full_name, father_name, phone_no, email_id, aadhaar_no, age, address, school_college_name, current_class_year, college_address, scriber_subject, place_of_exam, date_of_exam, disability_cert_no, disability_certificate_path, status, submission_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssssssssssss", $full_name, $father_name, $phone_no, $email_id, $aadhaar_no, $age, $address, $school_college_name, $current_class_year, $college_address, $scriber_subject, $place_of_exam, $date_of_exam, $disability_cert_no, $file_path);
}

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}
$conn->close();
?>