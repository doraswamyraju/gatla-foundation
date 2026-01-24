<?php
// api/add_award_winner.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require_once 'config.php';

try {
    $conn = connectDB();
    
    // Check if image is uploaded
    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        throw new Exception("Image is required");
    }

    $upload_dir = '../uploads/winners/';
    if (!file_exists($upload_dir)) mkdir($upload_dir, 0777, true);

    $file_ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $file_name = 'winner_' . time() . '.' . $file_ext;
    $target_path = $upload_dir . $file_name;

    if (!move_uploaded_file($_FILES['image']['tmp_name'], $target_path)) {
        throw new Exception("Failed to upload image");
    }

    // Relative path for DB
    $db_path = 'uploads/winners/' . $file_name;

    $award_type = $_POST['awardType'];
    $category = $_POST['category'];
    $year = $_POST['year'];
    $winner_name = $_POST['winnerName'];
    $description = $_POST['description'] ?? '';

    $stmt = $conn->prepare("INSERT INTO award_winners (award_type, category, year, winner_name, image_path, description) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssisss", $award_type, $category, $year, $winner_name, $db_path, $description);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Winner added successfully"]);
    } else {
        throw new Exception("Database Error: " . $stmt->error);
    }
    $conn->close();

} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
