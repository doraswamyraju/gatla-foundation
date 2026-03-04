<?php
// api/test_mail_func.php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$to = "doraswamyraju.ca@gmail.com";
$subject = "Test PHP mail() function";
$message = "This is a test email sent using the PHP mail() function from gatlafoundation.org.";
$headers = "From: gatlafoundation@gmail.com\r\n";

if(mail($to, $subject, $message, $headers)) {
    echo "<h2>SUCCESS: Email sent using mail()!</h2>";
} else {
    echo "<h2>FAILURE: mail() function failed.</h2>";
}
?>
