<?php
// api/get_music_judges.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once 'config.php';

$conn = connectDB();
$sql = "SELECT * FROM music_judges ORDER BY id DESC";
$result = $conn->query($sql);

$data = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);
$conn->close();
?>