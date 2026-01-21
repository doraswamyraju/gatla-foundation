<?php
// api/submit_blog.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

require 'config.php';

$conn = connectDB();

if (!$conn) {
    die(json_encode(["status" => "error", "message" => "Connection failed"]));
}

// 1. Handle File Upload (if any)
$imagePath = null;
if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
    $target_dir = __DIR__ . "/uploads/"; // Ensure this directory exists
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
    }
    
    $file_extension = pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION);
    $new_filename = uniqid() . "_blog." . $file_extension;
    $target_file = $target_dir . $new_filename;

    if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
        $imagePath = $new_filename;
    } else {
        // Handle upload error if necessary, but we can proceed without image
    }
}

// 2. Parse Form Data
$id = isset($_POST['id']) ? intval($_POST['id']) : null;
$title = isset($_POST['title']) ? $conn->real_escape_string($_POST['title']) : '';
$content = isset($_POST['content']) ? $conn->real_escape_string($_POST['content']) : '';
$category = isset($_POST['category']) ? $conn->real_escape_string($_POST['category']) : 'General';
$status = isset($_POST['status']) ? $conn->real_escape_string($_POST['status']) : 'Draft';

if (empty($title)) {
    echo json_encode(["status" => "error", "message" => "Title is required"]);
    exit;
}

if ($id) {
    // UPDATE
    $sql = "UPDATE blog_posts SET title='$title', content='$content', category='$category', status='$status'";
    if ($imagePath) {
        $sql .= ", image_path='$imagePath'";
    }
    $sql .= " WHERE id=$id";
} else {
    // INSERT
    // If no image uploaded, image_path remains NULL (default) or we can set it if we want
    $imgColumn = $imagePath ? ", '$imagePath'" : ", NULL";
    $sql = "INSERT INTO blog_posts (title, content, category, status, image_path) VALUES ('$title', '$content', '$category', '$status' $imgColumn)";
}

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Blog post saved successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
}

$conn->close();
?>
