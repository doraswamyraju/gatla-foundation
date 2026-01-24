<?php
// api/add_event.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require_once 'config.php';

try {
    $conn = connectDB();
    
    // Check if image is uploaded
    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        throw new Exception("Event image is required");
    }

    $upload_dir = '../uploads/events/';
    if (!file_exists($upload_dir)) mkdir($upload_dir, 0777, true);

    $file_ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $file_name = 'event_' . time() . '.' . $file_ext;
    $target_path = $upload_dir . $file_name;

    if (!move_uploaded_file($_FILES['image']['tmp_name'], $target_path)) {
        throw new Exception("Failed to upload image");
    }

    $db_path = 'uploads/events/' . $file_name;

    $title = $_POST['title'];
    $description = $_POST['description'] ?? '';
    $event_date = $_POST['eventDate'];
    $event_time = $_POST['eventTime'];
    $location = $_POST['location'];

    $stmt = $conn->prepare("INSERT INTO events (title, description, event_date, event_time, location, image_path) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $title, $description, $event_date, $event_time, $location, $db_path);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Event added successfully"]);
    } else {
        throw new Exception("Database Error: " . $stmt->error);
    }
    $conn->close();

} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
