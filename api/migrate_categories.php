<?php
// api/migrate_categories.php
require_once 'config.php';
header("Content-Type: application/json");

try {
    $conn = connectDB();
    if (!$conn) throw new Exception("Database connection failed");
    
    // Define mappings
    $mappings = [
        'Blind' => 'Visually Impaired Category',
        'Deaf & Dumb' => 'Deaf & Dumb Category',
        'Physically Handicapped' => 'Physically Handicapped Category',
        'Physical Handicap' => 'Physically Handicapped Category',
        'Wheel Chair' => 'Wheel Chair Category',
        'General' => 'Normal Category',
        'General Category' => 'Normal Category'
    ];

    $total_updated = 0;
    foreach ($mappings as $old => $new) {
        $stmt = $conn->prepare("UPDATE award_winners SET category = ? WHERE category = ?");
        $stmt->bind_param("ss", $new, $old);
        $stmt->execute();
        $total_updated += $stmt->affected_rows;
    }

    // Also handle cases where "Platinum" winners might have been incorrectly marked
    $stmt = $conn->prepare("UPDATE award_winners SET category = 'Normal Category' WHERE award_type = 'Gatla Platinum Medal' AND (category = 'Blind' OR category = 'Visually Impaired Category' OR category = 'General' OR category = 'General Category')");
    $stmt->execute();
    $total_updated += $stmt->affected_rows;

    echo json_encode(["status" => "success", "message" => "Migration complete. Total records updated: $total_updated"]);
    $conn->close();

} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
