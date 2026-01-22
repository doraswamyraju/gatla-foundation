<?php
require_once 'config.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = connectDB();

$category = isset($_GET['category']) ? $conn->real_escape_string($_GET['category']) : null;
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : null;

$sql = "SELECT * FROM gallery_images";
if ($category) {
    $sql .= " WHERE category = '$category'";
}
$sql .= " ORDER BY created_at DESC";

if ($limit) {
    $sql .= " LIMIT $limit";
}

$result = $conn->query($sql);

$images = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $images[] = $row;
    }
}

echo json_encode($images);

$conn->close();
?>
