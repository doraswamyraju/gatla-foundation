<?php
require_once 'config.php';
$conn = connectDB();

if (!$conn) {
    die("Connection failed");
}

$email = "drgatlasrinivasareddy@gmail.com";
$password = "Admin@123";
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("SELECT id FROM admin WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo "Admin user $email already exists.\n";
} else {
    $insertStmt = $conn->prepare("INSERT INTO admin (email, password) VALUES (?, ?)");
    $insertStmt->bind_param("ss", $email, $hashedPassword);
    if ($insertStmt->execute()) {
        echo "Admin user $email successfully created.\n";
    } else {
        echo "Error creating user: " . $insertStmt->error . "\n";
    }
    $insertStmt->close();
}

$stmt->close();
$conn->close();
?>
