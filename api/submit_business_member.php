<?php
// api/submit_business_member.php
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

    $aadhaar_path = handleUpload('aadhaarFile', 'biz_aadhaar', $upload_dir);
    $photo_path = handleUpload('photoFile', 'biz_photo', $upload_dir);

    // Using 'address' as per table creation script
    $sql = "INSERT INTO business_members (full_name, father_name, address, phone_no, email_id, aadhaar_no, pan_no, company_name, company_address, experience_years, occupation, aadhaar_path, photo_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    if (!$stmt) throw new Exception("Prepare failed: " . $conn->error);

    $stmt->bind_param("sssssssssssss", 
        $data['fullName'], 
        $data['fatherName'], 
        $data['address'], 
        $data['phone'], 
        $data['email'], 
        $data['aadhar'], 
        $data['pan'], 
        $data['companyName'], 
        $data['companyAddress'], 
        $data['experience'], 
        $data['occupation'], 
        $aadhaar_path, 
        $photo_path
    );

    if ($stmt->execute()) {
        $response = ["status" => "success", "message" => "Business Member registered successfully"];
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
