<?php
// api/submit_awards_application.php
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
    $disability_certificate_path = '';
    $press_clips_path = '';
    $biodata_path = '';
    $photo_path = '';

    // Helper for file uploads
    function handleUpload($fileKey, $prefix, $dir) {
        if (isset($_FILES[$fileKey]) && $_FILES[$fileKey]['error'] === UPLOAD_ERR_OK) {
            $name = basename($_FILES[$fileKey]['name']);
            $path = $prefix . '_' . time() . '_' . $name;
            if(move_uploaded_file($_FILES[$fileKey]['tmp_name'], $dir . $path)) {
                return $path;
            }
        }
        return '';
    }

    $aadhaar_path = handleUpload('aadhaarFile', 'award_aadhaar', $upload_dir);
    $disability_certificate_path = handleUpload('disabilityFile', 'award_disability', $upload_dir);
    $press_clips_path = handleUpload('pressClipsFile', 'award_press', $upload_dir);
    $biodata_path = handleUpload('biodataFile', 'award_bio', $upload_dir);
    $photo_path = handleUpload('photoFile', 'award_photo', $upload_dir);

    $sql = "INSERT INTO awards_applications (full_name, father_name, full_address, phone_no, email_id, aadhaar_no, disability_category, occupation, experience, achievement, aadhaar_path, disability_certificate_path, press_clips_path, biodata_path, photo_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    if (!$stmt) throw new Exception("Prepare failed: " . $conn->error);

    $stmt->bind_param("sssssssssssssss", 
        $data['fullName'], 
        $data['fatherName'], 
        $data['address'], // Maps to full_address
        $data['phone'], 
        $data['email'], 
        $data['aadhar'], // Maps to aadhaar_no
        $data['disabilityCategory'], 
        $data['occupation'], 
        $data['experience'], 
        $data['achievement'], 
        $aadhaar_path, 
        $disability_certificate_path, 
        $press_clips_path, 
        $biodata_path, 
        $photo_path
    );

    if ($stmt->execute()) {
        $response = ["status" => "success", "message" => "Awards application submitted successfully"];
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
