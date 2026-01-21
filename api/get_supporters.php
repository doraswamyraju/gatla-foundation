<?php
// api/get_supporters.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once 'config.php';

$conn = connectDB();

$club_filter = isset($_GET['club']) ? $_GET['club'] : '';

if ($club_filter) {
    // Filter by areas_of_interest using LIKE query
    // NOTE: This is a simple text search. If 'Education' matches 'Education Club', it works.
    $sql = "SELECT * FROM supporters WHERE areas_of_interest LIKE ? ORDER BY submission_date DESC";
    $search_term = "%" . $club_filter . "%";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $search_term);
    $stmt->execute();
    $result = $stmt->get_result();
} else {
    $sql = "SELECT * FROM supporters ORDER BY submission_date DESC";
    $result = $conn->query($sql);
}

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
