<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: text/plain');

echo "=== System Info ===\n";
echo "PHP User: " . exec('whoami') . "\n";
echo "PHP User (posix): " . (function_exists('posix_getpwuid') ? posix_getpwuid(posix_geteuid())['name'] : 'N/A') . "\n";
echo "Document Root: " . $_SERVER['DOCUMENT_ROOT'] . "\n";
echo "Current Directory: " . __DIR__ . "\n";

$target_dir = __DIR__ . "/../uploads/";
echo "\n=== Upload Directory Check ===\n";
echo "Target dir path: $target_dir\n";
echo "Target dir exists: " . (file_exists($target_dir) ? 'Yes' : 'No') . "\n";
if (file_exists($target_dir)) {
    echo "Is directory: " . (is_dir($target_dir) ? 'Yes' : 'No') . "\n";
    echo "Permissions (octal): " . substr(sprintf('%o', fileperms($target_dir)), -4) . "\n";
    echo "Writable: " . (is_writable($target_dir) ? 'Yes' : 'No') . "\n";
} else {
    echo "Attempting to create directory...\n";
    if (mkdir($target_dir, 0777, true)) {
        echo "SUCCESS: Created directory.\n";
        echo "Permissions (octal): " . substr(sprintf('%o', fileperms($target_dir)), -4) . "\n";
        echo "Writable: " . (is_writable($target_dir) ? 'Yes' : 'No') . "\n";
    } else {
        echo "FAIL: Could not create directory.\n";
        $err = error_get_last();
        echo "Error detail: " . ($err ? $err['message'] : 'Unknown error') . "\n";
    }
}

echo "\n=== Database Connection Check ===\n";
if (file_exists('config.php')) {
    require_once 'config.php';
    header('Content-Type: text/plain'); // override json header
    $conn = connectDB();
    if ($conn) {
        echo "SUCCESS: Database connected!\n";
        // Check if table gallery_images exists
        $check = $conn->query("SHOW TABLES LIKE 'gallery_images'");
        if ($check && $check->num_rows > 0) {
            echo "Table 'gallery_images' exists.\n";
        } else {
            echo "Table 'gallery_images' does NOT exist. Re-checking table creation:\n";
            $table_check = "CREATE TABLE IF NOT EXISTS gallery_images (
                id INT(11) AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NULL,
                category VARCHAR(100) NOT NULL,
                image_path VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )";
            if ($conn->query($table_check)) {
                echo "SUCCESS: Created table 'gallery_images'.\n";
            } else {
                echo "FAIL: Could not create table: " . $conn->error . "\n";
            }
        }
        $conn->close();
    } else {
        echo "FAIL: Database connection failed.\n";
    }
} else {
    echo "FAIL: config.php not found.\n";
}
?>
