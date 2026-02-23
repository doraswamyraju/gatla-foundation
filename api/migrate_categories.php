<?php
// api/migrate_categories.php
require_once 'config.php';
header("Content-Type: application/json");

try {
    $conn = connectDB();
    
    // Define mappings
    $mappings = [
        'Blind' => 'Visually Impaired Category',
        'Deaf & Dumb' => 'Deaf & Dumb Category',
        'Physically Handicapped' => 'Physically Handicapped Category',
        'Wheel Chair' => 'Wheel Chair Category',
        'General' => 'General Category'
    ];

    $total_updated = 0;
    foreach ($mappings as $old => $new) {
        $stmt = $conn->prepare("UPDATE award_winners SET category = ? WHERE category = ?");
        $stmt->bind_param("ss", $new, $old);
        $stmt->execute();
        $total_updated += $stmt->affected_rows;
    }

    // Also handle cases where "Platinum" winners might have been incorrectly marked as "Blind"
    // The user mentioned: "in platinum medal - we have only 1 category which is general category. but after the details are submitted it was showing as Blind"
    $stmt = $conn->prepare("UPDATE award_winners SET category = 'General Category' WHERE award_type = 'Gatla Platinum Medal' AND (category = 'Blind' OR category = 'Visually Impaired Category')");
    $stmt->execute();
    $total_updated += $stmt->affected_rows;

    echo json_encode(["status" => "success", "message" => "Migration complete. Total records updated: $total_updated"]);
    $conn->close();

} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
