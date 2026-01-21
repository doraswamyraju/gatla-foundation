<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require 'config.php';
$conn = connectDB();
if (!$conn) die(json_encode(["status" => "error", "message" => "Connection failed"]));
$status_filter = isset($_GET['status']) ? $conn->real_escape_string($_GET['status']) : '';
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 0;
$sql = "SELECT * FROM blog_posts";
if ($status_filter) $sql .= " WHERE status = '$status_filter'";
$sql .= " ORDER BY created_at DESC";
if ($limit > 0) $sql .= " LIMIT $limit";
$result = $conn->query($sql);
$blogs = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) $blogs[] = $row;
}
echo json_encode($blogs);
$conn->close();
?>