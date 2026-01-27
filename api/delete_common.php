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
    
    // Education
    'education-student'       => 'education_students',
    'education-scriber'       => 'education_scribers',
    'education-volunteer'     => 'education_volunteers',
    'education-donor'         => 'education_donors',
    
    // Cricket
    'cricket-player'          => 'cricket_players',
    'cricket-club-member'     => 'cricket_members',
    'cricket-umpire'          => 'cricket_umpires',
    'cricket-donor'           => 'cricket_donors',

    // Music
    'music-member'            => 'music_members',
    'music-singer'            => 'music_singers',
    'music-judge'             => 'music_judges',
    'music-volunteer'         => 'general_volunteers',
    'music-donor'             => 'music_donors',

    // Business
    'business-member'         => 'business_members',
    'business-entrepreneur'   => 'business_entrepreneurs',
    'business-donor'          => 'business_donors',

    // Awards
    'awards-application'      => 'awards_applications',

    // Supporters (All Clubs)
    'supporter-form'          => 'supporters',
    'education-supporter'     => 'supporters',
    'cricket-supporter'       => 'supporters',
    'music-supporter'         => 'supporters',
    'business-supporter'      => 'supporters',
    'awards-supporter'        => 'supporters',

    // Others
    'blog-post'               => 'blog_posts'
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