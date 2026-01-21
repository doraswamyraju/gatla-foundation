<?php
header("Content-Type: text/plain");
ini_set('display_errors', 1);
error_reporting(E_ALL);
require_once 'config.php';
$conn = connectDB();

echo "Fixing 'education_donors' table columns...\n";

// 1. Rename full_name -> donor_name
// Check if full_name exists
$check1 = $conn->query("SHOW COLUMNS FROM `education_donors` LIKE 'full_name'");
if ($check1 && $check1->num_rows > 0) {
    if ($conn->query("ALTER TABLE `education_donors` CHANGE `full_name` `donor_name` VARCHAR(255) NOT NULL")) {
        echo "[SUCCESS] Renamed 'full_name' to 'donor_name'.\n";
    } else {
        echo "[ERROR] Failed to rename 'full_name': " . $conn->error . "\n";
    }
} else {
    echo "[INFO] 'full_name' column not found (maybe already renamed to donor_name).\n";
}

// 2. Rename pan_no -> pan_card_no
$check2 = $conn->query("SHOW COLUMNS FROM `education_donors` LIKE 'pan_no'");
if ($check2 && $check2->num_rows > 0) {
    if ($conn->query("ALTER TABLE `education_donors` CHANGE `pan_no` `pan_card_no` VARCHAR(20) DEFAULT NULL")) {
        echo "[SUCCESS] Renamed 'pan_no' to 'pan_card_no'.\n";
    } else {
        echo "[ERROR] Failed to rename 'pan_no': " . $conn->error . "\n";
    }
} else {
    echo "[INFO] 'pan_no' column not found (maybe already renamed to pan_card_no).\n";
}

// 3. Ensure payment_id exists
$check3 = $conn->query("SHOW COLUMNS FROM `education_donors` LIKE 'payment_id'");
if ($check3 && $check3->num_rows == 0) {
    if ($conn->query("ALTER TABLE `education_donors` ADD COLUMN `payment_id` VARCHAR(255) DEFAULT NULL")) {
        echo "[SUCCESS] Added 'payment_id' column.\n";
    } else {
        echo "[ERROR] Failed to add 'payment_id': " . $conn->error . "\n";
    }
} else {
    echo "[INFO] 'payment_id' column already exists.\n";
}

$conn->close();
echo "\nDone. Please try the donation form again.";
?>
