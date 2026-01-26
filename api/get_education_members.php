<?php
// api/get_education_members.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once 'config.php';
$conn = connectDB();

$sql = "SELECT * FROM education_members ORDER BY submission_date DESC";
$result = $conn->query($sql);

$members = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $members[] = $row;
    }
}

echo json_encode($members);
$conn->close();
?>
