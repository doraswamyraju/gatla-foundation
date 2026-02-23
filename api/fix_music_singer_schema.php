<?php
// api/fix_music_singer_schema.php
require_once 'config.php';
$conn = connectDB();

if (!$conn) {
    die(json_encode(["error" => "Database connection failed."]));
}

echo "Starting Music Singers Table Schema Fix...<br>";

// 1. Check current columns
$result = $conn->query("SHOW COLUMNS FROM music_singers");
$columns = [];
while ($row = $result->fetch_assoc()) {
    $columns[] = $row['Field'];
}

echo "Current columns: " . implode(", ", $columns) . "<br>";

$queries = [];

// Rename disability_cert_no if it exists
if (in_array('disability_cert_no', $columns) && !in_array('disability_certificate_no', $columns)) {
    $queries[] = "ALTER TABLE music_singers CHANGE disability_cert_no disability_certificate_no VARCHAR(50)";
}

// Ensure full_address exists (if it's named 'address')
if (in_array('address', $columns) && !in_array('full_address', $columns)) {
    $queries[] = "ALTER TABLE music_singers CHANGE address full_address TEXT";
}

// Add missing path columns
if (!in_array('aadhaar_path', $columns)) {
    $queries[] = "ALTER TABLE music_singers ADD COLUMN aadhaar_path VARCHAR(255) AFTER goal";
}
if (!in_array('disability_certificate_path', $columns)) {
    $queries[] = "ALTER TABLE music_singers ADD COLUMN disability_certificate_path VARCHAR(255) AFTER aadhaar_path";
}
if (!in_array('photo_path', $columns)) {
    $queries[] = "ALTER TABLE music_singers ADD COLUMN photo_path VARCHAR(255) AFTER disability_certificate_path";
}

// Remove redundant aadhar_no if both exist
if (in_array('aadhar_no', $columns) && in_array('aadhaar_no', $columns)) {
    $queries[] = "ALTER TABLE music_singers DROP COLUMN aadhar_no";
}

if (empty($queries)) {
    echo "No changes needed. Schema is already correct.<br>";
} else {
    foreach ($queries as $sql) {
        if ($conn->query($sql) === TRUE) {
            echo "Successfully ran: $sql<br>";
        } else {
            echo "Error running query ($sql): " . $conn->error . "<br>";
        }
    }
}

$conn->close();
echo "Schema Fix Complete.<br>";
?>
