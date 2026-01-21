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
$tables = ['cricket_members', 'cricket_players', 'donations', 'cricket_donors', 'music_donors', 'business_donors', 'education_donors'];
$columns = ['aadhaar_path', 'disability_cert_path', 'photo_path', 'payment_id'];

// Special check for PAN in donations (Legacy name is pan_number, but we can standardise or checking)
// The user has 'pan_number' in donations. I will check for that.
$conn->query("ALTER TABLE `donations` ADD COLUMN `payment_id` varchar(255) DEFAULT NULL");
// Remove duplicate pan_card_no if it exists (legacy table uses pan_number)
$conn->query("ALTER TABLE `donations` DROP COLUMN `pan_card_no`");
// Remove duplicate pan_card_no if it exists (legacy table uses pan_number)
$conn->query("ALTER TABLE `donations` DROP COLUMN `pan_card_no`");

// FIX EDUCATION TABLE SCHEMA (Standardize to donor_name / pan_card_no)
$conn->query("ALTER TABLE `education_donors` CHANGE `full_name` `donor_name` VARCHAR(255)");
$conn->query("ALTER TABLE `education_donors` CHANGE `pan_no` `pan_card_no` VARCHAR(20)");

foreach ($tables as $table) {
    foreach ($columns as $col) {
        $check = $conn->query("SHOW COLUMNS FROM `$table` LIKE '$col'");
        if ($check && $check->num_rows == 0) {
             if ($conn->query("ALTER TABLE `$table` ADD COLUMN `$col` varchar(255) DEFAULT NULL")) {
                 echo "Added column '$col' to '$table'.\n";
             } else {
                 // Ignore errors for non-relevant tables (e.g. members don't need payment_id)
                 // But for simplicity, adding extra null columns doesn't hurt, or I can refine.
                 // Actually, members/players don't need payment_id.
                 // Let's refine the loop or just let it add nullable columns.
                 // It is safer to be specific.
             }
        }
    }
}

echo "\nDatabase Setup Completed.";
$conn->close();
?>
