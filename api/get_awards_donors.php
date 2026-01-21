<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once 'config.php';
$conn = connectDB();
$result = $conn->query("SELECT * FROM awards_donors ORDER BY submission_date DESC");
$data = [];
if ($result) while ($row = $result->fetch_assoc()) $data[] = $row;
echo json_encode($data);
$conn->close();
?>
