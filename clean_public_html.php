<?php
/**
 * clean_public_html.php
 * 
 * This script removes Gatla Foundation files and folders from the current directory.
 * Use this to clean up your public_html folder if it contains old foundation files.
 */

// List of files and folders to delete
$to_delete = [
    'api',
    'assets',
    'static',
    'index.html',
    'favicon.ico',
    'logo192.png',
    'logo512.png',
    'logo512.png.jpg',
    'manifest.json',
    'robots.txt',
    'asset-manifest.json',
    '.htaccess',
    'clean_public_html.php' // Self delete at the end
];

echo "<h2>Cleaning up Gatla Foundation files from the current directory...</h2>";
echo "<ul style='font-family: monospace;'>";

foreach ($to_delete as $item) {
    if (file_exists($item)) {
        if (is_dir($item)) {
            // Recursive delete for directories
            if (delete_directory($item)) {
                echo "<li style='color: green;'>Folder deleted: $item</li>";
            } else {
                echo "<li style='color: red;'>Failed to delete folder: $item</li>";
            }
        } else {
            if (unlink($item)) {
                echo "<li style='color: green;'>File deleted: $item</li>";
            } else {
                echo "<li style='color: red;'>Failed to delete file: $item</li>";
            }
        }
    } else {
        echo "<li style='color: gray;'>Not found: $item</li>";
    }
}

echo "</ul>";
echo "<h3>Cleanup finished.</h3>";

// Function to recursively delete a directory
function delete_directory($dir) {
    if (!file_exists($dir)) return true;
    if (!is_dir($dir)) return unlink($dir);
    foreach (scandir($dir) as $item) {
        if ($item == '.' || $item == '..') continue;
        if (!delete_directory($dir . DIRECTORY_SEPARATOR . $item)) return false;
    }
    return rmdir($dir);
}
?>
