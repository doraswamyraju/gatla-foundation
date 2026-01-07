<?php
// api/test_email.php
// Debugging for rajugariventures@gmail.com

ini_set('display_errors', 1);
error_reporting(E_ALL);

echo "<h3>1. Checking Library Files...</h3>";

if (!file_exists('libs/phpmailer/PHPMailer.php')) {
    die("<span style='color:red'>ERROR: Library files missing. Please upload the 'libs' folder to 'gatlafoundation.org/api/libs'.</span>");
}
echo "<span style='color:green'>Library files found.</span><br>";

require('libs/phpmailer/Exception.php');
require('libs/phpmailer/PHPMailer.php');
require('libs/phpmailer/SMTP.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

echo "<h3>2. Attempting to Send Email...</h3>";

$mail = new PHPMailer(true);

try {
    $mail->SMTPDebug = 2; // Show detailed logs
    $mail->Debugoutput = 'html';

    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    
    // UPDATED CREDENTIALS
    $mail->Username   = 'rajugariventures@gmail.com'; 
    $mail->Password   = 'hkqvcycnylgqhzim'; // <--- PASTE NEW APP PASSWORD
    
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;

    // Sender & Recipient
    $mail->setFrom('rajugariventures@gmail.com', 'Gatla Test');
    $mail->addAddress('rajugariventures@gmail.com'); // Sending to yourself to test

    $mail->isHTML(true);
    $mail->Subject = 'Test Email Success';
    $mail->Body    = 'The email configuration is correct!';

    $mail->send();
    echo "<h2 style='color:green'>SUCCESS: Email sent!</h2>";

} catch (Exception $e) {
    echo "<h2 style='color:red'>FAILURE: " . $mail->ErrorInfo . "</h2>";
}
?>