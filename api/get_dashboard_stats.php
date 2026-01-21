<?php
// api/get_dashboard_stats.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once 'config.php';

$conn = connectDB();
if (!$conn) {
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit;
}

$tables = [
    'general' => 'donations',
    'education' => 'education_donors',
    'cricket' => 'cricket_donors',
    'music' => 'music_donors',
    'business' => 'business_donors',
    'awards' => 'awards_donors'
];

$stats = [
    'total_amount' => 0,
    'total_donors' => 0,
    'breakdown' => []
];

foreach ($tables as $key => $table) {
    $amount = 0;
    $count = 0;

    // Check if table exists to avoid errors if some tables aren't created yet
    $checkTable = $conn->query("SHOW TABLES LIKE '$table'");
    if ($checkTable && $checkTable->num_rows > 0) {
        $sql = "SELECT COUNT(*) as count, SUM(amount) as total FROM $table";
        $result = $conn->query($sql);
        if ($result) {
            $row = $result->fetch_assoc();
            $count = (int)$row['count'];
            $amount = (float)$row['total'];
        }
    }

    $stats['breakdown'][$key] = [
        'count' => $count,
        'amount' => $amount
    ];

    $stats['total_amount'] += $amount;
    $stats['total_donors'] += $count;
}

$conn->close();

echo json_encode(["status" => "success", "data" => $stats]);
?>
