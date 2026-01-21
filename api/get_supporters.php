<?php
// api/get_supporters.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once 'config.php';

$conn = connectDB();

$sql = "SELECT * FROM supporters ORDER BY submission_date DESC";
$result = $conn->query($sql);

$data = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    // If table doesn't exist yet, return empty array instead of error
    // check error code if needed, but empty array is safer for frontend
}

echo json_encode($data);
$conn->close();
?>
