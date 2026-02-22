<?php
// api/admin_reset_password.php
require_once 'config.php';

$conn = connectDB();

if (!$conn) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection failed."]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (isset($data->token) && isset($data->new_password)) {
    $token = $conn->real_escape_string($data->token);
    $newPassword = $data->new_password;

    $stmt = $conn->prepare("SELECT id, email, reset_expires FROM admin WHERE reset_token = ?");
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        
        // Check if token has expired
        $expires = strtotime($user['reset_expires']);
        if (time() > $expires) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Reset link has expired."]);
            exit();
        }

        // Token is valid, update password
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

        $updateStmt = $conn->prepare("UPDATE admin SET password = ?, reset_token = NULL, reset_expires = NULL WHERE id = ?");
        $updateStmt->bind_param("si", $hashedPassword, $user['id']);
        
        if ($updateStmt->execute()) {
            echo json_encode(["success" => true, "message" => "Password has been successfully updated."]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Failed to update password."]);
        }
        $updateStmt->close();

    } else {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Invalid reset token."]);
    }
    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Token and new password are required."]);
}

$conn->close();
?>
