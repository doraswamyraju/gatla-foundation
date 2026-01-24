<?php
// api/delete_award_winner.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $conn = connectDB();

    $id = $data['id'];
    
    // Get image path to delete file
    $res = $conn->query("SELECT image_path FROM award_winners WHERE id = $id");
    if ($res && $row = $res->fetch_assoc()) {
        $path = '../' . $row['image_path'];
        if (file_exists($path)) unlink($path);
    }

    $sql = "DELETE FROM award_winners WHERE id = $id";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => $conn->error]);
    }
    $conn->close();
}
?>
