<?php
header("Content-Type: text/plain");
require_once 'config.php';
$conn = connectDB();

echo "Starting Database Setup...\n\n";

// 1. Cricket Members Table
$sql1 = "CREATE TABLE IF NOT EXISTS `cricket_members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) DEFAULT NULL,
  `father_name` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `phone_no` varchar(50) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `aadhaar_no` varchar(50) DEFAULT NULL,
  `disability_cert_no` varchar(50) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `aadhaar_path` varchar(255) DEFAULT NULL,
  `disability_cert_path` varchar(255) DEFAULT NULL,
  `photo_path` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Pending',
  `submission_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

if ($conn->query($sql1) === TRUE) {
    echo "Table 'cricket_members' created or already exists.\n";
} else {
    echo "Error creating table 'cricket_members': " . $conn->error . "\n";
}

// 2. Cricket Players Table
$sql2 = "CREATE TABLE IF NOT EXISTS `cricket_players` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) DEFAULT NULL,
  `father_name` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `phone_no` varchar(50) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `aadhaar_no` varchar(50) DEFAULT NULL,
  `disability_cert_no` varchar(50) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `aadhaar_path` varchar(255) DEFAULT NULL,
  `disability_cert_path` varchar(255) DEFAULT NULL,
  `photo_path` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Pending',
  `submission_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

if ($conn->query($sql2) === TRUE) {
    echo "Table 'cricket_players' created or already exists.\n";
} else {
    echo "Error creating table 'cricket_players': " . $conn->error . "\n";
}

// 3. Add Columns if missing (Safe ALTER)
$tables = ['cricket_members', 'cricket_players'];
$columns = ['aadhaar_path', 'disability_cert_path', 'photo_path'];

foreach ($tables as $table) {
    foreach ($columns as $col) {
        $check = $conn->query("SHOW COLUMNS FROM `$table` LIKE '$col'");
        if ($check && $check->num_rows == 0) {
             if ($conn->query("ALTER TABLE `$table` ADD COLUMN `$col` varchar(255) DEFAULT NULL")) {
                 echo "Added column '$col' to '$table'.\n";
             } else {
                 echo "Error adding column '$col' to '$table': " . $conn->error . "\n";
             }
        }
    }
}

echo "\nDatabase Setup Completed.";
$conn->close();
?>
