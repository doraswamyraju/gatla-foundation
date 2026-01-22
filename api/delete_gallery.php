<?php
require_once 'config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Using POST for simpler deletion body content, or could use DELETE
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'])) {
    http_response_code(400);
    echo json_encode(["error" => "No ID provided"]);
    exit();
}

$conn = connectDB();
$id = intval($data['id']);

// 1. Get filename to delete from server
$sql_get = "SELECT image_path FROM gallery_images WHERE id = $id";
$result = $conn->query($sql_get);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $filePath = __DIR__ . "/uploads/" . $row['image_path'];
    
    // 2. Delete entry from DB
    $sql_del = "DELETE FROM gallery_images WHERE id = $id";
    if ($conn->query($sql_del) === TRUE) {
        // 3. Delete file if exists
        if (file_exists($filePath)) {
            unlink($filePath);
        }
        echo json_encode(["message" => "Image deleted successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Database error: " . $conn->error]);
    }
} else {
    http_response_code(404);
    echo json_encode(["error" => "Image not found"]);
}

$conn->close();
?>
