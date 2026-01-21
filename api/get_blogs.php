<?php
// api/get_blogs.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require 'db_env.php';

$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

$status_filter = isset($_GET['status']) ? $conn->real_escape_string($_GET['status']) : '';
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 0;

$sql = "SELECT * FROM blog_posts";
if ($status_filter) {
    $sql .= " WHERE status = '$status_filter'";
}
$sql .= " ORDER BY created_at DESC";
if ($limit > 0) {
    $sql .= " LIMIT $limit";
}

$result = $conn->query($sql);

$blogs = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $blogs[] = $row;
    }
}

echo json_encode($blogs);

$conn->close();
?>
