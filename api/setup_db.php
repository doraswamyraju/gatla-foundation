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

// 4. DONOR TABLES SETUP
$donorTables = [
    'cricket_donors' => "CREATE TABLE IF NOT EXISTS `cricket_donors` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `donor_name` varchar(255) NOT NULL,
        `amount` decimal(10,2) NOT NULL,
        `phone_no` varchar(20) NOT NULL,
        `email_id` varchar(255) DEFAULT NULL,
        `address` text DEFAULT NULL,
        `pan_card_no` varchar(20) DEFAULT NULL,
        `status` varchar(50) DEFAULT 'Pending',
        `submission_date` timestamp NOT NULL DEFAULT current_timestamp(),
        PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",

    'music_donors' => "CREATE TABLE IF NOT EXISTS `music_donors` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `donor_name` varchar(255) NOT NULL,
        `amount` decimal(10,2) NOT NULL,
        `phone_no` varchar(20) NOT NULL,
        `email_id` varchar(255) DEFAULT NULL,
        `address` text DEFAULT NULL,
        `pan_card_no` varchar(20) DEFAULT NULL,
        `status` varchar(50) DEFAULT 'Pending',
        `submission_date` timestamp NOT NULL DEFAULT current_timestamp(),
        PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",

    'business_donors' => "CREATE TABLE IF NOT EXISTS `business_donors` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `donor_name` varchar(255) NOT NULL,
        `amount` decimal(10,2) NOT NULL,
        `phone_no` varchar(20) NOT NULL,
        `email_id` varchar(255) DEFAULT NULL,
        `address` text DEFAULT NULL,
        `pan_card_no` varchar(20) DEFAULT NULL,
        `status` varchar(50) DEFAULT 'Pending',
        `submission_date` timestamp NOT NULL DEFAULT current_timestamp(),
        PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",
    
    'education_donors' => "CREATE TABLE IF NOT EXISTS `education_donors` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `donor_name` varchar(255) NOT NULL,
        `amount` decimal(10,2) NOT NULL,
        `phone_no` varchar(20) NOT NULL,
        `email_id` varchar(255) DEFAULT NULL,
        `address` text DEFAULT NULL,
        `pan_card_no` varchar(20) DEFAULT NULL,
        `status` varchar(50) DEFAULT 'Pending',
        `submission_date` timestamp NOT NULL DEFAULT current_timestamp(),
        PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"
];

foreach ($donorTables as $tableName => $sql) {
    if ($conn->query($sql) === TRUE) {
        echo "Table '$tableName' created or already exists.\n";
    } else {
        echo "Error creating table '$tableName': " . $conn->error . "\n";
    }
}

// 3. Add Columns if missing (Safe ALTER)
$tables = ['cricket_members', 'cricket_players', 'donations'];
$columns = ['aadhaar_path', 'disability_cert_path', 'photo_path'];

// Special check for PAN in donations
$conn->query("ALTER TABLE `donations` ADD COLUMN `pan_card_no` varchar(20) DEFAULT NULL");
$conn->query("ALTER TABLE `donations` ADD COLUMN `donor_name` varchar(255) DEFAULT NULL"); // Ensure these exist too
$conn->query("ALTER TABLE `donations` ADD COLUMN `email_id` varchar(255) DEFAULT NULL");

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
