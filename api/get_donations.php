<?php
// api/get_donations.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once 'config.php';

$conn = connectDB();
if (!$conn) { echo "[]"; exit; }

$sql = "SELECT id, donor_name as name, phone, email, pan_number, amount, payment_id, donation_date, payment_status as status FROM donations ORDER BY donation_date DESC";
$result = $conn->query($sql);

$donations = [];
while($row = $result->fetch_assoc()) {
    $donations[] = $row;
}

echo json_encode($donations);
$conn->close();
?>