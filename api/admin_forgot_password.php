<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
// api/admin_forgot_password.php
require_once 'config.php';
require('libs/PHPMailer/Exception.php');
require('libs/PHPMailer/PHPMailer.php');
require('libs/PHPMailer/SMTP.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$conn = connectDB();

if (!$conn) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection failed."]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (isset($data->email)) {
    $email = $conn->real_escape_string($data->email);

    $stmt = $conn->prepare("SELECT id FROM admin WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        // Email found, generate token
        $token = bin2hex(random_bytes(32));
        // Token expires in 1 hour
        $expires = date('Y-m-d H:i:s', strtotime('+1 hour'));

        $updateStmt = $conn->prepare("UPDATE admin SET reset_token = ?, reset_expires = ? WHERE email = ?");
        $updateStmt->bind_param("sss", $token, $expires, $email);
        
        if ($updateStmt->execute()) {
            // Send Email using PHPMailer
            $mail = new PHPMailer(true);
            try {
                $mail->isSMTP();
                $mail->Host       = 'smtp.gmail.com';
                $mail->SMTPAuth   = true;
                $mail->Username   = 'rajugariventures@gmail.com'; 
                $mail->Password   = 'orbtmslxrzjmibxw'; 
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port = 587;

                $mail->setFrom('rajugariventures@gmail.com', 'Gatla Foundation System');
                $mail->addAddress($email);

                $mail->isHTML(true);
                $mail->Subject = 'Password Reset Request';
                
                // Use frontend URL for reset link
                $resetLink = "https://gatlafoundation.org/reset-password?token=" . $token;
                
                $mail->Body = "
                    <h3>Password Reset Request</h3>
                    <p>We received a request to reset your admin password.</p>
                    <p>Click the link below to set a new password:</p>
                    <p><a href='{$resetLink}'>{$resetLink}</a></p>
                    <p>If you did not request this, you can safely ignore this email.</p>
                ";

                $mail->send();
                echo json_encode(["success" => true, "message" => "If the email exists, a reset link has been sent."]);

            } catch (Exception $e) {
                http_response_code(500);
                echo json_encode(["success" => false, "message" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
            }
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Failed to generate reset token."]);
        }
        $updateStmt->close();

    } else {
        // Obscure whether email exists for security
        echo json_encode(["success" => true, "message" => "If the email exists, a reset link has been sent."]);
    }
    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Email is required."]);
}

$conn->close();
?>
