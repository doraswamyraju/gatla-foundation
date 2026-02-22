<?php
// api/migrate_admin_table.php
require_once 'config.php';
$conn = connectDB();

if (!$conn) {
    die(json_encode(["error" => "Database connection failed."]));
}

echo "Starting Admin Table Migration...\n<br>";

// 1. Create the `admin` table if it doesn't exist.
$sqlCreate = "CREATE TABLE IF NOT EXISTS `admin` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `email` varchar(255) NOT NULL UNIQUE,
    `password` varchar(255) NOT NULL,
    `reset_token` varchar(255) DEFAULT NULL,
    `reset_expires` datetime DEFAULT NULL,
    `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

if ($conn->query($sqlCreate) === TRUE) {
    echo "Table 'admin' is ready.\n<br>";
} else {
    die("Error creating table: " . $conn->error);
}

// 2. Insert default admin if not exists
$defaultEmail = 'doraswamyraju.ca@gmail.com';
$defaultPassword = 'password'; // The user can change this later
$hashedPassword = password_hash($defaultPassword, PASSWORD_DEFAULT);

$stmt = $conn->prepare("SELECT id FROM admin WHERE email = ?");
$stmt->bind_param("s", $defaultEmail);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    // Insert the user
    $insertStmt = $conn->prepare("INSERT INTO admin (email, password) VALUES (?, ?)");
    $insertStmt->bind_param("ss", $defaultEmail, $hashedPassword);
    if ($insertStmt->execute()) {
        echo "Default admin user ($defaultEmail) created successfully.\n<br>";
    } else {
        echo "Error inserting default admin: " . $insertStmt->error . "\n<br>";
    }
    $insertStmt->close();
} else {
    echo "Default admin user ($defaultEmail) already exists. No new user created.\n<br>";
}

$stmt->close();
$conn->close();
echo "Migration Complete.\n<br>";
?>
