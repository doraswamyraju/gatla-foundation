<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
require 'config.php';
$conn = connectDB();
if (!$conn) die(json_encode(["status" => "error", "message" => "Connection failed"]));
$imagePath = null;
if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
    $target_dir = __DIR__ . "/uploads/";
    if (!file_exists($target_dir)) mkdir($target_dir, 0777, true);
    $ext = pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION);
    $new_filename = uniqid() . "_blog." . $ext;
    if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_dir . $new_filename)) {
        $imagePath = $new_filename;
    }
}
$id = isset($_POST['id']) ? intval($_POST['id']) : null;
$title = isset($_POST['title']) ? $conn->real_escape_string($_POST['title']) : '';
$content = isset($_POST['content']) ? $conn->real_escape_string($_POST['content']) : '';
$category = isset($_POST['category']) ? $conn->real_escape_string($_POST['category']) : 'General';
$status = isset($_POST['status']) ? $conn->real_escape_string($_POST['status']) : 'Draft';
if ($id) {
    $sql = "UPDATE blog_posts SET title='$title', content='$content', category='$category', status='$status'";
    if ($imagePath) $sql .= ", image_path='$imagePath'";
    $sql .= " WHERE id=$id";
} else {
    $imgVal = $imagePath ? "'$imagePath'" : "NULL";
    $sql = "INSERT INTO blog_posts (title, content, category, status, image_path) VALUES ('$title', '$content', '$category', '$status', $imgVal)";
}
if ($conn->query($sql) === TRUE) echo json_encode(["status" => "success", "message" => "Saved"]);
else echo json_encode(["status" => "error", "message" => $conn->error]);
$conn->close();
?>