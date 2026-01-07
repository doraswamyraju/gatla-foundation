<?php
// api/delete_common.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'config.php';
$conn = connectDB();

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? null;
$type = $data['type'] ?? '';

if (!$id || !$type) {
    echo json_encode(["status" => "error", "message" => "Missing ID or Type"]);
    exit;
}

// 1. UNIVERSAL MAPPING: Add new forms here in the future
$tableMap = [
    // Dashboard Tab ID       =>  Database Table Name
    'volunteer-form'          => 'general_volunteers',
    'donations-list'          => 'donations',
    'education-student'       => 'education_students',
    'education-scriber'       => 'education_scribers',
    'education-volunteer'     => 'education_volunteers',
    'education-donor'         => 'education_donors',
    
    // Future Clubs (Add them here when you build them)
    'cricket-player'          => 'cricket_players',
    'music-singer'            => 'music_singers',
    'business-member'         => 'business_members'
];

if (!array_key_exists($type, $tableMap)) {
    echo json_encode(["status" => "error", "message" => "Invalid form type for deletion"]);
    exit;
}

$tableName = $tableMap[$type];

// 2. Execute Delete
$stmt = $conn->prepare("DELETE FROM $tableName WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Record deleted successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Database error: " . $stmt->error]);
}

$conn->close();
?>