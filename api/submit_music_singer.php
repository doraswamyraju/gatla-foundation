<?php
// api/submit_music_singer.php
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
    $disability_path = '';
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

    $aadhaar_path = handleUpload('aadhaarFile', 'singer_aadhaar', $upload_dir);
    $disability_path = handleUpload('disabilityFile', 'singer_disability', $upload_dir);
    $photo_path = handleUpload('photoFile', 'singer_photo', $upload_dir);

    $sql = "INSERT INTO music_singers (full_name, father_name, address, phone_no, email_id, aadhaar_no, disability_certificate_no, music_category, goal, aadhaar_path, disability_certificate_path, photo_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    if (!$stmt) throw new Exception("Prepare failed: " . $conn->error);

    $stmt->bind_param("ssssssssssss", 
        $data['fullName'], 
        $data['fatherName'], 
        $data['address'], 
        $data['phone'], 
        $data['email'], 
        $data['aadhar'], 
        $data['disabilityCertNo'], 
        $data['musicCategory'], 
        $data['goal'], 
        $aadhaar_path, 
        $disability_path, 
        $photo_path
    );

    if ($stmt->execute()) {
        $response = ["status" => "success", "message" => "Singer registered successfully"];
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
